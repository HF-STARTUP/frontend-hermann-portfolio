import {VehiculeResponseType} from "@/types/vehicule.type";
import {DriverResponseType} from "@/types/driver.type";

export type AccountingResponseType = {
    id: string;
    created_at: Date;
    grade: Grade;
    ecart: null;
    vehicle: VehiculeResponseType;
    other_depense: any[];
    driver_name: DriverName;
    driver_type: DriverType;
    birthday: Date;
    sex: Sex;
    principal_driver_name: DriverName;
    vtc_recipe: number | null;
    course_recipe: null;
    carburant: null;
    vehicle_objective: number;
    currency: Currency;
    cout_entretien_breakdown: null;
    cout_entretien_change: null;
    cout_other_depense: null;
    driver_days_off: string[];
    total_mileage: null;
    total_work_hours: null;
    courses_finished: number;
    courses_recives: number;
    number_stoping: null;
    stoping_time: null;
    operation_date: null;
    components_change: any[];
    components_repair: any[];
}

export enum Currency {
    Xaf = "XAF",
}

export enum DriverName {
    IdrissLeutchuadeu = "idriss leutchuadeu",
    MuskElon = "musk elon",
}

export enum DriverType {
    Interimaire = "interimaire",
    Principal = "principal",
}

export enum Grade {
    Debutant = "debutant",
    Pro = "pro",
}

export enum Sex {
    Men = "men",
}


export enum Model {
    Bx = "BX",
    Cl = "CL",
    The2000Ccs = "2000 C/CS",
}


export type AccountingStateResponseType = {
    total_revenus_current_month: number;
    total_depenses_current_month: number;
    total_revenus_last_month: number;
    total_depenses_last_month: number;
    percent_revenu: Percent;
    percent_depense: Percent;
    resultat: Resultat;
}

export type Percent = {
    status: STATE_STATUS;
    percent: number;
}

export type Resultat = {
    difference_current_month: number;
    difference_last_month: number;
    percent_difference: Percent;
}

export enum STATE_STATUS {
    DOWN = "down",
    UP = "up",
    UNCHANGED = "unchanged"
}

export interface FleetDetailsResponseType {
    currency: string;
    previous_receipts_not_collected: number;
    receipts_expected_today: number;
    actual_recipe: number;
    driver: FleetStat;
    vehicle: FleetStat;
    breakdown: number;
    future_expired_doc: number;
    gps_events: any;
}


export type CreateEntryOrDenpenseInput = {
    park_id: string;
    entry_data?: EntryData;
    depense_data?: DepenseData;
}

type FleetStat = {
    total?: number;
    active?: number;
}

export type DepenseData = {
    operation_date?: Date;
    data?: DepenseDataDatum[];
}

export type DepenseDataDatum = {
    type?: string;
    vehicle_id?: string;
    driver_id?: string;
    type_carburant_id?: number;
    other_depense_id?: number;
    litre_carburant?: number;
    cout_carburant?: number;
    cout_total_other_depese?: number;
    car_component?: CarComponent[];
    vehicles_id?: string[];
    other_depense?: CarComponent[];
}

export type CarComponent = {
    id: number;
    amount: number;
}

export type EntryData = {
    operation_date: Date;
    data: EntryDataDatum[];
}

export type EntryDataDatum = {
    type?: string;
    vehicle_id?: string;
    driver_id?: string;
    amount_collected?: number;
    client_id?: string;
    start_date?: Date;
    end_date?: Date;
    start_address?: Address;
    end_address?: Address;
}

export type Address = {
    name: string;
    description: string;
    longitude: number;
    latitude: number;
}

export type UncollectedRecipesResponseType = {
    id: string;
    amount: number;
    objective: number;
    date: Date;
    driver: DriverResponseType;
    vehicle: VehiculeResponseType;
}

export enum ACCOUNTING_TYPE {
    PROFIT = "profit",
    PERTE = "perte"
}

export type PnlResponseType =
    {
        id: string
        name: string
        park_id: string
    }


export type AccountingPnlResponseType = {
    profits: Pertes;
    pertes:  Pertes;
}

export type Pertes = {
    categories: Category[];
}

export type Category = {
    name:          string;
    months:        { [key: string]: number | null };
    subCategories: SubCategory[];
}

export type SubCategory = {
    name:   string;
    months: { [key: string]: number | null };
}
