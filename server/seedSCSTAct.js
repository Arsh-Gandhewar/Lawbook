// Seed script to add SC/ST (Prevention of Atrocities) Act sections to the legal database
// Run with: node server/seedSCSTAct.js

require('dotenv').config();
const mongoose = require('mongoose');
const LegalSection = require('./models/LegalSection');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lawbook';

const scstSections = [
  // ═══════════════════════════════════════════════════════════════════
  // Scheduled Castes and Scheduled Tribes (Prevention of Atrocities) Act, 1989
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'Scheduled Castes and Scheduled Tribes (Prevention of Atrocities) Act, 1989',
    actCode: 'SCST',
    sectionNumber: '2(1)(c)',
    title: 'Definition of atrocity',
    legalText: '"atrocity" means an offence punishable under section 3.',
    explanation: 'The term "atrocity" under this Act refers to any offence punishable under Section 3. It encompasses a wide range of criminal acts committed against members of Scheduled Castes and Scheduled Tribes by non-SC/ST persons. The term was introduced to denote the gravity and heinous nature of crimes committed against these communities and to distinguish them from ordinary offences under the Indian Penal Code.',
    punishment: '',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['atrocity', 'SC/ST', 'scheduled caste', 'scheduled tribe', 'caste discrimination', 'caste violence'],
    relatedSections: [
      { sectionNumber: '3', actCode: 'SCST', title: 'Punishments for offences of atrocities' }
    ]
  },
  {
    act: 'Scheduled Castes and Scheduled Tribes (Prevention of Atrocities) Act, 1989',
    actCode: 'SCST',
    sectionNumber: '3',
    title: 'Punishments for offences of atrocities',
    legalText: 'Whoever, not being a member of a Scheduled Caste or a Scheduled Tribe,— (a) puts any inedible or obnoxious substance into the mouth of a member of a Scheduled Caste or a Scheduled Tribe or forces such member to drink or eat such inedible or obnoxious substance; (b) dumps excreta, sewage, carcasses or any other obnoxious substance in premises, or at the entrance of the premises, occupied by a member of a Scheduled Caste or a Scheduled Tribe; (c) forcibly removes clothes from the person of a member of a Scheduled Caste or a Scheduled Tribe or parades him naked or with painted face or body; (d) wrongfully occupies or cultivates any land, owned by, or in the possession of, or allotted to, or notified by any competent authority to be allotted to, a member of a Scheduled Caste or a Scheduled Tribe, or gets such land transferred; (e) wrongfully dispossesses a member of a Scheduled Caste or a Scheduled Tribe from his land or premises or interferes with the enjoyment of his rights, including forest rights, over any land or premises or water or irrigation facilities; (f) compels or entices a member of a Scheduled Caste or a Scheduled Tribe to do "begar" or other similar forms of forced or bonded labour; (g) forces or intimidates a member of a Scheduled Caste or a Scheduled Tribe not to vote or to vote to a particular candidate or to vote in a manner other than that provided by law; (h) institutes false, malicious or vexatious suit or criminal or other legal proceedings against a member of a Scheduled Caste or a Scheduled Tribe; (i) gives any false or frivolous information to any public servant and thereby causes such public servant to use his lawful power to the injury or annoyance of a member of a Scheduled Caste or a Scheduled Tribe; (j) intentionally insults or intimidates with intent to humiliate a member of a Scheduled Caste or a Scheduled Tribe in any place within public view; (s) denies a member of a Scheduled Caste or a Scheduled Tribe any customary right of passage to a place of public resort or obstructs such member so as to prevent him from using or having access to a place of public resort to which other members of public or any section thereof have a right to use or access to; shall be punishable with imprisonment for a term which shall not be less than six months but which may extend to five years and with fine.',
    explanation: 'This section lists specific acts that constitute "atrocities" against SC/ST members. These include: forcing to eat obnoxious substances, dumping waste at their premises, parading naked, illegally occupying their land, forcing bonded labour, preventing voting, filing false cases, intentional public humiliation, preventing access to public places, and various other forms of discrimination and violence. The offender must be a non-SC/ST person. The 2015 amendment added several new offences and increased penalties.',
    punishment: 'Imprisonment not less than 6 months, extendable to 5 years, with fine. For certain aggravated offences, minimum 1 year extendable to life imprisonment',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['caste atrocity', 'SC/ST offence', 'caste discrimination punishment', 'untouchability', 'caste violence', 'scheduled caste crime', 'forced labour caste'],
    relatedSections: [
      { sectionNumber: '2(1)(c)', actCode: 'SCST', title: 'Definition of atrocity' },
      { sectionNumber: '4', actCode: 'SCST', title: 'Punishment for neglect of duties' },
      { sectionNumber: '14', actCode: 'SCST', title: 'Special Courts' }
    ]
  },
  {
    act: 'Scheduled Castes and Scheduled Tribes (Prevention of Atrocities) Act, 1989',
    actCode: 'SCST',
    sectionNumber: '4',
    title: 'Punishment for neglect of duties by public servant',
    legalText: 'Whoever, being a public servant but not being a member of a Scheduled Caste or a Scheduled Tribe, wilfully neglects his duties required to be performed by him under this Act, shall be punishable with imprisonment for a term which shall not be less than six months but which may extend to one year.',
    explanation: 'A non-SC/ST public servant (including police officers, government officials, magistrates) who deliberately neglects their duties under the SC/ST Act faces mandatory imprisonment. This is meant to ensure that government officials take complaints of caste atrocities seriously and do not refuse to register FIRs or investigate cases properly.',
    punishment: 'Imprisonment not less than 6 months, extendable to 1 year',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['public servant neglect', 'police duty', 'FIR refusal SC/ST', 'government officer negligence', 'caste case neglect'],
    relatedSections: [
      { sectionNumber: '3', actCode: 'SCST', title: 'Punishments for offences of atrocities' }
    ]
  },
  {
    act: 'Scheduled Castes and Scheduled Tribes (Prevention of Atrocities) Act, 1989',
    actCode: 'SCST',
    sectionNumber: '14',
    title: 'Special Courts',
    legalText: 'For the purpose of providing for speedy trial, the State Government shall, with the concurrence of the Chief Justice of the High Court, by notification in the Official Gazette, establish an Exclusive Special Court for one or more Districts. In the event of the State Government not establishing Exclusive Special Court, the State Government shall, with the concurrence of the Chief Justice of the High Court, by notification in the Official Gazette, specify for each district, a Court of Session to be a Special Court to try the offences under this Act.',
    explanation: 'The Act mandates the establishment of Special Courts (or Exclusive Special Courts) dedicated to trying cases under the SC/ST Act. This ensures speedy trials. If a state does not set up an Exclusive Special Court, it must designate a Sessions Court as a Special Court. These courts have priority jurisdiction over atrocity cases and must complete trials within two months.',
    punishment: '',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['special court SC/ST', 'exclusive special court', 'speedy trial', 'atrocity court', 'SC/ST court'],
    relatedSections: [
      { sectionNumber: '3', actCode: 'SCST', title: 'Punishments for offences of atrocities' },
      { sectionNumber: '15A', actCode: 'SCST', title: 'Rights of victims and witnesses' }
    ]
  },
  {
    act: 'Scheduled Castes and Scheduled Tribes (Prevention of Atrocities) Act, 1989',
    actCode: 'SCST',
    sectionNumber: '15A',
    title: 'Rights of victims and witnesses',
    legalText: 'It shall be the duty and responsibility of the State to make arrangements for the protection of victims, their dependents, and witnesses against any kind of intimidation or coercion or inducement or violence or threats of violence, and to inform the victims about: (a) their rights at all stages of investigation, inquiry and trial; (b) the availability of victim compensation; (c) the grant of relief and its nature; (d) the availability of legal aid; (e) the stage of investigation; (f) the stage of any proceedings in the case; (g) the right of the victims to be heard at any proceeding regarding bail, discharge, release, parole, conviction or sentence of an accused or any connected proceedings or arguments.',
    explanation: 'The 2015 amendment introduced comprehensive rights for victims and witnesses of caste atrocities. The state must protect them from intimidation, inform them of their rights at every stage, provide victim compensation, grant legal aid, and give them the right to be heard during bail hearings and trial proceedings. This provision strengthens victim protection in the justice process.',
    punishment: '',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['victim rights', 'witness protection', 'SC/ST victim', 'victim compensation', 'legal aid SC/ST'],
    relatedSections: [
      { sectionNumber: '14', actCode: 'SCST', title: 'Special Courts' },
      { sectionNumber: '3', actCode: 'SCST', title: 'Punishments for offences of atrocities' }
    ]
  },
  {
    act: 'Scheduled Castes and Scheduled Tribes (Prevention of Atrocities) Act, 1989',
    actCode: 'SCST',
    sectionNumber: '18',
    title: 'Presumption as to offences',
    legalText: 'In a prosecution for an offence under this Chapter, if it is proved that— (a) the accused rendered any financial assistance or bore any expense in connection with the acts constituting the offence, the Special Court shall presume, unless the contrary is proved, that the accused had the motive and the knowledge for the commission of the offence under section 3; (b) a group of persons committed an offence under section 3 and if it is proved that the offence was committed in furtherance of the common intention of the group, every member of the group shall be deemed to have committed that offence.',
    explanation: 'This section creates a legal presumption: if the accused provided financial assistance for an atrocity, the court will presume they had the motive and knowledge (unless proven otherwise). Also, if a group commits an atrocity with common intention, every member is deemed guilty. This reverses the burden of proof in certain situations, making prosecution easier.',
    punishment: '',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['presumption SC/ST', 'burden of proof', 'common intention atrocity', 'reverse burden', 'SC/ST prosecution'],
    relatedSections: [
      { sectionNumber: '3', actCode: 'SCST', title: 'Punishments for offences of atrocities' },
      { sectionNumber: '14', actCode: 'SCST', title: 'Special Courts' }
    ]
  }
];

async function seedSCSTAct() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const existing = await LegalSection.countDocuments({ actCode: 'SCST' });
    if (existing > 0) {
      console.log(`🗑️  Removing ${existing} existing SC/ST Act sections...`);
      await LegalSection.deleteMany({ actCode: 'SCST' });
    }

    console.log(`\n📚 Seeding ${scstSections.length} SC/ST Act sections...\n`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📖 SC/ST (Prevention of Atrocities) Act, 1989');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    for (const section of scstSections) {
      await LegalSection.create(section);
      console.log(`   ✅ SCST Section ${section.sectionNumber} — ${section.title}`);
    }

    const totalAll = await LegalSection.countDocuments();
    console.log(`\n═══════════════════════════════════════════`);
    console.log(`🎉 SC/ST ACT SEEDING COMPLETE`);
    console.log(`═══════════════════════════════════════════`);
    console.log(`   SCST sections added:  ${scstSections.length}`);
    console.log(`   Total DB sections:    ${totalAll}`);
    console.log(`═══════════════════════════════════════════\n`);

  } catch (error) {
    console.error('❌ Error seeding SC/ST Act:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB.');
    process.exit(0);
  }
}

seedSCSTAct();
