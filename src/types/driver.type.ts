import {VehiculeResponseType} from "@/types/vehicule.type";

export type GradeResponseType = {
    id: number;
    name: string;
};

export enum SEXE {
    MEN = "men",
    WOMEN = "women",
}

enum DRIVER_STATUS {
    active = "active",
    inactive = "inactive"
}

export type DriverTypeResponseType = {
    id: number;
    name: string;
};


export type DriverResponseType = {
    id: string;
    user_id: string;
    email: string;
    phone?: string;
    sex: string;
    first_name: string;
    last_name: string;
    birthday: Date;
    place_Birth: string;
    cni_number: string;
    image_id: number;
    role_id: number;
    grade_id: number;
    grade: string;
    driver_type_id: number;
    driver_type: string;
    park_id: string;
    driver_licence_number: string;
    driver_licence_type: string;
    country_licence_delivery: string;
    issue_delivery_on: Date;
    expire_delivery_at: Date;
    daily_recipe: null;
    blocked_at: null;
    desactivate_at: null;
    suspended: boolean;
    blocked_reason: null;
    deleted_at: null;
    can_relay: boolean;
    work_both: boolean;
    work_days_rest: boolean;
    work_only_vehicle: boolean;
    work_when_solicite: boolean;
    status: DRIVER_STATUS;
    available: boolean;
    created_at: Date;
    updated_at: Date;
    country_id: null;
    logo: null;
    day_off: number[];
    days_off: string;
    group_id: null;
    vehicle_principal_id: null;
    vehicle_id: null;
    vehicleConfig_id: null;
    start_work_at: Date;
    role_name_id: null;
    image: string | { path: string };
    Image: { path: string };
    user_DaysOff: any[];
    vehicle?: VehiculeResponseType | null;
    country_delivery: string,
    current_vehicle?: VehiculeResponseType
}

export type UserDaysOff = {
    user_id: string;
    days_off_id: number;
    days_off: GradeResponseType;
}


export type ImageType = {
    id: number;
    path: string;
    width: number;
    height: number;
    size: number;
    format: string;
    maintenance_id: null;
}


export type RoleResponseType = {
    id: number;
    name: string;
}


export type DriverGroupResponseType = {
    id: number;
    name: string;
}

export type DriverObjectiveResponseType = {
    id: string;
    objective: number;
    actual_recipe: number;
    driver: DriverResponseType;
    vehicle: VehiculeResponseType;
}
