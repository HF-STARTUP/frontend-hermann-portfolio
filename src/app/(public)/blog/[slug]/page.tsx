import type { Metadata } from "next";
import StoreBlogPostDetail from "./StoreBlogPostDetail";
import { blogPosts, getBlogPostBySlug } from "@/mocks/portfolio.mock";

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

// Params statiques = seeds ; les slugs créés en admin sont résolus au runtime
// par le miroir React Query → store (StoreBlogPostDetail).
export function generateStaticParams() {
    return blogPosts.map((post) => ({ slug: post.slug }));
}

// TODO SEO : métadonnées dynamiques depuis GET /blog-posts/:slug (côté serveur).
export async function generateMetadata({
    params,
}: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);

    if (!post) return { title: "Article introuvable | Hermann FOMO" };

    return {
        title: `${post.title} | Hermann FOMO`,
        description: post.excerpt,
    };
}

// Le rendu passe par un composant client qui résout l'article depuis
// le miroir React Query → store, fallback seeds → notFound().
export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;

    return <StoreBlogPostDetail slug={slug} />;
}
