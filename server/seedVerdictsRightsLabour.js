require('dotenv').config();
const mongoose = require('mongoose');
const CourtVerdict = require('./models/CourtVerdict');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lawbook';

const verdicts = [
  // ═══════════════════════════════════════════════
  // HUMAN RIGHTS (10)
  // ═══════════════════════════════════════════════
  {
    caseName: 'Olga Tellis v. Bombay Municipal Corporation',
    citation: '(1985) 3 SCC 545',
    court: 'Supreme Court',
    year: 1985,
    judges: ['Y.V. Chandrachud', 'Syed Murtaza Fazal Ali', 'V.D. Tulzapurkar', 'O. Chinnappa Reddy', 'A. Varadarajan'],
    summary: 'Pavement and slum dwellers in Bombay challenged the Bombay Municipal Corporation\'s decision to evict them from their dwellings. The petitioners, many of whom were journalists, argued that eviction would deprive them of their livelihood and thus violate their right to life under Article 21.',
    legalPrinciple: 'The right to livelihood is an integral part of the right to life under Article 21 of the Constitution. No person can be deprived of livelihood except by a procedure established by law which is fair, just, and reasonable. Eviction of pavement dwellers without notice and hearing is unconstitutional.',
    verdict: 'The Supreme Court held that the right to livelihood is included in the right to life guaranteed by Article 21. While pavement dwellers do not have a right to encroach on public property, they cannot be evicted without following due process including adequate notice and opportunity to be heard.',
    significance: 'Landmark expansion of Article 21 to include the right to livelihood. Established that economic rights are integral to the right to life. Protected vulnerable populations from arbitrary eviction while balancing public interest.',
    relatedSections: ['Article 21', 'Article 19(1)(g)', 'Article 14'],
    relatedActs: ['Constitution of India', 'Bombay Municipal Corporation Act, 1888'],
    category: 'Human Rights',
    keywords: ['right to livelihood', 'pavement dwellers', 'eviction', 'Article 21', 'right to life', 'due process', 'slum dwellers']
  },
  {
    caseName: 'Francis Coralie Mullin v. The Administrator, Union Territory of Delhi',
    citation: '(1981) 1 SCC 608',
    court: 'Supreme Court',
    year: 1981,
    judges: ['P.N. Bhagwati'],
    summary: 'A British national detained under COFEPOSA (Conservation of Foreign Exchange and Prevention of Smuggling Activities Act) challenged restrictions on receiving visits from her lawyer and family, arguing that these restrictions violated her right to life and personal liberty under Article 21.',
    legalPrinciple: 'The right to life under Article 21 includes the right to live with human dignity and all that goes along with it, including the bare necessities of life such as adequate nutrition, clothing, shelter, facilities for reading, writing, and expressing oneself. It also includes the right to protection against torture, cruelty, and inhuman treatment.',
    verdict: 'The court held that the right to life under Article 21 is not confined to mere animal existence but includes the right to live with basic human dignity. Restrictions on meeting family and legal counsel were held to be violative of Article 21 unless justified by a procedure established by law that is fair, just, and reasonable.',
    significance: 'Seminal judgment that expansively interpreted the right to life under Article 21 to encompass the right to live with dignity. Became a foundational precedent for numerous subsequent cases expanding the scope of Article 21.',
    relatedSections: ['Article 21', 'Article 14', 'Article 19'],
    relatedActs: ['Constitution of India', 'Conservation of Foreign Exchange and Prevention of Smuggling Activities Act, 1974'],
    category: 'Human Rights',
    keywords: ['right to dignity', 'right to life', 'Article 21', 'human dignity', 'bare necessities', 'detention rights', 'COFEPOSA']
  },
  {
    caseName: 'Chameli Singh v. State of Uttar Pradesh',
    citation: '(1996) 2 SCC 549',
    court: 'Supreme Court',
    year: 1996,
    judges: ['K. Ramaswamy', 'B.L. Hansaria'],
    summary: 'The case arose from a challenge to the U.P. Avas Evam Vikas Parishad Adhiniyam, 1965, regarding acquisition of land for planned development and provision of housing. The petitioners challenged the validity of land acquisition for housing schemes.',
    legalPrinciple: 'The right to shelter is a fundamental right under Article 21 of the Constitution. Shelter does not mean merely a roof over one\'s head but includes adequate living space, safe and decent structure, clean and decent surroundings, sufficient light, pure air and water, electricity, sanitation, and other civic amenities.',
    verdict: 'The Supreme Court held that the right to shelter is a component of the right to life under Article 21. The court upheld the land acquisition for housing purposes as serving a public purpose consistent with the constitutional mandate of providing shelter to citizens.',
    significance: 'Established the right to shelter as a fundamental right under Article 21, expanding it beyond mere roof over the head to include dignified living conditions. Provided constitutional backing for government housing schemes and land acquisition for housing purposes.',
    relatedSections: ['Article 21', 'Article 19(1)(e)', 'Article 38', 'Article 39'],
    relatedActs: ['Constitution of India', 'U.P. Avas Evam Vikas Parishad Adhiniyam, 1965', 'Land Acquisition Act, 1894'],
    category: 'Human Rights',
    keywords: ['right to shelter', 'housing', 'Article 21', 'right to life', 'land acquisition', 'adequate living space', 'civic amenities']
  },
  {
    caseName: 'Paschim Banga Khet Mazdoor Samity v. State of West Bengal',
    citation: '(1996) 4 SCC 37',
    court: 'Supreme Court',
    year: 1996,
    judges: ['Kuldip Singh', 'B.L. Hansaria'],
    summary: 'Hakim Sheikh, a labourer, fell off a train and sustained serious injuries. He was refused treatment at several government hospitals in Calcutta due to lack of beds and facilities. The Paschim Banga Khet Mazdoor Samity filed a PIL challenging the denial of emergency medical care.',
    legalPrinciple: 'The right to emergency medical care is a fundamental right under Article 21. The State cannot avoid its constitutional obligation to provide adequate medical facilities by citing financial constraints. Denial of timely medical treatment to a person in need amounts to a violation of the right to life.',
    verdict: 'The Supreme Court held that the failure of a government hospital to provide timely medical treatment to a person in need constitutes a violation of Article 21. The court directed the government to ensure availability of adequate medical facilities at all government hospitals and set up a system for dealing with emergency medical cases.',
    significance: 'Established the right to emergency medical care as a fundamental right. Made it clear that financial constraints cannot be an excuse for the State to deny medical treatment. Led to improvements in emergency healthcare infrastructure across government hospitals.',
    relatedSections: ['Article 21', 'Article 41', 'Article 47'],
    relatedActs: ['Constitution of India'],
    category: 'Human Rights',
    keywords: ['right to health', 'emergency medical care', 'Article 21', 'government hospital', 'right to life', 'healthcare', 'state obligation']
  },
  {
    caseName: 'Selvi v. State of Karnataka',
    citation: '(2010) 7 SCC 263',
    court: 'Supreme Court',
    year: 2010,
    judges: ['K.G. Balakrishnan', 'R.V. Raveendran', 'J.M. Panchal'],
    summary: 'The Supreme Court examined the constitutional validity of involuntary administration of certain scientific tests -- narcoanalysis, polygraph (lie detector), and brain electrical activation profile (BEAP) test -- on accused persons during criminal investigation.',
    legalPrinciple: 'Involuntary administration of narcoanalysis, polygraph, and brain mapping tests violates the right against self-incrimination under Article 20(3) and the right to personal liberty under Article 21. Such tests cannot be conducted without the informed consent of the subject.',
    verdict: 'The court held that compulsory administration of narcoanalysis, polygraph, and BEAP tests is unconstitutional as it violates Article 20(3) (right against self-incrimination) and Article 21 (right to personal liberty and mental privacy). However, such tests may be administered with the informed consent of the subject, and results obtained through voluntary submission may be used as evidence.',
    significance: 'Landmark judgment protecting mental privacy and the right against self-incrimination in the context of modern scientific investigative techniques. Balanced the needs of criminal investigation with fundamental rights of the accused.',
    relatedSections: ['Article 20(3)', 'Article 21', 'Article 14'],
    relatedActs: ['Constitution of India', 'Code of Criminal Procedure, 1973', 'Indian Evidence Act, 1872'],
    category: 'Human Rights',
    keywords: ['narcoanalysis', 'polygraph', 'lie detector', 'brain mapping', 'self-incrimination', 'mental privacy', 'Article 20(3)', 'informed consent']
  },
  {
    caseName: 'People\'s Union for Democratic Rights v. Union of India',
    citation: '(1982) 3 SCC 235',
    court: 'Supreme Court',
    year: 1982,
    judges: ['P.N. Bhagwati', 'Amarendra Nath Sen'],
    summary: 'Known as the Asiad Workers Case, PUDR filed a PIL alleging that workers employed in the construction of projects for the 1982 Asian Games in Delhi were being subjected to forced labour, paid below minimum wages, and denied basic working conditions.',
    legalPrinciple: 'Payment of wages below the minimum wage constitutes forced labour within the meaning of Article 23 of the Constitution. Any person who provides labour or service is a workman entitled to the benefit of labour laws. Contractors and the government are jointly responsible for ensuring compliance with labour laws.',
    verdict: 'The court held that non-payment of minimum wages to workers amounts to forced labour prohibited under Article 23. The court directed that the workers be paid minimum wages, that labour laws be strictly enforced, and that the government as the principal employer is vicariously liable for violations by contractors.',
    significance: 'Expanded the concept of forced labour under Article 23 to include employment at below minimum wages. Established the liability of the principal employer for labour law violations by contractors. Reinforced the power of PIL as a tool for social justice.',
    relatedSections: ['Article 23', 'Article 24', 'Article 21', 'Article 14'],
    relatedActs: ['Constitution of India', 'Minimum Wages Act, 1948', 'Contract Labour (Regulation and Abolition) Act, 1970', 'Equal Remuneration Act, 1976'],
    category: 'Human Rights',
    keywords: ['Asiad workers', 'forced labour', 'minimum wages', 'Article 23', 'PIL', 'construction workers', 'contract labour', 'bonded labour']
  },
  {
    caseName: 'Kiran Bedi v. Committee of Inquiry',
    citation: '(1993) 1 SCC 494',
    court: 'Supreme Court',
    year: 1993,
    judges: ['M.N. Venkatachaliah', 'J.S. Verma'],
    summary: 'The case arose from a Committee of Inquiry constituted to examine Kiran Bedi\'s reforms as Inspector General of Prisons at Tihar Jail, including de-addiction programs, literacy campaigns, and complaint redressal mechanisms for prisoners. Her methods of prison administration were questioned.',
    legalPrinciple: 'Prison reforms aimed at rehabilitation and restoration of dignity of prisoners are consistent with constitutional values. Prisoners retain their fundamental rights subject to restrictions inherent in incarceration. The State has a duty to ensure humane treatment and rehabilitative programs in prisons.',
    verdict: 'The Supreme Court upheld the prison reform measures implemented by Kiran Bedi at Tihar Jail, recognizing them as consistent with constitutional principles of human dignity and rehabilitation. The court emphasized that prisoners are entitled to protection of their fundamental rights and that prison administration should be reformative rather than merely punitive.',
    significance: 'Endorsed prison reform as a constitutional mandate. Recognized that prison management should focus on rehabilitation and reintegration of prisoners into society. Provided judicial backing for progressive prison administration practices.',
    relatedSections: ['Article 21', 'Article 14', 'Article 19'],
    relatedActs: ['Constitution of India', 'Prisons Act, 1894'],
    category: 'Human Rights',
    keywords: ['prison reform', 'Tihar Jail', 'Kiran Bedi', 'prisoner rights', 'rehabilitation', 'human dignity', 'prison administration']
  },
  {
    caseName: 'Sunil Batra v. Delhi Administration',
    citation: '(1978) 4 SCC 494',
    court: 'Supreme Court',
    year: 1978,
    judges: ['V.R. Krishna Iyer', 'P.M. Desai'],
    summary: 'A prisoner in Tihar Jail wrote a letter to Justice V.R. Krishna Iyer alleging that a fellow prisoner, Prem Chand, had been subjected to brutal torture by a prison warden who inserted a rod into his anus. The Supreme Court treated the letter as a writ petition under Article 32.',
    legalPrinciple: 'A prisoner does not lose all fundamental rights by being incarcerated. Prison walls do not separate a prisoner from his fundamental rights. Torture, cruel, inhuman, or degrading treatment of prisoners is unconstitutional. Courts can treat letters from prisoners as writ petitions (epistolary jurisdiction).',
    verdict: 'The court held that prisoners retain their fundamental rights under Article 21 and cannot be subjected to torture or inhuman treatment. The court laid down detailed guidelines for prison administration including: prohibition of solitary confinement without procedural safeguards, right to legal consultation, right of prisoner to communicate with family, and establishment of grievance redressal mechanisms.',
    significance: 'Pioneering judgment on prisoners\' rights in India. Established that fundamental rights survive incarceration. Introduced epistolary jurisdiction -- courts treating letters from prisoners as writ petitions. Laid down comprehensive guidelines for humane treatment of prisoners.',
    relatedSections: ['Article 21', 'Article 14', 'Article 19'],
    relatedActs: ['Constitution of India', 'Prisons Act, 1894', 'Code of Criminal Procedure, 1973'],
    category: 'Human Rights',
    keywords: ['prisoners rights', 'custodial torture', 'epistolary jurisdiction', 'prison guidelines', 'Article 21', 'Tihar Jail', 'fundamental rights', 'inhuman treatment']
  },
  {
    caseName: 'Nandini Sundar v. State of Chhattisgarh',
    citation: '(2011) 7 SCC 547',
    court: 'Supreme Court',
    year: 2011,
    judges: ['B. Sudershan Reddy', 'S.S. Nijjar'],
    summary: 'A group of citizens and academics challenged the State of Chhattisgarh\'s policy of arming civilian vigilante groups (Salwa Judum) to counter Naxalite insurgency. Allegations included extrajudicial killings, displacement, burning of villages, and sexual violence by Salwa Judum members and Special Police Officers (SPOs).',
    legalPrinciple: 'The State cannot use civilians as armed vigilante forces to combat insurgency. Arming of tribal youth as Special Police Officers (SPOs) and deploying them in counter-insurgency operations is unconstitutional. The State has an obligation to protect the fundamental rights of all citizens, including those in conflict zones.',
    verdict: 'The Supreme Court declared the Salwa Judum and the appointment of SPOs for counter-insurgency operations as illegal and unconstitutional. The court directed the State to immediately cease arming civilians and to recall all firearms distributed to SPOs. It ordered investigation of allegations of human rights violations by Salwa Judum and security forces.',
    significance: 'Landmark judgment restraining state-sponsored vigilantism. Upheld the rule of law and constitutional governance even in areas affected by armed insurgency. Established that the State cannot abdicate its duty to maintain law and order by outsourcing it to armed civilian groups.',
    relatedSections: ['Article 21', 'Article 14', 'Article 19'],
    relatedActs: ['Constitution of India', 'Chhattisgarh Police Act, 2007'],
    category: 'Human Rights',
    keywords: ['Salwa Judum', 'vigilante', 'Naxalite', 'Chhattisgarh', 'SPO', 'counter-insurgency', 'tribal rights', 'human rights violations']
  },
  {
    caseName: 'Extra Judicial Execution Victim Families Association v. Union of India',
    citation: '(2016) 14 SCC 536',
    court: 'Supreme Court',
    year: 2016,
    judges: ['Madan B. Lokur', 'U.U. Lalit'],
    summary: 'Families of victims of alleged fake encounter killings in Manipur by the Indian Army and paramilitary forces operating under the Armed Forces (Special Powers) Act (AFSPA) approached the Supreme Court challenging the immunity enjoyed by armed forces personnel.',
    legalPrinciple: 'The Armed Forces (Special Powers) Act does not confer absolute immunity on security forces personnel. Even in disturbed areas, the armed forces cannot use excessive or retaliatory force beyond what is necessary. Every death caused by the armed forces must be thoroughly investigated, and the use of force must be proportionate and justified.',
    verdict: 'The Supreme Court held that AFSPA does not provide blanket immunity to armed forces from prosecution for extrajudicial killings. The court directed that each case of alleged fake encounter be investigated by a Special Investigation Team (SIT). The court held that the right to life under Article 21 cannot be suspended even in a disturbed area.',
    significance: 'Historic judgment that pierced the shield of AFSPA immunity. Ordered investigation into over 1,500 alleged fake encounter cases in Manipur. Affirmed that military operations are subject to constitutional limits and judicial review. Strengthened accountability of armed forces in conflict zones.',
    relatedSections: ['Article 21', 'Article 14', 'Section 4 AFSPA', 'Section 6 AFSPA'],
    relatedActs: ['Armed Forces (Special Powers) Act, 1958', 'Constitution of India'],
    category: 'Human Rights',
    keywords: ['AFSPA', 'fake encounter', 'extrajudicial killing', 'Manipur', 'armed forces', 'military immunity', 'right to life', 'human rights']
  },

  // ═══════════════════════════════════════════════
  // LABOUR LAW (7)
  // ═══════════════════════════════════════════════
  {
    caseName: 'Bangalore Water Supply and Sewerage Board v. A. Rajappa',
    citation: '(1978) 2 SCC 213',
    court: 'Supreme Court',
    year: 1978,
    judges: ['V.R. Krishna Iyer', 'P.N. Bhagwati', 'S. Murtaza Fazal Ali', 'D.A. Desai', 'O. Chinnappa Reddy'],
    summary: 'The Supreme Court examined the definition of "industry" under Section 2(j) of the Industrial Disputes Act, 1947. The Bangalore Water Supply Board argued it was a governmental body and not an "industry" within the meaning of the Act.',
    legalPrinciple: 'The definition of "industry" under the Industrial Disputes Act must be interpreted broadly. The triple test for determining whether an activity constitutes an industry is: (1) systematic activity, (2) organized by cooperation between employer and employee, (3) for the production and/or distribution of goods and services calculated to satisfy human wants and wishes. Sovereign and governmental functions like defence, legislation, and judiciary are excluded.',
    verdict: 'The court adopted a broad and liberal definition of "industry" to include almost all organized economic activities including those carried on by government departments and statutory bodies. Only sovereign and inalienable functions of the State were excluded from the definition.',
    significance: 'Definitive interpretation of "industry" under the Industrial Disputes Act that brought a vast number of government and public sector undertakings under the purview of industrial law. Expanded the coverage of labour protection to millions of workers in government services.',
    relatedSections: ['Section 2(j) Industrial Disputes Act'],
    relatedActs: ['Industrial Disputes Act, 1947', 'Constitution of India'],
    category: 'Labour',
    keywords: ['definition of industry', 'Industrial Disputes Act', 'triple test', 'government undertaking', 'public utility', 'sovereign function', 'organized activity']
  },
  {
    caseName: 'The Workmen of M/s Dimakuchi Tea Estate v. The Management of M/s Dimakuchi Tea Estate',
    citation: 'AIR 1958 SC 353',
    court: 'Supreme Court',
    year: 1958,
    judges: ['S.R. Das', 'N.H. Bhagwati', 'T.L. Venkatarama Aiyyar', 'B.P. Sinha', 'S.K. Das'],
    summary: 'The workmen of Dimakuchi Tea Estate in Assam raised an industrial dispute regarding their claim for bonus. The management contended that the estate did not make sufficient profits to justify payment of bonus.',
    legalPrinciple: 'Bonus is a deferred wage payable to workers as a matter of right when the employer earns profits from the workers\' contribution to the enterprise. The Full Bench formula for calculating available surplus for bonus distribution requires deducting prior charges (depreciation, taxes, return on capital, and return on reserves) from gross profits.',
    verdict: 'The Supreme Court endorsed the concept of bonus as deferred wages and laid down the Full Bench formula for computing available surplus for bonus. The court held that workers who contribute to the generation of profits are entitled to share in those profits through bonus payments.',
    significance: 'Established the legal foundation for bonus as a right of workers rather than a matter of employer discretion. The Full Bench formula became the standard method for bonus computation and influenced the enactment of the Payment of Bonus Act, 1965.',
    relatedSections: ['Section 2(j) Industrial Disputes Act', 'Section 10 Industrial Disputes Act'],
    relatedActs: ['Industrial Disputes Act, 1947', 'Payment of Bonus Act, 1965'],
    category: 'Labour',
    keywords: ['bonus', 'deferred wages', 'Full Bench formula', 'available surplus', 'tea estate', 'profit sharing', 'workers rights']
  },
  {
    caseName: 'Standard Vacuum Refining Company of India v. Its Workmen',
    citation: 'AIR 1961 SC 895',
    court: 'Supreme Court',
    year: 1961,
    judges: ['B.P. Sinha', 'J.L. Kapur', 'A.K. Sarkar', 'K.C. Das Gupta', 'N. Rajagopala Ayyangar'],
    summary: 'An industrial dispute was raised regarding the quantum of wages and dearness allowance payable to workers of Standard Vacuum Refining Company. The Industrial Tribunal had awarded wage increases, which was challenged by the management.',
    legalPrinciple: 'A fair wage lies between the minimum wage and the living wage. In fixation of wages, the Tribunal must consider: (1) the prevailing rate of wages in the same or similar industry in the region, (2) the level of the national income, (3) the place of the industry in the economy, (4) the capacity of the industry to pay, and (5) the productivity of labour.',
    verdict: 'The Supreme Court laid down the principles for determining fair wages, distinguishing between minimum wage (below which no employer may pay), fair wage (between minimum and living wage), and living wage (the ideal). The court held that wage fixation must balance the competing interests of workers and industry.',
    significance: 'Established the comprehensive framework for fair wage calculation in Indian industrial law. The distinction between minimum, fair, and living wage became foundational for all subsequent wage fixation exercises and influenced wage policy at the national level.',
    relatedSections: ['Section 3 Minimum Wages Act', 'Article 43'],
    relatedActs: ['Industrial Disputes Act, 1947', 'Minimum Wages Act, 1948', 'Constitution of India'],
    category: 'Labour',
    keywords: ['fair wage', 'minimum wage', 'living wage', 'wage fixation', 'dearness allowance', 'capacity to pay', 'industry wage']
  },
  {
    caseName: 'Air India v. Nergesh Meerza',
    citation: '(1981) 4 SCC 335',
    court: 'Supreme Court',
    year: 1981,
    judges: ['V.R. Krishna Iyer', 'O. Chinnappa Reddy', 'A.P. Sen'],
    summary: 'Air hostesses of Air India and Indian Airlines challenged the discriminatory service regulations that required them to retire on attaining the age of 35, upon marriage within four years of service, or upon first pregnancy -- conditions not applicable to their male counterparts.',
    legalPrinciple: 'Service conditions that require air hostesses to retire on first pregnancy are unconstitutional and violative of Article 14 as being manifestly arbitrary and unreasonable. Gender-discriminatory service conditions in employment are impermissible under Articles 14, 15, and 16 of the Constitution.',
    verdict: 'The court struck down the regulation requiring retirement on first pregnancy as unconstitutional and manifestly arbitrary. The bar on marriage within four years of service was upheld as a reasonable service condition. The differential retirement age between air hostesses and male cabin crew was also examined, with the court directing removal of arbitrary distinctions.',
    significance: 'Early landmark judgment on gender discrimination in employment conditions. Recognized that service conditions based on biological functions of women are discriminatory. Influenced the development of workplace gender equality jurisprudence in India.',
    relatedSections: ['Article 14', 'Article 15', 'Article 16'],
    relatedActs: ['Constitution of India', 'Air India Employees Service Regulations', 'Indian Airlines Service Regulations'],
    category: 'Labour',
    keywords: ['gender discrimination', 'air hostess', 'pregnancy termination', 'employment conditions', 'workplace equality', 'retirement age', 'service regulations']
  },
  {
    caseName: 'Secretary, State of Karnataka v. Umadevi',
    citation: '(2006) 4 SCC 1',
    court: 'Supreme Court',
    year: 2006,
    judges: ['Y.K. Sabharwal', 'C.K. Thakker', 'P.K. Balasubramanyan', 'R.V. Raveendran', 'D.K. Jain'],
    summary: 'A Constitution bench examined whether temporary, daily-wage, or contractual workers in government service who had been engaged without following the prescribed recruitment process had a right to claim regularization or permanent absorption.',
    legalPrinciple: 'Temporary, daily-wage, or contractual employees engaged without following the prescribed recruitment process under Articles 14 and 16 cannot claim regularization as a matter of right. Regularization of such employees would violate the rights of other eligible candidates who were denied the opportunity to compete. However, a one-time exception was made for employees who had been in continuous service for 10 or more years.',
    verdict: 'The court held that irregular appointments made without following the constitutional requirements of Articles 14 and 16 cannot be regularized. The court directed that such employees should not be continued beyond the period of engagement. A one-time exception was carved out for employees who had worked for 10 years or more without the fault of the courts or tribunals.',
    significance: 'Definitive ruling on the regularization of temporary government employees. Ended the practice of back-door entries into government service through regularization. Balanced the interests of temporary workers with the constitutional right to equal opportunity in public employment.',
    relatedSections: ['Article 14', 'Article 16', 'Article 309'],
    relatedActs: ['Constitution of India'],
    category: 'Labour',
    keywords: ['regularization', 'temporary workers', 'daily wage', 'contractual employees', 'government service', 'equal opportunity', 'back-door entry', 'Article 16']
  },
  {
    caseName: 'Steel Authority of India Ltd. v. National Union Waterfront Workers',
    citation: '(2001) 7 SCC 1',
    court: 'Supreme Court',
    year: 2001,
    judges: ['D.P. Mohapatra', 'S.N. Variava', 'Y.K. Sabharwal', 'H.K. Sema', 'B.N. Agrawal'],
    summary: 'A Constitution bench examined whether the provisions of the Contract Labour (Regulation and Abolition) Act, 1970, particularly Section 10 (abolition of contract labour) and the consequences of such abolition, mandated automatic absorption of contract labourers by the principal employer.',
    legalPrinciple: 'Abolition of contract labour under Section 10 of the Contract Labour Act does not automatically result in absorption of the contract labourers by the principal employer. There is no provision in the Act for automatic absorption. However, the principal employer must ensure that the workers are not left without employment and the appropriate government must consider their welfare.',
    verdict: 'The court held that Section 10 of the Contract Labour Act does not provide for automatic absorption of contract labour by the principal employer upon issuance of an abolition notification. The court overruled the earlier decision in Air India Statutory Corporation v. United Labour Union (1997) which had held that abolition results in automatic absorption.',
    significance: 'Definitive pronouncement on the rights of contract labourers upon abolition. Clarified that abolition of contract labour does not create a right of automatic absorption, settling a major controversy in labour law. Significantly impacted the rights and welfare of millions of contract workers across India.',
    relatedSections: ['Section 10 Contract Labour Act', 'Section 2(b) Contract Labour Act'],
    relatedActs: ['Contract Labour (Regulation and Abolition) Act, 1970', 'Industrial Disputes Act, 1947'],
    category: 'Labour',
    keywords: ['contract labour', 'abolition', 'absorption', 'principal employer', 'Section 10', 'SAIL', 'contract workers', 'outsourcing']
  },
  {
    caseName: 'Harjinder Singh v. Punjab State Warehousing Corporation',
    citation: '(2010) 3 SCC 192',
    court: 'Supreme Court',
    year: 2010,
    judges: ['Dalveer Bhandari', 'K.S. Panicker Radhakrishnan'],
    summary: 'Daily-wage workers employed by the Punjab State Warehousing Corporation claimed equal pay for equal work, arguing that they performed the same duties as regular employees but were paid substantially lower wages.',
    legalPrinciple: 'The principle of equal pay for equal work is a constitutional goal under Articles 14 and 39(d) of the Constitution. When temporary or daily-wage workers perform the same duties and discharge the same functions as regular workers, they are entitled to the same wages. The State cannot discriminate in the matter of wages between regular and temporary workers performing identical work.',
    verdict: 'The Supreme Court held that the daily-wage workers were entitled to equal pay for equal work as they performed identical duties and functions as regular employees. The court directed the Corporation to pay them wages at par with regular employees from the date of their initial engagement.',
    significance: 'Strengthened the constitutional principle of equal pay for equal work. Provided relief to daily-wage and temporary workers exploited through lower pay despite performing identical work. Reinforced that the State cannot use employment classification to circumvent constitutional equality guarantees.',
    relatedSections: ['Article 14', 'Article 39(d)', 'Article 16'],
    relatedActs: ['Constitution of India', 'Equal Remuneration Act, 1976'],
    category: 'Labour',
    keywords: ['equal pay', 'equal work', 'daily wage', 'temporary workers', 'wage discrimination', 'Article 39(d)', 'constitutional right', 'warehousing']
  },

  // ═══════════════════════════════════════════════
  // ENVIRONMENTAL LAW (9)
  // ═══════════════════════════════════════════════
  {
    caseName: 'M.C. Mehta v. Union of India',
    citation: 'AIR 1987 SC 1086',
    court: 'Supreme Court',
    year: 1987,
    judges: ['P.N. Bhagwati', 'Ranganath Misra', 'M.M. Dutt', 'G.L. Oza', 'K.N. Singh'],
    summary: 'Following the oleum gas leak from the Shriram Food and Fertilizer complex in Delhi on December 4, 1985, which affected thousands of people, M.C. Mehta filed a PIL challenging the operation of hazardous industries in densely populated areas. The case arose in the aftermath of the Bhopal Gas Tragedy.',
    legalPrinciple: 'The doctrine of absolute liability applies to enterprises engaged in inherently dangerous or hazardous activities. Unlike strict liability under Rylands v. Fletcher, absolute liability does not admit any exceptions. An enterprise owes an absolute and non-delegable duty to the community to ensure that no harm results from its hazardous activities, and the measure of compensation must correlate with the magnitude and capacity of the enterprise.',
    verdict: 'The Supreme Court evolved the doctrine of absolute liability -- going beyond the English doctrine of strict liability under Rylands v. Fletcher. The court held that where an enterprise is engaged in a hazardous or inherently dangerous activity and harm results, the enterprise is absolutely liable to compensate without any exception.',
    significance: 'Created the uniquely Indian doctrine of absolute liability, superseding the 19th-century English rule of strict liability. Ensured that hazardous industries cannot escape liability through traditional defences. The principle was later codified under the National Green Tribunal Act, 2010.',
    relatedSections: ['Article 21', 'Article 48A', 'Article 51A(g)'],
    relatedActs: ['Constitution of India', 'Environment (Protection) Act, 1986', 'Factories Act, 1948'],
    category: 'Environmental',
    keywords: ['absolute liability', 'oleum gas leak', 'Shriram Industries', 'hazardous activity', 'Rylands v Fletcher', 'Bhopal gas', 'enterprise liability', 'pollution']
  },
  {
    caseName: 'M.C. Mehta v. Union of India (Ganga Pollution)',
    citation: 'AIR 1988 SC 1115',
    court: 'Supreme Court',
    year: 1988,
    judges: ['E.S. Venkataramiah', 'K.N. Singh'],
    summary: 'M.C. Mehta filed a PIL seeking orders for the prevention of pollution of the river Ganga, particularly by tanneries in Kanpur and other industries discharging untreated effluents into the river. The petition highlighted the severe pollution affecting millions who depended on the Ganga for drinking water and livelihood.',
    legalPrinciple: 'The right to a clean and healthy environment is part of the right to life under Article 21. Industries discharging untreated effluents into water bodies violate the right to clean water and the fundamental right to life. The polluter must bear the cost of pollution prevention and remediation.',
    verdict: 'The court directed the closure of tanneries in Kanpur that were discharging untreated effluents into the Ganga. It ordered the establishment of effluent treatment plants by all industries along the river and directed the government to take steps for cleaning and preventing further pollution of the Ganga.',
    significance: 'Pioneering judgment on river pollution in India. Established the right to clean water as part of the right to life under Article 21. Led to the Ganga Action Plan and subsequent government initiatives for river cleaning. Demonstrated the power of PIL in environmental protection.',
    relatedSections: ['Article 21', 'Article 48A', 'Article 51A(g)'],
    relatedActs: ['Constitution of India', 'Water (Prevention and Control of Pollution) Act, 1974', 'Environment (Protection) Act, 1986'],
    category: 'Environmental',
    keywords: ['Ganga pollution', 'tanneries', 'Kanpur', 'water pollution', 'effluent treatment', 'right to clean water', 'river pollution', 'Article 21']
  },
  {
    caseName: 'M.C. Mehta v. Kamal Nath',
    citation: '(1997) 1 SCC 388',
    court: 'Supreme Court',
    year: 1997,
    judges: ['Kuldip Singh', 'S. Saghir Ahmad'],
    summary: 'The case arose from a newspaper report that a private company (Span Motels Pvt. Ltd.) connected to the family of the then Union Environment Minister Kamal Nath had encroached upon forest land near the Beas river in Himachal Pradesh and diverted the course of the river for its commercial benefit.',
    legalPrinciple: 'The State holds natural resources as a trustee for the benefit of the public (Public Trust Doctrine). The State cannot transfer public property or natural resources to a private party if it would impair public interest. Rivers, forests, seashores, and the air are held by the State in trust for the public and cannot be privatized.',
    verdict: 'The court applied the Public Trust Doctrine for the first time in Indian environmental law. It quashed the lease granted to Span Motels and directed restoration of the encroached land. The court imposed exemplary damages on the motel company and directed it to pay compensation for the ecological damage caused.',
    significance: 'Introduced the Public Trust Doctrine into Indian environmental jurisprudence. Established that natural resources are held in trust by the State for the public and cannot be transferred for private commercial exploitation. Became a foundational principle for environmental protection in India.',
    relatedSections: ['Article 21', 'Article 48A', 'Article 51A(g)'],
    relatedActs: ['Constitution of India', 'Environment (Protection) Act, 1986', 'Indian Forest Act, 1927'],
    category: 'Environmental',
    keywords: ['public trust doctrine', 'natural resources', 'Beas river', 'forest land', 'Kamal Nath', 'encroachment', 'environmental damage', 'Span Motels']
  },
  {
    caseName: 'Vellore Citizens Welfare Forum v. Union of India',
    citation: '(1996) 5 SCC 647',
    court: 'Supreme Court',
    year: 1996,
    judges: ['Kuldip Singh', 'Faizan Uddin'],
    summary: 'The Vellore Citizens Welfare Forum filed a PIL regarding the pollution caused by the discharge of untreated effluents by tanneries and other industries in the State of Tamil Nadu, particularly in the Palar river basin, contaminating drinking water sources.',
    legalPrinciple: 'The Precautionary Principle and the Polluter Pays Principle are part of the environmental law of India. Under the Precautionary Principle, the State must anticipate, prevent, and attack the causes of environmental degradation. Under the Polluter Pays Principle, the polluter is responsible for compensating victims and restoring the environmental damage caused by pollution.',
    verdict: 'The Supreme Court held that the Precautionary Principle and the Polluter Pays Principle are part of the environmental law of India. The court directed the establishment of an authority under the Environment (Protection) Act to deal with the situation. The tanneries were ordered to set up effluent treatment plants and compensate affected villagers.',
    significance: 'Formally incorporated the Precautionary Principle and Polluter Pays Principle into Indian environmental law. These principles became the twin pillars of environmental jurisprudence in India and are now applied in virtually all environmental cases.',
    relatedSections: ['Article 21', 'Article 48A', 'Article 51A(g)', 'Article 47'],
    relatedActs: ['Constitution of India', 'Environment (Protection) Act, 1986', 'Water (Prevention and Control of Pollution) Act, 1974'],
    category: 'Environmental',
    keywords: ['precautionary principle', 'polluter pays', 'tanneries', 'Vellore', 'water pollution', 'Palar river', 'effluent treatment', 'environmental law']
  },
  {
    caseName: 'Rural Litigation and Entitlement Kendra v. State of Uttar Pradesh',
    citation: 'AIR 1985 SC 652',
    court: 'Supreme Court',
    year: 1985,
    judges: ['P.N. Bhagwati', 'A.N. Sen'],
    summary: 'Known as the Dehradun Quarrying Case, the PIL was filed challenging the rampant and unscientific limestone quarrying in the Mussoorie-Dehradun region of the Himalayas, which was causing severe ecological damage including deforestation, soil erosion, drying up of springs, and landslides.',
    legalPrinciple: 'The right to a healthy environment is part of the right to life under Article 21. Ecological balance and environmental protection must be given priority over economic interests. Mining and quarrying activities that cause irreparable damage to the environment must be stopped even at the cost of economic loss.',
    verdict: 'The Supreme Court ordered the closure of limestone quarries in the Dehradun-Mussoorie region that were causing ecological devastation. The court directed the government to ensure rehabilitation of the affected areas and constituted an expert committee to identify which quarries could continue with safeguards and which must be permanently closed.',
    significance: 'One of the earliest and most significant environmental PILs in India. Established that environmental protection takes precedence over economic gain. Pioneered the use of PIL as a tool for environmental protection and laid the groundwork for environmental jurisprudence in India.',
    relatedSections: ['Article 21', 'Article 48A', 'Article 51A(g)'],
    relatedActs: ['Constitution of India', 'Mines and Minerals (Development and Regulation) Act, 1957', 'Forest (Conservation) Act, 1980'],
    category: 'Environmental',
    keywords: ['Dehradun quarrying', 'limestone mining', 'Mussoorie', 'ecological balance', 'Himalayas', 'deforestation', 'PIL', 'environmental protection']
  },
  {
    caseName: 'Indian Council for Enviro-Legal Action v. Union of India',
    citation: '(1996) 3 SCC 212',
    court: 'Supreme Court',
    year: 1996,
    judges: ['B.P. Jeevan Reddy', 'B.N. Kirpal'],
    summary: 'A PIL was filed regarding the severe environmental degradation caused by chemical industries in Bichhri village, Udaipur district, Rajasthan. Several chemical plants had been discharging highly toxic untreated effluents (including sludge containing toxic heavy metals like lead, zinc, and iron) into the surrounding areas, contaminating soil, groundwater, and rendering agricultural land barren.',
    legalPrinciple: 'Industries engaged in hazardous activities owe an absolute duty to the community to prevent environmental damage. The Polluter Pays Principle requires the polluting industry to bear the cost of remediation and compensation. The principle of absolute liability applies to hazardous waste management. The State has a duty to enforce environmental laws and cannot be a silent spectator to environmental destruction.',
    verdict: 'The Supreme Court held the chemical industries absolutely liable for the damage caused to the environment and directed them to compensate the affected villagers and bear the cost of remedying the environmental damage. The court directed the closure of defaulting industries and ordered the government to recover the cost of environmental restoration from them.',
    significance: 'Major judgment on hazardous waste management and industrial pollution. Applied the Polluter Pays Principle in its full force. Led to stricter enforcement of hazardous waste management rules. Highlighted the failure of government agencies in enforcing environmental laws.',
    relatedSections: ['Article 21', 'Article 48A', 'Article 51A(g)'],
    relatedActs: ['Constitution of India', 'Environment (Protection) Act, 1986', 'Hazardous Wastes (Management and Handling) Rules, 1989', 'Water (Prevention and Control of Pollution) Act, 1974'],
    category: 'Environmental',
    keywords: ['hazardous waste', 'Bichhri village', 'chemical industry', 'polluter pays', 'toxic effluent', 'soil contamination', 'groundwater pollution', 'absolute liability']
  },
  {
    caseName: 'T.N. Godavarman Thirumulpad v. Union of India',
    citation: '(1997) 2 SCC 267',
    court: 'Supreme Court',
    year: 1997,
    judges: ['J.S. Verma', 'B.N. Kirpal'],
    summary: 'The case began as a narrow challenge to timber felling in the Nilgiri Hills but evolved into one of the most far-reaching continuing mandamus orders in Indian judicial history, concerning forest conservation across the entire country.',
    legalPrinciple: 'The word "forest" in the Forest (Conservation) Act, 1980, must be understood in its dictionary meaning, irrespective of how it is classified in government records. No non-forest activity can be undertaken in any area recorded as forest without prior approval of the Central Government under the Forest (Conservation) Act. All ongoing activities violating the Act must immediately cease.',
    verdict: 'The Supreme Court expanded the definition of "forest" to include all areas recorded as forest irrespective of their ownership or classification. It imposed a nationwide ban on felling of trees in all forests and a complete prohibition on the movement of cut trees and timber from any of the seven north-eastern states. The case continued for decades with numerous interim orders regulating forest governance.',
    significance: 'Most significant forest conservation case in India. The court effectively assumed the role of a continuing environmental regulator. Led to the constitution of the Central Empowered Committee (CEC) to monitor forest-related issues. Transformed forest governance across the entire country.',
    relatedSections: ['Article 21', 'Article 48A', 'Article 51A(g)', 'Section 2 Forest (Conservation) Act'],
    relatedActs: ['Forest (Conservation) Act, 1980', 'Indian Forest Act, 1927', 'Constitution of India', 'Environment (Protection) Act, 1986'],
    category: 'Environmental',
    keywords: ['forest conservation', 'Godavarman', 'Nilgiri Hills', 'timber felling', 'forest definition', 'continuing mandamus', 'CEC', 'deforestation']
  },
  {
    caseName: 'Sterlite Industries (India) Ltd. v. Union of India',
    citation: '(2013) 4 SCC 575',
    court: 'Supreme Court',
    year: 2013,
    judges: ['A.K. Patnaik', 'F.M. Ibrahim Kalifulla'],
    summary: 'Sterlite Industries (now Vedanta Limited) operated a copper smelting plant in Tuticorin, Tamil Nadu. The Tamil Nadu Pollution Control Board (TNPCB) had ordered the closure of the plant due to violations of environmental norms and pollution causing health hazards to surrounding residents. Sterlite challenged the closure.',
    legalPrinciple: 'Industries causing environmental pollution affecting the health and well-being of surrounding populations must comply strictly with pollution control norms. Renewal of environmental clearances is subject to compliance with existing conditions. The Polluter Pays Principle applies, and polluting industries must compensate affected communities.',
    verdict: 'The Supreme Court allowed Sterlite to resume operations subject to strict compliance with pollution control conditions, but imposed a fine of Rs. 100 crores for pollution caused, to be deposited within three months for environmental remediation. The court directed enhanced monitoring and compliance reporting mechanisms.',
    significance: 'Demonstrated judicial approach to balancing industrial development with environmental protection. The Tuticorin plant remained a continuing controversy, eventually being permanently closed by the Tamil Nadu government in 2018 after police firing on protestors. Highlighted the limitations of judicial remedies in environmental disputes involving large corporations.',
    relatedSections: ['Article 21', 'Article 48A', 'Section 5 Environment (Protection) Act'],
    relatedActs: ['Environment (Protection) Act, 1986', 'Air (Prevention and Control of Pollution) Act, 1981', 'Water (Prevention and Control of Pollution) Act, 1974'],
    category: 'Environmental',
    keywords: ['Sterlite', 'copper smelting', 'Tuticorin', 'industrial pollution', 'TNPCB', 'Vedanta', 'pollution control', 'environmental clearance']
  },
  {
    caseName: 'Alembic Pharmaceuticals Ltd. v. Rohit Prajapati',
    citation: '(2020) 17 SCC 157',
    court: 'Supreme Court',
    year: 2020,
    judges: ['D.Y. Chandrachud', 'Ajay Rastogi'],
    summary: 'Alembic Pharmaceuticals had commenced construction and operations at its facility in Vadodara, Gujarat, based on an environmental clearance (EC) granted by the State Environment Impact Assessment Authority. The EC was later challenged on the ground that the company had commenced construction before obtaining the mandatory environmental clearance.',
    legalPrinciple: 'Ex post facto (after the fact) environmental clearances are contrary to the fundamental principles of environmental law. Granting environmental clearance after the project has commenced or been completed defeats the very purpose of the Environmental Impact Assessment (EIA) process. The environment must be protected through prior assessment, not retrospective validation.',
    verdict: 'The Supreme Court held that the concept of ex post facto environmental clearance is in derogation of the fundamental principles of environmental jurisprudence. The court held that granting clearance after the project has been started or completed is detrimental to the environment and defeats the purpose of EIA notifications.',
    significance: 'Put an end to the practice of granting retrospective environmental clearances, which had become a widespread loophole. Reinforced the mandatory nature of prior environmental assessment and the importance of the precautionary principle. Strengthened the EIA framework by closing a significant regulatory gap.',
    relatedSections: ['Article 21', 'Article 48A', 'Article 51A(g)'],
    relatedActs: ['Environment (Protection) Act, 1986', 'EIA Notification, 2006'],
    category: 'Environmental',
    keywords: ['ex post facto clearance', 'EIA', 'environmental clearance', 'Alembic Pharmaceuticals', 'Vadodara', 'prior assessment', 'precautionary principle', 'retrospective approval']
  },

  // ═══════════════════════════════════════════════
  // CONSUMER LAW (9)
  // ═══════════════════════════════════════════════
  {
    caseName: 'Lucknow Development Authority v. M.K. Gupta',
    citation: '(1994) 1 SCC 243',
    court: 'Supreme Court',
    year: 1994,
    judges: ['R.M. Sahai'],
    summary: 'The Lucknow Development Authority (LDA) had allotted houses/flats to consumers but failed to construct and deliver them within the stipulated time. The consumers filed complaints under the Consumer Protection Act. LDA contended that being a statutory body performing governmental functions, it was not amenable to consumer jurisdiction.',
    legalPrinciple: 'Housing construction by development authorities and statutory bodies constitutes "service" under the Consumer Protection Act. Government bodies and statutory authorities providing services to consumers are amenable to consumer protection jurisdiction. The Consumer Protection Act is a beneficial legislation that must be broadly interpreted to protect consumer interests.',
    verdict: 'The Supreme Court held that housing construction activity by development authorities is a "service" under the Consumer Protection Act and that statutory bodies are liable for deficiency in service. The court directed the LDA to compensate consumers for delayed delivery and deficiencies in construction quality.',
    significance: 'Brought government bodies, statutory authorities, and public sector undertakings within the ambit of the Consumer Protection Act. Ensured that government agencies cannot escape accountability for deficiency in service by claiming sovereign immunity. Strengthened consumer rights against government service providers.',
    relatedSections: ['Section 2(1)(o) Consumer Protection Act', 'Section 2(1)(g) Consumer Protection Act'],
    relatedActs: ['Consumer Protection Act, 1986', 'Consumer Protection Act, 2019'],
    category: 'Consumer',
    keywords: ['government service provider', 'statutory authority', 'housing construction', 'deficiency in service', 'development authority', 'consumer complaint', 'LDA']
  },
  {
    caseName: 'Indian Medical Association v. V.P. Shantha',
    citation: '(1995) 6 SCC 651',
    court: 'Supreme Court',
    year: 1995,
    judges: ['S.C. Agrawal', 'A.S. Anand', 'M.M. Punchhi'],
    summary: 'The Indian Medical Association challenged a decision bringing the medical profession within the ambit of the Consumer Protection Act, 1986. The key question was whether medical services rendered by hospitals and doctors constitute "service" under the Act.',
    legalPrinciple: 'Medical services rendered by hospitals and doctors are "service" within the meaning of Section 2(1)(o) of the Consumer Protection Act, 1986. Medical professionals who render service for consideration (whether directly or indirectly through insurance) fall within the Act. Only free treatment in government hospitals where no charges are levied is excluded.',
    verdict: 'The Supreme Court held that medical practitioners and hospitals providing treatment for payment are covered under the Consumer Protection Act. The court drew a distinction between free services at government hospitals (excluded) and services rendered for consideration (included). Services rendered by private hospitals, nursing homes, and doctors charging fees were held to be within the Act.',
    significance: 'Brought the entire medical profession (except free government services) under the Consumer Protection Act. Empowered patients to seek redressal for medical negligence through consumer forums. Transformed healthcare accountability in India and led to greater emphasis on medical standards.',
    relatedSections: ['Section 2(1)(o) Consumer Protection Act', 'Section 2(1)(d) Consumer Protection Act'],
    relatedActs: ['Consumer Protection Act, 1986', 'Consumer Protection Act, 2019', 'Indian Medical Council Act, 1956'],
    category: 'Consumer',
    keywords: ['medical negligence', 'medical profession', 'consumer service', 'hospital liability', 'doctor patient', 'V.P. Shantha', 'healthcare']
  },
  {
    caseName: 'Spring Meadows Hospital v. Harjol Ahluwalia',
    citation: '(1998) 4 SCC 39',
    court: 'Supreme Court',
    year: 1998,
    judges: ['M.M. Punchhi', 'K.T. Thomas'],
    summary: 'A child was admitted to Spring Meadows Hospital for a minor surgery. Due to the negligence of the anaesthetist and nursing staff, the child suffered a cardiac arrest during the procedure and went into a vegetative state with irreversible brain damage. The parents filed a consumer complaint for medical negligence.',
    legalPrinciple: 'A hospital is vicariously liable for the negligence of its staff, including doctors, anaesthetists, and nurses. The employer-hospital cannot escape liability by claiming that the negligent doctor was an independent contractor. The patient enters into a contract with the hospital and is entitled to proper care from the institution.',
    verdict: 'The Supreme Court held Spring Meadows Hospital vicariously liable for the negligence of its anaesthetist. The court upheld the award of Rs. 12.5 lakhs as compensation to the parents. The court emphasized that hospitals employing medical professionals are responsible for the quality of care provided by their staff to patients.',
    significance: 'Established the principle of vicarious liability of hospitals for negligence of their medical staff. Clarified that hospitals cannot absolve themselves of responsibility by claiming doctors are independent professionals. Strengthened accountability in institutional healthcare.',
    relatedSections: ['Section 2(1)(g) Consumer Protection Act', 'Section 2(1)(o) Consumer Protection Act'],
    relatedActs: ['Consumer Protection Act, 1986', 'Consumer Protection Act, 2019'],
    category: 'Consumer',
    keywords: ['vicarious liability', 'hospital negligence', 'medical negligence', 'anaesthesia', 'brain damage', 'compensation', 'employer liability', 'patient rights']
  },
  {
    caseName: 'Nizam\'s Institute of Medical Sciences v. Prasad Rao',
    citation: '(2009) 6 SCC 1',
    court: 'Supreme Court',
    year: 2009,
    judges: ['B.N. Agrawal', 'G.S. Singhvi'],
    summary: 'A patient underwent surgery at NIMS, Hyderabad, for removal of a swelling in the neck. During the surgery, the surgeon\'s negligence allegedly caused damage to the spinal accessory nerve, leading to partial disability. The patient claimed compensation for medical negligence.',
    legalPrinciple: 'Medical negligence must be judged by the standard of a reasonable medical professional possessing the ordinary skill expected in that field (Bolam test). A doctor is not negligent simply because something goes wrong or because a different professional might have adopted a different approach. To establish medical negligence, the complainant must prove: (1) the doctor owed a duty of care, (2) the doctor breached that duty, and (3) the breach caused damage.',
    verdict: 'The Supreme Court reiterated the Bolam test for medical negligence and held that a medical professional is expected to exercise the standard of care that a reasonably competent professional in the same field would exercise. The court held that not every adverse medical outcome constitutes negligence; there must be a clear failure to exercise reasonable care.',
    significance: 'Clarified the standard of care applicable in medical negligence cases in India by adopting the Bolam test. Balanced patient rights with the need to protect doctors from frivolous litigation. Provided a comprehensive framework for adjudicating medical negligence claims in consumer forums.',
    relatedSections: ['Section 2(1)(g) Consumer Protection Act', 'Section 2(1)(o) Consumer Protection Act'],
    relatedActs: ['Consumer Protection Act, 1986', 'Consumer Protection Act, 2019', 'Indian Medical Council Act, 1956'],
    category: 'Consumer',
    keywords: ['medical negligence', 'standard of care', 'Bolam test', 'NIMS', 'surgical negligence', 'duty of care', 'reasonable doctor', 'Hyderabad']
  },
  {
    caseName: 'Morgan Stanley Mutual Fund v. Kartick Das',
    citation: '(1994) 4 SCC 225',
    court: 'Supreme Court',
    year: 1994,
    judges: ['K. Ramaswamy', 'B.L. Hansaria'],
    summary: 'Investors in Morgan Stanley Mutual Fund filed a consumer complaint alleging deficiency in service by the mutual fund. The key issue was whether the investment services offered by mutual funds constitute "service" under the Consumer Protection Act, 1986, and whether investors are "consumers" under the Act.',
    legalPrinciple: 'Investment services provided by mutual funds constitute "service" under the Consumer Protection Act. Investors who subscribe to mutual fund schemes are "consumers" and are entitled to protection under the Act. The mutual fund has an obligation to manage the fund with due diligence and in the best interest of the investors.',
    verdict: 'The Supreme Court held that mutual fund services fall within the definition of "service" under the Consumer Protection Act and that investors are consumers entitled to seek redressal for deficiency in service. The court emphasized that financial service providers owe a fiduciary duty to their investors.',
    significance: 'Extended consumer protection to the financial services sector, covering mutual funds and investment products. Empowered retail investors with access to consumer forums for grievance redressal against financial service providers. Established that financial services carry a fiduciary obligation to consumers.',
    relatedSections: ['Section 2(1)(o) Consumer Protection Act', 'Section 2(1)(d) Consumer Protection Act'],
    relatedActs: ['Consumer Protection Act, 1986', 'Securities and Exchange Board of India Act, 1992', 'Consumer Protection Act, 2019'],
    category: 'Consumer',
    keywords: ['mutual fund', 'investor protection', 'financial services', 'deficiency in service', 'fiduciary duty', 'consumer rights', 'Morgan Stanley']
  },
  {
    caseName: 'Charan Singh v. Healing Touch Hospital',
    citation: '(2000) 7 SCC 668',
    court: 'Supreme Court',
    year: 2000,
    judges: ['D.P. Wadhwa', 'Ruma Pal'],
    summary: 'The patient was admitted to Healing Touch Hospital for treatment. Due to alleged medical negligence in treatment, the patient suffered complications leading to prolonged suffering and disability. A consumer complaint was filed seeking compensation.',
    legalPrinciple: 'Hospitals and medical professionals are bound to exercise reasonable care and skill in the treatment of patients. Failure to exercise such care resulting in harm constitutes deficiency in service under the Consumer Protection Act. The quantum of compensation must be proportionate to the suffering, loss of income, and disability suffered by the patient.',
    verdict: 'The Supreme Court upheld the finding of medical negligence against the hospital and directed payment of compensation to the patient. The court reiterated that medical professionals must maintain the standard of care expected of a competent practitioner and that failure to do so constitutes actionable negligence.',
    significance: 'Reinforced the accountability of hospitals and medical professionals under the Consumer Protection Act. Established guidelines for determining the quantum of compensation in medical negligence cases, considering factors such as age, earning capacity, extent of disability, and suffering.',
    relatedSections: ['Section 2(1)(g) Consumer Protection Act', 'Section 14 Consumer Protection Act'],
    relatedActs: ['Consumer Protection Act, 1986', 'Consumer Protection Act, 2019'],
    category: 'Consumer',
    keywords: ['medical negligence', 'hospital liability', 'compensation', 'deficiency in service', 'standard of care', 'patient rights', 'healthcare accountability']
  },
  {
    caseName: 'IRDA v. United India Insurance Co. Ltd.',
    citation: '(2007) 5 SCC 93',
    court: 'Supreme Court',
    year: 2007,
    judges: ['S.B. Sinha', 'Markandey Katju'],
    summary: 'The case involved a dispute regarding insurance claim settlement and the role of the Insurance Regulatory and Development Authority (IRDA) in regulating insurance services. The question was whether insurance services fall under consumer jurisdiction and the extent of IRDA\'s regulatory authority.',
    legalPrinciple: 'Insurance services constitute "service" under the Consumer Protection Act and policyholders are "consumers." Rejection of a genuine insurance claim without valid reason constitutes deficiency in service. The existence of a regulatory body (IRDA) does not bar consumer forums from entertaining complaints against insurance companies.',
    verdict: 'The Supreme Court held that insurance companies providing insurance coverage are rendering "service" under the Consumer Protection Act. The existence of IRDA as a regulatory authority does not oust the jurisdiction of consumer forums. Policyholders are entitled to seek redressal before consumer forums for unfair denial or delay in settlement of insurance claims.',
    significance: 'Confirmed that regulatory oversight does not exclude consumer protection jurisdiction. Empowered millions of insurance policyholders to approach consumer forums for claim disputes. Strengthened consumer rights in the insurance sector by establishing parallel remedies under consumer law.',
    relatedSections: ['Section 2(1)(o) Consumer Protection Act', 'Section 14 Consumer Protection Act'],
    relatedActs: ['Consumer Protection Act, 1986', 'Insurance Regulatory and Development Authority Act, 1999', 'Insurance Act, 1938', 'Consumer Protection Act, 2019'],
    category: 'Consumer',
    keywords: ['insurance claim', 'IRDA', 'policyholder rights', 'deficiency in service', 'insurance regulation', 'consumer jurisdiction', 'claim settlement']
  },
  {
    caseName: 'Ambrish Kumar Shukla v. Ferrous Infrastructure Pvt. Ltd.',
    citation: '(2017) 11 SCC 406',
    court: 'Supreme Court',
    year: 2017,
    judges: ['Dipak Misra', 'A.M. Khanwilkar'],
    summary: 'Homebuyers who had booked flats with Ferrous Infrastructure filed complaints under the Consumer Protection Act alleging deficiency in service due to inordinate delay in delivery of promised flats and failure to refund amounts despite non-delivery.',
    legalPrinciple: 'Homebuyers are consumers under the Consumer Protection Act and builders/developers who fail to deliver flats within the promised time frame are liable for deficiency in service. The builder must refund the amount with reasonable interest if unable to deliver possession within the stipulated period. Unfair trade practices by real estate developers are actionable under consumer law.',
    verdict: 'The Supreme Court held that the builder\'s failure to deliver possession of flats within the agreed time frame constituted deficiency in service and unfair trade practice. The court directed refund of amounts deposited by homebuyers with interest and compensation for mental agony and harassment caused by the delay.',
    significance: 'Strengthened the rights of homebuyers against real estate developers. Affirmed that real estate transactions fall within the scope of the Consumer Protection Act. Preceded and complemented the Real Estate (Regulation and Development) Act, 2016 (RERA) in protecting homebuyers.',
    relatedSections: ['Section 2(1)(g) Consumer Protection Act', 'Section 2(1)(r) Consumer Protection Act'],
    relatedActs: ['Consumer Protection Act, 1986', 'Consumer Protection Act, 2019', 'Real Estate (Regulation and Development) Act, 2016'],
    category: 'Consumer',
    keywords: ['homebuyer', 'real estate', 'builder delay', 'flat delivery', 'deficiency in service', 'refund', 'unfair trade practice', 'RERA']
  },
  {
    caseName: 'Imperia Structures Ltd. v. Anil Patni',
    citation: '(2020) 10 SCC 783',
    court: 'Supreme Court',
    year: 2020,
    judges: ['U.U. Lalit', 'Vineet Saran'],
    summary: 'Homebuyers who had invested in a real estate project by Imperia Structures filed complaints regarding inordinate delays in delivery of apartments and deficiency in promised amenities. The builder argued that the remedy lay under RERA and not under the Consumer Protection Act.',
    legalPrinciple: 'The remedies available under the Consumer Protection Act and the Real Estate (Regulation and Development) Act, 2016 (RERA) are concurrent, not mutually exclusive. Homebuyers have the option to approach either the consumer forum or the RERA authority for redressal. The existence of RERA does not bar consumer forum jurisdiction over real estate complaints.',
    verdict: 'The Supreme Court held that remedies under the Consumer Protection Act and RERA are concurrent and that homebuyers have the liberty to choose their forum for redressal. The court upheld the consumer forum\'s jurisdiction to entertain complaints against real estate developers even after the enactment of RERA.',
    significance: 'Clarified the concurrent jurisdiction of consumer forums and RERA authorities, giving homebuyers the flexibility to choose their preferred forum. Prevented builders from using RERA as a shield to avoid consumer forum jurisdiction. Strengthened the multi-layered protection available to homebuyers.',
    relatedSections: ['Section 2(1)(g) Consumer Protection Act', 'Section 18 RERA', 'Section 71 RERA'],
    relatedActs: ['Consumer Protection Act, 2019', 'Real Estate (Regulation and Development) Act, 2016', 'Consumer Protection Act, 1986'],
    category: 'Consumer',
    keywords: ['RERA', 'consumer forum', 'concurrent jurisdiction', 'homebuyer rights', 'real estate delay', 'Imperia Structures', 'builder liability', 'concurrent remedies']
  }
];

async function seedVerdicts() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('[SEED] Connected to MongoDB');

    // Delete existing verdicts in these categories to prevent duplicates
    const categoriesToDelete = ['Human Rights', 'Labour', 'Environmental', 'Consumer'];
    const deleteResult = await CourtVerdict.deleteMany({ category: { $in: categoriesToDelete } });
    console.log('[SEED] Deleted ' + deleteResult.deletedCount + ' existing verdicts in categories: ' + categoriesToDelete.join(', '));

    // Insert new verdicts
    const inserted = await CourtVerdict.insertMany(verdicts);
    console.log('[SEED] Successfully inserted ' + inserted.length + ' verdicts');

    // Log breakdown by category
    const categoryCounts = {};
    verdicts.forEach(v => {
      categoryCounts[v.category] = (categoryCounts[v.category] || 0) + 1;
    });
    console.log('[SEED] Breakdown by category:');
    Object.entries(categoryCounts).forEach(([cat, count]) => {
      console.log('  - ' + cat + ': ' + count + ' verdicts');
    });

    await mongoose.disconnect();
    console.log('[SEED] Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('[SEED] Error seeding verdicts:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedVerdicts();
