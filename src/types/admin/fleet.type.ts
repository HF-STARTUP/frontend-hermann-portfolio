import { PackageType } from "@/app/(webapp)/app/subscriptions/_hooks/usePackageList";
import { PaginationResponse } from "../dashboard.type";

export type FleetListResponseType = {
    id: string;
    name?: string;
    owner: Owner;
    ca_total: number;
    subscription: string;
    start_date: Date;
    end_date: Date;
    country_code: string;
    city: string;
    currency: string;
    number_vehicle: number;
    subscription_amount: number;
    driver_number: number;
    created_at: Date;
}

type Owner = {
    first_name: string;
    last_name: string;
}

export type AdminOnFleetResponseType = {
    id: string;
    owner_type: string;
    first_name: string;
    email: string;
    code: string;
    phone: string;
    last_name: string;
    birthday: null;
    place_birth: null;
    blocked_at: null;
    suspended: boolean;
    desactivate_at: null;
    status: string;
    created_at: Date;
    role: string;
    image: string;
    permissions: string[];
    ets_name: string;
    ets_logo: string;
}

export interface FleetSubscriptionTransaction {
    id: string;
    transaction_type: string;
    course_id: string | null;
    subscription_account_id: string;
    payment_method: string;
    invoice_id: string | null;
    collect_type: string;
    status: "success" | "pending" | "failed" | string;
    subscription_end_date: string; // ISO Date string
    yango_recipe: any | null;
    subscription_number_vehicle_upgrage: number | null;
    amount: number;
    sold_before: number | null;
    sold_after: number | null;
    fees: number;
    commission: number;
    park_id: string | null;
    operator_id: string;
    withdraw_on_park_id: string | null;
    withdraw_on_driver_id: string | null;
    payer_phone_number: string | null;
    driver_profile_id: string | null;
    vehicle_id: string | null;
    owner_profile_id: string;
    profile_who_perform_withdraw_id: string | null;
    profile_who_perform_credit_id: string | null;
    reason: string | null;
    external_references: any | null;
    external_flw_references: any | null;
    from_recuring_payment: boolean;
    vtc_withdraw_on_caisse_id: string | null;
    account_reference_id: string | null;
    bank_reference: string | null;
    objective_date: string | null;
    objective: any | null;
    created_at: string; // ISO Date string
    update_at: string;  // ISO Date string
    subscriptionId: string | null;
    recipe_id: string | null;
    caisse_id: string | null;
    compte_id: string | null;
    compte_source_id: string | null;
    caisse_source_id: string | null;
    compte_receive_id: string | null;
    caisse_receive_id: string | null;
    confirme_operation_id: string | null;
    supplier_id: string | null;
    manager_profile_id: string | null;
    vehicle_owner_id: string | null;
    promo_code_id: string | null;
  }
export type SubscriptionStatus  = "using" | "paid" | "expired" | "active" | "inactive" | "deleted" | "suspended"
export type FleetResponseType = {
    id: string;
    start_date: Date;
    end_date: Date;
    is_active: boolean;
    subscription_plan: string;
    vehicle_number: null;
    offer: SubscriptionStatus;
    renew: boolean;
    amount: null;
    subscription?: Subscription;
    info: Info;
    transactions: FleetSubscriptionTransaction[];
    status : SubscriptionStatus;
    subscriptionType: string
}

export interface FleetSubscriptionsResponseData extends PaginationResponse {
    data: FleetResponseType[]
}

export type PaymentMethodsType = "intern"|"wave"|"flutterwave"|"paystack"|"google"| "apple"|"cash"

export interface FleetSubscriptionParams{
    itemPerPage?: number;
    page?: number;
    type?: PackageType;
    method?: PaymentMethodsType;
    plan?: "monthly" | "yearly";
    start_date?: string;
    end_date?: string
}

export type Info = {
    subscription_vehicle_limit: number;
    subscription_driver_limit: number;
    gps: boolean;
    current_total_vehicle: number;
    current_total_driver: number;
}

export type Subscription = {
    id: string;
    account_type: null;
    subscription_type: string;
    period: string;
    code: null;
    name?: string;
    remise: null;
    amount: null;
    crossed_out_amount: null;
    description: null;
    vehicle_number: number;
    driver_number: number;
    gps: boolean;
    text_remise: null;
    text_limitation: null;
    created_at: Date;
    updated_at: Date;
    enable: boolean;
}

export type BestDiverAndVehicleResponseType = {
    best_driver: BestDriver;
    best_vehicle: BestVehicle;
}


export type BestDriver = {
    profile: Profile;
    value: number;
}

export type Profile = {
    id: string;
    first_name: string;
    last_name: string;
    phone: string;
    email: null;
    driver_type: string;
    image: string;
    grade: string;
}

export type BestVehicle = {
    vehicle: Vehicle;
    value: number;
}

export type Vehicle = {
    id: string;
    brand: string;
    model: string;
    color: string;
    registration_number: string;
    label: null;
    image: string;
}


export type ParkDetailsResponseType = {
    flotte: CaTotal
    vehicle: CaTotal
    driver: CaTotal
    ca_total: CaTotal
    flux: CaTotal
    subscription_prevision: SubscriptionPrevision
}

export interface SubscriptionPrevision {
    total: number
    vehicle_number: number
    driver_number: number
    indicateur: number
    indicateur_value: number
}

export type CaTotal = {
    total: number
    indicateur: 'up' | 'down' | 'stable',
    indicateur_value: string
}

export type DashboardBestAndLeastProfilableResponseType = {
    most_profitable: StProfitable
    least_profitable: StProfitable
}

export type StProfitable = {
    id: string
    name: string
    ca_total: number
    total_vehicle: number
    flux: number
}


export interface RevenusEvolution {
    currency: string;
    data: Datum[];
    revenue: number,    
    item: string,
}

export interface Datum {
    item: string;
    subscription: number;
    amount: number;
}



export type CarburantEvolution = {
    item: string
    data: Carburant
}

export type Carburant = {
    carburant: number
    breakdown: number
    change: number
}

export interface ProfitableListResponseType {
    id: string;
    park_name: string;
    type: string;
    vehicle_number: number;
    flux: number;
    currency: string;
}



//////////////////////////////////////////////////


// Fleet overview interfaces

export interface MetricGrowth {
    current_month: number;
    last_month: number;
    delta_percent: number;
}

export interface MetricCount {
    count: number;
}

export interface FleetOverviewData {
    revenue: MetricGrowth;
    vehicles: MetricCount;
    drivers: MetricCount;
    transactions: MetricGrowth;
}


// Fleet profile details interfaces
export interface FleetOwner {
    first_name: string;
    last_name: string;
}

export interface FleetProfileData {
    id: string;
    fleet_id: string;
    fleet_name: string;
    created_at: string;
    account_type: string;
    country: string;
    country_code: string;
    city: string;
    currency: string;
    owner: FleetOwner;
    owner_email: string;
    owner_phone: string;
}


// Fleet journal interfaces

export interface FleetJournalVehicle {
    id: string;
    registration_number: string;
    brand: string;
    model: string;
}

export interface FleetJournalDriver {
    id: string;
    first_name: string;
    last_name: string;
}

export interface FleetJournalItem {
    id: string;
    created_at: string;
    caused_event: string;
    title: string;
    description: string;
    vehicle: FleetJournalVehicle | null;
    driver: FleetJournalDriver | null;
}

export interface FleetJournalData extends PaginationResponse{
    data: FleetJournalItem[];
}