// Seed script to add NDPS Act sections to the legal database
// Run with: node server/seedNDPS.js

require('dotenv').config();
const mongoose = require('mongoose');
const LegalSection = require('./models/LegalSection');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lawbook';

const ndpsSections = [
  // ═══════════════════════════════════════════════════════════════════
  // Narcotic Drugs and Psychotropic Substances Act, 1985
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'Narcotic Drugs and Psychotropic Substances Act, 1985',
    actCode: 'NDPS',
    sectionNumber: '8',
    title: 'Prohibition of certain operations',
    legalText: 'No person shall— (a) cultivate any coca plant or gather any portion of coca plant; or (b) cultivate the opium poppy or any cannabis plant; or (c) produce, manufacture, possess, sell, purchase, transport, warehouse, use, consume, import inter-State, export inter-State, import into India, export from India or tranship any narcotic drug or psychotropic substance, except for medical or scientific purposes and in the manner and to the extent provided by the provisions of this Act or the rules or orders made thereunder and in a case where any such provision imposes any requirement by way of licence, permit or authorisation also in accordance with the terms and conditions of such licence, permit or authorisation.',
    explanation: 'This section is the cornerstone of the NDPS Act. It completely prohibits all dealings with narcotic drugs and psychotropic substances — including growing, making, keeping, selling, buying, transporting, storing, using, or consuming them — unless done for medical or scientific purposes with a valid licence or permit from the government. Any violation of this section triggers the punishment provisions under Sections 15 to 25.',
    punishment: 'Punishments for contravention are prescribed under Sections 15 to 25 depending on the substance and quantity involved',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['prohibition', 'narcotic drugs', 'psychotropic substances', 'cannabis', 'opium', 'coca', 'production', 'manufacture', 'possession', 'sale', 'transport', 'NDPS', 'drug trafficking'],
    relatedSections: [
      { sectionNumber: '15', actCode: 'NDPS', title: 'Punishment for contravention in relation to poppy straw' },
      { sectionNumber: '20', actCode: 'NDPS', title: 'Punishment for contravention in relation to cannabis plant and cannabis' },
      { sectionNumber: '21', actCode: 'NDPS', title: 'Punishment for contravention in relation to manufactured drugs' },
      { sectionNumber: '22', actCode: 'NDPS', title: 'Punishment for contravention in relation to psychotropic substances' }
    ]
  },
  {
    act: 'Narcotic Drugs and Psychotropic Substances Act, 1985',
    actCode: 'NDPS',
    sectionNumber: '15',
    title: 'Punishment for contravention in relation to poppy straw',
    legalText: 'Whoever, in contravention of any provision of this Act or any rule or order made or condition of licence granted thereunder, produces, manufactures, possesses, sells, purchases, transports, imports inter-State, exports inter-State or uses poppy straw, shall be punishable,— (a) where the contravention involves small quantity, with rigorous imprisonment for a term which may extend to one year, or with fine which may extend to ten thousand rupees, or with both; (b) where the contravention involves quantity, lesser than commercial quantity but greater than small quantity, with rigorous imprisonment for a term which may extend to ten years, and with fine which may extend to one lakh rupees; (c) where the contravention involves commercial quantity, with rigorous imprisonment for a term which shall not be less than ten years but which may extend to twenty years, and shall also be liable to fine which shall not be less than one lakh rupees but which may extend to two lakh rupees: Provided that the court may, for reasons to be recorded in the judgment, impose a fine exceeding two lakh rupees.',
    explanation: 'This section prescribes a graded punishment system for illegal dealings with poppy straw (the parts of the opium poppy plant remaining after the latex has been removed). The severity of punishment depends on the quantity: small quantity attracts lighter punishment (up to 1 year jail or ₹10,000 fine), intermediate quantity attracts medium punishment (up to 10 years and ₹1 lakh fine), and commercial quantity attracts the harshest punishment (10-20 years imprisonment with ₹1-2 lakh fine).',
    punishment: 'Small quantity: Rigorous imprisonment up to 1 year, or fine up to ₹10,000, or both. Quantity greater than small but less than commercial: Up to 10 years and fine up to ₹1,00,000. Commercial quantity: Rigorous imprisonment of 10-20 years and fine of ₹1,00,000-₹2,00,000',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['poppy straw', 'opium poppy', 'poppy husk', 'doda', 'punishment', 'drug penalty', 'small quantity', 'commercial quantity'],
    relatedSections: [
      { sectionNumber: '8', actCode: 'NDPS', title: 'Prohibition of certain operations' },
      { sectionNumber: '37', actCode: 'NDPS', title: 'Offences to be cognizable and non-bailable' },
      { sectionNumber: '27', actCode: 'NDPS', title: 'Punishment for consumption of any narcotic drug or psychotropic substance' }
    ]
  },
  {
    act: 'Narcotic Drugs and Psychotropic Substances Act, 1985',
    actCode: 'NDPS',
    sectionNumber: '20',
    title: 'Punishment for contravention in relation to cannabis plant and cannabis',
    legalText: 'Whoever, in contravention of any provision of this Act or any rule or order made or condition of licence granted thereunder,— (a) cultivates any cannabis plant; or (b) produces, manufactures, possesses, sells, purchases, transports, imports inter-State, exports inter-State or uses cannabis, shall be punishable,— (i) where the contravention involves small quantity, with rigorous imprisonment for a term which may extend to one year, or with fine which may extend to ten thousand rupees, or with both; (ii) where the contravention involves quantity, lesser than commercial quantity but greater than small quantity, with rigorous imprisonment for a term which may extend to ten years, and with fine which may extend to one lakh rupees; (iii) where the contravention involves commercial quantity, with rigorous imprisonment for a term which shall not be less than ten years but which may extend to twenty years, and shall also be liable to fine which shall not be less than one lakh rupees but which may extend to two lakh rupees: Provided that the court may, for reasons to be recorded in the judgment, impose a fine exceeding two lakh rupees.',
    explanation: 'This section punishes illegal cultivation of cannabis plants and all illegal dealings with cannabis (ganja, charas/hashish). Cannabis is defined under Section 2(iii) to include charas (resin), ganja (flowering/fruiting tops), and any mixture/drink prepared therefrom, but excludes seeds and leaves when not accompanied by tops. The punishment follows the same three-tier structure based on quantity as other NDPS offences.',
    punishment: 'Small quantity: Rigorous imprisonment up to 1 year, or fine up to ₹10,000, or both. Quantity greater than small but less than commercial: Up to 10 years and fine up to ₹1,00,000. Commercial quantity: Rigorous imprisonment of 10-20 years and fine of ₹1,00,000-₹2,00,000',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['cannabis', 'ganja', 'marijuana', 'charas', 'hashish', 'hemp', 'bhang', 'weed', 'cannabis cultivation', 'drug possession'],
    relatedSections: [
      { sectionNumber: '8', actCode: 'NDPS', title: 'Prohibition of certain operations' },
      { sectionNumber: '27', actCode: 'NDPS', title: 'Punishment for consumption of any narcotic drug or psychotropic substance' },
      { sectionNumber: '37', actCode: 'NDPS', title: 'Offences to be cognizable and non-bailable' }
    ]
  },
  {
    act: 'Narcotic Drugs and Psychotropic Substances Act, 1985',
    actCode: 'NDPS',
    sectionNumber: '21',
    title: 'Punishment for contravention in relation to manufactured drugs',
    legalText: 'Whoever, in contravention of any provision of this Act or any rule or order made or condition of licence granted thereunder, manufactures, possesses, sells, purchases, transports, imports inter-State, exports inter-State or uses any manufactured drug or any preparation containing any manufactured drug shall be punishable,— (a) where the contravention involves small quantity, with rigorous imprisonment for a term which may extend to one year, or with fine which may extend to ten thousand rupees, or with both; (b) where the contravention involves quantity, lesser than commercial quantity but greater than small quantity, with rigorous imprisonment for a term which may extend to ten years, and with fine which may extend to one lakh rupees; (c) where the contravention involves commercial quantity, with rigorous imprisonment for a term which shall not be less than ten years but which may extend to twenty years, and shall also be liable to fine which shall not be less than one lakh rupees but which may extend to two lakh rupees: Provided that the court may, for reasons to be recorded in the judgment, impose a fine exceeding two lakh rupees.',
    explanation: 'This section deals with manufactured drugs such as heroin (diacetylmorphine), cocaine, morphine, codeine, methadone, and other processed narcotic drugs. "Manufactured drug" is defined under Section 2(xi) and includes all coca derivatives, medicinal opium, and any narcotic substance that has undergone processing. The same three-tier punishment system applies: small quantity, intermediate, and commercial quantity.',
    punishment: 'Small quantity: Rigorous imprisonment up to 1 year, or fine up to ₹10,000, or both. Intermediate quantity: Up to 10 years and fine up to ₹1,00,000. Commercial quantity: Rigorous imprisonment of 10-20 years and fine of ₹1,00,000-₹2,00,000',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['manufactured drugs', 'heroin', 'cocaine', 'morphine', 'codeine', 'smack', 'brown sugar', 'drug manufacturing', 'drug trafficking'],
    relatedSections: [
      { sectionNumber: '8', actCode: 'NDPS', title: 'Prohibition of certain operations' },
      { sectionNumber: '22', actCode: 'NDPS', title: 'Punishment for contravention in relation to psychotropic substances' },
      { sectionNumber: '27A', actCode: 'NDPS', title: 'Punishment for financing illicit traffic and harbouring offenders' }
    ]
  },
  {
    act: 'Narcotic Drugs and Psychotropic Substances Act, 1985',
    actCode: 'NDPS',
    sectionNumber: '22',
    title: 'Punishment for contravention in relation to psychotropic substances',
    legalText: 'Whoever, in contravention of any provision of this Act or any rule or order made or condition of licence granted thereunder, manufactures, possesses, sells, purchases, transports, imports inter-State, exports inter-State or uses any psychotropic substance shall be punishable,— (a) where the contravention involves small quantity, with rigorous imprisonment for a term which may extend to one year, or with fine which may extend to ten thousand rupees, or with both; (b) where the contravention involves quantity, lesser than commercial quantity but greater than small quantity, with rigorous imprisonment for a term which may extend to ten years, and with fine which may extend to one lakh rupees; (c) where the contravention involves commercial quantity, with rigorous imprisonment for a term which shall not be less than ten years but which may extend to twenty years, and shall also be liable to fine which shall not be less than one lakh rupees but which may extend to two lakh rupees: Provided that the court may, for reasons to be recorded in the judgment, impose a fine exceeding two lakh rupees.',
    explanation: 'Psychotropic substances include synthetic drugs like amphetamines, methamphetamine, LSD, MDMA (ecstasy), benzodiazepines (when used illegally), ketamine, and other substances listed in the Schedule to the NDPS Act. The punishment structure mirrors other NDPS offences with a three-tier system based on quantity. The list of psychotropic substances is periodically updated by the Central Government through notifications.',
    punishment: 'Small quantity: Rigorous imprisonment up to 1 year, or fine up to ₹10,000, or both. Intermediate quantity: Up to 10 years and fine up to ₹1,00,000. Commercial quantity: Rigorous imprisonment of 10-20 years and fine of ₹1,00,000-₹2,00,000',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['psychotropic substances', 'amphetamine', 'methamphetamine', 'LSD', 'MDMA', 'ecstasy', 'ketamine', 'synthetic drugs', 'party drugs'],
    relatedSections: [
      { sectionNumber: '8', actCode: 'NDPS', title: 'Prohibition of certain operations' },
      { sectionNumber: '21', actCode: 'NDPS', title: 'Punishment for contravention in relation to manufactured drugs' },
      { sectionNumber: '37', actCode: 'NDPS', title: 'Offences to be cognizable and non-bailable' }
    ]
  },
  {
    act: 'Narcotic Drugs and Psychotropic Substances Act, 1985',
    actCode: 'NDPS',
    sectionNumber: '27',
    title: 'Punishment for consumption of any narcotic drug or psychotropic substance',
    legalText: 'Whoever consumes any narcotic drug or psychotropic substance shall be punishable,— (a) where the narcotic drug or psychotropic substance consumed is cocaine, morphine, diacetyl-morphine or any other narcotic drug or any psychotropic substance as may be specified in this behalf by the Central Government by notification in the Official Gazette, with imprisonment for a term which may extend to one year, or with fine which may extend to twenty thousand rupees, or with both; and (b) where the narcotic drug or psychotropic substance consumed is other than those referred to in clause (a), with imprisonment for a term which may extend to six months, or with fine which may extend to ten thousand rupees, or with both: Provided that nothing in this section shall apply to the consumption of any narcotic drug or psychotropic substance by any person where the drug is prescribed by a registered medical practitioner.',
    explanation: 'This section specifically punishes personal consumption of drugs. It distinguishes between harder drugs (cocaine, morphine, heroin) which carry a penalty of up to 1 year or ₹20,000 fine, and other substances like cannabis which carry up to 6 months or ₹10,000 fine. Importantly, drug use prescribed by a registered doctor is exempt. Under Section 64A, an addict who volunteers for treatment may be given immunity from prosecution for consumption.',
    punishment: 'Cocaine/morphine/heroin: Imprisonment up to 1 year, or fine up to ₹20,000, or both. Other substances: Imprisonment up to 6 months, or fine up to ₹10,000, or both',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'Yes',
    keywords: ['drug consumption', 'drug use', 'personal use', 'drug addict', 'substance abuse', 'cocaine use', 'heroin consumption', 'cannabis use', 'intoxication'],
    relatedSections: [
      { sectionNumber: '8', actCode: 'NDPS', title: 'Prohibition of certain operations' },
      { sectionNumber: '20', actCode: 'NDPS', title: 'Punishment for contravention in relation to cannabis plant and cannabis' },
      { sectionNumber: '37', actCode: 'NDPS', title: 'Offences to be cognizable and non-bailable' }
    ]
  },
  {
    act: 'Narcotic Drugs and Psychotropic Substances Act, 1985',
    actCode: 'NDPS',
    sectionNumber: '27A',
    title: 'Punishment for financing illicit traffic and harbouring offenders',
    legalText: 'Whoever indulges in financing, directly or indirectly, any of the activities mentioned in sub-clauses (i) to (v) of clause (viiia) of section 2 or harbours any person engaged in any of the aforementioned activities, shall be punishable with rigorous imprisonment for a term which shall not be less than ten years but which may extend to twenty years, and shall also be liable to fine which shall not be less than one lakh rupees but which may extend to two lakh rupees: Provided that the court may, for reasons to be recorded in the judgment, impose a fine exceeding two lakh rupees.',
    explanation: 'This section targets the financiers and facilitators of the drug trade — those who fund drug trafficking operations or provide shelter to drug traffickers. It carries the same punishment as commercial-quantity trafficking (10-20 years rigorous imprisonment). The term "illicit traffic" under Section 2(viiia) covers cultivation, production, manufacture, possession, sale, purchase, transportation, warehousing, concealment, use, consumption, import/export of narcotic drugs or psychotropic substances in contravention of the Act.',
    punishment: 'Rigorous imprisonment of not less than 10 years, which may extend to 20 years, and fine which shall not be less than ₹1,00,000 and may extend to ₹2,00,000. Court may impose fine exceeding ₹2,00,000 for reasons recorded in judgment',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['drug financing', 'narcotics trafficking', 'harbouring', 'drug money', 'illicit traffic', 'drug trade funding', 'drug network', 'narco financing'],
    relatedSections: [
      { sectionNumber: '8', actCode: 'NDPS', title: 'Prohibition of certain operations' },
      { sectionNumber: '21', actCode: 'NDPS', title: 'Punishment for contravention in relation to manufactured drugs' },
      { sectionNumber: '37', actCode: 'NDPS', title: 'Offences to be cognizable and non-bailable' }
    ]
  },
  {
    act: 'Narcotic Drugs and Psychotropic Substances Act, 1985',
    actCode: 'NDPS',
    sectionNumber: '37',
    title: 'Offences to be cognizable and non-bailable',
    legalText: '(1) Notwithstanding anything contained in the Code of Criminal Procedure, 1973 (2 of 1974),— (a) every offence punishable under this Act shall be cognizable; (b) no person accused of an offence punishable for a term of imprisonment of five years or more under this Act shall be released on bail or on his own bond unless— (i) the Public Prosecutor has been given an opportunity to oppose the application for such release, and (ii) where the Public Prosecutor opposes the application, the court is satisfied that there are reasonable grounds for believing that he is not guilty of such offence and that he is not likely to commit any offence while on bail. (2) The limitations on granting of bail specified in clause (b) of sub-section (1) are in addition to the limitations under the Code of Criminal Procedure, 1973 (2 of 1974) or any other law for the time being in force on granting of bail.',
    explanation: 'This is one of the most critical sections of the NDPS Act. It imposes twin conditions for bail: the court must be satisfied (1) that there are reasonable grounds to believe the accused is NOT guilty, and (2) that the accused is NOT likely to commit any offence while on bail. Both conditions must be met. This effectively reverses the normal bail presumption, making it extremely difficult to obtain bail in serious NDPS cases. The Supreme Court in Union of India v. Ram Samujh (1999) held that these conditions are mandatory and must be complied with.',
    punishment: 'N/A (procedural provision regarding bail restrictions)',
    category: 'Criminal',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['bail', 'bail restriction', 'NDPS bail', 'cognizable', 'non-bailable', 'drug bail', 'twin conditions', 'bail conditions', 'drug offence bail'],
    relatedSections: [
      { sectionNumber: '8', actCode: 'NDPS', title: 'Prohibition of certain operations' },
      { sectionNumber: '15', actCode: 'NDPS', title: 'Punishment for contravention in relation to poppy straw' },
      { sectionNumber: '20', actCode: 'NDPS', title: 'Punishment for contravention in relation to cannabis plant and cannabis' },
      { sectionNumber: '27A', actCode: 'NDPS', title: 'Punishment for financing illicit traffic and harbouring offenders' }
    ]
  }
];

async function seedNDPS() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const existing = await LegalSection.countDocuments({ actCode: 'NDPS' });
    if (existing > 0) {
      console.log(`🗑️  Removing ${existing} existing NDPS sections...`);
      await LegalSection.deleteMany({ actCode: 'NDPS' });
    }

    console.log(`📚 Seeding ${ndpsSections.length} NDPS sections...\n`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📖 Narcotic Drugs and Psychotropic Substances Act, 1985');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    for (const section of ndpsSections) {
      await LegalSection.create(section);
      console.log(`   ✅ NDPS Section ${section.sectionNumber} — ${section.title}`);
    }

    const totalNDPS = ndpsSections.length;
    const totalAll = await LegalSection.countDocuments();

    console.log(`\n═══════════════════════════════════════════`);
    console.log(`🎉 NDPS ACT SEEDING COMPLETE`);
    console.log(`═══════════════════════════════════════════`);
    console.log(`   NDPS sections added:  ${totalNDPS}`);
    console.log(`   Total DB sections:    ${totalAll}`);
    console.log(`═══════════════════════════════════════════\n`);

  } catch (error) {
    console.error('❌ Error seeding NDPS sections:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB.');
    process.exit(0);
  }
}

seedNDPS();
