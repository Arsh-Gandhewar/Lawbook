require('dotenv').config();
const mongoose = require('mongoose');
const LegalSection = require('./models/LegalSection');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lawbook';

const sections = [
  // Arbitration and Conciliation Act, 1996
  {
    act: 'Arbitration and Conciliation Act, 1996', actCode: 'ARBA', sectionNumber: '7', title: 'Arbitration agreement',
    legalText: 'In this Part, "arbitration agreement" means an agreement by the parties to submit to arbitration all or certain disputes which have arisen or which may arise between them in respect of a defined legal relationship, whether contractual or not. An arbitration agreement may be in the form of an arbitration clause in a contract or in the form of a separate agreement. An arbitration agreement shall be in writing.',
    explanation: 'An arbitration agreement must be in writing and can either be a clause within a contract or a separate standalone agreement between parties.', punishment: 'N/A', category: 'Civil', cognizable: 'N/A', bailable: 'N/A',
    keywords: ['arbitration', 'agreement', 'dispute resolution', 'clause', 'written']
  },
  {
    act: 'Arbitration and Conciliation Act, 1996', actCode: 'ARBA', sectionNumber: '8', title: 'Power to refer parties to arbitration',
    legalText: 'A judicial authority, before which an action is brought in a matter which is the subject of an arbitration agreement shall, if a party to the arbitration agreement or any person claiming through or under him, so applies not later than the date of submitting his first statement on the substance of the dispute, and notwithstanding any judgment, decree or order of the Supreme Court or any Court, refer the parties to arbitration unless it finds that prima facie no valid arbitration agreement exists.',
    explanation: 'If there is a valid arbitration agreement, the court must refer the dispute to arbitration and cannot hear the case itself, provided the party applies before filing the first substantive reply.',
    punishment: 'N/A', category: 'Civil', cognizable: 'N/A', bailable: 'N/A',
    keywords: ['arbitration', 'court referral', 'mandatory', 'Section 8']
  },
  {
    act: 'Arbitration and Conciliation Act, 1996', actCode: 'ARBA', sectionNumber: '34', title: 'Application for setting aside arbitral award',
    legalText: 'Recourse to a Court against an arbitral award may be made only by an application for setting aside such award. An arbitral award may be set aside by the Court only if — (a) the party making the application establishes that — (i) a party was under some incapacity, or (ii) the arbitration agreement is not valid under the law, or (iii) the party was not given proper notice of the appointment of an arbitrator or was otherwise unable to present his case, or (iv) the award deals with a dispute not contemplated by the terms of the submission, or (v) the composition of the arbitral tribunal was not in accordance with the agreement; (b) the Court finds that (i) the subject-matter of the dispute is not capable of settlement by arbitration under the law, or (ii) the arbitral award is in conflict with the public policy of India.',
    explanation: 'An arbitral award can only be challenged on limited grounds like incapacity, invalid agreement, lack of notice, exceeding scope, or conflict with Indian public policy. Courts cannot re-examine the merits.',
    punishment: 'N/A', category: 'Civil', cognizable: 'N/A', bailable: 'N/A',
    keywords: ['arbitration', 'setting aside', 'challenge award', 'public policy', 'Section 34']
  },

  // Transfer of Property Act, 1882 (additional sections)
  {
    act: 'Advocates Act, 1961', actCode: 'ADV', sectionNumber: '29', title: 'Advocates alone entitled to practise',
    legalText: 'Subject to the provisions of this Act and any rules made thereunder, there shall, as from the appointed day, be only one class of persons entitled to practise the profession of law, namely, advocates. Except as otherwise provided in this Act or in any other law for the time being in force, no person shall, on or after the appointed day, be entitled to practise in any court or before any authority or person unless he is enrolled as an advocate under this Act.',
    explanation: 'Only persons enrolled as advocates under this Act can practice law in any court or before any authority in India. This creates a single unified bar.',
    punishment: 'N/A', category: 'Civil', cognizable: 'N/A', bailable: 'N/A',
    keywords: ['advocate', 'lawyer', 'practice', 'enrolled', 'bar council', 'legal profession']
  },
  {
    act: 'Advocates Act, 1961', actCode: 'ADV', sectionNumber: '35', title: 'Punishment of advocates for misconduct',
    legalText: 'Where on receipt of a complaint or otherwise a State Bar Council has reason to believe that any advocate on its roll has been guilty of professional or other misconduct, it shall refer the case for disposal to its disciplinary committee. The disciplinary committee of a State Bar Council may, if it finds that the advocate is guilty of professional or other misconduct — (a) dismiss the complaint, or (b) reprimand the advocate, or (c) suspend the advocate from practice for such period as it may deem fit, or (d) remove the name of the advocate from the State roll of advocates.',
    explanation: 'Advocates guilty of professional misconduct can be reprimanded, suspended from practice for a period, or permanently removed from the roll by the State Bar Council disciplinary committee.',
    punishment: 'Reprimand, suspension from practice, or removal from the roll of advocates', category: 'Civil', cognizable: 'N/A', bailable: 'N/A',
    keywords: ['advocate misconduct', 'bar council', 'disciplinary', 'suspension', 'removal']
  },

  // Benami Transactions (Prohibition) Act, 2016
  {
    act: 'Prohibition of Benami Property Transactions Act, 1988 (as amended 2016)', actCode: 'BENAMI', sectionNumber: '3', title: 'Prohibition of benami transactions',
    legalText: 'No person shall enter into any benami transaction. Whoever enters into any benami transaction shall be punishable with imprisonment for a term which may extend to three years or with fine or with both. Whoever is found guilty of offence under this section for the second or any subsequent time, shall be punishable with imprisonment for a term which may extend to five years or with fine or with both.',
    explanation: 'Benami transactions (buying property in someone else\'s name to hide ownership) are completely banned. First offence: up to 3 years + fine. Repeat offence: up to 5 years + fine. The property can be confiscated by the government.',
    punishment: 'Imprisonment up to 3 years and/or fine (5 years for repeat offence)', category: 'Criminal', cognizable: 'Yes', bailable: 'No',
    keywords: ['benami', 'property', 'fake name', 'hidden ownership', 'confiscation']
  },
  {
    act: 'Prohibition of Benami Property Transactions Act, 1988 (as amended 2016)', actCode: 'BENAMI', sectionNumber: '5', title: 'Property held benami liable to confiscation',
    legalText: 'Any property which is subject matter of benami transaction, shall be liable to be confiscated by the Central Government. No person shall re-transfer the benami property to the benamidar or any other person acting on his behalf.',
    explanation: 'Benami property is confiscated by the central government. The real owner cannot get it back through re-transfer. The property vests in the government.',
    punishment: 'Confiscation of property', category: 'Criminal', cognizable: 'Yes', bailable: 'N/A',
    keywords: ['benami', 'confiscation', 'government', 'property seizure']
  },

  // Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013
  {
    act: 'Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013', actCode: 'LARR', sectionNumber: '26', title: 'Determination of market value of land',
    legalText: 'The Collector shall adopt the following criteria in assessing and determining the market value of the land — (a) the market value as determined under section 26 shall be multiplied by a factor to be specified in the First Schedule (1 to 2 for urban, 1 to 2 for rural); (b) the date for determination of market value shall be the date on which the notification has been issued under section 11; (c) the Collector in determining the market value shall use the highest of the following — (i) the minimum land value, if any, specified in the Indian Stamp Act, 1899; (ii) the average of the sale price for similar type of land situated in the nearest village or nearest vicinity area; (iii) consented amount of compensation in case of acquisition of lands for private companies or public private partnership projects.',
    explanation: 'Land acquisition compensation must be at least the market value (highest of stamp duty value, nearby sale prices, or consented amount), multiplied by a factor of 1-2x for urban areas and up to 2x for rural areas. Plus solatium of 100%.',
    punishment: 'N/A', category: 'Civil', cognizable: 'N/A', bailable: 'N/A',
    keywords: ['land acquisition', 'compensation', 'market value', 'rehabilitation', 'LARR']
  },
  {
    act: 'Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013', actCode: 'LARR', sectionNumber: '24', title: 'Land acquisition process shall be deemed to have lapsed',
    legalText: 'Notwithstanding anything contained in this Act, in a case of land acquisition proceedings initiated under the Land Acquisition Act, 1894 — (a) where no award under section 11 of the said Land Acquisition Act has been made, then, all provisions of this Act relating to the determination of compensation shall apply; or (b) where an award under said section 11 has been made, then such proceedings shall continue under the provisions of the said Land Acquisition Act, as if the said Act has not been repealed.',
    explanation: 'Old land acquisition cases where no award was made will get compensation under the new (higher) 2013 Act rates. Cases where an award was already made continue under the old 1894 Act.',
    punishment: 'N/A', category: 'Civil', cognizable: 'N/A', bailable: 'N/A',
    keywords: ['land acquisition', 'lapse', 'old cases', '1894 Act', '2013 Act', 'deemed lapsed']
  },

  // Electricity Act, 2003
  {
    act: 'Electricity Act, 2003', actCode: 'ELEC', sectionNumber: '135', title: 'Theft of electricity',
    legalText: 'Whoever dishonestly — (a) taps, makes or causes to be made any connection with overhead, underground or undersea lines or cables, or service wires, or service facilities of a licensee or supplier; or (b) tampers a meter, installs or uses a tampered meter, current reversing transformer, loop connection or any other device or method which interferes with accurate or proper registration, calibration or metering of electric current or otherwise results in a manner whereby electricity is stolen, shall be punishable with imprisonment for a term which may extend to three years or with fine or with both.',
    explanation: 'Electricity theft through illegal connections, meter tampering, bypassing, or any other method carries up to 3 years imprisonment and/or fine. For subsequent offences, up to 5 years.',
    punishment: 'Imprisonment up to 3 years and/or fine (5 years for repeat offence)', category: 'Criminal', cognizable: 'Yes', bailable: 'Yes',
    keywords: ['electricity theft', 'meter tampering', 'illegal connection', 'power theft']
  },

  // Drugs and Cosmetics Act, 1940
  {
    act: 'Drugs and Cosmetics Act, 1940', actCode: 'DCA', sectionNumber: '18', title: 'Prohibition of manufacture and sale of certain drugs and cosmetics',
    legalText: 'From such date as may be fixed by the State Government by notification in the Official Gazette in this behalf, no person shall himself or by any other person on his behalf — (a) manufacture for sale or for distribution, or sell, or stock or exhibit or offer for sale, or distribute any drug or cosmetic which is not of standard quality, or is misbranded, adulterated or spurious; (c) manufacture for sale any drug or cosmetic except under, and in accordance with the conditions of a licence issued for such purpose under this Chapter.',
    explanation: 'Manufacturing, selling, stocking, or distributing drugs or cosmetics that are substandard, misbranded, adulterated, or spurious is prohibited. All drug manufacturing requires a licence.',
    punishment: 'Imprisonment up to 3 years and fine (Section 27); Life imprisonment for spurious/adulterated drugs causing death (Section 27A)', category: 'Criminal', cognizable: 'Yes', bailable: 'No',
    keywords: ['drugs', 'cosmetics', 'spurious', 'adulterated', 'licence', 'medicine', 'fake drugs']
  },

  // Official Secrets Act, 1923
  {
    act: 'Official Secrets Act, 1923', actCode: 'OSA', sectionNumber: '3', title: 'Penalties for spying',
    legalText: 'If any person for any purpose prejudicial to the safety or interests of the State — (a) approaches, inspects, passes over or is in the neighbourhood of, or enters, any prohibited place; or (b) makes any sketch, plan, model, or note which is calculated to be or might be or is intended to be, directly or indirectly, useful to an enemy; or (c) obtains, collects, records, or publishes or communicates to any other person any secret official code or password, or any sketch, plan, model, article or note or other document or information which is calculated to be or might be or is intended to be, directly or indirectly, useful to an enemy, he shall be guilty of an offence under this section.',
    explanation: 'Any person who approaches prohibited places, makes sketches/plans useful to an enemy, or obtains/communicates secret official codes, passwords, or classified information is guilty of spying.',
    punishment: 'Imprisonment up to 14 years', category: 'Criminal', cognizable: 'Yes', bailable: 'No',
    keywords: ['official secrets', 'spying', 'espionage', 'classified', 'prohibited place', 'national security']
  },

  // Indian Easements Act, 1882
  {
    act: 'Indian Easements Act, 1882', actCode: 'EASE', sectionNumber: '4', title: 'Easement defined',
    legalText: 'An easement is a right which the owner or occupier of certain land possesses, as such, for the beneficial enjoyment of that land, to do and continue to do something, or to prevent and continue to prevent something being done, in or upon, or in respect of, certain other land not his own.',
    explanation: 'An easement is a right over someone else\'s property — like a right of way (passage), right to light, right to water flow. It benefits your land and burdens the other person\'s land.',
    punishment: 'N/A', category: 'Civil', cognizable: 'N/A', bailable: 'N/A',
    keywords: ['easement', 'right of way', 'right to light', 'property', 'access']
  },
  {
    act: 'Indian Easements Act, 1882', actCode: 'EASE', sectionNumber: '15', title: 'Acquisition of easement by prescription',
    legalText: 'Where the access and use of light or air to and for any building have been peaceably enjoyed therewith as an easement, and as of right, without interruption, and for twenty years, and where any way or watercourse or the use of any water or any other easement (whether affirmative or negative) has been peaceably and openly enjoyed by any person claiming title thereto, as an easement and as of right, without interruption, and for twenty years, the right to such access and use of light or air, way, watercourse, use of water, or other easement shall be absolute and indefeasible.',
    explanation: 'If you have peacefully and openly used an easement (like a pathway, water channel, or access to light) for 20 continuous years as a right, you acquire a permanent legal right to it by prescription.',
    punishment: 'N/A', category: 'Civil', cognizable: 'N/A', bailable: 'N/A',
    keywords: ['easement', 'prescription', '20 years', 'right of way', 'continuous use', 'adverse possession']
  },

  // Prevention of Damage to Public Property Act, 1984
  {
    act: 'Prevention of Damage to Public Property Act, 1984', actCode: 'PDPP', sectionNumber: '3', title: 'Mischief causing damage to public property',
    legalText: 'Whoever commits mischief by doing any act in respect of any public property, other than public property of the nature referred to in section 4, shall be punished with imprisonment for a term which may extend to five years and with fine.',
    explanation: 'Damaging public property (government buildings, buses, trains, public infrastructure) during protests, riots or otherwise carries up to 5 years imprisonment and fine.',
    punishment: 'Imprisonment up to 5 years and fine', category: 'Criminal', cognizable: 'Yes', bailable: 'Yes',
    keywords: ['public property', 'damage', 'vandalism', 'protest', 'riot', 'government property']
  },

  // Factories Act, 1948
  {
    act: 'Factories Act, 1948', actCode: 'FA', sectionNumber: '51', title: 'Weekly hours',
    legalText: 'No adult worker shall be required or allowed to work in a factory for more than forty-eight hours in any week.',
    explanation: 'Factory workers cannot be made to work more than 48 hours per week. This is a strict upper limit set by law.',
    punishment: 'Fine up to Rs 2 lakhs (Section 92)', category: 'Civil', cognizable: 'N/A', bailable: 'N/A',
    keywords: ['factory', 'working hours', '48 hours', 'weekly limit', 'labour']
  },
  {
    act: 'Factories Act, 1948', actCode: 'FA', sectionNumber: '59', title: 'Extra wages for overtime',
    legalText: 'Where a worker works in a factory for more than nine hours in any day or for more than forty-eight hours in any week, he shall, in respect of overtime work, be entitled to wages at the rate of twice his ordinary rate of wages.',
    explanation: 'If a factory worker works beyond 9 hours/day or 48 hours/week, they must be paid double wages for the overtime period.',
    punishment: 'N/A', category: 'Civil', cognizable: 'N/A', bailable: 'N/A',
    keywords: ['factory', 'overtime', 'double wages', 'extra work', 'labour']
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    const codes = ['ARBA', 'ADV', 'BENAMI', 'LARR', 'ELEC', 'DCA', 'OSA', 'EASE', 'PDPP', 'FA'];
    for (const code of codes) {
      const deleted = await LegalSection.deleteMany({ actCode: code });
      if (deleted.deletedCount > 0) console.log(`Cleared ${deleted.deletedCount} existing ${code} sections`);
    }
    for (let i = 0; i < sections.length; i++) {
      await LegalSection.create(sections[i]);
      console.log(`[${i + 1}/${sections.length}] Section ${sections[i].sectionNumber}: ${sections[i].title}`);
    }
    console.log(`Done: seeded ${sections.length} additional law sections`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}
seed();
