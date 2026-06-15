import Service from "@/services/Service";
import { toQueriesString } from "@/lib/utils";
import KycKpiModel from "@/model/ADMIN/KycKpi";
import KycSubmissionModel from "@/model/ADMIN/KycSubmission";
import KycSubmissionDetailModel, {
  KycAuditEventModel,
} from "@/model/ADMIN/KycSubmissionDetail";
import {
  GetKycSubmissionsParams,
  KycDocumentType,
  KycKpiData,
  KycSubmissionDetailResponseType,
  KycSubmissionHistoryResponse,
  KycSubmissionsListResponse,
  RejectKycPayload,
  UpdateKycDocumentPayload,
} from "@/types/admin/kyc.type";

export enum KycApiPath {
  GetKpis = "/admin-kyc/kpis",
  GetSubmissions = "/admin-kyc/submissions",
  GetSubmissionDetail = "/admin-kyc/submissions/{id}",
  ApproveSubmission = "/admin-kyc/submissions/{id}/approve",
  RejectSubmission = "/admin-kyc/submissions/{id}/reject",
  UpdateDocument = "/admin-kyc/submissions/{id}/documents/{type}",
  RelaunchDocumentSystemValidation = "/admin-kyc/submissions/{id}/documents/{type}/system-validation",
  GetSubmissionHistory = "/admin-kyc/submissions/{id}/history",
}

class KycService extends Service {
  private static instance: KycService = new KycService();

  private constructor() {
    super();
  }

  public static getInstance(): KycService {
    return KycService.instance;
  }

  public static async getKpis() {
    const response = await KycService.makeRequest<KycKpiData>(
      KycApiPath.GetKpis,
      "GET",
    );
    return new KycKpiModel(response);
  }

  public static async getSubmissions(params?: GetKycSubmissionsParams) {
    const url = toQueriesString(KycApiPath.GetSubmissions, params);
    const response = await KycService.makeRequest<KycSubmissionsListResponse>(
      url,
      "GET",
    );

    return {
      submissions: KycSubmissionModel.fromArray(response.data ?? []),
      totalPages: response.totalPages ?? 1,
      totalRecords: response.totalRecords ?? 0,
      currentPage: response.currentPage ?? 1,
      itemPerPage: response.itemPerPage ?? 20,
    };
  }

  public static async getSubmissionById(id: string) {
    const url = KycApiPath.GetSubmissionDetail.replace("{id}", id);
    const response = await KycService.makeRequest<KycSubmissionDetailResponseType>(
      url,
      "GET",
    );
    return new KycSubmissionDetailModel(response);
  }

  public static async approveSubmission(id: string) {
    const url = KycApiPath.ApproveSubmission.replace("{id}", id);
    return KycService.makeRequest(url, "POST");
  }

  public static async rejectSubmission(id: string, payload: RejectKycPayload) {
    const url = KycApiPath.RejectSubmission.replace("{id}", id);
    return KycService.makeRequest(url, "POST", payload);
  }

  public static async updateDocument(
    submissionId: string,
    documentType: KycDocumentType,
    payload: UpdateKycDocumentPayload,
  ) {
    const url = KycApiPath.UpdateDocument.replace("{id}", submissionId).replace(
      "{type}",
      documentType,
    );
    return KycService.makeRequest(url, "PATCH", payload);
  }

  public static async relaunchDocumentSystemValidation(
    submissionId: string,
    documentType: KycDocumentType,
  ) {
    const url = KycApiPath.RelaunchDocumentSystemValidation.replace(
      "{id}",
      submissionId,
    ).replace("{type}", documentType);
    return KycService.makeRequest(url, "POST", {});
  }

  public static async getSubmissionHistory(id: string) {
    const url = KycApiPath.GetSubmissionHistory.replace("{id}", id);
    const response = await KycService.makeRequest<KycSubmissionHistoryResponse>(
      url,
      "GET",
    );
    return KycAuditEventModel.fromArray(response ?? []);
  }

  static invalidateKycData() {
    return Promise.all([
      KycService.getInstance().queryClient.invalidateQueries({
        queryKey: [KycApiPath.GetKpis],
      }),
      KycService.getInstance().queryClient.invalidateQueries({
        queryKey: [KycApiPath.GetSubmissions],
      }),
      KycService.getInstance().queryClient.invalidateQueries({
        queryKey: [KycApiPath.GetSubmissionDetail],
      }),
      KycService.getInstance().queryClient.invalidateQueries({
        queryKey: [KycApiPath.GetSubmissionHistory],
      }),
    ]);
  }

  protected static async makeRequest<T>(
    url: string,
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    body?: unknown,
    secure = true,
  ): Promise<T> {
    return KycService.getInstance().execHttpRequest<T>({
      url,
      method,
      body,
      secure,
    });
  }
}

export default KycService;
