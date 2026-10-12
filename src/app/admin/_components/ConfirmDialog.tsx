"use client";

import React from "react";
import { Trash2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogMainBody } from "@/components/display/DialogMainBody";

/**
 * Dialog de confirmation (suppression...) réutilisable : `children` permet
 * d'insérer un contenu supplémentaire (ex : champ de saisie), `confirmLabel`
 * de personnaliser l'action principale.
 *
 * `onConfirm` peut être asynchrone (appel API) : la promesse est attendue et
 * le dialog ne se referme qu'en cas de succès ; en cas d'échec le toast est
 * affiché par l'appelant.
 */
const ConfirmDialog: React.FC<{
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description: string;
    onConfirm: () => void | Promise<void>;
    confirmLabel?: string;
    children?: React.ReactNode;
}> = ({
    open,
    onOpenChange,
    title,
    description,
    onConfirm,
    confirmLabel = "Supprimer",
    children,
}) => {
    const [isPending, setIsPending] = React.useState(false);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="flex flex-col border-vaPrimary/30 bg-card sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Trash2 size={18} className="text-destructive" />
                        {title}
                    </DialogTitle>
                </DialogHeader>

                {/* Corps défilant : le header et les boutons restent figés */}
                <DialogMainBody>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                        {description}
                    </p>
                    {children}
                </DialogMainBody>

                <DialogFooter className="gap-2 border-t border-vaPrimary/10 p-4 pt-3 sm:gap-0">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Annuler
                    </Button>
                    <Button
                        variant="destructive"
                        loading={isPending}
                        onClick={async () => {
                            setIsPending(true);
                            try {
                                await onConfirm();
                                onOpenChange(false);
                            } catch {
                                /* toast d'erreur géré par l'appelant */
                            } finally {
                                setIsPending(false);
                            }
                        }}
                    >
                        {confirmLabel}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmDialog;
