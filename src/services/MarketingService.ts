import Service from "@/services/Service"
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
} from "@/types/marketing.types"

class MarketingService extends Service {
  
  constructor() {
    super("marketing")
  }

  async getKpis(): Promise<MarketingKpi> {
    return this.execHttpRequest<MarketingKpi>({
      url: "kpis",
      method: this.httpMethods.get,
    })
  }

  async getPromoCodes(filters?: MarketingFilters): Promise<PromoCodeListResponse> {
    const queryParams = filters ? this.toQueryString(filters) : ""
    return this.execHttpRequest<PromoCodeListResponse>({
      url: `promo-code${queryParams ? `?${queryParams}` : ""}`,
      method: this.httpMethods.get,
    })
  }

  async getCodeUsageStats(): Promise<CodeUsageData[]> {
    return this.execHttpRequest<CodeUsageData[]>({
      url: "codes/usage-stats",
      method: this.httpMethods.get,
    })
  }

  async createPromoCode(payload: CreatePromoCodePayload): Promise<PromoCode> {
    return this.execHttpRequest<PromoCode>({
      url: "promo-code",
      method: this.httpMethods.post,
      body: payload,
    })
  }

  async updatePromoCodeStatus(codeId: string, status: 'actif' | 'suspendu'): Promise<PromoCode> {
    return this.execHttpRequest<PromoCode>({
      url: `codes/${codeId}/status`,
      method: this.httpMethods.update,
      body: { status },
    })
  }

  async deletePromoCode(codeId: string): Promise<void> {
    return this.execHttpRequest<void>({
      url: `codes/${codeId}`,
      method: this.httpMethods.post,
      body: { _method: 'DELETE' },
    })
  }

  // Méthodes pour les Commerciaux
  async getCommercials(filters?: CommercialFilters): Promise<Commercial[]> {
    const queryParams = filters ? this.toQueryString(filters) : ""
    return this.execHttpRequest<Commercial[]>({
      url: `commercials${queryParams ? `?${queryParams}` : ""}`,
      method: this.httpMethods.get,
    })
  }

  async createCommercial(payload: CreateCommercialPayload): Promise<Commercial> {
    return this.execHttpRequest<Commercial>({
      url: "commercials",
      method: this.httpMethods.post,
      body: payload,
    })
  }

  async updateCommercialStatus(commercialId: string, status: 'actif' | 'inactif'): Promise<Commercial> {
    return this.execHttpRequest<Commercial>({
      url: `commercials/${commercialId}/status`,
      method: this.httpMethods.update,
      body: { status },
    })
  }

  async deleteCommercial(commercialId: string): Promise<void> {
    return this.execHttpRequest<void>({
      url: `commercials/${commercialId}`,
      method: this.httpMethods.post,
      body: { _method: 'DELETE' },
    })
  }
}

const marketingService = new MarketingService()
export default marketingService
