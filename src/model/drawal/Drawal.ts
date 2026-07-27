import Model from "@/model/Model";
import {
    DashboardInfosResponseType,
    DRAWAL_MODE,
    DrawalModeType,
    ParkAmontResponseType,
    PaymentInfoType
} from "@/types/drawal.types";

class DrawalModeModel extends Model {
    private _instance: DrawalModeType;

    constructor(datas: DrawalModeType) {
        super();
        this._instance = datas;
    }

    static toArrays(datas: DrawalModeType[]): DrawalModeModel[] {
        return datas.map(data => new DrawalModeModel(data));
    }

    get id(): string {
        return this._instance.id;
    }

    get name(): string {
        return this.capitalizeFirstLetter(this._instance.title);
    }

    get type(): DRAWAL_MODE {
        return this._instance.type;
    }

    get countryId(): number {
        return this._instance.country_id;
    }

    get image(): string {
        return this.resolveImage(this._instance.image);
    }

    get title(): string {
        return this._instance.name;
    }

    public getInfo(): string {
        return `${this.name} operates in ${this.countryId} and supports ${this.type}.`;
    }
}

export class PaymentInfoModel extends Model {
    private _instance: PaymentInfoType;

    constructor(data: PaymentInfoType) {
        super();
        this._instance = data;
    }

    get id(): string {
        return this._instance.id;
    }

    get parkId(): string {
        return this._instance.park_id;
    }

    get title(): string {
        return this._instance.title;
    }

    get last4Digit(): string | null {
        return this._instance.last4Digit;
    }

    get phoneNumber(): string {
        return this._instance.phone_number;
    }

    get cardProcessor(): string | null {
        return this._instance.card_processor;
    }

    get accountNumber(): string | null {
        return this._instance.account_number;
    }

    get withdrawalInfo(): DrawalModeModel {
        return new DrawalModeModel(this._instance.vct_withdraw);
    }

    public getInfo(): string {
        return `Payment info for ${this.title} with phone number ${this.phoneNumber}`;
    }


    static toArrays(datas: PaymentInfoType[]): PaymentInfoModel[] {
        return datas.map(data => new PaymentInfoModel(data));
    }

}


export class ParkAmount extends Model {
    private _instance: ParkAmontResponseType;

    constructor(data: ParkAmontResponseType) {
        super();
        this._instance = data;
    }

    get amount()  {
        return this._instance.amount;
    }

    get curency() {
        return this._instance.currency.name
    }
}


export class DashboardInfos extends Model {
    private _instance: DashboardInfosResponseType;

    constructor(data: DashboardInfosResponseType) {
        super();
        this._instance = data;
    }

    get actuelRecipe()  {
        return this._instance.actual_recipe;
    }

    get todayExceptedRecip()  {
        return this._instance.receipts_expected_today;
    }

    get curency() {
        return this._instance.currency
    }
}

export default DrawalModeModel;


