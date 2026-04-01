import Model from "@/model/Model";
import { SubscriptionEvolutionSeries } from "@/types/subscription.types";

export class SubscriptionsEvolutionModel extends Model {
    private _series: SubscriptionEvolutionSeries[];

    constructor(data: { series: SubscriptionEvolutionSeries[] }) {
        super();
        this._series = data.series || [];
    }

  
    get labels(): string[] {
        return this._series.map(s => s.period);
    }

   
    get allPlanNames(): string[] {
        const names = new Set<string>();
        this._series.forEach(s => {
            s.byPlan.forEach(p => names.add(p.planName));
        });
        return Array.from(names);
    }

  
    getPlanData(planName: string): number[] {
        return this._series.map(s => {
            const plan = s.byPlan.find(p => p.planName === planName);
            return plan ? plan.count : 0;
        });
    }
}