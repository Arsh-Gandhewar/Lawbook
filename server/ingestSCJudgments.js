/**
 * LAWBOOK - Supreme Court Judgments Pipeline
 * 
 * Downloads 35K+ Supreme Court metadata from AWS S3 (free, no auth),
 * parses structured data (case name, judges, citation, headnotes),
 * and stores in MongoDB CourtVerdict collection.
 * 
 * Usage:
 *   node server/ingestSCJudgments.js                    # Process all years (1950-2025)
 *   node server/ingestSCJudgments.js --year 2023        # Process single year
 *   node server/ingestSCJudgments.js --from 2000 --to 2025  # Process range
 *   node server/ingestSCJudgments.js --dry-run          # Preview without saving
 * 
 * Data source: https://github.com/vanga/indian-supreme-court-judgments
 * License: CC-BY-4.0
 */

require('dotenv').config();
const mongoose = require('mongoose');
const https = require('https');
const http = require('http');
const CourtVerdict = require('./models/CourtVerdict');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lawbook';
const S3_BASE = 'https://indian-supreme-court-judgments.s3.amazonaws.com';

// Parse CLI arguments
const args = process.argv.slice(2);
const getArg = (name) => { const i = args.indexOf(name); return i !== -1 && args[i + 1] ? args[i + 1] : null; };
const DRY_RUN = args.includes('--dry-run');
const SINGLE_YEAR = getArg('--year');
const FROM_YEAR = parseInt(getArg('--from') || '1950');
const TO_YEAR = parseInt(getArg('--to') || '2025');

// ─── HTTP helpers ───

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, { timeout: 30000 }, (res) => {
      if (res.statusCode === 404) return resolve(null);
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error(`JSON parse error: ${e.message}`)); }
      });
    }).on('error', reject).on('timeout', function () { this.destroy(); reject(new Error('Timeout')); });
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ─── HTML Parsing (no external deps needed) ───

function extractFromHTML(rawHtml) {
  if (!rawHtml) return null;

  const result = {};

  // Extract title (petitioner vs respondent)
  const titleMatch = rawHtml.match(/<strong>(.+?)<span[^>]*>(?:\s*versus\s*)<\/span>(.+?)<\/strong>/is);
  if (titleMatch) {
    result.petitioner = cleanText(titleMatch[1]);
    result.respondent = cleanText(titleMatch[2]);
    result.title = `${result.petitioner} v. ${result.respondent}`;
  } else {
    // Fallback: try simple pattern
    const simpleTitle = rawHtml.match(/aria-label="([^"]+)"/);
    if (simpleTitle) {
      const parts = simpleTitle[1].replace(/ pdf$/, '').split(/\s+versus\s+/i);
      if (parts.length === 2) {
        result.petitioner = cleanText(parts[0]);
        result.respondent = cleanText(parts[1]);
        result.title = `${result.petitioner} v. ${result.respondent}`;
      } else {
        result.title = cleanText(simpleTitle[1].replace(/ pdf$/, ''));
      }
    }
  }

  if (!result.title) return null;

  // Extract citation - SCR format
  const scrMatch = rawHtml.match(/\[(\d{4})\]\s*(\d+)\s*S\.C\.R\.\s*(\d+)/);
  if (scrMatch) {
    result.citation = `[${scrMatch[1]}] ${scrMatch[2]} SCR ${scrMatch[3]}`;
  }

  // Extract INSC citation
  const inscMatch = rawHtml.match(/(\d{4}INSC\d+)/);
  if (inscMatch) {
    result.inscCitation = inscMatch[1];
    if (!result.citation) result.citation = inscMatch[1];
  }

  // Extract judges (coram)
  const coramMatch = rawHtml.match(/Coram\s*:\s*([^<]+)/i);
  if (coramMatch) {
    result.judges = coramMatch[1]
      .split(/,\s*/)
      .map(j => cleanText(j.replace(/\*/g, '').replace(/<[^>]+>/g, '')))
      .filter(j => j.length > 1);
  }

  // Extract author judge (marked with *)
  const authorMatch = rawHtml.match(/(\w[\w\s]+?)<sup[^>]*>.*?Author.*?<\/sup>/i);
  if (authorMatch) {
    result.authorJudge = cleanText(authorMatch[1]);
  }

  // Extract headnotes/description
  const headnotesMatch = rawHtml.match(/HEADNOTES\s*(.*?)(?:<br>.*?<strong class='caseDetailsTD'|$)/is);
  if (headnotesMatch) {
    result.headnotes = cleanText(headnotesMatch[1]).substring(0, 2000);
  }

  // Extract decision date
  const dateMatch = rawHtml.match(/Decision Date\s*:<\/span>.*?(\d{2}-\d{2}-\d{4})/i);
  if (dateMatch) {
    const parts = dateMatch[1].split('-');
    result.decisionDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    result.year = parseInt(parts[2]);
  }

  // Extract case number
  const caseMatch = rawHtml.match(/Case No\s*:<\/span>.*?>([\w\s.()\/]+\d+\/\d+)/i);
  if (caseMatch) {
    result.caseNo = cleanText(caseMatch[1]);
  }

  // Extract disposal nature
  const disposalMatch = rawHtml.match(/Disposal Nature\s*:<\/span>.*?>([^<]+)/i);
  if (disposalMatch) {
    result.disposalNature = cleanText(disposalMatch[1]);
  }

  // Extract bench size
  const benchMatch = rawHtml.match(/Bench\s*:<\/span>.*?>(\d+\s*Judges?)/i);
  if (benchMatch) {
    result.benchSize = cleanText(benchMatch[1]);
  }

  // Extract CNR number
  const cnrMatch = rawHtml.match(/id='cnr'\s*value=([A-Z0-9]+)/i);
  if (cnrMatch) {
    result.cnr = cnrMatch[1];
  }

  return result;
}

function cleanText(str) {
  if (!str) return '';
  return str
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

// ─── Category classification ───

function classifyCategory(title, headnotes, caseNo) {
  const text = `${title} ${headnotes || ''} ${caseNo || ''}`.toLowerCase();

  if (/\b(murder|302|304|ipc|culpable homicide|dowry death|rape|376|kidnap|robbery|dacoity|theft|cheating|forgery|criminal|fir|bail|anticipatory|pocso|ndps|narcotic)\b/.test(text)) return 'Criminal';
  if (/\b(writ petition|fundamental right|article 14|article 19|article 21|article 32|constitutional|pil|basic structure|amendment)\b/.test(text)) return 'Constitutional';
  if (/\b(divorce|maintenance|custody|marriage|hindu|muslim|succession|guardianship|adoption|family|matrimonial|domestic violence)\b/.test(text)) return 'Family';
  if (/\b(property|land|tenancy|eviction|rent|partition|easement|transfer|acquisition|rera|real estate)\b/.test(text)) return 'Property';
  if (/\b(tax|income|gst|customs|excise|service tax|tribunal|cestat|itat)\b/.test(text)) return 'Tax';
  if (/\b(company|insolvency|ibc|nclt|nclat|corporate|director|shareholder|winding up|liquidation|merger)\b/.test(text)) return 'Corporate';
  if (/\b(patent|trademark|copyright|design|intellectual property)\b/.test(text)) return 'IP';
  if (/\b(contract|agreement|specific performance|injunction|damages|arbitration|breach)\b/.test(text)) return 'Contract';
  if (/\b(labour|industrial dispute|workmen|employer|retrenchment|gratuity|epf|esic|trade union|minimum wages)\b/.test(text)) return 'Labour';
  if (/\b(environment|pollution|forest|wildlife|ngt|mining|ecological)\b/.test(text)) return 'Environmental';
  if (/\b(consumer|deficiency|unfair trade|complaint|consumer forum)\b/.test(text)) return 'Consumer';
  if (/\b(election|representation|corrupt practice|disqualification)\b/.test(text)) return 'Constitutional';
  if (/\b(service|government servant|disciplinary|pension|promotion|transfer|seniority)\b/.test(text)) return 'Service';
  if (/\b(civil appeal|civil suit|cpc|decree|execution|order vii|res judicata)\b/.test(text)) return 'Civil';

  return 'Civil'; // default
}

// ─── Extract keywords ───

function extractKeywords(title, headnotes) {
  const text = `${title} ${headnotes || ''}`.toLowerCase();
  const keywords = new Set();

  const legalTerms = [
    'murder', 'bail', 'anticipatory bail', 'fir', 'quashing', 'writ', 'habeas corpus',
    'fundamental rights', 'article 21', 'article 14', 'article 19', 'article 32',
    'divorce', 'maintenance', 'custody', 'property', 'land acquisition', 'eviction',
    'contract', 'arbitration', 'specific performance', 'injunction', 'compensation',
    'tax', 'gst', 'income tax', 'excise', 'customs',
    'company', 'insolvency', 'nclt', 'liquidation',
    'labour', 'workmen', 'industrial dispute', 'retrenchment',
    'environment', 'pollution', 'forest',
    'consumer', 'deficiency', 'unfair trade practice',
    'election', 'disqualification', 'corrupt practice',
    'contempt', 'perjury', 'review', 'curative',
    'death penalty', 'life imprisonment', 'rape', 'pocso', 'ndps',
    'appeal', 'revision', 'special leave petition', 'slp',
    'service', 'pension', 'promotion', 'seniority',
    'reservation', 'sc st', 'obc', 'ews'
  ];

  for (const term of legalTerms) {
    if (text.includes(term)) keywords.add(term);
  }

  return [...keywords].slice(0, 10);
}

// ─── Main pipeline ───

async function processYear(year) {
  const indexUrl = `${S3_BASE}/metadata/tar/year=${year}/metadata.index.json`;

  let indexData;
  try {
    indexData = await fetchJSON(indexUrl);
  } catch (e) {
    console.log(`  [SKIP] Year ${year}: ${e.message}`);
    return { processed: 0, skipped: 0, errors: 0 };
  }

  if (!indexData || !indexData.parts) {
    console.log(`  [SKIP] Year ${year}: no data`);
    return { processed: 0, skipped: 0, errors: 0 };
  }

  const jsonFiles = [];
  for (const part of indexData.parts) {
    if (part.files) jsonFiles.push(...part.files);
  }

  console.log(`  [${year}] Found ${jsonFiles.length} judgments`);

  let processed = 0, skipped = 0, errors = 0, inserted = 0;
  const batchSize = 50;

  for (let i = 0; i < jsonFiles.length; i += batchSize) {
    const batch = jsonFiles.slice(i, i + batchSize);
    const verdicts = [];

    for (const fileName of batch) {
      try {
        const jsonUrl = `${S3_BASE}/metadata/json/year=${year}/${fileName}`;
        const metadata = await fetchJSON(jsonUrl);

        if (!metadata || !metadata.raw_html) { skipped++; continue; }

        const parsed = extractFromHTML(metadata.raw_html);
        if (!parsed || !parsed.title) { skipped++; continue; }

        const verdictYear = parsed.year || year;
        const category = classifyCategory(parsed.title, parsed.headnotes, parsed.caseNo);
        const keywords = extractKeywords(parsed.title, parsed.headnotes);

        const verdict = {
          caseName: parsed.title,
          citation: parsed.citation || `${year} INSC`,
          court: 'Supreme Court',
          year: verdictYear,
          judges: parsed.judges || [],
          summary: (parsed.headnotes || `Supreme Court judgment in ${parsed.title}`).substring(0, 1000),
          legalPrinciple: parsed.headnotes ? parsed.headnotes.substring(0, 500) : `Judgment in ${parsed.title}`,
          verdict: parsed.disposalNature || 'See full judgment',
          significance: `Supreme Court of India judgment. ${parsed.caseNo ? 'Case: ' + parsed.caseNo + '.' : ''} ${parsed.benchSize ? 'Bench: ' + parsed.benchSize + '.' : ''}`,
          relatedSections: [],
          relatedActs: [],
          category: category,
          keywords: keywords,
          source: 'indian-supreme-court-judgments-dataset',
          caseNo: parsed.caseNo || '',
          cnr: parsed.cnr || '',
          inscCitation: parsed.inscCitation || ''
        };

        verdicts.push(verdict);
        processed++;
      } catch (e) {
        errors++;
      }

      // Respect rate limits — small delay between S3 requests
      if (processed % 10 === 0) await sleep(100);
    }

    // Bulk insert batch
    if (!DRY_RUN && verdicts.length > 0) {
      try {
        const result = await CourtVerdict.insertMany(verdicts, { ordered: false });
        inserted += result.length;
      } catch (e) {
        // insertMany with ordered:false throws on ANY failure, but still inserts valid docs
        const partialInserted = e.insertedDocs?.length || e.result?.nInserted || 0;
        inserted += partialInserted;
        const failedCount = verdicts.length - partialInserted;
        
        // Fallback: try inserting failed documents one by one
        if (failedCount > 0 && e.writeErrors) {
          const failedIndexes = new Set(e.writeErrors.map(we => we.index));
          for (let fi = 0; fi < verdicts.length; fi++) {
            if (failedIndexes.has(fi)) {
              try {
                await new CourtVerdict(verdicts[fi]).save();
                inserted++;
              } catch (singleErr) {
                // Truly bad document — skip it
                errors++;
              }
            }
          }
        }
      }
    }

    if (processed % 100 === 0 && processed > 0) {
      process.stdout.write(`    Progress: ${processed} parsed, ${inserted} inserted, ${skipped} skipped, ${errors} errors\r`);
    }
  }

  console.log(`  [${year}] Done: ${processed} parsed, ${inserted} inserted, ${skipped} skipped, ${errors} errors`);
  return { processed, inserted, skipped, errors };
}

async function main() {
  console.log('═══════════════════════════════════════════════════');
  console.log('  LAWBOOK - Supreme Court Judgments Ingestion');
  console.log('  Source: indian-supreme-court-judgments (AWS S3)');
  console.log('  License: CC-BY-4.0');
  console.log('═══════════════════════════════════════════════════');

  if (DRY_RUN) console.log('  MODE: DRY RUN (no database writes)\n');

  const years = SINGLE_YEAR
    ? [parseInt(SINGLE_YEAR)]
    : Array.from({ length: TO_YEAR - FROM_YEAR + 1 }, (_, i) => FROM_YEAR + i);

  console.log(`  Years: ${years[0]}–${years[years.length - 1]} (${years.length} years)\n`);

  if (!DRY_RUN) {
    await mongoose.connect(MONGODB_URI);
    console.log('  Connected to MongoDB');

    // Clear old ingested data before re-run to avoid duplicates
    const deleted = await CourtVerdict.deleteMany({ source: 'indian-supreme-court-judgments-dataset' });
    console.log(`  Cleared ${deleted.deletedCount} old ingested verdicts\n`);
  }

  const totals = { processed: 0, inserted: 0, skipped: 0, errors: 0 };
  const startTime = Date.now();

  for (const year of years) {
    const result = await processYear(year);
    totals.processed += result.processed;
    totals.inserted += result.inserted;
    totals.skipped += result.skipped;
    totals.errors += result.errors;
  }

  const elapsed = ((Date.now() - startTime) / 1000 / 60).toFixed(1);

  console.log('\n═══════════════════════════════════════════════════');
  console.log('  COMPLETE');
  console.log(`  Total parsed:    ${totals.processed}`);
  console.log(`  Total inserted:  ${totals.inserted}`);
  console.log(`  Total skipped:   ${totals.skipped}`);
  console.log(`  Total errors:    ${totals.errors}`);
  console.log(`  Time elapsed:    ${elapsed} minutes`);
  console.log('═══════════════════════════════════════════════════');

  if (!DRY_RUN) {
    const totalInDB = await CourtVerdict.countDocuments({ source: 'indian-supreme-court-judgments-dataset' });
    console.log(`  Verdicts in DB from this source: ${totalInDB}`);
    await mongoose.disconnect();
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
