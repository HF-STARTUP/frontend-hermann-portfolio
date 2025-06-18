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

export type FleetResponseType = {
    id: string;
    start_date: Date;
    end_date: Date;
    is_active: boolean;
    subscription_plan: null;
    vehicle_number: null;
    offer: string;
    renew: boolean;
    amount: null;
    subscription?: Subscription;
    info: Info;
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
    indicateur: string
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


export type RevenusEvolution = {
    item: string
    revenue: number
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