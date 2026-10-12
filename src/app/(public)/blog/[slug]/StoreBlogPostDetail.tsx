"use client";

import React from "react";
import { notFound } from "next/navigation";
import { Loader2 } from "lucide-react";
import BlogPostDetail from "../_components/BlogPostDetail";
import { usePortfolioStore } from "@/stores/usePortfolioStore";
import { getBlogPostBySlug } from "@/mocks/portfolio.mock";

/** Patience le temps que GET /blog-posts remplisse le miroir. */
const SlugPending: React.FC = () => (
    <div className="flex min-h-[60dvh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
    </div>
);

/**
 * Résout l'article depuis le miroir zustand (hydraté par React Query depuis
 * GET /blog-posts), puis retombe sur les données seedées. Le slug n'est déclaré
 * introuvable qu'une fois l'hydratation faite ; renderNotFound permet au
 * fallback 404 client (out/404.html) d'afficher son propre écran au lieu de
 * rebasculer sur la 404.
 */
const StoreBlogPostDetail: React.FC<{
    slug: string;
    renderNotFound?: React.ReactNode;
}> = ({ slug, renderNotFound }) => {
    const storePosts = usePortfolioStore((s) => s.posts);
    const hydrated = usePortfolioStore((s) => s.hydrated);
    const post =
        storePosts.find((item) => item.slug === slug) ??
        getBlogPostBySlug(slug);

    if (!post && !hydrated) return <SlugPending />;

    if (!post) {
        if (renderNotFound !== undefined) return <>{renderNotFound}</>;
        notFound();
    }

    return <BlogPostDetail post={post} />;
};

export default StoreBlogPostDetail;
