// Seed script for Contract & Commercial Law sections
// Run with: node server/seedContractLaw.js

require('dotenv').config();
const mongoose = require('mongoose');
const LegalSection = require('./models/LegalSection');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lawbook';

const sections = [
  // ═══════════════════════════════════════════════════════════════════
  // Indian Contract Act, 1872
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'Indian Contract Act, 1872',
    actCode: 'ICA',
    sectionNumber: '2',
    title: 'Interpretation clause — Definitions',
    legalText: 'When one person signifies to another his willingness to do or to abstain from doing anything, with a view to obtaining the assent of that other to such act or abstinence, he is said to make a proposal. When the person to whom the proposal is made signifies his assent thereto, the proposal is said to be accepted. A proposal, when accepted, becomes a promise. The person making the proposal is called the "promisor", and the person accepting the proposal is called the "promisee". The consideration or object of a promise is lawful, unless it is forbidden by law; or is of such a nature that, if permitted, it would defeat the provisions of any law; or is fraudulent; or involves or implies injury to the person or property of another; or the Court regards it as immoral, or opposed to public policy. Every promise and every set of promises, forming the consideration for each other, is an agreement. An agreement enforceable by law is a contract. An agreement not enforceable by law is said to be void.',
    explanation: 'This section defines the building blocks of contract law. A proposal (offer) becomes a promise when accepted. The person who offers is the promisor and the one who accepts is the promisee. A set of mutual promises forms an agreement. If that agreement is enforceable by law, it is a contract. If not enforceable, it is void.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['proposal', 'promise', 'promisor', 'promisee', 'agreement', 'contract', 'void', 'offer', 'acceptance', 'definitions'],
    relatedSections: [
      { sectionNumber: '10', actCode: 'ICA', title: 'What agreements are contracts' },
      { sectionNumber: '23', actCode: 'ICA', title: 'What considerations and objects are lawful' }
    ]
  },
  {
    act: 'Indian Contract Act, 1872',
    actCode: 'ICA',
    sectionNumber: '10',
    title: 'What agreements are contracts',
    legalText: 'All agreements are contracts if they are made by the free consent of parties competent to contract, for a lawful consideration and with a lawful object, and are not hereby expressly declared to be void. Nothing herein contained shall affect any law in force in India, and not hereby expressly repealed, by which any contract is required to be made in writing or in the presence of witnesses, or any law relating to the registration of documents.',
    explanation: 'For an agreement to become a legally binding contract, it must satisfy all these conditions: (1) the parties must give free consent, (2) they must be legally competent (major, sound mind, not disqualified by law), (3) there must be lawful consideration (something of value exchanged), (4) the object must be lawful, and (5) the agreement must not be one that the law declares void.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['valid contract', 'free consent', 'competent to contract', 'lawful consideration', 'lawful object', 'essentials of contract'],
    relatedSections: [
      { sectionNumber: '2', actCode: 'ICA', title: 'Interpretation clause' },
      { sectionNumber: '14', actCode: 'ICA', title: 'Free consent' },
      { sectionNumber: '23', actCode: 'ICA', title: 'What considerations and objects are lawful' }
    ]
  },
  {
    act: 'Indian Contract Act, 1872',
    actCode: 'ICA',
    sectionNumber: '14',
    title: 'Free consent defined',
    legalText: 'Consent is said to be free when it is not caused by— (1) coercion, as defined in section 15, or (2) undue influence, as defined in section 16, or (3) fraud, as defined in section 17, or (4) misrepresentation, as defined in section 18, or (5) mistake, subject to the provisions of sections 20, 21 and 22. Consent is said to be so caused when it would not have been given but for the existence of such coercion, undue influence, fraud, misrepresentation or mistake.',
    explanation: 'For a contract to be valid, both parties must agree freely. Consent is NOT free if it was obtained through force (coercion), unfair pressure (undue influence), deception (fraud), false statements (misrepresentation), or a fundamental error (mistake). If any of these factors caused a party to agree, the consent is not free and the contract can be challenged.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['free consent', 'coercion', 'undue influence', 'fraud', 'misrepresentation', 'mistake', 'vitiating factors'],
    relatedSections: [
      { sectionNumber: '10', actCode: 'ICA', title: 'What agreements are contracts' },
      { sectionNumber: '17', actCode: 'ICA', title: 'Fraud defined' },
      { sectionNumber: '19', actCode: 'ICA', title: 'Voidability of agreements without free consent' }
    ]
  },
  {
    act: 'Indian Contract Act, 1872',
    actCode: 'ICA',
    sectionNumber: '17',
    title: 'Fraud defined',
    legalText: '"Fraud" means and includes any of the following acts committed by a party to a contract, or with his connivance, or by his agent, with intent to deceive another party thereto or his agent, or to induce him to enter into the contract:— (1) the suggestion, as a fact, of that which is not true, by one who does not believe it to be true; (2) the active concealment of a fact by one having knowledge or belief of the fact; (3) a promise made without any intention of performing it; (4) any other act fitted to deceive; (5) any such act or omission as the law specially declares to be fraudulent. Explanation.— Mere silence as to facts likely to affect the willingness of a person to enter into a contract is not fraud, unless the circumstances of the case are such that, regard being had to them, it is the duty of the person keeping silence to speak, or unless his silence is, in itself, equivalent to speech.',
    explanation: 'Fraud is when someone deliberately deceives the other party to make them enter a contract. It includes lying about facts, hiding important information, making promises you never intend to keep, or any other deceptive act. Importantly, simply staying silent is not fraud — unless you have a duty to speak up or your silence itself amounts to a lie.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['fraud', 'deception', 'active concealment', 'false promise', 'intent to deceive', 'duty to disclose', 'silence'],
    relatedSections: [
      { sectionNumber: '14', actCode: 'ICA', title: 'Free consent defined' },
      { sectionNumber: '19', actCode: 'ICA', title: 'Voidability of agreements without free consent' }
    ]
  },
  {
    act: 'Indian Contract Act, 1872',
    actCode: 'ICA',
    sectionNumber: '19',
    title: 'Voidability of agreements without free consent',
    legalText: 'When consent to an agreement is caused by coercion, fraud or misrepresentation, the agreement is a contract voidable at the option of the party whose consent was so caused. A party to a contract, whose consent was caused by fraud or misrepresentation, may, if he thinks fit, insist that the contract shall be performed, and that he shall be put in the position in which he would have been if the representations made had been true. Exception.— If such consent was caused by misrepresentation or by silence, fraudulent within the meaning of section 17, the contract, nevertheless, is not voidable, if the party whose consent was so caused had the means of discovering the truth with ordinary diligence. Explanation.— A fraud or misrepresentation which did not cause the consent to a contract of the party on whom such fraud was practised, or to whom such misrepresentation was made, does not render a contract voidable.',
    explanation: 'If your consent to a contract was obtained through coercion, fraud, or misrepresentation, you can choose to cancel (void) the contract. Alternatively, in cases of fraud or misrepresentation, you may choose to keep the contract but demand to be placed in the position you would have been in if the false statements were true. However, if you could have discovered the truth with reasonable effort, you may lose the right to void the contract.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['voidable contract', 'coercion', 'fraud', 'misrepresentation', 'rescission', 'cancel contract', 'ordinary diligence'],
    relatedSections: [
      { sectionNumber: '14', actCode: 'ICA', title: 'Free consent defined' },
      { sectionNumber: '17', actCode: 'ICA', title: 'Fraud defined' }
    ]
  },
  {
    act: 'Indian Contract Act, 1872',
    actCode: 'ICA',
    sectionNumber: '23',
    title: 'What considerations and objects are lawful',
    legalText: 'The consideration or object of an agreement is lawful, unless— it is forbidden by law; or is of such a nature that, if permitted, it would defeat the provisions of any law; or is fraudulent; or involves or implies, injury to the person or property of another; or the Court regards it as immoral, or opposed to public policy. In each of these cases, the consideration or object of an agreement is said to be unlawful. Every agreement of which the object or consideration is unlawful is void.',
    explanation: 'The price paid or the purpose of an agreement must be legal. An agreement is void (has no legal effect) if its consideration or object is: (1) forbidden by law, (2) defeats any law, (3) is fraudulent, (4) causes injury to someone, or (5) is immoral or against public policy. For example, a contract to commit a crime or a bet on an illegal activity would be void.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['lawful consideration', 'lawful object', 'unlawful agreement', 'void agreement', 'public policy', 'immoral', 'forbidden by law'],
    relatedSections: [
      { sectionNumber: '2', actCode: 'ICA', title: 'Interpretation clause' },
      { sectionNumber: '10', actCode: 'ICA', title: 'What agreements are contracts' }
    ]
  },
  {
    act: 'Indian Contract Act, 1872',
    actCode: 'ICA',
    sectionNumber: '56',
    title: 'Agreement to do impossible act',
    legalText: 'An agreement to do an act impossible in itself is void. Contract to do act afterwards becoming impossible or unlawful.— A contract to do an act which, after the contract is made, becomes impossible, or, by reason of some event which the promisor could not prevent, unlawful, becomes void when the act becomes impossible or unlawful. Compensation for loss through non-performance of act known to be impossible or unlawful.— Where one person has promised to do something which he knew, or, with reasonable diligence, might have known, and which the promisee did not know, to be impossible or unlawful, such promisor must make compensation to such promisee for any loss which such promisee sustains through the non-performance of the promise.',
    explanation: 'If something is impossible from the start, any agreement to do it is void. If a contract becomes impossible to perform later due to unforeseen events beyond the promisor\'s control (like a natural disaster destroying the subject matter), the contract becomes void — this is known as the doctrine of frustration. However, if someone knowingly promises to do something impossible, they must compensate the other party for any losses.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['frustration of contract', 'impossibility', 'supervening impossibility', 'force majeure', 'void contract', 'doctrine of frustration'],
    relatedSections: [
      { sectionNumber: '73', actCode: 'ICA', title: 'Compensation for breach' }
    ]
  },
  {
    act: 'Indian Contract Act, 1872',
    actCode: 'ICA',
    sectionNumber: '73',
    title: 'Compensation for loss or damage caused by breach of contract',
    legalText: 'When a contract has been broken, the party who suffers by such breach is entitled to receive, from the party who has broken the contract, compensation for any loss or damage caused to him thereby, which naturally arose in the usual course of things from such breach, or which the parties knew, when they made the contract, to be likely to result from the breach of it. Such compensation is not to be given for any remote and indirect loss or damage sustained by reason of the breach. Compensation for failure to discharge obligation resembling those created by contract.— When an obligation resembling those created by contract has been incurred and has not been discharged, any person injured by the failure to discharge it is entitled to receive the same compensation from the party in default, as if such person had contracted to discharge it and had broken his contract. Explanation.— In estimating the loss or damage arising from a breach of contract, the means which existed of remedying the inconvenience caused by the non-performance of the contract must be taken into account.',
    explanation: 'If someone breaks a contract, the injured party can claim compensation for losses that naturally result from the breach or that both parties could have foreseen when making the contract. However, you cannot claim damages for losses that are too remote or indirect. The injured party is also expected to take reasonable steps to reduce their losses (mitigation).',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['breach of contract', 'damages', 'compensation', 'loss', 'remoteness of damage', 'mitigation', 'foreseeability'],
    relatedSections: [
      { sectionNumber: '56', actCode: 'ICA', title: 'Agreement to do impossible act' },
      { sectionNumber: '10', actCode: 'SRA', title: 'Specific performance of contracts' }
    ]
  },
  {
    act: 'Indian Contract Act, 1872',
    actCode: 'ICA',
    sectionNumber: '124',
    title: 'Contract of indemnity defined',
    legalText: 'A contract by which one party promises to save the other from loss caused to him by the conduct of the promisor himself, or by the conduct of any other person, is called a "contract of indemnity".',
    explanation: 'A contract of indemnity is a promise by one party to protect the other from financial loss. For example, if a company agrees to cover all legal costs if an employee is sued for actions taken during their job, that is a contract of indemnity. The person who promises to compensate is called the indemnifier, and the person protected is the indemnified or indemnity-holder.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['indemnity', 'indemnifier', 'indemnity holder', 'save from loss', 'compensation', 'guarantee', 'insurance'],
    relatedSections: [
      { sectionNumber: '148', actCode: 'ICA', title: 'Bailment defined' }
    ]
  },
  {
    act: 'Indian Contract Act, 1872',
    actCode: 'ICA',
    sectionNumber: '148',
    title: 'Bailment, bailor and bailee defined',
    legalText: 'A "bailment" is the delivery of goods by one person to another for some purpose, upon a contract that they shall, when the purpose is accomplished, be returned or otherwise disposed of according to the directions of the person delivering them. The person delivering the goods is called the "bailor". The person to whom they are delivered is called the "bailee". Explanation.— If a person already in possession of the goods of another contracts to hold them as a bailee, he thereby becomes the bailee, and the owner becomes the bailor, of such goods, although they may not have been delivered by way of bailment.',
    explanation: 'Bailment is when you hand over your goods to someone else for a specific purpose (like giving clothes to a dry cleaner or a car to a mechanic), with the understanding that the goods will be returned or dealt with as you instruct once the purpose is fulfilled. The person who gives the goods is the bailor, and the person who receives them is the bailee. Even if someone already has your goods and then agrees to hold them, the bailment relationship is created.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['bailment', 'bailor', 'bailee', 'delivery of goods', 'custody', 'return of goods', 'dry cleaning', 'parking'],
    relatedSections: [
      { sectionNumber: '124', actCode: 'ICA', title: 'Contract of indemnity defined' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // Sale of Goods Act, 1930
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'Sale of Goods Act, 1930',
    actCode: 'SOGA',
    sectionNumber: '4',
    title: 'Sale and agreement to sell',
    legalText: '(1) A contract of sale of goods is a contract whereby the seller transfers or agrees to transfer the property in goods to the buyer for a price. There may be a contract of sale between one part-owner and another. (2) A contract of sale may be absolute or conditional. (3) Where under a contract of sale the property in the goods is transferred from the seller to the buyer, the contract is called a sale, but where the transfer of the property in the goods is to take place at a future time or subject to some condition thereafter to be fulfilled, the contract is called an agreement to sell. (4) An agreement to sell becomes a sale when the time elapses or the conditions are fulfilled subject to which the property in the goods is to be transferred.',
    explanation: 'A sale is a contract where ownership of goods passes from seller to buyer for a price. If the ownership transfers immediately, it is a "sale". If ownership is to pass in the future or upon some condition, it is an "agreement to sell". An agreement to sell becomes a sale once the time passes or conditions are met. This distinction matters because risk usually follows ownership.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['sale', 'agreement to sell', 'transfer of property', 'goods', 'buyer', 'seller', 'price', 'contract of sale'],
    relatedSections: [
      { sectionNumber: '16', actCode: 'SOGA', title: 'Implied conditions and warranties' },
      { sectionNumber: '27', actCode: 'SOGA', title: 'Sale by person not the owner' }
    ]
  },
  {
    act: 'Sale of Goods Act, 1930',
    actCode: 'SOGA',
    sectionNumber: '16',
    title: 'Implied conditions as to quality or fitness',
    legalText: 'There is no implied warranty or condition as to the quality or fitness for any particular purpose of goods supplied under a contract of sale, except as follows:— (1) Where the buyer, expressly or by implication, makes known to the seller the particular purpose for which the goods are required, so as to show that the buyer relies on the seller\'s skill or judgment, and the goods are of a description which it is in the course of the seller\'s business to supply (whether he is the manufacturer or producer or not), there is an implied condition that the goods shall be reasonably fit for such purpose: Provided that, in the case of a contract for the sale of a specified article under its patent or other trade name, there is no implied condition as to its fitness for any particular purpose. (2) Where goods are bought by description from a seller who deals in goods of that description (whether he is the manufacturer or producer or not), there is an implied condition that the goods shall be of merchantable quality: Provided that, if the buyer has examined the goods, there shall be no implied condition as regards defects which such examination ought to have revealed. (3) An implied warranty or condition as to quality or fitness for a particular purpose may be annexed by the usage of trade. (4) An express warranty or condition does not negative a warranty or condition implied by this Act unless inconsistent therewith.',
    explanation: 'Generally, there is no automatic guarantee about quality when you buy something. But there are important exceptions: (1) If you tell the seller why you need the goods and rely on their expertise, the goods must be fit for that purpose. (2) If you buy goods by description from a dealer, they must be of merchantable (acceptable) quality. (3) Trade customs may add further implied terms. These protections do not apply if you buy a specific branded product or if you examined the goods and should have noticed defects.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['implied condition', 'implied warranty', 'fitness for purpose', 'merchantable quality', 'caveat emptor', 'buyer beware', 'quality of goods', 'defective goods'],
    relatedSections: [
      { sectionNumber: '4', actCode: 'SOGA', title: 'Sale and agreement to sell' },
      { sectionNumber: '27', actCode: 'SOGA', title: 'Sale by person not the owner' }
    ]
  },
  {
    act: 'Sale of Goods Act, 1930',
    actCode: 'SOGA',
    sectionNumber: '27',
    title: 'Sale by person not the owner',
    legalText: 'Subject to the provisions of this Act and of any other law for the time being in force, where goods are sold by a person who is not the owner thereof and who does not sell them under the authority or with the consent of the owner, the buyer acquires no better title to the goods than the seller had, unless the owner of the goods is by his conduct precluded from denying the seller\'s authority to sell. Provided that, where a mercantile agent is, with the consent of the owner, in possession of the goods or of a document of title to the goods, any sale made by him when acting in the ordinary course of business of a mercantile agent shall be as valid as if he were expressly authorized by the owner of the goods to make the same; provided that the buyer acts in good faith and has not at the time of the contract of sale notice that the seller has no authority to sell.',
    explanation: 'You cannot sell what you do not own — this is the "nemo dat quod non habet" rule. If someone sells goods that do not belong to them without the owner\'s permission, the buyer gets no better rights than the seller had. However, there are exceptions: (1) if the owner\'s conduct led others to believe the seller had authority, or (2) if a mercantile agent (like a broker) had the goods with the owner\'s consent and sold them in the normal course of business to a buyer acting in good faith.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['nemo dat', 'sale by non-owner', 'title', 'mercantile agent', 'good faith buyer', 'stolen goods', 'authority to sell', 'ownership'],
    relatedSections: [
      { sectionNumber: '4', actCode: 'SOGA', title: 'Sale and agreement to sell' },
      { sectionNumber: '16', actCode: 'SOGA', title: 'Implied conditions and warranties' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // Indian Partnership Act, 1932
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'Indian Partnership Act, 1932',
    actCode: 'IPA',
    sectionNumber: '4',
    title: 'Definition of partnership',
    legalText: '"Partnership" is the relation between persons who have agreed to share the profits of a business carried on by all or any of them acting for all. Persons who have entered into partnership with one another are called individually "partners" and collectively "a firm", and the name under which their business is carried on is called the "firm name".',
    explanation: 'Partnership is a relationship between people who agree to run a business together and share its profits. Each person is a "partner" and together they form a "firm". The key elements are: (1) there must be an agreement, (2) they must share profits, (3) the business must be carried on by all or any of them on behalf of all. Simply sharing profits does not automatically make someone a partner — there must be mutual agency.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['partnership', 'partner', 'firm', 'firm name', 'share profits', 'mutual agency', 'business', 'partnership definition'],
    relatedSections: [
      { sectionNumber: '25', actCode: 'IPA', title: 'Partners bound to act in good faith' },
      { sectionNumber: '69', actCode: 'IPA', title: 'Effect of non-registration' }
    ]
  },
  {
    act: 'Indian Partnership Act, 1932',
    actCode: 'IPA',
    sectionNumber: '25',
    title: 'Partners bound to be just and faithful to each other',
    legalText: 'Partners are bound to carry on the business of the firm to the greatest common advantage, to be just and faithful to each other, and to render true accounts and full information of all things affecting the firm to any partner or his legal representative.',
    explanation: 'Every partner has a fiduciary duty (a duty of trust) towards the other partners. They must: (1) work for the common benefit of the firm, (2) be honest and loyal to each other, and (3) keep accurate accounts and share all relevant information about the business. A partner cannot secretly make profits at the expense of the firm or hide important business matters.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['good faith', 'fiduciary duty', 'just and faithful', 'true accounts', 'partnership duty', 'loyalty', 'disclosure'],
    relatedSections: [
      { sectionNumber: '4', actCode: 'IPA', title: 'Definition of partnership' },
      { sectionNumber: '69', actCode: 'IPA', title: 'Effect of non-registration' }
    ]
  },
  {
    act: 'Indian Partnership Act, 1932',
    actCode: 'IPA',
    sectionNumber: '69',
    title: 'Effect of non-registration',
    legalText: '(1) No suit to enforce a right arising from a contract or conferred by this Act shall be instituted in any court by or on behalf of any person suing as a partner in a firm against the firm or against any person alleged to be or to have been a partner in the firm unless the firm is registered and the person suing is or has been shown in the Register of Firms as a partner in the firm. (2) No suit to enforce a right arising from a contract shall be instituted in any court by or on behalf of a firm against any third party unless the firm is registered and the persons suing are or have been shown in the Register of Firms as partners in the firm. (3) The provisions of sub-sections (1) and (2) shall apply also to a claim of set-off or other proceeding to enforce a right arising from a contract, but shall not affect— (a) the right of a third party to sue the firm or any partner; (b) the right to sue for the dissolution of a firm or for the accounts of a dissolved firm, or any right or power to realise the property of a dissolved firm; or (c) the powers of an Official Assignee, Receiver or Court under the Presidency-towns Insolvency Act, 1909, or the Provincial Insolvency Act, 1920, to realise the property of an insolvent partner.',
    explanation: 'If a partnership firm is not registered, it faces serious disadvantages: (1) No partner can sue another partner or the firm to enforce contractual rights. (2) The firm cannot sue any third party on a contract. (3) The firm cannot claim set-off in a lawsuit. However, third parties can still sue the unregistered firm. Registration is not mandatory, but without it, the firm is severely handicapped in court.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['non-registration', 'unregistered firm', 'cannot sue', 'registration of firm', 'set-off', 'partnership registration', 'enforceability'],
    relatedSections: [
      { sectionNumber: '4', actCode: 'IPA', title: 'Definition of partnership' },
      { sectionNumber: '25', actCode: 'IPA', title: 'Partners bound to act in good faith' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // Specific Relief Act, 1963
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'Specific Relief Act, 1963',
    actCode: 'SRA',
    sectionNumber: '10',
    title: 'Cases in which specific performance of contract enforceable',
    legalText: 'The specific performance of a contract shall be enforced by the court subject to the provisions contained in sub-section (2) of section 11, section 14 and section 16. (2) For the purposes of this section, the court shall presume— (a) that the breach of a contract to transfer immovable property cannot be adequately relieved by compensation in money; and (b) that the breach of a contract to transfer movable property can be so relieved except in the following cases:— (i) where the property is not an ordinary article of commerce, or is of special value or interest to the plaintiff, or consists of goods which are not easily obtainable in the market; (ii) where the property is held by the defendant as the agent or trustee of the plaintiff.',
    explanation: 'Specific performance means the court orders the party who broke the contract to actually do what they promised, rather than just pay money. After the 2018 amendment, specific performance is now the default remedy (not discretionary). Courts presume that for immovable property (land, houses), money compensation is not enough. For movable goods, specific performance is granted when the goods are unique, rare, or of special value to the buyer.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['specific performance', 'immovable property', 'breach of contract', 'equitable remedy', 'court order', 'enforcement of contract', 'property transfer'],
    relatedSections: [
      { sectionNumber: '14', actCode: 'SRA', title: 'Contracts not specifically enforceable' },
      { sectionNumber: '38', actCode: 'SRA', title: 'Perpetual injunction' },
      { sectionNumber: '73', actCode: 'ICA', title: 'Compensation for breach' }
    ]
  },
  {
    act: 'Specific Relief Act, 1963',
    actCode: 'SRA',
    sectionNumber: '14',
    title: 'Contracts not specifically enforceable',
    legalText: 'The following contracts cannot be specifically enforced, namely:— (a) where a party to the contract has obtained substituted performance of contract in accordance with the provisions of section 20; (b) a contract, the performance of which involves the performance of a continuous duty which the court cannot supervise; (c) a contract which is so dependent on the personal qualifications of the parties that the court cannot enforce specific performance of its material terms; and (d) a contract which is in its nature determinable.',
    explanation: 'Certain contracts cannot be specifically enforced by the court: (1) if the injured party already obtained substituted performance (hired someone else to do the work), (2) contracts requiring continuous supervision by the court (like a construction contract), (3) contracts based on personal skill or talent (like hiring a singer to perform), and (4) contracts that are terminable by nature. In these cases, the remedy is usually monetary damages instead.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['contracts not enforceable', 'personal service', 'continuous duty', 'substituted performance', 'determinable contract', 'specific performance exceptions'],
    relatedSections: [
      { sectionNumber: '10', actCode: 'SRA', title: 'Specific performance of contracts' },
      { sectionNumber: '38', actCode: 'SRA', title: 'Perpetual injunction' }
    ]
  },
  {
    act: 'Specific Relief Act, 1963',
    actCode: 'SRA',
    sectionNumber: '38',
    title: 'Perpetual injunction when granted',
    legalText: '(1) Subject to the other provisions contained in or referred to by this Chapter, a perpetual injunction may be granted to the plaintiff to prevent the breach of an obligation existing in his favour, whether expressly or by implication. (2) When any such obligation arises from contract, the court shall be guided by the rules and provisions contained in Chapter II. (3) When the defendant invades or threatens to invade the plaintiff\'s right to, or enjoyment of, property, the court may grant a perpetual injunction in the following cases, namely:— (a) where the defendant is trustee of the property for the plaintiff; (b) where there exists no standard for ascertaining the actual damage caused, or likely to be caused, by the invasion; (c) where the invasion is such that compensation in money would not afford adequate relief; (d) where the injunction is necessary to prevent a multiplicity of judicial proceedings.',
    explanation: 'A perpetual injunction is a permanent court order preventing someone from doing something that violates your rights. It can be granted when: (1) the defendant holds property in trust for you, (2) it is hard to calculate the damage in money terms, (3) money compensation would not be adequate relief, or (4) it would prevent repeated lawsuits. For contractual obligations, the court follows the specific performance rules. This is commonly used in property disputes and intellectual property cases.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['perpetual injunction', 'permanent injunction', 'injunction', 'breach of obligation', 'property rights', 'court order', 'equitable relief', 'restraining order'],
    relatedSections: [
      { sectionNumber: '10', actCode: 'SRA', title: 'Specific performance of contracts' },
      { sectionNumber: '14', actCode: 'SRA', title: 'Contracts not specifically enforceable' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // Limitation Act, 1963
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'Limitation Act, 1963',
    actCode: 'LA',
    sectionNumber: '3',
    title: 'Bar of limitation',
    legalText: '(1) Subject to the provisions contained in sections 4 to 24 (inclusive), every suit instituted, appeal preferred, and application made after the prescribed period shall be dismissed, although limitation has not been set up as a defence. (2) For the purposes of this Act— (a) a suit is instituted,— (i) in an ordinary case, when the plaint is presented to the proper officer; (ii) in the case of a pauper, when his application for leave to sue as a pauper is made; and (iii) in the case of a claim against a company which is being wound up by the court, when the claimant first sends in his claim to the official liquidator; (b) any claim by way of a set-off or a counter claim, shall be treated as a separate suit and shall be deemed to have been instituted— (i) in the case of a set-off, on the same date as the suit in which the set-off is pleaded; (ii) in the case of a counter claim, on the date on which the counter claim is made in court; (c) an application by notice of motion in a High Court is made when the application is presented to the proper officer of that court.',
    explanation: 'Every lawsuit, appeal, or application must be filed within the time limit prescribed by law. If you file after the deadline, your case will be dismissed — even if the other side does not raise the objection. The court is required to reject time-barred cases on its own. A suit is considered "filed" when the plaint is submitted to the court. This section enforces the fundamental principle that legal rights must be exercised within reasonable time.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['limitation', 'time bar', 'prescribed period', 'filing deadline', 'dismissal', 'time limit', 'statute of limitations', 'delay in filing'],
    relatedSections: [
      { sectionNumber: '5', actCode: 'LA', title: 'Extension of prescribed period' },
      { sectionNumber: 'Art. 54', actCode: 'LA', title: 'Specific performance limitation' }
    ]
  },
  {
    act: 'Limitation Act, 1963',
    actCode: 'LA',
    sectionNumber: '5',
    title: 'Extension of prescribed period in certain cases',
    legalText: 'Any appeal or any application, other than an application under any of the provisions of Order XXI of the Code of Civil Procedure, 1908, may be admitted after the prescribed period, if the appellant or the applicant satisfies the court that he had sufficient cause for not preferring the appeal or making the application within such period. Explanation.— The fact that the appellant or the applicant was misled by any order, practice or judgment of the High Court in ascertaining or computing the prescribed period may be sufficient cause within the meaning of this section.',
    explanation: 'If you miss the deadline for filing an appeal or application (but NOT a suit), you can still get it admitted if you can show the court a good reason ("sufficient cause") for the delay. For example, being hospitalized, being misled by court procedures, or genuine ignorance of facts can be sufficient cause. The court decides case by case. Note: this section does NOT apply to original suits or to execution applications under Order XXI CPC.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['condonation of delay', 'sufficient cause', 'extension of time', 'late filing', 'appeal deadline', 'limitation extension', 'delay excuse'],
    relatedSections: [
      { sectionNumber: '3', actCode: 'LA', title: 'Bar of limitation' },
      { sectionNumber: 'Art. 137', actCode: 'LA', title: 'Residuary limitation period' }
    ]
  },
  {
    act: 'Limitation Act, 1963',
    actCode: 'LA',
    sectionNumber: 'Art. 54',
    title: 'Suit for specific performance of a contract',
    legalText: 'First Schedule, Article 54 — For specific performance of a contract — Period of limitation: Three years — Time from which period begins to run: The date fixed for the performance, or, if no such date is fixed, when the plaintiff has notice that performance is refused.',
    explanation: 'If you want to go to court to force the other party to actually perform a contract (specific performance), you must file the suit within 3 years. The clock starts from the date the contract was supposed to be performed, or if no date was fixed, from when you learn that the other party refuses to perform. This is one of the most commonly invoked limitation periods in property and contract disputes.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['specific performance limitation', 'three years', 'Article 54', 'contract limitation', 'filing deadline', 'time limit suit'],
    relatedSections: [
      { sectionNumber: '3', actCode: 'LA', title: 'Bar of limitation' },
      { sectionNumber: 'Art. 55', actCode: 'LA', title: 'Compensation for breach limitation' },
      { sectionNumber: '10', actCode: 'SRA', title: 'Specific performance of contracts' }
    ]
  },
  {
    act: 'Limitation Act, 1963',
    actCode: 'LA',
    sectionNumber: 'Art. 55',
    title: 'Suit for compensation for breach of any contract, express or implied, not herein specially provided for',
    legalText: 'First Schedule, Article 55 — For compensation for the breach of any contract, express or implied, not herein specially provided for — Period of limitation: Three years — Time from which period begins to run: When the contract is broken, or (where there are successive breaches) when the breach in respect of which the suit is instituted occurs, or (where the breach is continuing) when it ceases.',
    explanation: 'If someone breaks a contract (any type not specifically covered elsewhere in the schedule), you have 3 years to file a suit for compensation. The 3-year period starts from the date the breach occurred. If there are multiple breaches over time, the limitation runs separately for each. If the breach is ongoing (continuous), the time starts only when it stops. This is the general limitation for breach of contract claims.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['breach of contract limitation', 'three years', 'Article 55', 'compensation', 'successive breaches', 'continuing breach', 'contract damages'],
    relatedSections: [
      { sectionNumber: '3', actCode: 'LA', title: 'Bar of limitation' },
      { sectionNumber: 'Art. 54', actCode: 'LA', title: 'Specific performance limitation' },
      { sectionNumber: '73', actCode: 'ICA', title: 'Compensation for breach' }
    ]
  },
  {
    act: 'Limitation Act, 1963',
    actCode: 'LA',
    sectionNumber: 'Art. 137',
    title: 'Any other application for which no period of limitation is provided elsewhere in this division',
    legalText: 'First Schedule, Article 137 — Any other application for which no period of limitation is provided elsewhere in this division — Period of limitation: Three years — Time from which period begins to run: When the right to apply accrues.',
    explanation: 'This is the residuary or catch-all limitation period. For any application to a court or tribunal where no specific limitation period is mentioned elsewhere, the default time limit is 3 years from when the right to file first arose. This article is frequently used for applications under writ jurisdiction, arbitration matters, and various tribunal proceedings where no other specific limitation period applies.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['residuary limitation', 'three years', 'Article 137', 'catch-all', 'default limitation', 'right to apply', 'writ petition', 'tribunal application'],
    relatedSections: [
      { sectionNumber: '3', actCode: 'LA', title: 'Bar of limitation' },
      { sectionNumber: '5', actCode: 'LA', title: 'Extension of prescribed period' }
    ]
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing sections for all act codes in this file
    const actCodes = ['ICA', 'SOGA', 'IPA', 'SRA', 'LA'];
    for (const code of actCodes) {
      const deleted = await LegalSection.deleteMany({ actCode: code });
      console.log(`Cleared ${deleted.deletedCount} existing ${code} sections`);
    }

    // Seed all sections
    for (let i = 0; i < sections.length; i++) {
      await LegalSection.create(sections[i]);
      console.log(`[${i + 1}/${sections.length}] ${sections[i].actCode} Section ${sections[i].sectionNumber}: ${sections[i].title}`);
    }

    console.log(`Done: seeded ${sections.length} sections across ${actCodes.length} acts`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed();
