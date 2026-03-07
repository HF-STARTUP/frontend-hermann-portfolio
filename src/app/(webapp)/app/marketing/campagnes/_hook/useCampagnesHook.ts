import Badge from "@/components/display/Badge";
import { Column } from "@/components/display/CustomTableDisplay";
import { KpiItem } from "@/components/display/Kpi";
import { useGetActiveCurrency } from "@/hooks/__globlal/useGlobalHook";
import { formatNumber } from "@/lib/utils";
import React, { useMemo } from "react";
import { PiMegaphone } from "react-icons/pi";

export type CampagneStatus = "finished" | "processing" | "todo";
export interface CampagneFormatted extends Omit<CampagneType, "channels"> {
  channels: string[];
}

export interface CampagneType {
  id: string;
  name: string;
  leadsObjectif: number;
  channels: string;
  budget: number;
  startDate: string;
  endDate: string;
  usedBudget: number;
  assignedTo: string;
  status: CampagneStatus;
}

export const useCampagnesHook = () => {
  const { currency } = useGetActiveCurrency();

  const kpiItems: KpiItem[] = [
    {
      icon: React.createElement(PiMegaphone, { className: "-scale-x-100" }),
      title: "Budget total consommé",
      value: `${formatNumber(287500)} / ${formatNumber(1000000)}`,
      unit: currency,
      variation: "up",
      hint: "+12.3% ce mois",
      variant: "green",
    },
    {
      icon: React.createElement(PiMegaphone, { className: "-scale-x-100" }),
      title: "Campagnes actives",
      value: `${formatNumber(540)} / ${formatNumber(1200)}`,
      variation: "up",
      hint: "+12.3% ce mois",
      variant: "light-blue",
    },
    {
      icon: React.createElement(PiMegaphone, { className: "-scale-x-100" }),
      title: "Total leads",
      value: `${formatNumber(287)}`,
      variation: "up",
      hint: "+12.3% ce mois",
      variant: "purple",
    },
    {
      icon: React.createElement(PiMegaphone, { className: "-scale-x-100" }),
      title: "Conversions",
      value: `${formatNumber(275)}`,
      variation: "up",
      hint: "+12.3% ce mois",
      variant: "purple",
    },
  ];

  const campagnesList: CampagneType[] = [
    {
      id: "CAMP00021",
      name: "Meta Retargeting",
      leadsObjectif: 500,
      channels: "Facebook, Whatsapp, Instagram",
      budget: 800000,
      startDate: "12/02/2026",
      endDate: "25/02/2026",
      usedBudget: 600000,
      assignedTo: "Takam Djeutcha",
      status: "finished",
    },
    {
      id: "CAMP00022",
      name: "Google Search Ads Q1",
      leadsObjectif: 1200,
      channels: "Google Search",
      budget: 1500000,
      startDate: "01/03/2026",
      endDate: "31/03/2026",
      usedBudget: 450000,
      assignedTo: "Marie Louise",
      status: "processing",
    },
    {
      id: "CAMP00023",
      name: "LinkedIn B2B Outreach",
      leadsObjectif: 150,
      channels: "LinkedIn",
      budget: 2000000,
      startDate: "05/03/2026",
      endDate: "20/04/2026",
      usedBudget: 150000,
      assignedTo: "Jean-Paul Nono",
      status: "processing",
    },
    {
      id: "CAMP00024",
      name: "TikTok Brand Awareness",
      leadsObjectif: 2000,
      channels: "TikTok",
      budget: 1200000,
      startDate: "15/03/2026",
      endDate: "15/04/2026",
      usedBudget: 0,
      assignedTo: "Alice Bella",
      status: "todo",
    },
    {
      id: "CAMP00025",
      name: "Emailing Fidélisation",
      leadsObjectif: 300,
      channels: "Email",
      budget: 250000,
      startDate: "01/02/2026",
      endDate: "15/02/2026",
      usedBudget: 250000,
      assignedTo: "Takam Djeutcha",
      status: "finished",
    },
    {
      id: "CAMP00026",
      name: "YouTube Pre-roll",
      leadsObjectif: 800,
      channels: "YouTube",
      budget: 3000000,
      startDate: "10/04/2026",
      endDate: "10/05/2026",
      usedBudget: 0,
      assignedTo: "Cedric Fossuo",
      status: "todo",
    },
    {
      id: "CAMP00027",
      name: "SMS Marketing Flash",
      leadsObjectif: 1000,
      channels: "SMS",
      budget: 500000,
      startDate: "01/03/2026",
      endDate: "03/03/2026",
      usedBudget: 500000,
      assignedTo: "Marie Louise",
      status: "finished",
    },
    {
      id: "CAMP00028",
      name: "SEO Content Strategy",
      leadsObjectif: 400,
      channels: "Organic Search",
      budget: 1800000,
      startDate: "01/01/2026",
      endDate: "30/06/2026",
      usedBudget: 900000,
      assignedTo: "Jean-Paul Nono",
      status: "processing",
    },
    {
      id: "CAMP00029",
      name: "Influencer Partnership",
      leadsObjectif: 600,
      channels: "Instagram, TikTok",
      budget: 4500000,
      startDate: "20/03/2026",
      endDate: "20/04/2026",
      usedBudget: 2000000,
      assignedTo: "Alice Bella",
      status: "processing",
    },
    {
      id: "CAMP00030",
      name: "Twitter/X Tech Ads",
      leadsObjectif: 250,
      channels: "Twitter",
      budget: 700000,
      startDate: "01/04/2026",
      endDate: "30/04/2026",
      usedBudget: 0,
      assignedTo: "Cedric Fossuo",
      status: "todo",
    },
    {
      id: "CAMP00031",
      name: "Webinar Promotion",
      leadsObjectif: 450,
      channels: "Facebook, LinkedIn",
      budget: 950000,
      startDate: "05/02/2026",
      endDate: "25/02/2026",
      usedBudget: 950000,
      assignedTo: "Takam Djeutcha",
      status: "finished",
    },
    {
      id: "CAMP00032",
      name: "Pinterest Visual Ads",
      leadsObjectif: 350,
      channels: "Pinterest",
      budget: 600000,
      startDate: "15/04/2026",
      endDate: "15/05/2026",
      usedBudget: 0,
      assignedTo: "Marie Louise",
      status: "todo",
    },
    {
      id: "CAMP00033",
      name: "Local Radio Campaign",
      leadsObjectif: 200,
      channels: "Radio, Offline",
      budget: 1300000,
      startDate: "10/03/2026",
      endDate: "10/04/2026",
      usedBudget: 300000,
      assignedTo: "Jean-Paul Nono",
      status: "processing",
    },
    {
      id: "CAMP00034",
      name: "Display Remarketing",
      leadsObjectif: 750,
      channels: "Google Display",
      budget: 1100000,
      startDate: "01/03/2026",
      endDate: "31/03/2026",
      usedBudget: 550000,
      assignedTo: "Alice Bella",
      status: "processing",
    },
    {
      id: "CAMP00035",
      name: "Podcast Sponsorship",
      leadsObjectif: 180,
      channels: "Audio Ads",
      budget: 2500000,
      startDate: "01/05/2026",
      endDate: "31/05/2026",
      usedBudget: 0,
      assignedTo: "Cedric Fossuo",
      status: "todo",
    },
  ];

  const paginationMeta = useMemo(
    () => ({
      totalRecords: campagnesList.length ?? 0,
      totalPages: 1,
      currentPage: 1,
      itemPerPage: 10,
    }),
    [campagnesList.length],
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

  const tableColumns: Column<CampagneType>[] = useMemo<Column<CampagneType>[]>(
    () => [
      {
        header: "Campagne",
        accessor: (item) => item.name,
      },
      {
        header: "Objectif",
        accessor: (item) => `${formatNumber(item.leadsObjectif)} leads`,
      },
      {
        header: "Canaux",
        accessor: (item) => item.channels,
      },
      {
        header: "Budget prévu",
        accessor: (item) => `${formatNumber(item.budget)} ${currency}`,
      },
      {
        header: "Date de début",
        accessor: (item) => item.startDate,
      },
      {
        header: "Date de début",
        accessor: (item) => item.startDate,
      },
      {
        header: "Date de fin",
        accessor: (item) => item.endDate,
      },
      {
        header: "Budget consommé",
        accessor: (item) => `${formatNumber(item.usedBudget)} ${currency}`,
      },
      {
        header: "Responsable",
        accessor: (item) => item.assignedTo,
      },
      {
        header: "Statut",
        accessor: (item) => React.createElement(Badge, { type: item.status }),
      },
    ],
    [],
  );

  const formatChannels = (c: CampagneType): CampagneFormatted => ({
    ...c,
    channels: c.channels.split(",").map((channel) => channel.trim()),
  });

  const finishedCampagnes: CampagneFormatted[] = campagnesList
    .filter((c) => c.status === "finished")
    .map(formatChannels);

  const processingCampagnes: CampagneFormatted[] = campagnesList
    .filter((c) => c.status === "processing")
    .map(formatChannels);

  const todoCampagnes: CampagneFormatted[] = campagnesList
    .filter((c) => c.status === "todo")
    .map(formatChannels);

  return {
    CampagneKpi: kpiItems,
    tableColumns,
    pagination,
    campagnesList,
    finishedCampagnes,
    processingCampagnes,
    todoCampagnes,
    currency
  };
};
