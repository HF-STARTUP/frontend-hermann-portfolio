"use client";

import React from "react";
import {
    useBlogPostsQuery,
    useCertificationsQuery,
    useEducationQuery,
    useExperiencesQuery,
    useProjectCategoriesQuery,
    useProjectsQuery,
    useSiteContentQuery,
    useSocialLinksQuery,
    useTechCategoriesQuery,
    useTechnologiesQuery,
} from "@/hooks/portfolio/usePortfolioQueries";
import { usePortfolioStore } from "@/stores/usePortfolioStore";

/**
 * Synchronise le miroir zustand avec React Query : chaque endpoint public a sa
 * query et recopie sa réponse dans le store dès qu'elle arrive. Une invalidation
 * (après une mutation admin) re-déclenche la query puis cette synchronisation —
 * le site public reflète donc les changements sans rechargement.
 *
 * Tant qu'un endpoint ne répond pas, la slice garde ses seeds : le rendu n'est
 * jamais bloqué par l'API.
 */
const PortfolioHydration: React.FC<{ children?: React.ReactNode }> = ({
    children,
}) => {
    const hydrate = usePortfolioStore((state) => state.hydrate);

    const siteContent = useSiteContentQuery();
    const projects = useProjectsQuery();
    const projectCategories = useProjectCategoriesQuery();
    const techCategories = useTechCategoriesQuery();
    const technologies = useTechnologiesQuery();
    const experiences = useExperiencesQuery();
    const education = useEducationQuery();
    const certifications = useCertificationsQuery();
    const socialLinks = useSocialLinksQuery();
    const posts = useBlogPostsQuery();

    React.useEffect(() => {
        if (siteContent.data) hydrate({ siteContent: siteContent.data });
    }, [siteContent.data, hydrate]);

    React.useEffect(() => {
        if (projects.data) hydrate({ projects: projects.data });
    }, [projects.data, hydrate]);

    React.useEffect(() => {
        if (projectCategories.data)
            hydrate({ projectCategories: projectCategories.data });
    }, [projectCategories.data, hydrate]);

    React.useEffect(() => {
        if (techCategories.data)
            hydrate({ techCategories: techCategories.data });
    }, [techCategories.data, hydrate]);

    React.useEffect(() => {
        if (technologies.data) hydrate({ technologies: technologies.data });
    }, [technologies.data, hydrate]);

    React.useEffect(() => {
        if (experiences.data) hydrate({ experiences: experiences.data });
    }, [experiences.data, hydrate]);

    React.useEffect(() => {
        if (education.data) hydrate({ education: education.data });
    }, [education.data, hydrate]);

    React.useEffect(() => {
        if (certifications.data)
            hydrate({ certifications: certifications.data });
    }, [certifications.data, hydrate]);

    React.useEffect(() => {
        if (socialLinks.data) hydrate({ socialLinks: socialLinks.data });
    }, [socialLinks.data, hydrate]);

    React.useEffect(() => {
        if (posts.data) hydrate({ posts: posts.data });
    }, [posts.data, hydrate]);

    return <>{children}</>;
};

export default PortfolioHydration;
