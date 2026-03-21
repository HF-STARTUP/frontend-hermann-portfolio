import { formatNumber } from "@/lib/utils";
import Model from "@/model/Model";
import { DashboardStatsData, TrendData } from "@/types/dashboard.type";

class DashboardMetrics extends Model {
    private _instance: DashboardStatsData;

    constructor(data: DashboardStatsData) {
        super();
        this._instance = data;
    }

    // --- CARTE 1: REVENUS ---
    get revenueAmount() {
        return formatNumber(this._instance.revenue.totalSubscriptions.current);
    }

    get revenueTrend() {
        return this._instance.revenue.totalSubscriptions.percentChange;
    }

    get revenueTrendLabel() {
        return this._instance.revenue.totalSubscriptions.label;
    }

    get revenueVariation(): "up" | "down" | "stable" {
        if (this.revenueTrend > 0) return "up";
        if (this.revenueTrend < 0) return "down";
        return "stable";
    }

    // --- CARTE 2: FLOTTES ---
    get fleetsCurrent() {
        return this._instance.fleets.activeCount.current;
    }

    get fleetsTotal() {
        return this._instance.fleets.totalCount.current;
    }

    get fleetsRatio() {
        return `${this.fleetsCurrent}/${this.fleetsTotal}`;
    }

    get fleetsTrend() {
        return this._instance.fleets.activeCount.percentChange;
    }

    get fleetsVariation(): "up" | "down" | "stable" {
        if (this.fleetsTrend > 0) return "up";
        if (this.fleetsTrend < 0) return "down";
        return "stable";
    }

    // --- CARTE 3: ABONNEMENTS ---
    get subscriptionsCurrent() {
        return this._instance.subscriptions.payingCount.current;
    }

    get subscriptionsTotal() {
        return this._instance.subscriptions.totalCount.current;
    }

    get subscriptionsRatio() {
        return `${this.subscriptionsCurrent}/${this.subscriptionsTotal}`;
    }

    get subscriptionsTrend() {
        return this._instance.subscriptions.payingCount.percentChange;
    }

    get subscriptionVariation(): "up" | "down" | "stable" {
        if (this.subscriptionsTrend > 0) return "up";
        if (this.subscriptionsTrend < 0) return "down";
        return "stable";
    }

    // --- CARTE 4: AUTRES STATS (OU MARKETING) ---

    get marketingCost() {
        return formatNumber(this._instance.revenue.marketingCost.current);
    }

    get marketingTrend() {
        return this._instance.revenue.marketingCost.percentChange;
    }

    get marketingLabel() {
        return this._instance.revenue.marketingCost.label;
    }

    get maketingVariation(): "up" | "down" | "stable" {
        if (this.marketingTrend > 0) return "up";
        if (this.marketingTrend < 0) return "down";
        return "stable";
    }

    get expiringCount() {
        return this._instance.expiringSubscriptionsCount;
    }

    get inactiveFleetsCount() {
        return this._instance.inactiveFleetsCount30Days;
    }

    // --- HELPERS DE COULEUR ---
    getTrendColor(value: number) {
        return value >= 0 ? "text-green-500" : "text-red-500";
    }

    getTrendIcon(value: number) {
        return value >= 0 ? "ArrowUp" : "ArrowDown"; // Pour tes icônes Lucide
    }
}

export default DashboardMetrics;