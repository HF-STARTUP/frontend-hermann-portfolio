"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { KycDocumentModel } from "@/model/ADMIN/KycSubmissionDetail";
import { Button } from "@/components/ui/button";
import { KycDocumentPreviewModal } from "./KycDocumentPreviewModal";
import { RejectKycDialog } from "./RejectKycDialog";
import { downloadFileFromUrl } from "@/utils/func/downloadFile";
import { useUpdateKycDocument } from "@/hooks/admin/useKycHook";
import { KycDocumentType } from "@/types/admin/kyc.type";
import {
  Check,
  Clock3,
  CreditCard,
  Download,
  Eye,
  FileText,
  Loader2,
  Upload,
  X,
} from "lucide-react";

const statusClasses = {
  green: "bg-lime-50 text-emerald-600",
  orange: "bg-orange-200 text-yellow-600",
  red: "bg-red-50 text-red-600",
};

const iconBoxClasses: Record<string, string> = {
  identity: "bg-sky-100 text-sky-600",
  default: "bg-zinc-100 text-gray-600",
};

export function KycDocumentCard({
  document,
  submissionId,
  canModerate = false,
  onDocumentUpdated,
}: {
  document: KycDocumentModel;
  submissionId: string;
  canModerate?: boolean;
  onDocumentUpdated?: () => void;
}) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const { loading: isUpdating, onUpdateDocument } = useUpdateKycDocument({
    onSuccess: onDocumentUpdated,
  });

  const handleValidate = () => {
    onUpdateDocument(submissionId, document.type as KycDocumentType, {
      status: "approved",
    });
  };

  const handleReject = () => {
    setIsRejectOpen(true);
  };

  const handleDownload = async () => {
    if (!document.fileUrl) return;
    setIsDownloading(true);
    try {
      await downloadFileFromUrl(document.fileUrl, document.downloadFileName);
    } finally {
      setIsDownloading(false);
    }
  };

  const iconBox = document.isIdentity
    ? iconBoxClasses.identity
    : iconBoxClasses.default;

  return (
    <div className="p-4 rounded-xl border border-gray-200 bg-white flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "size-12 rounded-xl flex items-center justify-center shrink-0",
            iconBox,
          )}>
          {document.isIdentity ? (
            <CreditCard className="size-6" />
          ) : (
            <FileText className="size-6" />
          )}
        </div>

        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-start gap-2 flex-wrap">
            <h4 className="text-sm font-semibold text-neutral-950 leading-4">
              {document.label}
            </h4>
            {document.isOptional && (
              <span className="px-1.5 py-0.5 bg-violet-50 rounded-full text-[10px] font-semibold text-gray-600">
                Optionnel
              </span>
            )}
          </div>
          <p className="text-xs text-gray-400">{document.fileMeta}</p>
        </div>

        <span
          className={cn(
            "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0",
            statusClasses[document.statusVariant],
          )}>
          {document.statusVariant === "green" ? (
            <Check className="size-3" />
          ) : (
            <Clock3 className="size-3" />
          )}
          {document.statusLabel}
        </span>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-gray-400">
        <Upload className="size-3.5" />
        Téléversé le {document.uploadedAt}
      </div>

      <div className="pt-3 border-t border-gray-100 flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="rounded-[10px] h-8 gap-1.5 text-xs border-gray-200 text-slate-500"
          onClick={() => setIsPreviewOpen(true)}
          disabled={!document.fileUrl}>
          <Eye className="size-3.5" />
          Aperçu
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="rounded-[10px] h-8 gap-1.5 text-xs border-gray-200 text-slate-500"
          onClick={handleDownload}
          disabled={!document.fileUrl || isDownloading}>
          <Download className="size-3.5" />
          Télécharger
        </Button>

        {document.isPending && (
          <div className="flex-1 flex justify-end items-center gap-1.5">
            <button
              type="button"
              onClick={handleValidate}
              disabled={isUpdating}
              className="size-8 rounded-[10px] border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-colors disabled:opacity-50"
              aria-label="Valider le document">
              {isUpdating ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Check className="size-4" />
              )}
            </button>
            <button
              type="button"
              onClick={handleReject}
              disabled={isUpdating}
              className="size-8 rounded-[10px] border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors disabled:opacity-50"
              aria-label="Rejeter le document">
              {isUpdating ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <X className="size-4" />
              )}
            </button>
          </div>
        )}
      </div>

      <KycDocumentPreviewModal
        document={document}
        submissionId={submissionId}
        open={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        canModerate={canModerate && document.isPending}
        onDocumentUpdated={onDocumentUpdated}
        onRequestReject={() => {
          setIsPreviewOpen(false);
          setIsRejectOpen(true);
        }}
      />

      <RejectKycDialog
        isOpen={isRejectOpen}
        onClose={() => setIsRejectOpen(false)}
        variant="document"
        submissionId={submissionId}
        documentType={document.type as KycDocumentType}
        documentLabel={document.label}
        onSuccess={onDocumentUpdated}
      />
    </div>
  );
}
