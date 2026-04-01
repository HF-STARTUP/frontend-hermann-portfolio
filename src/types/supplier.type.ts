import { Region } from "@/types/vehicule.type";
import { RegionType } from "@/types/__form/profile.type";

export type SupplierCtgResponseType = {
  id: number;
  name: string;
};

export type SupplierResponseType = {
  id: number;
  logo: string;
  name: string;
  business_name: string;
  social_reason: string;
  niu: string;
  rccm: string;
  phone: string;
  email: string;
  region_id: number;
  supplier_category_id: number;
  city: string;
  street: string;
  created_at: Date;
  updated_at: Date;
  desactivate_at: Date;
  region?: RegionType;
  activity_category?: ActivityCategory;
  contactSupplier?: any[];
};

export type ActivityCategory = {
  id: number;
  name: string;
  account_id: string;
};

export interface RenewalSeries {
  period: string;
  renewals: number;
  expired: number;
}

export interface RenewalEvolutionData {
  series: RenewalSeries[];
}

export interface PaymentMethodStat {
  paymentMethod: string;
  amount: number;
  percentage: number;
}

export interface SubscriptionsByPaymentData {
  total: number;
  byPaymentMethod: PaymentMethodStat[];
}
