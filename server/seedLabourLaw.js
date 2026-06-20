// Seed script to add Labour Law sections to the legal database
// Run with: node server/seedLabourLaw.js

require('dotenv').config();
const mongoose = require('mongoose');
const LegalSection = require('./models/LegalSection');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lawbook';

const labourSections = [
  // ═══════════════════════════════════════════════════════════════════
  // Minimum Wages Act, 1948
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'Minimum Wages Act, 1948',
    actCode: 'MWA',
    sectionNumber: '3',
    title: 'Fixing of minimum wages',
    legalText: 'The appropriate Government shall, in the manner hereinafter provided, fix the minimum rates of wages payable to employees employed in an employment specified in Part I or Part II of the Schedule and in an employment added to either Part of the Schedule. The appropriate Government may fix— (a) a minimum rate of wages for time work (a "minimum time rate"); (b) a minimum rate of wages for piece work (a "minimum piece rate"); (c) a guaranteed time rate; and (d) an overtime rate, for different occupations, localities, or classes of work and for adults, adolescents, children and apprentices.',
    explanation: 'The government is required to fix minimum wages for workers in scheduled employments. Minimum wages can be fixed for time-based work (hourly/daily/monthly), piece-based work, and overtime. Different rates can be set for different occupations, areas, and age groups. The minimum wage is periodically revised.',
    punishment: '',
    category: 'Labour',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['minimum wage', 'wage fixing', 'minimum pay', 'scheduled employment', 'minimum salary'],
    relatedSections: [
      { sectionNumber: '12', actCode: 'MWA', title: 'Penalty for paying below minimum wages' }
    ]
  },
  {
    act: 'Minimum Wages Act, 1948',
    actCode: 'MWA',
    sectionNumber: '12',
    title: 'Payment of minimum wages',
    legalText: 'The employer shall pay to every employee engaged in a scheduled employment under him, wages at a rate not less than the minimum rate of wages fixed by such notification for that class of employees in that employment without any deductions except as may be authorised within such time and subject to such conditions as may be prescribed.',
    explanation: 'Every employer must pay at least the minimum wage to their workers. No unauthorized deductions can be made from the minimum wage. The employer must pay on time and in the manner prescribed. Failure to pay minimum wages is a punishable offence.',
    punishment: 'Imprisonment up to 6 months, or fine up to ₹500, or both',
    category: 'Labour',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['pay below minimum wage', 'minimum wage violation', 'wage deduction', 'underpayment'],
    relatedSections: [
      { sectionNumber: '3', actCode: 'MWA', title: 'Fixing of minimum wages' },
      { sectionNumber: '22', actCode: 'MWA', title: 'Penalties for offences' }
    ]
  },
  {
    act: 'Minimum Wages Act, 1948',
    actCode: 'MWA',
    sectionNumber: '22',
    title: 'Penalties for certain offences',
    legalText: 'Any employer who contravenes any provision of this Act or of any rule or order made thereunder shall, if no other penalty is provided for such contravention by this Act, be punishable with imprisonment for a term which may extend to six months, or with fine which may extend to five hundred rupees, or with both. Any employer who— (a) pays to any employee less than the minimum rates of wages fixed for that employee\'s class of work, or less than the amount due to him under the provisions of this Act; (b) contravenes any rule or order made under section 13 — shall be punishable with imprisonment for a term which may extend to six months, or with fine which may extend to five hundred rupees, or with both.',
    explanation: 'Employers who violate minimum wage laws face criminal penalties. Specifically, paying less than the minimum wage or violating any provision of the Act can result in imprisonment up to 6 months, fine up to ₹500, or both. This includes failure to maintain records, obstructing inspectors, or not displaying minimum wage rates.',
    punishment: 'Imprisonment up to 6 months, or fine up to ₹500, or both',
    category: 'Labour',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['minimum wage penalty', 'employer prosecution', 'wage violation', 'labour penalty'],
    relatedSections: [
      { sectionNumber: '12', actCode: 'MWA', title: 'Payment of minimum wages' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // Payment of Gratuity Act, 1972
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'Payment of Gratuity Act, 1972',
    actCode: 'PGA',
    sectionNumber: '2(e)',
    title: 'Continuous service defined',
    legalText: '"continuous service" means continuous service as defined in section 2A. An employee shall be said to be in continuous service for a period if he has, for that period, been in uninterrupted service, including service which may be interrupted on account of sickness, accident, leave, absence from duty without leave (not being absence in respect of which an order treating the absence as break in service has been passed in accordance with the standing orders, rules or regulations governing the employees of the establishment), lay off, strike or a lock-out.',
    explanation: 'Continuous service means working without interruption. Even if work is interrupted due to illness, accident, leave, layoff, strike, or lockout, the service is still considered continuous. Only if a formal order treating absence as a break in service is passed will it not count as continuous service. This definition is crucial for calculating gratuity eligibility.',
    punishment: '',
    category: 'Labour',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['continuous service', 'gratuity eligibility', 'service period', 'employment tenure', 'uninterrupted service'],
    relatedSections: [
      { sectionNumber: '4', actCode: 'PGA', title: 'Payment of gratuity' }
    ]
  },
  {
    act: 'Payment of Gratuity Act, 1972',
    actCode: 'PGA',
    sectionNumber: '4',
    title: 'Payment of gratuity',
    legalText: 'Gratuity shall be payable to an employee on the termination of his employment after he has rendered continuous service for not less than five years,— (a) on his superannuation, or (b) on his retirement or resignation, or (c) on his death or disablement due to accident or disease. The employer shall pay gratuity to an employee at the rate of fifteen days\' wages based on the rate of wages last drawn by the employee concerned for every completed year of service or part thereof in excess of six months. The amount of gratuity payable to an employee shall not exceed twenty lakh rupees.',
    explanation: 'An employee is entitled to gratuity after completing 5 years of continuous service, upon retirement, resignation, death, or disability. Gratuity is calculated as 15 days wages × number of years of service. The maximum gratuity payable is ₹20 lakh. In case of death or disability, the 5-year requirement is waived. This applies to establishments with 10 or more employees.',
    punishment: '',
    category: 'Labour',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['gratuity', 'gratuity payment', '5 years service', 'retirement benefit', 'gratuity calculation', '15 days wages'],
    relatedSections: [
      { sectionNumber: '2(e)', actCode: 'PGA', title: 'Continuous service' },
      { sectionNumber: '7', actCode: 'PGA', title: 'Determination of gratuity' },
      { sectionNumber: '9', actCode: 'PGA', title: 'Penalty' }
    ]
  },
  {
    act: 'Payment of Gratuity Act, 1972',
    actCode: 'PGA',
    sectionNumber: '7',
    title: 'Determination of amount of gratuity',
    legalText: 'A person who is eligible for payment of gratuity under this Act or any person authorised, in writing, to act on his behalf shall send a written application to the employer, within such time and in such form, as may be prescribed, for payment of such gratuity. The employer shall, whether or not he receives an application, determine the amount of gratuity as soon as it becomes payable and give notice in writing to the person to whom the gratuity is payable and also to the controlling authority specifying the amount of gratuity so determined. The employer shall arrange to pay the amount of gratuity within thirty days from the date it becomes payable to the person to whom the gratuity is payable.',
    explanation: 'The employer must calculate and pay gratuity within 30 days of it becoming due, whether or not the employee applies for it. If the employer delays payment beyond 30 days, simple interest is payable on the amount. The employee or their nominee can also apply in writing for the gratuity payment.',
    punishment: 'Delay interest on gratuity amount; employer liable for penalty under Section 9',
    category: 'Labour',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['gratuity determination', 'gratuity application', 'gratuity payment timeline', '30 days gratuity'],
    relatedSections: [
      { sectionNumber: '4', actCode: 'PGA', title: 'Payment of gratuity' },
      { sectionNumber: '9', actCode: 'PGA', title: 'Penalty' }
    ]
  },
  {
    act: 'Payment of Gratuity Act, 1972',
    actCode: 'PGA',
    sectionNumber: '9',
    title: 'Penalty for non-payment of gratuity',
    legalText: 'Whoever, for the purpose of avoiding any payment to be made by himself under this Act or of enabling any other person to avoid such payment, knowingly makes or causes to be made any false statement or false representation shall be punishable with imprisonment for a term which may extend to six months, or with fine which may extend to ten thousand rupees, or with both. An employer who contravenes, or makes default in complying with, any of the provisions of this Act or any rule or order made thereunder shall be punishable with imprisonment for a term which shall not be less than three months but which may extend to one year, or with fine which shall not be less than ten thousand rupees but which may extend to twenty thousand rupees, or with both.',
    explanation: 'Employers who fail to pay gratuity or make false statements to avoid payment face: Minimum 3 months to maximum 1 year imprisonment, or fine of ₹10,000 to ₹20,000, or both. Making false statements to avoid gratuity payment: up to 6 months imprisonment or ₹10,000 fine or both.',
    punishment: 'Non-payment: 3 months to 1 year imprisonment, or fine ₹10,000 to ₹20,000, or both. False statements: up to 6 months imprisonment or ₹10,000 fine or both',
    category: 'Labour',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['gratuity penalty', 'non-payment of gratuity', 'gratuity default', 'employer penalty'],
    relatedSections: [
      { sectionNumber: '4', actCode: 'PGA', title: 'Payment of gratuity' },
      { sectionNumber: '7', actCode: 'PGA', title: 'Determination of gratuity' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // Employees' Provident Funds and Miscellaneous Provisions Act, 1952
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'Employees\' Provident Funds and Miscellaneous Provisions Act, 1952',
    actCode: 'EPF',
    sectionNumber: '2',
    title: 'Applicability',
    legalText: 'This Act applies to every establishment which is a factory engaged in any industry specified in Schedule I and in which twenty or more persons are employed and to any other establishment employing twenty or more persons or class of such establishments which the Central Government may, by notification in the Official Gazette, specify in this behalf. The Central Government may apply the provisions of this Act to any establishment employing such number of persons less than twenty as may be specified in the notification.',
    explanation: 'The EPF Act applies to all factories and establishments with 20 or more employees in industries listed in Schedule I. The government can also extend it to establishments with fewer than 20 employees. Once the Act applies to an establishment, it continues to apply even if the number of employees falls below 20.',
    punishment: '',
    category: 'Labour',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['EPF applicability', 'provident fund', 'PF applicable', '20 employees', 'EPF establishment'],
    relatedSections: [
      { sectionNumber: '6', actCode: 'EPF', title: 'Contributions and matters which may be provided for in Schemes' }
    ]
  },
  {
    act: 'Employees\' Provident Funds and Miscellaneous Provisions Act, 1952',
    actCode: 'EPF',
    sectionNumber: '6',
    title: 'Contributions and matters which may be provided for in Schemes',
    legalText: 'The contribution which shall be paid by the employer to the Fund shall be twelve per cent of the basic wages, dearness allowance and retaining allowance (if any) for the time being payable to each of the employees (whether employed by him directly or by or through a contractor), and the employees\' contribution shall be equal to the contribution payable by the employer in respect of him and may, if any employee so desires, be an amount exceeding twelve per cent of his basic wages, dearness allowance and retaining allowance (if any) subject to the condition that the employer shall not be under an obligation to pay any contribution over and above his contribution payable under this section.',
    explanation: 'Both employer and employee must contribute 12% each of basic wages plus dearness allowance to the Provident Fund. The employee can voluntarily contribute more than 12%, but the employer is not required to match the excess. This means a total of 24% (12% employer + 12% employee) of basic wages goes into the PF account every month.',
    punishment: '',
    category: 'Labour',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['EPF contribution', '12 percent PF', 'provident fund contribution', 'employer PF', 'employee PF', 'PF deduction'],
    relatedSections: [
      { sectionNumber: '2', actCode: 'EPF', title: 'Applicability' },
      { sectionNumber: '14', actCode: 'EPF', title: 'Penalties' }
    ]
  },
  {
    act: 'Employees\' Provident Funds and Miscellaneous Provisions Act, 1952',
    actCode: 'EPF',
    sectionNumber: '14',
    title: 'Penalties',
    legalText: 'Whoever, for the purpose of avoiding any payment to be made by himself under this Act or of enabling any other person to avoid such payment, knowingly makes or causes to be made any false statement or false representation shall be punishable with imprisonment for a term which may extend to one year, or with fine of five thousand rupees, or with both. Any employer who makes default in the payment of any contribution to the Fund, any charges for meeting the cost of administering the Fund levied under any Scheme or Insurance Fund or any charges under any Scheme or the Employees\' Insurance Scheme, shall be punishable with imprisonment for a term which may extend to three years but— (a) which shall not be less than one year, if he makes default in the payment of the employees\' contribution which has been deducted by him from the employees\' wages; (b) shall not be less than six months, in any other case.',
    explanation: 'Employers who fail to deposit PF contributions face serious criminal penalties: If the employer deducted PF from employee wages but did not deposit it: minimum 1 year to maximum 3 years imprisonment. Other defaults: minimum 6 months to 3 years imprisonment. Making false statements to avoid PF: up to 1 year imprisonment or ₹5,000 fine or both.',
    punishment: 'Non-deposit of employee PF: 1-3 years imprisonment. Other defaults: 6 months to 3 years. False statements: up to 1 year or ₹5,000 fine or both',
    category: 'Labour',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['EPF penalty', 'PF default', 'provident fund penalty', 'employer PF default', 'PF non-payment'],
    relatedSections: [
      { sectionNumber: '6', actCode: 'EPF', title: 'Contributions' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // Industrial Disputes Act, 1947
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'Industrial Disputes Act, 1947',
    actCode: 'IDA',
    sectionNumber: '2(k)',
    title: 'Strike defined',
    legalText: '"strike" means a cessation of work by a body of persons employed in any industry acting in combination, or a concerted refusal, or a refusal under a common understanding, of any number of persons who are or have been so employed to continue to work or to accept employment.',
    explanation: 'A strike is when a group of workers collectively stop working or refuse to work to put pressure on the employer. It must be a joint action — a single worker stopping work is not a strike. It includes any concerted refusal to work, whether organized by a union or by informal agreement among workers.',
    punishment: '',
    category: 'Labour',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['strike', 'work stoppage', 'industrial action', 'labour strike', 'worker strike', 'bandh'],
    relatedSections: [
      { sectionNumber: '2(l)', actCode: 'IDA', title: 'Lockout defined' },
      { sectionNumber: '10', actCode: 'IDA', title: 'Reference of disputes to tribunals' }
    ]
  },
  {
    act: 'Industrial Disputes Act, 1947',
    actCode: 'IDA',
    sectionNumber: '2(l)',
    title: 'Lockout defined',
    legalText: '"lockout" means the temporary closing of a place of employment, or the suspension of work, or the refusal by an employer to continue to employ any number of persons employed by him.',
    explanation: 'A lockout is when the employer temporarily closes the workplace, suspends work, or refuses to let employees work. It is the employer\'s counterpart to a workers\' strike — a pressure tactic used by the employer during industrial disputes. Lockouts can be legal or illegal depending on whether proper procedures were followed.',
    punishment: '',
    category: 'Labour',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['lockout', 'factory closure', 'employer lockout', 'suspension of work', 'industrial lockout'],
    relatedSections: [
      { sectionNumber: '2(k)', actCode: 'IDA', title: 'Strike defined' },
      { sectionNumber: '10', actCode: 'IDA', title: 'Reference of disputes to tribunals' }
    ]
  },
  {
    act: 'Industrial Disputes Act, 1947',
    actCode: 'IDA',
    sectionNumber: '10',
    title: 'Reference of disputes to Boards, Courts or Tribunals',
    legalText: 'Where the appropriate Government is of opinion that any industrial dispute exists or is apprehended, it may at any time, by order in writing— (a) refer the dispute to a Board of Conciliation for promoting a settlement thereof; or (b) refer any matter appearing to be connected with or relevant to the dispute to a Court of Inquiry for inquiring into that matter; or (c) refer the dispute or any matter appearing to be connected with, or relevant to, the dispute, if it relates to any matter specified in the Second Schedule, to a Labour Court for adjudication; or (d) refer the dispute or any matter appearing to be connected with, or relevant to, the dispute, whether it relates to any matter specified in the Second Schedule or the Third Schedule, to a Tribunal for adjudication.',
    explanation: 'When the government believes an industrial dispute exists or is about to happen, it can refer the dispute to: A Board of Conciliation (for settlement), a Court of Inquiry (for investigation), a Labour Court (for specific matters), or an Industrial Tribunal (for broader adjudication). Workers can also approach the Labour Court directly in cases of individual disputes like wrongful termination.',
    punishment: '',
    category: 'Labour',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['industrial tribunal', 'labour court', 'dispute reference', 'conciliation', 'industrial dispute resolution', 'labour dispute'],
    relatedSections: [
      { sectionNumber: '2(k)', actCode: 'IDA', title: 'Strike defined' },
      { sectionNumber: '25F', actCode: 'IDA', title: 'Conditions for retrenchment' }
    ]
  },
  {
    act: 'Industrial Disputes Act, 1947',
    actCode: 'IDA',
    sectionNumber: '25F',
    title: 'Conditions precedent to retrenchment of workmen',
    legalText: 'No workman employed in any industry who has been in continuous service for not less than one year under an employer shall be retrenched by that employer until— (a) the workman has been given one month\'s notice in writing indicating the reasons for retrenchment and the period of notice has expired, or the workman has been paid in lieu of such notice, wages for the period of the notice; (b) the workman has been paid, at the time of retrenchment, compensation which shall be equivalent to fifteen days\' average pay for every completed year of continuous service or any part thereof in excess of six months; and (c) notice in the prescribed manner is served on the appropriate Government or such authority as may be specified by the appropriate Government by notification in the Official Gazette.',
    explanation: 'Before retrenching (laying off) a worker who has completed 1 year of service, the employer must: (1) Give 1 month written notice stating reasons, or pay 1 month salary in lieu of notice; (2) Pay retrenchment compensation of 15 days average pay per year of service; (3) Notify the appropriate government. Workers must be retrenched on "last come, first go" basis.',
    punishment: '',
    category: 'Labour',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['retrenchment', 'layoff', 'termination', 'retrenchment compensation', 'notice period', 'worker rights'],
    relatedSections: [
      { sectionNumber: '10', actCode: 'IDA', title: 'Reference of disputes to tribunals' },
      { sectionNumber: '25N', actCode: 'IDA', title: 'Conditions for closure' }
    ]
  },
  {
    act: 'Industrial Disputes Act, 1947',
    actCode: 'IDA',
    sectionNumber: '25N',
    title: 'Conditions precedent to closure',
    legalText: 'An employer who intends to close down an undertaking of an industrial establishment to which this Chapter applies shall, in such form and at such time as may be prescribed, apply, for prior permission at least ninety days before the date on which the intended closure is to become effective, to the appropriate Government, stating clearly the reasons for the intended closure of the undertaking. Where an application for permission has been made, the appropriate Government, after making such enquiry as it thinks fit, and after giving a reasonable opportunity of being heard to the employer, the workmen and the persons interested in such closure may, having regard to the genuineness and adequacy of the reasons stated by the employer, the interests of the general public and all other relevant factors, by order and for reasons to be recorded in writing, grant or refuse to grant such permission and a copy of such order shall be communicated to the employer and the workmen.',
    explanation: 'Before closing down a factory or establishment with 100+ workers, the employer must: Apply to the government at least 90 days in advance, state clear reasons for closure, and get prior permission. The government can grant or refuse permission after considering the reasons and impact on workers. Unauthorized closure is considered an unfair labour practice and workers are entitled to compensation.',
    punishment: '',
    category: 'Labour',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['factory closure', 'industrial closure', 'closure permission', 'establishment closure', '90 days notice', 'closure compensation'],
    relatedSections: [
      { sectionNumber: '25F', actCode: 'IDA', title: 'Conditions for retrenchment' },
      { sectionNumber: '2(k)', actCode: 'IDA', title: 'Strike defined' }
    ]
  }
];

async function seedLabourLaw() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Clear existing sections for each actCode
    const actCodes = ['MWA', 'PGA', 'EPF', 'IDA'];
    for (const code of actCodes) {
      const existing = await LegalSection.countDocuments({ actCode: code });
      if (existing > 0) {
        console.log(`🗑️  Removing ${existing} existing ${code} sections...`);
        await LegalSection.deleteMany({ actCode: code });
      }
    }

    console.log(`\n📚 Seeding ${labourSections.length} labour law sections...\n`);

    const acts = [
      { code: 'MWA', name: 'Minimum Wages Act, 1948' },
      { code: 'PGA', name: 'Payment of Gratuity Act, 1972' },
      { code: 'EPF', name: "Employees' Provident Funds Act, 1952" },
      { code: 'IDA', name: 'Industrial Disputes Act, 1947' }
    ];

    for (const act of acts) {
      const sections = labourSections.filter(s => s.actCode === act.code);
      if (sections.length > 0) {
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`📖 ${act.name}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        for (const section of sections) {
          await LegalSection.create(section);
          console.log(`   ✅ ${act.code} Section ${section.sectionNumber} — ${section.title}`);
        }
        console.log('');
      }
    }

    const totalAll = await LegalSection.countDocuments();
    console.log(`═══════════════════════════════════════════`);
    console.log(`🎉 LABOUR LAW SEEDING COMPLETE`);
    console.log(`═══════════════════════════════════════════`);
    for (const act of acts) {
      const count = labourSections.filter(s => s.actCode === act.code).length;
      console.log(`   ${act.code} sections added: ${count}`);
    }
    console.log(`   Total DB sections:    ${totalAll}`);
    console.log(`═══════════════════════════════════════════\n`);

  } catch (error) {
    console.error('❌ Error seeding labour law:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB.');
    process.exit(0);
  }
}

seedLabourLaw();
