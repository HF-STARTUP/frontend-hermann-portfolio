"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { usePortfolioStore } from "@/stores/usePortfolioStore";
import ProjectCard from "@/components/cards/ProjectCard";
import { Button } from "@/components/ui/button";

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.15,
        },
    },
};

export const FeaturedProjectsSection = () => {
    const heading = usePortfolioStore(
        (s) => s.siteContent.homeSections.projects
    );
    const projects = usePortfolioStore((s) => s.projects);
    // Trois premiers projets mis en avant
    const featuredProjects = projects
        .filter((project) => project.featured)
        .slice(0, 3);

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

                {/* Cartes projets */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3"
                >
                    {featuredProjects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                        />
                    ))}
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex justify-center"
                >
                    <Button
                        href="/projects"
                        rightIcon={
                            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                        }
                        className="group bg-gradient-to-r from-vaSecondary from-30% to-vaPrimary to-70% shadow-lg shadow-vaSecondary/30 transition-all duration-300 hover:shadow-xl hover:shadow-vaPrimary/50 hover:-translate-y-0.5"
                    >
                        {heading.ctaLabel}
                    </Button>
                </motion.div>
            </div>
        </section>
    );
};
