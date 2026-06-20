// Seed script for Indian Tax Law sections
// Run with: node server/seedTaxLaw.js

require('dotenv').config();
const mongoose = require('mongoose');
const LegalSection = require('./models/LegalSection');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lawbook';

const sections = [
  // ═══════════════════════════════════════════════════════════════════
  // Income Tax Act, 1961
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'Income Tax Act, 1961',
    actCode: 'ITA1961',
    sectionNumber: '4',
    title: 'Charge of income tax',
    legalText: '(1) Where any Central Act enacts that income-tax shall be charged for any assessment year at any rate or rates, income-tax at that rate or those rates shall be charged for that year in accordance with, and subject to the provisions of, this Act in respect of the total income of the previous year of every person: Provided that where by virtue of any provision of this Act income-tax is to be charged in respect of the income of a period other than the previous year, income-tax shall be charged accordingly. (2) In respect of income chargeable under sub-section (1), income-tax shall be deducted at the source or paid in advance, where it is so deductible or payable under any provision of this Act.',
    explanation: 'This is the charging section of the Income Tax Act. It establishes the legal basis for the government to collect income tax. It says that income tax will be charged every year (assessment year) on the total income you earned in the previous year. For example, income earned from April 2024 to March 2025 (previous year) is taxed in the assessment year 2025-26. It also authorises TDS (Tax Deducted at Source) and advance tax payments.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['income tax', 'charge of tax', 'assessment year', 'previous year', 'total income', 'TDS', 'advance tax', 'tax liability', 'charging section'],
    relatedSections: [
      { sectionNumber: '139', actCode: 'ITA1961', title: 'Return of income' },
      { sectionNumber: '10', actCode: 'ITA1961', title: 'Incomes not included in total income' }
    ]
  },
  {
    act: 'Income Tax Act, 1961',
    actCode: 'ITA1961',
    sectionNumber: '10',
    title: 'Incomes not included in total income',
    legalText: 'In computing the total income of a previous year of any person, any income falling within any of the following clauses shall not be included:— (1) agricultural income; (2) any sum received by a member of a Hindu undivided family from the income of the family or out of the income of the estate belonging to the family; (10D) any sum received under a life insurance policy, including the sum allocated by way of bonus on such policy, other than— (a) any sum received under sub-section (3) of section 80DD or sub-section (3) of section 80DDA; or (b) any sum received under a Keyman insurance policy; or (c) any sum received under an insurance policy issued on or after the 1st day of April, 2003 in respect of which the premium payable for any of the years during the term of the policy exceeds twenty per cent of the actual capital sum assured; (11) any payment from a provident fund to which the Provident Funds Act, 1925 applies or from any other provident fund set up by the Central Government; (14) any income from property held under trust for charitable or religious purposes subject to sections 11 to 13; (23C) any income received by any person on behalf of certain funds or institutions such as the Prime Minister\'s National Relief Fund; (34) any income arising from the transfer of a unit of the Unit Scheme, 1964 referred to in Schedule II of the Unit Trust of India (Transfer of Undertaking and Repeal) Act, 2002; (38) any income arising from the transfer of a long-term capital asset, being an equity share in a company or a unit of an equity oriented fund or a unit of a business trust where such transaction is chargeable to securities transaction tax.',
    explanation: 'Section 10 lists all the incomes that are fully exempt from income tax. You do not have to pay tax on these incomes. Key exemptions include: agricultural income (farming earnings), HUF distributions to members, life insurance maturity proceeds (with conditions), provident fund withdrawals, charitable trust income, and certain capital gains on which STT has been paid. This is one of the longest and most referenced sections of the Income Tax Act, with over 40 clauses covering various exemptions.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['tax exemption', 'exempt income', 'agricultural income', 'Section 10', 'HUF', 'life insurance', 'provident fund', 'charitable trust', 'tax free income', 'capital gains exemption'],
    relatedSections: [
      { sectionNumber: '4', actCode: 'ITA1961', title: 'Charge of income tax' },
      { sectionNumber: '80C', actCode: 'ITA1961', title: 'Deduction in respect of life insurance premia, deferred annuity, contributions to provident fund, subscription to certain equity shares or debentures, etc.' }
    ]
  },
  {
    act: 'Income Tax Act, 1961',
    actCode: 'ITA1961',
    sectionNumber: '80C',
    title: 'Deduction in respect of life insurance premia, deferred annuity, contributions to provident fund, subscription to certain equity shares or debentures, etc.',
    legalText: '(1) In computing the total income of an assessee, being an individual or a Hindu undivided family, there shall be deducted, in accordance with and subject to the provisions of this section, the whole of the amount paid or deposited in the previous year, being the aggregate of the sums referred to in sub-section (2), as does not exceed one lakh and fifty thousand rupees. (2) The sums referred to in sub-section (1) shall be any sums paid or deposited by the assessee in the previous year,— (i) to effect or to keep in force an insurance on the life of the individual, the wife or husband and any child of such individual; (v) as a contribution to any provident fund to which the Provident Funds Act, 1925 (19 of 1925) applies; (vi) as a contribution by an employee to a recognised provident fund; (viii) as subscription to any such security of the Central Government or any such deposit scheme as the Central Government may, by notification in the Official Gazette, specify in this behalf; (xiii) as subscription to any units of any mutual fund referred to in clause (23D) of section 10 and approved by the Board in this behalf — equity linked savings scheme (ELSS); (xxi) as subscription to any notified deposit scheme or as a contribution to any notified pension fund set up by the National Housing Bank (NHB); (xxv) as deposit in an account under the Sukanya Samriddhi Account Rules, 2014.',
    explanation: 'Section 80C is the most popular tax-saving section in India. It allows individuals and HUFs to claim a deduction of up to Rs 1,50,000 from their taxable income by investing in specified instruments. These include: Life Insurance Premiums, Public Provident Fund (PPF), Employee Provident Fund (EPF), Equity Linked Savings Scheme (ELSS) mutual funds, National Savings Certificate (NSC), 5-year Fixed Deposits, Sukanya Samriddhi Account, tuition fees for children, and home loan principal repayment. The deduction reduces your taxable income, thereby reducing the tax you owe.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['80C', 'tax saving', 'deduction', 'PPF', 'ELSS', 'life insurance', 'provident fund', 'NSC', 'Sukanya Samriddhi', 'tax planning', 'investment deduction', '1.5 lakh', 'home loan principal'],
    relatedSections: [
      { sectionNumber: '10', actCode: 'ITA1961', title: 'Incomes not included in total income' },
      { sectionNumber: '139', actCode: 'ITA1961', title: 'Return of income' }
    ]
  },
  {
    act: 'Income Tax Act, 1961',
    actCode: 'ITA1961',
    sectionNumber: '139',
    title: 'Return of income',
    legalText: '(1) Every person,— (a) being a company or a firm; or (b) being a person other than a company or a firm, if his total income or the total income of any other person in respect of which he is assessable under this Act during the previous year exceeded the maximum amount which is not chargeable to income-tax, shall, on or before the due date, furnish a return of his income or the income of such other person during the previous year, in the prescribed form and verified in the prescribed manner and setting forth such other particulars as may be prescribed: Provided that a person, being a resident other than not ordinarily resident in India within the meaning of clause (6) of section 6, who is not required to furnish a return under this sub-section and who during the previous year has any asset (including any financial interest in any entity) located outside India or signing authority in any account located outside India, shall furnish, on or before the due date, a return in respect of his income or loss for the previous year in such form and verified in such manner and setting forth such other particulars as may be prescribed. (4) Any person who has sustained a loss in any previous year under the head "Profits and gains of business or profession" or under the head "Capital gains" and claims that the loss or any part thereof should be carried forward under sub-section (1) of section 72 or sub-section (2) of section 73 or sub-section (1) or sub-section (3) of section 74 or sub-section (3) of section 74A, may furnish a return of loss in the prescribed form and verified in the prescribed manner and containing such other particulars as may be prescribed, and all the provisions of this Act shall apply as if it were a return under sub-section (1). (5) If any person, having furnished a return under sub-section (1), or in pursuance of a notice issued under sub-section (1) of section 142, discovers any omission or any wrong statement therein, he may furnish a revised return at any time before the end of the relevant assessment year or before the completion of the assessment, whichever is earlier.',
    explanation: 'Section 139 is the fundamental provision that requires every person (individuals, companies, firms, etc.) to file their income tax return (ITR) if their income exceeds the basic exemption limit. Key points: (a) Companies and firms must file regardless of income; (b) Individuals must file if income exceeds the tax-free slab; (c) Persons with foreign assets must file even if income is below the taxable limit; (d) If you have losses to carry forward (business loss, capital loss), you must file a return of loss by the due date; (e) If you discover mistakes in your filed return, you can file a revised return. The due date is typically July 31 for individuals and October 31 for companies requiring audit.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['ITR', 'income tax return', 'filing return', 'due date', 'return of income', 'revised return', 'belated return', 'return of loss', 'July 31', 'tax filing', 'foreign assets'],
    relatedSections: [
      { sectionNumber: '234A', actCode: 'ITA1961', title: 'Interest for default in furnishing return of income' },
      { sectionNumber: '271', actCode: 'ITA1961', title: 'Failure to furnish returns, comply with notices, concealment of income, etc.' },
      { sectionNumber: '4', actCode: 'ITA1961', title: 'Charge of income tax' }
    ]
  },
  {
    act: 'Income Tax Act, 1961',
    actCode: 'ITA1961',
    sectionNumber: '234A',
    title: 'Interest for default in furnishing return of income',
    legalText: '(1) Where the return of income for any assessment year under sub-section (1) or sub-section (4) of section 139, or in response to a notice under sub-section (1) of section 142, is furnished after the due date, or is not furnished, the assessee shall be liable to pay simple interest at the rate of one per cent for every month or part of a month comprised in the period commencing on the date immediately following the due date, and,— (a) where the return is furnished after the due date, ending on the date of furnishing the return; or (b) where no return has been furnished, ending on the date of completion of the assessment under section 144, on the amount of the tax on the total income as determined under sub-section (1) of section 143 or on regular assessment, as reduced by the advance tax, if any, paid on or before the due date, and any tax deducted or collected at source. Explanation 1.—In this section, "due date" means the date specified in sub-section (1) of section 139 as applicable in the case of the assessee.',
    explanation: 'If you file your income tax return after the due date (or do not file at all), you must pay interest under Section 234A. The interest is calculated at 1% per month (or part of a month) on the outstanding tax amount. It starts from the day after the due date and runs until the date you actually file the return (or the date assessment is completed if you never file). The interest is calculated on the unpaid tax amount after deducting TDS and advance tax already paid. For example, if your due date is July 31 and you file on October 15, you pay 3 months of interest (August, September, October — part month counts as full month).',
    punishment: 'Simple interest at 1% per month or part of month on the outstanding tax liability',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['234A', 'late filing interest', 'default interest', 'late return', 'interest on tax', 'delayed filing', 'one percent interest', 'due date penalty', 'tax interest'],
    relatedSections: [
      { sectionNumber: '139', actCode: 'ITA1961', title: 'Return of income' },
      { sectionNumber: '271', actCode: 'ITA1961', title: 'Failure to furnish returns, comply with notices, concealment of income, etc.' }
    ]
  },
  {
    act: 'Income Tax Act, 1961',
    actCode: 'ITA1961',
    sectionNumber: '271',
    title: 'Failure to furnish returns, comply with notices, concealment of income, etc.',
    legalText: '(1) If the Assessing Officer or the Commissioner (Appeals) or the Principal Commissioner or Commissioner in the course of any proceedings under this Act, is satisfied that any person— (a) has without reasonable cause failed to furnish the return which he was required to furnish under sub-section (1) of section 139 by the due date, or (b) has without reasonable cause failed to comply with a notice under sub-section (1) of section 142 or sub-section (2) of section 143 or fails to comply with a direction issued under sub-section (2A) of section 142, or (c) has concealed the particulars of his income or furnished inaccurate particulars of such income, or (d) has concealed the particulars of the fringe benefits or furnished inaccurate particulars of such fringe benefits, he may direct that such person shall pay by way of penalty,— (i) in the cases referred to in clause (a), in addition to any tax payable by him, a sum of five thousand rupees; (ii) in the cases referred to in clause (b), in addition to any tax payable by him, a sum of ten thousand rupees for each such failure; (iii) in the cases referred to in clauses (c) or (d), in addition to tax, if any, payable by him, a sum which shall not be less than, but which shall not exceed three times, the amount of tax sought to be evaded by reason of the concealment of particulars of his income or fringe benefits or the furnishing of inaccurate particulars of such income or fringe benefits.',
    explanation: 'Section 271 imposes monetary penalties for various defaults related to income tax compliance. Key penalties: (1) Failure to file return by due date without reasonable cause — Rs 5,000 penalty; (2) Failure to comply with notices from the tax officer — Rs 10,000 per failure; (3) Concealment of income or furnishing inaccurate particulars — penalty ranging from 100% to 300% of the tax sought to be evaded. The concealment penalty is the most severe and is frequently litigated. The Assessing Officer must be "satisfied" that there was concealment, and the burden of proving that no concealment occurred shifts to the assessee once the AO initiates penalty proceedings.',
    punishment: 'Rs 5,000 for failure to file; Rs 10,000 per failure to comply with notices; 100% to 300% of tax evaded for concealment of income',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['271', 'penalty', 'concealment of income', 'failure to file return', 'inaccurate particulars', 'tax evasion penalty', 'income tax penalty', 'non-compliance penalty', 'AO penalty'],
    relatedSections: [
      { sectionNumber: '139', actCode: 'ITA1961', title: 'Return of income' },
      { sectionNumber: '234A', actCode: 'ITA1961', title: 'Interest for default in furnishing return of income' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // Central Goods and Services Tax Act, 2017
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'Central Goods and Services Tax Act, 2017',
    actCode: 'CGST',
    sectionNumber: '9',
    title: 'Levy and collection',
    legalText: '(1) Subject to the provisions of sub-section (2), there shall be levied a tax called the central goods and services tax on all intra-State supplies of goods or services or both, except on the supply of alcoholic liquor for human consumption, on the value determined under section 15 and at such rates, not exceeding twenty per cent., as may be notified by the Government on the recommendations of the Council and collected in such manner as may be prescribed and shall be paid by the taxable person. (2) The central tax on the supply of petroleum crude, high speed diesel, motor spirit (commonly known as petrol), natural gas and aviation turbine fuel shall be levied with effect from such date as may be notified by the Government on the recommendations of the Council. (3) The Government may, on the recommendations of the Council, by notification, specify categories of supply of goods or services or both, the tax on which shall be paid on reverse charge basis by the recipient of such goods or services or both and all the provisions of this Act shall apply to such recipient as if he is the person liable for paying the tax in relation to the supply of such goods or services or both. (4) The central tax in respect of the supply of taxable goods or services or both by a supplier, who is not registered, to a registered person shall be paid by such person on reverse charge basis as the recipient and all the provisions of this Act shall apply to such recipient as if he is the person liable for paying the tax in relation to such supply of goods or services or both.',
    explanation: 'Section 9 is the charging section of the CGST Act — it creates the legal authority to levy and collect GST on intra-State supplies (within the same state). Key points: (1) CGST applies to all goods and services supplied within a state, except alcohol for human consumption; (2) The maximum rate is capped at 20%; (3) Petroleum products (petrol, diesel, natural gas, ATF, crude) are under GST but the levy date has not yet been notified, so they remain outside GST for now; (4) In certain cases, the recipient pays the tax instead of the supplier (reverse charge mechanism — e.g., services from unregistered persons, legal services from advocates, etc.).',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['GST', 'CGST', 'levy', 'goods and services tax', 'intra-state supply', 'reverse charge', 'taxable supply', 'GST rate', 'petroleum GST', 'alcohol exemption', 'charging section'],
    relatedSections: [
      { sectionNumber: '16', actCode: 'CGST', title: 'Eligibility and conditions for taking input tax credit' },
      { sectionNumber: '22', actCode: 'CGST', title: 'Persons liable for registration' },
      { sectionNumber: '49', actCode: 'CGST', title: 'Payment of tax, interest, penalty and other amounts' }
    ]
  },
  {
    act: 'Central Goods and Services Tax Act, 2017',
    actCode: 'CGST',
    sectionNumber: '16',
    title: 'Eligibility and conditions for taking input tax credit',
    legalText: '(1) Every registered person shall, subject to such conditions and restrictions as may be prescribed and within the time and manner specified in section 49, be entitled to take credit of input tax charged on any supply of goods or services or both to him which are used or intended to be used in the course or furtherance of his business and the said amount shall be credited to the electronic credit ledger of such person. (2) Notwithstanding anything contained in this section, no registered person shall be entitled to the credit of any input tax in respect of any supply of goods or services or both to him unless,— (a) he is in possession of a tax invoice or debit note issued by a supplier registered under this Act, or such other tax paying documents as may be prescribed; (aa) the details of the invoice or debit note referred to in clause (a) has been furnished by the supplier in the statement of outward supplies and such details have been communicated to the recipient of such supply in the manner specified under section 37; (b) he has received the goods or services or both; (c) subject to the provisions of section 41, the tax charged in respect of such supply has been actually paid to the Government, either in cash or through utilisation of input tax credit admissible in respect of the said supply; and (d) he has furnished the return under section 39. (4) Where the recipient fails to pay to the supplier of goods or services or both, other than the supplies on which tax is payable on reverse charge basis, the amount towards the value of supply along with tax payable thereon within a period of one hundred and eighty days from the date of issue of invoice by the supplier, an amount equal to the input tax credit availed by the recipient shall be added to his output tax liability, along with interest thereon.',
    explanation: 'Section 16 is the backbone of the GST system — it allows businesses to claim Input Tax Credit (ITC), meaning they can offset the GST they paid on purchases against the GST they collect on sales. Conditions for claiming ITC: (1) You must have a valid tax invoice; (2) The supplier must have reported the invoice in their GST return (GSTR-1) and it must appear in your GSTR-2B; (3) You must have actually received the goods or services; (4) The supplier must have paid the tax to the government; (5) You must have filed your own GST return. If you do not pay your supplier within 180 days, the ITC must be reversed (added back to your tax liability with interest).',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['ITC', 'input tax credit', 'GST credit', 'tax invoice', 'GSTR-2B', 'electronic credit ledger', '180 days', 'ITC conditions', 'supplier payment', 'GST return filing', 'credit reversal'],
    relatedSections: [
      { sectionNumber: '9', actCode: 'CGST', title: 'Levy and collection' },
      { sectionNumber: '49', actCode: 'CGST', title: 'Payment of tax, interest, penalty and other amounts' }
    ]
  },
  {
    act: 'Central Goods and Services Tax Act, 2017',
    actCode: 'CGST',
    sectionNumber: '22',
    title: 'Persons liable for registration',
    legalText: '(1) Every supplier shall be liable to be registered under this Act in the State or Union territory, other than special category States, from where he makes a taxable supply of goods or services or both, if his aggregate turnover in a financial year exceeds twenty lakh rupees: Provided that where such person makes taxable supplies of goods or services or both from any of the special category States, namely, the States of Mizoram, Tripura, Manipur, Nagaland, Meghalaya, Arunachal Pradesh, Sikkim, or the Union territory of Puducherry or the State of Telangana or the State of Uttarakhand, he shall be liable to be registered if his aggregate turnover in a financial year exceeds ten lakh rupees. (2) Every person who, on the day immediately preceding the appointed day, is registered or holds a licence under an existing law, shall be liable to be registered under this Act with effect from the appointed day. (3) Where a business carried on by a taxable person registered under this Act is transferred, whether on account of succession or otherwise, to another person as a going concern, the transferee or the successor, as the case may be, shall be liable to be registered with effect from the date of such transfer or succession. (4) Notwithstanding anything contained in sub-sections (1) and (3), in a case of transfer pursuant to sanction of a scheme or an arrangement for amalgamation or, as the case may be, demerger of two or more companies pursuant to an order of a High Court, Tribunal, or otherwise, the transferee shall be liable to be registered, with effect from the date on which the Registrar of Companies issues a certificate of incorporation giving effect to such order of the High Court or Tribunal.',
    explanation: 'Section 22 determines who must register for GST. The basic threshold is: (1) If your annual turnover exceeds Rs 20 lakh, you must register for GST; (2) For special category states (most North-Eastern states, Uttarakhand, Puducherry, Telangana), the threshold is Rs 10 lakh; (3) If a registered business is transferred (through sale, succession, merger, demerger), the new owner must register from the transfer date. Note: Section 24 lists categories of persons who must register regardless of turnover (e.g., inter-state suppliers, e-commerce operators, persons paying tax under reverse charge, etc.).',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['GST registration', 'registration threshold', '20 lakh', '10 lakh', 'taxable supply', 'aggregate turnover', 'special category states', 'mandatory registration', 'GST number', 'GSTIN'],
    relatedSections: [
      { sectionNumber: '9', actCode: 'CGST', title: 'Levy and collection' },
      { sectionNumber: '49', actCode: 'CGST', title: 'Payment of tax, interest, penalty and other amounts' }
    ]
  },
  {
    act: 'Central Goods and Services Tax Act, 2017',
    actCode: 'CGST',
    sectionNumber: '49',
    title: 'Payment of tax, interest, penalty and other amounts',
    legalText: '(1) Every deposit made towards tax, interest, penalty, fee or any other amount by a person by internet banking or by using credit or debit cards or National Electronic Fund Transfer or Real Time Gross Settlement or by such other mode and subject to such conditions and restrictions as may be prescribed, shall be credited to the electronic cash ledger of such person to be maintained in such manner as may be prescribed. (2) The input tax credit as self-assessed in the return of a registered person shall be credited to his electronic credit ledger, in accordance with section 41, to be maintained in such manner as may be prescribed. (3) The amount available in the electronic cash ledger may be used for making any payment towards tax, interest, penalty, fees or any other amount payable under the provisions of this Act or the rules made thereunder in such manner and subject to such conditions and within such time as may be prescribed. (4) The amount available in the electronic credit ledger may be used for making any payment towards output tax under this Act or under the Integrated Goods and Services Tax Act in such manner and subject to such conditions and within such time as may be prescribed. (5) The amount of input tax credit available in the electronic credit ledger of the registered person on account of— (a) integrated tax shall first be utilised towards payment of integrated tax and the amount remaining, if any, may be utilised towards the payment of central tax and State tax, or Union territory tax, as the case may be, in that order; (b) the central tax shall first be utilised towards payment of central tax and the amount remaining, if any, may be utilised towards the payment of integrated tax; (c) the State tax shall first be utilised towards payment of State tax and the amount remaining, if any, may be utilised towards the payment of integrated tax; (d) the Union territory tax shall first be utilised towards payment of Union territory tax and the amount remaining, if any, may be utilised towards the payment of integrated tax.',
    explanation: 'Section 49 governs how GST payments are made and how tax credits are utilised. Every taxpayer has two electronic ledgers: (1) Electronic Cash Ledger — where actual cash deposits (via net banking, NEFT, RTGS, etc.) are credited; (2) Electronic Credit Ledger — where input tax credits are credited. The utilisation order is important: IGST credit is used first against IGST liability, then CGST, then SGST; CGST credit can be used against CGST first, then IGST (but not against SGST); SGST credit can be used against SGST first, then IGST (but not against CGST). Cash from the cash ledger can be used for any payment — tax, interest, penalty, fees.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['GST payment', 'electronic cash ledger', 'electronic credit ledger', 'ITC utilisation', 'IGST credit', 'CGST credit', 'SGST credit', 'tax payment', 'net banking', 'GST set off'],
    relatedSections: [
      { sectionNumber: '16', actCode: 'CGST', title: 'Eligibility and conditions for taking input tax credit' },
      { sectionNumber: '9', actCode: 'CGST', title: 'Levy and collection' }
    ]
  },
  {
    act: 'Central Goods and Services Tax Act, 2017',
    actCode: 'CGST',
    sectionNumber: '73',
    title: 'Determination of tax not paid or short paid or erroneously refunded or input tax credit wrongly availed or utilised for any reason other than fraud or any wilful misstatement or suppression of facts',
    legalText: '(1) Where it appears to the proper officer that any tax has not been paid or short paid or erroneously refunded, or where input tax credit has been wrongly availed or utilised for any reason, other than the reason of fraud or any wilful-misstatement or suppression of facts to evade tax, he shall serve notice on the person chargeable with tax which has not been so paid or which has been so short paid or to whom the refund has erroneously been made, or who has wrongly availed or utilised input tax credit, requiring him to show cause as to why he should not pay the amount specified in the notice along with interest payable thereon under section 50 and a penalty leviable under the provisions of this Act or the rules made thereunder. (2) The proper officer shall issue the notice under sub-section (1) at least three months prior to the time limit specified in sub-section (10) for issuance of order under sub-section (9). (5) The person chargeable with tax may, before service of notice under sub-section (1), pay the amount of tax along with interest payable under section 50 on the basis of his own ascertainment of such tax or the tax as ascertained by the said officer and inform the proper officer in writing of such payment. (6) The proper officer, on receipt of such information, shall not serve any notice under sub-section (1) in respect of the tax so paid or any penalty payable under the provisions of this Act or the rules made thereunder. (10) The proper officer shall issue the order under sub-section (9) within three years from the due date for furnishing of annual return for the financial year to which the tax not paid or short paid or input tax credit wrongly availed or utilised relates to or within three years from the date of erroneous refund. (11) Notwithstanding anything contained in sub-section (6) or sub-section (8), penalty under sub-section (9) shall be payable where any amount of self-assessed tax or any amount collected as tax has not been paid within a period of thirty days from the due date of payment of such tax.',
    explanation: 'Section 73 deals with cases where tax was not paid, short paid, excess refunded, or ITC wrongly availed — but NOT due to fraud. Key features: (1) The officer issues a show cause notice (SCN) to the taxpayer; (2) The time limit to issue the order is 3 years from the due date of the annual return; (3) If the taxpayer voluntarily pays the tax and interest before the notice is issued, no penalty is imposed and no notice is served; (4) This is the non-fraud counterpart to Section 74. The distinction matters because Section 73 has a shorter limitation period (3 years vs. 5 years) and lower penalties compared to Section 74 fraud cases.',
    punishment: 'Tax amount due plus interest under Section 50; penalty may apply if tax remains unpaid',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['GST demand', 'show cause notice', 'SCN', 'short payment', 'wrong ITC', 'erroneous refund', 'Section 73', 'non-fraud', 'three year limitation', 'tax determination', 'GST penalty'],
    relatedSections: [
      { sectionNumber: '74', actCode: 'CGST', title: 'Determination of tax not paid or short paid or erroneously refunded or input tax credit wrongly availed or utilised by reason of fraud or any wilful misstatement or suppression of facts' },
      { sectionNumber: '9', actCode: 'CGST', title: 'Levy and collection' },
      { sectionNumber: '16', actCode: 'CGST', title: 'Eligibility and conditions for taking input tax credit' }
    ]
  },
  {
    act: 'Central Goods and Services Tax Act, 2017',
    actCode: 'CGST',
    sectionNumber: '74',
    title: 'Determination of tax not paid or short paid or erroneously refunded or input tax credit wrongly availed or utilised by reason of fraud or any wilful misstatement or suppression of facts',
    legalText: '(1) Where it appears to the proper officer that any tax has not been paid or short paid or erroneously refunded or where input tax credit has been wrongly availed or utilised by reason of fraud, or any wilful-misstatement or suppression of facts to evade tax, he shall serve notice on the person chargeable with tax which has not been so paid or which has been so short paid or to whom the refund has erroneously been made, or who has wrongly availed or utilised input tax credit, requiring him to show cause as to why he should not pay the amount specified in the notice along with interest payable thereon under section 50 and a penalty equivalent to the tax specified in the notice. (2) The proper officer shall issue the notice under sub-section (1) at least six months prior to the time limit specified in sub-section (10) for issuance of order under sub-section (9). (5) The person chargeable with tax may, before service of notice under sub-section (1), pay the amount of tax along with interest payable under section 50 and a penalty equivalent to fifteen per cent of such tax on the basis of his own ascertainment of such tax or the tax as ascertained by the said officer and inform the proper officer in writing of such payment. (6) The proper officer, on receipt of such information, shall not serve any notice under sub-section (1), in respect of the tax so paid or any penalty payable under the provisions of this Act or the rules made thereunder. (7) Where the proper officer is of the opinion that the amount paid under sub-section (5) falls short of the amount actually payable, he shall proceed to issue the notice as provided for in sub-section (1) in respect of such amount which falls short of the amount actually payable. (10) The proper officer shall issue the order under sub-section (9) within five years from the due date for furnishing of annual return for the financial year to which the tax not paid or short paid or input tax credit wrongly availed or utilised relates to or within five years from the date of erroneous refund. (11) Where any person served with an order issued under sub-section (9) pays the tax along with interest payable thereon under section 50 and a penalty equivalent to twenty-five per cent of such tax within thirty days of the communication of the order, all proceedings in respect of the said notice shall be deemed to be concluded.',
    explanation: 'Section 74 is the stricter counterpart to Section 73, applicable when tax evasion involves fraud, wilful misstatement, or suppression of facts. Key differences from Section 73: (1) Extended limitation — the order must be issued within 5 years (vs. 3 years); (2) Mandatory penalty equal to 100% of the tax evaded; (3) If the taxpayer pays voluntarily before notice, penalty is reduced to 15% of the tax; (4) If paid within 30 days of the order, penalty is reduced to 25%; (5) The notice must be issued at least 6 months before the limitation expires (vs. 3 months in Section 73). Fraud includes fake invoices, billing without supply, claiming ITC on non-existent transactions, etc.',
    punishment: 'Tax amount due plus interest; penalty equal to 100% of tax evaded (reducible to 15% if paid before notice, 25% if paid within 30 days of order)',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['GST fraud', 'wilful misstatement', 'suppression of facts', 'Section 74', 'tax evasion', 'fake invoice', 'five year limitation', 'GST penalty', 'show cause notice', 'fraud determination', '100 percent penalty'],
    relatedSections: [
      { sectionNumber: '73', actCode: 'CGST', title: 'Determination of tax not paid or short paid or erroneously refunded or input tax credit wrongly availed or utilised for any reason other than fraud' },
      { sectionNumber: '9', actCode: 'CGST', title: 'Levy and collection' },
      { sectionNumber: '16', actCode: 'CGST', title: 'Eligibility and conditions for taking input tax credit' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // Indian Stamp Act, 1899
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'Indian Stamp Act, 1899',
    actCode: 'STAMP',
    sectionNumber: '3',
    title: 'Instruments chargeable with duty',
    legalText: 'Subject to the provisions of this Act and the exemptions contained in Schedule I, the following instruments shall be chargeable with duty of the amount indicated in that Schedule as the proper duty therefor, respectively, that is to say— (a) every instrument mentioned in that Schedule which, not having been previously executed by any person, is executed in India on or after the first day of July, 1899; (b) every bill of exchange payable otherwise than on demand or promissory note drawn or made out of India on or after that day and accepted or paid, or presented for acceptance or payment, or endorsed, transferred or otherwise negotiated, in India; and (c) every instrument (other than a bill of exchange or promissory note) mentioned in that Schedule, which, not having been previously executed by any person, is executed out of India on or after that day, relates to any property situate, or to any matter or thing done or to be done, in India and is received in India: Provided that no duty shall be chargeable in respect of— (1) any instrument executed by, or on behalf of, or in favour of, the Government in cases where, but for this exemption, the Government would be liable to pay the duty chargeable in respect of such instrument; (2) any instrument for the sale, transfer or other disposition, either absolutely or by way of mortgage or otherwise, of any ship or vessel, or any part, interest, share or property of or in any ship or vessel registered under the Merchant Shipping Act, 1958 (44 of 1958), or under the Indian Registration of Ships Act, 1841 (X of 1841), or the Indian Registration of Ships (Supplementary) Act, 1883 (IX of 1883).',
    explanation: 'Section 3 is the charging section of the Indian Stamp Act. It establishes which documents (called "instruments") must bear stamp duty and how much. Three types of instruments are covered: (a) Any instrument listed in Schedule I that is executed in India; (b) Foreign bills of exchange and promissory notes that are accepted, paid, or negotiated in India; (c) Foreign instruments that relate to Indian property or matters and are received in India. Government instruments are exempt. The actual rates of stamp duty are specified in Schedule I of the Act and also by respective State stamp duty laws (as stamp duty is a State subject under the Constitution). Common instruments include sale deeds, lease agreements, partnership deeds, power of attorney, share transfer deeds, etc.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['stamp duty', 'stamp act', 'instruments', 'chargeable', 'Schedule I', 'sale deed', 'stamp paper', 'registration', 'executed instrument', 'property stamp duty'],
    relatedSections: [
      { sectionNumber: '17', actCode: 'STAMP', title: 'Instruments stamped with impressed stamps' },
      { sectionNumber: '35', actCode: 'STAMP', title: 'Instruments not duly stamped inadmissible in evidence' }
    ]
  },
  {
    act: 'Indian Stamp Act, 1899',
    actCode: 'STAMP',
    sectionNumber: '17',
    title: 'Instruments stamped with impressed stamps — how to be written',
    legalText: 'Every instrument written upon paper stamped with an impressed stamp shall be written in such manner, and every instrument partly or wholly written before being stamped shall be stamped in such manner, that the stamp shall appear on the face of the instrument, and cannot be used for or applied to any other instrument. (2) Nothing in this section shall prevent any endorsement which is duly stamped or is not chargeable with duty from being made upon any instrument after the execution thereof.',
    explanation: 'Section 17 lays down how stamped instruments must be physically prepared. The stamp must appear on the face (front) of the document, and it must be placed in a way that it cannot be removed and reused for another document. If the document is written before stamping, the stamp must be affixed so it appears on the face of the instrument. Endorsements (additional notations or transfers noted on the back) that are properly stamped or exempt from duty can be made after the document is executed. This section ensures the integrity of the stamping process and prevents fraud through reuse of stamps.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['impressed stamp', 'stamp paper', 'face of instrument', 'stamping method', 'endorsement', 'stamp position', 'execution of instrument', 'stamp affixing'],
    relatedSections: [
      { sectionNumber: '3', actCode: 'STAMP', title: 'Instruments chargeable with duty' },
      { sectionNumber: '35', actCode: 'STAMP', title: 'Instruments not duly stamped inadmissible in evidence' }
    ]
  },
  {
    act: 'Indian Stamp Act, 1899',
    actCode: 'STAMP',
    sectionNumber: '35',
    title: 'Instruments not duly stamped inadmissible in evidence, etc.',
    legalText: 'No instrument chargeable with duty shall be admitted in evidence for any purpose by any person having by law or consent of parties authority to receive evidence, or shall be acted upon, registered or authenticated by any such person or by any public officer, unless such instrument is duly stamped: Provided that— (a) any such instrument not being an instrument chargeable with a duty not exceeding ten naye paise only, or a bill of exchange or promissory note, shall, subject to all just exceptions, be admitted in evidence on payment of the duty with which the same is chargeable, or, in the case of an instrument insufficiently stamped, of the amount required to make up such duty, together with a penalty of five rupees, or, when ten times the amount of the proper duty or deficient portion thereof exceeds five rupees, of a sum equal to ten times such duty or portion; (b) where any person from whom a stamped receipt could have been demanded, has given an unstamped receipt and such receipt, if stamped, would be admissible in evidence against him, then such receipt shall be admitted in evidence against him on payment of a penalty of one rupee by the person tendering it; (c) where a contract or agreement of any kind is effected by correspondence consisting of two or more letters and any one of such letters bears the proper stamp, the contract or agreement shall be deemed to be duly stamped; (d) nothing herein contained shall prevent the admission of any instrument in evidence in any proceeding in a Criminal Court, other than a proceeding under Chapter XII or Chapter XXXVI of the Code of Criminal Procedure, 1898; (e) nothing herein contained shall prevent the admission of any instrument in any Court when such instrument has been executed by or on behalf of the Government, or where it bears the certificate of the Collector as provided by section 32 or any other provision of this Act.',
    explanation: 'Section 35 is one of the most practically important provisions of the Stamp Act. It states that any document that requires stamp duty but is not properly stamped CANNOT be admitted as evidence in court, cannot be registered, and cannot be authenticated by any public officer. However, there are important exceptions: (1) The document can be admitted if the deficient duty plus a penalty of 10 times the deficient amount is paid on the spot; (2) In criminal proceedings, unstamped documents can still be admitted as evidence (so a criminal case cannot be defeated just because a document lacks stamps); (3) If a contract is made through multiple letters and at least one letter is properly stamped, the contract is considered duly stamped; (4) Government documents and Collector-certified documents are always admissible.',
    punishment: 'Penalty of 10 times the deficient stamp duty (or Rs 5, whichever is higher) for admission of insufficiently stamped instruments',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['inadmissible evidence', 'stamp duty deficiency', 'unstamped document', 'court evidence', 'penalty for no stamp', 'registration refusal', 'stamp duty penalty', 'ten times penalty', 'impounding', 'criminal court exception'],
    relatedSections: [
      { sectionNumber: '3', actCode: 'STAMP', title: 'Instruments chargeable with duty' },
      { sectionNumber: '17', actCode: 'STAMP', title: 'Instruments stamped with impressed stamps' }
    ]
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing sections for all three act codes
    const actCodes = ['ITA1961', 'CGST', 'STAMP'];
    for (const code of actCodes) {
      const deleted = await LegalSection.deleteMany({ actCode: code });
      console.log(`Cleared ${deleted.deletedCount} existing ${code} sections`);
    }

    for (let i = 0; i < sections.length; i++) {
      await LegalSection.create(sections[i]);
      console.log(`[${i + 1}/${sections.length}] Section ${sections[i].sectionNumber}: ${sections[i].title}`);
    }

    console.log(`Done: seeded ${sections.length} sections`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed();
