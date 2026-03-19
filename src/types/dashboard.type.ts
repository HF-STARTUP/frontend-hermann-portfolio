export type PeriodType = "day" | "week" | "month" | "year";

export interface DashboardParams {
    start_date?: string;
    end_date?: string;
    city_id?: number;
    country_id?: number;
    currency_id?: number;
    account_type?: "particulier" | "professionnel" | "all";
    group_by?: PeriodType;
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
};

// Revenus charts data

export interface RevenueSeriesItem {
    period: string;
    amount: number;
    subscriptionAmount: number;
    commissionAmount: number;
}

export interface RevenueChartData {
    series: RevenueSeriesItem[];
    totalRevenue: number;
    breakdown: any[];
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
    /** Peut être null si aucun abonnement n'est actif */
    subscriptionName: string | null;
    totalSubscriptionAmount: number;
    flowIn: number;
    flowOut: number;
    netFlow: number;
}

export interface BestFleetPaginationData extends PaginationResponse {
    data: BestFleetItem[];
}