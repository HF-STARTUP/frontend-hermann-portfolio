export type KycOwnerType = "particulier" | "professionnel";

export type KycStatus = "approved" | "rejected" | "pending" | "incomplete";

export type KycSubmissionResponseType = {
  account_id: string;
  kyc_id: string;
  client_name: string;
  email: string;
  phone: string;
  owner_type: KycOwnerType;
  photo: string | null;
  submitted_at: string;
  updated_at: string;
  completion_percent: number;
  status: KycStatus;
  documents_count: number;
};

export type KycKpiData = {
  total_clients: number;
  approved: number;
  pending: number;
  rejected: number;
  incomplete: number;
};

export type GetKycSubmissionsParams = {
  page?: number;
  itemPerPage?: number;
  owner_type?: KycOwnerType | "all";
  status?: KycStatus | "all";
  search?: string;
};

export type KycRejectionReason =
  | "document_illisible"
  | "document_expire"
  | "informations_incoherentes"
  | "document_invalide"
  | "autre";

export type RejectKycPayload = {
  reason_code: KycRejectionReason;
  comment?: string;
};

export type KycDocumentType =
  | "rccm"
  | "fiscal_declaration"
  | "bank_statement"
  | "identity";

export type KycDocumentStatus = "approved" | "rejected" | "pending" | "validated";

export type KycSystemValidation = "pending" | "valid" | "invalid" | "error";

export type UpdateKycDocumentPayload = {
  status?: Extract<KycDocumentStatus, "approved" | "rejected" | "pending">;
  note?: string;
};

export type KycDocumentResponseType = {
  type: KycDocumentType | string;
  required?: boolean;
  provided?: boolean;
  status?: KycDocumentStatus | string;
  file_url?: string | null;
  mime_type?: string | null;
  size?: number | null;
  original_name?: string | null;
  note?: string | null;
  uploaded_at?: string | null;
  updated_at?: string | null;
  system_validation?: KycSystemValidation;
  system_message?: string | null;
  system_confidence?: number | null;
  system_validated_at?: string | null;
};

export type KycAuditActorKind = "admin" | "client" | "system";

export type KycAuditActorResponseType = {
  kind: KycAuditActorKind;
  id?: string | null;
  name?: string | null;
};

export type KycAuditEventType =
  | "document_reviewed"
  | "document_uploaded"
  | "kyc_initiated"
  | string;

export type KycAuditEventResponseType = {
  type: KycAuditEventType;
  label: string;
  at: string;
  actor: KycAuditActorResponseType;
  document_type?: string | null;
  comment?: string | null;
};

export type KycSubmissionHistoryResponse = KycAuditEventResponseType[];

export type KycSubmissionDetailResponseType = {
  account_id: string;
  kyc_id: string;
  client_name: string;
  client_code?: string | null;
  email: string;
  phone: string;
  owner_type: KycOwnerType;
  photo: string | null;
  country?: string | null;
  rccm_number?: string | null;
  ncc?: string | null;
  status: KycStatus;
  completion_percent: number;
  is_complete?: boolean;
  submitted_at?: string | null;
  updated_at?: string | null;
  reviewed_at?: string | null;
  reviewed_by?: string | null;
  rejection_reason?: string | null;
  rejection_reason_code?: string | null;
  documents?: KycDocumentResponseType[];
  audit_history?: KycAuditEventResponseType[];
};

export type KycSubmissionsListResponse = {
  data: KycSubmissionResponseType[];
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  itemPerPage: number;
};
