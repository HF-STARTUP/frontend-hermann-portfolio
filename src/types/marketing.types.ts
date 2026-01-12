export type PromoCodeType = 
  | 'reduction_nouveau_client' 
  | 'fidelisation_client' 
  | 'coupon_gratuit' 
  | 'reddition_commerciale'

export type PromoCodeStatus = 'actif' | 'suspendu' | 'expire'

export interface PromoCode {
  id: string
  createdAt: string
  code: string
  type: PromoCodeType
  value: string
  target: string
  assignedCommercial: string | null
  usageCount: number
  conversions: number
  conversionRate: number
  status: PromoCodeStatus
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
  search: string
  conversionRate: string
  codeType: string
  status: string
}

export interface CreatePromoCodePayload {
  code: string
  type: PromoCodeType
  value: string
  target: string
  assignedCommercial?: string
}

export interface CreatePromoCodeFormData {
  type: PromoCodeType | ''
  code: string
  message: string
  value: string
  validity: string
  usagePerUser: number
}

export const CODE_TYPE_OPTIONS = [
  { value: 'reduction_nouveau_client', label: 'Réduction nouveau client' },
  { value: 'fidelisation_client', label: 'Fidélisation client existant' },
  { value: 'coupon_gratuit', label: 'Coupon gratuit' },
  { value: 'reddition_commerciale', label: 'Reddition commerciale' },
] as const

export const CODE_VALUE_OPTIONS = [
  { value: '-10%', label: '-10% sur 1er mois' },
  { value: '-20%', label: '-20% sur 1er mois' },
  { value: '-30%', label: '-30% sur 1er mois' },
  { value: '1_mois_offert', label: '1 mois offert' },
  { value: 'gps_30_jours', label: 'GPS offert 30 jours' },
] as const

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
