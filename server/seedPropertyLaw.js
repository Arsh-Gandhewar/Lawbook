// Seed script to add Property Law sections to the legal database
// Run with: node server/seedPropertyLaw.js

require('dotenv').config();
const mongoose = require('mongoose');
const LegalSection = require('./models/LegalSection');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lawbook';

const propertySections = [
  // ═══════════════════════════════════════════════════════════════════
  // Transfer of Property Act, 1882
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'Transfer of Property Act, 1882',
    actCode: 'TPA',
    sectionNumber: '5',
    title: 'Transfer of property defined',
    legalText: 'In the following sections "transfer of property" means an act by which a living person conveys property, in present or in future, to one or more other living persons, or to himself, or to himself and one or more other living persons; and "to transfer property" is to perform such act. In this section "living person" includes a company or association or body of individuals, whether incorporated or not, but nothing herein contained shall affect any law for the time being in force relating to transfer of property to or by companies, associations or bodies of individuals.',
    explanation: 'Transfer of property is when a living person (including companies) passes on property rights to another living person, either now or in the future. This is the foundational definition that governs all property transactions in India.',
    punishment: '',
    category: 'Property',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['transfer of property', 'conveyance', 'property transfer', 'living person', 'TPA Section 5'],
    relatedSections: [
      { sectionNumber: '54', actCode: 'TPA', title: 'Sale defined' },
      { sectionNumber: '58', actCode: 'TPA', title: 'Mortgage defined' }
    ]
  },
  {
    act: 'Transfer of Property Act, 1882',
    actCode: 'TPA',
    sectionNumber: '52',
    title: 'Transfer of property pending suit (Doctrine of Lis Pendens)',
    legalText: 'During the pendency in any Court having authority within the limits of India excluding the State of Jammu and Kashmir or established beyond such limits by the Central Government of any suit or proceeding which is not collusive and in which any right to immovable property is directly and specifically in question, the property cannot be transferred or otherwise dealt with by any party to the suit or proceeding so as to affect the rights of any other party thereto under any decree or order which may be made therein, except under the authority of the Court and on such terms as it may impose.',
    explanation: 'Once a lawsuit about a property is filed in court, no party can transfer or deal with that property in a way that affects the rights of the other party. Any transfer during the lawsuit is subject to the final court order. This is known as the doctrine of Lis Pendens.',
    punishment: '',
    category: 'Property',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['lis pendens', 'pending suit', 'property dispute', 'transfer during litigation', 'court case property'],
    relatedSections: [
      { sectionNumber: '53A', actCode: 'TPA', title: 'Part performance' }
    ]
  },
  {
    act: 'Transfer of Property Act, 1882',
    actCode: 'TPA',
    sectionNumber: '53A',
    title: 'Part performance',
    legalText: 'Where any person contracts to transfer for consideration any immovable property by writing signed by him or on his behalf from which the terms necessary to constitute the transfer can be ascertained with reasonable certainty, and the transferee has, in part performance of the contract, taken possession of the property or any part thereof, or the transferee, being already in possession, continues in possession in part performance of the contract and has done some act in furtherance of the contract, and the transferee has performed or is willing to perform his part of the contract, then, notwithstanding that where there is an instrument of transfer, that the transfer has not been completed in the manner prescribed therefor by the law for the time being in force, the transferor or any person claiming under him shall be debarred from enforcing against the transferee and persons claiming under him any right in respect of the property of which the transferee has taken or continued in possession, other than a right expressly provided by the terms of the contract.',
    explanation: 'If a buyer has taken possession of property based on a written agreement (even without a registered sale deed) and has fulfilled or is willing to fulfil their part of the deal, the seller cannot evict them. This protects buyers who have acted in good faith based on agreements to sell.',
    punishment: '',
    category: 'Property',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['part performance', 'agreement to sell', 'possession', 'unregistered agreement', 'section 53A'],
    relatedSections: [
      { sectionNumber: '54', actCode: 'TPA', title: 'Sale defined' },
      { sectionNumber: '52', actCode: 'TPA', title: 'Lis Pendens' }
    ]
  },
  {
    act: 'Transfer of Property Act, 1882',
    actCode: 'TPA',
    sectionNumber: '54',
    title: 'Sale defined',
    legalText: '"Sale" is a transfer of ownership in exchange for a price paid or promised or part-paid and part-promised. Such transfer, in the case of tangible immovable property of the value of one hundred rupees and upwards, or in the case of a reversion or other intangible thing, can be made only by a registered instrument. In the case of tangible immovable property of a value less than one hundred rupees, such transfer may be made either by a registered instrument or by delivery of the property.',
    explanation: 'Sale means transferring ownership of property for a price. For immovable property worth ₹100 or more, the sale must be done through a registered document (sale deed). For property below ₹100, physical delivery is enough. This is the basic definition of what constitutes a legal sale of property.',
    punishment: '',
    category: 'Property',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['sale', 'sale deed', 'property sale', 'registered instrument', 'transfer of ownership', 'conveyance deed'],
    relatedSections: [
      { sectionNumber: '5', actCode: 'TPA', title: 'Transfer of property defined' },
      { sectionNumber: '53A', actCode: 'TPA', title: 'Part performance' }
    ]
  },
  {
    act: 'Transfer of Property Act, 1882',
    actCode: 'TPA',
    sectionNumber: '58',
    title: 'Mortgage defined',
    legalText: 'A mortgage is the transfer of an interest in specific immoveable property for the purpose of securing the payment of money advanced or to be advanced by way of loan, an existing or future debt, or the performance of an engagement which may give rise to a pecuniary liability. The transferor is called a mortgagor, the transferee a mortgagee; the principal money and interest of which payment is secured for the time being are called the mortgage-money; and the instrument (if any) by which the transfer is effected is called a mortgage-deed.',
    explanation: 'A mortgage is when you transfer an interest (not ownership) in your property to a lender as security for a loan. The borrower is called the mortgagor, the lender is the mortgagee. The loan amount secured is called mortgage-money, and the document is called a mortgage-deed. Types include simple mortgage, mortgage by conditional sale, usufructuary mortgage, English mortgage, equitable mortgage, and anomalous mortgage.',
    punishment: '',
    category: 'Property',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['mortgage', 'home loan', 'property loan', 'mortgagor', 'mortgagee', 'mortgage deed', 'security interest', 'hypothecation'],
    relatedSections: [
      { sectionNumber: '54', actCode: 'TPA', title: 'Sale defined' },
      { sectionNumber: '105', actCode: 'TPA', title: 'Lease defined' }
    ]
  },
  {
    act: 'Transfer of Property Act, 1882',
    actCode: 'TPA',
    sectionNumber: '105',
    title: 'Lease defined',
    legalText: 'A lease of immoveable property is a transfer of a right to enjoy such property, made for a certain time, express or implied, or in perpetuity, in consideration of a price paid or promised, or of money, a share of crops, service or any other thing of value, to be rendered periodically or on specified occasions to the transferor by the transferee, who accepts the transfer on such terms. The transferor is called the lessor, the transferee is called the lessee, the price is called the premium, and the money, share, service or other thing to be so rendered is called the rent.',
    explanation: 'A lease is when a property owner (lessor) gives the right to use the property to another person (lessee) for a fixed period in exchange for rent. The rent can be money, a share of crops, or services. This definition covers all types of leases of immovable property including residential, commercial, and agricultural leases.',
    punishment: '',
    category: 'Property',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['lease', 'rent', 'tenant', 'landlord', 'lessor', 'lessee', 'rental agreement', 'lease deed', 'tenancy'],
    relatedSections: [
      { sectionNumber: '106', actCode: 'TPA', title: 'Duration of leases' },
      { sectionNumber: '108', actCode: 'TPA', title: 'Rights and liabilities of lessor and lessee' }
    ]
  },
  {
    act: 'Transfer of Property Act, 1882',
    actCode: 'TPA',
    sectionNumber: '106',
    title: 'Duration of certain leases in absence of written contract',
    legalText: 'In the absence of a contract or local law or usage to the contrary, a lease of immovable property for agricultural or manufacturing purposes shall be deemed to be a lease from year to year, terminable, on the part of either lessor or lessee, by six months\' notice; and a lease of immovable property for any other purpose shall be deemed to be a lease from month to month, terminable, on the part of either lessor or lessee, by fifteen days\' notice. Every notice under this section must be in writing and served in accordance with the provisions of Order V Rule 9 and 13 of the Code of Civil Procedure, 1908.',
    explanation: 'If there is no written agreement about lease duration: Agricultural/manufacturing leases run year to year with 6 months notice to end. All other leases (residential, commercial) run month to month with 15 days notice to end. Notice must be in writing. This is the default rule when there is no specific agreement.',
    punishment: '',
    category: 'Property',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['lease duration', 'notice period', 'eviction notice', '15 days notice', '6 months notice', 'month to month', 'tenancy termination'],
    relatedSections: [
      { sectionNumber: '105', actCode: 'TPA', title: 'Lease defined' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // Real Estate (Regulation and Development) Act, 2016
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'Real Estate (Regulation and Development) Act, 2016',
    actCode: 'RERA',
    sectionNumber: '3',
    title: 'Registration of real estate projects',
    legalText: 'No promoter shall advertise, market, book, sell or offer for sale, or invite persons to purchase in any manner any plot, apartment or building, as the case may be, in any real estate project or part of it, in any planning area, without registering the real estate project with the Real Estate Regulatory Authority established under this Act. Provided that projects that are ongoing on the date of commencement of this Act and for which the completion certificate has not been issued, the promoter shall make an application to the Authority for registration of the said project within a period of three months from the date of commencement of this Act.',
    explanation: 'No builder or developer can advertise, sell, or offer any property (plot, apartment, building) without first registering the project with the Real Estate Regulatory Authority (RERA). Even ongoing projects that were started before RERA must be registered within 3 months. This protects homebuyers from unregistered and potentially fraudulent projects.',
    punishment: 'Imprisonment up to 3 years, or fine up to 10% of project cost, or both',
    category: 'Property',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['RERA registration', 'real estate project', 'builder registration', 'project registration', 'RERA compliance'],
    relatedSections: [
      { sectionNumber: '4', actCode: 'RERA', title: 'Application for registration' },
      { sectionNumber: '31', actCode: 'RERA', title: 'Penalty for non-registration' }
    ]
  },
  {
    act: 'Real Estate (Regulation and Development) Act, 2016',
    actCode: 'RERA',
    sectionNumber: '4',
    title: 'Application for registration',
    legalText: 'Every promoter shall make an application to the Authority for registration of the real estate project in such form and manner, within such time and accompanied by such fee and documents as may be prescribed. The application shall be accompanied by: (a) a brief detail of the enterprise, including its name, registered address, type of enterprise; (b) particulars of registration including the details of registration and any other registration; (c) a brief detail of the projects launched by the promoter, in the past five years; (d) an authenticated copy of the approvals and commencement certificate; (e) the sanctioned plan, layout plan and specifications of the proposed project; (f) the plan of development works to be executed; (g) the location details of the project; (h) proforma of the allotment letter, agreement for sale, and the conveyance deed.',
    explanation: 'To register a project with RERA, the developer must submit detailed documents including: company details, past project history, government approvals, sanctioned plans, layout plans, specifications, development plans, location details, and draft sale agreements. This ensures transparency and gives homebuyers access to verified information about the project.',
    punishment: '',
    category: 'Property',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['RERA application', 'project registration form', 'builder documents', 'sanctioned plan', 'RERA compliance documents'],
    relatedSections: [
      { sectionNumber: '3', actCode: 'RERA', title: 'Registration of real estate projects' },
      { sectionNumber: '11', actCode: 'RERA', title: 'Functions of promoter' }
    ]
  },
  {
    act: 'Real Estate (Regulation and Development) Act, 2016',
    actCode: 'RERA',
    sectionNumber: '11',
    title: 'Functions and duties of promoter',
    legalText: 'The promoter shall— (a) upon receiving his login Id and password and on the application being approved, upload the details of the registered project on the website of the Authority including all details of the registered project as specified; (b) create his web page on the website of the Authority and enter all details of the project including registration details, quarterly up-to-date status of the project, status of approvals, and details of the land title; (c) the promoter shall be responsible for all obligations, responsibilities and functions under the provisions of this Act or the rules and regulations; (d) the promoter shall be responsible to obtain the completion certificate or the occupancy certificate, and to make it available to the allottees; (e) the promoter shall be responsible for providing and maintaining the essential services, on reasonable charges, till the taking over of the maintenance of the project by the association of the allottees.',
    explanation: 'Developers must: upload project details on RERA website, maintain updated project status quarterly, provide completion/occupancy certificates to buyers, maintain essential services until the residents\' association takes over. This ensures ongoing accountability of developers throughout the project lifecycle.',
    punishment: '',
    category: 'Property',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['promoter duties', 'developer obligations', 'RERA website', 'occupancy certificate', 'completion certificate', 'builder responsibilities'],
    relatedSections: [
      { sectionNumber: '3', actCode: 'RERA', title: 'Registration of real estate projects' },
      { sectionNumber: '18', actCode: 'RERA', title: 'Return of amount and compensation' }
    ]
  },
  {
    act: 'Real Estate (Regulation and Development) Act, 2016',
    actCode: 'RERA',
    sectionNumber: '18',
    title: 'Return of amount and compensation',
    legalText: 'If the promoter fails to complete or is unable to give possession of an apartment, plot or building,— (a) in accordance with the terms of the agreement for sale or, as the case may be, duly completed by the date specified therein; or (b) due to discontinuance of his business as a developer on account of suspension or revocation of the registration under this Act or for any other reason, he shall be liable on demand to the allottees, in case the allottee wishes to withdraw from the project, without prejudice to any other remedy available, to return the amount received by him in respect of that apartment, plot, building, as the case may be, with interest at such rate as may be prescribed in this behalf including compensation in the manner as provided under this Act.',
    explanation: 'If a builder fails to deliver your property on time or stops business, the buyer has the right to: (1) Withdraw from the project and get a full refund with interest, OR (2) Continue with the project and get interest for every month of delay. This is one of the most powerful provisions for homebuyers under RERA.',
    punishment: 'Refund of full amount paid with interest as prescribed; additional compensation may be awarded',
    category: 'Property',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['RERA refund', 'delay in possession', 'builder delay', 'project delay', 'compensation', 'homebuyer rights', 'RERA complaint'],
    relatedSections: [
      { sectionNumber: '11', actCode: 'RERA', title: 'Functions of promoter' },
      { sectionNumber: '31', actCode: 'RERA', title: 'Penalty for non-registration' }
    ]
  },
  {
    act: 'Real Estate (Regulation and Development) Act, 2016',
    actCode: 'RERA',
    sectionNumber: '31',
    title: 'Penalty for non-registration',
    legalText: 'If any promoter contravenes the provisions of section 3, he shall be liable to a penalty which may extend up to ten per cent of the estimated cost of the real estate project. If the promoter does not comply with the orders, directions or decisions issued under the above sub-section, he shall be punishable with imprisonment for a term which may extend up to three years or with fine which may extend to a further ten per cent of the estimated cost of the real estate project, or with both.',
    explanation: 'If a builder sells properties without RERA registration: First penalty is up to 10% of the project cost. If the builder still does not comply, they face up to 3 years imprisonment or an additional 10% fine, or both. This is a strong deterrent against unregistered real estate projects.',
    punishment: 'Fine up to 10% of estimated project cost; non-compliance: imprisonment up to 3 years or further fine up to 10% of project cost, or both',
    category: 'Property',
    cognizable: 'No',
    bailable: 'Yes',
    keywords: ['RERA penalty', 'unregistered project', 'builder penalty', 'non-registration', 'RERA fine', 'illegal construction'],
    relatedSections: [
      { sectionNumber: '3', actCode: 'RERA', title: 'Registration of real estate projects' }
    ]
  }
];

async function seedPropertyLaw() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Clear existing sections for each actCode
    const actCodes = ['TPA', 'RERA'];
    for (const code of actCodes) {
      const existing = await LegalSection.countDocuments({ actCode: code });
      if (existing > 0) {
        console.log(`🗑️  Removing ${existing} existing ${code} sections...`);
        await LegalSection.deleteMany({ actCode: code });
      }
    }

    console.log(`\n📚 Seeding ${propertySections.length} property law sections...\n`);

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📖 Transfer of Property Act, 1882');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    for (const section of propertySections.filter(s => s.actCode === 'TPA')) {
      await LegalSection.create(section);
      console.log(`   ✅ TPA Section ${section.sectionNumber} — ${section.title}`);
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📖 Real Estate (Regulation and Development) Act, 2016');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    for (const section of propertySections.filter(s => s.actCode === 'RERA')) {
      await LegalSection.create(section);
      console.log(`   ✅ RERA Section ${section.sectionNumber} — ${section.title}`);
    }

    const totalAll = await LegalSection.countDocuments();
    console.log(`\n═══════════════════════════════════════════`);
    console.log(`🎉 PROPERTY LAW SEEDING COMPLETE`);
    console.log(`═══════════════════════════════════════════`);
    console.log(`   TPA sections added:   ${propertySections.filter(s => s.actCode === 'TPA').length}`);
    console.log(`   RERA sections added:  ${propertySections.filter(s => s.actCode === 'RERA').length}`);
    console.log(`   Total DB sections:    ${totalAll}`);
    console.log(`═══════════════════════════════════════════\n`);

  } catch (error) {
    console.error('❌ Error seeding property law:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB.');
    process.exit(0);
  }
}

seedPropertyLaw();
