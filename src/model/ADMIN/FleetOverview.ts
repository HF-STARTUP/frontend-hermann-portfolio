import { formatNumber } from "@/lib/utils";
import Model from "@/model/Model";
import { FleetOverviewData, MetricGrowth } from "@/types/admin/fleet.type";

class FleetOverview extends Model {
    private _instance: FleetOverviewData;

    constructor(data: FleetOverviewData) {
        super();
        this._instance = data;
    }

    // --- Revenue ---
    get revenue(): MetricGrowth {
        return this._instance.revenue;
    }

    get revenueAmount(): string {
        return formatNumber(this._instance.revenue.current_month ?? 0);
    }

    get revenuePercentage(): string {
        return `${formatNumber(this._instance.revenue.delta_percent)}% ce mois`;
    }

    get revenueTrend(): "up" | "down" | "stable" {
        return this._instance.revenue.delta_percent > 0
            ? "up"
            : this._instance.revenue.delta_percent < 0
                ? "down"
                : "stable";
    }

    // --- Vehicles ---
    get vehicles(): string {
        return formatNumber(this._instance.vehicles.count ?? 0);
    }

    // --- Drivers ---
    get driversCount(): string {
        return formatNumber(this._instance.drivers.count ?? 0);
    }


    // --- Transactions ---
    get transactions(): MetricGrowth {
        return this._instance.transactions;
    }

    get transactionPercentage(): string {
        return `${formatNumber(this._instance.transactions.delta_percent)}% ce mois`;
    }

    get transactionCount(): string {
        return formatNumber(this._instance.transactions.current_month);
    }

    get transactionTrend(): "up" | "down" | "stable" {
        return this._instance.transactions.delta_percent > 0
            ? "up"
            : this._instance.transactions.delta_percent < 0
                ? "down"
                : "stable";
    }

    /**
     * Helper pour déterminer si une tendance est positive
     */
    isPositiveTrend(metric: 'revenue' | 'transactions'): boolean {
        return this._instance[metric].delta_percent > 0;
    }
}

export default FleetOverview;