require('dotenv').config();
const mongoose = require('mongoose');
const LegalSection = require('./models/LegalSection');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lawbook';

const sections = [
  // Copyright Act, 1957
  {
    act: 'Copyright Act, 1957', actCode: 'COPY', sectionNumber: '14', title: 'Meaning of copyright',
    legalText: 'For the purposes of this Act, "copyright" means the exclusive right subject to the provisions of this Act, to do or authorise the doing of any of the following acts in respect of a work or any substantial part thereof — In the case of a literary, dramatic or musical work, not being a computer programme — (a) to reproduce the work in any material form including the storing of it in any medium by electronic means; (b) to issue copies of the work to the public; (c) to perform the work in public, or communicate it to the public; (d) to make any cinematograph film or sound recording in respect of the work; (e) to make any translation of the work; (f) to make any adaptation of the work.',
    explanation: 'Copyright gives the creator exclusive rights to reproduce, distribute, perform, translate, and adapt their work. It covers literary, dramatic, musical, artistic works, films, and sound recordings.',
    punishment: 'N/A', category: 'Civil', cognizable: 'N/A', bailable: 'N/A',
    keywords: ['copyright', 'exclusive right', 'reproduction', 'adaptation', 'literary work', 'artistic work']
  },
  {
    act: 'Copyright Act, 1957', actCode: 'COPY', sectionNumber: '51', title: 'When copyright infringed',
    legalText: 'Copyright in a work shall be deemed to be infringed — (a) when any person, without a licence granted by the owner of the copyright or the Registrar of Copyrights under this Act or in contravention of the conditions of a licence so granted or of any condition imposed by a competent authority under this Act — (i) does anything, the exclusive right to do which is by this Act conferred upon the owner of the copyright, or (ii) permits for profit any place to be used for the communication of the work to the public where such communication constitutes an infringement of the copyright in the work.',
    explanation: 'Copyright is infringed when someone does any act that only the copyright owner is allowed to do (reproduce, distribute, perform, etc.) without permission or licence.',
    punishment: 'See Section 63', category: 'Civil', cognizable: 'N/A', bailable: 'N/A',
    keywords: ['infringement', 'copyright', 'piracy', 'without licence', 'reproduction']
  },
  {
    act: 'Copyright Act, 1957', actCode: 'COPY', sectionNumber: '52', title: 'Certain acts not to be infringement of copyright (Fair dealing)',
    legalText: 'The following acts shall not constitute an infringement of copyright — (1)(a) a fair dealing with any work, not being a computer programme, for the purposes of — (i) private or personal use, including research; (ii) criticism or review, whether of that work or of any other work; (iii) the reporting of current events and current affairs, including the reporting of a lecture delivered in public. (1)(b) the transient or incidental storage of a work or performance purely in the technical process of electronic transmission or communication to the public.',
    explanation: 'Using copyrighted work for private/personal research, criticism/review, or news reporting is not infringement (fair dealing). Temporary copies made during electronic transmission are also exempt.',
    punishment: 'N/A', category: 'Civil', cognizable: 'N/A', bailable: 'N/A',
    keywords: ['fair dealing', 'fair use', 'research', 'criticism', 'private use', 'exception']
  },
  {
    act: 'Copyright Act, 1957', actCode: 'COPY', sectionNumber: '63', title: 'Offence of infringement of copyright or other rights conferred by this Act',
    legalText: 'Any person who knowingly infringes or abets the infringement of — (a) the copyright in a work, or (b) any other right conferred by this Act, shall be punishable with imprisonment for a term which shall not be less than six months but which may extend to three years and with fine which shall not be less than fifty thousand rupees but which may extend to two lakh rupees.',
    explanation: 'Knowingly infringing copyright carries 6 months to 3 years imprisonment and fine of Rs 50,000 to Rs 2 lakhs. For repeat offenders, the minimum imprisonment is 1 year and minimum fine Rs 1 lakh.',
    punishment: 'Imprisonment 6 months to 3 years + fine Rs 50,000 to Rs 2,00,000', category: 'Criminal', cognizable: 'Yes', bailable: 'No',
    keywords: ['copyright infringement', 'punishment', 'piracy', 'imprisonment']
  },

  // Trade Marks Act, 1999
  {
    act: 'Trade Marks Act, 1999', actCode: 'TM', sectionNumber: '9', title: 'Absolute grounds for refusal of registration',
    legalText: 'The trade marks — (a) which are devoid of any distinctive character, that is to say, not capable of distinguishing the goods or services of one person from those of another person; (b) which consist exclusively of marks or indications which may serve in trade to designate the kind, quality, quantity, intended purpose, values, geographical origin or the time of production of the goods or rendering of the service or other characteristics of the goods or service; (c) which consist exclusively of marks or indications which have become customary in the current language or in the bona fide and established practices of the trade, shall not be registered.',
    explanation: 'A trademark will be refused registration if it lacks distinctiveness, merely describes the goods/services, or has become a common/generic term in the trade.',
    punishment: 'N/A', category: 'Civil', cognizable: 'N/A', bailable: 'N/A',
    keywords: ['trademark', 'registration', 'refusal', 'distinctive', 'generic', 'descriptive']
  },
  {
    act: 'Trade Marks Act, 1999', actCode: 'TM', sectionNumber: '29', title: 'Infringement of registered trade marks',
    legalText: 'A registered trade mark is infringed by a person who, not being a registered proprietor or a person using by way of permitted use, uses in the course of trade, a mark which is identical with, or deceptively similar to, the trade mark in relation to goods or services in respect of which the trade mark is registered and in such manner as to render the use of the mark likely to be taken as being used as a trade mark.',
    explanation: 'Using a mark that is identical or deceptively similar to a registered trademark for similar goods/services constitutes infringement, even if it causes confusion among the public.',
    punishment: 'See Sections 103 and 104', category: 'Civil', cognizable: 'N/A', bailable: 'N/A',
    keywords: ['trademark infringement', 'deceptively similar', 'identical', 'passing off', 'brand']
  },
  {
    act: 'Trade Marks Act, 1999', actCode: 'TM', sectionNumber: '103', title: 'Penalty for applying false trade marks, trade descriptions, etc.',
    legalText: 'Any person who — (a) falsifies any trade mark; or (b) falsely applies to goods or services any trade mark; or (c) makes, disposes of, or has in his possession, any die, block, machine, plate or other instrument for the purpose of falsifying or of being used for falsifying, a trade mark; or (d) applies any false trade description to goods or services; or (e) applies to any goods to which an indication of the country or place in which they were made or produced or the name and address of the manufacturer or person for whom the goods are manufactured is required to be applied, a false indication of such country, place, name or address; or (f) tampers with, alters or effaces an indication of origin which has been applied to any goods to which it is required to be applied, shall, unless he proves that he acted without intent to defraud, be punishable with imprisonment for a term which shall not be less than six months but which may extend to three years and with fine which shall not be less than fifty thousand rupees but which may extend to two lakh rupees.',
    explanation: 'Falsifying a trademark, applying false trademarks to goods, or making instruments for counterfeiting carries 6 months to 3 years imprisonment and fine of Rs 50,000 to Rs 2 lakhs.',
    punishment: 'Imprisonment 6 months to 3 years + fine Rs 50,000 to Rs 2,00,000', category: 'Criminal', cognizable: 'Yes', bailable: 'No',
    keywords: ['false trademark', 'counterfeiting', 'falsifying', 'punishment', 'fake goods']
  },

  // Patents Act, 1970
  {
    act: 'Patents Act, 1970', actCode: 'PAT', sectionNumber: '3', title: 'What are not inventions',
    legalText: 'The following are not inventions within the meaning of this Act — (a) an invention which is frivolous or which claims anything obviously contrary to well established natural laws; (b) an invention the primary or intended use or commercial exploitation of which would be contrary to public order or morality or which causes serious prejudice to human, animal or plant life or health or to the environment; (d) the mere discovery of a new form of a known substance which does not result in the enhancement of the known efficacy of that substance (Section 3(d)); (e) a substance obtained by a mere admixture resulting only in the aggregation of the properties of the components thereof; (h) a method of agriculture or horticulture; (k) a mathematical or business method or a computer programme per se or algorithms.',
    explanation: 'India does not patent frivolous inventions, methods contrary to public order, mere new forms of known substances (Section 3(d) — the Novartis ruling), agricultural methods, business methods, or software/algorithms per se.',
    punishment: 'N/A', category: 'Civil', cognizable: 'N/A', bailable: 'N/A',
    keywords: ['patent', 'not patentable', 'invention', 'section 3d', 'evergreening', 'software patent', 'algorithm']
  },
  {
    act: 'Patents Act, 1970', actCode: 'PAT', sectionNumber: '48', title: 'Rights of patentees',
    legalText: 'Subject to the other provisions of this Act and the conditions specified in section 47, a patent granted under this Act shall confer upon the patentee — (a) where the subject matter of the patent is a product, the exclusive right to prevent third parties, who do not have his consent, from the act of making, using, offering for sale, selling or importing for those purposes that product in India; (b) where the subject matter of the patent is a process, the exclusive right to prevent third parties, who do not have his consent, from the act of using that process, and from the act of using, offering for sale, selling or importing for those purposes the product obtained directly by that process in India.',
    explanation: 'A patent gives the inventor exclusive rights to prevent others from making, using, selling or importing the patented product or using the patented process in India without consent.',
    punishment: 'N/A', category: 'Civil', cognizable: 'N/A', bailable: 'N/A',
    keywords: ['patent rights', 'exclusive right', 'patentee', 'infringement', 'making', 'selling', 'importing']
  },
  {
    act: 'Patents Act, 1970', actCode: 'PAT', sectionNumber: '64', title: 'Revocation of patents',
    legalText: 'Subject to the provisions contained in this Act, a patent, whether granted before or after the commencement of this Act, may, on the petition of any person interested or of the Central Government or on a counter-claim in a suit for infringement of the patent, be revoked by the Appellate Board or the High Court on any of the following grounds — (a) that the invention, so far as claimed in any claim of the complete specification, was claimed in a valid claim of earlier priority date contained in the complete specification of another patent; (d) that the subject of any claim of the complete specification is not an invention within the meaning of this Act; (e) that the invention so far as claimed in any claim is not new, having regard to what was publicly known or publicly used in India before the priority date; (h) that the patentee has failed to disclose to the Controller the information required by section 8.',
    explanation: 'A patent can be revoked if the invention was already claimed earlier, is not a valid invention, was publicly known before filing, or the patentee failed to disclose required information.',
    punishment: 'N/A', category: 'Civil', cognizable: 'N/A', bailable: 'N/A',
    keywords: ['patent revocation', 'invalidity', 'prior art', 'not new', 'revoke']
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    const codes = ['COPY', 'TM', 'PAT'];
    for (const code of codes) {
      const deleted = await LegalSection.deleteMany({ actCode: code });
      if (deleted.deletedCount > 0) console.log(`Cleared ${deleted.deletedCount} existing ${code} sections`);
    }
    for (let i = 0; i < sections.length; i++) {
      await LegalSection.create(sections[i]);
      console.log(`[${i + 1}/${sections.length}] Section ${sections[i].sectionNumber}: ${sections[i].title}`);
    }
    console.log(`Done: seeded ${sections.length} IP law sections`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}
seed();
