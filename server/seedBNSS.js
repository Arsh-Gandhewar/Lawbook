// Seed script to add BNSS (Bharatiya Nagarik Suraksha Sanhita) sections to the legal database
// Run with: node server/seedBNSS.js

require('dotenv').config();
const mongoose = require('mongoose');
const LegalSection = require('./models/LegalSection');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lawbook';

const bnssSections = [
  // ═══════════════════════════════════════════════════════════════════
  // Bharatiya Nagarik Suraksha Sanhita, 2023 (replaces CrPC, 1973)
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
    actCode: 'BNSS',
    sectionNumber: '35',
    title: 'When police may arrest without warrant',
    legalText: '(1) Any police officer may without an order from a Magistrate and without a warrant, arrest any person— (a) who commits, in the presence of a police officer, a cognizable offence; (b) against whom a reasonable complaint has been made, or credible information has been received, or a reasonable suspicion exists that he has committed a cognizable offence punishable with imprisonment for a term which may be less than seven years or which may extend to seven years whether with or without fine, if the following conditions are satisfied, namely:— (i) the police officer has reason to believe on the basis of such complaint, information, or suspicion that such person has committed the said offence; (ii) the police officer is satisfied that such arrest is necessary— (a) to prevent such person from committing any further offence; or (b) for proper investigation of the offence; or (c) to prevent such person from causing the evidence of the offence to disappear or tampering with such evidence in any manner; or (d) to prevent such person from making any inducement, threat or promise to any person acquainted with the facts of the case so as to dissuade him from disclosing such facts to the Court or to the police officer; or (e) as unless such person is arrested, his presence in the Court whenever required cannot be ensured, and the police officer shall record while making such arrest, his reasons in writing. (3) Subject to the provisions of section 37, no person concerned in a non-cognizable offence or against whom a complaint has been made or credible information has been received or reasonable suspicion exists of his having so concerned, shall be arrested except under a warrant or order of a Magistrate.',
    explanation: 'This section (replacing CrPC Section 41) governs when police can arrest a person without a warrant. For cognizable offences committed in the officer\'s presence, arrest can be immediate. For other cognizable offences (punishable up to 7 years), the officer must be satisfied that arrest is necessary for specific reasons: preventing further offences, proper investigation, preventing evidence tampering, preventing witness intimidation, or ensuring court appearance. The officer must record reasons in writing. For non-cognizable offences, arrest requires a Magistrate\'s warrant. This provision reflects the Supreme Court\'s guidelines in Arnesh Kumar v. State of Bihar (2014) to prevent unnecessary arrests.',
    punishment: 'N/A (procedural provision regarding police powers of arrest)',
    category: 'Criminal',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['arrest', 'arrest without warrant', 'police arrest', 'cognizable offence', 'CrPC 41', 'warrantless arrest', 'Arnesh Kumar', 'police power', 'arrest procedure'],
    relatedSections: [
      { sectionNumber: '173', actCode: 'BNSS', title: 'Information in cognizable cases (FIR)' },
      { sectionNumber: '187', actCode: 'BNSS', title: 'Procedure when investigation cannot be completed in twenty-four hours' },
      { sectionNumber: '482', actCode: 'BNSS', title: 'Direction for grant of bail to person apprehending arrest' }
    ]
  },
  {
    act: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
    actCode: 'BNSS',
    sectionNumber: '173',
    title: 'Information in cognizable cases (FIR)',
    legalText: '(1) Every information relating to the commission of a cognizable offence, if given orally to an officer in charge of a police station, shall be reduced to writing by him or under his direction, and be read over to the informant; and every such information, whether given in writing or reduced to writing as aforesaid, shall be signed by the person giving it, and the substance thereof shall be entered in a book to be kept by such officer in such form as the State Government may prescribe in this behalf. (2) A copy of the information as recorded under sub-section (1) shall be given forthwith, free of cost, to the informant. (3) Any person, aggrieved by a refusal on the part of an officer in charge of a police station to record the information referred to in sub-section (1), may send the substance of such information, in writing and by post, to the Superintendent of Police concerned who, if satisfied that such information discloses the commission of a cognizable offence, shall either investigate the case himself or direct an investigation to be made by any police officer subordinate to him, in the manner provided by this Sanhita, and such officer shall have all the powers of an officer in charge of the police station in relation to that offence. (4) Every information relating to the commission of a cognizable offence may be given by electronic communication also and the same shall be taken on record by the officer in charge of the police station on the basis of such communication.',
    explanation: 'This section (replacing CrPC Section 154) governs the registration of First Information Reports (FIRs). When information about a cognizable offence is received, the Station House Officer (SHO) must: (1) reduce it to writing, (2) read it to the informant, (3) get it signed, (4) enter it in the station diary, and (5) give a free copy to the informant immediately. Key improvements over CrPC: FIRs can now be filed via electronic communication (e-FIR). If police refuse to register the FIR, the informant can approach the Superintendent of Police. The Supreme Court in Lalita Kumari v. Govt. of UP (2014) held that registration of FIR is mandatory when information discloses a cognizable offence — police have no discretion to conduct a preliminary inquiry in such cases.',
    punishment: 'N/A (procedural provision)',
    category: 'Criminal',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['FIR', 'First Information Report', 'complaint', 'cognizable case', 'police complaint', 'CrPC 154', 'zero FIR', 'e-FIR', 'information to police', 'station house officer', 'Lalita Kumari'],
    relatedSections: [
      { sectionNumber: '35', actCode: 'BNSS', title: 'When police may arrest without warrant' },
      { sectionNumber: '187', actCode: 'BNSS', title: 'Procedure when investigation cannot be completed in twenty-four hours' },
      { sectionNumber: '227', actCode: 'BNSS', title: 'Framing of charge' }
    ]
  },
  {
    act: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
    actCode: 'BNSS',
    sectionNumber: '187',
    title: 'Procedure when investigation cannot be completed in twenty-four hours',
    legalText: '(1) Whenever any person is arrested and detained in custody, and it appears that the investigation cannot be completed within the period of twenty-four hours fixed by section 58, and there are grounds for believing that the accusation or information is well-founded, the officer in charge of the police station or the police officer making the investigation, if he is not below the rank of sub-inspector, shall forthwith transmit to the nearest Judicial Magistrate a copy of the entries in the diary hereinafter prescribed relating to the case, and shall at the same time forward the accused to such Magistrate. (2) The Magistrate to whom an accused person is forwarded under this section may, whether he has or has not jurisdiction to try the case, from time to time, authorise the detention of the accused in such custody as such Magistrate thinks fit, for a term not exceeding fifteen days in the whole; and if he has no jurisdiction to try the case or commit it for trial, and considers further detention unnecessary, he may order the accused to be forwarded to a Magistrate having such jurisdiction. (3) The Magistrate authorising detention under this section shall record his reasons for authorising such detention. (4) If such order is given by a Magistrate other than the Chief Judicial Magistrate, he shall forward a copy of his order, with his reasons for making it, to the Chief Judicial Magistrate. (5) If in any case triable by a Magistrate, the investigation is not concluded within a period of sixty days from the date of information under section 173 or within a period of ninety days from such date where the investigation relates to an offence punishable with death, imprisonment for life, or imprisonment for a term of not less than ten years, the accused person shall be released on bail if he is prepared to and does furnish bail, and every person released on bail under this sub-section shall be deemed to be so released under the provisions of Chapter XXXV for the purposes of that Chapter.',
    explanation: 'This section (replacing CrPC Section 167) governs police remand and judicial custody when investigation extends beyond 24 hours. Key provisions: (1) Police must produce the arrested person before a Judicial Magistrate if investigation is incomplete within 24 hours. (2) The Magistrate can authorise police custody for up to 15 days total. (3) For judicial custody: maximum 60 days for less serious offences, 90 days for offences punishable with death/life imprisonment/10+ years. (4) DEFAULT BAIL: If the chargesheet/police report is not filed within these periods, the accused has an indefeasible right to bail (default bail/statutory bail). This right was emphasised by the Supreme Court in Bikramjit Singh v. State of Punjab (2020). The BNSS extends the period from 60/90 days compared to CrPC\'s 60/90 days framework.',
    punishment: 'N/A (procedural provision regarding remand and custody)',
    category: 'Criminal',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['remand', 'judicial custody', 'police custody', 'default bail', '24 hours', 'CrPC 167', 'police remand', 'investigation', 'statutory bail', 'chargesheet deadline', 'undertrial'],
    relatedSections: [
      { sectionNumber: '35', actCode: 'BNSS', title: 'When police may arrest without warrant' },
      { sectionNumber: '173', actCode: 'BNSS', title: 'Information in cognizable cases (FIR)' },
      { sectionNumber: '482', actCode: 'BNSS', title: 'Direction for grant of bail to person apprehending arrest' }
    ]
  },
  {
    act: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
    actCode: 'BNSS',
    sectionNumber: '482',
    title: 'Direction for grant of bail to person apprehending arrest (Anticipatory Bail)',
    legalText: '(1) When any person has reason to believe that he may be arrested on an accusation of having committed a non-bailable offence, he may apply to the High Court or the Court of Session for a direction under this section; and that Court may, if it thinks fit, direct that in the event of such arrest, he shall be released on bail. (2) When the High Court or the Court of Session makes a direction under sub-section (1), it may include such conditions in such directions in the light of the facts of the particular case, as it may think fit, including— (i) a condition that the person shall make himself available for interrogation by a police officer as and when required; (ii) a condition that the person shall not, directly or indirectly, make any inducement, threat or promise to any person acquainted with the facts of the case so as to dissuade him from disclosing such facts to the Court or to any police officer; (iii) a condition that the person shall not leave India without the previous permission of the Court; (iv) such other conditions as may be imposed under sub-section (3) of section 480, as if the bail were granted under that section. (3) If such person is thereafter arrested without warrant by an officer in charge of a police station on such accusation, and is prepared either at the time of arrest or at any time while in the custody of such officer to give bail, he shall be released on bail; and if a Magistrate taking cognizance of such offence decides that a warrant should be issued in the first instance against that person, he shall issue a bailable warrant in conformity with the direction of the Court under sub-section (1).',
    explanation: 'This section (replacing CrPC Section 438) provides for anticipatory bail — bail granted in anticipation of arrest. When a person apprehends arrest for a non-bailable offence, they can approach the High Court or Sessions Court seeking a direction that they be released on bail if arrested. The court considers factors like the nature/gravity of the accusation, antecedents, likelihood of fleeing, and whether the accusation is made to humiliate. The court can impose conditions: making available for interrogation, not threatening witnesses, not leaving India, etc. The Supreme Court in Sushila Aggarwal v. State (NCT of Delhi) (2020) held that anticipatory bail can be granted without any time limit and the protection can continue till the end of the trial.',
    punishment: 'N/A (procedural provision regarding anticipatory bail)',
    category: 'Criminal',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['anticipatory bail', 'pre-arrest bail', 'CrPC 438', 'bail before arrest', 'advance bail', 'apprehending arrest', 'non-bailable offence', 'Sushila Aggarwal'],
    relatedSections: [
      { sectionNumber: '35', actCode: 'BNSS', title: 'When police may arrest without warrant' },
      { sectionNumber: '187', actCode: 'BNSS', title: 'Procedure when investigation cannot be completed in twenty-four hours' },
      { sectionNumber: '528', actCode: 'BNSS', title: 'Inherent power of High Court' }
    ]
  },
  {
    act: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
    actCode: 'BNSS',
    sectionNumber: '528',
    title: 'Saving of inherent power of High Court',
    legalText: 'Nothing in this Sanhita shall be deemed to limit or affect the inherent powers of the High Court to make such orders as may be necessary to give effect to any order under this Sanhita, or to prevent abuse of the process of any Court or otherwise to secure the ends of justice: Provided that no order shall be made under this section in respect of any proceedings pending before the Supreme Court.',
    explanation: 'This section (replacing CrPC Section 482) preserves the inherent powers of the High Court — extraordinary powers that exist independent of any statutory provision. These powers are most commonly used to: (1) Quash FIRs and criminal proceedings that are frivolous, vexatious, or an abuse of process; (2) Quash criminal complaints where no offence is made out; (3) Give effect to settlements between parties in compoundable and certain non-compoundable offences; (4) Prevent miscarriage of justice. The Supreme Court in State of Haryana v. Bhajan Lal (1992) laid down categories of cases where inherent powers can be exercised to quash proceedings. These powers must be exercised sparingly, carefully, and with caution, and only when the court is convinced that the ends of justice require such exercise.',
    punishment: 'N/A (procedural provision regarding High Court powers)',
    category: 'Criminal',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['inherent powers', 'High Court', 'quashing', 'CrPC 482', 'abuse of process', 'ends of justice', 'FIR quashing', 'Bhajan Lal', 'quash complaint', 'extraordinary powers'],
    relatedSections: [
      { sectionNumber: '482', actCode: 'BNSS', title: 'Direction for grant of bail to person apprehending arrest' },
      { sectionNumber: '530', actCode: 'BNSS', title: 'Compounding of offences' },
      { sectionNumber: '227', actCode: 'BNSS', title: 'Framing of charge' }
    ]
  },
  {
    act: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
    actCode: 'BNSS',
    sectionNumber: '530',
    title: 'Compounding of offences',
    legalText: '(1) The offences punishable under the sections of the Bharatiya Nyaya Sanhita, 2023 specified in the first two columns of the Table next following may be compounded by the persons mentioned in the third column of that Table. (2) The offences punishable under the sections of the Bharatiya Nyaya Sanhita, 2023 specified in the first two columns of the Table next following may, with the permission of the Court before which any prosecution for such offence is pending, be compounded by the persons mentioned in the third column of that Table. (3) When any offence is compoundable under this section, the abetment of such offence or an attempt to commit such offence (when such attempt is itself an offence) or where the accused is liable under section 14 or section 15 of the Bharatiya Nyaya Sanhita, 2023, may be compounded in like manner. (4) The composition of an offence under this section shall have the effect of an acquittal of the accused with whom the offence has been compounded. (5) No offence shall be compounded if the accused is, by reason of a previous conviction, liable either to enhanced punishment or to a punishment of a different kind for such offence. (6) The offence of dacoity under sub-section (2) of section 310 of the Bharatiya Nyaya Sanhita, 2023 shall not be compoundable if the person accused of such offence has been previously convicted of the offence. (7) No offence shall be compounded except as provided by this section.',
    explanation: 'This section (replacing CrPC Section 320) allows certain offences to be settled between the complainant and the accused through compounding (mutual compromise). Two types exist: (1) Offences compoundable without court permission — the complainant can directly agree to drop charges (e.g., simple hurt, defamation, criminal trespass). (2) Offences compoundable with court permission — the court must approve the settlement (e.g., grievous hurt, theft, cheating). Compounding results in acquittal. Key conditions: it cannot be used if the accused is a repeat offender facing enhanced punishment; and abetment/attempt of compoundable offences can also be compounded. This provision encourages out-of-court settlement and reduces the burden on the criminal justice system.',
    punishment: 'N/A (procedural provision regarding compounding)',
    category: 'Criminal',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['compounding', 'settlement', 'compromise', 'CrPC 320', 'compoundable offence', 'mutual settlement', 'acquittal', 'out of court settlement', 'case settlement'],
    relatedSections: [
      { sectionNumber: '528', actCode: 'BNSS', title: 'Saving of inherent power of High Court' },
      { sectionNumber: '227', actCode: 'BNSS', title: 'Framing of charge' },
      { sectionNumber: '251', actCode: 'BNSS', title: 'Summary trial' }
    ]
  },
  {
    act: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
    actCode: 'BNSS',
    sectionNumber: '227',
    title: 'Framing of charge',
    legalText: '(1) If, after considering the record of the case and the documents submitted therewith, and after hearing the submissions of the accused and the prosecution, the Judge is of opinion that there is ground for presuming that the accused has committed an offence which— (a) is not exclusively triable by the Court of Session, he may, frame a charge against the accused and, by order, transfer the case for trial to the Chief Judicial Magistrate, or any other Judicial Magistrate of the first class and direct the accused to appear before the Chief Judicial Magistrate, or as the case may be, the Judicial Magistrate of the first class, on such date as he deems fit, and thereupon the Chief Judicial Magistrate, or as the case may be, the Judicial Magistrate of the first class, shall try the offence in accordance with the procedure for the trial of warrant cases instituted on a police report; (b) is exclusively triable by the Court, he shall frame in writing a charge against the accused. (2) Where the Judge frames any charge under clause (b) of sub-section (1), the charge shall be read and explained to the accused and the accused shall be asked whether he pleads guilty of the offence charged or claims to be tried.',
    explanation: 'This section (replacing CrPC Section 228) governs the framing of charges in sessions trials. After the Magistrate commits the case to the Sessions Court, the Sessions Judge examines the case record, documents, and hears both sides. If the Judge finds sufficient ground to presume the accused committed a sessions-triable offence, the charge is framed in writing. The charge is then read and explained to the accused, who is asked to plead guilty or claim trial. The standard for framing charges is "ground for presuming" — lower than "proof beyond reasonable doubt" required for conviction. If no ground exists, the accused is discharged under Section 226. Framing of charge is a critical stage that determines whether the trial will proceed.',
    punishment: 'N/A (procedural provision regarding charge framing)',
    category: 'Criminal',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['charge', 'framing of charge', 'charge sheet', 'CrPC 228', 'sessions trial', 'accused charge', 'discharge', 'prima facie case', 'trial stage'],
    relatedSections: [
      { sectionNumber: '173', actCode: 'BNSS', title: 'Information in cognizable cases (FIR)' },
      { sectionNumber: '251', actCode: 'BNSS', title: 'Summary trial' },
      { sectionNumber: '528', actCode: 'BNSS', title: 'Saving of inherent power of High Court' }
    ]
  },
  {
    act: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
    actCode: 'BNSS',
    sectionNumber: '251',
    title: 'Summary trials',
    legalText: '(1) Notwithstanding anything contained in this Sanhita— (a) any Chief Judicial Magistrate; (b) any Metropolitan Magistrate; (c) any Magistrate of the first class specially empowered in this behalf by the High Court, may, if he thinks fit, try in a summary way all or any of the following offences:— (i) offences not punishable with death, imprisonment for life or imprisonment for a term exceeding three years; (ii) theft, under section 303 of the Bharatiya Nyaya Sanhita, 2023, where the value of the property stolen does not exceed twenty thousand rupees; (iii) receiving or retaining stolen property, under section 317 of the Bharatiya Nyaya Sanhita, 2023, where the value of the property does not exceed twenty thousand rupees; (iv) lurking house-trespass or house-breaking under section 329, sub-section (1) of section 330, section 331 and sub-section (1) of section 332 of the Bharatiya Nyaya Sanhita, 2023; (v) assisting in the concealment or disposal of stolen property, under section 317 of the Bharatiya Nyaya Sanhita, 2023, where the value of such property does not exceed twenty thousand rupees; (vi) offences under section 135 of the Bharatiya Nyaya Sanhita, 2023; (vii) abetment of any of the foregoing offences; (viii) an attempt to commit any of the foregoing offences, when such attempt is an offence.',
    explanation: 'This section (replacing CrPC Section 260) provides for summary trials — a simplified and expedited procedure for trying minor offences. Only Chief Judicial Magistrates, Metropolitan Magistrates, and specially empowered First Class Magistrates can conduct summary trials. Eligible offences include: offences punishable with up to 3 years imprisonment, petty theft (up to ₹20,000), receiving stolen property (up to ₹20,000), house trespass, and their abetments/attempts. In summary trials: evidence is recorded concisely, no detailed judgment is required (only a brief statement of reasons), and the maximum sentence that can be imposed is 3 months imprisonment. This procedure helps clear the backlog of minor cases and ensures swift justice.',
    punishment: 'N/A (procedural provision). In summary trials, no sentence of imprisonment exceeding 3 months shall be passed',
    category: 'Criminal',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['summary trial', 'quick trial', 'CrPC 260', 'petty offences', 'magistrate trial', 'expedited trial', 'minor offences', 'simplified procedure', 'three months imprisonment'],
    relatedSections: [
      { sectionNumber: '227', actCode: 'BNSS', title: 'Framing of charge' },
      { sectionNumber: '530', actCode: 'BNSS', title: 'Compounding of offences' },
      { sectionNumber: '173', actCode: 'BNSS', title: 'Information in cognizable cases (FIR)' }
    ]
  }
];

async function seedBNSS() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const existing = await LegalSection.countDocuments({ actCode: 'BNSS' });
    if (existing > 0) {
      console.log(`🗑️  Removing ${existing} existing BNSS sections...`);
      await LegalSection.deleteMany({ actCode: 'BNSS' });
    }

    console.log(`📚 Seeding ${bnssSections.length} BNSS sections...\n`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📖 Bharatiya Nagarik Suraksha Sanhita, 2023');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    for (const section of bnssSections) {
      await LegalSection.create(section);
      console.log(`   ✅ BNSS Section ${section.sectionNumber} — ${section.title}`);
    }

    const totalBNSS = bnssSections.length;
    const totalAll = await LegalSection.countDocuments();

    console.log(`\n═══════════════════════════════════════════`);
    console.log(`🎉 BNSS SEEDING COMPLETE`);
    console.log(`═══════════════════════════════════════════`);
    console.log(`   BNSS sections added:  ${totalBNSS}`);
    console.log(`   Total DB sections:    ${totalAll}`);
    console.log(`═══════════════════════════════════════════\n`);

  } catch (error) {
    console.error('❌ Error seeding BNSS sections:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB.');
    process.exit(0);
  }
}

seedBNSS();
