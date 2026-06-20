// Seed script to add Environmental Law sections to the legal database
// Run with: node server/seedEnvironment.js

require('dotenv').config();
const mongoose = require('mongoose');
const LegalSection = require('./models/LegalSection');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lawbook';

const environmentSections = [
  // ═══════════════════════════════════════════════════════════════════
  // Environment (Protection) Act, 1986
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'Environment (Protection) Act, 1986',
    actCode: 'EPA',
    sectionNumber: '3',
    title: 'Power of Central Government to take measures to protect and improve environment',
    legalText: '(1) Subject to the provisions of this Act, the Central Government shall have the power to take all such measures as it deems necessary or expedient for the purpose of protecting and improving the quality of the environment and preventing, controlling and abating environmental pollution. (2) In particular, and without prejudice to the generality of the provisions of sub-section (1), such measures may include measures with respect to all or any of the following matters, namely:— (i) co-ordination of actions by the State Governments, officers and other authorities— (a) under this Act, or the rules made thereunder; or (b) under any other law for the time being in force which is relatable to the objects of this Act; (ii) planning and execution of a nation-wide programme for the prevention, control and abatement of environmental pollution; (iii) laying down standards for the quality of environment in its various aspects; (iv) laying down standards for emission or discharge of environmental pollutants from various sources, and the areas in which any industries, operations or processes or class of industries, operations or processes shall not be carried out or shall be carried out subject to certain safeguards; (v) laying down procedures and safeguards for the prevention of accidents which may cause environmental pollution and remedial measures for such accidents; (vi) laying down procedures and safeguards for the handling of hazardous substances; (vii) examination of such manufacturing processes, materials and substances as are likely to cause environmental pollution; (viii) carrying out and sponsoring investigations and research relating to problems of environmental pollution; (ix) inspection of any premises, plant, equipment, machinery, manufacturing or other processes, materials or substances and giving, by order, of directions to such authorities, officers or persons as it may consider necessary to take steps for the prevention, control and abatement of environmental pollution; (x) establishment or recognition of environmental laboratories and institutes to carry out the functions entrusted to such environmental laboratories and institutes under this Act; (xi) collection and dissemination of information in respect of matters relating to environmental pollution; (xii) preparation of manuals, codes or guides relating to the prevention, control and abatement of environmental pollution.',
    explanation: 'This is the foundational empowering provision of the Environment Protection Act. It grants the Central Government sweeping powers to take any measures necessary to protect and improve the environment. These powers include setting pollution standards, restricting industrial activities in certain areas, handling hazardous substances, coordinating with state governments, establishing environmental laboratories, and conducting research. This section serves as the legal basis for numerous environmental regulations, rules and notifications issued by the Ministry of Environment, including EIA notifications, Coastal Regulation Zone rules, and various emission standards.',
    punishment: 'N/A (empowering provision)',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['environment protection', 'central government', 'environmental measures', 'pollution control', 'environmental standards', 'emission standards', 'hazardous substances', 'environmental policy'],
    relatedSections: [
      { sectionNumber: '7', actCode: 'EPA', title: 'Persons carrying on industry not to allow emission in excess of standards' },
      { sectionNumber: '15', actCode: 'EPA', title: 'Penalty for contravention of the provisions of the Act' },
      { sectionNumber: '17', actCode: 'EPA', title: 'Offences by companies' }
    ]
  },
  {
    act: 'Environment (Protection) Act, 1986',
    actCode: 'EPA',
    sectionNumber: '7',
    title: 'Persons carrying on industry, operation, etc., not to allow emission or discharge of environmental pollutants in excess of the standards',
    legalText: 'No person carrying on any industry, operation or process shall discharge or emit or permit to be discharged or emitted any environmental pollutant in excess of such standards as may be prescribed.',
    explanation: 'This section prohibits any person engaged in industrial activities from emitting or discharging pollutants beyond the prescribed standards. The standards are set by the Central Government under the Environment (Protection) Rules, 1986 and various notifications. These include standards for air emissions, water effluent discharge, noise levels, and hazardous waste. Industries must obtain Consent to Operate from the State Pollution Control Board and comply with all prescribed limits. Violation of this section is punishable under Section 15 of the Act.',
    punishment: 'Punishable under Section 15: Imprisonment up to 5 years, or fine up to ₹1,00,000, or both. Continuing offence: additional fine up to ₹5,000 per day',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'Yes',
    keywords: ['emission standards', 'discharge', 'pollutants', 'environmental standards', 'industrial pollution', 'effluent discharge', 'air emission', 'pollution limits', 'consent to operate'],
    relatedSections: [
      { sectionNumber: '3', actCode: 'EPA', title: 'Power of Central Government to take measures to protect and improve environment' },
      { sectionNumber: '15', actCode: 'EPA', title: 'Penalty for contravention of the provisions of the Act' },
      { sectionNumber: '24', actCode: 'WPA', title: 'Prohibition on use of stream or well for disposal of polluting matter' }
    ]
  },
  {
    act: 'Environment (Protection) Act, 1986',
    actCode: 'EPA',
    sectionNumber: '15',
    title: 'Penalty for contravention of the provisions of the Act',
    legalText: '(1) Whoever fails to comply with or contravenes any of the provisions of this Act, or the rules made or orders or directions issued thereunder, shall, in respect of each such failure or contravention, be punishable with imprisonment for a term which may extend to five years or with fine which may extend to one lakh rupees, or with both, and in case the failure or contravention continues, with additional fine which may extend to five thousand rupees for every day during which such failure or contravention continues after the conviction for the first such failure or contravention. (2) If the failure or contravention referred to in sub-section (1) continues beyond a period of one year after the date of conviction, the offender shall be punishable with imprisonment for a term which may extend to seven years.',
    explanation: 'This is the penal provision of the Environment Protection Act. It prescribes punishment for any violation of the Act, its rules, orders or directions. First-time offenders face up to 5 years imprisonment and/or ₹1 lakh fine. For continuing offences (violations that persist after initial conviction), an additional fine of up to ₹5,000 per day is imposed. If the violation continues beyond one year after conviction, the imprisonment term increases to up to 7 years. This provision applies to violations of emission standards (Section 7), handling of hazardous substances, non-compliance with environmental clearance conditions, and any other breach of the Act.',
    punishment: 'Imprisonment up to 5 years, or fine up to ₹1,00,000, or both. Continuing offence: additional fine up to ₹5,000 per day. If contravention continues beyond 1 year after conviction: imprisonment up to 7 years',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'Yes',
    keywords: ['environmental penalty', 'pollution penalty', 'environmental fine', 'EPA violation', 'environmental offence', 'pollution punishment', 'continuing offence'],
    relatedSections: [
      { sectionNumber: '7', actCode: 'EPA', title: 'Persons carrying on industry not to allow emission in excess of standards' },
      { sectionNumber: '17', actCode: 'EPA', title: 'Offences by companies' },
      { sectionNumber: '43', actCode: 'WPA', title: 'Penalty for contravention of provisions of Section 24' }
    ]
  },
  {
    act: 'Environment (Protection) Act, 1986',
    actCode: 'EPA',
    sectionNumber: '17',
    title: 'Offences by companies',
    legalText: '(1) Where any offence under this Act has been committed by a company, every person who, at the time the offence was committed, was directly in charge of, and was responsible to, the company for the conduct of the business of the company, as well as the company, shall be deemed to be guilty of the offence and shall be liable to be proceeded against and punished accordingly: Provided that nothing contained in this sub-section shall render any such person liable to any punishment provided in this Act, if he proves that the offence was committed without his knowledge or that he exercised all due diligence to prevent the commission of such offence. (2) Notwithstanding anything contained in sub-section (1), where an offence under this Act has been committed by a company and it is proved that the offence has been committed with the consent or connivance of, or is attributable to any neglect on the part of, any director, manager, secretary or other officer of the company, such director, manager, secretary or other officer shall also be deemed to be guilty of that offence and shall be liable to be proceeded against and punished accordingly.',
    explanation: 'This section establishes corporate criminal liability for environmental offences. When a company commits an environmental offence, two categories of people can be held personally liable: (1) Every person who was directly in charge of and responsible for the company\'s business at the time of the offence — they are deemed guilty unless they prove the offence was committed without their knowledge or that they exercised due diligence to prevent it. (2) Any director, manager, secretary or officer whose consent, connivance or negligence led to the offence — they are also deemed guilty. This ensures that corporate executives and decision-makers cannot hide behind the corporate veil to escape liability for pollution and environmental damage.',
    punishment: 'Same as Section 15 — applicable to officers in charge and responsible persons. Imprisonment up to 5 years, or fine up to ₹1,00,000, or both',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'Yes',
    keywords: ['company offence', 'corporate liability', 'director liability', 'company pollution', 'corporate environmental crime', 'officer liability', 'due diligence defence'],
    relatedSections: [
      { sectionNumber: '15', actCode: 'EPA', title: 'Penalty for contravention of the provisions of the Act' },
      { sectionNumber: '7', actCode: 'EPA', title: 'Persons carrying on industry not to allow emission in excess of standards' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // Water (Prevention and Control of Pollution) Act, 1974
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'Water (Prevention and Control of Pollution) Act, 1974',
    actCode: 'WPA',
    sectionNumber: '24',
    title: 'Prohibition on use of stream or well for disposal of polluting matter',
    legalText: '(1) Subject to the provisions of this section,— (a) no person shall knowingly cause or permit any poisonous, noxious or polluting matter determined in accordance with such standards as may be laid down by the State Board to enter (whether directly or indirectly) into any stream or well or sewer or on land; or (b) no person shall knowingly cause or permit to enter into any stream any other matter which may tend, either directly or in combination with similar matters, to impede the proper flow of the water of the stream in a manner leading or likely to lead to a substantial aggravation of pollution due to other causes or of its consequences. (2) A person shall not be guilty of an offence under sub-section (1), by reason only of having done or caused to be done any of the following acts, namely:— (a) constructing, improving or maintaining in or across or on the bank or bed of any stream any building, bridge, weir, dam, sluice, dock, pier, drain or sewer or other permanent works which he has a right to construct, improve or maintain; (b) depositing any materials on the bank or in the bed of any stream for the purpose of reclamation or for preventing erosion or damage to any bank or bed of such stream; (c) putting into any stream any matter for the purpose of improving the flow of water in such stream in the interests of navigation, water supply or drainage or for the purposes of maintenance or improvement of such stream.',
    explanation: 'This is the key prohibitory provision of the Water Pollution Act. It makes it illegal to knowingly cause or allow any poisonous, noxious or polluting matter to enter any stream, well, sewer or land. It also prohibits dumping any matter that would obstruct the flow of a stream and worsen pollution. However, certain activities are exempted: construction of bridges, dams and similar structures; depositing material for preventing erosion; and improving water flow for navigation or water supply purposes. The pollution standards are determined by the State Pollution Control Board. Any industrial unit discharging effluents must obtain Consent to Operate under Section 25/26 of this Act.',
    punishment: 'Punishable under Section 43: Imprisonment not less than 1 year 6 months, which may extend to 6 years, and fine',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'Yes',
    keywords: ['water pollution', 'stream pollution', 'waste disposal', 'polluting matter', 'water contamination', 'river pollution', 'effluent discharge', 'industrial effluent', 'water body pollution', 'noxious matter'],
    relatedSections: [
      { sectionNumber: '43', actCode: 'WPA', title: 'Penalty for contravention of provisions of Section 24' },
      { sectionNumber: '7', actCode: 'EPA', title: 'Persons carrying on industry not to allow emission in excess of standards' },
      { sectionNumber: '21', actCode: 'APA', title: 'Restrictions on use of certain industrial plants' }
    ]
  },
  {
    act: 'Water (Prevention and Control of Pollution) Act, 1974',
    actCode: 'WPA',
    sectionNumber: '43',
    title: 'Penalty for contravention of provisions of Section 24',
    legalText: 'Whoever contravenes the provisions of section 24 shall be punishable with imprisonment for a term which shall not be less than one year and six months but which may extend to six years and with fine: Provided that if the failure or contravention continues beyond a period of one year after the date of conviction, the offender shall be punishable with imprisonment for a term which shall not be less than two years but which may extend to seven years and with fine.',
    explanation: 'This section prescribes the punishment for violating Section 24 (polluting water bodies). The minimum sentence is 1 year 6 months imprisonment, which can extend up to 6 years, along with a fine. This is a significant penalty reflecting the seriousness of water pollution. If the violation continues for more than one year after conviction, the punishment increases to a minimum of 2 years and maximum of 7 years. The mandatory minimum imprisonment provision means the court cannot impose only a fine — imprisonment is mandatory, though it can be suspended in certain cases.',
    punishment: 'Imprisonment not less than 1 year 6 months, which may extend to 6 years, and fine. Continuing offence beyond 1 year after conviction: imprisonment of 2-7 years and fine',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'Yes',
    keywords: ['water pollution penalty', 'pollution fine', 'water act punishment', 'effluent penalty', 'water contamination penalty', 'environmental imprisonment'],
    relatedSections: [
      { sectionNumber: '24', actCode: 'WPA', title: 'Prohibition on use of stream or well for disposal of polluting matter' },
      { sectionNumber: '15', actCode: 'EPA', title: 'Penalty for contravention of the provisions of the Act' },
      { sectionNumber: '37', actCode: 'APA', title: 'Penalty for contravention of provisions of Section 21' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // Air (Prevention and Control of Pollution) Act, 1981
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'Air (Prevention and Control of Pollution) Act, 1981',
    actCode: 'APA',
    sectionNumber: '21',
    title: 'Restrictions on use of certain industrial plants',
    legalText: '(1) Subject to the provisions of this section, no person shall, without the previous consent of the State Board, establish or operate any industrial plant in an air pollution control area: Provided that a person operating any industrial plant in any air pollution control area immediately before the commencement of section 9 of the Air (Prevention and Control of Pollution) Amendment Act, 1987, for which no consent under this section was necessary prior to such commencement, may continue to do so for a period of three months from such commencement or, if he has made an application for such consent within the said period of three months, till the disposal of such application. (2) An application for consent of the State Board under sub-section (1) shall be accompanied by such fees as may be prescribed and shall be made in the prescribed form and shall contain the particulars of the industrial plant and such other particulars as may be prescribed. (3) The State Board may make such inquiry as it may deem fit in respect of the application for consent referred to in sub-section (1) and in making any such inquiry, shall follow such procedure as may be prescribed. (4) The State Board may— (a) grant its consent to the applicant subject to such conditions and for such period as may be specified in the order, and any such order of consent shall require that the industrial plant to which the consent relates shall not emit any air pollutant in excess of the standards laid down by the State Board under clause (g) of sub-section (1) of section 17; (b) refuse consent to the applicant and any order of refusal of consent shall be accompanied by reasons for the refusal.',
    explanation: 'This section requires all industrial plants in designated "air pollution control areas" to obtain prior consent (Consent to Establish and Consent to Operate) from the State Pollution Control Board before establishment or operation. The consent is granted subject to conditions, including compliance with emission standards set by the Board. The Board can also refuse consent with recorded reasons. Industries already operating before the 1987 amendment were given a 3-month window to apply for consent. Operating without consent or violating consent conditions is punishable under Section 37. This is the primary regulatory mechanism for controlling industrial air pollution in India.',
    punishment: 'Punishable under Section 37: Imprisonment not less than 1 year 6 months, which may extend to 6 years, and fine',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'Yes',
    keywords: ['air pollution', 'industrial plant', 'emission', 'air pollution control area', 'consent to operate', 'consent to establish', 'State Pollution Control Board', 'SPCB', 'industrial emission'],
    relatedSections: [
      { sectionNumber: '37', actCode: 'APA', title: 'Penalty for contravention of provisions of Section 21' },
      { sectionNumber: '7', actCode: 'EPA', title: 'Persons carrying on industry not to allow emission in excess of standards' },
      { sectionNumber: '24', actCode: 'WPA', title: 'Prohibition on use of stream or well for disposal of polluting matter' }
    ]
  },
  {
    act: 'Air (Prevention and Control of Pollution) Act, 1981',
    actCode: 'APA',
    sectionNumber: '37',
    title: 'Penalty for contravention of certain provisions of the Act',
    legalText: '(1) Whoever fails to comply with the provisions of section 21 or section 22 or directions issued under section 31A, shall, in respect of each such failure, be punishable with imprisonment for a term which shall not be less than one year and six months but which may extend to six years and with fine, and in case the failure continues, with an additional fine which may extend to five thousand rupees for every day during which such failure continues after the conviction for the first such failure. (2) If the failure referred to in sub-section (1) continues beyond a period of one year after the date of conviction, the offender shall be punishable with imprisonment for a term which shall not be less than two years but which may extend to seven years and with fine.',
    explanation: 'This section prescribes punishment for violating the Air Act, particularly Section 21 (operating without consent or exceeding emission standards) and Section 22 (not complying with Board directions). The minimum sentence is 1 year 6 months imprisonment, extendable to 6 years, with fine. For continuing violations, an additional fine of up to ₹5,000 per day is imposed after the first conviction. If the violation persists beyond one year after conviction, the minimum sentence increases to 2 years (maximum 7 years). Like the Water Act, the mandatory minimum imprisonment ensures that air pollution offences are treated seriously by the courts.',
    punishment: 'Imprisonment not less than 1 year 6 months, which may extend to 6 years, and fine. Continuing offence: additional fine up to ₹5,000 per day. Beyond 1 year after conviction: imprisonment of 2-7 years and fine',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'Yes',
    keywords: ['air pollution penalty', 'emission penalty', 'air act punishment', 'pollution fine', 'industrial air pollution', 'air quality violation', 'SPCB penalty'],
    relatedSections: [
      { sectionNumber: '21', actCode: 'APA', title: 'Restrictions on use of certain industrial plants' },
      { sectionNumber: '43', actCode: 'WPA', title: 'Penalty for contravention of provisions of Section 24' },
      { sectionNumber: '15', actCode: 'EPA', title: 'Penalty for contravention of the provisions of the Act' }
    ]
  }
];

async function seedEnvironment() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Clear existing sections for all environmental act codes
    const actCodes = ['EPA', 'WPA', 'APA'];
    for (const code of actCodes) {
      const existing = await LegalSection.countDocuments({ actCode: code });
      if (existing > 0) {
        console.log(`🗑️  Removing ${existing} existing ${code} sections...`);
        await LegalSection.deleteMany({ actCode: code });
      }
    }

    console.log(`\n📚 Seeding ${environmentSections.length} environmental law sections...\n`);

    // Group and log by act
    const acts = [...new Set(environmentSections.map(s => s.act))];
    for (const act of acts) {
      const actSections = environmentSections.filter(s => s.act === act);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`📖 ${act}`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      for (const section of actSections) {
        await LegalSection.create(section);
        console.log(`   ✅ ${section.actCode} Section ${section.sectionNumber} — ${section.title}`);
      }
      console.log('');
    }

    const totalEnv = environmentSections.length;
    const totalAll = await LegalSection.countDocuments();

    console.log(`═══════════════════════════════════════════`);
    console.log(`🎉 ENVIRONMENTAL LAW SEEDING COMPLETE`);
    console.log(`═══════════════════════════════════════════`);
    console.log(`   Environment sections added: ${totalEnv}`);
    console.log(`   Total DB sections:          ${totalAll}`);
    console.log(`═══════════════════════════════════════════\n`);

  } catch (error) {
    console.error('❌ Error seeding environmental sections:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB.');
    process.exit(0);
  }
}

seedEnvironment();
