"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";
import VLinkProvider from "@/components/helpers/VLinkProvider";

const PageHeader: React.FC<{
    badge?: string;
    title: React.ReactNode;
    description?: string;
    breadcrumb?: { label: string; url?: string }[];
}> = ({ badge, title, description, breadcrumb = [] }) => {
    return (
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-4 pb-10 pt-16 text-center sm:pt-24">
            {badge && (
                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-full border border-vaPrimary/60 bg-vaPrimary/15 px-5 py-2 text-sm text-foreground backdrop-blur-md"
                >
                    {badge}
                </motion.div>
            )}

            <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl text-4xl font-extrabold text-foreground md:text-6xl"
            >
                {title}
            </motion.h1>

            {description && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.6 }}
                    className="max-w-3xl text-lg leading-8 text-vaTextPrimary"
                >
                    {description}
                </motion.p>
            )}

            {breadcrumb.length > 0 && (
                <motion.nav
                    aria-label="Fil d'ariane"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25, duration: 0.5 }}
                    className="flex items-center gap-1 text-sm text-muted-foreground"
                >
                    <VLinkProvider
                        to="/"
                        className="flex items-center gap-1 transition-colors hover:text-vaPrimary"
                    >
                        <Home size={14} />
                        Accueil
                    </VLinkProvider>
                    {breadcrumb.map((item) => (
                        <span key={item.label} className="flex items-center gap-1">
                            <ChevronRight size={14} className="text-vaPrimary/60" />
                            {item.url ? (
                                <VLinkProvider
                                    to={item.url}
                                    className="transition-colors hover:text-vaPrimary"
                                >
                                    {item.label}
                                </VLinkProvider>
                            ) : (
                                <span className="font-medium text-foreground">
                                    {item.label}
                                </span>
                            )}
                        </span>
                    ))}
                </motion.nav>
            )}
        </div>
    );
};

export default PageHeader;
