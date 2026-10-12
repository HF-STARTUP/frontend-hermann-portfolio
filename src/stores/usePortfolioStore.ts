"use client";

import { create } from "zustand";
import type {
    BlogPost,
    Certification,
    Education,
    Experience,
    Project,
    ProjectCategory,
    SiteContent,
    SocialLink,
    TechCategory,
    Technology,
} from "@/types/portfolio.type";
import {
    blogPosts as mockBlogPosts,
    certifications as mockCertifications,
    education as mockEducation,
    experiences as mockExperiences,
    projectCategories as mockProjectCategories,
    projects as mockProjects,
    siteContent as mockSiteContent,
    socialLinks as mockSocialLinks,
    techCategories as mockTechCategories,
    technologies as mockTechnologies,
} from "@/mocks/portfolio.mock";

/**
 * Miroir client des données PUBLIQUES du portfolio, lu par les composants
 * d'affichage. Il n'est plus une source de vérité : React Query charge les
 * endpoints et PortfolioHydration recopie chaque réponse ici via `hydrate`.
 *
 * Les mutations admin ne passent PAS par ce store — elles utilisent les hooks
 * de src/hooks/portfolio/ puis invalident les queries, ce qui re-déclenche la
 * synchronisation vers ce miroir. Les seeds servent uniquement de repli si
 * l'API est injoignable au premier rendu.
 */
interface PortfolioState {
    /* Données structurées */
    projects: Project[];
    posts: BlogPost[];
    techCategories: TechCategory[];
    technologies: Technology[];
    projectCategories: ProjectCategory[];
    experiences: Experience[];
    education: Education[];
    /** Certifications affichées sur la page À propos */
    certifications: Certification[];
    socialLinks: SocialLink[];
    /** Tous les textes publics du portfolio (éditables via /admin/content) */
    siteContent: SiteContent;

    /** Remplace les slices fournies (réponses React Query réussies). */
    hydrate: (data: {
        projects?: Project[];
        posts?: BlogPost[];
        projectCategories?: ProjectCategory[];
        techCategories?: TechCategory[];
        technologies?: Technology[];
        experiences?: Experience[];
        education?: Education[];
        certifications?: Certification[];
        socialLinks?: SocialLink[];
        siteContent?: SiteContent;
    }) => void;
    /** Vrai dès qu'une passe d'hydratation a été tentée. */
    hydrated: boolean;
}

const usePortfolioStore = create<PortfolioState>((set) => ({
    projects: mockProjects,
    posts: mockBlogPosts,
    techCategories: mockTechCategories,
    technologies: mockTechnologies,
    projectCategories: mockProjectCategories,
    experiences: mockExperiences,
    education: mockEducation,
    certifications: mockCertifications,
    socialLinks: mockSocialLinks,
    siteContent: mockSiteContent,
    hydrated: false,

    hydrate: (data) =>
        set((state) => ({
            ...(data.projects && { projects: data.projects }),
            ...(data.posts && { posts: data.posts }),
            ...(data.projectCategories && {
                projectCategories: data.projectCategories,
            }),
            ...(data.techCategories && { techCategories: data.techCategories }),
            ...(data.technologies && { technologies: data.technologies }),
            ...(data.experiences && { experiences: data.experiences }),
            ...(data.education && { education: data.education }),
            ...(data.certifications && { certifications: data.certifications }),
            ...(data.socialLinks && { socialLinks: data.socialLinks }),
            ...(data.siteContent && { siteContent: data.siteContent }),
            hydrated: true,
        })),
}));

export { usePortfolioStore };
