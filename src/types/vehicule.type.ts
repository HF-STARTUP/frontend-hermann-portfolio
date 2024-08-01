import {AddVehiculeOwnerInputs} from "@/schema/vehicule.schema";
import {DriverResponseType, ImageType} from "@/types/driver.type";
import {RegionType} from "@/types/__form/profile.type";

enum DRIVER_TYPE {
    principal = "principal",
    interimaire = "interimaire"
}

interface CurrentlDriver {
    id: string
    first_name: string,
    last_name: string,
    driver_type: DRIVER_TYPE,
    image: string
}

export enum VEHICLE_STATUS {
    ACTIVE = 'active',
    ASSIGN = 'assign',
    MAINTAIN = 'maintain',
    DEACTIVATED = 'deactivated',
    RESERVE = 'reserve'
}

export type VehiculeBrandType = {
    id: number;
    name: string;
    created_at: Date;
    updated_at: null;
    deleted_at: null;
}


export type VehiculeBrandResponseType = {
    data: VehiculeBrandType[];
    totalRecords: number;
    totalPages: number;
    currentPage: number;
    itemPerPage: number;
}

export type VehiculeTypeResponseType = {
    id: number;
    name: string;
}


export type VehiculeModelResponseType = {
    data: VehiculeModelType[];
    totalRecords: number;
    totalPages: number;
    currentPage: number;
    itemPerPage: number;
}

export type VehiculeModelType = {
    id: number;
    name: string;
    created_at: Date;
    updated_at: null;
    deleted_at: null;
}

export type VehiculeContratTypeResponseType = {
    id: number;
    name: string;
}

export type VehiculeColorType = {
    id: number;
    name: string;
}

export type CurencyResponseType = {
    id: number;
    name: string;
    country_code: string;
}

export type VehiculeOwnerResponseType = {
    id: number;
} & AddVehiculeOwnerInputs

export type VehiculeResponseType = {
    id:                        string;
    status:                    VEHICLE_STATUS;
    available:                 boolean;
    manage_recipe_in_vtc:      boolean;
    mileage:                   number;
    chassis_number:            string;
    gps_number:                string;
    entry_fleet_at:            Date;
    circulation_at:            Date;
    insurance_subscription_at: Date;
    vehicleCourseConfig:       VehicleCourseConfig[];
    vehicle_document:          any[];
    registration_number:       string;
    label:                     string;
    desactivate_at:            Date;
    brand:                     string | { name: string };
    model:                     string | { name: string };
    image:                     string;
    images:                    Image[];
    recipe:                    Recipe[];
    recipes:                    Recipe[];
    vehicle_config:            VehicleConfig;
    driver:                    Driver[];
    current_driver:            Driver;
    color:                     string;
    vehicleConfig?:            vehicleConfigResponse

    //SETUP UPDATE MODE
    color_id: number
    brand_id: number
    model_id: number
    vehicle_type_id: number
    owner_id: number

    vehicle_image: {
        path: string
    }
}


export type Driver = {
    id:          string;
    first_name:  string;
    last_name:   string;
    driver_type: string;
    image:       string;
}

export type Image = {
    id:   number;
    path: string;
}

export type TimePeriod = "weekly" | "monthly" | "daily" | "day" | "month" | "week"

export type Recipe = {
    manage_in_vtc:     boolean;
    freequency:        TimePeriod;
    collection_type:   string;
    amount:            number;
    collection_method: string;
}

export type VehicleCourseConfig = {
    tarif:   number;
    cadence: TimePeriod;
}

export type VehicleConfig = {
    driver_number_authorized: number;
}

export type Region = {
    id:         number;
    name:       string;
    zone:       null;
    latitude:   null;
    longitude:  null;
    account_id: string;
    city_id:    number;
}

export type ContractTypeResponseType = {
    id: number;
    name: string;
    country_code: string;
}

export type TagResponseType = {
    id: number;
    name: string;
}

export type VehicleTagResponseType = {
    vehicle_id: number;
    tag_id: number;
    tag: TagResponseType;
}

export type VehiculeGroupResponseType = {
    id: number;
    name: string;
}


export type vehicleConfigResponse = {
    id:             number;
    vehicle_id:     string;
    cadence:        string;
    start_date:     null;
    passation_date: null;
    end_date:       null;
    work_program:   null;
    number_drivers: number;
    profiles:       Profile[];
}

export type Profile = {
    id:          string;
    first_name:  string;
    last_name:   string;
    driver_type: DriverType;
}

export type DriverType = {
    id:   number;
    name: string;
}
