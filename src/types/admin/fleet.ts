export type FleetListResponseType = {
    id: string;
    name: string;
    owner: Owner;
    ca_total: number;
    subscription: string;
    start_date: Date;
    end_date: Date;
    country_code: string;
    city: string;
    currency: string;
    number_vehicle: number;
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
