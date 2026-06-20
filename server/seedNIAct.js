require('dotenv').config();
const mongoose = require('mongoose');
const LegalSection = require('./models/LegalSection');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lawbook';

const sections = [
  {
    act: 'Negotiable Instruments Act, 1881',
    actCode: 'NIA',
    sectionNumber: '6',
    title: 'Cheque',
    legalText: 'A "cheque" is a bill of exchange drawn on a specified banker and not expressed to be payable otherwise than on demand and it includes the electronic image of a truncated cheque and a cheque in the electronic form.',
    explanation: 'A cheque is a written order to a bank to pay a specific amount from the account holder\'s account to the person named on the cheque or to the bearer.',
    punishment: 'N/A',
    category: 'Civil',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['cheque', 'definition', 'bill of exchange', 'banker', 'negotiable instrument', 'electronic cheque']
  },
  {
    act: 'Negotiable Instruments Act, 1881',
    actCode: 'NIA',
    sectionNumber: '138',
    title: 'Dishonour of cheque for insufficiency, etc., of funds in the account',
    legalText: 'Where any cheque drawn by a person on an account maintained by him with a banker for payment of any amount of money to another person from out of that account for the discharge, in whole or in part, of any debt or other liability, is returned by the bank unpaid, either because of the amount of money standing to the credit of that account is insufficient to honour the cheque or that it exceeds the amount arranged to be paid from that account by an agreement made with that bank, such person shall be deemed to have committed an offence and shall, without prejudice to any other provision of this Act, be punished with imprisonment for a term which may extend to two years, or with fine which may extend to twice the amount of the cheque, or with both.',
    explanation: 'If someone gives you a cheque and it bounces (gets dishonoured) because there is not enough money in their account, it is a criminal offence. The cheque must have been given to pay off a debt. You must send a notice within 30 days of bounce, and file complaint within 30 days of notice period expiry.',
    punishment: 'Imprisonment up to 2 years, or fine up to twice the cheque amount, or both',
    category: 'Civil',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['cheque bounce', 'dishonour', 'insufficient funds', 'NI Act 138', 'cheque return', 'debt', 'criminal offence']
  },
  {
    act: 'Negotiable Instruments Act, 1881',
    actCode: 'NIA',
    sectionNumber: '139',
    title: 'Presumption in favour of holder',
    legalText: 'It shall be presumed, unless the contrary is proved, that the holder of a cheque received the cheque of the nature referred to in section 138 for the discharge, in whole or in part, of any debt or other liability.',
    explanation: 'The law presumes that if you hold a bounced cheque, it was given to you to pay off a genuine debt. The burden of proving otherwise falls on the person who issued the cheque.',
    punishment: 'N/A',
    category: 'Civil',
    cognizable: 'No',
    bailable: 'N/A',
    keywords: ['presumption', 'holder', 'cheque', 'debt', 'burden of proof', 'discharge of liability']
  },
  {
    act: 'Negotiable Instruments Act, 1881',
    actCode: 'NIA',
    sectionNumber: '141',
    title: 'Offences by companies',
    legalText: 'If the person committing an offence under section 138 is a company, every person who, at the time the offence was committed, was in charge of, and was responsible to, the company for the conduct of the business of the company, as well as the company, shall be deemed to be guilty of the offence and shall be liable to be proceeded against and punished accordingly.',
    explanation: 'If a company issues a cheque that bounces, not only the company but also the directors and officers who were in charge of running the company at that time can be held personally liable and punished.',
    punishment: 'Same as Section 138 — up to 2 years imprisonment or fine up to twice the cheque amount, or both',
    category: 'Civil',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['company', 'director liability', 'corporate offence', 'cheque bounce company', 'officer in charge']
  },
  {
    act: 'Negotiable Instruments Act, 1881',
    actCode: 'NIA',
    sectionNumber: '142',
    title: 'Cognizance of offences',
    legalText: 'Notwithstanding anything contained in the Code of Criminal Procedure, 1973, no court shall take cognizance of any offence punishable under section 138 except upon a complaint, in writing, made by the payee or, as the case may be, the holder in due course of the cheque. No court inferior to that of a Metropolitan Magistrate or a Judicial Magistrate of the first class shall try any offence punishable under section 138.',
    explanation: 'A cheque bounce case can only be filed by the person to whom the cheque was issued (payee). The complaint must be filed within 30 days of the cause of action arising. Only a Metropolitan Magistrate or Judicial Magistrate of first class can hear such cases.',
    punishment: 'N/A',
    category: 'Civil',
    cognizable: 'No',
    bailable: 'N/A',
    keywords: ['cognizance', 'complaint', 'magistrate', 'limitation period', '30 days', 'payee', 'jurisdiction']
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing NIA sections
    const deleted = await LegalSection.deleteMany({ actCode: 'NIA' });
    console.log(`🗑️ Cleared ${deleted.deletedCount} existing NIA sections`);

    // Seed sections
    for (let i = 0; i < sections.length; i++) {
      await LegalSection.create(sections[i]);
      console.log(`✅ [${i + 1}/${sections.length}] Section ${sections[i].sectionNumber}: ${sections[i].title}`);
    }

    console.log(`\n📊 SUMMARY: Seeded ${sections.length} Negotiable Instruments Act sections`);
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
}

seed();
