// Seed script to populate database with Indian legal sections
// Run with: node server/seedLegalData.js

require('dotenv').config();
const mongoose = require('mongoose');
const LegalSection = require('./models/LegalSection');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lawbook';

// ═══════════════════════════════════════════════════════════════════
// IPC — Indian Penal Code, 1860
// ═══════════════════════════════════════════════════════════════════
const ipcSections = [
  {
    act: 'Indian Penal Code, 1860',
    actCode: 'IPC',
    sectionNumber: '299',
    title: 'Culpable homicide',
    legalText:
      'Whoever causes death by doing an act with the intention of causing death, or with the intention of causing such bodily injury as is likely to cause death, or with the knowledge that he is likely by such act to cause death, commits the offence of culpable homicide.',
    explanation:
      'If a person does something that causes another person\'s death, and they either intended to kill, intended to cause a serious injury likely to cause death, or knew their action could cause death, they are guilty of culpable homicide. This is the broader category — murder is a more specific, aggravated form of culpable homicide.',
    punishment: '',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['culpable homicide', 'death', 'killing', 'intention', 'bodily injury', 'homicide'],
    bnsEquivalent: { section: '100', act: 'Bharatiya Nyaya Sanhita, 2023' },
    isRepealed: true,
    relatedSections: [
      { sectionNumber: '300', actCode: 'IPC', title: 'Murder' },
      { sectionNumber: '304', actCode: 'IPC', title: 'Punishment for culpable homicide not amounting to murder' },
      { sectionNumber: '304A', actCode: 'IPC', title: 'Causing death by negligence' }
    ]
  },
  {
    act: 'Indian Penal Code, 1860',
    actCode: 'IPC',
    sectionNumber: '300',
    title: 'Murder',
    legalText:
      'Except in the cases hereinafter excepted, culpable homicide is murder, if the act by which the death is caused is done with the intention of causing death, or— Secondly.—If it is done with the intention of causing such bodily injury as the offender knows to be likely to cause the death of the person to whom the harm is caused, or— Thirdly.—If it is done with the intention of causing bodily injury to any person and the bodily injury intended to be inflicted is sufficient in the ordinary course of nature to cause death, or— Fourthly.—If the person committing the act knows that it is so imminently dangerous that it must, in all probability, cause death or such bodily injury as is likely to cause death, and commits such act without any excuse for incurring the risk of causing death or such injury as aforesaid.',
    explanation:
      'Culpable homicide becomes murder when: (1) the act is done with the intention of causing death; (2) the offender knows the injury is likely to cause death; (3) the injury inflicted is sufficient in the ordinary course of nature to cause death; or (4) the act is so dangerous that death is almost certain. There are five exceptions (grave provocation, right of private defence, public servant acting in good faith, sudden fight, and consent) where it may be reduced to culpable homicide not amounting to murder.',
    punishment: '',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['murder', 'definition', 'intention', 'death', 'killing', 'homicide', 'bodily injury'],
    bnsEquivalent: { section: '101', act: 'Bharatiya Nyaya Sanhita, 2023' },
    isRepealed: true,
    relatedSections: [
      { sectionNumber: '299', actCode: 'IPC', title: 'Culpable homicide' },
      { sectionNumber: '302', actCode: 'IPC', title: 'Punishment for murder' },
      { sectionNumber: '304', actCode: 'IPC', title: 'Punishment for culpable homicide not amounting to murder' }
    ]
  },
  {
    act: 'Indian Penal Code, 1860',
    actCode: 'IPC',
    sectionNumber: '302',
    title: 'Punishment for murder',
    legalText:
      'Whoever commits murder shall be punished with death, or imprisonment for life, and shall also be liable to fine.',
    explanation:
      'A person found guilty of murder faces either the death penalty or life imprisonment, along with a possible fine. The death penalty is reserved for the "rarest of rare" cases as established by the Supreme Court in Bachan Singh v. State of Punjab (1980).',
    punishment: 'Death, or imprisonment for life, and fine.',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['murder', 'punishment', 'death penalty', 'life imprisonment', 'capital punishment'],
    bnsEquivalent: { section: '103', act: 'Bharatiya Nyaya Sanhita, 2023' },
    isRepealed: true,
    relatedSections: [
      { sectionNumber: '300', actCode: 'IPC', title: 'Murder' },
      { sectionNumber: '307', actCode: 'IPC', title: 'Attempt to murder' }
    ]
  },
  {
    act: 'Indian Penal Code, 1860',
    actCode: 'IPC',
    sectionNumber: '304',
    title: 'Punishment for culpable homicide not amounting to murder',
    legalText:
      'Whoever commits culpable homicide not amounting to murder shall be punished with imprisonment for life, or imprisonment of either description for a term which may extend to ten years, and shall also be liable to fine, if the act by which the death is caused is done with the intention of causing death, or of causing such bodily injury as is likely to cause death; or with imprisonment of either description for a term which may extend to ten years, or with fine, or with both, if the act is done with the knowledge that it is likely to cause death, but without any intention to cause death, or to cause such bodily injury as is likely to cause death.',
    explanation:
      'Part I: If the killing was intentional but falls under an exception to murder (e.g., grave provocation, sudden fight), punishment is life imprisonment or up to 10 years plus fine. Part II: If death was caused with the knowledge that the act was likely to cause death, but without intent to kill, punishment is up to 10 years, or fine, or both.',
    punishment: 'Part I — Imprisonment for life, or up to 10 years, and fine. Part II — Imprisonment up to 10 years, or fine, or both.',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['culpable homicide', 'not murder', 'punishment', 'manslaughter'],
    bnsEquivalent: { section: '105', act: 'Bharatiya Nyaya Sanhita, 2023' },
    isRepealed: true,
    relatedSections: [
      { sectionNumber: '299', actCode: 'IPC', title: 'Culpable homicide' },
      { sectionNumber: '300', actCode: 'IPC', title: 'Murder' },
      { sectionNumber: '304A', actCode: 'IPC', title: 'Causing death by negligence' }
    ]
  },
  {
    act: 'Indian Penal Code, 1860',
    actCode: 'IPC',
    sectionNumber: '304A',
    title: 'Causing death by negligence',
    legalText:
      'Whoever causes the death of any person by doing any rash or negligent act not amounting to culpable homicide, shall be punished with imprisonment of either description for a term which may extend to two years, or with fine, or with both.',
    explanation:
      'If someone causes another person\'s death through reckless or negligent behavior — for example, reckless driving, medical negligence, or industrial negligence — but without any intention to kill, they can be imprisoned for up to 2 years, fined, or both. This section does not require proof of intent.',
    punishment: 'Imprisonment up to 2 years, or fine, or both.',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'Yes',
    keywords: ['negligence', 'death', 'rash act', 'negligent act', 'accident', 'reckless driving', 'medical negligence'],
    bnsEquivalent: { section: '106', act: 'Bharatiya Nyaya Sanhita, 2023' },
    isRepealed: true,
    relatedSections: [
      { sectionNumber: '299', actCode: 'IPC', title: 'Culpable homicide' },
      { sectionNumber: '304', actCode: 'IPC', title: 'Punishment for culpable homicide not amounting to murder' }
    ]
  },
  {
    act: 'Indian Penal Code, 1860',
    actCode: 'IPC',
    sectionNumber: '304B',
    title: 'Dowry death',
    legalText:
      'Where the death of a woman is caused by any burns or bodily injury or occurs otherwise than under normal circumstances within seven years of her marriage and it is shown that soon before her death she was subjected to cruelty or harassment by her husband or any relative of her husband for, or in connection with, any demand for dowry, such death shall be called "dowry death", and such husband or relative shall be deemed to have caused her death. Whoever commits dowry death shall be punished with imprisonment for a term which shall not be less than seven years but which may extend to imprisonment for life.',
    explanation:
      'If a married woman dies within 7 years of marriage due to burns, bodily injury, or under suspicious circumstances, and it is shown she was harassed for dowry before her death, it is treated as "dowry death." The husband or his relatives are presumed responsible. The minimum punishment is 7 years imprisonment, extendable to life imprisonment.',
    punishment: 'Imprisonment not less than 7 years, which may extend to imprisonment for life.',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['dowry death', 'dowry', 'cruelty', 'harassment', 'married woman', 'burns', 'seven years'],
    bnsEquivalent: { section: '80', act: 'Bharatiya Nyaya Sanhita, 2023' },
    isRepealed: true,
    relatedSections: [
      { sectionNumber: '498A', actCode: 'IPC', title: 'Husband or relative of husband of a woman subjecting her to cruelty' },
      { sectionNumber: '306', actCode: 'IPC', title: 'Abetment of suicide' }
    ]
  },
  {
    act: 'Indian Penal Code, 1860',
    actCode: 'IPC',
    sectionNumber: '306',
    title: 'Abetment of suicide',
    legalText:
      'If any person commits suicide, whoever abets the commission of such suicide, shall be punished with imprisonment of either description for a term which may extend to ten years, and shall also be liable to fine.',
    explanation:
      'If someone instigates, encourages, or aids another person in committing suicide, they are guilty of abetment of suicide. This includes persistent harassment, instigation, or creating unbearable conditions that drive a person to take their own life. Punishment is up to 10 years imprisonment and a fine.',
    punishment: 'Imprisonment up to 10 years, and fine.',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['abetment', 'suicide', 'instigation', 'harassment', 'abet'],
    bnsEquivalent: { section: '108', act: 'Bharatiya Nyaya Sanhita, 2023' },
    isRepealed: true,
    relatedSections: [
      { sectionNumber: '304B', actCode: 'IPC', title: 'Dowry death' },
      { sectionNumber: '498A', actCode: 'IPC', title: 'Husband or relative of husband of a woman subjecting her to cruelty' }
    ]
  },
  {
    act: 'Indian Penal Code, 1860',
    actCode: 'IPC',
    sectionNumber: '307',
    title: 'Attempt to murder',
    legalText:
      'Whoever does any act with such intention or knowledge, and under such circumstances that, if he by that act caused death, he would be guilty of murder, shall be punished with imprisonment of either description for a term which may extend to ten years, and shall also be liable to fine; and if hurt is caused to any person by such act, the offender shall be liable either to imprisonment for life, or to such punishment as is hereinbefore mentioned.',
    explanation:
      'If someone does an act with the intention or knowledge that it would amount to murder if death resulted, they are guilty of attempt to murder. If no injury is caused, the punishment is up to 10 years plus fine. If the victim is actually hurt, the punishment may extend to life imprisonment.',
    punishment: 'Imprisonment up to 10 years, and fine. If hurt is caused — imprisonment for life, or up to 10 years with fine.',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['attempt to murder', 'attempt', 'murder', 'intention', 'hurt', 'attack'],
    bnsEquivalent: { section: '109', act: 'Bharatiya Nyaya Sanhita, 2023' },
    isRepealed: true,
    relatedSections: [
      { sectionNumber: '302', actCode: 'IPC', title: 'Punishment for murder' },
      { sectionNumber: '300', actCode: 'IPC', title: 'Murder' }
    ]
  },
  {
    act: 'Indian Penal Code, 1860',
    actCode: 'IPC',
    sectionNumber: '354',
    title: 'Assault or criminal force to woman with intent to outrage her modesty',
    legalText:
      'Whoever assaults or uses criminal force to any woman, intending to outrage or knowing it to be likely that he will thereby outrage her modesty, shall be punished with imprisonment of either description for a term which shall not be less than one year but which may extend to five years, and shall also be liable to fine.',
    explanation:
      'Any person who physically assaults or uses force against a woman with the intention of outraging her modesty, or knowing that such an act would outrage her modesty, is punishable with imprisonment of minimum 1 year up to 5 years and a fine. "Outraging modesty" covers acts like groping, touching inappropriately, or making obscene gestures involving physical contact.',
    punishment: 'Imprisonment not less than 1 year, extendable to 5 years, and fine.',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['assault', 'woman', 'modesty', 'outrage', 'criminal force', 'molestation', 'groping'],
    bnsEquivalent: { section: '74', act: 'Bharatiya Nyaya Sanhita, 2023' },
    isRepealed: true,
    relatedSections: [
      { sectionNumber: '354A', actCode: 'IPC', title: 'Sexual harassment' },
      { sectionNumber: '509', actCode: 'IPC', title: 'Word, gesture or act intended to insult the modesty of a woman' }
    ]
  },
  {
    act: 'Indian Penal Code, 1860',
    actCode: 'IPC',
    sectionNumber: '354A',
    title: 'Sexual harassment and punishment for sexual harassment',
    legalText:
      'A man committing any of the following acts— (i) physical contact and advances involving unwelcome and explicit sexual overtures; or (ii) a demand or request for sexual favours; or (iii) showing pornography against the will of a woman; or (iv) making sexually coloured remarks, shall be guilty of the offence of sexual harassment. Any man who commits the offence specified in clause (i) or clause (ii) shall be punished with rigorous imprisonment for a term which may extend to three years, or with fine, or with both. Any man who commits the offence specified in clause (iii) or clause (iv) shall be punished with imprisonment of either description for a term which may extend to one year, or with fine, or with both.',
    explanation:
      'Sexual harassment includes: (1) unwelcome physical contact or sexual advances, (2) demanding sexual favours, (3) forcibly showing pornography, and (4) making sexually coloured remarks. Physical contact/advances and demands for sexual favours carry up to 3 years\' imprisonment. Showing pornography and sexual remarks carry up to 1 year.',
    punishment: 'For (i) and (ii): Rigorous imprisonment up to 3 years, or fine, or both. For (iii) and (iv): Imprisonment up to 1 year, or fine, or both.',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'Yes',
    keywords: ['sexual harassment', 'harassment', 'woman', 'sexual overtures', 'pornography', 'sexual remarks', 'workplace'],
    bnsEquivalent: { section: '75', act: 'Bharatiya Nyaya Sanhita, 2023' },
    isRepealed: true,
    relatedSections: [
      { sectionNumber: '354', actCode: 'IPC', title: 'Assault or criminal force to woman with intent to outrage her modesty' },
      { sectionNumber: '509', actCode: 'IPC', title: 'Word, gesture or act intended to insult the modesty of a woman' }
    ]
  },
  {
    act: 'Indian Penal Code, 1860',
    actCode: 'IPC',
    sectionNumber: '376',
    title: 'Punishment for rape',
    legalText:
      'Whoever, except in the cases provided for by sub-section (2), commits rape shall be punished with rigorous imprisonment of either description for a term which shall not be less than ten years, but which may extend to imprisonment for life, and shall also be liable to fine. Whoever commits rape on a woman under twelve years of age shall be punished with rigorous imprisonment for a term which shall not be less than twenty years, but which may extend to imprisonment for life, which shall mean imprisonment for the remainder of that person\'s natural life, and with fine or with death.',
    explanation:
      'A person convicted of rape faces a minimum of 10 years rigorous imprisonment, which may extend to life imprisonment, along with a fine. Rape of a girl under 12 years carries a minimum of 20 years imprisonment extending to life (remainder of natural life) or death penalty. Aggravated forms (by police officer, public servant, during communal violence, etc.) carry enhanced punishment under sub-section (2).',
    punishment: 'Rigorous imprisonment not less than 10 years, extendable to life imprisonment, and fine. For victim under 12: not less than 20 years, extendable to natural life or death.',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['rape', 'sexual assault', 'punishment', 'woman', 'consent', 'sexual offence'],
    bnsEquivalent: { section: '64', act: 'Bharatiya Nyaya Sanhita, 2023' },
    isRepealed: true,
    relatedSections: [
      { sectionNumber: '354', actCode: 'IPC', title: 'Assault or criminal force to woman with intent to outrage her modesty' },
      { sectionNumber: '354A', actCode: 'IPC', title: 'Sexual harassment' }
    ]
  },
  {
    act: 'Indian Penal Code, 1860',
    actCode: 'IPC',
    sectionNumber: '379',
    title: 'Punishment for theft',
    legalText:
      'Whoever commits theft shall be punished with imprisonment of either description for a term which may extend to three years, or with fine, or with both.',
    explanation:
      'A person found guilty of theft (dishonestly taking movable property out of someone\'s possession without consent) faces up to 3 years\' imprisonment, a fine, or both.',
    punishment: 'Imprisonment up to 3 years, or fine, or both.',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['theft', 'stealing', 'stolen property', 'movable property', 'dishonest'],
    bnsEquivalent: { section: '303', act: 'Bharatiya Nyaya Sanhita, 2023' },
    isRepealed: true,
    relatedSections: [
      { sectionNumber: '380', actCode: 'IPC', title: 'Theft in dwelling house, etc.' },
      { sectionNumber: '390', actCode: 'IPC', title: 'Robbery' }
    ]
  },
  {
    act: 'Indian Penal Code, 1860',
    actCode: 'IPC',
    sectionNumber: '380',
    title: 'Theft in dwelling house, etc.',
    legalText:
      'Whoever commits theft in any building, tent or vessel, which building, tent or vessel is used as a human dwelling, or used for the custody of property, shall be punished with imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.',
    explanation:
      'If theft is committed inside a building, tent, or vessel that is used as a home or for keeping property (e.g., a house, shop, or warehouse), the punishment is more severe than ordinary theft — up to 7 years imprisonment and fine.',
    punishment: 'Imprisonment up to 7 years, and fine.',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['theft', 'dwelling house', 'building', 'burglary', 'house theft', 'break-in'],
    bnsEquivalent: { section: '305', act: 'Bharatiya Nyaya Sanhita, 2023' },
    isRepealed: true,
    relatedSections: [
      { sectionNumber: '379', actCode: 'IPC', title: 'Punishment for theft' },
      { sectionNumber: '392', actCode: 'IPC', title: 'Punishment for robbery' }
    ]
  },
  {
    act: 'Indian Penal Code, 1860',
    actCode: 'IPC',
    sectionNumber: '383',
    title: 'Extortion',
    legalText:
      'Whoever intentionally puts any person in fear of any injury to that person, or to any other, and thereby dishonestly induces the person so put in fear to deliver to any person any property or valuable security, or anything signed or sealed which may be converted into a valuable security, commits "extortion".',
    explanation:
      'Extortion is when someone threatens another person with harm (to that person or someone else) in order to dishonestly force them to hand over property, money, or any valuable security. The key elements are: (1) intentional threat of injury, (2) inducing fear, and (3) obtaining property through that fear.',
    punishment: '',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['extortion', 'threat', 'fear', 'property', 'inducing', 'blackmail'],
    bnsEquivalent: { section: '308', act: 'Bharatiya Nyaya Sanhita, 2023' },
    isRepealed: true,
    relatedSections: [
      { sectionNumber: '384', actCode: 'IPC', title: 'Punishment for extortion' },
      { sectionNumber: '390', actCode: 'IPC', title: 'Robbery' },
      { sectionNumber: '506', actCode: 'IPC', title: 'Punishment for criminal intimidation' }
    ]
  },
  {
    act: 'Indian Penal Code, 1860',
    actCode: 'IPC',
    sectionNumber: '384',
    title: 'Punishment for extortion',
    legalText:
      'Whoever commits extortion shall be punished with imprisonment of either description for a term which may extend to three years, or with fine, or with both.',
    explanation:
      'A person convicted of extortion faces up to 3 years imprisonment, or a fine, or both. This is the basic punishment; aggravated forms (putting in fear of death, grievous hurt, etc.) carry higher penalties under subsequent sections.',
    punishment: 'Imprisonment up to 3 years, or fine, or both.',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['extortion', 'punishment', 'threat', 'blackmail'],
    bnsEquivalent: { section: '308', act: 'Bharatiya Nyaya Sanhita, 2023' },
    isRepealed: true,
    relatedSections: [
      { sectionNumber: '383', actCode: 'IPC', title: 'Extortion' },
      { sectionNumber: '392', actCode: 'IPC', title: 'Punishment for robbery' }
    ]
  },
  {
    act: 'Indian Penal Code, 1860',
    actCode: 'IPC',
    sectionNumber: '390',
    title: 'Robbery',
    legalText:
      'In all robbery there is either theft or extortion. When theft is robbery.—Theft is "robbery" if, in order to the committing of the theft, or in committing the theft, or in carrying away or attempting to carry away property obtained by the theft, the offender, for that end, voluntarily causes or attempts to cause to any person death or hurt or wrongful restraint, or fear of instant death or of instant hurt, or of instant wrongful restraint. When extortion is robbery.—Extortion is "robbery" if the offender, at the time of committing the extortion, is in the presence of the person put in fear, and commits the extortion by putting that person in fear of instant death, of instant hurt, or of instant wrongful restraint to that person or to some other person, and, by so putting in fear, induces the person so put in fear then and there to deliver up the thing extorted.',
    explanation:
      'Robbery is essentially theft or extortion with the added element of violence, threat of violence, or restraint. Theft becomes robbery when the thief uses or threatens force (death, hurt, or wrongful restraint) during the theft. Extortion becomes robbery when the threats are made in person and involve immediate (instant) harm.',
    punishment: '',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['robbery', 'theft', 'extortion', 'violence', 'force', 'fear', 'wrongful restraint'],
    bnsEquivalent: { section: '309', act: 'Bharatiya Nyaya Sanhita, 2023' },
    isRepealed: true,
    relatedSections: [
      { sectionNumber: '392', actCode: 'IPC', title: 'Punishment for robbery' },
      { sectionNumber: '395', actCode: 'IPC', title: 'Punishment for dacoity' },
      { sectionNumber: '379', actCode: 'IPC', title: 'Punishment for theft' }
    ]
  },
  {
    act: 'Indian Penal Code, 1860',
    actCode: 'IPC',
    sectionNumber: '392',
    title: 'Punishment for robbery',
    legalText:
      'Whoever commits robbery shall be punished with rigorous imprisonment for a term which may extend to ten years, and shall also be liable to fine; and, if the robbery be committed on the highway between sunset and sunrise, the imprisonment may be of either description, and may extend to fourteen years.',
    explanation:
      'A person convicted of robbery faces up to 10 years rigorous imprisonment and fine. If the robbery is committed on a highway between sunset and sunrise, the punishment may extend to 14 years.',
    punishment: 'Rigorous imprisonment up to 10 years, and fine. On highway between sunset and sunrise — up to 14 years.',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['robbery', 'punishment', 'highway robbery', 'violence', 'theft with force'],
    bnsEquivalent: { section: '309', act: 'Bharatiya Nyaya Sanhita, 2023' },
    isRepealed: true,
    relatedSections: [
      { sectionNumber: '390', actCode: 'IPC', title: 'Robbery' },
      { sectionNumber: '395', actCode: 'IPC', title: 'Punishment for dacoity' }
    ]
  },
  {
    act: 'Indian Penal Code, 1860',
    actCode: 'IPC',
    sectionNumber: '395',
    title: 'Punishment for dacoity',
    legalText:
      'Whoever commits dacoity shall be punished with imprisonment for life, or with rigorous imprisonment for a term which may extend to ten years, and shall also be liable to fine.',
    explanation:
      'Dacoity is robbery committed by five or more persons acting together. It carries a more severe punishment than robbery — life imprisonment or rigorous imprisonment up to 10 years, along with fine.',
    punishment: 'Imprisonment for life, or rigorous imprisonment up to 10 years, and fine.',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['dacoity', 'gang robbery', 'five persons', 'robbery', 'group crime'],
    bnsEquivalent: { section: '310', act: 'Bharatiya Nyaya Sanhita, 2023' },
    isRepealed: true,
    relatedSections: [
      { sectionNumber: '390', actCode: 'IPC', title: 'Robbery' },
      { sectionNumber: '392', actCode: 'IPC', title: 'Punishment for robbery' }
    ]
  },
  {
    act: 'Indian Penal Code, 1860',
    actCode: 'IPC',
    sectionNumber: '406',
    title: 'Punishment for criminal breach of trust',
    legalText:
      'Whoever commits criminal breach of trust shall be punished with imprisonment of either description for a term which may extend to three years, or with fine, or with both.',
    explanation:
      'Criminal breach of trust occurs when a person entrusted with property or control over property dishonestly misappropriates, converts to their own use, or disposes of that property in violation of the trust. Examples include an employee misusing company funds, or a trustee diverting trust property. Punishment is up to 3 years, or fine, or both.',
    punishment: 'Imprisonment up to 3 years, or fine, or both.',
    category: 'Criminal',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['criminal breach of trust', 'breach of trust', 'misappropriation', 'entrusted property', 'trust'],
    bnsEquivalent: { section: '316', act: 'Bharatiya Nyaya Sanhita, 2023' },
    isRepealed: true,
    relatedSections: [
      { sectionNumber: '420', actCode: 'IPC', title: 'Cheating and dishonestly inducing delivery of property' },
      { sectionNumber: '415', actCode: 'IPC', title: 'Cheating' }
    ]
  },
  {
    act: 'Indian Penal Code, 1860',
    actCode: 'IPC',
    sectionNumber: '415',
    title: 'Cheating',
    legalText:
      'Whoever, by deceiving any person, fraudulently or dishonestly induces the person so deceived to deliver any property to any person, or to consent that any person shall retain any property, or intentionally induces the person so deceived to do or omit to do anything which he would not do or omit if he were not so deceived, and which act or omission causes or is likely to cause damage or harm to that person in body, mind, reputation or property, is said to "cheat".',
    explanation:
      'Cheating is when someone deceives another person and thereby dishonestly gets them to part with their property, or to do/omit something they wouldn\'t otherwise do, causing them harm. The key elements are: deception, dishonest intent, and resulting damage to the victim in terms of body, mind, reputation, or property.',
    punishment: '',
    category: 'Criminal',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['cheating', 'fraud', 'deception', 'dishonest', 'inducing', 'property'],
    bnsEquivalent: { section: '318', act: 'Bharatiya Nyaya Sanhita, 2023' },
    isRepealed: true,
    relatedSections: [
      { sectionNumber: '420', actCode: 'IPC', title: 'Cheating and dishonestly inducing delivery of property' },
      { sectionNumber: '406', actCode: 'IPC', title: 'Punishment for criminal breach of trust' }
    ]
  },
  {
    act: 'Indian Penal Code, 1860',
    actCode: 'IPC',
    sectionNumber: '420',
    title: 'Cheating and dishonestly inducing delivery of property',
    legalText:
      'Whoever cheats and thereby dishonestly induces the person deceived to deliver any property to any person, or to make, alter or destroy the whole or any part of a valuable security, or anything which is signed or sealed, and which is capable of being converted into a valuable security, shall be punished with imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.',
    explanation:
      'This is an aggravated form of cheating (Section 415) where the deception results in the victim actually handing over property or a valuable security. This is one of the most commonly invoked sections in fraud cases. Punishment is up to 7 years imprisonment and fine.',
    punishment: 'Imprisonment up to 7 years, and fine.',
    category: 'Criminal',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['cheating', 'fraud', 'dishonest', 'property', 'valuable security', '420', 'scam', 'financial fraud'],
    bnsEquivalent: { section: '318', act: 'Bharatiya Nyaya Sanhita, 2023' },
    isRepealed: true,
    relatedSections: [
      { sectionNumber: '415', actCode: 'IPC', title: 'Cheating' },
      { sectionNumber: '406', actCode: 'IPC', title: 'Punishment for criminal breach of trust' },
      { sectionNumber: '468', actCode: 'IPC', title: 'Forgery for purpose of cheating' }
    ]
  },
  {
    act: 'Indian Penal Code, 1860',
    actCode: 'IPC',
    sectionNumber: '463',
    title: 'Forgery',
    legalText:
      'Whoever makes any false document or false electronic record or part of a document or electronic record, with intent to cause damage or injury, to the public or to any person, or to support any claim or title, or to cause any person to part with property, or to enter into any express or implied contract, or with intent to commit fraud or that fraud may be committed, commits forgery.',
    explanation:
      'Forgery is the act of creating a false document or electronic record with the intent to cause harm, support a fraudulent claim, induce someone to part with property, or to commit fraud. This covers fake certificates, forged signatures, fabricated contracts, and false electronic records.',
    punishment: '',
    category: 'Criminal',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['forgery', 'false document', 'fake', 'fabrication', 'electronic record', 'fraud'],
    bnsEquivalent: { section: '336', act: 'Bharatiya Nyaya Sanhita, 2023' },
    isRepealed: true,
    relatedSections: [
      { sectionNumber: '468', actCode: 'IPC', title: 'Forgery for purpose of cheating' },
      { sectionNumber: '420', actCode: 'IPC', title: 'Cheating and dishonestly inducing delivery of property' }
    ]
  },
  {
    act: 'Indian Penal Code, 1860',
    actCode: 'IPC',
    sectionNumber: '468',
    title: 'Forgery for purpose of cheating',
    legalText:
      'Whoever commits forgery, intending that the document or electronic record forged shall be used for the purpose of cheating, shall be punished with imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.',
    explanation:
      'If forgery is committed with the specific intention that the forged document will be used to cheat someone, the punishment is more severe than simple forgery. This section covers situations like creating fake cheques, forging property documents to cheat buyers, or fabricating credentials for fraud. Punishment is up to 7 years and fine.',
    punishment: 'Imprisonment up to 7 years, and fine.',
    category: 'Criminal',
    cognizable: 'No',
    bailable: 'No',
    keywords: ['forgery', 'cheating', 'forged document', 'fake document', 'fraud'],
    bnsEquivalent: { section: '340', act: 'Bharatiya Nyaya Sanhita, 2023' },
    isRepealed: true,
    relatedSections: [
      { sectionNumber: '463', actCode: 'IPC', title: 'Forgery' },
      { sectionNumber: '420', actCode: 'IPC', title: 'Cheating and dishonestly inducing delivery of property' }
    ]
  },
  {
    act: 'Indian Penal Code, 1860',
    actCode: 'IPC',
    sectionNumber: '498A',
    title: 'Husband or relative of husband of a woman subjecting her to cruelty',
    legalText:
      'Whoever, being the husband or the relative of the husband of a woman, subjects such woman to cruelty shall be punished with imprisonment for a term which may extend to three years and shall also be liable to fine. Explanation.—For the purposes of this section, "cruelty" means— (a) any wilful conduct which is of such a nature as is likely to drive the woman to commit suicide or to cause grave injury or danger to life, limb or health (whether mental or physical) of the woman; or (b) harassment of the woman where such harassment is with a view to coercing her or any person related to her to meet any unlawful demand for any property or valuable security or is on account of failure by her or any person related to her to meet such demand.',
    explanation:
      'This section protects married women from cruelty by their husband or his relatives. Cruelty includes: (a) conduct likely to drive her to suicide or cause grave injury to life, limb, or health (mental or physical); and (b) harassment to coerce her or her relatives to meet unlawful dowry demands. It is one of the most widely used provisions for domestic violence complaints.',
    punishment: 'Imprisonment up to 3 years, and fine.',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['cruelty', 'husband', 'wife', 'dowry', 'domestic violence', 'harassment', 'married woman', '498A', 'matrimonial'],
    bnsEquivalent: { section: '85', act: 'Bharatiya Nyaya Sanhita, 2023' },
    isRepealed: true,
    relatedSections: [
      { sectionNumber: '304B', actCode: 'IPC', title: 'Dowry death' },
      { sectionNumber: '306', actCode: 'IPC', title: 'Abetment of suicide' }
    ]
  },
  {
    act: 'Indian Penal Code, 1860',
    actCode: 'IPC',
    sectionNumber: '499',
    title: 'Defamation',
    legalText:
      'Whoever, by words either spoken or intended to be read, or by signs or by visible representations, makes or publishes any imputation concerning any person intending to harm, or knowing or having reason to believe that such imputation will harm, the reputation of such person, is said, except in the cases hereinafter excepted, to defame that person.',
    explanation:
      'Defamation occurs when someone makes or publishes a statement (spoken, written, or through signs/representations) about another person that is intended to harm, or is known to likely harm, that person\'s reputation. There are ten exceptions, including truth published for public good, fair comment on public conduct, and good-faith opinions.',
    punishment: '',
    category: 'Criminal',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['defamation', 'reputation', 'imputation', 'harm', 'spoken', 'published', 'libel', 'slander'],
    bnsEquivalent: { section: '356', act: 'Bharatiya Nyaya Sanhita, 2023' },
    isRepealed: true,
    relatedSections: [
      { sectionNumber: '500', actCode: 'IPC', title: 'Punishment for defamation' }
    ]
  },
  {
    act: 'Indian Penal Code, 1860',
    actCode: 'IPC',
    sectionNumber: '500',
    title: 'Punishment for defamation',
    legalText:
      'Whoever defames another shall be punished with simple imprisonment for a term which may extend to two years, or with fine, or with both.',
    explanation:
      'A person found guilty of defamation under Section 499 can be punished with simple imprisonment for up to 2 years, or fine, or both. Defamation in India is both a civil wrong (for which damages can be claimed) and a criminal offence (under this section).',
    punishment: 'Simple imprisonment up to 2 years, or fine, or both.',
    category: 'Criminal',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['defamation', 'punishment', 'reputation', 'libel', 'slander'],
    bnsEquivalent: { section: '356', act: 'Bharatiya Nyaya Sanhita, 2023' },
    isRepealed: true,
    relatedSections: [
      { sectionNumber: '499', actCode: 'IPC', title: 'Defamation' }
    ]
  },
  {
    act: 'Indian Penal Code, 1860',
    actCode: 'IPC',
    sectionNumber: '503',
    title: 'Criminal intimidation',
    legalText:
      'Whoever threatens another with any injury to his person, reputation or property, or to the person or reputation of any one in whom that person is interested, with intent to cause alarm to that person, or to cause that person to do any act which he is not legally bound to do, or to omit to do any act which that person is legally entitled to do, as the means of avoiding the execution of such threat, commits criminal intimidation.',
    explanation:
      'Criminal intimidation is threatening someone with harm to their person, reputation, or property (or to someone they care about) with the intent to cause alarm or to coerce them into doing something they are not legally bound to do, or to stop them from doing something they have a right to do.',
    punishment: '',
    category: 'Criminal',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['criminal intimidation', 'threat', 'alarm', 'coercion', 'threatening'],
    bnsEquivalent: { section: '351', act: 'Bharatiya Nyaya Sanhita, 2023' },
    isRepealed: true,
    relatedSections: [
      { sectionNumber: '506', actCode: 'IPC', title: 'Punishment for criminal intimidation' },
      { sectionNumber: '383', actCode: 'IPC', title: 'Extortion' }
    ]
  },
  {
    act: 'Indian Penal Code, 1860',
    actCode: 'IPC',
    sectionNumber: '506',
    title: 'Punishment for criminal intimidation',
    legalText:
      'Whoever commits the offence of criminal intimidation shall be punished with imprisonment of either description for a term which may extend to two years, or with fine, or with both; if threat be to cause death or grievous hurt, etc.—and if the threat be to cause death or grievous hurt, or to cause the destruction of any property by fire, or to cause an offence punishable with death or imprisonment for life, or with imprisonment for a term which may extend to seven years, or to impute unchastity to a woman, shall be punished with imprisonment of either description for a term which may extend to seven years, or with fine, or with both.',
    explanation:
      'The basic punishment for criminal intimidation is up to 2 years imprisonment, or fine, or both. If the threat involves death, grievous hurt, destruction of property by fire, or imputing unchastity to a woman, the punishment increases to up to 7 years imprisonment, or fine, or both.',
    punishment: 'Basic: imprisonment up to 2 years, or fine, or both. Aggravated (threat of death/grievous hurt): imprisonment up to 7 years, or fine, or both.',
    category: 'Criminal',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['criminal intimidation', 'threat', 'punishment', 'death threat', 'grievous hurt threat'],
    bnsEquivalent: { section: '351', act: 'Bharatiya Nyaya Sanhita, 2023' },
    isRepealed: true,
    relatedSections: [
      { sectionNumber: '503', actCode: 'IPC', title: 'Criminal intimidation' },
      { sectionNumber: '384', actCode: 'IPC', title: 'Punishment for extortion' }
    ]
  },
  {
    act: 'Indian Penal Code, 1860',
    actCode: 'IPC',
    sectionNumber: '509',
    title: 'Word, gesture or act intended to insult the modesty of a woman',
    legalText:
      'Whoever, intending to insult the modesty of any woman, utters any word, makes any sound or gesture, or exhibits any object, intending that such word or sound shall be heard, or that such gesture or object shall be seen, by such woman, or intrudes upon the privacy of such woman, shall be punished with simple imprisonment for a term which may extend to three years, and also with fine.',
    explanation:
      'This section punishes any word, sound, gesture, or display of an object directed at a woman with the intent to insult her modesty, as well as intrusion upon her privacy. This covers eve-teasing, catcalling, making obscene gestures, and voyeurism-type conduct. Punishment is up to 3 years simple imprisonment and fine.',
    punishment: 'Simple imprisonment up to 3 years, and fine.',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'Yes',
    keywords: ['modesty', 'woman', 'insult', 'gesture', 'eve-teasing', 'catcalling', 'privacy', 'obscene'],
    bnsEquivalent: { section: '79', act: 'Bharatiya Nyaya Sanhita, 2023' },
    isRepealed: true,
    relatedSections: [
      { sectionNumber: '354', actCode: 'IPC', title: 'Assault or criminal force to woman with intent to outrage her modesty' },
      { sectionNumber: '354A', actCode: 'IPC', title: 'Sexual harassment' }
    ]
  }
];

// ═══════════════════════════════════════════════════════════════════
// Constitution of India
// ═══════════════════════════════════════════════════════════════════
const constitutionArticles = [
  {
    act: 'Constitution of India',
    actCode: 'COI',
    sectionNumber: '14',
    title: 'Equality before law',
    legalText:
      'The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.',
    explanation:
      'Article 14 guarantees two things: (1) equality before the law — no person is above the law, and everyone is subject to the same laws; and (2) equal protection of the laws — the State must treat similarly situated persons equally. However, reasonable classification is permitted if there is an intelligible differentia and a rational nexus with the object sought to be achieved.',
    punishment: '',
    category: 'Constitutional',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['equality', 'equal protection', 'law', 'fundamental right', 'discrimination', 'Article 14'],
    isRepealed: false,
    relatedSections: [
      { sectionNumber: '15', actCode: 'COI', title: 'Prohibition of discrimination on grounds of religion, race, caste, sex or place of birth' },
      { sectionNumber: '21', actCode: 'COI', title: 'Protection of life and personal liberty' }
    ]
  },
  {
    act: 'Constitution of India',
    actCode: 'COI',
    sectionNumber: '15',
    title: 'Prohibition of discrimination on grounds of religion, race, caste, sex or place of birth',
    legalText:
      '(1) The State shall not discriminate against any citizen on grounds only of religion, race, caste, sex, place of birth or any of them. (2) No citizen shall, on grounds only of religion, race, caste, sex, place of birth or any of them, be subject to any disability, liability, restriction or condition with regard to— (a) access to shops, public restaurants, hotels and places of public entertainment; or (b) the use of wells, tanks, bathing ghats, roads and places of public resort maintained wholly or partly out of State funds or dedicated to the use of the general public. (3) Nothing in this article shall prevent the State from making any special provision for women and children. (4) Nothing in this article or in clause (2) of article 29 shall prevent the State from making any special provision for the advancement of any socially and educationally backward classes of citizens or for the Scheduled Castes and the Scheduled Tribes.',
    explanation:
      'Article 15 prohibits the State from discriminating against any citizen on grounds of religion, race, caste, sex, or place of birth. It also prohibits discrimination in access to public places. However, the State is allowed to make special provisions for women, children, and socially/educationally backward classes, SCs, and STs (affirmative action/reservations).',
    punishment: '',
    category: 'Constitutional',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['discrimination', 'religion', 'race', 'caste', 'sex', 'fundamental right', 'reservation', 'backward classes'],
    isRepealed: false,
    relatedSections: [
      { sectionNumber: '14', actCode: 'COI', title: 'Equality before law' },
      { sectionNumber: '17', actCode: 'COI', title: 'Abolition of Untouchability' }
    ]
  },
  {
    act: 'Constitution of India',
    actCode: 'COI',
    sectionNumber: '17',
    title: 'Abolition of Untouchability',
    legalText:
      '"Untouchability" is abolished and its practice in any form is forbidden. The enforcement of any disability arising out of "Untouchability" shall be an offence punishable in accordance with law.',
    explanation:
      'Article 17 completely abolishes the practice of untouchability in any form. Any person who practices untouchability or enforces any disability based on it commits a punishable offence. The Protection of Civil Rights Act, 1955 was enacted to give effect to this Article.',
    punishment: 'Punishable under the Protection of Civil Rights Act, 1955 and the SC/ST (Prevention of Atrocities) Act, 1989.',
    category: 'Constitutional',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['untouchability', 'abolition', 'caste', 'discrimination', 'fundamental right', 'civil rights'],
    isRepealed: false,
    relatedSections: [
      { sectionNumber: '15', actCode: 'COI', title: 'Prohibition of discrimination on grounds of religion, race, caste, sex or place of birth' },
      { sectionNumber: '14', actCode: 'COI', title: 'Equality before law' }
    ]
  },
  {
    act: 'Constitution of India',
    actCode: 'COI',
    sectionNumber: '19',
    title: 'Protection of certain rights regarding freedom of speech, etc.',
    legalText:
      '(1) All citizens shall have the right to— (a) freedom of speech and expression; (b) assemble peaceably and without arms; (c) form associations or unions; (d) move freely throughout the territory of India; (e) reside and settle in any part of the territory of India; and (g) practise any profession, or to carry on any occupation, trade or business. (2) Nothing in sub-clause (a) of clause (1) shall affect the operation of any existing law, or prevent the State from making any law, in so far as such law imposes reasonable restrictions on the exercise of the right conferred by the said sub-clause in the interests of the sovereignty and integrity of India, the security of the State, friendly relations with foreign States, public order, decency or morality, or in relation to contempt of court, defamation or incitement to an offence.',
    explanation:
      'Article 19 guarantees six fundamental freedoms to all citizens: freedom of speech and expression, peaceful assembly, forming associations/unions, free movement within India, residing anywhere in India, and practicing any profession or business. These rights are not absolute — the State can impose reasonable restrictions on grounds such as sovereignty, security, public order, decency, morality, contempt of court, defamation, and incitement to offence.',
    punishment: '',
    category: 'Constitutional',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['freedom of speech', 'expression', 'assembly', 'association', 'movement', 'profession', 'fundamental right', 'reasonable restrictions'],
    isRepealed: false,
    relatedSections: [
      { sectionNumber: '14', actCode: 'COI', title: 'Equality before law' },
      { sectionNumber: '21', actCode: 'COI', title: 'Protection of life and personal liberty' }
    ]
  },
  {
    act: 'Constitution of India',
    actCode: 'COI',
    sectionNumber: '21',
    title: 'Protection of life and personal liberty',
    legalText:
      'No person shall be deprived of his life or personal liberty except according to procedure established by law.',
    explanation:
      'Article 21 is the most expansive fundamental right. It guarantees that no person (citizen or non-citizen) can be deprived of their life or personal liberty except by a fair, just, and reasonable procedure established by law. Through judicial interpretation, this Article now includes the right to livelihood, right to privacy, right to shelter, right to health, right to clean environment, right to speedy trial, right to legal aid, right to dignity, and right against solitary confinement, among others.',
    punishment: '',
    category: 'Constitutional',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['life', 'liberty', 'personal liberty', 'fundamental right', 'procedure established by law', 'privacy', 'dignity', 'right to live'],
    isRepealed: false,
    relatedSections: [
      { sectionNumber: '14', actCode: 'COI', title: 'Equality before law' },
      { sectionNumber: '19', actCode: 'COI', title: 'Protection of certain rights regarding freedom of speech, etc.' },
      { sectionNumber: '21A', actCode: 'COI', title: 'Right to education' },
      { sectionNumber: '32', actCode: 'COI', title: 'Remedies for enforcement of rights conferred by this Part' }
    ]
  },
  {
    act: 'Constitution of India',
    actCode: 'COI',
    sectionNumber: '21A',
    title: 'Right to education',
    legalText:
      'The State shall provide free and compulsory education to all children of the age of six to fourteen years in such manner as the State may, by law, determine.',
    explanation:
      'Article 21A, inserted by the 86th Constitutional Amendment Act of 2002, makes free and compulsory education a fundamental right for all children between 6 and 14 years of age. The Right of Children to Free and Compulsory Education Act, 2009 (RTE Act) was enacted to implement this provision.',
    punishment: '',
    category: 'Constitutional',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['education', 'free education', 'compulsory education', 'children', 'fundamental right', 'RTE', 'right to education'],
    isRepealed: false,
    relatedSections: [
      { sectionNumber: '21', actCode: 'COI', title: 'Protection of life and personal liberty' },
      { sectionNumber: '51A', actCode: 'COI', title: 'Fundamental duties' }
    ]
  },
  {
    act: 'Constitution of India',
    actCode: 'COI',
    sectionNumber: '23',
    title: 'Prohibition of traffic in human beings and forced labour',
    legalText:
      '(1) Traffic in human beings and begar and other similar forms of forced labour are prohibited and any contravention of this provision shall be an offence punishable in accordance with law. (2) Nothing in this article shall prevent the State from imposing compulsory service for public purposes, and in imposing such service the State shall not make any discrimination on grounds only of religion, race, caste or class or any of them.',
    explanation:
      'Article 23 prohibits human trafficking, begar (forced labour without payment), and all other forms of forced labour. Any violation is a punishable offence. The State may, however, impose compulsory service for public purposes (such as military conscription) without discrimination based on religion, race, caste, or class.',
    punishment: 'Punishable under relevant laws including the Immoral Traffic (Prevention) Act, 1956 and the Bonded Labour System (Abolition) Act, 1976.',
    category: 'Constitutional',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['human trafficking', 'forced labour', 'begar', 'bonded labour', 'fundamental right', 'slavery'],
    isRepealed: false,
    relatedSections: [
      { sectionNumber: '21', actCode: 'COI', title: 'Protection of life and personal liberty' },
      { sectionNumber: '14', actCode: 'COI', title: 'Equality before law' }
    ]
  },
  {
    act: 'Constitution of India',
    actCode: 'COI',
    sectionNumber: '25',
    title: 'Freedom of conscience and free profession, practice and propagation of religion',
    legalText:
      '(1) Subject to public order, morality and health and to the other provisions of this Part, all persons are equally entitled to freedom of conscience and the right freely to profess, practise and propagate religion. (2) Nothing in this article shall affect the operation of any existing law or prevent the State from making any law— (a) regulating or restricting any economic, financial, political or other secular activity which may be associated with religious practice; (b) providing for social welfare and reform or the throwing open of Hindu religious institutions of a public character to all classes and sections of Hindus.',
    explanation:
      'Article 25 guarantees freedom of religion to all persons (citizens and non-citizens): freedom of conscience, and the right to profess, practise, and propagate religion. These rights are subject to public order, morality, and health. The State can regulate secular activities associated with religion and can enact social reform legislation.',
    punishment: '',
    category: 'Constitutional',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['religion', 'freedom of religion', 'conscience', 'profess', 'practise', 'propagate', 'fundamental right', 'secularism'],
    isRepealed: false,
    relatedSections: [
      { sectionNumber: '14', actCode: 'COI', title: 'Equality before law' },
      { sectionNumber: '19', actCode: 'COI', title: 'Protection of certain rights regarding freedom of speech, etc.' }
    ]
  },
  {
    act: 'Constitution of India',
    actCode: 'COI',
    sectionNumber: '32',
    title: 'Remedies for enforcement of rights conferred by this Part',
    legalText:
      '(1) The right to move the Supreme Court by appropriate proceedings for the enforcement of the rights conferred by this Part is guaranteed. (2) The Supreme Court shall have power to issue directions or orders or writs, including writs in the nature of habeas corpus, mandamus, prohibition, quo warranto and certiorari, whichever may be appropriate, for the enforcement of any of the rights conferred by this Part. (3) Without prejudice to the powers conferred on the Supreme Court by clauses (1) and (2), Parliament may by law empower any other court to exercise within the local limits of its jurisdiction all or any of the powers exercisable by the Supreme Court under clause (2). (4) The right guaranteed by this article shall not be suspended except as otherwise provided for by this Constitution.',
    explanation:
      'Article 32 is called the "heart and soul of the Constitution" by Dr. B.R. Ambedkar. It gives citizens the right to directly approach the Supreme Court for enforcement of their Fundamental Rights. The Supreme Court can issue five types of writs: habeas corpus (release from illegal detention), mandamus (order to perform duty), prohibition (stop lower court proceedings), certiorari (quash lower court order), and quo warranto (challenge public office holding).',
    punishment: '',
    category: 'Constitutional',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['writs', 'Supreme Court', 'fundamental rights', 'habeas corpus', 'mandamus', 'enforcement', 'constitutional remedies', 'Article 32'],
    isRepealed: false,
    relatedSections: [
      { sectionNumber: '21', actCode: 'COI', title: 'Protection of life and personal liberty' },
      { sectionNumber: '14', actCode: 'COI', title: 'Equality before law' },
      { sectionNumber: '19', actCode: 'COI', title: 'Protection of certain rights regarding freedom of speech, etc.' }
    ]
  },
  {
    act: 'Constitution of India',
    actCode: 'COI',
    sectionNumber: '39A',
    title: 'Equal justice and free legal aid',
    legalText:
      'The State shall secure that the operation of the legal system promotes justice, on a basis of equal opportunity, and shall, in particular, provide free legal aid, by suitable legislation or schemes or in any other way, to ensure that opportunities for securing justice are not denied to any citizen by reason of economic or other disabilities.',
    explanation:
      'Article 39A is a Directive Principle of State Policy that directs the State to ensure equal access to justice and provide free legal aid to those who cannot afford it. This led to the establishment of the National Legal Services Authority (NALSA) under the Legal Services Authorities Act, 1987, which provides free legal aid to the poor, women, children, SC/ST persons, and other marginalized groups.',
    punishment: '',
    category: 'Constitutional',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['legal aid', 'free legal aid', 'equal justice', 'Directive Principle', 'NALSA', 'access to justice', 'poor'],
    isRepealed: false,
    relatedSections: [
      { sectionNumber: '14', actCode: 'COI', title: 'Equality before law' },
      { sectionNumber: '21', actCode: 'COI', title: 'Protection of life and personal liberty' }
    ]
  },
  {
    act: 'Constitution of India',
    actCode: 'COI',
    sectionNumber: '44',
    title: 'Uniform civil code for the citizens',
    legalText:
      'The State shall endeavour to secure for the citizens a uniform civil code throughout the territory of India.',
    explanation:
      'Article 44 is a Directive Principle of State Policy directing the State to work towards a Uniform Civil Code (UCC) — a single set of laws governing personal matters like marriage, divorce, inheritance, and adoption for all citizens regardless of religion. Currently, different religious communities in India are governed by different personal laws. This remains one of the most debated provisions of the Constitution.',
    punishment: '',
    category: 'Constitutional',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['uniform civil code', 'UCC', 'personal law', 'Directive Principle', 'marriage', 'divorce', 'inheritance', 'secularism'],
    isRepealed: false,
    relatedSections: [
      { sectionNumber: '14', actCode: 'COI', title: 'Equality before law' },
      { sectionNumber: '25', actCode: 'COI', title: 'Freedom of conscience and free profession, practice and propagation of religion' }
    ]
  },
  {
    act: 'Constitution of India',
    actCode: 'COI',
    sectionNumber: '51A',
    title: 'Fundamental duties',
    legalText:
      'It shall be the duty of every citizen of India— (a) to abide by the Constitution and respect its ideals and institutions, the National Flag and the National Anthem; (b) to cherish and follow the noble ideals which inspired our national struggle for freedom; (c) to uphold and protect the sovereignty, unity and integrity of India; (d) to defend the country and render national service when called upon to do so; (e) to promote harmony and the spirit of common brotherhood amongst all the people of India transcending religious, linguistic and regional or sectional diversities; to renounce practices derogatory to the dignity of women; (f) to value and preserve the rich heritage of our composite culture; (g) to protect and improve the natural environment including forests, lakes, rivers and wild life, and to have compassion for living creatures; (h) to develop the scientific temper, humanism and the spirit of inquiry and reform; (i) to safeguard public property and to abjure violence; (j) to strive towards excellence in all spheres of individual and collective activity so that the nation constantly rises to higher levels of endeavour and achievement; (k) who is a parent or guardian to provide opportunities for education to his child or, as the case may be, ward between the age of six and fourteen years.',
    explanation:
      'Article 51A, added by the 42nd Amendment (1976), lists 11 Fundamental Duties of every Indian citizen (clause (k) was added by the 86th Amendment in 2002). These include respecting the Constitution, national symbols, sovereignty, promoting harmony, protecting the environment, developing scientific temper, safeguarding public property, and providing education to children. While not directly enforceable in courts, they serve as moral obligations and can be used to interpret laws.',
    punishment: '',
    category: 'Constitutional',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['fundamental duties', 'duties', 'citizen', 'national flag', 'sovereignty', 'environment', 'scientific temper', 'harmony', 'education'],
    isRepealed: false,
    relatedSections: [
      { sectionNumber: '21A', actCode: 'COI', title: 'Right to education' },
      { sectionNumber: '19', actCode: 'COI', title: 'Protection of certain rights regarding freedom of speech, etc.' }
    ]
  }
];

// ═══════════════════════════════════════════════════════════════════
// BNS — Bharatiya Nyaya Sanhita, 2023
// ═══════════════════════════════════════════════════════════════════
const bnsSections = [
  {
    act: 'Bharatiya Nyaya Sanhita, 2023',
    actCode: 'BNS',
    sectionNumber: '100',
    title: 'Culpable homicide',
    legalText:
      'Whoever causes death by doing an act with the intention of causing death, or with the intention of causing such bodily injury as is likely to cause death, or with the knowledge that he is likely by such act to cause death, commits the offence of culpable homicide.',
    explanation:
      'Section 100 of BNS replaces Section 299 of IPC. It retains the same definition of culpable homicide — causing death with the intention of causing death, or intending to cause such bodily injury as is likely to cause death, or with knowledge that the act is likely to cause death.',
    punishment: '',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['culpable homicide', 'death', 'killing', 'intention', 'BNS'],
    ipcEquivalent: { section: '299', act: 'Indian Penal Code, 1860' },
    isRepealed: false,
    relatedSections: [
      { sectionNumber: '101', actCode: 'BNS', title: 'Murder' },
      { sectionNumber: '103', actCode: 'BNS', title: 'Punishment for murder' }
    ]
  },
  {
    act: 'Bharatiya Nyaya Sanhita, 2023',
    actCode: 'BNS',
    sectionNumber: '101',
    title: 'Murder',
    legalText:
      'Except in the cases hereinafter excepted, culpable homicide is murder,— (a) if the act by which the death is caused is done with the intention of causing death; or (b) if it is done with the intention of causing such bodily injury as the offender knows to be likely to cause the death of the person to whom the harm is caused; or (c) if it is done with the intention of causing bodily injury to any person, and the bodily injury intended to be inflicted is sufficient in the ordinary course of nature to cause death; or (d) if the person committing the act knows that it is so imminently dangerous that it must in all probability cause death, or such bodily injury as is likely to cause death, and commits such act without any excuse for incurring the risk of causing death or such injury as aforesaid.',
    explanation:
      'Section 101 of BNS replaces Section 300 of IPC. The definition of murder remains substantially the same, with four conditions under which culpable homicide becomes murder and five exceptions (grave provocation, right of private defence, public servant, sudden fight, consent) that reduce it to culpable homicide not amounting to murder.',
    punishment: '',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['murder', 'definition', 'BNS', 'intention', 'death', 'killing'],
    ipcEquivalent: { section: '300', act: 'Indian Penal Code, 1860' },
    isRepealed: false,
    relatedSections: [
      { sectionNumber: '100', actCode: 'BNS', title: 'Culpable homicide' },
      { sectionNumber: '103', actCode: 'BNS', title: 'Punishment for murder' }
    ]
  },
  {
    act: 'Bharatiya Nyaya Sanhita, 2023',
    actCode: 'BNS',
    sectionNumber: '103',
    title: 'Punishment for murder',
    legalText:
      '(1) Whoever commits murder shall be punished with death or imprisonment for life, and shall also be liable to fine. (2) When a group of five or more persons acting in concert commits murder on the ground of race, caste or community, sex, place of birth, language, personal belief or any other similar ground, each member of such group shall be punished with death or with imprisonment for life, and shall also be liable to fine.',
    explanation:
      'Section 103 of BNS replaces Section 302 of IPC. Sub-section (1) retains the same punishment for murder — death or life imprisonment with fine. Sub-section (2) is a new addition that specifically addresses mob lynching — when a group of five or more persons commits murder based on race, caste, community, sex, place of birth, language, or personal belief, each member is liable for the same punishment.',
    punishment: 'Death, or imprisonment for life, and fine. For mob lynching — same punishment for each member of the group.',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['murder', 'punishment', 'death penalty', 'life imprisonment', 'mob lynching', 'BNS'],
    ipcEquivalent: { section: '302', act: 'Indian Penal Code, 1860' },
    isRepealed: false,
    relatedSections: [
      { sectionNumber: '101', actCode: 'BNS', title: 'Murder' },
      { sectionNumber: '109', actCode: 'BNS', title: 'Attempt to murder' }
    ]
  },
  {
    act: 'Bharatiya Nyaya Sanhita, 2023',
    actCode: 'BNS',
    sectionNumber: '63',
    title: 'Rape',
    legalText:
      'A man is said to commit "rape" if he— (a) penetrates his penis, to any extent, into the vagina, mouth, urethra or anus of a woman or makes her to do so with him or any other person; or (b) inserts, to any extent, any object or a part of the body, not being the penis, into the vagina, the urethra or anus of a woman or makes her to do so with him or any other person; or (c) manipulates any part of the body of a woman so as to cause penetration into the vagina, urethra, anus or any part of body of such woman or makes her to do so with him or any other person; or (d) applies his mouth to the vagina, anus, urethra of a woman or makes her to do so with him or any other person, under the circumstances falling under any of the following seven descriptions.',
    explanation:
      'Section 63 of BNS replaces Section 375 of IPC. It provides a comprehensive definition of rape, covering various forms of sexual penetration and acts performed without the woman\'s consent, against her will, with consent obtained by fear or misconception, when she is unable to communicate consent, or when she is under 18 years of age (with or without consent).',
    punishment: '',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['rape', 'definition', 'sexual assault', 'consent', 'woman', 'BNS'],
    ipcEquivalent: { section: '375', act: 'Indian Penal Code, 1860' },
    isRepealed: false,
    relatedSections: [
      { sectionNumber: '64', actCode: 'BNS', title: 'Punishment for rape' }
    ]
  },
  {
    act: 'Bharatiya Nyaya Sanhita, 2023',
    actCode: 'BNS',
    sectionNumber: '64',
    title: 'Punishment for rape',
    legalText:
      '(1) Whoever, except in the cases provided for in sub-section (2), commits rape, shall be punished with rigorous imprisonment of either description for a term which shall not be less than ten years, but which may extend to imprisonment for life, and shall also be liable to fine. (2) Whoever commits rape on a woman under twelve years of age shall be punished with rigorous imprisonment for a term which shall not be less than twenty years, but which may extend to imprisonment for life, which shall mean imprisonment for the remainder of that person\'s natural life, and with fine or with death.',
    explanation:
      'Section 64 of BNS replaces Section 376 of IPC. The punishment structure remains similar: minimum 10 years rigorous imprisonment extending to life imprisonment for rape, and minimum 20 years extending to natural life or death for rape of a girl under 12. Enhanced punishment applies for aggravated forms (by police officers, public servants, armed forces, etc.).',
    punishment: 'Rigorous imprisonment not less than 10 years, extendable to life imprisonment, and fine. For victim under 12: not less than 20 years, extendable to natural life or death.',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['rape', 'punishment', 'sexual assault', 'woman', 'BNS'],
    ipcEquivalent: { section: '376', act: 'Indian Penal Code, 1860' },
    isRepealed: false,
    relatedSections: [
      { sectionNumber: '63', actCode: 'BNS', title: 'Rape' }
    ]
  },
  {
    act: 'Bharatiya Nyaya Sanhita, 2023',
    actCode: 'BNS',
    sectionNumber: '115',
    title: 'Voluntarily causing hurt',
    legalText:
      '(1) Whoever does any act with the intention of thereby causing hurt to any person, or with the knowledge that he is likely thereby to cause hurt to any person, and does thereby cause hurt to any person, is said "voluntarily to cause hurt". (2) Whoever, except in the case provided for by sub-section (1), voluntarily causes hurt shall be punished with imprisonment of either description for a term which may extend to one year, or with fine which may extend to ten thousand rupees, or with both.',
    explanation:
      'Section 115 of BNS deals with voluntarily causing hurt. It defines the offence as doing any act with the intention or knowledge of causing hurt, and provides punishment of up to one year imprisonment or fine up to ten thousand rupees, or both.',
    punishment: 'Imprisonment up to 1 year, or fine up to ten thousand rupees, or both.',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'Yes',
    keywords: ['hurt', 'voluntarily causing hurt', 'injury', 'assault', 'BNS'],
    ipcEquivalent: { section: '323', act: 'Indian Penal Code, 1860' },
    isRepealed: false,
    relatedSections: [
      { sectionNumber: '100', actCode: 'BNS', title: 'Culpable homicide' }
    ]
  },
  {
    act: 'Bharatiya Nyaya Sanhita, 2023',
    actCode: 'BNS',
    sectionNumber: '308',
    title: 'Extortion',
    legalText:
      '(1) Whoever intentionally puts any person in fear of any injury to that person, or to any other, and thereby dishonestly induces the person so put in fear to deliver to any person any property, or valuable security, or anything signed or sealed which may be converted into a valuable security, commits "extortion". (2) Whoever commits extortion shall be punished with imprisonment of either description for a term which may extend to three years, or with fine, or with both.',
    explanation:
      'Section 308 of BNS replaces Sections 383 and 384 of IPC. It combines the definition and punishment for extortion in a single section. The definition remains the same — intentionally putting someone in fear of injury to dishonestly induce them to deliver property. Punishment is up to 3 years imprisonment, or fine, or both.',
    punishment: 'Imprisonment up to 3 years, or fine, or both.',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['extortion', 'threat', 'fear', 'property', 'blackmail', 'BNS'],
    ipcEquivalent: { section: '383', act: 'Indian Penal Code, 1860' },
    isRepealed: false,
    relatedSections: [
      { sectionNumber: '309', actCode: 'BNS', title: 'Robbery' }
    ]
  },
  {
    act: 'Bharatiya Nyaya Sanhita, 2023',
    actCode: 'BNS',
    sectionNumber: '309',
    title: 'Robbery',
    legalText:
      '(1) In all robbery there is either theft or extortion. (2) Theft is "robbery" if, in order to the committing of the theft, or in committing the theft, or in carrying away or attempting to carry away property obtained by the theft, the offender, for that end, voluntarily causes or attempts to cause to any person death or hurt or wrongful restraint, or fear of instant death or of instant hurt, or of instant wrongful restraint. (3) Extortion is "robbery" if the offender, at the time of committing the extortion, is in the presence of the person put in fear, and commits the extortion by putting that person in fear of instant death, of instant hurt, or of instant wrongful restraint to that person or to some other person, and, by so putting in fear, induces the person so put in fear then and there to deliver up the thing extorted.',
    explanation:
      'Section 309 of BNS replaces Section 390 of IPC. The definition of robbery remains the same — it is either theft or extortion accompanied by violence or threat of immediate violence. The section is reorganised into sub-sections for clarity but the legal substance is unchanged.',
    punishment: '',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['robbery', 'theft', 'extortion', 'violence', 'force', 'BNS'],
    ipcEquivalent: { section: '390', act: 'Indian Penal Code, 1860' },
    isRepealed: false,
    relatedSections: [
      { sectionNumber: '308', actCode: 'BNS', title: 'Extortion' },
      { sectionNumber: '115', actCode: 'BNS', title: 'Voluntarily causing hurt' }
    ]
  },
  {
    act: 'Bharatiya Nyaya Sanhita, 2023',
    actCode: 'BNS',
    sectionNumber: '316',
    title: 'Criminal breach of trust',
    legalText:
      '(1) Whoever, being in any manner entrusted with property, or with any dominion over property, dishonestly misappropriates or converts to his own use that property, or dishonestly uses or disposes of that property in violation of any direction of law prescribing the mode in which such trust is to be discharged, or of any legal contract, express or implied, which he has made touching the discharge of such trust, or wilfully suffers any other person so to do, commits "criminal breach of trust". (2) Whoever commits criminal breach of trust shall be punished with imprisonment of either description for a term which may extend to three years, or with fine, or with both.',
    explanation:
      'Section 316 of BNS replaces Sections 405 and 406 of IPC. It combines the definition and basic punishment for criminal breach of trust. The offence occurs when a person entrusted with property dishonestly misappropriates, converts, or uses that property in violation of the trust. Punishment is up to 3 years, or fine, or both.',
    punishment: 'Imprisonment up to 3 years, or fine, or both.',
    category: 'Criminal',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['criminal breach of trust', 'breach of trust', 'misappropriation', 'trust', 'BNS'],
    ipcEquivalent: { section: '406', act: 'Indian Penal Code, 1860' },
    isRepealed: false,
    relatedSections: [
      { sectionNumber: '318', actCode: 'BNS', title: 'Cheating' }
    ]
  },
  {
    act: 'Bharatiya Nyaya Sanhita, 2023',
    actCode: 'BNS',
    sectionNumber: '318',
    title: 'Cheating',
    legalText:
      '(1) Whoever, by deceiving any person, fraudulently or dishonestly induces the person so deceived to deliver any property to any person, or to consent that any person shall retain any property, or intentionally induces the person so deceived to do or omit to do anything which he would not do or omit if he were not so deceived, and which act or omission causes or is likely to cause damage or harm to that person in body, mind, reputation or property, is said to "cheat". (2) Whoever cheats shall be punished with imprisonment of either description for a term which may extend to three years, or with fine, or with both. (4) Whoever cheats and thereby dishonestly induces the person deceived to deliver any property to any person, or to make, alter or destroy the whole or any part of a valuable security, or anything which is signed or sealed, and which is capable of being converted into a valuable security, shall be punished with imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.',
    explanation:
      'Section 318 of BNS consolidates Sections 415, 417, and 420 of IPC into one section. It defines cheating and provides graduated punishment: basic cheating carries up to 3 years; cheating that results in delivery of property (equivalent to old Section 420) carries up to 7 years and fine.',
    punishment: 'Basic cheating: up to 3 years, or fine, or both. Cheating with delivery of property: up to 7 years, and fine.',
    category: 'Criminal',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['cheating', 'fraud', 'deception', 'dishonest', 'property', 'BNS', 'scam'],
    ipcEquivalent: { section: '420', act: 'Indian Penal Code, 1860' },
    isRepealed: false,
    relatedSections: [
      { sectionNumber: '316', actCode: 'BNS', title: 'Criminal breach of trust' }
    ]
  },
  {
    act: 'Bharatiya Nyaya Sanhita, 2023',
    actCode: 'BNS',
    sectionNumber: '85',
    title: 'Cruelty by husband or relative of husband',
    legalText:
      'Whoever, being the husband or the relative of the husband of a woman, subjects such woman to cruelty, shall be punished with imprisonment for a term which may extend to three years and shall also be liable to fine. Explanation.—For the purposes of this section, "cruelty" means— (a) any wilful conduct which is of such a nature as is likely to drive the woman to commit suicide or to cause grave injury or danger to life, limb or health (whether mental or physical) of the woman; or (b) harassment of the woman where such harassment is with a view to coercing her or any person related to her to meet any unlawful demand for any property or valuable security or is on account of failure by her or any person related to her to meet such demand.',
    explanation:
      'Section 85 of BNS replaces Section 498A of IPC. It retains the same provision for protecting married women from cruelty by husband or his relatives, with the same definition of cruelty: (a) conduct likely to drive the woman to suicide or cause grave injury/danger to life, limb, or health; (b) dowry-related harassment. Punishment remains up to 3 years and fine.',
    punishment: 'Imprisonment up to 3 years, and fine.',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['cruelty', 'husband', 'wife', 'dowry', 'domestic violence', 'harassment', '498A', 'BNS'],
    ipcEquivalent: { section: '498A', act: 'Indian Penal Code, 1860' },
    isRepealed: false,
    relatedSections: [
      { sectionNumber: '80', actCode: 'BNS', title: 'Dowry death' }
    ]
  }
];

// ═══════════════════════════════════════════════════════════════════
// CrPC — Code of Criminal Procedure, 1973
// ═══════════════════════════════════════════════════════════════════
const crpcSections = [
  {
    act: 'Code of Criminal Procedure, 1973',
    actCode: 'CrPC',
    sectionNumber: '41',
    title: 'When police may arrest without warrant',
    legalText:
      '(1) Any police officer may without an order from a Magistrate and without a warrant, arrest any person— (a) who commits, in the presence of a police officer, a cognizable offence; (b) against whom a reasonable complaint has been made, or credible information has been received, or a reasonable suspicion exists that he has committed a cognizable offence punishable with imprisonment for a term which may be less than seven years or which may extend to seven years whether with or without fine, if the following conditions are satisfied, namely:— (i) the police officer has reason to believe on the basis of such complaint, information, or suspicion that such person has committed the said offence; (ii) the police officer is satisfied that such arrest is necessary— (a) to prevent such person from committing any further offence; or (b) for proper investigation of the offence; or (c) to prevent such person from causing the evidence of the offence to disappear or tampering with such evidence in any manner; or (d) to prevent such person from making any inducement, threat or promise to any person acquainted with the facts of the case so as to dissuade him from disclosing such facts to the Court or to the police officer; or (e) as unless such person is arrested, his presence in the Court whenever required cannot be ensured, and the police officer shall record while making such arrest, his reasons in writing.',
    explanation:
      'Section 41 empowers police to arrest without a warrant in cognizable offences, but after the 2009 amendment, it requires the police officer to record reasons in writing. For offences punishable with up to 7 years, arrest is not automatic — the officer must be satisfied that arrest is necessary to prevent further offence, for proper investigation, to prevent evidence tampering, to prevent witness intimidation, or to ensure court appearance. This section was reformed to reduce unnecessary arrests.',
    punishment: '',
    category: 'Criminal',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['arrest', 'without warrant', 'police', 'cognizable offence', 'arrest procedure', 'CrPC'],
    isRepealed: true,
    relatedSections: [
      { sectionNumber: '154', actCode: 'CrPC', title: 'Information in cognizable cases (FIR)' },
      { sectionNumber: '167', actCode: 'CrPC', title: 'Procedure when investigation cannot be completed in twenty-four hours' },
      { sectionNumber: '438', actCode: 'CrPC', title: 'Direction for grant of bail to person apprehending arrest (Anticipatory bail)' }
    ]
  },
  {
    act: 'Code of Criminal Procedure, 1973',
    actCode: 'CrPC',
    sectionNumber: '154',
    title: 'Information in cognizable cases (FIR)',
    legalText:
      '(1) Every information relating to the commission of a cognizable offence, if given orally to an officer in charge of a police station, shall be reduced to writing by him or under his direction, and be read over to the informant; and every such information, whether given in writing or reduced to writing as aforesaid, shall be signed by the person giving it, and the substance thereof shall be entered in a book to be kept by such officer in such form as the State Government may prescribe in this behalf. (2) A copy of the information as recorded under sub-section (1) shall be given forthwith, free of cost, to the informant. (3) Any person aggrieved by a refusal on the part of an officer in charge of a police station to record the information referred to in sub-section (1) may send the substance of such information, in writing and by post, to the Superintendent of Police concerned who, if satisfied that such information discloses the commission of a cognizable offence, shall either investigate the case himself or direct an investigation to be made by any police officer subordinate to him.',
    explanation:
      'Section 154 deals with the filing of a First Information Report (FIR). When someone reports a cognizable offence at a police station, the station officer must: (1) write down the information, (2) read it back to the informant, (3) get it signed, and (4) provide a free copy immediately. If police refuse to register an FIR, the complainant can write to the Superintendent of Police. The Supreme Court in Lalita Kumari v. Government of UP (2014) held that registration of FIR is mandatory if the information discloses commission of a cognizable offence.',
    punishment: '',
    category: 'Criminal',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['FIR', 'First Information Report', 'cognizable offence', 'police station', 'complaint', 'registration', 'information'],
    isRepealed: true,
    relatedSections: [
      { sectionNumber: '41', actCode: 'CrPC', title: 'When police may arrest without warrant' },
      { sectionNumber: '167', actCode: 'CrPC', title: 'Procedure when investigation cannot be completed in twenty-four hours' }
    ]
  },
  {
    act: 'Code of Criminal Procedure, 1973',
    actCode: 'CrPC',
    sectionNumber: '167',
    title: 'Procedure when investigation cannot be completed in twenty-four hours',
    legalText:
      '(1) Whenever any person is arrested and detained in custody, and it appears that the investigation cannot be completed within the period of twenty-four hours fixed by section 57, and there are grounds for believing that the accusation or information is well-founded, the officer in charge of the police station or the police officer making the investigation, if he is not below the rank of sub-inspector, shall forthwith transmit to the nearest Judicial Magistrate a copy of the entries in the diary hereinafter prescribed relating to the case, and shall at the same time forward the accused to such Magistrate. (2) The Magistrate to whom an accused person is forwarded under this section may, whether he has or has not jurisdiction to try the case, from time to time, authorise the detention of the accused in such custody as such Magistrate thinks fit, for a term not exceeding fifteen days in the whole; and if he has no jurisdiction to try the case or commit it for trial, and considers further detention unnecessary, he may order the accused to be forwarded to a Magistrate having such jurisdiction: Provided that— (a) the Magistrate may authorise the detention of the accused person, otherwise than in the custody of the police, beyond the period of fifteen days, if he is satisfied that adequate grounds exist for doing so, but no Magistrate shall authorise the detention of the accused person in custody under this paragraph for a total period exceeding,— (i) ninety days, where the investigation relates to an offence punishable with death, imprisonment for life or imprisonment for a term of not less than ten years; (ii) sixty days, where the investigation relates to any other offence, and, on the expiry of the said period of ninety days, or sixty days, as the case may be, the accused person shall be released on bail if he is prepared to and does furnish bail, and every person released on bail under this sub-section shall be deemed to be so released under the provisions of Chapter XXXIII for the purposes of that Chapter.',
    explanation:
      'Section 167 governs what happens when police cannot complete investigation within 24 hours of arrest. The accused must be produced before a Magistrate who can authorize further detention. Police custody (remand) can be granted for up to 15 days. After that, judicial custody may continue for up to 90 days (for offences punishable with death/life/10+ years) or 60 days (for other offences). If the chargesheet is not filed within this period, the accused gets "default bail" — an indefeasible right recognized by the Supreme Court.',
    punishment: '',
    category: 'Criminal',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['remand', 'police custody', 'judicial custody', 'default bail', 'investigation', '24 hours', 'magistrate', '90 days', '60 days', 'chargesheet'],
    isRepealed: true,
    relatedSections: [
      { sectionNumber: '41', actCode: 'CrPC', title: 'When police may arrest without warrant' },
      { sectionNumber: '438', actCode: 'CrPC', title: 'Direction for grant of bail to person apprehending arrest (Anticipatory bail)' }
    ]
  },
  {
    act: 'Code of Criminal Procedure, 1973',
    actCode: 'CrPC',
    sectionNumber: '438',
    title: 'Direction for grant of bail to person apprehending arrest (Anticipatory bail)',
    legalText:
      '(1) Where any person has reason to believe that he may be arrested on accusation of having committed a non-bailable offence, he may apply to the High Court or the Court of Session for a direction under this section that in the event of such arrest he shall be released on bail; and that Court may, after taking into consideration, inter alia, the following factors, namely:— (i) the nature and gravity of the accusation; (ii) the antecedents of the applicant including the fact as to whether he has previously undergone imprisonment on conviction by a Court in respect of any cognizable offence; (iii) the possibility of the applicant to flee from justice; and (iv) where the accusation has been made with the object of injuring or humiliating the applicant by having him so arrested, either reject the application forthwith or issue an interim order for the grant of anticipatory bail.',
    explanation:
      'Section 438 provides for anticipatory bail — a person who apprehends arrest for a non-bailable offence can apply to the High Court or Sessions Court for an order that they be released on bail if arrested. The court considers: nature of accusation, antecedents, flight risk, and whether the accusation is made to injure/humiliate. The Supreme Court in Sushila Aggarwal v. State (2020) held that anticipatory bail can be granted without any time limit and need not be limited to a fixed period.',
    punishment: '',
    category: 'Criminal',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['anticipatory bail', 'bail', 'arrest', 'non-bailable offence', 'High Court', 'Sessions Court', 'pre-arrest bail'],
    isRepealed: true,
    relatedSections: [
      { sectionNumber: '41', actCode: 'CrPC', title: 'When police may arrest without warrant' },
      { sectionNumber: '167', actCode: 'CrPC', title: 'Procedure when investigation cannot be completed in twenty-four hours' },
      { sectionNumber: '482', actCode: 'CrPC', title: 'Saving of inherent powers of High Court' }
    ]
  },
  {
    act: 'Code of Criminal Procedure, 1973',
    actCode: 'CrPC',
    sectionNumber: '482',
    title: 'Saving of inherent powers of High Court',
    legalText:
      'Nothing in this Code shall be deemed to limit or affect the inherent powers of the High Court to make such orders as may be necessary to give effect to any order under this Code, or to prevent abuse of the process of any Court or otherwise to secure the ends of justice.',
    explanation:
      'Section 482 preserves the inherent powers of the High Court. These powers can be used for three purposes: (1) to give effect to any order under CrPC; (2) to prevent abuse of the process of any court; and (3) to secure the ends of justice. This section is frequently invoked to quash FIRs, criminal proceedings, or complaints that are frivolous, vexatious, or amount to abuse of process. The Supreme Court in State of Haryana v. Bhajan Lal (1992) laid down guidelines for when these powers may be exercised.',
    punishment: '',
    category: 'Criminal',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['inherent powers', 'High Court', 'quashing', 'FIR quash', 'abuse of process', 'ends of justice', '482'],
    isRepealed: true,
    relatedSections: [
      { sectionNumber: '438', actCode: 'CrPC', title: 'Direction for grant of bail to person apprehending arrest (Anticipatory bail)' },
      { sectionNumber: '154', actCode: 'CrPC', title: 'Information in cognizable cases (FIR)' }
    ]
  }
];

// ═══════════════════════════════════════════════════════════════════
// SEED FUNCTION
// ═══════════════════════════════════════════════════════════════════
async function seedLegalData() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Clear existing legal sections
    console.log('🗑️  Clearing existing legal sections...');
    const deleteResult = await LegalSection.deleteMany({});
    console.log(`   Removed ${deleteResult.deletedCount} existing sections.\n`);

    // Combine all sections
    const allSections = [
      ...ipcSections,
      ...constitutionArticles,
      ...bnsSections,
      ...crpcSections
    ];

    console.log(`📚 Seeding ${allSections.length} legal sections...\n`);

    // Seed IPC sections
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📖 Indian Penal Code, 1860 (IPC)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    for (const section of ipcSections) {
      const doc = new LegalSection(section);
      await doc.save();
      console.log(`   ✅ IPC Section ${section.sectionNumber} — ${section.title}`);
    }
    console.log(`   📊 ${ipcSections.length} IPC sections seeded.\n`);

    // Seed Constitution articles
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📖 Constitution of India (COI)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    for (const article of constitutionArticles) {
      const doc = new LegalSection(article);
      await doc.save();
      console.log(`   ✅ Article ${article.sectionNumber} — ${article.title}`);
    }
    console.log(`   📊 ${constitutionArticles.length} Constitutional articles seeded.\n`);

    // Seed BNS sections
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📖 Bharatiya Nyaya Sanhita, 2023 (BNS)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    for (const section of bnsSections) {
      const doc = new LegalSection(section);
      await doc.save();
      console.log(`   ✅ BNS Section ${section.sectionNumber} — ${section.title}`);
    }
    console.log(`   📊 ${bnsSections.length} BNS sections seeded.\n`);

    // Seed CrPC sections
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📖 Code of Criminal Procedure, 1973 (CrPC)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    for (const section of crpcSections) {
      const doc = new LegalSection(section);
      await doc.save();
      console.log(`   ✅ CrPC Section ${section.sectionNumber} — ${section.title}`);
    }
    console.log(`   📊 ${crpcSections.length} CrPC sections seeded.\n`);

    // Summary
    console.log('═══════════════════════════════════════════');
    console.log('🎉 SEEDING COMPLETE');
    console.log('═══════════════════════════════════════════');
    console.log(`   IPC sections:         ${ipcSections.length}`);
    console.log(`   Constitutional articles: ${constitutionArticles.length}`);
    console.log(`   BNS sections:         ${bnsSections.length}`);
    console.log(`   CrPC sections:        ${crpcSections.length}`);
    console.log(`   ─────────────────────────────`);
    console.log(`   TOTAL:                ${allSections.length} sections`);
    console.log('═══════════════════════════════════════════\n');

  } catch (error) {
    console.error('❌ Error seeding legal data:', error.message);
    if (error.code === 11000) {
      console.error('   Duplicate key error — a section with the same actCode + sectionNumber already exists.');
      console.error('   Make sure the database was cleared properly before seeding.');
    }
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB.');
    process.exit(0);
  }
}

// Run the seed function
seedLegalData();
