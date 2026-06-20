// Seed script to add Family Law sections to the legal database
// Run with: node server/seedFamilyLaw.js

require('dotenv').config();
const mongoose = require('mongoose');
const LegalSection = require('./models/LegalSection');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lawbook';

const familySections = [
  // ═══════════════════════════════════════════════════════════════════
  // Hindu Marriage Act, 1955
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'Hindu Marriage Act, 1955',
    actCode: 'HMA',
    sectionNumber: '5',
    title: 'Conditions for a Hindu marriage',
    legalText: 'A marriage may be solemnised between any two Hindus, if the following conditions are fulfilled, namely: (i) neither party has a spouse living at the time of the marriage; (ii) at the time of the marriage, neither party is incapable of giving a valid consent to it in consequence of unsoundness of mind; or even if capable of giving a valid consent, has been suffering from mental disorder of such a kind or to such an extent as to be unfit for marriage and the procreation of children; or has been subject to recurrent attacks of insanity; (iii) the bridegroom has completed the age of twenty-one years and the bride the age of eighteen years at the time of the marriage; (iv) the parties are not within the degrees of prohibited relationship, unless the custom or usage governing each of them permits of a marriage between the two; (v) the parties are not sapindas of each other, unless the custom or usage governing each of them permits of a marriage between the two.',
    explanation: 'For a valid Hindu marriage, five conditions must be met: (1) neither person should already be married, (2) both must be mentally sound and capable of giving consent, (3) the groom must be at least 21 and the bride at least 18 years old, (4) they must not be in a prohibited relationship (like close blood relatives), and (5) they must not be sapindas (within certain degrees of kinship) of each other, unless their customs allow it.',
    punishment: 'Violation of conditions (i), (iv), or (v) may render the marriage void or voidable. Marriage in violation of condition (iii) is punishable under the Child Marriage Restraint Act.',
    category: 'Family',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['hindu marriage', 'marriage conditions', 'valid marriage', 'age of marriage', 'prohibited relationship', 'sapinda', 'consent', 'HMA Section 5'],
    relatedSections: [
      { sectionNumber: '11', actCode: 'HMA', title: 'Void marriages' },
      { sectionNumber: '12', actCode: 'HMA', title: 'Voidable marriages' }
    ]
  },
  {
    act: 'Hindu Marriage Act, 1955',
    actCode: 'HMA',
    sectionNumber: '9',
    title: 'Restitution of conjugal rights',
    legalText: 'When either the husband or the wife has, without reasonable excuse, withdrawn from the society of the other, the aggrieved party may apply, by petition to the district court, for restitution of conjugal rights and the court, on being satisfied of the truth of the statements made in such petition and that there is no legal ground why the application should not be granted, may decree restitution of conjugal rights accordingly. Explanation.—Where a question arises whether there has been reasonable excuse for withdrawal from the society, the burden of proving reasonable excuse shall be on the person who has withdrawn from the society.',
    explanation: 'If a husband or wife leaves the other without a valid reason, the abandoned spouse can go to the district court and ask for an order to restore the marital relationship. The person who left must prove they had a reasonable excuse for leaving. The court will grant the order if the petition is truthful and there is no legal bar.',
    punishment: 'Non-compliance with a decree of restitution of conjugal rights may be a ground for divorce under Section 13(1A).',
    category: 'Family',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['conjugal rights', 'restitution', 'desertion', 'withdrawal from society', 'marital rights', 'HMA Section 9'],
    relatedSections: [
      { sectionNumber: '13', actCode: 'HMA', title: 'Divorce' },
      { sectionNumber: '22', actCode: 'HMA', title: 'Proceedings to be in camera' }
    ]
  },
  {
    act: 'Hindu Marriage Act, 1955',
    actCode: 'HMA',
    sectionNumber: '11',
    title: 'Void marriages',
    legalText: 'Any marriage solemnised after the commencement of this Act shall be null and void and may, on a petition presented by either party thereto against the other party, be so declared by a decree of nullity if it contravenes any one of the conditions specified in clauses (i), (iv) and (v) of section 5.',
    explanation: 'A Hindu marriage is completely void (as if it never happened) if: (1) either party already had a living spouse at the time of marriage (bigamy), (2) the parties were within the degrees of prohibited relationship, or (3) the parties were sapindas of each other — unless their customs allow such marriages. Either party can apply to the court for a decree of nullity declaring the marriage void.',
    punishment: 'Bigamous marriage is punishable under Sections 494 and 495 of the Indian Penal Code (imprisonment up to 7 years and fine).',
    category: 'Family',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['void marriage', 'nullity', 'bigamy', 'null and void', 'prohibited relationship', 'HMA Section 11'],
    relatedSections: [
      { sectionNumber: '5', actCode: 'HMA', title: 'Conditions for a Hindu marriage' },
      { sectionNumber: '12', actCode: 'HMA', title: 'Voidable marriages' },
      { sectionNumber: '494', actCode: 'IPC', title: 'Bigamy' }
    ]
  },
  {
    act: 'Hindu Marriage Act, 1955',
    actCode: 'HMA',
    sectionNumber: '13',
    title: 'Divorce',
    legalText: '(1) Any marriage solemnised, whether before or after the commencement of this Act, may, on a petition presented by either the husband or the wife, be dissolved by a decree of divorce on the ground that the other party— (i) has, after the solemnisation of the marriage, had voluntary sexual intercourse with any person other than his or her spouse; or (ia) has, after the solemnisation of the marriage, treated the petitioner with cruelty; or (ib) has deserted the petitioner for a continuous period of not less than two years immediately preceding the presentation of the petition; or (ii) has ceased to be a Hindu by conversion to another religion; or (iii) has been incurably of unsound mind, or has been suffering continuously or intermittently from mental disorder of such a kind and to such an extent that the petitioner cannot reasonably be expected to live with the respondent; or (iv) has been suffering from a virulent and incurable form of leprosy; or (v) has been suffering from venereal disease in a communicable form; or (vi) has renounced the world by entering any religious order; or (vii) has not been heard of as being alive for a period of seven years or more by those persons who would naturally have heard of it, had that party been alive.',
    explanation: 'Either husband or wife can file for divorce on grounds including: adultery, cruelty, desertion for 2+ years, conversion to another religion, incurable mental disorder, virulent and incurable leprosy, communicable venereal disease, renunciation of the world, or if the other spouse has not been heard from for 7+ years. Additionally, a wife can seek divorce on grounds such as the husband\'s bigamy, rape, sodomy, or bestiality.',
    punishment: '',
    category: 'Family',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['divorce', 'divorce grounds', 'cruelty', 'desertion', 'adultery', 'conversion', 'mental disorder', 'HMA Section 13'],
    relatedSections: [
      { sectionNumber: '13B', actCode: 'HMA', title: 'Divorce by mutual consent' },
      { sectionNumber: '9', actCode: 'HMA', title: 'Restitution of conjugal rights' },
      { sectionNumber: '25', actCode: 'HMA', title: 'Permanent alimony and maintenance' }
    ]
  },
  {
    act: 'Hindu Marriage Act, 1955',
    actCode: 'HMA',
    sectionNumber: '13B',
    title: 'Divorce by mutual consent',
    legalText: '(1) Subject to the provisions of this Act a petition for dissolution of marriage by a decree of divorce may be presented to the district court by both the parties to a marriage together, whether such marriage was solemnised before or after the commencement of the Marriage Laws (Amendment) Act, 1976, on the ground that they have been living separately for a period of one year or more, that they have not been able to live together and that they have mutually agreed that the marriage should be dissolved. (2) On the motion of both the parties made not earlier than six months after the date of the presentation of the petition referred to in sub-section (1) and not later than eighteen months after the said date, if the petition is not withdrawn in the meantime, the court shall, on being satisfied, after hearing the parties and after making such inquiry as it thinks fit, that a marriage has been solemnised and that the averments in the petition are true, pass a decree of divorce declaring the marriage to be dissolved with effect from the date of the decree.',
    explanation: 'Both husband and wife can jointly file for divorce if they have been living separately for at least one year, cannot live together, and mutually agree to dissolve the marriage. After filing, there is a mandatory 6-month cooling-off period (which can be waived by the Supreme Court in exceptional cases as per Amardeep Singh v. Harveen Kaur, 2017). The court grants the divorce after this period but before 18 months, provided the petition is not withdrawn.',
    punishment: '',
    category: 'Family',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['mutual consent divorce', 'divorce by consent', 'living separately', 'cooling off period', 'joint petition', 'HMA Section 13B'],
    relatedSections: [
      { sectionNumber: '13', actCode: 'HMA', title: 'Divorce' },
      { sectionNumber: '24', actCode: 'HMA', title: 'Maintenance pendente lite' },
      { sectionNumber: '25', actCode: 'HMA', title: 'Permanent alimony and maintenance' }
    ]
  },
  {
    act: 'Hindu Marriage Act, 1955',
    actCode: 'HMA',
    sectionNumber: '15',
    title: 'Divorced persons when may marry again',
    legalText: 'When a marriage has been dissolved by a decree of divorce and either there is no right of appeal against the decree or, if there is such a right of appeal, the time for appealing has expired without an appeal having been presented, or an appeal has been presented but has been dismissed, it shall be lawful for either party to the marriage to marry again.',
    explanation: 'After a divorce decree is final — meaning the appeal period has passed without any appeal being filed, or any appeal has been dismissed — both the husband and wife are free to remarry. This ensures that remarriage only happens when the divorce is conclusive and cannot be challenged further.',
    punishment: '',
    category: 'Family',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['remarriage', 'divorced persons', 'marry again', 'decree of divorce', 'appeal period', 'HMA Section 15'],
    relatedSections: [
      { sectionNumber: '13', actCode: 'HMA', title: 'Divorce' },
      { sectionNumber: '13B', actCode: 'HMA', title: 'Divorce by mutual consent' }
    ]
  },
  {
    act: 'Hindu Marriage Act, 1955',
    actCode: 'HMA',
    sectionNumber: '24',
    title: 'Maintenance pendente lite and expenses of proceedings',
    legalText: 'Where in any proceeding under this Act it appears to the court that either the wife or the husband, as the case may be, has no independent income sufficient for her or his support and the necessary expenses of the proceeding, it may, on the application of the wife or the husband, order the respondent to pay to the petitioner the expenses of the proceeding, and monthly during the proceeding such sum as, having regard to the petitioner\'s own income and the income of the respondent, it may seem to the court to be reasonable. Provided that the application for the payment of the expenses of the proceeding and such monthly sum during the proceeding, shall, as far as possible, be disposed of within sixty days from the date of service of notice on the wife or the husband, as the case may be.',
    explanation: 'During ongoing marriage-related court proceedings (divorce, judicial separation, etc.), if either spouse does not have enough independent income, they can ask the court for temporary maintenance and litigation expenses from the other spouse. The court considers both parties\' incomes and decides a reasonable monthly amount. The application should be decided within 60 days of serving notice.',
    punishment: '',
    category: 'Family',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['maintenance pendente lite', 'interim maintenance', 'litigation expenses', 'temporary maintenance', 'court proceedings', 'HMA Section 24'],
    relatedSections: [
      { sectionNumber: '25', actCode: 'HMA', title: 'Permanent alimony and maintenance' },
      { sectionNumber: '13', actCode: 'HMA', title: 'Divorce' }
    ]
  },
  {
    act: 'Hindu Marriage Act, 1955',
    actCode: 'HMA',
    sectionNumber: '25',
    title: 'Permanent alimony and maintenance',
    legalText: '(1) Any court exercising jurisdiction under this Act may, at the time of passing any decree or at any time subsequent thereto, on application made to it for the purpose by either the wife or the husband, as the case may be, order that the respondent shall pay to the applicant for her or his maintenance and support such gross sum or such monthly or periodical sum for a term not exceeding the life of the applicant as, having regard to the respondent\'s own income and other property, if any, the income and other property of the applicant, the conduct of the parties and other circumstances of the case, it may seem to the court to be just, and any such payment may be secured, if necessary, by a charge on the immovable property of the respondent. (2) If the court is satisfied that there is a change in the circumstances of either party at any time after it has made an order under sub-section (1), it may at the instance of either party, vary, modify or rescind any such order in such manner as the court may deem just. (3) If the court is satisfied that the party in whose favour an order has been made under this section has re-married or, if such party is the wife, that she has not remained chaste, or, if such party is the husband, that he has had sexual intercourse with any woman outside wedlock, it may at the instance of the other party vary, modify or rescind any such order in such manner as the court may deem just.',
    explanation: 'After a divorce or other matrimonial decree, either spouse can ask the court for permanent alimony — a lump sum or regular monthly payments for maintenance. The court considers income, property, conduct of parties, and circumstances. The order can be modified if circumstances change. It can also be cancelled if the receiving spouse remarries, or (in the case of the wife) has not remained chaste, or (in the case of the husband) has had extramarital sexual intercourse.',
    punishment: '',
    category: 'Family',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['permanent alimony', 'maintenance', 'alimony', 'spousal support', 'post-divorce maintenance', 'HMA Section 25'],
    relatedSections: [
      { sectionNumber: '24', actCode: 'HMA', title: 'Maintenance pendente lite' },
      { sectionNumber: '13', actCode: 'HMA', title: 'Divorce' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // Protection of Women from Domestic Violence Act, 2005
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'Protection of Women from Domestic Violence Act, 2005',
    actCode: 'DVA',
    sectionNumber: '3',
    title: 'Definition of domestic violence',
    legalText: 'For the purposes of this Act, any act, omission or commission or conduct of the respondent shall constitute domestic violence in case it— (a) harms or injures or endangers the health, safety, life, limb or well-being, whether mental or physical, of the aggrieved person or tends to do so and includes causing physical abuse, sexual abuse, verbal and emotional abuse and economic abuse; or (b) harasses, harms, injures or endangers the aggrieved person with a view to coerce her or any other person related to her to meet any unlawful demand for any dowry or other property or valuable security; or (c) has the effect of threatening the aggrieved person or any person related to her by any conduct mentioned in clause (a) or clause (b); or (d) otherwise injures or causes harm, whether physical or mental, to the aggrieved person.',
    explanation: 'Domestic violence includes any act that harms or endangers the health, safety, or well-being (physical or mental) of the aggrieved woman. It covers four types: (1) physical abuse — hitting, beating, or any bodily harm; (2) sexual abuse — any forced sexual conduct; (3) verbal and emotional abuse — insults, ridicule, humiliation, threats; and (4) economic abuse — depriving resources, property, or finances. It also includes harassment related to dowry demands.',
    punishment: 'Breach of protection order under Section 31 is punishable with imprisonment up to one year, or fine up to Rs. 20,000, or both.',
    category: 'Family',
    cognizable: 'Yes',
    bailable: 'N/A',
    keywords: ['domestic violence', 'physical abuse', 'sexual abuse', 'verbal abuse', 'emotional abuse', 'economic abuse', 'DVA Section 3'],
    relatedSections: [
      { sectionNumber: '12', actCode: 'DVA', title: 'Application to Magistrate' },
      { sectionNumber: '18', actCode: 'DVA', title: 'Protection orders' },
      { sectionNumber: '498A', actCode: 'IPC', title: 'Cruelty by husband or relatives' }
    ]
  },
  {
    act: 'Protection of Women from Domestic Violence Act, 2005',
    actCode: 'DVA',
    sectionNumber: '12',
    title: 'Application to Magistrate',
    legalText: '(1) An aggrieved person or a Protection Officer or any other person on behalf of the aggrieved person may present an application to the Magistrate seeking one or more of the following reliefs under this Act, namely: (a) an order for issuance of protection order under section 18; (b) an order for monetary relief under section 20; (c) an order for custody order under section 21; (d) an order for compensation under section 22; (e) an order for residence order under section 19. (2) The relief sought for under sub-section (1) may include a relief for issuance of an order for payment of compensation or damages without prejudice to the right of such person to institute a suit for compensation or damages for the injuries caused by the acts of domestic violence committed by the respondent: Provided that where a decree for any amount as compensation or damages has been passed by any court in favour of the aggrieved person, the amount, if any, paid or payable in pursuance of the order made by the Magistrate under this Act shall be set off against the amount payable under such decree and vice versa.',
    explanation: 'A woman facing domestic violence, a Protection Officer, or any person on her behalf can file an application before the Magistrate seeking multiple reliefs including: protection orders, monetary relief, custody orders, compensation, and residence orders. The application can seek damages for injuries without affecting the right to file a separate civil suit. Any amount already paid under this Act is adjusted against amounts awarded in civil proceedings.',
    punishment: '',
    category: 'Family',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['application to magistrate', 'domestic violence complaint', 'protection officer', 'relief', 'DVA Section 12'],
    relatedSections: [
      { sectionNumber: '3', actCode: 'DVA', title: 'Definition of domestic violence' },
      { sectionNumber: '18', actCode: 'DVA', title: 'Protection orders' },
      { sectionNumber: '20', actCode: 'DVA', title: 'Monetary relief' }
    ]
  },
  {
    act: 'Protection of Women from Domestic Violence Act, 2005',
    actCode: 'DVA',
    sectionNumber: '17',
    title: 'Right to reside in a shared household',
    legalText: '(1) Notwithstanding anything contained in any other law for the time being in force, every woman in a domestic relationship shall have the right to reside in the shared household, whether or not she has any right, title or beneficial interest in the same. (2) The aggrieved person shall not be evicted or excluded from the shared household or any part of it by the respondent save in accordance with the procedure established by law.',
    explanation: 'Every woman in a domestic relationship has the legal right to live in the shared household (the house where she lived with the respondent), even if she does not own the property or have any legal title to it. She cannot be evicted or excluded from this household except through proper legal procedure. This is a crucial protection ensuring women are not rendered homeless due to domestic disputes.',
    punishment: '',
    category: 'Family',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['shared household', 'right to reside', 'eviction', 'domestic relationship', 'women rights', 'DVA Section 17'],
    relatedSections: [
      { sectionNumber: '19', actCode: 'DVA', title: 'Residence orders' },
      { sectionNumber: '3', actCode: 'DVA', title: 'Definition of domestic violence' }
    ]
  },
  {
    act: 'Protection of Women from Domestic Violence Act, 2005',
    actCode: 'DVA',
    sectionNumber: '18',
    title: 'Protection orders',
    legalText: 'The Magistrate may, after giving the aggrieved person and the respondent an opportunity of being heard and on being prima facie satisfied that domestic violence has taken place or is likely to take place, pass a protection order in favour of the aggrieved person and prohibit the respondent from— (a) committing any act of domestic violence; (b) aiding or abetting in the commission of acts of domestic violence; (c) entering the place of employment of the aggrieved person or, if the person aggrieved is a child, its school or any other place frequented by the aggrieved person; (d) attempting to communicate in any form, whatsoever, with the aggrieved person, including personal, oral, written, electronic or telephonic contact; (e) alienating any assets, operating bank lockers or bank accounts used or held or enjoyed by both the parties, jointly by the aggrieved person and the respondent or singly by the respondent, including her stridhan or any other property held either jointly by the parties or separately by them without the leave of the Magistrate; (f) causing violence to the dependants, other relatives or any person who give the aggrieved person assistance from domestic violence; (g) committing any other act as specified in the protection order.',
    explanation: 'After hearing both parties, if the Magistrate is satisfied that domestic violence has occurred or is likely to occur, they can pass a protection order that prohibits the abuser from: committing domestic violence, entering the woman\'s workplace or her child\'s school, contacting her in any form (including electronic), disposing of shared assets or bank accounts, or harming her dependants and those who help her.',
    punishment: 'Breach of protection order is a cognizable and non-bailable offence punishable with imprisonment up to one year, or fine up to Rs. 20,000, or both (Section 31).',
    category: 'Family',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['protection order', 'domestic violence order', 'restraining order', 'no contact', 'DVA Section 18'],
    relatedSections: [
      { sectionNumber: '3', actCode: 'DVA', title: 'Definition of domestic violence' },
      { sectionNumber: '19', actCode: 'DVA', title: 'Residence orders' },
      { sectionNumber: '31', actCode: 'DVA', title: 'Penalty for breach of protection order' }
    ]
  },
  {
    act: 'Protection of Women from Domestic Violence Act, 2005',
    actCode: 'DVA',
    sectionNumber: '19',
    title: 'Residence orders',
    legalText: '(1) While disposing of an application under sub-section (1) of section 12, the Magistrate may, on being satisfied that domestic violence has taken place, pass a residence order— (a) restraining the respondent from dispossessing or in any other manner disturbing the possession of the aggrieved person from the shared household, whether or not the respondent has a legal or equitable interest in the shared household; (b) directing the respondent to remove himself from the shared household; (c) restraining the respondent or any of his relatives from entering any portion of the shared household in which the aggrieved person resides; (d) restraining the respondent from alienating or disposing of the shared household or encumbering the same; (e) restraining the respondent from renouncing his rights in the shared household except with the leave of the Magistrate; or (f) directing the respondent to secure same level of alternate accommodation for the aggrieved person as enjoyed by her in the shared household or to pay rent for the same, if the circumstances so require.',
    explanation: 'The Magistrate can pass a residence order that: prevents the abuser from dispossessing the woman from the shared household (even if he owns it), directs the abuser to leave the shared household, prevents the abuser or his relatives from entering the woman\'s part of the house, stops the abuser from selling or mortgaging the shared home, or requires the abuser to arrange equivalent alternate accommodation or pay rent for the same.',
    punishment: 'Breach of residence order is punishable under Section 31 with imprisonment up to one year, or fine up to Rs. 20,000, or both.',
    category: 'Family',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['residence order', 'shared household', 'eviction protection', 'alternate accommodation', 'DVA Section 19'],
    relatedSections: [
      { sectionNumber: '17', actCode: 'DVA', title: 'Right to reside in shared household' },
      { sectionNumber: '18', actCode: 'DVA', title: 'Protection orders' }
    ]
  },
  {
    act: 'Protection of Women from Domestic Violence Act, 2005',
    actCode: 'DVA',
    sectionNumber: '20',
    title: 'Monetary relief',
    legalText: '(1) While disposing of an application under sub-section (1) of section 12, the Magistrate may direct the respondent to pay monetary relief to meet the expenses incurred and losses suffered by the aggrieved person and any child of the aggrieved person as a result of the domestic violence and such relief may include but is not limited to— (a) the loss of earnings; (b) the medical expenses; (c) the loss caused due to the destruction, damage or removal of any property from the control of the aggrieved person; and (d) the maintenance for the aggrieved person as well as her children, if any, including an order under or in addition to an order of maintenance under section 125 of the Code of Criminal Procedure, 1973 or any other law for the time being in force. (2) The monetary relief granted under this section shall be adequate, fair and reasonable and consistent with the standard of living to which the aggrieved person is accustomed. (3) The Magistrate shall have the power to order an appropriate lump sum payment or monthly payments of maintenance, as the nature and circumstances of the case may require.',
    explanation: 'The Magistrate can order the abuser to pay monetary relief covering: lost earnings, medical expenses, loss from destruction or damage of property, and maintenance for the woman and her children. This monetary relief can be in addition to maintenance under Section 125 CrPC. The amount must be fair, reasonable, and consistent with the woman\'s standard of living. It can be a lump sum or monthly payments.',
    punishment: 'Non-compliance is punishable under Section 31.',
    category: 'Family',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['monetary relief', 'maintenance', 'medical expenses', 'loss of earnings', 'compensation', 'DVA Section 20'],
    relatedSections: [
      { sectionNumber: '12', actCode: 'DVA', title: 'Application to Magistrate' },
      { sectionNumber: '22', actCode: 'DVA', title: 'Compensation orders' },
      { sectionNumber: '125', actCode: 'CrPC', title: 'Maintenance of wives, children and parents' }
    ]
  },
  {
    act: 'Protection of Women from Domestic Violence Act, 2005',
    actCode: 'DVA',
    sectionNumber: '22',
    title: 'Compensation orders',
    legalText: 'In addition to other reliefs as may be granted under this Act, the Magistrate may on an application being made by the aggrieved person, pass an order directing the respondent to pay compensation and damages for the injuries, including mental torture and emotional distress, caused by the acts of domestic violence committed by the respondent.',
    explanation: 'Beyond protection orders, residence orders, and monetary relief, the woman can also seek compensation and damages for injuries — including mental torture and emotional distress — caused by the domestic violence. This is a separate and additional remedy that recognizes the non-economic harm suffered by victims of domestic violence.',
    punishment: 'Non-compliance with compensation order is punishable under Section 31.',
    category: 'Family',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['compensation', 'damages', 'mental torture', 'emotional distress', 'domestic violence compensation', 'DVA Section 22'],
    relatedSections: [
      { sectionNumber: '20', actCode: 'DVA', title: 'Monetary relief' },
      { sectionNumber: '12', actCode: 'DVA', title: 'Application to Magistrate' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // Dowry Prohibition Act, 1961
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'Dowry Prohibition Act, 1961',
    actCode: 'DPA',
    sectionNumber: '2',
    title: 'Definition of dowry',
    legalText: 'In this Act, "dowry" means any property or valuable security given or agreed to be given either directly or indirectly— (a) by one party to a marriage to the other party to the marriage; or (b) by the parents of either party to a marriage or by any other person, to either party to the marriage or to any other person; at or before or any time after the marriage in connection with the marriage of the said parties, but does not include dower or mahr in the case of persons to whom the Muslim Personal Law (Shariat) applies. Explanation I.—For the removal of doubts, it is hereby declared that any presents made at the time of a marriage to either party to the marriage in the form of cash, ornaments, clothes or other articles, shall not be deemed to be dowry within the meaning of this section, unless they are made as consideration for the marriage of the said parties. Explanation II.—The expression "valuable security" has the same meaning as in section 30 of the Indian Penal Code (45 of 1860).',
    explanation: 'Dowry means any property or valuable security given (or agreed to be given) — directly or indirectly — by either party to a marriage, their parents, or any other person, to the other party or any person, before, at, or after the marriage, in connection with the marriage. Gifts given voluntarily without being demanded as consideration for the marriage are not considered dowry. Mahr (dower in Muslim marriages) is excluded from this definition.',
    punishment: '',
    category: 'Family',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['dowry', 'dowry definition', 'property', 'valuable security', 'marriage consideration', 'DPA Section 2'],
    relatedSections: [
      { sectionNumber: '3', actCode: 'DPA', title: 'Penalty for giving or taking dowry' },
      { sectionNumber: '4', actCode: 'DPA', title: 'Penalty for demanding dowry' }
    ]
  },
  {
    act: 'Dowry Prohibition Act, 1961',
    actCode: 'DPA',
    sectionNumber: '3',
    title: 'Penalty for giving or taking dowry',
    legalText: '(1) If any person, after the commencement of this Act, gives or takes or abets the giving or taking of dowry, he shall be punishable with imprisonment for a term which shall not be less than five years, and with fine which shall not be less than fifteen thousand rupees or the amount of the value of such dowry, whichever is more: Provided that the Court may, for adequate and special reasons to be recorded in the judgment, impose a sentence of imprisonment for a term of less than five years. (2) Nothing in sub-section (1) shall apply to, or in relation to,— (a) presents which are given at the time of a marriage to the bride (without any demand having been made in that behalf): Provided that such presents are entered in a list maintained in accordance with rules made under this Act; (b) presents which are given at the time of a marriage to the bridegroom (without any demand having been made in that behalf): Provided that such presents are entered in a list maintained in accordance with rules made under this Act.',
    explanation: 'Anyone who gives, takes, or helps in giving or taking dowry faces a minimum of 5 years imprisonment and a fine of at least Rs. 15,000 or the value of the dowry (whichever is more). The court can reduce the sentence below 5 years only for special recorded reasons. Voluntary gifts given at the time of marriage without demand — if properly listed — are exempt from this penalty.',
    punishment: 'Minimum 5 years imprisonment and fine of not less than Rs. 15,000 or the value of the dowry, whichever is more.',
    category: 'Family',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['dowry penalty', 'giving dowry', 'taking dowry', 'dowry punishment', 'five years', 'DPA Section 3'],
    relatedSections: [
      { sectionNumber: '2', actCode: 'DPA', title: 'Definition of dowry' },
      { sectionNumber: '4', actCode: 'DPA', title: 'Penalty for demanding dowry' },
      { sectionNumber: '304B', actCode: 'IPC', title: 'Dowry death' }
    ]
  },
  {
    act: 'Dowry Prohibition Act, 1961',
    actCode: 'DPA',
    sectionNumber: '4',
    title: 'Penalty for demanding dowry',
    legalText: 'If any person demands, directly or indirectly, from the parents or other relatives or guardian of a bride or bridegroom, as the case may be, any dowry, he shall be punishable with imprisonment for a term which shall not be less than six months but which may extend to two years and with fine which may extend to ten thousand rupees: Provided that the Court may, for adequate and special reasons to be mentioned in the judgment, impose a sentence of imprisonment for a term of less than six months.',
    explanation: 'Anyone who demands dowry — directly or indirectly — from the parents, relatives, or guardian of the bride or groom faces imprisonment of 6 months to 2 years and a fine of up to Rs. 10,000. Even making a demand, without actually receiving dowry, is a punishable offence. The court may reduce the sentence below 6 months only for special recorded reasons.',
    punishment: 'Imprisonment of 6 months to 2 years and fine up to Rs. 10,000.',
    category: 'Family',
    cognizable: 'Yes',
    bailable: 'No',
    keywords: ['dowry demand', 'demanding dowry', 'dowry harassment', 'DPA Section 4'],
    relatedSections: [
      { sectionNumber: '2', actCode: 'DPA', title: 'Definition of dowry' },
      { sectionNumber: '3', actCode: 'DPA', title: 'Penalty for giving or taking dowry' },
      { sectionNumber: '498A', actCode: 'IPC', title: 'Cruelty by husband or relatives' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // Hindu Succession Act, 1956
  // ═══════════════════════════════════════════════════════════════════
  {
    act: 'Hindu Succession Act, 1956',
    actCode: 'HSA',
    sectionNumber: '6',
    title: 'Devolution of interest in coparcenary property (daughters equal rights)',
    legalText: '(1) On and from the commencement of the Hindu Succession (Amendment) Act, 2005, in a Joint Hindu family governed by the Mitakshara law, the daughter of a coparcener shall,— (a) by birth become a coparcener in her own right in the same manner as the son; (b) have the same rights in the coparcenary property as she would have had if she had been a son; (c) be subject to the same liabilities in respect of the said coparcenary property as that of a son, and any reference to a Hindu Mitakshara coparcener shall be deemed to include a reference to a daughter of a coparcener: Provided that nothing contained in this sub-section shall affect or invalidate any disposition or alienation including any partition or testamentary disposition of property which had taken place before the 20th day of December, 2004.',
    explanation: 'Following the 2005 Amendment, daughters in a Hindu joint family governed by Mitakshara law have equal coparcenary rights as sons by birth. A daughter becomes a coparcener in her own right, has the same rights and liabilities as a son in ancestral property, and can demand partition. This landmark amendment ended the centuries-old discrimination against daughters in Hindu succession law. The Supreme Court in Vineeta Sharma v. Rakesh Sharma (2020) clarified that this right applies irrespective of whether the father was alive on the date of the amendment.',
    punishment: '',
    category: 'Family',
    cognizable: 'N/A',
    bailable: 'N/A',
    keywords: ['coparcenary', 'daughter rights', 'equal rights', 'Hindu succession', 'ancestral property', 'Mitakshara', '2005 amendment', 'HSA Section 6'],
    relatedSections: [
      { sectionNumber: '8', actCode: 'HSA', title: 'General rules of succession for males' },
      { sectionNumber: '15', actCode: 'HSA', title: 'General rules of succession for females' }
    ]
  }
];

async function seedFamilyLaw() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB.\n');

    // Clear existing sections by actCode
    const actCodes = ['HMA', 'DVA', 'DPA', 'HSA'];
    for (const code of actCodes) {
      const existing = await LegalSection.countDocuments({ actCode: code });
      if (existing > 0) {
        console.log(`🗑️  Removing ${existing} existing ${code} sections...`);
        await LegalSection.deleteMany({ actCode: code });
      }
    }

    console.log(`\n📚 Seeding ${familySections.length} family law sections...\n`);

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📖 Hindu Marriage Act, 1955');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    for (const section of familySections.filter(s => s.actCode === 'HMA')) {
      await LegalSection.create(section);
      console.log(`   ✅ HMA Section ${section.sectionNumber} — ${section.title}`);
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📖 Protection of Women from Domestic Violence Act, 2005');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    for (const section of familySections.filter(s => s.actCode === 'DVA')) {
      await LegalSection.create(section);
      console.log(`   ✅ DVA Section ${section.sectionNumber} — ${section.title}`);
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📖 Dowry Prohibition Act, 1961');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    for (const section of familySections.filter(s => s.actCode === 'DPA')) {
      await LegalSection.create(section);
      console.log(`   ✅ DPA Section ${section.sectionNumber} — ${section.title}`);
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📖 Hindu Succession Act, 1956');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    for (const section of familySections.filter(s => s.actCode === 'HSA')) {
      await LegalSection.create(section);
      console.log(`   ✅ HSA Section ${section.sectionNumber} — ${section.title}`);
    }

    const totalAll = await LegalSection.countDocuments();
    console.log(`\n═══════════════════════════════════════════`);
    console.log(`🎉 FAMILY LAW SEEDING COMPLETE`);
    console.log(`═══════════════════════════════════════════`);
    console.log(`   HMA sections added:  ${familySections.filter(s => s.actCode === 'HMA').length}`);
    console.log(`   DVA sections added:  ${familySections.filter(s => s.actCode === 'DVA').length}`);
    console.log(`   DPA sections added:  ${familySections.filter(s => s.actCode === 'DPA').length}`);
    console.log(`   HSA sections added:  ${familySections.filter(s => s.actCode === 'HSA').length}`);
    console.log(`   Total DB sections:   ${totalAll}`);
    console.log(`═══════════════════════════════════════════\n`);

  } catch (error) {
    console.error('❌ Error seeding family law:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB.');
    process.exit(0);
  }
}

seedFamilyLaw();
