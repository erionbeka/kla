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
  title: 'Liria ka emër',
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
    { id: 'live', label: L('LIVE', 'LIVE') },
    { id: 'historia', label: L('HISTORIA', 'HISTORY') },
    { id: 'rrugetimi', label: L('PROCESI', 'THE PROCESS') },
    { id: 'kater', label: L('KATËR', 'FOUR') },
    { id: 'kujtesa', label: L('KUJTESA', 'MEMORY') },
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
  title: 'Liria ka emër',
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
  lead: '',
  chapters: [
    {
      year: '1981',
      tag: L('MARSI', 'MARCH'),
      title: L('Studentët dolën në rrugë.', 'The students took to the streets.'),
      text: L(
        'Demonstratat e marsit 1981 mbushën rrugët e Prishtinës dhe më gjerë. Kërkesa nuk ishte më e heshtur: republikë e barabartë brenda federatës.',
        'The demonstrations of March 1981 filled the streets of Pristina and beyond. The demand was no longer whispered: an equal republic within the federation.',
      ),
      scene: { kind: 'crowd', label: L('Prishtina, mars 1981', 'Pristina, March 1981'), source: L('PLACEHOLDER · krediti në pritje', 'PLACEHOLDER · credit pending'), placeholder: true } as Scene,
    },
    {
      year: '1989–90',
      tag: L('HEQJA E AUTONOMISË', 'THE REVOCATION'),
      title: L('Autonomia u hoq me nënshkrim të detyruar.', 'Autonomy was revoked under pressure.'),
      text: L(
        'Më 1989 Kosova humbi autonominë brenda Jugosllavisë, në një seancë që shumë e quajtën të detyruar. Represioni u rikthye mbi institucionet, e pastaj mbi jetët.',
        'In 1989 Kosovo lost its autonomy within Yugoslavia, in a session many called coerced. Repression returned over institutions, then over lives.',
      ),
      scene: { kind: 'city', label: L('Prishtina, 1989', 'Pristina, 1989'), source: L('PLACEHOLDER · krediti në pritje', 'PLACEHOLDER · credit pending'), placeholder: true } as Scene,
    },
    {
      year: '1990',
      tag: L('KUSHTETUTA E KAÇANIKUT', 'THE KAÇANIK CONSTITUTION'),
      title: L('Kosova u shpall republikë — pa pushkë.', 'Kosovo declared itself a republic — without rifles.'),
      text: L(
        'Në korrik 1990 deputetët e Kuvendit të Kosovës shpallën pavarësinë në fshehtësi, pastaj hartuan një kushtetutë në Kaçanik. Një shtet që nisi me shkolla e me libra.',
        'In July 1990 Kosovo’s deputies declared independence in secret, then drafted a constitution at Kaçanik. A state that began with schools and with books.',
      ),
      scene: { kind: 'paper', label: L('Kaçanik, 1990', 'Kaçanik, 1990'), source: L('PLACEHOLDER · krediti në pritje', 'PLACEHOLDER · credit pending'), placeholder: true } as Scene,
    },
    {
      year: '1991',
      tag: L('REFERENDUMI', 'THE REFERENDUM'),
      title: L('Populli u pyet, derë më derë.', 'The people were asked, door to door.'),
      text: L(
        'Në shtator 1991, brenda sistemit paralel, u bë referendumi për sovranitet. Shteti i padukshëm po merrte një mend: të tijët.',
        'In September 1991, inside the parallel system, a referendum on sovereignty was held. The invisible state was finding its voice: its own people.',
      ),
      scene: { kind: 'house', label: L('Fshati kosovar, 1991', 'A Kosovo village, 1991'), source: L('PLACEHOLDER · krediti në pritje', 'PLACEHOLDER · credit pending'), placeholder: true } as Scene,
    },
    {
      year: '1992–95',
      tag: L('SHKOLLAT PARALELE', 'THE PARALLEL SCHOOLS'),
      title: L('Mësimi u mbajt në bodrume.', 'Lessons were held in basements.'),
      text: L(
        'Kur arsimi shqip u ndalua, mësuesit e profesorët e zhvendosën atë në shtëpi e konvikte. Mijëra vetë punuan pa rrogë, sepse kjo ishte e vetmja rrugë drejt ditës tjetër.',
        'When Albanian-language education was shut down, teachers and professors moved it into homes and hostels. Thousands worked unpaid, because it was the only road to the next day.',
      ),
      scene: { kind: 'grid', label: L('Shtëpitë e mësimit', 'The houses of learning'), source: L('PLACEHOLDER · krediti në pritje', 'PLACEHOLDER · credit pending'), placeholder: true } as Scene,
    },
    {
      year: '1995',
      tag: L('DEJTONI', 'DAYTON'),
      title: L('Marrëveshja nuk e përmendi Kosovën.', 'The agreement never mentioned Kosovo.'),
      text: L(
        'Dejtoni i vitit 1995 e mbylli luftën në Bosnjë, por Kosova mbeti jashtë tryezës. Pyetja që përndiqte çdo shtëpi: sa më shumë mund të presë një popull?',
        'Dayton in 1995 ended the war in Bosnia, but Kosovo was left off the table. The question haunting every household: how much longer can a people wait?',
      ),
      scene: { kind: 'city', label: L('Buzë tryezës', 'At the edge of the table'), source: L('PLACEHOLDER · krediti në pritje', 'PLACEHOLDER · credit pending'), placeholder: true } as Scene,
    },
    {
      year: '1996–97',
      tag: L('SHFAQJA E PARË', 'FIRST APPEARANCE'),
      title: L('UÇK-ja doli para botës.', 'The KLA stepped into the open.'),
      text: L(
        'Në vjeshtën e 1997, në një homazh në Llap, u shfaqën burra me uniforma dhe me armë. Fillimisht pati tallje e dyshim; së shpejti nuk qeshnin më.',
        'In autumn 1997, at a remembrance in the Llap region, armed men in uniform appeared in public. At first there was mockery and doubt; soon, no one laughed.',
      ),
      scene: { kind: 'flag', label: L('Llap, 1997', 'The Llap region, 1997'), source: L('PLACEHOLDER · krediti në pritje', 'PLACEHOLDER · credit pending'), placeholder: true } as Scene,
    },
    {
      year: 'FEBRUAR 1998',
      tag: L('DRENICA', 'DRENICA'),
      title: L('Fshatrat e Drenicës u rrethuan.', 'The villages of Drenica were besieged.'),
      text: L(
        'Operacionet e para të mëdha u përqendruan mbi Drenicën. Fshatra të tëra u boshatisën brenda javëve; familjet u fshehën në pyje e në bodrume.',
        'The first major operations concentrated on Drenica. Whole villages emptied within weeks; families hid in forests and cellars.',
      ),
      scene: { kind: 'hills', label: L('Viset e Drenicës, 1998', 'The Drenica highlands, 1998'), source: L('PLACEHOLDER · krediti në pritje', 'PLACEHOLDER · credit pending'), placeholder: true } as Scene,
    },
    {
      year: '5 MARS 1998',
      tag: L('PREKAZI', 'PREKAZ'),
      title: L('Familja Jashari u vra atë natë.', 'The Jashari family was killed that night.'),
      text: L(
        'Në Prekaz, Adem Jashari — një nga zërat e parë të rezistencës — u vra së bashku me dhjetëra të familjes, gra e fëmijë mes tyre. Dita u bë shenjë e luftës.',
        'At Prekaz, Adem Jashari — one of the first voices of resistance — was killed with dozens of his family, women and children among them. That day became a sign of the war.',
      ),
      scene: { kind: 'house', label: L('Prekaz, mars 1998', 'Prekaz, March 1998'), source: L('PLACEHOLDER · krediti në pritje', 'PLACEHOLDER · credit pending'), placeholder: true } as Scene,
    },
    {
      year: '1998',
      tag: L('LUFTË', 'WAR'),
      title: L('Lufta u përhap si zjarr.', 'The war spread like fire.'),
      text: L(
        'Nga pranvera e 1998 frontet u ngritën në tërë Kosovën — në Rahovec e Llapushnik, në kodra e në buzë të rrugëve. Vendbanime të tëra u goditën nga artileria.',
        'From spring 1998 front lines rose across Kosovo — at Rahovec and Llapushnik, in the hills and beside the roads. Entire settlements were hit by artillery.',
      ),
      scene: { kind: 'ruins', label: L('Kosovë, verë 1998', 'Kosovo, summer 1998'), source: L('PLACEHOLDER · krediti në pritje', 'PLACEHOLDER · credit pending'), placeholder: true } as Scene,
    },
    {
      year: '15 JANAR 1999',
      tag: L('REÇAKU', 'RACAK'),
      title: L('Reçaku nuk do të heshtë më.', 'Recak will not be silent again.'),
      text: L(
        'Në fshatin Reçak u gjetën 45 civilë të vrarë, sipas raportimeve të vëzhguesve ndërkombëtarë. Pamjet e asaj dite e riformuan politikën e jashtme ndaj Kosovës.',
        'In the village of Recak, 45 civilians were found killed, according to international observers’ reports. The images of that day reshaped foreign policy toward Kosovo.',
      ),
      scene: { kind: 'memorial', label: L('Reçak, janar 1999', 'Recak, January 1999'), source: L('PLACEHOLDER · krediti në pritje', 'PLACEHOLDER · credit pending'), placeholder: true } as Scene,
    },
    {
      year: 'MARS–QERSHOR 1999',
      tag: L('MËRGIMI', 'THE EXODUS'),
      title: L('Qindra mijëra u dëbuan.', 'Hundreds of thousands were expelled.'),
      text: L(
        'Civilët u dëbuan me tren, me kamionë e në këmbë. Rreth 850 mijë njerëz kaluan kufijtë — sipas vlerësimeve ndërkombëtare të asaj kohe — duke lënë pas shtëpitë e zjarrta.',
        'Civilians were expelled by train, by truck and on foot. Around 850,000 people crossed the borders — by contemporary international estimates — leaving burning homes behind.',
      ),
      scene: { kind: 'refugee', label: L('Rruga e mërgimit, 1999', 'The road of exile, 1999'), source: L('PLACEHOLDER · krediti në pritje', 'PLACEHOLDER · credit pending'), placeholder: true } as Scene,
    },
    {
      year: 'MAJ 1999',
      tag: L('INTELEKTUALËT', 'THE INTELLECTUALS'),
      title: L('Edhe mendjet u shënjestruan.', 'Even minds were targeted.'),
      text: L(
        'Profesori Fehmi Agani, një nga zërat akademikë të paqes, u vra gjatë dëbimit të dhunshëm të tij e të shumë intelektualëve të tjerë. Kosova humbi jo vetëm shtëpi, por edhe biblioteka.',
        'Professor Fehmi Agani, one of the academic voices of peace, was killed during the violent expulsion of himself and many other intellectuals. Kosovo lost not only homes, but whole libraries.',
      ),
      scene: { kind: 'paper', label: L('Prishtinë, maj 1999', 'Pristina, May 1999'), source: L('PLACEHOLDER · krediti në pritje', 'PLACEHOLDER · credit pending'), placeholder: true } as Scene,
    },
    {
      year: '24 MARS – 10 QERSHOR',
      tag: L('FUSHATA AJRORE', 'THE AIR CAMPAIGN'),
      title: L('Bota ndërhyri përfundimisht.', 'The world finally intervened.'),
      text: L(
        'Më 24 mars 1999 filloi fushata ajrore e NATO-s. Më 9 qershor u nënshkrua marrëveshja ushtarako-teknike; më 12 qershor forcat ndërkombëtare hynë në Kosovë.',
        'On 24 March 1999 the NATO air campaign began. On 9 June the military–technical agreement was signed; on 12 June international forces entered Kosovo.',
      ),
      scene: { kind: 'city', label: L('Prishtina, qershor 1999', 'Pristina, June 1999'), source: L('PLACEHOLDER · krediti në pritje', 'PLACEHOLDER · credit pending'), placeholder: true } as Scene,
    },
    {
      year: '1999–2000',
      tag: L('PLAGËT', 'THE WOUNDS'),
      title: L('Liria erdhi. Dëshmia nuk mbaroi.', 'Freedom came. Grief did not end.'),
      text: L(
        'Varre masive u gërmuan, personat e zhdukur u numëruan me dhjetëra qindra. Vlerësimet e dokumentuara i ngrenë të vrarët në rreth 13 mijë — shumica civilë.',
        'Mass graves were excavated, the missing numbered in the hundreds. Documented estimates place the dead at around 13,000 — most of them civilians.',
      ),
      scene: { kind: 'vigil', label: L('Qirinjtë, 1999–2000', 'The candles, 1999–2000'), source: L('PLACEHOLDER · krediti në pritje', 'PLACEHOLDER · credit pending'), placeholder: true } as Scene,
    },
    {
      year: '17 SHKURT 2008',
      tag: L('PAVARËSIA', 'INDEPENDENCE'),
      title: L('Kosova u shpall e pavarur.', 'Kosovo declared independence.'),
      text: L(
        '17 shkurt 2008. Lindte një shtet — shumë e prisnin me shpresë, të tjerë me padurim. Një histori e re fillonte, por e vjetra nuk ishte mbyllur ende.',
        '17 February 2008. A state was born — many awaited it with hope, others with impatience. A new history began, but the old one was not yet closed.',
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
  kicker: L('PROCESI', 'THE PROCESS'),
  title: L('Nga aktakuza, deri te dita e vendimit.', 'From the indictment to the day of the judgment.'),
  note: L(
    'Vendimi i 16 shtatorit 2026 është vendim i shkallës së parë. Procedura mund të vazhdojë me apelim.',
    'The verdict on 16 September 2026 is a first-instance judgment. Proceedings may continue through appeal.',
  ),
  recent: L('Procedura e Dhomave të Specializuara, vitet e procesit.', 'The Specialist Chambers procedure, the years of the process.'),
  milestones: [
    {
      year: '2020',
      kicker: '2020',
      title: L('AKTAKUZA', 'THE INDICTMENT'),
      text: L(
        'Katër të pandehurit paraqiten për herë të parë para KSC-së. Aktakuza konfirmohet në nëntor 2020; të pandehurit transferohen në Hagë.',
        'The four defendants appear for the first time before the KSC. The indictment is confirmed in November 2020; the defendants are transferred to The Hague.',
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
  caption: L('Rrënja — njëzet e shtatë vjet prej vitit 1999.', 'The root — twenty-seven years since 1999.'),
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
}

/* ------------------------------------------------------------------ */
/*  HAGUE                                                              */
/* ------------------------------------------------------------------ */

export const hague = {
  kicker: L('GJYKATA', 'THE COURT'),
  title: L('HAGË', 'THE HAGUE'),
  lead: L(
    'Dhomat e Specializuara gjykojnë krimet e pretenduara të viteve 1998–1999 — në sistemin kosovar, me gjykatës ndërkombëtarë, në Hagë. Drejtësia ka rregullat e veta; ka edhe pyetjet e veta.',
    'The Specialist Chambers try alleged crimes of the 1998–1999 war — in the Kosovo system, with international judges, in The Hague. Justice has its own rules; it also has its own questions.',
  ),
  legend: {
    fact: L('FAKT I DOKUMENTUAR', 'DOCUMENTED FACT'),
    concern: L('PYETJE E NGULUR', 'LIVED QUESTION'),
    procedure: L('PROCEDURË', 'PROCEDURE'),
  },
  concerns: [
    {
      year: 'JURIDIKSIONI',
      kind: 'fact' as const,
      title: L('Mandati i kufizuar', 'The limited mandate'),
      text: L(
        'KSC-ja heton vetëm krimet e pretenduara të ish-anëtarëve të UÇK-së. Pretendimet për krime kundër civilëve të Kosovës gjatë viteve 1998–1999 nuk janë pjesë e këtij procesi.',
        'The KSC investigates only the alleged crimes of former KLA members. Claims of crimes against Kosovo\'s civilians during 1998–1999 are not part of this process.',
      ),
      source: L('KSC · spk-ks.org', 'KSC · spk-ks.org'),
    },
    {
      year: '2011',
      kind: 'fact' as const,
      title: L('Origjina e procesit', 'The origin of the process'),
      text: L(
        'Procesi nisi pas raportit të Dick Marty-t për Këshillin e Evropës (2011). Aktakuza e konfirmuar në 2020 nuk përfshin pretendimet për trafikim organesh — për të cilat SITF-ja deklaroi në 2016 se nuk kishte prova të besueshme.',
        'The process began after Dick Marty\'s report to the Council of Europe (2011). The indictment confirmed in 2020 does not include the organ-trafficking claims — about which the SITF said in 2016 there was no credible evidence.',
      ),
      source: L('PACE 2011; SITF 2016', 'PACE 2011; SITF 2016'),
    },
    {
      year: '2020–26',
      kind: 'concern' as const,
      title: L('Gjashtë vjet në Hagë', 'Six years in The Hague'),
      text: L(
        'Të katërt janë në paraburgim që nga nëntori 2020. Pritja e gjashtë viteve, pa një vendim përfundimtar, mbetet një nga pyetjet më të dhimbshme të këtij procesi.',
        'All four have been in detention since November 2020. Six years of waiting, without a final judgment, remains one of the most painful questions of this process.',
      ),
      source: L('KSC, urdhëra publike', 'KSC, public orders'),
    },
    {
      year: 'SEANCAT',
      kind: 'concern' as const,
      title: L('Dëshmitarët nën presion', 'Witnesses under pressure'),
      text: L(
        'Vetë dhomat e kanë ngritur si shqetësim çështjen e presionit dhe të ndikimit mbi dëshmitarët — një pikë që prek besueshmërinë e tërë procedurës.',
        'The chambers themselves have raised as a concern the issue of pressure and influence over witnesses — a point that touches the credibility of the whole procedure.',
      ),
      source: L('KSC, urdhëra të seancave', 'KSC, hearing orders'),
    },
    {
      year: 'OPINIONI',
      kind: 'concern' as const,
      title: L('Si e sheh Kosova', 'How Kosovo sees it'),
      text: L(
        'Për një pjesë të madhe të opinionit në Kosovë, gjykata shihet si e imponuar nga bashkësia ndërkombëtare, jo si rezultat i një vullneti lokal. Mospajtimi është pjesë e historisë së saj.',
        'For a large part of public opinion in Kosovo, the court is seen as imposed by the international community rather than as the result of local will. That disagreement is part of its history.',
      ),
      source: L('Opinione publike; shtypi', 'Public opinion; the press'),
    },
    {
      year: '16 SHTATOR',
      kind: 'procedure' as const,
      title: L('Vendimi i shkallës së parë', 'First-instance judgment'),
      text: L(
        'Vendimi i shkallës së parë shpallet më 16 shtator 2026, ora 10:00, në Hagë. Procedurat e apelit mund të vazhdojnë pas tij.',
        'The first-instance judgment is delivered on 16 September 2026, 10:00, in The Hague. Appeal proceedings may continue after it.',
      ),
      source: L('KSC / spk-ks.org', 'KSC / spk-ks.org'),
      current: true,
    },
  ],
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
  final: 'LIRIA',
  finalTag: L('Historia nuk pret.', 'History does not wait.'),
  pains: [
    L(
      'Për çdo të vrarë, ka një nënë që ende gjen një arsye për të dalë në dritë.',
      'For every one killed, there is a mother who still finds a reason to step into the light.',
    ),
    L(
      'Ka ditë që nuk i mbyll asnjë vendim. Ka vende që s\'i mbylt kurrë gjyq.',
      'Some days no verdict closes. Some graves no court ever closes.',
    ),
    L(
      'Kjo nuk është histori. Është muaji i kaluar në shtëpi të ndryshme të mijëra njerëzve.',
      'This is not history. It is the past month lived in the different homes of thousands of people.',
    ),
  ],
  numbers: [
    { n: '13,000', label: L('të vrarë — sipas vlerësimeve të dokumentuara', 'killed — per documented estimates') },
    { n: '850,000', label: L('të dëbuar — vlerësime ndërkombëtare të kohës', 'displaced — international estimates of the time') },
    { n: '1,600', label: L('të pagjetur — ende të pazgjidhur', 'missing — still unresolved') },
    { n: 'dhjetra', label: L('varre masive të hapura', 'mass graves exhumed') },
  ],
  note: L(
    'Numrat sipër janë vlerësime të dokumentuara nga organizata kredibile të kohës; nuk zëvendësojnë asnjë burim zyrtar, por mbajnë gjallë shkallën e asaj çfarë ndodhi.',
    'The figures above are documented estimates from credible organisations of the time; they do not replace any official source, but keep alive the scale of what happened.',
  ),
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
    'Liria ka emër është një projekt i pavarur historik dhe dokumentues. Nuk përfaqëson Dhomat e Specializuara të Kosovës, Qeverinë e Kosovës, asnjë subjekt politik apo organizatë tjetër.',
    'Liria ka emër is an independent historical and documentary project. It does not represent the Kosovo Specialist Chambers, the Government of Kosovo, any political entity, or any other organisation.',
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