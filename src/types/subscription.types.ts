// types/subscription.types.ts

import { FleetType } from "./admin/fleet.type";
import { PaginationResponse } from "./dashboard.type";

export type PackageType = "starter" | "premium" | "essentiel" | "tryfree";
export type PackagePeriod = "monthly" | "quarterly" | "yearly";
export type SubscriptionType = "essentiel" | "premium";

export type SubscriptionAccountType = "professionnel" | "particulier";

// Features interface
export interface Features {
    yango: boolean | null;
    gps: boolean | null;
    gps_driver: boolean | null;
    export_excel: boolean;
    auto_daily_report: boolean;
    performance_dashboard: boolean;
    app_vtc_driver: boolean;
    auto_lock_vehicle: boolean;
    recipe_with_mobile_money: boolean;
    vehicle_doc_reminder: boolean;
    flollow_oil_change: boolean;
    manage_course: boolean;
    performance_yango: boolean;
    entretien: boolean;
    vehicle_group: boolean;
    manage_admin: boolean;
}

// Simple advantage
export interface Advantage {
    title: string;
    active: boolean;
}

// Advantage with category
export interface AdvantageWithCategory {
    id: string;
    title: string;
    description: string | null;
    active: boolean;
}

// Advantages by category
export interface AdvantagesByCategory {
    category: string;
    advantages: AdvantageWithCategory[];
}

// Vehicle range for customizable plans
export interface VehicleRange {
    id: string;
    code: string;
    plan_id: string | null;
    vehicle_min: number;
    vehicle_max: number;
    driver_number: number;
    amount: number | null;
    crossed_out_amount: number | null;
    is_quote: boolean;
    label: string;
}

// Pricing rules
export interface PricingRules {
    vehicle_unit_price: number;
    driver_per_vehicle_ratio: number;
    annual_discount_percent: number;
    ai_agent_price_percent: number;
    currency: string;
}


export interface GetSubscriptionPlansParams {
    country_code?: string;
    account_type?: 'particulier' | 'professionnel';
    period?: 'monthly' | 'quarterly' | 'yearly';
    currency?: string;
    gps?: boolean;
}

// Subscription plan (new structure)
export interface SubscriptionPlan {
    id: string;
    name: string;
    remise: number | null;
    period: PackagePeriod;
    code: string | null;
    plan_id: number | null;
    subscription_type: SubscriptionType;
    text_remise: string | null;
    text_limitation: string | null;
    account_type: SubscriptionAccountType;
    description: string | null;
    vehicle_number: number;
    driver_number: number;
    is_range_plan: boolean;
    vehicle_min: number | null;
    vehicle_max: number | null;
    is_quote: boolean;
    parent_plan_code: string | null;
    pricing_version: string | null;
    effective_date: string | null;
    annual_discount_percent: number | null;
    ai_agent_price_percent: number | null;
    features: Features;
    advantages: Advantage[];
    advantages_by_category: AdvantagesByCategory[];
    advantages2: any[];
    amount: number | null;
    crossed_out_amount: number | null;
    currency: string;
    is_customizable?: boolean;
    vehicle_ranges?: VehicleRange[];
}

// Subscription pricing response (API wrapper)
export interface SubscriptionPricingResponse {
    data: {
        effective_date: string;
        pricing_rules: PricingRules;
        plans: SubscriptionPlan[];
    };
}

// Existing types for backward compatibility
export type SubscriptionPackResponseType = SubscriptionPlan;

export type CreateSubscriptType = {
    vehicle_number?: number;
    subscription_id?: string;
    country_iso_code?: string;
    subscription_plan?: string;
    payment_method?: string;
    operator_id?: string;
    phone?: string;
    otp?: string;
};

export type InitSubscriptionResponseType = {
    payment_url: string;
    transaction_id: string;
    amount: number;
    currency: string;
    status?: "Failed" | "Success";
};

export type ActiveSubscriptionResponseType = {
    id: string;
    start_date: Date;
    end_date: Date;
    is_active: boolean;
    subscription_plan: null;
    vehicle_number: null;
    offer: string;
    renew: boolean;
    amount: null;
    subscription: Subscription;
    info: Info;
};

export type Info = {
    subscription_vehicle_limit: number;
    subscription_driver_limit: number;
    subscription_vehicle_number: null;
    gps: boolean;
    current_total_vehicle: number;
    current_total_driver: number;
};

export type Subscription = {
    id: string;
    account_type: null;
    subscription_type: string;
    name: string;
    remise: null;
    amount: null;
    description: null;
    vehicle_number: number;
    driver_number: number;
    gps: boolean;
    text_remise: null;
    text_limitation: null;
    created_at: Date;
    updated_at: Date;
};

export type OperatorResponseType = {
    id: string;
    name: string;
    title: string;
    type: string;
    country: Country;
    image: string;
};

export type Country = {
    id: number;
    iso_code: string;
};

// Subscription Pack list interfaces
export interface TariffByPeriod {
    id: string;
    period: PackagePeriod;
    amount: number;
    crossed_out_amount: number | null;
    enable: boolean;
    effective_date: string | null;
    pricing_version: string | number | null;
    annual_discount_percent: number;
    ai_agent_price_percent: number;
    created_at: string;
    updated_at: string;
    amount_in_country_currency: number;
}

export interface SubscriptionPricingItem {
    id: string;
    name: string;
    code: string;
    account_type: string;
    amount: number | null;
    vehicle_number: number | null;
    driver_number: number | null;
    vehicle_range: string | null;
    enable: boolean;
    created_at: string;
    updated_at: string;
    createdBy: {
        first_name: string;
        last_name: string;
        email: string;
    } | null;
    package: SubscriptionPricingItem;
    tariffs_by_period: TariffByPeriod[];
    revenue_total: number;
    users_count: number;
}

export interface SubscriptionPricingData extends PaginationResponse {
    data: SubscriptionPricingItem[];
}

export interface GetSubscriptionsPricingParams {
    itemPerPage?: number;
    page?: number;
    search?: string;
    account_type?: string;
    status?: string;
    country_code?: string;
    start_date?: string;
    end_date?: string;
    city_id?: string;
    country_id?: string;
    currency_id?: string;
    group_by?: "day" | "week";
}

// Kpis types
export interface AllSubscriptionsKpiData {
    projected: Projected;
    amountByProfile: AmountByProfile;
    newSubscribers: NewSubscribers;
    activeSubscriptions: ActiveSubscriptions;
}

export interface Projected {
    subscriptionsAmount: number;
    reSubscriptionsAmount: number;
    periodStart: string;
    periodEnd: string;
}

export interface AmountByProfile {
    byProfile: {
        profile: string;
        amount: number;
    }[];
    total: number;
}

export interface NewSubscribers {
    currentMonth: number;
    previousMonth: number;
    percentChange: number;
}

export interface ActiveSubscriptions {
    payingCount: MetricWithComparison;
    totalCount: MetricWithComparison;
    ratio: MetricWithComparison;
}

export interface MetricWithComparison {
    current: number;
    previous: number;
    percentChange: number;
    label: string;
}

// Get subscriptions evolution chart types
export interface SubscriptionPlanStats {
    planId: string;
    planName: string;
    count: number;
    amount: number;
}

export interface SubscriptionEvolutionSeries {
    period: string;
    byPlan: SubscriptionPlanStats[];
}

export interface SubscriptionEvolutionChartData {
    series: SubscriptionEvolutionSeries[];
}

// GET & POST /admin/subscription-packages
// PATH & DELETE /admin/subscription-packages/{subscription_id}
export interface PackageFormData {
    name: string;
    period: PackagePeriod;
    type: PackageType;
    account_type: FleetType;
    amount: number;
    description: string;
    text_remise: string;
    text_limitation: string;
    driver_number: number;
    vehicle_number: number;
}