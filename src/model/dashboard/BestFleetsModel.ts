import { formatNumber } from "@/lib/utils";
import Model from "@/model/Model";
import { BestFleetItem } from "@/types/dashboard.type";

class BestFleetModel extends Model {
    private _instance: BestFleetItem;

    constructor(data: BestFleetItem) {
        super();
        this._instance = data;
    }

    static toArrays(datas: BestFleetItem[] | undefined): BestFleetModel[] {
        if (!datas) return [];
        return datas.map(data => new BestFleetModel(data));
    }

    get id(): string {
        return this._instance.park_id;
    }

    get name(): string {
        return this.capitalizeFirstLetter(this._instance.name);
    }

    get location(): string {
        return `${this._instance.city}, ${this._instance.country}`;
    }

    get vehicleCount(): number {
        return this._instance.vehicleCount;
    }

    get subscriptionName(): string {
        return this._instance.subscriptionName ?? "Aucun abonnement";
    }

    get hasSubscription(): boolean {
        return !!this._instance.subscriptionName;
    }

    get totalAmount(): number {
        return this._instance.totalSubscriptionAmount;
    }

    get formattedTotalAmount(): string {
        return formatNumber(this._instance.totalSubscriptionAmount);
    }

    // --- Flux Financiers ---
    get flowIn(): number {
        return this._instance.flowIn;
    }

    get flowOut(): number {
        return this._instance.flowOut;
    }

    get netFlow(): number {
        return this._instance.netFlow;
    }

    get formattedNetFlow(): string {
        return formatNumber(this._instance.netFlow);
    }

    /**
     * Retourne une couleur ou une variante selon si le flux net est positif ou négatif
     */
    get netFlowStatus(): "positive" | "negative" | "neutral" {
        if (this._instance.netFlow > 0) return "positive";
        if (this._instance.netFlow < 0) return "negative";
        return "neutral";
    }
}

export default BestFleetModel;