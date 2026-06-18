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
    park_id?: string;
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
    sort_order?: 'asc' | 'desc',
    interraction_id?: string
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


export interface ARCClientBadges {
    risk_level: ARCRiskLevel;
    risk_level_label: string;
    primary_alert_signal: ARCAlertSignals;
    primary_alert_label: string;
}

export interface ARCRiskSparklinePoint {
    date: string;
    score: number;
}

export interface ARCRiskTrend30d {
    score_delta: number;
    label: string;
}

export interface ARCRiskFactor {
    key: string;
    label: string;
    points: number;
    metadata: Record<string, number>;
}

export interface ARCRiskAnalysis {
    risk_score: number;
    risk_level: ARCRiskLevel;
    risk_level_label: string;
    trend_30d: ARCRiskTrend30d;
    sparkline_30d: ARCRiskSparklinePoint[];
    factors: ARCRiskFactor[];
}

export interface ARCRecommendation {
    key: string;
    label: string;
    cta_label: string;
    cta_action: string;
}

export interface ARCPrimaryContact {
    profile_id: string;
    first_name: string;
    last_name: string;
    role_label: string;
    phone: string;
    email: string;
}

export interface ARCFleetSummary {
    vehicle_count: number;
    tier_label: string;
    tier_min: number;
    tier_max: number;
}

export interface ARCSubscriptionSummary {
    plan_name: PackageType;
    annual_amount: number;
    currency: string;
    renewal_date: string;
    renewal_in_days: number;
    status: SubscriptionStatus;
    status_label: string;
}

export interface ARCAccountManager {
    profile_id: string;
    first_name: string;
    last_name: string;
}

export interface ARCRecentPaymentsSummary {
    last_success_at: string | null;
    last_failed_at: string | null;
}

export interface ARCClientProfileResponseType {
    park_id: string;
    name: string;
    logo: string | null;
    city: string;
    country: string;
    location_label: string;
    vehicle_count_label: string;
    badges: ARCClientBadges;
    risk_analysis: ARCRiskAnalysis;
    recommendations: ARCRecommendation[];
    primary_contact: ARCPrimaryContact;
    fleet: ARCFleetSummary;
    subscription: ARCSubscriptionSummary;
    account_manager: ARCAccountManager | null;
    last_activity_at: string | null;
    unpaid_invoices_count: number;
    recent_payments_summary: ARCRecentPaymentsSummary;
}


export type ARCInteractionSource = "system" | "manual" | string;
export type ARCInteractionCategory = "subscription" | "payment" | "follow_up" | string;

export interface ARCInteractionTag {
    type: string;
    label: string;
}

export interface ARCInteractionResponseType {
    id: string;
    source: ARCInteractionSource;
    category: ARCInteractionCategory;
    category_label: string;
    title: string;
    occurred_at: string;
    notes: string | null;
    tags: ARCInteractionTag[];
}

export interface ARCInteractionListResponseType {
    data: ARCInteractionResponseType[];
    totalRecords: number;
    totalPages: number;
    currentPage: number;
    itemPerPage: number;
}


export interface ARCInteractionDetailHeader {
    client_name: string;
    location_label: string;
    vehicle_count: number;
    vehicle_count_label: string;
    risk_score: number;
}

export interface ARCInteractionDetailResponseType {
    id: string;
    park_id: string;
    source: ARCInteractionSource;
    editable: boolean;
    header: ARCInteractionDetailHeader;
    communication_channel: string | null;
    communication_channel_label: string | null;
    contact_reason: string | null;
    contact_reason_label: string | null;
    exchange_summary: string | null;
    identified_needs: string[];
    identified_needs_labels: string[];
    proposed_solution: string | null;
    next_follow_up_at: string | null;
    assigned_to: string | null;
    result: string | null;
    result_label: string | null;
    next_steps: string | null;
    status: string | null;
    status_label: string | null;
    occurred_at: string;
    created_at: string;
    updated_at: string;
}


