"use client";

import { cn } from "@/lib/utils";
import { KycDocumentModel } from "@/model/ADMIN/KycSubmissionDetail";
import { Button } from "@/components/ui/button";
import {
  Check,
  Clock3,
  CreditCard,
  Download,
  Eye,
  FileText,
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

export function KycDocumentCard({ document }: { document: KycDocumentModel }) {
  const handleOpen = () => {
    if (document.fileUrl) {
      window.open(document.fileUrl, "_blank");
    }
  };

  const iconBox =
    document.isIdentity
      ? iconBoxClasses.identity
      : iconBoxClasses.default;

  return (
    <div className="p-4 rounded-xl border border-gray-200 bg-white flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "size-12 rounded-xl flex items-center justify-center shrink-0",
            iconBox,
          )}
        >
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
          )}
        >
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
          onClick={handleOpen}
          disabled={!document.fileUrl}
        >
          <Eye className="size-3.5" />
          Aperçu
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="rounded-[10px] h-8 gap-1.5 text-xs border-gray-200 text-slate-500"
          onClick={handleOpen}
          disabled={!document.fileUrl}
        >
          <Download className="size-3.5" />
          Télécharger
        </Button>

        <div className="flex-1 flex justify-end items-center gap-1.5">
          <button
            type="button"
            className={cn(
              "size-8 rounded-[10px] border flex items-center justify-center transition-colors",
              document.isValidated
                ? "bg-emerald-600 border-emerald-600 text-white"
                : "border-gray-200 text-gray-400 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200",
            )}
          >
            <Check className="size-4" />
          </button>
          <button
            type="button"
            className="size-8 rounded-[10px] border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
