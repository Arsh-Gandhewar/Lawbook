// Seed script for Property, Corporate, Tax, IP, and Contract (Commercial) Law verdicts
// Run with: node server/seedVerdictsPropertyCommercial.js

require('dotenv').config();
const mongoose = require('mongoose');
const CourtVerdict = require('./models/CourtVerdict');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lawbook';

const verdicts = [
  // ═══════════════════════════════════════════════
  // PROPERTY LAW
  // ═══════════════════════════════════════════════
  {
    caseName: 'S.P. Chengalvaraya Naidu v. Jagannath',
    citation: '(1994) 1 SCC 1',
    court: 'Supreme Court',
    year: 1994,
    judges: ['M.N. Venkatachaliah', 'S. Mohan'],
    summary: 'The appellant obtained a decree by suppressing a vital document — a release deed executed by him in favour of the respondent. The Supreme Court set aside the decree, holding that fraud vitiates all solemn acts and that a judgment obtained by fraud is a nullity.',
    legalPrinciple: 'Fraud vitiates everything — every solemn act, including court judgments and decrees. A decree obtained by fraud is a nullity and non est in the eye of the law.',
    verdict: 'The Supreme Court set aside the decree obtained by the appellant through suppression of the release deed. The court held that fraud unravels everything and a judgment or decree obtained by playing fraud on the court is a nullity.',
    significance: 'Established the foundational principle that fraud vitiates all transactions in Indian property law. The decision is routinely cited in cases involving fraudulent property transfers, suppression of material facts, and decrees obtained by fraud.',
    relatedSections: ['Section 17 (Indian Contract Act)', 'Section 19 (Indian Contract Act)', 'Order VI Rule 15 (CPC)'],
    relatedActs: ['Indian Contract Act, 1872', 'Code of Civil Procedure, 1908', 'Transfer of Property Act, 1882'],
    category: 'Property',
    keywords: ['fraud vitiates', 'suppression of facts', 'release deed', 'decree by fraud', 'nullity', 'property fraud']
  },
  {
    caseName: 'Suraj Lamp & Industries Pvt. Ltd. v. State of Haryana',
    citation: '(2012) 1 SCC 656',
    court: 'Supreme Court',
    year: 2012,
    judges: ['R.V. Raveendran', 'A.K. Patnaik'],
    summary: 'The Supreme Court examined the practice of transferring immovable property through General Power of Attorney (GPA), agreements to sell, and wills (GPA-Sale-Will transactions). The court declared that such transactions do not convey title and are not valid modes of transfer of immovable property.',
    legalPrinciple: 'Immovable property can be legally transferred or conveyed only by a registered deed of conveyance (sale deed). Transactions through General Power of Attorney, agreement to sell, and will (GPA-Sale-Will) do not create any right, title, or interest in the property.',
    verdict: 'The Supreme Court held that property sales through GPA-Sale-Will transactions are illegal and do not convey title. Only registered sale deeds can transfer immovable property. The court directed all state governments to ensure registration of conveyance deeds.',
    significance: 'Ended the widespread practice of property transfers through power of attorney, particularly in Delhi-NCR and urban India. This landmark ruling forced millions of property holders to regularize their titles through proper registration.',
    relatedSections: ['Section 54 (TPA)', 'Section 17 (Registration Act)', 'Section 49 (Registration Act)'],
    relatedActs: ['Transfer of Property Act, 1882', 'Indian Registration Act, 1908', 'Indian Stamp Act, 1899'],
    category: 'Property',
    keywords: ['power of attorney sale', 'GPA sale', 'registered sale deed', 'property transfer', 'conveyance deed', 'immovable property']
  },
  {
    caseName: 'Shanti Devi v. Rajinder Singh',
    citation: '(2019) 18 SCC 116',
    court: 'Supreme Court',
    year: 2019,
    judges: ['U.U. Lalit', 'Indu Malhotra'],
    summary: 'The Supreme Court laid down comprehensive guidelines on when specific performance of contracts relating to immovable property should be granted. The court examined the conditions under which a court may exercise discretion to grant or refuse specific performance.',
    legalPrinciple: 'Specific performance is not granted merely because it is lawful to do so. The court must consider whether the plaintiff was ready and willing to perform their part of the contract, the conduct of parties, and whether damages would be an adequate remedy.',
    verdict: 'The court held that specific performance of a contract for sale of immovable property is a discretionary remedy. The plaintiff must show continuous readiness and willingness to perform the contract. Mere institution of suit is not sufficient — actual conduct must demonstrate readiness.',
    significance: 'Clarified the law on specific performance of property contracts, setting out clear conditions that plaintiffs must satisfy. The decision provides guidance to trial courts on exercising discretion in specific performance suits.',
    relatedSections: ['Section 16 (Specific Relief Act)', 'Section 20 (Specific Relief Act)', 'Section 10 (Specific Relief Act)'],
    relatedActs: ['Specific Relief Act, 1963', 'Transfer of Property Act, 1882', 'Indian Contract Act, 1872'],
    category: 'Property',
    keywords: ['specific performance', 'readiness and willingness', 'agreement to sell', 'discretionary remedy', 'property contract', 'immovable property']
  },
  {
    caseName: 'Nair Service Society Ltd. v. K.C. Alexander',
    citation: 'AIR 1968 SC 1165',
    court: 'Supreme Court',
    year: 1968,
    judges: ['K. Subba Rao', 'J.M. Shelat', 'V. Bhargava'],
    summary: 'The Supreme Court examined the doctrine of part performance under Section 53A of the Transfer of Property Act. The case concerned the rights of a transferee who had taken possession under an agreement to sell but the sale deed was not executed.',
    legalPrinciple: 'Section 53A of the Transfer of Property Act provides a shield, not a sword. A person in possession under part performance can defend their possession but cannot use Section 53A as a basis to claim title or seek specific performance.',
    verdict: 'The court held that Section 53A is a defensive provision — it protects the possession of a person who has partly performed a contract of transfer. However, it does not confer title and cannot be used as an offensive weapon to claim ownership.',
    significance: 'Established the crucial distinction between using Section 53A as a shield versus a sword in property disputes. This principle continues to govern thousands of property cases involving agreements to sell.',
    relatedSections: ['Section 53A (TPA)', 'Section 54 (TPA)', 'Section 17 (Registration Act)'],
    relatedActs: ['Transfer of Property Act, 1882', 'Indian Registration Act, 1908'],
    category: 'Property',
    keywords: ['part performance', 'section 53A', 'shield not sword', 'agreement to sell', 'possession', 'property transfer']
  },
  {
    caseName: 'Vidya Devi v. State of Himachal Pradesh',
    citation: '(2020) 2 SCC 569',
    court: 'Supreme Court',
    year: 2020,
    judges: ['Arun Mishra', 'Indira Banerjee', 'Vineet Saran', 'M.R. Shah', 'S. Ravindra Bhat'],
    summary: 'A five-judge bench of the Supreme Court examined the principles governing land acquisition compensation and the rights of landowners when their property is acquired by the government under eminent domain.',
    legalPrinciple: 'In land acquisition matters, the compensation must reflect the true market value of the land at the time of acquisition. The government cannot undervalue land to deprive rightful owners of fair compensation.',
    verdict: 'The court held that landowners are entitled to fair market value compensation. The determination of market value should consider the potential use of the land, comparable sale instances in the vicinity, and the development potential of the area.',
    significance: 'Strengthened the rights of landowners in acquisition proceedings by mandating that compensation reflect genuine market value rather than artificially depressed government valuations.',
    relatedSections: ['Section 23 (Land Acquisition Act)', 'Section 26 (RFCTLARR Act)', 'Article 300A (Constitution)'],
    relatedActs: ['Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013', 'Land Acquisition Act, 1894', 'Constitution of India'],
    category: 'Property',
    keywords: ['land acquisition', 'fair compensation', 'market value', 'eminent domain', 'government acquisition', 'RFCTLARR']
  },
  {
    caseName: 'Baldev Singh v. Manohar Singh',
    citation: '(2006) 6 SCC 498',
    court: 'Supreme Court',
    year: 2006,
    judges: ['S.B. Sinha', 'Markandey Katju'],
    summary: 'The Supreme Court examined the law on pre-emption — the right of a co-sharer or adjoining owner to purchase property in preference to a stranger when the property owner decides to sell.',
    legalPrinciple: 'The right of pre-emption is a very weak right. It can be defeated by the vendor transferring the property to a stranger before the pre-emptor exercises the right. The right attaches upon the sale but must be asserted promptly.',
    verdict: 'The court upheld the right of pre-emption under Punjab law but clarified that it is a weak right that must be exercised within the prescribed limitation period. Delay in filing a suit for pre-emption can defeat the claim.',
    significance: 'Clarified the nature and limitations of pre-emption rights in Indian property law, particularly relevant in Punjab, Haryana, and other states where customary pre-emption rights are recognized.',
    relatedSections: ['Section 15 (Punjab Pre-emption Act)', 'Section 806 (CPC)'],
    relatedActs: ['Punjab Pre-emption Act, 1913', 'Transfer of Property Act, 1882', 'Code of Civil Procedure, 1908'],
    category: 'Property',
    keywords: ['pre-emption', 'co-sharer', 'adjoining owner', 'right of first refusal', 'property sale', 'Punjab law']
  },
  {
    caseName: 'Ravinder Kaur Grewal v. Manjit Kaur',
    citation: '(2019) 8 SCC 729',
    court: 'Supreme Court',
    year: 2019,
    judges: ['Arun Mishra', 'Navin Sinha', 'Indira Banerjee'],
    summary: 'The Supreme Court reiterated the principles laid down in Suraj Lamp regarding property transfers through power of attorney. The court examined whether a sale through an irrevocable general power of attorney confers valid title on the purchaser.',
    legalPrinciple: 'An irrevocable power of attorney or general power of attorney cannot be used as a mode of transfer of immovable property. Such transactions are not recognized as valid conveyances under the Transfer of Property Act.',
    verdict: 'The court reaffirmed that immovable property can be transferred only through a registered sale deed and not through power of attorney. GPA transactions are not legally recognized modes of property transfer.',
    significance: 'Reinforced the Suraj Lamp principles and confirmed that the ban on GPA-based property transfers applies retroactively. Provided clarity on the invalidity of irrevocable power of attorney as a conveyance tool.',
    relatedSections: ['Section 54 (TPA)', 'Section 17 (Registration Act)', 'Section 202 (Indian Contract Act)'],
    relatedActs: ['Transfer of Property Act, 1882', 'Indian Registration Act, 1908', 'Powers of Attorney Act, 1882'],
    category: 'Property',
    keywords: ['power of attorney', 'GPA sale invalid', 'irrevocable power of attorney', 'property transfer', 'registered sale deed', 'Suraj Lamp']
  },
  {
    caseName: 'DLF Ltd. v. Competition Commission of India',
    citation: '(2017) SCC OnLine CCI 36',
    court: 'Supreme Court',
    year: 2017,
    judges: ['R.F. Nariman', 'Navin Sinha'],
    summary: 'DLF Limited, a major real estate developer, was found guilty of abuse of dominant position in the Gurgaon real estate market by imposing unfair and one-sided conditions on homebuyers in its apartment buyer agreements.',
    legalPrinciple: 'A dominant enterprise in the real estate market cannot impose unfair and discriminatory conditions on homebuyers. Abuse of dominant position through one-sided buyer agreements constitutes a violation of competition law.',
    verdict: 'The Competition Commission imposed a penalty of Rs. 630 crore on DLF for abusing its dominant position. The Supreme Court upheld the finding that DLF had imposed unfair conditions on homebuyers through its standard-form agreements.',
    significance: 'First major case where a real estate giant was penalized for abuse of dominant position. Set a precedent for holding developers accountable under competition law for imposing unfair terms on homebuyers.',
    relatedSections: ['Section 4 (Competition Act)', 'Section 27 (Competition Act)', 'Section 36 (Competition Act)'],
    relatedActs: ['Competition Act, 2002', 'Real Estate (Regulation and Development) Act, 2016'],
    category: 'Corporate',
    keywords: ['abuse of dominant position', 'DLF', 'real estate', 'competition law', 'homebuyer rights', 'unfair conditions', 'CCI penalty']
  },

  // ═══════════════════════════════════════════════
  // CORPORATE LAW / INSOLVENCY
  // ═══════════════════════════════════════════════
  {
    caseName: 'Life Insurance Corporation of India v. Escorts Ltd.',
    citation: '(1986) 1 SCC 264',
    court: 'Supreme Court',
    year: 1986,
    judges: ['O. Chinnappa Reddy', 'E.S. Venkataramiah'],
    summary: 'The Supreme Court examined whether the corporate veil of a company can be lifted to identify the persons who are in actual control. LIC, a major institutional shareholder, challenged certain transactions of Escorts Ltd. as being detrimental to the company.',
    legalPrinciple: 'The corporate veil can be lifted where a company is used as a device to evade taxes, circumvent legal obligations, or to perpetrate fraud. The court may look behind the corporate facade to the real persons in control.',
    verdict: 'The court held that the corporate veil can be pierced in appropriate cases — where the company is used as a cloak for fraud, improper conduct, or to evade legal obligations. However, it must be done cautiously and only when the circumstances clearly warrant it.',
    significance: 'This is the leading Indian authority on the doctrine of lifting the corporate veil. It replaced the reliance on the English Salomon v. Salomon principle with a distinctly Indian framework, recognizing that corporate personality is not absolute.',
    relatedSections: ['Section 7 (Companies Act)', 'Section 34 (Companies Act)', 'Section 542 (Companies Act, 1956)'],
    relatedActs: ['Companies Act, 1956', 'Life Insurance Corporation Act, 1956', 'Securities Contracts (Regulation) Act, 1956'],
    category: 'Corporate',
    keywords: ['lifting corporate veil', 'piercing corporate veil', 'corporate personality', 'shareholder rights', 'fraud', 'company law']
  },
  {
    caseName: 'Tata Sons Pvt. Ltd. v. Cyrus Investments Pvt. Ltd.',
    citation: '(2021) 9 SCC 449',
    court: 'Supreme Court',
    year: 2021,
    judges: ['S.A. Bobde', 'A.S. Bopanna', 'V. Ramasubramanian'],
    summary: 'Cyrus Mistry was removed as the Chairman of Tata Sons by the board of directors. He challenged his removal before NCLT, NCLAT, and the Supreme Court, alleging oppression and mismanagement. The Supreme Court upheld the removal.',
    legalPrinciple: 'The board of directors of a company has the power to remove its chairman if such power is vested in the board by the articles of association. Minority shareholders cannot claim oppression merely because their nominee was removed from a managerial position.',
    verdict: 'The Supreme Court reversed the NCLAT order reinstating Cyrus Mistry and upheld his removal as chairman of Tata Sons. The court held that the Tata Sons board was within its rights to remove the chairman and that there was no oppression or mismanagement.',
    significance: 'The most significant corporate governance case in modern India. Clarified the powers of the board of directors, the rights of minority shareholders, and the limits of NCLT/NCLAT jurisdiction in corporate disputes.',
    relatedSections: ['Section 241 (Companies Act, 2013)', 'Section 242 (Companies Act, 2013)', 'Section 244 (Companies Act, 2013)'],
    relatedActs: ['Companies Act, 2013'],
    category: 'Corporate',
    keywords: ['corporate governance', 'board of directors', 'chairman removal', 'Tata Sons', 'Cyrus Mistry', 'minority shareholder', 'oppression', 'mismanagement']
  },
  {
    caseName: 'Swiss Ribbons Pvt. Ltd. v. Union of India',
    citation: '(2019) 4 SCC 17',
    court: 'Supreme Court',
    year: 2019,
    judges: ['R.F. Nariman', 'Navin Sinha'],
    summary: 'The constitutional validity of the Insolvency and Bankruptcy Code, 2016 (IBC) was challenged. The petitioners argued that various provisions of the IBC were unconstitutional and arbitrary.',
    legalPrinciple: 'The Insolvency and Bankruptcy Code, 2016 is a valid piece of legislation that does not violate Articles 14, 19, or 21 of the Constitution. The differentiation between financial creditors and operational creditors is based on intelligible differentia with a rational nexus to the object of the Act.',
    verdict: 'The Supreme Court upheld the constitutional validity of the IBC in its entirety. The court held that the distinction between financial and operational creditors is constitutionally valid and that the IBC serves a legitimate purpose of resolving corporate insolvency in a time-bound manner.',
    significance: 'Settled the constitutional debate around the IBC, confirming it as a transformative legislation. The judgment validated the entire IBC framework including the role of NCLT, the distinction between creditor classes, and the time-bound resolution process.',
    relatedSections: ['Section 7 (IBC)', 'Section 9 (IBC)', 'Section 12A (IBC)', 'Section 29A (IBC)'],
    relatedActs: ['Insolvency and Bankruptcy Code, 2016', 'Constitution of India'],
    category: 'Corporate',
    keywords: ['IBC', 'insolvency', 'bankruptcy', 'constitutional validity', 'financial creditor', 'operational creditor', 'NCLT', 'corporate insolvency']
  },
  {
    caseName: 'Committee of Creditors of Essar Steel India Ltd. v. Satish Kumar Gupta',
    citation: '(2020) 8 SCC 531',
    court: 'Supreme Court',
    year: 2019,
    judges: ['R.F. Nariman', 'Surya Kant', 'V. Ramasubramanian'],
    summary: 'The Supreme Court considered the role and powers of the Committee of Creditors (CoC) under the IBC, particularly in relation to the distribution of amounts under a resolution plan between financial and operational creditors.',
    legalPrinciple: 'The commercial wisdom of the Committee of Creditors (CoC) in approving a resolution plan is not to be second-guessed by the NCLT or NCLAT. However, the CoC must ensure equitable treatment of operational creditors and cannot completely exclude them from recovery.',
    verdict: 'The court upheld ArcelorMittal\'s Rs. 42,000 crore resolution plan for Essar Steel. The court held that the CoC has the paramount commercial wisdom to decide on the distribution of amounts but must ensure fair and equitable treatment of all creditors including operational creditors.',
    significance: 'Largest resolution under the IBC at that time. Defined the scope of the CoC\'s commercial wisdom, clarified the role of NCLT/NCLAT in reviewing resolution plans, and established that operational creditors must receive equitable treatment.',
    relatedSections: ['Section 30(2) (IBC)', 'Section 31 (IBC)', 'Section 53 (IBC)', 'Section 61 (IBC)'],
    relatedActs: ['Insolvency and Bankruptcy Code, 2016'],
    category: 'Corporate',
    keywords: ['Essar Steel', 'CoC commercial wisdom', 'resolution plan', 'IBC', 'ArcelorMittal', 'operational creditor', 'financial creditor', 'NCLT']
  },
  {
    caseName: 'Innoventive Industries Ltd. v. ICICI Bank',
    citation: '(2018) 1 SCC 407',
    court: 'Supreme Court',
    year: 2018,
    judges: ['R.F. Nariman', 'Sanjay Kishan Kaul'],
    summary: 'The first significant case under the IBC to reach the Supreme Court. Innoventive Industries challenged the initiation of insolvency proceedings by ICICI Bank, arguing that a state law (Maharashtra Relief Undertakings Act) overrides the IBC.',
    legalPrinciple: 'The Insolvency and Bankruptcy Code, 2016 overrides all other laws, including state laws, to the extent of any inconsistency. Section 238 of the IBC gives it an overriding effect over all existing laws.',
    verdict: 'The Supreme Court dismissed the appeal and held that the IBC has an overriding effect over the Maharashtra Relief Undertakings (Special Provisions) Act. The moratorium under the state law cannot prevent the initiation of CIRP under the IBC.',
    significance: 'Established the supremacy of the IBC over conflicting state and central legislation. This was the first major Supreme Court decision interpreting the IBC and set the tone for its robust implementation.',
    relatedSections: ['Section 238 (IBC)', 'Section 7 (IBC)', 'Section 14 (IBC)'],
    relatedActs: ['Insolvency and Bankruptcy Code, 2016', 'Maharashtra Relief Undertakings (Special Provisions) Act, 1958'],
    category: 'Corporate',
    keywords: ['IBC overrides', 'Section 238', 'ICICI Bank', 'insolvency proceedings', 'state law', 'moratorium', 'CIRP', 'overriding effect']
  },
  {
    caseName: 'K. Sashidhar v. Indian Overseas Bank',
    citation: '(2019) 12 SCC 150',
    court: 'Supreme Court',
    year: 2019,
    judges: ['R.F. Nariman', 'Navin Sinha'],
    summary: 'The Supreme Court examined whether the NCLT or NCLAT can interfere with the commercial decision of the Committee of Creditors to reject a resolution plan under the IBC.',
    legalPrinciple: 'The commercial decision of the Committee of Creditors (CoC) to approve or reject a resolution plan is supreme and non-justiciable. Neither the NCLT nor NCLAT can substitute their views for the commercial wisdom of the CoC.',
    verdict: 'The Supreme Court held that the decision of the CoC to approve or reject a resolution plan is non-justiciable. The NCLT and NCLAT cannot interfere with the business decision of the CoC as long as the plan meets the requirements of Section 30(2) of the IBC.',
    significance: 'Cemented the principle that the CoC\'s commercial wisdom is supreme in the IBC framework. This decision strengthened the creditor-driven insolvency resolution process and limited judicial interference in commercial decisions.',
    relatedSections: ['Section 30(2) (IBC)', 'Section 31 (IBC)', 'Section 33 (IBC)'],
    relatedActs: ['Insolvency and Bankruptcy Code, 2016'],
    category: 'Corporate',
    keywords: ['CoC decision supreme', 'commercial wisdom', 'non-justiciable', 'resolution plan rejection', 'IBC', 'NCLT', 'creditor rights']
  },
  {
    caseName: 'Pioneer Urban Land and Infrastructure Ltd. v. Union of India',
    citation: '(2019) 8 SCC 416',
    court: 'Supreme Court',
    year: 2019,
    judges: ['R.F. Nariman', 'Surya Kant'],
    summary: 'The Supreme Court examined the constitutionality of the amendment to the IBC that treated homebuyers/allottees as financial creditors, giving them a seat at the Committee of Creditors table.',
    legalPrinciple: 'Homebuyers/allottees of real estate projects are financial creditors under the IBC. The amounts raised from homebuyers have the commercial effect of a borrowing and therefore constitute a financial debt.',
    verdict: 'The Supreme Court upheld the constitutional validity of treating homebuyers as financial creditors under the IBC. The court held that amounts paid by homebuyers to real estate developers have the commercial effect of borrowing and qualify as financial debt.',
    significance: 'Groundbreaking decision that empowered millions of homebuyers across India by giving them financial creditor status. This meant homebuyers could initiate insolvency proceedings against defaulting developers and participate in the resolution process through the CoC.',
    relatedSections: ['Section 5(8)(f) (IBC)', 'Section 7 (IBC)', 'Section 21 (IBC)'],
    relatedActs: ['Insolvency and Bankruptcy Code, 2016', 'Real Estate (Regulation and Development) Act, 2016'],
    category: 'Corporate',
    keywords: ['homebuyers', 'financial creditors', 'real estate', 'IBC', 'allottees', 'financial debt', 'CoC', 'developer insolvency']
  },
  {
    caseName: 'Mardia Chemicals Ltd. v. Union of India',
    citation: '(2004) 4 SCC 311',
    court: 'Supreme Court',
    year: 2004,
    judges: ['S. Rajendra Babu', 'G.P. Mathur', 'P. Venkatarama Reddi'],
    summary: 'The constitutional validity of the Securitisation and Reconstruction of Financial Assets and Enforcement of Security Interest (SARFAESI) Act, 2002 was challenged. Borrowers argued that the Act gave banks draconian powers to seize properties without court orders.',
    legalPrinciple: 'The SARFAESI Act is a constitutionally valid legislation that empowers banks and financial institutions to enforce their security interest without court intervention. However, Section 17 provides an adequate safeguard through the right of appeal to the DRT.',
    verdict: 'The Supreme Court upheld the constitutional validity of the SARFAESI Act but struck down Section 17(2) which required borrowers to deposit 75% of the claimed amount before the DRT could entertain their appeal, holding it unconstitutional.',
    significance: 'Validated the SARFAESI framework that revolutionized debt recovery in India by allowing banks to directly seize secured assets. The partial striking down ensured borrower rights were not completely sacrificed at the altar of bank efficiency.',
    relatedSections: ['Section 13 (SARFAESI)', 'Section 17 (SARFAESI)', 'Section 34 (SARFAESI)'],
    relatedActs: ['Securitisation and Reconstruction of Financial Assets and Enforcement of Security Interest Act, 2002', 'Recovery of Debts Due to Banks and Financial Institutions Act, 1993'],
    category: 'Corporate',
    keywords: ['SARFAESI', 'securitisation', 'bank recovery', 'security interest', 'NPA', 'debt recovery', 'DRT', 'constitutional validity']
  },
  {
    caseName: 'National Textile Workers Union v. P.R. Ramakrishnan',
    citation: '(1983) 1 SCC 228',
    court: 'Supreme Court',
    year: 1983,
    judges: ['P.N. Bhagwati', 'R.S. Pathak', 'A.N. Sen', 'Ranganath Misra', 'D.P. Madon'],
    summary: 'The Supreme Court examined the rights of workers when a company goes into winding up proceedings. The workers of a textile company sought to be heard in the winding up petition, arguing that they had a vital stake in the outcome.',
    legalPrinciple: 'Workers have a right to be heard in winding up proceedings of a company as they have a vital interest in its continued existence. A company is not merely a legal entity owned by shareholders; it is a socio-economic institution affecting the lives of workers.',
    verdict: 'The court held that workers have the right to be heard in winding up proceedings. The court took a broad view of corporate personality, holding that a company is a social institution that must consider the interests of all stakeholders, not just shareholders.',
    significance: 'Pioneering decision that recognized workers as stakeholders in corporate governance. This socially progressive interpretation of company law influenced later developments in stakeholder capitalism and worker participation in corporate decisions.',
    relatedSections: ['Section 433 (Companies Act, 1956)', 'Section 397 (Companies Act, 1956)', 'Article 43A (Constitution)'],
    relatedActs: ['Companies Act, 1956', 'Constitution of India', 'Industrial Disputes Act, 1947'],
    category: 'Corporate',
    keywords: ['workers rights', 'winding up', 'stakeholders', 'company law', 'textile workers', 'corporate personality', 'social institution']
  },
  {
    caseName: 'State Bank of India v. V. Ramakrishnan',
    citation: '(2018) 17 SCC 394',
    court: 'Supreme Court',
    year: 2018,
    judges: ['R.F. Nariman', 'Navin Sinha'],
    summary: 'The Supreme Court examined whether the moratorium under Section 14 of the IBC protects personal guarantors of a corporate debtor from enforcement action during the Corporate Insolvency Resolution Process (CIRP).',
    legalPrinciple: 'The moratorium under Section 14 of the IBC applies only to the corporate debtor and does not extend to personal guarantors. Creditors can proceed against personal guarantors even during the pendency of the CIRP against the corporate debtor.',
    verdict: 'The court held that the moratorium under Section 14 of the IBC does not protect personal guarantors of a corporate debtor. Banks and creditors are free to initiate or continue proceedings against personal guarantors independently of the CIRP.',
    significance: 'Critical decision for banking and insolvency law. It ensured that promoters who had given personal guarantees could not hide behind the corporate insolvency process to avoid their personal liability.',
    relatedSections: ['Section 14 (IBC)', 'Section 31 (IBC)', 'Section 128 (Indian Contract Act)'],
    relatedActs: ['Insolvency and Bankruptcy Code, 2016', 'Indian Contract Act, 1872'],
    category: 'Corporate',
    keywords: ['personal guarantor', 'moratorium', 'IBC', 'Section 14', 'CIRP', 'SBI', 'corporate debtor', 'guarantee']
  },
  {
    caseName: 'BCCI v. Kochi Cricket Pvt. Ltd. (Byju Raveendran/BYJUS)',
    citation: '(2023) SCC OnLine SC 1497',
    court: 'Supreme Court',
    year: 2023,
    judges: ['Sanjay Kishan Kaul', 'Sudhanshu Dhulia', 'Manoj Misra'],
    summary: 'The Supreme Court dealt with the insolvency proceedings involving the BCCI\'s sponsorship agreement with Byju\'s. The case arose when Byju\'s failed to honour its payment obligations under the sponsorship deal, leading to CIRP proceedings.',
    legalPrinciple: 'The IBC provides a comprehensive mechanism for resolution of corporate insolvency. Default in payment of a financial debt or operational debt triggers the right to initiate CIRP proceedings regardless of the debtor\'s overall financial status.',
    verdict: 'The court upheld the admission of CIRP proceedings. The judgment addressed the scope of operational debt under the IBC and the threshold requirements for initiating corporate insolvency resolution process.',
    significance: 'High-profile corporate insolvency case involving one of India\'s largest edtech companies. Highlighted the application of IBC to modern digital economy disputes and the enforceability of sponsorship agreements as operational debt.',
    relatedSections: ['Section 9 (IBC)', 'Section 5(21) (IBC)', 'Section 8 (IBC)'],
    relatedActs: ['Insolvency and Bankruptcy Code, 2016'],
    category: 'Corporate',
    keywords: ['BCCI', 'Byjus', 'CIRP', 'operational debt', 'sponsorship agreement', 'IBC', 'edtech', 'corporate insolvency']
  },
  {
    caseName: 'Jaypee Infratech Ltd. v. Axis Bank Ltd.',
    citation: '(2020) 8 SCC 401',
    court: 'Supreme Court',
    year: 2019,
    judges: ['A.M. Khanwilkar', 'Dinesh Maheshwari'],
    summary: 'The case arose from the insolvency proceedings against Jaypee Infratech, a major real estate developer that had left thousands of homebuyers without their flats. IDBI Bank initiated CIRP proceedings, and the Supreme Court had to balance the interests of homebuyers, banks, and other creditors.',
    legalPrinciple: 'Homebuyers in real estate projects have a paramount interest that must be protected in insolvency proceedings. The resolution plan must adequately address the rights and interests of homebuyers who are treated as financial creditors under the IBC.',
    verdict: 'The Supreme Court directed the continuation of CIRP proceedings and ensured that homebuyers were given adequate representation in the CoC. The court emphasized that the resolution process must prioritize the completion of housing projects and delivery of flats to homebuyers.',
    significance: 'One of the largest real estate insolvency cases in India affecting over 20,000 homebuyers. The case shaped how real estate insolvency proceedings balance the interests of homebuyers, banks, and the resolution process.',
    relatedSections: ['Section 7 (IBC)', 'Section 5(8)(f) (IBC)', 'Section 21 (IBC)', 'Section 30 (IBC)'],
    relatedActs: ['Insolvency and Bankruptcy Code, 2016', 'Real Estate (Regulation and Development) Act, 2016'],
    category: 'Corporate',
    keywords: ['Jaypee Infratech', 'homebuyer rights', 'IBC', 'real estate insolvency', 'financial creditor', 'CIRP', 'resolution plan', 'IDBI Bank']
  },
  {
    caseName: 'Excel Crop Care Ltd. v. Competition Commission of India',
    citation: '(2017) 8 SCC 47',
    court: 'Supreme Court',
    year: 2017,
    judges: ['Ranjan Gogoi', 'Prafulla C. Pant'],
    summary: 'Excel Crop Care along with two other companies was found guilty of cartel formation and bid rigging in the supply of Aluminium Phosphide Tablets to the Food Corporation of India (FCI).',
    legalPrinciple: 'Anti-competitive agreements including cartels and bid rigging are presumed to have an appreciable adverse effect on competition (AAEC). The burden shifts to the parties to prove that the agreement does not have such an effect.',
    verdict: 'The Supreme Court upheld the CCI\'s finding that the three companies had formed a cartel and rigged bids in FCI tenders for Aluminium Phosphide Tablets. The court upheld the penalty imposed by the CCI.',
    significance: 'Landmark competition law decision that established that cartels and bid rigging are per se anti-competitive and carry a presumption of adverse effect on competition. Strengthened the enforcement of competition law in India.',
    relatedSections: ['Section 3(3) (Competition Act)', 'Section 27 (Competition Act)', 'Section 19 (Competition Act)'],
    relatedActs: ['Competition Act, 2002'],
    category: 'Corporate',
    keywords: ['cartel', 'bid rigging', 'competition law', 'CCI', 'anti-competitive agreement', 'Excel Crop Care', 'FCI', 'penalty']
  },

  // ═══════════════════════════════════════════════
  // TAX LAW
  // ═══════════════════════════════════════════════
  {
    caseName: 'Vodafone International Holdings BV v. Union of India',
    citation: '(2012) 6 SCC 613',
    court: 'Supreme Court',
    year: 2012,
    judges: ['S.H. Kapadia', 'K.S. Panicker Radhakrishnan', 'Swatanter Kumar'],
    summary: 'Vodafone acquired Hutchison\'s 67% stake in an Indian telecom company through a transaction structured in the Cayman Islands. The Indian tax authorities claimed capital gains tax on this transaction, arguing that the transfer of shares of a foreign company amounted to an indirect transfer of Indian assets.',
    legalPrinciple: 'The Indian Income Tax Act does not have extra-territorial jurisdiction to tax a transaction between two foreign entities involving transfer of shares of a foreign company, merely because the underlying assets are in India. The doctrine of substance over form cannot be used to create taxing jurisdiction where none exists.',
    verdict: 'The Supreme Court ruled in favour of Vodafone, holding that the transaction was a legitimate FDI transaction and India had no taxing jurisdiction. The transfer of shares of a Cayman Islands company did not attract capital gains tax in India.',
    significance: 'One of the most significant international tax cases globally. The judgment was later overturned legislatively by retrospective amendment to the Income Tax Act (Finance Act, 2012), which itself became a matter of international arbitration. India ultimately settled the dispute in 2021.',
    relatedSections: ['Section 9 (Income Tax Act)', 'Section 195 (Income Tax Act)', 'Section 163 (Income Tax Act)'],
    relatedActs: ['Income Tax Act, 1961', 'Finance Act, 2012'],
    category: 'Tax',
    keywords: ['Vodafone', 'indirect transfer', 'capital gains', 'international taxation', 'extraterritorial jurisdiction', 'FDI', 'retrospective taxation', 'Hutchison']
  },
  {
    caseName: 'Commissioner of Income Tax v. Vatika Township Pvt. Ltd.',
    citation: '(2015) 1 SCC 1',
    court: 'Supreme Court',
    year: 2015,
    judges: ['A.K. Sikri', 'Rohinton F. Nariman'],
    summary: 'The Supreme Court examined the validity of imposing additional tax on income from Special Economic Zones (SEZs) through a retrospective amendment. The case raised fundamental questions about the limits of retrospective tax legislation.',
    legalPrinciple: 'Every statute is prima facie prospective unless it is expressly or by necessary implication made to have retrospective effect. Retrospective taxation that impairs existing rights or imposes new obligations is to be strictly construed against the Revenue.',
    verdict: 'The court held that a taxing statute should not be given retrospective operation unless specifically provided. The proviso added retrospectively to Section 113 of the Income Tax Act, imposing surcharge on block assessments, could not be applied retrospectively to the assessee\'s detriment.',
    significance: 'A landmark ruling on the limits of retrospective taxation. The decision established a strong presumption against retrospective tax legislation and has been widely cited in disputes involving retrospective amendments to tax laws.',
    relatedSections: ['Section 113 (Income Tax Act)', 'Section 4 (Income Tax Act)', 'Article 265 (Constitution)'],
    relatedActs: ['Income Tax Act, 1961', 'Constitution of India', 'General Clauses Act, 1897'],
    category: 'Tax',
    keywords: ['retrospective taxation', 'prospective operation', 'surcharge', 'block assessment', 'Vatika Township', 'statutory interpretation', 'taxing statute']
  },
  {
    caseName: 'McDowell & Co. Ltd. v. Commercial Tax Officer',
    citation: '(1985) 3 SCC 230',
    court: 'Supreme Court',
    year: 1985,
    judges: ['Y.V. Chandrachud', 'O. Chinnappa Reddy', 'A.P. Sen', 'Ranganath Misra'],
    summary: 'The Supreme Court examined the distinction between legitimate tax planning (tax avoidance) and impermissible tax evasion. McDowell & Co., a liquor manufacturer, structured its transactions to minimize excise duty obligations.',
    legalPrinciple: 'Tax planning may be legitimate provided it is within the framework of the law. Colourable devices cannot be part of tax planning. Every citizen has a right to arrange affairs to minimize tax burden, but artificial and colourable devices are impermissible.',
    verdict: 'The court held that while tax planning within the legal framework is permissible, the use of colourable devices or artificial arrangements to evade taxes is not. The court emphasized the distinction between tax avoidance and tax evasion.',
    significance: 'Foundational decision on the line between legitimate tax planning and impermissible tax evasion in India. The judgment is cited in virtually every case involving allegations of tax avoidance through artificial arrangements.',
    relatedSections: ['Section 37 (Income Tax Act)', 'Section 69 (Income Tax Act)', 'Article 265 (Constitution)'],
    relatedActs: ['Income Tax Act, 1961', 'Central Excises and Salt Act, 1944', 'Constitution of India'],
    category: 'Tax',
    keywords: ['tax avoidance', 'tax evasion', 'colourable device', 'tax planning', 'legitimate planning', 'artificial arrangement', 'McDowell']
  },
  {
    caseName: 'Commissioner of Customs v. Dilip Kumar & Co.',
    citation: '(2018) 9 SCC 1',
    court: 'Supreme Court',
    year: 2018,
    judges: ['Ranjan Gogoi', 'R.F. Nariman', 'Navin Sinha'],
    summary: 'A three-judge bench of the Supreme Court settled a long-standing controversy on whether an exemption notification under customs/excise law should be interpreted strictly or liberally. The case involved a dispute over the classification of imported goods for customs duty exemption.',
    legalPrinciple: 'An exemption notification under taxation law must be strictly construed. If there is any ambiguity in an exemption notification, the benefit must go to the Revenue (the State), not to the assessee. This is the opposite of the general rule of strict construction of taxing statutes in favour of the assessee.',
    verdict: 'The court held that exemption notifications must be strictly interpreted. In case of ambiguity, the interpretation favouring the Revenue must be adopted. The court overruled several earlier decisions that had held otherwise.',
    significance: 'Settled a decades-long debate on the interpretation of tax exemption notifications. This decision fundamentally changed how exemption provisions in customs, excise, and GST law are interpreted by tribunals and courts.',
    relatedSections: ['Section 25 (Customs Act)', 'Section 5A (Central Excise Act)', 'Section 11 (CGST Act)'],
    relatedActs: ['Customs Act, 1962', 'Central Excise Act, 1944', 'Central Goods and Services Tax Act, 2017'],
    category: 'Tax',
    keywords: ['exemption notification', 'strict construction', 'customs duty', 'excise duty', 'GST exemption', 'Dilip Kumar', 'statutory interpretation']
  },

  // ═══════════════════════════════════════════════
  // INTELLECTUAL PROPERTY LAW
  // ═══════════════════════════════════════════════
  {
    caseName: 'Novartis AG v. Union of India',
    citation: '(2013) 6 SCC 1',
    court: 'Supreme Court',
    year: 2013,
    judges: ['Aftab Alam', 'Ranjana Prakash Desai'],
    summary: 'Novartis sought a patent for the beta-crystalline form of Imatinib Mesylate (marketed as Glivec/Gleevec), a cancer drug. The Patent Office rejected the application under Section 3(d) of the Patents Act, which bars patents on new forms of known substances unless they demonstrate significantly enhanced efficacy.',
    legalPrinciple: 'Section 3(d) of the Indian Patents Act prevents evergreening of patents by pharmaceutical companies. A mere new form, derivative, or modification of a known substance is not patentable unless it results in the enhancement of the known efficacy of that substance. "Efficacy" in the context of pharmaceutical patents means therapeutic efficacy.',
    verdict: 'The Supreme Court rejected Novartis\'s patent application for Glivec, holding that the beta-crystalline form of Imatinib Mesylate did not demonstrate significantly enhanced therapeutic efficacy over the known substance. Section 3(d) was held to be constitutional and TRIPS-compliant.',
    significance: 'The most significant patent law decision globally in the pharmaceutical sector. It upheld India\'s right to deny patents on incremental innovations in pharmaceuticals, ensuring access to affordable generic medicines for millions. The decision was hailed by global health organizations.',
    relatedSections: ['Section 3(d) (Patents Act)', 'Section 2(1)(j) (Patents Act)', 'Section 2(1)(ja) (Patents Act)'],
    relatedActs: ['Patents Act, 1970', 'TRIPS Agreement'],
    category: 'IP',
    keywords: ['Novartis', 'Glivec', 'Section 3(d)', 'evergreening', 'patent', 'pharmaceutical patent', 'therapeutic efficacy', 'generic medicines']
  },
  {
    caseName: 'Satyam Infoway Ltd. v. Sifynet Solutions Pvt. Ltd.',
    citation: '(2004) 6 SCC 145',
    court: 'Supreme Court',
    year: 2004,
    judges: ['S.B. Sinha', 'S.H. Kapadia'],
    summary: 'The Supreme Court for the first time considered whether domain names are entitled to legal protection similar to trademarks. Satyam Infoway (operating under the brand "Sify") challenged the use of similar domain names by Sifynet Solutions.',
    legalPrinciple: 'Domain names are entitled to protection similar to trademarks under the common law tort of passing off. The principles of trademark law including the test of deceptive similarity apply to domain name disputes. Domain names serve as business identifiers in the internet age.',
    verdict: 'The court held that domain names are entitled to legal protection as they serve as business identifiers. The principles of passing off apply to domain name disputes. The court granted an injunction restraining the respondent from using the confusingly similar domain name.',
    significance: 'First Supreme Court decision recognizing domain names as protectable intellectual property. Established the framework for resolving domain name disputes in India and brought Indian IP law into the internet age.',
    relatedSections: ['Section 29 (Trade Marks Act)', 'Section 27 (Trade Marks Act)', 'Section 134 (Trade Marks Act)'],
    relatedActs: ['Trade Marks Act, 1999', 'Information Technology Act, 2000'],
    category: 'IP',
    keywords: ['domain name', 'passing off', 'trademark', 'Sify', 'internet', 'business identifier', 'deceptive similarity', 'cybersquatting']
  },
  {
    caseName: 'Yahoo! Inc. v. Akash Arora',
    citation: '1999 (19) PTC 201 (Del)',
    court: 'High Court',
    highCourtName: 'Delhi High Court',
    year: 1999,
    judges: ['Manmohan Singh'],
    summary: 'Yahoo! Inc. filed a suit against Akash Arora who had registered the domain name "YahooIndia.com" and was providing similar internet services. Yahoo argued that the domain name was deceptively similar to its registered trademark.',
    legalPrinciple: 'Cybersquatting — registering a domain name identical or confusingly similar to a well-known trademark — constitutes passing off and trademark infringement. Internet domain names are valuable corporate assets entitled to legal protection.',
    verdict: 'The Delhi High Court granted an interim injunction restraining Akash Arora from using the domain name "YahooIndia.com" or any other domain name deceptively similar to Yahoo. The court held that the domain name was identical/confusingly similar to Yahoo\'s trademark.',
    significance: 'First Indian case specifically dealing with cybersquatting. Set the precedent for domain name dispute resolution in India and influenced the development of Indian cyber law jurisprudence on trademark protection in the digital space.',
    relatedSections: ['Section 29 (Trade Marks Act)', 'Section 134 (Trade Marks Act)', 'Order XXXIX (CPC)'],
    relatedActs: ['Trade Marks Act, 1999', 'Information Technology Act, 2000', 'Code of Civil Procedure, 1908'],
    category: 'IP',
    keywords: ['cybersquatting', 'Yahoo', 'domain name', 'passing off', 'trademark infringement', 'internet', 'deceptive similarity', 'injunction']
  },
  {
    caseName: 'Bajaj Auto Ltd. v. TVS Motor Company Ltd.',
    citation: '(2009) 9 SCC 797',
    court: 'Supreme Court',
    year: 2009,
    judges: ['Tarun Chatterjee', 'Dalveer Bhandari'],
    summary: 'Bajaj Auto filed a patent infringement suit against TVS Motor Company alleging that TVS\'s 125cc motorcycle engine (using DTSi-like technology) infringed Bajaj\'s patent for Digital Twin Spark ignition (DTSi) technology.',
    legalPrinciple: 'In patent infringement cases, the court must conduct a thorough comparison of the patent claims with the alleged infringing product. An interim injunction in patent cases requires the plaintiff to demonstrate a prima facie case of infringement, irreparable harm, and that the balance of convenience favours the plaintiff.',
    verdict: 'The Supreme Court upheld the Madras High Court\'s order refusing an interim injunction against TVS. The court held that the question of patent infringement required a detailed trial and that an interim injunction at that stage would cause more harm to TVS than the denial would cause to Bajaj.',
    significance: 'Important decision on the standard for interim injunctions in patent infringement cases. Established that courts must be cautious in granting interlocutory injunctions in patent cases given the public interest implications.',
    relatedSections: ['Section 48 (Patents Act)', 'Section 104 (Patents Act)', 'Section 108 (Patents Act)'],
    relatedActs: ['Patents Act, 1970', 'Code of Civil Procedure, 1908'],
    category: 'IP',
    keywords: ['patent infringement', 'DTSi', 'Bajaj', 'TVS', 'interim injunction', 'motorcycle engine', 'patent claims', 'balance of convenience']
  },
  {
    caseName: 'R.G. Anand v. M/s Delux Films',
    citation: 'AIR 1978 SC 1613',
    court: 'Supreme Court',
    year: 1978,
    judges: ['V.R. Krishna Iyer', 'O. Chinnappa Reddy', 'R.S. Pathak'],
    summary: 'R.G. Anand, a playwright, alleged that his play "Hum Hindustani" was adapted without permission into the Bollywood film "New Delhi" produced by Delux Films. The core issue was whether the film had copied the play or merely used the same underlying idea.',
    legalPrinciple: 'Copyright protects the expression of an idea, not the idea itself (the idea-expression dichotomy). Two works may share the same theme or idea, but there is no copyright infringement unless there is substantial and material copying of the expression. No copyright exists in themes, plots, historical or legendary facts, or general ideas.',
    verdict: 'The Supreme Court held that there was no copyright infringement. While both the play and the film dealt with the theme of provincialism and linguistic prejudice in Delhi, the treatment, development, and expression were substantially different. Similarity of theme does not amount to copying.',
    significance: 'The foundational Indian authority on the idea-expression dichotomy in copyright law. The seven principles laid down in this case continue to govern copyright infringement analysis in India, particularly in film and literary works.',
    relatedSections: ['Section 13 (Copyright Act)', 'Section 14 (Copyright Act)', 'Section 51 (Copyright Act)'],
    relatedActs: ['Copyright Act, 1957'],
    category: 'IP',
    keywords: ['copyright', 'idea-expression dichotomy', 'Bollywood', 'film', 'plagiarism', 'dramatic work', 'substantial copying', 'Hum Hindustani']
  },
  {
    caseName: 'Bayer Corporation v. Cipla Ltd.',
    citation: '2015 SCC OnLine Del 11806',
    court: 'High Court',
    highCourtName: 'Delhi High Court',
    year: 2015,
    judges: ['Manmohan Singh'],
    summary: 'Bayer Corporation held a patent for Sorafenib Tosylate (marketed as Nexavar, a kidney and liver cancer drug). Cipla launched a generic version at a fraction of the price. Bayer sued for patent infringement and sought an injunction.',
    legalPrinciple: 'While patent rights must be respected, the grant of an injunction in pharmaceutical patent cases must balance the patent holder\'s rights against public interest in access to affordable medicines. The availability of life-saving drugs at affordable prices is a relevant consideration.',
    verdict: 'The Delhi High Court refused to grant an injunction in favour of Bayer, holding that the public interest in making the cancer drug available at affordable prices outweighed the patent holder\'s right to an injunction. However, the court recognized Bayer\'s patent as valid.',
    significance: 'Significant decision balancing patent rights against public health interests. The case highlighted the tension between pharmaceutical patent protection and access to affordable medicines in developing countries like India.',
    relatedSections: ['Section 48 (Patents Act)', 'Section 107 (Patents Act)', 'Section 84 (Patents Act)'],
    relatedActs: ['Patents Act, 1970', 'TRIPS Agreement'],
    category: 'IP',
    keywords: ['compulsory licensing', 'Bayer', 'Cipla', 'Nexavar', 'cancer drug', 'pharmaceutical patent', 'public interest', 'affordable medicines']
  },
  {
    caseName: 'Natco Pharma Ltd. v. Bayer Corporation',
    citation: 'Order No. 45/2012 (Controller of Patents)',
    court: 'Other',
    year: 2012,
    judges: ['P.H. Kurian (Controller of Patents)'],
    summary: 'Natco Pharma applied for a compulsory licence to manufacture and sell a generic version of Bayer\'s patented kidney and liver cancer drug Sorafenib Tosylate (Nexavar). Bayer was selling the drug at Rs. 2,80,000 per month while Natco proposed to sell it at Rs. 8,800 per month.',
    legalPrinciple: 'A compulsory licence can be granted under Section 84 of the Patents Act when the patented invention is not available to the public at a reasonably affordable price, the patented invention is not worked in the territory of India, and the reasonable requirements of the public have not been satisfied.',
    verdict: 'The Controller of Patents granted the first compulsory licence in India to Natco Pharma, allowing it to manufacture and sell the generic version of Nexavar at Rs. 8,800 per month (compared to Bayer\'s Rs. 2,80,000). A royalty rate of 6% of net sales was ordered to be paid to Bayer.',
    significance: 'First and only compulsory licence granted in India to date. The decision sent shockwaves through the global pharmaceutical industry and established India as a jurisdiction that would use TRIPS flexibilities to ensure access to affordable medicines.',
    relatedSections: ['Section 84 (Patents Act)', 'Section 85 (Patents Act)', 'Section 90 (Patents Act)'],
    relatedActs: ['Patents Act, 1970', 'TRIPS Agreement', 'Doha Declaration on TRIPS and Public Health'],
    category: 'IP',
    keywords: ['compulsory licence', 'Natco', 'Bayer', 'Nexavar', 'affordable medicines', 'Section 84', 'pharmaceutical patent', 'generic drugs', 'TRIPS flexibilities']
  },

  // ═══════════════════════════════════════════════
  // CONTRACT LAW
  // ═══════════════════════════════════════════════
  {
    caseName: 'Satyabrata Ghose v. Mugneeram Bangur & Co.',
    citation: 'AIR 1954 SC 44',
    court: 'Supreme Court',
    year: 1954,
    judges: ['B.K. Mukherjea', 'Vivian Bose', 'Ghulam Hasan'],
    summary: 'The appellant had entered into an agreement with the respondent for purchase of a plot of land. During World War II, the government requisitioned the land. The appellant sought to get out of the contract on the ground of frustration.',
    legalPrinciple: 'The doctrine of frustration under Section 56 of the Indian Contract Act is applicable when an event occurs which makes the performance of the contract impossible or the object of the contract has failed. Temporary impossibility does not amount to frustration if the contract can be performed after the obstacle is removed.',
    verdict: 'The Supreme Court held that the requisitioning of land during wartime was a temporary measure and did not permanently prevent performance of the contract. The doctrine of frustration was not applicable as the impossibility was temporary.',
    significance: 'The foundational Indian authority on the doctrine of frustration of contracts. This decision established the framework for analyzing when a contract is frustrated under Section 56 and the distinction between temporary and permanent impossibility.',
    relatedSections: ['Section 56 (Indian Contract Act)', 'Section 32 (Indian Contract Act)'],
    relatedActs: ['Indian Contract Act, 1872', 'Defence of India Act, 1939'],
    category: 'Contract',
    keywords: ['frustration of contract', 'Section 56', 'impossibility', 'force majeure', 'temporary impossibility', 'wartime requisition', 'supervening impossibility']
  },
  {
    caseName: 'Indian Oil Corporation Ltd. v. Amritsar Gas Service',
    citation: '(1991) 1 SCC 533',
    court: 'Supreme Court',
    year: 1991,
    judges: ['M.N. Venkatachaliah', 'K. Jayachandra Reddy'],
    summary: 'The Supreme Court examined the enforceability of standard form contracts and whether an arbitration clause in such a contract was binding. The case involved a distributorship agreement between IOC and its LPG distributor.',
    legalPrinciple: 'Standard form contracts (contracts of adhesion) are binding on the parties if they have signed them, even if they did not read or understand all the terms. However, if a party in a dominant position imposes unreasonable and unconscionable terms, the court may refuse to enforce such terms.',
    verdict: 'The court held that the standard form contract was valid and binding. However, the court observed that in cases of unequal bargaining power, the courts should scrutinize unconscionable terms and may refuse to enforce terms that are unreasonable and oppressive.',
    significance: 'Established the Indian position on standard form contracts and the limits of contractual freedom when there is inequality of bargaining power. Relevant to consumer protection and competition law.',
    relatedSections: ['Section 16 (Indian Contract Act)', 'Section 23 (Indian Contract Act)', 'Section 28 (Indian Contract Act)'],
    relatedActs: ['Indian Contract Act, 1872', 'Arbitration and Conciliation Act, 1996'],
    category: 'Contract',
    keywords: ['standard form contract', 'adhesion contract', 'unconscionable terms', 'unequal bargaining power', 'IOC', 'distributorship agreement', 'unfair terms']
  },
  {
    caseName: 'ONGC Ltd. v. Saw Pipes Ltd.',
    citation: '(2003) 5 SCC 705',
    court: 'Supreme Court',
    year: 2003,
    judges: ['R.C. Lahoti', 'Ashok Bhan'],
    summary: 'ONGC challenged an arbitral award that had held its clause on liquidated damages for delay in delivery of pipes to be a penalty. The case raised the question of when a pre-determined sum for breach is liquidated damages versus a penalty.',
    legalPrinciple: 'Under Indian law (Section 74, Indian Contract Act), when a contract specifies a sum as liquidated damages for breach, the party claiming damages can recover reasonable compensation not exceeding the specified sum, whether or not actual loss is proved. The court must determine whether the sum specified is a genuine pre-estimate of loss or a penalty.',
    verdict: 'The Supreme Court held that the stipulated sum in the contract was liquidated damages and not a penalty. The court clarified that under Section 74 of the Indian Contract Act, it is not necessary for the party claiming liquidated damages to prove actual loss — reasonable compensation up to the stipulated sum can be awarded.',
    significance: 'Clarified the law on liquidated damages under Section 74 of the Indian Contract Act. The decision established that parties need not prove actual loss when claiming liquidated damages, which significantly simplified commercial disputes.',
    relatedSections: ['Section 73 (Indian Contract Act)', 'Section 74 (Indian Contract Act)', 'Section 34 (Arbitration Act)'],
    relatedActs: ['Indian Contract Act, 1872', 'Arbitration and Conciliation Act, 1996'],
    category: 'Contract',
    keywords: ['liquidated damages', 'penalty', 'Section 74', 'ONGC', 'breach of contract', 'actual loss', 'pre-estimate of damages', 'arbitral award']
  },
  {
    caseName: 'Central Inland Water Transport Corporation Ltd. v. Brojo Nath Ganguly',
    citation: '(1986) 3 SCC 156',
    court: 'Supreme Court',
    year: 1986,
    judges: ['P.N. Bhagwati', 'Ranganath Misra', 'M.M. Dutt'],
    summary: 'An employee of CIWTC was terminated under a service rule that allowed the corporation to terminate employment with three months\' notice without assigning any reason. The employee challenged this as an unfair term in a contract of adhesion.',
    legalPrinciple: 'Unreasonable and unconscionable clauses in contracts where there is inequality of bargaining power are void under Section 23 of the Indian Contract Act as being opposed to public policy. The concept of public policy includes the principle that no one should exploit the weakness of another.',
    verdict: 'The Supreme Court struck down the termination clause as unconscionable and opposed to public policy. The court held that in contracts of adhesion where there is unequal bargaining power, the courts will not enforce unreasonable terms that exploit the weaker party.',
    significance: 'Landmark decision expanding the scope of "public policy" under Section 23 of the Indian Contract Act. Extended the principle of unconscionability from consumer contracts to employment contracts, offering protection to workers against unfair termination clauses.',
    relatedSections: ['Section 23 (Indian Contract Act)', 'Section 16 (Indian Contract Act)', 'Article 14 (Constitution)', 'Article 21 (Constitution)'],
    relatedActs: ['Indian Contract Act, 1872', 'Constitution of India'],
    category: 'Contract',
    keywords: ['unconscionable contract', 'public policy', 'adhesion contract', 'unequal bargaining power', 'Section 23', 'termination clause', 'employment contract', 'unfair terms']
  },
];

async function seedVerdictsPropertyCommercial() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB\n');

    // Delete existing verdicts in the relevant categories
    const categoriesToDelete = ['Property', 'Corporate', 'Tax', 'IP', 'Contract'];
    for (const cat of categoriesToDelete) {
      const existing = await CourtVerdict.countDocuments({ category: cat });
      if (existing > 0) {
        console.log(`Removing ${existing} existing "${cat}" verdicts...`);
        await CourtVerdict.deleteMany({ category: cat });
      }
    }

    console.log(`\nSeeding ${verdicts.length} Property, Corporate, Tax, IP, and Contract verdicts...\n`);

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < verdicts.length; i++) {
      const v = verdicts[i];
      try {
        await CourtVerdict.create(v);
        successCount++;
        const num = String(i + 1).padStart(2, '0');
        console.log(`   [${num}/${verdicts.length}] ${v.caseName} (${v.year}) [${v.category}]`);
      } catch (err) {
        errorCount++;
        const num = String(i + 1).padStart(2, '0');
        console.error(`   [${num}/${verdicts.length}] ERROR: ${v.caseName} -- ${err.message}`);
      }
    }

    // Summary
    console.log('\n==================================================');
    console.log('              SEED SUMMARY                        ');
    console.log('==================================================');
    console.log(`   Total verdicts:    ${verdicts.length}`);
    console.log(`   Inserted:          ${successCount}`);
    console.log(`   Errors:            ${errorCount}`);

    // Category breakdown
    const categories = {};
    verdicts.forEach(v => {
      categories[v.category] = (categories[v.category] || 0) + 1;
    });
    console.log('\n   Category Breakdown:');
    Object.entries(categories)
      .sort((a, b) => b[1] - a[1])
      .forEach(([cat, count]) => {
        console.log(`      ${cat.padEnd(18)} ${count}`);
      });

    console.log('\n==================================================');
    console.log('Seeding complete!\n');

  } catch (err) {
    console.error('Fatal error during seeding:', err);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

seedVerdictsPropertyCommercial();
