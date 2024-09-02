export type SubscriptionPackResponseType = {
    id: string;
    name: string;
    remise: number;
    subscription_type: SubscriptionType;
    text_remise: string;
    text_limitation: string;
    account_type: SubscriptionAccountType;
    description: string;
    advantages: Advantage[];
    amount: number;
    currency: string;
    period: string;
    crossed_out_amount: string;
}

export type Advantage = {
    title: string;
    active: boolean;
}

export enum SubscriptionType {
    Starter = "starter",
    Premium = "premium",
}

export enum SubscriptionAccountType {
    Professionnel = "professionnel",
    Particulier = "particulier"
}

export type CreateSubscriptType = {
    "vehicle_number"?: number,
    "subscription_id"?: string,
    "country_iso_code"?: string,
    "subscription_plan"?: string,
    "payment_method"?: string,
    "operator_id"?: string,
    "phone"?: string,
    "otp"?: string
}

export type InitSubscriptionResponseType = {
    payment_url: string;
    transaction_id: string;
    amount: number;
    currency: string;
    status?: "Failed" | "Success"
}


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
}

export type Info = {
    subscription_vehicle_limit: number;
    subscription_driver_limit: number;
    subscription_vehicle_number: null;
    gps: boolean;
    current_total_vehicle: number;
    current_total_driver: number;
}

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
}

export type OperatorResponseType = {
    id: string;
    name: string;
    title: string;
    type: string;
    country: Country;
    image: string;
}

export type Country = {
    id: number;
    iso_code: string;
}

