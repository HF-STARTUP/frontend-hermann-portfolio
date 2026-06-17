import {
  KycOwnerType,
  KycRejectionReason,
  KycStatus,
  KycSystemValidation,
} from "@/types/admin/kyc.type";

export const KycOwnerTypeMap: Record<KycOwnerType, string> = {
  particulier: "Entrepreneur",
  professionnel: "Professionnel",
};

export const KycStatusMap: Record<KycStatus, string> = {
  approved: "Approuvé",
  rejected: "Rejeté",
  pending: "En revue",
  incomplete: "Incomplet",
};

export const KycRejectReasonMap: Record<KycRejectionReason, string> = {
  document_illisible: "Document illisible",
  document_expire: "Document expiré",
  informations_incoherentes: "Informations incohérentes",
  document_invalide: "Document invalide",
  autre: "Autre",
};

export function buildKycRejectionNote(
  reasonCode: KycRejectionReason,
  comment?: string,
): string {
  const reasonLabel = KycRejectReasonMap[reasonCode];
  const trimmedComment = comment?.trim();
  return trimmedComment ? `${reasonLabel} — ${trimmedComment}` : reasonLabel;
}

export const getKycStatusVariant = (
  status?: KycStatus,
): "green" | "blue" | "red" | "default" | "orange" => {
  switch (status) {
    case "approved":
      return "green";
    case "pending":
      return "blue";
    case "rejected":
      return "red";
    case "incomplete":
      return "orange";
    default:
      return "default";
  }
};

export const getCompletenessColor = (value: number) => {
  if (value >= 100) return "bg-vaGreen";
  if (value >= 70) return "bg-vaMainBlue";
  return "bg-vaOrange";
};

export const KycDocumentTypeMap: Record<string, string> = {
  rccm: "Registre du Commerce (RCCM)",
  fiscal_declaration: "Déclaration fiscale d'Existence",
  identity: "Carte Nationale d'Identité (CNI)",
  bank_statement: "Relevé d'Identité bancaire (RIB)",
};

export const getKycDocumentLabel = (
  type: string,
  ownerType?: KycOwnerType,
) => {
  if (type === "identity" && ownerType === "professionnel") {
    return "CNI du représentant légal";
  }
  return KycDocumentTypeMap[type] ?? type;
};

export const getKycDocumentStatusLabel = (status?: string) => {
  switch (status) {
    case "approved":
    case "validated":
      return "Validé";
    case "rejected":
      return "Rejeté";
    case "pending":
      return "En attente";
    default:
      return "En attente";
  }
};

export const getKycDocumentStatusVariant = (
  status?: string,
): "green" | "orange" | "red" => {
  switch (status) {
    case "approved":
    case "validated":
      return "green";
    case "rejected":
      return "red";
    default:
      return "orange";
  }
};

export const KycSystemValidationMap: Record<KycSystemValidation, string> = {
  pending: "Analyse en cours…",
  valid: "Conforme (IA)",
  invalid: "Non conforme (IA)",
  error: "Analyse indisponible",
};

export const getKycSystemValidationVariant = (
  validation: KycSystemValidation,
): "gray" | "green" | "red" | "neutral" => {
  switch (validation) {
    case "valid":
      return "green";
    case "invalid":
      return "red";
    case "error":
      return "neutral";
    default:
      return "gray";
  }
};
