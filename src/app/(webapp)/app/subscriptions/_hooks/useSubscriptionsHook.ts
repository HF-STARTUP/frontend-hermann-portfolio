import { KpiItem } from "@/components/display/Kpi";
import React from "react";
import { Crown, Users } from "lucide-react";
import { formatNumber } from "@/lib/utils";

export const useSubscriptionsHook = () => {
  const kpiItems: KpiItem[] = [
    {
      icon: React.createElement(Users),
      title: "Total projeté des abonnements",
      variant: "light-blue",
      items: [
        {
          label: "Abonnements",
          value: formatNumber(546000),
          unit: "XOF",
        },
        {
          label: "Réabonnements",
          value: formatNumber(546000),
          unit: "XOF",
        },
      ],
    },
    {
        icon: React.createElement(Users),
        title: "Montant abonnement par profil",
        variant: "light-blue",
        items: [
          {
            label: "Entrepreneurs",
            value: formatNumber(546000),
            unit: "XOF",
          },
          {
            label: "Professionnel",
            value: formatNumber(546000),
            unit: "XOF",
          },
        ],
      },
      {
        icon: React.createElement(Crown),
        title: "Abonnements actifs",
        variant: "green",
        value: "54/123",
        variation: "up",
        hint:"+8.5% vs mois précédent"
      },
      {
        icon: React.createElement(Crown),
        title: "Nouveaux abonnés",
        variant: "light-blue",
        value: "54",
        variation: "up",
        hint:"+8.5% vs mois précédent"
      },
  ];


  return {
    kpiItems
  }
};
