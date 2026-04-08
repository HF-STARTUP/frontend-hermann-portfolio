import { DialogFooter } from "@/components/display/DialogFooter";
import { DialogMainBody } from "@/components/display/DialogMainBody";
import { TextArea } from "@/components/form/TextField";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";

interface DeletePackageDialogProps {
    isOpen: boolean;
    onClose: () => void;
    PackageName?: string;
    PackageId: string;
    onConfirm?: (PackageId: string) => void;
}

export function DeletePackageDialog({
    isOpen,
    onClose,
    PackageName,
    PackageId,
    onConfirm,
}: DeletePackageDialogProps) {
    const handleConfirm = () => {
        onConfirm?.(PackageId);
        onClose();
    };

    return (
        <Dialog bgType="whited" open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogMainBody>
                    <div className="">
                        <div className="size-32 rounded-full bg-vaRed/10 text-vaRed flex items-center justify-center mx-auto mb-6">
                            <Trash2 className="size-14" />
                        </div>
                        <p className="text-xl text-vaTextPrimary font-bold mb-3 text-center">
                            Supprimer le package
                        </p>
                        <div className="mb-4 text-center text-sm text-vaTextPrimary/80">
                            Êtes-vous sûr de vouloir supprimer le package  <span className="font-bold">Essentiel</span>? Cette action est irréversible.
                        </div>
                        <div className="flex flex-col">
                            <label className="text-xl font-semibold text-vaTextPrimary">
                                Motif
                            </label>
                            <TextArea className="rounded-2xl" />
                        </div>
                    </div>
                </DialogMainBody>
                <DialogFooter>
                    <div className="grid grid-cols-2 gap-16 w-full">
                        <Button variant="outline" onClick={onClose}>
                            Annuler
                        </Button>
                        <Button variant="destructive" onClick={handleConfirm}>
                            Confirmer
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}