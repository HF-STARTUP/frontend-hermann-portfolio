import { PackageType } from "@/app/(webapp)/app/subscriptions/_hooks/usePackageList";
import { PaginationResponse } from "../dashboard.type";


// Get fleets params
export type FleetType = "particulier" | "professionnel";

export type ParkType = "fleet_vtc" | "fleet";

export type FleetStatus = "new" | "active" | "inactive" | "locked" | "deactivated" | "gps_configuration_pending";

export type PaymentMethodsType = "intern" | "wave" | "sold" | "flutterwave" | "paystack" | "google" | "apple" | "cash";


export type SubscriptionName = "premium_entreprise" | "essentiel_entrepreneur" | "premium_entrepreneur" | "starter_entrepreneur" | "essentiel_entreprise" | "none";

export type SubscriptionPeriod = "monthly" | "yearly";

export type SortOrder = "recent" | "oldest";

export type ActivationStatus = "activated_7d" | "activated_14d" | "activated_30d" | "not_activated";

export type FirstAction = "promo_code_used" | "vehicle_created" | "driver_created" | "first_payment" | "first_entretien" | "first_checkup";

export type SubscriptionStatus  = "using" | "paid" | "expired" | "active" | "inactive" | "deleted" | "suspended" | "failed" | "free"


export type TransactionDirection = "incoming" | "outgoing";
export type TransactionStatus = "init" | "success" | "failed" | "pending" | "unpaid";
export type TransactionType = "vtc_recipe" | "course_recipe" | "withdrawal" | "resolve_debt" | "paid_recipe_expected_today" | "subscription" | "subscription_extension" | "subscription_upgrade_vehicle" | "resolve_debt_without_objective" | "credit_account" | "credit_sold" | "debit_sold" | "exceptional_payment" | "recoverable_advance" | "external_payments" | "change_subscription" | "resolve_contraventions" | "transfert_internal_credit" | "transfert_internal_debit" | "penalty_payment";
export type OrderBy = "asc" | "desc";


// // Interface pour les données du formulaire
export interface FleetRegisterFormData {
    first_name: string;
    name: string;
    email: string;
    phone: string;
    city_id: string;
    owner_type: FleetType;
    currency_id: string;
    uuid_code?: string;
    password?: string;
    pin_code?: string;
    last_name?: string;
    parkActivity_id?: string;
    subscription_id?: string;
    fcm_token_vtc?: string;
    fcm_token_web?: string;
    fcm_token_vtc_driver?: string;
    apn_token_vtc?: string;
    apn_token_vtc_driver?: string;
    legal_notice?: string;
    demo_days?: string;
    logo?: File | string;
    profile_id?: string
  }

export interface GetFleetsParams {
  city_id?: string;
  itemPerPage?: number;
  page?: number;
  type?: FleetType;
  park_type?: ParkType;
  status?: FleetStatus;
  subscription_id?: string;
  subscription_method?: PaymentMethodsType;
  subscription_name?: SubscriptionName;
  subscription_code?: string;
  subscription_period?: SubscriptionPeriod;
  park_id?: string;
  name?: string;
  created_from?: string;
  created_to?: string;
  start_date?: string;
  end_date?: string;
  sort?: SortOrder;
  vehicles_count_min?: number;
  vehicles_count_max?: number;
  drivers_count_min?: number;
  drivers_count_max?: number;
  transactions_amount_min?: number;
  transactions_amount_max?: number;
  include_activation_tracking?: boolean;
  activation_status?: ActivationStatus;
  is_activated?: boolean;
  has_vehicle?: boolean;
  has_driver?: boolean;
  has_piloting_action?: boolean;
  first_actions?: FirstAction[];
}

export type OperatorRevenusInputs = {
    start_date: string
    end_date: string
    currency_id?: string
    type?: string
    city_id?: string
}

export type FleetByCityInputs = {
    country_id?: string
}


export type SubscriptionPlanRevenusInputs = {
    start_date: string
    end_date: string
    currency_id?: string
}

export type ProfitableListInputs = {
    type: string
    city_id: string
    currency_id?: string
}

export interface OperatorRevenueResponse {
    operator_id: string;
    operator_name: string;
    country_name: string;
    total_amount: number;
    currency: string;
    path?: string
}

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
    status: FleetStatus,
    logo?: string
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
    logo?: string;
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





//  Transactions history

// Kpi response data

export interface TransactionKpiData {
    period: {
        start_date: string;
        end_date: string;
    };
    incoming: {
        count: number;
        total_amount: number;
    };
    outgoing: {
        count: number;
        total_amount: number;
    };
    total_fees: number;
    total_commission_vtcc: number;
}

// List data params

export interface TransactionHistoryParams {
    temPerPage?: number;
    page?: number;
    park_id?: string;
    direction?: TransactionDirection;
    status?: TransactionStatus;
    type?: TransactionType;
    exclude_type?: string;
    start_date?: string;
    phone?: string;
    end_date?: string;
    driver_id?: string;
    vehicle_id?: string;
    operator_id?: string;
    groupe_id?: number;
    vtc_withdraw_id?: string;
    operator_name?: PaymentMethodsType;
    order_by?: OrderBy;
    currency_id?: number;
}

// list data response 

export interface TransactionOperator {
    id: string;
    name: string;
    title: string;
    image: string;
}

export interface TransactionProfile {
    id: string;
    first_name: string;
    last_name: string;
}

export type TransactionHistoryItem = {
    id: string;
    status: TransactionStatus;
    created_at: string;
    amount: number;
    transaction_type: TransactionType;
    fees: number;
    commission: number | null;
    payment_method: PaymentMethodsType | null;
    collect_type: string;
    reason: string | null;
    sold_before: number | null;
    sold_after: number | null;
    operator: TransactionOperator | null;
    withdraw_on_park: any | null;
    profile_who_perform_credit: TransactionProfile | null;
    profile_who_perform_withdraw: TransactionProfile | null;
    label: string;
};

export interface TransactionHistoryData extends PaginationResponse{
    data: TransactionHistoryItem[]
}

// FLeets KPI

export interface Period {
    start_date: string;
    end_date: string;
}

export interface KpiMetric {
    current: number;
    previous: number;
    percentChange: number;
    label: string;
}

export interface FleetsKpiData {
    period: Period;
    previous_period: Period;
    totalFleets: KpiMetric;
    activeFleets: KpiMetric;
    inactiveFleets: KpiMetric;
    deletedFleets: KpiMetric;
}

// //////////////////////////////////////////////////////////////

// Suspend fleet data
export interface SuspendFleetData{
    reason?: string,
    park_id?: string 
}