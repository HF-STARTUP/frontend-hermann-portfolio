import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { KycStatus } from "@/types/admin/kyc.type";
import {
  AlertCircle,
  CheckCircle2,
  Upload,
  XCircle,
} from "lucide-react";
import { KycStatusMap } from "../utils";

const detailStatusStyles: Record<
  KycStatus,
  { className: string; icon: ReactNode }
> = {
  approved: {
    className: "bg-emerald-50 text-emerald-600",
    icon: <CheckCircle2 className="size-3" />,
  },
  pending: {
    className: "bg-sky-100 text-sky-600",
    icon: <Upload className="size-3" />,
  },
  rejected: {
    className: "bg-red-50 text-red-600",
    icon: <XCircle className="size-3" />,
  },
  incomplete: {
    className: "bg-orange-100 text-orange-600",
    icon: <AlertCircle className="size-3" />,
  },
};

const detailStatusLabels: Record<KycStatus, string> = {
  approved: "Approuvé",
  pending: "Soumis",
  rejected: "Rejeté",
  incomplete: "Incomplet",
};

export function KycDetailStatusBadge({ status }: { status: KycStatus }) {
  const config = detailStatusStyles[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap",
        config.className,
      )}
    >
      {config.icon}
      {detailStatusLabels[status] ?? KycStatusMap[status]}
    </span>
  );
}
