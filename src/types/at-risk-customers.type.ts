import { PackageType } from "@/app/(webapp)/app/subscriptions/_hooks/usePackageList";
import { FleetType, SubscriptionStatus } from "./admin/fleet.type";

export interface TrendWeek {
    current: number;
    previous: number;
    percent_change: number;
}

export interface ARCStat {
    count: number;
    trend_week: TrendWeek;
}

export enum ARCGroupBy {
    NONE = "none",
    RISK_LEVEL = "risk_level",
    RISK_CAUSE = "risk_cause",
    CLIENT_NEED = "client_need",
    ACCOUNT_MANAGER = "account_manager"
}

export enum ARCSortBy {
    RISK_SCORE = "risk_score",
    LAST_ACTIVITY = "last_activity",
    LAST_CONTACT = "last_contact",
    NEXT_ACTION_DATE = "next_action_date"
}

export interface ARCKpiResponseType {
    discount_requests: ARCStat;
    training_required: ARCStat;
    financial_difficulties: ARCStat;
    pending_follow_ups: ARCStat;
    subscription_changes: ARCStat;
    renewal_opportunities: ARCStat;
}

export interface AtRiskCustomersParams {
    itemPerPage?: number,
    page?: number,
    start_date?: string,
    end_date?: string,
    city_id?: number,
    country_id?: number,
    currency_id?: number,
    account_type?: FleetType,
    search?: string,
    alert_signal?: string[],
    risk_level?: string[],
    risk_score_max?: number,
    risk_score_min?: number,
    subscription_plan?: string,
    account_manager_id?: string,
    group_by?: ARCGroupBy,
    sort_by?: ARCSortBy,
    sort_order?: 'asc' | 'desc'
}


export type ARCRiskLevel = "critical" | "high" | "medium" | "low";
export type ARCAlertSignals = "no_recent_payment" | "expired" | string

export interface ARCClientPrioritiesResponseType {
    rank: number;
    park_id: string;
    client_name: string;
    city: string;
    vehicle_count: number;
    alert_signal: ARCAlertSignals;
    alert_label: string;
    main_problem: string;
    risk_score: number;
    risk_level: ARCRiskLevel;
}

export type ARCClientNeed = "payment_plan" | string;

export interface ARCClientDetailResponseType {
    park_id: string;
    name: string;
    logo: string | null;
    city: string;
    country: string;
    vehicle_count: number;
    vehicle_count_label: string;
    plan_name: PackageType;
    renewal_in_days: number | null;
    expired_days_ago: number | null;
    renewal_label: string;
    end_date: string;
    subscription_status?: SubscriptionStatus;
    alert_signal: string;
    alert_label: string;
    risk_score: number;
    risk_level: ARCRiskLevel;
    risk_score_tier: ARCRiskLevel;
    main_problem: string;
    client_need: ARCClientNeed;
    client_need_label: string;
    last_activity_at: string | null;
    last_contact_at: string | null;
    last_contact_type: string | null;
    next_action: string | null;
    account_manager_id: string | null;
}

export interface ARCClientDetailListResponseType {
    data: ARCClientDetailResponseType[];
    totalRecords: number;
    totalPages: number;
    currentPage: number;
    itemPerPage: number;
    filtered_count_label: string;
}