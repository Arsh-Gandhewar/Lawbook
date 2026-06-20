// Seed script for Women & Child Protection laws
// Run with: node server/seedWomenChildLaw.js

require('dotenv').config();
const mongoose = require('mongoose');
const LegalSection = require('./models/LegalSection');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lawbook';

const sections = [
  // ═══════════════════════════════════════════════════════════════════
  // Sexual Harassment of Women at Workplace (Prevention, Prohibition
  // and Redressal) Act, 2013 — POSH Act
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013',
    actCode: 'POSH',
    sectionNumber: '2',
    title: 'Definitions',
    legalText: 'In this Act, unless the context otherwise requires,— (a) "aggrieved woman" means— (i) in relation to a workplace, a woman, of any age whether employed or not, who alleges to have been subjected to any act of sexual harassment by the respondent; (ii) in relation to a dwelling place or house, a woman of any age who is employed in such a dwelling place or house; (n) "sexual harassment" includes any one or more of the following unwelcome acts or behaviour (whether directly or by implication) namely:— (i) physical contact and advances; or (ii) a demand or request for sexual favours; or (iii) making sexually coloured remarks; or (iv) showing pornography; or (v) any other unwelcome physical, verbal or non-verbal conduct of sexual nature; (o) "workplace" includes— (i) any department, organisation, undertaking, establishment, enterprise, institution, office, branch or unit which is established, owned, controlled or wholly or substantially financed by funds provided directly or indirectly by the appropriate Government or the local authority or a Government company or a corporation or a co-operative society; (ii) any private sector organisation or a private venture, undertaking, enterprise, institution, establishment, society, trust, non-governmental organisation, unit or service provider carrying on commercial, professional, vocational, educational, entertainmental, industrial, health services or financial activities including production, supply, sale, distribution or service; (iii) hospitals or nursing homes; (iv) any sports institute, stadium, sports complex or competition or games venue, whether residential or not used for training, sports or other activities relating thereto; (v) any place visited by the employee arising out of or during the course of employment including transportation by the employer for undertaking such journey; (vi) a dwelling place or a house.',
    explanation: 'This section defines key terms used in the POSH Act. An "aggrieved woman" is any woman of any age — whether employed or not — who alleges sexual harassment at a workplace. "Sexual harassment" includes unwelcome physical contact, demands for sexual favours, sexually coloured remarks, showing pornography, or any other unwelcome conduct of a sexual nature. "Workplace" is defined very broadly — it covers government offices, private companies, NGOs, hospitals, sports facilities, and even a dwelling place where a domestic worker is employed.',
    punishment: '',
    category: 'Criminal',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['POSH', 'sexual harassment definition', 'aggrieved woman', 'workplace definition', 'unwelcome conduct', 'POSH Act definitions'],
    relatedSections: [
      { sectionNumber: '3', actCode: 'POSH', title: 'Prevention of sexual harassment' },
      { sectionNumber: '9', actCode: 'POSH', title: 'Complaint of sexual harassment' }
    ]
  },
  {
    act: 'Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013',
    actCode: 'POSH',
    sectionNumber: '3',
    title: 'Prevention of sexual harassment',
    legalText: '(1) No woman shall be subjected to sexual harassment at any workplace. (2) The following circumstances, among other circumstances, if it occurs, or is present in relation to or connected with any act or behaviour of sexual harassment may amount to sexual harassment:— (i) implied or explicit promise of preferential treatment in her employment; or (ii) implied or explicit threat of detrimental treatment in her employment; or (iii) implied or explicit threat about her present or future employment status; or (iv) interference with her work or creating an intimidating or offensive or hostile work environment for her; or (v) humiliating treatment likely to affect her health or safety.',
    explanation: 'This is the core prohibition. No woman shall be sexually harassed at any workplace. The section also lists situations that amount to sexual harassment: promising preferential treatment in exchange for sexual favours (quid pro quo), threatening adverse consequences at work, creating a hostile or intimidating work environment, or humiliating treatment that affects health or safety. Both quid pro quo and hostile work environment harassment are covered.',
    punishment: '',
    category: 'Criminal',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['prevention sexual harassment', 'hostile work environment', 'quid pro quo', 'workplace harassment', 'POSH Section 3', 'intimidation at work'],
    relatedSections: [
      { sectionNumber: '2', actCode: 'POSH', title: 'Definitions' },
      { sectionNumber: '4', actCode: 'POSH', title: 'Constitution of Internal Complaints Committee' }
    ]
  },
  {
    act: 'Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013',
    actCode: 'POSH',
    sectionNumber: '4',
    title: 'Constitution of Internal Complaints Committee',
    legalText: '(1) Every employer of a workplace shall, by an order in writing, constitute a Committee to be known as the "Internal Complaints Committee": Provided that where the offices or administrative units of the workplace are located at different places or divisional or sub-divisional level, the Internal Committee shall be constituted at all administrative units or offices. (2) The Internal Complaints Committee shall consist of the following members to be nominated by the employer, namely:— (a) a Presiding Officer who shall be a woman employed at a senior level at workplace from amongst the employees: Provided that in case a senior level woman employee is not available, the Presiding Officer shall be nominated from other offices or administrative units of the workplace referred to in sub-section (1): Provided further that in case the other offices or administrative units of the workplace do not have a senior level woman employee, the Presiding Officer shall be nominated from any other workplace of the same employer or other department or organisation; (b) not less than two Members from amongst employees preferably committed to the cause of women or who have had experience in social work or have legal knowledge; (c) one member from amongst non-governmental organisations or associations committed to the cause of women or a person familiar with the issues relating to sexual harassment: Provided that at least one-half of the total Members so nominated shall be women. (3) The Presiding Officer and every Member of the Internal Committee shall hold office for such period, not exceeding three years, from the date of their nomination as may be specified by the employer. (4) The Member appointed from amongst the non-governmental organisations or associations shall be paid such fees or allowances for holding the proceedings of the Internal Committee, by the employer, as may be prescribed.',
    explanation: 'Every employer must set up an Internal Complaints Committee (ICC) at each office or branch. The ICC must be headed by a senior woman employee as Presiding Officer. It must include at least two employee members (preferably those committed to women\'s causes or with legal knowledge) and one external member from an NGO or women\'s association. At least half the committee members must be women. The ICC members serve for up to 3 years. This committee is the primary body that receives and investigates sexual harassment complaints at the workplace.',
    punishment: '',
    category: 'Criminal',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['internal complaints committee', 'ICC', 'POSH committee', 'workplace committee', 'presiding officer', 'employer obligation POSH'],
    relatedSections: [
      { sectionNumber: '3', actCode: 'POSH', title: 'Prevention of sexual harassment' },
      { sectionNumber: '9', actCode: 'POSH', title: 'Complaint of sexual harassment' },
      { sectionNumber: '26', actCode: 'POSH', title: 'Penalty for non-compliance by employer' }
    ]
  },
  {
    act: 'Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013',
    actCode: 'POSH',
    sectionNumber: '9',
    title: 'Complaint of sexual harassment',
    legalText: '(1) Any aggrieved woman may make, in writing, a complaint of sexual harassment at workplace to the Internal Committee if so constituted, or the Local Committee, in case it is not so constituted, within a period of three months from the date of incident and in case of a series of incidents, within a period of three months from the date of the last incident: Provided that where such complaint cannot be made in writing, the Presiding Officer or any Member of the Internal Committee or the Chairperson or any Member of the Local Committee, as the case may be, shall render all reasonable assistance to the woman for making the complaint in writing: Provided further that the Internal Committee or, as the case may be, the Local Committee may, for the reasons to be recorded in writing, extend the time limit not exceeding three months, if it is satisfied that the circumstances were such which prevented the woman from filing a complaint within the said period. (2) Where the aggrieved woman is unable to make a complaint on account of her physical or mental incapacity or death or otherwise, her legal heir or such other person as may be prescribed may make a complaint under this section.',
    explanation: 'An aggrieved woman can file a written complaint of sexual harassment to the Internal Complaints Committee (or Local Committee if no ICC exists) within 3 months of the incident (or the last incident in a series). If she cannot write the complaint herself, the committee must help her put it in writing. The committee can extend the deadline by another 3 months if there were genuine reasons for delay. If the woman is incapacitated or deceased, her legal heir or prescribed person can file the complaint on her behalf.',
    punishment: '',
    category: 'Criminal',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['POSH complaint', 'sexual harassment complaint', 'filing complaint workplace', 'ICC complaint', 'time limit POSH', 'aggrieved woman complaint'],
    relatedSections: [
      { sectionNumber: '4', actCode: 'POSH', title: 'Constitution of Internal Complaints Committee' },
      { sectionNumber: '3', actCode: 'POSH', title: 'Prevention of sexual harassment' }
    ]
  },
  {
    act: 'Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013',
    actCode: 'POSH',
    sectionNumber: '26',
    title: 'Penalty for non-compliance by employer',
    legalText: '(1) Where the employer fails to— (a) constitute an Internal Complaints Committee under sub-section (1) of section 4; or (b) take action under sections 13, 14 and 22; he shall be punishable with fine which may extend to fifty thousand rupees. (2) If any employer, after having been previously convicted of an offence punishable under this Act subsequently commits and is convicted of the same offence, he shall be liable to— (i) twice the punishment, which might have been imposed on a first conviction, subject to the punishment being maximum provided for the same offence: Provided that in case a higher punishment is prescribed under any other law for the time being in force, for the offence for which the accused is being prosecuted, the court shall take due cognizance of such provision of law; (ii) cancellation of his licence or withdrawal, or non-renewal, or approval, or cancellation of the registration, as the case may be, by the Government or local authority required for carrying on his business or activity.',
    explanation: 'If an employer fails to constitute an Internal Complaints Committee or fails to take action on a complaint as required, the employer faces a fine of up to Rs. 50,000. For a second or subsequent conviction, the fine doubles, and the employer\'s business licence or registration can be cancelled or not renewed. This ensures employers take their obligations under the POSH Act seriously.',
    punishment: 'First offence: Fine up to Rs. 50,000. Repeat offence: Double the fine + cancellation of licence/registration.',
    category: 'Criminal',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['POSH penalty', 'employer non-compliance', 'ICC not constituted', 'POSH fine', 'employer punishment POSH', 'Section 26 POSH'],
    relatedSections: [
      { sectionNumber: '4', actCode: 'POSH', title: 'Constitution of Internal Complaints Committee' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // Maternity Benefit Act, 1961
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'Maternity Benefit Act, 1961',
    actCode: 'MBA',
    sectionNumber: '5',
    title: 'Right to payment of maternity benefit',
    legalText: '(1) Subject to the provisions of this Act, every woman shall be entitled to, and her employer shall be liable for, the payment of maternity benefit at the rate of the average daily wage for the period of her actual absence, that is to say, the period immediately preceding the day of her delivery, the actual day of her delivery and any period immediately following that day. Explanation.— For the purpose of this sub-section, the average daily wage means the average of the woman\'s wages payable to her for the days on which she has worked during the period of three calendar months immediately preceding the date from which she absents herself on account of maternity, or one rupee a day, whichever is higher. (2) No woman shall be entitled to maternity benefit unless she has actually worked in an establishment of the employer from whom she claims maternity benefit, for a period of not less than eighty days in the twelve months immediately preceding the date of her expected delivery. (3) The maximum period for which any woman shall be entitled to maternity benefit shall be twenty-six weeks of which not more than eight weeks shall precede the date of her expected delivery: Provided that the maximum period of maternity benefit for a woman having two or more surviving children shall be twelve weeks of which not more than six weeks shall precede the date of her expected delivery.',
    explanation: 'Every working woman is entitled to paid maternity leave at the rate of her average daily wage. To qualify, she must have worked at least 80 days in the 12 months before her expected delivery date. The maximum paid leave is 26 weeks (about 6 months), out of which up to 8 weeks can be taken before the expected delivery. For women who already have 2 or more surviving children, the entitlement is 12 weeks. This was increased from 12 to 26 weeks by the 2017 amendment.',
    punishment: '',
    category: 'Labour',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['maternity benefit', 'maternity leave', '26 weeks', 'paid leave pregnancy', 'maternity wages', 'maternity benefit act', 'pregnancy leave'],
    relatedSections: [
      { sectionNumber: '12', actCode: 'MBA', title: 'Dismissal during absence of pregnancy' }
    ]
  },
  {
    act: 'Maternity Benefit Act, 1961',
    actCode: 'MBA',
    sectionNumber: '12',
    title: 'Dismissal during absence of pregnancy',
    legalText: '(1) When a woman absents herself from work in accordance with the provisions of this Act, it shall be unlawful for her employer to discharge or dismiss her during or on account of such absence or to give notice of discharge or dismissal on such a day that the notice will expire during such absence, or to vary to her disadvantage any of the conditions of her service. (2) (a) The discharge or dismissal of a woman at any time during her pregnancy, if the woman but for such discharge or dismissal would have been entitled to maternity benefit or medical bonus referred to in section 8, shall not have the effect of depriving her of the maternity benefit or medical bonus: Provided that where the dismissal is for any prescribed gross misconduct, the employer shall not be liable for the maternity benefit or medical bonus. (b) Any woman deprived of maternity benefit or medical bonus or both, or discharged or dismissed during or on account of her absence from work in accordance with the provisions of this Act, may, within sixty days from the date on which order of such deprivation or discharge or dismissal is communicated to her, appeal to such authority as may be prescribed, and the decision of that authority on such appeal, whether the woman should or should not be deprived of maternity benefit or medical bonus, or both, or discharged or dismissed shall be final.',
    explanation: 'An employer cannot fire or dismiss a woman during her maternity leave or because of her pregnancy-related absence. The employer also cannot give notice of dismissal that would take effect during her maternity leave, or change her service conditions to her disadvantage. Even if a woman is wrongfully discharged during pregnancy, she remains entitled to maternity benefit and medical bonus — unless the dismissal was for prescribed gross misconduct. A woman who is denied benefits or dismissed can appeal to the prescribed authority within 60 days.',
    punishment: '',
    category: 'Labour',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['dismissal during pregnancy', 'maternity protection', 'termination pregnant woman', 'unfair dismissal pregnancy', 'maternity benefit act Section 12'],
    relatedSections: [
      { sectionNumber: '5', actCode: 'MBA', title: 'Right to payment of maternity benefit' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // Immoral Traffic (Prevention) Act, 1956
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'Immoral Traffic (Prevention) Act, 1956',
    actCode: 'ITPA',
    sectionNumber: '3',
    title: 'Punishment for keeping a brothel or allowing premises to be used as a brothel',
    legalText: '(1) Any person who keeps or manages, or acts or assists in the keeping or management of, a brothel shall be punishable on first conviction with rigorous imprisonment for a term of not less than one year and not more than three years and also with fine which may extend to two thousand rupees and in the event of a second or subsequent conviction, with rigorous imprisonment for a term of not less than two years and not more than five years and also with fine which may extend to two thousand rupees. (2) Any person who— (a) being the tenant, lessee, occupier or person in charge of any premises, uses, or knowingly allows any other person to use, such premises or any part thereof as a brothel, or (b) being the owner, lessor or landlord of any premises or the agent of such owner, lessor or landlord, lets the same or any part thereof with the knowledge that the same or any part thereof is intended to be used as a brothel, or is conniving at the use of such premises or any part thereof as a brothel, shall be punishable on first conviction with imprisonment for a term which may extend to two years and with fine which may extend to two thousand rupees and in the event of a second or subsequent conviction, with rigorous imprisonment for a term which may extend to five years and also with fine.',
    explanation: 'Anyone who keeps, manages, or assists in running a brothel faces rigorous imprisonment of 1-3 years plus fine on first conviction, and 2-5 years plus fine on subsequent conviction. Tenants or occupiers who use premises as a brothel, or landlords who knowingly let out premises for use as a brothel, face up to 2 years imprisonment plus fine on first conviction, and up to 5 years on subsequent conviction.',
    punishment: 'Keeping/managing brothel — First offence: 1-3 years RI + fine up to Rs. 2,000. Repeat: 2-5 years RI + fine. Landlord/tenant knowingly allowing — First: up to 2 years + fine. Repeat: up to 5 years RI + fine.',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['brothel', 'ITPA', 'immoral traffic', 'prostitution', 'keeping a brothel', 'sex trafficking'],
    relatedSections: [
      { sectionNumber: '4', actCode: 'ITPA', title: 'Living on earnings of prostitution' },
      { sectionNumber: '5', actCode: 'ITPA', title: 'Procuring, inducing or taking person for prostitution' }
    ]
  },
  {
    act: 'Immoral Traffic (Prevention) Act, 1956',
    actCode: 'ITPA',
    sectionNumber: '4',
    title: 'Living on the earnings of prostitution',
    legalText: '(1) Any person over the age of eighteen years who knowingly lives, wholly or in part, on the earnings of the prostitution of any other person shall be punishable with imprisonment for a term which may extend to two years, or with fine which may extend to one thousand rupees, or with both, and where such earnings relate to the prostitution of a child or a minor, shall be punishable with imprisonment for a term of not less than seven years and not more than ten years. (2) Where any person over the age of eighteen years is proved— (a) to be living with, or to be habitually in the company of, a prostitute; or (b) to have exercised control, direction or influence over the movements of a prostitute in such a manner as to show that such person is aiding, abetting or compelling her prostitution; or (c) to be acting as a tout or pimp on behalf of a prostitute, it shall be presumed, until the contrary is proved, that such person is knowingly living on the earnings of prostitution of another person within the meaning of sub-section (1).',
    explanation: 'Any adult who knowingly lives off the earnings of another person\'s prostitution faces up to 2 years imprisonment or fine or both. If the prostituted person is a child or minor, the punishment is much harsher — 7 to 10 years imprisonment. A person is presumed to be living on such earnings if they live with a prostitute, control or direct her movements, or act as a pimp or tout — unless they can prove otherwise.',
    punishment: 'General: up to 2 years or fine up to Rs. 1,000 or both. If victim is child/minor: 7-10 years imprisonment.',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['living on prostitution earnings', 'pimp', 'tout', 'ITPA Section 4', 'exploitation prostitution', 'trafficking earnings'],
    relatedSections: [
      { sectionNumber: '3', actCode: 'ITPA', title: 'Punishment for keeping a brothel' },
      { sectionNumber: '5', actCode: 'ITPA', title: 'Procuring, inducing or taking person for prostitution' }
    ]
  },
  {
    act: 'Immoral Traffic (Prevention) Act, 1956',
    actCode: 'ITPA',
    sectionNumber: '5',
    title: 'Procuring, inducing or taking person for the sake of prostitution',
    legalText: '(1) Any person who— (a) procures or attempts to procure a person whether with or without his/her consent, for the purpose of prostitution; or (b) induces a person to go from any place, with the intent that he/she may for the purpose of prostitution become the inmate of, or frequent, a brothel; or (c) takes or attempts to take a person or causes a person to be taken, from one place to another with a view to his/her carrying on, or being brought up to carry on prostitution; or (d) causes or induces a person to carry on prostitution; shall be punishable on conviction with rigorous imprisonment for a term of not less than three years and not more than seven years and also with fine which may extend to two thousand rupees, and if any offence under this sub-section is committed against the will of any person, the punishment of imprisonment for a term of seven years shall extend to imprisonment for a term of fourteen years: Provided that if the person in respect of whom an offence committed under this sub-section,— (i) is a child, the punishment provided under this sub-section shall extend to rigorous imprisonment for a term of not less than seven years but may extend to life; and (ii) is a minor, the punishment provided under this sub-section shall extend to rigorous imprisonment for a term of not less than seven years and not more than fourteen years.',
    explanation: 'Anyone who procures, induces, or takes a person for the purpose of prostitution — with or without consent — faces 3-7 years rigorous imprisonment plus fine. If done against the victim\'s will, the punishment extends to 7-14 years. If the victim is a minor, the punishment is 7-14 years RI. If the victim is a child, the punishment is minimum 7 years RI and may extend to life imprisonment. Consent of the victim is irrelevant — procuring for prostitution is a crime regardless.',
    punishment: 'General: 3-7 years RI + fine up to Rs. 2,000. Against will: 7-14 years. Minor victim: 7-14 years RI. Child victim: 7 years to life RI.',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['procuring prostitution', 'inducing prostitution', 'trafficking', 'ITPA Section 5', 'sex trafficking', 'forced prostitution', 'human trafficking'],
    relatedSections: [
      { sectionNumber: '3', actCode: 'ITPA', title: 'Punishment for keeping a brothel' },
      { sectionNumber: '4', actCode: 'ITPA', title: 'Living on earnings of prostitution' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // Medical Termination of Pregnancy Act, 1971
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'Medical Termination of Pregnancy Act, 1971',
    actCode: 'MTP',
    sectionNumber: '3',
    title: 'When pregnancies may be terminated by registered medical practitioners',
    legalText: '(1) Notwithstanding anything contained in the Indian Penal Code, a registered medical practitioner shall not be guilty of any offence under that Code or under any other law for the time being in force, if any pregnancy is terminated by him in accordance with the provisions of this Act. (2) Subject to the provisions of sub-section (4), a pregnancy may be terminated by a registered medical practitioner,— (a) where the length of the pregnancy does not exceed twenty weeks, if such medical practitioner is, or (b) where the length of the pregnancy exceeds twenty weeks but does not exceed twenty-four weeks in case of such category of woman as may be prescribed by rules made under this Act, if not less than two registered medical practitioners are, of the opinion, formed in good faith, that— (i) the continuance of the pregnancy would involve a risk to the life of the pregnant woman or of grave injury to her physical or mental health; or (ii) there is a substantial risk that if the child were born, it would suffer from any serious physical or mental abnormality. Explanation 1.— For the purposes of clause (a), where any pregnancy occurs as a result of failure of any device or method used by any woman or her partner for the purpose of limiting the number of children or preventing pregnancy, the anguish caused by such pregnancy may be presumed to constitute a grave injury to the mental health of the pregnant woman. Explanation 2.— For the purposes of clauses (a) and (b), where any pregnancy is alleged by the pregnant woman to have been caused by rape, the anguish caused by the pregnancy shall be presumed to constitute a grave injury to the mental health of the pregnant woman. (3) In determining whether the continuance of a pregnancy would involve such risk of injury to the health as is mentioned in sub-section (2), account may be taken of the pregnant woman\'s actual or reasonably foreseeable environment. (4) (a) No pregnancy of a woman, who has not attained the age of eighteen years, or, who, having attained the age of eighteen years, is a mentally ill person, shall be terminated except with the consent in writing of her guardian.',
    explanation: 'A registered medical practitioner can legally terminate a pregnancy under the following conditions: Up to 20 weeks — one doctor\'s opinion is sufficient if continuing the pregnancy risks the woman\'s life or physical/mental health, or if there is substantial risk of serious abnormality in the child. Between 20-24 weeks — two doctors\' opinions are needed, and this is allowed only for prescribed categories of women (such as rape survivors, minors, change in marital status during pregnancy, etc.). Contraceptive failure and pregnancy from rape are presumed to cause grave mental health injury. For minors or mentally ill women, written consent of the guardian is required.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['MTP', 'abortion', 'pregnancy termination', 'medical termination', '20 weeks', '24 weeks', 'registered medical practitioner', 'contraceptive failure', 'rape pregnancy'],
    relatedSections: [
      { sectionNumber: '5', actCode: 'MTP', title: 'Exceptions to Section 3' }
    ]
  },
  {
    act: 'Medical Termination of Pregnancy Act, 1971',
    actCode: 'MTP',
    sectionNumber: '5',
    title: 'Sections 3 and 4 when not to apply',
    legalText: '(1) The provisions of section 4, and so much of the provisions of sub-section (2) of section 3 as relate to the length of the pregnancy and the opinion of not less than two registered medical practitioners, shall not apply to the termination of a pregnancy by a registered medical practitioner in a case where he is of opinion, formed in good faith, that the termination of such pregnancy is immediately necessary to save the life of the pregnant woman.',
    explanation: 'When there is an immediate need to save the life of the pregnant woman, the restrictions in Section 3 regarding gestational limits (20 or 24 weeks) and the requirement of two doctors\' opinions do not apply. A single registered medical practitioner can terminate the pregnancy at any stage if, in good faith, they believe it is immediately necessary to save the woman\'s life. The requirement of a registered facility under Section 4 also does not apply in such emergency situations.',
    punishment: '',
    category: 'Civil',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['MTP exception', 'emergency abortion', 'saving life of mother', 'MTP Section 5', 'life-threatening pregnancy', 'emergency termination'],
    relatedSections: [
      { sectionNumber: '3', actCode: 'MTP', title: 'When pregnancies may be terminated' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // Child Labour (Prohibition and Regulation) Act, 1986
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'Child Labour (Prohibition and Regulation) Act, 1986',
    actCode: 'CLA',
    sectionNumber: '3',
    title: 'Prohibition of employment of children in any occupation and process',
    legalText: 'No child shall be employed or permitted to work in any occupation or process: Provided that nothing in this section shall apply where the child— (a) helps his family or family enterprise, which is other than any hazardous occupations or processes set forth in the Schedule, after his school hours or during vacations; (b) works as a child artist in an audio-visual entertainment industry, including advertisement, films, television serials or any such other entertainment or sports activities, except the circus, subject to such conditions and safety measures, as may be prescribed: Provided further that no such work under this section shall effect the school education, rest and leisure of the child.',
    explanation: 'No child (person below 14 years) can be employed or allowed to work in any occupation or process. There are only two narrow exceptions: (1) a child may help in their own family\'s enterprise (not in hazardous work listed in the Schedule) after school hours or during vacations; (2) a child may work as a child artist in entertainment (TV, films, ads) except circus, subject to safety conditions. In both exceptions, the child\'s schooling, rest, and leisure must not be affected. The 2016 amendment expanded the prohibition from specific occupations to ALL occupations.',
    punishment: '',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'N/A',
    keywords: ['child labour prohibition', 'no child work', 'child employment ban', 'child labour act', 'below 14 years', 'hazardous occupation child'],
    relatedSections: [
      { sectionNumber: '14', actCode: 'CLA', title: 'Punishment for employing child labour' }
    ]
  },
  {
    act: 'Child Labour (Prohibition and Regulation) Act, 1986',
    actCode: 'CLA',
    sectionNumber: '14',
    title: 'Penalties',
    legalText: '(1) Whoever employs any child or permits any child to work in contravention of the provisions of section 3 shall be punishable with imprisonment for a term which shall not be less than six months but which may extend to two years, or with fine which shall not be less than twenty thousand rupees but which may extend to fifty thousand rupees, or with both. (1A) Whoever employs any adolescent or permits any adolescent to work in contravention of the provisions of section 3A shall be punishable with imprisonment for a term which shall not be less than six months but which may extend to two years, or with fine which shall not be less than twenty thousand rupees but which may extend to fifty thousand rupees, or with both. (2) Whoever, having been convicted of an offence under section 3 or section 3A, commits a like offence afterwards, he shall be punishable with imprisonment for a term which shall not be less than one year but which may extend to three years.',
    explanation: 'Anyone who employs a child (below 14) in violation of the ban faces 6 months to 2 years imprisonment, or a fine of Rs. 20,000 to Rs. 50,000, or both. The same punishment applies for employing adolescents (14-18) in hazardous occupations. For repeat offenders, the punishment increases to 1-3 years imprisonment. Parents or guardians are not punished for the first offence — only upon recommitting the offence.',
    punishment: 'First offence: 6 months to 2 years imprisonment, or fine Rs. 20,000-50,000, or both. Repeat offence: 1-3 years imprisonment.',
    category: 'Criminal',
    cognizable: 'Yes',
    bailable: 'Yes',
    keywords: ['child labour punishment', 'penalty child employment', 'CLA Section 14', 'child labour fine', 'employing children punishment', 'adolescent labour penalty'],
    relatedSections: [
      { sectionNumber: '3', actCode: 'CLA', title: 'Prohibition of employment of children' }
    ]
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing sections for all five act codes
    const actCodes = ['POSH', 'MBA', 'ITPA', 'MTP', 'CLA'];
    for (const code of actCodes) {
      const deleted = await LegalSection.deleteMany({ actCode: code });
      console.log(`Cleared ${deleted.deletedCount} existing ${code} sections`);
    }

    for (let i = 0; i < sections.length; i++) {
      await LegalSection.create(sections[i]);
      console.log(`[${i + 1}/${sections.length}] Section ${sections[i].sectionNumber}: ${sections[i].title}`);
    }

    console.log(`Done: seeded ${sections.length} sections across ${actCodes.length} acts`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed();
