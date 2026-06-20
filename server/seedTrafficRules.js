// Seed script to add Traffic Rules (Motor Vehicles Act, 2019) to the legal database
// Run with: node server/seedTrafficRules.js

require('dotenv').config();
const mongoose = require('mongoose');
const LegalSection = require('./models/LegalSection');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lawbook';

const trafficSections = [
  // ═══════════════════════════════════════════════════════════════════
  // Motor Vehicles (Amendment) Act, 2019
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'Motor Vehicles Act, 1988 (Amended 2019)',
    actCode: 'MVA',
    sectionNumber: '3',
    title: 'Necessity for driving licence',
    legalText: 'No person shall drive a motor vehicle in any public place unless he holds an effective driving licence issued to him authorising him to drive the vehicle; and no person shall so drive a transport vehicle other than a motor cab or motorcycle hired for his own use or rented under any scheme made under sub-section (2) of section 75 unless his driving licence specifically entitles him so to do.',
    explanation: 'You cannot drive any vehicle on a public road without a valid driving licence. If you are driving a commercial/transport vehicle, your licence must specifically allow that category.',
    punishment: 'First offence: Fine up to ₹5,000. Second/subsequent offence: Fine up to ₹10,000',
    category: 'Criminal',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['driving licence', 'license', 'drive without licence', 'no licence', 'DL', 'driving permit', 'learner licence'],
    relatedSections: [
      { sectionNumber: '4', actCode: 'MVA', title: 'Age limit in connection with driving of motor vehicles' },
      { sectionNumber: '181', actCode: 'MVA', title: 'Driving without licence - penalty' }
    ]
  },
  {
    act: 'Motor Vehicles Act, 1988 (Amended 2019)',
    actCode: 'MVA',
    sectionNumber: '4',
    title: 'Age limit in connection with driving of motor vehicles',
    legalText: 'No person under the age of eighteen years shall drive a motor vehicle in any public place. Provided that a motor cycle with engine capacity not exceeding fifty cubic centimetres may be driven in a public place by a person after attaining the age of sixteen years.',
    explanation: 'You must be at least 18 years old to drive a motor vehicle. However, a person who is 16 years old can drive a motorcycle with engine capacity of 50cc or less (like a moped/scooter without gear).',
    punishment: 'Fine up to ₹5,000. Guardian/owner also liable for fine up to ₹25,000 with 3 years imprisonment and cancellation of registration',
    category: 'Criminal',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['age limit', 'underage driving', 'minor driving', 'minimum age', '18 years', '16 years', 'juvenile driving'],
    relatedSections: [
      { sectionNumber: '3', actCode: 'MVA', title: 'Necessity for driving licence' },
      { sectionNumber: '199A', actCode: 'MVA', title: 'Penalty for offences committed by juvenile' }
    ]
  },
  {
    act: 'Motor Vehicles Act, 1988 (Amended 2019)',
    actCode: 'MVA',
    sectionNumber: '112',
    title: 'Limits of speed',
    legalText: 'No person shall drive a motor vehicle in any public place at a speed exceeding the maximum speed or below the minimum speed fixed for the vehicle under this Act by the State Government for different categories of motor vehicles.',
    explanation: 'Every driver must follow the speed limits set by the state government. Different speed limits apply to different types of vehicles (cars, trucks, buses, etc.) and different zones (city, highway, school zones).',
    punishment: 'Fine: ₹1,000 to ₹2,000 for LMV. ₹2,000 to ₹4,000 for medium/heavy vehicles',
    category: 'Criminal',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['speed limit', 'overspeeding', 'speeding', 'speed violation', 'fast driving', 'rash driving speed', 'maximum speed'],
    relatedSections: [
      { sectionNumber: '183', actCode: 'MVA', title: 'Penalty for driving at excessive speed' },
      { sectionNumber: '184', actCode: 'MVA', title: 'Driving dangerously' }
    ]
  },
  {
    act: 'Motor Vehicles Act, 1988 (Amended 2019)',
    actCode: 'MVA',
    sectionNumber: '128',
    title: 'Safety measures for drivers and pillion riders',
    legalText: 'No person driving or riding on a two-wheeled motorcycle shall carry more than one person on the pillion in addition to the driver. Every person driving or riding on a motorcycle of any class or description shall, while in a public place, wear protective headgear conforming to the standards of Bureau of Indian Standards.',
    explanation: 'On a two-wheeler: only one pillion rider is allowed. Both the driver and the pillion rider must wear a helmet that meets BIS standards. Riding without a helmet is a punishable offence.',
    punishment: 'Fine: ₹1,000 and disqualification for 3 months. ₹2,000 for subsequent offence',
    category: 'Criminal',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['helmet', 'no helmet', 'pillion rider', 'two wheeler', 'motorcycle safety', 'headgear', 'triple riding', 'bike rules'],
    relatedSections: [
      { sectionNumber: '177', actCode: 'MVA', title: 'General provision for punishment of offences' },
      { sectionNumber: '194D', actCode: 'MVA', title: 'Penalty for not wearing protective headgear' }
    ]
  },
  {
    act: 'Motor Vehicles Act, 1988 (Amended 2019)',
    actCode: 'MVA',
    sectionNumber: '138',
    title: 'Wearing of seat belts',
    legalText: 'Every person driving or occupying the front seat of a motor vehicle, fitted with seat belts, shall wear the seat belt while the vehicle is in motion.',
    explanation: 'The driver and front-seat passenger must always wear seat belts when the vehicle is moving. This applies to all cars and other four-wheelers that come with seat belts.',
    punishment: 'Fine: ₹1,000',
    category: 'Criminal',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['seat belt', 'seatbelt', 'no seat belt', 'front seat', 'safety belt', 'car safety'],
    relatedSections: [
      { sectionNumber: '194B', actCode: 'MVA', title: 'Penalty for not wearing seat belt' }
    ]
  },
  {
    act: 'Motor Vehicles Act, 1988 (Amended 2019)',
    actCode: 'MVA',
    sectionNumber: '177',
    title: 'General provision for punishment of offences',
    legalText: 'Whoever contravenes any provision of this Act or of any rule, regulation or notification made thereunder shall, if no penalty is provided for the offence, be punishable for the first offence with fine which may extend to five hundred rupees, and for any second or subsequent offence with fine which may extend to fifteen hundred rupees.',
    explanation: 'This is a catch-all provision. Any traffic violation under the Motor Vehicles Act that doesn\'t have a specific penalty mentioned elsewhere will attract a general fine of ₹500 (first offence) or ₹1,500 (repeat offence).',
    punishment: 'First offence: Fine up to ₹500. Subsequent offence: Fine up to ₹1,500',
    category: 'Criminal',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['general penalty', 'traffic violation', 'traffic fine', 'traffic rules', 'traffic offence', 'challan'],
    relatedSections: []
  },
  {
    act: 'Motor Vehicles Act, 1988 (Amended 2019)',
    actCode: 'MVA',
    sectionNumber: '179',
    title: 'Disobedience of orders, obstruction and refusal of information',
    legalText: 'Whoever wilfully disobeys any direction lawfully given by any person or authority empowered under this Act to give such direction, or obstructs any person or authority in the discharge of any functions which such person or authority is empowered under this Act to discharge, shall be punishable with fine which may extend to two thousand rupees.',
    explanation: 'If you disobey a traffic police officer\'s instructions (like refusing to stop, refusing to show documents, or blocking them from performing their duties), you can be fined.',
    punishment: 'Fine up to ₹2,000',
    category: 'Criminal',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['disobey traffic police', 'refusing to stop', 'obstruction', 'traffic police orders', 'challan refusal', 'not showing documents'],
    relatedSections: []
  },
  {
    act: 'Motor Vehicles Act, 1988 (Amended 2019)',
    actCode: 'MVA',
    sectionNumber: '181',
    title: 'Driving without licence',
    legalText: 'Whoever drives a motor vehicle in any public place without holding a driving licence or in contravention of the conditions of such licence shall be punishable with fine which may extend to five thousand rupees for the first offence and ten thousand rupees for the second or subsequent offence.',
    explanation: 'Driving without a valid driving licence or violating the conditions of your licence (like driving a heavy vehicle on a light vehicle licence) is a punishable offence.',
    punishment: 'First offence: Fine up to ₹5,000. Second/subsequent offence: Fine up to ₹10,000',
    category: 'Criminal',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['driving without licence', 'no licence', 'no DL', 'expired licence', 'invalid licence', 'licence violation'],
    relatedSections: [
      { sectionNumber: '3', actCode: 'MVA', title: 'Necessity for driving licence' }
    ]
  },
  {
    act: 'Motor Vehicles Act, 1988 (Amended 2019)',
    actCode: 'MVA',
    sectionNumber: '183',
    title: 'Driving at excessive speed',
    legalText: 'Whoever drives a motor vehicle in any public place at a speed exceeding the maximum speed fixed for the vehicle shall be punishable with a fine of one thousand rupees for light motor vehicles and two thousand rupees for medium or heavy motor vehicles for the first offence, and up to two thousand rupees and four thousand rupees respectively for subsequent offences.',
    explanation: 'If you exceed the speed limit, you will be fined. The fine is higher for trucks and buses compared to cars and bikes. Repeat offenders pay double.',
    punishment: 'LMV: ₹1,000 (first), ₹2,000 (repeat). Medium/Heavy: ₹2,000 (first), ₹4,000 (repeat)',
    category: 'Criminal',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['overspeeding', 'speed limit', 'speeding fine', 'fast driving', 'exceeding speed', 'speed challan', 'speed penalty'],
    relatedSections: [
      { sectionNumber: '112', actCode: 'MVA', title: 'Limits of speed' },
      { sectionNumber: '184', actCode: 'MVA', title: 'Driving dangerously' }
    ]
  },
  {
    act: 'Motor Vehicles Act, 1988 (Amended 2019)',
    actCode: 'MVA',
    sectionNumber: '184',
    title: 'Driving dangerously',
    legalText: 'Whoever drives a motor vehicle at a speed or in a manner which is dangerous to the public, having regard to all the circumstances of the case including the nature, condition and use of the place and the amount of traffic which at the time is or which might reasonably be expected to be in the place, shall be punishable for the first offence with imprisonment for a term which may extend to six months or with fine which may extend to five thousand rupees or with both, and for any second or subsequent offence with imprisonment for a term which may extend to two years or with fine up to ten thousand rupees or with both.',
    explanation: 'Rash and dangerous driving — like zigzagging, racing on public roads, driving on the wrong side, or driving recklessly near pedestrians — can lead to imprisonment and heavy fines.',
    punishment: 'First offence: Up to 6 months imprisonment and/or ₹5,000 fine. Repeat: Up to 2 years imprisonment and/or ₹10,000 fine',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['rash driving', 'dangerous driving', 'reckless driving', 'negligent driving', 'wrong side', 'zigzag driving', 'racing', 'road rage'],
    relatedSections: [
      { sectionNumber: '183', actCode: 'MVA', title: 'Driving at excessive speed' },
      { sectionNumber: '304A', actCode: 'IPC', title: 'Causing death by negligence' }
    ]
  },
  {
    act: 'Motor Vehicles Act, 1988 (Amended 2019)',
    actCode: 'MVA',
    sectionNumber: '185',
    title: 'Driving by a drunken person or by a person under the influence of drugs',
    legalText: 'Whoever, while driving or attempting to drive a motor vehicle, has in his blood alcohol exceeding 30 mg per 100 ml of blood detected in a test by a breath analyser, shall be punishable for the first offence with imprisonment for a term which may extend to six months, or with fine which may extend to ten thousand rupees, or with both; and for a second or subsequent offence, with imprisonment for a term which may extend to two years, or with fine which may extend to fifteen thousand rupees, or with both.',
    explanation: 'Driving under the influence of alcohol (blood alcohol level above 30mg/100ml) or drugs is a serious offence. You can be jailed and heavily fined. The legal blood alcohol limit in India is 30mg per 100ml of blood — much lower than many other countries.',
    punishment: 'First offence: Up to 6 months imprisonment and/or ₹10,000 fine. Repeat: Up to 2 years imprisonment and/or ₹15,000 fine',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['drunk driving', 'drink and drive', 'DUI', 'alcohol', 'drunken driving', 'blood alcohol', 'breath analyser', 'intoxicated driving', 'drugs driving'],
    relatedSections: [
      { sectionNumber: '184', actCode: 'MVA', title: 'Driving dangerously' }
    ]
  },
  {
    act: 'Motor Vehicles Act, 1988 (Amended 2019)',
    actCode: 'MVA',
    sectionNumber: '188',
    title: 'Penalty for driving uninsured vehicle',
    legalText: 'Whoever drives or causes or allows a motor vehicle to be used in a public place without a valid insurance policy shall be punishable with fine which may extend to two thousand rupees or with imprisonment which may extend to three months or with both.',
    explanation: 'Every motor vehicle must have valid third-party insurance. Driving without insurance is a punishable offence that can result in both fine and imprisonment.',
    punishment: 'Fine up to ₹2,000 and/or imprisonment up to 3 months',
    category: 'Criminal',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['no insurance', 'driving without insurance', 'uninsured vehicle', 'expired insurance', 'motor insurance', 'third party insurance', 'vehicle insurance'],
    relatedSections: [
      { sectionNumber: '146', actCode: 'MVA', title: 'Necessity for insurance against third party risk' }
    ]
  },
  {
    act: 'Motor Vehicles Act, 1988 (Amended 2019)',
    actCode: 'MVA',
    sectionNumber: '189',
    title: 'Racing and trials of speed',
    legalText: 'Whoever permits or takes part in a race or trial of speed of any kind between motor vehicles in any public place shall be punishable with imprisonment for a term which may extend to one year or with fine of five thousand rupees or with both.',
    explanation: 'Street racing or speed trials on public roads are illegal. Both participants and organizers can be punished with jail time and fines.',
    punishment: 'Imprisonment up to 1 year and/or fine of ₹5,000',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['racing', 'street racing', 'speed trial', 'illegal racing', 'road racing', 'bike racing'],
    relatedSections: [
      { sectionNumber: '184', actCode: 'MVA', title: 'Driving dangerously' }
    ]
  },
  {
    act: 'Motor Vehicles Act, 1988 (Amended 2019)',
    actCode: 'MVA',
    sectionNumber: '190',
    title: 'Using vehicle without registration',
    legalText: 'Whoever drives or causes or allows a motor vehicle to be driven in any public place or in any other place without being registered shall be punishable for the first offence with fine which may extend to five thousand rupees and for any second or subsequent offence with imprisonment which may extend to one year or with fine which may extend to ten thousand rupees or with both.',
    explanation: 'Every motor vehicle must be registered with the RTO. Driving an unregistered vehicle is a punishable offence with heavy fines and possible imprisonment for repeat offenders.',
    punishment: 'First offence: Fine up to ₹5,000. Repeat: Up to 1 year imprisonment and/or ₹10,000 fine',
    category: 'Criminal',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['no registration', 'unregistered vehicle', 'without RC', 'no number plate', 'vehicle registration', 'RTO', 'RC book'],
    relatedSections: [
      { sectionNumber: '39', actCode: 'MVA', title: 'Necessity for registration' }
    ]
  },
  {
    act: 'Motor Vehicles Act, 1988 (Amended 2019)',
    actCode: 'MVA',
    sectionNumber: '194',
    title: 'Driving vehicle exceeding permissible weight',
    legalText: 'Whoever drives a motor vehicle or causes or allows a motor vehicle to be driven in contravention of the permissible weight specified for the vehicle shall be punishable with a minimum fine of twenty thousand rupees and an additional fine of two thousand rupees per tonne of excess load.',
    explanation: 'Overloading a vehicle beyond its permitted weight limit is illegal. This mostly applies to trucks and goods carriers. The fine is very heavy — ₹20,000 base plus ₹2,000 per extra tonne.',
    punishment: 'Minimum fine: ₹20,000 + ₹2,000 per extra tonne of overload',
    category: 'Criminal',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['overloading', 'excess weight', 'overweight vehicle', 'truck overloading', 'permissible weight', 'overload fine'],
    relatedSections: []
  },
  {
    act: 'Motor Vehicles Act, 1988 (Amended 2019)',
    actCode: 'MVA',
    sectionNumber: '194A',
    title: 'Penalty for driving without permit',
    legalText: 'Whoever drives a transport vehicle without a valid permit shall be punishable with a fine which may extend to ten thousand rupees for the first offence and for any second or subsequent offence with imprisonment which may extend to one year or fine up to ten thousand rupees or with both.',
    explanation: 'Transport/commercial vehicles (taxis, trucks, buses) need a special permit to operate. Driving one without a valid permit is a punishable offence.',
    punishment: 'First offence: Fine up to ₹10,000. Repeat: Up to 1 year imprisonment and/or ₹10,000 fine',
    category: 'Criminal',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['no permit', 'driving without permit', 'transport permit', 'commercial vehicle permit', 'taxi permit', 'route permit'],
    relatedSections: []
  },
  {
    act: 'Motor Vehicles Act, 1988 (Amended 2019)',
    actCode: 'MVA',
    sectionNumber: '194B',
    title: 'Penalty for not wearing seat belt',
    legalText: 'Whoever drives or is carried in a motor vehicle without wearing a seat belt shall be punishable with a fine of one thousand rupees.',
    explanation: 'Both drivers and passengers must wear seat belts. Not wearing a seat belt results in a ₹1,000 fine.',
    punishment: 'Fine: ₹1,000',
    category: 'Criminal',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['no seat belt', 'seat belt fine', 'seatbelt penalty', 'not wearing seat belt'],
    relatedSections: [
      { sectionNumber: '138', actCode: 'MVA', title: 'Wearing of seat belts' }
    ]
  },
  {
    act: 'Motor Vehicles Act, 1988 (Amended 2019)',
    actCode: 'MVA',
    sectionNumber: '194C',
    title: 'Penalty for not giving way to emergency vehicles',
    legalText: 'Whoever fails to draw his vehicle to the side of the road to give way to any fire service vehicle, ambulance or other emergency vehicle shall be punishable with a fine of ten thousand rupees.',
    explanation: 'You must immediately move your vehicle to the side when you see an ambulance, fire engine, or any emergency vehicle approaching with sirens. Blocking them results in a ₹10,000 fine.',
    punishment: 'Fine: ₹10,000',
    category: 'Criminal',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['emergency vehicle', 'ambulance', 'fire engine', 'not giving way', 'blocking ambulance', 'emergency vehicle way', 'siren'],
    relatedSections: []
  },
  {
    act: 'Motor Vehicles Act, 1988 (Amended 2019)',
    actCode: 'MVA',
    sectionNumber: '194D',
    title: 'Penalty for not wearing protective headgear (helmet)',
    legalText: 'Whoever drives or rides on a motorcycle without wearing protective headgear conforming to the standards of Bureau of Indian Standards shall be punishable with a fine of one thousand rupees and disqualification to hold licence for a period of three months.',
    explanation: 'Both the rider and pillion rider on a two-wheeler must wear a BIS-certified helmet. Not wearing one results in a ₹1,000 fine and your licence can be suspended for 3 months.',
    punishment: 'Fine: ₹1,000 + licence disqualification for 3 months',
    category: 'Criminal',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['no helmet', 'helmet fine', 'without helmet', 'helmet penalty', 'riding without helmet', 'helmet compulsory', 'two wheeler helmet'],
    relatedSections: [
      { sectionNumber: '128', actCode: 'MVA', title: 'Safety measures for drivers and pillion riders' }
    ]
  },
  {
    act: 'Motor Vehicles Act, 1988 (Amended 2019)',
    actCode: 'MVA',
    sectionNumber: '194E',
    title: 'Penalty for not wearing seat belt or not carrying children with restraint system',
    legalText: 'Whoever drives a motor vehicle without wearing seat belt, or carries children without appropriate child restraint system, shall be punishable with a fine of one thousand rupees.',
    explanation: 'Drivers must wear seat belts, and children must be secured with a proper child restraint system (child seat). Violating either rule results in a fine.',
    punishment: 'Fine: ₹1,000',
    category: 'Criminal',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['child seat', 'child restraint', 'baby seat', 'children safety car', 'child car seat'],
    relatedSections: [
      { sectionNumber: '194B', actCode: 'MVA', title: 'Penalty for not wearing seat belt' }
    ]
  },
  {
    act: 'Motor Vehicles Act, 1988 (Amended 2019)',
    actCode: 'MVA',
    sectionNumber: '196',
    title: 'Driving without insurance - accident causing death',
    legalText: 'Whoever causes the death of any person by driving a motor vehicle, not having a valid insurance policy, shall be punishable with imprisonment which may extend to two years or with fine which shall not be less than twenty-five thousand rupees or with both.',
    explanation: 'If you cause a fatal accident while driving without insurance, you face serious punishment — up to 2 years in jail and a minimum fine of ₹25,000.',
    punishment: 'Imprisonment up to 2 years and/or minimum fine of ₹25,000',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['accident death', 'fatal accident', 'death no insurance', 'accident without insurance', 'hit and run insurance'],
    relatedSections: [
      { sectionNumber: '188', actCode: 'MVA', title: 'Penalty for driving uninsured vehicle' },
      { sectionNumber: '304A', actCode: 'IPC', title: 'Causing death by negligence' }
    ]
  },
  {
    act: 'Motor Vehicles Act, 1988 (Amended 2019)',
    actCode: 'MVA',
    sectionNumber: '199A',
    title: 'Penalty for offences committed by juvenile',
    legalText: 'Where an offence under this Act has been committed by a juvenile, the guardian of such juvenile or the owner of the motor vehicle shall be deemed to be guilty of the contravention and shall be punishable with imprisonment for a term which may extend to three years and with a fine of twenty-five thousand rupees. The registration of the motor vehicle shall be cancelled. The juvenile shall be tried under the Juvenile Justice Act.',
    explanation: 'If a minor (below 18 years) commits a traffic offence, the parents/guardian and the vehicle owner are held responsible. They face up to 3 years jail, ₹25,000 fine, and the vehicle registration is cancelled. The minor is dealt with under the Juvenile Justice Act.',
    punishment: 'Guardian/Owner: Up to 3 years imprisonment + ₹25,000 fine + vehicle registration cancelled',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['minor driving', 'underage driving penalty', 'juvenile driving', 'child driving', 'parent liability', 'guardian penalty', 'underage accident'],
    relatedSections: [
      { sectionNumber: '4', actCode: 'MVA', title: 'Age limit in connection with driving of motor vehicles' }
    ]
  },
  {
    act: 'Motor Vehicles Act, 1988 (Amended 2019)',
    actCode: 'MVA',
    sectionNumber: '177A',
    title: 'Penalty for using mobile phone while driving',
    legalText: 'Whoever uses a handheld communication device while driving a motor vehicle shall be punishable with fine which may extend to five thousand rupees.',
    explanation: 'Using a mobile phone (calling, texting, browsing) while driving is illegal. This includes holding the phone to your ear. Hands-free devices are generally permitted.',
    punishment: 'Fine up to ₹5,000',
    category: 'Criminal',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['mobile phone driving', 'phone while driving', 'texting while driving', 'call while driving', 'handheld phone', 'distracted driving'],
    relatedSections: [
      { sectionNumber: '184', actCode: 'MVA', title: 'Driving dangerously' }
    ]
  },
  {
    act: 'Motor Vehicles Act, 1988 (Amended 2019)',
    actCode: 'MVA',
    sectionNumber: '185A',
    title: 'Penalty for hit and run',
    legalText: 'Whoever causes death of any person and flees without informing the police or a Magistrate shall be punishable with imprisonment up to ten years and fine up to seven lakh rupees. Whoever causes grievous hurt and flees shall be punishable with imprisonment up to three years and/or fine up to two lakh rupees.',
    explanation: 'Hit and run is one of the most serious traffic offences. If you cause an accident and flee without reporting to the police, you face very severe punishment — up to 10 years in jail for death and up to 3 years for injury.',
    punishment: 'Death case: Up to 10 years imprisonment + ₹7 lakh fine. Injury case: Up to 3 years imprisonment + ₹2 lakh fine',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['hit and run', 'fleeing accident', 'accident escape', 'run away accident', 'hit and run penalty', 'accident not reported'],
    relatedSections: [
      { sectionNumber: '184', actCode: 'MVA', title: 'Driving dangerously' },
      { sectionNumber: '304A', actCode: 'IPC', title: 'Causing death by negligence' }
    ]
  },
  {
    act: 'Motor Vehicles Act, 1988 (Amended 2019)',
    actCode: 'MVA',
    sectionNumber: '206',
    title: 'Power of traffic police to impound documents',
    legalText: 'Any police officer or other person authorised in this behalf by the State Government may, if he has reason to believe that a vehicle is being used in contravention of the provisions of this Act, seize the certificate of registration, driving licence, certificate of insurance or permit of the vehicle and issue an acknowledgement.',
    explanation: 'Traffic police can seize your vehicle documents (RC, licence, insurance, permit) if you are violating traffic rules. They must give you a receipt for the seized documents.',
    punishment: 'N/A (power of police, not a penalty)',
    category: 'Criminal',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['impound documents', 'seize licence', 'seize RC', 'traffic police power', 'document seizure', 'challan documents'],
    relatedSections: []
  }
];

async function seedTrafficRules() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Check if traffic rules already exist
    const existing = await LegalSection.countDocuments({ actCode: 'MVA' });
    if (existing > 0) {
      console.log(`🗑️  Removing ${existing} existing MVA sections...`);
      await LegalSection.deleteMany({ actCode: 'MVA' });
    }

    console.log(`📚 Seeding ${trafficSections.length} traffic rule sections...\n`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📖 Motor Vehicles Act, 1988 (Amended 2019)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    for (const section of trafficSections) {
      await LegalSection.create(section);
      console.log(`   ✅ MVA Section ${section.sectionNumber} — ${section.title}`);
    }

    const totalMVA = trafficSections.length;
    const totalAll = await LegalSection.countDocuments();

    console.log(`\n═══════════════════════════════════════════`);
    console.log(`🎉 TRAFFIC RULES SEEDING COMPLETE`);
    console.log(`═══════════════════════════════════════════`);
    console.log(`   MVA sections added:   ${totalMVA}`);
    console.log(`   Total DB sections:    ${totalAll}`);
    console.log(`═══════════════════════════════════════════\n`);

  } catch (error) {
    console.error('❌ Error seeding traffic rules:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB.');
    process.exit(0);
  }
}

seedTrafficRules();
