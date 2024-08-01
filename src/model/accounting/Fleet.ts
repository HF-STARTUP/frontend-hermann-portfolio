import Model from "@/model/Model";
import {FleetDetailsResponseType} from "@/types/Accounting.types";

export class FleetDetailsModel extends Model {
    private _instance: FleetDetailsResponseType;

    constructor(data: FleetDetailsResponseType) {
        super();
        this._instance = data;
    }

    get currency(): string {
        return this._instance.currency;
    }

    get previousReceiptsNotCollected(): number {
        return this._instance.previous_receipts_not_collected;
    }

    get receiptsExpectedToday(): number {
        return this._instance.receipts_expected_today;
    }

    get futureExpiredDoc(): number {
        return this._instance?.future_expired_doc ?? 0;
    }

    get actualRecipe(): number {
        return this._instance.receipts_expected_today;
    }

    get driverTotal(): number {
        return this._instance.driver.total ?? 0;
    }

    get driverActive(): number {
        return this._instance.driver.active ?? 0;
    }

    get vehicleTotal(): number {
        return this._instance.vehicle.total ?? 0;
    }

    get vehicleActive(): number {
        return this._instance.vehicle.active ?? 0;
    }

    get breakdown(): number {
        return this._instance.breakdown;
    }

    get gpsEvents(): any {
        return this._instance.gps_events;
    }

    static fromArray(datas: FleetDetailsResponseType[]): FleetDetailsModel[] {
        return datas.map(data => new FleetDetailsModel(data));
    }
}
