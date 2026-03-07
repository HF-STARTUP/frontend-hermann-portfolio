import Service from "@/services/Service";
import {
  PromoCode,
  PromoCodeListResponse,
  MarketingKpi,
  CodeUsageData,
  CreatePromoCodePayload,
  MarketingFilters,
  Commercial,
  CommercialFilters,
  CreateCommercialPayload,
  CreateSalesAgentPayload,
  PromoCodeMetricsFilterParams,
  PromoCodeMetricsResponse,
  SalesAgentFilters,
  SalesAgentListResponse,
  SalesAgent,
  PromoCodeMetricsData,
  PromoCodeEventsResponse,
  PromoCodeProspectsResponse,
  PromoCodeMetricsByIdResponse,
} from "@/types/marketing.types";

class MarketingService extends Service {
  constructor() {
    super("marketing");
  }

  async getKpis(): Promise<MarketingKpi> {
    return this.execHttpRequest<MarketingKpi>({
      url: "kpis",
      method: this.httpMethods.get,
    });
  }

  async getPromoCodes(
    filters?: MarketingFilters,
  ): Promise<PromoCodeListResponse> {
    const queryParams = filters ? this.toQueryString(filters) : "";
    return this.execHttpRequest<PromoCodeListResponse>({
      url: `promo-code${queryParams ? `?${queryParams}` : ""}`,
      method: this.httpMethods.get,
    });
  }

  async getPromoCodeById(id: string): Promise<PromoCode> {
    return this.execHttpRequest<PromoCode>({
      url: `promo-code/${id}`,
      method: this.httpMethods.get,
    });
  }

  async getPromoCodeEvents(
    id: string,
    params?: { itemPerPage?: number; page?: number },
  ): Promise<PromoCodeEventsResponse> {
    const queryParams = params ? this.toQueryString(params) : "";
    return this.execHttpRequest<PromoCodeEventsResponse>({
      url: `promo-code/${id}/events${queryParams ? `?${queryParams}` : ""}`,
      method: this.httpMethods.get,
    });
  }

  async getPromoCodeProspects(
    id: string,
    params?: { itemPerPage?: number; page?: number },
  ): Promise<PromoCodeProspectsResponse> {
    const queryParams = params ? this.toQueryString(params) : "";
    return this.execHttpRequest<PromoCodeProspectsResponse>({
      url: `promo-code/${id}/prospects${queryParams ? `?${queryParams}` : ""}`,
      method: this.httpMethods.get,
    });
  }

  async getPromoCodeMetricsById(
    id: string,
  ): Promise<PromoCodeMetricsByIdResponse> {
    return this.execHttpRequest<PromoCodeMetricsByIdResponse>({
      url: `promo-code/${id}/metrics`,
      method: this.httpMethods.get,
    });
  }

  async getCodeUsageMetrics(filters?: PromoCodeMetricsFilterParams) {
    const queryParams = filters ? this.toQueryString(filters) : "";
    return this.execHttpRequest<PromoCodeMetricsData>({
      url: `promo-code/metrics${queryParams ? `?${queryParams}` : ""}`,
      method: this.httpMethods.get,
    });
  }

  async getUsageByType(
    filters?: PromoCodeMetricsFilterParams,
  ): Promise<CodeUsageData[]> {
    const queryParams = filters ? this.toQueryString(filters) : "";
    return this.execHttpRequest<CodeUsageData[]>({
      url: `promo-code/usage-by-type${queryParams ? `?${queryParams}` : ""}`,
      method: this.httpMethods.get,
    });
  }

  async getCodeUsageStats(): Promise<CodeUsageData[]> {
    return this.execHttpRequest<CodeUsageData[]>({
      url: "codes/usage-stats",
      method: this.httpMethods.get,
    });
  }

  async createPromoCode(payload: CreatePromoCodePayload): Promise<PromoCode> {
    return this.execHttpRequest<PromoCode>({
      url: "promo-code",
      method: this.httpMethods.post,
      body: payload,
    });
  }

  async updatePromoCode(
    id: string,
    payload: CreatePromoCodePayload,
  ): Promise<PromoCode> {
    return this.execHttpRequest<PromoCode>({
      url: `promo-code/${id}`,
      method: this.httpMethods.update,
      body: payload,
    });
  }

  async updatePromoCodeStatus(
    codeId: string,
    status: "actif" | "suspendu",
  ): Promise<PromoCode> {
    const path =
      status === "suspendu"
        ? `promo-code/${codeId}/suspend`
        : `promo-code/${codeId}/activate`;
    return this.execHttpRequest<PromoCode>({
      url: path,
      method: this.httpMethods.update,
    });
  }

  async assignPromoCodeToSalesAgent(
    promoCodeId: string,
    salesAgentId: string,
  ): Promise<PromoCode> {
    return this.execHttpRequest<PromoCode>({
      url: `promo-code/${promoCodeId}/assign-sales-agent`,
      method: this.httpMethods.post,
      body: { sales_agent_id: salesAgentId },
    });
  }

  async deletePromoCode(codeId: string): Promise<void> {
    return this.execHttpRequest<void>({
      url: `codes/${codeId}`,
      method: this.httpMethods.post,
      body: { _method: "DELETE" },
    });
  }

  // Méthodes pour les Commerciaux
  async getCommercials(filters?: CommercialFilters): Promise<Commercial[]> {
    const queryParams = filters ? this.toQueryString(filters) : "";
    return this.execHttpRequest<Commercial[]>({
      url: `commercials${queryParams ? `?${queryParams}` : ""}`,
      method: this.httpMethods.get,
    });
  }

  async createCommercial(
    payload: CreateCommercialPayload,
  ): Promise<Commercial> {
    return this.execHttpRequest<Commercial>({
      url: "commercials",
      method: this.httpMethods.post,
      body: payload,
    });
  }

  async getSalesAgents(
    filters?: SalesAgentFilters,
  ): Promise<SalesAgentListResponse> {
    const queryParams = filters ? this.toQueryString(filters) : "";
    return this.execHttpRequest<SalesAgentListResponse>({
      url: `sales-agent${queryParams ? `?${queryParams}` : ""}`,
      method: this.httpMethods.get,
    });
  }

  async getSalesAgentById(
    id: string,
    params?: { start_date?: string; end_date?: string },
  ): Promise<SalesAgent> {
    const queryParams = params ? this.toQueryString(params) : "";
    return this.execHttpRequest<SalesAgent>({
      url: `sales-agent/${id}${queryParams ? `?${queryParams}` : ""}`,
      method: this.httpMethods.get,
    });
  }

  async createSalesAgent(
    payload: CreateSalesAgentPayload,
  ): Promise<Commercial> {
    return this.execHttpRequest<Commercial>({
      url: "sales-agent",
      method: this.httpMethods.post,
      body: { ...payload, commission: 1, salary: 1, channel: "VISION" },
    });
  }

  async updateSalesAgent(
    id: string,
    payload: CreateSalesAgentPayload,
  ): Promise<SalesAgent> {
    return this.execHttpRequest<SalesAgent>({
      url: `sales-agent/${id}`,
      method: this.httpMethods.update,
      body: payload,
    });
  }

  async updateCommercialStatus(
    commercialId: string,
    status: "actif" | "inactif",
  ): Promise<Commercial> {
    return this.execHttpRequest<Commercial>({
      url: `commercials/${commercialId}/status`,
      method: this.httpMethods.update,
      body: { status },
    });
  }

  async deleteCommercial(commercialId: string): Promise<void> {
    return this.execHttpRequest<void>({
      url: `commercials/${commercialId}`,
      method: this.httpMethods.post,
      body: { _method: "DELETE" },
    });
  }
}

const marketingService = new MarketingService();
export default marketingService;
