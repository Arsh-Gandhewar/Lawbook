require('dotenv').config();
const mongoose = require('mongoose');
const LegalSection = require('./models/LegalSection');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lawbook';

const sections = [
  // UAPA, 1967
  {
    act: 'Unlawful Activities (Prevention) Act, 1967', actCode: 'UAPA', sectionNumber: '15', title: 'Terrorist act',
    legalText: 'Whoever does any act with intent to threaten or likely to threaten the unity, integrity, security, economic security, or sovereignty of India or with intent to strike terror or likely to strike terror in the people or any section of the people in India or in any foreign country, by using bombs, dynamite or other explosive substances or inflammable substances or firearms or other lethal weapons or poisonous or noxious gases or other chemicals or by any other substances (whether biological, radioactive, nuclear or otherwise) of a hazardous nature or by any other means of whatever nature to cause or likely to cause — (a) death of, or injuries to, any person or persons; or (b) loss of, or damage to, or destruction of, property; or (c) disruption of any supplies or services essential to the life of the community in India or in any foreign country; or (d) damage to, the monetary stability of India by way of production or smuggling or circulation of high quality counterfeit Indian paper currency, coins or of any other material; or (e) damage or destruction of any property in India or in a foreign country used or intended to be used for the defence of India or in connection with any other purposes of the Government of India, any State Government or any of their agencies, commits a terrorist act.',
    explanation: 'Any act using weapons, explosives, biological agents or other means to threaten India\'s unity/integrity, strike terror, cause death/injury, destroy property, disrupt essential services, or damage monetary stability is a terrorist act under UAPA.',
    punishment: 'Death penalty or imprisonment for life (Section 16)', category: 'Criminal', cognizable: 'Yes', bailable: 'No',
    keywords: ['terrorist', 'UAPA', 'terrorism', 'national security', 'bomb', 'explosive']
  },
  {
    act: 'Unlawful Activities (Prevention) Act, 1967', actCode: 'UAPA', sectionNumber: '16', title: 'Punishment for terrorist act',
    legalText: 'Whoever commits a terrorist act shall — (a) if such act has resulted in the death of any person, be punishable with death or imprisonment for life, and shall also be liable to fine; (b) in any other case, be punishable with imprisonment for a term which shall not be less than five years but which may extend to imprisonment for life, and shall also be liable to fine.',
    explanation: 'If a terrorist act causes death, the punishment is death penalty or life imprisonment. In other cases, minimum 5 years up to life imprisonment, plus fine.',
    punishment: 'Death or life imprisonment if death caused; 5 years to life imprisonment otherwise + fine', category: 'Criminal', cognizable: 'Yes', bailable: 'No',
    keywords: ['terrorist act', 'punishment', 'death penalty', 'life imprisonment', 'UAPA']
  },
  {
    act: 'Unlawful Activities (Prevention) Act, 1967', actCode: 'UAPA', sectionNumber: '43D', title: 'Modified application of certain provisions of Code of Criminal Procedure',
    legalText: 'Notwithstanding anything in the Code, no person accused of an offence punishable under Chapters IV and VI of this Act shall, if in custody, be released on bail or on his own bond unless the Public Prosecutor has been given an opportunity of being heard on the application for such release and where the Public Prosecutor opposes the application, the court is satisfied that there are reasonable grounds for believing that the accusation against such person is prima facie true. The investigation shall be completed within 90 days (extendable to 180 days).',
    explanation: 'UAPA makes getting bail extremely difficult — the court must be satisfied that the accusation is "prima facie true" (i.e., the accused must prove innocence). This reverses the normal bail presumption. Investigation can take up to 180 days.',
    punishment: 'N/A', category: 'Criminal', cognizable: 'Yes', bailable: 'No',
    keywords: ['UAPA bail', 'prima facie', 'no bail', 'anti-terrorism', 'custody', '180 days']
  },

  // FEMA, 1999
  {
    act: 'Foreign Exchange Management Act, 1999', actCode: 'FEMA', sectionNumber: '3', title: 'Dealing in foreign exchange',
    legalText: 'Save as otherwise provided in this Act, rules or regulations made thereunder, or with the general or special permission of the Reserve Bank, no person shall — (a) deal in or transfer any foreign exchange or foreign security to any person not being an authorised person; (b) make any payment to or for the credit of any person resident outside India in any manner; (c) receive otherwise than through an authorised person, any payment by order or on behalf of any person resident outside India in any manner.',
    explanation: 'No one can deal in foreign exchange, make payments to non-residents, or receive foreign payments except through authorized dealers (banks) or with RBI permission. Violations are civil offenses under FEMA (unlike criminal offenses under the old FERA).',
    punishment: 'Penalty up to thrice the sum involved (Section 13)', category: 'Civil', cognizable: 'N/A', bailable: 'N/A',
    keywords: ['foreign exchange', 'FEMA', 'forex', 'RBI', 'authorized dealer', 'remittance']
  },
  {
    act: 'Foreign Exchange Management Act, 1999', actCode: 'FEMA', sectionNumber: '13', title: 'Penalties',
    legalText: 'If any person contravenes any provision of this Act, or contravenes any rule, regulation, notification, direction or order issued in exercise of the powers under this Act, or contravenes any condition subject to which an authorisation is issued by the Reserve Bank, he shall, upon adjudication, be liable to a penalty up to thrice the sum involved in such contravention where such amount is quantifiable, or up to two lakh rupees where the amount is not directly quantifiable, and where such contravention is a continuing one, further penalty which may extend to five thousand rupees for every day after the first day during which the contravention continues.',
    explanation: 'FEMA violations attract civil penalties up to 3x the amount involved. If the amount cannot be quantified, penalty is up to Rs 2 lakhs. Continuing violations add Rs 5,000/day.',
    punishment: 'Penalty up to 3x the sum involved or Rs 2,00,000 + Rs 5,000/day for continuing contravention', category: 'Civil', cognizable: 'N/A', bailable: 'N/A',
    keywords: ['FEMA penalty', 'foreign exchange', 'contravention', 'fine', 'RBI']
  },

  // PMLA, 2002
  {
    act: 'Prevention of Money Laundering Act, 2002', actCode: 'PMLA', sectionNumber: '3', title: 'Offence of money-laundering',
    legalText: 'Whosoever directly or indirectly attempts to indulge or knowingly assists or knowingly is a party or is actually involved in any process or activity connected with the proceeds of crime including its concealment, possession, acquisition or use and projecting or claiming it as untainted property shall be guilty of offence of money-laundering.',
    explanation: 'Anyone who conceals, possesses, acquires, or uses proceeds of crime (money obtained from criminal activity) and tries to show it as legitimate income is guilty of money laundering.',
    punishment: 'Rigorous imprisonment 3 to 7 years + fine (Section 4)', category: 'Criminal', cognizable: 'Yes', bailable: 'No',
    keywords: ['money laundering', 'PMLA', 'proceeds of crime', 'concealment', 'hawala']
  },
  {
    act: 'Prevention of Money Laundering Act, 2002', actCode: 'PMLA', sectionNumber: '4', title: 'Punishment for money-laundering',
    legalText: 'Whoever commits the offence of money-laundering shall be punishable with rigorous imprisonment for a term which shall not be less than three years but which may extend to seven years and shall also be liable to fine. Where the proceeds of crime involved in money-laundering relates to any offence specified under paragraph 2 of Part A of the Schedule (offences under NDPS Act), the maximum punishment may extend to ten years.',
    explanation: 'Money laundering carries 3 to 7 years rigorous imprisonment plus fine. If the underlying crime involves narcotics (NDPS Act), the maximum increases to 10 years.',
    punishment: 'Rigorous imprisonment 3-7 years + fine (10 years if NDPS related)', category: 'Criminal', cognizable: 'Yes', bailable: 'No',
    keywords: ['money laundering', 'punishment', 'imprisonment', 'PMLA', 'fine']
  },
  {
    act: 'Prevention of Money Laundering Act, 2002', actCode: 'PMLA', sectionNumber: '5', title: 'Attachment of property involved in money-laundering',
    legalText: 'Where the Director or any other officer not below the rank of Deputy Director authorised by the Director for the purposes of this section, has reason to believe (the reason for such belief to be recorded in writing), on the basis of material in his possession, that any person is in possession of any proceeds of crime, and such proceeds of crime are likely to be concealed, transferred or dealt with in any manner which may result in frustrating any proceedings relating to confiscation of such proceeds of crime, he may, by order in writing, provisionally attach such property for a period not exceeding one hundred and eighty days.',
    explanation: 'The ED Director can provisionally attach (freeze) property suspected to be proceeds of crime for up to 180 days if there is risk of it being concealed or transferred.',
    punishment: 'N/A', category: 'Criminal', cognizable: 'Yes', bailable: 'N/A',
    keywords: ['attachment', 'property', 'ED', 'enforcement directorate', 'PMLA', 'freeze', 'provisional']
  },
  {
    act: 'Prevention of Money Laundering Act, 2002', actCode: 'PMLA', sectionNumber: '24', title: 'Burden of proof',
    legalText: 'In any proceeding relating to proceeds of crime under this Act — (a) in the case of a person charged with the offence of money-laundering under section 3, the Authority or Court shall, unless the contrary is proved, presume that such proceeds of crime are involved in money-laundering; and (b) in the case of any other person the Authority or Court may presume that such proceeds of crime are involved in money-laundering.',
    explanation: 'PMLA has a reverse burden of proof — the accused must prove that the property in question is NOT proceeds of crime. The court presumes it is tainted unless the accused proves otherwise.',
    punishment: 'N/A', category: 'Criminal', cognizable: 'N/A', bailable: 'N/A',
    keywords: ['burden of proof', 'reverse onus', 'PMLA', 'presumption', 'money laundering']
  },

  // NIA Act, 2008
  {
    act: 'National Investigation Agency Act, 2008', actCode: 'NIAA', sectionNumber: '6', title: 'Investigation of scheduled offences',
    legalText: 'If, having regard to the gravity of the offence and other relevant factors, the Central Government is of the opinion that a scheduled offence has been committed which is required to be investigated under this Act, it may, suo motu, direct the Agency to investigate the said offence.',
    explanation: 'The Central Government can direct NIA to take over investigation of serious scheduled offences (terrorism, bomb blasts, hijacking, etc.) from the state police, considering the gravity of the offence.',
    punishment: 'N/A', category: 'Criminal', cognizable: 'Yes', bailable: 'N/A',
    keywords: ['NIA', 'investigation', 'scheduled offence', 'central government', 'terrorism']
  },

  // AFSPA, 1958
  {
    act: 'Armed Forces (Special Powers) Act, 1958', actCode: 'AFSPA', sectionNumber: '4', title: 'Special powers of the armed forces',
    legalText: 'Any commissioned officer, warrant officer, non-commissioned officer or any other person of equivalent rank in the armed forces may, in a disturbed area — (a) if he is of opinion that it is necessary so to do for the maintenance of public order, after giving such due warning as he may consider necessary, fire upon or otherwise use force, even to the causing of death, against any person who is acting in contravention of any law or order for the time being in force in the disturbed area; (b) destroy any arms dump, prepared or fortified position or shelter from which armed attacks are made or are likely to be made or are attempted to be made; (c) arrest, without warrant, any person who has committed a cognizable offence or against whom a reasonable suspicion exists that he has committed or is about to commit a cognizable offence; (d) enter and search without warrant any premises to make any such arrest.',
    explanation: 'In disturbed areas, armed forces can use force (including lethal force) after due warning, destroy arms dumps/fortified positions, arrest without warrant, and search premises without warrant.',
    punishment: 'N/A', category: 'Criminal', cognizable: 'N/A', bailable: 'N/A',
    keywords: ['AFSPA', 'armed forces', 'disturbed area', 'special powers', 'shoot to kill', 'arrest without warrant']
  },
  {
    act: 'Armed Forces (Special Powers) Act, 1958', actCode: 'AFSPA', sectionNumber: '6', title: 'Protection of persons acting in good faith under this Act',
    legalText: 'No prosecution, suit or other legal proceeding shall be instituted, except with the previous sanction of the Central Government, against any person in respect of anything done or purported to be done in exercise of the powers conferred by this Act.',
    explanation: 'No legal action can be taken against armed forces personnel for actions under AFSPA without prior sanction (permission) from the Central Government. This immunity has been controversial and challenged in courts.',
    punishment: 'N/A', category: 'Criminal', cognizable: 'N/A', bailable: 'N/A',
    keywords: ['AFSPA', 'immunity', 'protection', 'sanction', 'prosecution', 'armed forces']
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    const codes = ['UAPA', 'FEMA', 'PMLA', 'NIAA', 'AFSPA'];
    for (const code of codes) {
      const deleted = await LegalSection.deleteMany({ actCode: code });
      if (deleted.deletedCount > 0) console.log(`Cleared ${deleted.deletedCount} existing ${code} sections`);
    }
    for (let i = 0; i < sections.length; i++) {
      await LegalSection.create(sections[i]);
      console.log(`[${i + 1}/${sections.length}] Section ${sections[i].sectionNumber}: ${sections[i].title}`);
    }
    console.log(`Done: seeded ${sections.length} national security sections`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}
seed();
