require('dotenv').config();
const mongoose = require('mongoose');
const CourtVerdict = require('./models/CourtVerdict');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lawbook';

const verdicts = [
  // ═══════════════════════════════════════════════
  // CONSTITUTIONAL LAW (~15)
  // ═══════════════════════════════════════════════
  {
    caseName: 'Kesavananda Bharati v. State of Kerala',
    citation: '(1973) 4 SCC 225',
    court: 'Supreme Court',
    year: 1973,
    judges: ['S.M. Sikri', 'J.M. Shelat', 'K.S. Hegde', 'A.N. Grover', 'A.N. Ray', 'P. Jaganmohan Reddy', 'H.R. Khanna', 'K.K. Mathew', 'M.H. Beg', 'S.N. Dwivedi', 'A.K. Mukherjea', 'Y.V. Chandrachud', 'A.G. Palekar'],
    summary: 'The Supreme Court, in a 7-6 decision by a 13-judge bench, held that Parliament has wide powers to amend the Constitution under Article 368 but cannot alter its basic structure.',
    legalPrinciple: 'The Basic Structure Doctrine — Parliament can amend any part of the Constitution so long as it does not destroy or damage the basic structure or framework of the Constitution.',
    verdict: 'The court upheld the validity of the 24th, 25th, and 29th Constitutional Amendments but struck down Section 3 of the 25th Amendment, holding that the power of amendment under Article 368 does not enable Parliament to alter the basic structure of the Constitution.',
    significance: 'This is the most important constitutional decision in Indian history. The Basic Structure Doctrine became the cornerstone of Indian constitutional law, limiting Parliament\'s amending power and preserving the supremacy of the Constitution.',
    relatedSections: ['Article 368', 'Article 31C', 'Article 13'],
    relatedActs: ['Constitution of India', '24th Amendment Act', '25th Amendment Act', '29th Amendment Act'],
    category: 'Constitutional',
    keywords: ['basic structure', 'amendment power', 'fundamental rights', 'directive principles', 'judicial review', 'constituent power']
  },
  {
    caseName: 'Maneka Gandhi v. Union of India',
    citation: '(1978) 1 SCC 248',
    court: 'Supreme Court',
    year: 1978,
    judges: ['M.H. Beg', 'Y.V. Chandrachud', 'V.R. Krishna Iyer', 'P.N. Bhagwati', 'N.L. Untwalia', 'S. Murtaza Fazal Ali', 'P.S. Kailasam'],
    summary: 'Maneka Gandhi\'s passport was impounded by the government without giving reasons. The Supreme Court expanded the scope of Article 21, holding that the right to life and personal liberty is not merely a right to physical existence but includes the right to live with dignity.',
    legalPrinciple: 'The procedure established by law under Article 21 must be right, just, and fair, and not arbitrary, fanciful, or oppressive. Articles 14, 19, and 21 are not mutually exclusive but form a golden triangle.',
    verdict: 'The court held that the right to travel abroad is part of personal liberty under Article 21. The Passports Act must conform to Article 14 (equality) and Article 21 (due process). The impounding of Maneka Gandhi\'s passport without a hearing was unconstitutional.',
    significance: 'Revolutionized the interpretation of Article 21, expanding it far beyond mere animal existence. Established the doctrine of substantive due process in Indian constitutional law and linked Articles 14, 19, and 21 as a single framework.',
    relatedSections: ['Article 14', 'Article 19', 'Article 21'],
    relatedActs: ['Constitution of India', 'Passports Act, 1967'],
    category: 'Constitutional',
    keywords: ['personal liberty', 'due process', 'right to travel', 'golden triangle', 'natural justice', 'procedure established by law']
  },
  {
    caseName: 'Minerva Mills Ltd. v. Union of India',
    citation: '(1980) 3 SCC 625',
    court: 'Supreme Court',
    year: 1980,
    judges: ['Y.V. Chandrachud', 'P.N. Bhagwati', 'A.C. Gupta', 'N.L. Untwalia', 'P.S. Kailasam'],
    summary: 'The court examined the constitutional validity of Sections 4 and 55 of the 42nd Amendment Act, 1976, which attempted to give Parliament unlimited amending power and made Directive Principles superior to Fundamental Rights.',
    legalPrinciple: 'Judicial review is a basic feature of the Constitution. The harmony between Fundamental Rights and Directive Principles is an essential feature of the basic structure.',
    verdict: 'The Supreme Court struck down Sections 4 and 55 of the 42nd Amendment as they destroyed the essential balance between Fundamental Rights and Directive Principles. The court reaffirmed that judicial review is part of the basic structure.',
    significance: 'Reinforced and strengthened the Basic Structure Doctrine. Established that judicial review cannot be taken away by constitutional amendment. Maintained the balance between Fundamental Rights (Part III) and Directive Principles (Part IV).',
    relatedSections: ['Article 31C', 'Article 368', 'Article 14', 'Article 19'],
    relatedActs: ['Constitution of India', '42nd Amendment Act, 1976'],
    category: 'Constitutional',
    keywords: ['basic structure', 'judicial review', 'fundamental rights', 'directive principles', '42nd amendment', 'unlimited amending power']
  },
  {
    caseName: 'S.R. Bommai v. Union of India',
    citation: '(1994) 3 SCC 1',
    court: 'Supreme Court',
    year: 1994,
    judges: ['P.B. Sawant', 'K. Ramaswamy', 'S.C. Agrawal', 'Yogeshwar Dayal', 'B.P. Jeevan Reddy', 'S.R. Pandian', 'A.M. Ahmadi', 'J.S. Verma', 'S.P. Bharucha'],
    summary: 'A nine-judge bench examined the scope and limitations of the President\'s power to dismiss state governments under Article 356 of the Constitution.',
    legalPrinciple: 'The power under Article 356 (President\'s Rule) is not absolute and is subject to judicial review. Secularism is a basic feature of the Constitution. The floor test is the only way to determine majority in a state legislature.',
    verdict: 'The court held that the President\'s proclamation under Article 356 is subject to judicial review. The court can examine whether the proclamation was based on relevant material. Secularism is part of the basic structure of the Constitution.',
    significance: 'Curbed the misuse of Article 356, which had been used over 100 times to dismiss state governments for political reasons. Established federalism and secularism as basic features of the Constitution. Set clear guidelines for invoking President\'s Rule.',
    relatedSections: ['Article 356', 'Article 74', 'Article 355'],
    relatedActs: ['Constitution of India'],
    category: 'Constitutional',
    keywords: ['president\'s rule', 'federalism', 'secularism', 'judicial review', 'floor test', 'state government dismissal', 'basic structure']
  },
  {
    caseName: 'Justice K.S. Puttaswamy (Retd.) v. Union of India',
    citation: '(2017) 10 SCC 1',
    court: 'Supreme Court',
    year: 2017,
    judges: ['J.S. Khehar', 'J. Chelameswar', 'S.A. Bobde', 'R.K. Agrawal', 'Rohinton F. Nariman', 'A.M. Sapre', 'D.Y. Chandrachud', 'Sanjay Kishan Kaul', 'S. Abdul Nazeer'],
    summary: 'A nine-judge Constitution bench unanimously declared that the right to privacy is a fundamental right protected under Articles 14, 19, and 21 of the Constitution.',
    legalPrinciple: 'The right to privacy is a constitutionally protected fundamental right. It is intrinsic to life and liberty under Article 21 and the freedoms guaranteed by Part III of the Constitution.',
    verdict: 'The Supreme Court unanimously held that the right to privacy is a fundamental right. It overruled M.P. Sharma v. Satish Chandra (1954) and Kharak Singh v. State of U.P. (1962) to the extent they held that privacy is not a fundamental right.',
    significance: 'Landmark decision recognizing privacy as a fundamental right, impacting issues like Aadhaar, data protection, surveillance, sexual orientation, food habits, and personal autonomy. Laid the foundation for the decriminalization of homosexuality.',
    relatedSections: ['Article 14', 'Article 19', 'Article 21'],
    relatedActs: ['Constitution of India', 'Aadhaar Act, 2016', 'Information Technology Act, 2000'],
    category: 'Constitutional',
    keywords: ['right to privacy', 'fundamental right', 'data protection', 'aadhaar', 'personal autonomy', 'informational privacy', 'dignity']
  },
  {
    caseName: 'Golaknath v. State of Punjab',
    citation: 'AIR 1967 SC 1643',
    court: 'Supreme Court',
    year: 1967,
    judges: ['K. Subba Rao', 'J.C. Shah', 'S.M. Sikri', 'J.R. Mudholkar', 'K.N. Wanchoo', 'M. Hidayatullah', 'R.S. Bachawat', 'V. Ramaswami', 'V. Bhargava', 'G.K. Mitter', 'C.A. Vaidialingam'],
    summary: 'An eleven-judge bench considered whether Parliament had the power to amend fundamental rights guaranteed under Part III of the Constitution.',
    legalPrinciple: 'Fundamental rights are given a transcendental position under the Constitution and Parliament cannot abridge or take away any fundamental right through a constitutional amendment under Article 368.',
    verdict: 'By a 6-5 majority, the Supreme Court held that Parliament has no power to amend fundamental rights under Article 368. The court applied the doctrine of prospective overruling, meaning the decision would not affect past amendments.',
    significance: 'First major case where the Supreme Court placed limitations on Parliament\'s amending power regarding fundamental rights. Though later partially overruled by Kesavananda Bharati, it established the principle that fundamental rights deserve special protection.',
    relatedSections: ['Article 368', 'Article 13', 'Article 31'],
    relatedActs: ['Constitution of India', 'Punjab Security of Land Tenures Act, 1953', '17th Amendment Act'],
    category: 'Constitutional',
    keywords: ['fundamental rights', 'amendment power', 'prospective overruling', 'transcendental position', 'part III']
  },
  {
    caseName: 'I.R. Coelho (Dead) by LRs v. State of Tamil Nadu',
    citation: '(2007) 2 SCC 1',
    court: 'Supreme Court',
    year: 2007,
    judges: ['Y.K. Sabharwal', 'Ashok Bhan', 'S.H. Kapadia', 'C.K. Thakker', 'P.K. Balasubramanyan', 'Arijit Pasayat', 'B.P. Singh', 'Altamas Kabir', 'D.K. Jain'],
    summary: 'A nine-judge bench examined whether laws placed in the Ninth Schedule after April 24, 1973 (date of Kesavananda Bharati judgment) can be challenged on the ground that they violate basic structure.',
    legalPrinciple: 'Laws placed in the Ninth Schedule after April 24, 1973, are open to judicial review if they violate the basic structure or fundamental rights guaranteed under Articles 14, 19, and 21.',
    verdict: 'The court held that the protection of the Ninth Schedule is not absolute. Any law placed in the Ninth Schedule after April 24, 1973, is subject to judicial review if it violates fundamental rights forming part of the basic structure.',
    significance: 'Removed the blanket immunity enjoyed by laws placed in the Ninth Schedule. Ensured that Parliament cannot circumvent judicial review by simply inserting laws into the Ninth Schedule. Extended the Basic Structure Doctrine\'s reach.',
    relatedSections: ['Article 31B', 'Ninth Schedule', 'Article 14', 'Article 19', 'Article 21'],
    relatedActs: ['Constitution of India'],
    category: 'Constitutional',
    keywords: ['ninth schedule', 'basic structure', 'judicial review', 'fundamental rights', 'blanket immunity']
  },
  {
    caseName: 'Navtej Singh Johar v. Union of India',
    citation: '(2018) 10 SCC 1',
    court: 'Supreme Court',
    year: 2018,
    judges: ['Dipak Misra', 'Rohinton F. Nariman', 'A.M. Khanwilkar', 'D.Y. Chandrachud', 'Indu Malhotra'],
    summary: 'The Supreme Court decriminalized consensual homosexual acts between adults by reading down Section 377 of the Indian Penal Code to the extent it criminalized consensual sexual conduct between adults of the same sex.',
    legalPrinciple: 'Sexual orientation is an intrinsic element of liberty, dignity, privacy, and individual autonomy. Criminalizing consensual sexual conduct between adults of the same sex violates Articles 14, 15, 19, and 21.',
    verdict: 'The court unanimously struck down Section 377 IPC to the extent it criminalized consensual sexual acts between adults. The court overruled its earlier decision in Suresh Kumar Koushal v. Naz Foundation (2013).',
    significance: 'Historic decision that decriminalized homosexuality in India, recognizing the rights of LGBTQ+ community. Affirmed that constitutional morality must prevail over societal morality. Recognized sexual orientation as a fundamental aspect of privacy and dignity.',
    relatedSections: ['Section 377 IPC', 'Article 14', 'Article 15', 'Article 19', 'Article 21'],
    relatedActs: ['Indian Penal Code, 1860', 'Constitution of India'],
    category: 'Constitutional',
    keywords: ['section 377', 'homosexuality', 'LGBTQ rights', 'sexual orientation', 'constitutional morality', 'decriminalization', 'privacy', 'dignity']
  },
  {
    caseName: 'Indian Young Lawyers Association v. State of Kerala',
    citation: '(2019) 11 SCC 1',
    court: 'Supreme Court',
    year: 2018,
    judges: ['Dipak Misra', 'A.M. Khanwilkar', 'Rohinton F. Nariman', 'D.Y. Chandrachud', 'Indu Malhotra'],
    summary: 'The Supreme Court examined whether the practice of excluding women aged 10-50 from entering the Sabarimala temple violated their fundamental rights under Articles 14, 15, 19, and 25.',
    legalPrinciple: 'Exclusion of women from a place of worship based on biological characteristics (menstruation) is a form of untouchability and violates constitutional morality. Religious practices that discriminate against women are not protected under Article 25.',
    verdict: 'By a 4-1 majority, the court held that the ban on women of menstruating age from entering the Sabarimala temple was unconstitutional and violative of Articles 14, 15, and 25. Justice Indu Malhotra dissented.',
    significance: 'Affirmed women\'s right to worship and equality within religious spaces. However, the case was later referred to a larger bench of seven judges for reconsideration, reflecting the tension between religious freedom and gender equality.',
    relatedSections: ['Article 14', 'Article 15', 'Article 25', 'Article 26', 'Article 17'],
    relatedActs: ['Constitution of India', 'Kerala Hindu Places of Public Worship (Authorisation of Entry) Rules, 1965'],
    category: 'Constitutional',
    keywords: ['sabarimala', 'women\'s entry', 'temple', 'menstruation', 'religious practice', 'gender discrimination', 'constitutional morality']
  },
  {
    caseName: 'Indra Sawhney v. Union of India',
    citation: 'AIR 1993 SC 477',
    court: 'Supreme Court',
    year: 1992,
    judges: ['M.H. Kania', 'M.N. Venkatachaliah', 'S. Ratnavel Pandian', 'T.K. Thommen', 'A.M. Ahmadi', 'Kuldip Singh', 'P.B. Sawant', 'R.M. Sahai', 'B.P. Jeevan Reddy'],
    summary: 'A nine-judge bench examined the constitutional validity of 27% reservation for Other Backward Classes (OBCs) in government jobs as recommended by the Mandal Commission.',
    legalPrinciple: 'The total reservation for all categories (SC, ST, OBC) should not exceed 50% except in extraordinary situations. The creamy layer among OBCs must be excluded from reservation benefits. Backwardness can be determined based on caste.',
    verdict: 'The court upheld the 27% reservation for OBCs but imposed a 50% ceiling on total reservations. It mandated the exclusion of the creamy layer (economically advanced sections) from OBC reservations. Article 16(4) is not an exception but a facet of Article 16(1).',
    significance: 'Shaped India\'s reservation policy by imposing the 50% cap, introducing the creamy layer concept, and validating caste as a criterion for backwardness. One of the most significant social justice decisions.',
    relatedSections: ['Article 16(4)', 'Article 15(4)', 'Article 14', 'Article 16(1)'],
    relatedActs: ['Constitution of India'],
    category: 'Constitutional',
    keywords: ['mandal commission', 'OBC reservation', '50% cap', 'creamy layer', 'backward classes', 'reservation policy', 'social justice']
  },
  {
    caseName: 'ADM Jabalpur v. Shivkant Shukla',
    citation: 'AIR 1976 SC 1207',
    court: 'Supreme Court',
    year: 1976,
    judges: ['A.N. Ray', 'H.R. Khanna', 'M.H. Beg', 'Y.V. Chandrachud', 'P.N. Bhagwati'],
    summary: 'During the Emergency (1975-77), the Supreme Court was asked whether citizens could move courts for enforcement of fundamental rights under Articles 14, 21, and 22 when a presidential order under Article 359 suspended enforcement of Article 21.',
    legalPrinciple: 'Originally held (by 4-1 majority) that during Emergency, no person has locus standi to move any writ petition under Article 226 for habeas corpus. Justice H.R. Khanna\'s famous dissent held that the right to life exists independent of Article 21.',
    verdict: 'The majority held that during the Emergency, the right to move courts for habeas corpus was suspended. Justice Khanna gave a historic lone dissent, holding that the State cannot deprive a person of the right to life without the authority of law.',
    significance: 'Widely considered the darkest hour of the Indian Supreme Court. Justice Khanna\'s dissent is regarded as one of the greatest in legal history. The decision was effectively overruled by the 44th Amendment and formally overruled in K.S. Puttaswamy (2017).',
    relatedSections: ['Article 21', 'Article 14', 'Article 22', 'Article 359'],
    relatedActs: ['Constitution of India', 'Maintenance of Internal Security Act (MISA), 1971'],
    category: 'Constitutional',
    keywords: ['emergency', 'habeas corpus', 'fundamental rights suspension', 'Khanna dissent', 'darkest hour', 'right to life']
  },
  {
    caseName: 'Unni Krishnan J.P. v. State of Andhra Pradesh',
    citation: '(1993) 1 SCC 645',
    court: 'Supreme Court',
    year: 1993,
    judges: ['L.M. Sharma', 'J.S. Verma', 'S. Mohan', 'G.N. Ray', 'A.S. Anand'],
    summary: 'The Supreme Court examined the right to education and its status as a fundamental right, considering Articles 21, 41, and 45 of the Constitution.',
    legalPrinciple: 'The right to education for children up to the age of 14 years is a fundamental right flowing from Article 21 (right to life). After 14 years, the right to education is subject to economic capacity and development of the State.',
    verdict: 'The court held that the right to education is implicit in the right to life under Article 21 and constitutes a fundamental right for children up to the age of 14. The court also regulated capitation fees charged by private educational institutions.',
    significance: 'This decision directly led to the 86th Constitutional Amendment (2002) inserting Article 21A, making education a fundamental right, and eventually the Right to Education Act, 2009.',
    relatedSections: ['Article 21', 'Article 41', 'Article 45', 'Article 21A'],
    relatedActs: ['Constitution of India', 'Right of Children to Free and Compulsory Education Act, 2009'],
    category: 'Constitutional',
    keywords: ['right to education', 'fundamental right', 'Article 21', 'children', 'capitation fee', 'free education']
  },
  {
    caseName: 'TMA Pai Foundation v. State of Karnataka',
    citation: '(2002) 8 SCC 481',
    court: 'Supreme Court',
    year: 2002,
    judges: ['B.N. Kirpal', 'G.B. Pattanaik', 'S. Rajendra Babu', 'D.M. Dharmadhikari', 'Ashok Bhan', 'Arijit Pasayat', 'S.H. Kapadia', 'Ruma Pal', 'Brijesh Kumar', 'P. Venkatarama Reddi', 'S.N. Variava'],
    summary: 'An eleven-judge bench examined the rights of private unaided minority educational institutions to establish and administer educational institutions under Articles 19(1)(g) and 30.',
    legalPrinciple: 'Minority educational institutions have the right to establish and administer institutions under Article 30. However, this right is not absolute and is subject to reasonable regulations to ensure educational standards and prevent maladministration.',
    verdict: 'The court held that unaided private institutions (minority and non-minority) have the right to fix their own fee structure, subject to the condition that there is no profiteering or capitation fee. Admission to unaided minority institutions can be through their own procedure, but merit must not be wholly ignored.',
    significance: 'Defined the scope of minority educational rights and balanced institutional autonomy with the State\'s regulatory power. Influenced subsequent legislation and policy on private education.',
    relatedSections: ['Article 19(1)(g)', 'Article 30', 'Article 29'],
    relatedActs: ['Constitution of India'],
    category: 'Constitutional',
    keywords: ['minority institution', 'educational rights', 'Article 30', 'fee structure', 'private institution', 'unaided institution']
  },
  {
    caseName: 'Lily Thomas v. Union of India',
    citation: '(2013) 7 SCC 653',
    court: 'Supreme Court',
    year: 2013,
    judges: ['A.K. Patnaik', 'S.J. Mukhopadhaya'],
    summary: 'The case challenged Section 8(4) of the Representation of the People Act, 1951, which allowed convicted legislators to continue in office by filing an appeal within three months.',
    legalPrinciple: 'A sitting MP or MLA convicted of an offence punishable with imprisonment of two years or more shall be immediately disqualified from the date of conviction. The protection of Section 8(4) is unconstitutional.',
    verdict: 'The Supreme Court struck down Section 8(4) of the Representation of the People Act, 1951, as unconstitutional. Convicted legislators would be disqualified immediately upon conviction, without the benefit of a three-month window to file an appeal.',
    significance: 'Major decision in cleaning up Indian politics. Ensured that convicted politicians lose their seats immediately upon conviction, removing the loophole that allowed them to continue by simply filing an appeal.',
    relatedSections: ['Section 8(4) of RPA', 'Article 102', 'Article 191'],
    relatedActs: ['Representation of the People Act, 1951', 'Constitution of India'],
    category: 'Constitutional',
    keywords: ['convicted politicians', 'disqualification', 'RPA', 'criminalization of politics', 'Section 8(4)', 'immediate disqualification']
  },

  // ═══════════════════════════════════════════════
  // CRIMINAL LAW (~10)
  // ═══════════════════════════════════════════════
  {
    caseName: 'Bachan Singh v. State of Punjab',
    citation: '(1980) 2 SCC 684',
    court: 'Supreme Court',
    year: 1980,
    judges: ['Y.V. Chandrachud', 'A.C. Gupta', 'N.L. Untwalia', 'P.N. Bhagwati', 'R.S. Sarkaria'],
    summary: 'A Constitution bench examined the constitutional validity of the death penalty under Section 302 of the Indian Penal Code.',
    legalPrinciple: 'The death penalty is constitutional but should be imposed only in the "rarest of rare" cases. The court must consider both aggravating and mitigating circumstances. Life imprisonment is the rule, death penalty is the exception.',
    verdict: 'By a 4-1 majority, the court upheld the constitutional validity of the death penalty but laid down that it should be awarded only in the rarest of rare cases when the alternative option of life imprisonment is unquestionably foreclosed. Justice Bhagwati dissented.',
    significance: 'Established the "rarest of rare" doctrine for imposing the death penalty, which remains the governing standard in India. Balanced the right to life with society\'s need for deterrence.',
    relatedSections: ['Section 302 IPC', 'Section 354(3) CrPC', 'Article 21', 'Article 14'],
    relatedActs: ['Indian Penal Code, 1860', 'Code of Criminal Procedure, 1973', 'Constitution of India'],
    category: 'Criminal',
    keywords: ['death penalty', 'rarest of rare', 'capital punishment', 'aggravating circumstances', 'mitigating circumstances', 'Section 302']
  },
  {
    caseName: 'Machhi Singh v. State of Punjab',
    citation: '(1983) 3 SCC 470',
    court: 'Supreme Court',
    year: 1983,
    judges: ['M.P. Thakkar', 'V. Balakrishna Eradi', 'A.P. Sen'],
    summary: 'The court elaborated on the rarest of rare doctrine from Bachan Singh, providing specific categories of cases where the death penalty could be considered.',
    legalPrinciple: 'Five categories of cases may warrant the death penalty: (1) manner of commission — extremely brutal, grotesque, diabolical; (2) motive — depravity and meanness; (3) anti-social or socially abhorrent nature; (4) magnitude — large scale murder; (5) personality of victim — helpless person, child, woman, public figure.',
    verdict: 'The court confirmed the death sentence and laid down specific guidelines identifying categories where the death penalty is appropriate: enormity of the crime, personality of the victim, motive, magnitude, and where the collective conscience of society is shocked.',
    significance: 'Provided concrete categories for applying the rarest of rare test from Bachan Singh. These categories continue to guide courts in death penalty sentencing across India.',
    relatedSections: ['Section 302 IPC', 'Section 354(3) CrPC'],
    relatedActs: ['Indian Penal Code, 1860', 'Code of Criminal Procedure, 1973'],
    category: 'Criminal',
    keywords: ['rarest of rare', 'death penalty guidelines', 'collective conscience', 'brutal murder', 'sentencing guidelines']
  },
  {
    caseName: 'K.M. Nanavati v. State of Maharashtra',
    citation: 'AIR 1962 SC 605',
    court: 'Supreme Court',
    year: 1962,
    judges: ['A.K. Sarkar', 'K. Subba Rao', 'J.R. Mudholkar'],
    summary: 'Naval Commander Kawas Manekshaw Nanavati shot and killed Prem Ahuja, his wife\'s lover. The jury acquitted Nanavati of murder, but the Bombay High Court referred the verdict. This was the last jury trial in India.',
    legalPrinciple: 'The right of private defence under Section 96 IPC does not extend to taking life when the accused had time to cool down and went to retrieve a weapon. Grave and sudden provocation must be immediate and without time for cooling.',
    verdict: 'The Supreme Court convicted Nanavati of murder under Section 302 IPC, rejecting the plea of grave and sudden provocation. The court held that Nanavati had time to cool down between learning of the affair and shooting Ahuja, and therefore could not claim the exception of provocation.',
    significance: 'This was the last case to be tried by a jury in India. The controversial jury acquittal led to the abolition of the jury system in India. The case became a cultural phenomenon, inspiring multiple films and books.',
    relatedSections: ['Section 302 IPC', 'Section 300 Exception 1 IPC', 'Section 96 IPC'],
    relatedActs: ['Indian Penal Code, 1860', 'Code of Criminal Procedure, 1973'],
    category: 'Criminal',
    keywords: ['last jury trial', 'murder', 'grave and sudden provocation', 'right of private defence', 'Nanavati', 'crime of passion']
  },
  {
    caseName: 'Shreya Singhal v. Union of India',
    citation: '(2015) 5 SCC 1',
    court: 'Supreme Court',
    year: 2015,
    judges: ['J. Chelameswar', 'Rohinton F. Nariman'],
    summary: 'The Supreme Court examined the constitutional validity of Section 66A of the Information Technology Act, 2000, which criminalized sending offensive messages through computer resources.',
    legalPrinciple: 'Section 66A of the IT Act is unconstitutional as it is vague, overbroad, and has a chilling effect on free speech. The distinction between discussion, advocacy, and incitement is crucial for free speech protections.',
    verdict: 'The court struck down Section 66A of the IT Act as unconstitutional, violating Article 19(1)(a) (freedom of speech). The court also read down Section 79 (intermediary liability) and upheld Section 69A (government blocking orders).',
    significance: 'Landmark decision protecting online free speech and expression. Removed the most widely misused provision for arresting citizens over social media posts. Clarified the boundaries of permissible restrictions on free speech in the digital age.',
    relatedSections: ['Section 66A IT Act', 'Section 79 IT Act', 'Section 69A IT Act', 'Article 19(1)(a)', 'Article 19(2)'],
    relatedActs: ['Information Technology Act, 2000', 'Constitution of India'],
    category: 'Criminal',
    keywords: ['section 66A', 'free speech', 'online expression', 'IT Act', 'chilling effect', 'vagueness', 'overbreadth', 'social media']
  },
  {
    caseName: 'Hussainara Khatoon v. Home Secretary, State of Bihar',
    citation: 'AIR 1979 SC 1369',
    court: 'Supreme Court',
    year: 1979,
    judges: ['P.N. Bhagwati', 'A.D. Koshal'],
    summary: 'A PIL filed based on a newspaper report revealing that thousands of undertrial prisoners in Bihar had been in jail for periods longer than the maximum sentence for their alleged offences.',
    legalPrinciple: 'The right to speedy trial is a fundamental right under Article 21. The right to free legal aid is a necessary component of reasonable, fair, and just procedure under Article 21.',
    verdict: 'The court held that the right to a speedy trial is implicit in Article 21. It ordered the release of thousands of undertrial prisoners who had been in jail for periods longer than the maximum punishment for their offences. The court also affirmed the right to free legal aid for the poor.',
    significance: 'Pioneer PIL case that exposed the inhuman conditions of undertrial prisoners in India. Led to significant reforms in the criminal justice system, including the establishment of legal aid services. Influenced Article 39A and the Legal Services Authorities Act, 1987.',
    relatedSections: ['Article 21', 'Article 39A', 'Section 436A CrPC'],
    relatedActs: ['Constitution of India', 'Code of Criminal Procedure, 1973', 'Legal Services Authorities Act, 1987'],
    category: 'Criminal',
    keywords: ['speedy trial', 'undertrial prisoners', 'free legal aid', 'PIL', 'Article 21', 'bail', 'criminal justice reform']
  },
  {
    caseName: 'D.K. Basu v. State of West Bengal',
    citation: '(1997) 1 SCC 416',
    court: 'Supreme Court',
    year: 1997,
    judges: ['A.S. Anand', 'Kuldip Singh'],
    summary: 'The Supreme Court took cognizance of custodial deaths and torture and laid down detailed guidelines to be followed by police during arrest and detention.',
    legalPrinciple: 'Custodial torture and death are violations of Article 21. Specific procedural safeguards must be followed during every arrest and detention to prevent custodial violence.',
    verdict: 'The court issued 11 mandatory guidelines for arrest and detention: (1) police must bear accurate name tags; (2) memo of arrest must be prepared; (3) arrestee has right to inform a friend/relative; (4) time and place of arrest must be notified; (5) entry in a diary at the place of detention; (6) medical examination; (7) copies of documents to the magistrate; and other safeguards.',
    significance: 'Comprehensive guidelines to prevent custodial torture and death. These guidelines are binding on all law enforcement agencies across India. Became a benchmark for police reform and human rights protection during arrest.',
    relatedSections: ['Article 21', 'Article 22', 'Section 41 CrPC'],
    relatedActs: ['Constitution of India', 'Code of Criminal Procedure, 1973'],
    category: 'Criminal',
    keywords: ['custodial torture', 'arrest guidelines', 'police reform', 'custodial death', 'human rights', 'D.K. Basu guidelines']
  },
  {
    caseName: 'Lalita Kumari v. Government of Uttar Pradesh',
    citation: '(2014) 2 SCC 1',
    court: 'Supreme Court',
    year: 2014,
    judges: ['P. Sathasivam', 'B.S. Chauhan', 'Ranjana Prakash Desai', 'Ranjan Gogoi', 'S.A. Bobde'],
    summary: 'A Constitution bench examined whether the police are bound to register an FIR upon receiving information about the commission of a cognizable offence, or whether they have discretion in the matter.',
    legalPrinciple: 'Registration of FIR under Section 154 CrPC is mandatory when information discloses commission of a cognizable offence. The police officer has no discretion to conduct a preliminary inquiry before registering an FIR in such cases.',
    verdict: 'The court held that registration of FIR is mandatory under Section 154 CrPC if the information discloses commission of a cognizable offence, and no preliminary inquiry is permissible in such a situation. However, in cases where the information does not clearly disclose a cognizable offence, a preliminary inquiry may be conducted.',
    significance: 'Settled the long-standing controversy over whether police can refuse to register FIRs. Provided relief to victims who were often turned away by police. Established clear guidelines distinguishing between cases requiring immediate FIR registration and those permitting preliminary inquiry.',
    relatedSections: ['Section 154 CrPC', 'Section 155 CrPC', 'Section 156 CrPC'],
    relatedActs: ['Code of Criminal Procedure, 1973'],
    category: 'Criminal',
    keywords: ['FIR registration', 'mandatory FIR', 'cognizable offence', 'Section 154', 'police duty', 'preliminary inquiry']
  },
  {
    caseName: 'Arnesh Kumar v. State of Bihar',
    citation: '(2014) 8 SCC 273',
    court: 'Supreme Court',
    year: 2014,
    judges: ['C.K. Prasad', 'Pinaki Chandra Ghose'],
    summary: 'The court addressed the rampant misuse of Section 498A IPC (cruelty by husband and relatives) and laid down guidelines to prevent automatic arrests in such cases.',
    legalPrinciple: 'In cases under Section 498A IPC and offences punishable with imprisonment up to seven years, police must not automatically arrest the accused. The police officer must be satisfied that the arrest is necessary under Section 41 CrPC parameters.',
    verdict: 'The court directed that in offences punishable with imprisonment up to seven years (including Section 498A), police must satisfy themselves about the necessity of arrest under Section 41 CrPC. Magistrates must not authorize detention casually. Failure to comply would render the police officer liable for departmental action and contempt of court.',
    significance: 'Curbed the widespread misuse of Section 498A for harassing husbands and their families. Established that arrest should be an exception, not the rule, in matrimonial offences. Balanced women\'s protection with safeguards against false cases.',
    relatedSections: ['Section 498A IPC', 'Section 41 CrPC', 'Section 41A CrPC'],
    relatedActs: ['Indian Penal Code, 1860', 'Code of Criminal Procedure, 1973'],
    category: 'Criminal',
    keywords: ['498A', 'dowry harassment', 'arrest guidelines', 'misuse of law', 'matrimonial offences', 'Section 41 CrPC']
  },

  // ═══════════════════════════════════════════════
  // WOMEN'S RIGHTS (~8)
  // ═══════════════════════════════════════════════
  {
    caseName: 'Vishaka v. State of Rajasthan',
    citation: '(1997) 6 SCC 241',
    court: 'Supreme Court',
    year: 1997,
    judges: ['J.S. Verma', 'Sujata V. Manohar', 'B.N. Kirpal'],
    summary: 'After the brutal gang rape of Bhanwari Devi, a social worker in Rajasthan, women\'s rights groups filed a PIL seeking enforcement of fundamental rights of working women under Articles 14, 19, and 21.',
    legalPrinciple: 'Sexual harassment at the workplace is a violation of fundamental rights under Articles 14, 15, 19(1)(g), and 21. In the absence of legislation, the court can lay down guidelines that have the force of law.',
    verdict: 'The Supreme Court laid down the "Vishaka Guidelines" for prevention of sexual harassment at the workplace, which included: definition of sexual harassment, preventive steps, complaint mechanism, complaints committee, workers\' initiative, awareness, third-party harassment, and disciplinary action.',
    significance: 'Filled the legislative vacuum on workplace sexual harassment. The Vishaka Guidelines were legally binding until the Sexual Harassment of Women at Workplace Act, 2013 (POSH Act) was enacted. A landmark in women\'s rights jurisprudence.',
    relatedSections: ['Article 14', 'Article 15', 'Article 19(1)(g)', 'Article 21'],
    relatedActs: ['Constitution of India', 'Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013'],
    category: 'Human Rights',
    keywords: ['sexual harassment', 'Vishaka guidelines', 'workplace safety', 'women\'s rights', 'POSH Act', 'Bhanwari Devi']
  },
  {
    caseName: 'Mohd. Ahmed Khan v. Shah Bano Begum',
    citation: '(1985) 2 SCC 556',
    court: 'Supreme Court',
    year: 1985,
    judges: ['Y.V. Chandrachud', 'D.A. Desai', 'O. Chinnappa Reddy', 'E.S. Venkataramiah', 'Ranganath Misra'],
    summary: 'Shah Bano, a 62-year-old Muslim woman, was divorced by her husband through triple talaq after 43 years of marriage and sought maintenance under Section 125 CrPC.',
    legalPrinciple: 'A divorced Muslim woman is entitled to maintenance under Section 125 CrPC, which applies to all citizens irrespective of religion. The right to maintenance is a measure to prevent vagrancy and destitution.',
    verdict: 'The Supreme Court upheld Shah Bano\'s right to maintenance under Section 125 CrPC even after the iddat period. The court held that Section 125 is a secular provision applicable to all religions and that a Muslim husband\'s liability to maintain a divorced wife is not limited to the iddat period.',
    significance: 'One of the most politically significant judgments in Indian history. The ruling led to a massive political controversy and the enactment of the Muslim Women (Protection of Rights on Divorce) Act, 1986, which effectively overrode this judgment.',
    relatedSections: ['Section 125 CrPC', 'Article 44'],
    relatedActs: ['Code of Criminal Procedure, 1973', 'Muslim Women (Protection of Rights on Divorce) Act, 1986', 'Constitution of India'],
    category: 'Family',
    keywords: ['Shah Bano', 'Muslim women maintenance', 'triple talaq', 'uniform civil code', 'Section 125', 'personal law', 'divorce']
  },
  {
    caseName: 'Shayara Bano v. Union of India',
    citation: '(2017) 9 SCC 1',
    court: 'Supreme Court',
    year: 2017,
    judges: ['J.S. Khehar', 'Kurian Joseph', 'Rohinton F. Nariman', 'U.U. Lalit', 'S. Abdul Nazeer'],
    summary: 'The Supreme Court examined whether the practice of instantaneous triple talaq (talaq-e-biddat) among Muslims is constitutionally valid.',
    legalPrinciple: 'Instantaneous triple talaq (talaq-e-biddat) is arbitrary and violates Article 14 of the Constitution. A practice that is not integral to religion does not deserve protection under Article 25.',
    verdict: 'By a 3-2 majority, the court struck down the practice of instantaneous triple talaq as unconstitutional. The majority held it was manifestly arbitrary and violative of Article 14. The court directed Parliament to legislate on the subject.',
    significance: 'Historic judgment securing Muslim women\'s rights against the arbitrary practice of instant divorce. Led to the enactment of the Muslim Women (Protection of Rights on Marriage) Act, 2019, which criminalized instant triple talaq.',
    relatedSections: ['Article 14', 'Article 15', 'Article 21', 'Article 25'],
    relatedActs: ['Constitution of India', 'Muslim Women (Protection of Rights on Marriage) Act, 2019'],
    category: 'Family',
    keywords: ['triple talaq', 'talaq-e-biddat', 'Muslim women', 'instant divorce', 'arbitrary', 'personal law reform']
  },
  {
    caseName: 'Joseph Shine v. Union of India',
    citation: '(2019) 3 SCC 39',
    court: 'Supreme Court',
    year: 2018,
    judges: ['Dipak Misra', 'Rohinton F. Nariman', 'A.M. Khanwilkar', 'D.Y. Chandrachud', 'Indu Malhotra'],
    summary: 'The Supreme Court examined the constitutional validity of Section 497 of the IPC, which criminalized adultery by making it an offence for a man to have sexual intercourse with another man\'s wife.',
    legalPrinciple: 'Section 497 IPC is unconstitutional as it treats a woman as the property of her husband, violating her dignity, equality, privacy, and sexual autonomy. Adultery can be a ground for civil remedies but cannot be a criminal offence.',
    verdict: 'The court unanimously struck down Section 497 IPC (adultery) as unconstitutional, holding that it violated Articles 14, 15, and 21. The court held that the provision was based on the subordination of women and treated them as chattels of their husbands.',
    significance: 'Recognized women\'s sexual autonomy and agency. Removed the 158-year-old colonial provision that treated women as property. Shifted adultery from criminal law to civil law (ground for divorce).',
    relatedSections: ['Section 497 IPC', 'Section 198 CrPC', 'Article 14', 'Article 15', 'Article 21'],
    relatedActs: ['Indian Penal Code, 1860', 'Constitution of India'],
    category: 'Family',
    keywords: ['adultery', 'Section 497', 'women\'s autonomy', 'gender equality', 'decriminalization', 'sexual autonomy', 'patriarchy']
  },
  {
    caseName: 'Lata Singh v. State of Uttar Pradesh',
    citation: '(2006) 5 SCC 475',
    court: 'Supreme Court',
    year: 2006,
    judges: ['Markandey Katju', 'Gyan Sudha Misra'],
    summary: 'Lata Singh, a major girl, married a man of her choice from a different caste. Her family opposed the marriage and filed criminal cases against her husband.',
    legalPrinciple: 'A major girl can marry anyone she wishes. Inter-caste marriages are legal and deserving of protection. Honour killings and harassment of inter-caste or inter-religious couples are illegal and punishable.',
    verdict: 'The court held that a person who is a major is free to marry anyone. Interference by family members through threats, violence, or criminal cases against the spouse amounts to a criminal offence. The court directed the administration to provide protection to such couples.',
    significance: 'Important judgment upholding the right to marry a person of one\'s choice. Condemned honour killings and caste-based violence against inter-caste couples. Directed states to take preventive action against honour crimes.',
    relatedSections: ['Article 21', 'Special Marriage Act'],
    relatedActs: ['Constitution of India', 'Special Marriage Act, 1954', 'Indian Penal Code, 1860'],
    category: 'Family',
    keywords: ['inter-caste marriage', 'honour killing', 'right to marry', 'adult consent', 'caste violence', 'personal liberty']
  },
  {
    caseName: 'Independent Thought v. Union of India',
    citation: '(2017) 10 SCC 800',
    court: 'Supreme Court',
    year: 2017,
    judges: ['Madan B. Lokur', 'Deepak Gupta'],
    summary: 'The case challenged Exception 2 to Section 375 IPC, which permitted sexual intercourse by a man with his wife aged between 15 and 18 years without it constituting rape.',
    legalPrinciple: 'Sexual intercourse with a minor wife (aged between 15 and 18) is rape. Exception 2 to Section 375 IPC, which permitted such intercourse, is arbitrary and violative of Articles 14, 15, and 21.',
    verdict: 'The court read down Exception 2 to Section 375 IPC and held that sexual intercourse by a husband with his wife who is below 18 years of age constitutes rape. The court harmonized the IPC with the POCSO Act.',
    significance: 'Significant step in protecting girl children from sexual abuse within marriage. Raised the age from 15 to 18 for the marital rape exception, aligning it with POCSO and child marriage laws. Did not address marital rape of adult women.',
    relatedSections: ['Section 375 IPC', 'Exception 2 to Section 375', 'Article 14', 'Article 15', 'Article 21'],
    relatedActs: ['Indian Penal Code, 1860', 'Protection of Children from Sexual Offences Act, 2012', 'Prohibition of Child Marriage Act, 2006'],
    category: 'Family',
    keywords: ['marital rape', 'child marriage', 'minor wife', 'POCSO', 'Section 375', 'girl child protection']
  },
  {
    caseName: 'Air India v. Nergesh Meerza',
    citation: '(1981) 4 SCC 335',
    court: 'Supreme Court',
    year: 1981,
    judges: ['V.R. Krishna Iyer', 'O. Chinnappa Reddy', 'A.P. Sen'],
    summary: 'Air hostesses challenged the Air India and Indian Airlines service regulations that required them to retire upon marriage, first pregnancy, or attaining the age of 35.',
    legalPrinciple: 'Service conditions requiring air hostesses to retire on first pregnancy or upon marriage within four years of service are unconstitutional, arbitrary, and violative of Article 14. Gender-discriminatory service conditions are impermissible.',
    verdict: 'The court struck down the regulation requiring retirement on first pregnancy as unconstitutional and manifestly arbitrary. However, it upheld the bar on marriage within four years of service as a reasonable condition, while striking down the absolute bar on having children.',
    significance: 'Early and important decision on gender discrimination in employment. Recognized that service conditions based solely on gender or biological functions of women are discriminatory. Paved the way for gender equality jurisprudence in the workplace.',
    relatedSections: ['Article 14', 'Article 15', 'Article 16'],
    relatedActs: ['Constitution of India', 'Air India Service Regulations'],
    category: 'Labour',
    keywords: ['gender discrimination', 'employment', 'air hostess', 'pregnancy termination', 'service conditions', 'workplace equality']
  },

  // ═══════════════════════════════════════════════
  // LABOUR / SOCIAL JUSTICE (~5)
  // ═══════════════════════════════════════════════
  {
    caseName: 'Bangalore Water Supply and Sewerage Board v. A. Rajappa',
    citation: '(1978) 2 SCC 213',
    court: 'Supreme Court',
    year: 1978,
    judges: ['V.R. Krishna Iyer', 'P.N. Bhagwati', 'S. Murtaza Fazal Ali', 'D.A. Desai', 'O. Chinnappa Reddy'],
    summary: 'A Constitution bench examined the definition of "industry" under Section 2(j) of the Industrial Disputes Act, 1947.',
    legalPrinciple: 'The triple test to determine whether an activity is an "industry": (1) systematic activity, (2) organized by cooperation between employer and employee, (3) for the production and/or distribution of goods and services. Dominant nature of the activity determines whether it is an industry.',
    verdict: 'The court gave a broad and comprehensive definition of "industry." It held that any systematic activity organized by cooperation between employer and employee for the production or distribution of goods or services is an industry, covering hospitals, educational institutions, and municipal services.',
    significance: 'Widened the scope of industrial disputes legislation to cover a vast number of establishments. The broad definition brought many workers under the protection of labour laws. However, the decision was controversial and later the government attempted to narrow the definition through legislation.',
    relatedSections: ['Section 2(j) of ID Act', 'Section 2(s) of ID Act'],
    relatedActs: ['Industrial Disputes Act, 1947'],
    category: 'Labour',
    keywords: ['definition of industry', 'triple test', 'industrial disputes', 'employer-employee relationship', 'labour law', 'Section 2(j)']
  },
  {
    caseName: 'National Legal Services Authority (NALSA) v. Union of India',
    citation: '(2014) 5 SCC 438',
    court: 'Supreme Court',
    year: 2014,
    judges: ['K.S. Radhakrishnan', 'A.K. Sikri'],
    summary: 'The Supreme Court addressed the rights of transgender persons, their recognition as a third gender, and their entitlement to fundamental rights.',
    legalPrinciple: 'Transgender persons have the right to self-identification of gender. They are entitled to all fundamental rights, including the right to equality, non-discrimination, and dignity. The state must recognize the third gender.',
    verdict: 'The court declared that transgender persons shall be recognized as a third gender, apart from male and female. They are entitled to legal recognition of their gender identity, reservation as socially and educationally backward classes, and protection against discrimination.',
    significance: 'Groundbreaking decision granting legal recognition and rights to the transgender community. Directed the government to treat transgender persons as socially and educationally backward classes and extend reservation benefits. Led to the Transgender Persons (Protection of Rights) Act, 2019.',
    relatedSections: ['Article 14', 'Article 15', 'Article 16', 'Article 19', 'Article 21'],
    relatedActs: ['Constitution of India', 'Transgender Persons (Protection of Rights) Act, 2019'],
    category: 'Human Rights',
    keywords: ['transgender rights', 'third gender', 'LGBTQ', 'gender identity', 'self-identification', 'NALSA', 'social justice']
  },
  {
    caseName: 'Olga Tellis v. Bombay Municipal Corporation',
    citation: '(1985) 3 SCC 545',
    court: 'Supreme Court',
    year: 1985,
    judges: ['Y.V. Chandrachud', 'A.N. Sen', 'O. Chinnappa Reddy', 'S. Murtaza Fazal Ali', 'V. Balakrishna Eradi'],
    summary: 'Pavement dwellers in Bombay challenged the decision of the Bombay Municipal Corporation to evict them from their dwellings on public footpaths and pavements.',
    legalPrinciple: 'The right to livelihood is an integral facet of the right to life under Article 21. No person can be deprived of his livelihood except by procedure established by law that is just, fair, and reasonable.',
    verdict: 'The court held that the right to livelihood is included in the right to life under Article 21. While pavement dwellers cannot claim a fundamental right to encroach, they cannot be evicted without following due process. The State must provide alternative sites or ensure a fair procedure before eviction.',
    significance: 'Expanded Article 21 to include the right to livelihood. Recognized the plight of urban poor and pavement dwellers. Established that eviction without alternative arrangements and due process is unconstitutional.',
    relatedSections: ['Article 21', 'Article 19(1)(e)', 'Article 19(1)(g)'],
    relatedActs: ['Constitution of India', 'Bombay Municipal Corporation Act'],
    category: 'Human Rights',
    keywords: ['right to livelihood', 'pavement dwellers', 'eviction', 'Article 21', 'urban poor', 'due process', 'housing rights']
  },
  {
    caseName: 'State of Kerala v. N.M. Thomas',
    citation: '(1976) 2 SCC 310',
    court: 'Supreme Court',
    year: 1976,
    judges: ['A.N. Ray', 'H.R. Khanna', 'K.K. Mathew', 'M.H. Beg', 'Y.V. Chandrachud', 'V.R. Krishna Iyer', 'P.N. Bhagwati'],
    summary: 'The case examined whether a government order extending the period for passing departmental tests for SC/ST employees violated Article 16(1) (equality of opportunity in public employment).',
    legalPrinciple: 'Article 16(4) is not an exception to Article 16(1) but a facet of the equality guaranteed by Article 16(1). The State can make reasonable classification in favour of backward classes to achieve substantive equality.',
    verdict: 'The court upheld the government order by a 5-2 majority, holding that providing relaxation in qualifying tests for SC/ST employees is a valid classification under Article 16(1) itself and does not need to be justified under Article 16(4) alone.',
    significance: 'Reinterpreted the relationship between Article 16(1) and 16(4), establishing that reservation is a facet of equality, not an exception. This interpretation was later adopted in Indra Sawhney and significantly influenced reservation jurisprudence.',
    relatedSections: ['Article 16(1)', 'Article 16(4)', 'Article 14', 'Article 15(4)'],
    relatedActs: ['Constitution of India'],
    category: 'Constitutional',
    keywords: ['reservation', 'equality', 'SC/ST', 'backward classes', 'Article 16', 'substantive equality', 'classification']
  },
  {
    caseName: 'Ashok Kumar Thakur v. Union of India',
    citation: '(2008) 6 SCC 1',
    court: 'Supreme Court',
    year: 2008,
    judges: ['K.G. Balakrishnan', 'C.K. Thakker', 'R.V. Raveendran', 'Dalveer Bhandari', 'Arijit Pasayat'],
    summary: 'The Supreme Court examined the constitutional validity of the 93rd Constitutional Amendment and the Central Educational Institutions (Reservation in Admission) Act, 2006, which provided 27% reservation for OBCs in higher educational institutions.',
    legalPrinciple: 'The 93rd Amendment and OBC reservation in central educational institutions are constitutionally valid. However, the creamy layer must be excluded. Periodic review of the reservation policy is necessary.',
    verdict: 'The court upheld the 27% reservation for OBCs in central educational institutions by a 4-1 majority. It mandated the exclusion of the creamy layer. The court directed the government to periodically review the backward status of communities. It held that there is no need for a time limit for reservation.',
    significance: 'Extended Indra Sawhney principles to educational institutions. Confirmed OBC reservation in central universities and IITs/IIMs. Reiterated the creamy layer exclusion principle.',
    relatedSections: ['Article 15(5)', '93rd Amendment', 'Article 15(4)', 'Article 16(4)'],
    relatedActs: ['Constitution of India', 'Central Educational Institutions (Reservation in Admission) Act, 2006'],
    category: 'Constitutional',
    keywords: ['OBC reservation', 'educational institutions', 'creamy layer', '93rd amendment', 'Mandal', 'higher education', 'backward classes']
  },

  // ═══════════════════════════════════════════════
  // PROPERTY / CONSUMER / ENVIRONMENTAL (~5)
  // ═══════════════════════════════════════════════
  {
    caseName: 'Indian Medical Association v. V.P. Shantha',
    citation: '(1995) 6 SCC 651',
    court: 'Supreme Court',
    year: 1995,
    judges: ['S.C. Agrawal', 'R.M. Sahai', 'G.N. Ray'],
    summary: 'The Supreme Court examined whether the medical profession falls within the ambit of "service" under Section 2(1)(o) of the Consumer Protection Act, 1986.',
    legalPrinciple: 'Medical services rendered by doctors and hospitals constitute "service" under the Consumer Protection Act. Medical negligence can be adjudicated by consumer forums. Free treatment in government hospitals is excluded as there is no consideration.',
    verdict: 'The court held that medical practitioners and hospitals provide "service" as defined under the Consumer Protection Act. Patients are "consumers" and can file complaints for medical negligence before consumer forums. Only services rendered free of charge at government hospitals are excluded.',
    significance: 'Brought the medical profession under consumer protection law. Patients could now seek compensation for medical negligence through consumer forums, which are faster and less expensive than civil courts. Revolutionized medical malpractice litigation in India.',
    relatedSections: ['Section 2(1)(o) CPA', 'Section 2(1)(d) CPA'],
    relatedActs: ['Consumer Protection Act, 1986', 'Consumer Protection Act, 2019'],
    category: 'Consumer',
    keywords: ['medical negligence', 'consumer protection', 'medical service', 'hospital liability', 'consumer forum', 'doctor liability']
  },
  {
    caseName: 'M.C. Mehta v. Union of India (Oleum Gas Leak Case)',
    citation: 'AIR 1987 SC 1086',
    court: 'Supreme Court',
    year: 1987,
    judges: ['P.N. Bhagwati', 'Ranganath Misra', 'G.L. Oza', 'M.M. Dutt', 'K.N. Singh'],
    summary: 'Oleum gas leaked from a unit of Shriram Industries in Delhi, causing harm to several persons. M.C. Mehta filed a PIL seeking closure of hazardous industries and compensation for victims.',
    legalPrinciple: 'The doctrine of absolute liability — an enterprise engaged in a hazardous or inherently dangerous activity owes an absolute and non-delegable duty to the community. No exceptions like those under Rylands v. Fletcher (strict liability) apply.',
    verdict: 'The court evolved the principle of absolute liability, going beyond the strict liability doctrine of Rylands v. Fletcher. An enterprise owning or operating a hazardous industry has absolute liability for any harm caused, and the amount of compensation must be proportional to the magnitude and capacity of the enterprise.',
    significance: 'Created the uniquely Indian doctrine of absolute liability, going further than the English strict liability principle. This was developed in response to the Bhopal gas tragedy backdrop and ensured stronger protection for communities near hazardous industries.',
    relatedSections: ['Article 21', 'Article 48A', 'Article 51A(g)'],
    relatedActs: ['Constitution of India', 'Environment Protection Act, 1986'],
    category: 'Environmental',
    keywords: ['absolute liability', 'hazardous industry', 'Oleum gas leak', 'environmental liability', 'M.C. Mehta', 'Rylands v Fletcher', 'industrial pollution']
  },
  {
    caseName: 'Vellore Citizens Welfare Forum v. Union of India',
    citation: 'AIR 1996 SC 2715',
    court: 'Supreme Court',
    year: 1996,
    judges: ['Kuldip Singh', 'Faizan Uddin'],
    summary: 'Tanneries in Tamil Nadu were discharging untreated effluents into agricultural lands, water bodies, and the River Palar, causing severe environmental damage and health hazards.',
    legalPrinciple: 'The Precautionary Principle and the Polluter Pays Principle are part of the environmental law of India. Sustainable development is a balancing concept between ecology and development.',
    verdict: 'The court held that the Precautionary Principle and the Polluter Pays Principle are part of Indian environmental law under Articles 21, 47, 48A, and 51A(g). The tanneries were directed to set up common effluent treatment plants and compensate affected villages. An authority was constituted under the Environment Protection Act.',
    significance: 'Incorporated international environmental law principles into Indian domestic law. The principles of sustainable development, precautionary principle, and polluter pays became binding legal standards in India.',
    relatedSections: ['Article 21', 'Article 47', 'Article 48A', 'Article 51A(g)'],
    relatedActs: ['Constitution of India', 'Environment Protection Act, 1986', 'Water (Prevention and Control of Pollution) Act, 1974'],
    category: 'Environmental',
    keywords: ['polluter pays', 'precautionary principle', 'sustainable development', 'tannery pollution', 'environmental law', 'River Palar']
  },
  {
    caseName: 'T.N. Godavarman Thirumulpad v. Union of India',
    citation: '(1997) 2 SCC 267',
    court: 'Supreme Court',
    year: 1997,
    judges: ['J.S. Verma', 'B.N. Kirpal'],
    summary: 'A writ petition concerning the felling of trees in the Nilgiris led to the Supreme Court expanding its scope to cover forest conservation across India.',
    legalPrinciple: 'The word "forest" must be understood in its dictionary sense and not merely as defined in any statute. All non-forest activities in forest areas must have prior approval of the Central Government under the Forest Conservation Act, 1980.',
    verdict: 'The court expanded the definition of "forest" to include all statutorily recognized forests, regardless of ownership. It directed that no state government or authority could de-reserve any forest or allow any non-forest activity without the approval of the Central Government and the Supreme Court.',
    significance: 'One of the most impactful environmental cases in India. The case has been running since 1995 and has generated hundreds of orders affecting forest conservation policy. Created a comprehensive framework for forest protection across India.',
    relatedSections: ['Article 21', 'Article 48A', 'Article 51A(g)'],
    relatedActs: ['Forest Conservation Act, 1980', 'Environment Protection Act, 1986', 'Constitution of India'],
    category: 'Environmental',
    keywords: ['forest conservation', 'deforestation', 'Nilgiris', 'forest definition', 'non-forest activity', 'Central Government approval']
  },

  // ═══════════════════════════════════════════════
  // SC/ST & RESERVATION
  // ═══════════════════════════════════════════════
  {
    caseName: 'Subhash Kashinath Mahajan v. State of Maharashtra',
    citation: '(2018) 6 SCC 454',
    court: 'Supreme Court',
    year: 2018,
    judges: ['A.K. Goel', 'U.U. Lalit'],
    summary: 'The court examined the alleged misuse of the Scheduled Castes and Scheduled Tribes (Prevention of Atrocities) Act, 1989, and laid down guidelines for arrest under the Act.',
    legalPrinciple: 'To prevent misuse of the SC/ST Act, a preliminary inquiry is required before registering an FIR. Approval of the Senior Superintendent of Police is necessary before arrest. Anticipatory bail is not inherently barred.',
    verdict: 'The court directed that: (1) there should be no automatic arrest upon FIR under the SC/ST Act; (2) a preliminary inquiry must be conducted; (3) approval of the SSP is required for arrest; (4) if the accused is a public servant, approval of the appointing authority is needed.',
    significance: 'Highly controversial decision that was seen as diluting the SC/ST Act. Led to massive nationwide protests and was effectively reversed by Parliament through an amendment to the Act in 2018, restoring the original provisions.',
    relatedSections: ['Section 18 of SC/ST Act', 'Section 438 CrPC'],
    relatedActs: ['Scheduled Castes and Scheduled Tribes (Prevention of Atrocities) Act, 1989', 'SC/ST (Prevention of Atrocities) Amendment Act, 2018'],
    category: 'Criminal',
    keywords: ['SC/ST Act', 'atrocities', 'dilution', 'preliminary inquiry', 'anticipatory bail', 'caste violence', 'Mahajan judgment']
  },

  // ═══════════════════════════════════════════════
  // ADDITIONAL IMPORTANT CASES (~10)
  // ═══════════════════════════════════════════════
  {
    caseName: 'Menaka Guruswamy v. Union of India (Hadiya Case / Shafin Jahan v. Asokan K.M.)',
    citation: '(2018) 16 SCC 368',
    court: 'Supreme Court',
    year: 2018,
    judges: ['Dipak Misra', 'A.M. Khanwilkar', 'D.Y. Chandrachud'],
    summary: 'Hadiya (Akhila Asokan), a Hindu woman, converted to Islam and married Shafin Jahan. The Kerala High Court annulled her marriage, and her father sought the NIA to investigate "love jihad."',
    legalPrinciple: 'The right to choose a partner and the right to marry is a fundamental right under Article 21. Neither the State nor parents have the authority to annul a marriage of two consenting adults.',
    verdict: 'The Supreme Court set aside the Kerala High Court order annulling the marriage, holding that the right to marry a person of one\'s choice is integral to Article 21. The court held that matters of belief and faith, including conversion, are personal to the individual.',
    significance: 'Reaffirmed the autonomy of adults to choose their life partners. Addressed the controversial "love jihad" narrative. Established that the High Court exceeded its jurisdiction in annulling a marriage under habeas corpus proceedings.',
    relatedSections: ['Article 21', 'Article 25'],
    relatedActs: ['Constitution of India', 'Special Marriage Act, 1954'],
    category: 'Family',
    keywords: ['Hadiya case', 'love jihad', 'right to marry', 'religious conversion', 'adult consent', 'personal liberty', 'inter-faith marriage']
  },
  {
    caseName: 'Common Cause v. Union of India (Euthanasia / Living Will)',
    citation: '(2018) 5 SCC 1',
    court: 'Supreme Court',
    year: 2018,
    judges: ['Dipak Misra', 'A.K. Sikri', 'A.M. Khanwilkar', 'D.Y. Chandrachud', 'Ashok Bhushan'],
    summary: 'The Supreme Court examined whether passive euthanasia and the concept of a living will or advance directive are legally permissible in India.',
    legalPrinciple: 'The right to die with dignity is a fundamental right under Article 21. Passive euthanasia is permissible in certain circumstances. Individuals have the right to execute advance directives (living wills) regarding the withholding or withdrawing of medical treatment.',
    verdict: 'The court recognized the right to die with dignity as part of Article 21. It laid down comprehensive guidelines for passive euthanasia and the execution of advance directives (living wills). Active euthanasia and assisted suicide remain illegal.',
    significance: 'Landmark decision legalizing passive euthanasia and advance directives in India. Expanded the interpretation of Article 21 to include the right to die with dignity. Provided a detailed framework for medical practitioners and families.',
    relatedSections: ['Article 21', 'Section 309 IPC'],
    relatedActs: ['Constitution of India', 'Indian Penal Code, 1860'],
    category: 'Human Rights',
    keywords: ['euthanasia', 'right to die with dignity', 'living will', 'advance directive', 'passive euthanasia', 'Article 21', 'terminal illness']
  },
  {
    caseName: 'Vishaka Workers Union v. State of Rajasthan (MC Mehta v. State of Tamil Nadu - Child Labour)',
    citation: '(1996) 6 SCC 756',
    court: 'Supreme Court',
    year: 1996,
    judges: ['Hansaria', 'S. Mohan'],
    summary: 'M.C. Mehta filed a PIL highlighting the plight of child labourers employed in hazardous industries, particularly match factories in Sivakasi, Tamil Nadu.',
    legalPrinciple: 'Employment of children in hazardous industries violates Article 24 of the Constitution. The right to education and development of children is part of Article 21. Employers of child labour must be penalized and a rehabilitative approach must be adopted.',
    verdict: 'The court directed that: (1) a survey of child labour be conducted; (2) children must be withdrawn from hazardous employment; (3) employers must contribute Rs. 20,000 per child to a welfare fund; (4) alternative employment must be given to an adult member of the child\'s family; (5) children must receive education.',
    significance: 'Comprehensive framework for eradication of child labour. Led to policy changes and strengthened implementation of the Child Labour (Prohibition and Regulation) Act. Directed creation of a child labour rehabilitation fund.',
    relatedSections: ['Article 24', 'Article 21', 'Article 39(e)', 'Article 39(f)', 'Article 45'],
    relatedActs: ['Constitution of India', 'Child Labour (Prohibition and Regulation) Act, 1986', 'Child and Adolescent Labour (Prohibition and Regulation) Act, 1986'],
    category: 'Human Rights',
    keywords: ['child labour', 'hazardous employment', 'Sivakasi', 'Article 24', 'child rights', 'rehabilitation', 'education']
  },
  {
    caseName: 'Vineet Narain v. Union of India (Jain Hawala Case)',
    citation: '(1998) 1 SCC 226',
    court: 'Supreme Court',
    year: 1998,
    judges: ['J.S. Verma', 'S.P. Bharucha', 'S.C. Sen'],
    summary: 'The case arose from the Jain Hawala diary scandal, which revealed payments to several politicians. The CBI was accused of deliberately not investigating high-profile politicians.',
    legalPrinciple: 'The CBI must be insulated from political pressure and given functional autonomy. The Central Vigilance Commission (CVC) should supervise the CBI in anti-corruption cases. No single-directive protection for investigating senior officials.',
    verdict: 'The court laid down guidelines for ensuring the independence of the CBI and issued directions for: (1) a statutory status for the CVC; (2) selection of the CBI Director through a committee; (3) a fixed tenure for the CBI Director; (4) no single-directive protection for investigating senior bureaucrats.',
    significance: 'Landmark case for institutional integrity. Led to the Central Vigilance Commission Act, 2003 and strengthened the independence of the CBI. Addressed the issue of political interference in corruption investigations.',
    relatedSections: ['Article 14', 'Article 21', 'Delhi Special Police Establishment Act'],
    relatedActs: ['Delhi Special Police Establishment Act, 1946', 'Central Vigilance Commission Act, 2003', 'Prevention of Corruption Act, 1988'],
    category: 'Criminal',
    keywords: ['CBI independence', 'Hawala', 'corruption', 'CVC', 'political interference', 'anti-corruption', 'institutional integrity']
  },
  {
    caseName: 'Aruna Ramchandra Shanbaug v. Union of India',
    citation: '(2011) 4 SCC 454',
    court: 'Supreme Court',
    year: 2011,
    judges: ['Markandey Katju', 'Gyan Sudha Misra'],
    summary: 'Aruna Shanbaug, a nurse at KEM Hospital Mumbai, was in a persistent vegetative state for 37 years after being sexually assaulted. A journalist filed a PIL seeking permission for passive euthanasia.',
    legalPrinciple: 'Passive euthanasia (withdrawal of life-sustaining treatment) is permissible under certain circumstances in India. Active euthanasia remains illegal. The decision must be taken by a medical board and approved by the High Court.',
    verdict: 'The court rejected the specific plea to withdraw treatment for Aruna Shanbaug (as the hospital staff wanted to continue care) but recognized passive euthanasia as legal in certain circumstances. It laid down guidelines requiring High Court approval and medical board assessment.',
    significance: 'First Indian case to legally recognize passive euthanasia. Established procedural safeguards for end-of-life decisions. The principles were further expanded in Common Cause v. Union of India (2018).',
    relatedSections: ['Article 21', 'Section 309 IPC', 'Section 306 IPC'],
    relatedActs: ['Constitution of India', 'Indian Penal Code, 1860'],
    category: 'Human Rights',
    keywords: ['passive euthanasia', 'right to die', 'persistent vegetative state', 'Aruna Shanbaug', 'mercy killing', 'end of life']
  },
  {
    caseName: 'Prakash v. Phulavati',
    citation: '(2016) 2 SCC 36',
    court: 'Supreme Court',
    year: 2015,
    judges: ['Anil R. Dave', 'A.K. Goel'],
    summary: 'The case examined whether the Hindu Succession (Amendment) Act, 2005, which gave daughters equal coparcenary rights, applies retrospectively.',
    legalPrinciple: 'The rights under the Hindu Succession (Amendment) Act, 2005, granting daughters equal coparcenary rights, are applicable to living daughters of living coparceners as on September 9, 2005 (the date of commencement).',
    verdict: 'The court held that the amendment is applicable to daughters who were alive on September 9, 2005, irrespective of when they were born. The father (coparcener) must also be alive on that date. (This was later modified by Vineeta Sharma, 2020).',
    significance: 'Important decision on women\'s property rights in Hindu joint families. Clarified the applicability of the 2005 Amendment, though the ruling on the father being alive was later overruled in Vineeta Sharma v. Rakesh Sharma (2020).',
    relatedSections: ['Section 6 of Hindu Succession Act'],
    relatedActs: ['Hindu Succession Act, 1956', 'Hindu Succession (Amendment) Act, 2005'],
    category: 'Property',
    keywords: ['coparcenary rights', 'daughters\' rights', 'Hindu succession', 'property rights', 'joint family', 'Section 6', 'women\'s property']
  },
  {
    caseName: 'Vineeta Sharma v. Rakesh Sharma',
    citation: '(2020) 9 SCC 1',
    court: 'Supreme Court',
    year: 2020,
    judges: ['Arun Mishra', 'S. Abdul Nazeer', 'M.R. Shah'],
    summary: 'A three-judge bench resolved the conflicting interpretations regarding the applicability of the Hindu Succession (Amendment) Act, 2005, particularly whether the father needed to be alive on September 9, 2005.',
    legalPrinciple: 'The coparcenary right of daughters under the amended Section 6 of the Hindu Succession Act is a birthright and does not depend on the father being alive on September 9, 2005. The right is retrospective in nature.',
    verdict: 'The court held that the 2005 Amendment conferring coparcenary rights on daughters is retroactive in nature. It applies irrespective of whether the father was alive or not on the date of the amendment. The court overruled Prakash v. Phulavati and Danamma v. Amar on this point.',
    significance: 'Settled the law on daughters\' coparcenary rights conclusively. Ensured equal property rights for daughters in Hindu joint families. Removed the unfair requirement of the father being alive for daughters to claim their share.',
    relatedSections: ['Section 6 of Hindu Succession Act'],
    relatedActs: ['Hindu Succession Act, 1956', 'Hindu Succession (Amendment) Act, 2005'],
    category: 'Property',
    keywords: ['coparcenary rights', 'daughter\'s share', 'Hindu succession', 'birthright', 'property equality', 'retroactive', 'Section 6']
  },
  {
    caseName: 'Romesh Thappar v. State of Madras',
    citation: 'AIR 1950 SC 124',
    court: 'Supreme Court',
    year: 1950,
    judges: ['Patanjali Sastri', 'Mehr Chand Mahajan', 'B.K. Mukherjea', 'S.R. Das', 'N. Chandrasekhara Aiyar'],
    summary: 'The editor of the weekly journal "Cross Roads" challenged the Madras government\'s ban on entry and circulation of the journal in the state under the Madras Maintenance of Public Order Act, 1949.',
    legalPrinciple: 'Freedom of the press is included in the freedom of speech and expression under Article 19(1)(a). Restrictions on press freedom must fall within the grounds specified in Article 19(2).',
    verdict: 'The court struck down the ban as unconstitutional, holding that freedom of the press is an essential part of the right to freedom of speech and expression. The restriction under "public order" was not a permissible ground under the then-existing Article 19(2).',
    significance: 'One of the earliest and most important decisions on press freedom in India. Established that freedom of speech includes freedom of the press. Led to the First Amendment of the Constitution adding "public order" as a ground for restriction under Article 19(2).',
    relatedSections: ['Article 19(1)(a)', 'Article 19(2)'],
    relatedActs: ['Constitution of India', 'Madras Maintenance of Public Order Act, 1949'],
    category: 'Constitutional',
    keywords: ['freedom of press', 'free speech', 'Article 19', 'censorship', 'public order', 'media freedom']
  },
  {
    caseName: 'Peoples Union for Civil Liberties (PUCL) v. Union of India (Phone Tapping)',
    citation: '(1997) 1 SCC 301',
    court: 'Supreme Court',
    year: 1996,
    judges: ['Kuldip Singh', 'Saghir Ahmad'],
    summary: 'The case arose from allegations of phone tapping of politicians and other public figures. PUCL challenged the constitutional validity of Section 5(2) of the Indian Telegraph Act, 1885.',
    legalPrinciple: 'The right to privacy includes the right to hold a telephone conversation in the privacy of one\'s home or office without interference. Telephone tapping is a serious invasion of privacy. Section 5(2) must be read with procedural safeguards.',
    verdict: 'The court held that telephone tapping infringes on the right to privacy under Article 21. While not striking down Section 5(2), the court laid down procedural safeguards for telephone tapping, including: orders only by the Home Secretary, review by a committee, time limits, and destruction of records.',
    significance: 'Pioneering decision on surveillance and privacy. Established procedural safeguards for wiretapping that influenced subsequent privacy jurisprudence. The guidelines remained in force until being supplemented by the K.S. Puttaswamy privacy judgment.',
    relatedSections: ['Article 19(1)(a)', 'Article 21', 'Section 5(2) Indian Telegraph Act'],
    relatedActs: ['Indian Telegraph Act, 1885', 'Constitution of India'],
    category: 'Constitutional',
    keywords: ['phone tapping', 'surveillance', 'right to privacy', 'wiretapping', 'telegraph act', 'procedural safeguards']
  },
  {
    caseName: 'Secretary, Ministry of Defence v. Babita Puniya',
    citation: '(2020) 7 SCC 469',
    court: 'Supreme Court',
    year: 2020,
    judges: ['D.Y. Chandrachud', 'Ajay Rastogi'],
    summary: 'Women officers in the Indian Army challenged the denial of permanent commission and consequent denial of pensionary benefits and command appointments.',
    legalPrinciple: 'Denial of permanent commission to women officers in the Indian Army on the ground of gender is discriminatory and violates Articles 14 and 16. Women officers are entitled to permanent commission on par with male officers.',
    verdict: 'The court directed that women officers in the Indian Army be granted permanent commission on the same terms as male officers. The court rejected the government\'s arguments about physiological limitations, unit cohesion, and family obligations as based on sex stereotypes.',
    significance: 'Historic decision for gender equality in the Indian armed forces. Rejected gender stereotypes as a basis for discrimination. Extended equal opportunities for women in military service, including command positions.',
    relatedSections: ['Article 14', 'Article 15', 'Article 16'],
    relatedActs: ['Constitution of India', 'Army Act, 1950'],
    category: 'Human Rights',
    keywords: ['women in army', 'permanent commission', 'gender equality', 'military service', 'sex discrimination', 'armed forces', 'command appointments']
  }
];

async function seedVerdicts() {
  try {
    console.log('╔══════════════════════════════════════════════════╗');
    console.log('║     LAWBOOK — Court Verdicts Seed Script         ║');
    console.log('╚══════════════════════════════════════════════════╝');
    console.log();

    // Connect to MongoDB
    console.log(`⏳ Connecting to MongoDB: ${MONGODB_URI}`);
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB successfully.\n');

    // Clear existing data
    console.log('🗑️  Clearing existing CourtVerdict data...');
    const deleteResult = await CourtVerdict.deleteMany({});
    console.log(`   Deleted ${deleteResult.deletedCount} existing records.\n`);

    // Seed verdicts
    console.log(`📥 Seeding ${verdicts.length} landmark court verdicts...\n`);

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < verdicts.length; i++) {
      const v = verdicts[i];
      try {
        await CourtVerdict.create(v);
        successCount++;
        const num = String(i + 1).padStart(2, '0');
        console.log(`   [${num}/${verdicts.length}] ✅ ${v.caseName} (${v.year})`);
      } catch (err) {
        errorCount++;
        const num = String(i + 1).padStart(2, '0');
        console.error(`   [${num}/${verdicts.length}] ❌ ${v.caseName} — ${err.message}`);
      }
    }

    // Summary
    console.log('\n══════════════════════════════════════════════════');
    console.log('                  SEED SUMMARY                    ');
    console.log('══════════════════════════════════════════════════');
    console.log(`   Total verdicts:    ${verdicts.length}`);
    console.log(`   ✅ Inserted:       ${successCount}`);
    console.log(`   ❌ Errors:         ${errorCount}`);

    // Category breakdown
    const categories = {};
    verdicts.forEach(v => {
      categories[v.category] = (categories[v.category] || 0) + 1;
    });
    console.log('\n   📊 Category Breakdown:');
    Object.entries(categories)
      .sort((a, b) => b[1] - a[1])
      .forEach(([cat, count]) => {
        console.log(`      ${cat.padEnd(18)} ${count}`);
      });

    console.log('\n══════════════════════════════════════════════════');
    console.log('✅ Seeding complete!\n');

  } catch (err) {
    console.error('❌ Fatal error during seeding:', err);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB.');
  }
}

seedVerdicts();
