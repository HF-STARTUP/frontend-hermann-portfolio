import React, { useEffect, useMemo, useState } from "react";
import { FleetKpiCardProps } from "../components/_sub_components/fleetDetailKpi";
import { useGetActiveCurrency } from "@/hooks/__globlal/useGlobalHook";
import { Column } from "@/components/display/CustomTableDisplay";
import {
  useGetFleetTransactions,
  useGetFleetTransactionsKpi,
} from "@/hooks/admin/useFleetHook";
import { DateRange } from "react-day-picker";
import { toIsoDate } from "@/services/Service";
import {
  TransactionHistoryItem,
  TransactionHistoryParams,
} from "@/types/admin/fleet.type";
import TransactionHistoryModel from "@/model/ADMIN/TransactionHistory";
import { OperationWithLogo } from "../components/_sub_components/OperatorItem";

export interface TransactionRow {
  date: string;
  amount: number;
  type: "entrée" | "sortie";
  paymentMethod: {
    name: string;
    icon: string;
  };
  fees: number;
  commissionVTCC: number;
}

export const useFleetTransactions = (fleetId?: string) => {
  const [page, setPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(20);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    return { from: startOfMonth, to: now };
  });

  const { data: kpiData, isLoading: isLoadingKpi } = useGetFleetTransactionsKpi(
    fleetId,
    {
      start_date: toIsoDate(dateRange?.from),
      end_date: toIsoDate(dateRange?.to),
    },
  );

  const apiParams: TransactionHistoryParams = useMemo(() => {
    return {
      park_id: fleetId,
      start_date: toIsoDate(dateRange?.from),
      end_date: toIsoDate(dateRange?.to),
    };
  }, [page, itemPerPage, dateRange]);

  const { data: transactionData, isLoading: isLoadingTransactions } =
    useGetFleetTransactions(apiParams);

  const { currency } = useGetActiveCurrency();

  const transactionKpi: FleetKpiCardProps[] = [
    {
      title: "Total entrées",
      value: kpiData?.incomingCount ?? 0,
      variant: "green",
      hint: `${kpiData?.incomingAmount} ${currency}`,
    },
    {
      title: "Total Sorties",
      value: kpiData?.outgoingCount ?? 0,
      variant: "red",
      hint: `${kpiData?.outgoingAmount} ${currency}`,
    },
    {
      title: "Frais de transaction",
      value: kpiData?.transactionFeesAmount ?? 0,
      variant: "light-blue",
      unit: currency,
    },
    {
      title: "Total Commissions VTCC",
      value: kpiData?.commissionsAmount ?? 0,
      variant: "blue",
      unit: currency,
    },
  ];

  const transactions: TransactionHistoryModel[] =
    transactionData?.transaction || [];

  const paginationMeta = useMemo(
    () => ({
      totalRecords: transactionData?.totalRecords ?? 0,
      totalPages: transactionData?.totalPages ?? 1,
      currentPage: transactionData?.currentPage ?? page,
      itemPerPage: transactionData?.itemPerPage ?? itemPerPage,
    }),
    [transactionData, page, itemPerPage],
  );

  const pagination = useMemo(
    () => ({
      currentPage: paginationMeta.currentPage,
      totalPages: Math.max(1, paginationMeta.totalPages),
      onPageChange: setPage,
      totalEntries: paginationMeta.totalRecords,
      pageSize: itemPerPage,
      onPageSizeChange: (size: number) => {
        setItemPerPage(size);
        setPage(1);
      },
    }),
    [paginationMeta, itemPerPage],
  );

  const tableColumns: Column<TransactionHistoryModel>[] = useMemo<
    Column<TransactionHistoryModel>[]
  >(
    () => [
      {
        header: "Date",
        accessor: (item) => item.formattedDate,
      },
      {
        header: "Type",
        accessor: (item) => item.label,
      },
      {
        header: "Montant",
        accessor: (item) => `${item.amount} ${currency}`,
      },
      {
        header: "Methode de paiement",
        accessor: (item) =>
          item.operator
            ? React.createElement(OperationWithLogo, {
                operator: item.operator,
              })
            : item.payment_method,
      },
      {
        header: "Frais",
        accessor: (item) => `${item.fees} ${currency}`,
      },
      {
        header: "Commissions",
        accessor: (item) => `${item.commission} ${currency}`,
      },
    ],
    [],
  );

  return {
    transactionKpi,
    pagination,
    tableColumns,
    transactions,
    isLoadingKpi,
    dateRange,
    setDateRange,
    isLoadingTransactions,
  };
};
