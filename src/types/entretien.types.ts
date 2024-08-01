import {VehiculeResponseType} from "@/types/vehicule.type";

export enum ENTRETIEN_REPAIR_TYPE {
    replacement = 1,
    maitenance = 2
}

export enum TASK_STATUS {
    FINISHED = "finished",
    INPROGRES = "inProgres",
    CANCELED = "canceled",
    AWAITING = "awaiting",
}

export type CreateEntretienInputs = {
    supplier_id?: string
    park_id: string
    maintenances: Maintenance[]
    start_date: Date
    end_date: Date,
    description: string,
    images?: File[],
    vehicle_id: string,
}


export type EntretienResponseType = {
    id:          number;
    status:      TASK_STATUS;
    end_date:    Date;
    start_date:  Date;
    description: string;
    amount:      number;
    vehicle:     VehiculeResponseType;
    maintenances: ResponseMaintenance[];
}



export type ResponseMaintenance = {
    id:            number;
    repair_type:   string;
    car_component: CarComponent[];
}

export type CarComponent = {
    id:     number;
    name:   string;
    amount: number;
}

export type Maintenance = {
    repair_type_id: ENTRETIEN_REPAIR_TYPE,
    maintenanceCarComponent: MaintenanceCar[],
}

export type MaintenanceCar = {
    component_id: number,
    amount: number,
}

export type RepaitTypeResponse = {
    id:   number;
    name: string;
}

export type CarComponentResponse = {
    id:   number;
    name: string;
}


export type CreateCarComponentInputs = {
    name: string
}


export type ClientMaintenanceCar = MaintenanceCar & {uid: string}