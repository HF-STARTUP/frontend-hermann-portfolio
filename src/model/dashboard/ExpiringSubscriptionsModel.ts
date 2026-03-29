import { formatNumber } from "@/lib/utils";
import Model from "@/model/Model";
import { ExpiringSubscriptionItem, TrendData } from "@/types/dashboard.type";
import { differenceInDays } from "date-fns";

class ExpiringSubscriptionsModel extends Model {
    private _instance: ExpiringSubscriptionItem;

    constructor(data: ExpiringSubscriptionItem) {
        super();
        this._instance = data;
    }

    static toArrays(datas: ExpiringSubscriptionItem[] | undefined): ExpiringSubscriptionsModel[] {
        if (!datas) return [];
        return datas.map(data => new ExpiringSubscriptionsModel(data));
    }


    get accountId(){
        return this._instance.subscriptionAccountId
    }

    get fleetName(){
        return this._instance.fleetName??""
    }

    get endDate(){
        return this.formatDateTime(this._instance.endDate)
    }

    get getDifference(): number {
        return differenceInDays(new Date(), new Date(this._instance.endDate));
    }
}

export default ExpiringSubscriptionsModel;