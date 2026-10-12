"use client";

import React from "react";
import { Home, Loader2, SearchX } from "lucide-react";
import Navbar from "@/components/layout/main/navbar/Navbar";
import Footer from "@/components/layout/main/footer/Footer";
import { Button } from "@/components/ui/button";
import StoreProjectDetail from "./(public)/projects/[slug]/StoreProjectDetail";
import StoreBlogPostDetail from "./(public)/blog/[slug]/StoreBlogPostDetail";

/** Écran 404 par défaut pour les URLs qui ne correspondent à aucune vue. */
const NotFoundPanel: React.FC = () => (
    <div className="flex min-h-[70dvh] flex-col items-center justify-center gap-6 px-4 py-16 text-center">
        <SearchX className="size-12 text-muted-foreground" />
        <p className="bg-gradient-to-r from-vaSecondary to-vaPrimary bg-clip-text text-7xl font-extrabold text-transparent">
            404
        </p>
        <div>
            <h1 className="text-2xl font-bold text-foreground">
                Page introuvable
            </h1>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
                La page que vous cherchez n'existe pas ou a été déplacée.
            </p>
        </div>
        <Button
            href="/"
            leftIcon={<Home size={16} />}
            className="bg-gradient-to-r from-vaSecondary to-vaPrimary text-white"
        >
            Retour à l'accueil
        </Button>
    </div>
);

/**
 * 404 exportée en out/404.html et servie par Apache (ErrorDocument) pour toute
 * URL sans fichier : l'URL demandée reste dans la barre d'adresse, on rend donc
 * côté client la bonne vue — le détail projet/article pour un slug créé après
 * le build (données via React Query → miroir), l'écran « introuvable » sinon.
 * Pendant la pré-génération statique (pas de window), simple loader neutre.
 */
const NotFoundPage: React.FC = () => {
    const [pathname, setPathname] = React.useState<string | null>(null);

    React.useEffect(() => {
        // trailingSlash:true ajoute un « / » final qu'on neutralise pour matcher
        setPathname(window.location.pathname.replace(/\/+$/, ""));
    }, []);

    if (pathname === null)
        return (
            <div className="flex min-h-[70dvh] items-center justify-center">
                <Loader2 className="size-8 animate-spin text-muted-foreground" />
            </div>
        );

    const projectMatch = pathname.match(/^\/projects\/([^/]+)$/);
    const blogMatch = pathname.match(/^\/blog\/([^/]+)$/);

    let content: React.ReactNode;
    if (projectMatch) {
        content = (
            <StoreProjectDetail
                slug={projectMatch[1]}
                renderNotFound={<NotFoundPanel />}
            />
        );
    } else if (blogMatch) {
        content = (
            <StoreBlogPostDetail
                slug={blogMatch[1]}
                renderNotFound={<NotFoundPanel />}
            />
        );
    } else {
        content = <NotFoundPanel />;
    }

    return (
        <>
            <Navbar />
            <main className="flex-1">{content}</main>
            <Footer />
        </>
    );
};

export default NotFoundPage;
