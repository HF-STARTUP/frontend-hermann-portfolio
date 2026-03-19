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

    get isRevenueUp() {
        return this.revenueTrend >= 0;
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

    get isFleetsUp() {
        return this.fleetsTrend >= 0;
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

    get isSubscriptionsUp() {
        return this.subscriptionsTrend >= 0;
    }

    // --- CARTE 4: AUTRES STATS (OU MARKETING) ---
    // Note: Si ton JSON ne contient pas encore le marketing, 
    // on utilise les autres compteurs dispos dans ton interface.
    
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