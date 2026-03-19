"use client";

import React from "react";
import { KpiItem } from "@/components/display/Kpi";
import { CashAltIcon } from "@/components/ui/__icons";
import { formatNumber } from "@/lib/utils";
import { useGetActiveCurrency } from "@/hooks/__globlal/useGlobalHook";
import { useGetDashboardMetrics } from "@/hooks/dashboard/useDashboard";
import { ArrowRightLeft, StretchHorizontal } from "lucide-react";
import { DashboardGlobalFilters } from "./useDashboardHook";

export const useDashboardKpis = (globalFilters?: DashboardGlobalFilters) => {
  
  const queryParams = React.useMemo(() => ({
    account_type: globalFilters?.profileType,
    start_date: globalFilters?.dateRange?.from?.toISOString(),
    end_date: globalFilters?.dateRange?.to?.toISOString(),      
    currency_id: globalFilters?.currency as number,
  }), [globalFilters]);


  const { data, isLoading } = useGetDashboardMetrics(queryParams);
  
  const { currency } = useGetActiveCurrency();

  const kpiItems = React.useMemo<KpiItem[]>(() => {
    if (!data) return [];

    return [
      {
        icon: React.createElement(CashAltIcon),
        title: "Revenus générés (abonnements)",
        value: data.revenueAmount,
        variation: data.isRevenueUp ? 'up' : 'down',
        hint: `${data.revenueTrend}% ${data.revenueTrendLabel}`,
        variant: "purple",
        unit: currency,
      },
      {
        icon: React.createElement(StretchHorizontal),
        title: "Total flottes",
        value: data.fleetsRatio,
        variation: data.isFleetsUp ? 'up' : 'down',
        hint: `${data.fleetsTrend}% vs periode précédente`,
        variant: "blue",
      },
      {
        icon: React.createElement(ArrowRightLeft, { className: "rotate-45" }),
        title: "Total abonnements",
        value: data.subscriptionsRatio,
        variation: data.isSubscriptionsUp ? 'up' : 'down',
        hint: `${data.subscriptionsTrend}% vs periode précédente`,
        variant: "light-blue",
      },
      {
        icon: React.createElement(CashAltIcon),
        title: "Coût marketing actuel",
        value: formatNumber(540000),
        variation: 'up',
        hint: "Données statiques",
        variant: "green",
        unit: currency,
      },
    ];
  }, [data, currency]);

  return {
    kpiItems,
    isLoading,
  };
};