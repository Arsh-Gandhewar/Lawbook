require('dotenv').config();
const mongoose = require('mongoose');
const LegalSection = require('./models/LegalSection');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lawbook';

const sections = [
  {
    act: 'Right to Information Act, 2005',
    actCode: 'RTI',
    sectionNumber: '2(f)',
    title: 'Definition of Information',
    legalText: '"Information" means any material in any form, including records, documents, memos, e-mails, opinions, advices, press releases, circulars, orders, logbooks, contracts, reports, papers, samples, models, data material held in any electronic form and information relating to any private body which can be accessed by a public authority under any other law for the time being in force.',
    explanation: 'Information under RTI includes any material in any form — documents, emails, opinions, contracts, electronic data, etc. — held by or accessible to a public authority.',
    punishment: 'N/A',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['information', 'definition', 'RTI', 'documents', 'records', 'public authority', 'electronic form']
  },
  {
    act: 'Right to Information Act, 2005',
    actCode: 'RTI',
    sectionNumber: '3',
    title: 'Right to information',
    legalText: 'Subject to the provisions of this Act, all citizens shall have the right to information.',
    explanation: 'Every Indian citizen has the right to request and receive information from any public authority. This is a fundamental statutory right.',
    punishment: 'N/A',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['right to information', 'citizen', 'fundamental right', 'RTI right', 'access to information']
  },
  {
    act: 'Right to Information Act, 2005',
    actCode: 'RTI',
    sectionNumber: '4',
    title: 'Obligations of public authorities',
    legalText: 'Every public authority shall maintain all its records duly catalogued and indexed in a manner and the form which facilitates the right to information under this Act and ensure that all records that are appropriate to be computerised are, within a reasonable time and subject to availability of resources, computerised and connected through a network all over the country on different systems.',
    explanation: 'Public authorities are required to proactively publish information like their organization structure, powers and duties of officers, decision-making process, rules, regulations, directory of officers, budget, and details of schemes. They must maintain proper records and make them computer-accessible.',
    punishment: 'N/A',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['public authority', 'obligations', 'proactive disclosure', 'suo motu', 'records', 'transparency']
  },
  {
    act: 'Right to Information Act, 2005',
    actCode: 'RTI',
    sectionNumber: '6',
    title: 'Request for obtaining information',
    legalText: 'A person, who desires to obtain any information under this Act, shall make a request in writing or through electronic means in English or Hindi or in the official language of the area in which the application is being made, accompanying such fee as may be prescribed, to the Central Public Information Officer or State Public Information Officer, as the case may be, of the concerned public authority.',
    explanation: 'To get information, you submit a written RTI application to the Public Information Officer (PIO) of the concerned government department, along with an application fee of Rs. 10. No reason needs to be given for requesting information. BPL applicants are exempt from fees.',
    punishment: 'N/A',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['RTI application', 'request', 'PIO', 'public information officer', 'fee', 'Rs 10', 'how to file RTI']
  },
  {
    act: 'Right to Information Act, 2005',
    actCode: 'RTI',
    sectionNumber: '7',
    title: 'Disposal of request',
    legalText: 'Subject to the proviso to sub-section (2) of section 5 or the proviso to sub-section (3) of section 6, the Central Public Information Officer or State Public Information Officer, as the case may be, on receipt of a request under section 6 shall, as expeditiously as possible, and in any case within thirty days of the receipt of the request, either provide the information on payment of such fee as may be prescribed or reject the request for any of the reasons specified in sections 8 and 9. Where the information sought for concerns the life or liberty of a person, the same shall be provided within forty-eight hours of the receipt of the request.',
    explanation: 'The PIO must respond to an RTI application within 30 days. If the information relates to life or liberty of a person, it must be provided within 48 hours. If the PIO fails to respond within 30 days, the information is deemed to have been refused.',
    punishment: 'N/A',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['30 days', 'time limit', 'disposal', 'response', '48 hours', 'life or liberty', 'deemed refusal']
  },
  {
    act: 'Right to Information Act, 2005',
    actCode: 'RTI',
    sectionNumber: '8',
    title: 'Exemption from disclosure of information',
    legalText: 'Notwithstanding anything contained in this Act, there shall be no obligation to give any citizen: (a) information, disclosure of which would prejudicially affect the sovereignty and integrity of India, the security, strategic, scientific or economic interests of the State, relation with foreign State or lead to incitement of an offence; (b) information which has been expressly forbidden to be published by any court of law or tribunal; (c) information, the disclosure of which would cause a breach of privilege of Parliament or the State Legislature; (d) information including commercial confidence, trade secrets or intellectual property; (e) information available to a person in his fiduciary relationship; (f) information received in confidence from foreign Government; (g) information, the disclosure of which would endanger the life or physical safety of any person; (h) information which would impede the process of investigation or apprehension or prosecution of offenders; (i) cabinet papers including records of deliberations of the Council of Ministers, Secretaries and other officers; (j) information which relates to personal information the disclosure of which has no relationship to any public activity or interest.',
    explanation: 'Certain categories of information are exempt from disclosure: national security, court-prohibited info, trade secrets, personal privacy, cabinet deliberations, and information that could endanger safety or impede investigations. However, information that cannot be denied to Parliament cannot be denied to citizens either.',
    punishment: 'N/A',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['exemption', 'national security', 'trade secret', 'privacy', 'cabinet papers', 'exceptions', 'Section 8']
  },
  {
    act: 'Right to Information Act, 2005',
    actCode: 'RTI',
    sectionNumber: '19',
    title: 'Appeal',
    legalText: 'Any person who, does not receive a decision within the time specified in sub-section (1) or clause (a) of sub-section (3) of section 7, or is aggrieved by a decision of the Central Public Information Officer or State Public Information Officer, as the case may be, may within thirty days from the expiry of such period or from the receipt of such a decision prefer an appeal to such officer who is senior in rank to the Central Public Information Officer or State Public Information Officer. A second appeal against the decision under sub-section (1) shall lie within ninety days from the date on which the decision should have been made or was actually received, with the Central Information Commission or the State Information Commission.',
    explanation: 'If your RTI application is rejected or not responded to within 30 days, you can file a First Appeal to an officer senior to the PIO within 30 days. If still dissatisfied, you can file a Second Appeal to the Central/State Information Commission within 90 days.',
    punishment: 'N/A',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['appeal', 'first appeal', 'second appeal', 'information commission', 'CIC', 'SIC', 'remedy', '30 days', '90 days']
  },
  {
    act: 'Right to Information Act, 2005',
    actCode: 'RTI',
    sectionNumber: '20',
    title: 'Penalties',
    legalText: 'Where the Central Information Commission or the State Information Commission, as the case may be, at the time of deciding any complaint or appeal is of the opinion that the Central Public Information Officer or the State Public Information Officer, as the case may be, has, without any reasonable cause, refused to receive an application for information or has not furnished information within the time specified under sub-section (1) of section 7 or malafidely denied the request for information or knowingly given incorrect, incomplete or misleading information or destroyed information which was the subject of the request or obstructed in any manner in furnishing the information, it shall impose a penalty of two hundred and fifty rupees each day till application is received or information is furnished, so however, the total amount of such penalty shall not exceed twenty-five thousand rupees.',
    explanation: 'If a PIO refuses to provide information without valid reason, provides false/misleading information, or destroys records, the Information Commission can impose a penalty of Rs. 250 per day of delay, up to a maximum of Rs. 25,000. The Commission can also recommend disciplinary action against the PIO.',
    punishment: 'Penalty of Rs. 250 per day, maximum Rs. 25,000 on the Public Information Officer',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['penalty', 'PIO penalty', 'Rs 250 per day', 'Rs 25000', 'disciplinary action', 'non-compliance', 'malafide denial']
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const deleted = await LegalSection.deleteMany({ actCode: 'RTI' });
    console.log(`🗑️ Cleared ${deleted.deletedCount} existing RTI sections`);

    for (let i = 0; i < sections.length; i++) {
      await LegalSection.create(sections[i]);
      console.log(`✅ [${i + 1}/${sections.length}] Section ${sections[i].sectionNumber}: ${sections[i].title}`);
    }

    console.log(`\n📊 SUMMARY: Seeded ${sections.length} Right to Information Act sections`);
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
}

seed();
