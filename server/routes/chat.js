const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const User = require('../models/User');
const ResponseCache = require('../models/ResponseCache');
const LegalSection = require('../models/LegalSection');
const CourtVerdict = require('../models/CourtVerdict');
const { auth } = require('../middleware/auth');
const https = require('https');


// escape regex special chars
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Normalize a query for cache lookup: handles typos, abbreviations, filler words
function normalizeQuery(query) {
  let q = query
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s]/g, '')   // remove all punctuation
    .replace(/\s+/g, ' ');          // collapse multiple spaces

  // Expand common legal abbreviations
  const abbreviations = {
    'sec': 'section', 'sect': 'section', 'secion': 'section', 'secton': 'section', 'sectin': 'section',
    'art': 'article', 'artcle': 'article', 'artical': 'article',
    'ipc': 'indian penal code', 'crpc': 'code of criminal procedure',
    'bns': 'bharatiya nyaya sanhita', 'bnss': 'bharatiya nagarik suraksha sanhita',
    'cpc': 'code of civil procedure', 'it act': 'information technology act',
    'dv act': 'domestic violence act', 'mv act': 'motor vehicles act',
    'posh': 'prevention of sexual harassment',
    'pocso': 'protection of children from sexual offences',
    'fir': 'first information report',
    'sc': 'supreme court', 'hc': 'high court',
    'govt': 'government', 'govt.': 'government',
    'info': 'information', 'abt': 'about',
    'punshment': 'punishment', 'punishmnt': 'punishment', 'punsihment': 'punishment',
    'murdr': 'murder', 'theif': 'theft', 'thft': 'theft',
    'kidnping': 'kidnapping', 'kidnapng': 'kidnapping',
    'dowrey': 'dowry', 'divorse': 'divorce', 'divorc': 'divorce',
    'balable': 'bailable', 'bailble': 'bailable',
    'cognzable': 'cognizable', 'cognisable': 'cognizable',
    'warrent': 'warrant', 'warant': 'warrant',
    'property': 'property', 'proprty': 'property',
    'mva': 'motor vehicles act', 'mv act': 'motor vehicles act',
    'rto': 'regional transport office',
    'challan': 'penalty', 'e challan': 'penalty',
    'dl': 'driving licence', 'rc': 'registration certificate',
    'dui': 'drunk driving', 'dwi': 'drunk driving'
  };

  // Replace multi-word abbreviations first (phrase-level)
  const phraseAbbrevs = {
    'it act': 'information technology act',
    'dv act': 'domestic violence act',
    'mv act': 'motor vehicles act',
    'e challan': 'penalty'
  };
  for (const [phrase, expansion] of Object.entries(phraseAbbrevs)) {
    q = q.replace(new RegExp(phrase, 'gi'), expansion);
  }

  // Replace single-word abbreviations
  q = q.split(' ').map(word => abbreviations[word] || word).join(' ');

  // Remove common filler/stop words that don't change the legal meaning
  const fillerWords = new Set([
    'what', 'is', 'the', 'a', 'an', 'of', 'for', 'in', 'to', 'and',
    'tell', 'me', 'about', 'explain', 'define', 'describe', 'please',
    'can', 'you', 'could', 'would', 'i', 'want', 'know', 'need',
    'help', 'with', 'regarding', 'related', 'give', 'details',
    'meaning', 'means', 'say', 'says', 'said', 'how', 'does',
    'do', 'did', 'will', 'shall', 'should', 'be', 'been', 'being',
    'under', 'according', 'as', 'per', 'hi', 'hello', 'hey', 'thanks',
    'thank', 'sir', 'mam', 'madam', 'pls', 'plz', 'kindly'
  ]);

  q = q.split(' ').filter(word => !fillerWords.has(word)).join(' ');

  return q.trim();
}

// --- RAG: Search legal database for relevant sections ---
async function searchLegalDatabase(query) {
  const q = query.toLowerCase().trim();
  let results = [];

  // 1. Try direct section/article lookup (e.g., "section 302", "article 21")
  const sectionMatch = q.match(/(?:section|sec|sect|article|art)\.?\s*(\d+[a-zA-Z]*)/i);
  if (sectionMatch) {
    const sectionNum = sectionMatch[1].toUpperCase();

    // Detect which act the user is referring to
    let actFilter = {};
    if (/ipc|indian penal|penal code/i.test(q)) actFilter.actCode = 'IPC';
    else if (/bns|bharatiya nyaya|nyaya sanhita/i.test(q)) actFilter.actCode = 'BNS';
    else if (/crpc|criminal procedure|code of criminal/i.test(q)) actFilter.actCode = 'CrPC';
    else if (/bnss|nagarik suraksha/i.test(q)) actFilter.actCode = 'BNSS';
    else if (/constitution|constitutional|fundamental|article/i.test(q)) actFilter.actCode = 'COI';
    else if (/motor vehicle|mva|traffic|rto|challan/i.test(q)) actFilter.actCode = 'MVA';
    else if (/it act|information technology|cyber|hacking/i.test(q)) actFilter.actCode = 'ITA';
    else if (/consumer protection|cpa|unfair trade/i.test(q)) actFilter.actCode = 'CPA';
    else if (/rti|right to information/i.test(q)) actFilter.actCode = 'RTI';
    else if (/pocso|child sexual|sexual offence.*child/i.test(q)) actFilter.actCode = 'POCSO';
    else if (/ndps|narcotic|drug/i.test(q)) actFilter.actCode = 'NDPS';
    else if (/hindu marriage|hma|divorce.*hindu|conjugal/i.test(q)) actFilter.actCode = 'HMA';
    else if (/domestic violence|dva|protection.*women/i.test(q)) actFilter.actCode = 'DVA';
    else if (/dowry/i.test(q)) actFilter.actCode = 'DPA';
    else if (/cheque bounce|cheque dishon|negotiable instrument/i.test(q)) actFilter.actCode = 'NIA';
    else if (/rera|real estate/i.test(q)) actFilter.actCode = 'RERA';
    else if (/sc.st|atrocit|scheduled caste/i.test(q)) actFilter.actCode = 'SCST';
    else if (/corruption|brib|prevention of corruption/i.test(q)) actFilter.actCode = 'PCA';
    else if (/environment|pollution|epa/i.test(q)) actFilter.actCode = 'EPA';
    else if (/sarfaesi|npa|loan recovery/i.test(q)) actFilter.actCode = 'SAR';
    // personal law
    else if (/special marriage|sma/i.test(q)) actFilter.actCode = 'SMA';
    else if (/shariat|muslim.*law|muslim.*marriage/i.test(q)) actFilter.actCode = 'SHARIAT';
    else if (/muslim.*divorce|dissolution.*muslim/i.test(q)) actFilter.actCode = 'DMM';
    else if (/christian.*marriage/i.test(q)) actFilter.actCode = 'ICMA';
    else if (/christian.*divorce|indian divorce act/i.test(q)) actFilter.actCode = 'IDA';
    else if (/parsi.*marriage|parsi.*divorce/i.test(q)) actFilter.actCode = 'PMDA';
    else if (/adoption|hindu.*maintenance|hama/i.test(q)) actFilter.actCode = 'HAMA';
    else if (/guardian.*ward/i.test(q)) actFilter.actCode = 'GWA';
    else if (/succession.*act|will.*probate/i.test(q)) actFilter.actCode = 'ISA';
    else if (/child.*marriage.*act|pcma/i.test(q)) actFilter.actCode = 'PCMA';
    // contract & commercial
    else if (/indian contract|contract act|breach.*contract|indemnity|bailment/i.test(q)) actFilter.actCode = 'ICA';
    else if (/sale of goods|soga/i.test(q)) actFilter.actCode = 'SOGA';
    else if (/partnership act/i.test(q)) actFilter.actCode = 'IPA';
    else if (/specific relief|injunction/i.test(q)) actFilter.actCode = 'SRA';
    else if (/limitation act|limitation period/i.test(q)) actFilter.actCode = 'LA';
    // corporate
    else if (/companies act|company law|director.*dut/i.test(q)) actFilter.actCode = 'CA2013';
    else if (/insolvency|ibc|bankruptcy|nclt|cirp/i.test(q)) actFilter.actCode = 'IBC';
    else if (/competition act|antitrust|dominant position|cartel/i.test(q)) actFilter.actCode = 'COMP';
    else if (/llp|limited liability partnership/i.test(q)) actFilter.actCode = 'LLP';
    // tax
    else if (/income tax|80c|tax deduction|itr|tax return/i.test(q)) actFilter.actCode = 'ITA1961';
    else if (/gst|goods.*service.*tax|cgst|input.*tax.*credit/i.test(q)) actFilter.actCode = 'CGST';
    else if (/stamp act|stamp duty/i.test(q)) actFilter.actCode = 'STAMP';
    // intellectual property
    else if (/copyright|literary.*work|piracy/i.test(q)) actFilter.actCode = 'COPY';
    else if (/trademark|trade mark|brand.*name/i.test(q)) actFilter.actCode = 'TM';
    else if (/patent|invention|patentable/i.test(q)) actFilter.actCode = 'PAT';
    // national security
    else if (/uapa|unlawful activit|terrorist/i.test(q)) actFilter.actCode = 'UAPA';
    else if (/fema|foreign exchange|forex/i.test(q)) actFilter.actCode = 'FEMA';
    else if (/money laundering|pmla/i.test(q)) actFilter.actCode = 'PMLA';
    else if (/nia act|national investigation/i.test(q)) actFilter.actCode = 'NIAA';
    else if (/afspa|armed forces.*special/i.test(q)) actFilter.actCode = 'AFSPA';
    // procedure & evidence
    else if (/indian evidence|evidence act|admissib|burden.*proof/i.test(q)) actFilter.actCode = 'IEA';
    else if (/\bcpc\b|civil procedure|res judicata|temporary injunction/i.test(q)) actFilter.actCode = 'CPC';
    else if (/registration act|compulsory registration/i.test(q)) actFilter.actCode = 'REGA';
    else if (/contempt.*court/i.test(q)) actFilter.actCode = 'CCA';
    // women & child
    else if (/posh|sexual harassment.*workplace/i.test(q)) actFilter.actCode = 'POSH';
    else if (/maternity.*benefit|maternity.*leave/i.test(q)) actFilter.actCode = 'MBA';
    else if (/immoral traffic|prostitution|brothel/i.test(q)) actFilter.actCode = 'ITPA';
    else if (/medical termination|mtp|abortion/i.test(q)) actFilter.actCode = 'MTP';
    else if (/child labour/i.test(q)) actFilter.actCode = 'CLA';
    // miscellaneous
    else if (/arms act|firearm|gun licence/i.test(q)) actFilter.actCode = 'ARMS';
    else if (/wildlife|poaching|wild animal/i.test(q)) actFilter.actCode = 'WLPA';
    else if (/food safety|food adulteration|fssai/i.test(q)) actFilter.actCode = 'FSSA';
    else if (/ngt|green tribunal/i.test(q)) actFilter.actCode = 'NGT';
    else if (/senior citizen|elderly|old age.*maintenance/i.test(q)) actFilter.actCode = 'MWPSC';
    else if (/mental health|mental illness/i.test(q)) actFilter.actCode = 'MHA2017';
    else if (/rte|right to education|free.*compulsory.*education/i.test(q)) actFilter.actCode = 'RTE';
    else if (/legal.*aid|legal.*service.*authorit/i.test(q)) actFilter.actCode = 'LSAA';
    else if (/essential commodit|hoarding|black.*market/i.test(q)) actFilter.actCode = 'ECA';
    else if (/bonded labour/i.test(q)) actFilter.actCode = 'BLA';
    else if (/epidemic|pandemic|quarantine/i.test(q)) actFilter.actCode = 'EDA';
    else if (/trust act|indian trust/i.test(q)) actFilter.actCode = 'TRUST';
    // additional laws
    else if (/arbitration|conciliation|arbitral.*award/i.test(q)) actFilter.actCode = 'ARBA';
    else if (/advocate.*act|bar council|legal.*profession|advocate.*misconduct/i.test(q)) actFilter.actCode = 'ADV';
    else if (/benami|benami.*transaction|fake.*name.*property/i.test(q)) actFilter.actCode = 'BENAMI';
    else if (/land.*acquisition|larr|rehabilitation.*resettlement/i.test(q)) actFilter.actCode = 'LARR';
    else if (/electricity.*theft|electricity.*act|meter.*tamper/i.test(q)) actFilter.actCode = 'ELEC';
    else if (/drug.*cosmetic|spurious.*drug|fake.*medicine/i.test(q)) actFilter.actCode = 'DCA';
    else if (/official.*secret|espionage|spy/i.test(q)) actFilter.actCode = 'OSA';
    else if (/easement|right.*of.*way|prescriptive.*right/i.test(q)) actFilter.actCode = 'EASE';
    else if (/damage.*public.*property|vandalism.*public/i.test(q)) actFilter.actCode = 'PDPP';
    else if (/factor.*act|factory.*hour|overtime.*factory/i.test(q)) actFilter.actCode = 'FA';

    const directQuery = { sectionNumber: sectionNum, ...actFilter };
    results = await LegalSection.find(directQuery).limit(3);

    // If no act specified and nothing found, search across all acts
    if (results.length === 0 && !actFilter.actCode) {
      results = await LegalSection.find({ sectionNumber: sectionNum }).limit(3);
    }
  }

  // 2. If no direct match, try keyword/text search
  if (results.length === 0) {
    const searchTerms = q
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 2 && !['what', 'the', 'for', 'and', 'how', 'can', 'you', 'tell', 'about', 'explain', 'please', 'does', 'which'].includes(w))
      .join(' ');

    if (searchTerms.length > 0) {
      try {
        // MongoDB full-text search
        results = await LegalSection.find(
          { $text: { $search: searchTerms } },
          { score: { $meta: 'textScore' } }
        ).sort({ score: { $meta: 'textScore' } }).limit(3);
      } catch (textErr) {
        // Fallback: regex search on keywords array
        const keywords = searchTerms.split(' ');
        results = await LegalSection.find({
          keywords: { $in: keywords.map(k => new RegExp(escapeRegex(k), 'i')) }
        }).limit(3);
      }
    }
  }

  // 3. Category-based fallback: if still no results, try matching by legal category
  if (results.length === 0) {
    const categoryMap = {
      'Criminal': /murder|theft|assault|robbery|kidnap|rape|criminal|bail|arrest|fir|police|fraud|cheating|forgery/i,
      'Civil': /contract|agreement|damages|injunction|civil|suit|decree|plaintiff|defendant/i,
      'Constitutional': /fundamental|constitution|article|writ|directive|amendment|preamble/i,
      'Family': /marriage|divorce|custody|maintenance|adoption|dowry|alimony|husband|wife/i,
      'Property': /property|land|tenant|rent|lease|transfer|mortgage|easement|registration/i,
      'Consumer': /consumer|defective|service.*complaint|unfair.*trade|refund/i,
      'Labour': /employment|wages|salary|termination|workplace|gratuity|provident|industrial/i,
      'Cyber': /cyber|hacking|data|phishing|online.*fraud|identity.*theft|information.*technology/i
    };
    for (const [category, pattern] of Object.entries(categoryMap)) {
      if (pattern.test(query)) {
        results = await LegalSection.find({ category }).limit(3);
        if (results.length > 0) break;
      }
    }
  }

  return results;
}

async function searchCourtVerdicts(query, retrievedSections) {
  let results = [];
  let scResults = [];
  let hcResults = [];

  // Helper to safely execute queries
  const fetchVerdicts = async (filter, textSearch = false) => {
    let sc = [], hc = [];
    if (textSearch) {
      try {
        sc = await CourtVerdict.find(
          { ...filter, court: 'Supreme Court' },
          { score: { $meta: 'textScore' } }
        ).sort({ score: { $meta: 'textScore' } }).limit(3);
        
        hc = await CourtVerdict.find(
          { ...filter, court: 'High Court' },
          { score: { $meta: 'textScore' } }
        ).sort({ score: { $meta: 'textScore' } }).limit(3);
      } catch (err) {}
    } else {
      sc = await CourtVerdict.find({ ...filter, court: 'Supreme Court' }).sort({ year: -1 }).limit(3);
      hc = await CourtVerdict.find({ ...filter, court: 'High Court' }).sort({ year: -1 }).limit(3);
    }
    return { sc, hc };
  };

  // 1. If we found legal sections, search for verdicts that reference those sections
  if (retrievedSections.length > 0) {
    const sectionRefs = retrievedSections.map(s => {
      const prefix = s.actCode === 'COI' ? 'Article' : 'Section';
      return `${prefix} ${s.sectionNumber}`;
    });

    const { sc, hc } = await fetchVerdicts({ relatedSections: { $in: sectionRefs } });
    scResults = sc;
    hcResults = hc;
  }

  // 2. If no verdicts found via section reference, try keyword search
  if (scResults.length === 0 && hcResults.length === 0) {
    const q = query.toLowerCase().trim();
    const searchTerms = q
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 2 && !['what', 'the', 'for', 'and', 'how', 'can', 'you', 'tell', 'about', 'explain', 'please', 'does', 'which', 'case', 'judgement', 'judgment', 'verdict'].includes(w))
      .join(' ');

    if (searchTerms.length > 0) {
      const { sc, hc } = await fetchVerdicts({ $text: { $search: searchTerms } }, true);
      scResults = sc;
      hcResults = hc;
    }
  }

  // 3. Try direct case name search
  if (scResults.length === 0 && hcResults.length === 0) {
    const caseMatch = query.match(/([A-Z][a-z]+(?:\s[A-Z][a-z]+)*\s+v[s]?\.?\s+)/i);
    if (caseMatch) {
      const { sc, hc } = await fetchVerdicts({ caseName: { $regex: escapeRegex(caseMatch[0].trim()), $options: 'i' } });
      scResults = sc;
      hcResults = hc;
    }
  }

  results = [...scResults, ...hcResults];
  return results;
}

// Build the prompt: RAG (with sources + verdicts) or fallback
function buildPrompt(message, retrievedSections, retrievedVerdicts, chatHistory) {
  const historyText = chatHistory.slice(-8).map(msg => `${msg.role === 'model' ? 'Assistant' : 'User'}: ${msg.content}`).join('\n');

  const hasSections = retrievedSections.length > 0;
  const hasVerdicts = retrievedVerdicts.length > 0;

  if (hasSections || hasVerdicts) {
    // RAG MODE: Ground the response in verified legal text + court verdicts
    let sourceTexts = '';

    if (hasSections) {
      sourceTexts += retrievedSections.map((s, i) => {
        let text = `--- LEGAL SOURCE ${i + 1} ---\n`;
        text += `Act: ${s.act}\n`;
        text += `${s.actCode === 'COI' ? 'Article' : 'Section'} ${s.sectionNumber}: ${s.title}\n`;
        text += `Legal Text: "${s.legalText}"\n`;
        if (s.punishment) text += `Punishment: ${s.punishment}\n`;
        if (s.cognizable !== 'N/A') text += `Cognizable: ${s.cognizable} | Bailable: ${s.bailable}\n`;
        if (s.bnsEquivalent?.section) text += `BNS Equivalent: Section ${s.bnsEquivalent.section}, ${s.bnsEquivalent.act}\n`;
        if (s.ipcEquivalent?.section) text += `IPC Equivalent: Section ${s.ipcEquivalent.section}, ${s.ipcEquivalent.act}\n`;
        return text;
      }).join('\n');
    }

    if (hasVerdicts) {
      sourceTexts += '\n' + retrievedVerdicts.map((v, i) => {
        let text = `--- COURT VERDICT ${i + 1} ---\n`;
        text += `Case: ${v.caseName} (${v.year})\n`;
        text += `Court: ${v.court}\n`;
        text += `Citation: ${v.citation}\n`;
        text += `Legal Principle: ${v.legalPrinciple}\n`;
        text += `Verdict: ${v.verdict}\n`;
        text += `Significance: ${v.significance}\n`;
        return text;
      }).join('\n');
    }

    return `You are Lawbook AI, a legal assistant specializing EXCLUSIVELY in Indian law.

STRICT RULES:
- Answer ONLY based on the verified Indian legal text and court verdicts provided below.
- NEVER reference any foreign law, foreign court, or non-Indian legal system (US, UK, etc.). This is CRITICAL.
- Use **bold** for section names, act names, legal terms, and case names.
- Use bullet points for key details.
- Keep the answer to a maximum of 120-150 words. Make the answer easily understandable to a layperson while strictly maintaining all crucial legal information.
- Mention the punishment/penalty if provided in the source.
- If BNS/IPC equivalent is provided, mention it. If a law has been REPEALED (e.g., Section 66A IT Act), clearly state it is no longer valid and provide the replacement provision if any.
- Since IPC, CrPC, and Indian Evidence Act have been REPLACED by BNS, BNSS, and BSA respectively from July 1, 2024, ALWAYS mention both old and new section numbers when applicable.
- ALWAYS cite court verdicts when provided. Format: **Case Name (Year)** — briefly state the principle established. This is MANDATORY if verdicts are in the sources.
- If no court verdict is provided in sources but you know a landmark Indian Supreme Court or High Court judgment on this topic, mention it with the case name and year.
- End with: "⚠️ *Consult a licensed advocate for your specific situation.*"

VERIFIED INDIAN LEGAL SOURCES:
${sourceTexts}

Conversation:\n${historyText}\nUser: ${message}\n\nAnswer based ONLY on the above Indian legal sources. Cite case names where applicable:`;
  } else {
    // FALLBACK MODE: No sources found in database
    return `You are Lawbook AI, a legal assistant specializing EXCLUSIVELY in Indian law.

STRICT RULES:
1. Answer ONLY under Indian law. NEVER cite or reference foreign laws, foreign courts, or non-Indian legal systems (US Constitution, UK Acts, etc.). This is absolutely critical — if you cite foreign law, the answer is WRONG.
2. Cite the exact Section/Article number with its full Indian Act name.
3. State the punishment/penalty if applicable.
4. If a provision has been replaced by BNS 2023 or BNSS 2023, mention both old and new section numbers.
5. ALWAYS reference relevant Supreme Court of India or High Court judgments by case name and year. Example: "As held in **Maneka Gandhi v. Union of India (1978)**, the Supreme Court established that..."
6. Never fabricate section numbers, case names, or legal provisions. If unsure, say so.
7. Use **bold** for section names, act names, and case names. Use bullet points for lists.
8. Keep answers to a maximum of 120-150 words. Ensure the answer is easily understandable while strictly maintaining all crucial legal information.
9. If a law has been REPEALED, clearly state it is no longer valid and provide the replacement.
10. Since IPC, CrPC, and Indian Evidence Act have been REPLACED by BNS, BNSS, and BSA respectively from July 1, 2024, ALWAYS mention both old and new section numbers.
11. End with: "⚠️ *Consult a licensed advocate for your specific situation.*"

⚠️ IMPORTANT: Start your response with "*Note: This answer is from general knowledge and not from our verified legal database.*\\n\\n"

Your expertise covers ALL Indian Acts across Criminal, Civil, Constitutional, Family, Property, Corporate, Tax, Labour, Consumer, Cyber, IP, Environmental, and Procedural law.

Conversation:\n${historyText}\nUser: ${message}\n\nProvide an ACCURATE response citing Indian law ONLY. Include relevant Supreme Court/High Court case names:`;
  }
}

// Simple helper to call Google Generative Language REST endpoints using API key
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
let isGeminiConfigured = false;
if (GEMINI_API_KEY && GEMINI_API_KEY.trim()) {
  isGeminiConfigured = true;
  console.log('GEMINI_API_KEY configured');
} else {
  console.warn('GEMINI_API_KEY not configured - AI chat will not work');
}

// Simple HTTP request helper
function httpsRequest(url, options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        const data = Buffer.concat(chunks).toString('utf8');
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });
    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

// Simple AI response using gemini models
async function generateSimpleResponse(prompt) {
  const models = ['gemini-2.5-flash', 'gemini-2.0-flash'];
  
  for (const model of models) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
    const body = JSON.stringify({
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0,
        maxOutputTokens: 8192,
        topP: 1,
        topK: 1
      }
    });

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    };

    try {
      const response = await httpsRequest(url, options, body);

      if (response.status === 400 || response.status === 401) {
        console.error('Invalid Gemini API key');
        return 'I apologize, but the AI service is not properly configured. The API key appears to be invalid. Please contact the administrator to update the GEMINI_API_KEY in the environment settings.';
      }

      if (response.status === 200 && response.data.candidates) {
        const content = response.data.candidates[0]?.content?.parts?.[0]?.text;
        if (content) return content;
      }
      
      if (response.status === 503 && model === 'gemini-2.5-flash') {
        console.log(`Model ${model} returned 503, falling back...`);
        continue; // try next model
      }

      console.error('Gemini API error:', response.status, response.data);
      const errorMsg = response.data?.error?.message || JSON.stringify(response.data);
      return `API Error (${response.status}): ${errorMsg}`;
    } catch (error) {
      console.error('Gemini request failed:', error);
      if (model === 'gemini-2.5-flash') continue;
      return 'I apologize, but I am having trouble connecting to the AI service. Please try again in a moment.';
    }
  }
}

// Helper to extract domain from user query
function extractDomain(query) {
  const q = query.toLowerCase();
  if (q.match(/divorce|marriage|child|custody|alimony|husband|wife|maintenance|dowry|adoption/)) return 'Family';
  if (q.match(/murder|theft|assault|fraud|police|bail|jail|criminal|rape|kidnap|robbery|fir|arrest/)) return 'Criminal';
  if (q.match(/tax|gst|income tax|vat|return|audit|tds|itr/)) return 'Tax';
  if (q.match(/company|startup|incorporation|shares|board|business|corporate|director|insolvency/)) return 'Corporate';
  if (q.match(/property|land|tenant|rent|lease|estate|house|flat|registration|mortgage/)) return 'Property';
  if (q.match(/civil|contract|agreement|lawsuit|sue|damages|injunction|decree/)) return 'Civil';
  // Extended domains mapped to closest specialization
  if (q.match(/cyber|hacking|online|internet|data breach|phishing|identity theft|it act/)) return 'Criminal';
  if (q.match(/employment|salary|wages|termination|workplace|gratuity|pf|labour/)) return 'Civil';
  if (q.match(/consumer|defective product|service complaint|refund/)) return 'Civil';
  if (q.match(/patent|copyright|trademark|infringement/)) return 'Corporate';
  if (q.match(/pollution|environment|waste|ngt/)) return 'Civil';
  if (q.match(/fundamental rights|constitution|article|writ|pil/)) return 'Civil';
  return null; // fallback
}

// Send message to AI
router.post('/', auth, async (req, res) => {
  try {
    const { message, chatId, outputLang } = req.body;
    const userId = req.user.userId;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (message.length > 5000) {
      return res.status(400).json({ error: 'Message too long' });
    }

    // Check if Gemini is configured
    if (!isGeminiConfigured) {
      return res.status(503).json({
        error: 'AI service is not configured. Please add GEMINI_API_KEY to .env file.'
      });
    }

    // Get user and check chat usage limits
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if daily reset is needed
    const today = new Date().setHours(0, 0, 0, 0);
    const lastResetDate = new Date(user.chatUsage.daily.date).setHours(0, 0, 0, 0);

    if (today > lastResetDate) {
      // Reset daily counters
      user.chatUsage.daily.date = new Date();
      user.chatUsage.daily.aiChatsUsed = 0;
      user.chatUsage.daily.lawyerChatsUsed = 0;
      console.log(`Daily chat limit reset for user ${user.email}`);
    }

    // Dynamically determine daily limit based on subscription plan
    const isGuestOrFree = user.isGuest || user.subscription?.paymentId === 'free_trial';
    const planId = user.subscription?.planId || '';
    let effectiveDailyLimit = 10; // free/guest default
    if (!isGuestOrFree) {
      if (planId === 'premium') effectiveDailyLimit = 500;
      else if (planId === 'standard') effectiveDailyLimit = 100;
      else if (planId === 'basic') effectiveDailyLimit = 50;
      else effectiveDailyLimit = 50; // fallback for paid users
    }

    // Check daily limits
    const dailyRemaining = effectiveDailyLimit - user.chatUsage.daily.aiChatsUsed;

    if (user.chatUsage.daily.aiChatsUsed >= effectiveDailyLimit) {
      // Extract domain from query for context-aware recommendations
      const domain = extractDomain(message);
      
      let queryOptions = { role: 'advocate', isVerified: true };
      if (domain) {
        queryOptions.specialization = { $in: [domain] };
      }

      // Suggest lawyers when limit is reached
      let suggestedLawyers = await User.find(queryOptions)
        .sort({ rating: -1 })
        .limit(5)
        .select('name email specialization experience rating consultationFee');

      // Fallback 1: if no domain-specific verified lawyers, get any verified lawyer
      if (suggestedLawyers.length === 0 && domain) {
        suggestedLawyers = await User.find({ role: 'advocate', isVerified: true })
          .sort({ rating: -1 })
          .limit(5)
          .select('name email specialization experience rating consultationFee');
      }

      // Fallback 2: if no verified lawyers at all, show all advocates
      if (suggestedLawyers.length === 0) {
        suggestedLawyers = await User.find({ role: 'advocate' })
          .sort({ rating: -1 })
          .limit(5)
          .select('name email specialization experience rating consultationFee');
      }

      return res.status(429).json({
        error: 'Daily AI chat limit reached',
        message: isGuestOrFree
          ? `You've used all ${effectiveDailyLimit} free AI chats for today. Upgrade for more chats, or connect with a lawyer!`
          : `You've reached your daily limit of ${effectiveDailyLimit} AI chats. Your limit resets tomorrow.`,
        resetTime: new Date(new Date().setHours(24, 0, 0, 0)),
        suggestedLawyers,
        freeTrialLimitReached: true,
        upgradeRequired: isGuestOrFree
      });
    }

    // Get or create chat
    let chat;
    if (chatId) {
      chat = await Chat.findById(chatId);
      if (!chat) {
        return res.status(404).json({ error: 'Chat not found' });
      }
      // make sure user owns this chat
      if (chat.userId.toString() !== userId) {
        return res.status(403).json({ error: 'Access denied' });
      }
    } else {
      chat = new Chat({
        userId,
        title: message.substring(0, 50) + (message.length > 50 ? '...' : ''),
        messages: []
      });
    }

    // --- RAG Pipeline: Search → Retrieve → Generate ---
    const normalizedMsg = normalizeQuery(message);
    let aiResponse;
    let relevantLaws = [];
    let sources = [];
    let isFromDatabase = false;

    // Check cache first
    // Only skip cache for true follow-ups that reference conversation context
    // (short messages like "what about punishment?" that need prior context)
    const hasHistory = chat.messages.length > 0;
    const looksLikeFollowUp = hasHistory && message.split(' ').length < 6 && /\b(what|how|and|also|that|this|its|it|above|previous|more|else)\b/i.test(message);
    let cachedEntry = null;

    if (!looksLikeFollowUp) {
      const cacheKey = outputLang === 'hi' ? normalizedMsg + '__hi' : normalizedMsg;
      cachedEntry = await ResponseCache.findOne({ normalizedQuery: cacheKey });
    }

    if (cachedEntry) {
      // Cache HIT — return the exact same response
      console.log(`Cache hit for: "${normalizedMsg}"`);
      aiResponse = cachedEntry.response;
      relevantLaws = cachedEntry.relevantLaws || [];
      sources = cachedEntry.sources || [];
      isFromDatabase = cachedEntry.isFromDatabase || false;
      cachedEntry.hitCount += 1;
      await cachedEntry.save();
    } else {
      // Cache MISS — run RAG pipeline
      console.log(`Searching legal database for: "${normalizedMsg}"...`);

      // STEP 1: RETRIEVE — search our verified legal database
      const retrievedSections = await searchLegalDatabase(normalizedMsg);
      isFromDatabase = retrievedSections.length > 0;

      // STEP 1.5: RETRIEVE — search court verdicts
      const retrievedVerdicts = await searchCourtVerdicts(message, retrievedSections);
      const hasVerdicts = retrievedVerdicts.length > 0;

      if (isFromDatabase || hasVerdicts) {
        console.log(`Found ${retrievedSections.length} section(s) + ${retrievedVerdicts.length} verdict(s)`);
        isFromDatabase = true;
        // Build sources for the response
        sources = [
          ...retrievedSections.map(s => ({
            type: 'section',
            act: s.act,
            actCode: s.actCode,
            section: s.sectionNumber,
            title: s.title
          })),
          ...retrievedVerdicts.map(v => ({
            type: 'verdict',
            caseName: v.caseName,
            year: v.year,
            court: v.court,
            citation: v.citation
          }))
        ];
      } else {
        console.log('No matches in database, using Gemini general knowledge');
      }

      // STEP 2: GENERATE — send retrieved text + verdicts + question to Gemini
      let fullPrompt = buildPrompt(message, retrievedSections, retrievedVerdicts || [], chat.messages);
      if (outputLang === 'hi') {
        fullPrompt += '\n\nIMPORTANT: Respond ENTIRELY in Hindi (Devanagari script). Keep legal terms, section numbers, act names, and case names in English but write all explanations in Hindi.';
      }
      aiResponse = await generateSimpleResponse(fullPrompt);
      console.log('Received AI response');

      // Extract relevant law sections from response
      const lawPattern = /(Section \d+[A-Z]?|Article \d+[A-Z]?|IPC \d+|CrPC \d+)/gi;
      const matches = aiResponse.match(lawPattern);
      if (matches) {
        const uniqueMatches = [...new Set(matches)];
        uniqueMatches.forEach(match => {
          relevantLaws.push({
            section: match,
            description: `Reference to ${match}`
          });
        });
      }

      // Store in cache for future identical questions (skip errors and empty queries)
      const isErrorResponse = aiResponse && (aiResponse.startsWith('API Error') || aiResponse.startsWith('I apologize'));
      if (!looksLikeFollowUp && normalizedMsg.length > 0 && !isErrorResponse) {
        const cacheKey = outputLang === 'hi' ? normalizedMsg + '__hi' : normalizedMsg;
        try {
          await ResponseCache.create({
            normalizedQuery: cacheKey,
            originalQuery: message,
            response: aiResponse,
            relevantLaws,
            sources,
            isFromDatabase
          });
          console.log(`Cached response for: "${normalizedMsg}"`);
        } catch (cacheErr) {
          if (cacheErr.code !== 11000) {
            console.error('Cache save error:', cacheErr);
          }
        }
      }
    }

    // Save messages to chat
    chat.messages.push({
      role: 'user',
      content: message,
      timestamp: new Date()
    });

    chat.messages.push({
      role: 'model',
      content: aiResponse,
      timestamp: new Date(),
      relevantLaws,
      sources,
      isFromDatabase
    });

    chat.updatedAt = new Date();
    await chat.save();

    // Increment usage counters
    await User.findByIdAndUpdate(userId, { $inc: { 'chatUsage.daily.aiChatsUsed': 1 } });

    // Calculate remaining requests
    const remaining = effectiveDailyLimit - user.chatUsage.daily.aiChatsUsed;
    const isFreeTrial = user.subscription.paymentId === 'free_trial';

    res.json({
      chatId: chat._id,
      response: aiResponse,
      relevantLaws,
      sources,
      isFromDatabase,
      timestamp: new Date(),
      usage: {
        remaining,
        isFreeTrial,
        resetTime: isFreeTrial ? null : new Date(new Date().setHours(24, 0, 0, 0))
      }
    });
  } catch (error) {
    console.error('Chat error:', error);

    // Handle specific Gemini API errors
    if (error.message && error.message.includes('API key')) {
      return res.status(401).json({ error: 'Invalid API key. Please check your GEMINI_API_KEY.' });
    }

    res.status(500).json({
      error: 'Failed to process message. Please try again.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get chat history
router.get('/history/:userId', auth, async (req, res) => {
  try {
    // only allow users to see their own history
    if (req.params.userId !== req.user.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const chats = await Chat.find({ userId: req.params.userId })
      .sort({ updatedAt: -1 })
      .select('_id title createdAt updatedAt isLawyerChat lawyerId');

    res.json(chats);
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
});

// Get specific chat
router.get('/:chatId', auth, async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId);
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    // check ownership
    if (chat.userId.toString() !== req.user.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(chat);
  } catch (error) {
    console.error('Error fetching chat:', error);
    res.status(500).json({ error: 'Failed to fetch chat' });
  }
});

module.exports = router;
