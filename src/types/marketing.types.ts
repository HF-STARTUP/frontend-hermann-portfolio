export type PromoCodeStatusApi =
  | "DRAFT"
  | "ACTIVE"
  | "SUSPENDED"
  | "DEACTIVATED"
  | "EXPIRED"
  | "ARCHIVED"

export interface PromoCode {
  id: string
  code_label: string
  description: string | null
  code_type: CodeType
  discount_type: DiscountType
  discount_value: number
  validity_days: number
  max_usage_per_user: number
  is_stackable: boolean
  marketing_campaign: string | null
  status: PromoCodeStatusApi
  archived_at: string | null
  expires_at: string
  created_at: string
  updated_at: string
  sales_agent: unknown | null
  targets: unknown[]
  stackable_codes: unknown[]
  application_modes: unknown[]
  usage_count: number
}

export interface MarketingKpi {
  totalCodes: number
  totalCommercials: number
  activeCodes: { 
    current: number
    total: number 
  }
  monthlyGrowth: number
}

export interface CodeUsageData {
  type: string
  label: string
  count: number
}

export interface MarketingFilters {
  itemPerPage?: number
  page?: number
  status?: string
  code_type?: string
  sales_agent_id?: string
}

export interface PromoCodeMetricsFilterParams {
  start_date?: string //dateteime
  end_date?: string //datetime
}

export interface PromoCodeListResponse {
  data: PromoCode[]
  totalRecords: number
}

export type CodeType =
  | "NEW_CLIENT"
  | "LOYALTY"
  | "FREE_COUPON"
  | "COMMERCIAL_RENDITION"

export type DiscountType = "FIXED_AMOUNT" | "PERCENTAGE" | "FREE_PERIOD"

export interface CreatePromoCodePayload {
  code_label: string
  code_type: CodeType
  discount_type: DiscountType
  discount_value: number
  validity_days: number
  max_usage_per_user: number
  is_stackable: boolean
}

export interface CreatePromoCodeFormData {
  code_label: string
  code_type: CodeType | ""
  discount_type: DiscountType | ""
  discount_value: string
  validity_days: string
  max_usage_per_user: string
  is_stackable: boolean
}

export const CODE_TYPE_OPTIONS: { value: CodeType; label: string }[] = [
  { value: "NEW_CLIENT", label: "Nouveau client" },
  { value: "LOYALTY", label: "Fidélisation" },
  { value: "FREE_COUPON", label: "Coupon gratuit" },
  { value: "COMMERCIAL_RENDITION", label: "Reddition commerciale" },
]

export const DISCOUNT_TYPE_OPTIONS: { value: DiscountType; label: string }[] = [
  { value: "FIXED_AMOUNT", label: "Montant fixe" },
  { value: "PERCENTAGE", label: "Pourcentage" },
  { value: "FREE_PERIOD", label: "Période gratuite" },
]

// Types pour les Commerciaux
export type CommercialStatus = 'actif' | 'inactif'
export type CommercialPerformance = 'excellent' | 'bon' | 'moyen' | 'faible'

export interface Commercial {
  id: string
  createdAt: string
  name: string
  email: string
  country: string
  codesAssigned: number
  codesUsed: number
  paidAccounts: number
  conversionRate: number
  revenue: number
  performance: CommercialPerformance
  status: CommercialStatus
  avatar?: string
}

export interface CommercialFilters {
  search: string
  status: string
  conversionRate: string
  performance: string
  country: string
}

export interface CreateCommercialPayload {
  lastName: string
  firstName: string
  phone: string
  email?: string
  country: string
  channel: string
}

export interface CreateCommercialFormData {
  lastName: string
  firstName: string
  phone: string
  email: string
  country: string
  channel: string
}

export const COUNTRY_OPTIONS = [
  { value: 'CI', label: "Côte d'Ivoire" },
  { value: 'SN', label: 'Sénégal' },
  { value: 'CM', label: 'Cameroun' },
  { value: 'BF', label: 'Burkina Faso' },
  { value: 'ML', label: 'Mali' },
  { value: 'BJ', label: 'Bénin' },
  { value: 'TG', label: 'Togo' },
  { value: 'GA', label: 'Gabon' },
] as const

export const CHANNEL_OPTIONS = [
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'telegram', label: 'Telegram' },
  { value: 'sms', label: 'SMS' },
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Téléphone' },
] as const

export type SalesAgentChannel = "VISION" | "PRESENTIEL"
export type SalesAgentStatus = "ACTIVE" | "INACTIVE"

export interface SalesAgentFilters {
  itemPerPage?: number
  page?: number
  channel?: string
  country_id?: number
  start_date?: string
  end_date?: string
}

export interface SalesAgentListResponse {
  data: unknown[]
  totalRecords?: number
}

export interface CreateSalesAgentPayload {
  first_name: string
  last_name: string
  phone: string
  country_id: number
  channel: SalesAgentChannel
  email?: string
  identification_number?: string
  status?: SalesAgentStatus
}

export interface CreateSalesAgentFormData {
  first_name: string
  last_name: string
  phone: string
  country_id: number | ""
  channel: SalesAgentChannel | ""
  email: string
  identification_number: string
  status: SalesAgentStatus | ""
}

export const COUNTRY_ID_OPTIONS: { id: number; label: string }[] = [
  { id: 1, label: "Côte d'Ivoire" },
  { id: 2, label: "Sénégal" },
  { id: 3, label: "Cameroun" },
  { id: 4, label: "Burkina Faso" },
  { id: 5, label: "Mali" },
  { id: 6, label: "Bénin" },
  { id: 7, label: "Togo" },
  { id: 8, label: "Gabon" },
]

export const SALES_AGENT_CHANNEL_OPTIONS: {
  value: SalesAgentChannel
  label: string
}[] = [
  { value: "VISION", label: "Vision" },
  { value: "PRESENTIEL", label: "Présentiel" },
]

export const SALES_AGENT_STATUS_OPTIONS: {
  value: SalesAgentStatus
  label: string
}[] = [
  { value: "ACTIVE", label: "Actif" },
  { value: "INACTIVE", label: "Inactif" },
]
