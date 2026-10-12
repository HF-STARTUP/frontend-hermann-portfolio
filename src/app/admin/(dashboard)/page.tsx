"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, FolderKanban, Mail, MailOpen, Newspaper } from "lucide-react";
import { useProjectsQuery, useBlogPostsQuery } from "@/hooks/portfolio/usePortfolioQueries";
import { useMessagesQuery } from "@/hooks/portfolio/useAdminMessagesMedia";
import { Skeleton } from "@/components/ui/skeleton";
import ListSkeleton from "./_components/ListSkeleton";

const KPIS = [
    {
        key: "projects",
        label: "Projets publiés",
        icon: FolderKanban,
        href: "/admin/projects",
    },
    {
        key: "posts",
        label: "Articles de blog",
        icon: Newspaper,
        href: "/admin/blog",
    },
    {
        key: "messages",
        label: "Messages reçus",
        icon: Mail,
        href: "/admin/messages",
    },
    {
        key: "unread",
        label: "Messages non lus",
        icon: MailOpen,
        href: "/admin/messages",
    },
] as const;

const AdminDashboardPage = () => {
    const { data: projects = [], isLoading: projectsLoading } =
        useProjectsQuery();
    const { data: posts = [], isLoading: postsLoading } = useBlogPostsQuery();
    const { data: messagesData, isLoading: messagesLoading } =
        useMessagesQuery();
    const isLoadingKpis = projectsLoading || postsLoading || messagesLoading;
    const messages = messagesData?.items ?? [];

    const unreadCount = messages.filter((message) => !message.read).length;

    const values: Record<(typeof KPIS)[number]["key"], number> = {
        projects: projects.length,
        posts: posts.length,
        messages: messagesData?.pagination.total ?? messages.length,
        unread: unreadCount,
    };

    return (
        <div className="flex flex-col gap-8">
            <header>
                <h1 className="text-2xl font-extrabold text-foreground sm:text-3xl">
                    Tableau de bord
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Vue d'ensemble du contenu de votre portfolio.
                </p>
            </header>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {KPIS.map(({ key, label, icon: Icon, href }, index) => (
                    <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.08, duration: 0.4 }}
                    >
                        <Link
                            href={href}
                            className="group flex flex-col gap-4 rounded-2xl border border-vaPrimary/20 bg-vaSecondary/10 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-vaPrimary/50"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex size-11 items-center justify-center rounded-xl border border-vaPrimary/20 bg-vaPrimary/10 text-vaPrimary">
                                    <Icon size={20} />
                                </div>
                                <ArrowRight
                                    size={16}
                                    className="text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                                />
                            </div>
                            <div>
                                {isLoadingKpis ? (
                                    <Skeleton className="mb-1 h-9 w-14" />
                                ) : (
                                    <p className="text-3xl font-extrabold text-foreground">
                                        {values[key]}
                                    </p>
                                )}
                                <p className="text-sm text-muted-foreground">{label}</p>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Derniers messages */}
            <section className="flex flex-col gap-4">
                <h2 className="text-lg font-bold text-foreground">
                    Derniers messages
                </h2>
                {messagesLoading && <ListSkeleton rows={3} />}

                {!messagesLoading &&
                    messages.slice(0, 3).map((message) => (
                    <Link
                        key={message.id}
                        href="/admin/messages"
                        className={`flex flex-col gap-1 rounded-2xl border p-5 backdrop-blur-md transition-colors hover:border-vaPrimary/50 ${
                            message.read
                                ? "border-vaPrimary/10 bg-background/30"
                                : "border-vaPrimary/30 bg-vaSecondary/15"
                        }`}
                    >
                        <div className="flex items-center justify-between gap-3">
                            <p className="font-semibold text-foreground">
                                {message.name}
                                {!message.read && (
                                    <span className="ml-2 inline-block size-2 rounded-full bg-vaPrimary align-middle" />
                                )}
                            </p>
                            <span className="shrink-0 text-xs text-muted-foreground">
                                {new Date(message.sentAt).toLocaleDateString("fr-FR")}
                            </span>
                        </div>
                        <p className="text-sm text-vaTextPrimary line-clamp-1">
                            {message.subject}
                        </p>
                    </Link>
                ))}
                {!messagesLoading && messages.length === 0 && (
                    <p className="rounded-2xl border border-dashed border-vaPrimary/30 p-6 text-center text-sm text-muted-foreground">
                        Aucun message reçu pour le moment.
                    </p>
                )}
            </section>
        </div>
    );
};

export default AdminDashboardPage;
