import DashboardMetrics from "@/model/dashboard/MetricsModel";
import Service from "./Service";
import { BestFleetPaginationData, DashboardParams, DashboardStatsData, RevenueChartData } from "@/types/dashboard.type";
import { toQueriesString } from "@/lib/utils";
import DashboardRevenueChart from "@/model/dashboard/DashboardRevenusModel";
import BestFleetModel from "@/model/dashboard/BestFleetsModel";

export enum DashBoardApiRoutes {
    GetMetrics = "/admin-dashboard/metrics",
    GetRevenueChartData = "/admin-dashboard/revenue-chart",
    GetBestFleets = "/admin-dashboard/best-fleets",
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
    static async getMetrics(params?: DashboardParams) {
        const url = toQueriesString(DashBoardApiRoutes.GetMetrics, params)
        const response = await DashboardService.getInstance().execHttpRequest<DashboardStatsData>({
            url: url,
            method: DashboardService.getInstance().httpMethods.get,
        })

        return new DashboardMetrics(response)
    }
    // Invalidate Metrics query
    static invalidateMetrics() {
        return DashboardService.getInstance().queryClient.invalidateQueries({ queryKey: [DashBoardApiRoutes.GetMetrics] })
    }


    // Get Dashboard Revenus Chart Data
    static async getRevenueChartData(params?: DashboardParams) {
        const url = toQueriesString(DashBoardApiRoutes.GetRevenueChartData, params)
        const response = await DashboardService.getInstance().execHttpRequest<RevenueChartData>({
            url: url,
            method: DashboardService.getInstance().httpMethods.get,
        })

        return new DashboardRevenueChart(response);
    }

    // Invalidate Revenus Chart Data query
    static invalidateRevenueChartData() {
        return DashboardService.getInstance().queryClient.invalidateQueries({ queryKey: [DashBoardApiRoutes.GetRevenueChartData] })
    }



    // get Dashboard paginated best fleets
    static async getBestFleets(params?: DashboardParams) {
        const url = toQueriesString(DashBoardApiRoutes.GetBestFleets, params)
        const response = await DashboardService.getInstance().execHttpRequest<BestFleetPaginationData>({
            url: url,
            method: DashboardService.getInstance().httpMethods.get,
        });

        return {
            fleets: BestFleetModel.toArrays(response.data),
            totalPages: response.totalPages,
            totalRecords: response.totalRecords,
            currentPage: response.currentPage,
            itemPerPage: response.itemPerPage
        }
    }

    // Invalidate best fleets query
    static invalidateBestFleets() {
        return DashboardService.getInstance().queryClient.invalidateQueries({ queryKey: [DashBoardApiRoutes.GetBestFleets] })
    }
}

export default DashboardService;