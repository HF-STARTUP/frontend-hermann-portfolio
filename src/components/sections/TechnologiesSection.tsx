"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { usePortfolioStore } from "@/stores/usePortfolioStore";
import type { Technology } from "@/types/portfolio.type";

/** Petit rendu d'icône pour éviter les soucis de composants dynamiques */
const TechnologyIcon: React.FC<{
    icon: React.ComponentType<{ size?: number; className?: string }>;
    name: string;
}> = ({ icon: Icon, name }) => (
    <Icon size={16} className="text-vaPrimary shrink-0" aria-label={name} />
);

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.15,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration:0.55, ease: [0.22, 1, 0.36, 1] as const },
    },
};

export const TechnologiesSection = () => {
    const heading = usePortfolioStore(
        (s) => s.siteContent.homeSections.technologies
    );
    const techCategories = usePortfolioStore((s) => s.techCategories);
    const technologies = usePortfolioStore((s) => s.technologies);

    return (
        <section className="flex items-center px-4 py-20">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-10">
                {/* En-tête éditable via /admin/content */}
                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.5 }}
                    className="mx-auto rounded-full border border-vaPrimary/60 bg-vaPrimary/15 px-5 py-2 text-foreground backdrop-blur-md"
                >
                    {heading.badge}
                </motion.div>

                <div className="flex flex-col gap-3 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center text-4xl font-extrabold text-foreground md:text-5xl"
                    >
                        {heading.titlePrefix}{" "}
                        <span className="bg-gradient-to-br from-purple-500 via-vaPrimary to-purple-400 bg-clip-text text-transparent">
                            {heading.titleHighlight}
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15, duration: 0.6 }}
                        className="mx-auto max-w-2xl text-center text-lg text-vaTextPrimary"
                    >
                        {heading.subtitle}
                    </motion.p>
                </div>

                {/* Groupes de technologies (données du store) */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
                >
                    {techCategories.map((category) => {
                        const categoryTechs = technologies.filter(
                            (technology) => technology.categoryId === category.id
                        );
                        if (categoryTechs.length === 0) return null;

                        return (
                            <CategoryCard
                                key={category.id}
                                categoryName={category.name}
                                technologies={categoryTechs}
                            />
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

const CategoryCard: React.FC<{
    categoryName: string;
    technologies: Technology[];
}> = ({ categoryName, technologies }) => (
    <motion.div
        variants={itemVariants}
        className="group relative overflow-hidden rounded-2xl border border-vaPrimary/20 bg-vaSecondary/10 p-6 backdrop-blur-md transition-colors duration-300 hover:border-vaPrimary/40"
    >
        <div className="mb-5 flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl border border-vaPrimary/20 bg-vaPrimary/10 text-vaPrimary">
                <span className="text-sm font-bold">
                    {categoryName.charAt(0)}
                </span>
            </div>
            <h3 className="text-lg font-bold text-foreground">
                {categoryName}
            </h3>
        </div>

        <div className="flex flex-wrap gap-2.5">
            {technologies.map((technology) => (
                <TechChip key={technology.id} technology={technology} />
            ))}
        </div>
    </motion.div>
);

const TechChip: React.FC<{ technology: Technology }> = ({ technology }) => (
    <motion.span
        whileHover={{ scale: 1.08, y: -3 }}
        transition={{ type: "spring", stiffness: 350, damping: 15 }}
        title={technology.name}
        className="flex cursor-default items-center gap-2 rounded-xl border border-vaPrimary/20 bg-background/40 px-3 py-1.5 text-sm text-muted-foreground backdrop-blur-sm transition-colors duration-300 hover:border-vaPrimary/50 hover:text-foreground"
    >
        {/* Icône marque (seed) ou image personnalisée (admin) */}
        {technology.imageUrl ? (
            <Image
                src={technology.imageUrl}
                alt={technology.name}
                width={16}
                height={16}
                unoptimized
                className="size-4 shrink-0 object-contain"
            />
        ) : technology.icon ? (
            <TechnologyIcon icon={technology.icon} name={technology.name} />
        ) : null}
        {technology.name}
    </motion.span>
);