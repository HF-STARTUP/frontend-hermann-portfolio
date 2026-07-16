import { Column } from "@/components/display/CustomTableDisplay";
import { useGetActiveCurrency } from "@/hooks/__globlal/useGlobalHook";
import React, { useMemo, useState } from "react";
import {
  useGetActiveSubscriptionOnFleet,
  useGetSubscriptionHistoryOnFleet,
} from "@/hooks/admin/useFleetHook";
import Badge from "@/components/display/Badge";
import { PackageType } from "../../subscriptions/_hooks/usePackageList";
import { Crown } from "lucide-react";
import { FleetSubscriptionParams, SubscriptionStatus, SubsPaymentStatus } from "@/types/admin/fleet.type";
import { DateRange } from "react-day-picker";
import { toIsoDate } from "@/services/Service";

export interface SubscriptionRow {
  date: string;
  plan: PackageType;
  amount: number;
  period: "monthly" | "yearly";
  paymentMethod: string;
  status: SubsPaymentStatus;
  statusLabel?: string
}

export const useFleetSubscriptionsHook = (fleetId?: string) => {
  const { currency } = useGetActiveCurrency();

  const [dateRange, setDateRange] = useState<DateRange>();
  const [page, setPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);

  const queryParams = useMemo<FleetSubscriptionParams>(() => {
    return {
      start_date: toIsoDate(dateRange?.from),
      end_date: toIsoDate(dateRange?.to),
      page: page,
      itemPerPage: itemPerPage
    };
  }, [dateRange, page, itemPerPage]);

  const { data: fleetSubscriptions, isLoading: isLoadingFleetSubscriptions } =
    useGetSubscriptionHistoryOnFleet(queryParams, fleetId);

  const { data: activeSubscription, isLoading: isLoadingActiveSubscription } =
    useGetActiveSubscriptionOnFleet(fleetId);

  const subscriptions: SubscriptionRow[] = useMemo(() => {
    return fleetSubscriptions?.subscriptions.map((subs) => ({
      amount: subs.amount ?? 0,
      date: subs.startDate ?? "",
      paymentMethod: subs.paymentMethodLabel,
      period: subs.subscriptionPlan as "monthly" | "yearly",
      plan: subs.subscription.name as PackageType,
      status: subs.status,
      statusLabel: subs.paymentStatusLabel
    })) ?? [];
  }, [fleetSubscriptions]);

  const paginationMeta = useMemo(
    () => ({
      totalRecords: fleetSubscriptions?.totalRecords ?? 0,
      totalPages: fleetSubscriptions?.totalPages ?? 1,
      currentPage: fleetSubscriptions?.currentPage ?? page,
      itemPerPage: fleetSubscriptions?.itemPerPage ?? itemPerPage,
    }),
    [fleetSubscriptions, page, itemPerPage]
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
    [paginationMeta, itemPerPage]
  );

  const tableColumns: Column<SubscriptionRow>[] = useMemo<Column<SubscriptionRow>[]>(
    () => [
      {
        header: "Date",
        accessor: (item) => item.date,
      },
      {
        header: "Plan",
        accessor: (item) =>
          React.createElement(Badge, {
            type: item.plan,
            icon: React.createElement(Crown, { size: 14 }),
            isPackage: true
          }, item.plan),
      },
      {
        header: "Prix",
        accessor: (item) =>
          `${item.amount} ${currency} / ${item.period === "monthly" ? "mois" : "an"}`,
      },
      {
        header: "Moyen de paiement",
        accessor: (item) =>
          React.createElement("span", null, item.paymentMethod),
      },
      {
        header: "Statut",
        accessor: (item) => React.createElement(Badge, { type: item.status }, item.statusLabel),
      },
    ],
    [currency]
  );

  return {
    subscriptions,
    tableColumns,
    pagination,
    paginationMeta,
    isLoadingFleetSubscriptions,
    activeSubscription,
    isLoadingActiveSubscription,
    dateRange,
    setDateRange
  };
};