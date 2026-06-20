require('dotenv').config();
const mongoose = require('mongoose');
const LegalSection = require('./models/LegalSection');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lawbook';

const sections = [
  {
    act: 'Information Technology Act, 2000',
    actCode: 'ITA',
    sectionNumber: '43',
    title: 'Penalty and compensation for damage to computer, computer system, etc.',
    legalText: 'If any person without permission of the owner or any other person who is in charge of a computer, computer system or computer network — (a) accesses or secures access to such computer, computer system or computer network or computer resource; (b) downloads, copies or extracts any data, computer data base or information from such computer, computer system or computer network; (c) introduces or causes to be introduced any computer contaminant or computer virus into any computer, computer system or computer network; (d) damages or causes to be damaged any computer, computer system or computer network, data, computer data base or any other programmes residing in such computer; (e) disrupts or causes disruption of any computer, computer system or computer network — he shall be liable to pay damages by way of compensation to the person so affected.',
    explanation: 'If someone accesses your computer without permission, copies your data, introduces a virus, damages your system, or disrupts your network, they must pay compensation. This covers hacking, data theft, and computer damage.',
    punishment: 'Compensation up to Rs 5 crore (as determined by adjudicating officer)',
    category: 'Cyber',
    cognizable: 'No',
    bailable: 'N/A',
    keywords: ['computer damage', 'hacking', 'unauthorized access', 'virus', 'data theft', 'compensation', 'cyber crime']
  },
  {
    act: 'Information Technology Act, 2000',
    actCode: 'ITA',
    sectionNumber: '43A',
    title: 'Compensation for failure to protect data',
    legalText: 'Where a body corporate, possessing, dealing or handling any sensitive personal data or information in a computer resource which it owns, controls or operates, is negligent in implementing and maintaining reasonable security practices and procedures and thereby causes wrongful loss or wrongful gain to any person, such body corporate shall be liable to pay damages by way of compensation to the person so affected.',
    explanation: 'Companies that handle sensitive personal data (like banks, hospitals, IT companies) must implement proper security measures. If they fail to do so and your data is breached, they must compensate you for the loss.',
    punishment: 'Compensation as determined by adjudicating officer',
    category: 'Cyber',
    cognizable: 'No',
    bailable: 'N/A',
    keywords: ['data protection', 'data breach', 'sensitive personal data', 'corporate liability', 'security practices', 'negligence']
  },
  {
    act: 'Information Technology Act, 2000',
    actCode: 'ITA',
    sectionNumber: '65',
    title: 'Tampering with computer source documents',
    legalText: 'Whoever knowingly or intentionally conceals, destroys or alters or intentionally or knowingly causes another to conceal, destroy, or alter any computer source code used for a computer, computer programme, computer system or computer network, when the computer source code is required to be kept or maintained by law for the time being in force, shall be punishable with imprisonment up to three years, or with fine which may extend up to two lakh rupees, or with both.',
    explanation: 'If someone intentionally hides, destroys, or changes computer source code that is required to be maintained by law, they can be punished. This is like tampering with evidence in the digital world.',
    punishment: 'Imprisonment up to 3 years, or fine up to Rs 2 lakh, or both',
    category: 'Cyber',
    cognizable: 'Yes',
    bailable: 'Yes',
    keywords: ['source code', 'tampering', 'computer programme', 'alteration', 'concealment', 'destruction']
  },
  {
    act: 'Information Technology Act, 2000',
    actCode: 'ITA',
    sectionNumber: '66',
    title: 'Computer related offences',
    legalText: 'If any person, dishonestly or fraudulently, does any act referred to in section 43, he shall be punishable with imprisonment for a term which may extend to three years or with fine which may extend to five lakh rupees or with both.',
    explanation: 'If hacking or computer damage (covered under Section 43) is done dishonestly or fraudulently (with criminal intent), it becomes a criminal offence punishable with jail, not just a civil wrong requiring compensation.',
    punishment: 'Imprisonment up to 3 years, or fine up to Rs 5 lakh, or both',
    category: 'Cyber',
    cognizable: 'Yes',
    bailable: 'Yes',
    keywords: ['hacking', 'computer offence', 'dishonest', 'fraudulent', 'criminal hacking', 'cyber crime']
  },
  {
    act: 'Information Technology Act, 2000',
    actCode: 'ITA',
    sectionNumber: '66A',
    title: 'Punishment for sending offensive messages through communication service, etc. [STRUCK DOWN]',
    legalText: '[STRUCK DOWN by the Supreme Court of India in Shreya Singhal v. Union of India (2015) as unconstitutional — violating Article 19(1)(a) of the Constitution regarding freedom of speech and expression.] The original section punished sending offensive, false, or threatening messages through computers or communication devices with imprisonment up to 3 years and fine.',
    explanation: 'This section was declared unconstitutional by the Supreme Court in 2015 (Shreya Singhal case). It was struck down because it was too vague and violated the right to free speech. It could be used to arrest people for social media posts. The section is no longer valid law.',
    punishment: 'STRUCK DOWN — No longer applicable',
    category: 'Cyber',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['66A', 'struck down', 'Shreya Singhal', 'offensive messages', 'unconstitutional', 'free speech', 'social media'],
    isRepealed: true
  },
  {
    act: 'Information Technology Act, 2000',
    actCode: 'ITA',
    sectionNumber: '66B',
    title: 'Punishment for dishonestly receiving stolen computer resource or communication device',
    legalText: 'Whoever dishonestly receives or retains any stolen computer resource or communication device knowing or having reason to believe the same to be stolen computer resource or communication device, shall be punished with imprisonment of either description for a term which may extend to three years or with fine which may extend to rupees one lakh or with both.',
    explanation: 'If you knowingly receive or keep a stolen computer, mobile phone, or other communication device, you can be punished. This applies even if you didn\'t steal it yourself — just possessing stolen digital equipment is an offence.',
    punishment: 'Imprisonment up to 3 years, or fine up to Rs 1 lakh, or both',
    category: 'Cyber',
    cognizable: 'Yes',
    bailable: 'Yes',
    keywords: ['stolen computer', 'receiving stolen property', 'communication device', 'possession', 'dishonestly']
  },
  {
    act: 'Information Technology Act, 2000',
    actCode: 'ITA',
    sectionNumber: '66C',
    title: 'Punishment for identity theft',
    legalText: 'Whoever, fraudulently or dishonestly make use of the electronic signature, password or any other unique identification feature of any other person, shall be punished with imprisonment of either description for a term which may extend to three years and shall also be liable to fine which may extend to rupees one lakh.',
    explanation: 'Using someone else\'s electronic signature, password, or any unique identification feature (like Aadhaar, digital ID) fraudulently is identity theft. This includes using someone\'s social media password, email password, or digital signature without permission.',
    punishment: 'Imprisonment up to 3 years and fine up to Rs 1 lakh',
    category: 'Cyber',
    cognizable: 'Yes',
    bailable: 'Yes',
    keywords: ['identity theft', 'password theft', 'electronic signature', 'impersonation', 'fraud', 'unique identification']
  },
  {
    act: 'Information Technology Act, 2000',
    actCode: 'ITA',
    sectionNumber: '66D',
    title: 'Punishment for cheating by personation by using computer resource',
    legalText: 'Whoever, by means for any communication device or computer resource cheats by personating, shall be punished with imprisonment of either description for a term which may extend to three years and shall also be liable to fine which may extend to one lakh rupees.',
    explanation: 'Cheating someone by pretending to be someone else online (using fake profiles, phishing emails, or fake websites) is a criminal offence. This covers online scams, phishing attacks, and impersonation on social media for fraud.',
    punishment: 'Imprisonment up to 3 years and fine up to Rs 1 lakh',
    category: 'Cyber',
    cognizable: 'Yes',
    bailable: 'Yes',
    keywords: ['cheating', 'personation', 'phishing', 'online fraud', 'fake profile', 'impersonation', 'scam']
  },
  {
    act: 'Information Technology Act, 2000',
    actCode: 'ITA',
    sectionNumber: '66E',
    title: 'Punishment for violation of privacy',
    legalText: 'Whoever, intentionally or knowingly captures, publishes or transmits the image of a private area of any person without his or her consent, under circumstances violating the privacy of that person, shall be punished with imprisonment which may extend to three years or with fine not exceeding two lakh rupees, or with both.',
    explanation: 'Taking, publishing, or sharing intimate/private images of any person without their consent is a criminal offence. This covers revenge pornography, hidden camera recordings, and non-consensual sharing of private images.',
    punishment: 'Imprisonment up to 3 years, or fine up to Rs 2 lakh, or both',
    category: 'Cyber',
    cognizable: 'Yes',
    bailable: 'Yes',
    keywords: ['privacy violation', 'private images', 'without consent', 'voyeurism', 'revenge porn', 'hidden camera']
  },
  {
    act: 'Information Technology Act, 2000',
    actCode: 'ITA',
    sectionNumber: '66F',
    title: 'Punishment for cyber terrorism',
    legalText: 'Whoever, (A) with intent to threaten the unity, integrity, security or sovereignty of India or to strike terror in the people or any section of the people by — (i) denying or cause the denial of access to any person authorised to access computer resource; or (ii) attempting to penetrate or access a computer resource without authorisation or exceeding authorised access; and (B) knowingly or intentionally penetrates or accesses a computer resource without authorisation or exceeding authorised access, and by means of such conduct obtains access to information, data or computer database that is restricted for reasons of the security of the State or foreign relations; or any restricted information, data or computer database, with reasons to believe that such information, data or computer database so obtained may be used to cause or likely to cause injury to the interests of the sovereignty and integrity of India, the security of the State, friendly relations with foreign States, public order, decency or morality, shall be punishable with imprisonment which may extend to imprisonment for life.',
    explanation: 'Hacking government or critical infrastructure systems with the intent to threaten India\'s unity, integrity, or sovereignty, or to strike terror, is cyber terrorism. This is the most severe cyber crime with the harshest punishment.',
    punishment: 'Imprisonment for life',
    category: 'Cyber',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['cyber terrorism', 'national security', 'critical infrastructure', 'sovereignty', 'life imprisonment', 'terror']
  },
  {
    act: 'Information Technology Act, 2000',
    actCode: 'ITA',
    sectionNumber: '67',
    title: 'Punishment for publishing or transmitting obscene material in electronic form',
    legalText: 'Whoever publishes or transmits or causes to be published or transmitted in the electronic form, any material which is lascivious or appeals to the prurient interest or if its effect is such as to tend to deprave and corrupt persons, shall be punished on first conviction with imprisonment of either description for a term which may extend to three years and with fine which may extend to five lakh rupees and in the event of second or subsequent conviction with imprisonment of either description for a term which may extend to five years and also with fine which may extend to ten lakh rupees.',
    explanation: 'Publishing or sharing obscene material electronically (online pornography, obscene images/videos) is punishable. The punishment increases for repeat offenders.',
    punishment: 'First offence: up to 3 years + Rs 5 lakh fine. Subsequent: up to 5 years + Rs 10 lakh fine',
    category: 'Cyber',
    cognizable: 'Yes',
    bailable: 'Yes',
    keywords: ['obscene material', 'pornography', 'online obscenity', 'electronic form', 'publishing', 'lascivious']
  },
  {
    act: 'Information Technology Act, 2000',
    actCode: 'ITA',
    sectionNumber: '67A',
    title: 'Punishment for publishing or transmitting material containing sexually explicit act',
    legalText: 'Whoever publishes or transmits or causes to be published or transmitted in the electronic form any material which contains sexually explicit act or conduct, shall be punished on first conviction with imprisonment of either description for a term which may extend to five years and with fine which may extend to ten lakh rupees and in the event of second or subsequent conviction with imprisonment of either description for a term which may extend to seven years and also with fine which may extend to ten lakh rupees.',
    explanation: 'Publishing or sharing sexually explicit material electronically carries a heavier punishment than obscene material under Section 67. This includes explicit videos, images, and content shared without consent.',
    punishment: 'First offence: up to 5 years + Rs 10 lakh fine. Subsequent: up to 7 years + Rs 10 lakh fine',
    category: 'Cyber',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['sexually explicit', 'explicit content', 'adult content', 'electronic publishing', 'sexual act']
  },
  {
    act: 'Information Technology Act, 2000',
    actCode: 'ITA',
    sectionNumber: '67B',
    title: 'Punishment for publishing or transmitting material depicting children in sexually explicit act',
    legalText: 'Whoever, publishes or transmits or causes to be published or transmitted material in any electronic form which depicts children engaged in sexually explicit act or conduct, or creates text or digital images, collects, seeks, browses, downloads, advertises, promotes, exchanges or distributes material in any electronic form depicting children in obscene or indecent or sexually explicit manner, or cultivates, entices or induces children to online relationship with one or more children for and on sexually explicit act, shall be punished on first conviction with imprisonment of either description for a term which may extend to five years and with fine which may extend to ten lakh rupees and in the event of second or subsequent conviction with imprisonment of either description for a term which may extend to seven years and also with fine which may extend to ten lakh rupees.',
    explanation: 'Any involvement with child sexual abuse material (CSAM) online — creating, publishing, downloading, sharing, or even browsing — is a serious criminal offence. This also covers online grooming of children.',
    punishment: 'First offence: up to 5 years + Rs 10 lakh fine. Subsequent: up to 7 years + Rs 10 lakh fine',
    category: 'Cyber',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['child pornography', 'CSAM', 'child exploitation', 'online grooming', 'child abuse material', 'minors']
  },
  {
    act: 'Information Technology Act, 2000',
    actCode: 'ITA',
    sectionNumber: '72',
    title: 'Penalty for breach of confidentiality and privacy',
    legalText: 'Save as otherwise provided in this Act or any other law for the time being in force, if any person who, in pursuance of any of the powers conferred under this Act, rules or regulations made thereunder, has secured access to any electronic record, book, register, correspondence, information, document or other material without the consent of the person concerned discloses such electronic record, book, register, correspondence, information, document or other material to any other person shall be punished with imprisonment for a term which may extend to two years, or with fine which may extend to one lakh rupees, or with both.',
    explanation: 'If a government official or any person who has legally accessed private electronic records discloses that information to unauthorized persons without consent, they can be punished. This protects the confidentiality of data accessed during investigations.',
    punishment: 'Imprisonment up to 2 years, or fine up to Rs 1 lakh, or both',
    category: 'Cyber',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['confidentiality', 'privacy', 'disclosure', 'breach', 'electronic record', 'unauthorized disclosure']
  },
  {
    act: 'Information Technology Act, 2000',
    actCode: 'ITA',
    sectionNumber: '72A',
    title: 'Punishment for disclosure of information in breach of lawful contract',
    legalText: 'Save as otherwise provided in this Act or any other law for the time being in force, any person including an intermediary who, while providing services under the terms of lawful contract, has secured access to any material containing personal information about another person, with the intent to cause or knowing that he is likely to cause wrongful loss or wrongful gain discloses, without the consent of the person concerned, or in breach of a lawful contract, such material to any other person, shall be punished with imprisonment for a term which may extend to three years, or with fine which may extend to five lakh rupees, or with both.',
    explanation: 'If an employee, contractor, or intermediary who has access to personal information through their work leaks that data in violation of their contract, they can be punished. This protects employee data, client information, and personal data handled by IT companies.',
    punishment: 'Imprisonment up to 3 years, or fine up to Rs 5 lakh, or both',
    category: 'Cyber',
    cognizable: 'Yes',
    bailable: 'Yes',
    keywords: ['data leak', 'contract breach', 'personal information', 'wrongful disclosure', 'intermediary', 'employee data leak']
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const deleted = await LegalSection.deleteMany({ actCode: 'ITA' });
    console.log(`🗑️ Cleared ${deleted.deletedCount} existing IT Act sections`);

    for (let i = 0; i < sections.length; i++) {
      await LegalSection.create(sections[i]);
      console.log(`✅ [${i + 1}/${sections.length}] Section ${sections[i].sectionNumber}: ${sections[i].title}`);
    }

    console.log(`\n📊 SUMMARY: Seeded ${sections.length} Information Technology Act sections`);
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
}

seed();
