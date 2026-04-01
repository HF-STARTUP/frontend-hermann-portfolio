import { KpiItem } from "@/components/display/Kpi";
import { useGetActiveCurrency } from "@/hooks/__globlal/useGlobalHook";
import React, { useMemo, useState } from "react";
import { ArrowRightLeft, CreditCardIcon } from "lucide-react";
import {
    useGetCommissionsByPayment,
  useGetEvolution,
  useGetTransactionsKpi,
} from "@/hooks/useTransactions";
import { TransactionsParams } from "@/types/transactions.type";
import AuthManagerGuard from "@/guard/AuthManagerGuard";
import { toIsoDate } from "@/services/Service";
import { useGetCurrenciesList } from "@/hooks/admin/useFleetHook";

const now = new Date();

const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);

const lastDay = new Date(
  now.getFullYear(),
  now.getMonth() + 1,
  0,
  23,
  59,
  59,
  999,
);

export const useTransactionsHook = () => {
  const [transacFilters, setTransacFilters] = useState<TransactionsParams>({
    start_date: toIsoDate(firstDay),
    end_date: toIsoDate(lastDay),
    city_id: AuthManagerGuard.getEnabledCity,
    currency_id: "",
    account_type: "all",
    group_by: "day",
  });

  const kpiQueryParams = useMemo(() => {
    return {
      start_date: transacFilters.start_date,
      end_date: transacFilters.end_date,
      city_id: transacFilters.city_id,
      country_id: transacFilters.country_id,
      currency_id: transacFilters.currency_id,
      account_type: transacFilters.account_type,
    };
  }, [
    transacFilters.start_date,
    transacFilters.end_date,
    transacFilters.city_id,
    transacFilters.country_id,
    transacFilters.currency_id,
    transacFilters.account_type,
  ]);

  const evolutionQueryParams = useMemo<TransactionsParams>(() => {
    return {
      start_date: transacFilters.start_date,
      end_date: transacFilters.end_date,
      city_id: transacFilters.city_id,
      country_id: transacFilters.country_id,
      currency_id: transacFilters.currency_id,
      account_type: transacFilters.account_type,
      group_by: transacFilters.group_by,
    };
  }, [
    transacFilters.start_date,
    transacFilters.end_date,
    transacFilters.city_id,
    transacFilters.country_id,
    transacFilters.currency_id,
    transacFilters.account_type,
    transacFilters.group_by,
  ]);

  const { data: commissionData, isLoading: isLoadingCommissionsData } = useGetCommissionsByPayment(kpiQueryParams)

  const { data: currencies, isLoading: isLoadingCurrecies } =
    useGetCurrenciesList();
  const { data: kpiData, isLoading: isLoadingKpi } =
    useGetTransactionsKpi(kpiQueryParams);

  const { data: evolutionData, isLoading: isLoadingEvolution } =
    useGetEvolution(evolutionQueryParams);
  const { currency } = useGetActiveCurrency();

  const incomingKpi: KpiItem[] = [
    {
      icon: React.createElement(CreditCardIcon),
      title: "Montant total des transactions",
      value: kpiData?.incomingTotalAmount || "0",
      unit: currency,
      variation: kpiData?.incomingTotalAmountVariation || "up",
      hint: kpiData?.incomingTotalAmountHint || "---",
      variant: "green",
    },
    {
      icon: React.createElement(ArrowRightLeft, { className: "rotate-45" }),
      title: "Total frais sur transactions",
      value: kpiData?.incomingTotalFees || "0",
      unit: currency,
      variation: kpiData?.incomingTotalFeesVariation || "up",
      hint: kpiData?.incomingTotalFeesHint || "---",
      variant: "green",
    },
    {
      icon: React.createElement(ArrowRightLeft, { className: "rotate-45" }),
      title: "Commission VTCC (revenus)",
      value: kpiData?.incomingCommission || "0",
      unit: currency,
      variation: kpiData?.incomingCommissionVariation || "up",
      hint: kpiData?.incomingCommissionHint || "---",
      variant: "green",
    },
  ];

  // --- Flux Sortants (Outgoing) ---
  const outgoingKpi: KpiItem[] = [
    {
      icon: React.createElement(CreditCardIcon),
      title: "Montant total des transactions",
      value: kpiData?.outgoingTotalAmount || "0",
      unit: currency,
      variation: kpiData?.outgoingTotalAmountVariation || "up",
      hint: kpiData?.outgoingTotalAmountHint || "---",
      variant: "orange",
    },
    {
      icon: React.createElement(ArrowRightLeft, { className: "rotate-45" }),
      title: "Total frais sur transactions",
      value: kpiData?.outgoingTotalFees || "0",
      unit: currency,
      variation: kpiData?.outgoingTotalFeesVariation || "up",
      hint: kpiData?.outgoingTotalFeesHint || "---",
      variant: "orange",
    },
    {
      icon: React.createElement(ArrowRightLeft, { className: "rotate-45" }),
      title: "Commission VTCC (revenus)",
      value: kpiData?.outgoingCommission || "0",
      unit: currency,
      variation: kpiData?.outgoingCommissionVariation || "up",
      hint: kpiData?.outgoingCommissionHint || "---",
      variant: "orange",
    },
  ];

  return {
    incomingKpi,
    outgoingKpi,
    isLoadingKpi,
    evolutionChartLabels: evolutionData?.labels,
    incomingChartValues: evolutionData?.incomingValues,
    outgoingChartValues: evolutionData?.outgoingValues,
    commissionChartValues: evolutionData?.commissionValues,
    commissionData,
    isLoadingCommissionsData,
    totalAmount: kpiData?.incomingTotalAmount || "0",
    currency,
    transacFilters,
    setTransacFilters,
    currencies,
    isLoadingCurrecies,
    isLoadingEvolution,
  };
};
