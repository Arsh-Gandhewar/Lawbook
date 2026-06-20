// Seed script for miscellaneous Indian laws
// Run with: node server/seedMiscLaw.js

require('dotenv').config();
const mongoose = require('mongoose');
const LegalSection = require('./models/LegalSection');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lawbook';

const sections = [

  // ═══════════════════════════════════════════════════════════════════
  // Arms Act, 1959
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'Arms Act, 1959',
    actCode: 'ARMS',
    sectionNumber: '3',
    title: 'Licence for acquisition and possession of firearms and ammunition',
    legalText: '(1) No person shall acquire, have in his possession, or carry any firearm or ammunition unless he holds in this behalf a licence issued in accordance with the provisions of this Act and the rules made thereunder: Provided that a person may, without himself holding a licence, carry any firearm or ammunition in the presence, or under the written authority, of the holder of the licence for repair or for renewal of the licence or for use by such person. (2) Notwithstanding anything contained in sub-section (1), no person, other than a person referred to in sub-section (3) shall acquire, have in his possession, or carry, any prohibited arms or prohibited ammunition.',
    explanation: 'This section makes it mandatory for every person to hold a valid licence before they can buy, possess, or carry any firearm or ammunition. Without a licence, you cannot legally keep even a single gun or bullet. An exception allows someone to carry a weapon under the written authority of the licence-holder, for example for repair. Prohibited arms (like automatic weapons) are further restricted and ordinary citizens cannot possess them at all.',
    punishment: 'See Section 25 for penalties',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['arms licence', 'firearm licence', 'gun licence', 'weapon possession', 'ammunition', 'arms permit', 'firearm acquisition', 'prohibited arms'],
    relatedSections: [
      { sectionNumber: '25', actCode: 'ARMS', title: 'Punishment for certain offences' },
      { sectionNumber: '27', actCode: 'ARMS', title: 'Punishment for using arms' }
    ]
  },
  {
    act: 'Arms Act, 1959',
    actCode: 'ARMS',
    sectionNumber: '25',
    title: 'Punishment for certain offences',
    legalText: '(1) Whoever acquires, has in his possession or carries any firearm or ammunition in contravention of section 3 shall be punishable with imprisonment for a term which shall not be less than one year but which may extend to three years and shall also be liable to fine. (1A) Whoever acquires, has in his possession or carries any prohibited arms or prohibited ammunition in contravention of section 7 shall be punishable with imprisonment for a term which shall not be less than five years but which may extend to ten years, and shall also be liable to fine. (1B) Whoever acquires, has in his possession or carries any firearm or ammunition in contravention of section 3 and such firearm or ammunition— (a) has been used in the commission of any offence punishable under the Indian Penal Code (45 of 1860) or under any other law; or (b) has been acquired in contravention of section 11, shall be punishable with imprisonment for a term which shall not be less than three years but which may extend to seven years, and shall also be liable to fine.',
    explanation: 'This section prescribes punishment for possessing firearms or ammunition without a licence. For ordinary unlicensed firearms, the minimum sentence is 1 year (up to 3 years) plus fine. For prohibited arms like automatic weapons, the punishment is much harsher — minimum 5 years, up to 10 years plus fine. If the unlicensed weapon was used to commit an offence or was illegally manufactured, the sentence is minimum 3 years up to 7 years plus fine.',
    punishment: 'Unlicensed firearm: imprisonment 1-3 years and fine. Prohibited arms: imprisonment 5-10 years and fine. Weapon used in offence or illegally manufactured: imprisonment 3-7 years and fine',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['unlicensed arms', 'illegal weapon', 'arms penalty', 'gun crime', 'prohibited arms', 'firearm offence', 'weapon punishment', 'illegal possession'],
    relatedSections: [
      { sectionNumber: '3', actCode: 'ARMS', title: 'Licence for acquisition and possession of firearms' },
      { sectionNumber: '27', actCode: 'ARMS', title: 'Punishment for using arms' }
    ]
  },
  {
    act: 'Arms Act, 1959',
    actCode: 'ARMS',
    sectionNumber: '27',
    title: 'Punishment for using arms, etc.',
    legalText: '(1) Whoever uses any arms or ammunition in contravention of section 5 shall be punishable with imprisonment for a term which shall not be less than three years but which may extend to seven years and shall also be liable to fine. (2) Whoever uses any prohibited arms or prohibited ammunition in contravention of section 7 shall be punishable with imprisonment for a term which shall not be less than seven years but which may extend to imprisonment for life and shall also be liable to fine. (3) Whoever uses any arms or ammunition or does any act in contravention of section 5 and such use or act results in the death of any other person, shall be punishable with death.',
    explanation: 'This section punishes the actual use of arms, not just possession. If someone uses a weapon in violation of the Act, they face minimum 3 years (up to 7 years) imprisonment. Using prohibited arms (like automatic weapons or bombs) carries a minimum 7 years up to life imprisonment. The harshest punishment applies when use of an illegal weapon causes death — the offender can receive the death penalty. This is one of the most severe penal provisions in Indian criminal law.',
    punishment: 'Use of arms: imprisonment 3-7 years and fine. Prohibited arms: imprisonment 7 years to life and fine. Use resulting in death: death penalty',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['use of arms', 'gun use', 'weapon use', 'arms offence', 'shooting', 'prohibited arms use', 'death penalty arms', 'firearms crime'],
    relatedSections: [
      { sectionNumber: '3', actCode: 'ARMS', title: 'Licence for acquisition and possession of firearms' },
      { sectionNumber: '25', actCode: 'ARMS', title: 'Punishment for certain offences' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // Wildlife (Protection) Act, 1972
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'Wildlife (Protection) Act, 1972',
    actCode: 'WLPA',
    sectionNumber: '9',
    title: 'Prohibition of hunting',
    legalText: 'No person shall hunt any wild animal specified in Schedule I, Schedule II, Schedule III and Schedule IV except as provided under section 11 and section 12.',
    explanation: 'This section imposes a blanket ban on hunting any wild animal listed in the four Schedules of the Act. Schedule I animals (like tigers, elephants, rhinoceros, and certain birds) have the highest level of protection. Schedules II-IV cover other protected species. The only exceptions are under Section 11 (hunting permitted in self-defence, or when an animal becomes dangerous to human life, or for scientific research with the Chief Wildlife Warden\'s permission) and Section 12 (capture or collection for research or education). This is the cornerstone provision for wildlife conservation in India.',
    punishment: 'See Section 51 for penalties',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['hunting ban', 'poaching', 'wildlife protection', 'wild animals', 'tiger protection', 'endangered species', 'Schedule I animals', 'wildlife hunting', 'protected species'],
    relatedSections: [
      { sectionNumber: '51', actCode: 'WLPA', title: 'Penalties' }
    ]
  },
  {
    act: 'Wildlife (Protection) Act, 1972',
    actCode: 'WLPA',
    sectionNumber: '51',
    title: 'Penalties',
    legalText: '(1) Any person who contravenes any provision of this Act except Chapter VA and section 38J, or any rule or order made thereunder, or who commits a breach of any of the conditions of any licence or permit granted under this Act, shall, if no express provision is made in this behalf in this Act, be punishable with imprisonment for a term which may extend to three years, or with fine which may extend to twenty-five thousand rupees, or with both: Provided that where the offence committed is in relation to any animal specified in Schedule I or Part II of Schedule II, or meat of any such animal or animal article, trophy or uncured trophy derived from such animal or where the offence relates to hunting in a sanctuary or a national park or altering the boundaries of a sanctuary or a national park, the offence shall be punishable with imprisonment for a term which shall not be less than three years but which may extend to seven years and also with fine which shall not be less than ten thousand rupees.',
    explanation: 'This section lays down punishments for violating the Wildlife Protection Act. For general offences, the punishment is up to 3 years imprisonment, or up to Rs 25,000 fine, or both. However, for offences involving Schedule I or Schedule II (Part II) animals (like tigers, lions, elephants, rhinoceros), or hunting inside a sanctuary or national park, the punishment is much harsher — minimum 3 years (up to 7 years) imprisonment and minimum Rs 10,000 fine. Repeat offenders face enhanced penalties. This graded punishment system ensures the most endangered species get the strongest legal protection.',
    punishment: 'General offence: imprisonment up to 3 years, or fine up to Rs 25,000, or both. Schedule I/II animals or hunting in sanctuary/national park: imprisonment 3-7 years and fine of not less than Rs 10,000',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['poaching penalty', 'wildlife penalty', 'hunting punishment', 'wildlife crime', 'animal protection', 'national park offence', 'sanctuary offence', 'wildlife fine', 'tiger poaching'],
    relatedSections: [
      { sectionNumber: '9', actCode: 'WLPA', title: 'Prohibition of hunting' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // Food Safety and Standards Act, 2006
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'Food Safety and Standards Act, 2006',
    actCode: 'FSSA',
    sectionNumber: '3',
    title: 'Definitions',
    legalText: '(1) In this Act, unless the context otherwise requires,— (j) "food" means any substance, whether processed, partially processed or unprocessed, which is intended for human consumption and includes primary food, genetically modified or engineered food or food containing such ingredients, infant food, packaged drinking water, alcoholic drink, chewing gum, and any substance, including water used into the food during its manufacture, preparation or treatment but does not include any animal feed, live animals unless they are prepared or processed for placing on the market for human consumption, plants prior to harvesting, drugs and medicinal products, cosmetics, narcotic or psychotropic substances; (n) "food business" means any undertaking, whether for profit or not and whether public or private, carrying out any of the activities related to any stage of manufacture, processing, packaging, storage, transportation, distribution of food, import and includes food services, catering services, sale of food or food ingredients; (o) "food business operator" means a person by whom the food business is carried on and who is responsible for ensuring the compliance of this Act, rules and regulations made thereunder.',
    explanation: 'This section defines key terms used throughout the Food Safety Act. "Food" is defined very broadly — it covers anything meant for human consumption, including processed and unprocessed food, packaged water, alcoholic drinks, and even chewing gum. But it excludes animal feed, live animals, unharvested plants, drugs, and cosmetics. "Food business" covers every stage from manufacturing to selling, whether for profit or not. A "food business operator" is the person responsible for the business and for ensuring legal compliance. These definitions determine who falls under the Act\'s regulatory framework.',
    punishment: '',
    category: 'Criminal',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['food definition', 'food business', 'food operator', 'FSSAI', 'food safety', 'food business operator', 'food regulation', 'packaged food'],
    relatedSections: [
      { sectionNumber: '26', actCode: 'FSSA', title: 'Restrictions on import and sale' },
      { sectionNumber: '59', actCode: 'FSSA', title: 'Punishment for unsafe food' }
    ]
  },
  {
    act: 'Food Safety and Standards Act, 2006',
    actCode: 'FSSA',
    sectionNumber: '26',
    title: 'Restrictions on import and sale of certain articles of food',
    legalText: '(1) No person shall manufacture, distribute, sell or import any article of food— (i) which is unsafe; (ii) which is misbranded; (iii) which is not of the nature or substance or quality which it purports or is represented to be; (iv) for which a licence is required under any other law for the time being in force, except in accordance with the conditions of the licence; (v) which is for the time being prohibited by the Food Authority or the Central Government in the interest of public health; (vi) which contravenes any other provision of this Act or of any rule or regulation made thereunder.',
    explanation: 'This section prohibits the manufacture, distribution, sale or import of food that is unsafe, misbranded, or not of the quality claimed. It also bans food that violates any other provision of the Act, food prohibited by the Food Authority (FSSAI) or Central Government in public interest, and food sold without required licences. Essentially, every food product in the market must be safe, properly labelled, and meet quality standards. This is the primary consumer protection provision in food law.',
    punishment: 'Depends on the specific violation — see Sections 50-67 for various penalties',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'Yes',
    keywords: ['food safety', 'food import', 'misbranded food', 'unsafe food', 'adulterated food', 'food sale restriction', 'FSSAI regulation', 'food quality'],
    relatedSections: [
      { sectionNumber: '3', actCode: 'FSSA', title: 'Definitions' },
      { sectionNumber: '59', actCode: 'FSSA', title: 'Punishment for unsafe food' }
    ]
  },
  {
    act: 'Food Safety and Standards Act, 2006',
    actCode: 'FSSA',
    sectionNumber: '59',
    title: 'Punishment for unsafe food',
    legalText: '(1) Any person who, whether by himself or by any other person on his behalf, manufactures for sale, or stores or sells or distributes or imports any article of food for human consumption which is unsafe, shall be punishable,— (i) where such failure or contravention does not result in injury, with imprisonment for a term which may extend to six months and also with fine which may extend to one lakh rupees; (ii) where such failure or contravention results in a non-grievous injury, with imprisonment for a term which may extend to one year and also with fine which may extend to three lakh rupees; (iii) where such failure or contravention results in a grievous injury, with imprisonment for a term which may extend to six years and also with fine which may extend to five lakh rupees; (iv) where such failure or contravention results in death, with imprisonment for a term which shall not be less than seven years but which may extend to imprisonment for life and also with fine which shall not be less than ten lakh rupees.',
    explanation: 'This section prescribes a graded system of punishment for selling unsafe food, based on the harm caused. If no one is hurt, the punishment is up to 6 months jail and up to Rs 1 lakh fine. If someone suffers a non-serious injury, it goes up to 1 year and Rs 3 lakh fine. For grievous injury, up to 6 years and Rs 5 lakh fine. The harshest punishment is reserved for cases where unsafe food causes death — minimum 7 years (up to life imprisonment) and minimum Rs 10 lakh fine. This progressive penalty structure reflects the principle that punishment should be proportional to harm.',
    punishment: 'No injury: up to 6 months and up to Rs 1 lakh fine. Non-grievous injury: up to 1 year and up to Rs 3 lakh fine. Grievous injury: up to 6 years and up to Rs 5 lakh fine. Death: 7 years to life imprisonment and minimum Rs 10 lakh fine',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['unsafe food', 'food adulteration', 'food poisoning', 'food penalty', 'food crime', 'food death', 'contaminated food', 'food safety punishment'],
    relatedSections: [
      { sectionNumber: '3', actCode: 'FSSA', title: 'Definitions' },
      { sectionNumber: '26', actCode: 'FSSA', title: 'Restrictions on import and sale' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // National Green Tribunal Act, 2010
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'National Green Tribunal Act, 2010',
    actCode: 'NGT',
    sectionNumber: '14',
    title: 'Tribunal to settle disputes',
    legalText: '(1) The Tribunal shall have the jurisdiction over all civil cases where a substantial question relating to environment (including enforcement of any legal right relating to environment), is involved and such question arises out of the implementation of the enactments specified in Schedule I. (2) The Tribunal shall hear the disputes arising from the questions referred to in sub-section (1) and settle such disputes and pass order thereon. (3) No application for adjudication of dispute under this section shall be entertained by the Tribunal unless it is made within a period of six months from the date on which the cause of action for such dispute first arose: Provided that the Tribunal may, if it is satisfied that the applicant was prevented by sufficient cause from filing the application within the said period, allow it to be filed within a further period not exceeding sixty days, but not thereafter.',
    explanation: 'This section gives the National Green Tribunal (NGT) jurisdiction over all civil disputes involving a substantial question related to the environment. This includes cases about enforcement of environmental rights under laws listed in Schedule I of the Act — such as the Environment Protection Act, Water Act, Air Act, Forest Conservation Act, Biological Diversity Act, and Public Liability Insurance Act. Any person aggrieved by an environmental issue can file an application before the NGT. The limitation period is 6 months from when the cause of action arose, with a possible extension of 60 days if sufficient cause is shown.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['NGT', 'environmental dispute', 'green tribunal', 'environment jurisdiction', 'environmental case', 'pollution dispute', 'environmental litigation', 'Schedule I'],
    relatedSections: [
      { sectionNumber: '15', actCode: 'NGT', title: 'Relief, compensation and restitution' },
      { sectionNumber: '16', actCode: 'NGT', title: 'Tribunal to apply certain principles' }
    ]
  },
  {
    act: 'National Green Tribunal Act, 2010',
    actCode: 'NGT',
    sectionNumber: '15',
    title: 'Relief, compensation and restitution',
    legalText: '(1) The Tribunal may, by an order, provide,— (a) relief and compensation to the victims of pollution and other environmental damage arising under the enactments specified in the Schedule I (including accident occurring while handling any hazardous substance); (b) for restitution of property damaged; (c) for restitution of the environment for such area or areas, as the Tribunal may think fit. (2) The relief and compensation and restitution of property and environment referred to in clauses (a), (b) and (c) of sub-section (1) shall be in addition to the relief paid or payable under the Public Liability Insurance Act, 1991. (3) No application for grant of any compensation or relief or restitution of property or environment under this section shall be entertained by the Tribunal unless it is made within a period of five years from the date on which the cause for such compensation or relief first arose: Provided that the Tribunal may, if it is satisfied that the applicant was prevented by sufficient cause from filing the application within the said period, allow it to be filed within a further period not exceeding sixty days, but not thereafter.',
    explanation: 'This section empowers the NGT to award three types of remedies: (1) compensation to victims of pollution or environmental damage, including accidents involving hazardous substances; (2) restitution of damaged property; and (3) restoration of the damaged environment. These remedies are in addition to any relief available under the Public Liability Insurance Act. The limitation period for compensation claims is 5 years from the date the cause of action arose, with a possible 60-day extension. This allows the NGT to both compensate victims and order clean-up or restoration of polluted areas.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['environmental compensation', 'pollution compensation', 'environmental restitution', 'NGT relief', 'environmental damage', 'hazardous substance', 'property restitution', 'environment restoration'],
    relatedSections: [
      { sectionNumber: '14', actCode: 'NGT', title: 'Tribunal to settle disputes' },
      { sectionNumber: '16', actCode: 'NGT', title: 'Tribunal to apply certain principles' }
    ]
  },
  {
    act: 'National Green Tribunal Act, 2010',
    actCode: 'NGT',
    sectionNumber: '16',
    title: 'Tribunal to apply certain principles',
    legalText: 'The Tribunal shall, while passing any order or decision or award, apply the principles of sustainable development, the precautionary principle and the polluter pays principle.',
    explanation: 'This section mandates the NGT to apply three internationally recognized environmental law principles in every case: (1) Sustainable development — balancing economic growth with environmental protection so future generations are not harmed; (2) Precautionary principle — where there is a threat of serious environmental damage, lack of full scientific certainty shall not be used as a reason for postponing measures to prevent degradation; (3) Polluter pays principle — the person or entity causing pollution must bear the cost of remediation and compensation. These principles are drawn from international environmental law (Rio Declaration, 1992) and guide the NGT in all its decisions.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['sustainable development', 'precautionary principle', 'polluter pays', 'NGT principles', 'environmental principles', 'environmental justice', 'Rio Declaration'],
    relatedSections: [
      { sectionNumber: '14', actCode: 'NGT', title: 'Tribunal to settle disputes' },
      { sectionNumber: '15', actCode: 'NGT', title: 'Relief, compensation and restitution' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // Maintenance and Welfare of Parents and Senior Citizens Act, 2007
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'Maintenance and Welfare of Parents and Senior Citizens Act, 2007',
    actCode: 'MWPSC',
    sectionNumber: '4',
    title: 'Maintenance of parents and senior citizens',
    legalText: '(1) A senior citizen including parent who is unable to maintain himself from his own earning or property owned by him, shall be entitled to make an application under section 5 in case of— (i) parent or grandparent, against one or more of his children not being a minor; (ii) a childless senior citizen, against such of his relative referred to in clause (h) of section 2. (2) The obligation of the children or relative, as the case may be, to maintain a senior citizen extends to the needs of such citizen so that senior citizen may lead a normal life. (3) The obligation of the children to maintain his or her parent extends to the needs of such parent either father or mother or both, as the case may be, so that such parent may lead a normal life. (4) Any person being a relative of a senior citizen and having sufficient means shall maintain such senior citizen provided he is in possession of the property of such senior citizen or he would inherit the property of such senior citizen.',
    explanation: 'This section establishes the legal right of parents and senior citizens to claim maintenance from their children or relatives. A parent (of any age) can claim maintenance from adult children, and a childless senior citizen can claim from relatives who possess or would inherit their property. The maintenance must be sufficient for a normal life, covering basic needs like food, clothing, shelter, and medical care. This law ensures elderly persons are not abandoned or left destitute by their families.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['senior citizen maintenance', 'parent maintenance', 'elderly care', 'old age support', 'maintenance obligation', 'children duty', 'senior citizen rights', 'parent support'],
    relatedSections: [
      { sectionNumber: '5', actCode: 'MWPSC', title: 'Application for maintenance' },
      { sectionNumber: '24', actCode: 'MWPSC', title: 'Abandonment of senior citizen' }
    ]
  },
  {
    act: 'Maintenance and Welfare of Parents and Senior Citizens Act, 2007',
    actCode: 'MWPSC',
    sectionNumber: '5',
    title: 'Application for maintenance',
    legalText: '(1) An application for maintenance under section 4, may be made— (a) by a senior citizen or a parent, as the case may be; or (b) if he is incapable, by any other person or organisation authorised by him; or (c) the Tribunal may take cognizance suo motu. (2) The Maintenance Tribunal may, during the pendency of the proceeding regarding monthly allowance for the maintenance under this section, order such children or relative to make a monthly allowance for the interim maintenance of such senior citizen including parent and to pay the same to such senior citizen including parent as the Tribunal may from time to time direct. (3) On receipt of the application for maintenance under sub-section (1), after giving notice of the application to the children or relative and after giving the parties an opportunity of being heard, the Tribunal may make an order for maintenance.',
    explanation: 'This section lays down the procedure for claiming maintenance. A senior citizen or parent can file an application before the Maintenance Tribunal. If they are incapable (due to illness, disability, etc.), any authorised person or organisation can file on their behalf. Importantly, the Tribunal can also take up cases on its own (suo motu). The Tribunal can order interim maintenance (monthly allowance during the pendency of proceedings) to provide immediate relief. After hearing both sides, the Tribunal passes a final maintenance order. The process is designed to be simple, quick, and senior-citizen-friendly.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['maintenance application', 'maintenance tribunal', 'senior citizen tribunal', 'interim maintenance', 'maintenance procedure', 'elderly maintenance claim', 'suo motu maintenance'],
    relatedSections: [
      { sectionNumber: '4', actCode: 'MWPSC', title: 'Maintenance of parents and senior citizens' },
      { sectionNumber: '24', actCode: 'MWPSC', title: 'Abandonment of senior citizen' }
    ]
  },
  {
    act: 'Maintenance and Welfare of Parents and Senior Citizens Act, 2007',
    actCode: 'MWPSC',
    sectionNumber: '24',
    title: 'Exposure and abandonment of senior citizen',
    legalText: 'Whoever, having the care or protection of a senior citizen, leaves such senior citizen in any place with the intention of wholly abandoning such senior citizen, shall be punishable with imprisonment of either description for a term which may extend to three months or with fine which may extend to five thousand rupees or with both.',
    explanation: 'This section criminalises the abandonment of senior citizens. If a person who has the duty to care for a senior citizen deliberately abandons them, they can be punished with up to 3 months imprisonment, or a fine of up to Rs 5,000, or both. This applies to family members or any person who has taken on the responsibility of caring for the elderly person. The provision is meant to deter families from abandoning their elderly members in old age homes, hospitals, or public places.',
    punishment: 'Imprisonment up to 3 months, or fine up to Rs 5,000, or both',
    category: 'Criminal',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['abandon senior citizen', 'elderly abandonment', 'senior citizen abuse', 'parent abandonment', 'elderly neglect', 'old age abandonment', 'senior citizen crime'],
    relatedSections: [
      { sectionNumber: '4', actCode: 'MWPSC', title: 'Maintenance of parents and senior citizens' },
      { sectionNumber: '5', actCode: 'MWPSC', title: 'Application for maintenance' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // Mental Healthcare Act, 2017
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'Mental Healthcare Act, 2017',
    actCode: 'MHA2017',
    sectionNumber: '3',
    title: 'Mental illness',
    legalText: '(1) "Mental illness" means a substantial disorder of thinking, mood, perception, orientation or memory that grossly impairs judgment, behaviour, capacity to recognise reality or ability to meet the ordinary demands of life, mental conditions associated with the abuse of alcohol and drugs, but does not include mental retardation which is a condition of arrested or incomplete development of mind of a person, specially characterised by sub-normality of intelligence. (2) For the purposes of this Act, a person shall be deemed to be a "person with mental illness" if he is having a mental illness as defined in this section.',
    explanation: 'This section defines "mental illness" for the purposes of the Act. It covers substantial disorders of thinking, mood, perception, orientation or memory that seriously affect a person\'s ability to function normally, including conditions arising from substance abuse. However, intellectual disability (mental retardation) is specifically excluded from this definition — it is governed by the Rights of Persons with Disabilities Act, 2016 instead. This definition is important because it determines who is eligible for the rights and protections provided under this Act.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['mental illness', 'mental health', 'mental disorder', 'psychiatric illness', 'mental healthcare', 'substance abuse', 'mental condition', 'psychological disorder'],
    relatedSections: [
      { sectionNumber: '18', actCode: 'MHA2017', title: 'Right to access mental healthcare' },
      { sectionNumber: '21', actCode: 'MHA2017', title: 'Right to community living' }
    ]
  },
  {
    act: 'Mental Healthcare Act, 2017',
    actCode: 'MHA2017',
    sectionNumber: '18',
    title: 'Right to access mental healthcare and treatment',
    legalText: '(1) Every person shall have a right to access mental healthcare and treatment from mental health services run or funded by the appropriate Government. (2) The appropriate Government shall make provision for acute mental healthcare services in the community that are accessible and affordable and of good quality and available in sufficient quantity. (3) The appropriate Government shall provide, as far as possible, mental health services of such nature and in such manner that persons with mental illness are not required to travel long distances to access such services. (4) The appropriate Government shall endeavour to provide a range of mental health services, including— (a) community based rehabilitation establishments; (b) half-way homes; (c) sheltered accommodation.',
    explanation: 'This section establishes a fundamental right of every person to access mental healthcare and treatment from government-run or government-funded services. The government is obligated to provide acute mental healthcare services that are accessible, affordable, of good quality, and available in sufficient quantity, close to where people live. The government must also provide a range of support services including community rehabilitation centres, halfway homes, and sheltered accommodation. This marks a significant shift from a custodial approach to a rights-based approach to mental health in India.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['mental healthcare right', 'mental health access', 'psychiatric treatment', 'mental health services', 'community mental health', 'affordable healthcare', 'mental health rehabilitation', 'halfway home'],
    relatedSections: [
      { sectionNumber: '3', actCode: 'MHA2017', title: 'Mental illness definition' },
      { sectionNumber: '21', actCode: 'MHA2017', title: 'Right to community living' }
    ]
  },
  {
    act: 'Mental Healthcare Act, 2017',
    actCode: 'MHA2017',
    sectionNumber: '21',
    title: 'Right to community living',
    legalText: '(1) Every person with mental illness shall have a right to live in, be part of and not be segregated from society. (2) The appropriate Government shall take appropriate measures to provide support to persons with mental illness for living in the community including measures to— (a) provide for a range of domiciliary and residential services for persons with mental illness of adequate quality in the community, including half-way homes, group homes, community rehabilitation establishments and sheltered accommodation; (b) provide support for families of persons with mental illness by way of information sharing, guidance, counselling and other services.',
    explanation: 'This section guarantees every person with mental illness the right to live within the community rather than being locked away in institutions. The government must provide support services so that mentally ill persons can live in society, including halfway homes, group homes, community rehabilitation centres, and sheltered accommodation. Families of persons with mental illness must also receive support through information, guidance, and counselling. This provision reflects the global trend of deinstitutionalisation — moving away from keeping mentally ill persons in asylums toward integrating them into the community.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['community living', 'mental illness rights', 'deinstitutionalisation', 'mental health community', 'group home', 'sheltered accommodation', 'mental health rehabilitation', 'social integration'],
    relatedSections: [
      { sectionNumber: '3', actCode: 'MHA2017', title: 'Mental illness definition' },
      { sectionNumber: '18', actCode: 'MHA2017', title: 'Right to access mental healthcare' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // Right of Children to Free and Compulsory Education Act, 2009
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'Right of Children to Free and Compulsory Education Act, 2009',
    actCode: 'RTE',
    sectionNumber: '3',
    title: 'Right of child to free and compulsory education',
    legalText: '(1) Every child of the age of six to fourteen years shall have a right to free and compulsory education in a neighbourhood school till completion of elementary education. (2) For the purpose of sub-section (1), no child shall be liable to pay any kind of fee or charges or expenses which may prevent him or her from pursuing and completing the elementary education: Provided that a child suffering from disability, as defined in clause (i) of section 2 of the Persons with Disabilities (Equal Opportunities, Protection of Rights and Full Participation) Act, 1995 (1 of 1996), shall have the right to pursue free and compulsory elementary education in accordance with the provisions of Chapter V of the said Act.',
    explanation: 'This is the core provision of the RTE Act, giving every child between ages 6 and 14 a fundamental right to free and compulsory education in a neighbourhood school till they complete elementary education (Class 8). "Free" means no child has to pay any fee, charge or expense. "Compulsory" means the government is obligated to ensure every child is enrolled, attends and completes elementary education. Children with disabilities have the same right, to be exercised under the Persons with Disabilities Act. This right flows from Article 21A of the Constitution, which was inserted by the 86th Amendment.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['free education', 'compulsory education', 'child education', 'elementary education', 'right to education', 'RTE', 'neighbourhood school', 'Article 21A', 'child rights'],
    relatedSections: [
      { sectionNumber: '4', actCode: 'RTE', title: 'Special provision for children not admitted to school' },
      { sectionNumber: '8', actCode: 'RTE', title: 'Duties of parents and guardian' },
      { sectionNumber: '12', actCode: 'RTE', title: 'Extent of school responsibility for free education' }
    ]
  },
  {
    act: 'Right of Children to Free and Compulsory Education Act, 2009',
    actCode: 'RTE',
    sectionNumber: '4',
    title: 'Special provision for children not admitted to, or who have not completed, elementary education',
    legalText: 'Where a child above six years of age has not been admitted in any school or though admitted, could not complete his or her elementary education, then, he or she shall be admitted in a class appropriate to his or her age: Provided that where a child is directly admitted in a class appropriate to his or her age, then, he or she shall, in order to be at par with others, have a right to receive special training, in such manner, and within such time-limits, as may be prescribed: Provided further that a child so admitted to elementary education shall be entitled to free education till completion of elementary education even after fourteen years of age.',
    explanation: 'This section addresses children who have never been enrolled in school or who dropped out. Such children must be admitted to a class appropriate to their age, not forced to start from Class 1. They are entitled to special training to bring them up to the level of other children. Importantly, even if such a child crosses 14 years of age during their elementary education, they continue to receive free education until they complete it. This ensures that age is not a barrier and that no child is denied education because they started late.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['age appropriate admission', 'out of school children', 'special training', 'dropout children', 'elementary education', 'school admission', 'education right', 'never enrolled'],
    relatedSections: [
      { sectionNumber: '3', actCode: 'RTE', title: 'Right of child to free and compulsory education' },
      { sectionNumber: '8', actCode: 'RTE', title: 'Duties of parents and guardian' }
    ]
  },
  {
    act: 'Right of Children to Free and Compulsory Education Act, 2009',
    actCode: 'RTE',
    sectionNumber: '8',
    title: 'Duties of appropriate Government',
    legalText: 'It shall be the duty of every parent or guardian to admit or cause to be admitted his or her child or ward, as the case may be, to an elementary education in the neighbourhood school.',
    explanation: 'This section places a duty on parents and guardians to ensure their children are admitted to and attend elementary school. While the RTE Act makes education a right for children and an obligation for the government, parents also share the responsibility. They must ensure their child is enrolled in a neighbourhood school. However, the Act does not prescribe any punishment for parents who fail to do so — the emphasis is on facilitation and persuasion rather than penalisation of parents, many of whom may be poor or illiterate themselves.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['parent duty', 'guardian duty', 'school admission', 'elementary school', 'child enrollment', 'compulsory enrollment', 'education responsibility'],
    relatedSections: [
      { sectionNumber: '3', actCode: 'RTE', title: 'Right of child to free and compulsory education' },
      { sectionNumber: '12', actCode: 'RTE', title: 'Extent of school responsibility for free education' }
    ]
  },
  {
    act: 'Right of Children to Free and Compulsory Education Act, 2009',
    actCode: 'RTE',
    sectionNumber: '12',
    title: 'Extent of school\'s responsibility for free and compulsory education',
    legalText: '(1) For the purposes of this Act, the extent of school\'s responsibility for free and compulsory education shall be— (b) every aided school receiving aid or grants to meet whole or part of its expenses from the appropriate Government or the local authority, shall provide free and compulsory elementary education to such proportion of children admitted therein as its annual recurring aid or grants so received bears to its annual recurring expenses, subject to a minimum of twenty-five per cent; (c) every unaided school not receiving any kind of aid or grants to meet its expenses from the appropriate Government or the local authority, shall admit in class I, to the extent of at least twenty-five per cent of the strength of that class, children belonging to weaker section and disadvantaged group in the neighbourhood and provide free and compulsory elementary education till its completion.',
    explanation: 'This is the landmark 25% reservation provision. Every private unaided school must reserve at least 25% of seats in Class I for children from economically weaker sections (EWS) and disadvantaged groups in the neighbourhood, and provide them free education till Class 8. Government-aided schools must also provide free seats in proportion to the aid received, with a minimum of 25%. The school is reimbursed by the government for these seats. This provision was upheld by the Supreme Court in Society for Un-aided Private Schools of Rajasthan v. Union of India (2012), though it was held not applicable to minority institutions.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['25 percent reservation', 'EWS quota', 'private school reservation', 'weaker section', 'disadvantaged group', 'free education', 'school admission quota', 'RTE reservation', 'unaided school'],
    relatedSections: [
      { sectionNumber: '3', actCode: 'RTE', title: 'Right of child to free and compulsory education' },
      { sectionNumber: '4', actCode: 'RTE', title: 'Special provision for children not admitted to school' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // Legal Services Authorities Act, 1987
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'Legal Services Authorities Act, 1987',
    actCode: 'LSAA',
    sectionNumber: '12',
    title: 'Criteria for giving legal services',
    legalText: 'Every person who has to file or defend a case shall be entitled to legal services under this Act if that person is— (a) a member of a Scheduled Caste or Scheduled Tribe; (b) a victim of trafficking in human beings or begar as referred to in Article 23 of the Constitution; (c) a woman or a child; (d) a person with disability as defined in clause (i) of section 2 of the Persons with Disabilities (Equal Opportunities, Protection of Rights and Full Participation) Act, 1995 (1 of 1996); (e) a person under circumstances of undeserved want such as being a victim of a mass disaster, ethnic violence, caste atrocity, flood, drought, earthquake or industrial disaster; or (f) an industrial workman; or (g) in custody, including custody in a protective home within the meaning of clause (g) of section 2 of the Immoral Traffic (Prevention) Act, 1956 (104 of 1956), or in a juvenile justice home within the meaning of clause (j) of section 2 of the Juvenile Justice Act, 1986, or in a psychiatric hospital or psychiatric nursing home within the meaning of clause (g) of section 2 of the Mental Health Act, 1987 (14 of 1987); or (h) in receipt of annual income less than rupees nine thousand or such other higher amount as may be prescribed by the State Government, if the case is before a court other than the Supreme Court, and less than rupees twelve thousand or such other higher amount as may be prescribed by the Central Government, if the case is before the Supreme Court.',
    explanation: 'This section lists who is entitled to free legal aid. The categories include: SC/ST members, trafficking victims, all women and children, persons with disabilities, victims of mass disasters or ethnic violence, industrial workers, persons in custody (including juvenile homes, protective homes, and psychiatric hospitals), and persons below a specified income threshold. The income limit has been raised by notifications over the years. Essentially, any person from a marginalised or vulnerable group who needs to file or defend a court case can get free legal services — including a free lawyer, court fees, and other litigation expenses.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['free legal aid', 'legal services', 'legal aid eligibility', 'free lawyer', 'SC ST legal aid', 'women legal aid', 'poor legal aid', 'NALSA', 'legal assistance', 'right to legal aid'],
    relatedSections: [
      { sectionNumber: '13', actCode: 'LSAA', title: 'Entitlement to legal services' }
    ]
  },
  {
    act: 'Legal Services Authorities Act, 1987',
    actCode: 'LSAA',
    sectionNumber: '13',
    title: 'Entitlement to legal services',
    legalText: '(1) Persons who satisfy all or any of the criteria specified in section 12 shall be entitled to receive legal services provided that the concerned Authority is satisfied that such person has a prima facie case to prosecute or to defend. (2) An affidavit made by a person as to his income may be regarded as sufficient for making him eligible to the entitlement of legal services under this Act unless the concerned Authority has reason to disbelieve such affidavit.',
    explanation: 'This section explains how people actually get legal services. A person who falls under any of the categories in Section 12 is entitled to legal aid, but the Legal Services Authority must first be satisfied that the person has a genuine (prima facie) case. This is a basic screening mechanism to prevent misuse. To prove income eligibility, a simple affidavit (self-declaration) about income is sufficient — the Authority will accept it unless there is reason to doubt it. This makes the process simple and accessible, without requiring elaborate income proof documents.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['legal services entitlement', 'legal aid process', 'prima facie case', 'income affidavit', 'legal aid application', 'NALSA services', 'free legal representation'],
    relatedSections: [
      { sectionNumber: '12', actCode: 'LSAA', title: 'Criteria for giving legal services' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // Essential Commodities Act, 1955
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'Essential Commodities Act, 1955',
    actCode: 'ECA',
    sectionNumber: '3',
    title: 'Powers to control production, supply, distribution, etc., of essential commodities',
    legalText: '(1) If the Central Government is of opinion that it is necessary or expedient so to do for maintaining or increasing supplies of any essential commodity or for securing their equitable distribution and availability at fair prices, or for securing any essential commodity for the defence of India or the efficient conduct of military operations, it may, by order, provide for regulating or prohibiting the production, supply and distribution thereof and trade and commerce therein. (2) Without prejudice to the generality of the powers conferred by sub-section (1), an order made thereunder may provide— (a) for regulating by licences, permits or otherwise the production, or manufacture of any essential commodity; (b) for bringing under cultivation any waste or arable land; (c) for controlling the price at which any essential commodity may be bought or sold; (d) for regulating by licences, permits or otherwise the storage, transport, distribution, disposal, acquisition, use or consumption of, any essential commodity; (e) for prohibiting the withholding from sale of any essential commodity ordinarily kept for sale; (f) for requiring any person holding in stock, or engaged in the production, or in the business of buying or selling, of any essential commodity to sell the whole or a specified part of the quantity held in stock or produced or received by him at a price not exceeding the maximum price fixed by the order.',
    explanation: 'This is the main empowering section of the Essential Commodities Act. It gives the Central Government broad powers to regulate or prohibit the production, supply and distribution of essential commodities to ensure adequate supply, equitable distribution and fair prices. The government can fix prices, regulate storage and transport, require compulsory sale of stocks, and even require waste land to be brought under cultivation. Essential commodities include foodstuffs, drugs, fertilizers, textiles, petroleum products, etc. This Act is frequently used during shortages to prevent hoarding and black-marketing.',
    punishment: 'See Section 7 for penalties',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['essential commodities', 'price control', 'hoarding', 'black market', 'supply control', 'food supply', 'rationing', 'stock control', 'distribution control', 'fair price'],
    relatedSections: [
      { sectionNumber: '7', actCode: 'ECA', title: 'Penalties' }
    ]
  },
  {
    act: 'Essential Commodities Act, 1955',
    actCode: 'ECA',
    sectionNumber: '7',
    title: 'Penalties',
    legalText: '(1) If any person contravenes any order made under section 3,— (a) he shall be punishable,— (i) in the case of an order made with reference to clause (h) or clause (i) of sub-section (2) of that section, with imprisonment for a term which may extend to one year and shall also be liable to fine; and (ii) in the case of any other order, with imprisonment for a term which shall not be less than three months but which may extend to seven years and shall also be liable to fine: Provided that the court may, for any adequate and special reasons to be mentioned in the judgment, impose a sentence of imprisonment for a term of less than three months.',
    explanation: 'This section prescribes punishment for violating orders made under the Essential Commodities Act. For most violations (like hoarding, black-marketing, violating price controls), the punishment is imprisonment of minimum 3 months up to 7 years plus fine. The court can reduce the sentence below the 3-month minimum only if it records adequate and special reasons in the judgment. For violations of certain specific clauses (relating to cotton textiles), the punishment is lighter — up to 1 year plus fine. The severity of punishment reflects the public interest in preventing profiteering during times of scarcity.',
    punishment: 'General violation: imprisonment 3 months to 7 years and fine. Specific clause violations: imprisonment up to 1 year and fine',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['hoarding penalty', 'black market punishment', 'essential commodity crime', 'price violation', 'stock hoarding', 'commodity offence', 'profiteering', 'essential goods penalty'],
    relatedSections: [
      { sectionNumber: '3', actCode: 'ECA', title: 'Powers to control production, supply and distribution' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // Bonded Labour System (Abolition) Act, 1976
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'Bonded Labour System (Abolition) Act, 1976',
    actCode: 'BLA',
    sectionNumber: '4',
    title: 'Abolition of bonded labour system',
    legalText: '(1) On the commencement of this Act, the bonded labour system shall stand abolished and every bonded labourer shall, on such commencement, stand freed and discharged from any obligation to render any bonded labour. (2) After the commencement of this Act, no person shall— (a) make any advance under, or in pursuance of, the bonded labour system, or (b) compel any person to render any bonded labour or other form of forced labour.',
    explanation: 'This section abolishes the bonded labour system entirely with immediate effect. From the commencement of this Act, every person held in bonded labour is automatically freed and discharged from any obligation to work as bonded labour. No one can give advances to create bonded labour relationships, and no one can compel another person to perform bonded labour or any form of forced labour. This provision implements Article 23 of the Constitution, which prohibits traffic in human beings and forced labour. The bonded labourer is freed regardless of any outstanding debt or advance.',
    punishment: 'See Section 16 for penalties',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['bonded labour', 'forced labour', 'debt bondage', 'bonded labourer', 'labour abolition', 'slave labour', 'Article 23', 'unfree labour', 'indentured labour'],
    relatedSections: [
      { sectionNumber: '16', actCode: 'BLA', title: 'Punishment for enforcement of bonded labour' }
    ]
  },
  {
    act: 'Bonded Labour System (Abolition) Act, 1976',
    actCode: 'BLA',
    sectionNumber: '16',
    title: 'Punishment for enforcement of bonded labour',
    legalText: 'Whoever, after the commencement of this Act, compels any person to render any bonded labour shall be punishable with imprisonment for a term which may extend to three years and also with fine which may extend to two thousand rupees.',
    explanation: 'This section prescribes punishment for anyone who forces another person to work as bonded labour after the Act came into force. The punishment is imprisonment up to 3 years and a fine up to Rs 2,000. This applies to landlords, money-lenders, employers, or any person who compels someone to work in bondage, whether through debt, custom, or coercion. While the fine amount is low (reflecting the 1976 era), the imprisonment provision makes this a serious criminal offence. The offence is cognizable and non-bailable, allowing police to arrest without a warrant.',
    punishment: 'Imprisonment up to 3 years and fine up to Rs 2,000',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['bonded labour punishment', 'forced labour penalty', 'debt bondage crime', 'bonded labour offence', 'labour exploitation', 'compulsory labour', 'bonded labour prosecution'],
    relatedSections: [
      { sectionNumber: '4', actCode: 'BLA', title: 'Abolition of bonded labour system' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // Epidemic Diseases Act, 1897
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'Epidemic Diseases Act, 1897',
    actCode: 'EDA',
    sectionNumber: '2',
    title: 'Power to take special measures and prescribe regulations as to dangerous epidemic disease',
    legalText: '(1) When at any time the State Government is satisfied that the State or any part thereof is visited by, or threatened with, an outbreak of any dangerous epidemic disease, the State Government, if it thinks that the ordinary provisions of the law for the time being in force are insufficient for the purpose, may take, or require or empower any person to take, such measures and, by public notice, prescribe such temporary regulations to be observed by the public or by any person or class of persons as it shall deem necessary to prevent the outbreak of such disease or the spread thereof, and may determine in what manner and by whom any expenses incurred (including compensation if any) shall be defrayed. (2) In particular and without prejudice to the generality of the foregoing provisions, the State Government may take measures and prescribe regulations for— (a) the inspection of persons travelling by railway or otherwise, and the segregation, in hospital, temporary accommodation or otherwise, of persons suspected by the inspecting officer of being infected with any such disease. (2A) When the Central Government is satisfied that India or any part thereof is visited by, or threatened with, an outbreak of any dangerous epidemic disease and that the ordinary provisions of the law for the time being in force are insufficient to prevent the outbreak of such disease or the spread thereof, the Central Government may take measures and prescribe regulations for the inspection of any ship or vessel leaving or arriving at any port in the territories to which this Act extends and for such detention thereof, or of any person intending to sail therein, or arriving thereby, as may be necessary.',
    explanation: 'This is the primary provision of India\'s oldest epidemic control law. When a dangerous epidemic disease breaks out or threatens any area, the State Government can take extraordinary measures beyond normal laws to prevent or contain it. These powers include inspecting travellers, quarantining suspected patients, prescribing temporary regulations for public behaviour, and imposing movement restrictions. The Central Government has similar powers for regulating ports and ships. This Act was extensively invoked during the COVID-19 pandemic to impose lockdowns, mandate masks, and enforce social distancing measures across India.',
    punishment: 'See Section 3 for penalties',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'Yes',
    keywords: ['epidemic', 'pandemic', 'quarantine', 'disease outbreak', 'COVID', 'lockdown', 'health emergency', 'epidemic control', 'public health', 'infectious disease', 'disease prevention'],
    relatedSections: [
      { sectionNumber: '3', actCode: 'EDA', title: 'Penalty for disobeying regulations' }
    ]
  },
  {
    act: 'Epidemic Diseases Act, 1897',
    actCode: 'EDA',
    sectionNumber: '3',
    title: 'Penalty',
    legalText: 'Any person disobeying any regulation or order made under this Act shall be deemed to have committed an offence punishable under section 188 of the Indian Penal Code (45 of 1860).',
    explanation: 'This section makes disobedience of any regulation or order issued under the Epidemic Diseases Act a criminal offence. The punishment is not directly specified in this Act — instead, it refers to Section 188 of the Indian Penal Code, which deals with disobedience of an order duly promulgated by a public servant. Under IPC Section 188, the punishment is imprisonment up to 1 month and/or fine of Rs 200 for simple disobedience, or up to 6 months and/or fine of Rs 1,000 if the disobedience causes or tends to cause danger to human life, health or safety. During COVID-19, this section was widely used to prosecute lockdown and quarantine violators.',
    punishment: 'As per IPC Section 188: Simple disobedience — imprisonment up to 1 month, or fine up to Rs 200, or both. If disobedience causes danger to life/health/safety — imprisonment up to 6 months, or fine up to Rs 1,000, or both',
    category: 'Criminal',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['epidemic penalty', 'quarantine violation', 'lockdown violation', 'COVID fine', 'IPC 188', 'disobedience', 'epidemic offence', 'health order violation', 'pandemic penalty'],
    relatedSections: [
      { sectionNumber: '2', actCode: 'EDA', title: 'Power to take special measures for epidemic diseases' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // Indian Trusts Act, 1882
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'Indian Trusts Act, 1882',
    actCode: 'TRUST',
    sectionNumber: '3',
    title: 'Trust',
    legalText: 'A "trust" is an obligation annexed to the ownership of property, and arising out of a confidence reposed in and accepted by the owner, or declared and accepted by him, for the benefit of another, or of another and the owner. The person who reposes or declares the confidence is called the "author of the trust"; the person who accepts the confidence is called the "trustee"; the person for whose benefit the confidence is accepted is called the "beneficiary"; the subject-matter of the trust is called "trust property" or "trust-money"; the "beneficial interest" or "interest" of the beneficiary is his right against the trustee as owner of the trust-property; and the instrument, if any, by which the trust is declared is called the "instrument of trust".',
    explanation: 'This section defines what a trust is in Indian law. A trust is essentially an obligation attached to property ownership where one person (the trustee) holds and manages property for the benefit of another person (the beneficiary). The person creating the trust is called the author. The key elements are: confidence placed by the author in the trustee, acceptance of that confidence by the trustee, and the property being managed for the beneficiary\'s benefit. The trust can be created by an instrument (trust deed) or by a declaration. This section applies to private trusts; public and charitable trusts are governed by separate state laws.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['trust', 'trustee', 'beneficiary', 'trust property', 'author of trust', 'fiduciary', 'trust deed', 'trust definition', 'private trust'],
    relatedSections: [
      { sectionNumber: '6', actCode: 'TRUST', title: 'Creation of trust' }
    ]
  },
  {
    act: 'Indian Trusts Act, 1882',
    actCode: 'TRUST',
    sectionNumber: '6',
    title: 'Creation of a trust',
    legalText: 'Subject to the provisions of section 5, a trust is created when the author of the trust indicates with reasonable certainty by any words or acts— (a) an intention on his part to create thereby a trust, (b) the purpose of the trust, (c) the beneficiary, and (d) the trust-property, and (unless the trust is declared by will or the author of the trust is himself to be the trustee) transfers the trust-property to the trustee.',
    explanation: 'This section sets out the requirements for creating a valid trust. Four things must be indicated with reasonable certainty: (1) the author\'s intention to create a trust; (2) the purpose of the trust; (3) who the beneficiary is; and (4) what property constitutes the trust property. Additionally, the trust property must be transferred to the trustee — unless the trust is created by will, or the author himself is serving as the trustee. The requirement of "reasonable certainty" means the trust doesn\'t need to use specific legal language, but the intent and essential elements must be clear. If any of these elements is uncertain or missing, no valid trust is created.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['trust creation', 'create trust', 'trust formation', 'trust property transfer', 'trust intention', 'trust purpose', 'trust requirements', 'valid trust'],
    relatedSections: [
      { sectionNumber: '3', actCode: 'TRUST', title: 'Definition of trust' }
    ]
  }
];

// All actCodes used in this seed file
const actCodes = ['ARMS', 'WLPA', 'FSSA', 'NGT', 'MWPSC', 'MHA2017', 'RTE', 'LSAA', 'ECA', 'BLA', 'EDA', 'TRUST'];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing sections for each act
    for (const code of actCodes) {
      const deleted = await LegalSection.deleteMany({ actCode: code });
      if (deleted.deletedCount > 0) {
        console.log(`Cleared ${deleted.deletedCount} existing ${code} sections`);
      }
    }

    // Seed all sections
    for (let i = 0; i < sections.length; i++) {
      await LegalSection.create(sections[i]);
      console.log(`[${i + 1}/${sections.length}] Section ${sections[i].sectionNumber}: ${sections[i].title}`);
    }

    console.log(`Done: seeded ${sections.length} sections across ${actCodes.length} acts`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed();
