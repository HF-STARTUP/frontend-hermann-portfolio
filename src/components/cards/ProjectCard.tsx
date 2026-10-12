"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github, Sparkles } from "lucide-react";
import type { Project } from "@/types/portfolio.type";
import { usePortfolioStore } from "@/stores/usePortfolioStore";
import { Badge } from "@/components/ui/badge";
import VLinkProvider from "@/components/helpers/VLinkProvider";

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
    },
};

const ProjectCard: React.FC<{ project: Project; index?: number }> = ({
    project,
    index = 0,
}) => {
    const projectCategories = usePortfolioStore((s) => s.projectCategories);
    // Libellé de la catégorie depuis le store (fallback : id brut)
    const categoryLabel =
        projectCategories.find(
            (category) => category.id === project.category
        )?.label ?? project.category;

    return (
        <motion.article
            variants={itemVariants}
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 250, damping: 18 }}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-vaPrimary/20 bg-vaSecondary/10 backdrop-blur-md transition-colors duration-300 hover:border-vaPrimary/50"
        >
            {/* Lien étendu : toute la carte mène à la page de détail */}
            <VLinkProvider
                to={`/projects/${project.slug}`}
                aria-label={`Voir le projet ${project.title}`}
                title={`Voir le projet ${project.title}`}
                className="absolute inset-0 z-0 rounded-3xl"
            >
                <span className="sr-only">{`Voir le projet ${project.title}`}</span>
            </VLinkProvider>

            {/* Image */}
            <div className="relative h-48 w-full overflow-hidden sm:h-52">
                <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                {project.featured && (
                    <Badge className="absolute left-4 top-4 z-10 gap-1 border-vaPrimary/50 bg-background/70 text-vaPrimary backdrop-blur-md">
                        <Sparkles size={12} />
                        Featured
                    </Badge>
                )}
            </div>

            {/* Contenu */}
            <div className="flex flex-1 flex-col gap-4 p-6">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <h3 className="text-xl font-bold text-foreground transition-colors group-hover:text-vaPrimary">
                            {project.title}
                        </h3>
                        <p className="mt-1 text-sm font-medium text-vaTextPrimary">
                            {project.role}
                            {" · "}
                            {categoryLabel}
                        </p>
                    </div>

                    {/* Liens externes (au-dessus du lien étendu) */}
                    <div className="relative z-10 flex shrink-0 items-center gap-2">
                        {project.links.github && (
                            <a
                                href={project.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${project.title} sur GitHub`}
                                title="Code source"
                                onClick={(event) => event.stopPropagation()}
                                className="flex size-9 items-center justify-center rounded-xl border border-vaPrimary/20 bg-background/40 text-muted-foreground transition-colors hover:border-vaPrimary/50 hover:text-vaPrimary"
                            >
                                <Github size={16} />
                            </a>
                        )}
                        {project.links.demo && (
                            <a
                                href={project.links.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Démo de ${project.title}`}
                                title="Voir la démo"
                                onClick={(event) => event.stopPropagation()}
                                className="flex size-9 items-center justify-center rounded-xl border border-vaPrimary/20 bg-background/40 text-muted-foreground transition-colors hover:border-vaPrimary/50 hover:text-vaPrimary"
                            >
                                <ExternalLink size={16} />
                            </a>
                        )}
                    </div>
                </div>

                <p className="text-sm leading-relaxed text-vaTextPrimary">
                    {project.description}
                </p>

                <div className="mt-auto flex flex-wrap gap-2 pt-2">
                    {project.techStack.slice(0, 4).map((tech) => (
                        <span
                            key={tech}
                            className="rounded-full border border-vaPrimary/20 bg-vaPrimary/10 px-3 py-1 text-xs font-medium text-muted-foreground"
                        >
                            {tech}
                        </span>
                    ))}
                    {project.techStack.length > 4 && (
                        <span className="rounded-full px-2 py-1 text-xs font-semibold text-vaPrimary">
                            +{project.techStack.length - 4}
                        </span>
                    )}
                </div>
            </div>
        </motion.article>
    );
};

export default ProjectCard;
