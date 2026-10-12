"use client";

import React from "react";
import { motion } from "framer-motion";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
    useProjectCategoriesQuery,
    useProjectsQuery,
    useTechCategoriesQuery,
    useTechnologiesQuery,
} from "@/hooks/portfolio/usePortfolioQueries";
import {
    useCreateProjectCategory,
    useDeleteProjectCategory,
    useUpdateProjectCategory,
} from "@/hooks/portfolio/useAdminTaxonomy";
import {
    useCreateTechCategory,
    useDeleteTechCategory,
    useUpdateTechCategory,
} from "@/hooks/portfolio/useAdminTaxonomy";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConfirmDialog from "../../_components/ConfirmDialog";
import ListSkeleton, { QueryErrorPanel } from "../_components/ListSkeleton";

/**
 * Gestion des catégories : projets et technologies.
 * La suppression d'une catégorie utilisée est refusée (garde-fou local +
 * 409 API dont le message indique le nombre d'usages).
 */
const AdminCategoriesPage = () => {
    const {
        data: projectCategories = [],
        isLoading: projectCatsLoading,
        isError: projectCatsError,
    } = useProjectCategoriesQuery();
    const {
        data: techCategories = [],
        isLoading: techCatsLoading,
        isError: techCatsError,
    } = useTechCategoriesQuery();
    const { data: projects = [] } = useProjectsQuery();
    const { data: technologies = [] } = useTechnologiesQuery();

    /* Mutations : toasts succès/erreur émis par useMutationProvider */
    const { createCategory: createProjectCat } = useCreateProjectCategory();
    const { updateCategory: updateProjectCat } = useUpdateProjectCategory();
    const { deleteCategory: deleteProjectCat } = useDeleteProjectCategory();
    const { createCategory: createTechCat } = useCreateTechCategory();
    const { updateCategory: updateTechCat } = useUpdateTechCategory();
    const { deleteCategory: deleteTechCat } = useDeleteTechCategory();
    const { toast } = useToast();

    const [editing, setEditing] = React.useState<{
        kind: "project" | "tech";
        id?: string;
        value: string;
    }>();
    const [deleting, setDeleting] = React.useState<{
        kind: "project" | "tech";
        id: string;
        label: string;
    }>();

    const openCreate = (kind: "project" | "tech") =>
        setEditing({ kind, value: "" });

    const openEdit = (
        kind: "project" | "tech",
        id: string,
        value: string
    ) => setEditing({ kind, id, value });

    /**
     * Réjette en cas d'échec → toast auto (provider), dialog laissé ouvert.
     * En cas de succès la liste est invalidée par le hook.
     */
    const handleSave = async () => {
        if (!editing) return;
        const name = editing.value.trim();
        if (!name) return;

        if (editing.kind === "project") {
            if (editing.id) {
                await updateProjectCat({ id: editing.id, label: name });
            } else {
                await createProjectCat({ label: name });
            }
        } else {
            if (editing.id) {
                await updateTechCat({ id: editing.id, name });
            } else {
                await createTechCat({ name });
            }
        }
        setEditing(undefined);
    };

    const requestDelete = (kind: "project" | "tech", id: string) => {
        const isProjectKind = kind === "project";
        const list = isProjectKind ? projectCategories : techCategories;
        const category = list.find((item) => item.id === id);
        if (!category) return;

        const usages = isProjectKind
            ? projects.filter((project) => project.category === id).length
            : technologies.filter(
                  (technology) => technology.categoryId === id
              ).length;

        if (usages > 0) {
            // Garde-fou : catégorie référencée par des éléments existants
            toast({
                title: "Suppression impossible",
                description: `${usages} élément${usages > 1 ? "s" : ""} utilise${
                    usages > 1 ? "nt" : ""
                } encore cette catégorie.`,
                variant: "destructive",
            });
            return;
        }

        setDeleting({
            kind,
            id,
            label: isProjectKind
                ? (category as { label: string }).label
                : (category as { name: string }).name,
        });
    };

    const confirmDelete = () => {
        if (!deleting) return undefined;
        // Toast d'erreur auto (409 inclus) ; le dialog se referme sur succès.
        return deleting.kind === "project"
            ? deleteProjectCat(deleting.id)
            : deleteTechCat(deleting.id);
    };

    const renderList = (
        kind: "project" | "tech",
        items: { id: string; name: string; count: number }[]
    ) => (
        <div className="flex flex-col gap-3">
            <div className="flex justify-end">
                <Button
                    onClick={() => openCreate(kind)}
                    leftIcon={<Plus size={16} />}
                    className="bg-gradient-to-r from-vaSecondary to-vaPrimary text-white"
                >
                    Nouvelle catégorie
                </Button>
            </div>

            {items.map((item, index) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04, duration: 0.3 }}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-vaPrimary/20 bg-vaSecondary/10 p-4 backdrop-blur-md"
                >
                    <div>
                        <p className="font-semibold text-foreground">
                            {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {item.count} élément{item.count > 1 ? "s" : ""}{" "}
                            associé{item.count > 1 ? "s" : ""}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            title="Modifier"
                            aria-label={`Modifier ${item.name}`}
                            onClick={() =>
                                openEdit(kind, item.id, item.name)
                            }
                            className="rounded-xl border-vaPrimary/30 bg-background/40 hover:bg-vaPrimary/20"
                        >
                            <Pencil size={16} />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            title={
                                item.count > 0
                                    ? "Impossible : catégorie utilisée"
                                    : "Supprimer"
                            }
                            aria-label={`Supprimer ${item.name}`}
                            onClick={() => requestDelete(kind, item.id)}
                            className="rounded-xl border-destructive/40 bg-background/40 text-destructive hover:bg-destructive/20"
                        >
                            <Trash2 size={16} />
                        </Button>
                    </div>
                </motion.div>
            ))}

            {items.length === 0 && (
                <p className="rounded-2xl border border-dashed border-vaPrimary/30 p-10 text-center text-muted-foreground">
                    Aucune catégorie pour le moment.
                </p>
            )}
        </div>
    );

    return (
        <div className="flex flex-col gap-8">
            <header>
                <h1 className="text-2xl font-extrabold text-foreground sm:text-3xl">
                    Catégories
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Organisez vos projets et vos technologies par catégorie.
                </p>
            </header>

            <Tabs defaultValue="projects" className="gap-6">
                <TabsList>
                    <TabsTrigger value="projects">Projets</TabsTrigger>
                    <TabsTrigger value="technologies">Technologies</TabsTrigger>
                </TabsList>

                <TabsContent value="projects">
                    {projectCatsError ? (
                        <QueryErrorPanel message="Impossible de charger les catégories de projets." />
                    ) : projectCatsLoading ? (
                        <ListSkeleton rows={3} />
                    ) : (
                        renderList(
                            "project",
                            projectCategories.map((category) => ({
                                id: category.id,
                                name: category.label,
                                count: projects.filter(
                                    (project) => project.category === category.id
                                ).length,
                            }))
                        )
                    )}
                </TabsContent>

                <TabsContent value="technologies">
                    {techCatsError ? (
                        <QueryErrorPanel message="Impossible de charger les catégories de technologies." />
                    ) : techCatsLoading ? (
                        <ListSkeleton rows={3} />
                    ) : (
                        renderList(
                            "tech",
                            techCategories.map((category) => ({
                                id: category.id,
                                name: category.name,
                                count: technologies.filter(
                                    (technology) =>
                                        technology.categoryId === category.id
                                ).length,
                            }))
                        )
                    )}
                </TabsContent>
            </Tabs>

            {/* Dialog création / édition */}
            <ConfirmDialog
                open={Boolean(editing)}
                onOpenChange={(open) => !open && setEditing(undefined)}
                title={
                    editing?.id ? "Modifier la catégorie" : "Nouvelle catégorie"
                }
                description="Saisissez le nom affiché sur le portfolio."
                confirmLabel={editing?.id ? "Enregistrer" : "Créer"}
                onConfirm={handleSave}
            >
                <Input
                    autoFocus
                    placeholder="Ex : Web, Mobile, Design..."
                    value={editing?.value ?? ""}
                    onChange={(e) =>
                        setEditing((prev) =>
                            prev ? { ...prev, value: e.target.value } : prev
                        )
                    }
                    onKeyDown={(e) => e.key === "Enter" && handleSave()}
                />
            </ConfirmDialog>

            {/* Dialog confirmation suppression */}
            <ConfirmDialog
                open={Boolean(deleting)}
                onOpenChange={(open) => !open && setDeleting(undefined)}
                title="Supprimer cette catégorie ?"
                description={
                    deleting
                        ? `« ${deleting.label} » sera définitivement retirée.`
                        : ""
                }
                onConfirm={confirmDelete}
            />
        </div>
    );
};

export default AdminCategoriesPage;
