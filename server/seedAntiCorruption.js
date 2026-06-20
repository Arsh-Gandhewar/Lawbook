// Seed script to add Prevention of Corruption Act sections to the legal database
// Run with: node server/seedAntiCorruption.js

require('dotenv').config();
const mongoose = require('mongoose');
const LegalSection = require('./models/LegalSection');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lawbook';

const pcaSections = [
  // ═══════════════════════════════════════════════════════════════════
  // Prevention of Corruption Act, 1988 (as amended by Act 16 of 2018)
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'Prevention of Corruption Act, 1988',
    actCode: 'PCA',
    sectionNumber: '7',
    title: 'Offence relating to public servant being bribed',
    legalText: 'Any public servant who,— (a) obtains or accepts or attempts to obtain from any person, an undue advantage, with the intention to perform or cause performance of public duty improperly or dishonestly or to forbear or cause forbearance to perform such duty either by himself or by another public servant; or (b) obtains or accepts or attempts to obtain, an undue advantage from any person as a reward for the improper or dishonest performance of a public duty or for forbearing to perform such duty either by himself or another public servant; or (c) performs or induces another public servant to perform improperly or dishonestly a public duty or to forbear performance of such duty in anticipation of or in consequence of accepting an undue advantage from any person, shall be punishable with imprisonment for a term which shall not be less than three years but which may extend to seven years and shall also be liable to fine.',
    explanation: 'This section criminalises bribe-taking by public servants. A "public servant" includes government employees, judges, officers of statutory bodies, and anyone performing a public duty. "Undue advantage" means any gratification other than legal remuneration — this can be money, gifts, favours, or any benefit. The 2018 amendment replaced the earlier vague language with clearer elements: (a) taking bribe to act improperly, (b) taking reward after acting improperly, or (c) acting improperly in anticipation of a bribe. The minimum sentence is 3 years, making it a serious offence.',
    punishment: 'Imprisonment not less than 3 years, which may extend to 7 years, and fine',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['bribery', 'public servant', 'corruption', 'gratification', 'government official', 'bribe taking', 'undue advantage', 'government corruption', 'sarkari rishwat'],
    relatedSections: [
      { sectionNumber: '8', actCode: 'PCA', title: 'Offence relating to bribing a public servant' },
      { sectionNumber: '13', actCode: 'PCA', title: 'Criminal misconduct by a public servant' },
      { sectionNumber: '19', actCode: 'PCA', title: 'Previous sanction necessary for prosecution' }
    ]
  },
  {
    act: 'Prevention of Corruption Act, 1988',
    actCode: 'PCA',
    sectionNumber: '8',
    title: 'Offence relating to bribing a public servant',
    legalText: '(1) Any person who gives or promises to give an undue advantage to another person or persons, with intention to induce a public servant to perform improperly a public duty or to reward such public servant for the improper performance of public duty, shall be punishable with imprisonment for a term which may extend to seven years or with fine or with both. (2) Nothing in sub-section (1) shall apply where a person is compelled to give such undue advantage: Provided that the person who has been compelled to give such undue advantage shall report the matter to the law enforcement authority or investigating agency within a period of seven days from the date of giving such undue advantage.',
    explanation: 'This section, introduced by the 2018 amendment, for the first time makes bribe-giving a specific offence under Indian law. Earlier, bribe-givers were prosecuted as abettors under IPC. Now, anyone who gives or promises a bribe to a public servant faces up to 7 years imprisonment. However, there is an important exception: if a person was coerced into paying a bribe, they are not punished — provided they report the matter to law enforcement within 7 days. This "coercion defence" encourages victims of corruption to come forward.',
    punishment: 'Imprisonment up to 7 years, or fine, or both',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['bribe giving', 'offering bribe', 'corruption', 'inducement', 'public servant bribe', 'bribe giver', 'paying bribe', 'coercion defence'],
    relatedSections: [
      { sectionNumber: '7', actCode: 'PCA', title: 'Offence relating to public servant being bribed' },
      { sectionNumber: '9', actCode: 'PCA', title: 'Offence relating to bribing a public servant by a commercial organisation' },
      { sectionNumber: '13', actCode: 'PCA', title: 'Criminal misconduct by a public servant' }
    ]
  },
  {
    act: 'Prevention of Corruption Act, 1988',
    actCode: 'PCA',
    sectionNumber: '9',
    title: 'Offence relating to bribing a public servant by a commercial organisation',
    legalText: '(1) Where any person associated with a commercial organisation gives or promises to give any undue advantage to a public servant intending to obtain or retain business or an advantage in the conduct of business for such commercial organisation, such commercial organisation shall be guilty of the offence and shall be punishable with fine. (2) For the purposes of this section, a person is said to be associated with a commercial organisation, if he performs services for or on behalf of the commercial organisation. (3) A commercial organisation shall be liable under sub-section (1) even if the undue advantage is given or promised to be given by such person associated with the commercial organisation, whether or not identified. (4) It shall be a defence for the commercial organisation to prove that it had adequate procedures in place to prevent such conduct.',
    explanation: 'This section, introduced by the 2018 amendment, creates corporate criminal liability for bribery. If any person associated with a company (employee, agent, contractor) pays a bribe to obtain or retain business, the company itself can be prosecuted. The company is liable even if the specific bribe-payer is not identified. However, companies have a defence if they can prove they had "adequate procedures" (compliance programmes, anti-bribery policies, training, due diligence) in place to prevent bribery. If a director, manager, secretary or officer consented to the offence, they can also be personally prosecuted and imprisoned up to 7 years.',
    punishment: 'Commercial organisation: Fine. If offence committed with consent or connivance of any director, manager, secretary or other officer: imprisonment up to 7 years and fine',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['commercial bribery', 'corporate corruption', 'business bribe', 'company corruption', 'undue advantage', 'corporate liability', 'compliance', 'anti-bribery'],
    relatedSections: [
      { sectionNumber: '7', actCode: 'PCA', title: 'Offence relating to public servant being bribed' },
      { sectionNumber: '8', actCode: 'PCA', title: 'Offence relating to bribing a public servant' }
    ]
  },
  {
    act: 'Prevention of Corruption Act, 1988',
    actCode: 'PCA',
    sectionNumber: '13',
    title: 'Criminal misconduct by a public servant',
    legalText: '(1) A public servant is said to commit the offence of criminal misconduct,— (a) if he dishonestly or fraudulently misappropriates or otherwise converts for his own use any property entrusted to him or under his control as a public servant or allows any other person so to do; or (b) if he intentionally enriches himself illicitly during the period of his office. Explanation 1.—A person shall be presumed to have intentionally enriched himself illicitly if he or any person on his behalf, is in possession of or has, at any time during the period of his office, been in possession of pecuniary resources or property disproportionate to his known sources of income which the public servant cannot satisfactorily account for. Explanation 2.—The expression "known sources of income" means income received from any lawful source. (2) Any public servant who commits criminal misconduct shall be punishable with imprisonment for a term which shall not be less than four years but which may extend to ten years and shall also be liable to fine.',
    explanation: 'This is one of the most frequently invoked sections in corruption cases. It covers two forms of misconduct: (a) misappropriation of government property, and (b) possessing disproportionate assets (wealth that cannot be explained by legitimate income). For disproportionate assets cases, the prosecution must prove that the public servant\'s assets/income are disproportionate to their known lawful sources, and the burden then shifts to the accused to satisfactorily explain the excess. The 2018 amendment narrowed this section by removing "criminal misconduct" based on obtaining valuable things without consideration and abuse of position, which were previously covered.',
    punishment: 'Imprisonment not less than 4 years, which may extend to 10 years, and fine',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['criminal misconduct', 'disproportionate assets', 'misappropriation', 'public servant misconduct', 'illicit enrichment', 'government corruption', 'DA case', 'assets case'],
    relatedSections: [
      { sectionNumber: '7', actCode: 'PCA', title: 'Offence relating to public servant being bribed' },
      { sectionNumber: '19', actCode: 'PCA', title: 'Previous sanction necessary for prosecution' }
    ]
  },
  {
    act: 'Prevention of Corruption Act, 1988',
    actCode: 'PCA',
    sectionNumber: '19',
    title: 'Previous sanction necessary for prosecution',
    legalText: '(1) No court shall take cognizance of an offence punishable under sections 7, 11, 13 and 15 alleged to have been committed by a public servant, except with the previous sanction,— (a) in the case of a person who is employed, or as the case may be, was at the time of commission of the alleged offence employed in connection with the affairs of the Union, of the Central Government; (b) in the case of a person who is employed, or as the case may be, was at the time of commission of the alleged offence employed in connection with the affairs of a State, of the State Government; (c) in the case of any other person, of the authority competent to remove him from his office. (2) Where for any reason whatsoever any doubt arises as to whether the previous sanction as required under sub-section (1) should be given by the Central Government or the State Government or any other authority, such sanction shall be given by that Government or authority which would have been competent to remove the public servant from his office at the time when the offence was alleged to have been committed. (3) Notwithstanding anything contained in the Code of Criminal Procedure, 1973 (2 of 1974),— (a) no finding, sentence or order passed by a special Judge shall be reversed or altered by a court in appeal, confirmation or revision on the ground of the absence of, or any error, omission or irregularity in, the sanction required under sub-section (1), unless in the opinion of that court, a failure of justice has in fact been occasioned thereby; (b) no court shall stay the proceedings under this Act on the ground of any error, omission or irregularity in the sanction granted by the authority, unless it is satisfied that such error, omission or irregularity has resulted in a failure of justice; (c) no court shall stay the proceedings under this Act on any other ground and no court shall exercise the powers of revision in relation to any interlocutory order passed in any inquiry, trial, appeal or other proceedings. (4) In determining under sub-section (1) whether the previous sanction is to be accorded, the sanctioning authority shall make a decision within a period of three months, which may, for reasons to be recorded in writing, be extended by a further period of one month.',
    explanation: 'This is a crucial procedural safeguard for public servants. Before a court can take cognizance (begin judicial proceedings) of corruption charges against a public servant, prior sanction must be obtained from: the Central Government (for central employees), the State Government (for state employees), or the appropriate authority. This prevents frivolous or politically motivated prosecutions. The 2018 amendment added a time limit: the sanctioning authority must decide within 3 months (extendable by 1 month), failing which sanction is deemed to have been granted. The sanction requirement also applies to retired public servants for offences committed during their tenure.',
    punishment: 'N/A (procedural provision regarding prosecution sanction)',
    category: 'Criminal',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['sanction for prosecution', 'previous sanction', 'prosecution approval', 'government sanction', 'public servant prosecution', 'prosecution permission', 'sanctioning authority'],
    relatedSections: [
      { sectionNumber: '7', actCode: 'PCA', title: 'Offence relating to public servant being bribed' },
      { sectionNumber: '13', actCode: 'PCA', title: 'Criminal misconduct by a public servant' }
    ]
  }
];

async function seedAntiCorruption() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const existing = await LegalSection.countDocuments({ actCode: 'PCA' });
    if (existing > 0) {
      console.log(`🗑️  Removing ${existing} existing PCA sections...`);
      await LegalSection.deleteMany({ actCode: 'PCA' });
    }

    console.log(`📚 Seeding ${pcaSections.length} PCA sections...\n`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📖 Prevention of Corruption Act, 1988');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    for (const section of pcaSections) {
      await LegalSection.create(section);
      console.log(`   ✅ PCA Section ${section.sectionNumber} — ${section.title}`);
    }

    const totalPCA = pcaSections.length;
    const totalAll = await LegalSection.countDocuments();

    console.log(`\n═══════════════════════════════════════════`);
    console.log(`🎉 ANTI-CORRUPTION LAW SEEDING COMPLETE`);
    console.log(`═══════════════════════════════════════════`);
    console.log(`   PCA sections added:   ${totalPCA}`);
    console.log(`   Total DB sections:    ${totalAll}`);
    console.log(`═══════════════════════════════════════════\n`);

  } catch (error) {
    console.error('❌ Error seeding anti-corruption sections:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB.');
    process.exit(0);
  }
}

seedAntiCorruption();
