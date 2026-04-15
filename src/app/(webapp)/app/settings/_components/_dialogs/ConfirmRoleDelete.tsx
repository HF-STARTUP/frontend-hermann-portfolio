import { DialogFooter } from "@/components/display/DialogFooter";
import { DialogMainBody } from "@/components/display/DialogMainBody";
import { TextArea } from "@/components/form/TextField";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import notify from "@/utils/func/notification";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useDeleteRole } from "@/hooks/admin/useRoleAccess";

interface DeleteRoleDialogProps {
    isOpen: boolean;
    onClose: () => void;
    roleName?: string;
    roleId?: string;
}

export function DeleteRoleDialog({
    isOpen,
    onClose,
    roleName,
    roleId,
}: DeleteRoleDialogProps) {
    const { error, isError, isSuccess, loading, onDeleteRole } = useDeleteRole(roleId??"");
    const [reason, setReason] = useState("");

    useEffect(() => {
        if (!isOpen) {
            setReason("");
        }
    }, [isOpen]);

    useEffect(() => {
        if (isSuccess) {
            onClose();
        }
    }, [isSuccess]);

    const handleConfirm = () => {
        if (roleId) {
            onDeleteRole();
        }
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
                            Supprimer le role
                        </p>
                        <div className="mb-4 text-center text-sm text-vaTextPrimary/80">
                            Êtes-vous sûr de vouloir supprimer le role <span className="font-bold">{roleName}</span> ? Cette action est
                            irréversible.
                        </div>
                        {/* <div className="flex flex-col gap-2">                          
                            <TextArea 
                            label="Motif de suppression"
                                className="rounded-2xl" 
                                placeholder="Veuillez indiquer le motif de la suppression..."
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            />
                        </div> */}
                    </div>
                </DialogMainBody>
                <DialogFooter>
                    <div className="grid grid-cols-2 gap-16 w-full">
                        <Button variant="outline" onClick={onClose}>
                            Annuler
                        </Button>
                        <Button 
                            variant="destructive" 
                            onClick={handleConfirm} 
                            loading={loading}
                        >
                            Confirmer
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}