import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { KycSystemValidation } from "@/types/admin/kyc.type";
import {
  getKycSystemValidationVariant,
  KycSystemValidationMap,
} from "../utils";
import { AlertCircle, AlertTriangle, Check, Loader2 } from "lucide-react";

const variantClasses = {
  gray: "bg-gray-100 text-gray-600",
  green: "bg-lime-50 text-emerald-600",
  red: "bg-orange-100 text-orange-700",
  neutral: "bg-gray-100 text-gray-500",
};

const statusIcons: Record<KycSystemValidation, ReactNode> = {
  pending: <Loader2 className="size-3 animate-spin" />,
  valid: <Check className="size-3" />,
  invalid: <AlertTriangle className="size-3" />,
  error: <AlertCircle className="size-3" />,
};

export function KycSystemValidationBadge({
  validation,
}: {
  validation: KycSystemValidation;
}) {
  const variant = getKycSystemValidationVariant(validation);

  return (
    <span
      className={cn(
        "inline-flex items-center w-max gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap",
        variantClasses[variant],
      )}>
      {statusIcons[validation]}
      {KycSystemValidationMap[validation]}
    </span>
  );
}
