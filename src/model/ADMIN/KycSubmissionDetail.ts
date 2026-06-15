import Model from "@/model/Model";
import {
  KycAuditEventResponseType,
  KycDocumentResponseType,
  KycOwnerType,
  KycStatus,
  KycSubmissionDetailResponseType,
} from "@/types/admin/kyc.type";
import { getAvatarColor, getAvatarInitials } from "@/lib/initials.avatar.util";

const documentLabels: Record<string, string> = {
  rccm: "Registre du Commerce (RCCM)",
  fiscal_declaration: "Déclaration fiscale d'Existence",
  identity: "Carte Nationale d'Identité (CNI)",
  bank_statement: "Relevé d'Identité bancaire (RIB)",
};

function getDocumentLabel(type: string, ownerType?: KycOwnerType) {
  if (type === "identity" && ownerType === "professionnel") {
    return "CNI du représentant légal";
  }
  return documentLabels[type] ?? type;
}

function getDocumentStatusLabel(status?: string) {
  switch (status) {
    case "approved":
    case "validated":
      return "Validé";
    case "rejected":
      return "Rejeté";
    default:
      return "En attente";
  }
}

function getDocumentStatusVariant(status?: string): "green" | "orange" | "red" {
  switch (status) {
    case "approved":
    case "validated":
      return "green";
    case "rejected":
      return "red";
    default:
      return "orange";
  }
}

function formatMimeLabel(mimeType?: string | null) {
  if (!mimeType) return "Fichier";
  if (mimeType.includes("pdf")) return "PDF";
  if (mimeType.includes("image")) return "Image";
  return mimeType.split("/")[1]?.toUpperCase() ?? "Fichier";
}

export class KycDocumentModel extends Model {
  private _instance: KycDocumentResponseType;
  private _ownerType?: KycOwnerType;

  constructor(data: KycDocumentResponseType, ownerType?: KycOwnerType) {
    super();
    this._instance = data;
    this._ownerType = ownerType;
  }

  get id() {
    return this._instance.type;
  }

  get type() {
    return this._instance.type;
  }

  get label() {
    return getDocumentLabel(this._instance.type, this._ownerType);
  }

  get status() {
    return this._instance.status;
  }

  get statusLabel() {
    return getDocumentStatusLabel(this._instance.status);
  }

  get statusVariant() {
    return getDocumentStatusVariant(this._instance.status);
  }

  get fileMeta() {
    const parts = [
      formatMimeLabel(this._instance.mime_type),
      this._instance.size
        ? `${(this._instance.size / (1024 * 1024)).toFixed(1)} Mo`
        : undefined,
    ].filter(Boolean);
    return parts.join(" · ") || "-";
  }

  get uploadedAt() {
    return this._instance.uploaded_at
      ? this.formatDateTime(this._instance.uploaded_at)
      : "-";
  }

  get fileUrl() {
    return this._instance.file_url ?? undefined;
  }

  get mimeType() {
    return this._instance.mime_type ?? undefined;
  }

  get fileTypeLabel() {
    const mime = this._instance.mime_type ?? "";
    if (mime.includes("pdf")) return "PDF";
    if (mime.includes("jpeg") || mime.includes("jpg")) return "JPG";
    if (mime.includes("png")) return "PNG";
    if (mime.includes("image")) return "IMG";
    return formatMimeLabel(mime);
  }

  get fileSizeLabel() {
    if (!this._instance.size) return "-";
    return `${(this._instance.size / (1024 * 1024)).toFixed(1)} Mo`;
  }

  get isPdf() {
    const mime = this._instance.mime_type ?? "";
    const url = this._instance.file_url ?? "";
    return mime.includes("pdf") || url.toLowerCase().includes(".pdf");
  }

  get isImage() {
    const mime = this._instance.mime_type ?? "";
    return mime.includes("image");
  }

  get requiredLabel() {
    return this._instance.required === false ? "Non" : "Oui";
  }

  get isRequired() {
    return this._instance.required !== false;
  }

  get originalName() {
    return this._instance.original_name ?? undefined;
  }

  get downloadFileName() {
    if (this._instance.original_name) {
      return this._instance.original_name;
    }

    const safeLabel = this.label.replace(/[^\w\s-]/g, "").trim() || "document";
    const ext = this.isPdf ? "pdf" : this.isImage ? "jpg" : "file";
    return `${safeLabel}.${ext}`;
  }

  get isOptional() {
    return this._instance.required === false;
  }

  get isIdentity() {
    return this._instance.type === "identity";
  }

  get isValidated() {
    return (
      this._instance.status === "approved" ||
      this._instance.status === "validated"
    );
  }

  get isRejected() {
    return this._instance.status === "rejected";
  }

  get isPending() {
    return !this.isValidated && !this.isRejected;
  }
}

export class KycAuditEventModel extends Model {
  private _instance: KycAuditEventResponseType;

  constructor(data: KycAuditEventResponseType) {
    super();
    this._instance = data;
  }

  get type() {
    return this._instance.type;
  }

  get action() {
    return this._instance.label;
  }

  get actorKind() {
    return this._instance.actor.kind;
  }

  get actorLabel() {
    const name = this._instance.actor.name?.trim();
    if (name) return name;

    switch (this._instance.actor.kind) {
      case "admin":
        return "Administrateur";
      case "client":
        return "Client";
      case "system":
        return "Système";
      default:
        return undefined;
    }
  }

  get comment() {
    return this._instance.comment?.trim() || undefined;
  }

  get documentType() {
    return this._instance.document_type ?? undefined;
  }

  get documentLabel() {
    if (!this._instance.document_type) return undefined;
    return getDocumentLabel(this._instance.document_type);
  }

  get createdAt() {
    return this._instance.at
      ? this.formatDateTime(this._instance.at)
      : undefined;
  }

  get createdAtTimeline() {
    if (!this._instance.at) return undefined;

    const dateObj = new Date(this._instance.at);
    if (isNaN(dateObj.getTime())) return undefined;

    const datePart = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(dateObj);

    const timePart = new Intl.DateTimeFormat("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(dateObj);

    return `${datePart} · ${timePart}`;
  }

  get timelineVariant(): "success" | "rejected" | "review" | "upload" | "init" {
    const label = this._instance.label.toLowerCase();

    if (label.includes("rejet")) return "rejected";
    if (label.includes("approuv") || label.includes("valid")) return "success";
    if (this._instance.type === "kyc_initiated") return "init";
    if (this._instance.type === "document_uploaded") return "upload";

    return "review";
  }

  static fromArray(data: KycAuditEventResponseType[]): KycAuditEventModel[] {
    return data.map((item) => new KycAuditEventModel(item));
  }
}

export class KycSubmissionDetailModel extends Model {
  private _instance: KycSubmissionDetailResponseType;

  constructor(data: KycSubmissionDetailResponseType) {
    super();
    this._instance = data;
  }

  get kycId() {
    return this._instance.kyc_id;
  }

  get accountId() {
    return this._instance.account_id;
  }

  get clientName() {
    return this._instance.client_name || "-";
  }

  get clientCode() {
    return this._instance.client_code ?? undefined;
  }

  get email() {
    return this._instance.email || "-";
  }

  get phone() {
    return this._instance.phone || "-";
  }

  get country() {
    return this._instance.country || "Non renseigné";
  }

  get ownerType() {
    return this._instance.owner_type;
  }

  get status(): KycStatus {
    return this._instance.status;
  }

  get completionPercent() {
    return this._instance.completion_percent ?? 0;
  }

  get rccmNumber() {
    return this._instance.rccm_number || "Non renseigné";
  }

  get ncc() {
    return this._instance.ncc || "Non renseigné";
  }

  get registeredAt() {
    const date = this._instance.submitted_at;
    return date ? this.formatDateTime(date) : "-";
  }

  get photoUrl() {
    return this._instance.photo
      ? this.resolveImage(this._instance.photo)
      : undefined;
  }

  get initials() {
    return getAvatarInitials(this.clientName);
  }

  get avatarColor() {
    return getAvatarColor(this.clientName);
  }

  get isProfessional() {
    return this._instance.owner_type === "professionnel";
  }

  get canModerate() {
    return this._instance.status === "pending";
  }

  get documents(): KycDocumentModel[] {
    return (this._instance.documents ?? []).map(
      (doc) => new KycDocumentModel(doc, this._instance.owner_type),
    );
  }

  get auditHistory(): KycAuditEventResponseType[] {
    return this._instance.audit_history ?? [];
  }
}

export default KycSubmissionDetailModel;
