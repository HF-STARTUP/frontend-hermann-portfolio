import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { KycStatus } from "@/types/admin/kyc.type";
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";
import { KycStatusMap, getKycStatusVariant } from "../utils";

const statusIcons: Partial<Record<KycStatus, ReactNode>> = {
  approved: <CheckCircle2 className="size-3" />,
  pending: <Clock3 className="size-3" />,
  rejected: <XCircle className="size-3" />,
  incomplete: <AlertCircle className="size-3" />,
};

const variantClasses = {
  green: "bg-lime-50 text-emerald-600",
  blue: "bg-blue-100 text-blue-800",
  red: "bg-rose-100 text-red-600",
  orange: "bg-gray-100 text-gray-600",
  default: "bg-gray-100 text-gray-600",
};

export function KycStatusBadge({ status }: { status?: KycStatus }) {
  if (!status) return <span>-</span>;

  const variant = getKycStatusVariant(status);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap",
        variantClasses[variant],
      )}
    >
      {statusIcons[status]}
      {KycStatusMap[status]}
    </span>
  );
}
