require('dotenv').config();
const mongoose = require('mongoose');
const LegalSection = require('./models/LegalSection');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lawbook';

const sections = [
  {
    act: 'Consumer Protection Act, 2019',
    actCode: 'CPA',
    sectionNumber: '2(7)',
    title: 'Definition of Consumer',
    legalText: '"Consumer" means any person who buys any goods for a consideration which has been paid or promised or partly paid and partly promised, or under any system of deferred payment and includes any user of such goods other than the person who buys such goods for consideration paid or promised or partly paid or partly promised, or under any system of deferred payment, when such use is made with the approval of such person, but does not include a person who obtains such goods for resale or for any commercial purpose.',
    explanation: 'A consumer is any person who buys goods or services for personal use (not for resale or commercial purposes). Both the buyer and any user authorized by the buyer are considered consumers.',
    punishment: 'N/A',
    category: 'Consumer',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['consumer', 'definition', 'buyer', 'goods', 'services', 'personal use', 'not for resale']
  },
  {
    act: 'Consumer Protection Act, 2019',
    actCode: 'CPA',
    sectionNumber: '2(42)',
    title: 'Unfair Trade Practice',
    legalText: '"Unfair trade practice" means a trade practice which, for the purpose of promoting the sale, use or supply of any goods or for the provision of any service, adopts any unfair method or unfair or deceptive practice including false representation about the quality, quantity, standard, grade, composition, style or model, making false or misleading advertisement, or publishing any advertisement whether in any newspaper or otherwise for sale or supply at a bargain price of goods or services that are not intended to be offered for sale or supply.',
    explanation: 'Unfair trade practice includes false advertising, misleading claims about product quality, bait-and-switch tactics, and any deceptive method used to promote sales. This covers fake discounts, false endorsements, and misleading pricing.',
    punishment: 'Varies based on complaint outcome — compensation, refund, replacement',
    category: 'Consumer',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['unfair trade practice', 'false advertising', 'misleading', 'deceptive', 'fraud', 'consumer rights']
  },
  {
    act: 'Consumer Protection Act, 2019',
    actCode: 'CPA',
    sectionNumber: '9',
    title: 'Establishment of Consumer Disputes Redressal Commissions',
    legalText: 'There shall be established for the purposes of this Act, the following Consumer Disputes Redressal Commissions, namely: (a) a Consumer Disputes Redressal Commission to be known as the "District Commission" established by the State Government in each district of the State; (b) a Consumer Disputes Redressal Commission to be known as the "State Commission" established by the State Government in the State; and (c) a Consumer Disputes Redressal Commission to be known as the "National Commission" established by the Central Government.',
    explanation: 'A three-tier system of consumer courts exists: District Commission (for complaints up to Rs 1 crore), State Commission (Rs 1-10 crore), and National Commission (above Rs 10 crore). Consumers can file complaints at the appropriate level.',
    punishment: 'N/A',
    category: 'Consumer',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['consumer court', 'district commission', 'state commission', 'national commission', 'consumer forum', 'redressal']
  },
  {
    act: 'Consumer Protection Act, 2019',
    actCode: 'CPA',
    sectionNumber: '34',
    title: 'Jurisdiction of District Commission',
    legalText: 'Subject to the other provisions of this Act, the District Commission shall have jurisdiction to entertain complaints where the value of the goods or services paid as consideration does not exceed one crore rupees.',
    explanation: 'The District Consumer Disputes Redressal Commission handles complaints where the value of goods or services does not exceed Rs 1 crore (Rs 10 million). Complaints must be filed within 2 years of the cause of action.',
    punishment: 'N/A',
    category: 'Consumer',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['district commission', 'jurisdiction', '1 crore', 'consumer complaint', 'local court']
  },
  {
    act: 'Consumer Protection Act, 2019',
    actCode: 'CPA',
    sectionNumber: '35',
    title: 'Jurisdiction of State Commission',
    legalText: 'Subject to the other provisions of this Act, the State Commission shall have jurisdiction to entertain complaints where the value of the goods or services paid as consideration exceeds one crore rupees but does not exceed ten crore rupees.',
    explanation: 'The State Consumer Disputes Redressal Commission handles complaints valued between Rs 1 crore and Rs 10 crore. It also hears appeals from District Commission orders.',
    punishment: 'N/A',
    category: 'Consumer',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['state commission', 'jurisdiction', '1 crore to 10 crore', 'appeal', 'state consumer court']
  },
  {
    act: 'Consumer Protection Act, 2019',
    actCode: 'CPA',
    sectionNumber: '36',
    title: 'Jurisdiction of National Commission',
    legalText: 'Subject to the other provisions of this Act, the National Commission shall have jurisdiction to entertain complaints where the value of the goods or services paid as consideration exceeds ten crore rupees.',
    explanation: 'The National Consumer Disputes Redressal Commission (NCDRC) handles complaints valued above Rs 10 crore. It also hears appeals from State Commission orders and can transfer cases between State Commissions.',
    punishment: 'N/A',
    category: 'Consumer',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['national commission', 'NCDRC', 'jurisdiction', 'above 10 crore', 'supreme consumer court']
  },
  {
    act: 'Consumer Protection Act, 2019',
    actCode: 'CPA',
    sectionNumber: '39',
    title: 'Appeal against order of District Commission',
    legalText: 'Any person aggrieved by an order made by the District Commission may prefer an appeal against such order to the State Commission on the grounds of facts or law within a period of forty-five days from the date of the order, in such form and manner, as may be prescribed.',
    explanation: 'If you are unhappy with the District Commission\'s order, you can appeal to the State Commission within 45 days. The appeal can be on grounds of facts or law.',
    punishment: 'N/A',
    category: 'Consumer',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['appeal', 'district commission', 'state commission', '45 days', 'consumer appeal']
  },
  {
    act: 'Consumer Protection Act, 2019',
    actCode: 'CPA',
    sectionNumber: '47',
    title: 'Penalty for non-compliance of order',
    legalText: 'Where a trader or a person against whom a complaint is made or the complainant fails or omits to comply with any order made by the District Commission, the State Commission or the National Commission, as the case may be, such trader or person or complainant shall be punishable with imprisonment for a term which shall not be less than one month but which may extend to three years, or with fine which shall not be less than twenty-five thousand rupees but which may extend to one lakh rupees, or with both.',
    explanation: 'If a person or business fails to comply with an order of the consumer court, they can be imprisoned for 1 month to 3 years and/or fined Rs 25,000 to Rs 1 lakh.',
    punishment: 'Imprisonment 1 month to 3 years, and/or fine Rs 25,000 to Rs 1,00,000',
    category: 'Consumer',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['non-compliance', 'penalty', 'contempt', 'imprisonment', 'consumer court order', 'enforcement']
  },
  {
    act: 'Consumer Protection Act, 2019',
    actCode: 'CPA',
    sectionNumber: '69',
    title: 'Product liability',
    legalText: 'A product liability action may be brought by a complainant against a product manufacturer or a product service provider or a product seller, as the case may be, for any harm caused to him on account of a defective product.',
    explanation: 'Consumers can sue manufacturers, service providers, or sellers for harm caused by defective products. This includes physical injury, property damage, mental agony, or death caused by product defects. The manufacturer/seller has strict liability.',
    punishment: 'Compensation as determined by consumer court',
    category: 'Consumer',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['product liability', 'defective product', 'manufacturer liability', 'seller liability', 'harm', 'strict liability']
  },
  {
    act: 'Consumer Protection Act, 2019',
    actCode: 'CPA',
    sectionNumber: '84',
    title: 'Penalty for misleading advertisement',
    legalText: 'The Central Authority may, by order, impose a penalty up to ten lakh rupees on a manufacturer or an endorser, after giving such person a reasonable opportunity of being heard, for a false or misleading advertisement. The Central Authority may also impose a penalty up to fifty lakh rupees for every subsequent contravention.',
    explanation: 'Manufacturers and endorsers (celebrities) can be fined up to Rs 10 lakh for false or misleading advertisements. Repeat offences attract up to Rs 50 lakh. The CCPA can also prohibit the endorser from making any endorsement for up to 1 year for first offence and up to 3 years for subsequent offences.',
    punishment: 'Fine up to Rs 10 lakh (first offence), Rs 50 lakh (subsequent). Endorser banned from endorsing for up to 1-3 years.',
    category: 'Consumer',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['misleading advertisement', 'false ad', 'penalty', 'CCPA', 'endorser liability', 'celebrity endorsement', 'Rs 10 lakh']
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const deleted = await LegalSection.deleteMany({ actCode: 'CPA' });
    console.log(`🗑️ Cleared ${deleted.deletedCount} existing CPA sections`);

    for (let i = 0; i < sections.length; i++) {
      await LegalSection.create(sections[i]);
      console.log(`✅ [${i + 1}/${sections.length}] Section ${sections[i].sectionNumber}: ${sections[i].title}`);
    }

    console.log(`\n📊 SUMMARY: Seeded ${sections.length} Consumer Protection Act sections`);
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
}

seed();
