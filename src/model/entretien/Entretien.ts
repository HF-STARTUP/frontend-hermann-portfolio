import {DriverResponseType} from "@/types/driver.type";
import Model from "@/model/Model";
import {ActivityVariant} from "@/components/box/AdminListItemComponents";
import {
    CarComponentResponse,
    ENTRETIEN_REPAIR_TYPE,
    EntretienResponseType,
    RepaitTypeResponse
} from "@/types/entretien.types";
import Vehicle from "@/model/vehicule/Vehicule";


class Entretien extends Model {
    private _instance: EntretienResponseType


    constructor(datas: EntretienResponseType) {
        super()
        this._instance = datas
    }

    static toArrays(datas: EntretienResponseType[]): Entretien[] {
        return datas.map(data => new Entretien(data));
    }

    get id() {
        return this._instance.id
    }

    get description() {
        return this._instance.description
    }

    get amount() {
        return this._instance.amount
    }

    get status() {
        return this._instance.status
    }

    get startAt() {
        return this.formatDate(this._instance.start_date)
    }

    get startHour() {
        return this.formatDate(this._instance.start_date, "H : m")
    }

    get vehicle(): Vehicle {
        return new Vehicle(this._instance.vehicle)
    }

    get vehicleName() {
        return this.vehicle.getFullName ?? ''
    }

    get entretienContent() {
        const maintenanceTitle = this._instance.maintenances.length ? this._instance.maintenances[0].repair_type : this._instance.description
        const maintenanceContent = this._instance.maintenances.length ? this._instance.maintenances[0].car_component.map(v => v.name).join(', ') : ''

        return `${maintenanceTitle} (${maintenanceContent})`
    }

    get vehicleCover() {
        return this.vehicle.getCover
    }
}

export class RepairType extends Model {
    private _instance: RepaitTypeResponse

    constructor(datas: RepaitTypeResponse) {
        super()
        this._instance = datas
    }

    public static toArrays(datas: RepaitTypeResponse[] | undefined): RepairType[] {
        if (!datas) return []
        return datas.map(data => new RepairType(data));
    }

    get id(): ENTRETIEN_REPAIR_TYPE {
        return this._instance.id as ENTRETIEN_REPAIR_TYPE
    }

    get name() {
        return this.capitalizeFirstLetter(this._instance.name ?? '')
    }

}


export class CarComponent extends Model {
    _instance: CarComponentResponse

    constructor(datas: CarComponentResponse) {
        super()
        this._instance = datas
    }

    public static toArrays(datas: CarComponentResponse[] | undefined): CarComponent[] {
        if (!datas) return []
        return datas.map(data => new CarComponent(data));
    }

    get name() {
        return this.capitalizeFirstLetter(this._instance.name ?? 'inedexed')
    }

    get id() {
        return this._instance.id
    }


}


export default Entretien;

