import { DialogFooter } from "@/components/display/DialogFooter";
import { DialogMainBody } from "@/components/display/DialogMainBody";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { CircleOff } from "lucide-react";

interface SuspendPackageDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SuspendPackageDialog({
    isOpen,
    onClose,
}: SuspendPackageDialogProps) {

    return (
        <Dialog bgType="whited" open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogMainBody>
                    <div className="">
                        <div className="size-32 rounded-full bg-vaTextPrimary/10 text-vaTextPrimary flex items-center justify-center mx-auto mb-6">
                            <CircleOff className="size-14" />
                        </div>
                        <p className="text-xl text-vaTextPrimary font-bold mb-3 text-center">
                            Suspendre le package
                        </p>
                        <div className="mb-4 text-center text-sm text-vaTextPrimary">
                            Êtes-vous sûr de vouloir suspendre le package Essentiel ? Cela entraîna une interruption temporaire du service.
                        </div>
                    </div>
                </DialogMainBody>
                <DialogFooter>
                    <div className="grid grid-cols-2 gap-24 w-full">
                        <Button variant="outline" onClick={onClose}>
                            Annuler
                        </Button>
                        <Button variant="mainBlue" onClick={onClose}>
                            Confirmer
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

