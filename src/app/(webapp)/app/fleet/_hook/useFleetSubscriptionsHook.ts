import { Column } from "@/components/display/CustomTableDisplay";
import { useGetActiveCurrency } from "@/hooks/__globlal/useGlobalHook";
import React, { useMemo } from "react";
import { AbonStatusBadge, SubscriptionBadge } from "../components/_sub_components/badges";

export interface SubscriptionRow {
  date: string;
  plan: string;
  amount: number;
  period: "monthly" | "yearly";
  paymentMethod: {
    name: string;
    icon: string;
  };
  status: "using" | "paid" | "expired";
}

export const useFleetSubscriptionsHook = () => {
  const { currency } = useGetActiveCurrency();

  const subscriptions: SubscriptionRow[] = [
    {
      date: "22 Fév.2026 à 10:00",
      plan: "ESSENTIEL",
      amount: 100,
      period: "monthly",
      paymentMethod: {
        name: "Wave",
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI3wzGW2Od0fwu9d0nGua0cme_mSiKlz2u4A&s",
      },
      status: "using",
    },
    {
      date: "22 Fév.2026 à 10:00",
      plan: "ESSENTIEL",
      amount: 100,
      period: "monthly",
      paymentMethod: {
        name: "Wave",
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI3wzGW2Od0fwu9d0nGua0cme_mSiKlz2u4A&s",
      },
      status: "paid",
    },
    {
      date: "22 Fév.2026 à 10:00",
      plan: "ESSENTIEL",
      amount: 100,
      period: "monthly",
      paymentMethod: {
        name: "Wave",
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI3wzGW2Od0fwu9d0nGua0cme_mSiKlz2u4A&s",
      },
      status: "expired",
    },
    {
      date: "22 Fév.2026 à 10:00",
      plan: "ESSENTIEL",
      amount: 100,
      period: "monthly",
      paymentMethod: {
        name: "Wave",
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI3wzGW2Od0fwu9d0nGua0cme_mSiKlz2u4A&s",
      },
      status: "expired",
    },
    {
      date: "22 Fév.2026 à 10:00",
      plan: "ESSENTIEL",
      amount: 100,
      period: "monthly",
      paymentMethod: {
        name: "Wave",
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI3wzGW2Od0fwu9d0nGua0cme_mSiKlz2u4A&s",
      },
      status: "using",
    },
    {
      date: "22 Fév.2026 à 10:00",
      plan: "ESSENTIEL",
      amount: 100,
      period: "monthly",
      paymentMethod: {
        name: "Wave",
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI3wzGW2Od0fwu9d0nGua0cme_mSiKlz2u4A&s",
      },
      status: "paid",
    },
    {
      date: "22 Fév.2026 à 10:00",
      plan: "ESSENTIEL",
      amount: 100,
      period: "monthly",
      paymentMethod: {
        name: "Wave",
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI3wzGW2Od0fwu9d0nGua0cme_mSiKlz2u4A&s",
      },
      status: "expired",
    },
  ];

  const paginationMeta = useMemo(
    () => ({
      totalRecords: subscriptions.length ?? 0,
      totalPages: 1,
      currentPage: 1,
      itemPerPage: 10,
    }),
    [subscriptions.length],
  );

  const pagination = useMemo(
    () => ({
      currentPage: paginationMeta.currentPage,
      totalPages: Math.max(1, paginationMeta.totalPages),
      onPageChange: () => {},
      totalEntries: paginationMeta.totalRecords,
      pageSize: 10,
      onPageSizeChange: () => {},
    }),
    [paginationMeta],
  );

  const tableColumns: Column<SubscriptionRow>[] = useMemo<
    Column<SubscriptionRow>[]
  >(
    () => [
      {
        header: "Date",
        accessor: (item) => item.date,
      },
      {
        header: "Plan",
        accessor: (item) => React.createElement(SubscriptionBadge, { name: item.plan ?? "-" }),
      },
      {
        header: "Prix",
        accessor: (item) =>
          `${item.amount} ${currency} / ${item.period == "monthly" ? "mois" : "an"}`,
      },
      {
        header: "Moyen de paiement",
        accessor: (item) =>
          React.createElement(
            "div",
            { style: { display: "flex", alignItems: "center", gap: "10px" } },
            React.createElement("img", {
              src: item.paymentMethod.icon,
              alt: "logo",
              style: { width: "30px" },
            }),
            React.createElement("label", null, item.paymentMethod.name),
          ),
      },
      {
        header: "Statut",
        accessor: (item) => (React.createElement(AbonStatusBadge, { status: item.status === "using" ? "Active" : item.status === "paid" ? "Payé" : "Expiré" })),
      },
    ],
    [],
  );

  return {
    subscriptions,
    tableColumns,
    pagination,
  };
};
