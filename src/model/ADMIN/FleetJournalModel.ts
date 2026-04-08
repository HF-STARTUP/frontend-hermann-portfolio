import Model from "@/model/Model";
import { FleetJournalItem } from "@/types/admin/fleet.type";

class FleetJournalModel extends Model {
    private _instance: FleetJournalItem;

    constructor(data: FleetJournalItem) {
        super();
        this._instance = data;
    }

    static toArrays(datas: FleetJournalItem[] | undefined): FleetJournalModel[] {
        if (!datas) return [];
        return datas.map((data) => new FleetJournalModel(data));
    }

    get id(): string {
        return this._instance.id;
    }  

    get vehicleFullName(): string | null {
        if (!this._instance.vehicle) return null;
        const { brand, model, registration_number } = this._instance.vehicle;
        return `${registration_number}-${brand} ${model}`;
    }

    get driverFullName(): string | null {
        if (!this._instance.driver) return null;
        const { first_name, last_name } = this._instance.driver;
        return `${first_name.charAt(0).toUpperCase() + first_name.slice(1)} ${last_name.charAt(0).toUpperCase() + last_name.slice(1)}`;
    }

    get title(): string{
        return this._instance.title;
    }

    get description(): string | null {
        return this._instance.description;
    }

    get causedEvent(): string {
        return this._instance.caused_event;
    }

    get createdAt(): string {
        return this.formatDateTime(this._instance.created_at);
    }
}

export default FleetJournalModel;