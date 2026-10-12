import type { Certification, Project, Technology } from "@/types/portfolio.type";
import { technologies as seedTechnologies } from "@/mocks/portfolio.mock";

/**
 * Normalisations entre le JSON de l'API et les interfaces TS du frontend,
 * partagées par les services du portfolio.
 */

/** Table nom → icône marque issue des seeds (l'API ne transporte pas d'icônes) */
const SEED_ICONS_BY_NAME = new Map<string, Technology["icon"]>(
    seedTechnologies
        .filter((tech) => tech.icon)
        .map((tech) => [tech.name, tech.icon])
);

interface RawProjectLinks {
    demoUrl?: string | null;
    githubUrl?: string | null;
}

/** ProjectResource tel que renvoyé par l'API (avant normalisation des liens) */
export type RawProject = Omit<Project, "links"> & { links: RawProjectLinks };

/** Resource ProjectResource → interface TS Project (links demoUrl/githubUrl → demo/github) */
export const normalizeProject = (raw: RawProject): Project => ({
    ...raw,
    links: {
        demo: raw.links?.demoUrl ?? undefined,
        github: raw.links?.githubUrl ?? undefined,
    },
});

/** Inverse, pour l'envoi des formulaires admin */
export const denormalizeProjectLinks = (
    links: Project["links"]
): { demoUrl?: string | null; githubUrl?: string | null } => ({
    demoUrl: links?.demo || null,
    githubUrl: links?.github || null,
});

/** Réattache l'icône de marque seed par nom (l'admin peut la masquer via imageUrl) */
export const normalizeTechnology = (raw: Technology): Technology => ({
    ...raw,
    icon: raw.imageUrl ? undefined : SEED_ICONS_BY_NAME.get(raw.name),
});

/* ------------------------------------------------------------------ */
/* Certifications                                                      */
/* ------------------------------------------------------------------ */

/** CertificationResource tel que renvoyé par l'API (snake_case → camelCase) */
export interface RawCertification {
    id: string;
    name: string;
    issuer: string;
    description?: string | null;
    date_obtained: string;
    url?: string | null;
    image_url?: string | null;
    sort_order: number;
}

/** RawCertification → Certification (snake_case → camelCase) */
export const normalizeCertification = (raw: RawCertification): Certification => ({
    id: raw.id,
    name: raw.name,
    issuer: raw.issuer,
    description: raw.description ?? undefined,
    dateObtained: raw.date_obtained,
    url: raw.url ?? undefined,
    imageUrl: raw.image_url ?? undefined,
    sortOrder: raw.sort_order,
});
