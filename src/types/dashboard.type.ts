import { FleetType } from "./admin/fleet.type";

export type PeriodType = "day" | "week" | "month" | "year";

export interface DashboardParams {
  start_date?: string;
  end_date?: string;
  city_id?: number | string;
  country_id?: number;
  currency_id?: number;
  account_type?: FleetType;
  group_by?: PeriodType;
  page?: number;
  itemPerPage?: number;
}

export interface PaginationResponse {
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  itemPerPage: number;
}

// Dashboard KPI types

export interface TrendData {
  current: number;
  previous: number;
  percentChange: number;
  label: string;
}

export interface RevenueData {
  totalSubscriptions: TrendData;
  totalCommission: TrendData;
  marketingCost: TrendData;
}

export interface FleetData {
  activeCount: TrendData;
  totalCount: TrendData;
}

export interface SubscriptionData {
  payingCount: TrendData;
  totalCount: TrendData;
  ratio: TrendData;
}

export interface DashboardStatsData {
  revenue: RevenueData;
  fleets: FleetData;
  subscriptions: SubscriptionData;
  expiringSubscriptionsCount: number;
  inactiveFleetsCount30Days: number;
}

// Revenus charts data

export interface RevenueSeriesItem {
  period: string;
  amount: number;
  subscriptionAmount: number;
  commissionAmount: number;
}

export interface RevenueBreakdownItem {
  category: string;
  amount: number;
  percentage: number;
}

export interface RevenueChartData {
  series: RevenueSeriesItem[];
  totalRevenue: number;
  previousPeriodTotal: number;
  percentChange: number;
  breakdown: RevenueBreakdownItem[];
}

// Best Fleets data

export interface BestFleetItem {
  park_id: string;
  name: string;
  country: string;
  country_id: number;
  city: string;
  city_id: number;
  vehicleCount: number;

  subscriptionName: string | null;
  totalSubscriptionAmount: number;
  flowIn: number;
  flowOut: number;
  netFlow: number;
}

export interface BestFleetPaginationData extends PaginationResponse {
  data: BestFleetItem[];
}

export interface ExpiringSubscriptionItem {
  subscriptionAccountId: string;
  fleetName: string;
  city: string;
  country: string;
  endDate: string;
  daysRemaining: number;
  parkLogoPath: string | null;
}

export interface ExpiringSubscriptionData extends PaginationResponse {
  data: ExpiringSubscriptionItem[];
}

export interface ExpiringSubscriptionsParams {
  itemPerPage?: number;
  page?: number;
  start_date?: string;
  end_date?: string;
  city_id?: number;
  country_id?: number;
  currency_id?: number;
  account_type?: FleetType;
}

export interface InactiveFleetItem {
  park_id: string;
  name: string;
  logoPath: string | null;
  lastActivityDate: string | null;
  daysInactive: number;
}

export interface InactiveFleetsData extends PaginationResponse {
  data: InactiveFleetItem[];
}
