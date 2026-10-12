"use client";

import React from "react";
import { motion } from "framer-motion";
import { Pencil, Plus, Sparkles, Trash2 } from "lucide-react";
import {
    useProjectCategoriesQuery,
    useProjectsQuery,
} from "@/hooks/portfolio/usePortfolioQueries";
import {
    useCreateProject,
    useDeleteProject,
    useUpdateProject,
} from "@/hooks/portfolio/useAdminPortfolio";
import type { Project } from "@/types/portfolio.type";
import { Button } from "@/components/ui/button";
import ProjectFormDialog from "./_components/ProjectFormDialog";
import ConfirmDialog from "../../_components/ConfirmDialog";
import ListSkeleton, { QueryErrorPanel } from "../_components/ListSkeleton";

const AdminProjectsPage = () => {
    /* Données : queries (le store n'est qu'un miroir pour le site public) */
    const { data: projects = [], isLoading, isError } = useProjectsQuery();
    const { data: projectCategories = [] } = useProjectCategoriesQuery();

    /* Mutations : toasts succès/erreur émis par useMutationProvider */
    const { createProject } = useCreateProject();
    const { updateProject } = useUpdateProject();
    const { deleteProject } = useDeleteProject();

    const [formOpen, setFormOpen] = React.useState(false);
    const [editingProject, setEditingProject] = React.useState<Project | undefined>();
    const [deletingProject, setDeletingProject] = React.useState<Project | undefined>();

    const handleOpenCreate = () => {
        setEditingProject(undefined);
        setFormOpen(true);
    };

    const handleOpenEdit = (project: Project) => {
        setEditingProject(project);
        setFormOpen(true);
    };

    /**
     * Réjette en cas d'échec → toast auto (provider), dialog laissé ouvert.
     * En cas de succès les listes sont invalidées par le hook.
     */
    const handleSubmit = async (
        data: Omit<Project, "id">,
        projectId?: string
    ) => {
        if (projectId) {
            await updateProject({ ...data, id: projectId });
        } else {
            await createProject(data);
        }
    };

    return (
        <div className="flex flex-col gap-8">
            <header className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-foreground sm:text-3xl">
                        Projets
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Gérez les projets affichés sur votre portfolio.
                    </p>
                </div>
                <Button
                    onClick={handleOpenCreate}
                    leftIcon={<Plus size={16} />}
                    className="bg-gradient-to-r from-vaSecondary to-vaPrimary text-white"
                >
                    Nouveau projet
                </Button>
            </header>

            <div className="flex flex-col gap-3">
                {isError ? (
                    <QueryErrorPanel message="Impossible de charger les projets." />
                ) : isLoading ? (
                    <ListSkeleton rows={4} />
                ) : null}

                {!isError && !isLoading &&
                    projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.35 }}
                            className="flex flex-col gap-3 rounded-2xl border border-vaPrimary/20 bg-vaSecondary/10 p-5 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h2 className="font-bold text-foreground">
                                        {project.title}
                                    </h2>
                                    {project.featured && (
                                        <span className="flex items-center gap-1 rounded-full border border-vaPrimary/40 bg-vaPrimary/10 px-2 py-0.5 text-xs font-medium text-vaPrimary">
                                            <Sparkles size={11} />
                                            Featured
                                        </span>
                                    )}
                                </div>
                                <p className="mt-1 truncate text-sm text-muted-foreground">
                                    {project.role} ·{" "}
                                    {projectCategories.find(
                                        (category) =>
                                            category.id === project.category
                                    )?.label ?? project.category}{" "}
                                    · {project.techStack.slice(0, 3).join(", ")}
                                </p>
                            </div>

                            <div className="flex shrink-0 items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    title="Modifier"
                                    aria-label={`Modifier ${project.title}`}
                                    onClick={() => handleOpenEdit(project)}
                                    className="rounded-xl border-vaPrimary/30 bg-background/40 hover:bg-vaPrimary/20"
                                >
                                    <Pencil size={16} />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    title="Supprimer"
                                    aria-label={`Supprimer ${project.title}`}
                                    onClick={() => setDeletingProject(project)}
                                    className="rounded-xl border-destructive/40 bg-background/40 text-destructive hover:bg-destructive/20"
                                >
                                    <Trash2 size={16} />
                                </Button>
                            </div>
                        </motion.div>
                    ))}

                {!isError && !isLoading && projects.length === 0 && (
                    <p className="rounded-2xl border border-dashed border-vaPrimary/30 p-10 text-center text-muted-foreground">
                        Aucun projet. Créez-en un pour l'afficher sur votre portfolio.
                    </p>
                )}
            </div>

            <ProjectFormDialog
                open={formOpen}
                onOpenChange={setFormOpen}
                project={editingProject}
                onSubmit={handleSubmit}
            />

            <ConfirmDialog
                open={Boolean(deletingProject)}
                onOpenChange={(open) => !open && setDeletingProject(undefined)}
                title="Supprimer ce projet ?"
                description={
                    deletingProject
                        ? `« ${deletingProject.title} » sera définitivement retiré de votre portfolio.`
                        : ""
                }
                onConfirm={() => {
                    // Toast d'erreur auto ; le dialog se referme sur succès.
                    return deletingProject
                        ? deleteProject(deletingProject.id)
                        : undefined;
                }}
            />
        </div>
    );
};

export default AdminProjectsPage;
