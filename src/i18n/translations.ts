export type Locale = "fr" | "ar" | "en" | "de";

export const LOCALES: Locale[] = ["fr", "ar", "en", "de"];

export const LOCALE_NAMES: Record<Locale, string> = {
  fr: "FR",
  ar: "عربي",
  en: "EN",
  de: "DE",
};

export type ProgrammeEntry = {
  code: string;
  n: string;
  title: string;
  subtitle: string;
  description: string;
  hours: string;
  price: string;
  priceShort: string;
  value: number;
  family: "langues" | "bac";
};

export type BookingContext = {
  module?: string;
  day: string;
  time: string;
  availability?: string;
};

export type Dict = {
  brand: {
    name: string; mark: string; arabic: string; eyebrow: string; address: string;
    hours: string; hoursNote: string; phone: string; phoneHref: string;
    whatsapp: string; footer: string; footerAddress: string;
  };
  hero: { title: [string, string]; subtitle: string; primary: string; secondary: string };
  metrics: { value: string; suffix?: string; label: string; note: string }[];
  ticker: string;
  tabs: { all: string; langues: string; bac: string };
  families: { n: string; title: string; body: string; codes: string }[];
  programmes: ProgrammeEntry[];
  diagnostic: { eyebrow: string; title: string; body: string; cta: string };
  orientation: {
    eyebrow: string; recommendation: string; otherOptions: string;
    steps: [string, string, string];
    objectives: string[]; levels: string[]; availabilities: string[];
  };
  certifications: string[];
  method: {
    eyebrow: string; title: string; body: string;
    steps: { n: string; title: string; body: string; note: string }[];
  };
  photos: {
    label: string; title: string; body: string; note: string;
    items: { src: string; alt: string; caption: string }[];
  };
  tariffs: {
    label: string; title: string; body: string; note: string; badge: string;
    footnote: string; tableTitle: string;
  };
  admission: {
    label: string; title: string; body: string; before: string;
    steps: { n: string; title: string; lead: string; body: string; note: string }[];
    facts: [string, string][];
  };
  faq: { eyebrow: string; title: string; items: { q: string; a: string }[] };
  contact: { label: string; whatsapp: string; diagnosis: string; message: string; footer: string };
  modal: {
    eyebrow: string; title: string; body: string; moduleLabel: string; moduleDefault: string;
    dayLabel: string; timeLabel: string; availabilityLabel: string; messageLabel: string;
    submit: string; days: string[]; times: string[];
    message: (ctx: BookingContext) => string;
  };
  rail: string[];
  plaques: { label: string; detail: string }[];
  sectionLabels: {
    programmes: string; twoPaths: string; chooseDeadline: string;
    modules: string; certifications: string;
  };
};

const PHOTO_SOURCES = [
  { src: "/photos/deco.jpg" },
  { src: "/photos/desk.jpg" },
  { src: "/photos/palms.jpg" },
];

const CODE_VALUES: Array<[string, string, string, number, "langues" | "bac"]> = [
  ["DE-A1B2", "1 300", "10 h / sem.", 1300, "langues"],
  ["EN-IELTS", "800", "6 h / sem.", 800, "langues"],
  ["FR-TCF", "750", "6 h / sem.", 750, "langues"],
  ["BAC-2SM", "900", "8 h / sem.", 900, "bac"],
  ["BAC-2SVT", "800", "6 h / sem.", 800, "bac"],
  ["BAC-2ECO", "800", "6 h / sem.", 800, "bac"],
  ["BAC-1REG", "650", "6 h / sem.", 650, "bac"],
];

/* ─────────────────────────── FR (canonical — exact source strings) ─────────────────────── */

const fr: Dict = {
  brand: {
    name: "Dar Al-Ilm Académie", mark: "DAR AL-ILM", arabic: "دار العلم",
    eyebrow: "Casablanca · Bd Zerktouni · Maârif", address: "Bd Zerktouni, Maârif, Casablanca",
    hours: "Lundi — Samedi · 9 h — 21 h", hoursNote: "Dimanche sur rendez-vous",
    phone: "+212 661 489 210", phoneHref: "tel:+212661489210", whatsapp: "212661489210",
    footer: "Centre de langues et de préparation", footerAddress: "Bd Zerktouni · Maârif · Casablanca",
  },
  hero: {
    title: ["Apprendre une langue.", "Réussir son Bac."],
    subtitle: "Sept programmes, un seul niveau d’exigence. Allemand A1→B2, IELTS, TCF et préparation complète au Baccalauréat marocain.",
    primary: "Voir les programmes", secondary: "Prendre rendez-vous",
  },
  metrics: [
    { value: "07", label: "programmes", note: "Langues & Bac" },
    { value: "45", suffix: " min", label: "diagnostic offert", note: "avant toute inscription" },
    { value: "6—10", suffix: " h", label: "par semaine", note: "selon le module" },
    { value: "9—21", label: "ouverture", note: "lundi au samedi" },
  ],
  ticker: "ALLEMAND A1→B2 · IELTS · TCF · BAC SM · BAC SVT · BAC ÉCO · RÉGIONAL 1RE BAC · AUSBILDUNG ·",
  tabs: { all: "Tous · 07", langues: "Langues & Certifications · 03", bac: "Baccalauréat Marocain · 04" },
  families: [
    { n: "03", title: "Langues & certifications", body: "Allemand, anglais, français. Quatre niveaux, des échéances et des examens blancs notés.", codes: "DE · IELTS · TCF" },
    { n: "04", title: "Baccalauréat marocain", body: "Maths, physique, SVT, économie et Régional. Des annales corrigées au barème officiel.", codes: "SM · PC · SVT · ECO · 1REG" },
  ],
  programmes: [
    { code: "DE-A1B2", n: "01 / 07", title: "Allemand intensif & Ausbildung", subtitle: "Deutsch A1 → B2 · Goethe · ÖSD", description: "Quatre niveaux CECRL, de la première phrase à l’entretien d’Ausbildung.", hours: "10 h / sem.", price: "1 300 MAD / mois", priceShort: "1 300", value: 1300, family: "langues" },
    { code: "EN-IELTS", n: "02 / 07", title: "Anglais académique & IELTS", subtitle: "English A2 → C1 · IELTS · TOEFL", description: "De la fluidité orale à la rédaction académique, avec simulation notée chaque mois.", hours: "6 h / sem.", price: "800 MAD / mois", priceShort: "800", value: 800, family: "langues" },
    { code: "FR-TCF", n: "03 / 07", title: "Français communication & TCF", subtitle: "Français B1 → C1 · TCF · DELF B2", description: "Expression écrite et orale calibrée sur les épreuves TCF Canada et DELF B2.", hours: "6 h / sem.", price: "750 MAD / mois", priceShort: "750", value: 750, family: "langues" },
    { code: "BAC-2SM", n: "04 / 07", title: "Mathématiques & physique-chimie", subtitle: "2ème Bac SM / PC · Examen national", description: "Analyse, algèbre, mécanique et électricité, par annales corrigées.", hours: "8 h / sem.", price: "900 MAD / mois", priceShort: "900", value: 900, family: "bac" },
    { code: "BAC-2SVT", n: "05 / 07", title: "Sciences de la vie et de la Terre", subtitle: "2ème Bac SVT · Examen national", description: "Méthodologie de rédaction scientifique : problématique, schéma, conclusion.", hours: "6 h / sem.", price: "800 MAD / mois", priceShort: "800", value: 800, family: "bac" },
    { code: "BAC-2ECO", n: "06 / 07", title: "Sciences économiques & comptabilité", subtitle: "2ème Bac Éco / SGC · Examen national", description: "Économie générale, comptabilité et mathématiques financières.", hours: "6 h / sem.", price: "800 MAD / mois", priceShort: "800", value: 800, family: "bac" },
    { code: "BAC-1REG", n: "07 / 07", title: "Préparation régional 1ère Bac", subtitle: "1ère Bac Régional · FR · HG · AR", description: "Sécuriser les points d’avance du Régional avant la 2ème Bac.", hours: "6 h / sem.", price: "650 MAD / mois", priceShort: "650", value: 650, family: "bac" },
  ],
  diagnostic: { eyebrow: "Diagnostic offert", title: "Pas sûr du module ?", body: "45 minutes pour situer le niveau réel et choisir le bon point de départ.", cta: "Prendre rendez-vous" },
  orientation: {
    eyebrow: "Orientation express", recommendation: "Module recommandé", otherOptions: "Autres options :",
    steps: ["01 · Objectif principal", "02 · Niveau ou filière", "03 · Disponibilité souhaitée"],
    objectives: ["Études / Ausbildung en Allemagne", "Immigration / Études anglophones ou francophones", "Examen National 2ème Bac", "Régional 1ère Bac"],
    levels: ["Débutant / A1-A2", "Intermédiaire / B1+", "Sciences Maths / PC", "SVT / Éco / 1ère Bac"],
    availabilities: ["Semaine en soirée", "Samedi intensif", "Flexible"],
  },
  certifications: ["Goethe", "ÖSD", "IELTS", "TOEFL", "TCF", "DELF B2", "Examen national"],
  method: {
    eyebrow: "Méthode", title: "Nous ne vendons pas des heures de cours. Nous préparons une échéance.",
    body: "Chaque module a une date de fin, un barème et des examens blancs. Le reste — exercices, révisions, corrections — est organisé autour de cette date.",
    steps: [
      { n: "01", title: "Diagnostic", body: "Une séance d’évaluation écrite et orale, 45 minutes, avant toute inscription. Nous ne plaçons personne dans un niveau qu’il n’a pas.", note: "45 min · offert" },
      { n: "02", title: "Programme daté", body: "Chaque module a son calendrier : chapitres, devoirs, examens blancs. Le programme est remis imprimé à l’inscription, avec les dates.", note: "Remis à l’inscription" },
      { n: "03", title: "Examens blancs", body: "Toutes les quatre semaines, en condition réelle : même durée, même barème, correction rendue sous 72 heures.", note: "Toutes les 4 semaines" },
    ],
  },
  photos: {
    label: "Casablanca", title: "Trois repères de la ville.",
    body: "Une façade Art déco, une table de travail, un boulevard planté de palmiers : trois repères de la ville où se trouve le centre.",
    note: "Les photographies montrent Casablanca ; elles ne représentent pas les locaux du centre.",
    items: [
      { ...PHOTO_SOURCES[0], alt: "Immeuble Art déco, Casablanca", caption: "Immeuble Art déco, Casablanca." },
      { ...PHOTO_SOURCES[1], alt: "Prise de notes à la main", caption: "Prise de notes à la main, un geste du quotidien." },
      { ...PHOTO_SOURCES[2], alt: "Allée de palmiers, Casablanca", caption: "Allée de palmiers, Casablanca." },
    ],
  },
  tariffs: {
    label: "Tarifs", title: "Une grille simple, mensuelle.",
    body: "Le tarif dépend du module, jamais du nombre de séances suivies. Paiement au début de chaque mois, module par module, sans engagement annuel ni prélèvement automatique. Supports et examens blancs inclus.",
    note: "2026 · MAD", badge: "Sans engagement annuel", footnote: "Tarifs affichés en dirhams marocains, par mois et par module.", tableTitle: "Grille mensuelle",
  },
  admission: {
    label: "Admission", title: "Quatre étapes. Aucune inscription à l’aveugle.",
    body: "On ne s’inscrit pas à un module sans savoir d’où l’on part. La procédure est la même pour tous les élèves, du premier cours d’allemand à la préparation du Bac.",
    before: "Avant de venir",
    steps: [
      { n: "01", title: "Prise de contact", lead: "Par téléphone ou sur WhatsApp, du lundi au samedi.", body: "Nous demandons trois informations : le module visé, le niveau estimé et l’échéance — un examen Goethe, un score IELTS, le Bac de juin. C’est cette date qui détermine le rythme du programme.", note: "5 minutes" },
      { n: "02", title: "Diagnostic", lead: "Une séance de 45 minutes au centre, sans engagement.", body: "Épreuve écrite courte, entretien oral pour les langues, exercices types pour le Bac. Le résultat situe le niveau réel et indique s’il faut commencer un palier en dessous de celui visé.", note: "45 minutes · offert" },
      { n: "03", title: "Programme et inscription", lead: "Le calendrier est remis imprimé, avec les dates d’examen blanc.", body: "Le programme détaille les chapitres par semaine, les devoirs et les quatre examens blancs du trimestre. Le règlement se fait au mois, module par module, sans engagement annuel.", note: "Au centre" },
      { n: "04", title: "Premier cours", lead: "L’élève rejoint le groupe à la session suivante.", body: "Les groupes sont constitués par niveau, pas par âge. Les annales corrigées et le programme imprimé sont remis au premier cours, sans supplément.", note: "Session suivante" },
    ],
    facts: [
      ["Durée du diagnostic", "45 minutes"], ["Groupes", "Constitués par niveau"],
      ["Rythme", "6 à 10 h par semaine"], ["Règlement", "Mensuel, sans engagement"],
      ["Supports", "Inclus dans le tarif"],
    ],
  },
  faq: {
    eyebrow: "Questions fréquentes", title: "Ce qu’il faut savoir.",
    items: [
      { q: "Faut-il passer le diagnostic avant de s’inscrire ?", a: "Oui, pour tous les modules. Placer un élève dans un niveau qu’il n’a pas est la première cause d’abandon : le diagnostic de 45 minutes évite cela. Il n’est pas facturé et ne crée aucun engagement." },
      { q: "Peut-on suivre deux modules en même temps ?", a: "Oui. Les emplois du temps sont construits pour permettre, par exemple, l’allemand et les mathématiques du Bac dans la même semaine. Le tarif est alors la somme des deux modules." },
      { q: "Y a-t-il un engagement annuel ?", a: "Non. Le règlement est mensuel, module par module. Un module peut être arrêté en fin de mois, sans frais." },
      { q: "Les supports sont-ils compris dans le tarif ?", a: "Oui. Le programme imprimé, les annales corrigées et les examens blancs notés sont compris dans le tarif mensuel du module." },
      { q: "Comment se déroule le règlement ?", a: "Au début de chaque mois, au centre. Aucun prélèvement automatique, aucune carte enregistrée." },
    ],
  },
  contact: {
    label: "Le centre", whatsapp: "Écrire sur WhatsApp", diagnosis: "Faire le diagnostic",
    message: "Bonjour, je souhaite des informations sur les inscriptions.", footer: "Centre de langues et de préparation",
  },
  modal: {
    eyebrow: "Dar Al-Ilm · Casablanca", title: "Prendre rendez-vous",
    body: "Diagnostic de 45 minutes, offert et sans engagement. Choisissez un module et un créneau souhaité : votre demande est préparée pour WhatsApp.",
    moduleLabel: "Module", moduleDefault: "À définir lors du diagnostic", dayLabel: "Jour souhaité",
    timeLabel: "Heure souhaitée", availabilityLabel: "Disponibilité", messageLabel: "Votre message",
    submit: "Envoyer sur WhatsApp ↗",
    days: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
    times: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"],
    message: (c) => [
      "Bonjour, je souhaite prendre rendez-vous pour un diagnostic.",
      c.module ? `Module : ${c.module}` : "Module : à définir lors du diagnostic",
      `Jour souhaité : ${c.day}`,
      `Heure souhaitée : ${c.time}`,
      ...(c.availability ? [`Disponibilité : ${c.availability}`] : []),
      "",
      `${fr.brand.name} · ${fr.brand.address}`,
    ].join("\n"),
  },
  rail: ["01 / 04 · L'Atrium", "02 / 04 · Programmes", "03 / 04 · Méthode", "04 / 04 · Le Centre"],
  plaques: [
    { label: "Deutsch", detail: "A1→B2 · Goethe" },
    { label: "English", detail: "IELTS C1" },
    { label: "Français", detail: "TCF Canada" },
    { label: "دار العلم", detail: "Bac SM · SVT" },
  ],
  sectionLabels: {
    programmes: "Sept programmes", twoPaths: "Deux chemins. Une seule exigence.",
    chooseDeadline: "Choisissez votre échéance", modules: "modules",
    certifications: "Préparation aux certifications",
  },
};

/* ─────────────────────────── EN ─────────────────────── */

const en: Dict = {
  brand: {
    name: "Dar Al-Ilm Académie", mark: "DAR AL-ILM", arabic: "دار العلم",
    eyebrow: "Casablanca · Bd Zerktouni · Maârif", address: "Bd Zerktouni, Maârif, Casablanca",
    hours: "Monday — Saturday · 9 am — 9 pm", hoursNote: "Sunday by appointment",
    phone: "+212 661 489 210", phoneHref: "tel:+212661489210", whatsapp: "212661489210",
    footer: "Language and exam preparation centre", footerAddress: "Bd Zerktouni · Maârif · Casablanca",
  },
  hero: {
    title: ["Master a language.", "Ace your Bac."],
    subtitle: "Seven programs, one standard of excellence. German A1→B2, IELTS, TCF, and complete Moroccan Baccalaureate preparation.",
    primary: "Explore programs", secondary: "Book an appointment",
  },
  metrics: [
    { value: "07", label: "programs", note: "Languages & Bac" },
    { value: "45", suffix: " min", label: "free placement test", note: "before any enrolment" },
    { value: "6—10", suffix: " h", label: "per week", note: "depending on the program" },
    { value: "9—21", label: "opening hours", note: "Monday to Saturday" },
  ],
  ticker: "GERMAN A1→B2 · IELTS · TCF · BAC SM · BAC SVT · BAC ECON · FIRST-YEAR REGIONAL · AUSBILDUNG ·",
  tabs: { all: "All · 07", langues: "Languages & Certificates · 03", bac: "Moroccan Baccalaureate · 04" },
  families: [
    { n: "03", title: "Languages & certificates", body: "German, English, French. Four levels, fixed deadlines and graded mock exams.", codes: "DE · IELTS · TCF" },
    { n: "04", title: "Moroccan Baccalaureate", body: "Maths, physics, life sciences, economics and the Regional exam. Past papers marked to the official grading scale.", codes: "SM · PC · SVT · ECO · 1REG" },
  ],
  programmes: [
    { code: "DE-A1B2", n: "01 / 07", title: "Intensive German & Ausbildung", subtitle: "Deutsch A1 → B2 · Goethe · ÖSD", description: "Four CEFR levels, from the first sentence to the Ausbildung interview.", hours: "10 h / week", price: "1 300 MAD / month", priceShort: "1 300", value: 1300, family: "langues" },
    { code: "EN-IELTS", n: "02 / 07", title: "Academic English & IELTS", subtitle: "English A2 → C1 · IELTS · TOEFL", description: "From spoken fluency to academic writing, with a graded simulation every month.", hours: "6 h / week", price: "800 MAD / month", priceShort: "800", value: 800, family: "langues" },
    { code: "FR-TCF", n: "03 / 07", title: "French communication & TCF", subtitle: "Français B1 → C1 · TCF · DELF B2", description: "Written and oral expression calibrated to TCF Canada and DELF B2 format.", hours: "6 h / week", price: "750 MAD / month", priceShort: "750", value: 750, family: "langues" },
    { code: "BAC-2SM", n: "04 / 07", title: "Mathematics & physics-chemistry", subtitle: "2nd Bac SM / PC · National exam", description: "Analysis, algebra, mechanics and electricity, through corrected past papers.", hours: "8 h / week", price: "900 MAD / month", priceShort: "900", value: 900, family: "bac" },
    { code: "BAC-2SVT", n: "05 / 07", title: "Life and Earth sciences", subtitle: "2nd Bac SVT · National exam", description: "Scientific writing method: problem statement, diagram, conclusion.", hours: "6 h / week", price: "800 MAD / month", priceShort: "800", value: 800, family: "bac" },
    { code: "BAC-2ECO", n: "06 / 07", title: "Economics & accountancy", subtitle: "2nd Bac Econ / SGC · National exam", description: "General economics, accountancy and financial mathematics.", hours: "6 h / week", price: "800 MAD / month", priceShort: "800", value: 800, family: "bac" },
    { code: "BAC-1REG", n: "07 / 07", title: "First-year Regional Bac preparation", subtitle: "1st Bac Regional · FR · HG · AR", description: "Secure the early points in the Regional exam before the second-year Bac.", hours: "6 h / week", price: "650 MAD / month", priceShort: "650", value: 650, family: "bac" },
  ],
  diagnostic: { eyebrow: "Free placement test", title: "Not sure which program?", body: "45 minutes to establish your real level and choose the right starting point.", cta: "Book an appointment" },
  orientation: {
    eyebrow: "Express guidance", recommendation: "Recommended program", otherOptions: "Other options:",
    steps: ["01 · Main goal", "02 · Current level or track", "03 · Preferred availability"],
    objectives: ["Studies / Ausbildung in Germany", "Immigration / English- or French-speaking studies", "National 2nd-year Bac exam", "First-year Regional Bac"],
    levels: ["Beginner / A1-A2", "Intermediate / B1+", "Maths & physical sciences", "Life sciences / Economics / 1st-year Bac"],
    availabilities: ["Evenings on weekdays", "Intensive Saturday", "Flexible"],
  },
  certifications: ["Goethe", "ÖSD", "IELTS", "TOEFL", "TCF", "DELF B2", "National exam"],
  method: {
    eyebrow: "Method", title: "We don't sell hours of classes. We prepare you for a deadline.",
    body: "Every program has an end date, a grading scale and mock exams. Everything else — exercises, revision, corrections — is organised around that date.",
    steps: [
      { n: "01", title: "Placement test", body: "A written and oral assessment, 45 minutes, before any enrolment. We never place anyone in a level they don't have.", note: "45 min · free" },
      { n: "02", title: "Dated program", body: "Each program has its calendar: chapters, homework, mock exams. The printed schedule is handed out at enrolment, with the dates.", note: "Given at enrolment" },
      { n: "03", title: "Mock exams", body: "Every four weeks, under real conditions: same duration, same grading scale, results within 72 hours.", note: "Every 4 weeks" },
    ],
  },
  photos: {
    label: "Casablanca", title: "Three landmarks of the city.",
    body: "An Art Deco façade, a desk, a palm-lined boulevard: three landmarks of the city where the centre is located.",
    note: "The photographs show Casablanca; they do not depict the centre's premises.",
    items: [
      { ...PHOTO_SOURCES[0], alt: "Art Deco building, Casablanca", caption: "Art Deco building, Casablanca." },
      { ...PHOTO_SOURCES[1], alt: "Taking notes by hand", caption: "Taking notes by hand, an everyday gesture." },
      { ...PHOTO_SOURCES[2], alt: "Palm-lined avenue, Casablanca", caption: "Palm-lined avenue, Casablanca." },
    ],
  },
  tariffs: {
    label: "Fees", title: "A simple, monthly fee.",
    body: "The fee depends on the program, never on the number of sessions attended. Payment at the start of each month, program by program, with no annual commitment and no direct debit. Materials and mock exams included.",
    note: "2026 · MAD", badge: "No annual commitment", footnote: "Fees shown in Moroccan dirhams, per month and per program.", tableTitle: "Monthly fee grid",
  },
  admission: {
    label: "Admission", title: "Four steps. No enrolment in the dark.",
    body: "You don't enrol in a program without knowing where you stand. The process is the same for every student, from the first German class to Bac preparation.",
    before: "Before you come",
    steps: [
      { n: "01", title: "First contact", lead: "By phone or WhatsApp, Monday to Saturday.", body: "We ask for three things: the target program, your estimated level and your deadline — a Goethe exam, an IELTS score, the June Bac. That date sets the pace of the program.", note: "5 minutes" },
      { n: "02", title: "Placement test", lead: "A 45-minute session at the centre, with no obligation.", body: "A short written test, an oral interview for languages, and Bac-style exercises. The result shows your real level and whether you should start a level below the one you aimed for.", note: "45 minutes · free" },
      { n: "03", title: "Program and enrolment", lead: "The calendar is handed out in print, with mock exam dates.", body: "The program details weekly chapters, homework and the four mock exams of the term. Payment is monthly, program by program, with no annual commitment.", note: "At the centre" },
      { n: "04", title: "First class", lead: "The student joins the group at the next session.", body: "Groups are formed by level, not by age. Corrected past papers and the printed program are given at the first class, at no extra cost.", note: "Next session" },
    ],
    facts: [
      ["Placement test duration", "45 minutes"], ["Groups", "Formed by level"],
      ["Pace", "6 to 10 h per week"], ["Payment", "Monthly, no commitment"],
      ["Materials", "Included in the fee"],
    ],
  },
  faq: {
    eyebrow: "Frequently asked questions", title: "What you need to know.",
    items: [
      { q: "Do I need the placement test before enrolling?", a: "Yes, for every program. Placing a student in a level they don't have is the main cause of dropout: the 45-minute placement test prevents this. It is free and creates no obligation." },
      { q: "Can I take two programs at the same time?", a: "Yes. Timetables are designed to allow, for example, German and Bac maths in the same week. The fee is then the sum of both programs." },
      { q: "Is there an annual commitment?", a: "No. Payment is monthly, program by program. A program can be stopped at the end of the month, free of charge." },
      { q: "Are materials included in the fee?", a: "Yes. The printed program, corrected past papers and graded mock exams are included in the monthly program fee." },
      { q: "How does payment work?", a: "At the start of each month, at the centre. No direct debit, no stored card." },
    ],
  },
  contact: {
    label: "The centre", whatsapp: "Message us on WhatsApp", diagnosis: "Take the placement test",
    message: "Hello, I would like information about enrolment.", footer: "Language and exam preparation centre",
  },
  modal: {
    eyebrow: "Dar Al-Ilm · Casablanca", title: "Book an appointment",
    body: "A free 45-minute placement test with no obligation. Choose a program and a preferred slot: your request is prepared for WhatsApp.",
    moduleLabel: "Program", moduleDefault: "To be decided at the placement test", dayLabel: "Preferred day",
    timeLabel: "Preferred time", availabilityLabel: "Availability", messageLabel: "Your message",
    submit: "Send on WhatsApp ↗",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    times: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"],
    message: (c) => [
      "Hello, I would like to book an appointment for a placement test.",
      c.module ? `Program: ${c.module}` : "Program: to be decided at the placement test",
      `Preferred day: ${c.day}`,
      `Preferred time: ${c.time}`,
      ...(c.availability ? [`Availability: ${c.availability}`] : []),
      "",
      `${en.brand.name} · ${en.brand.address}`,
    ].join("\n"),
  },
  rail: ["01 / 04 · The Atrium", "02 / 04 · Programs", "03 / 04 · Method", "04 / 04 · The Centre"],
  plaques: [
    { label: "Deutsch", detail: "A1→B2 · Goethe" },
    { label: "English", detail: "IELTS C1" },
    { label: "Français", detail: "TCF Canada" },
    { label: "دار العلم", detail: "Bac SM · SVT" },
  ],
  sectionLabels: {
    programmes: "Seven programs", twoPaths: "Two paths. One standard of excellence.",
    chooseDeadline: "Choose your deadline", modules: "programs",
    certifications: "Certificate preparation",
  },
};

/* ─────────────────────────── DE ─────────────────────── */

const de: Dict = {
  brand: {
    name: "Dar Al-Ilm Académie", mark: "DAR AL-ILM", arabic: "دار العلم",
    eyebrow: "Casablanca · Bd Zerktouni · Maârif", address: "Bd Zerktouni, Maârif, Casablanca",
    hours: "Montag — Samstag · 9 — 21 Uhr", hoursNote: "Sonntag nach Vereinbarung",
    phone: "+212 661 489 210", phoneHref: "tel:+212661489210", whatsapp: "212661489210",
    footer: "Sprach- und Prüfungsvorbereitungszentrum", footerAddress: "Bd Zerktouni · Maârif · Casablanca",
  },
  hero: {
    title: ["Eine Sprache meistern.", "Das Abitur bestehen."],
    subtitle: "Sieben Programme, ein Qualitätsanspruch. Deutsch A1→B2, IELTS, TCF und umfassende Vorbereitung auf das marokkanische Abitur.",
    primary: "Programme ansehen", secondary: "Termin vereinbaren",
  },
  metrics: [
    { value: "07", label: "Programme", note: "Sprachen & Abitur" },
    { value: "45", suffix: " Min.", label: "kostenloser Eignungstest", note: "vor jeder Anmeldung" },
    { value: "6—10", suffix: " Std.", label: "pro Woche", note: "je nach Programm" },
    { value: "9—21", label: "Öffnungszeiten", note: "Montag bis Samstag" },
  ],
  ticker: "DEUTSCH A1→B2 · IELTS · TCF · ABITUR SM · ABITUR SVT · ABITUR ECON · REGIONAL 1. KLASSE · AUSBILDUNG ·",
  tabs: { all: "Alle · 07", langues: "Sprachen & Zertifikate · 03", bac: "Marokkanisches Abitur · 04" },
  families: [
    { n: "03", title: "Sprachen & Zertifikate", body: "Deutsch, Englisch, Französisch. Vier Niveaus, feste Termine und benotete Probeklausuren.", codes: "DE · IELTS · TCF" },
    { n: "04", title: "Marokkanisches Abitur", body: "Mathe, Physik, Biologie, Wirtschaft und die Regionalprüfung. Lösungen nach offiziellem Bewertungsschema.", codes: "SM · PC · SVT · ECO · 1REG" },
  ],
  programmes: [
    { code: "DE-A1B2", n: "01 / 07", title: "Intensiv-Deutsch & Ausbildung", subtitle: "Deutsch A1 → B2 · Goethe · ÖSD", description: "Vier GER-Niveaus, vom ersten Satz bis zum Ausbildungsvorstellungsgespräch.", hours: "10 Std. / Woche", price: "1 300 MAD / Monat", priceShort: "1 300", value: 1300, family: "langues" },
    { code: "EN-IELTS", n: "02 / 07", title: "Akademisches Englisch & IELTS", subtitle: "English A2 → C1 · IELTS · TOEFL", description: "Von flüssiger Konversation bis zum akademischen Schreiben, mit monatlicher benoteter Simulation.", hours: "6 Std. / Woche", price: "800 MAD / Monat", priceShort: "800", value: 800, family: "langues" },
    { code: "FR-TCF", n: "03 / 07", title: "Französisch & TCF", subtitle: "Français B1 → C1 · TCF · DELF B2", description: "Schriftlicher und mündlicher Ausdruck nach TCF Canada und DELF B2.", hours: "6 Std. / Woche", price: "750 MAD / Monat", priceShort: "750", value: 750, family: "langues" },
    { code: "BAC-2SM", n: "04 / 07", title: "Mathematik & Physik-Chemie", subtitle: "2. Abitur SM / PC · Nationale Prüfung", description: "Analysis, Algebra, Mechanik und Elektrizität anhand korrigierter Altklausuren.", hours: "8 Std. / Woche", price: "900 MAD / Monat", priceShort: "900", value: 900, family: "bac" },
    { code: "BAC-2SVT", n: "05 / 07", title: "Biologie & Geowissenschaften", subtitle: "2. Abitur SVT · Nationale Prüfung", description: "Wissenschaftliche Schreibmethode: Fragestellung, Schema, Schlussfolgerung.", hours: "6 Std. / Woche", price: "800 MAD / Monat", priceShort: "800", value: 800, family: "bac" },
    { code: "BAC-2ECO", n: "06 / 07", title: "Wirtschaft & Buchhaltung", subtitle: "2. Abitur Eco / SGC · Nationale Prüfung", description: "Volkswirtschaft, Buchhaltung und Finanzmathematik.", hours: "6 Std. / Woche", price: "800 MAD / Monat", priceShort: "800", value: 800, family: "bac" },
    { code: "BAC-1REG", n: "07 / 07", title: "Vorbereitung Regional 1. Klasse", subtitle: "1. Abitur Regional · FR · HG · AR", description: "Sichere Punktvorsprünge in der Regionalprüfung vor dem Abitur der 2. Klasse.", hours: "6 Std. / Woche", price: "650 MAD / Monat", priceShort: "650", value: 650, family: "bac" },
  ],
  diagnostic: { eyebrow: "Kostenloser Eignungstest", title: "Noch nicht sicher, welches Programm?", body: "45 Minuten, um Ihr echtes Niveau festzustellen und den richtigen Einstieg zu wählen.", cta: "Termin vereinbaren" },
  orientation: {
    eyebrow: "Schnellberatung", recommendation: "Empfohlenes Programm", otherOptions: "Weitere Optionen:",
    steps: ["01 · Hauptziel", "02 · Aktuelles Niveau oder Fachrichtung", "03 · Gewünschte Verfügbarkeit"],
    objectives: ["Studium / Ausbildung in Deutschland", "Einwanderung / englisch- oder französischsprachiges Studium", "Nationale Abiturprüfung 2. Klasse", "Regionalprüfung 1. Klasse"],
    levels: ["Anfänger / A1-A2", "Mittelstufe / B1+", "Mathe & Naturwissenschaften", "Bio / Wirtschaft / 1. Abiturklasse"],
    availabilities: ["Abends unter der Woche", "Intensiv am Samstag", "Flexibel"],
  },
  certifications: ["Goethe", "ÖSD", "IELTS", "TOEFL", "TCF", "DELF B2", "Nationale Prüfung"],
  method: {
    eyebrow: "Methode", title: "Wir verkaufen keine Unterrichtsstunden. Wir bereiten auf ein Prüfungsdatum vor.",
    body: "Jedes Programm hat ein Enddatum, ein Bewertungsschema und Probeklausuren. Alles andere — Übungen, Wiederholungen, Korrekturen — ist auf dieses Datum ausgerichtet.",
    steps: [
      { n: "01", title: "Eignungstest", body: "Eine schriftliche und mündliche Einschätzung, 45 Minuten, vor jeder Anmeldung. Wir stufen niemanden in ein Niveau ein, das er nicht hat.", note: "45 Min. · kostenlos" },
      { n: "02", title: "Datierter Lehrplan", body: "Jedes Programm hat seinen Kalender: Kapitel, Hausaufgaben, Probeklausuren. Der gedruckte Plan wird bei der Anmeldung mit den Terminen ausgehändigt.", note: "Bei der Anmeldung" },
      { n: "03", title: "Probeklausuren", body: "Alle vier Wochen unter Realbedingungen: gleiche Dauer, gleiches Schema, Korrektur innerhalb von 72 Stunden.", note: "Alle 4 Wochen" },
    ],
  },
  photos: {
    label: "Casablanca", title: "Drei Wahrzeichen der Stadt.",
    body: "Eine Art-déco-Fassade, ein Schreibtisch, eine palmengesäumte Allee: drei Wahrzeichen der Stadt, in der sich das Zentrum befindet.",
    note: "Die Fotos zeigen Casablanca; sie zeigen nicht die Räume des Zentrums.",
    items: [
      { ...PHOTO_SOURCES[0], alt: "Art-déco-Gebäude in Casablanca", caption: "Art-déco-Gebäude, Casablanca." },
      { ...PHOTO_SOURCES[1], alt: "Notizen mit der Hand", caption: "Notizen mit der Hand, eine alltägliche Geste." },
      { ...PHOTO_SOURCES[2], alt: "Palmengesäumte Allee, Casablanca", caption: "Palmengesäumte Allee, Casablanca." },
    ],
  },
  tariffs: {
    label: "Gebühren", title: "Eine einfache, monatliche Gebühr.",
    body: "Die Gebühr hängt vom Programm ab, nie von der Anzahl besuchter Stunden. Zahlung zu Beginn jeden Monats, Programm für Programm, ohne Jahresverpflichtung und ohne Lastschrift. Material und Probeklausuren inklusive.",
    note: "2026 · MAD", badge: "Keine Jahresverpflichtung", footnote: "Preise in marokkanischen Dirham, monatlich und pro Programm.", tableTitle: "Monatliche Gebührenübersicht",
  },
  admission: {
    label: "Aufnahme", title: "Vier Schritte. Keine Anmeldung ins Blaue.",
    body: "Man meldet sich nicht für ein Programm an, ohne zu wissen, wo man steht. Das Verfahren ist für alle Lernenden gleich, vom ersten Deutschkurs bis zur Abiturvorbereitung.",
    before: "Vor Ihrem Besuch",
    steps: [
      { n: "01", title: "Erstkontakt", lead: "Telefonisch oder über WhatsApp, Montag bis Samstag.", body: "Wir fragen drei Dinge: das gewünschte Programm, das geschätzte Niveau und den Termin — eine Goethe-Prüfung, einen IELTS-Score, das Abitur im Juni. Dieses Datum bestimmt das Tempo des Programms.", note: "5 Minuten" },
      { n: "02", title: "Eignungstest", lead: "Eine 45-minütige Sitzung im Zentrum, unverbindlich.", body: "Kurzer schriftlicher Test, mündliches Gespräch bei Sprachen und abiturtypische Übungen. Das Ergebnis zeigt das echte Niveau und ob ein tieferes Niveau sinnvoll ist.", note: "45 Min. · kostenlos" },
      { n: "03", title: "Programm und Anmeldung", lead: "Der Kalender wird mit den Klausurterminen ausgedruckt übergeben.", body: "Das Programm enthält die Kapitel pro Woche, die Hausaufgaben und die vier Probeklausuren des Semesters. Die Zahlung erfolgt monatlich, Programm für Programm, ohne Jahresverpflichtung.", note: "Im Zentrum" },
      { n: "04", title: "Erster Unterricht", lead: "Die Lernenden treten in der nächsten Sitzung der Gruppe bei.", body: "Die Gruppen werden nach Niveau gebildet, nicht nach Alter. Korrigierte Altklausuren und das gedruckte Programm gibt es im ersten Unterricht ohne Aufpreis.", note: "Nächste Sitzung" },
    ],
    facts: [
      ["Dauer des Eignungstests", "45 Minuten"], ["Gruppen", "Nach Niveau gebildet"],
      ["Rhythmus", "6 bis 10 Std. pro Woche"], ["Zahlung", "Monatlich, ohne Verpflichtung"],
      ["Material", "In der Gebühr enthalten"],
    ],
  },
  faq: {
    eyebrow: "Häufige Fragen", title: "Das Wichtigste im Überblick.",
    items: [
      { q: "Muss ich vor der Anmeldung den Eignungstest ablegen?", a: "Ja, für alle Programme. Lernende in ein Niveau einzustufen, das sie nicht haben, ist die häufigste Abbruchursache: der 45-minütige Test verhindert das. Er ist kostenlos und unverbindlich." },
      { q: "Kann ich zwei Programme gleichzeitig belegen?", a: "Ja. Die Stundenpläne sind so gebaut, dass zum Beispiel Deutsch und Abitur-Mathematik in derselben Woche möglich sind. Die Gebühr ist dann die Summe beider Programme." },
      { q: "Gibt es eine Jahresverpflichtung?", a: "Nein. Die Zahlung ist monatlich, Programm für Programm. Ein Programm kann zum Monatsende kostenfrei beendet werden." },
      { q: "Ist das Material in der Gebühr enthalten?", a: "Ja. Das gedruckte Programm, korrigierte Altklausuren und benotete Probeklausuren sind in der monatlichen Programmgebühr enthalten." },
      { q: "Wie funktioniert die Zahlung?", a: "Zu Beginn jeden Monats im Zentrum. Keine Lastschrift, keine gespeicherte Karte." },
    ],
  },
  contact: {
    label: "Das Zentrum", whatsapp: "Auf WhatsApp schreiben", diagnosis: "Eignungstest machen",
    message: "Guten Tag, ich möchte Informationen zu den Anmeldungen.", footer: "Sprach- und Prüfungsvorbereitungszentrum",
  },
  modal: {
    eyebrow: "Dar Al-Ilm · Casablanca", title: "Termin vereinbaren",
    body: "Kostenloser 45-minütiger Eignungstest ohne Verpflichtung. Wählen Sie ein Programm und einen Wunschtermin: Ihre Anfrage wird für WhatsApp vorbereitet.",
    moduleLabel: "Programm", moduleDefault: "Beim Eignungstest festzulegen", dayLabel: "Wunschtag",
    timeLabel: "Wunschzeit", availabilityLabel: "Verfügbarkeit", messageLabel: "Ihre Nachricht",
    submit: "Auf WhatsApp senden ↗",
    days: ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
    times: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"],
    message: (c) => [
      "Guten Tag, ich möchte einen Termin für einen Eignungstest vereinbaren.",
      c.module ? `Programm: ${c.module}` : "Programm: beim Eignungstest festzulegen",
      `Wunschtag: ${c.day}`,
      `Wunschzeit: ${c.time}`,
      ...(c.availability ? [`Verfügbarkeit: ${c.availability}`] : []),
      "",
      `${de.brand.name} · ${de.brand.address}`,
    ].join("\n"),
  },
  rail: ["01 / 04 · Das Atrium", "02 / 04 · Programme", "03 / 04 · Methode", "04 / 04 · Das Zentrum"],
  plaques: [
    { label: "Deutsch", detail: "A1→B2 · Goethe" },
    { label: "English", detail: "IELTS C1" },
    { label: "Français", detail: "TCF Canada" },
    { label: "دار العلم", detail: "Bac SM · SVT" },
  ],
  sectionLabels: {
    programmes: "Sieben Programme", twoPaths: "Zwei Wege. Ein Qualitätsanspruch.",
    chooseDeadline: "Wählen Sie Ihr Prüfungsdatum", modules: "Programme",
    certifications: "Vorbereitung auf Zertifikate",
  },
};

/* ─────────────────────────── AR ─────────────────────── */

const ar: Dict = {
  brand: {
    name: "دار العلم أكاديمية", mark: "دار العلم", arabic: "دار العلم",
    eyebrow: "الدار البيضاء · شارع زركتوني · المعاريف", address: "شارع زركتوني، المعاريف، الدار البيضاء",
    hours: "الاثنين — السبت · 9 صباحاً — 9 مساءً", hoursNote: "الأحد بحجز مسبق",
    phone: "+212 661 489 210", phoneHref: "tel:+212661489210", whatsapp: "212661489210",
    footer: "مركز اللغات والتحضير للامتحانات", footerAddress: "شارع زركتوني · المعاريف · الدار البيضاء",
  },
  hero: {
    title: ["أتقن لغةً.", "وتفوّق في البكالوريا."],
    subtitle: "سبعة برامج بمستوى واحد من التميّز: اللغة الألمانية A1→B2، واختبارات IELTS وTCF، والتحضير الشامل للبكالوريا المغربية.",
    primary: "اكتشف البرامج", secondary: "احجز موعداً",
  },
  metrics: [
    { value: "07", label: "برامج", note: "لغات وبكالوريا" },
    { value: "45", suffix: " د", label: "تشخيص مجاني", note: "قبل أي تسجيل" },
    { value: "6—10", suffix: " س", label: "أسبوعياً", note: "حسب البرنامج" },
    { value: "9—21", label: "ساعات العمل", note: "من الاثنين إلى السبت" },
  ],
  ticker: "الألمانية A1→B2 · IELTS · TCF · بكالوريا علوم رياضية · بكالوريا علوم الحياة · بكالوريا اقتصاد · الجهوي للسنة الأولى · أوسبيلدونغ ·",
  tabs: { all: "الكل · 07", langues: "اللغات والشهادات · 03", bac: "البكالوريا المغربية · 04" },
  families: [
    { n: "03", title: "اللغات والشهادات", body: "الألمانية والإنجليزية والفرنسية. أربعة مستويات، ومواعيد محددة، وامتحانات تجريبية مُقيّمة.", codes: "DE · IELTS · TCF" },
    { n: "04", title: "البكالوريا المغربية", body: "الرياضيات والفيزياء وعلوم الحياة والاقتصاد والامتحان الجهوي. نماذج مصححة وفق التقييم الرسمي.", codes: "SM · PC · SVT · ECO · 1REG" },
  ],
  programmes: [
    { code: "DE-A1B2", n: "01 / 07", title: "الألمانية المكثفة والأوسبيلدونغ", subtitle: "Deutsch A1 → B2 · Goethe · ÖSD", description: "أربعة مستويات وفق الإطار الأوروبي، من الجملة الأولى إلى مقابلة الأوسبيلدونغ.", hours: "10 س / أسبوع", price: "1 300 درهم / شهر", priceShort: "1 300", value: 1300, family: "langues" },
    { code: "EN-IELTS", n: "02 / 07", title: "الإنجليزية الأكاديمية وIELTS", subtitle: "English A2 → C1 · IELTS · TOEFL", description: "من الطلاقة الشفوية إلى الكتابة الأكاديمية، مع محاكاة مُقيّمة كل شهر.", hours: "6 س / أسبوع", price: "800 درهم / شهر", priceShort: "800", value: 800, family: "langues" },
    { code: "FR-TCF", n: "03 / 07", title: "الفرنسية والتواصل وTCF", subtitle: "Français B1 → C1 · TCF · DELF B2", description: "التعبير الكتابي والشفوي وفق اختبارات TCF Canada وDELF B2.", hours: "6 س / أسبوع", price: "750 درهم / شهر", priceShort: "750", value: 750, family: "langues" },
    { code: "BAC-2SM", n: "04 / 07", title: "الرياضيات والفيزياء والكيمياء", subtitle: "بكالوريا 2 SM / PC · امتحان وطني", description: "التحليل والجبر والميكانيكا والكهرباء، عبر نماذج مصححة.", hours: "8 س / أسبوع", price: "900 درهم / شهر", priceShort: "900", value: 900, family: "bac" },
    { code: "BAC-2SVT", n: "05 / 07", title: "علوم الحياة والأرض", subtitle: "بكالوريا 2 SVT · امتحان وطني", description: "منهجية الكتابة العلمية: الإشكالية، الرسم التخطيطي، الخاتمة.", hours: "6 س / أسبوع", price: "800 درهم / شهر", priceShort: "800", value: 800, family: "bac" },
    { code: "BAC-2ECO", n: "06 / 07", title: "العلوم الاقتصادية والمحاسبة", subtitle: "بكالوريا 2 اقتصاد / SGC · امتحان وطني", description: "الاقتصاد العام والمحاسبة والرياضيات المالية.", hours: "6 س / أسبوع", price: "800 درهم / شهر", priceShort: "800", value: 800, family: "bac" },
    { code: "BAC-1REG", n: "07 / 07", title: "التحضير للامتحان الجهوي للسنة الأولى", subtitle: "السنة الأولى جهوي · فر · تخ · عر", description: "تأمين نقاط التقدم في الامتحان الجهوي قبل بكالوريا السنة الثانية.", hours: "6 س / أسبوع", price: "650 درهم / شهر", priceShort: "650", value: 650, family: "bac" },
  ],
  diagnostic: { eyebrow: "تشخيص مجاني", title: "لم تحدد البرنامج المناسب؟", body: "45 دقيقة لتحديد مستواك الحقيقي واختيار نقطة الانطلاق الصحيحة.", cta: "احجز موعداً" },
  orientation: {
    eyebrow: "توجيه سريع", recommendation: "البرنامج المناسب", otherOptions: "خيارات أخرى:",
    steps: ["01 · الهدف الرئيسي", "02 · المستوى أو التخصص الحالي", "03 · التوقيت المناسب"],
    objectives: ["الدراسة / الأوسبيلدونغ في ألمانيا", "الهجرة / دراسات بالإنجليزية أو الفرنسية", "الامتحان الوطني لبكالوريا السنة الثانية", "الامتحان الجهوي للسنة الأولى"],
    levels: ["مبتدئ / A1-A2", "متوسط / B1+", "الرياضيات والعلوم الفيزيائية", "علوم الحياة / الاقتصاد / السنة الأولى"],
    availabilities: ["أمساء أيام الأسبوع", "السبت المكثف", "مرن"],
  },
  certifications: ["Goethe", "ÖSD", "IELTS", "TOEFL", "TCF", "DELF B2", "امتحان وطني"],
  method: {
    eyebrow: "المنهجية", title: "لا نبيع ساعات دروس. نُعدّك لموعد امتحان.",
    body: "كل برنامج له تاريخ نهاية ومقياس تقييم وامتحانات تجريبية. كل شيء آخر — التمارين والمراجعة والتصحيح — يُنظّم حول هذا التاريخ.",
    steps: [
      { n: "01", title: "التشخيص", body: "جلسة تقييم كتابي وشفوي، 45 دقيقة، قبل أي تسجيل. لا نضع أحداً في مستوى لا يملكه.", note: "45 د · مجاني" },
      { n: "02", title: "برنامج مؤرخ", body: "لكل برنامج جدوله: الفصول والواجبات والامتحانات التجريبية. يُسلّم البرنامج مطبوعاً عند التسجيل مع المواعيد.", note: "يُسلّم عند التسجيل" },
      { n: "03", title: "امتحانات تجريبية", body: "كل أربع أسابيع، في ظروف حقيقية: نفس المدة ونفس المقياس، ويُسلّم التصحيح خلال 72 ساعة.", note: "كل 4 أسابيع" },
    ],
  },
  photos: {
    label: "الدار البيضاء", title: "ثلاثة معالم للمدينة.",
    body: "واجهة فنية دكو، وطاولة عمل، وشارع مغروس بالنخيل: ثلاثة معالم للمدينة التي يقع فيها المركز.",
    note: "الصور تُظهر الدار البيضاء؛ ولا تمثل مقر المركز.",
    items: [
      { ...PHOTO_SOURCES[0], alt: "مبنى فني دكو، الدار البيضاء", caption: "مبنى فني دكو، الدار البيضاء." },
      { ...PHOTO_SOURCES[1], alt: "تدوين ملاحظات باليد", caption: "تدوين ملاحظات باليد، حركة من الحياة اليومية." },
      { ...PHOTO_SOURCES[2], alt: "ممر النخيل، الدار البيضاء", caption: "ممر النخيل، الدار البيضاء." },
    ],
  },
  tariffs: {
    label: "الرسوم", title: "لائحة بسيطة وشهرية.",
    body: "الرسوم مرتبطة بالبرنامج، وليس بعدد الحصص المحضورة. يُؤدى المبلغ في بداية كل شهر، برنامجاً ببرنامج، دون التزام سنوي أو خصم تلقائي. الكتيبات والامتحانات التجريبية مشمولة.",
    note: "2026 · درهم مغربي", badge: "دون التزام سنوي", footnote: "الأسعار بالدرهم المغربي، شهرياً ولكل برنامج.", tableTitle: "لائحة الرسوم الشهرية",
  },
  admission: {
    label: "التسجيل", title: "أربع خطوات. وليس تسجيلاً عشوائياً.",
    body: "لا تسجّل في برنامج دون أن تعرف من أين تنطلق. الإجراء نفسه لجميع المتعلّمين، من أول حصة ألمانية إلى التحضير للبكالوريا.",
    before: "قبل قدومك",
    steps: [
      { n: "01", title: "أول تواصل", lead: "بالهاتف أو عبر واتساب، من الاثنين إلى السبت.", body: "نطلب ثلاث معلومات: البرنامج المستهدف، والمستوى المقدَّر، والموعد — امتحان Goethe أو نتيجة IELTS أو بكالوريا يونيو. هذا التاريخ هو الذي يحدد وتيرة البرنامج.", note: "5 دقائق" },
      { n: "02", title: "التشخيص", lead: "جلسة 45 دقيقة في المركز، دون أي التزام.", body: "اختبار كتابي قصير، ومقابلة شفوية للغات، وتمارين نموذجية للبكالوريا. النتيجة تحدد المستوى الحقيقي وتبيّن ما إذا كان الأفضل البدء بمستوى أدنى.", note: "45 د · مجاني" },
      { n: "03", title: "البرنامج والتسجيل", lead: "يُسلّم الجدول مطبوعاً مع مواعيد الامتحانات التجريبية.", body: "يفصّل البرنامج الفصول الأسبوعية والواجبات والامتحانات التجريبية الأربعة للفصل. الأداء شهري، برنامجاً ببرنامج، دون التزام سنوي.", note: "في المركز" },
      { n: "04", title: "أول حصة", lead: "ينضم المتعلّم إلى المجموعة في الجلسة التالية.", body: "تُكوَّن المجموعات حسب المستوى لا حسب العمر. تُسلَّم النماذج المصححة والبرنامج المطبوع في الحصة الأولى دون زيادة.", note: "الجلسة التالية" },
    ],
    facts: [
      ["مدة التشخيص", "45 دقيقة"], ["المجموعات", "حسب المستوى"],
      ["الوتيرة", "6 إلى 10 س أسبوعياً"], ["الأداء", "شهري، دون التزام"],
      ["الكتيبات", "مشمولة في الرسوم"],
    ],
  },
  faq: {
    eyebrow: "الأسئلة الشائعة", title: "ما تحتاج معرفته.",
    items: [
      { q: "هل يجب اجتياز التشخيص قبل التسجيل؟", a: "نعم، لجميع البرامج. وضع متعلّم في مستوى لا يملكه هو أول سبب للانقطاع: تشخيص الـ45 دقيقة يتجنب ذلك. وهو مجاني ولا يترتب عليه أي التزام." },
      { q: "هل يمكن متابعة برنامجين في وقت واحد؟", a: "نعم. الجداول مبنية للسماح، مثلاً، بالألمانية ورياضيات البكالوريا في الأسبوع نفسه. تكون الرسوم حينها مجموع البرنامجين." },
      { q: "هل هناك التزام سنوي؟", a: "لا. الأداء شهري، برنامجاً ببرنامج. يمكن إيقاف البرنامج في نهاية الشهر دون رسوم." },
      { q: "هل الكتيبات مشمولة في الرسوم؟", a: "نعم. البرنامج المطبوع والنماذج المصححة والامتحانات التجريبية المقيّمة مشمولة في الرسوم الشهرية للبرنامج." },
      { q: "كيف يتم الأداء؟", a: "في بداية كل شهر، في المركز. لا خصم تلقائي ولا بطاقة محفوظة." },
    ],
  },
  contact: {
    label: "المركز", whatsapp: "راسلنا على واتساب", diagnosis: "أجرِ التشخيص",
    message: "مرحباً، أود الحصول على معلومات حول التسجيل.", footer: "مركز اللغات والتحضير للامتحانات",
  },
  modal: {
    eyebrow: "دار العلم · الدار البيضاء", title: "احجز موعداً",
    body: "تشخيص مجاني لمدة 45 دقيقة دون أي التزام. اختر برنامجاً والوقت المناسب: سيُجهَّز طلبك لواتساب.",
    moduleLabel: "البرنامج", moduleDefault: "يُحدد أثناء التشخيص", dayLabel: "اليوم المناسب",
    timeLabel: "الوقت المناسب", availabilityLabel: "التوقيت المناسب", messageLabel: "رسالتك",
    submit: "إرسال على واتساب ↗",
    days: ["الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
    times: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"],
    message: (c) => [
      "مرحباً، أود حجز موعد لإجراء تشخيص.",
      c.module ? `البرنامج: ${c.module}` : "البرنامج: يُحدد أثناء التشخيص",
      `اليوم المناسب: ${c.day}`,
      `الوقت المناسب: ${c.time}`,
      ...(c.availability ? [`التوقيت المناسب: ${c.availability}`] : []),
      "",
      `${ar.brand.name} · ${ar.brand.address}`,
    ].join("\n"),
  },
  rail: ["01 / 04 · الأترى", "02 / 04 · البرامج", "03 / 04 · المنهجية", "04 / 04 · المركز"],
  plaques: [
    { label: "Deutsch", detail: "A1→B2 · Goethe" },
    { label: "English", detail: "IELTS C1" },
    { label: "Français", detail: "TCF Canada" },
    { label: "دار العلم", detail: "بكالوريا SM · SVT" },
  ],
  sectionLabels: {
    programmes: "سبعة برامج", twoPaths: "طريقان، ومستوى واحد من التميّز.",
    chooseDeadline: "اختر موعدك", modules: "برامج",
    certifications: "التحضير للشهادات",
  },
};

export const translations: Record<Locale, Dict> = { fr, ar, en, de };
