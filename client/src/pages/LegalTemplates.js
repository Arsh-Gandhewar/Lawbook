import React, { useState } from 'react';
import Navbar from '../components/Navbar';

// ── helpers ──────────────────────────────────────────────────────────
const formatDate = (dateStr) => {
  if (!dateStr) return '____/____/________';
  const d = new Date(dateStr);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

const todayFormatted = () => formatDate(new Date().toISOString());

// ── SVG icons (no emoji) ────────────────────────────────────────────
const icons = {
  rent: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5L12 3l9 7.5V21a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 21V10.5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 22.5V12h6v10.5" />
    </svg>
  ),
  fir: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  affidavit: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6m-7 4h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  poa: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0" />
    </svg>
  ),
  notice: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.981l7.5-4.039a2.25 2.25 0 012.134 0l7.5 4.039a2.25 2.25 0 011.183 1.98V19.5z" />
    </svg>
  ),
};

// ── template metadata ───────────────────────────────────────────────
const TEMPLATES = [
  {
    id: 'rent',
    title: 'Rent / Lease Agreement',
    desc: 'Standard Indian residential rent agreement with all mandatory clauses.',
    icon: icons.rent,
  },
  {
    id: 'fir',
    title: 'FIR Complaint Draft',
    desc: 'Formal First Information Report complaint ready for submission at any police station.',
    icon: icons.fir,
  },
  {
    id: 'affidavit',
    title: 'General Affidavit',
    desc: 'Sworn statement on stamp paper with verification clause for courts and authorities.',
    icon: icons.affidavit,
  },
  {
    id: 'poa',
    title: 'Power of Attorney',
    desc: 'General Power of Attorney authorising a representative to act on your behalf.',
    icon: icons.poa,
  },
  {
    id: 'notice',
    title: 'Legal Notice',
    desc: 'Formal legal notice under Section 80 CPC demanding compliance before litigation.',
    icon: icons.notice,
  },
];

// ── initial form values ─────────────────────────────────────────────
const initialValues = {
  rent: {
    landlordName: '', tenantName: '', propertyAddress: '', monthlyRent: '',
    securityDeposit: '', leaseDuration: '', startDate: '', city: '', state: '',
  },
  fir: {
    complainantName: '', fatherName: '', address: '', policeStation: '',
    district: '', incidentDate: '', incidentTime: '', incidentPlace: '',
    description: '', accusedDetails: '',
  },
  affidavit: {
    deponentName: '', fatherName: '', age: '', address: '', purpose: '',
    statements: [''],
  },
  poa: {
    grantorName: '', grantorAddress: '', attorneyName: '', attorneyAddress: '',
    powersGranted: '', duration: '', effectiveDate: '',
  },
  notice: {
    senderName: '', senderAddress: '', recipientName: '', recipientAddress: '',
    subject: '', facts: '', demands: '', daysToComply: '',
  },
};

// ── document generators ─────────────────────────────────────────────
const generateRent = (d) => `
RENT / LEASE AGREEMENT

This Rent Agreement is executed on ${formatDate(d.startDate)} at ${d.city || '____________'}, ${d.state || '____________'}.

BETWEEN

${d.landlordName || '____________'} (hereinafter referred to as the "LANDLORD/LESSOR"),

AND

${d.tenantName || '____________'} (hereinafter referred to as the "TENANT/LESSEE").

WHEREAS the Landlord is the absolute owner of the property situated at:
${d.propertyAddress || '____________'}

AND WHEREAS the Tenant has approached the Landlord to take the said premises on rent and the Landlord has agreed to let out the same on the following terms and conditions:

1. TERM OF LEASE
   The lease shall be for a period of ${d.leaseDuration || '____'} months commencing from ${formatDate(d.startDate)}.

2. MONTHLY RENT
   The Tenant shall pay a monthly rent of Rs. ${d.monthlyRent || '________'}/- (Rupees ${d.monthlyRent ? numberToWords(d.monthlyRent) : '________'} only) payable on or before the 5th day of each calendar month.

3. SECURITY DEPOSIT
   The Tenant has paid a sum of Rs. ${d.securityDeposit || '________'}/- (Rupees ${d.securityDeposit ? numberToWords(d.securityDeposit) : '________'} only) as refundable security deposit, which shall be returned at the time of vacating the premises after deducting any dues or damages.

4. PURPOSE
   The premises shall be used for residential purposes only. The Tenant shall not use the premises for any illegal or immoral activity.

5. MAINTENANCE
   The Tenant shall maintain the premises in good condition and shall be responsible for minor repairs. Major structural repairs shall be the responsibility of the Landlord.

6. SUB-LETTING
   The Tenant shall not sub-let the premises or any part thereof to any person without the prior written consent of the Landlord.

7. TERMINATION
   Either party may terminate this agreement by giving two months' prior written notice. Upon termination, the Tenant shall hand over vacant and peaceful possession of the premises.

8. ELECTRICITY AND WATER
   Electricity and water charges shall be borne by the Tenant as per actual consumption and meter readings.

9. ALTERATION
   The Tenant shall not make any structural alteration or addition to the premises without the prior written consent of the Landlord.

10. DISPUTE RESOLUTION
    Any dispute arising out of this agreement shall be subject to the jurisdiction of the courts in ${d.city || '____________'}, ${d.state || '____________'}.

IN WITNESS WHEREOF, the parties have set their hands on this agreement on the day and year first mentioned above.


LANDLORD/LESSOR                              TENANT/LESSEE

Signature: ___________________               Signature: ___________________
Name: ${d.landlordName || '____________'}                         Name: ${d.tenantName || '____________'}
Date: ${formatDate(d.startDate)}                          Date: ${formatDate(d.startDate)}


WITNESSES:

1. Name: ___________________
   Signature: ___________________
   Address: ___________________

2. Name: ___________________
   Signature: ___________________
   Address: ___________________
`;

const generateFIR = (d) => `
FIRST INFORMATION REPORT (FIR) — COMPLAINT DRAFT

To,
The Station House Officer,
${d.policeStation || '____________'} Police Station,
District: ${d.district || '____________'}

Subject: Complaint regarding criminal offence

Respected Sir/Madam,

I, ${d.complainantName || '____________'}, S/o (D/o) ${d.fatherName || '____________'}, residing at ${d.address || '____________'}, do hereby lodge the following complaint for registration of an FIR:

DATE OF INCIDENT:    ${formatDate(d.incidentDate)}
TIME OF INCIDENT:    ${d.incidentTime || '____________'}
PLACE OF INCIDENT:   ${d.incidentPlace || '____________'}

DETAILS OF INCIDENT:

${d.description || '____________'}

DETAILS OF ACCUSED PERSON(S):

${d.accusedDetails || '____________'}

I solemnly state that the above facts are true and correct to the best of my knowledge and belief. I request you to kindly register an FIR under the appropriate sections of the Bharatiya Nyaya Sanhita, 2023 (formerly IPC) and take necessary action.

I am ready to cooperate with the investigation and provide any further information or evidence as required.

Thanking you,

Yours faithfully,

Signature: ___________________
Name: ${d.complainantName || '____________'}
Address: ${d.address || '____________'}
Date: ${todayFormatted()}
`;

const generateAffidavit = (d) => `
AFFIDAVIT

(On Stamp Paper of appropriate value)

I, ${d.deponentName || '____________'}, S/o (D/o) ${d.fatherName || '____________'}, aged ${d.age || '____'} years, residing at ${d.address || '____________'}, do hereby solemnly affirm and state on oath as follows:

PURPOSE: ${d.purpose || '____________'}

${(d.statements || ['']).map((s, i) => `${i + 1}. That ${s || '____________'}`).join('\n\n')}

VERIFICATION

I, ${d.deponentName || '____________'}, the above-named deponent, do hereby verify that the contents of the above affidavit are true and correct to the best of my knowledge and belief. No part of it is false and nothing material has been concealed therefrom.

Verified at ${d.address ? d.address.split(',').pop()?.trim() : '____________'} on this ${todayFormatted()}.


DEPONENT

Signature: ___________________
Name: ${d.deponentName || '____________'}
Date: ${todayFormatted()}


BEFORE ME

(Notary Public / Oath Commissioner)

Signature: ___________________
Seal:
Date: ${todayFormatted()}
`;

const generatePOA = (d) => `
GENERAL POWER OF ATTORNEY

KNOW ALL MEN BY THESE PRESENTS:

This Power of Attorney is executed on ${formatDate(d.effectiveDate)} by:

GRANTOR:
Name: ${d.grantorName || '____________'}
Address: ${d.grantorAddress || '____________'}

IN FAVOUR OF:

ATTORNEY:
Name: ${d.attorneyName || '____________'}
Address: ${d.attorneyAddress || '____________'}

WHEREAS the Grantor is desirous of appointing the above-named person as his/her lawful Attorney to act on his/her behalf in the matters described herein.

NOW THEREFORE, the Grantor hereby appoints ${d.attorneyName || '____________'} as his/her true and lawful Attorney, with full power and authority to do and execute all or any of the following acts, deeds, and things on behalf of the Grantor:

POWERS GRANTED:

${d.powersGranted || '____________'}

DURATION:
This Power of Attorney shall remain valid for a period of ${d.duration || '____________'} from the date of execution, i.e., from ${formatDate(d.effectiveDate)}, unless revoked earlier in writing by the Grantor.

GENERAL CLAUSES:

1. The Attorney shall act in good faith and in the best interest of the Grantor at all times.
2. The Attorney shall not delegate any of the powers conferred herein to any third party without the prior written consent of the Grantor.
3. The Grantor reserves the right to revoke this Power of Attorney at any time by giving written notice to the Attorney.
4. This Power of Attorney shall be construed and governed by the laws of India.

IN WITNESS WHEREOF, the Grantor has executed this Power of Attorney on the day and year first mentioned above.


GRANTOR                                      ATTORNEY (Acceptance)

Signature: ___________________               Signature: ___________________
Name: ${d.grantorName || '____________'}                         Name: ${d.attorneyName || '____________'}
Date: ${formatDate(d.effectiveDate)}                          Date: ${formatDate(d.effectiveDate)}


WITNESSES:

1. Name: ___________________
   Signature: ___________________

2. Name: ___________________
   Signature: ___________________


(To be attested before a Notary Public)
`;

const generateNotice = (d) => `
LEGAL NOTICE
(Under Section 80 of the Code of Civil Procedure, 1908)

Date: ${todayFormatted()}

To,
${d.recipientName || '____________'}
${d.recipientAddress || '____________'}

From,
${d.senderName || '____________'}
${d.senderAddress || '____________'}

Subject: ${d.subject || '____________'}

UNDER INSTRUCTIONS AND ON BEHALF OF MY CLIENT:

Sir/Madam,

I, ${d.senderName || '____________'}, do hereby serve upon you this Legal Notice under Section 80 of the Code of Civil Procedure, 1908, and call upon you to take notice of the following:

FACTS OF THE MATTER:

${d.facts || '____________'}

DEMANDS:

${d.demands || '____________'}

You are hereby called upon to comply with the above demands within ${d.daysToComply || '____'} days from the receipt of this notice, failing which my client shall be constrained to initiate appropriate legal proceedings against you in a court of competent jurisdiction, at your risk, cost, and consequences, without any further notice.

This notice is issued without prejudice to any other rights and remedies available to my client under law.

Please treat this notice as urgent and take immediate action.

Yours faithfully,

Signature: ___________________
Name: ${d.senderName || '____________'}
Date: ${todayFormatted()}

Copy to:
1. Kept for record.
`;

// simple number-to-words for Indian rupees
function numberToWords(num) {
  const n = parseInt(num, 10);
  if (isNaN(n)) return '';
  if (n === 0) return 'Zero';
  const ones = ['','One','Two','Three','Four','Five','Six','Seven','Eight','Nine',
    'Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen'];
  const tens = ['','','Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety'];
  if (n < 20) return ones[n];
  if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '');
  if (n < 1000) return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' and ' + numberToWords(n % 100) : '');
  if (n < 100000) return numberToWords(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 ? ' ' + numberToWords(n % 1000) : '');
  if (n < 10000000) return numberToWords(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 ? ' ' + numberToWords(n % 100000) : '');
  return numberToWords(Math.floor(n / 10000000)) + ' Crore' + (n % 10000000 ? ' ' + numberToWords(n % 10000000) : '');
}

const generators = {
  rent: generateRent,
  fir: generateFIR,
  affidavit: generateAffidavit,
  poa: generatePOA,
  notice: generateNotice,
};

// ── field definitions for each template ─────────────────────────────
const fieldDefs = {
  rent: [
    { key: 'landlordName',   label: 'Full Name of Landlord',       type: 'text' },
    { key: 'tenantName',     label: 'Full Name of Tenant',         type: 'text' },
    { key: 'propertyAddress',label: 'Complete Property Address',    type: 'textarea' },
    { key: 'monthlyRent',    label: 'Monthly Rent (in Rs.)',       type: 'number' },
    { key: 'securityDeposit',label: 'Security Deposit (in Rs.)',   type: 'number' },
    { key: 'leaseDuration',  label: 'Lease Duration (months)',     type: 'number' },
    { key: 'startDate',      label: 'Lease Start Date',            type: 'date' },
    { key: 'city',           label: 'City',                        type: 'text' },
    { key: 'state',          label: 'State',                       type: 'text' },
  ],
  fir: [
    { key: 'complainantName',label: 'Full Name of Complainant',    type: 'text' },
    { key: 'fatherName',     label: "Father's / Spouse's Name",    type: 'text' },
    { key: 'address',        label: 'Residential Address',         type: 'textarea' },
    { key: 'policeStation',  label: 'Police Station Name',         type: 'text' },
    { key: 'district',       label: 'District',                    type: 'text' },
    { key: 'incidentDate',   label: 'Date of Incident',            type: 'date' },
    { key: 'incidentTime',   label: 'Approximate Time of Incident',type: 'time' },
    { key: 'incidentPlace',  label: 'Place of Incident',           type: 'text' },
    { key: 'description',    label: 'Detailed Description of Incident', type: 'textarea' },
    { key: 'accusedDetails', label: 'Known Details of Accused',    type: 'textarea' },
  ],
  affidavit: [
    { key: 'deponentName',   label: 'Full Name of Deponent',       type: 'text' },
    { key: 'fatherName',     label: "Father's / Spouse's Name",    type: 'text' },
    { key: 'age',            label: 'Age (in years)',              type: 'number' },
    { key: 'address',        label: 'Residential Address',         type: 'textarea' },
    { key: 'purpose',        label: 'Purpose of Affidavit',        type: 'text' },
    { key: 'statements',     label: 'Statements',                  type: 'statements' },
  ],
  poa: [
    { key: 'grantorName',    label: 'Full Name of Grantor (Principal)', type: 'text' },
    { key: 'grantorAddress', label: 'Address of Grantor',          type: 'textarea' },
    { key: 'attorneyName',   label: 'Full Name of Attorney (Agent)', type: 'text' },
    { key: 'attorneyAddress',label: 'Address of Attorney',         type: 'textarea' },
    { key: 'powersGranted',  label: 'Powers Being Granted (describe each)', type: 'textarea' },
    { key: 'duration',       label: 'Duration of Authority (e.g. 1 year)', type: 'text' },
    { key: 'effectiveDate',  label: 'Effective Date',              type: 'date' },
  ],
  notice: [
    { key: 'senderName',     label: 'Full Name of Sender',         type: 'text' },
    { key: 'senderAddress',  label: 'Address of Sender',           type: 'textarea' },
    { key: 'recipientName',  label: 'Full Name of Recipient',      type: 'text' },
    { key: 'recipientAddress',label:'Address of Recipient',        type: 'textarea' },
    { key: 'subject',        label: 'Subject of Notice',           type: 'text' },
    { key: 'facts',          label: 'Facts of the Matter',         type: 'textarea' },
    { key: 'demands',        label: 'Demands / Relief Sought',     type: 'textarea' },
    { key: 'daysToComply',   label: 'Days Given to Comply',        type: 'number' },
  ],
};

// ── component ───────────────────────────────────────────────────────
const LegalTemplates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [formData, setFormData] = useState({});
  const [showPreview, setShowPreview] = useState(false);

  const handleSelectTemplate = (id) => {
    setSelectedTemplate(id);
    setFormData({ ...initialValues[id] });
    setShowPreview(false);
  };

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // statements array helpers (affidavit)
  const handleStatementChange = (index, value) => {
    const updated = [...(formData.statements || [''])];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, statements: updated }));
  };
  const addStatement = () => {
    setFormData((prev) => ({ ...prev, statements: [...(prev.statements || ['']), ''] }));
  };
  const removeStatement = (index) => {
    const updated = [...(formData.statements || [''])];
    if (updated.length <= 1) return;
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, statements: updated }));
  };

  const handlePreview = () => setShowPreview(true);

  const handleDownloadPDF = () => window.print();

  const handleReset = () => {
    setSelectedTemplate(null);
    setFormData({});
    setShowPreview(false);
  };

  const renderField = (field) => {
    if (field.type === 'statements') {
      return (
        <div key={field.key} className="col-span-1 md:col-span-2">
          <label className="block text-sm font-semibold text-navy mb-1">{field.label}</label>
          {(formData.statements || ['']).map((s, i) => (
            <div key={i} className="flex items-start gap-2 mb-2">
              <span className="mt-2 text-sm text-slate font-medium">{i + 1}.</span>
              <textarea
                rows={2}
                value={s}
                onChange={(e) => handleStatementChange(i, e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-navy focus:border-transparent outline-none transition"
                placeholder={`Statement ${i + 1}`}
              />
              {(formData.statements || []).length > 1 && (
                <button
                  type="button"
                  onClick={() => removeStatement(i)}
                  className="mt-1 text-red-500 hover:text-red-700 text-sm font-bold px-2 py-1 transition"
                  title="Remove statement"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addStatement}
            className="text-sm font-medium text-navy hover:text-gold transition flex items-center gap-1 mt-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add another statement
          </button>
        </div>
      );
    }

    const isTextarea = field.type === 'textarea';
    const InputTag = isTextarea ? 'textarea' : 'input';
    const extraProps = isTextarea ? { rows: 3 } : { type: field.type };
    const spanTwo = isTextarea ? 'col-span-1 md:col-span-2' : '';

    return (
      <div key={field.key} className={spanTwo}>
        <label className="block text-sm font-semibold text-navy mb-1">{field.label}</label>
        <InputTag
          {...extraProps}
          value={formData[field.key] || ''}
          onChange={(e) => handleChange(field.key, e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-navy focus:border-transparent outline-none transition"
        />
      </div>
    );
  };

  const documentText = selectedTemplate && generators[selectedTemplate]
    ? generators[selectedTemplate](formData)
    : '';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* print-only styles */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #printable-document, #printable-document * { visibility: visible !important; }
          #printable-document {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 40px;
            font-size: 13px;
            line-height: 1.7;
            color: #000;
            background: #fff;
          }
        }
      `}</style>

      <Navbar />

      {/* Header */}
      <section className="bg-navy text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Legal Document Templates</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Select a template, fill in the details, preview your document, and download it as a PDF — ready for use.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10">
        {/* ── Step 1: Template Selection ───────────────────────────── */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-navy mb-1 flex items-center gap-2">
            <span className="bg-navy text-white w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
            Choose a Template
          </h2>
          <p className="text-sm text-slate ml-9 mb-4">Pick the type of legal document you need.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                onClick={() => handleSelectTemplate(t.id)}
                className={`text-left p-5 rounded-lg border-2 transition shadow-md hover:shadow-lg
                  ${selectedTemplate === t.id
                    ? 'border-gold bg-white ring-2 ring-gold'
                    : 'border-gray-200 bg-white hover:border-navy'
                  }`}
              >
                <div className={`mb-3 ${selectedTemplate === t.id ? 'text-gold' : 'text-navy'}`}>
                  {t.icon}
                </div>
                <h3 className="font-bold text-navy text-sm mb-1">{t.title}</h3>
                <p className="text-xs text-slate leading-relaxed">{t.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* ── Step 2: Form ────────────────────────────────────────── */}
        {selectedTemplate && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-navy mb-1 flex items-center gap-2">
              <span className="bg-navy text-white w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
              Fill in the Details
            </h2>
            <p className="text-sm text-slate ml-9 mb-4">
              Provide the information required for your {TEMPLATES.find((t) => t.id === selectedTemplate)?.title}.
            </p>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fieldDefs[selectedTemplate]?.map(renderField)}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={handlePreview}
                  className="bg-navy text-white px-6 py-2 rounded-lg font-semibold text-sm hover:bg-opacity-90 transition"
                >
                  Preview Document
                </button>
                <button
                  onClick={handleReset}
                  className="border border-gray-300 text-slate px-6 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition"
                >
                  Start Over
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Step 3: Preview ─────────────────────────────────────── */}
        {showPreview && selectedTemplate && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-navy mb-1 flex items-center gap-2">
              <span className="bg-navy text-white w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
              Preview &amp; Download
            </h2>
            <p className="text-sm text-slate ml-9 mb-4">
              Review the document below. Click "Download as PDF" to save.
            </p>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div
                id="printable-document"
                className="bg-white border border-gray-200 rounded-lg p-8 font-mono text-xs leading-relaxed whitespace-pre-wrap text-gray-800 max-h-[600px] overflow-y-auto"
              >
                {documentText}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={handleDownloadPDF}
                  className="bg-gold text-white px-6 py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3" />
                  </svg>
                  Download as PDF
                </button>
                <button
                  onClick={() => setShowPreview(false)}
                  className="border border-gray-300 text-slate px-6 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition"
                >
                  Back to Form
                </button>
                <button
                  onClick={handleReset}
                  className="border border-gray-300 text-slate px-6 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition"
                >
                  Start Over
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-navy text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            These templates are provided for informational purposes only and do not constitute legal advice. Consult a qualified advocate before use.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LegalTemplates;
