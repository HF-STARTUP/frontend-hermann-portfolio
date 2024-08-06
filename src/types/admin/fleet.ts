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
