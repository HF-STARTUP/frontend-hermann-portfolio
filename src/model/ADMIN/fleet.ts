import Model from "@/model/Model";
import {FleetListResponseType} from "@/types/admin/fleet";


export class FleetModel extends Model {
    private _instance: FleetListResponseType


    constructor(datas: FleetListResponseType) {
        super()
        this._instance = datas
    }

    static fromArray(datas: FleetListResponseType[]): FleetModel[] {
        return datas.map(data => new FleetModel(data)).reverse();
    }

    get id() {
        return this._instance.id
    }

    get name() {
        return this._instance.name
    }

    get ownerName() {
        return this.capitalizeFirstLetter(this._instance.owner.last_name) + " " + this.capitalizeFirstLetter(this._instance.owner.first_name)
    }

    get city() {
        return this._instance.city;
    }

    get number_vehicle() {
        return this._instance.number_vehicle
    }

    get driver_number() {
        return this._instance.driver_number
    }

    get start_date() {
        return this.toDate(this._instance.end_date)
    }

    get end_date() {
        return this.toDate(this._instance.end_date)
    }

    get ca_total() {
        return this._instance.ca_total + this._instance.currency
    }

    get suscription_name() {
        return this._instance.subscription
    }

    get abon_status() {
        return this.getDifferenceInDays(this._instance.start_date, this._instance.end_date) > 0
            ? "Active"
            : "Désactivé"
    }
}



