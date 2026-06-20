/**
 * LAWBOOK - High Court Judgments Pipeline
 * 
 * Ingests High Court metadata from structured Parquet files stored in AWS S3.
 * Avoids raw HTML regex parsing by using the cleanly extracted dataset fields.
 * Uses a Python helper (`utils/readParquet.py`) to stream Parquet -> JSON into Node.
 * 
 * Usage:
 *   node server/ingestHCJudgments.js --year 2024 --limit 1000
 *   node server/ingestHCJudgments.js --year 2023 --court 27_1 --limit 500
 *   node server/ingestHCJudgments.js --dry-run
 */

require('dotenv').config();
const mongoose = require('mongoose');
const https = require('https');
const { execFile } = require('child_process');
const path = require('path');
const CourtVerdict = require('./models/CourtVerdict');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lawbook';
const S3_BASE = 'https://indian-high-court-judgments.s3.amazonaws.com';

// Parse CLI arguments
const args = process.argv.slice(2);
const getArg = (name) => { const i = args.indexOf(name); return i !== -1 && args[i + 1] ? args[i + 1] : null; };
const DRY_RUN = args.includes('--dry-run');
const SINGLE_YEAR = getArg('--year');
const FROM_YEAR = parseInt(getArg('--from') || '1950');
const TO_YEAR = parseInt(getArg('--to') || '2025');
const COURT = getArg('--court') || ''; // if empty, processes all courts
const TOTAL_YEARLY_LIMIT = parseInt(getArg('--yearly-limit') || '500'); // 500 cases total per year


// ─── Classification & Extraction ───
function classifyCategory(title, headnotes) {
  const text = `${title || ''} ${headnotes || ''}`.toLowerCase();
  
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

  return 'Civil';
}

function extractKeywords(title, headnotes) {
  const text = `${title || ''} ${headnotes || ''}`.toLowerCase();
  const keywords = new Set();
  const legalTerms = [
    'murder', 'bail', 'anticipatory bail', 'fir', 'quashing', 'writ', 'habeas corpus',
    'fundamental rights', 'article 21', 'article 14', 'article 19', 'article 32',
    'divorce', 'maintenance', 'custody', 'property', 'land acquisition', 'eviction',
    'contract', 'arbitration', 'specific performance', 'injunction', 'compensation',
    'tax', 'gst', 'income tax', 'excise', 'customs', 'company', 'insolvency', 'nclt',
    'labour', 'workmen', 'industrial dispute', 'retrenchment', 'environment', 'pollution',
    'consumer', 'deficiency', 'unfair trade practice', 'election', 'disqualification',
    'contempt', 'perjury', 'review', 'curative', 'death penalty', 'life imprisonment',
    'rape', 'pocso', 'ndps', 'appeal', 'revision', 'special leave petition', 'slp',
    'service', 'pension', 'promotion', 'seniority', 'reservation', 'sc st', 'obc', 'ews'
  ];
  for (const term of legalTerms) {
    if (text.includes(term)) keywords.add(term);
  }
  return [...keywords].slice(0, 10);
}

// ─── S3 Listing ───
function getParquetKeys(year, court) {
  return new Promise((resolve, reject) => {
    let prefix = `metadata/parquet/year=${year}/`;
    if (court) prefix += `court=${court}/`;
    
    const url = `${S3_BASE}/?list-type=2&prefix=${prefix}`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const keys = [];
        const regex = /<Key>(.*?)<\/Key>/g;
        let match;
        while ((match = regex.exec(data)) !== null) {
          if (match[1].endsWith('.parquet')) {
            keys.push(match[1]);
          }
        }
        resolve(keys);
      });
    }).on('error', reject);
  });
}

// ─── Python Execution ───
function runPythonParquetReader(parquetUrl, limit) {
  return new Promise((resolve, reject) => {
    const pyScript = path.join(__dirname, 'utils', 'readParquet.py');
    const args = [pyScript, parquetUrl];
    if (limit) args.push(limit.toString());
    
    execFile('python', args, { maxBuffer: 1024 * 1024 * 100 }, (error, stdout, stderr) => {
      if (error) {
        return reject(new Error(`Python execution error: ${stderr || error.message}`));
      }
      try {
        const data = JSON.parse(stdout);
        if (data.error) return reject(new Error(data.error));
        resolve(data);
      } catch (e) {
        reject(new Error(`Failed to parse JSON from python: ${e.message}`));
      }
    });
  });
}

// ─── Main Pipeline ───

async function processYear(year) {
  console.log(`\n  --- Processing Year: ${year} ---`);
  const keys = await getParquetKeys(year, COURT);
  
  if (keys.length === 0) {
    console.log(`  [SKIP] Year ${year}: No Parquet files found.`);
    return { processed: 0, inserted: 0, skipped: 0, errors: 0 };
  }
  
  console.log(`  Found ${keys.length} parquet file(s) (benches)`);
  
  const limitPerFile = Math.ceil(TOTAL_YEARLY_LIMIT / keys.length);
  console.log(`  Targeting ~${limitPerFile} top cases per bench to reach total ${TOTAL_YEARLY_LIMIT}`);
  
  let processed = 0, inserted = 0, skipped = 0, errors = 0;
  
  for (const key of keys) {
    console.log(`    Processing bench: ${key.split('/').slice(-2)[0]}`);
    const parquetUrl = `${S3_BASE}/${key}`;
    
    let records = [];
    try {
      records = await runPythonParquetReader(parquetUrl, limitPerFile);
    } catch (e) {
      console.log(`      [ERROR] Failed to fetch/parse parquet: ${e.message}`);
      errors++;
      continue;
    }
    
    const verdicts = [];
    for (const record of records) {
      if (!record.title) { skipped++; continue; }
      
      const category = classifyCategory(record.title, record.description);
      const keywords = extractKeywords(record.title, record.description);
      
      const verdictDateStr = record.decision_date || `${year}-01-01`;
      let verdictYear = year;
      if (verdictDateStr.includes('-')) {
        verdictYear = parseInt(verdictDateStr.split('-')[0]) || year;
      }
      
      const verdict = {
        caseName: record.title.trim(),
        citation: record.cnr || `HC ${verdictYear}`,
        court: 'High Court',
        highCourtName: record.court || 'High Court',
        year: verdictYear,
        judges: record.judge ? record.judge.split(',').map(j => j.trim()) : [],
        summary: (record.description || `Judgment in ${record.title}`).substring(0, 1000),
        legalPrinciple: record.description ? record.description.substring(0, 500) : `High Court ruling for ${record.title}`,
        verdict: record.disposal_nature || 'See full judgment',
        significance: `High Court judgment from ${record.court || 'High Court'}. ${record.cnr ? 'CNR: '+record.cnr+'.' : ''}`,
        relatedSections: [],
        relatedActs: [],
        category: category,
        keywords: keywords,
        source: 'indian-high-court-judgments-dataset',
        caseNo: record.cnr || '',
        cnr: record.cnr || ''
      };
      
      verdicts.push(verdict);
      processed++;
    }
    
    if (!DRY_RUN && verdicts.length > 0) {
      try {
        const result = await CourtVerdict.insertMany(verdicts, { ordered: false });
        inserted += result.length;
      } catch (e) {
        const partialInserted = e.insertedDocs?.length || e.result?.nInserted || 0;
        inserted += partialInserted;
        const failedCount = verdicts.length - partialInserted;
        errors += failedCount;
      }
    }
  }

  console.log(`  [${year}] Done: ${processed} parsed, ${inserted} inserted, ${skipped} skipped, ${errors} errors`);
  return { processed, inserted, skipped, errors };
}

async function main() {
  console.log('═══════════════════════════════════════════════════');
  console.log('  LAWBOOK - High Court Judgments Ingestion');
  console.log('  Source: indian-high-court-judgments (AWS S3 Parquet)');
  console.log('═══════════════════════════════════════════════════');
  
  if (DRY_RUN) console.log('  [MODE] DRY RUN (No DB writes)\n');

  const years = SINGLE_YEAR
    ? [parseInt(SINGLE_YEAR)]
    : Array.from({ length: TO_YEAR - FROM_YEAR + 1 }, (_, i) => FROM_YEAR + i);

  console.log(`  Years: ${years[0]}–${years[years.length - 1]} (${years.length} years)\n`);

  if (!DRY_RUN) {
    await mongoose.connect(MONGODB_URI);
    console.log('  Connected to MongoDB\n');
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
    const totalInDB = await CourtVerdict.countDocuments({ source: 'indian-high-court-judgments-dataset' });
    console.log(`  High Court verdicts now in DB: ${totalInDB}`);
    await mongoose.disconnect();
  }
}


main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
