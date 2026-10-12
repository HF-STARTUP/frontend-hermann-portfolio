import {
    SiAnsible,
    SiDocker,
    SiExpress,
    SiFigma,
    SiFirebase,
    SiFlutter,
    SiGit,
    SiGithub,
    SiGitlab,
    SiJavascript,
    SiLaravel,
    SiLinux,
    SiMysql,
    SiNestjs,
    SiNextdotjs,
    SiNginx,
    SiNodedotjs,
    SiPhp,
    SiPostgresql,
    SiPostman,
    SiPrisma,
    SiPython,
    SiReact,
    SiRedis,
    SiRedux,
    SiStorybook,
    SiTailwindcss,
    SiTypescript,
    SiVercel,
} from "react-icons/si";
import type {
    BlogPost,
    Certification,
    ContactMessage,
    Education,
    Experience,
    MediaItem,
    Project,
    ProjectCategory,
    SiteContent,
    SocialLink,
    TechCategory,
    Technology,
} from "@/types/portfolio.type";

/* ------------------------------------------------------------------ */
/* TODO backend.hermannfomo.dev : toutes ces données seront servies     */
/* par l'API (GET /projects, GET /posts, GET /technologies,             */
/* GET /site-content...). Elles sont mockées ici en attendant.          */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* Catégories de projets                                               */
/* ------------------------------------------------------------------ */

export const projectCategories: ProjectCategory[] = [
    { id: "web", label: "Web" },
    { id: "mobile", label: "Mobile" },
    { id: "fullstack", label: "Fullstack" },
    { id: "design", label: "Design" },
];

/* ------------------------------------------------------------------ */
/* Projets                                                             */
/* ------------------------------------------------------------------ */

export const projects: Project[] = [
    {
        id: "p1",
        slug: "vtc-control",
        title: "VTC Control",
        role: "Développeur Frontend Lead",
        description:
            "Plateforme de gestion de flotte VTC : abonnements, paiements Mobile Money, tracking GPS temps réel et tableaux de bord analytiques.",
        longDescription:
            "VTC Control est une plateforme SaaS complète de gestion pour sociétés de transport : gestion des chauffeurs et véhicules, abonnements et facturation, intégration des agrégateurs de paiement (MTN MoMo, Orange Money), suivi GPS temps réel sur carte, messagerie intégrée et reporting avancé. J'ai conçu l'intégralité du frontend avec Next.js, un design system interne sur Tailwind CSS et une couche temps réel via Socket.IO.",
        imageUrl:
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80",
        techStack: [
            "Next.js",
            "TypeScript",
            "Tailwind CSS",
            "Socket.IO",
            "TanStack Query",
        ],
        category: "fullstack",
        links: {
            demo: "https://vtccontrol.com",
            github: "https://github.com/hermann-charo",
        },
        featured: true,
        startDate: "2024-01",
        endDate: undefined,
    },
    {
        id: "p2",
        slug: "y-pay-wallet",
        title: "Y-PAY Wallet",
        role: "Développeur Frontend & Intégrations Paiement",
        description:
            "Application de portefeuille mobile money : transferts, paiement de factures et historique de transactions avec une UX fluide.",
        longDescription:
            "Y-PAY est une application fintech permettant les transferts d'argent mobile, le paiement de factures et la gestion de budget. J'ai travaillé sur l'interface web d'administration, les parcours d'onboarding et l'intégration des API des opérateurs télécoms (MTN, Orange) côté frontend.",
        imageUrl:
            "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80",
        techStack: ["React", "Node.js", "REST API", "MTN MoMo", "Orange Money"],
        category: "web",
        links: {
            demo: "https://play.google.com",
            github: "https://github.com/hermann-charo",
        },
        featured: true,
        startDate: "2023-09",
        endDate: "2024-05",
    },
    {
        id: "p3",
        slug: "whatsapp-business",
        title: "WhatsApp Business Hub",
        role: "Développeur Frontend",
        description:
            "Interface de gestion de conversations WhatsApp Business : messagerie temps réel, contacts, réponses automatiques et analytics.",
        longDescription:
            "Hub centralisé pour gérer plusieurs numéros WhatsApp Business : boîte de réception unifiée avec messagerie temps réel (WebSocket), gestion des contacts et labels, modèles de messages, réponses automatiques et statistiques d'engagement. Interface construite avec React, Zustand et socket.io-client.",
        imageUrl:
            "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=1200&q=80",
        techStack: ["React", "Zustand", "socket.io-client", "Tailwind CSS"],
        category: "web",
        links: {
            github: "https://github.com/hermann-charo",
        },
        featured: true,
        startDate: "2025-06",
        endDate: undefined,
    },
    {
        id: "p4",
        slug: "agora-labs",
        title: "AgoraLabs CRM",
        role: "Développeur Frontend",
        description:
            "CRM d'optimisation de conversion : pipelines commerciaux, campagnes et tableaux de bord orientés data.",
        imageUrl:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
        techStack: ["Vue.js", "Nuxt.js", "Pinia", "Chart.js"],
        category: "web",
        links: {
            demo: "https://agoralabs.org",
        },
        featured: false,
        startDate: "2023-03",
        endDate: "2023-08",
    },
    {
        id: "p5",
        slug: "fleet-mobile",
        title: "Fleet Manager Mobile",
        role: "Développeur Flutter",
        description:
            "Application mobile cross-platform pour chauffeurs : courses, feuilles de route et notifications push.",
        imageUrl:
            "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80",
        techStack: ["Flutter", "Dart", "Firebase", "REST API"],
        category: "mobile",
        links: {},
        featured: false,
        startDate: "2024-06",
        endDate: "2024-11",
    },
    {
        id: "p6",
        slug: "design-system-vtc",
        title: "Design System interne",
        role: "UI Engineer",
        description:
            "Design system réutilisable (composants, tokens, documentation) consommé par les applications VTC Control.",
        imageUrl:
            "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80",
        techStack: ["Storybook", "Tailwind CSS", "Radix UI", "TypeScript"],
        category: "design",
        links: {},
        featured: false,
        startDate: "2024-08",
        endDate: "2025-01",
    },
];

export const getFeaturedProjects = (): Project[] =>
    projects.filter((project) => project.featured).slice(0, 3);

export const getProjectBySlug = (slug: string): Project | undefined =>
    projects.find((project) => project.slug === slug);

/* ------------------------------------------------------------------ */
/* Technologies                                                        */
/* ------------------------------------------------------------------ */

// TODO backend.hermannfomo.dev : les icônes marques seront remplacées par
// des images servies par le backend (imageUrl) une fois l'upload en place.
export const techCategories: TechCategory[] = [
    { id: "frontend", name: "Frontend" },
    { id: "backend", name: "Backend" },
    { id: "mobile", name: "Mobile" },
    { id: "database", name: "Bases de données" },
    { id: "devops", name: "DevOps & Cloud" },
    { id: "outils", name: "Outils" },
];

export const technologies: Technology[] = [
    // Frontend
    { id: "t-react", name: "React", categoryId: "frontend", icon: SiReact },
    { id: "t-nextjs", name: "Next.js", categoryId: "frontend", icon: SiNextdotjs },
    { id: "t-typescript", name: "TypeScript", categoryId: "frontend", icon: SiTypescript },
    { id: "t-javascript", name: "JavaScript", categoryId: "frontend", icon: SiJavascript },
    { id: "t-tailwind", name: "Tailwind CSS", categoryId: "frontend", icon: SiTailwindcss },
    { id: "t-redux", name: "Redux", categoryId: "frontend", icon: SiRedux },
    // Backend
    { id: "t-nodejs", name: "Node.js", categoryId: "backend", icon: SiNodedotjs },
    { id: "t-express", name: "Express", categoryId: "backend", icon: SiExpress },
    { id: "t-nestjs", name: "NestJS", categoryId: "backend", icon: SiNestjs },
    { id: "t-laravel", name: "Laravel", categoryId: "backend", icon: SiLaravel },
    { id: "t-php", name: "PHP", categoryId: "backend", icon: SiPhp },
    { id: "t-python", name: "Python", categoryId: "backend", icon: SiPython },
    { id: "t-django", name: "Django", categoryId: "backend", icon: SiPython },
    // Mobile
    { id: "t-flutter", name: "Flutter", categoryId: "mobile", icon: SiFlutter },
    { id: "t-firebase", name: "Firebase", categoryId: "mobile", icon: SiFirebase },
    // Bases de données
    { id: "t-postgresql", name: "PostgreSQL", categoryId: "database", icon: SiPostgresql },
    { id: "t-mysql", name: "MySQL", categoryId: "database", icon: SiMysql },
    { id: "t-redis", name: "Redis", categoryId: "database", icon: SiRedis },
    { id: "t-prisma", name: "Prisma", categoryId: "database", icon: SiPrisma },
    // DevOps & Cloud
    { id: "t-docker", name: "Docker", categoryId: "devops", icon: SiDocker },
    { id: "t-linux", name: "Linux", categoryId: "devops", icon: SiLinux },
    { id: "t-nginx", name: "Nginx", categoryId: "devops", icon: SiNginx },
    { id: "t-ansible", name: "Ansible", categoryId: "devops", icon: SiAnsible },
    { id: "t-vercel", name: "Vercel", categoryId: "devops", icon: SiVercel },
    // Outils
    { id: "t-git", name: "Git", categoryId: "outils", icon: SiGit },
    { id: "t-github", name: "GitHub", categoryId: "outils", icon: SiGithub },
    { id: "t-gitlab", name: "GitLab", categoryId: "outils", icon: SiGitlab },
    { id: "t-figma", name: "Figma", categoryId: "outils", icon: SiFigma },
    { id: "t-postman", name: "Postman", categoryId: "outils", icon: SiPostman },
    { id: "t-storybook", name: "Storybook", categoryId: "outils", icon: SiStorybook },
];

/* ------------------------------------------------------------------ */
/* Blog                                                                */
/* ------------------------------------------------------------------ */

export const blogPosts: BlogPost[] = [
    {
        id: "b1",
        slug: "gerer-etat-complexe-nextjs",
        title: "Gérer un état complexe dans Next.js : Zustand vs Context vs TanStack Query",
        excerpt:
            "Retour d'expérience sur le choix des outils de state management dans une application Next.js de taille moyenne : ce que chaque solution apporte, et comment les combiner sans se tirer une balle dans le pied.",
        coverImageUrl:
            "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&q=80",
        tags: ["Next.js", "State Management", "Zustand"],
        publishedAt: "2025-07-12",
        readTimeMinutes: 8,
        content: [
            {
                type: "paragraph",
                text: "Quand une application Next.js grandit, la question du state management devient centrale. Entre le state local, le Context API, les librairies dédiées comme Zustand et la gestion des données serveur avec TanStack Query, il est facile de se perdre.",
            },
            { type: "heading", text: "Le bon outil pour la bonne donnée" },
            {
                type: "paragraph",
                text: "Ma règle simple : les données venant du serveur appartiennent à TanStack Query (cache, invalidation, revalidation), l'état UI global léger à Zustand, et tout ce qui reste local à un composant ne devrait jamais quitter ce composant.",
            },
            {
                type: "quote",
                text: "La meilleure architecture de state est celle que ton équipe comprend en relisant le code trois mois plus tard.",
                author: "Principe personnel",
            },
            { type: "heading", text: "Exemple de store Zustand" },
            {
                type: "code",
                language: "typescript",
                text: `import { create } from 'zustand';\n\ninterface CartStore {\n  items: string[];\n  addItem: (id: string) => void;\n}\n\nexport const useCartStore = create<CartStore>((set) => ({\n  items: [],\n  addItem: (id) =>\n    set((state) => ({ items: [...state.items, id] })),\n}));`,
            },
            {
                type: "paragraph",
                text: "Cette séparation nette a permis à mon équipe de réduire de moitié les bugs liés à la synchronisation d'état sur VTC Control.",
            },
        ],
    },
    {
        id: "b2",
        slug: "tailwind-css-design-system",
        title: "Construire un design system avec Tailwind CSS et Radix UI",
        excerpt:
            "Comment structurer ses tokens, composer des composants accessibles avec Radix et garder une base de code Tailwind maintenable sur le long terme.",
        coverImageUrl:
            "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=1200&q=80",
        tags: ["Tailwind CSS", "Design System", "Accessibilité"],
        publishedAt: "2025-05-28",
        readTimeMinutes: 6,
        content: [
            {
                type: "paragraph",
                text: "Un design system n'est pas juste une collection de composants : c'est un langage commun entre design et développement. Voici comment je structure mes tokens de couleur, d'espacement et de typographie.",
            },
            { type: "heading", text: "Des variables CSS aux classes utilitaires" },
            {
                type: "code",
                language: "css",
                text: `:root {\n  --background: 228 40% 97%;\n  --primary: 258 89% 62%;\n}\n\n.dark {\n  --background: 240 52% 4%;\n}`,
            },
            {
                type: "paragraph",
                text: "En mappant ces variables dans tailwind.config.ts, chaque composant devient théme-aware sans effort : bg-background, text-foreground fonctionnent dans les deux modes.",
            },
        ],
    },
    {
        id: "b3",
        slug: "temps-reel-websockets-react",
        title: "Temps réel dans React : bien utiliser les WebSockets avec Socket.IO",
        excerpt:
            "Patterns que j'utilise pour une connexion WebSocket robuste : reconnexion, rooms, optimistic updates et gestion mémoire des listeners.",
        coverImageUrl:
            "https://images.unsplash.com/photo-1551703599-2a4e224a1b16?w=1200&q=80",
        coverType: "youtube",
        // TODO backend.hermannfomo.dev : remplacer par la vraie vidéo de démo
        coverYoutubeUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
        tags: ["React", "WebSocket", "Socket.IO"],
        publishedAt: "2025-04-15",
        readTimeMinutes: 7,
        content: [
            {
                type: "paragraph",
                text: "Sur un chat temps réel ou du suivi GPS, la qualité perçue dépend surtout de la robustesse de la couche réseau. Une mauvaise gestion de reconnexion transforme une démo impressionnante en produit frustrant.",
            },
            { type: "heading", text: "Toujours nettoyer ses listeners" },
            {
                type: "code",
                language: "typescript",
                text: `useEffect(() => {\n  socket.on('message:new', onNewMessage);\n  return () => {\n    socket.off('message:new', onNewMessage);\n  };\n}, [onNewMessage]);`,
            },
            {
                type: "paragraph",
                text: "Ce simple cleanup évite les duplications de messages après navigation — le bug temps réel le plus courant que je rencontre en code review.",
            },
        ],
    },
    {
        id: "b4",
        slug: "flutter-pour-developpeur-web",
        title: "Flutter vu par un développeur web : convergences et pièges",
        excerpt:
            "Venir de React vers Flutter : ce qui se transfère naturellement (composition, state) et ce qui surprend (layout, asynchronisme, outillage).",
        coverImageUrl:
            "https://images.unsplash.com/photo-1526498843955-2e45a3be98fe?w=1200&q=80",
        coverType: "video",
        // TODO backend.hermannfomo.dev : remplacer par la vraie vidéo hébergée
        coverVideoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        tags: ["Flutter", "Mobile", "Cross-platform"],
        publishedAt: "2025-02-20",
        readTimeMinutes: 5,
        content: [
            {
                type: "paragraph",
                text: "Après plusieurs années sur React, apprendre Flutter m'a surpris par sa familiarité : composition de widgets, state management par stores immuables, hot reload… Mais certaines habitudes web jouent des tours.",
            },
            { type: "heading", text: "Le piège du layout" },
            {
                type: "paragraph",
                text: "Contrairement au CSS, Flutter ne fait pas d'hypothèses implicites : tout est contraintes explicites. Comprendre RenderBox et le pipeline de layout est le vrai déclic.",
            },
        ],
    },
];

export const getBlogPostBySlug = (slug: string): BlogPost | undefined =>
    blogPosts.find((post) => post.slug === slug);

/* ------------------------------------------------------------------ */
/* Parcours                                                            */
/* ------------------------------------------------------------------ */

export const experiences: Experience[] = [
    {
        id: "e1",
        company: "Genius Technologies",
        position: "Développeur Frontend Lead",
        description:
            "Conception du frontend de VTC Control (SaaS de gestion de flotte) : architecture Next.js, design system interne, temps réel Socket.IO et encadrement de deux développeurs juniors.",
        startDate: "2024-01",
        endDate: undefined,
        location: "Douala, Cameroun",
        sortOrder: 0,
    },
    {
        id: "e2",
        company: "Freelance",
        position: "Développeur Fullstack",
        description:
            "Missions variées : applications de gestion, sites vitrines performants, intégrations paiement Mobile Money et déploiement sur VPS Linux.",
        startDate: "2023-06",
        endDate: "2023-12",
        location: "À distance",
        sortOrder: 1,
    },
    {
        id: "e3",
        company: "Agence Digitale Douala",
        position: "Développeur Web Junior",
        description:
            "Premières expériences professionnelles : intégration d'interfaces responsive, optimisation SEO technique et maintenance d'applications Laravel.",
        startDate: "2022-09",
        endDate: "2023-05",
        location: "Douala, Cameroun",
        sortOrder: 2,
    },
];

export const education: Education[] = [
    {
        id: "ed1",
        school: "Université de Douala",
        degree: "Licence en Informatique",
        description:
            "Fondamentaux : algorithmique, réseaux, systèmes d'exploitation, bases de données.",
        startDate: "2019-10",
        endDate: "2022-07",
        sortOrder: 0,
    },
    {
        id: "ed2",
        school: "Certifications en ligne",
        degree: "AWS / Docker / Administration Linux",
        description: "Autoformation continue via des certifications techniques.",
        startDate: "2022-01",
        endDate: undefined,
        sortOrder: 1,
    },
];

/* ------------------------------------------------------------------ */
/* Certifications                                                      */
/* ------------------------------------------------------------------ */

export const certifications: Certification[] = [
    {
        id: "c1",
        name: "AWS Certified Cloud Practitioner",
        issuer: "Amazon Web Services",
        description:
            "Fondamentaux du cloud AWS : calcul, stockage, sécurité, tarification et architecture distribuée.",
        dateObtained: "2023-07-15",
        url: "https://www.credly.com/badges/aws-cloud-practitioner",
        imageUrl:
            "https://images.unsplash.com/photo-15505744163-ab1f2b4cb5e8?w=200&q=80",
        sortOrder: 0,
    },
    {
        id: "c2",
        name: "Docker Certified Associate",
        issuer: "Docker Inc.",
        description:
            "Conteneurisation, orchestration avec Docker Swarm, gestion des images et des réseaux.",
        dateObtained: "2023-09-22",
        url: "https://www.credly.com/badges/docker-certified-associate",
        imageUrl:
            "https://images.unsplash.com/photo-1522364722578-520755432815?w=200&q=80",
        sortOrder: 1,
    },
    {
        id: "c3",
        name: "LPIC-1 Certified Linux Administrator",
        issuer: "Linux Professional Institute",
        description:
            "Administration systèmes Linux : gestion des utilisateurs, paquets, fichiers, automatisation (scripts) et réseaux.",
        dateObtained: "2023-11-30",
        url: undefined,
        imageUrl: undefined,
        sortOrder: 2,
    },
];

/* ------------------------------------------------------------------ */
/* Liens sociaux                                                       */
/* ------------------------------------------------------------------ */

export const socialLinks: SocialLink[] = [
    {
        id: "sl-github",
        label: "GitHub",
        url: "https://github.com/hermann-charo",
        iconName: "Github",
    },
    {
        id: "sl-linkedin",
        label: "LinkedIn",
        url: "https://www.linkedin.com/",
        iconName: "Linkedin",
    },
    { id: "sl-twitter", label: "Twitter", url: "https://twitter.com/", iconName: "Twitter" },
    {
        // TODO backend.hermannfomo.dev : remplacer par l'email réel
        id: "sl-email",
        label: "Email",
        url: "mailto:contact@hermannfomo.dev",
        iconName: "Mail",
    },
];

/* ------------------------------------------------------------------ */
/* Médiathèque (seed = images déjà utilisées par les mocks)            */
/* ------------------------------------------------------------------ */

const mediaUrls: [string, string][] = [
    ["Projet VTC Control", "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80"],
    ["Projet Y-PAY Wallet", "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80"],
    ["Projet WhatsApp Business", "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=1200&q=80"],
    ["Projet AgoraLabs", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80"],
    ["Projet Fleet Manager", "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80"],
    ["Projet Design System", "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80"],
    ["Article état complexe", "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&q=80"],
    ["Article design system", "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=1200&q=80"],
    ["Article temps réel", "https://images.unsplash.com/photo-1551703599-2a4e224a1b16?w=1200&q=80"],
    ["Article Flutter", "https://images.unsplash.com/photo-1526498843955-2e45a3be98fe?w=1200&q=80"],
];

export const mediaLibrary: MediaItem[] = mediaUrls.map(([name, src], index) => ({
    id: `media-${index + 1}`,
    name,
    src,
}));

/* ------------------------------------------------------------------ */
/* Contenu éditable du site                                            */
/* ------------------------------------------------------------------ */

export const siteContent: SiteContent = {
    profile: {
        fullName: "Hermann FOMO",
        firstName: "Hermann",
        lastName: "FOMO",
        logoInitials: "HF",
        roleLine: "Développeur Frontend",
        techLine: "React.js, Nuxt.js, Next.js, Vue.js, Tailwind.css",
        location: "Résident à Douala, Cameroun",
        email: "contact@hermannfomo.dev",
        cvUrl: "",
    },
    hero: {
        availabilityBadge: "Ouvert pour de nouvelles opportunités",
        description:
            "Développeur Frontend avec 2 ans d'expérience, spécialisé en JavaScript et Flutter. Je porte une attention particulière à la qualité et à la fiabilité des interfaces que je construis, appuyée par une bonne maîtrise des environnements sur lesquels elles s'exécutent (Docker, CI/CD, réseaux). Curieux et déterminé, je reste toujours ouvert à la critique constructive pour continuer à progresser.",
        ctaLabel: "Voir mes projets",
        scrollHint: "Découvrir",
        stats: [
            { id: "stat-1", value: "2+", label: "ans d'expérience" },
            { id: "stat-2", value: "5+", label: "Projets livrés" },
            { id: "stat-3", value: "4+", label: "Framework" },
            { id: "stat-4", value: "∞", label: "Adaptation & passion" },
        ],
    },
    skills: [
        {
            id: "skill-1",
            name: "Frontend Development",
            iconName: "MonitorSmartphone",
            features: [
                "Next.js",
                "React",
                "TypeScript",
                "JavaScript (ES6+)",
                "Tailwind CSS",
                "Responsive Design",
                "REST API Integration",
            ],
        },
        {
            id: "skill-2",
            name: "Backend Development",
            iconName: "Code2",
            features: [
                "Laravel",
                "PHP",
                "Django",
                "Node.js",
                "REST API Development",
                "Authentication & Authorization",
            ],
        },
        {
            id: "skill-3",
            name: "Mobile Development",
            iconName: "Smartphone",
            features: [
                "Flutter",
                "Android Deployment",
                "Cross-platform Applications",
                "API Integration",
                "State Management",
            ],
        },
        {
            id: "skill-4",
            name: "Database",
            iconName: "Database",
            features: [
                "MySQL",
                "PostgreSQL",
                "Database Design",
                "Query Optimization",
                "ORM (Eloquent)",
            ],
        },
        {
            id: "skill-5",
            name: "DevOps & Cloud",
            iconName: "CloudCog",
            features: [
                "Docker",
                "CI/CD",
                "Linux Server Deployment",
                "Apache Reverse Proxy",
                "Ansible",
            ],
        },
        {
            id: "skill-6",
            name: "System Administration",
            iconName: "ServerCog",
            features: [
                "Linux Administration",
                "Windows Server",
                "DNS",
                "DHCP",
                "Zabbix Monitoring",
            ],
        },
        {
            id: "skill-7",
            name: "Networking",
            iconName: "Network",
            features: [
                "Network Configuration",
                "LAN Infrastructure",
                "Routing",
                "Switching",
                "Virtualization (VMware, VirtualBox)",
            ],
        },
        {
            id: "skill-8",
            name: "Version Control",
            iconName: "GitBranch",
            features: ["Git", "GitHub", "GitLab", "Code Review"],
        },
        {
            id: "skill-9",
            name: "Software Engineering",
            iconName: "ShieldCheck",
            features: [
                "Problem Solving",
                "System Architecture",
                "Performance Optimization",
                "Agile Development",
            ],
        },
    ],
    homeSections: {
        about: {
            badge: "À propos",
            titlePrefix: "Plus de",
            titleHighlight: "2 ans",
            titleSuffix: "d'expertise",
            subtitle:
                "Développeur Full Stack passionné par la création d'applications performantes et modernes. J'allie une expertise en développement Frontend, Backend et Mobile avec de solides compétences en administration systèmes, DevOps et infrastructures afin de concevoir des solutions robustes, évolutives et centrées sur l'expérience utilisateur.",
            ctaLabel: "En savoir plus",
        },
        technologies: {
            badge: "Stack technique",
            titlePrefix: "Technologies",
            titleHighlight: "utilisées",
            subtitle:
                "Les outils et frameworks que j'utilise au quotidien pour concevoir des interfaces performantes et maintenables.",
        },
        projects: {
            badge: "Portfolio",
            titlePrefix: "Ce que j'ai",
            titleHighlight: "construit",
            subtitle:
                "Une sélection de mes trois projets principaux — des solutions concrètes, du paiement mobile au temps réel.",
            ctaLabel: "Voir tous les projets",
        },
        contact: {
            badge: "Contact",
            titlePrefix: "Prêt à",
            titleHighlight: "collaborer ?",
            subtitle:
                "Un projet, une opportunité ou juste une question ? Écrivez-moi, je réponds rapidement.",
            sideTitle: "Restons en contact",
            sideDescription:
                "Basé à Douala au Cameroun et disponible à distance pour des missions partout dans le monde.",
        },
    },
    pages: {
        about: {
            badge: "À propos de moi",
            titlePrefix: "Derrière le",
            titleHighlight: "code",
            description:
                "Développeur passionné par la création d'interfaces performantes, accessibles et centrées sur l'expérience utilisateur.",
            bioTitle: "Hermann FOMO — Développeur Frontend",
            bioParagraphs: [
                "Développeur Frontend avec plus de 2 ans d'expérience, spécialisé en JavaScript et Flutter. Je porte une attention particulière à la qualité et à la fiabilité des interfaces que je construis, appuyée par une bonne maîtrise des environnements sur lesquels elles s'exécutent (Docker, CI/CD, réseaux).",
                "Curieux et déterminé, j'aime concevoir des solutions complètes : du pixel au serveur. Mon objectif est simple — des produits rapides, fiables et agréables à utiliser.",
            ],
            cvCtaLabel: "Télécharger mon CV",
            contactCtaLabel: "Me contacter",
            experienceTitle: "Expériences professionnelles",
            educationTitle: "Formation",
            certificationTitle: "Certifications",
            photoDesktopUrl:
                "https://images.unsplash.com/photo-1507003213389-eb6b1b243f32?w=800&q=80",
            photoMobileUrl:
                "https://images.unsplash.com/photo-1507003213389-eb6b1b243f32?w=400&q=80",
            skillsTitlePrefix: "Ce que je fais",
            skillsTitleHighlight: "concrètement",
        },
        projects: {
            badge: "Portfolio",
            titlePrefix: "Mes",
            titleHighlight: "projets",
            description:
                "Des applications web et mobile concrètes : gestion de flotte, fintech, messagerie temps réel et design systems.",
        },
        blog: {
            badge: "Blog",
            titlePrefix: "Articles &",
            titleHighlight: "retours d'expérience",
            description:
                "Ce que j'apprends au fil de mes projets : patterns React, outillage frontend, mobile et DevOps.",
        },
    },
    footer: {
        baseline:
            "Développeur Frontend basé à Douala, Cameroun — disponible pour de nouvelles opportunités.",
        copyrightPrefix: "Hermann FOMO",
        copyrightSuffix: "— Construit avec Next.js, Tailwind CSS & framer-motion.",
    },
    certifications,
};

/* Messages de démonstration (le formulaire de contact alimentera cette
   liste via le backend) */
export const contactMessages: ContactMessage[] = [
    {
        id: "m1",
        name: "Aïcha Mbarga",
        email: "aicha.mbarga@exemple.cm",
        subject: "Refonte d'un site vitrine",
        message:
            "Bonjour Hermann, je souhaite faire évoluer le site de mon entreprise avec une refonte complète. Auriez-vous disponibilité pour en discuter la semaine prochaine ?",
        sentAt: "2025-08-14T10:24:00.000Z",
        read: false,
    },
    {
        id: "m2",
        name: "Jean-Luc Kamdem",
        email: "jl.kamdem@exemple.com",
        subject: "Opportunité freelance — dashboard React",
        message:
            "Nous cherchons un développeur frontend expérimenté pour un dashboard analytique de 3 mois. Votre profil sur VTC Control correspond exactement à ce que nous recherchons.",
        sentAt: "2025-08-18T16:05:00.000Z",
        read: false,
    },
    {
        id: "m3",
        name: "Sophie Ngo",
        email: "sophie.ngo@exemple.fr",
        subject: "Question sur votre article Zustand",
        message:
            "Merci pour votre article sur la gestion d'état ! Une question : comment gérez-vous la persistance du store entre les rechargements de page ?",
        sentAt: "2025-08-20T09:41:00.000Z",
        read: true,
    },
];
