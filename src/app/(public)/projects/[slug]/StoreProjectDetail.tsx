"use client";

import React from "react";
import { notFound } from "next/navigation";
import { Loader2 } from "lucide-react";
import ProjectDetail from "../_components/ProjectDetail";
import { usePortfolioStore } from "@/stores/usePortfolioStore";
import { getProjectBySlug } from "@/mocks/portfolio.mock";

/** Patience le temps que GET /projects remplisse le miroir. */
const SlugPending: React.FC = () => (
    <div className="flex min-h-[60dvh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
    </div>
);

/**
 * Résout le projet depuis le miroir zustand (hydraté par React Query depuis
 * GET /projects), puis retombe sur les données seedées. Le slug n'est déclaré
 * introuvable qu'une fois l'hydratation faite ; renderNotFound permet au
 * fallback 404 client (out/404.html) d'afficher son propre écran au lieu de
 * rebasculer sur la 404.
 */
const StoreProjectDetail: React.FC<{
    slug: string;
    renderNotFound?: React.ReactNode;
}> = ({ slug, renderNotFound }) => {
    const storeProjects = usePortfolioStore((s) => s.projects);
    const hydrated = usePortfolioStore((s) => s.hydrated);
    const project =
        storeProjects.find((item) => item.slug === slug) ??
        getProjectBySlug(slug);

    if (!project && !hydrated) return <SlugPending />;

    if (!project) {
        if (renderNotFound !== undefined) return <>{renderNotFound}</>;
        notFound();
    }

    return <ProjectDetail project={project} />;
};

export default StoreProjectDetail;
