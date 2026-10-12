import type { Metadata } from "next";
import StoreProjectDetail from "./StoreProjectDetail";
import { getProjectBySlug, projects } from "@/mocks/portfolio.mock";

interface ProjectPageProps {
    params: Promise<{ slug: string }>;
}

// Params statiques = seeds ; les slugs créés en admin sont résolus au runtime
// par le miroir React Query → store (StoreProjectDetail).
export function generateStaticParams() {
    return projects.map((project) => ({ slug: project.slug }));
}

// TODO SEO : métadonnées dynamiques depuis GET /projects/:slug (côté serveur).
export async function generateMetadata({
    params,
}: ProjectPageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) return { title: "Projet introuvable | Hermann FOMO" };

    return {
        title: `${project.title} | Hermann FOMO`,
        description: project.description,
    };
}

// Le rendu passe par un composant client qui résout le projet depuis
// le miroir React Query → store, fallback seeds → notFound().
export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;

    return <StoreProjectDetail slug={slug} />;
}
