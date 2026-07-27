import {ActiveSubscriptionResponseType, Info, Subscription} from "@/types/subscription.types";
import Model from "@/model/Model";
import {differenceInDays} from "date-fns";

export class ActiveSubscriptionAdminModel extends Model {
    private _instance: ActiveSubscriptionResponseType;

    constructor(data: ActiveSubscriptionResponseType) {
        super();
        this._instance = data;
    }

    get id(): string {
        return this._instance.id;
    }

    get startDate(): Date {
        return this._instance.start_date;
    }

    get endDate(): Date {
        return this._instance.end_date;
    }


    get isActive(): boolean {
        return this._instance.is_active;
    }

    get subscriptionPlan(): null {
        return this._instance.subscription_plan;
    }

    get vehicleNumber(): null {
        return this._instance.vehicle_number;
    }

    get offer(): string {
        return this._instance.offer;
    }

    get renew(): boolean {
        return this._instance.renew;
    }

    get amount(): null {
        return this._instance.amount;
    }

    get subscription(): Subscription {
        return this._instance.subscription;
    }

    get info(): Info {
        return this._instance.info;
    }

    get remainingDays(): number {
        return differenceInDays(new Date(this.endDate), new Date(this.startDate));
    }


    static fromArray(datas: ActiveSubscriptionResponseType[]): ActiveSubscriptionAdminModel[] {
        return datas.map(data => ActiveSubscriptionModelAdapter.createActiveSubscriptionModel(data));
    }
}

class ActiveSubscriptionModelAdapter {
    static createActiveSubscriptionModel(data: ActiveSubscriptionResponseType): ActiveSubscriptionAdminModel {
        const adaptedData = {
            ...data,
        };
        return new ActiveSubscriptionAdminModel(adaptedData);
    }
}

class ActiveSubscriptionModelFactory {
    static createActiveSubscriptionModel(data: ActiveSubscriptionResponseType): ActiveSubscriptionAdminModel {
        return ActiveSubscriptionModelAdapter.createActiveSubscriptionModel(data);
    }

    static createActiveSubscriptionModels(datas: ActiveSubscriptionResponseType[]): ActiveSubscriptionAdminModel[] {
        return datas.map(data => this.createActiveSubscriptionModel(data));
    }
}

// Usage example
const apiData: ActiveSubscriptionResponseType[] = [
    // Example data
];

const activeSubscriptionModels = ActiveSubscriptionModelFactory.createActiveSubscriptionModels(apiData);
