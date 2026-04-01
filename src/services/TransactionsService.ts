import {
    CommissionByPayementMethodData,
  TransactionData,
  TransactionEvolutionItem,
  TransactionsEvolutionData,
  TransactionsParams,
  TransactionStatsData,
} from "@/types/transactions.type";
import Service from "./Service";
import { toQueriesString } from "@/lib/utils";
import { TransactionStatsModel } from "@/model/transactions/TransactionsKpiModel";
import { TransactionsEvolutionModel } from "@/model/transactions/TransactionEvolutionModel";
import { CommissionByPaymentMethodModel } from "@/model/transactions/CommisionsByPayment";
import { TransactionsModel } from "@/model/transactions/TransactionsModel";

export const TransactionsApiRoutes = {
  getTransactionKpi: "/admin-dashboard/transactions-revenue/kpis",
  getEvolutionData: "/admin-dashboard/transactions-revenue/evolution",
  getCommissionsByPaymentMethod: "/admin-dashboard/transactions-revenue/commission-by-payment-method",
  getTransactions: "/admin-dashboard/transactions-revenue/details"
};

class TransactionService extends Service {
  private static instance: TransactionService = new TransactionService();

  constructor() {
    super("");
  }

  static getInstance() {
    return TransactionService.instance;
  }

  static async getGlobalKpi(params?: TransactionsParams) {
    const uri = toQueriesString(
      TransactionsApiRoutes.getTransactionKpi,
      params,
    );
    const response =
      await TransactionService.getInstance().execHttpRequest<TransactionStatsData>(
        {
          url: uri,
          method: TransactionService.getInstance().httpMethods.get,
        },
      );
    return new TransactionStatsModel(response);
  }
  static async invalidateKpi() {
    return await TransactionService.getInstance().queryClient.invalidateQueries(
      { queryKey: [TransactionsApiRoutes.getTransactionKpi] },
    );
  }

  static async getEvolution(params?: TransactionsParams) {
    const uri = toQueriesString(TransactionsApiRoutes.getEvolutionData, params);
    const response =
      await TransactionService.getInstance().execHttpRequest<TransactionsEvolutionData>(
        {
          url: uri,
          method: TransactionService.getInstance().httpMethods.get,
        },
      );
    return new TransactionsEvolutionModel(response.series);
  }
  static async invalidateEvolution() {
    return await TransactionService.getInstance().queryClient.invalidateQueries(
      { queryKey: [TransactionsApiRoutes.getEvolutionData] },
    );
  }

  static async getCommissionsByPayments(params?: TransactionsParams) {
    const uri = toQueriesString(TransactionsApiRoutes.getCommissionsByPaymentMethod, params);
    const response =
      await TransactionService.getInstance().execHttpRequest<CommissionByPayementMethodData>(
        {
          url: uri,
          method: TransactionService.getInstance().httpMethods.get,
        },
      );
    return new CommissionByPaymentMethodModel(response);
  }
  static async invalidateCommissionsByPayments() {
    return await TransactionService.getInstance().queryClient.invalidateQueries(
      { queryKey: [TransactionsApiRoutes.getCommissionsByPaymentMethod] },
    );
  }


  static async getTransactionsList(params?: TransactionsParams) {
    const uri = toQueriesString(TransactionsApiRoutes.getTransactions, params);
    const response =
      await TransactionService.getInstance().execHttpRequest<TransactionData>(
        {
          url: uri,
          method: TransactionService.getInstance().httpMethods.get,
        },
      );
      return {
        transactions: TransactionsModel.toArray(response.data),
        totalPages: response.totalPages,
        totalRecords: response.totalRecords,
        currentPage: response.currentPage,
        itemPerPage: response.itemPerPage
    }
  }
  static async invalidateTransactionsList() {
    return await TransactionService.getInstance().queryClient.invalidateQueries(
      { queryKey: [TransactionsApiRoutes.getTransactions] },
    );
  }
}

export default TransactionService;
