import DashboardMetrics from "@/model/dashboard/MetricsModel";
import Service from "./Service";
import { DashboardParams, DashboardStatsData, RevenueChartData } from "@/types/dashboard.type";
import { toQueriesString } from "@/lib/utils";
import DashboardRevenueChart from "@/model/dashboard/DashboardRevenusModel";

export enum DashBoardApiRoutes {
    GetMetrics = "/admin-dashboard/metrics",
    GetRevenueChartData = "/admin-dashboard/revenue-chart",
}



class DashboardService extends Service {

    private static instance: DashboardService = new DashboardService();

    constructor() {
        super('');
    }

    private static getInstance() {
        return DashboardService.instance;
    }

    // Get Dashboard Metrics
    static async getMetrics(params?:DashboardParams) {
            const url = toQueriesString(DashBoardApiRoutes.GetMetrics, params)
            const response = await DashboardService.getInstance().execHttpRequest<DashboardStatsData>({
                url: url,
                method: DashboardService.getInstance().httpMethods.get,
            })

            return new DashboardMetrics(response)
        }
    // Invalidate Metrics query
    static invalidateMetrics() {
        return DashboardService.getInstance().queryClient.invalidateQueries({queryKey: [DashBoardApiRoutes.GetMetrics]})
    } 
    
    
    // Get Dashboard Revenus Chart Data
    static async getRevenueChartData(params?:DashboardParams) {
        const url = toQueriesString(DashBoardApiRoutes.GetRevenueChartData, params)
        const response = await DashboardService.getInstance().execHttpRequest<RevenueChartData>({
            url: url,
            method: DashboardService.getInstance().httpMethods.get,
        })

        return new DashboardRevenueChart(response);
    }

     // Invalidate Revenus Chart Data query
     static invalidateRevenueChartData() {
        return DashboardService.getInstance().queryClient.invalidateQueries({queryKey: [DashBoardApiRoutes.GetRevenueChartData]})
    }

}

export default DashboardService;