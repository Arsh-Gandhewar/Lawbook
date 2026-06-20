// Seed script to add Banking and Financial Law sections to the legal database
// Run with: node server/seedBankingLaw.js

require('dotenv').config();
const mongoose = require('mongoose');
const LegalSection = require('./models/LegalSection');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lawbook';

const bankingSections = [
  // ═══════════════════════════════════════════════════════════════════
  // Securitisation and Reconstruction of Financial Assets and
  // Enforcement of Security Interest Act, 2002 (SARFAESI)
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'Securitisation and Reconstruction of Financial Assets and Enforcement of Security Interest Act, 2002',
    actCode: 'SAR',
    sectionNumber: '13',
    title: 'Enforcement of security interest',
    legalText: '(1) Notwithstanding anything contained in section 69 or section 69A of the Transfer of Property Act, 1882 (4 of 1882), any security interest created in favour of any secured creditor may be enforced, without the intervention of the court or tribunal, by such creditor in accordance with the provisions of this Act. (2) Where any borrower, who is under a liability to a secured creditor under a security agreement, makes any default in repayment of secured debt or any instalment thereof, and his account in respect of such debt is classified by the secured creditor as non-performing asset, then, the secured creditor may require the borrower by notice in writing to discharge in full his liabilities to the secured creditor within sixty days from the date of notice failing which the secured creditor shall be entitled to exercise all or any of the rights under sub-section (4). (3) The notice referred to in sub-section (2) shall contain the details of the amount payable by the borrower and the secured assets intended to be enforced by the secured creditor in the event of non-payment of secured debts by the borrower. (3A) If, on receipt of the notice under sub-section (2), the borrower makes any representation or raises any objection, the secured creditor shall consider such representation or objection and if the secured creditor comes to the conclusion that such representation or objection is not acceptable or tenable, he shall communicate within fifteen days of receipt of such representation or objection the reasons for non-acceptance of the representation or objection to the borrower. (4) In case the borrower fails to discharge his liability in full within the period specified in sub-section (2), the secured creditor may take recourse to one or more of the following measures to recover his secured debt, namely:— (a) take possession of the secured assets of the borrower including the right to transfer by way of lease, assignment or sale for realising the secured asset; (b) take over the management of the business of the borrower including the right to transfer by way of lease, assignment or sale for realising the secured asset; (c) appoint any person to manage the secured assets the possession of which has been taken over by the secured creditor; (d) require at any time by notice in writing, any person who has acquired any of the secured assets from the borrower and from whom any money is due or may become due to the borrower, to pay the secured creditor, so much of the money as is sufficient to pay the secured debt.',
    explanation: 'This is the most important and widely used section of the SARFAESI Act. It allows banks and financial institutions to recover their loans by directly enforcing their security interest (mortgage, hypothecation, pledge) WITHOUT going to court. The process is: (1) Bank classifies the loan as NPA (Non-Performing Asset); (2) Issues a 60-day notice to the borrower demanding full repayment; (3) Borrower can raise objections within 30 days; (4) If borrower fails to pay, bank can seize the property, take over management of business, sell/lease the asset, or intercept payments due to the borrower. This section has been upheld as constitutional by the Supreme Court in Mardia Chemicals Ltd v. Union of India (2004).',
    punishment: 'N/A (civil/recovery provision)',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['SARFAESI', 'security interest', 'NPA', 'non-performing asset', 'bank recovery', 'secured creditor', 'loan recovery', 'property seizure', 'possession notice', '60 day notice', 'loan default', 'bank auction'],
    relatedSections: [
      { sectionNumber: '14', actCode: 'SAR', title: 'Chief Metropolitan Magistrate or District Magistrate to assist secured creditor' },
      { sectionNumber: '17', actCode: 'SAR', title: 'Right to appeal to Debts Recovery Tribunal' },
      { sectionNumber: '19', actCode: 'RDB', title: 'Application to Tribunal for debt recovery' }
    ]
  },
  {
    act: 'Securitisation and Reconstruction of Financial Assets and Enforcement of Security Interest Act, 2002',
    actCode: 'SAR',
    sectionNumber: '14',
    title: 'Chief Metropolitan Magistrate or District Magistrate to assist secured creditor in taking possession of secured asset',
    legalText: '(1) Where the possession of any secured asset is required to be taken by the secured creditor or if any of the secured asset is required to be sold or transferred by the secured creditor under the provisions of this Act, the secured creditor may, for the purpose of taking possession or control of any such secured asset, request, in writing, the Chief Metropolitan Magistrate or the District Magistrate within whose jurisdiction any such secured asset or other documents relating thereto may be situated or found, to take possession thereof, and the Chief Metropolitan Magistrate or the District Magistrate, as the case may be, shall, on such request being made to him— (a) take possession of such asset and documents relating thereto; and (b) forward such assets and documents to the secured creditor. (1A) The Chief Metropolitan Magistrate or the District Magistrate, as the case may be, shall take possession of the asset and documents within a period of thirty days from the date of the application by the secured creditor and forward the same to the secured creditor. (2) For the purpose of securing compliance with the provisions of sub-section (1), the Chief Metropolitan Magistrate or the District Magistrate may take or cause to be taken such steps and use, or cause to be used, such force, as may, in his opinion, be necessary. (3) No act of the Chief Metropolitan Magistrate or the District Magistrate done in pursuance of this section shall be called in question in any court or before any authority.',
    explanation: 'When a borrower refuses to surrender possession of the secured asset (like a mortgaged property or pledged goods), the bank cannot use force on its own. Instead, it can approach the Chief Metropolitan Magistrate (CMM) or District Magistrate (DM), who is legally obligated to assist the bank in taking possession. The Magistrate can use necessary force and must complete the process within 30 days. The Magistrate\'s actions under this section cannot be challenged in any court. This provision was added to ensure that banks can effectively enforce their rights under Section 13 without delays.',
    punishment: 'N/A (enforcement provision)',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['magistrate assistance', 'possession', 'SARFAESI enforcement', 'CMM', 'District Magistrate', 'asset possession', 'forced possession', 'property takeover', 'bank possession'],
    relatedSections: [
      { sectionNumber: '13', actCode: 'SAR', title: 'Enforcement of security interest' },
      { sectionNumber: '17', actCode: 'SAR', title: 'Right to appeal to Debts Recovery Tribunal' }
    ]
  },
  {
    act: 'Securitisation and Reconstruction of Financial Assets and Enforcement of Security Interest Act, 2002',
    actCode: 'SAR',
    sectionNumber: '17',
    title: 'Right to appeal to Debts Recovery Tribunal',
    legalText: '(1) Any person (including borrower), aggrieved by any of the measures referred to in sub-section (4) of section 13 taken by the secured creditor or his authorised officer under this Chapter, may make an application along with such fee, as may be prescribed to the Debts Recovery Tribunal having jurisdiction in the matter within forty-five days from the date on which such measure had been taken: Provided that different fees may be prescribed for making the application by the borrower and the aggrieved person. (2) The Debts Recovery Tribunal shall consider whether any of the measures referred to in sub-section (4) of section 13, taken by the secured creditor for enforcement of security are in accordance with the provisions of this Act and the rules made thereunder. (3) If, the Debts Recovery Tribunal, after examining the facts and circumstances of the case and evidence produced by the parties, comes to the conclusion that any of the measures referred to in sub-section (4) of section 13, taken by the secured creditor are not in accordance with the provisions of this Act and the rules made thereunder, and require restoration of the management or restoration of possession of the secured assets to the borrower, it may by order, declare the recourse to any one or more measures referred to in sub-section (4) of section 13 taken by the secured creditor as invalid and restore the possession of the secured assets to the borrower and pass such order as it may consider appropriate and necessary in relation to any of the recourse taken by the secured creditor under sub-section (4) of section 13. (5) Any application under this section shall be dealt with by the Debts Recovery Tribunal as expeditiously as possible and disposed of within sixty days from the date of such application.',
    explanation: 'This section provides the borrower\'s remedy against SARFAESI action. Any person aggrieved by the bank\'s enforcement measures (seizure, sale, etc.) under Section 13(4) can file an appeal before the Debts Recovery Tribunal (DRT) within 45 days. The DRT examines whether the bank followed proper procedure and the law. If the DRT finds the bank\'s actions were illegal, it can declare them invalid, restore possession to the borrower, and pass appropriate orders. The DRT must dispose of the application within 60 days. Further appeal lies to the Debts Recovery Appellate Tribunal (DRAT) under Section 18, and then to the High Court under Article 226/227 of the Constitution.',
    punishment: 'N/A (appellate provision)',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['DRT appeal', 'SARFAESI appeal', 'Debts Recovery Tribunal', 'borrower rights', 'challenge SARFAESI', 'Section 13 appeal', 'borrower remedy', 'bank action challenge'],
    relatedSections: [
      { sectionNumber: '13', actCode: 'SAR', title: 'Enforcement of security interest' },
      { sectionNumber: '14', actCode: 'SAR', title: 'Chief Metropolitan Magistrate or District Magistrate to assist secured creditor' },
      { sectionNumber: '34', actCode: 'RDB', title: 'Appeal to Appellate Tribunal' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // Recovery of Debts and Bankruptcy Act, 1993
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'Recovery of Debts and Bankruptcy Act, 1993',
    actCode: 'RDB',
    sectionNumber: '19',
    title: 'Application to Tribunal for recovery of debts due to banks and financial institutions',
    legalText: '(1) Where a bank or a financial institution has to recover any debt from any person, it may make an application to the Tribunal within the local limits of whose jurisdiction— (a) the defendant, or each of the defendants, where there are more than one, at the time of making the application, actually and voluntarily resides, or carries on business, or personally works for gain; or (b) any of the defendants, where there are more than one, at the time of making the application, actually and voluntarily resides, or carries on business, or personally works for gain; or (c) the cause of action, wholly or in part, arises. (2) Every application under sub-section (1) shall be in such form and accompanied by such documents or other evidence and by such fee as may be prescribed. (3) On receipt of the application under sub-section (1), the Tribunal shall issue summons requiring the defendant to show cause within thirty days of the service of summons as to why the relief prayed for should not be granted. (4) The applicant shall serve a copy of the application with complete documents as filed before the Tribunal on the defendant either by registered post with acknowledgement due or by speed post with acknowledgement due or by courier with acknowledgement due or by any other means as the Tribunal may direct. (5) The Tribunal may make an interim order, whether by way of injunction or stay or attachment, against the defendant to debar him from transferring, alienating or otherwise dealing with, or disposing of, any property belonging to him, without the prior permission of the Tribunal. (22) The Presiding Officer shall dispose of the application as expeditiously as possible and every effort shall be made to dispose of the application within six months from the date of receipt of the application.',
    explanation: 'This section establishes the procedure for banks and financial institutions to recover debts through the Debts Recovery Tribunal (DRT). Instead of filing a civil suit in regular courts (which could take years), banks can directly approach the DRT for expeditious recovery. The DRT has jurisdiction based on where the borrower resides/works or where the cause of action arose. The minimum threshold for DRT jurisdiction is ₹20 lakh. The DRT can issue interim orders to freeze the borrower\'s assets, preventing dissipation. Applications must be disposed within 6 months. The DRT\'s recovery mechanism includes issuing a Recovery Certificate, which can be executed like a decree.',
    punishment: 'N/A (debt recovery provision)',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['DRT', 'debt recovery', 'bank recovery', 'financial institution', 'loan default', 'debt recovery tribunal', 'recovery application', 'bank loan', 'NPA recovery', 'recovery certificate'],
    relatedSections: [
      { sectionNumber: '34', actCode: 'RDB', title: 'Appeal to Appellate Tribunal' },
      { sectionNumber: '13', actCode: 'SAR', title: 'Enforcement of security interest' },
      { sectionNumber: '17', actCode: 'SAR', title: 'Right to appeal to Debts Recovery Tribunal' }
    ]
  },
  {
    act: 'Recovery of Debts and Bankruptcy Act, 1993',
    actCode: 'RDB',
    sectionNumber: '34',
    title: 'Appeal to Appellate Tribunal',
    legalText: '(1) Any person aggrieved by an order made, or deemed to have been made, by a Tribunal under this Act, may prefer an appeal along with such fee, as may be prescribed to an Appellate Tribunal having jurisdiction in the matter. (2) Every appeal under sub-section (1) shall be filed within a period of forty-five days from the date on which a copy of the order made, or deemed to have been made, by the Tribunal is received by him and it shall be in such form and be accompanied by such fee as may be prescribed: Provided that the Appellate Tribunal may entertain an appeal after the expiry of the said period of forty-five days if it is satisfied that there was sufficient cause for not filing it within that period. (3) On receipt of an appeal under sub-section (1), the Appellate Tribunal may, after giving the parties to the appeal an opportunity of being heard, pass such orders thereon as it thinks fit, confirming, modifying or setting aside the order appealed against. (4) The Appellate Tribunal shall send a copy of every order made by it to the parties to the appeal and to the concerned Tribunal. (5) The appeal filed before the Appellate Tribunal shall be dealt with by it as expeditiously as possible and endeavour shall be made by it to dispose of the appeal finally within six months from the date of receipt of the appeal. (6) No appeal shall be entertained by the Appellate Tribunal unless the borrower has deposited with the Appellate Tribunal fifty per cent of the amount of debt so due from him as determined by the Tribunal under section 19: Provided that the Appellate Tribunal may, for reasons to be recorded in writing, reduce the amount to not less than twenty-five per cent of the debt so due.',
    explanation: 'This section provides the appellate mechanism against DRT orders. Any person aggrieved by a DRT order can appeal to the Debts Recovery Appellate Tribunal (DRAT) within 45 days (extendable for sufficient cause). A critical requirement is the mandatory pre-deposit: the borrower must deposit 50% of the determined debt amount with the DRAT before the appeal is entertained (reducible to 25% at DRAT\'s discretion for recorded reasons). The DRAT must endeavour to dispose of appeals within 6 months. From the DRAT, further challenges can be made to the High Court under Articles 226/227 of the Constitution, and then to the Supreme Court.',
    punishment: 'N/A (appellate provision)',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['DRAT', 'appellate tribunal', 'appeal', 'DRT appeal', 'debt recovery appeal', 'pre-deposit', 'fifty percent deposit', 'borrower appeal', 'recovery appeal'],
    relatedSections: [
      { sectionNumber: '19', actCode: 'RDB', title: 'Application to Tribunal for recovery of debts due to banks and financial institutions' },
      { sectionNumber: '17', actCode: 'SAR', title: 'Right to appeal to Debts Recovery Tribunal' },
      { sectionNumber: '13', actCode: 'SAR', title: 'Enforcement of security interest' }
    ]
  }
];

async function seedBankingLaw() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Clear existing sections for all banking act codes
    const actCodes = ['SAR', 'RDB'];
    for (const code of actCodes) {
      const existing = await LegalSection.countDocuments({ actCode: code });
      if (existing > 0) {
        console.log(`🗑️  Removing ${existing} existing ${code} sections...`);
        await LegalSection.deleteMany({ actCode: code });
      }
    }

    console.log(`\n📚 Seeding ${bankingSections.length} banking law sections...\n`);

    const acts = [...new Set(bankingSections.map(s => s.act))];
    for (const act of acts) {
      const actSections = bankingSections.filter(s => s.act === act);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`📖 ${act}`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      for (const section of actSections) {
        await LegalSection.create(section);
        console.log(`   ✅ ${section.actCode} Section ${section.sectionNumber} — ${section.title}`);
      }
      console.log('');
    }

    const totalBanking = bankingSections.length;
    const totalAll = await LegalSection.countDocuments();

    console.log(`═══════════════════════════════════════════`);
    console.log(`🎉 BANKING LAW SEEDING COMPLETE`);
    console.log(`═══════════════════════════════════════════`);
    console.log(`   Banking sections added: ${totalBanking}`);
    console.log(`   Total DB sections:      ${totalAll}`);
    console.log(`═══════════════════════════════════════════\n`);

  } catch (error) {
    console.error('❌ Error seeding banking law sections:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB.');
    process.exit(0);
  }
}

seedBankingLaw();
