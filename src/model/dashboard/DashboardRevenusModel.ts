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
        return this._instance.series.map(item => item.period)??[];
    }

    get values(): number[] {
        return this._instance.series.map(item => item.amount)??[];
    }

    get total(): string {
        return formatNumber(this._instance.totalRevenue??0);
    }
}

export default DashboardRevenueChart;