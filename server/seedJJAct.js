// Seed script to add Juvenile Justice Act sections to the legal database
// Run with: node server/seedJJAct.js

require('dotenv').config();
const mongoose = require('mongoose');
const LegalSection = require('./models/LegalSection');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lawbook';

const jjaSections = [
  // ═══════════════════════════════════════════════════════════════════
  // Juvenile Justice (Care and Protection of Children) Act, 2015
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'Juvenile Justice (Care and Protection of Children) Act, 2015',
    actCode: 'JJA',
    sectionNumber: '2(12)',
    title: 'Child in conflict with law',
    legalText: '"child in conflict with law" means a child who is alleged or found to have committed an offence and who has not completed eighteen years of age on the date of commission of such offence.',
    explanation: 'A "child in conflict with law" is any person below 18 years of age who is accused of committing a crime. The age is determined as on the date the offence was committed, not the date of arrest or trial. Such children are dealt with under the Juvenile Justice system, not the regular criminal justice system, with focus on rehabilitation rather than punishment.',
    punishment: '',
    category: 'Criminal',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['juvenile', 'child in conflict with law', 'minor offender', 'below 18', 'juvenile delinquent', 'child crime'],
    relatedSections: [
      { sectionNumber: '2(35)', actCode: 'JJA', title: 'Heinous offences' },
      { sectionNumber: '15', actCode: 'JJA', title: 'Preliminary assessment for heinous offences' }
    ]
  },
  {
    act: 'Juvenile Justice (Care and Protection of Children) Act, 2015',
    actCode: 'JJA',
    sectionNumber: '2(35)',
    title: 'Heinous offences',
    legalText: '"heinous offences" includes the offences for which the minimum punishment under the Indian Penal Code (45 of 1860) or any other law for the time being in force is imprisonment for seven years or more.',
    explanation: 'Heinous offences are defined as crimes that carry a minimum punishment of 7 years or more under the IPC or any other law. This classification is crucial because children aged 16-18 who commit heinous offences may be tried as adults after a preliminary assessment by the Juvenile Justice Board. Examples include murder, rape, and dacoity.',
    punishment: '',
    category: 'Criminal',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['heinous offence', 'serious crime juvenile', 'minimum 7 years', 'juvenile heinous', 'child murder', 'child crime serious'],
    relatedSections: [
      { sectionNumber: '2(12)', actCode: 'JJA', title: 'Child in conflict with law' },
      { sectionNumber: '15', actCode: 'JJA', title: 'Preliminary assessment for heinous offences' }
    ]
  },
  {
    act: 'Juvenile Justice (Care and Protection of Children) Act, 2015',
    actCode: 'JJA',
    sectionNumber: '15',
    title: 'Preliminary assessment of heinous offences by Board',
    legalText: 'In case of a heinous offence alleged to have been committed by a child, who has completed or is above the age of sixteen years, the Board shall conduct a preliminary assessment with regard to his mental and physical capacity to commit such offence, ability to understand the consequences of the offence and the circumstances in which he allegedly committed the offence, and may pass an order in accordance with the provisions of sub-section (3) of section 18. For the purposes of the preliminary assessment, the Board may take the assistance of experienced psychologists or psycho-social workers or other experts. The preliminary assessment under this section shall be disposed of by the Board within a period of three months from the date of first production of the child before the Board.',
    explanation: 'When a child aged 16-18 is accused of a heinous offence (punishment of 7+ years), the Juvenile Justice Board must assess whether the child had the mental and physical capacity to commit the offence and understand its consequences. The Board can take help from psychologists. Based on this assessment (within 3 months), the Board may decide to either handle the case itself or transfer it to a Children\'s Court for trial as an adult. This provision was introduced after the 2012 Delhi gang rape case.',
    punishment: '',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['preliminary assessment', 'juvenile heinous offence', 'child 16 years', 'JJB assessment', 'mental capacity', 'try as adult'],
    relatedSections: [
      { sectionNumber: '2(35)', actCode: 'JJA', title: 'Heinous offences' },
      { sectionNumber: '18', actCode: 'JJA', title: 'Orders by JJB' },
      { sectionNumber: '19', actCode: 'JJA', title: 'Powers of Children\'s Court' }
    ]
  },
  {
    act: 'Juvenile Justice (Care and Protection of Children) Act, 2015',
    actCode: 'JJA',
    sectionNumber: '18',
    title: 'Orders regarding child found to have committed an offence',
    legalText: 'Where a Board is satisfied on inquiry that a child irrespective of age has committed a petty offence, or a serious offence, or a child below the age of sixteen years has committed a heinous offence, then, notwithstanding anything contrary contained in any other law for the time being in force, and based on the nature of offence, specific need for supervision or intervention, circumstances as brought out in the social investigation report and past conduct of the child, the Board may, if it so thinks fit,— (a) allow the child to go home after advice or admonition by following appropriate inquiry and counselling to such child and to his parents or the guardian; (b) direct the child to participate in group counselling and similar activities; (c) order the child to perform community service under the supervision of an organisation; (d) order the child or parents or the guardian of the child to pay fine; (e) direct the child to be released on probation of good conduct and placed under the care of any parent, guardian or fit person, on such parent, guardian or fit person executing a bond; (f) direct the child to be released on probation of good conduct and placed under the care and supervision of any fit facility; (g) direct the child to be sent to a special home, for such period, not exceeding three years.',
    explanation: 'The JJB can pass various orders for a child found guilty of an offence: advice/admonition, group counselling, community service, fine, probation under parent/guardian, probation under fit facility, or sending to a special home (maximum 3 years). For children below 16 who commit heinous offences, the maximum period in a special home is 3 years. No child can be sentenced to jail. The focus is always on reformation and rehabilitation.',
    punishment: 'Maximum: Placement in special home for up to 3 years. No imprisonment in regular jail.',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['JJB order', 'juvenile punishment', 'special home', 'probation child', 'reformation juvenile', 'child offender order'],
    relatedSections: [
      { sectionNumber: '15', actCode: 'JJA', title: 'Preliminary assessment for heinous offences' },
      { sectionNumber: '19', actCode: 'JJA', title: 'Powers of Children\'s Court' }
    ]
  },
  {
    act: 'Juvenile Justice (Care and Protection of Children) Act, 2015',
    actCode: 'JJA',
    sectionNumber: '19',
    title: 'Powers of Children\'s Court',
    legalText: 'Where the Board after preliminary assessment under section 15 pass an order that there is a need for trial of the said child as an adult, then the Board may order transfer of the trial of the case to the Children\'s Court having jurisdiction to try such offences. The Children\'s Court shall ensure that the final order, with regard to a child in conflict with law, shall include an individual care plan for the rehabilitation of such child, including follow up by the probation officer or the District Child Protection Unit or a social worker. The Children\'s Court shall ensure that the child who has been found to be in conflict with law, is sent to a place of safety till he attains the age of twenty-one years and thereafter, the person shall be transferred to a jail.',
    explanation: 'When the JJB determines that a child aged 16-18 should be tried as an adult for a heinous offence, the case is transferred to a Children\'s Court (not a regular court). Even if found guilty, the child is kept in a "place of safety" (not jail) until age 21. After age 21, they may be transferred to jail for the remaining sentence. The court must also prepare a rehabilitation plan. This balances the need for accountability with the child\'s right to reformation.',
    punishment: 'Place of safety until age 21; thereafter transfer to jail for remaining sentence if any',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['children\'s court', 'trial as adult', 'place of safety', 'juvenile transfer', 'child tried as adult', '21 years'],
    relatedSections: [
      { sectionNumber: '15', actCode: 'JJA', title: 'Preliminary assessment for heinous offences' },
      { sectionNumber: '18', actCode: 'JJA', title: 'Orders by JJB' }
    ]
  },
  {
    act: 'Juvenile Justice (Care and Protection of Children) Act, 2015',
    actCode: 'JJA',
    sectionNumber: '75',
    title: 'Punishment for cruelty to child',
    legalText: 'Whoever, having the actual charge of, or control over, a child, assaults, abandons, abuses, exposes or wilfully neglects the child or causes or procures the child to be assaulted, abandoned, abused, exposed or neglected in a manner likely to cause such child unnecessary mental or physical suffering, shall be punishable with imprisonment for a term which may extend to three years or with fine of one lakh rupees or with both. If such act results in death of the child, the person shall be punished with imprisonment for a term which may extend to ten years and shall also be liable to fine of five lakh rupees.',
    explanation: 'Any person having custody or control of a child who assaults, abandons, abuses, or neglects the child causing mental or physical suffering faces up to 3 years imprisonment and ₹1 lakh fine. If the cruelty results in the child\'s death, the punishment increases to up to 10 years imprisonment and ₹5 lakh fine. This covers parents, guardians, teachers, institutional staff, and anyone responsible for the child\'s care.',
    punishment: 'Cruelty: Imprisonment up to 3 years or fine up to ₹1 lakh or both. If death results: Imprisonment up to 10 years and fine of ₹5 lakh',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['child cruelty', 'child abuse', 'child neglect', 'child assault', 'child abandonment', 'corporal punishment'],
    relatedSections: [
      { sectionNumber: '2(12)', actCode: 'JJA', title: 'Child in conflict with law' }
    ]
  }
];

async function seedJJAct() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const existing = await LegalSection.countDocuments({ actCode: 'JJA' });
    if (existing > 0) {
      console.log(`🗑️  Removing ${existing} existing JJ Act sections...`);
      await LegalSection.deleteMany({ actCode: 'JJA' });
    }

    console.log(`\n📚 Seeding ${jjaSections.length} JJ Act sections...\n`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📖 Juvenile Justice (Care and Protection of Children) Act, 2015');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    for (const section of jjaSections) {
      await LegalSection.create(section);
      console.log(`   ✅ JJA Section ${section.sectionNumber} — ${section.title}`);
    }

    const totalAll = await LegalSection.countDocuments();
    console.log(`\n═══════════════════════════════════════════`);
    console.log(`🎉 JUVENILE JUSTICE ACT SEEDING COMPLETE`);
    console.log(`═══════════════════════════════════════════`);
    console.log(`   JJA sections added:   ${jjaSections.length}`);
    console.log(`   Total DB sections:    ${totalAll}`);
    console.log(`═══════════════════════════════════════════\n`);

  } catch (error) {
    console.error('❌ Error seeding JJ Act:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB.');
    process.exit(0);
  }
}

seedJJAct();
