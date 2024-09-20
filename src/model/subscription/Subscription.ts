import {
    Advantage,
    SubscriptionAccountType,
    SubscriptionPackResponseType,
    SubscriptionType
} from "@/types/subscription.types";
import Model from "@/model/Model";

export class SubscriptionModel extends Model {
    public _instance: SubscriptionPackResponseType

    constructor(data: SubscriptionPackResponseType) {
        super()
        this._instance = data
    }

    get id(): string {
        return this._instance.id;
    }

    get name(): string {
        return this.capitalizeFirstLetter(this._instance.name);
    }

    get color(): 'blue' | 'red' | 'yellow' {
        return this.account_type === SubscriptionAccountType.Particulier ? "red" : "yellow"
    }

    get remise(): number {
        return this._instance.remise;
    }

    get subscription_type(): SubscriptionType {
        return this._instance.subscription_type;
    }

    get text_remise(): string {
        return this._instance.text_remise;
    }

    get text_limitation(): string {
        return this._instance.text_limitation;
    }

    get account_type(): SubscriptionAccountType {
        return this._instance.account_type;
    }

    get description(): string {
        return this._instance.description;
    }

    get advantages(): Advantage[] {
        return this._instance.advantages;
    }

    get amount(): number {
        return this._instance.amount;
    }

    get currency(): string {
        return this._instance.currency;
    }

    static fromArray(datas: SubscriptionPackResponseType[]): SubscriptionModel[] {
        return datas.map(data => SubscriptionModelAdapter.createSubscriptionModel(data));
    }
}


class SubscriptionModelAdapter {
    static createSubscriptionModel(data: SubscriptionPackResponseType): SubscriptionModel {
        const adaptedData = {
            ...data,
        };
        return new SubscriptionModel(adaptedData);
    }
}

class SubscriptionModelFactory {
    static createSubscriptionModel(data: SubscriptionPackResponseType): SubscriptionModel {
        return SubscriptionModelAdapter.createSubscriptionModel(data);
    }

    static createSubscriptionModels(datas: SubscriptionPackResponseType[]): SubscriptionModel[] {
        return datas.map(data => this.createSubscriptionModel(data)).reverse();
    }
}

// Usage example
const apiData: SubscriptionPackResponseType[] = [
    // Example data
];

const subscriptionModels = SubscriptionModelFactory.createSubscriptionModels(apiData);
