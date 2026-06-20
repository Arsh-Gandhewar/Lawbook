// Master seed script — runs all seed scripts in sequence
// Run with: node server/seedAll.js

require('dotenv').config();
const { execSync } = require('child_process');
const path = require('path');

const seedScripts = [
  // Core criminal & constitutional law
  'seedLegalData.js',       // IPC, Constitution, BNS, CrPC
  'seedBNSS.js',            // Bharatiya Nagarik Suraksha Sanhita
  'seedNDPS.js',            // Narcotics Act

  // Family & personal law
  'seedFamilyLaw.js',       // Hindu Marriage, DV Act, Dowry, Succession
  'seedPersonalLaw.js',     // Special Marriage, Muslim, Christian, Parsi, Adoption, Guardians, Child Marriage

  // Traffic & cyber
  'seedTrafficRules.js',    // Motor Vehicles Act
  'seedCyberLaws.js',       // IT Act

  // Consumer & property
  'seedConsumerLaw.js',     // Consumer Protection Act
  'seedPropertyLaw.js',     // Transfer of Property, RERA

  // Contract & commercial
  'seedContractLaw.js',     // Indian Contract, Sale of Goods, Partnership, Specific Relief, Limitation

  // Corporate & business
  'seedCorporateLaw.js',    // Companies Act, IBC, Competition Act, LLP

  // Tax
  'seedTaxLaw.js',          // Income Tax, GST, Stamp Act

  // Intellectual property
  'seedIPLaw.js',           // Copyright, Trademarks, Patents

  // Labour
  'seedLabourLaw.js',       // Minimum Wages, Gratuity, PF, Industrial Disputes

  // Women & children
  'seedPOCSO.js',           // POCSO Act
  'seedJJAct.js',           // Juvenile Justice Act
  'seedWomenChildLaw.js',   // POSH, Maternity, ITPA, MTP, Child Labour

  // National security
  'seedNationalSecurity.js', // UAPA, FEMA, PMLA, NIA, AFSPA

  // Procedure & evidence
  'seedProcedureLaw.js',    // Evidence Act, CPC, Registration Act, Contempt

  // Other specialized
  'seedRTI.js',             // Right to Information Act
  'seedNIAct.js',           // Negotiable Instruments Act
  'seedSCSTAct.js',         // SC/ST Atrocities Act
  'seedAntiCorruption.js',  // Prevention of Corruption Act
  'seedEnvironment.js',     // Environment, Water, Air Pollution Acts
  'seedBankingLaw.js',      // SARFAESI, DRT

  // Miscellaneous
  'seedMiscLaw.js',         // Arms, Wildlife, Food Safety, NGT, Senior Citizens, Mental Health, RTE, Legal Aid, etc.

  // Additional laws
  'seedAdditionalLaws.js',  // Arbitration, Advocates, Benami, Land Acquisition, Electricity, Drugs, Official Secrets, Easements, Factories

  // Court verdicts (run last)
  'seedVerdicts.js',                  // 49 landmark judgments (original)
  'seedVerdictsConstitutional.js',    // 40 constitutional law verdicts
  'seedVerdictsCriminal.js',          // 40 criminal law verdicts
  'seedVerdictsCivilFamily.js',       // 40 civil & family law verdicts
  'seedVerdictsPropertyCommercial.js', // 35 property, corporate, tax, IP verdicts
  'seedVerdictsRightsLabour.js',      // 35 human rights, labour, environment, consumer verdicts
];

console.log('============================================================');
console.log('LAWBOOK - MASTER SEED SCRIPT');
console.log('============================================================');
console.log(`${seedScripts.length} seed scripts to run\n`);

let passed = 0;
let failed = 0;
const errors = [];

for (const script of seedScripts) {
  const scriptPath = path.join(__dirname, script);
  const fs = require('fs');

  if (!fs.existsSync(scriptPath)) {
    console.log(`SKIPPED: ${script} (file not found)`);
    continue;
  }

  try {
    console.log(`\nRunning: ${script}...`);
    execSync(`node "${scriptPath}"`, {
      stdio: 'inherit',
      timeout: 60000,
      env: { ...process.env }
    });
    passed++;
    console.log(`PASSED: ${script}`);
  } catch (error) {
    failed++;
    errors.push(script);
    console.error(`FAILED: ${script} - ${error.message}`);
  }
}

console.log('\n============================================================');
console.log('SEED SUMMARY');
console.log('============================================================');
console.log(`   Passed: ${passed}`);
console.log(`   Failed: ${failed}`);
if (errors.length > 0) {
  console.log(`   Failed scripts: ${errors.join(', ')}`);
}
console.log('============================================================\n');

process.exit(failed > 0 ? 1 : 0);
