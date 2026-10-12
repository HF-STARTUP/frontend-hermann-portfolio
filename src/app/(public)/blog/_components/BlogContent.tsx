"use client";

import React from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/layout/PageHeader";
import BlogPostCard from "@/components/cards/BlogPostCard";
import { usePortfolioStore } from "@/stores/usePortfolioStore";

const BlogContent = () => {
    const posts = usePortfolioStore((s) => s.posts);
    const heading = usePortfolioStore((s) => s.siteContent.pages.blog);

    // Articles éditables via /admin/blog, triés par date décroissante
    const sortedPosts = [...posts].sort(
        (a, b) =>
            new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    return (
        <div className="pb-10">
            {/* En-tête éditable via /admin/content > Pages */}
            <PageHeader
                badge={heading.badge}
                title={
                    <>
                        {heading.titlePrefix}{" "}
                        <span className="bg-gradient-to-br from-purple-500 via-vaPrimary to-purple-400 bg-clip-text text-transparent">
                            {heading.titleHighlight}
                        </span>
                    </>
                }
                description={heading.description}
                breadcrumb={[{ label: "Blog" }]}
            />

            <div className="mx-auto w-full max-w-7xl px-4">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {},
                        visible: {
                            transition: { staggerChildren: 0.1 },
                        },
                    }}
                    className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
                >
                    {sortedPosts.map((post) => (
                        <BlogPostCard key={post.id} post={post} />
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default BlogContent;
