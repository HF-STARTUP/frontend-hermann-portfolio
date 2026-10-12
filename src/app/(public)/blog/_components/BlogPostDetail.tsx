"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays, Clock, Quote } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import type { BlogContentBlock, BlogPost } from "@/types/portfolio.type";
import VLinkProvider from "@/components/helpers/VLinkProvider";
import BlogCover from "@/components/media/BlogCover";

const ContentBlock: React.FC<{ block: BlogContentBlock }> = ({ block }) => {
    switch (block.type) {
        case "heading":
            return (
                <h2 className="mt-10 text-2xl font-bold text-foreground md:text-3xl">
                    {block.text}
                </h2>
            );
        case "quote":
            return (
                <blockquote className="my-8 flex gap-4 rounded-2xl border border-vaPrimary/20 bg-vaSecondary/10 p-6 backdrop-blur-md">
                    <Quote size={24} className="shrink-0 text-vaPrimary" />
                    <div>
                        <p className="text-lg italic leading-relaxed text-foreground">
                            {block.text}
                        </p>
                        {block.author && (
                            <cite className="mt-2 block text-sm not-italic text-muted-foreground">
                                — {block.author}
                            </cite>
                        )}
                    </div>
                </blockquote>
            );
        case "code":
            return (
                <pre className="custom-scrollbar my-8 overflow-x-auto rounded-2xl border border-vaPrimary/20 bg-black/60 p-5 text-sm leading-relaxed text-zinc-100">
                    <code>{block.text}</code>
                </pre>
            );
        case "paragraph":
        default:
            return (
                <p className="leading-8 text-vaTextPrimary">{block.text}</p>
            );
    }
};

const BlogPostDetail: React.FC<{ post: BlogPost }> = ({ post }) => {
    return (
        <article className="pb-10">
            {/* En-tête */}
            <header className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 pb-8 pt-16 sm:pt-20">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <VLinkProvider
                        to="/blog"
                        className="inline-flex w-fit items-center gap-2 rounded-full border border-vaPrimary/30 bg-vaSecondary/10 px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-vaPrimary/50 hover:text-vaPrimary"
                    >
                        <ArrowLeft size={16} />
                        Retour au blog
                    </VLinkProvider>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col gap-5"
                >
                    <h1 className="text-3xl font-extrabold leading-tight text-foreground md:text-5xl">
                        {post.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                            <CalendarDays size={16} className="text-vaPrimary" />
                            {format(new Date(post.publishedAt), "d MMMM yyyy", {
                                locale: fr,
                            })}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock size={16} className="text-vaPrimary" />
                            {post.readTimeMinutes} min de lecture
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full border border-vaPrimary/20 bg-vaPrimary/10 px-3 py-1 text-xs font-medium text-vaPrimary"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15, duration: 0.6 }}
                >
                    <BlogCover post={post} priority />
                </motion.div>
            </header>

            {/* Contenu */}
            <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
                className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 py-6"
            >
                {post.content.map((block, index) => (
                    <ContentBlock key={index} block={block} />
                ))}
            </motion.div>
        </article>
    );
};

export default BlogPostDetail;
