export const BRAND = {
  name: "Dar Al-Ilm Académie",
  mark: "DAR AL-ILM",
  arabic: "دار العلم",
  eyebrow: "Casablanca · Bd Zerktouni · Maârif",
  address: "Bd Zerktouni, Maârif, Casablanca",
  hours: "Lundi — Samedi · 9 h — 21 h",
  hoursNote: "Dimanche sur rendez-vous",
  phone: "+212 661 489 210",
  phoneHref: "tel:+212661489210",
  whatsapp: "212661489210",
};

export function whatsappHref(message?: string) {
  const base = `https://wa.me/${BRAND.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const CERTIFICATIONS = ["Goethe", "ÖSD", "IELTS", "TOEFL", "TCF", "DELF B2", "Examen national"];

export const TICKER =
  "ALLEMAND A1→B2 · IELTS · TCF · BAC SM · BAC SVT · BAC ÉCO · RÉGIONAL 1RE BAC · AUSBILDUNG ·";

export type Programme = {
  code: string;
  n: string;
  title: string;
  subtitle: string;
  description: string;
  hours: string;
  price: string;
  value: number;
  family: "langues" | "bac";
};

export const PROGRAMMES: Programme[] = [
  {
    code: "DE-A1B2", n: "01 / 07", title: "Allemand intensif & Ausbildung",
    subtitle: "Deutsch A1 → B2 · Goethe · ÖSD",
    description: "Quatre niveaux CECRL, de la première phrase à l’entretien d’Ausbildung.",
    hours: "10 h / sem.", price: "1 300 MAD / mois", value: 1300, family: "langues",
  },
  {
    code: "EN-IELTS", n: "02 / 07", title: "Anglais académique & IELTS",
    subtitle: "English A2 → C1 · IELTS · TOEFL",
    description: "De la fluidité orale à la rédaction académique, avec simulation notée chaque mois.",
    hours: "6 h / sem.", price: "800 MAD / mois", value: 800, family: "langues",
  },
  {
    code: "FR-TCF", n: "03 / 07", title: "Français communication & TCF",
    subtitle: "Français B1 → C1 · TCF · DELF B2",
    description: "Expression écrite et orale calibrée sur les épreuves TCF Canada et DELF B2.",
    hours: "6 h / sem.", price: "750 MAD / mois", value: 750, family: "langues",
  },
  {
    code: "BAC-2SM", n: "04 / 07", title: "Mathématiques & physique-chimie",
    subtitle: "2ème Bac SM / PC · Examen national",
    description: "Analyse, algèbre, mécanique et électricité, par annales corrigées.",
    hours: "8 h / sem.", price: "900 MAD / mois", value: 900, family: "bac",
  },
  {
    code: "BAC-2SVT", n: "05 / 07", title: "Sciences de la vie et de la Terre",
    subtitle: "2ème Bac SVT · Examen national",
    description: "Méthodologie de rédaction scientifique : problématique, schéma, conclusion.",
    hours: "6 h / sem.", price: "800 MAD / mois", value: 800, family: "bac",
  },
  {
    code: "BAC-2ECO", n: "06 / 07", title: "Sciences économiques & comptabilité",
    subtitle: "2ème Bac Éco / SGC · Examen national",
    description: "Économie générale, comptabilité et mathématiques financières.",
    hours: "6 h / sem.", price: "800 MAD / mois", value: 800, family: "bac",
  },
  {
    code: "BAC-1REG", n: "07 / 07", title: "Préparation régional 1ère Bac",
    subtitle: "1ère Bac Régional · FR · HG · AR",
    description: "Sécuriser les points d’avance du Régional avant la 2ème Bac.",
    hours: "6 h / sem.", price: "650 MAD / mois", value: 650, family: "bac",
  },
];

export const HERO = {
  title: ["Apprendre une langue.", "Réussir son Bac."],
  subtitle:
    "Sept programmes, un seul niveau d’exigence. Allemand A1→B2, IELTS, TCF et préparation complète au Baccalauréat marocain.",
  primary: "Voir les programmes",
  secondary: "Prendre rendez-vous",
};

export const METRICS = [
  { value: "07", label: "programmes", note: "Langues & Bac" },
  { value: "45", suffix: " min", label: "diagnostic offert", note: "avant toute inscription" },
  { value: "6—10", suffix: " h", label: "par semaine", note: "selon le module" },
  { value: "9—21", label: "ouverture", note: "lundi au samedi" },
];

export const FAMILIES = [
  { n: "03", title: "Langues & certifications", body: "Allemand, anglais, français. Quatre niveaux, des échéances et des examens blancs notés.", codes: "DE · IELTS · TCF" },
  { n: "04", title: "Baccalauréat marocain", body: "Maths, physique, SVT, économie et Régional. Des annales corrigées au barème officiel.", codes: "SM · PC · SVT · ECO · 1REG" },
];

export const METHOD = {
  eyebrow: "Méthode",
  title: "Nous ne vendons pas des heures de cours. Nous préparons une échéance.",
  body: "Chaque module a une date de fin, un barème et des examens blancs. Le reste — exercices, révisions, corrections — est organisé autour de cette date.",
  steps: [
    { n: "01", title: "Diagnostic", body: "Une séance d’évaluation écrite et orale, 45 minutes, avant toute inscription. Nous ne plaçons personne dans un niveau qu’il n’a pas.", note: "45 min · offert" },
    { n: "02", title: "Programme daté", body: "Chaque module a son calendrier : chapitres, devoirs, examens blancs. Le programme est remis imprimé à l’inscription, avec les dates.", note: "Remis à l’inscription" },
    { n: "03", title: "Examens blancs", body: "Toutes les quatre semaines, en condition réelle : même durée, même barème, correction rendue sous 72 heures.", note: "Toutes les 4 semaines" },
  ],
};

export const PHOTOS = {
  label: "Casablanca",
  title: "Trois repères de la ville.",
  body: "Une façade Art déco, une table de travail, un boulevard planté de palmiers : trois repères de la ville où se trouve le centre.",
  note: "Les photographies montrent Casablanca ; elles ne représentent pas les locaux du centre.",
  credit: "Photo",
  items: [
    {
      src: "/photos/deco.jpg", alt: "Façade Art déco, centre-ville de Casablanca",
      caption: "Façade Art déco, centre-ville de Casablanca.", author: "Oumaima Loudini", license: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
      fileUrl: "https://commons.wikimedia.org/wiki/File:Art_deco_building_in_Casablanca.jpg",
    },
    {
      src: "/photos/desk.jpg", alt: "Prise de notes à la main",
      caption: "Prise de notes à la main, un geste du quotidien.", author: "Shixart1985", license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
      fileUrl: "https://commons.wikimedia.org/wiki/File:Person_writing_in_a_notebook_while_sitting_at_a_desk.jpg",
    },
    {
      src: "/photos/palms.jpg", alt: "Boulevard planté de palmiers, Casablanca",
      caption: "Boulevard planté de palmiers, Casablanca.", author: "Sharon Hahn Darlin", license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
      fileUrl: "https://commons.wikimedia.org/wiki/File:Casablanca_street_with_palms_and_taxis,_November_2023.jpg",
    },
  ],
};

export const TARIFFS = {
  label: "Tarifs",
  title: "Une grille simple, mensuelle.",
  body: "Le tarif dépend du module, jamais du nombre de séances suivies. Paiement au début de chaque mois, module par module, sans engagement annuel ni prélèvement automatique. Supports et examens blancs inclus.",
  note: "2026 · MAD",
  badge: "Sans engagement annuel",
  footnote: "Tarifs affichés en dirhams marocains, par mois et par module.",
};

export const ADMISSION = {
  label: "Admission",
  title: "Quatre étapes. Aucune inscription à l’aveugle.",
  body: "On ne s’inscrit pas à un module sans savoir d’où l’on part. La procédure est la même pour tous les élèves, du premier cours d’allemand à la préparation du Bac.",
  steps: [
    { n: "01", title: "Prise de contact", lead: "Par téléphone ou sur WhatsApp, du lundi au samedi.", body: "Nous demandons trois informations : le module visé, le niveau estimé et l’échéance — un examen Goethe, un score IELTS, le Bac de juin. C’est cette date qui détermine le rythme du programme.", note: "5 minutes" },
    { n: "02", title: "Diagnostic", lead: "Une séance de 45 minutes au centre, sans engagement.", body: "Épreuve écrite courte, entretien oral pour les langues, exercices types pour le Bac. Le résultat situe le niveau réel et indique s’il faut commencer un palier en dessous de celui visé.", note: "45 minutes · offert" },
    { n: "03", title: "Programme et inscription", lead: "Le calendrier est remis imprimé, avec les dates d’examen blanc.", body: "Le programme détaille les chapitres par semaine, les devoirs et les quatre examens blancs du trimestre. Le règlement se fait au mois, module par module, sans engagement annuel.", note: "Au centre" },
    { n: "04", title: "Premier cours", lead: "L’élève rejoint le groupe à la session suivante.", body: "Les groupes sont constitués par niveau, pas par âge. Les annales corrigées et le programme imprimé sont remis au premier cours, sans supplément.", note: "Session suivante" },
  ],
  facts: [
    ["Durée du diagnostic", "45 minutes"],
    ["Groupes", "Constitués par niveau"],
    ["Rythme", "6 à 10 h par semaine"],
    ["Règlement", "Mensuel, sans engagement"],
    ["Supports", "Inclus dans le tarif"],
  ],
  before: "Avant de venir",
};

export const FAQ = [
  {
    q: "Faut-il passer le diagnostic avant de s’inscrire ?",
    a: "Oui, pour tous les modules. Placer un élève dans un niveau qu’il n’a pas est la première cause d’abandon : le diagnostic de 45 minutes évite cela. Il n’est pas facturé et ne crée aucun engagement.",
  },
  {
    q: "Peut-on suivre deux modules en même temps ?",
    a: "Oui. Les emplois du temps sont construits pour permettre, par exemple, l’allemand et les mathématiques du Bac dans la même semaine. Le tarif est alors la somme des deux modules.",
  },
  {
    q: "Y a-t-il un engagement annuel ?",
    a: "Non. Le règlement est mensuel, module par module. Un module peut être arrêté en fin de mois, sans frais.",
  },
  {
    q: "Les supports sont-ils compris dans le tarif ?",
    a: "Oui. Le programme imprimé, les annales corrigées et les examens blancs notés sont compris dans le tarif mensuel du module.",
  },
  {
    q: "Comment se déroule le règlement ?",
    a: "Au début de chaque mois, au centre. Aucun prélèvement automatique, aucune carte enregistrée.",
  },
];

export const CONTACT = {
  label: "Le centre",
  whatsapp: "Écrire sur WhatsApp",
  diagnosis: "Faire le diagnostic",
  message: "Bonjour, je souhaite des informations sur les inscriptions.",
  booking: "Bonjour, je souhaite prendre rendez-vous pour un diagnostic.",
  footer: "Centre de langues et de préparation",
};
