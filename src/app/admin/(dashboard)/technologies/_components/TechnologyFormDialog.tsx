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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import ImagePicker from "@/components/admin/ImagePicker";
import {
    technologyFormSchema,
    type TechnologyFormInputs,
} from "@/schema/portfolio.schema";
import { usePortfolioStore } from "@/stores/usePortfolioStore";
import { DialogMainBody } from "@/components/display/DialogMainBody";
import type { Technology } from "@/types/portfolio.type";

/**
 * Dialog de création / édition d'une technologie.
 * La promesse `onSubmit` rejette en cas d'échec API : le dialog reste ouvert.
 */
const TechnologyFormDialog: React.FC<{
    open: boolean;
    onOpenChange: (open: boolean) => void;
    technology?: Technology;
    onSubmit: (
        data: Omit<Technology, "id">,
        technologyId?: string
    ) => Promise<void>;
}> = ({ open, onOpenChange, technology, onSubmit }) => {
    const isEditing = Boolean(technology);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const techCategories = usePortfolioStore((s) => s.techCategories);

    const defaultValues = React.useMemo<TechnologyFormInputs>(
        () => ({
            name: technology?.name ?? "",
            categoryId: technology?.categoryId ?? "",
            imageUrl: technology?.imageUrl ?? "",
        }),
        [technology]
    );

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<TechnologyFormInputs>({
        resolver: joiResolver(technologyFormSchema),
        defaultValues,
    });

    React.useEffect(() => {
        if (open) reset(defaultValues);
    }, [open, defaultValues, reset]);

    const submit = async (data: TechnologyFormInputs) => {
        setIsSubmitting(true);
        try {
            await onSubmit(
                {
                    name: data.name.trim(),
                    categoryId: data.categoryId,
                    imageUrl: data.imageUrl || undefined,
                },
                technology?.id
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
            <DialogContent className="flex flex-col border-vaPrimary/30 bg-card sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing
                            ? "Modifier la technologie"
                            : "Nouvelle technologie"}
                    </DialogTitle>
                </DialogHeader>

                <form
                    noValidate
                    onSubmit={handleSubmit(submit)}
                    className="flex min-h-0 flex-1 flex-col"
                >
                    {/* Corps défilant : le header et les boutons restent figés */}
                    <DialogMainBody>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-foreground">
                            Nom
                        </label>
                        <Input
                            placeholder="Ex : React, Docker..."
                            {...register("name")}
                        />
                        {errors.name && (
                            <p className="text-xs text-destructive">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-foreground">
                            Catégorie
                        </label>
                        <input type="hidden" {...register("categoryId")} />
                        <Select
                            value={watch("categoryId")}
                            onValueChange={(value) =>
                                setValue("categoryId", value)
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Choisir une catégorie" />
                            </SelectTrigger>
                            <SelectContent>
                                {techCategories.map((category) => (
                                    <SelectItem
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.categoryId && (
                            <p className="text-xs text-destructive">
                                {errors.categoryId.message}
                            </p>
                        )}
                    </div>

                    {/* Image de la techno avec aperçu (bibliothèque / import / URL) */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-foreground">
                            Image (logo)
                        </label>
                        <ImagePicker
                            value={watch("imageUrl")}
                            onChange={(src) => setValue("imageUrl", src)}
                            label="Logo de la technologie"
                        />
                        {errors.imageUrl && (
                            <p className="text-xs text-destructive">
                                {errors.imageUrl.message}
                            </p>
                        )}
                    </div>

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

export default TechnologyFormDialog;
