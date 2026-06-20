require('dotenv').config();
const mongoose = require('mongoose');
const CourtVerdict = require('./models/CourtVerdict');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lawbook';

const verdicts = [
  {
    caseName: 'K.M. Nanavati v. State of Maharashtra', citation: '1962 AIR 605', court: 'Supreme Court', year: 1962,
    judges: ['Sinha CJ', 'Subba Rao J', 'Das Gupta J'],
    summary: 'Naval Commander Nanavati shot his wife\'s lover. The jury acquitted him but the Bombay HC referred the case to the Supreme Court.',
    legalPrinciple: 'Premeditation negates the defence of grave and sudden provocation. If there is a "cooling time" between the provocation and the act, it is murder, not culpable homicide.',
    verdict: 'Convicted Nanavati of murder under Section 302 IPC. Held that the time gap between learning of the affair and the killing showed premeditation.',
    significance: 'Last jury trial in India. Led to the abolition of the jury system. Landmark on the distinction between murder and culpable homicide.',
    relatedSections: ['Section 300 IPC', 'Section 302 IPC'], relatedActs: ['Indian Penal Code, 1860'], category: 'Criminal',
    keywords: ['murder', 'provocation', 'jury trial', 'premeditation', 'Nanavati']
  },
  {
    caseName: 'Bachan Singh v. State of Punjab', citation: '(1980) 2 SCC 684', court: 'Supreme Court', year: 1980,
    judges: ['Chandrachud CJ', 'Bhagwati J', 'Gupta J', 'Untwalia J', 'Sarkaria J'],
    summary: 'Constitutional validity of death penalty challenged as violating Articles 14, 19, and 21.',
    legalPrinciple: 'Death penalty is constitutional but should be imposed only in the "rarest of rare" cases. The court must consider both aggravating and mitigating circumstances. Life imprisonment is the rule; death is the exception.',
    verdict: 'By 4:1, upheld the constitutionality of the death penalty. Justice Bhagwati dissented, arguing death penalty violates Articles 14 and 21.',
    significance: 'Established the "rarest of rare" doctrine that governs death penalty sentencing in India to this day.',
    relatedSections: ['Section 302 IPC', 'Section 354(3) CrPC', 'Article 21'], relatedActs: ['Indian Penal Code, 1860', 'Constitution of India'], category: 'Criminal',
    keywords: ['death penalty', 'rarest of rare', 'capital punishment', 'Section 302', 'Bachan Singh']
  },
  {
    caseName: 'Machhi Singh v. State of Punjab', citation: '(1983) 3 SCC 470', court: 'Supreme Court', year: 1983,
    judges: ['Thakkar J', 'M.P. Thakkar J'],
    summary: 'Mass murder case where the accused killed 17 members of a family across three villages.',
    legalPrinciple: 'Laid down 5 categories where death penalty may be warranted: (1) manner of murder (extremely brutal), (2) motive (totally depraved), (3) anti-social nature (SC/ST victim, child), (4) magnitude (multiple murders), (5) personality of victim (helpless person).',
    verdict: 'Confirmed death sentence. Expanded on the Bachan Singh framework with specific categories for applying the rarest of rare test.',
    significance: 'Provided a practical framework for applying the "rarest of rare" doctrine by categorizing when death penalty is appropriate.',
    relatedSections: ['Section 302 IPC'], relatedActs: ['Indian Penal Code, 1860'], category: 'Criminal',
    keywords: ['death penalty', 'rarest of rare', 'categories', 'mass murder', 'Machhi Singh']
  },
  {
    caseName: 'Hussainara Khatoon v. Home Secretary, State of Bihar', citation: 'AIR 1979 SC 1360', court: 'Supreme Court', year: 1979,
    judges: ['Bhagwati J', 'Koshal J'],
    summary: 'PIL revealing that thousands of undertrial prisoners in Bihar had been in jail longer than the maximum sentence for their alleged offences.',
    legalPrinciple: 'Right to speedy trial is a fundamental right under Article 21. No person should remain in jail as an undertrial for longer than the maximum sentence for the offence.',
    verdict: 'Directed release of undertrial prisoners who had served beyond the maximum sentence. Established that speedy trial is part of Article 21.',
    significance: 'Led to major prison reforms and the introduction of Section 436A CrPC (mandatory bail after serving half the maximum sentence).',
    relatedSections: ['Article 21', 'Section 436A CrPC'], relatedActs: ['Constitution of India', 'Code of Criminal Procedure, 1973'], category: 'Criminal',
    keywords: ['speedy trial', 'undertrial', 'bail', 'prison reform', 'Article 21', 'Hussainara']
  },
  {
    caseName: 'D.K. Basu v. State of West Bengal', citation: 'AIR 1997 SC 610', court: 'Supreme Court', year: 1997,
    judges: ['Anand CJ', 'Kuldip Singh J'],
    summary: 'PIL regarding custodial deaths and torture in police custody.',
    legalPrinciple: 'Custodial torture is a violation of Article 21. The Court laid down 11 mandatory guidelines for arrest and detention to prevent custodial violence.',
    verdict: 'Laid down 11 requirements for every arrest: (1) police must wear name tags, (2) memo of arrest with witness, (3) right to inform relative, (4) entry in diary at place of detention, (5) medical examination every 48 hours, (6) copies of documents to magistrate, etc.',
    significance: 'The D.K. Basu guidelines are binding on all police forces across India and are a fundamental safeguard against custodial torture.',
    relatedSections: ['Article 21', 'Article 22', 'Section 41 CrPC'], relatedActs: ['Constitution of India', 'Code of Criminal Procedure, 1973'], category: 'Criminal',
    keywords: ['custodial death', 'arrest guidelines', 'D.K. Basu', 'police', 'torture', 'Article 21']
  },
  {
    caseName: 'Lalita Kumari v. Government of UP', citation: '(2014) 2 SCC 1', court: 'Supreme Court', year: 2014,
    judges: ['Sathasivam CJ', 'Ranjana Prakash Desai J', 'Ranjan Gogoi J', 'S.A. Bobde J', 'N.V. Ramana J'],
    summary: 'Whether police are bound to register an FIR on receiving information about a cognizable offence.',
    legalPrinciple: 'Registration of FIR under Section 154 CrPC is mandatory if the information discloses commission of a cognizable offence. The police have no discretion to conduct a preliminary inquiry before registering the FIR for cognizable offences.',
    verdict: 'Police must mandatorily register FIR upon receiving information of a cognizable offence. Preliminary inquiry is permitted only in certain exceptional cases (matrimonial disputes, commercial offences, medical negligence, corruption, cases with abnormal delay).',
    significance: 'Settled the long-standing debate on mandatory FIR registration. Prevents police from refusing to file FIRs.',
    relatedSections: ['Section 154 CrPC', 'Section 155 CrPC'], relatedActs: ['Code of Criminal Procedure, 1973'], category: 'Criminal',
    keywords: ['FIR', 'mandatory registration', 'cognizable offence', 'police', 'Lalita Kumari', 'Section 154']
  },
  {
    caseName: 'Arnesh Kumar v. State of Bihar', citation: '(2014) 8 SCC 273', court: 'Supreme Court', year: 2014,
    judges: ['Chandramauli Kumar Prasad J', 'Pinaki Chandra Ghose J'],
    summary: 'Misuse of Section 498A IPC (cruelty by husband) for automatic arrests.',
    legalPrinciple: 'Arrest should not be automatic in cases under Section 498A IPC or Section 4 of the Dowry Prohibition Act. Police must satisfy themselves about the necessity of arrest under the parameters of Section 41 CrPC.',
    verdict: 'Directed that police must follow Section 41(1)(b)(ii) CrPC checklist before arresting anyone under Section 498A. Magistrates must also check if the checklist was followed before authorizing detention.',
    significance: 'Reduced mechanical arrests in matrimonial cases. Mandatory compliance with Section 41 CrPC checklist before arrest in 498A cases.',
    relatedSections: ['Section 498A IPC', 'Section 41 CrPC', 'Section 4 Dowry Prohibition Act'], relatedActs: ['Indian Penal Code, 1860', 'Code of Criminal Procedure, 1973', 'Dowry Prohibition Act, 1961'], category: 'Criminal',
    keywords: ['498A', 'arrest', 'dowry', 'misuse', 'Arnesh Kumar', 'matrimonial']
  },
  {
    caseName: 'Shreya Singhal v. Union of India', citation: '(2015) 5 SCC 1', court: 'Supreme Court', year: 2015,
    judges: ['Chelameswar J', 'Nariman J'],
    summary: 'Challenge to Section 66A of the IT Act which criminalized sending offensive messages through communication services.',
    legalPrinciple: 'Section 66A is unconstitutional as it violates Article 19(1)(a) (freedom of speech). The terms "annoying," "inconvenient," "grossly offensive" are vague and overbroad.',
    verdict: 'Struck down Section 66A of the IT Act as unconstitutional. Upheld Section 69A (government blocking power) with procedural safeguards. Read down Section 79 (intermediary liability).',
    significance: 'Landmark for free speech on the internet. Section 66A was being widely misused to arrest people for social media posts.',
    relatedSections: ['Section 66A IT Act', 'Section 69A IT Act', 'Article 19(1)(a)'], relatedActs: ['Information Technology Act, 2000', 'Constitution of India'], category: 'Criminal',
    keywords: ['Section 66A', 'free speech', 'internet', 'IT Act', 'unconstitutional', 'social media']
  },
  {
    caseName: 'Mukesh v. State (NCT of Delhi) (Nirbhaya Case)', citation: '(2017) 6 SCC 1', court: 'Supreme Court', year: 2017,
    judges: ['Dipak Misra J', 'Khanna J', 'R. Banumathi J'],
    summary: 'Gang rape and murder of a 23-year-old paramedical student on a moving bus in Delhi on 16.12.2012.',
    legalPrinciple: 'Gang rape with extreme brutality leading to death falls within the rarest of rare category warranting death penalty. The brutality and depravity of the act are key aggravating factors.',
    verdict: 'Confirmed death sentence for all four convicts. Held that the case falls squarely within the rarest of rare category given the extreme brutality, the defenceless victim, and the premeditated nature.',
    significance: 'Led to the Criminal Law (Amendment) Act, 2013 which strengthened rape laws — new offences (acid attack, stalking, voyeurism), increased penalties, and death penalty for rape causing death.',
    relatedSections: ['Section 302 IPC', 'Section 376 IPC', 'Section 376D IPC'], relatedActs: ['Indian Penal Code, 1860', 'Criminal Law (Amendment) Act, 2013'], category: 'Criminal',
    keywords: ['Nirbhaya', 'gang rape', 'death penalty', 'rape law reform', 'criminal amendment']
  },
  {
    caseName: 'Kehar Singh v. Union of India', citation: '(1989) 1 SCC 204', court: 'Supreme Court', year: 1989,
    judges: ['Pathak CJ', 'Oza J', 'Dutt J', 'Sharma J', 'Shetty J'],
    summary: 'Kehar Singh was convicted for conspiracy in the assassination of PM Indira Gandhi. Sought clemency under Article 72.',
    legalPrinciple: 'The President\'s power to grant pardon under Article 72 is absolute and cannot be fettered by the judiciary. However, it must be exercised on the advice of the Council of Ministers.',
    verdict: 'Upheld the death sentence. Clarified that the President\'s pardon power under Article 72 is wide enough to re-examine the entire case but must be exercised on ministerial advice.',
    significance: 'Settled the scope of presidential pardon power. Later expanded in Shatrughan Chauhan (2014) regarding delay in execution.',
    relatedSections: ['Article 72', 'Section 302 IPC'], relatedActs: ['Constitution of India', 'Indian Penal Code, 1860'], category: 'Criminal',
    keywords: ['presidential pardon', 'Article 72', 'death penalty', 'clemency', 'assassination']
  },
  {
    caseName: 'Gian Kaur v. State of Punjab', citation: '(1996) 2 SCC 648', court: 'Supreme Court', year: 1996,
    judges: ['Verma J', 'Hansaria J', 'Faizan Uddin J', 'G.B. Pattanaik J', 'G.T. Nanavati J'],
    summary: 'Challenge to the constitutionality of Section 309 IPC (attempt to suicide) and Section 306 IPC (abetment to suicide).',
    legalPrinciple: 'Right to life under Article 21 does not include the right to die. Section 309 IPC is constitutionally valid. Overruled P. Rathinam v. Union of India (1994).',
    verdict: 'Upheld Section 309 IPC as constitutional. The right to life is a natural right, and its extinguishment is not included in the right to live with dignity.',
    significance: 'However, Section 309 was later effectively decriminalized by the Mental Healthcare Act, 2017 (Section 115) which presumes attempted suicide as stress and denies prosecution.',
    relatedSections: ['Section 309 IPC', 'Section 306 IPC', 'Article 21'], relatedActs: ['Indian Penal Code, 1860', 'Constitution of India'], category: 'Criminal',
    keywords: ['attempt to suicide', 'right to die', 'Section 309', 'abetment', 'Article 21']
  },
  {
    caseName: 'Prakash Kumar v. State of Gujarat (Best Bakery Case)', citation: '(2004) 2 SCC 713', court: 'Supreme Court', year: 2004,
    judges: ['Variava J', 'Dharmadhikari J'],
    summary: 'Witness Zahira Sheikh turned hostile in the Best Bakery massacre case (2002 Gujarat riots). Trial court acquitted all accused.',
    legalPrinciple: 'Fair trial includes the right of the victim to a fair investigation and prosecution. When witnesses turn hostile due to threats, the case can be transferred to another state for retrial.',
    verdict: 'Ordered retrial of the Best Bakery case in Mumbai instead of Gujarat. Directed witness protection. Held that hostile witnesses undermine fair trial.',
    significance: 'Led to strengthening of witness protection programs and the Witness Protection Scheme, 2018.',
    relatedSections: ['Section 406 CrPC', 'Article 21'], relatedActs: ['Code of Criminal Procedure, 1973', 'Constitution of India'], category: 'Criminal',
    keywords: ['hostile witness', 'fair trial', 'transfer', 'riots', 'witness protection', 'retrial']
  },
  {
    caseName: 'Shatrughan Chauhan v. Union of India', citation: '(2014) 3 SCC 1', court: 'Supreme Court', year: 2014,
    judges: ['Sathasivam CJ', 'Ranjana Desai J', 'Shiva Kirti Singh J'],
    summary: 'Death row prisoners challenged the long delay in disposal of their mercy petitions by the President.',
    legalPrinciple: 'Inordinate delay in disposing mercy petitions is a ground for commutation of death sentence to life imprisonment. Mental illness and solitary confinement are also supervening circumstances for commutation.',
    verdict: 'Commuted death sentences of 15 prisoners due to inordinate delay (some waited 8-12 years for mercy petition disposal). Held that prolonged delay causes additional suffering beyond the sentence.',
    significance: 'Major precedent on death penalty procedure. Delays in mercy petition disposal now ground for commutation.',
    relatedSections: ['Article 72', 'Article 21'], relatedActs: ['Constitution of India'], category: 'Criminal',
    keywords: ['mercy petition', 'delay', 'death penalty', 'commutation', 'Article 72', 'mental illness']
  },
  {
    caseName: 'Sher Singh v. State of Punjab', citation: '(1983) 2 SCC 344', court: 'Supreme Court', year: 1983,
    judges: ['Chandrachud CJ', 'Desai J', 'Bhagwati J'],
    summary: 'Death row convicts challenged the prolonged delay in execution of their death sentences.',
    legalPrinciple: 'Prolonged delay in execution of a death sentence is by itself a sufficient ground for commuting it to life imprisonment. Such delay constitutes torture.',
    verdict: 'Commuted the death sentences to life imprisonment due to the prolonged delay in carrying out the execution.',
    significance: 'Established that undue delay in executing death sentence entitles the convict to commutation.',
    relatedSections: ['Article 21', 'Section 302 IPC'], relatedActs: ['Constitution of India', 'Indian Penal Code, 1860'], category: 'Criminal',
    keywords: ['death penalty', 'delay', 'commutation', 'execution', 'torture']
  },
  {
    caseName: 'Mohd. Ajmal Kasab v. State of Maharashtra', citation: '(2012) 9 SCC 1', court: 'Supreme Court', year: 2012,
    judges: ['Alam J', 'Thakker J'],
    summary: 'The lone surviving terrorist of the 26/11 Mumbai attacks (2008) challenged his conviction and death sentence.',
    legalPrinciple: 'The right to free legal aid under Article 21 applies even to foreign nationals accused of terrorism. Confessions to police are inadmissible but confessions to magistrate are admissible.',
    verdict: 'Confirmed the conviction and death sentence. The case was proved beyond reasonable doubt through CCTV footage, witness testimony, and forensic evidence.',
    significance: 'Confirmed applicability of fundamental rights to foreign accused. Kasab was executed on 21.11.2012.',
    relatedSections: ['Section 302 IPC', 'Section 120B IPC', 'UAPA'], relatedActs: ['Indian Penal Code, 1860', 'UAPA, 1967'], category: 'Criminal',
    keywords: ['26/11', 'Mumbai attacks', 'terrorism', 'death penalty', 'Kasab', 'UAPA']
  },
  {
    caseName: 'Yakub Abdul Razak Memon v. State of Maharashtra', citation: '(2013) 13 SCC 1', court: 'Supreme Court', year: 2013,
    judges: ['Sathasivam CJ', 'Ibrahim Kalifulla J', 'Ranjana Desai J'],
    summary: 'Conviction for the 1993 Bombay serial blasts that killed 257 people and injured 713.',
    legalPrinciple: 'Financing and organizing terrorist acts constitutes criminal conspiracy under Section 120B IPC. Knowledge and participation in the conspiracy chain is sufficient for conviction.',
    verdict: 'Confirmed conviction under TADA and death sentence for Yakub Memon who was found to have financed and organized the blasts. Other co-conspirators received life sentences.',
    significance: 'One of the longest terrorism trials in Indian history. Yakub Memon was executed on 30.7.2015.',
    relatedSections: ['Section 120B IPC', 'Section 302 IPC', 'TADA'], relatedActs: ['Indian Penal Code, 1860', 'TADA'], category: 'Criminal',
    keywords: ['1993 blasts', 'Bombay', 'terrorism', 'conspiracy', 'TADA', 'death penalty']
  },
  {
    caseName: 'Prakash v. State of Karnataka (Dying Declaration)', citation: '(2014) 12 SCC 133', court: 'Supreme Court', year: 2014,
    judges: ['Chelameswar J', 'Abhay Manohar Sapre J'],
    summary: 'Reliability of dying declaration as sole basis for conviction in a murder case.',
    legalPrinciple: 'A dying declaration (Section 32 Evidence Act) can be the sole basis for conviction without corroboration if it inspires full confidence of the court. The declaration must be voluntary and truthful.',
    verdict: 'Upheld conviction based solely on the dying declaration. Held that if a dying declaration is found truthful, voluntary, and not tutored, it can be the sole basis for conviction.',
    significance: 'Clarified the evidentiary value of dying declarations under Section 32 of the Indian Evidence Act.',
    relatedSections: ['Section 32 Evidence Act', 'Section 302 IPC'], relatedActs: ['Indian Evidence Act, 1872', 'Indian Penal Code, 1860'], category: 'Criminal',
    keywords: ['dying declaration', 'Section 32', 'evidence', 'sole basis', 'conviction']
  },
  {
    caseName: 'Vikas Yadav v. State of UP (Nitish Katara Murder)', citation: '(2016) 9 SCC 541', court: 'Supreme Court', year: 2016,
    judges: ['Chelameswar J', 'Sapre J'],
    summary: 'Honour killing of Nitish Katara by the brothers of the girl he was in a relationship with.',
    legalPrinciple: 'Honour killings are a barbaric practice and fall within the rarest of rare category. Caste and family "honour" cannot justify murder.',
    verdict: 'Upheld conviction under Section 302 and 201 IPC. Enhanced the sentence and condemned honour killings as "monstrous acts."',
    significance: 'Strong judicial condemnation of honour killings. The Court called for a separate law against honour killings.',
    relatedSections: ['Section 302 IPC', 'Section 201 IPC'], relatedActs: ['Indian Penal Code, 1860'], category: 'Criminal',
    keywords: ['honour killing', 'murder', 'inter-caste', 'Nitish Katara', 'Section 302']
  },
  {
    caseName: 'Santosh Kumar Bariyar v. State of Maharashtra', citation: '(2009) 6 SCC 498', court: 'Supreme Court', year: 2009,
    judges: ['Sinha J', 'Aftab Alam J'],
    summary: 'Death sentence for kidnapping and murder. Question of how to apply the rarest of rare doctrine.',
    legalPrinciple: 'The court must perform a principled sentencing exercise with a balance sheet of aggravating and mitigating factors. Death penalty should not be imposed if the alternative of life imprisonment is "unquestionably foreclosed."',
    verdict: 'Commuted death sentence to life imprisonment. Criticized inconsistent application of the rarest of rare doctrine and called for a more structured sentencing framework.',
    significance: 'Called attention to the arbitrary application of death penalty and the need for sentencing guidelines.',
    relatedSections: ['Section 302 IPC', 'Section 354(3) CrPC'], relatedActs: ['Indian Penal Code, 1860', 'Code of Criminal Procedure, 1973'], category: 'Criminal',
    keywords: ['death penalty', 'sentencing', 'mitigating factors', 'rarest of rare', 'commutation']
  },
  {
    caseName: 'Antulay v. R.S. Nayak', citation: '(1988) 2 SCC 602', court: 'Supreme Court', year: 1988,
    judges: ['Pathak CJ', 'Oza J', 'Dutt J', 'Singh J', 'Shetty J', 'Natarajan J', 'Ray J'],
    summary: 'Former Maharashtra CM A.R. Antulay challenged the long delay in his corruption trial spanning over a decade.',
    legalPrinciple: 'Right to speedy trial is an essential part of Article 21. The accused cannot be made to wait indefinitely for trial. Delay in trial is a ground for quashing proceedings in appropriate cases.',
    verdict: 'Recognized speedy trial as a fundamental right. Listed factors for determining unreasonable delay: length of delay, reason, defendant\'s assertion of right, and prejudice.',
    significance: 'Strengthened the speedy trial doctrine from Hussainara Khatoon and made it applicable to all criminal proceedings.',
    relatedSections: ['Article 21'], relatedActs: ['Constitution of India', 'Prevention of Corruption Act, 1988'], category: 'Criminal',
    keywords: ['speedy trial', 'delay', 'Article 21', 'corruption', 'quashing']
  },
  {
    caseName: 'Bhagwan Dass v. State (NCT of Delhi)', citation: '(2011) 6 SCC 396', court: 'Supreme Court', year: 2011,
    judges: ['Markandey Katju J', 'Gyan Sudha Misra J'],
    summary: 'Father killed his daughter for marrying against his wishes (honour killing).',
    legalPrinciple: 'Honour killings fall within the rarest of rare category. Such killings are nothing but barbaric and brutal murders by bigoted persons who deserve harsh punishment.',
    verdict: 'Confirmed death sentence. The Court held that honour killings are "nothing but barbaric and shameful acts of murder committed by persons who deserve no sympathy."',
    significance: 'Strongest judicial condemnation of honour killings. Called upon Parliament to enact a specific law against the practice.',
    relatedSections: ['Section 302 IPC'], relatedActs: ['Indian Penal Code, 1860'], category: 'Criminal',
    keywords: ['honour killing', 'death penalty', 'marriage', 'caste', 'Section 302']
  },
  {
    caseName: 'Mohd. Arif v. Registrar, Supreme Court', citation: '(2014) 9 SCC 737', court: 'Supreme Court', year: 2014,
    judges: ['Thakur CJ', 'Chelameswar J', 'Ibrahim Kalifulla J', 'Sikri J', 'Nariman J'],
    summary: 'Whether review petitions in death penalty cases should be heard in open court.',
    legalPrinciple: 'In death penalty cases, review petitions must be heard in open court by a bench of 3 judges, not in chambers by circulation. This ensures greater scrutiny before the irreversible sentence is carried out.',
    verdict: 'Overruled previous practice. Directed that all review petitions in death penalty cases be heard in open court to allow oral arguments.',
    significance: 'Added an important procedural safeguard to death penalty jurisprudence.',
    relatedSections: ['Article 137', 'Article 21'], relatedActs: ['Constitution of India'], category: 'Criminal',
    keywords: ['review petition', 'death penalty', 'open court', 'oral hearing', 'safeguard']
  },
  {
    caseName: 'State of Rajasthan v. Union of India (Prakash Singh)', citation: '(2006) 8 SCC 1', court: 'Supreme Court', year: 2006,
    judges: ['Sabharwal CJ', 'Thakker J'],
    summary: 'PIL seeking police reforms and accountability in the functioning of police across India.',
    legalPrinciple: 'Police reforms are necessary to prevent misuse of power. The Court issued 7 directives for police reform including fixed tenure for DGP, separation of investigation from law and order, and Police Complaints Authority.',
    verdict: 'Issued 7 binding directives: (1) State Security Commission, (2) DGP selection through merit-based transparent process, (3) minimum 2-year tenure for police officers, (4) separation of investigation, (5) Police Establishment Board, (6) Police Complaints Authority, (7) National Security Commission.',
    significance: 'Most comprehensive police reform directives by the judiciary. Most states have been slow in implementation despite being binding.',
    relatedSections: ['Article 21', 'Article 14'], relatedActs: ['Constitution of India', 'Police Act, 1861'], category: 'Criminal',
    keywords: ['police reform', 'DGP tenure', 'accountability', 'Prakash Singh', 'investigation']
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    const deleted = await CourtVerdict.deleteMany({ category: 'Criminal' });
    if (deleted.deletedCount > 0) console.log(`Cleared ${deleted.deletedCount} existing criminal verdicts`);
    for (let i = 0; i < verdicts.length; i++) {
      await CourtVerdict.create(verdicts[i]);
      console.log(`[${i + 1}/${verdicts.length}] ${verdicts[i].caseName} (${verdicts[i].year})`);
    }
    console.log(`Done: seeded ${verdicts.length} criminal verdicts`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}
seed();
