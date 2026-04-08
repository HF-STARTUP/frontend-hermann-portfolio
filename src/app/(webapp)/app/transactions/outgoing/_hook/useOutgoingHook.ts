import { Column } from "@/components/display/CustomTableDisplay";
import { useGetActiveCurrency } from "@/hooks/__globlal/useGlobalHook";
import { useGetTransactionsList } from "@/hooks/useTransactions";
import { formatNumber } from "@/lib/utils";
import { TransactionsModel } from "@/model/transactions/TransactionsModel";
import { TransactionsParams } from "@/types/transactions.type";
import React, { useMemo, useState } from "react";

export const useOutgoingHook = (params?: TransactionsParams) => {
  const { currency } = useGetActiveCurrency();
  const [page, setPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(20);
  const queryParams = useMemo<TransactionsParams>(() => {
    return {
      start_date: params?.start_date,
      end_date: params?.end_date,
      city_id: params?.city_id,
      country_id: params?.country_id,
      currency_id: params?.currency_id,
      account_type: params?.account_type,
      search: params?.search,
      direction: "outgoing",
      itemPerPage: itemPerPage,
      page: page,
    };
  }, [
    params?.start_date,
    params?.end_date,
    params?.city_id,
    params?.country_id,
    params?.currency_id,
    params?.account_type,
    params?.search,
    params?.itemPerPage,
    params?.page,
  ]);

  const { data: outgoingData, isLoading: isLoadingTransactions } =
    useGetTransactionsList(queryParams);
  const outgoingTransactions = outgoingData?.transactions;
  const paginationMeta = useMemo(
    () => ({
      totalRecords: outgoingData?.totalRecords ?? 0,
      totalPages: outgoingData?.totalPages ?? 1,
      currentPage: outgoingData?.currentPage ?? page,
      itemPerPage: outgoingData?.itemPerPage ?? itemPerPage,
    }),
    [outgoingData, page, itemPerPage],
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

  const tableColumns: Column<TransactionsModel>[] = useMemo<
    Column<TransactionsModel>[]
  >(
    () => [
      {
        header: "Nom de la flotte",
        accessor: (item) => item.fleetName,
      },
      {
        header: "Propriétaire",
        accessor: (item) => item.ownerName,
      },
      {
        header: "Type",
        accessor: (item) => item.accountType,
      },
      {
        header: "Moyen de paiement",
        accessor: (item) => item.paymentMethod
        },
      {
        header: "Trans. Sortantes",
        accessor: (item) => `${item.formattedTotalAmount} ${currency}`
      },
      {
        header: "Frais sur transaction",
        accessor: (item) => `${item.formattedTotalFees} ${currency}`
      },
      {
        header: "Comission VTCC",
        accessor: (item) => `${item.formattedCommissionVtcc} ${currency}`
      },
    ],
    [],
  );

  return {
    tableColumns,
    pagination,
    outgoingTransactions,
    isLoadingTransactions
  };
};
