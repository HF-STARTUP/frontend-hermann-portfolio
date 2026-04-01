import TransactionService, {
  TransactionsApiRoutes,
} from "@/services/TransactionsService";
import { TransactionsParams } from "@/types/transactions.type";
import { useQueryProvider } from "./hooksProvider";

export const useGetTransactionsKpi = (params?: TransactionsParams) => {
  const { isLoading, data } = useQueryProvider({
    queryKey: [TransactionsApiRoutes.getTransactionKpi, params],
    queryFn: () => TransactionService.getGlobalKpi(params),
  });

  return {
    data,
    isLoading,
  };
};

export const useGetEvolution = (params?: TransactionsParams) => {
  const { isLoading, data } = useQueryProvider({
    queryKey: [TransactionsApiRoutes.getEvolutionData, params],
    queryFn: () => TransactionService.getEvolution(params),
  });

  return {
    data,
    isLoading,
  };
};

export const useGetCommissionsByPayment = (params?: TransactionsParams) => {
  const { isLoading, data } = useQueryProvider({
    queryKey: [TransactionsApiRoutes.getCommissionsByPaymentMethod, params],
    queryFn: () => TransactionService.getCommissionsByPayments(params),
  });

  return {
    data,
    isLoading,
  };
};


export const useGetTransactionsList = (params?: TransactionsParams) => {
  const { isLoading, data } = useQueryProvider({
    queryKey: [TransactionsApiRoutes.getTransactions, params],
    queryFn: () => TransactionService.getTransactionsList(params),
  });

  return {
    data,
    isLoading,
  };
};
