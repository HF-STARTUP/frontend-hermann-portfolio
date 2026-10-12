"use client";

import React from "react";
import { motion } from "framer-motion";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import {
    useTechCategoriesQuery,
    useTechnologiesQuery,
} from "@/hooks/portfolio/usePortfolioQueries";
import {
    useCreateTechnology,
    useDeleteTechnology,
    useUpdateTechnology,
} from "@/hooks/portfolio/useAdminTaxonomy";
import type { Technology } from "@/types/portfolio.type";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "../../_components/ConfirmDialog";
import TechnologyFormDialog from "./_components/TechnologyFormDialog";
import ListSkeleton, { QueryErrorPanel } from "../_components/ListSkeleton";

/**
 * Gestion des technologies : chips regroupées par catégorie,
 * création / édition (avec image) et suppression.
 */
const AdminTechnologiesPage = () => {
    const { data: techCategories = [], isLoading, isError } =
        useTechCategoriesQuery();
    const { data: technologies = [] } = useTechnologiesQuery();

    /* Mutations : toasts succès/erreur émis par useMutationProvider */
    const { createTechnology } = useCreateTechnology();
    const { updateTechnology } = useUpdateTechnology();
    const { deleteTechnology } = useDeleteTechnology();

    const [formOpen, setFormOpen] = React.useState(false);
    const [editing, setEditing] = React.useState<Technology | undefined>();
    const [deleting, setDeleting] = React.useState<Technology | undefined>();

    /**
     * Réjette en cas d'échec → toast auto (provider), dialog laissé ouvert.
     * `icon` est seed-only : seul name/categoryId/imageUrl partent à l'API.
     */
    const handleSubmit = async (
        data: Omit<Technology, "id">,
        technologyId?: string
    ) => {
        const input = {
            name: data.name,
            categoryId: data.categoryId,
            imageUrl: data.imageUrl,
        };
        if (technologyId) {
            await updateTechnology({ ...input, id: technologyId });
        } else {
            await createTechnology(input);
        }
    };

    return (
        <div className="flex flex-col gap-8">
            <header className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-foreground sm:text-3xl">
                        Technologies
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        La pile technique affichée sur la page d'accueil et
                        proposée dans les formulaires.
                    </p>
                </div>
                <Button
                    onClick={() => {
                        setEditing(undefined);
                        setFormOpen(true);
                    }}
                    leftIcon={<Plus size={16} />}
                    className="bg-gradient-to-r from-vaSecondary to-vaPrimary text-white"
                >
                    Nouvelle technologie
                </Button>
            </header>

            <div className="flex flex-col gap-6">
                {isError ? (
                    <QueryErrorPanel message="Impossible de charger les catégories de technologies." />
                ) : isLoading ? (
                    <ListSkeleton rows={3} />
                ) : null}

                {!isError && !isLoading &&
                    techCategories.map((category, index) => {
                        const categoryTechs = technologies.filter(
                            (technology) => technology.categoryId === category.id
                        );

                        return (
                            <motion.section
                                key={category.id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: index * 0.05,
                                    duration: 0.35,
                                }}
                                className="rounded-2xl border border-vaPrimary/20 bg-vaSecondary/10 p-5 backdrop-blur-md"
                            >
                                <div className="mb-4 flex items-center justify-between gap-3">
                                    <h2 className="font-bold text-foreground">
                                        {category.name}
                                    </h2>
                                    <span className="text-xs text-muted-foreground">
                                        {categoryTechs.length} technologie
                                        {categoryTechs.length > 1 ? "s" : ""}
                                    </span>
                                </div>

                                {categoryTechs.length === 0 ? (
                                    <p className="text-sm text-muted-foreground">
                                        Aucune technologie dans cette catégorie.
                                    </p>
                                ) : (
                                    <div className="flex flex-wrap gap-2.5">
                                        {categoryTechs.map((technology) => (
                                            <span
                                                key={technology.id}
                                                className="group flex cursor-default items-center gap-2 rounded-xl border border-vaPrimary/20 bg-background/40 py-1.5 pl-3 pr-1.5 text-sm text-muted-foreground transition-colors hover:border-vaPrimary/50 hover:text-foreground"
                                            >
                                                {technology.imageUrl ? (
                                                    <Image
                                                        src={technology.imageUrl}
                                                        alt={technology.name}
                                                        width={16}
                                                        height={16}
                                                        unoptimized
                                                        className="size-4 shrink-0 object-contain"
                                                    />
                                                ) : null}
                                                {technology.name}
                                                <span className="flex items-center opacity-0 transition-opacity group-hover:opacity-100">
                                                    <button
                                                        type="button"
                                                        title="Modifier"
                                                        aria-label={`Modifier ${technology.name}`}
                                                        onClick={() => {
                                                            setEditing(technology);
                                                            setFormOpen(true);
                                                        }}
                                                        className="rounded-md p-1 text-muted-foreground hover:text-vaPrimary"
                                                    >
                                                        <Pencil size={13} />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        title="Supprimer"
                                                        aria-label={`Supprimer ${technology.name}`}
                                                        onClick={() =>
                                                            setDeleting(technology)
                                                        }
                                                        className="rounded-md p-1 text-muted-foreground hover:text-destructive"
                                                    >
                                                        <Trash2 size={13} />
                                                    </button>
                                                </span>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </motion.section>
                        );
                    })}

                {!isError && !isLoading && techCategories.length === 0 && (
                    <p className="rounded-2xl border border-dashed border-vaPrimary/30 p-10 text-center text-muted-foreground">
                        Aucune catégorie. Créez-en une dans « Catégories ».
                    </p>
                )}
            </div>

            <TechnologyFormDialog
                open={formOpen}
                onOpenChange={setFormOpen}
                technology={editing}
                onSubmit={handleSubmit}
            />

            <ConfirmDialog
                open={Boolean(deleting)}
                onOpenChange={(open) => !open && setDeleting(undefined)}
                title="Supprimer cette technologie ?"
                description={
                    deleting
                        ? `« ${deleting.name} » sera retirée de la page d'accueil et des suggestions de formulaires.`
                        : ""
                }
                onConfirm={() => {
                    // Toast d'erreur auto ; le dialog se referme sur succès.
                    return deleting ? deleteTechnology(deleting.id) : undefined;
                }}
            />
        </div>
    );
};

export default AdminTechnologiesPage;
