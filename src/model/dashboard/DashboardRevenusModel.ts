import { RevenueData } from "@/app/(webapp)/app/dashboard/_components/RevenusBySource";
import { formatNumber } from "@/lib/utils";
import Model from "@/model/Model";
import { RevenueChartData } from "@/types/dashboard.type";

class DashboardRevenueChart extends Model {
    private _instance: RevenueChartData;

    constructor(data: RevenueChartData) {
        super();
        this._instance = data;
    }

    get labels(): string[] {
        return this._instance.series.map(item => item.period) ?? [];
    }

    get values(): number[] {
        return this._instance.breakdown.map(item => (item.amount)) ?? [];
    }

    get total(): string {
        return formatNumber(this._instance.totalRevenue ?? 0);
    }

    get previousTotal(): string {
        return formatNumber(this._instance.previousPeriodTotal ?? 0);
    }

    get percentChange(): string {
        return `${this._instance.percentChange ? this._instance.percentChange.toFixed(2) : 0}%`;
    }

    get variation(): 'up' | 'down' | 'constant' {
        if (this._instance.percentChange > 0) {
            return 'up';
        } else if (this._instance.percentChange < 0) {
            return 'down';
        } else {
            return 'constant';
        }
    }

    get breakdown(): RevenueData[] {
        return this._instance.breakdown.map(item => ({
            category: item.category.charAt(0).toUpperCase() + item.category.slice(1),
            amount: formatNumber(item.amount),
            percentage: `${item.percentage.toFixed(2)}%`
        })) ?? [];
    }

}

export default DashboardRevenueChart;