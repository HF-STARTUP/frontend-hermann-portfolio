
import DashboardService, { DashBoardApiRoutes } from "@/services/DashboardService";
import { DashboardParams, ExpiringSubscriptionsParams } from "@/types/dashboard.type";
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



// Get Dashboard Best Fleets
export function useGetDashboardBestFleets(params?: DashboardParams) {

    const {data, isLoading} = useQuery({
        queryKey: [DashBoardApiRoutes.GetBestFleets, params],
        queryFn: () => DashboardService.getBestFleets(params),
    })

    return {data, isLoading};
}

// Get Dashboard Expiring Subscriptions
export function useGetExpiringSubs(params?: ExpiringSubscriptionsParams) {

    const {data, isLoading} = useQuery({
        queryKey: [DashBoardApiRoutes.GetExpiringSubscriptions, params],
        queryFn: () => DashboardService.getExpiringSubscriptions(params),
    })

    return {data, isLoading};
}

// Get Dashboard Inactive fleets
export function useGetInactiveFleets(params?: ExpiringSubscriptionsParams) {

    const {data, isLoading} = useQuery({
        queryKey: [DashBoardApiRoutes.GetInactiveFleets, params],
        queryFn: () => DashboardService.getInactiveFleets(params),
    })

    return {data, isLoading};
}