import Model from "@/model/Model";
import {
  KycOwnerType,
  KycStatus,
  KycSubmissionResponseType,
} from "@/types/admin/kyc.type";
import { getAvatarColor, getAvatarInitials } from "@/lib/initials.avatar.util";

export class KycSubmissionModel extends Model {
  private _instance: KycSubmissionResponseType;

  constructor(data: KycSubmissionResponseType) {
    super();
    this._instance = data;
  }

  static fromArray(data: KycSubmissionResponseType[]): KycSubmissionModel[] {
    return data.map((item) => new KycSubmissionModel(item));
  }

  get id() {
    return this._instance.kyc_id;
  }

  get accountId() {
    return this._instance.account_id;
  }

  get kycId() {
    return this._instance.kyc_id;
  }

  get clientName() {
    return this._instance.client_name || "-";
  }

  get email() {
    return this._instance.email || "-";
  }

  get phone() {
    return this._instance.phone || "-";
  }

  get avatarUrl() {
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

  get ownerType(): KycOwnerType {
    return this._instance.owner_type;
  }

  get ownerTypeLabel() {
    switch (this._instance.owner_type) {
      case "particulier":
        return "Entrepreneur";
      case "professionnel":
        return "Professionnel";
      default:
        return "-";
    }
  }

  get completeness() {
    return this._instance.completion_percent ?? 0;
  }

  get status(): KycStatus {
    return this._instance.status;
  }

  get documentsCount() {
    return this._instance.documents_count ?? 0;
  }

  get submittedAt() {
    return this._instance.submitted_at
      ? this.formatDateTime(this._instance.submitted_at)
      : "-";
  }

  get updatedAt() {
    return this._instance.updated_at
      ? this.formatDateTime(this._instance.updated_at)
      : "-";
  }
}

export default KycSubmissionModel;
