import { KpiVariation } from "@/components/display/Kpi";
import Model from "@/model/Model";
import { ARCKpiResponseType, ARCStat } from "@/types/at-risk-customers.type";

class ARCKpiModel extends Model {
    private _instance: ARCKpiResponseType;

    constructor(data: ARCKpiResponseType) {
        super();
        this._instance = data;
    }

    static fromResponse(data: ARCKpiResponseType): ARCKpiModel {
        return new ARCKpiModel(data);
    }

    private trendLabel(stat: ARCStat): string {
        const { percent_change } = stat.trend_week;
        if (percent_change === 0) return "Stable";
        return percent_change > 0 ? `+${percent_change}%` : `${percent_change}%`;
    }

    private trendStatus(stat: ARCStat): KpiVariation {
        const { percent_change } = stat.trend_week;
        if (percent_change > 0) return "up";
        if (percent_change < 0) return "down";
        return "stable";
    }

    get discountRequests() {
        return this._instance.discount_requests.count;
    }
    get discountRequestsTrend() {
        return this.trendLabel(this._instance.discount_requests);
    }
    get discountRequestsTrendStatus() {
        return this.trendStatus(this._instance.discount_requests);
    }

    get trainingRequired() {
        return this._instance.training_required.count;
    }
    get trainingRequiredTrend() {
        return this.trendLabel(this._instance.training_required);
    }
    get trainingRequiredTrendStatus() {
        return this.trendStatus(this._instance.training_required);
    }

    get financialDifficulties() {
        return this._instance.financial_difficulties.count;
    }
    get financialDifficultiesTrend() {
        return this.trendLabel(this._instance.financial_difficulties);
    }
    get financialDifficultiesTrendStatus() {
        return this.trendStatus(this._instance.financial_difficulties);
    }

    get pendingFollowUps() {
        return this._instance.pending_follow_ups.count;
    }
    get pendingFollowUpsTrend() {
        return this.trendLabel(this._instance.pending_follow_ups);
    }
    get pendingFollowUpsTrendStatus() {
        return this.trendStatus(this._instance.pending_follow_ups);
    }

    get subscriptionChanges() {
        return this._instance.subscription_changes.count;
    }
    get subscriptionChangesTrend() {
        return this.trendLabel(this._instance.subscription_changes);
    }
    get subscriptionChangesTrendStatus() {
        return this.trendStatus(this._instance.subscription_changes);
    }

    get renewalOpportunities() {
        return this._instance.renewal_opportunities.count;
    }
    get renewalOpportunitiesTrend() {
        return this.trendLabel(this._instance.renewal_opportunities);
    }
    get renewalOpportunitiesTrendStatus() {
        return this.trendStatus(this._instance.renewal_opportunities);
    }
}

export default ARCKpiModel;