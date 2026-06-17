"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  useRejectKycSubmission,
  useUpdateKycDocument,
} from "@/hooks/admin/useKycHook";
import { KycDocumentType, KycRejectionReason } from "@/types/admin/kyc.type";
import notify from "@/utils/func/notification";
import { Ban, FileText, X } from "lucide-react";
import { useEffect, useState } from "react";
import { buildKycRejectionNote, KycRejectReasonMap } from "../utils";
import { cn } from "@/lib/utils";

type RejectKycDialogVariant = "submission" | "document";

interface RejectKycDialogProps {
  isOpen: boolean;
  onClose: () => void;
  variant?: RejectKycDialogVariant;
  submissionId?: string;
  documentType?: KycDocumentType;
  documentLabel?: string;
  clientName?: string;
  clientCode?: string;
  avatarInitials?: string;
  avatarColor?: string;
  onLoadingChange?: (loading: boolean) => void;
  onSuccess?: () => void;
}

export function RejectKycDialog({
  isOpen,
  onClose,
  variant = "submission",
  submissionId,
  documentType,
  documentLabel,
  clientName,
  clientCode,
  avatarInitials,
  avatarColor,
  onLoadingChange,
  onSuccess,
}: RejectKycDialogProps) {
  const {
    loading: submissionLoading,
    isSuccess: submissionSuccess,
    onReject,
  } = useRejectKycSubmission();
  const {
    loading: documentLoading,
    isSuccess: documentSuccess,
    onUpdateDocument,
  } = useUpdateKycDocument();

  const [reasonCode, setReasonCode] = useState<KycRejectionReason | "">("");
  const [comment, setComment] = useState("");

  const isDocumentVariant = variant === "document";
  const loading = isDocumentVariant ? documentLoading : submissionLoading;
  const isSuccess = isDocumentVariant ? documentSuccess : submissionSuccess;

  useEffect(() => {
    onLoadingChange?.(loading);
  }, [loading, onLoadingChange]);

  const resetForm = () => {
    setReasonCode("");
    setComment("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleConfirm = () => {
    if (!submissionId) return;

    if (!reasonCode) {
      notify("Veuillez sélectionner un motif de rejet.", "warning");
      return;
    }

    if (reasonCode === "autre" && !comment.trim()) {
      notify(
        "Le commentaire est obligatoire pour le motif « Autre ».",
        "warning",
      );
      return;
    }

    if (isDocumentVariant) {
      if (!documentType) return;

      onUpdateDocument(submissionId, documentType, {
        status: "rejected",
        note: buildKycRejectionNote(reasonCode, comment),
      });
      return;
    }

    onReject(submissionId, {
      reason_code: reasonCode,
      comment: comment.trim() || undefined,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      resetForm();
      onSuccess?.();
      onClose();
    }
  }, [isSuccess, onClose, onSuccess]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg p-0 gap-0 overflow-hidden rounded-2xl">
        <DialogHeader className="px-6 pt-6 pb-4 space-y-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-vaRed/10 text-vaRed flex items-center justify-center shrink-0">
                <Ban className="size-5" />
              </div>
              <DialogTitle className="text-lg font-bold text-[#000B20]">
                {isDocumentVariant ? "Rejeter le document" : "Rejeter le KYC"}
              </DialogTitle>
            </div>
            {/* <button
              type="button"
              onClick={handleClose}
              className="text-[#A3AED0] hover:text-[#506D82] transition-colors"
            >
              <X className="size-5" />
            </button> */}
          </div>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-5">
          <div className="flex items-center gap-3 bg-[#F4F7FE] rounded-xl p-4">
            {isDocumentVariant ? (
              <>
                <div className="size-11 rounded-xl bg-white text-vaRed flex items-center justify-center shrink-0">
                  <FileText className="size-5" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-[#000B20] truncate">
                    {documentLabel}
                  </p>
                  <p className="text-xs text-[#A3AED0]">Document KYC</p>
                </div>
              </>
            ) : (
              <>
                <div
                  className={cn(
                    "size-11 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0",
                    avatarColor ?? "bg-orange-500",
                  )}>
                  {avatarInitials ?? clientName?.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-[#000B20] truncate">
                    {clientName}
                  </p>
                  {clientCode && (
                    <p className="text-xs text-[#A3AED0]">{clientCode}</p>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-[#000B20]">
              Motif du rejet <span className="text-vaRed">*</span>
            </label>
            <RadioGroup
              value={reasonCode}
              onValueChange={(value) =>
                setReasonCode(value as KycRejectionReason)
              }
              className="space-y-2">
              {Object.entries(KycRejectReasonMap).map(([value, label]) => (
                <label
                  key={value}
                  htmlFor={`reject-${variant}-${value}`}
                  className={cn(
                    "flex items-center gap-3 border rounded-xl px-4 py-3 cursor-pointer transition-colors",
                    reasonCode === value
                      ? "border-vaMainBlue bg-vaMainBlue/5"
                      : "border-[#E9EAEC] hover:border-[#A3AED0]",
                  )}>
                  <RadioGroupItem
                    value={value}
                    id={`reject-${variant}-${value}`}
                  />
                  <span className="text-sm text-[#506D82]">{label}</span>
                </label>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#000B20]">
              Commentaire
            </label>
            <Textarea
              placeholder="Précisez le motif communiqué au client..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px] rounded-xl border-[#E9EAEC] resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              variant="outline"
              className="rounded-xl"
              onClick={handleClose}
              disabled={loading}>
              Annuler
            </Button>
            <Button
              variant="outline"
              className="rounded-xl border-vaRed text-vaRed hover:bg-vaRed/5 gap-2"
              onClick={handleConfirm}
              loading={loading}
              disabled={!submissionId || (isDocumentVariant && !documentType)}>
              <Ban className="size-4" />
              Confirmer le rejet
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
