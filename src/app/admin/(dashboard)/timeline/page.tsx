"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Briefcase, GraduationCap, Pencil, Plus, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
    useAdminExperiencesQuery,
    useAdminEducationQuery,
    useAdminCertificationsQuery,
} from "@/hooks/portfolio/usePortfolioQueries";
import {
    useCreateExperience,
    useUpdateExperience,
    useDeleteExperience,
    useCreateEducation,
    useUpdateEducation,
    useDeleteEducation,
    useCreateCertification,
    useUpdateCertification,
    useDeleteCertification,
} from "@/hooks/portfolio/useAdminTimeline";
import type { Certification, Education, Experience } from "@/types/portfolio.type";
import TimelineItemFormDialog, {
    type TimelineKind,
} from "./_components/TimelineItemFormDialog";
import ConfirmDialog from "../../_components/ConfirmDialog";
import ListSkeleton, { QueryErrorPanel } from "../_components/ListSkeleton";

type TimelineEntity = Experience | Education | Certification;

/** Retourne le titre affiché selon le type d'entité de parcours */
const getEntityTitle = (entity: TimelineEntity): string => {
    if ("position" in entity) return entity.position;
    if ("degree" in entity) return entity.degree;
    return entity.name;
};

const TimelinePage = () => {
    /* Données : queries admin */
    const {
        data: experiences = [],
        isLoading: experiencesLoading,
        isError: experiencesError,
    } = useAdminExperiencesQuery();
    const {
        data: education = [],
        isLoading: educationLoading,
        isError: educationError,
    } = useAdminEducationQuery();
    const {
        data: certifications = [],
        isLoading: certificationsLoading,
        isError: certificationsError,
    } = useAdminCertificationsQuery();

    /* Mutations */
    const { createExperience } = useCreateExperience();
    const { updateExperience } = useUpdateExperience();
    const { deleteExperience } = useDeleteExperience();
    const { createEducation } = useCreateEducation();
    const { updateEducation } = useUpdateEducation();
    const { deleteEducation } = useDeleteEducation();
    const { createCertification } = useCreateCertification();
    const { updateCertification } = useUpdateCertification();
    const { deleteCertification } = useDeleteCertification();

    /* State du formulaire & confirmation */
    const [activeTab, setActiveTab] = React.useState<TimelineKind>("experience");
    const [formOpen, setFormOpen] = React.useState(false);
    const [formKind, setFormKind] = React.useState<TimelineKind>("experience");
    const [editingItem, setEditingItem] = React.useState<TimelineEntity>();
    const [deletingItem, setDeletingItem] = React.useState<
        { item: TimelineEntity; kind: TimelineKind } | undefined
    >();

    const handleOpenCreate = () => {
        setFormKind(activeTab);
        setEditingItem(undefined);
        setFormOpen(true);
    };

    const handleOpenEdit = (entity: TimelineEntity, kind: TimelineKind) => {
        setFormKind(kind);
        setEditingItem(entity);
        setFormOpen(true);
    };

    const handleSubmit = async (
        data: Record<string, unknown>,
        itemId?: string,
    ) => {
        if (formKind === "experience") {
            const payload = data as Omit<Experience, "id">;
            itemId
                ? await updateExperience({ ...payload, id: itemId })
                : await createExperience(payload);
        } else if (formKind === "education") {
            const payload = data as Omit<Education, "id">;
            itemId
                ? await updateEducation({ ...payload, id: itemId })
                : await createEducation(payload);
        } else {
            const payload = data as Omit<Certification, "id">;
            itemId
                ? await updateCertification({ ...payload, id: itemId })
                : await createCertification(payload);
        }
    };

    const handleDelete = async () => {
        if (!deletingItem) return;
        const { item, kind } = deletingItem;
        if (kind === "experience") {
            await deleteExperience(item.id);
        } else if (kind === "education") {
            await deleteEducation(item.id);
        } else {
            await deleteCertification(item.id);
        }
        setDeletingItem(undefined);
    };

    return (
        <div className="flex flex-col gap-8">
            <header className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-foreground sm:text-3xl">
                        Parcours
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Gérez vos expériences, formations et certifications affichés sur la page À propos.
                    </p>
                </div>
                <Button
                    onClick={handleOpenCreate}
                    leftIcon={<Plus size={16} />}
                    className="bg-gradient-to-r from-vaSecondary to-vaPrimary text-white"
                >
                    Nouveau
                </Button>
            </header>

            <Tabs
                value={activeTab}
                onValueChange={(v) => setActiveTab(v as TimelineKind)}
                className="gap-6"
            >
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="experience">
                        <Briefcase size={16} className="mr-2" />
                        Expériences
                    </TabsTrigger>
                    <TabsTrigger value="education">
                        <GraduationCap size={16} className="mr-2" />
                        Formations
                    </TabsTrigger>
                    <TabsTrigger value="certification">
                        <Award size={16} className="mr-2" />
                        Certifications
                    </TabsTrigger>
                </TabsList>

                {/* ---- Expériences ---- */}
                <TabsContent value="experience" className="mt-0">
                    <TimelineList<Experience>
                        items={experiences}
                        isLoading={experiencesLoading}
                        isError={experiencesError}
                        errorPanelMessage="Impossible de charger les expériences."
                        emptyMessage="Aucune expérience — créez-en une pour l'afficher sur votre portfolio."
                        getItemTitle={(e) => e.position}
                        getItemSubtitle={(e) => e.company}
                        getPeriod={(e) =>
                            e.startDate
                                ? `${e.startDate}${e.endDate ? ` — ${e.endDate}` : " — Aujourd'hui"}`
                                : ""
                        }
                        onEdit={(item) => handleOpenEdit(item, "experience")}
                        onDelete={(item) =>
                            setDeletingItem({ item, kind: "experience" })
                        }
                    />
                </TabsContent>

                {/* ---- Formations ---- */}
                <TabsContent value="education" className="mt-0">
                    <TimelineList<Education>
                        items={education}
                        isLoading={educationLoading}
                        isError={educationError}
                        errorPanelMessage="Impossible de charger les formations."
                        emptyMessage="Aucune formation — créez-en une pour l'afficher sur votre portfolio."
                        getItemTitle={(e) => e.degree}
                        getItemSubtitle={(e) => e.school}
                        getPeriod={(e) =>
                            e.startDate
                                ? `${e.startDate}${e.endDate ? ` — ${e.endDate}` : " — Aujourd'hui"}`
                                : ""
                        }
                        onEdit={(item) => handleOpenEdit(item, "education")}
                        onDelete={(item) =>
                            setDeletingItem({ item, kind: "education" })
                        }
                    />
                </TabsContent>

                {/* ---- Certifications ---- */}
                <TabsContent value="certification" className="mt-0">
                    <TimelineList<Certification>
                        items={certifications}
                        isLoading={certificationsLoading}
                        isError={certificationsError}
                        errorPanelMessage="Impossible de charger les certifications."
                        emptyMessage="Aucune certification — créez-en une pour l'afficher sur votre portfolio."
                        getItemTitle={(c) => c.name}
                        getItemSubtitle={(c) => c.issuer}
                        getPeriod={(c) => c.dateObtained}
                        onEdit={(item) => handleOpenEdit(item, "certification")}
                        onDelete={(item) =>
                            setDeletingItem({ item, kind: "certification" })
                        }
                    />
                </TabsContent>
            </Tabs>

            <TimelineItemFormDialog
                open={formOpen}
                onOpenChange={setFormOpen}
                kind={formKind}
                item={editingItem}
                onSubmit={handleSubmit}
            />

            <ConfirmDialog
                open={Boolean(deletingItem)}
                onOpenChange={(open) => !open && setDeletingItem(undefined)}
                title="Supprimer cet élément ?"
                description={
                    deletingItem
                        ? `« ${getEntityTitle(deletingItem.item)} » sera définitivement retiré de votre portfolio.`
                        : ""
                }
                onConfirm={handleDelete}
            />
        </div>
    );
};

/* Generic list renderer — avoids duplicating the loading/error/empty pattern */
interface TimelineListProps<T> {
    items: T[];
    isLoading: boolean;
    isError: boolean;
    errorPanelMessage: string;
    emptyMessage: string;
    getItemTitle: (item: T) => string;
    getItemSubtitle: (item: T) => string;
    getPeriod: (item: T) => string;
    onEdit: (item: T) => void;
    onDelete: (item: T) => void;
}

function TimelineList<T extends { id: string }>(
    props: TimelineListProps<T>,
) {
    const {
        items,
        isLoading,
        isError,
        errorPanelMessage,
        emptyMessage,
        getItemTitle,
        getItemSubtitle,
        getPeriod,
        onEdit,
        onDelete,
    } = props;

    if (isError) {
        return <QueryErrorPanel message={errorPanelMessage} />;
    }

    if (isLoading) {
        return <ListSkeleton rows={4} />;
    }

    if (items.length === 0) {
        return (
            <p className="rounded-2xl border border-dashed border-vaPrimary/30 p-10 text-center text-muted-foreground">
                {emptyMessage}
            </p>
        );
    }

    return (
        <div className="flex flex-col gap-3">
            {items.map((item, index) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.35 }}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-vaPrimary/20 bg-vaSecondary/10 p-5 backdrop-blur-md"
                >
                    <div className="min-w-0">
                        <h2 className="font-bold text-foreground">
                            {getItemTitle(item)}
                        </h2>
                        <p className="mt-1 truncate text-sm text-muted-foreground">
                            {getItemSubtitle(item)} ·{" "}
                            <span className="text-xs">
                                {getPeriod(item)}
                            </span>
                        </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            title="Modifier"
                            aria-label={`Modifier ${getItemTitle(item)}`}
                            onClick={() => onEdit(item)}
                            className="rounded-xl border-vaPrimary/30 bg-background/40 hover:bg-vaPrimary/20"
                        >
                            <Pencil size={16} />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            title="Supprimer"
                            aria-label={`Supprimer ${getItemTitle(item)}`}
                            onClick={() => onDelete(item)}
                            className="rounded-xl border-destructive/40 bg-background/40 text-destructive hover:bg-destructive/20"
                        >
                            <Trash2 size={16} />
                        </Button>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

export default TimelinePage;
