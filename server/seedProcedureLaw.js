require('dotenv').config();
const mongoose = require('mongoose');
const LegalSection = require('./models/LegalSection');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lawbook';

const sections = [
  // Indian Evidence Act, 1872
  {
    act: 'Indian Evidence Act, 1872', actCode: 'IEA', sectionNumber: '3', title: 'Interpretation clause (Definitions)',
    legalText: '"Fact" means and includes — (1) any thing, state of things, or relation of things, capable of being perceived by the senses; (2) any mental condition of which any person is conscious. "Relevant" — One fact is said to be relevant to another when the one is connected with the other in any of the ways referred to in the provisions of this Act relating to the relevancy of facts. "Proved" — A fact is said to be proved when, after considering the matters before the court, the court either believes it to exist, or considers its existence so probable that a prudent man ought, under the circumstances of the particular case, to act upon the supposition that it exists. "Disproved" — A fact is said to be disproved when, after considering the matters before the Court, the Court either believes that it does not exist, or considers its non-existence so probable that a prudent man ought, under the circumstances of the particular case, to act upon the supposition that it does not exist.',
    explanation: 'Defines key legal terms: "Fact" includes things perceivable by senses and mental conditions. "Proved" means the court considers it probable enough for a prudent man to act on. "Disproved" is the opposite.',
    punishment: 'N/A', category: 'Civil', cognizable: 'N/A', bailable: 'N/A',
    keywords: ['evidence', 'fact', 'proved', 'disproved', 'relevant', 'definition']
  },
  {
    act: 'Indian Evidence Act, 1872', actCode: 'IEA', sectionNumber: '24', title: 'Confession caused by inducement, threat or promise',
    legalText: 'A confession made by an accused person is irrelevant in a criminal proceeding, if the making of the confession appears to the Court to have been caused by any inducement, threat or promise having reference to the charge against the accused person, proceeding from a person in authority and sufficient, in the opinion of the Court, to give the accused person grounds which would appear to him reasonable for supposing that by making it he would gain any advantage or avoid any evil of a temporal nature in reference to the proceedings against him.',
    explanation: 'A confession obtained through threats, promises, or inducements by a person in authority (like police) is inadmissible. The accused must confess voluntarily for it to be valid evidence.',
    punishment: 'N/A', category: 'Criminal', cognizable: 'N/A', bailable: 'N/A',
    keywords: ['confession', 'inducement', 'threat', 'promise', 'inadmissible', 'voluntary', 'police']
  },
  {
    act: 'Indian Evidence Act, 1872', actCode: 'IEA', sectionNumber: '45', title: 'Opinions of experts',
    legalText: 'When the Court has to form an opinion upon a point of foreign law, or of science, or art, or as to identity of handwriting or finger impressions, the opinions upon that point of persons specially skilled in such foreign law, science or art, or in questions as to identity of handwriting or finger impressions are relevant facts. Such persons are called experts.',
    explanation: 'Expert opinions are relevant when the court needs to decide on scientific matters, handwriting analysis, fingerprint identification, or technical questions. DNA evidence, forensic reports, and medical opinions fall under this section.',
    punishment: 'N/A', category: 'Civil', cognizable: 'N/A', bailable: 'N/A',
    keywords: ['expert', 'opinion', 'forensic', 'handwriting', 'fingerprint', 'DNA', 'science']
  },
  {
    act: 'Indian Evidence Act, 1872', actCode: 'IEA', sectionNumber: '65B', title: 'Admissibility of electronic records',
    legalText: 'Notwithstanding anything contained in this Act, any information contained in an electronic record which is printed on a paper, stored, recorded or copied in optical or magnetic media produced by a computer shall be deemed to be also a document, if the conditions mentioned in this section are satisfied in relation to the information and computer in question and shall be admissible in any proceedings, without further proof or production of the original, as evidence of any contents of the original or of any fact stated therein of which direct evidence would be admissible. The conditions are: (a) the computer output containing the information was produced by the computer during the period over which the computer was used regularly to store or process information; (b) during the said period, information of the kind contained in the electronic record was regularly fed into the computer in the ordinary course of the said activities; (c) the computer was operating properly; (d) the information contained in the electronic record reproduces or is derived from such information fed into the computer in the ordinary course of the said activities.',
    explanation: 'Electronic records (emails, WhatsApp chats, CCTV footage, digital documents) are admissible as evidence if accompanied by a Section 65B certificate. The Supreme Court in Anvar P.V. v. P.K. Basheer (2014) held that such certificate is mandatory.',
    punishment: 'N/A', category: 'Civil', cognizable: 'N/A', bailable: 'N/A',
    keywords: ['electronic evidence', 'digital', 'email', 'WhatsApp', 'CCTV', 'computer', '65B certificate', 'admissibility']
  },
  {
    act: 'Indian Evidence Act, 1872', actCode: 'IEA', sectionNumber: '101', title: 'Burden of proof',
    legalText: 'Whoever desires any Court to give judgment as to any legal right or liability dependent on the existence of facts which he asserts, must prove that those facts exist. When a person is bound to prove the existence of any fact, it is said that the burden of proof lies on that person.',
    explanation: 'The burden of proof lies on the person who asserts a fact. In criminal cases, the prosecution must prove guilt beyond reasonable doubt. In civil cases, the plaintiff must prove their case on a balance of probabilities.',
    punishment: 'N/A', category: 'Civil', cognizable: 'N/A', bailable: 'N/A',
    keywords: ['burden of proof', 'onus', 'prove', 'assert', 'prosecution', 'plaintiff']
  },

  // Code of Civil Procedure, 1908
  {
    act: 'Code of Civil Procedure, 1908', actCode: 'CPC', sectionNumber: '9', title: 'Courts to try all civil suits unless barred',
    legalText: 'The Courts shall (subject to the provisions herein contained) have jurisdiction to try all suits of a civil nature excepting suits of which their cognizance is either expressly or impliedly barred.',
    explanation: 'Civil courts have jurisdiction to try all civil disputes unless a specific law expressly or impliedly bars it (like disputes that must go to tribunals or quasi-judicial bodies).',
    punishment: 'N/A', category: 'Civil', cognizable: 'N/A', bailable: 'N/A',
    keywords: ['civil suit', 'jurisdiction', 'court', 'bar', 'CPC']
  },
  {
    act: 'Code of Civil Procedure, 1908', actCode: 'CPC', sectionNumber: '11', title: 'Res judicata',
    legalText: 'No Court shall try any suit or issue in which the matter directly and substantially in issue has been directly and substantially in issue in a former suit between the same parties, or between parties under whom they or any of them claim, litigating under the same title, in a Court competent to try such subsequent suit or the suit in which such issue has been subsequently raised, and has been heard and finally decided by such Court.',
    explanation: 'Once a matter has been decided by a competent court between the same parties, it cannot be re-litigated. This prevents endless litigation on the same issue — the earlier judgment is final and binding.',
    punishment: 'N/A', category: 'Civil', cognizable: 'N/A', bailable: 'N/A',
    keywords: ['res judicata', 'final judgment', 'same parties', 'no re-litigation', 'binding', 'CPC']
  },
  {
    act: 'Code of Civil Procedure, 1908', actCode: 'CPC', sectionNumber: 'O39R1', title: 'Order 39 Rule 1 — Temporary injunctions',
    legalText: 'Where in any suit it is proved by affidavit or otherwise — (a) that any property in dispute in a suit is in danger of being wasted, damaged or alienated by any party to the suit, or wrongfully sold in execution of a decree, or (b) that the defendant threatens, or intends, to remove or dispose of his property with a view to defrauding his creditors, (c) that the defendant threatens to dispossess the plaintiff or otherwise cause injury to the plaintiff in relation to any property in dispute in the suit, the Court may by order grant a temporary injunction to restrain such act, or make such other order for the purpose of staying and preventing the wasting, damaging, alienation, sale, removal or disposition of the property or dispossession of the plaintiff, or otherwise causing injury to the plaintiff in relation to any property in dispute in the suit as the Court thinks fit.',
    explanation: 'A court can grant a temporary injunction (stay order) to prevent a party from wasting, damaging, selling or disposing of disputed property, or to prevent dispossession, until the suit is decided. The three conditions for granting an injunction are: (1) prima facie case, (2) balance of convenience, (3) irreparable injury.',
    punishment: 'N/A', category: 'Civil', cognizable: 'N/A', bailable: 'N/A',
    keywords: ['temporary injunction', 'stay order', 'interim order', 'property dispute', 'CPC', 'restraining order']
  },

  // Registration Act, 1908
  {
    act: 'Registration Act, 1908', actCode: 'REGA', sectionNumber: '17', title: 'Documents of which registration is compulsory',
    legalText: 'The following documents shall be registered if the property to which they relate is situate in a district in which, and if they have been executed on or after the date on which, this Act came or comes into force — (a) instruments of gift of immovable property; (b) other non-testamentary instruments which purport or operate to create, declare, assign, limit or extinguish, whether in present or in future, any right, title or interest, whether vested or contingent, of the value of one hundred rupees and upwards, to or in immovable property; (c) non-testamentary instruments which acknowledge the receipt or payment of any consideration on account of the creation, declaration, assignment, limitation or extinction of any such right, title or interest; (d) leases of immovable property from year to year, or for any term exceeding one year, or reserving a yearly rent.',
    explanation: 'Sale deeds, gift deeds, mortgage deeds, leases over 1 year, and any document creating/transferring rights in immovable property worth Rs 100+ MUST be registered. Unregistered documents are inadmissible as evidence for the property transaction.',
    punishment: 'N/A', category: 'Civil', cognizable: 'N/A', bailable: 'N/A',
    keywords: ['registration', 'compulsory', 'sale deed', 'gift deed', 'immovable property', 'lease']
  },
  {
    act: 'Registration Act, 1908', actCode: 'REGA', sectionNumber: '49', title: 'Effect of non-registration of documents required to be registered',
    legalText: 'No document required by section 17 or by any provision of the Transfer of Property Act, 1882, to be registered shall — (a) affect any immovable property comprised therein, or (b) confer any power to adopt, or (c) be received as evidence of any transaction affecting such property or conferring such power, unless it has been registered.',
    explanation: 'An unregistered document that was required to be registered cannot affect the property, cannot confer power of adoption, and cannot be used as evidence in court for that property transaction.',
    punishment: 'N/A', category: 'Civil', cognizable: 'N/A', bailable: 'N/A',
    keywords: ['non-registration', 'inadmissible', 'evidence', 'property', 'unregistered']
  },

  // Contempt of Courts Act, 1971
  {
    act: 'Contempt of Courts Act, 1971', actCode: 'CCA', sectionNumber: '2', title: 'Definition of contempt of court',
    legalText: '"Contempt of court" means civil contempt or criminal contempt. "Civil contempt" means wilful disobedience to any judgment, decree, direction, order, writ or other process of a court or wilful breach of an undertaking given to a court. "Criminal contempt" means the publication (whether by words, spoken or written, or by signs, or by visible representations, or otherwise) of any matter or the doing of any other act whatsoever which — (i) scandalises or tends to scandalise, or lowers or tends to lower the authority of, any court; or (ii) prejudices, or interferes or tends to interfere with, the due course of any judicial proceeding; or (iii) interferes or tends to interfere with, or obstructs or tends to obstruct, the administration of justice in any other manner.',
    explanation: 'Civil contempt = disobeying court orders or breaching undertakings. Criminal contempt = scandalizing/lowering court authority, prejudicing judicial proceedings, or obstructing justice through publication or any other act.',
    punishment: 'Simple imprisonment up to 6 months and/or fine up to Rs 2,000 (Section 12)', category: 'Criminal', cognizable: 'No', bailable: 'Yes',
    keywords: ['contempt', 'court', 'disobedience', 'scandalise', 'obstruction', 'judicial']
  },
  {
    act: 'Contempt of Courts Act, 1971', actCode: 'CCA', sectionNumber: '12', title: 'Punishment for contempt of court',
    legalText: 'Save as otherwise expressly provided in this Act or in any other law, a contempt of court may be punished with simple imprisonment for a term which may extend to six months, or with fine which may extend to two thousand rupees, or with both. An accused may be discharged or the punishment awarded may be remitted on apology being made to the satisfaction of the court. An apology shall not be rejected merely on the ground that it is qualified or conditional if the accused makes it bona fide.',
    explanation: 'Contempt of court is punishable with up to 6 months simple imprisonment and/or Rs 2,000 fine. However, the court may accept a bona fide apology and discharge the person.',
    punishment: 'Simple imprisonment up to 6 months and/or fine up to Rs 2,000', category: 'Criminal', cognizable: 'No', bailable: 'Yes',
    keywords: ['contempt punishment', 'imprisonment', 'apology', 'fine', 'court']
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    const codes = ['IEA', 'CPC', 'REGA', 'CCA'];
    for (const code of codes) {
      const deleted = await LegalSection.deleteMany({ actCode: code });
      if (deleted.deletedCount > 0) console.log(`Cleared ${deleted.deletedCount} existing ${code} sections`);
    }
    for (let i = 0; i < sections.length; i++) {
      await LegalSection.create(sections[i]);
      console.log(`[${i + 1}/${sections.length}] Section ${sections[i].sectionNumber}: ${sections[i].title}`);
    }
    console.log(`Done: seeded ${sections.length} procedure law sections`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}
seed();
