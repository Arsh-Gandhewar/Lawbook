// Seed script to add POCSO Act sections to the legal database
// Run with: node server/seedPOCSO.js

require('dotenv').config();
const mongoose = require('mongoose');
const LegalSection = require('./models/LegalSection');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lawbook';

const pocsoSections = [
  // ═══════════════════════════════════════════════════════════════════
  // Protection of Children from Sexual Offences Act, 2012
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'Protection of Children from Sexual Offences Act, 2012',
    actCode: 'POCSO',
    sectionNumber: '3',
    title: 'Penetrative sexual assault',
    legalText: 'A person is said to commit "penetrative sexual assault" if— (a) he penetrates his penis, to any extent, into the vagina, mouth, urethra or anus of a child or makes the child to do so with him or any other person; or (b) he inserts, to any extent, any object or a part of the body, not being the penis, into the vagina, the urethra or anus of the child or makes the child to do so with him or any other person; or (c) he manipulates any part of the body of the child so as to cause penetration into the vagina, urethra, anus or any part of body of the child or makes the child to do so with him or any other person; or (d) he applies his mouth to the penis, vagina, anus, urethra of the child or makes the child to do so to such person or any other person.',
    explanation: 'This section defines what constitutes penetrative sexual assault against a child (person below 18 years). It covers various forms of sexual penetration committed on a child. Any such act, regardless of the extent of penetration, is a serious criminal offence.',
    punishment: '',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['POCSO', 'penetrative sexual assault', 'child sexual abuse', 'child rape', 'minor abuse'],
    relatedSections: [
      { sectionNumber: '4', actCode: 'POCSO', title: 'Punishment for penetrative sexual assault' },
      { sectionNumber: '5', actCode: 'POCSO', title: 'Aggravated penetrative sexual assault' }
    ]
  },
  {
    act: 'Protection of Children from Sexual Offences Act, 2012',
    actCode: 'POCSO',
    sectionNumber: '4',
    title: 'Punishment for penetrative sexual assault',
    legalText: 'Whoever commits penetrative sexual assault shall be punished with imprisonment of either description for a term which shall not be less than seven years but which may extend to imprisonment for life, and shall also be liable to fine. Provided that in case of penetrative sexual assault committed against a child below the age of sixteen years, the punishment shall not be less than twenty years but which may extend to imprisonment for life, which shall mean imprisonment for the remainder of natural life of that person, and shall also be liable to fine.',
    explanation: 'The punishment for penetrative sexual assault on a child: For child aged 16-18 years: minimum 7 years, up to life imprisonment, plus fine. For child below 16 years: minimum 20 years, up to imprisonment for the remainder of natural life, plus fine. The 2019 amendment increased the minimum punishment for children below 16.',
    punishment: 'Child 16-18 years: Minimum 7 years to life imprisonment + fine. Child below 16 years: Minimum 20 years to life imprisonment + fine.',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['POCSO punishment', 'child rape punishment', 'penetrative assault punishment', 'POCSO Section 4'],
    relatedSections: [
      { sectionNumber: '3', actCode: 'POCSO', title: 'Penetrative sexual assault' },
      { sectionNumber: '5', actCode: 'POCSO', title: 'Aggravated penetrative sexual assault' }
    ]
  },
  {
    act: 'Protection of Children from Sexual Offences Act, 2012',
    actCode: 'POCSO',
    sectionNumber: '5',
    title: 'Aggravated penetrative sexual assault',
    legalText: 'Whoever, being a police officer, commits penetrative sexual assault on a child— (i) within the limits of the police station or premises at which he is appointed; or (ii) in the premises of any station house, whether or not situated in the police station, to which he is appointed; or (iii) in the course of his duties or otherwise; or (iv) where he is known as, or identified as, a police officer; or (b) whoever being a member of the armed forces or security forces commits penetrative sexual assault on a child; or (c) whoever being a public servant commits penetrative sexual assault on a child; or (d) whoever being on the management or on the staff of a jail, remand home, protection home, observation home, or other place of custody or care and protection commits penetrative sexual assault on a child; or (n) whoever commits penetrative sexual assault on a child below twelve years — shall be guilty of aggravated penetrative sexual assault.',
    explanation: 'Aggravated penetrative sexual assault includes cases where the offender is a police officer, armed forces member, public servant, hospital/school staff, or a relative/guardian of the child; where the child is below 12 years; where the assault results in grievous hurt, pregnancy, or disease; or where the child is mentally or physically disabled. The aggravated form carries a higher punishment.',
    punishment: 'Minimum 20 years rigorous imprisonment, extendable to life imprisonment (remainder of natural life), or death penalty + fine (as per 2019 Amendment)',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['aggravated POCSO', 'aggravated penetrative assault', 'POCSO death penalty', 'child below 12', 'public servant child abuse'],
    relatedSections: [
      { sectionNumber: '4', actCode: 'POCSO', title: 'Punishment for penetrative sexual assault' },
      { sectionNumber: '6', actCode: 'POCSO', title: 'Punishment for aggravated penetrative sexual assault' }
    ]
  },
  {
    act: 'Protection of Children from Sexual Offences Act, 2012',
    actCode: 'POCSO',
    sectionNumber: '7',
    title: 'Sexual assault',
    legalText: 'Whoever, with sexual intent touches the vagina, penis, anus or breast of the child or makes the child touch the vagina, penis, anus or breast of such person or any other person, or does any other act with sexual intent which involves physical contact without penetration is said to commit sexual assault.',
    explanation: 'Sexual assault (non-penetrative) under POCSO means touching a child\'s private parts with sexual intent, or making a child touch someone\'s private parts. Any physical contact with sexual intent that does not involve penetration falls under this section. This is distinct from penetrative sexual assault under Section 3.',
    punishment: 'Imprisonment of either description for a term not less than 3 years, extendable up to 5 years, and fine',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['sexual assault child', 'molestation child', 'POCSO sexual assault', 'inappropriate touching child', 'child molestation'],
    relatedSections: [
      { sectionNumber: '3', actCode: 'POCSO', title: 'Penetrative sexual assault' },
      { sectionNumber: '9', actCode: 'POCSO', title: 'Aggravated sexual assault' }
    ]
  },
  {
    act: 'Protection of Children from Sexual Offences Act, 2012',
    actCode: 'POCSO',
    sectionNumber: '9',
    title: 'Aggravated sexual assault',
    legalText: 'Whoever, being a police officer, commits sexual assault on a child— (a)(i) within the limits of the police station or premises at which he is appointed; or (ii) in the premises of any station house; or (iii) in the course of his duties or otherwise; or (b) whoever being a member of the armed forces or security forces commits sexual assault on a child; or (c) whoever being a public servant commits sexual assault on a child; or (d) whoever being on the management or on the staff of a jail, remand home, protection home, observation home, or other place of custody commits sexual assault on a child; or (l) whoever commits sexual assault on a child below twelve years — shall be guilty of aggravated sexual assault.',
    explanation: 'Aggravated sexual assault is a more serious form of sexual assault (non-penetrative) committed by persons in positions of trust (police, armed forces, public servants, institution staff, relatives) or on children below 12 years. It carries higher punishment than ordinary sexual assault.',
    punishment: 'Imprisonment of either description for a term not less than 5 years, extendable up to 7 years, and fine',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['aggravated sexual assault', 'POCSO aggravated', 'child below 12 assault', 'trust position assault'],
    relatedSections: [
      { sectionNumber: '7', actCode: 'POCSO', title: 'Sexual assault' },
      { sectionNumber: '10', actCode: 'POCSO', title: 'Punishment for aggravated sexual assault' }
    ]
  },
  {
    act: 'Protection of Children from Sexual Offences Act, 2012',
    actCode: 'POCSO',
    sectionNumber: '11',
    title: 'Sexual harassment of child',
    legalText: 'A person is said to commit sexual harassment upon a child when such person with sexual intent,— (i) utters any word or makes any sound, or makes any gesture or exhibits any object or part of body with the intention that such word or sound shall be heard, or such gesture or object or part of body shall be seen by the child; or (ii) makes a child exhibit his body or any part of his body so as it is seen by such person or any other person; or (iii) shows any object to a child in any form or media for pornographic purposes; or (iv) repeatedly or constantly follows or watches or contacts a child either directly or through electronic, digital or any other means; or (v) threatens to use, in any form of media, a real or fabricated depiction through electronic, film or digital or any other mode, of any part of the body of the child; or (vi) entices a child for pornographic purposes or gives gratification therefor.',
    explanation: 'Sexual harassment of a child includes: making sexual sounds/gestures/showing objects to a child; making a child exhibit their body; showing pornography to a child; stalking or constantly following a child; threatening to use images of a child; or enticing a child for pornographic purposes. This covers non-contact sexual offences against children.',
    punishment: 'Imprisonment of either description which may extend to 3 years and fine',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'Yes',
    keywords: ['child harassment', 'POCSO harassment', 'child pornography', 'stalking child', 'sexual harassment minor', 'online harassment child'],
    relatedSections: [
      { sectionNumber: '7', actCode: 'POCSO', title: 'Sexual assault' },
      { sectionNumber: '14', actCode: 'POCSO', title: 'Punishment for using child for pornographic purposes' }
    ]
  },
  {
    act: 'Protection of Children from Sexual Offences Act, 2012',
    actCode: 'POCSO',
    sectionNumber: '19',
    title: 'Reporting of offences',
    legalText: 'Notwithstanding anything contained in the Code of Criminal Procedure, 1973, any person (including the child), who has apprehension that an offence under this Act is likely to be committed or has knowledge that such an offence has been committed, he shall provide such information to— (a) the Special Juvenile Police Unit; or (b) the local police. Every report given under sub-section (1) shall be— (a) ascribed an entry number and recorded in writing; (b) be read over to the informant; (c) shall be entered in a book to be kept by the Police Unit.',
    explanation: 'Anyone who knows or suspects that a child sexual offence has been committed or is likely to be committed MUST report it to the police or Special Juvenile Police Unit. The police must record the report in writing, give it an entry number, and read it back to the informant. This is a mandatory reporting obligation — failure to report is itself a punishable offence under Section 21.',
    punishment: '',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'Yes',
    keywords: ['POCSO reporting', 'mandatory reporting', 'child abuse reporting', 'FIR child abuse', 'report child sexual offence'],
    relatedSections: [
      { sectionNumber: '21', actCode: 'POCSO', title: 'Punishment for failure to report' }
    ]
  },
  {
    act: 'Protection of Children from Sexual Offences Act, 2012',
    actCode: 'POCSO',
    sectionNumber: '21',
    title: 'Punishment for failure to report or record offence',
    legalText: 'Any person, who fails to report the commission of an offence under sub-section (1) of section 19 or section 20 or who fails to record such offence under sub-section (2) of section 19 shall be punished with imprisonment of either description which may extend to six months or with fine or with both. Any person, being in-charge of any company or an institution (by whatever name called) who fails to report the commission of an offence under sub-section (1) of section 19 in respect of a subordinate under his control, shall be punished with imprisonment for a term which may extend to one year and with fine.',
    explanation: 'If any person fails to report a known POCSO offence, they face up to 6 months imprisonment or fine or both. If the person is in charge of a company or institution and fails to report an offence committed by a subordinate, the punishment is up to 1 year imprisonment with fine. This ensures mandatory reporting compliance.',
    punishment: 'General failure to report: imprisonment up to 6 months or fine or both. Institutional head failure: imprisonment up to 1 year with fine',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'Yes',
    keywords: ['failure to report', 'mandatory reporting penalty', 'POCSO Section 21', 'not reporting child abuse'],
    relatedSections: [
      { sectionNumber: '19', actCode: 'POCSO', title: 'Reporting of offences' }
    ]
  }
];

async function seedPOCSO() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const existing = await LegalSection.countDocuments({ actCode: 'POCSO' });
    if (existing > 0) {
      console.log(`🗑️  Removing ${existing} existing POCSO sections...`);
      await LegalSection.deleteMany({ actCode: 'POCSO' });
    }

    console.log(`\n📚 Seeding ${pocsoSections.length} POCSO sections...\n`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📖 Protection of Children from Sexual Offences Act, 2012');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    for (const section of pocsoSections) {
      await LegalSection.create(section);
      console.log(`   ✅ POCSO Section ${section.sectionNumber} — ${section.title}`);
    }

    const totalAll = await LegalSection.countDocuments();
    console.log(`\n═══════════════════════════════════════════`);
    console.log(`🎉 POCSO ACT SEEDING COMPLETE`);
    console.log(`═══════════════════════════════════════════`);
    console.log(`   POCSO sections added: ${pocsoSections.length}`);
    console.log(`   Total DB sections:    ${totalAll}`);
    console.log(`═══════════════════════════════════════════\n`);

  } catch (error) {
    console.error('❌ Error seeding POCSO Act:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB.');
    process.exit(0);
  }
}

seedPOCSO();
