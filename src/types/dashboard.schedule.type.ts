export type TableModeType = 'Hebdo' | 'Mensuelle'
export type PlaningType = 'Chauffeurs' | 'Véhicules'  | 'Agents'

export interface FleetByCityResponseType {
    city_id: number;
    fleet_count: number;
    city_info: CityInfo;
}

export interface CityInfo {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    state_code: null;
    state_id: number;
    country_id: number;
    country: Country;
    state: State;
}

export interface Country {
    id: number;
    name: string;
    currency: string;
    zone: string;
}

export interface State {
    id: number;
    name: string;
}

export interface RevenusRepartitionResponseType {
    total_amount: number;
    currency: string;
    plans: Plan[];
}

export interface Plan {
    subscription_id: string;
    subscription_name: string;
    amount: number;
    percentage: number;
}
