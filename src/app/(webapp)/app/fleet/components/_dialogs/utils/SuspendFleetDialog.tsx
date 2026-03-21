import { DialogFooter } from "@/components/display/DialogFooter";
import { DialogMainBody } from "@/components/display/DialogMainBody";
import { TextArea } from "@/components/form/TextField";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { CircleOff, PauseCircle } from "lucide-react";

interface SuspendFleetDialogProps {
  isOpen: boolean;
  onClose: () => void;
  fleetName?: string;
  fleetId: string;
  onConfirm?: (fleetId: string) => void;
}

export function SuspendFleetDialog({
  isOpen,
  onClose,
  fleetName,
  fleetId,
  onConfirm,
}: SuspendFleetDialogProps) {
  const handleConfirm = () => {
    onConfirm?.(fleetId);
    onClose();
  };

  return (
    <Dialog bgType="whited" open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogMainBody>
          <div className="">
            <div className="size-32 rounded-full bg-vaTextPrimary/10 text-vaTextPrimary flex items-center justify-center mx-auto mb-6">
              <CircleOff className="size-14" />
            </div>
            <p className="text-xl text-vaTextPrimary font-bold mb-3 text-center">
              Suspendre la flotte
            </p>
            <div className="mb-4 text-center text-sm text-vaTextPrimary">
              Êtes-vous sûr de vouloir suspendre la flotte <span className="font-bold">{fleetName}</span> ? Cette action désactivera temporairement tous les services de la flotte.
            </div>
          </div>
        </DialogMainBody>
        <DialogFooter>
          <div className="grid grid-cols-2 gap-24 w-full">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button variant="mainBlue" onClick={handleConfirm}>
              Confirmer
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

