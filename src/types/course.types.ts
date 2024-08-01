import {ClientResponseType} from "@/types/client.types";
import {VehiculeResponseType} from "@/types/vehicule.type";
import {TASK_STATUS} from "@/types/entretien.types";
import {AddressInterface} from "@/schema/supplier.schema";

export type CourseResponseType = {
    id: string;
    start_date: Date;
    end_date: Date;
    status: TASK_STATUS;
    amount: number;
    start_at: Date;
    end_at: Date;
    mileage: null;
    vehicle: VehiculeResponseType;
    client: ClientResponseType;
    start_address?: AddressInterface,
    end_address?: AddressInterface,
    distance?: number
}


export type CurrentDriver = {
    id: string;
    first_name: string;
    last_name: string;
    driver_type: string;
}
