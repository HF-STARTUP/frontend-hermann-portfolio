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
        variation: data.revenueVariation,
        hint: `${data.revenueTrend}% ${data.revenueTrendLabel}`,
        variant: "purple",
        unit: currency,
      },
      {
        icon: React.createElement(StretchHorizontal),
        title: "Total flottes",
        value: data.fleetsRatio,
        variation: data.fleetsVariation,
        hint: `${data.fleetsTrend}% vs periode précédente`,
        variant: "blue",
      },
      {
        icon: React.createElement(ArrowRightLeft, { className: "rotate-45" }),
        title: "Total abonnements",
        value: data.subscriptionsRatio,
        variation: data.subscriptionVariation,
        hint: `${data.subscriptionsTrend}% vs periode précédente`,
        variant: "light-blue",
      },
      {
        icon: React.createElement(CashAltIcon),
        title: "Coût marketing actuel",
        value: data.marketingCost,
        variation: data.maketingVariation,
        hint: data.marketingLabel,
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