import { useQueryProvider } from "@/hooks/hooksProvider";
import { ProjectServiceInstance } from "@/services/portfolio/projectService";
import { BlogPostServiceInstance } from "@/services/portfolio/blogPostService";
import {
    TaxonomyServiceInstance,
    TaxonomyApiPath,
} from "@/services/portfolio/taxonomyService";
import {
    TimelineServiceInstance,
    TimelineApiPath,
} from "@/services/portfolio/timelineService";
import { CertificationServiceInstance, CertificationApiPath } from "@/services/portfolio/certificationService";
import {
    SiteContentServiceInstance,
    SiteContentApiPath,
} from "@/services/portfolio/siteContentService";
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

/**
 * Requêtes publiques du portfolio (routes #1–#11).
 * Les résultats alimentent le store zustand via PortfolioHydration
 * et servent directement aux composants qui en ont besoin.
 */

export const useSiteContentQuery = () =>
    useQueryProvider<SiteContent>({
        queryKey: [SiteContentApiPath.PublicSiteContent],
        queryFn: () => SiteContentServiceInstance.getSiteContent(),
    });

export const useProjectsQuery = () =>
    useQueryProvider<Project[]>({
        queryKey: ["/projects"],
        queryFn: () => ProjectServiceInstance.getProjects(),
    });

export const useProjectBySlugQuery = (slug: string | undefined) =>
    useQueryProvider<Project>({
        queryKey: ["/projects", slug],
        queryFn: () => ProjectServiceInstance.getProjectBySlug(slug as string),
        enabled: Boolean(slug),
    });

export const useBlogPostsQuery = () =>
    useQueryProvider<BlogPost[]>({
        queryKey: ["/blog-posts"],
        queryFn: () => BlogPostServiceInstance.getBlogPosts(),
    });

export const useBlogPostBySlugQuery = (slug: string | undefined) =>
    useQueryProvider<BlogPost>({
        queryKey: ["/blog-posts", slug],
        queryFn: () => BlogPostServiceInstance.getBlogPostBySlug(slug as string),
        enabled: Boolean(slug),
    });

export const useProjectCategoriesQuery = () =>
    useQueryProvider<ProjectCategory[]>({
        queryKey: [TaxonomyApiPath.PublicProjectCategories],
        queryFn: () => TaxonomyServiceInstance.getProjectCategories(),
    });

export const useTechCategoriesQuery = () =>
    useQueryProvider<TechCategory[]>({
        queryKey: [TaxonomyApiPath.PublicTechCategories],
        queryFn: () => TaxonomyServiceInstance.getTechCategories(),
    });

export const useTechnologiesQuery = () =>
    useQueryProvider<Technology[]>({
        queryKey: [TaxonomyApiPath.PublicTechnologies],
        queryFn: () => TaxonomyServiceInstance.getTechnologies(),
    });

export const useExperiencesQuery = () =>
    useQueryProvider<Experience[]>({
        queryKey: [TimelineApiPath.PublicExperiences],
        queryFn: () => TimelineServiceInstance.getExperiences(),
    });

export const useEducationQuery = () =>
    useQueryProvider<Education[]>({
        queryKey: [TimelineApiPath.PublicEducation],
        queryFn: () => TimelineServiceInstance.getEducation(),
    });

export const useSocialLinksQuery = () =>
    useQueryProvider<SocialLink[]>({
        queryKey: [SiteContentApiPath.PublicSocialLinks],
        queryFn: () => SiteContentServiceInstance.getSocialLinks(),
    });

/* ----------------------- Certifications (public) ----------------------- */

export const useCertificationsQuery = () =>
    useQueryProvider<Certification[]>({
        queryKey: [CertificationApiPath.PublicList],
        queryFn: () => CertificationServiceInstance.getCertifications(),
    });

/* ----------------------- Admin timeline lists ----------------------- */

export const useAdminExperiencesQuery = () =>
    useQueryProvider<Experience[]>({
        queryKey: [TimelineApiPath.AdminExperience],
        queryFn: () => TimelineServiceInstance.getAdminExperiences(),
    });

export const useAdminEducationQuery = () =>
    useQueryProvider<Education[]>({
        queryKey: [TimelineApiPath.AdminEducation],
        queryFn: () => TimelineServiceInstance.getAdminEducation(),
    });

export const useAdminCertificationsQuery = () =>
    useQueryProvider<Certification[]>({
        queryKey: [CertificationApiPath.AdminList],
        queryFn: () => CertificationServiceInstance.getAdminCertifications(),
    });
