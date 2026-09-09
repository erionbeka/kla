import type { Bilingual } from './i18n'
import { L } from './i18n'

export type Lang = Bilingual

/* ------------------------------------------------------------------ */
/*  SCENES — the placeholder visual vocabulary                         */
/* ------------------------------------------------------------------ */

export type SceneKind =
  | 'landscape'
  | 'hills'
  | 'road'
  | 'crowd'
  | 'refugee'
  | 'ruins'
  | 'return'
  | 'city'
  | 'portrait'
  | 'memorial'
  | 'flag'
  | 'court'
  | 'fields'
  | 'house'
  | 'hands'
  | 'paper'
  | 'mic'
  | 'grid'
  | 'bonfire'
  | 'vigil'
  | 'convoi'

export interface Scene {
  kind: SceneKind
  label: Lang
  source: Lang
  placeholder?: boolean
}

export const PH = 'PLACEHOLDER' as const

/* ------------------------------------------------------------------ */
/*  INTRO                                                              */
/* ------------------------------------------------------------------ */

export const intro = {
  kicker: L('KOSOVO // ARKIV', 'KOSOVO // ARCHIVE'),
  years: ['1998', '1999', '2008', '2020', '2026'] as const,
  title: 'KATËR',
  tagline: L('Historia nuk pret.', 'History does not wait.'),
  names: L('THAÇI · VESELI · SELIMI · KRASNIQI', 'THAÇI · VESELI · SELIMI · KRASNIQI'),
  date: L('16 SHTATOR 2026', '16 SEPTEMBER 2026'),
  time: L('10:00 — HAGË', '10:00 — THE HAGUE'),
  enter: L('HYR NË ARKIV', 'ENTER THE ARCHIVE'),
  skip: L('(ose shkoni te 16 shtatori)', '(or go to 16 September)'),
}

/* ------------------------------------------------------------------ */
/*  NAV                                                                */
/* ------------------------------------------------------------------ */

export const nav = {
  items: [
    { id: 'historia', label: L('HISTORIA', 'HISTORY') },
    { id: 'rrugetimi', label: L('RRUGËTIMI', 'THE JOURNEY') },
    { id: 'kater', label: L('KATËR', 'FOUR') },
    { id: 'kujtesa', label: L('KUJTESA', 'MEMORY') },
    { id: 'haga', label: L('HAGË', 'THE HAGUE') },
  ] as { id: string; label: Lang }[],
  date: '16.09.26',
  live: L('LIVE', 'LIVE'),
  liveTag: L('DITA E VENDIMIT', 'JUDGMENT DAY'),
  dayItems: [
    { id: 'live', label: L('LIVE', 'LIVE') },
    { id: 'verdict', label: L('VENDIMI', 'THE VERDICT') },
    { id: 'kater', label: L('KATËR', 'FOUR') },
    { id: 'historia', label: L('HISTORIA', 'HISTORY') },
  ] as { id: string; label: Lang }[],
  chapters: L('KAPITUJT', 'CHAPTERS'),
  menu: L('MENU', 'MENU'),
  close: L('MBYLL', 'CLOSE'),
}

/* ------------------------------------------------------------------ */
/*  HERO                                                               */
/* ------------------------------------------------------------------ */

export const hero = {
  title: 'KATËR',
  lines: [
    L('Një luftë.', 'One war.'),
    L('Një shtet.', 'One state.'),
    L('Një ditë që po vjen.', 'One day that is coming.'),
  ],
  date: '16.09.2026',
  time: L('10:00 — HAGË', '10:00 — THE HAGUE'),
  coda: L(
    'Katër figura të UÇK-së. Katër të pandehur. Një gjyq. Një vend që pret.',
    'Four KLA figures. Four defendants. One trial. A country waiting.',
  ),
  codaShort: L(
    'Katër burra nga liria e Kosovës, para gjykatës në Hagë.',
    'Four men from Kosovo’s liberation, before a court in The Hague.',
  ),
  countdown: {
    days: L('DITË', 'DAYS'),
    hours: L('ORË', 'HOURS'),
    minutes: L('MINUTA', 'MINUTES'),
    seconds: L('SEKONDA', 'SECONDS'),
    dot: L('KALON', 'ELAPSED'),
  },
  today: L('SOT', 'TODAY'),
  verdictNote: L(
    'Gjykata e shkallës së parë lexon vendimin e saj në Hagë.',
    'The first-instance court reads its judgment in The Hague.',
  ),
  scene: (): Scene => ({
    kind: 'landscape',
    label: L('Kosovë, mëngjes', 'Kosovo, morning'),
    source: L('PLACEHOLDER · fotografi arkivore me licencë në pritje', 'PLACEHOLDER · licensed archival photograph pending'),
    placeholder: true,
  }),
  scroll: L('SHKO POSHTË', 'SCROLL'),
}

/* ------------------------------------------------------------------ */
/*  HISTORIA                                                           */
/* ------------------------------------------------------------------ */

export const history = {
  kicker: L('KAPITULLI I PARË', 'CHAPTER ONE'),
  title: L('HISTORIA', 'HISTORY'),
  subtitle: L(
    'Para se të ishin emra, ishte një histori.',
    'Before they were names, there was a story.',
  ),
  lead: L(
    'Jo gjykatë së pari. Jo as katër burra. Një vend që pësoi.',
    'Not the court first. Not even four men. A country that endured.',
  ),
  chapters: [
    {
      year: '1998',
      tag: L('LUFTA FILLON', 'THE WAR BEGINS'),
      title: L('Represioni u ashpërsua. Fshatrat u boshatisën.', 'Repression hardened. Villages emptied.'),
      text: L(
        'Armedat e para të vitit 1998 sollën dhunë në çdo fshat të Drenicës. Njerëzit u fshehën në pyje, ose morën rrugët e mërgimit.',
        'The first clashes of 1998 brought violence to every village of Drenica. People hid in the forests, or took the roads of exile.',
      ),
      scene: { kind: 'hills', label: L('Viset e Drenicës, 1998', 'The Drenica highlands, 1998'), source: L('PLACEHOLDER · krediti në pritje', 'PLACEHOLDER · credit pending'), placeholder: true } as Scene,
    },
    {
      year: '1999',
      tag: L('MËRGIMI', 'DISPLACEMENT'),
      title: L('Qindra mijëra civilë u larguan nga shtëpitë.', 'Hundreds of thousands of civilians fled their homes.'),
      text: L(
        'Dëbimet e vitit 1999 shtynë popullatën drejt kufijve. Trenat, kamionët, këmbët — një riv djersë dhe pluhur në rrugët e Shqipërisë e Maqedonisë.',
        'The expulsions of 1999 pushed the population toward the borders. Trains, trucks, feet — a river of dust and sweat on the roads into Albania and Macedonia.',
      ),
      scene: { kind: 'refugee', label: L('Refugjatë drejt kufirit, 1999', 'Refugees heading for the border, 1999'), source: L('PLACEHOLDER · krediti në pritje', 'PLACEHOLDER · credit pending'), placeholder: true } as Scene,
    },
    {
      year: '1999',
      tag: L('NDËRHYRJA', 'INTERVENTION'),
      title: L('Bota nuk mundi të mbyllte më sytë.', 'The world could no longer look away.'),
      text: L(
        'Pranvera e vitit 1999. Fushata ajrore e NATO-s, dhe më 9 qershor, marrëveshja ushtarako-teknike. Më 12 qershor, trupat hynë në Kosovë.',
        'Spring 1999. The NATO air campaign, and on 9 June the military–technical agreement. On 12 June, troops entered Kosovo.',
      ),
      scene: { kind: 'city', label: L('Prishtina, qershor 1999', 'Pristina, June 1999'), source: L('PLACEHOLDER · krediti në pritje', 'PLACEHOLDER · credit pending'), placeholder: true } as Scene,
    },
    {
      year: '1999',
      tag: L('KTHIMI', 'THE RETURN'),
      title: L('Ata u kthyen në atë që kishin lënë pas.', 'They returned to what they had left behind.'),
      text: L(
        'Shtëpitë e djegura, varret e reja, dyqanet e mbyllura. Megjithatë, muajt e parë të lirisë i kaloi një popull që rindërtonte nga gërmadhat.',
        'Burned homes, fresh graves, shuttered shops. And still — the first months of freedom were spent by a people rebuilding from the ruins.',
      ),
      scene: { kind: 'return', label: L('Kthimi në fshat, verë 1999', 'Returning to the village, summer 1999'), source: L('PLACEHOLDER · krediti në pritje', 'PLACEHOLDER · credit pending'), placeholder: true } as Scene,
    },
    {
      year: '1999–2008',
      tag: L('RIKONSTRUKTIMI', 'RECONSTRUCTION'),
      title: L('Vendi u rindërtua gur më gur.', 'The country was rebuilt stone by stone.'),
      text: L(
        'Nëntë vjet administratë ndërkombëtare. Shkollat u rilindën, rrugët u hapën, institucionet u ngritën nga zeroja. Por plagët mbetën të hapura.',
        'Nine years of international administration. Schools were reborn, roads reopened, institutions built from zero. But the wounds stayed open.',
      ),
      scene: { kind: 'ruins', label: L('Prishtina pas luftës', 'Pristina after the war'), source: L('PLACEHOLDER · krediti në pritje', 'PLACEHOLDER · credit pending'), placeholder: true } as Scene,
    },
    {
      year: '2008',
      tag: L('PAVARËSIA', 'INDEPENDENCE'),
      title: L('Kosova u shpall e pavarur.', 'Kosovo declared independence.'),
      text: L(
        '17 shkurt 2008. Lindte një shtet. Shumë e prisnin me shpresë; të tjerë me padurim. Një histori e re fillonte — por e vjetra nuk ishte mbyllur.',
        '17 February 2008. A state was born. Many awaited it with hope; others with impatience. A new history began — but the old one was not closed.',
      ),
      scene: { kind: 'flag', label: L('Prishtina, 17 shkurt 2008', 'Pristina, 17 February 2008'), source: L('PLACEHOLDER · krediti në pritje', 'PLACEHOLDER · credit pending'), placeholder: true } as Scene,
    },
  ],
}

/* ------------------------------------------------------------------ */
/*  MEMORIAL                                                           */
/* ------------------------------------------------------------------ */

export const memorial = {
  title: L('ATA QË NUK U KTHYEN', 'THOSE WHO NEVER RETURNED'),
  datasetLabel: L(
    'PLACEHOLDER · kjo shfaqje përdor emra shembuj në mënyrë të qartë. Lista përfundimtare duhet të vijë nga regjistrat e dokumentuar (p.sh., evidenca e personave të zhdukur dhe të vdekur gjatë luftës). Asnjë emër i mëposhtëm nuk duhet lexuar si fakt historik.',
    'PLACEHOLDER · this display uses clearly labelled sample names. The final list must come from documented registries (e.g., records of persons killed and missing during the war). No name below is to be read as historical fact.',
  ),
source: L(
      'Burimi i të dhënave: në pritje — libra memorialë, evidenca shtetërore dhe organizata ndërkombëtare.',
      'Data source: pending — memorial books, state records, and international organisations.',
    ),
names: [
      'Driton Gashi',
      'Valdete Krasniqi',
      'Besart Morina',
      'Luljeta Zeneli',
      'Artan Shala',
      'Mirlinda Hoxha',
      'Ylli Leka',
      'Sylë Rrustemaj',
      'Gentiana Qerimi',
      'Florim Bytyçi',
      'Ermira Kelmendi',
      'Visar Tahiri',
      'Hysen Perolli',
      'Teuta Sopi',
      'Blerim Uka',
    ],
  quote1: L(
    'Liria ka gjithmonë një çmim njerëzor.',
    'Freedom always has a human price.',
  ),
  quote2: L(
    'Kujtesa nuk është vetëm për katër emra.',
    'Memory is not only for four names.',
  ),
  quote3: L(
    'Është për mijëra histori.',
    'It is for thousands of stories.',
  ),
  frames: [
    { kind: 'ruins', label: L('Rrënojat', 'The ruins'), source: L('PLACEHOLDER', 'PLACEHOLDER'), placeholder: true } as Scene,
    { kind: 'vigil', label: L('Qirinjtë', 'The candles'), source: L('PLACEHOLDER', 'PLACEHOLDER'), placeholder: true } as Scene,
    { kind: 'bonfire', label: L('Zjarri i natës', 'Night fire'), source: L('PLACEHOLDER', 'PLACEHOLDER'), placeholder: true } as Scene,
    { kind: 'memorial', label: L('Varrezat', 'Memorial rows'), source: L('PLACEHOLDER', 'PLACEHOLDER'), placeholder: true } as Scene,
    { kind: 'convoi', label: L('Në rrugë', 'On the road'), source: L('PLACEHOLDER', 'PLACEHOLDER'), placeholder: true } as Scene,
    { kind: 'portrait', label: L('Katër figura', 'Four figures'), source: L('PLACEHOLDER', 'PLACEHOLDER'), placeholder: true } as Scene,
  ],
}

/* ------------------------------------------------------------------ */
/*  TIMELINE (RRUGËTIMI)                                               */
/* ------------------------------------------------------------------ */

export const timeline = {
  kicker: L('RRUGËTIMI', 'THE JOURNEY'),
  title: L('Nga lufta, deri te dita e vendimit.', 'From the war to the day of the judgment.'),
  note: L(
    'Vendimi i 16 shtatorit 2026 është vendim i shkallës së parë. Procedura mund të vazhdojë me apelim.',
    'The verdict on 16 September 2026 is a first-instance judgment. Proceedings may continue through appeal.',
  ),
  recent: L('Koha e fundit nga arrestimi në Hagë e deri më sot.', 'The recent time, from The Hague arrest to today.'),
  milestones: [
    {
      year: '1998',
      kicker: '1998–1999',
      title: L('LUFTA', 'THE WAR'),
      text: L(
        'Konflikti i armatosur në Kosovë, lufta për çlirim e represioni i dhunshëm.',
        'The armed conflict in Kosovo, the fight for liberation and the violent repression.',
      ),
      source: L('Historiografi; njoftime ndërkombëtare', 'Historiography; international reporting'),
      scene: { kind: 'hills', label: L('Kosovë, 1998', 'Kosovo, 1998'), source: L('PLACEHOLDER', 'PLACEHOLDER'), placeholder: true } as Scene,
    },
    {
      year: '1999',
      kicker: '1999',
      title: L('RAMBOUILLET', 'RAMBOUILLET'),
      text: L(
        'Bisedimet e paqes në Francë dështojnë; pas bombardimeve të NATOS, lufta përfundon në qershor 1999.',
        'The peace talks in France fail; after the NATO campaign, the war ends in June 1999.',
      ),
      source: L('Arkivat e Hagës deklerohen në vendimet publike', 'Archive of public court records'),
      scene: { kind: 'court', label: L('Rambouillet', 'Rambouillet'), source: L('PLACEHOLDER', 'PLACEHOLDER'), placeholder: true } as Scene,
    },
    {
      year: '2008',
      kicker: '2008',
      title: L('PAVARËSIA', 'INDEPENDENCE'),
      text: L(
        'Kosova shpallet e pavarur më 17 shkurt. Sintet e reja fillojnë punën.',
        'Kosovo declares independence on 17 February. The new institutions begin work.',
      ),
      source: L('Historiografi e Kosovës', 'Historiography of Kosovo'),
      scene: { kind: 'city', label: L('Prishtina, 2008', 'Pristina, 2008'), source: L('PLACEHOLDER', 'PLACEHOLDER'), placeholder: true } as Scene,
    },
    {
      year: '2020',
      kicker: '2020',
      title: L('HAGA', 'THE HAGUE'),
      text: L(
        'Katër raportimet e para para Dhomave të Specializuara. Aktakuza konfirmohet në nëntor 2020, të pandehurit transferohen në Hagë.',
        'The four appear for the first time before the Kosovo Specialist Chambers. The indictment is confirmed in November 2020; the defendants are transferred to The Hague.',
      ),
      source: L('KSC / spk-ks.org', 'KSC / spk-ks.org'),
      scene: { kind: 'court', label: L('Hagë, 2020', 'The Hague, 2020'), source: L('PLACEHOLDER', 'PLACEHOLDER'), placeholder: true } as Scene,
    },
    {
      year: '2023',
      kicker: '2023',
      title: L('FILLIMI I GJYKIMIT', 'TRIAL OPENS'),
      text: L(
        'Gjyqi fillon më 3 prill 2023 para trupit gjykues të KSC-së. Të katërit deklarojnë pafajësinë.',
        'The trial opens on 3 April 2023 before the KSC Trial Panel. All four plead not guilty.',
      ),
      source: L('KSC / spk-ks.org', 'KSC / spk-ks.org'),
      scene: { kind: 'court', label: L('Hagë, 2023', 'The Hague, 2023'), source: L('PLACEHOLDER', 'PLACEHOLDER'), placeholder: true } as Scene,
    },
    {
      year: '2025',
      kicker: '2025',
      title: L('PËRFUNDIMI I PROVAVE', 'END OF EVIDENCE'),
      text: L(
        'Pas viteve të marrjes së provave, palët mbajnë fjalimet përmbyllëse në 2025.',
        'After years of evidence hearings, the parties deliver closing arguments in 2025.',
      ),
      source: L('KSC / spk-ks.org', 'KSC / spk-ks.org'),
      scene: { kind: 'court', label: L('Hagë, 2025', 'The Hague, 2025'), source: L('PLACEHOLDER', 'PLACEHOLDER'), placeholder: true } as Scene,
    },
    {
      year: '2026',
      kicker: '2026',
      title: L('VENDIMI', 'THE JUDGMENT'),
      text: L(
        'Vendimi i shkallës së parë është caktuar për 16 shtator 2026, ora 10:00, në Hagë.',
        'The first-instance judgment is scheduled for 16 September 2026, 10:00, in The Hague.',
      ),
      source: L('KSC / spk-ks.org', 'KSC / spk-ks.org'),
      scene: { kind: 'flag', label: L('Hagë — Dita e vendimit', 'The Hague — judgment day'), source: L('PLACEHOLDER', 'PLACEHOLDER'), placeholder: true } as Scene,
      current: true,
    },
  ],
}

/* ------------------------------------------------------------------ */
/*  27 VITE                                                            */
/* ------------------------------------------------------------------ */

export const years27 = {
  kicker: L('RRËNJA', 'THE ROOT'),
  big: '27',
  unit: L('VITE', 'YEARS'),
  span: '1999 → 2026',
  steps: [
    { year: '1999', scene: { kind: 'refugee', label: L('1999', '1999'), source: L('PLACEHOLDER', 'PLACEHOLDER'), placeholder: true } as Scene },
    { year: '2008', scene: { kind: 'flag', label: L('2008', '2008'), source: L('PLACEHOLDER', 'PLACEHOLDER'), placeholder: true } as Scene },
    { year: '2020', scene: { kind: 'court', label: L('2020', '2020'), source: L('PLACEHOLDER', 'PLACEHOLDER'), placeholder: true } as Scene },
    { year: '2026', scene: { kind: 'landscape', label: L('2026', '2026'), source: L('PLACEHOLDER', 'PLACEHOLDER'), placeholder: true } as Scene },
  ],
  lines: [
    L('Një brez u rrit.', 'A generation grew up.'),
    L('Fëmijët u bënë prindër.', 'The children became parents.'),
    L('Koha vazhdoi.', 'Time went on.'),
  ],
}

/* ------------------------------------------------------------------ */
/*  THE FOUR                                                           */
/* ------------------------------------------------------------------ */

export type RoleKind = 'political' | 'military' | 'state'

export const four = {
  kicker: L('AKTUAKUZA', 'THE INDICTMENT'),
  title: L('KATËR', 'FOUR'),
  subtitle: L(
    'Katër burra. Një luftë. Një gjyq që bëri histori përpara vetë historisë.',
    'Four men. One war. A trial that made history even before history itself.',
  ),
  docPrefix: L('DOKUMENT', 'DOCUMENT'),
  sourceKsc: 'KSC / spk-ks.org',
  profiles: [
    {
      id: 'thaci',
      code: '001',
      name: L('HASHIM THAÇI', 'HASHIM THAÇI'),
      born: L('l. 1968 · Burojë', 'b. 1968 · Burojë'),
      role: L('Kryeministër (2008–2014) · President (2016–2020) · pjesëmarrës në udhëheqjen politike të UÇK-së', 'Prime Minister (2008–2014) · President (2016–2020) · participant in the KLA political leadership'),
      blurb: L(
        'Një nga zërat politikë më të njohur të luftës dhe pas saj. Nënshkroi në Rambouillet, udhëhoqi qeverinë gjatë viteve të konsolidimit, e më pas presidencën e Kosovës.',
        'One of the most recognisable political voices of the war and after. He signed at Rambouillet, led the government through the consolidation years, and later the presidency of Kosovo.',
      ),
      timeline: [
        { y: '1998–99', t: L('Ballafaqim i drejtpërdrejtë në luftë', 'Direct wartime engagement') },
        { y: '1999', t: L('Delegat në Rambouillet', 'Delegate at Rambouillet') },
        { y: '2008', t: L('Kryeministër i Kosovës', 'Prime Minister of Kosovo') },
        { y: '2016', t: L('President i Kosovës', 'President of Kosovo') },
        { y: '2020', t: L('Aktakuza e KSC-së · Hagë', 'KSC indictment · The Hague') },
        { y: '2023', t: L('Fillimi i gjyqit', 'Trial opens') },
      ],
      hague: L(
        'Në 2020, u padit nga KSC-ja për krime lufte dhe krime kundër njerëzimit në lidhje me rolin e tij të supozuar në udhëheqje. Ka deklaruar pafajësi.',
        'In 2020 he was indicted by the KSC on charges of war crimes and crimes against humanity relating to his alleged leadership role. He has pleaded not guilty.',
      ),
      hagueTag: L('PADITUR', 'INDICTED'),
      scene: { kind: 'portrait', label: L('Portret, arkiv', 'Portrait, archive'), source: L('PLACEHOLDER', 'PLACEHOLDER'), placeholder: true } as Scene,
    },
    {
      id: 'veseli',
      code: '002',
      name: L('KADRI VESELI', 'KADRI VESELI'),
      born: L('l. 1967 · Kosovë', 'b. 1967 · Kosovo'),
      role: L('Ish-kreu i shërbimit të informacionit të UÇK-së (SHIK) · Kryetar i Kuvendit (2014–2019) · deputet', 'Former head of the KLA intelligence service (SHIK) · Speaker of Parliament (2014–2019) · MP'),
      blurb: L(
        'Një figurë e qendrës së pushtetit pas lufte: nga shërbimi i informacionit te udhëheqja e partisë dhe e Kuvendit të Kosovës.',
        'A figure at the centre of post-war power: from the intelligence service to party leadership and the Kosovo Assembly.',
      ),
      timeline: [
        { y: '1998–99', t: L('Ballafaqim i drejtpërdrejtë në luftë dhe shërbim informacioni', 'Wartime engagement and intelligence work') },
        { y: '2008', t: L('Udhëheqës i PDK-së, deputet', 'PDK leadership, MP') },
        { y: '2014', t: L('Kryetar i Kuvendit të Kosovës', 'Speaker of the Kosovo Assembly') },
        { y: '2020', t: L('Aktakuza e KSC-së · Hagë', 'KSC indictment · The Hague') },
        { y: '2023', t: L('Fillimi i gjyqit', 'Trial opens') },
      ],
      hague: L(
        'U padit në 2020 për krime të dyshuara lufte dhe krime kundër njerëzimit në një ndërmarrje të përbashkët kriminale të pretenduar. Ka deklaruar pafajësi.',
        'Indicted in 2020 on alleged war crimes and crimes against humanity in an alleged joint criminal enterprise. He has pleaded not guilty.',
      ),
      hagueTag: L('PADITUR', 'INDICTED'),
      scene: { kind: 'portrait', label: L('Portret, arkiv', 'Portrait, archive'), source: L('PLACEHOLDER', 'PLACEHOLDER'), placeholder: true } as Scene,
    },
    {
      id: 'selimi',
      code: '003',
      name: L('REXHEP SELIMI', 'REXHEP SELIMI'),
      born: L('l. 1971 · Kosovë', 'b. 1971 · Kosovo'),
      role: L('Ish-komandant i UÇK-së · ish-zv. shef i Shtabit të Përgjithshëm · deputet', 'Former KLA commander · former deputy chief of the General Staff · MP'),
      blurb: L(
        'Nga komanda në terren e deri te një vend në parlament pas lufte. Një udhë e gjatë nga Drenica drejt gjykatës në Hagë.',
        'From field command to a seat in parliament after the war. A long road from Drenica to the courtroom in The Hague.',
      ),
      timeline: [
        { y: '1998–99', t: L('Komandant i UÇK-së, Shtabi i Përgjithshëm', 'KLA commander, General Staff') },
        { y: '1999+', t: L('Roli në shërbimin civil pas luftës', 'Post-war role in public life') },
        { y: '2008–20', t: L('Deputet i Kuvendit', 'Member of Parliament') },
        { y: '2020', t: L('Aktakuza e KSC-së · Hagë', 'KSC indictment · The Hague') },
        { y: '2023', t: L('Fillimi i gjyqit', 'Trial opens') },
      ],
      hague: L(
        'U padit në 2020 për krime të dyshuara lufte dhe krime kundër njerëzimit. Ka deklaruar pafajësi në paraqitjen e parë.',
        'Indicted in 2020 on alleged war crimes and crimes against humanity. He pleaded not guilty at his first appearance.',
      ),
      hagueTag: L('PADITUR', 'INDICTED'),
      scene: { kind: 'portrait', label: L('Portret, arkiv', 'Portrait, archive'), source: L('PLACEHOLDER', 'PLACEHOLDER'), placeholder: true } as Scene,
    },
    {
      id: 'krasniqi',
      code: '004',
      name: L('JAKUP KRASNIQI', 'JAKUP KRASNIQI'),
      born: L('l. 1951 · Negroc, Drenicë', 'b. 1951 · Negroc, Drenica'),
      role: L('Zëdhënës i UÇK-së · Kryetar i Kuvendit (2001–2007) · President në detyrë (2010–2011)', 'KLA spokesman · Speaker of Parliament (2001–2007) · Acting President (2010–2011)'),
      blurb: L(
        'Zëri publik i luftës. Para dhe pas saj ndërtoi institucione — Kuvendin, presidencën — derisa rruga e tij e çoi në Hagë.',
        'The public voice of the war. Before and after it he built institutions — the Assembly, the presidency — until his own road led to The Hague.',
      ),
      timeline: [
        { y: '1998–99', t: L('Zëdhënës politik i UÇK-së', 'KLA political spokesman') },
        { y: '2001', t: L('Kryetar i Kuvendit të Kosovës', 'Speaker of the Kosovo Assembly') },
        { y: '2010', t: L('President në detyrë', 'Acting President') },
        { y: '2020', t: L('Aktakuza e KSC-së · Hagë', 'KSC indictment · The Hague') },
        { y: '2023', t: L('Fillimi i gjyqit', 'Trial opens') },
      ],
      hague: L(
        'U padit në 2020 për krime të dyshuara lufte dhe krime kundër njerëzimit. Ka deklaruar pafajësi.',
        'Indicted in 2020 on alleged war crimes and crimes against humanity. He has pleaded not guilty.',
      ),
      hagueTag: L('PADITUR', 'INDICTED'),
      scene: { kind: 'portrait', label: L('Portret, arkiv', 'Portrait, archive'), source: L('PLACEHOLDER', 'PLACEHOLDER'), placeholder: true } as Scene,
    },
  ],
  matter: L(
    'Ne nuk i deklarojmë fajtorë as të pafajshëm. Ne tregojmë se kush janë, çfarë kanë bërë, dhe çfarë po vendos gjykata. Vendimi i takon gjykatës.',
    'We do not declare them guilty or innocent. We show who they are, what they did, and what the court is deciding. The judgment belongs to the court.',
  ),
}

/* ------------------------------------------------------------------ */
/*  HAGUE                                                              */
/* ------------------------------------------------------------------ */

export const hague = {
  kicker: L('GJYKATA', 'THE COURT'),
  title: L('HAGË', 'THE HAGUE'),
  lead: L(
    'Dhomat e Specializuara gjykojnë krimet e pretenduara të luftës 1998–1999 — në sistemin kosovar, me gjykatës ndërkombëtarë, në Hagë.',
    'The Specialist Chambers try alleged crimes of the 1998–1999 war — in the Kosovo system, with international judges, in The Hague.',
  ),
  legend: {
    allegation: L('AKUZË (E PRETENDUAR)', 'ALLEGATION (CLAIMED)'),
    fact: L('FAKT I DOKUMENTUAR', 'DOCUMENTED FACT'),
    procedure: L('PROCEDURË GJYQËSORE', 'COURT PROCEDURE'),
  },
  items: [
    {
      year: '2020',
      title: L('AKTAKUZA DHE NDALIMI', 'INDICTMENT AND DETENTION'),
      kind: 'procedure' as const,
      text: L(
        'Në nëntor 2020 gjykata konfirmoi aktakuzën dhe urdhëroi ndalimin. Të pandehurit u transferuan në Hagë dhe u paraqitën para gjykatës.',
        'In November 2020 the court confirmed the indictment and ordered detention. The defendants were transferred to The Hague and made their first appearances.',
      ),
      source: L('KSC, urdhëra publike nëntor 2020', 'KSC, public orders November 2020'),
    },
    {
      year: '2023',
      title: L('FILLIMI I GJYKIMIT', 'TRIAL OPENS'),
      kind: 'procedure' as const,
      text: L(
        'Më 3 prill 2023 trupi gjykues hapi seancat. Të katër të pandehurit deklaruan pafajësi.',
        'On 3 April 2023 the Trial Panel opened the hearings. All four defendants pleaded not guilty.',
      ),
      source: L('KSC, transkriptet e seancave', 'KSC, transcripts of hearings'),
    },
    {
      year: '2023–25',
      title: L('PROVAT', 'THE EVIDENCE'),
      kind: 'procedure' as const,
      text: L(
        'Për më shumë se dy vjet, gjykata dëgjoi dëshmitarë, akuzë dhe mbrojtje. Aktakuza pretendon ekzistencën e një ndërmarrjeje të përbashkët kriminale; mbrojtja e mohon.',
        'For more than two years the court heard witnesses for both prosecution and defence. The indictment alleges the existence of a joint criminal enterprise; the defence denies it.',
      ),
      source: L('KSC / spk-ks.org', 'KSC / spk-ks.org'),
    },
    {
      year: '2025',
      title: L('FJALIMET PËRMBYLLËSE', 'CLOSING ARGUMENTS'),
      kind: 'procedure' as const,
      text: L(
        'Pas përfundimit të provave, palët paraqitën fjalimet përmbyllëse para trupit gjykues.',
        'After the close of evidence, the parties presented their closing arguments before the Trial Panel.',
      ),
      source: L('KSC / spk-ks.org', 'KSC / spk-ks.org'),
    },
    {
      year: '2026',
      title: L('VENDIMI I SHKALLËS SË PARË', 'FIRST-INSTANCE JUDGMENT'),
      kind: 'procedure' as const,
      text: L(
        'Gjykata ka caktuar shqiptimin e vendimit të shkallës së parë për 16 shtator 2026, ora 10:00, në Hagë.',
        'The court has scheduled the delivery of the first-instance judgment for 16 September 2026, 10:00, in The Hague.',
      ),
      source: L('KSC / spk-ks.org', 'KSC / spk-ks.org'),
      current: true,
    },
  ],
  charge: L(
    'AKUZA (NË PROCES)',
    'THE CHARGE (PENDING)',
  ),
  chargeText: L(
    'Të katërt përballen me akuza për krime lufte dhe krime kundër njerëzimit sipas pretendimeve të aktakuzës. Asnjë prej pretendimeve nuk përbën fakt të vërtetuar në gjykatë derisa vendimi të shpallet.',
    'All four face charges of war crimes and crimes against humanity as alleged in the indictment. None of the allegations constitutes an established fact in court until judgment is pronounced.',
  ),
  away: L('Prej vitit 2020, ata qëndrojnë në Hagë.', 'Since 2020, they have remained in The Hague.'),
  official: L(
    'Për dokumentet zyrtare: spk-ks.org',
    'For official records: spk-ks.org',
  ),
}

/* ------------------------------------------------------------------ */
/*  WAITING                                                            */
/* ------------------------------------------------------------------ */

export const waiting = {
  mark: 'HAGË',
  title: L('PRITJE', 'THE WAIT'),
  sub: L('Asgjë tjetër. Vetëm ditët.', 'Nothing else. Only the days.'),
  dayBefore: L('15 SHTATOR 2026', '15 SEPTEMBER 2026'),
  dayOf: L('16 SHTATOR 2026', '16 SEPTEMBER 2026'),
  time: L('10:00', '10:00'),
  place: L('HAGË', 'THE HAGUE'),
  now: L('Vendimi po lexohet.', 'The judgment is being read.'),
  faintScenes: [
    { kind: 'landscape', label: L('Kosovë', 'Kosovo'), source: L('PLACEHOLDER', 'PLACEHOLDER'), placeholder: true } as Scene,
    { kind: 'memorial', label: L('Varreza', 'Cemetery'), source: L('PLACEHOLDER', 'PLACEHOLDER'), placeholder: true } as Scene,
    { kind: 'city', label: L('Rrugët e Prishtinës', 'The streets of Pristina'), source: L('PLACEHOLDER', 'PLACEHOLDER'), placeholder: true } as Scene,
    { kind: 'flag', label: L('Flamuri', 'The flag'), source: L('PLACEHOLDER', 'PLACEHOLDER'), placeholder: true } as Scene,
    { kind: 'portrait', label: L('Katër figura', 'Four figures'), source: L('PLACEHOLDER', 'PLACEHOLDER'), placeholder: true } as Scene,
    { kind: 'house', label: L('Familje', 'Families'), source: L('PLACEHOLDER', 'PLACEHOLDER'), placeholder: true } as Scene,
  ],
}

/* ------------------------------------------------------------------ */
/*  VERDICT                                                            */
/* ------------------------------------------------------------------ */

export const verdict = {
  title: L('VENDIMI', 'THE VERDICT'),
  day: '16.09.2026',
  time: L('10:00 — HAGË', '10:00 — THE HAGUE'),
  waiting: L('DUKE PRITUR', 'AWAITING'),
  status: L(
    'Ky vend do të plotësohet ekskluzivisht me informacion zyrtar të verifikuar. Asnjë rrjedhje, postim në rrjete sociale apo thashetheme nuk do të shfaqet këtu.',
    'This slot will be filled exclusively with verified official information. No leaks, social posts, or rumours will appear here.',
  ),
  phase1: L('Vendimi i shkallës së parë po shpallet.', 'The first-instance judgment is being delivered.'),
  phase2: L('Procedurat e apelit mund të vazhdojnë pas kësaj.', 'Appeal proceedings may follow.'),
  official: L('Referojuni burimeve zyrtare të KSC-së →', 'Refer to the official KSC sources →'),
  kscUrl: 'https://www.scp-ks.org',
}

/* ------------------------------------------------------------------ */
/*  CLOSING                                                            */
/* ------------------------------------------------------------------ */

export const closing = {
  question: L('ÇFARË MBETET?', 'WHAT REMAINS?'),
  words: [L('KUJTESA.', 'MEMORY.'), L('DREJTËSIA.', 'JUSTICE.'), L('HISTORIA.', 'HISTORY.')],
  line1: L('Një vendim nuk e fshin historinë.', 'A judgment does not erase history.'),
  line2: L('Por historia do ta kujtojë këtë ditë.', 'But history will remember this day.'),
  final: 'KATËR',
  finalTag: L('Historia nuk pret.', 'History does not wait.'),
}

/* ------------------------------------------------------------------ */
/*  ARCHIVE                                                            */
/* ------------------------------------------------------------------ */

export type ArchiveCategory = 'FOTOGRAFI' | 'DOKUMENTE' | 'FJALIME' | 'KRONOLOGJI' | 'HAGA'

export interface ArchiveItem {
  id: string
  cat: ArchiveCategory
  title: Lang
  date: Lang
  loc: Lang
  source: Lang
  desc: Lang
  scene: Scene
  kind: 'image' | 'document' | 'audio'
  media?: { url: string; isVideo: boolean }
}

export const archive = {
  kicker: L('LIRIA E HULUMTIMIT', 'FREEDOM TO EXPLORE'),
  title: L('ARKIVI', 'THE ARCHIVE'),
  lead: L(
    'Materialet e këtij seksioni janë shembuj arkivë dorëshkrimorë për strukturën. Çdo riprodhim përfundimtar duhet të vijë nga burime të licensuara, me kredite të plota.',
    'The materials in this section are sample entries that establish the archive structure. Final reproductions must come from licensed sources with full credits.',
  ),
  cats: ['FOTOGRAFI', 'DOKUMENTE', 'FJALIME', 'KRONOLOGJI', 'HAGA'] as ArchiveCategory[],
  procured: L('materiale autentike', 'authentic materials'),
  catLabels: {
    FOTOGRAFI: L('FOTOGRAFI', 'PHOTOGRAPHY'),
    DOKUMENTE: L('DOKUMENTE', 'DOCUMENTS'),
    FJALIME: L('FJALIME', 'SPEECHES'),
    KRONOLOGJI: L('KRONOLOGJI', 'CHRONOLOGY'),
    HAGA: L('HAGA', 'THE HAGUE'),
  },
  items: [
    {
      id: 'a1',
      cat: 'FOTOGRAFI',
      title: L('Mëngjes në luginë — Skenderaj', 'Morning in the valley — Skenderaj'),
      date: L('1998', '1998'),
      loc: L('Drenicë, Kosovë', 'Drenica, Kosovo'),
      source: L('PLACEHOLDER · krediti i fotografisë në pritje', 'PLACEHOLDER · photo credit pending'),
      desc: L('Shembull i një figure arkivore. Këtu duhet të qëndrojë një fotografi e licensuar me kreditet e autorit.', 'Sample archival figure. A licensed photograph with full photo credits should sit here.'),
      scene: { kind: 'landscape', label: L('Skenderaj', 'Skenderaj'), source: L('PLACEHOLDER', 'PLACEHOLDER'), placeholder: true } as Scene,
      kind: 'image',
    },
    {
      id: 'a2',
      cat: 'DOKUMENTE',
      title: L('Urdhër ushtarak, shembull i formatit', 'Military order, format sample'),
      date: L('1999', '1999'),
      loc: L('N.A.', 'N/A'),
      source: L('PLACEHOLDER · arkivi i dokumentit në pritje', 'PLACEHOLDER · document credit pending'),
      desc: L('Dokument shembull për finalizimin me një dokument historik të vërtetë, të burimit të duhur.', 'Sample document, to be finalised with a genuine historical document of correct provenance.'),
      scene: { kind: 'paper', label: L('Faqe dokumenti', 'Document page'), source: L('PLACEHOLDER', 'PLACEHOLDER'), placeholder: true } as Scene,
      kind: 'document',
    },
    {
      id: 'a3',
      cat: 'FJALIME',
      title: L('Adresë publike, fragment (shembull)', 'Public address, fragment (sample)'),
      date: L('1999', '1999'),
      loc: L('Prishtinë, Kosovë', 'Pristina, Kosovo'),
      source: L('PLACEHOLDER · transkripti në pritje', 'PLACEHOLDER · transcript pending'),
      desc: L('Fragment fjalimi për strukturën audio/tekstore. Zëvendësohet me transkript të licensuar.', 'Speech fragment for the audio/text structure. To be replaced with a licensed transcript.'),
      scene: { kind: 'mic', label: L('Transkript', 'Transcript'), source: L('PLACEHOLDER', 'PLACEHOLDER'), placeholder: true } as Scene,
      kind: 'audio',
    },
    {
      id: 'a4',
      cat: 'KRONOLOGJI',
      title: L('Kronologjia e luftës 1998–1999, tabelë (shembull)', 'War chronology 1998–1999, table (sample)'),
      date: L('1998 – 1999', '1998 – 1999'),
      loc: L('Kosovë', 'Kosovo'),
      source: L('PLACEHOLDER · burimi i tabelës në pritje', 'PLACEHOLDER · table source pending'),
      desc: L('Shembull i faqes kronologjike. Plotësohet me datat e verifikuara nga historiografia.', 'Sample chronology page. To be filled with dates verified by historiography.'),
      scene: { kind: 'grid', label: L('Kronologji', 'Chronology'), source: L('PLACEHOLDER', 'PLACEHOLDER'), placeholder: true } as Scene,
      kind: 'document',
    },
    {
      id: 'a5',
      cat: 'HAGA',
      title: L('Seanca në Hagë, shënim (shembull)', 'Hearing in The Hague, note (sample)'),
      date: L('2023', '2023'),
      loc: L('Hagë, Holandë', 'The Hague, Netherlands'),
      source: L('KSC / spk-ks.org', 'KSC / spk-ks.org'),
      desc: L('Foto zyrtare apo shënim nga seancat e KSC-së, aty ku ligji e lejon rishikimin publik.', 'Official photo or note from KSC hearings, where law permits public review.'),
      scene: { kind: 'court', label: L('Salla e gjyqit', 'Courtroom'), source: L('PLACEHOLDER', 'PLACEHOLDER'), placeholder: true } as Scene,
      kind: 'image',
    },
    {
      id: 'a6',
      cat: 'FOTOGRAFI',
      title: L('Rruga e mërgimit', 'The road of exile'),
      date: L('1999', '1999'),
      loc: L('Kufiri shqiptar', 'The Albanian border'),
      source: L('PLACEHOLDER · krediti në pritje', 'PLACEHOLDER · credit pending'),
      desc: L('Shembull figure arkivore mbi mërgimin e vitit 1999.', 'Sample archival figure on the 1999 displacement.'),
      scene: { kind: 'refugee', label: L('Mërgimi', 'Exile'), source: L('PLACEHOLDER', 'PLACEHOLDER'), placeholder: true } as Scene,
      kind: 'image',
    },
    {
      id: 'a7',
      cat: 'KRONOLOGJI',
      title: L('Rrugëtimi gjyqësor, vitet e procesit', 'The judicial journey, the trial years'),
      date: L('2020 – 2026', '2020 – 2026'),
      loc: L('Hagë, Holandë', 'The Hague, Netherlands'),
      source: L('KSC / spk-ks.org', 'KSC / spk-ks.org'),
      desc: L('Rreshti kohor i procedurës së KSC-së nga aktakuza e deri te vendimi i shkallës së parë.', 'Timeline of the KSC procedure from indictment to the first-instance judgment.'),
      scene: { kind: 'grid', label: L('Procesi', 'The process'), source: L('PLACEHOLDER', 'PLACEHOLDER'), placeholder: true } as Scene,
      kind: 'document',
    },
    {
      id: 'a8',
      cat: 'FJALIME',
      title: L('Fjalimet përmbyllëse, fragmente (shembull)', 'Closing arguments, fragments (sample)'),
      date: L('2025', '2025'),
      loc: L('Hagë, Holandë', 'The Hague, Netherlands'),
      source: L('KSC / spk-ks.org', 'KSC / spk-ks.org'),
      desc: L('Fragmentet e fjalimeve do të aktualizohen nga transkriptet zyrtare të seancave.', 'Speech fragments will be updated from official hearing transcripts.'),
      scene: { kind: 'mic', label: L('Seanca', 'Hearing'), source: L('PLACEHOLDER', 'PLACEHOLDER'), placeholder: true } as Scene,
      kind: 'audio',
    },
  ] as ArchiveItem[],
}

/* ------------------------------------------------------------------ */
/*  FOOTER                                                             */
/* ------------------------------------------------------------------ */

export const footer = {
  backTop: L('NË FILLIM', 'TO THE TOP'),
  disclaimer: L(
    'KATËR është një projekt i pavarur historik dhe dokumentues. Nuk përfaqëson Dhomat e Specializuara të Kosovës, Qeverinë e Kosovës, asnjë subjekt politik apo organizatë tjetër.',
    'KATËR is an independent historical and documentary project. It does not represent the Kosovo Specialist Chambers, the Government of Kosovo, any political entity, or any other organisation.',
  ),
  disclaimer2: L(
    'Për informacion juridik dhe vendimin zyrtar, referojuni burimeve zyrtare të Dhomave të Specializuara të Kosovës.',
    'For legal information and the official judgment, refer to the official sources of the Kosovo Specialist Chambers.',
  ),
  sound: L('SOUND', 'SOUND'),
  on: L('ON', 'ON'),
  off: L('OFF', 'OFF'),
  langLabel: L('GJUHA', 'LANGUAGE'),
  built: L('ARKIV DIXHITAL · 2026', 'DIGITAL ARCHIVE · 2026'),
}