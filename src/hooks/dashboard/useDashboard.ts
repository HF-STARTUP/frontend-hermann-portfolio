
import DashboardService, { DashBoardApiRoutes } from "@/services/DashboardService";
import { DashboardParams } from "@/types/dashboard.type";
import { useQuery } from "@tanstack/react-query";

// Get Dashboard Metrics
export function useGetDashboardMetrics(params?: DashboardParams) {

    const {data, isLoading} = useQuery({
        queryKey: [DashBoardApiRoutes.GetMetrics, params],
        queryFn: () => DashboardService.getMetrics(params),
    })
    return {data, isLoading};
}


// Get Dashboard Revenus Chart Data
export function useGetDashboardRevenueChartData(params?: DashboardParams) {

    const {data, isLoading} = useQuery({
        queryKey: [DashBoardApiRoutes.GetRevenueChartData, params],
        queryFn: () => DashboardService.getRevenueChartData(params),
    })
    return {data, isLoading};
}