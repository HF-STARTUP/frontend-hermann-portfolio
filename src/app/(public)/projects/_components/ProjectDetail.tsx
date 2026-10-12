"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    CalendarDays,
    ExternalLink,
    Github,
    Sparkles,
} from "lucide-react";
import type { Project } from "@/types/portfolio.type";
import { usePortfolioStore } from "@/stores/usePortfolioStore";
import VLinkProvider from "@/components/helpers/VLinkProvider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProjectCard from "@/components/cards/ProjectCard";

const formatDate = (value: string) => {
    const [year, month] = value.split("-");
    const monthLabels = [
        "Jan", "Fév", "Mar", "Avr", "Mai", "Juin",
        "Juil", "Août", "Sep", "Oct", "Nov", "Déc",
    ];
    return `${monthLabels[Number(month) - 1] ?? ""} ${year}`;
};

const ProjectDetail: React.FC<{ project: Project }> = ({ project }) => {
    const storeProjects = usePortfolioStore((s) => s.projects);
    const projectCategories = usePortfolioStore((s) => s.projectCategories);
    const categoryLabel =
        projectCategories.find(
            (category) => category.id === project.category
        )?.label ?? project.category;
    // Autres projets du store (hors projet courant), max 3
    const otherProjects = storeProjects
        .filter((item) => item.id !== project.id)
        .slice(0, 3);

    return (
        <div className="pb-10">
            {/* En-tête */}
            <header className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pb-8 pt-16 sm:pt-20">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <VLinkProvider
                        to="/projects"
                        className="inline-flex w-fit items-center gap-2 rounded-full border border-vaPrimary/30 bg-vaSecondary/10 px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-vaPrimary/50 hover:text-vaPrimary"
                    >
                        <ArrowLeft size={16} />
                        Retour aux projets
                    </VLinkProvider>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col gap-4"
                >
                    <div className="flex flex-wrap items-center gap-3">
                        <h1 className="text-4xl font-extrabold leading-tight text-foreground md:text-5xl">
                            {project.title}
                        </h1>
                        {project.featured && (
                            <Badge className="gap-1 border-vaPrimary/50 bg-vaPrimary/15 text-vaPrimary">
                                <Sparkles size={12} />
                                Featured
                            </Badge>
                        )}
                    </div>

                    <p className="text-lg font-medium text-muted-foreground">
                        {project.role} · {categoryLabel}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                            <CalendarDays size={15} className="text-vaPrimary" />
                            {formatDate(project.startDate)} —{" "}
                            {project.endDate ? formatDate(project.endDate) : "Aujourd'hui"}
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-1">
                        {project.links.demo && (
                            <Button
                                href={project.links.demo}
                                rightIcon={<ExternalLink size={16} />}
                                className="bg-gradient-to-r from-vaSecondary from-30% to-vaPrimary to-70% shadow-lg shadow-vaSecondary/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-vaPrimary/50"
                            >
                                Voir la démo
                            </Button>
                        )}
                        {project.links.github && (
                            <Button
                                href={project.links.github}
                                leftIcon={<Github size={16} />}
                                variant="outline"
                                className="border-vaPrimary/40 bg-background/40"
                            >
                                Code source
                            </Button>
                        )}
                    </div>
                </motion.div>

                {/* Image de couverture */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15, duration: 0.6 }}
                    className="relative h-64 w-full overflow-hidden rounded-3xl border border-vaPrimary/20 sm:h-96"
                >
                    <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        sizes="(max-width: 1152px) 100vw, 1152px"
                        priority
                        unoptimized
                        className="object-cover"
                    />
                </motion.div>
            </header>

            {/* Contenu */}
            <motion.section
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-4 py-6 lg:grid-cols-3"
            >
                {/* Description */}
                <div className="flex flex-col gap-5 lg:col-span-2">
                    <h2 className="text-2xl font-bold text-foreground">
                        À propos du projet
                    </h2>
                    <p className="whitespace-pre-line leading-8 text-vaTextPrimary">
                        {project.longDescription ?? project.description}
                    </p>
                </div>

                {/* Fiche technique */}
                <aside className="flex h-fit flex-col gap-5 rounded-3xl border border-vaPrimary/20 bg-vaSecondary/10 p-6 backdrop-blur-md">
                    <h3 className="text-lg font-bold text-foreground">
                        Stack technique
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                            <span
                                key={tech}
                                className="rounded-full border border-vaPrimary/20 bg-vaPrimary/10 px-3 py-1 text-xs font-medium text-muted-foreground"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    <div className="h-px bg-vaPrimary/15" />

                    <dl className="flex flex-col gap-3 text-sm">
                        <div className="flex justify-between gap-3">
                            <dt className="text-muted-foreground">Catégorie</dt>
                            <dd className="font-medium text-foreground">
                                {categoryLabel}
                            </dd>
                        </div>
                        <div className="flex justify-between gap-3">
                            <dt className="text-muted-foreground">Période</dt>
                            <dd className="font-medium text-foreground">
                                {formatDate(project.startDate)} —{" "}
                                {project.endDate ? formatDate(project.endDate) : "..."}
                            </dd>
                        </div>
                    </dl>
                </aside>
            </motion.section>

            {/* Autres projets */}
            {otherProjects.length > 0 && (
                <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-14">
                    <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                        Autres{" "}
                        <span className="bg-gradient-to-br from-purple-500 via-vaPrimary to-purple-400 bg-clip-text text-transparent">
                            projets
                        </span>
                    </h2>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={{
                            hidden: {},
                            visible: {
                                transition: { staggerChildren: 0.1 },
                            },
                        }}
                        className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
                    >
                        {otherProjects.map((item) => (
                            <ProjectCard key={item.id} project={item} />
                        ))}
                    </motion.div>
                </section>
            )}
        </div>
    );
};

export default ProjectDetail;
