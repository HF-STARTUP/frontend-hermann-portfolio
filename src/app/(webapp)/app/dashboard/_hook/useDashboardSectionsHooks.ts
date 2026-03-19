"use client";

import React from "react";
import {
  useGetCourseEvolution,
  useGetDashboardSubscriptionEvolution,
  useGetEntretienEvolution,
  useGetOperatorsRevenus,
  useGetProfitableList,
  useGetRevenusEvolution,
  useGetDashboardActivities,
  useGetFleetByCity,
} from "@/hooks/admin/useFleetHook";
import { toIsoDate } from "@/services/Service";
import { endOfMonth, startOfMonth } from "date-fns";
import { formatNumber } from "@/lib/utils";
import AuthManagerGuard from "@/guard/AuthManagerGuard";
import { useGetActiveCurrency } from "@/hooks/__globlal/useGlobalHook";
import { RevenueData } from "../_components/RevenusBySource";
import { useCountries } from "@/hooks/location/useCountry/useCountry";
import { DashboardGlobalFilters } from "./useDashboardHook";
import { useGetDashboardRevenueChartData } from "@/hooks/dashboard/useDashboard";
import { group } from "console";
import { DashboardParams, PeriodType } from "@/types/dashboard.type";

// Abonnements – Evolution

export const useDashboardAbonnEvolution = (graphType: string) => {
  const { data, isLoading } = useGetDashboardSubscriptionEvolution(graphType);

  const points =
    data?.data?.map((d) => ({
      label: d.item,
      value: d.amount,
    })) ?? [];

  return {
    points,
    isLoading,
    hasData: Boolean(data?.data && data.data.length > 0),
    raw: data,
  };
};

// Paiements – Moyens de paiement

export type DashboardPaymentMethod = {
  name: string;
  amount: string;
  progress: number;
  path?: string;
};

export const useDashboardPaymentMethods = () => {
  const currentDate = React.useMemo(() => new Date(), []);

  const { data, isLoading } = useGetOperatorsRevenus({
    start_date: toIsoDate(startOfMonth(currentDate)),
    end_date: toIsoDate(endOfMonth(currentDate)),
  });

  const paymentMethods: DashboardPaymentMethod[] = React.useMemo(() => {
    if (!data || data.length === 0) return [];

    const total = data.reduce((sum, d) => sum + d.total_amount, 0);

    return data.map((d) => ({
      name: d.operator_name,
      amount: `${formatNumber(d.total_amount)} ${d.currency}`,
      progress: total > 0 ? Math.round((d.total_amount / total) * 100) : 0,
      path: d.path,
    }));
  }, [data]);

  return {
    paymentMethods,
    isLoading,
  };
};

// Meilleures flottes

export const useDashboardBestFleet = () => {

  const {currency} = useGetActiveCurrency()

  const { data, isLoading } = useGetProfitableList({
    type: AuthManagerGuard.getEnabledFleetType as string,
    city_id: String(AuthManagerGuard.getEnabledCity),
    currency_id: AuthManagerGuard.getCurrency,
  });

  return {
    fleetData: data,
    isLoading,
    currency
  };
};

// Evolution des courses

export const useDashboardCourseEvolution = (graphType: string) => {
  const { data, isLoading } = useGetCourseEvolution(graphType);

  return {
    data,
    isLoading,
  };
};

// Evolution chiffre d'affaires

export const useDashboardCashEvolution = (graphType: string) => {
  const { data, isLoading } = useGetRevenusEvolution(graphType);

  return {
    data,
    isLoading,
  };
};

// Evolution entretiens

export const useDashboardEntretienEvolution = (graphType: string) => {
  const { data, isLoading } = useGetEntretienEvolution(graphType);

  return {
    data,
    isLoading,
  };
};

// Activités – Filtrage par jour

type UseDashboardActivitiesParams = {
  year: number;
  month: number;
  day: number;
};

export const useDashboardActivities = ({
  year,
  month,
  day,
}: UseDashboardActivitiesParams) => {
  const start = React.useMemo(
    () => new Date(year, month, day, 0, 0, 0),
    [year, month, day],
  );
  const end = React.useMemo(
    () => new Date(year, month, day, 23, 59, 0),
    [year, month, day],
  );

  const { data, isLoading } = useGetDashboardActivities(start, end);

  return {
    data,
    isLoading,
  };
};

// Section – Carte des flottes

type FleetMapItem = {
  city: string;
  value: string;
  coordinates: [number, number];
};

export const useDashboardFleetMapSection = (fleets: FleetMapItem[]) => {
  const [selectedCountrie, setSelectedCountrie] = React.useState<string>();
  const { data: nbFleets, isLoading } = useGetFleetByCity({
    country_id: selectedCountrie,
  });
  const [filter, setFilter] = React.useState<string>("all");
  const { data: countries, isLoading: loadingCountries } = useCountries({
    fleet: true,
  });

  const [dimensions, setDimensions] = React.useState({
    width: 800,
    height: 359,
  });

  const [zoom, setZoom] = React.useState(1);
  const [center, setCenter] = React.useState<[number, number]>([0, 30]);
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState<[number, number]>([0, 0]);

  React.useEffect(() => {
    const updateDimensions = () => {
      const container = document.getElementById("map-container");
      if (container) {
        setDimensions({
          width: container.clientWidth,
          height: container.clientHeight,
        });
      }
    };
    window.addEventListener("resize", updateDimensions);
    updateDimensions();
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const filteredFleets = React.useMemo(
    () =>
      filter === "all"
        ? fleets
        : fleets.filter((fleet) => fleet.city === filter),
    [filter, fleets],
  );

  const uniqueCities = React.useMemo(
    () => Array.from(new Set(fleets.map((fleet) => fleet.city))),
    [fleets],
  );

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev * 1.5, 8));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev / 1.5, 0.5));
  };

  const handleReset = () => {
    setZoom(1);
    setCenter([0, 30]);
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart([event.clientX, event.clientY]);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = event.clientX - dragStart[0];
    const deltaY = event.clientY - dragStart[1];

    const sensitivity = 0.5 / zoom;

    setCenter((prev) => [
      prev[0] - deltaX * sensitivity,
      prev[1] + deltaY * sensitivity,
    ]);

    setDragStart([event.clientX, event.clientY]);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return {
    selectedCountrie,
    setSelectedCountrie,
    filter,
    setFilter,
    countries,
    loadingCountries,
    nbFleets,
    isLoading,
    dimensions,
    zoom,
    center,
    isDragging,
    handleZoomIn,
    handleZoomOut,
    handleReset,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    filteredFleets,
    uniqueCities,
  } as const;
};

// Diagramme d'evolution des revenus

export interface RevenueChartLocalFilters {
  groupBy: PeriodType;
}

export const useDashboardRevenusEvolution = (globalFilters?:DashboardGlobalFilters) => {
  const [localFilters, setLocalFilters] = React.useState<RevenueChartLocalFilters>({
    groupBy: "month",
  });
  const queryParams = React.useMemo<DashboardParams>(() => ({
      account_type: globalFilters?.profileType,
      start_date: globalFilters?.dateRange?.from?.toISOString(),
      end_date: globalFilters?.dateRange?.to?.toISOString(),      
      currency_id: globalFilters?.currency as number,

      group_by: localFilters.groupBy as PeriodType,
    }), [globalFilters, localFilters]);

  const { currency } = useGetActiveCurrency();
  const {data: chartData, isLoading: isLoadingRevenusChartData} = useGetDashboardRevenueChartData(queryParams);

  const chartValues: number[] = chartData?.values || [];
  const chartLabels: string[] = chartData?.labels || [];
  const variation: {
    percent: string;
    variation: "up" | "down" | "constant";
    amount: string;
  } = {
    amount: `${formatNumber(820000)} ${currency}`,
    percent: "+17.8 %",
    variation: "down",
  };

  const totalRevenus = chartData?.total || "0";

  return {
    chartLabels,
    chartValues,
    variation,
    totalRevenus,
    currency,
    localFilters, 
    setLocalFilters,
    isLoadingRevenusChartData
  };
};

export const useDashboarRevenusBySource = () => {
  const chartData: RevenueData[] = [
    {
      name: "Abonnements",
      value: 8920000,
    },
    {
      name: "Commission sur transaction",
      value: 5720000,
    },
    {
      name: "API",
      value: 1700000,
    },
    {
      name: "Autres",
      value: 625000,
    },
  ];

  return {
    chartData,
  };
};
