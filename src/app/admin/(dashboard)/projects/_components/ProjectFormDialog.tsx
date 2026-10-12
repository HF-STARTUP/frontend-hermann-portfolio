"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { Pencil, Plus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    projectFormSchema,
    type ProjectFormInputs,
} from "@/schema/portfolio.schema";
import { usePortfolioStore } from "@/stores/usePortfolioStore";
import TagInput from "@/components/ui/tag-input";
import ImagePicker from "@/components/admin/ImagePicker";
import { DialogMainBody } from "@/components/display/DialogMainBody";
import type { Project } from "@/types/portfolio.type";

const toFormValues = (project?: Project): ProjectFormInputs => ({
    title: project?.title ?? "",
    role: project?.role ?? "",
    description: project?.description ?? "",
    category: project?.category ?? "",
    imageUrl: project?.imageUrl ?? "",
    demoUrl: project?.links.demo ?? "",
    githubUrl: project?.links.github ?? "",
    techStack: project?.techStack ?? [],
});

/**
 * Dialog de création / édition d'un projet.
 * La promesse `onSubmit` rejette en cas d'échec API : le dialog reste ouvert
 * (le toast d'erreur est affiché par la page).
 */
const ProjectFormDialog: React.FC<{
    open: boolean;
    onOpenChange: (open: boolean) => void;
    project?: Project;
    onSubmit: (
        data: Omit<Project, "id">,
        projectId?: string
    ) => Promise<void>;
}> = ({ open, onOpenChange, project, onSubmit }) => {
    const isEditing = Boolean(project);
    const [featured, setFeatured] = React.useState(project?.featured ?? false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const projectCategories = usePortfolioStore((s) => s.projectCategories);
    const technologies = usePortfolioStore((s) => s.technologies);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ProjectFormInputs>({
        resolver: joiResolver(projectFormSchema),
        defaultValues: toFormValues(project),
    });

    // Réinitialise le formulaire à chaque ouverture
    React.useEffect(() => {
        if (open) {
            reset(toFormValues(project));
            setFeatured(project?.featured ?? false);
        }
    }, [open, project, reset]);

    const submit = async (data: ProjectFormInputs) => {
        setIsSubmitting(true);
        try {
            await onSubmit(
            {
                slug:
                    data.title
                        .toLowerCase()
                        .normalize("NFD")
                        .replace(/[̀-ͯ]/g, "")
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/^-|-$/g, "") ||
                    `projet-${Date.now().toString(36)}`,
                title: data.title,
                role: data.role,
                description: data.description,
                longDescription: undefined,
                // Image par défaut si aucune n'a été choisie via ImagePicker
                imageUrl:
                    data.imageUrl ||
                    "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1200&q=80",
                techStack: data.techStack,
                category: data.category,
                links: {
                    demo: data.demoUrl || undefined,
                    github: data.githubUrl || undefined,
                },
                    featured,
                    startDate: project?.startDate ??
                        new Date().toISOString().slice(0, 7),
                    endDate: project?.endDate,
                },
                project?.id
            );
            onOpenChange(false);
        } catch {
            // Échec API : toast émis par useMutationProvider, on garde le formulaire.
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="flex flex-col border-vaPrimary/30 bg-card sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? "Modifier le projet" : "Nouveau projet"}
                    </DialogTitle>
                </DialogHeader>

                <form
                    noValidate
                    onSubmit={handleSubmit(submit)}
                    className="flex min-h-0 flex-1 flex-col"
                >
                    {/* Corps défilant : le header et les boutons restent figés */}
                    <DialogMainBody>
                    <FormField label="Titre" error={errors.title?.message}>
                        <Input placeholder="Nom du projet" {...register("title")} />
                    </FormField>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <FormField label="Rôle" error={errors.role?.message}>
                            <Input
                                placeholder="Ex: Développeur Frontend"
                                {...register("role")}
                            />
                        </FormField>

                        <FormField label="Catégorie" error={errors.category?.message}>
                            <input type="hidden" {...register("category")} />
                            <Select
                                value={watch("category")}
                                onValueChange={(value) => setValue("category", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Choisir une catégorie" />
                                </SelectTrigger>
                                {/* Catégories gérées dans /admin/categories */}
                                <SelectContent>
                                    {projectCategories.map((category) => (
                                        <SelectItem key={category.id} value={category.id}>
                                            {category.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormField>
                    </div>

                    <FormField
                        label="Description"
                        error={errors.description?.message}
                    >
                        <Textarea
                            rows={3}
                            placeholder="Résumé du projet..."
                            {...register("description")}
                        />
                    </FormField>

                    {/* Technologies : saisie filtrante -> badges avec suppression */}
                    <FormField
                        label="Technologies"
                        error={errors.techStack?.message}
                    >
                        <TagInput
                            options={technologies.map((technology) => ({
                                value: technology.name,
                                label: technology.name,
                            }))}
                            value={watch("techStack") ?? []}
                            onChange={(techStack) =>
                                setValue("techStack", techStack)
                            }
                            placeholder="Saisir pour filtrer (React, Docker...)"
                            allowFree
                            emptyMessage="Aucune correspondance — Entrée pour créer"
                        />
                    </FormField>

                    {/* Image : sélecteur avec aperçu (bibliothèque / import / URL) */}
                    <FormField label="Image" error={errors.imageUrl?.message}>
                        <ImagePicker
                            value={watch("imageUrl")}
                            onChange={(src) => setValue("imageUrl", src)}
                            label="Image du projet"
                        />
                    </FormField>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <FormField label="Lien démo" error={errors.demoUrl?.message}>
                            <Input placeholder="https://..." {...register("demoUrl")} />
                        </FormField>
                        <FormField label="Lien GitHub" error={errors.githubUrl?.message}>
                            <Input placeholder="https://..." {...register("githubUrl")} />
                        </FormField>
                    </div>

                    <label className="flex items-center justify-between rounded-2xl border border-vaPrimary/20 bg-vaSecondary/10 px-4 py-3">
                        <span className="text-sm font-medium text-foreground">
                            Projet mis en avant (featured)
                        </span>
                        <Switch checked={featured} onCheckedChange={setFeatured} />
                    </label>

                    </DialogMainBody>

                    <DialogFooter className="gap-2 border-t border-vaPrimary/10 p-4 pt-3 sm:gap-0">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Annuler
                        </Button>
                        <Button
                            type="submit"
                            loading={isSubmitting}
                            leftIcon={isEditing ? <Pencil size={16} /> : <Plus size={16} />}
                            className="bg-gradient-to-r from-vaSecondary to-vaPrimary text-white"
                        >
                            {isEditing ? "Enregistrer" : "Créer le projet"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

const FormField: React.FC<{
    label: string;
    error?: string;
    children: React.ReactNode;
}> = ({ label, error, children }) => (
    <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">{label}</label>
        {children}
        {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
);

export default ProjectFormDialog;
