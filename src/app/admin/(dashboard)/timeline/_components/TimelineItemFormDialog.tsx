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
import ImagePicker from "@/components/admin/ImagePicker";
import { DialogMainBody } from "@/components/display/DialogMainBody";
import {
    experienceFormSchema,
    educationFormSchema,
    certificationFormSchema,
    type ExperienceFormInputs,
    type EducationFormInputs,
    type CertificationFormInputs,
} from "@/schema/portfolio.schema";
import type { Certification, Education, Experience } from "@/types/portfolio.type";

export type TimelineKind = "experience" | "education" | "certification";

/**
 * Flat type that includes ALL possible fields across the three schemas.
 * The Joi resolver only validates the fields relevant to the current `kind`,
 * so extra (undefined) fields are harmless.
 */
type FormInputs = {
    company: string;
    position: string;
    location: string;
    school: string;
    degree: string;
    name: string;
    issuer: string;
    description: string;
    startDate: string;
    endDate: string;
    dateObtained: string;
    url: string;
    imageUrl: string;
    sortOrder: number;
};

type FormEntity = Experience | Education | Certification;

const toExperienceFormValues = (item?: Experience): ExperienceFormInputs => ({
    company: item?.company ?? "",
    position: item?.position ?? "",
    location: item?.location ?? "",
    description: item?.description ?? "",
    startDate: item?.startDate ?? "",
    endDate: item?.endDate ?? "",
    sortOrder: item?.sortOrder ?? 0,
});

const toEducationFormValues = (item?: Education): EducationFormInputs => ({
    school: item?.school ?? "",
    degree: item?.degree ?? "",
    description: item?.description ?? "",
    startDate: item?.startDate ?? "",
    endDate: item?.endDate ?? "",
    sortOrder: item?.sortOrder ?? 0,
});

const toCertificationFormValues = (
    item?: Certification,
): CertificationFormInputs => ({
    name: item?.name ?? "",
    issuer: item?.issuer ?? "",
    description: item?.description ?? "",
    dateObtained: item?.dateObtained ?? "",
    url: item?.url ?? "",
    imageUrl: item?.imageUrl ?? "",
    sortOrder: item?.sortOrder ?? 0,
});

const toFormValues = (
    kind: TimelineKind,
    item?: FormEntity,
): FormInputs => {
    // Toutes les valeurs par défaut (champs inutilisés pour le kind courant)
    const defaults: FormInputs = {
        company: "",
        position: "",
        location: "",
        school: "",
        degree: "",
        name: "",
        issuer: "",
        description: "",
        startDate: "",
        endDate: "",
        dateObtained: "",
        url: "",
        imageUrl: "",
        sortOrder: 0,
    };

    switch (kind) {
        case "experience":
            return { ...defaults, ...toExperienceFormValues(item as Experience) };
        case "education":
            return { ...defaults, ...toEducationFormValues(item as Education) };
        case "certification":
            return { ...defaults, ...toCertificationFormValues(item as Certification) };
    }
};

const KIND_LABELS: Record<TimelineKind, { create: string; edit: string }> = {
    experience: { create: "Nouvelle expérience", edit: "Modifier l'expérience" },
    education: { create: "Nouvelle formation", edit: "Modifier la formation" },
    certification: { create: "Nouvelle certification", edit: "Modifier la certification" },
};

const KIND_SCHEMA = {
    experience: experienceFormSchema,
    education: educationFormSchema,
    certification: certificationFormSchema,
} as const;

const KIND_TITLES: Record<TimelineKind, string> = {
    experience: "Expérience professionnelle",
    education: "Formation",
    certification: "Certification",
};

/**
 * Dialog de création / édition d'un élément de parcours.
 * Adapte ses champs selon `kind` : expérience, formation ou certification.
 * La promesse `onSubmit` rejette en cas d'échec API : le dialog reste ouvert
 * (le toast d'erreur est affiché par le provider).
 */
const TimelineItemFormDialog: React.FC<{
    open: boolean;
    onOpenChange: (open: boolean) => void;
    kind: TimelineKind;
    item?: FormEntity;
    onSubmit: (
        data: Omit<FormEntity, "id">,
        itemId?: string,
    ) => Promise<void>;
}> = ({ open, onOpenChange, kind, item, onSubmit }) => {
    const isEditing = Boolean(item);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FormInputs>({
        resolver: joiResolver(KIND_SCHEMA[kind] as never, { allowUnknown: true }),
        defaultValues: toFormValues(kind, item),
    });

    // Réinitialise le formulaire à chaque ouverture
    React.useEffect(() => {
        if (open) reset(toFormValues(kind, item));
    }, [open, item, kind, reset]);

    const submit = async (data: FormInputs) => {
        setIsSubmitting(true);
        try {
            await onSubmit(data as unknown as Omit<FormEntity, "id">, item?.id);
            onOpenChange(false);
        } catch {
            // Échec API : toast émis par useMutationProvider, formulaire conservé.
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="flex flex-col border-vaPrimary/30 bg-card sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? KIND_LABELS[kind].edit : KIND_LABELS[kind].create}
                    </DialogTitle>
                </DialogHeader>

                <form
                    noValidate
                    onSubmit={handleSubmit(submit)}
                    className="flex min-h-0 flex-1 flex-col"
                >
                    {/* Corps défilant : le header et les boutons restent figés */}
                    <DialogMainBody>
                        <FormField
                            label="Intitulé"
                            error={
                                kind === "experience"
                                    ? errors.company?.message
                                    : kind === "education"
                                        ? errors.school?.message
                                        : errors.name?.message
                            }
                        >
                            {kind === "experience" && (
                                <Input
                                    placeholder="Ex: Genius Technologies"
                                    {...register("company")}
                                />
                            )}
                            {kind === "education" && (
                                <Input
                                    placeholder="Ex: Université de Douala"
                                    {...register("school")}
                                />
                            )}
                            {kind === "certification" && (
                                <Input
                                    placeholder="Ex: AWS Certified Cloud Practitioner"
                                    {...register("name")}
                                />
                            )}
                        </FormField>

                        {kind === "experience" && (
                            <FormField
                                label="Poste"
                                error={errors.position?.message}
                            >
                                <Input
                                    placeholder="Ex: Développeur Frontend Lead"
                                    {...register("position")}
                                />
                            </FormField>
                        )}

                        {kind === "education" && (
                            <FormField
                                label="Diplôme"
                                error={errors.degree?.message}
                            >
                                <Input
                                    placeholder="Ex: Licence en Informatique"
                                    {...register("degree")}
                                />
                            </FormField>
                        )}

                        {kind === "certification" && (
                            <FormField
                                label="Organisme"
                                error={errors.issuer?.message}
                            >
                                <Input
                                    placeholder="Ex: Amazon Web Services"
                                    {...register("issuer")}
                                />
                            </FormField>
                        )}

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {kind === "experience" && (
                                <>
                                    <FormField
                                        label="Localisation"
                                        error={errors.location?.message}
                                    >
                                        <Input
                                            placeholder="Ex: Douala, Cameroun"
                                            {...register("location")}
                                        />
                                    </FormField>

                                    <FormField
                                        label="Ordre d'affichage"
                                        error={errors.sortOrder?.message}
                                    >
                                        <Input
                                            type="number"
                                            min={0}
                                            placeholder="0"
                                            {...register("sortOrder", {
                                                valueAsNumber: true,
                                            })}
                                        />
                                    </FormField>
                                </>
                            )}

                            {kind === "education" && (
                                <>
                                    <FormField
                                        label="Ordre d'affichage"
                                        error={errors.sortOrder?.message}
                                    >
                                        <Input
                                            type="number"
                                            min={0}
                                            placeholder="0"
                                            {...register("sortOrder", {
                                                valueAsNumber: true,
                                            })}
                                        />
                                    </FormField>
                                </>
                            )}

                            {kind === "certification" && (
                                <>
                                    <FormField
                                        label="Date d'obtention"
                                        error={errors.dateObtained?.message}
                                    >
                                        <Input
                                            type="date"
                                            {...register("dateObtained")}
                                        />
                                    </FormField>

                                    <FormField
                                        label="Ordre d'affichage"
                                        error={errors.sortOrder?.message}
                                    >
                                        <Input
                                            type="number"
                                            min={0}
                                            placeholder="0"
                                            {...register("sortOrder", {
                                                valueAsNumber: true,
                                            })}
                                        />
                                    </FormField>
                                </>
                            )}
                        </div>

                        {kind !== "certification" && (
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <FormField
                                    label="Date de début"
                                    error={
                                        kind === "experience"
                                            ? errors.startDate?.message
                                            : errors.startDate?.message
                                    }
                                >
                                    <Input type="month" {...register("startDate")} />
                                </FormField>

                                <FormField
                                    label="Date de fin"
                                    error={
                                        kind === "experience"
                                            ? errors.endDate?.message
                                            : errors.endDate?.message
                                    }
                                    hint="Laisser vide si actuellement"
                                >
                                    <Input type="month" {...register("endDate")} />
                                </FormField>
                            </div>
                        )}

                        {kind === "experience" && (
                            <FormField
                                label="Description"
                                error={errors.description?.message}
                            >
                                <Textarea
                                    rows={3}
                                    placeholder="Description du poste, responsabilités..."
                                    {...register("description")}
                                />
                            </FormField>
                        )}

                        {kind === "education" && (
                            <FormField
                                label="Description"
                                error={errors.description?.message}
                            >
                                <Textarea
                                    rows={3}
                                    placeholder="Détails sur la formation..."
                                    {...register("description")}
                                />
                            </FormField>
                        )}

                        {kind === "certification" && (
                            <>
                                <FormField
                                    label="URL de vérification"
                                    error={errors.url?.message}
                                >
                                    <Input
                                        placeholder="https://..."
                                        {...register("url")}
                                    />
                                </FormField>

                                <FormField
                                    label="Image du badge"
                                    error={errors.imageUrl?.message}
                                >
                                    <ImagePicker
                                        value={watch("imageUrl")}
                                        onChange={(src) =>
                                            setValue("imageUrl", src)
                                        }
                                        label="Badge de certification"
                                    />
                                </FormField>

                                <FormField
                                    label="Description"
                                    error={errors.description?.message}
                                >
                                    <Textarea
                                        rows={3}
                                        placeholder="Description détaillée..."
                                        {...register("description")}
                                    />
                                </FormField>
                            </>
                        )}

                        {/* Aperçu de l'entité en cours d'édition */}
                        {isEditing && (
                            <FormField
                                label={KIND_TITLES[kind]}
                                error={undefined}
                            >
                                <Input value={item?.id ?? ""} disabled />
                            </FormField>
                        )}
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
                            {isEditing ? "Enregistrer" : "Créer"}
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
    hint?: string;
    children: React.ReactNode;
}> = ({ label, error, hint, children }) => (
    <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">{label}</label>
        {children}
        {error && <p className="text-xs text-destructive">{error}</p>}
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
);

export default TimelineItemFormDialog;
