"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays, Clock, Play } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import type { BlogPost } from "@/types/portfolio.type";

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
    },
};

const BlogPostCard: React.FC<{ post: BlogPost }> = ({ post }) => {
    return (
        <motion.article
            variants={itemVariants}
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 250, damping: 18 }}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-vaPrimary/20 bg-vaSecondary/10 backdrop-blur-md transition-colors duration-300 hover:border-vaPrimary/50"
        >
            <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
                {/* Image de couverture */}
                <div className="relative h-44 w-full overflow-hidden">
                    <Image
                        src={post.coverImageUrl}
                        alt={post.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                    {(post.coverType === "video" ||
                        post.coverType === "youtube") && (
                        <span
                            title={
                                post.coverType === "youtube"
                                    ? "Vidéo YouTube"
                                    : "Vidéo"
                            }
                            className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md"
                        >
                            <Play size={15} className="ml-0.5" />
                        </span>
                    )}
                </div>

                <div className="flex flex-1 flex-col gap-3 p-6">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                            <CalendarDays size={14} className="text-vaPrimary" />
                            {format(new Date(post.publishedAt), "d MMMM yyyy", {
                                locale: fr,
                            })}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock size={14} className="text-vaPrimary" />
                            {post.readTimeMinutes} min
                        </span>
                    </div>

                    <h3 className="text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-vaPrimary">
                        {post.title}
                    </h3>

                    <p className="line-clamp-3 text-sm leading-relaxed text-vaTextPrimary">
                        {post.excerpt}
                    </p>

                    <div className="mt-auto flex flex-wrap gap-2 pt-2">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full border border-vaPrimary/20 bg-vaPrimary/10 px-3 py-1 text-xs font-medium text-muted-foreground"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </Link>
        </motion.article>
    );
};

export default BlogPostCard;
