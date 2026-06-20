require('dotenv').config();
const mongoose = require('mongoose');
const LegalSection = require('./models/LegalSection');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lawbook';

const sections = [
  // Special Marriage Act, 1954
  {
    act: 'Special Marriage Act, 1954',
    actCode: 'SMA',
    sectionNumber: '4',
    title: 'Conditions relating to solemnization of special marriages',
    legalText: 'Notwithstanding anything contained in any other law for the time being in force relating to the solemnization of marriages, a marriage between any two persons may be solemnized under this Act, if at the time of the marriage — (a) neither party has a spouse living; (b) neither party is an idiot or a lunatic; (c) the male has completed the age of twenty-one years and the female the age of eighteen years; (d) the parties are not within the degrees of prohibited relationship.',
    explanation: 'Any two persons can marry under this Act regardless of religion, caste or creed, provided they meet the age, mental capacity and relationship requirements.',
    punishment: 'N/A',
    category: 'Family',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['special marriage', 'inter-caste', 'inter-religion', 'civil marriage', 'conditions', 'age']
  },
  {
    act: 'Special Marriage Act, 1954',
    actCode: 'SMA',
    sectionNumber: '5',
    title: 'Notice of intended marriage',
    legalText: 'When a marriage is intended to be solemnized under this Act, the parties to the marriage shall give notice thereof in writing in the form specified in the Second Schedule to the Marriage Officer of the district in which at least one of the parties to the marriage has resided for a period of not less than thirty days immediately preceding the date on which such notice is given.',
    explanation: 'Parties must give 30 days written notice to the Marriage Officer of the district where at least one party has lived for 30 days before the marriage.',
    punishment: 'N/A',
    category: 'Family',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['notice', 'marriage officer', '30 days', 'special marriage']
  },
  {
    act: 'Special Marriage Act, 1954',
    actCode: 'SMA',
    sectionNumber: '27',
    title: 'Divorce',
    legalText: 'Subject to the provisions of this Act and to the rules made thereunder, a petition for divorce may be presented to the district court either by the husband or the wife on the ground that the respondent — (a) has, after the solemnization of the marriage, had voluntary sexual intercourse with any person other than his or her spouse; (b) has deserted the petitioner for a continuous period of not less than two years; (c) is undergoing a sentence of imprisonment for seven years or more; (d) has since the solemnization of the marriage treated the petitioner with cruelty; (e) has been incurably of unsound mind.',
    explanation: 'Either spouse can file for divorce on grounds of adultery, desertion (2+ years), imprisonment (7+ years), cruelty, or incurable unsoundness of mind.',
    punishment: 'N/A',
    category: 'Family',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['divorce', 'special marriage', 'adultery', 'desertion', 'cruelty', 'grounds']
  },
  {
    act: 'Special Marriage Act, 1954',
    actCode: 'SMA',
    sectionNumber: '28',
    title: 'Divorce by mutual consent',
    legalText: 'Subject to the provisions of this Act, a petition for divorce may be presented to the district court by both the parties to a marriage together, whether such marriage was solemnized before or after the commencement of the Special Marriage (Amendment) Act, 1970, on the ground that they have been living separately for a period of one year or more, that they have not been able to live together and that they have mutually agreed that the marriage should be dissolved.',
    explanation: 'Both spouses can jointly petition for divorce if they have lived separately for 1+ year and mutually agree the marriage should end.',
    punishment: 'N/A',
    category: 'Family',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['mutual consent', 'divorce', 'special marriage', 'separation']
  },

  // Muslim Personal Law (Shariat) Application Act, 1937
  {
    act: 'Muslim Personal Law (Shariat) Application Act, 1937',
    actCode: 'SHARIAT',
    sectionNumber: '2',
    title: 'Application of Personal Law to Muslims',
    legalText: 'Notwithstanding any custom or usage to the contrary, in all questions (save questions relating to agricultural land) regarding intestate succession, special property of females including personal property inherited or obtained under contract or gift or any other provision of Personal Law, marriage, dissolution of marriage including talaq, ila, zihar, lian, khula and mubaraat, maintenance, dower, guardianship, gifts, trusts and trust properties, and wakfs, the rule of decision in cases where the parties are Muslims shall be the Muslim Personal Law (Shariat).',
    explanation: 'For Muslims, Shariat law applies to matters of inheritance, marriage, divorce (talaq, khula, etc.), maintenance, dower, guardianship, gifts, trusts and wakfs, overriding any contrary custom.',
    punishment: 'N/A',
    category: 'Family',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['muslim', 'shariat', 'personal law', 'talaq', 'khula', 'dower', 'mehr', 'inheritance', 'wakf']
  },

  // Dissolution of Muslim Marriages Act, 1939
  {
    act: 'Dissolution of Muslim Marriages Act, 1939',
    actCode: 'DMM',
    sectionNumber: '2',
    title: 'Grounds for decree for dissolution of marriage',
    legalText: 'A woman married under Muslim law shall be entitled to obtain a decree for the dissolution of her marriage on any one or more of the following grounds: (i) that the whereabouts of the husband have not been known for a period of four years; (ii) that the husband has neglected or has failed to provide for her maintenance for a period of two years; (iii) that the husband has been sentenced to imprisonment for a period of seven years or upwards; (iv) that the husband has failed to perform, without reasonable cause, his marital obligations for a period of three years; (v) that the husband was impotent at the time of the marriage and continues to be so; (vi) that the husband has been insane for a period of two years or is suffering from leprosy or a virulent venereal disease; (vii) that she, having been given in marriage by her father or other guardian before she attained the age of fifteen years, repudiated the marriage before attaining the age of eighteen years; (viii) that the husband treats her with cruelty.',
    explanation: 'A Muslim woman can seek divorce through court if her husband is missing (4 years), fails to maintain her (2 years), is imprisoned (7+ years), fails marital duties (3 years), is impotent, is insane/diseased, or treats her with cruelty.',
    punishment: 'N/A',
    category: 'Family',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['muslim divorce', 'dissolution', 'khula', 'maintenance', 'cruelty', 'muslim woman']
  },

  // Indian Christian Marriage Act, 1872
  {
    act: 'Indian Christian Marriage Act, 1872',
    actCode: 'ICMA',
    sectionNumber: '4',
    title: 'Marriages to be solemnized according to this Act',
    legalText: 'Every marriage between persons, one or both of whom is or are a Christian or Christians, shall be solemnized in accordance with the provisions of this Act.',
    explanation: 'If at least one party to the marriage is a Christian, the marriage must be performed under the provisions of this Act.',
    punishment: 'N/A',
    category: 'Family',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['christian marriage', 'solemnization', 'church']
  },
  {
    act: 'Indian Christian Marriage Act, 1872',
    actCode: 'ICMA',
    sectionNumber: '60',
    title: 'Conditions for valid Christian marriage',
    legalText: 'Every marriage between Indian Christians applying for a certificate shall, without the preliminary notice required under Part III, be certified under this Part, if the following conditions be fulfilled: (a) neither party to the marriage shall have a husband or wife living at the time of the marriage; (b) the bridegroom shall have completed the age of twenty-one years and the bride the age of eighteen years; (c) each party to the marriage, if a minor, shall have obtained the consent of the parent or guardian.',
    explanation: 'For a valid Christian marriage, neither party should have a living spouse, the groom must be 21+ and bride 18+, and minors need parental consent.',
    punishment: 'N/A',
    category: 'Family',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['christian marriage', 'conditions', 'age', 'consent']
  },

  // Indian Divorce Act, 1869
  {
    act: 'Indian Divorce Act, 1869',
    actCode: 'IDA',
    sectionNumber: '10',
    title: 'Grounds for dissolution of marriage',
    legalText: 'Any marriage solemnized, whether before or after the commencement of the Indian Divorce (Amendment) Act, 2001, may, on a petition presented to the District Court either by the husband or the wife, be dissolved on the ground that since the solemnization of the marriage, the respondent — (i) has committed adultery; or (ii) has ceased to be Christian by conversion to another religion; or (iii) has been incurably of unsound mind for a continuous period of not less than two years; or (iv) has for a period of not less than two years been suffering from leprosy or venereal disease; or (v) has not been heard of as being alive for a period of seven years; or (vi) has wilfully refused to consummate the marriage; or (vii) has failed to comply with a decree of restitution of conjugal rights; or (viii) has deserted the petitioner for at least two years; or (ix) has treated the petitioner with such cruelty as to cause a reasonable apprehension that it would be harmful or injurious for the petitioner to live with the respondent.',
    explanation: 'A Christian marriage can be dissolved by court on grounds including adultery, conversion, insanity, desertion (2 years), cruelty, or refusal to consummate.',
    punishment: 'N/A',
    category: 'Family',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['christian divorce', 'dissolution', 'adultery', 'conversion', 'desertion', 'cruelty']
  },
  {
    act: 'Indian Divorce Act, 1869',
    actCode: 'IDA',
    sectionNumber: '10A',
    title: 'Divorce by mutual consent',
    legalText: 'Subject to the provisions of this Act and the rules made thereunder, a petition for dissolution of marriage may be presented to the District Court by both the parties to a marriage together, whether such marriage was solemnized before or after the commencement of the Indian Divorce (Amendment) Act, 2001, on the ground that they have been living separately for a period of two years or more, that they have not been able to live together and that they have mutually agreed that the marriage should be dissolved.',
    explanation: 'Both Christian spouses can jointly petition for divorce if they have lived separately for 2+ years and mutually agree to dissolve the marriage.',
    punishment: 'N/A',
    category: 'Family',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['christian divorce', 'mutual consent', 'separation']
  },

  // Parsi Marriage and Divorce Act, 1936
  {
    act: 'Parsi Marriage and Divorce Act, 1936',
    actCode: 'PMDA',
    sectionNumber: '3',
    title: 'Conditions for valid Parsi marriage',
    legalText: 'No marriage shall be valid if — (a) the contracting parties are related to each other in any of the degrees of consanguinity or affinity set forth in Schedule I; or (b) such marriage is not solemnized according to the Parsi form of ceremony called Ashirvad by a priest in the presence of two Parsi witnesses.',
    explanation: 'A valid Parsi marriage requires that parties are not within prohibited degrees of relationship and the ceremony must be performed by a Parsi priest (Ashirvad ceremony) with two Parsi witnesses.',
    punishment: 'N/A',
    category: 'Family',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['parsi marriage', 'ashirvad', 'zoroastrian', 'conditions']
  },
  {
    act: 'Parsi Marriage and Divorce Act, 1936',
    actCode: 'PMDA',
    sectionNumber: '32',
    title: 'Grounds for divorce',
    legalText: 'Any married person may sue for divorce on any one or more of the following grounds: (a) that the marriage has not been consummated within one year after its solemnization owing to the wilful refusal of the defendant; (b) that the defendant at the time of the marriage was of unsound mind; (c) that the defendant was at the time of the marriage pregnant by some person other than the plaintiff; (d) that the defendant has since the marriage committed adultery or fornication or bigamy or rape or an unnatural offence; (e) that the defendant has since the marriage voluntarily caused a grievous hurt to the plaintiff or has infected the plaintiff with venereal disease; (f) that the defendant has been sentenced to imprisonment for seven years or more; (g) that the defendant has deserted the plaintiff for at least two years; (h) that the defendant has ceased to be a Parsi by conversion; (i) that the defendant has been of continuously unsound mind for three years.',
    explanation: 'A Parsi spouse can seek divorce on grounds like non-consummation, adultery, cruelty, imprisonment (7+ years), desertion (2+ years), conversion from Parsi faith, or insanity (3+ years).',
    punishment: 'N/A',
    category: 'Family',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['parsi divorce', 'zoroastrian', 'grounds', 'adultery', 'desertion']
  },

  // Hindu Adoptions and Maintenance Act, 1956
  {
    act: 'Hindu Adoptions and Maintenance Act, 1956',
    actCode: 'HAMA',
    sectionNumber: '6',
    title: 'Requisites of a valid adoption',
    legalText: 'No adoption shall be valid unless — (i) the person adopting has the capacity, and also the right, to take in adoption; (ii) the person giving in adoption has the capacity to do so; (iii) the person adopted is capable of being taken in adoption; and (iv) the adoption is made in compliance with the other conditions mentioned in this Chapter.',
    explanation: 'For a valid Hindu adoption, the adopter must have capacity and right to adopt, the person giving in adoption must have capacity, the child must be eligible, and all legal conditions must be met.',
    punishment: 'N/A',
    category: 'Family',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['adoption', 'hindu', 'valid adoption', 'requisites', 'capacity']
  },
  {
    act: 'Hindu Adoptions and Maintenance Act, 1956',
    actCode: 'HAMA',
    sectionNumber: '18',
    title: 'Maintenance of wife',
    legalText: 'Subject to the provisions of this section, a Hindu wife, whether married before or after the commencement of this Act, shall be entitled to be maintained by her husband during her lifetime. A Hindu wife shall be entitled to live separately from her husband without forfeiting her claim to maintenance if — (a) he is guilty of desertion; (b) he has treated her with such cruelty as to cause a reasonable apprehension that it will be harmful or injurious for her to live with him; (c) he is suffering from a virulent form of leprosy; (d) he has any other wife living; (e) he keeps a concubine in the same house or habitually resides with a concubine; (f) he has ceased to be a Hindu by conversion; (g) any other cause justifying her living separately.',
    explanation: 'A Hindu wife is entitled to lifelong maintenance from her husband. She can live separately and still claim maintenance if the husband deserts her, is cruel, has another wife, keeps a concubine, converts from Hinduism, etc.',
    punishment: 'N/A',
    category: 'Family',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['maintenance', 'wife', 'hindu', 'desertion', 'cruelty', 'separate living']
  },

  // Guardians and Wards Act, 1890
  {
    act: 'Guardians and Wards Act, 1890',
    actCode: 'GWA',
    sectionNumber: '7',
    title: 'Power of the court to make order as to guardianship',
    legalText: 'Where the court is satisfied that it is for the welfare of a minor that an order should be made — (a) appointing a guardian of his person or property, or both, or (b) declaring a person to be such a guardian, the court may make an order accordingly.',
    explanation: 'The court has the power to appoint or declare a guardian for a minor\'s person or property when it is in the child\'s best interests.',
    punishment: 'N/A',
    category: 'Family',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['guardian', 'ward', 'minor', 'custody', 'welfare', 'court order']
  },
  {
    act: 'Guardians and Wards Act, 1890',
    actCode: 'GWA',
    sectionNumber: '17',
    title: 'Matters to be considered by the court in appointing guardian',
    legalText: 'In appointing or declaring the guardian of a minor, the court shall, subject to the provisions of this section, be guided by what, consistently with the law to which the minor is subject, appears in the circumstances to be for the welfare of the minor, regard being had to the age, sex and religion of the minor, the character and capacity of the proposed guardian, his nearness of kin to the minor, the wishes if any of a deceased parent, and any existing or previous relations of the proposed guardian with the minor or his property.',
    explanation: 'When appointing a guardian, the court considers the child\'s welfare above all, taking into account the child\'s age, sex, religion, the proposed guardian\'s character, kinship, deceased parent\'s wishes, and prior relationship with the child.',
    punishment: 'N/A',
    category: 'Family',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['guardian', 'welfare', 'minor', 'custody', 'best interests', 'court']
  },

  // Indian Succession Act, 1925
  {
    act: 'Indian Succession Act, 1925',
    actCode: 'ISA',
    sectionNumber: '59',
    title: 'Person capable of making wills',
    legalText: 'Every person of sound mind not being a minor may dispose of his property by will. A married woman may dispose of by will any property which she could alienate by her own act during her life. Persons who are deaf or dumb or blind are not thereby incapacitated for making a will if they are able to know what they do by it. A person who is ordinarily insane may make a will during interval in which he is of sound mind.',
    explanation: 'Any person who is of sound mind and not a minor can make a will. Married women, deaf, dumb, and blind persons can also make wills. Even an insane person can make a will during a lucid interval.',
    punishment: 'N/A',
    category: 'Family',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['will', 'testament', 'succession', 'sound mind', 'minor', 'capacity']
  },
  {
    act: 'Indian Succession Act, 1925',
    actCode: 'ISA',
    sectionNumber: '63',
    title: 'Execution of unprivileged wills',
    legalText: 'Every testator, not being a soldier employed in an expedition or engaged in actual warfare, or an airman so employed or engaged, or a mariner at sea, shall execute his will according to the following rules: (a) The testator shall sign or shall affix his mark to the will, or it shall be signed by some other person in his presence and by his direction. (b) The signature or mark of the testator, or the signature of the person signing for him, shall be so placed that it shall appear that it was intended thereby to give effect to the writing as a will. (c) The will shall be attested by two or more witnesses, each of whom has seen the testator sign or affix his mark to the will or has received from the testator a personal acknowledgement of his signature or mark.',
    explanation: 'A will must be signed by the testator (or marked/signed by someone in their presence and direction) and attested by at least 2 witnesses who saw the testator sign or received acknowledgement of the signature.',
    punishment: 'N/A',
    category: 'Family',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['will', 'execution', 'attestation', 'witnesses', 'signature', 'testament']
  },

  // Prohibition of Child Marriage Act, 2006
  {
    act: 'Prohibition of Child Marriage Act, 2006',
    actCode: 'PCMA',
    sectionNumber: '3',
    title: 'Child marriage to be voidable at the option of contracting party being a child',
    legalText: 'Every child marriage, whether solemnized before or after the commencement of this Act, shall be voidable at the option of the contracting party who was a child at the time of the marriage. A petition for annulling a child marriage may be filed in the district court by the contracting party who was a child at the time of marriage, at any time but before the child filing the petition completes two years of attaining majority.',
    explanation: 'A child marriage is voidable — the person who was a child at the time can petition the court to annul it, but must do so before turning 20 (for girls) or 23 (for boys).',
    punishment: 'N/A',
    category: 'Family',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['child marriage', 'voidable', 'annulment', 'minor']
  },
  {
    act: 'Prohibition of Child Marriage Act, 2006',
    actCode: 'PCMA',
    sectionNumber: '9',
    title: 'Punishment for male adult marrying a child',
    legalText: 'Whoever, being a male adult above eighteen years of age, contracts a child marriage shall be punishable with rigorous imprisonment which may extend to two years or with fine which may extend to one lakh rupees or with both.',
    explanation: 'An adult male who marries a child (girl below 18) faces up to 2 years rigorous imprisonment and/or fine up to Rs 1 lakh.',
    punishment: 'Rigorous imprisonment up to 2 years and/or fine up to Rs 1,00,000',
    category: 'Family',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['child marriage', 'punishment', 'adult male', 'minor bride']
  },
  {
    act: 'Prohibition of Child Marriage Act, 2006',
    actCode: 'PCMA',
    sectionNumber: '10',
    title: 'Punishment for solemnizing a child marriage',
    legalText: 'Whoever performs, conducts, directs or abets any child marriage shall be punishable with rigorous imprisonment which may extend to two years and shall also be liable to fine which may extend to one lakh rupees unless he proves that he had reasons to believe that the marriage was not a child marriage.',
    explanation: 'Anyone who performs, conducts or helps in a child marriage faces up to 2 years rigorous imprisonment and fine up to Rs 1 lakh, unless they can prove they believed it was not a child marriage.',
    punishment: 'Rigorous imprisonment up to 2 years and fine up to Rs 1,00,000',
    category: 'Family',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['child marriage', 'solemnization', 'punishment', 'priest', 'pandit']
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const codes = ['SMA', 'SHARIAT', 'DMM', 'ICMA', 'IDA', 'PMDA', 'HAMA', 'GWA', 'ISA', 'PCMA'];
    for (const code of codes) {
      const deleted = await LegalSection.deleteMany({ actCode: code });
      if (deleted.deletedCount > 0) console.log(`Cleared ${deleted.deletedCount} existing ${code} sections`);
    }

    for (let i = 0; i < sections.length; i++) {
      await LegalSection.create(sections[i]);
      console.log(`[${i + 1}/${sections.length}] Section ${sections[i].sectionNumber}: ${sections[i].title}`);
    }

    console.log(`Done: seeded ${sections.length} personal law sections`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed();
