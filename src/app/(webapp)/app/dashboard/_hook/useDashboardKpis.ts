"use client";

import React from "react";
import { KpiItem } from "@/components/display/Kpi";
import { DashboardIcon, CarCrashIcon, UserIcon, CashAltIcon } from "@/components/ui/__icons";
import { formatNumber } from "@/lib/utils";
import { useGetParkStats } from "@/hooks/admin/useFleetHook";
import { useGetActiveCurrency } from "@/hooks/__globlal/useGlobalHook";

type UseDashboardKpisResult = {
  kpis: KpiItem[];
  isLoading: boolean;
  error?: unknown;
};

export const useDashboardKpis = (): UseDashboardKpisResult => {
  const { data, isLoading } = useGetParkStats();
  const {currency} = useGetActiveCurrency();

  const kpis = React.useMemo<KpiItem[]>(() => {
    if (!data) return [];

    const items: KpiItem[] = [
      {
        icon: React.createElement(DashboardIcon),
        title: "Total flottes",
        value: data.flotte.total,
        variation: (data.flotte.indicateur),
        hint: data.flotte.indicateur_value
          ? `${data.flotte.indicateur_value} ce mois`
          : undefined,
        variant: "red",
      },
      {
        icon: React.createElement(CarCrashIcon),
        title: "Total véhicules",
        value: data.vehicle.total,
        variation: (data.vehicle.indicateur),
        hint: data.vehicle.indicateur_value
          ? `${data.vehicle.indicateur_value}% ce mois`
          : undefined,
        variant: "blue",
      },
      {
        icon: React.createElement(UserIcon),
        title: "Total chauffeurs",
        value: data.driver.total,
        variation: (data.driver.indicateur),
        hint: data.driver.indicateur_value
          ? `${data.driver.indicateur_value} ce mois`
          : undefined,
        variant: "green",
      },
      {
        icon: React.createElement(CashAltIcon),
        title: "Chiffre d’affaires",
        value: data.ca_total.total,
        variation: (data.ca_total.indicateur),
        hint: data.ca_total.indicateur_value
          ? `${formatNumber(data.ca_total.indicateur_value)}% vs mois précédent`
          : undefined,
        variant: "purple",
        unit: currency,
      },
    ];

    return items;
  }, [data]);

  return {
    kpis,
    isLoading,
  };
};

