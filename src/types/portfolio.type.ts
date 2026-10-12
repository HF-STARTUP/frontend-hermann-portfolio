import type { IconType } from "react-icons";

/* ------------------------------------------------------------------ */
/* Projets                                                             */
/* ------------------------------------------------------------------ */

/** Catégorie de projet gérée depuis l'admin (id = slug) */
export interface ProjectCategory {
    id: string;
    label: string;
}

export interface ProjectLinks {
    demo?: string;
    github?: string;
}

export interface Project {
    id: string;
    slug: string;
    title: string;
    role: string;
    description: string;
    longDescription?: string;
    imageUrl: string;
    /** Noms des technologies (sélectionnées via le TagInput de l'admin) */
    techStack: string[];
    /** Id de ProjectCategory */
    category: string;
    links: ProjectLinks;
    featured: boolean;
    startDate: string;
    endDate?: string;
}

/* ------------------------------------------------------------------ */
/* Blog                                                                */
/* ------------------------------------------------------------------ */

export type BlogCoverType = "image" | "video" | "youtube";

export type BlogContentBlock =
    | { type: "paragraph"; text: string }
    | { type: "heading"; text: string }
    | { type: "quote"; text: string; author?: string }
    | { type: "code"; text: string; language?: string };

export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    /** Image de couverture (ou poster pour les couvertures vidéo/YouTube) */
    coverImageUrl: string;
    coverType?: BlogCoverType;
    /** Fichier vidéo (mp4/webm...) quand coverType = "video" */
    coverVideoUrl?: string;
    /** Lien YouTube (watch, youtu.be, shorts, embed...) quand coverType = "youtube" */
    coverYoutubeUrl?: string;
    tags: string[];
    publishedAt: string;
    readTimeMinutes: number;
    content: BlogContentBlock[];
}

/* ------------------------------------------------------------------ */
/* Technologies & catégories de technologies                           */
/* ------------------------------------------------------------------ */

export interface TechCategory {
    id: string;
    name: string;
}

export interface Technology {
    id: string;
    name: string;
    /** Id de TechCategory */
    categoryId: string;
    /** Icône marque (react-icons) — utilisée par les données seed */
    icon?: IconType;
    /** Image personnalisée (URL ou dataURL) choisie via l'admin */
    imageUrl?: string;
}

/* ------------------------------------------------------------------ */
/* Médiathèque (sélecteur d'images de l'admin)                         */
/* ------------------------------------------------------------------ */

export interface MediaItem {
    id: string;
    name: string;
    /** URL https ou dataURL (import local) */
    src: string;
}

/* ------------------------------------------------------------------ */
/* Contenu éditable du site (textes publics)                           */
/* ------------------------------------------------------------------ */

export interface StatItem {
    id: string;
    value: string;
    label: string;
}

export interface ProfileContent {
    fullName: string;
    /** Nom affiché en deux parties : base + surlignée (ex: Hermann + FOMO) */
    firstName: string;
    lastName: string;
    logoInitials: string;
    roleLine: string;
    techLine: string;
    location: string;
    email: string;
    cvUrl: string;
}

export interface HeroContent {
    availabilityBadge: string;
    description: string;
    ctaLabel: string;
    scrollHint: string;
    stats: StatItem[];
}

/** Carte de compétences (accueil « À propos » + page À propos) */
export interface SkillCard {
    id: string;
    name: string;
    /** Nom d'icône lucide résolu via iconPreset */
    iconName: string;
    features: string[];
}

export interface SectionHeading {
    badge: string;
    /** Texte avant la partie surlignée (ex: « Ce que j'ai ») */
    titlePrefix: string;
    /** Partie surlignée en dégradé (ex: « construit ») */
    titleHighlight: string;
    /** Texte après la partie surlignée (ex: « d'expertise ») */
    titleSuffix?: string;
    subtitle?: string;
    ctaLabel?: string;
}

export interface HomeAboutSectionContent extends SectionHeading {
    ctaLabel: string;
}

export interface HomeProjectsSectionContent extends SectionHeading {
    ctaLabel: string;
}

export interface HomeContactSectionContent extends SectionHeading {
    sideTitle: string;
    sideDescription: string;
}

export interface HomeSectionsContent {
    about: HomeAboutSectionContent;
    technologies: SectionHeading;
    projects: HomeProjectsSectionContent;
    contact: HomeContactSectionContent;
}

export interface AboutPageContent {
    badge: string;
    titlePrefix: string;
    titleHighlight: string;
    description: string;
    bioTitle: string;
    bioParagraphs: string[];
    cvCtaLabel: string;
    contactCtaLabel: string;
    experienceTitle: string;
    educationTitle: string;
    certificationTitle: string;
    /** Photo affichée sur les grands écrans (>= lg / 1024px) */
    photoDesktopUrl: string;
    /** Photo affichée sur les petits écrans (< lg / 1024px) */
    photoMobileUrl: string;
    skillsTitlePrefix: string;
    skillsTitleHighlight: string;
}

export interface ProjectsPageContent {
    badge: string;
    titlePrefix: string;
    titleHighlight: string;
    description: string;
}

export interface BlogPageContent {
    badge: string;
    titlePrefix: string;
    titleHighlight: string;
    description: string;
}

export interface PagesContent {
    about: AboutPageContent;
    projects: ProjectsPageContent;
    blog: BlogPageContent;
}

export interface FooterContent {
    baseline: string;
    copyrightPrefix: string;
    copyrightSuffix: string;
}

export interface SiteContent {
    profile: ProfileContent;
    hero: HeroContent;
    /** Cartes de compétences partagées accueil + page À propos */
    skills: SkillCard[];
    homeSections: HomeSectionsContent;
    pages: PagesContent;
    footer: FooterContent;
    /** Certifications gérées depuis /admin/timeline */
    certifications: Certification[];
}

export type SiteContentSection = keyof SiteContent;

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    sentAt: string;
    read: boolean;
}

/* ------------------------------------------------------------------ */
/* Parcours                                                            */
/* ------------------------------------------------------------------ */

export interface Experience {
    id: string;
    company: string;
    position: string;
    description: string;
    startDate: string;
    endDate?: string;
    location?: string;
    /** Ordre d'affichage (tri croissant) — éditable depuis /admin/timeline */
    sortOrder: number;
}

export interface Education {
    id: string;
    school: string;
    degree: string;
    description?: string;
    startDate: string;
    endDate?: string;
    /** Ordre d'affichage — éditable depuis /admin/timeline */
    sortOrder: number;
}

/* ------------------------------------------------------------------ */
/* Certifications                                                      */
/* ------------------------------------------------------------------ */

export interface Certification {
    id: string;
    name: string;
    issuer: string;
    description?: string;
    /** Date d'obtention au format "Y-m-d" */
    dateObtained: string;
    /** URL de vérification (ex: credly.com/...) */
    url?: string;
    /** Image du badge (choisie via ImagePicker dans l'admin) */
    imageUrl?: string;
    /** Ordre d'affichage */
    sortOrder: number;
}

/** Lien social éditable — icône résolue via le preset lucide */
export interface SocialLink {
    id: string;
    label: string;
    url: string;
    iconName: string;
}
