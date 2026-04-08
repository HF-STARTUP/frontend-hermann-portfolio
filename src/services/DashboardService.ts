import DashboardMetrics from "@/model/dashboard/MetricsModel";
import Service from "./Service";
import {
  BestFleetPaginationData,
  DashboardParams,
  DashboardStatsData,
  ExpiringSubscriptionData,
  ExpiringSubscriptionsParams,
  InactiveFleetsData,
  RevenueChartData,
} from "@/types/dashboard.type";
import { toQueriesString } from "@/lib/utils";
import DashboardRevenueChart from "@/model/dashboard/DashboardRevenusModel";
import BestFleetModel from "@/model/dashboard/BestFleetsModel";
import ExpiringSubscriptionsModel from "@/model/dashboard/ExpiringSubscriptionsModel";
import InactiveFleetModel from "@/model/dashboard/InactiveFleets";

export enum DashBoardApiRoutes {
  GetMetrics = "/admin-dashboard/metrics",
  GetRevenueChartData = "/admin-dashboard/revenue-chart",
  GetBestFleets = "/admin-dashboard/best-fleets",
  GetExpiringSubscriptions = "/admin-dashboard/expiring-subscriptions",
  GetInactiveFleets = "/admin-dashboard/inactive-fleets",
}

class DashboardService extends Service {
  private static instance: DashboardService = new DashboardService();

  constructor() {
    super("");
  }

  private static getInstance() {
    return DashboardService.instance;
  }

  // Get Dashboard Metrics
  static async getMetrics(params?: DashboardParams) {
    const url = toQueriesString(DashBoardApiRoutes.GetMetrics, params);
    const response =
      await DashboardService.getInstance().execHttpRequest<DashboardStatsData>({
        url: url,
        method: DashboardService.getInstance().httpMethods.get,
      });

    return new DashboardMetrics(response);
  }
  // Invalidate Metrics query
  static invalidateMetrics() {
    return DashboardService.getInstance().queryClient.invalidateQueries({
      queryKey: [DashBoardApiRoutes.GetMetrics],
    });
  }

  // Get Dashboard Revenus Chart Data
  static async getRevenueChartData(params?: DashboardParams) {
    const url = toQueriesString(DashBoardApiRoutes.GetRevenueChartData, params);
    const response =
      await DashboardService.getInstance().execHttpRequest<RevenueChartData>({
        url: url,
        method: DashboardService.getInstance().httpMethods.get,
      });

    return new DashboardRevenueChart(response);
  }

  // Invalidate Revenus Chart Data query
  static invalidateRevenueChartData() {
    return DashboardService.getInstance().queryClient.invalidateQueries({
      queryKey: [DashBoardApiRoutes.GetRevenueChartData],
    });
  }

  // get Dashboard paginated best fleets
  static async getBestFleets(params?: DashboardParams) {
    const url = toQueriesString(DashBoardApiRoutes.GetBestFleets, params);
    const response =
      await DashboardService.getInstance().execHttpRequest<BestFleetPaginationData>(
        {
          url: url,
          method: DashboardService.getInstance().httpMethods.get,
        },
      );

    return {
      fleets: BestFleetModel.toArrays(response.data),
      totalPages: response.totalPages,
      totalRecords: response.totalRecords,
      currentPage: response.currentPage,
      itemPerPage: response.itemPerPage,
    };
  }

  // Invalidate best fleets query
  static invalidateBestFleets() {
    return DashboardService.getInstance().queryClient.invalidateQueries({
      queryKey: [DashBoardApiRoutes.GetBestFleets],
    });
  }

  // Get Expiring subscriptions
  static async getExpiringSubscriptions(params?: ExpiringSubscriptionsParams) {
    const url = toQueriesString(
      DashBoardApiRoutes.GetExpiringSubscriptions,
      params,
    );
    const response =
      await DashboardService.getInstance().execHttpRequest<ExpiringSubscriptionData>(
        {
          url: url,
          method: DashboardService.getInstance().httpMethods.get,
        },
      );

    return {
      subscriptions: ExpiringSubscriptionsModel.toArrays(response.data),
      totalPages: response.totalPages,
      totalRecords: response.totalRecords,
      currentPage: response.currentPage,
      itemPerPage: response.itemPerPage,
    };
  }
   // Invalidate Expiring subscriptions query
   static invalidateExpiringSubs() {
    return DashboardService.getInstance().queryClient.invalidateQueries({
      queryKey: [DashBoardApiRoutes.GetExpiringSubscriptions],
    });
  }

   // Get Expiring subscriptions
   static async getInactiveFleets(params?: ExpiringSubscriptionsParams) {
    const url = toQueriesString(
      DashBoardApiRoutes.GetInactiveFleets,
      params,
    );
    const response =
      await DashboardService.getInstance().execHttpRequest<InactiveFleetsData>(
        {
          url: url,
          method: DashboardService.getInstance().httpMethods.get,
        },
      );

    return {
      fleets: InactiveFleetModel.toArrays(response.data),
      totalPages: response.totalPages,
      totalRecords: response.totalRecords,
      currentPage: response.currentPage,
      itemPerPage: response.itemPerPage,
    };
  }
   // Invalidate Expiring subscriptions query
   static invalidateInactiveFleets() {
    return DashboardService.getInstance().queryClient.invalidateQueries({
      queryKey: [DashBoardApiRoutes.GetExpiringSubscriptions],
    });
  }
}

export default DashboardService;
