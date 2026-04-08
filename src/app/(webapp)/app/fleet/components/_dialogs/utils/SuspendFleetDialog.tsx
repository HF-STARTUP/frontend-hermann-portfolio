import { DialogFooter } from "@/components/display/DialogFooter";
import { DialogMainBody } from "@/components/display/DialogMainBody";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useSuspendFleet } from "@/hooks/admin/useFleetHook";
import notify from "@/utils/func/notification";
import { useEffect } from "react";
import { CircleOff } from "lucide-react";

interface SuspendFleetDialogProps {
  isOpen: boolean;
  onClose: () => void;
  fleetName?: string;
  fleetId?: string;
  onConfirm?: (fleetId: string) => void;
}

export function SuspendFleetDialog({
  isOpen,
  onClose,
  fleetName,
  fleetId,
}: SuspendFleetDialogProps) {
  const { error, isError, isSuccess, loading, onSuspendFleet } = useSuspendFleet()
  const handleConfirm = () => {
    if (fleetId) {
      onSuspendFleet({
        park_id: fleetId,
        reason: ""
      })
    }

    if (isError) {
      console.error(error);
      notify(error?.message || "Une erreur est survenue lors de la suspension de la flotte", "error");
    }
  };

  useEffect(() => {
    if (isSuccess) {
        onClose()
    }
}, [isSuccess]);

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
            <Button variant="mainBlue" onClick={()=>handleConfirm()} loading={loading}>
              Confirmer
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

