"use client";

import React from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/layout/PageHeader";
import ProjectCard from "@/components/cards/ProjectCard";
import { usePortfolioStore } from "@/stores/usePortfolioStore";

type CategoryFilter = string; // id de catégorie ou "all"

const ProjectsContent = () => {
    const [activeFilter, setActiveFilter] = React.useState<CategoryFilter>("all");
    const heading = usePortfolioStore((s) => s.siteContent.pages.projects);
    const projectCategories = usePortfolioStore((s) => s.projectCategories);
    const projects = usePortfolioStore((s) => s.projects);

    // Filtres construits depuis les catégories du store (+ « Tous »)
    const filters = [
        { value: "all", label: "Tous" },
        ...projectCategories.map((category) => ({
            value: category.id,
            label: category.label,
        })),
    ];

    const filteredProjects =
        activeFilter === "all"
            ? projects
            : projects.filter((project) => project.category === activeFilter);

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
                breadcrumb={[{ label: "Projets" }]}
            />

            <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4">
                {/* Filtres par catégorie */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex flex-wrap items-center justify-center gap-2"
                >
                    {filters.map((filter) => (
                        <button
                            key={filter.value}
                            type="button"
                            onClick={() => setActiveFilter(filter.value)}
                            className={`rounded-2xl px-4 py-2 text-sm font-medium transition-all duration-300 ${
                                activeFilter === filter.value
                                    ? "bg-gradient-to-r from-vaSecondary to-vaPrimary text-white shadow-lg shadow-vaPrimary/30"
                                    : "border border-vaPrimary/20 bg-vaSecondary/10 text-muted-foreground hover:border-vaPrimary/40 hover:text-foreground"
                            }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </motion.div>

                {/* Grille de projets */}
                <motion.div
                    key={activeFilter}
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
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </motion.div>

                {filteredProjects.length === 0 && (
                    <p className="py-16 text-center text-vaTextPrimary">
                        Aucun projet dans cette catégorie pour le moment.
                    </p>
                )}
            </div>
        </div>
    );
};

export default ProjectsContent;
