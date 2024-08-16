import Model from "@/model/Model";
import {AdminOnFleetResponseType, FleetListResponseType} from "@/types/admin/fleet";
import {formatDistanceToNow} from "date-fns";


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

export class AdminOnFleetModel extends Model {
    private _instance: AdminOnFleetResponseType;

    constructor(datas: AdminOnFleetResponseType) {
        super()
        this._instance = datas;
    }

    static fromArray(datas: AdminOnFleetResponseType[]): AdminOnFleetModel[] {
        return datas.map(data => new AdminOnFleetModel(data)).reverse();
    }

    get id() {
        return this._instance.id;
    }

    get ownerType() {
        return this.capitalizeFirstLetter(this._instance.owner_type);
    }

    get firstName() {
        return this.capitalizeFirstLetter(this._instance.first_name);
    }

    get lastName() {
        return this.capitalizeFirstLetter(this._instance.last_name);
    }

    get username() {
        return this.lastName + " " + this.firstName
    }

    get email() {
        return this._instance.email;
    }

    get phone() {
        return this._instance.phone;
    }

    get code() {
        return this._instance.code;
    }

    get birthday() {
        return this._instance.birthday;
    }

    get placeOfBirth() {
        return this._instance.place_birth;
    }

    get isBlocked() {
        return this._instance.blocked_at !== null;
    }

    get isSuspended() {
        return this._instance.suspended;
    }

    get deactivatedAt() {
        return this._instance.desactivate_at;
    }

    get status() {
        return this._instance.status;
    }

    get createdAt() {
        return formatDistanceToNow(this._instance.created_at);
    }

    get role() {
        return this.capitalizeFirstLetter(this._instance.role);
    }

    get imageUrl() {
        return this._instance.image ? this.resolveImage(this._instance.image) : null;
    }

    get permissions() {
        return this._instance.permissions;
    }

    get etsName() {
        return this.capitalizeFirstLetter(this._instance.ets_name);
    }

    get etsLogo() {
        return this._instance.ets_logo;
    }
}



