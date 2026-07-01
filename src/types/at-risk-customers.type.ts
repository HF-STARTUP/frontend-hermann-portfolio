import { PackageType } from "@/app/(webapp)/app/subscriptions/_hooks/usePackageList";
import { FleetType, SubscriptionStatus } from "./admin/fleet.type";

// ──────────────────────────────────────────
// Signaux et risque
// ──────────────────────────────────────────

export enum ARCAlertSignal {
    NO_RECENT_PAYMENT = "no_recent_payment",
    EXPIRED = "expired",
    EXPIRING_SOON = "expiring_soon",
    INACTIVE = "inactive",
    LOW_ACTIVITY = "low_activity",
    PAYMENT_FAILED = "payment_failed",
}

export enum ARCRiskLevel {
    CRITICAL = "critical",
    HIGH = "high",
    MEDIUM = "medium",
    LOW = "low",
}

export enum ARCRiskScoreTier {
    CRITICAL = "critical",
    HIGH = "high",
    MEDIUM = "medium",
    LOW = "low",
}

export enum ARCClientNeed {
    PAYMENT_PLAN = "payment_plan",
    TRAINING = "training",
    LOYALTY_DISCOUNT = "loyalty_discount",
    RENEWAL_CALL = "renewal_call",
    ACCOUNT_REVIEW = "account_review",
    RENEWAL = "renewal",
    BILLING_REVIEW = "billing_review",
}

// ──────────────────────────────────────────
// Actions CRM
// ──────────────────────────────────────────

export enum ARCActionSource {
    MANUAL = "manual",
    SYSTEM = "system",
}

export enum ARCActionStatus {
    DRAFT = "draft",
    TODO = "todo",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed",
    CANCELLED = "cancelled",
}

export enum ARCActionPriority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    URGENT = "urgent",
}

export enum ARCActionMode {
    SCHEDULE_FOLLOW_UP = "schedule_follow_up",
    REGISTER_INTERACTION = "register_interaction",
}

export enum ARCActionType {
    FOLLOW_UP_CLIENT = "follow_up_client",
    SEND_PROMOTION = "send_promotion",
    SCHEDULE_DEMO = "schedule_demo",
    ACCOUNT_REVIEW = "account_review",
    TRAINING_SESSION = "training_session",
    TECHNICAL_INTERVENTION = "technical_intervention",
}

export enum ARCLegacyType {
    CALL = "call",
    EMAIL = "email",
    MEETING = "meeting",
    FOLLOW_UP = "follow_up",
    DISCOUNT = "discount",
    TRAINING = "training",
    PAYMENT_PLAN = "payment_plan",
}

export enum ARCCommunicationChannel {
    CALL = "call",
    EMAIL = "email",
    SMS = "sms",
    WHATSAPP = "whatsapp",
    MEETING = "meeting",
    OTHER = "other",
}

export enum ARCContactReason {
    PAYMENT_OVERDUE = "payment_overdue",
    SUBSCRIPTION_RENEWAL = "subscription_renewal",
    TRAINING = "training",
    ACCOUNT_REVIEW = "account_review",
    OTHER = "other",
}

export enum ARCResult {
    POSITIVE = "positive",
    NEUTRAL = "neutral",
    NEGATIVE = "negative",
    PENDING = "pending",
    NO_ANSWER = "no_answer",
}

export enum ARCCategory {
    PAYMENT_OVERDUE = "payment_overdue",
    FOLLOW_UP = "follow_up",
    SUBSCRIPTION = "subscription",
    CONTACT = "contact",
}

// ──────────────────────────────────────────
// Facteurs de score
// ──────────────────────────────────────────

export enum ARCRiskFactorKey {
    SUBSCRIPTION_EXPIRED = "subscription_expired",
    SUBSCRIPTION_EXPIRING = "subscription_expiring",
    UNPAID_INVOICE = "unpaid_invoice",
    FLEET_INACTIVE = "fleet_inactive",
    LOW_PLATFORM_ACTIVITY = "low_platform_activity",
    PAYMENT_FAILURES = "payment_failures",
    ADMIN_SCORE_ADJUSTMENT = "admin_score_adjustment",
    ADMIN_FORCED_SIGNAL = "admin_forced_signal",
}

// ──────────────────────────────────────────
// Recommandations
// ──────────────────────────────────────────

export enum ARCRecommendationKey {
    PAYMENT_PLAN = "payment_plan",
    CONTACT_48H = "contact_48h",
    ACCOUNT_REVIEW = "account_review",
}

export enum ARCRecommendationCtaAction {
    SEND_PAYMENT_PLAN = "send_payment_plan",
    REGISTER_FOLLOW_UP = "register_follow_up",
    SCHEDULE_ACCOUNT_REVIEW = "schedule_account_review",
}

// ──────────────────────────────────────────
// Liste — filtres, tri, regroupement
// ──────────────────────────────────────────

export enum ARCGroupBy {
    NONE = "none",
    RISK_LEVEL = "risk_level",
    RISK_CAUSE = "risk_cause",
    CLIENT_NEED = "client_need",
    ACCOUNT_MANAGER = "account_manager",
}

export enum ARCSortBy {
    RISK_SCORE = "risk_score",
    LAST_ACTIVITY = "last_activity",
    LAST_CONTACT = "last_contact",
    NEXT_ACTION_DATE = "next_action_date",
}

export enum ARCSortOrder {
    ASC = "asc",
    DESC = "desc",
}

// ──────────────────────────────────────────
// Interactions
// ──────────────────────────────────────────

export enum ARCInteractionFilterType {
    MANUAL = "manual",
    SYSTEM = "system",
    ALL = "all",
}

export enum ARCInteractionTagType {
    CONTACT_TYPE = "contact_type",
    ASSIGNEE = "assignee",
}

export enum ARCLogContactType {
    CALL = "call",
    EMAIL = "email",
    SMS = "sms",
}

// ──────────────────────────────────────────
// Abonnement / compte
// ──────────────────────────────────────────

export enum ARCAccountType {
    PARTICULIER = "particulier",
    PROFESSIONNEL = "professionnel",
}

// ──────────────────────────────────────────
// KPI — vue d'ensemble
// ──────────────────────────────────────────

export interface TrendWeek {
    current: number;
    previous: number;
    percent_change: number;
}

export interface ARCStat {
    count: number;
    trend_week: TrendWeek;
}

export interface ARCKpiResponseType {
    discount_requests: ARCStat;
    training_required: ARCStat;
    financial_difficulties: ARCStat;
    pending_follow_ups: ARCStat;
    subscription_changes: ARCStat;
    renewal_opportunities: ARCStat;
}

// ──────────────────────────────────────────
// Paramètres communs
// ──────────────────────────────────────────

export interface AtRiskCustomersParams {
    park_id?: string;
    itemPerPage?: number;
    page?: number;
    start_date?: string;
    end_date?: string;
    city_id?: number;
    country_id?: number;
    currency_id?: number;
    account_type?: FleetType;
    search?: string;
    alert_signal?: ARCAlertSignal[];
    risk_level?: ARCRiskLevel[];
    risk_score_max?: number;
    risk_score_min?: number;
    subscription_plan?: string;
    account_manager_id?: string;
    group_by?: ARCGroupBy;
    sort_by?: ARCSortBy;
    sort_order?: ARCSortOrder;
    interraction_id?: string;
}

// ──────────────────────────────────────────
// Priorités du jour
// ──────────────────────────────────────────

export interface ARCClientPrioritiesResponseType {
    rank: number;
    park_id: string;
    client_name: string;
    city: string;
    vehicle_count: number;
    alert_signal: ARCAlertSignal;
    alert_label: string;
    main_problem: string;
    risk_score: number;
    risk_level: ARCRiskLevel;
}

// ──────────────────────────────────────────
// Liste clients — détail
// ──────────────────────────────────────────

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
    alert_signal: ARCAlertSignal;
    alert_label: string;
    risk_score: number;
    risk_level: ARCRiskLevel;
    risk_score_tier: ARCRiskScoreTier;
    main_problem: string;
    client_need: ARCClientNeed;
    client_need_label: string;
    last_activity_at: string | null;
    last_contact_at: string | null;
    last_contact_type: ARCLogContactType | null;
    next_action: {
        id: string;
        type: string;
        label: string;
        display_label: string;
        scheduled_at: string;
        assignee: string;
    } | null;
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

// ──────────────────────────────────────────
// Fiche client — profil complet
// ──────────────────────────────────────────

export interface ARCClientBadges {
    risk_level: ARCRiskLevel;
    risk_level_label: string;
    primary_alert_signal: ARCAlertSignal;
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
    key: ARCRiskFactorKey;
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
    key: ARCRecommendationKey;
    label: string;
    cta_label: string;
    cta_action: ARCRecommendationCtaAction;
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

// ──────────────────────────────────────────
// Interactions — timeline
// ──────────────────────────────────────────

export interface ARCInteractionTag {
    type: ARCInteractionTagType;
    label: string;
}

export interface ARCInteractionAssignee {
    profile_id: string;
    first_name: string;
    last_name: string;
}

export interface ARCInteractionResponseType {
    id: string;
    source: ARCActionSource;
    category?: ARCCategory;
    category_label: string;
    title: string;
    occurred_at: string;
    notes: string | null;
    tags: ARCInteractionTag[];
    status?: ARCActionStatus | null;
    status_label: string | null;
    priority: ARCActionPriority | null;
    priority_label: string | null;
    deadline_at: string | null;
    action_label: string | null;
    assignee: ARCInteractionAssignee | null;
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
    source: ARCActionSource;
    editable: boolean;
    header: ARCInteractionDetailHeader;
    communication_channel: ARCCommunicationChannel | null;
    communication_channel_label: string | null;
    contact_reason: ARCContactReason | null;
    contact_reason_label: string | null;
    exchange_summary: string | null;
    identified_needs: ARCClientNeed[];
    identified_needs_labels: string[];
    proposed_solution: string | null;
    next_follow_up_at: string | null;
    assigned_to?: {
        profile_id: string;
        first_name?: string;
        last_name?: string;
        avatar_url?: string;
    };
    result: ARCResult | null;
    result_label: string | null;
    next_steps: string | null;
    status: ARCActionStatus | null;
    status_label: string | null;
    occurred_at: string;
    created_at: string;
    updated_at: string;
}

// ──────────────────────────────────────────
// Création d'action
// ──────────────────────────────────────────

export interface ARCNewActionPayload {
    mode?: ARCActionMode;
    park_id?: string;
    action_type?: ARCActionType;
    type?: ARCLegacyType;
    title?: string;
    description?: string;
    assigned_to_profile_id?: string;
    deadline_at?: string;
    scheduled_at?: string;
    priority?: ARCActionPriority;
    status?: ARCActionStatus;
    notes?: string;
    communication_channel?: ARCCommunicationChannel;
    contact_reason?: ARCContactReason;
    exchange_summary?: string;
    identified_needs?: ARCClientNeed[];
    proposed_solution?: string;
    next_follow_up_at?: string;
    result?: ARCResult;
    next_steps?: string;
    occurred_at?: string;
    category?: ARCCategory;
}

// ──────────────────────────────────────────
// Méta — assignées
// ──────────────────────────────────────────

export interface ARCAssigneeResponseType {
    profile_id: string;
    first_name: string;
    last_name: string;
    avatar_url: string | null;
}