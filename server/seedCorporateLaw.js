require('dotenv').config();
const mongoose = require('mongoose');
const LegalSection = require('./models/LegalSection');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lawbook';

const sections = [
  // Companies Act, 2013
  {
    act: 'Companies Act, 2013', actCode: 'CA2013', sectionNumber: '7', title: 'Incorporation of company',
    legalText: 'There shall be filed with the Registrar within whose jurisdiction the registered office of a company is proposed to be situated, the following documents and information for registration — (a) the memorandum and articles of the company duly signed by all the subscribers to the memorandum; (b) a declaration by an advocate, a chartered accountant, cost accountant or company secretary in practice, that all the requirements of this Act and the rules made thereunder have been complied with; (c) an affidavit from each subscriber to the memorandum and from persons named as the first directors; (d) the address for correspondence till its registered office is established; (e) the particulars of name, including surname or family name, residential address, nationality and such other particulars of every subscriber to the memorandum and persons mentioned as first directors.',
    explanation: 'To incorporate a company, you must file the memorandum & articles, professional declaration, subscriber affidavits, correspondence address, and director details with the Registrar of Companies.',
    punishment: 'N/A', category: 'Civil', cognizable: 'N/A', bailable: 'N/A',
    keywords: ['company', 'incorporation', 'registrar', 'memorandum', 'articles', 'formation']
  },
  {
    act: 'Companies Act, 2013', actCode: 'CA2013', sectionNumber: '149', title: 'Company to have Board of Directors',
    legalText: 'Every company shall have a Board of Directors consisting of individuals as directors and shall have — (a) a minimum number of three directors in the case of a public company, two directors in the case of a private company, and one director in the case of a One Person Company; and (b) a maximum of fifteen directors. Every listed public company shall have at least one-third of the total number of directors as independent directors, and at least one woman director.',
    explanation: 'Public companies need minimum 3 directors, private companies 2, and OPCs 1. Maximum 15 directors. Listed companies must have 1/3 independent directors and at least 1 woman director.',
    punishment: 'N/A', category: 'Civil', cognizable: 'N/A', bailable: 'N/A',
    keywords: ['directors', 'board', 'company', 'independent director', 'woman director', 'listed company']
  },
  {
    act: 'Companies Act, 2013', actCode: 'CA2013', sectionNumber: '166', title: 'Duties of directors',
    legalText: 'A director of a company shall act in accordance with the articles of the company. A director shall act in good faith in order to promote the objects of the company for the benefit of its members as a whole, and in the best interests of the company, its employees, the shareholders, the community and for the protection of environment. A director shall exercise his duties with due and reasonable care, skill and diligence. A director shall not be involved in a situation in which he may have a direct or indirect interest that conflicts, or possibly may conflict, with the interest of the company. A director shall not achieve or attempt to achieve any undue gain or advantage either to himself or to his relatives, partners, or associates.',
    explanation: 'Directors must act per the articles, in good faith, with due care, avoid conflicts of interest, and not seek undue personal gain. They owe duties to the company, shareholders, employees and the community.',
    punishment: 'Fine not less than Rs 1 lakh, may extend to Rs 5 lakhs', category: 'Civil', cognizable: 'N/A', bailable: 'N/A',
    keywords: ['director duties', 'fiduciary', 'good faith', 'conflict of interest', 'company law']
  },
  {
    act: 'Companies Act, 2013', actCode: 'CA2013', sectionNumber: '185', title: 'Loan to directors, etc.',
    legalText: 'No company shall, directly or indirectly, advance any loan, including any loan represented by a book debt, to any director of company, or to any other person in whom the director is interested or give any guarantee or provide any security in connection with any loan taken by him or such other person.',
    explanation: 'Companies are prohibited from giving loans, guarantees or security to their own directors or persons in whom directors are interested.',
    punishment: 'Imprisonment up to 6 months and/or fine from Rs 5 lakhs to Rs 25 lakhs for contravening director', category: 'Criminal', cognizable: 'N/A', bailable: 'N/A',
    keywords: ['loan', 'director', 'company', 'prohibition', 'guarantee']
  },
  {
    act: 'Companies Act, 2013', actCode: 'CA2013', sectionNumber: '447', title: 'Punishment for fraud',
    legalText: 'Without prejudice to any liability including repayment of any debt under this Act or any other law for the time being in force, any person who is found to be guilty of fraud involving an amount of at least ten lakh rupees or one per cent of the turnover of the company, whichever is lower, shall be punishable with imprisonment for a term which shall not be less than six months but which may extend to ten years and shall also be liable to fine which shall not be less than the amount involved in the fraud, but which may extend to three times the amount involved in the fraud.',
    explanation: 'Corporate fraud (Rs 10 lakh+ or 1% of turnover) carries 6 months to 10 years imprisonment plus fine equal to 1x-3x the fraud amount. This is one of the strictest penalties under company law.',
    punishment: 'Imprisonment 6 months to 10 years + fine 1x to 3x the fraud amount', category: 'Criminal', cognizable: 'Yes', bailable: 'No',
    keywords: ['fraud', 'company', 'corporate fraud', 'punishment', 'imprisonment']
  },

  // Insolvency and Bankruptcy Code, 2016
  {
    act: 'Insolvency and Bankruptcy Code, 2016', actCode: 'IBC', sectionNumber: '7', title: 'Initiation of corporate insolvency resolution process by financial creditor',
    legalText: 'A financial creditor either by itself or jointly with other financial creditors, or any other person on behalf of the financial creditor, as may be notified by the Central Government, may file an application for initiating corporate insolvency resolution process against a corporate debtor before the Adjudicating Authority when a default has occurred. A default shall not be less than one crore rupees.',
    explanation: 'A financial creditor (like a bank) can file for insolvency resolution against a company before NCLT when there is a default of Rs 1 crore or more.',
    punishment: 'N/A', category: 'Civil', cognizable: 'N/A', bailable: 'N/A',
    keywords: ['insolvency', 'financial creditor', 'NCLT', 'default', 'CIRP', 'IBC']
  },
  {
    act: 'Insolvency and Bankruptcy Code, 2016', actCode: 'IBC', sectionNumber: '9', title: 'Application for initiation by operational creditor',
    legalText: 'After the expiry of the period of ten days from the date of delivery of the notice or invoice demanding payment under sub-section (1) of section 8, if the operational creditor does not receive payment from the corporate debtor or notice of the dispute under sub-section (2) of section 8, the operational creditor may file an application before the Adjudicating Authority for initiating a corporate insolvency resolution process.',
    explanation: 'An operational creditor (supplier, employee, etc.) can file for insolvency before NCLT after giving 10 days notice demanding payment, if the debtor neither pays nor raises a dispute.',
    punishment: 'N/A', category: 'Civil', cognizable: 'N/A', bailable: 'N/A',
    keywords: ['operational creditor', 'insolvency', 'supplier', 'NCLT', 'demand notice']
  },
  {
    act: 'Insolvency and Bankruptcy Code, 2016', actCode: 'IBC', sectionNumber: '14', title: 'Moratorium',
    legalText: 'Subject to provisions of sub-sections (2) and (3), on the insolvency commencement date, the Adjudicating Authority shall by order declare moratorium for prohibiting all of the following — (a) the institution of suits or continuation of pending suits or proceedings against the corporate debtor including execution of any judgement, decree or order in any court of law, tribunal, arbitration panel or other authority; (b) transferring, encumbering, alienating or disposing of by the corporate debtor any of its assets or any legal right or beneficial interest therein; (c) any action to foreclose, recover or enforce any security interest created by the corporate debtor in respect of its property; (d) the recovery of any property by an owner or lessor where such property is occupied by or in the possession of the corporate debtor.',
    explanation: 'Once CIRP begins, NCLT declares a moratorium — all lawsuits, recovery actions, asset transfers and security enforcement against the company are frozen to allow the resolution process to work.',
    punishment: 'N/A', category: 'Civil', cognizable: 'N/A', bailable: 'N/A',
    keywords: ['moratorium', 'CIRP', 'insolvency', 'freeze', 'no suits', 'NCLT', 'IBC']
  },
  {
    act: 'Insolvency and Bankruptcy Code, 2016', actCode: 'IBC', sectionNumber: '29A', title: 'Persons not eligible to be resolution applicant',
    legalText: 'A person shall not be eligible to submit a resolution plan, if such person, or any other person acting jointly or in concert with such person — (a) is an undischarged insolvent; (b) is a wilful defaulter in accordance with the guidelines of the Reserve Bank of India; (c) at the time of submission of the resolution plan has an account, or an account of a corporate debtor under the management or control of such person or of whom such person is a promoter, classified as non-performing asset; (d) has been convicted for any offence punishable with imprisonment for two years or more.',
    explanation: 'Insolvents, wilful defaulters, persons with NPA accounts, and convicted criminals (2+ year sentence) cannot submit resolution plans. This prevents defaulting promoters from buying back their own companies cheaply.',
    punishment: 'N/A', category: 'Civil', cognizable: 'N/A', bailable: 'N/A',
    keywords: ['resolution applicant', 'eligibility', 'wilful defaulter', 'NPA', 'IBC', 'promoter']
  },

  // Competition Act, 2002
  {
    act: 'Competition Act, 2002', actCode: 'COMP', sectionNumber: '3', title: 'Anti-competitive agreements',
    legalText: 'No enterprise or association of enterprises or person or association of persons shall enter into any agreement in respect of production, supply, distribution, storage, acquisition or control of goods or provision of services, which causes or is likely to cause an appreciable adverse effect on competition within India. Any agreement entered into in contravention of the provisions contained in this section shall be void.',
    explanation: 'Agreements between businesses that harm competition in India are void. This covers cartels (price fixing, market sharing, bid rigging), and vertical agreements (exclusive supply, refusal to deal, resale price maintenance, tying).',
    punishment: 'Penalty up to 10% of average turnover for preceding 3 financial years; individuals may face imprisonment up to 3 years and/or fine up to Rs 25 crores', category: 'Civil', cognizable: 'N/A', bailable: 'N/A',
    keywords: ['anti-competitive', 'cartel', 'price fixing', 'competition', 'CCI', 'agreement']
  },
  {
    act: 'Competition Act, 2002', actCode: 'COMP', sectionNumber: '4', title: 'Abuse of dominant position',
    legalText: 'No enterprise or group shall abuse its dominant position. There shall be an abuse of dominant position if an enterprise or a group — (a) directly or indirectly, imposes unfair or discriminatory condition or price in purchase or sale of goods or service; (b) limits or restricts production of goods or provision of services or market therefor; (c) indulges in practice or practices resulting in denial of market access in any manner; (d) makes conclusion of contracts subject to acceptance by other parties of supplementary obligations which, by their nature or according to commercial usage, have no connection with the subject of such contracts; (e) uses its dominant position in one relevant market to enter into, or protect, another relevant market.',
    explanation: 'A dominant enterprise must not abuse its position by imposing unfair prices, restricting supply, denying market access, or leveraging its dominance to enter other markets. CCI can impose penalties.',
    punishment: 'Penalty up to 10% of average turnover for preceding 3 years', category: 'Civil', cognizable: 'N/A', bailable: 'N/A',
    keywords: ['dominant position', 'abuse', 'monopoly', 'CCI', 'competition', 'unfair pricing']
  },

  // Limited Liability Partnership Act, 2008
  {
    act: 'Limited Liability Partnership Act, 2008', actCode: 'LLP', sectionNumber: '3', title: 'LLP to be body corporate',
    legalText: 'A limited liability partnership is a body corporate formed and incorporated under this Act and is a legal entity separate from that of its partners. A limited liability partnership shall have perpetual succession.',
    explanation: 'An LLP is a separate legal entity from its partners, meaning it can own property, sue and be sued in its own name. It has perpetual succession — it continues to exist even if partners change.',
    punishment: 'N/A', category: 'Civil', cognizable: 'N/A', bailable: 'N/A',
    keywords: ['LLP', 'limited liability', 'partnership', 'body corporate', 'separate entity']
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    const codes = ['CA2013', 'IBC', 'COMP', 'LLP'];
    for (const code of codes) {
      const deleted = await LegalSection.deleteMany({ actCode: code });
      if (deleted.deletedCount > 0) console.log(`Cleared ${deleted.deletedCount} existing ${code} sections`);
    }
    for (let i = 0; i < sections.length; i++) {
      await LegalSection.create(sections[i]);
      console.log(`[${i + 1}/${sections.length}] Section ${sections[i].sectionNumber}: ${sections[i].title}`);
    }
    console.log(`Done: seeded ${sections.length} corporate law sections`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}
seed();
