import { KpiItem } from "@/components/display/Kpi";
import React from "react";
import { PiMegaphone } from "react-icons/pi";

export const useMarketingDashboardHook = () => {
  const KpiItems: KpiItem[] = [
    {
      icon: React.createElement(PiMegaphone, { className: "-scale-x-100" }),
      title: "Total téléchargements d’appli",
      value: "246",
      variation: "up",
      hint: "+12 ce mois",
      variant: "light-blue",
    },
    {
      icon: React.createElement(PiMegaphone, { className: "-scale-x-100" }),
      title: "Nombre total de comptes créés",
      value: "46",
      variation: "up",
      hint: "+12 ce mois",
      variant: "purple",
      items: [
        {
          label: "Entrepreneur",
          value: "32",
        },
        {
          label: "Professionenls",
          value: "14",
        },
      ],
    },
    {
      icon: React.createElement(PiMegaphone, { className: "-scale-x-100" }),
      title: "Nombre d’utilisateurs actifs",
      value: "26",
      variation: "up",
      hint: "+12 ce mois",
      variant: "green",
      items: [
        {
          label: "Entrepreneur",
          value: "32",
        },
        {
          label: "Professionenls",
          value: "14",
        },
      ],
    },
    {
      icon: React.createElement(PiMegaphone, { className: "-scale-x-100" }),
      title: "Nombre d’utilisateurs inactifs",
      value: "24",
      variation: "up",
      hint: "+12 ce mois",
      variant: "orange",
      items: [
        {
          label: "Entrepreneur",
          value: "32",
        },
        {
          label: "Professionenls",
          value: "14",
        },
      ],
    },
    {
      icon: React.createElement(PiMegaphone, { className: "-scale-x-100" }),
      title: "Téléchargements sans compte",
      value: "54",
      variation: "down",
      hint: "-12 ce mois",
      variant: "red",
    },
  ];

  const overviewLabels: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const createdAccountChartValues: number[] = [
    50, 100, 56, 98, 90, 65, 32, 12, 89, 10, 54, 32,
  ];
  const activesAccountChartValues: number[] = [
    71, 110, 26, 78, 100, 35, 92, 72, 79, 70, 34, 52,
  ];
  const inactivesAccountChartValues: number[] = [
    60, 140, 26, 91, 9, 45, 82, 17, 29, 19, 54, 82,
  ];

  return {
    KpiItems,
    overviewLabels,
    createdAccountChartValues,
    activesAccountChartValues,
    inactivesAccountChartValues,
  };
};
