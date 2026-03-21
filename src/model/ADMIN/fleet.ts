import { PackageType } from "@/app/(webapp)/app/subscriptions/_hooks/usePackageList";
import Model from "@/model/Model";
import {
    AdminOnFleetResponseType,
    FleetListResponseType,
    FleetResponseType,
    Info,
    Subscription
} from "@/types/admin/fleet.type";
import {formatDistanceToNow} from "date-fns";


export class FleetModel extends Model {
    public _instance: FleetListResponseType


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
        return this.formatDate(this._instance.start_date)
    }

    get end_date() {
        return this.formatDate(this._instance.end_date)
    }

    get ca_total() {
        return this._instance.ca_total + " " + this._instance.currency
    }

    get currency() {
        return this._instance.currency
    }

    get subscription_amount() {
        return (this._instance.subscription_amount ? this._instance.subscription_amount + " " : 0 + " ") + this._instance.currency
    }

    get suscription_name(): PackageType | undefined {
        return this._instance.subscription?this._instance.subscription.toUpperCase() as PackageType:undefined;
    }

    get hasActiveSubscription() {
        return !!this._instance.subscription;
    }

    get created_at() {
        return this.formatDate(this._instance.created_at);
    }

    get statusDisplay() {
        return this.hasActiveSubscription ? "active" : "inactive";
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
        return this.formatDate(this._instance.created_at);
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


export class AbonResponseModel extends Model {
    public _instance: FleetResponseType;

    constructor(datas: FleetResponseType) {
        super()
        this._instance = datas;
    }

    static fromArray(datas: FleetResponseType[]): AbonResponseModel[] {
        return datas.map(data => new AbonResponseModel(data)).reverse();
    }

    get id() {
        return this._instance.id;
    }

    get startDate() {
        return this.formatDate(this._instance.start_date);
    }

    get endDate() {
        return `${this.formatDate(this._instance.end_date)} (${this.toDate(this._instance.end_date)} Left)`;
    }

    get abonResume() {
        return `${this.subscription.amount ?? 0}/${this.subscription.period}`;
    }

    get isActive() {
        return this._instance.is_active;
    }

    get subscriptionPlan() {
        return this._instance.subscription_plan;
    }

    get vehicleNumber() {
        return this._instance.vehicle_number;
    }

    get offer() {
        return this._instance.offer;
    }

    get renew() {
        return this._instance.renew;
    }

    get amount() {
        return this._instance.amount;
    }

    get subscription() {
        return new SubscriptionModel(this._instance.subscription);
    }

    get info() {
        return new InfoModel(this._instance.info);
    }

}

export class SubscriptionModel {
    private _instance?: Subscription;

    constructor(datas?: Subscription) {
        this._instance = datas;
    }

    get id() {
        return this._instance?.id ?? "";
    }

    get accountType() {
        return this._instance?.account_type ?? '';
    }

    get subscriptionType() {
        return this._instance?.subscription_type ?? "";
    }

    get period() {
        return this._instance?.period ?? "";
    }

    get code() {
        return this._instance?.code ?? '';
    }

    get name(): string {
        return this._instance?.name ?? "";
    }

    get remise() {
        return this._instance?.remise ?? '';
    }

    get amount() {
        return this._instance?.amount ?? 0;
    }

    get crossedOutAmount() {
        return this._instance?.crossed_out_amount ?? 0;
    }

    get description() {
        return this._instance?.description ?? '';
    }

    get vehicleNumber() {
        return this._instance?.vehicle_number ?? '';
    }

    get driverNumber() {
        return this._instance?.driver_number ?? 0;
    }

    get gps() {
        return this._instance?.gps ?? '';
    }

    get textRemise() {
        return this._instance?.text_remise ?? '';
    }

    get textLimitation() {
        return this._instance?.text_limitation ?? '';
    }

    get createdAt() {
        return this.toDate(this._instance?.created_at ?? new Date());
    }

    get updatedAt() {
        return this.toDate(this._instance?.updated_at ?? new Date());
    }

    get enable() {
        return this._instance?.enable ?? false;
    }

    // Helper methods
    private capitalizeFirstLetter(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    private toDate(date: Date | null): string | null {
        return date ? new Date(date).toLocaleDateString() : null;
    }
}

export class InfoModel {
    private _instance: Info;

    constructor(datas: Info) {
        this._instance = datas;
    }

    get subscriptionVehicleLimit() {
        return this._instance.subscription_vehicle_limit;
    }

    get subscriptionDriverLimit() {
        return this._instance.subscription_driver_limit;
    }

    get gps() {
        return this._instance.gps;
    }

    get currentTotalVehicle() {
        return this._instance.current_total_vehicle;
    }

    get currentTotalDriver() {
        return this._instance.current_total_driver;
    }
}


export type ParkStatResponseType = {
    vehicle: Driver;
    driver: Driver;
    entretien: CaTotal;
    course: CaTotal;
    ca_total: CaTotal;
}

export type CaTotal = {
    total: number;
    indicateur: string;
    indicateur_value: number;
}

export type Driver = {
    total: number;
    indicateur: string;
    indicateur_value: string;
}
