"use client";

import { ReactNode, useMemo, useState } from "react";
import { KycDocumentModel } from "@/model/ADMIN/KycSubmissionDetail";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useUpdateKycDocument } from "@/hooks/admin/useKycHook";
import { KycDocumentType } from "@/types/admin/kyc.type";
import {
  Ban,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Download,
  Image as ImageIcon,
  Minus,
  Plus,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { downloadFileFromUrl } from "@/utils/func/downloadFile";
import { KycSystemValidationBadge } from "./KycSystemValidationBadge";

interface KycDocumentPreviewModalProps {
  document: KycDocumentModel | null;
  submissionId: string;
  open: boolean;
  onClose: () => void;
  canModerate?: boolean;
  onDocumentUpdated?: () => void;
  onRequestReject?: () => void;
}

const statusSidebarClasses = {
  green: "bg-lime-50 text-emerald-600",
  orange: "bg-orange-200 text-yellow-600",
  red: "bg-red-50 text-red-600",
};

function ToolbarButton({
  children,
  onClick,
  disabled,
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "size-8 flex items-center justify-center bg-white rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-30",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function KycDocumentPreviewModal({
  document,
  submissionId,
  open,
  onClose,
  canModerate = false,
  onDocumentUpdated,
  onRequestReject,
}: KycDocumentPreviewModalProps) {
  const [zoom, setZoom] = useState(100);
  const [page, setPage] = useState(1);
  const [reviewNote, setReviewNote] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const { loading: isUpdating, onUpdateDocument } = useUpdateKycDocument({
    onSuccess: () => {
      onDocumentUpdated?.();
      setZoom(100);
      setPage(1);
      setReviewNote("");
      onClose();
    },
  });

  const previewUrl = useMemo(() => {
    if (!document?.fileUrl) return "";
    if (document.isPdf) {
      return `${document.fileUrl}#page=${page}`;
    }
    return document.fileUrl;
  }, [document, page]);

  const handleClose = () => {
    setZoom(100);
    setPage(1);
    setReviewNote("");
    onClose();
  };

  const handleDownload = async () => {
    if (!document?.fileUrl) return;
    setIsDownloading(true);
    try {
      await downloadFileFromUrl(document.fileUrl, document.downloadFileName);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleValidate = () => {
    if (!document) return;
    const note = reviewNote.trim();
    onUpdateDocument(submissionId, document.type as KycDocumentType, {
      status: "approved",
      ...(note ? { note } : {}),
    });
  };

  const handleReject = () => {
    onRequestReject?.();
  };

  if (!document) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="max-w-[1080px] w-[95vw] h-[min(838px,90vh)] p-0 gap-0 rounded-2xl overflow-hidden border-0 shadow-xl [&>button.absolute]:hidden">
        <div className="flex h-full w-full min-h-0">
          <div className="flex-1 flex flex-col bg-gray-200 min-w-0 min-h-0">
            <div className="px-4 py-3 bg-white border-b border-gray-200 flex items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-1">
                <ToolbarButton
                  onClick={() => setZoom((z) => Math.max(50, z - 25))}
                  disabled={zoom <= 50}
                >
                  <Minus className="size-4" />
                </ToolbarButton>
                <span className="min-w-9 text-center text-xs font-semibold text-gray-600">
                  {zoom}%
                </span>
                <ToolbarButton
                  onClick={() => setZoom((z) => Math.min(200, z + 25))}
                  disabled={zoom >= 200}
                >
                  <Plus className="size-4" />
                </ToolbarButton>
              </div>

              {document.isPdf ? (
                <div className="flex items-center gap-1">
                  <ToolbarButton
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                  >
                    <ChevronLeft className="size-4" />
                  </ToolbarButton>
                  <span className="min-w-20 text-center text-xs font-semibold text-gray-600">
                    Page {page}
                  </span>
                  <ToolbarButton onClick={() => setPage((p) => p + 1)}>
                    <ChevronRight className="size-4" />
                  </ToolbarButton>
                </div>
              ) : (
                <span className="text-xs font-semibold text-gray-600">
                  Page 1 / 1
                </span>
              )}

              <ToolbarButton onClick={handleDownload} disabled={isDownloading}>
                <Download className="size-4" />
              </ToolbarButton>
            </div>

            <div className="flex-1 p-7 flex items-start justify-center overflow-auto min-h-0">
              {!document.fileUrl ? (
                <p className="text-sm text-gray-500">Aucun fichier disponible</p>
              ) : document.isImage ? (
                <img
                  src={document.fileUrl}
                  alt={document.label}
                  className="max-w-full rounded-2xl shadow-[0px_10px_30px_0px_rgba(10,37,91,0.16)] border border-slate-300 object-contain transition-transform origin-top"
                  style={{ transform: `scale(${zoom / 100})` }}
                />
              ) : (
                <iframe
                  key={previewUrl}
                  src={previewUrl}
                  title={document.label}
                  className="w-full h-full min-h-[520px] bg-white rounded-lg border border-slate-300 shadow-[0px_10px_30px_0px_rgba(10,37,91,0.16)]"
                  style={{
                    transform: `scale(${zoom / 100})`,
                    transformOrigin: "top center",
                  }}
                />
              )}
            </div>
          </div>

          <div className="w-80 shrink-0 p-5 bg-white border-l border-gray-200 flex flex-col min-h-0 overflow-y-auto">
            <div className="flex items-start justify-between gap-2 pb-4">
              <h2 className="text-base font-bold text-neutral-950 leading-5 pr-2">
                {document.label}
              </h2>
              <button
                type="button"
                onClick={handleClose}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 shrink-0"
                aria-label="Fermer"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="pb-4 space-y-0">
              <MetaRow label="Type de fichier">
                <span className="inline-flex items-center gap-1.5 h-6 px-2 bg-sky-100 rounded-md text-xs font-semibold text-sky-600">
                  {document.isImage ? (
                    <ImageIcon className="size-3.5" />
                  ) : (
                    <Check className="size-3.5" />
                  )}
                  {document.fileTypeLabel}
                </span>
              </MetaRow>
              <MetaRow label="Taille" value={document.fileSizeLabel} />
              <MetaRow label="Pages" value={document.isPdf ? "—" : "1"} />
              <MetaRow label="Téléversé le" value={document.uploadedAt} />
              <MetaRow label="Obligatoire" value={document.requiredLabel} />
              <MetaRow label="Statut">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold",
                    statusSidebarClasses[document.statusVariant],
                  )}
                >
                  {document.statusVariant === "green" ? (
                    <Check className="size-3" />
                  ) : (
                    <Clock3 className="size-3" />
                  )}
                  {document.statusLabel}
                </span>
              </MetaRow>
              {document.showSystemValidation && (
                <>
                  <MetaRow label="Pré-validation IA">
                    <KycSystemValidationBadge
                      validation={document.systemValidation}
                    />
                  </MetaRow>
                  {document.systemMessage && (
                    <MetaRow label="Analyse IA" value={document.systemMessage} />
                  )}
                  {document.systemConfidencePercent != null && (
                    <MetaRow
                      label="Confiance IA"
                      value={`${document.systemConfidencePercent} %`}
                    />
                  )}
                  {document.systemValidatedAt && (
                    <MetaRow
                      label="Analysé le"
                      value={document.systemValidatedAt}
                    />
                  )}
                </>
              )}
            </div>

            <div className="pb-4">
              <p className="text-xs text-gray-400 mb-1.5">Note de revue</p>
              <textarea
                value={reviewNote}
                onChange={(e) => setReviewNote(e.target.value)}
                placeholder="Ajouter une remarque sur ce document…"
                className="w-full min-h-16 px-3 pt-2.5 pb-10 text-sm text-neutral-500 bg-white rounded-[10px] border border-gray-200 outline-none resize-none focus:border-gray-300"
              />
            </div>

            {canModerate && (
              <div className="mt-auto pt-4 flex flex-col gap-2">
                {!document.isRejected && (
                  <Button
                    variant="outline"
                    className="w-full rounded-[10px] border-red-600 text-red-600 hover:bg-red-50 gap-2 h-11"
                    onClick={handleReject}
                  >
                    <Ban className="size-4" />
                    Rejeter le document
                  </Button>
                )}
                {!document.isValidated && (
                  <Button
                    className="w-full rounded-[10px] bg-emerald-600 hover:bg-emerald-700 text-white gap-2 h-11"
                    onClick={handleValidate}
                    loading={isUpdating}
                  >
                    <CheckCircle2 className="size-4" />
                    Valider le document
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function MetaRow({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: ReactNode;
}) {
  return (
    <div className="py-2.5 border-b border-gray-100 flex items-center justify-between gap-3">
      <span className="text-sm text-gray-600">{label}</span>
      {children ?? (
        <span className="text-sm font-semibold text-neutral-950 text-right">
          {value}
        </span>
      )}
    </div>
  );
}
