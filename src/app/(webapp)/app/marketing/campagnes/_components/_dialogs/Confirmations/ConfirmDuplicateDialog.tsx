import { DialogFooter } from "@/components/display/DialogFooter";
import { DialogMainBody } from "@/components/display/DialogMainBody";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";

interface DuplicateCampagneDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DuplicateCampagneDialog({
  isOpen,
  onClose,
}: DuplicateCampagneDialogProps) {

  return (
    <Dialog bgType="whited" open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogMainBody>
          <div className="">
            <div className="size-32 rounded-full bg-vaDarkGreen text-vaGreen flex items-center justify-center mx-auto mb-6">
              <Copy className="size-14" />
            </div>
            <p className="text-xl text-vaTextPrimary font-bold mb-3 text-center">
              Dupliquer le code
            </p>
            <div className="mb-4 text-center text-sm text-vaMainBlue p-4 rounded-xl border border-vaMainBlue">
              Voulez-vous créer une copie de cette campagne ? Toutes les données seront dupliquées.
            </div>
            <Input label="Nom de la nouvelle campagne" placeholder="FACEBOOK RETARGETING - COPIE" />
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

