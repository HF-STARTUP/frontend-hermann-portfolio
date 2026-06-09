import { DialogFooter } from "@/components/display/DialogFooter";
import { DialogMainBody } from "@/components/display/DialogMainBody";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useApproveKycSubmission } from "@/hooks/admin/useKycHook";
import { CheckCircle2 } from "lucide-react";
import { useEffect } from "react";

interface ApproveKycDialogProps {
  isOpen: boolean;
  onClose: () => void;
  submissionId?: string;
  clientName?: string;
  onLoadingChange?: (loading: boolean) => void;
  onSuccess?: () => void;
}

export function ApproveKycDialog({
  isOpen,
  onClose,
  submissionId,
  clientName,
  onLoadingChange,
  onSuccess,
}: ApproveKycDialogProps) {
  const { loading, isSuccess, onApprove } = useApproveKycSubmission();

  useEffect(() => {
    onLoadingChange?.(loading);
  }, [loading, onLoadingChange]);

  const handleConfirm = () => {
    if (submissionId) {
      onApprove(submissionId);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      onSuccess?.();
      onClose();
    }
  }, [isSuccess, onClose, onSuccess]);

  return (
    <Dialog bgType="whited" open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogMainBody>
          <div className="size-32 rounded-full bg-vaGreen/10 text-vaGreen flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="size-14" />
          </div>
          <p className="text-xl text-vaTextPrimary font-bold mb-3 text-center">
            Approuver le dossier KYC
          </p>
          <p className="mb-4 text-center text-sm text-vaTextPrimary">
            Confirmez-vous l&apos;approbation du dossier de{" "}
            <span className="font-bold">{clientName}</span> ? Cette action
            validera l&apos;ensemble des pièces associées.
          </p>
        </DialogMainBody>
        <DialogFooter>
          <div className="grid grid-cols-2 gap-6 w-full">
            <Button variant="outline" onClick={onClose} disabled={loading}>
              Annuler
            </Button>
            <Button
              variant="success"
              onClick={handleConfirm}
              loading={loading}
              disabled={!submissionId}
            >
              Approuver
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
