import { KpiItem } from "@/components/display/Kpi";
import { formatNumber } from "@/lib/utils";
import React, { useMemo } from "react";
import { Megaphone, Users2 } from "lucide-react";
import { TbCashBanknote } from "react-icons/tb";
import { useGetActiveCurrency } from "@/hooks/__globlal/useGlobalHook";
import { PiMegaphone } from "react-icons/pi";
import { LeadItem } from "../../campagnes/_hook/useCampagneLeadsHook";
import { Column } from "@/components/display/CustomTableDisplay";
import Badge from "@/components/display/Badge";


export const useLeadsHook = () => {
  const { currency } = useGetActiveCurrency();

  const kpiItems: KpiItem[] = [
    {
      icon: React.createElement(Users2),
      title: "Total Leads",
      value: formatNumber(245),
      variation: "up",
      hint: "+12 ce mois",
      variant: "light-blue",
    },
    {
      icon: React.createElement(Users2),
      title: "Total Conversions",
      value: formatNumber(25),
      variation: "up",
      hint: "+12 ce mois",
      variant: "light-blue",
    },
    {
      icon: React.createElement(TbCashBanknote),
      title: "Valeur pipeline",
      value: formatNumber(54000000),
      unit: currency,
      variation: "up",
      hint: "+12 ce mois",
      variant: "green",
    },
    {
      icon: React.createElement(PiMegaphone, { className: "-scale-x-100" }),
      title: "Taux de conversion",
      value: "54%",
      variation: "up",
      hint: "+12 ce mois",
      variant: "purple",
    },
  ];

  const leadsList: LeadItem[] = [
    {
      chanel: "Facebook",
      commercialName: "Jean Kameni",
      date: "23/02/2026",
      lead: {
        initials: "HF",
        name: "Hermann Fomo",
        email: "hermann.f@gmail.com",
        phoneNum: "+237 678987654"
      },
      status: "qualified",
      company: "Yango Transport DLA"
    },
    {
      chanel: "WhatsApp",
      commercialName: "Alice Nono",
      date: "24/02/2026",
      lead: {
        initials: "SD",
        name: "Samuel Dogmo",
        email: "sam.dogmo@gmail.com",
      },
      status: "converted",
    },
    {
      chanel: "Google",
      commercialName: "Cédric Fossuo",
      date: "24/02/2026",
      lead: { initials: "MK", name: "Marie Kenne", email: "m.kenne@yahoo.fr" },
      status: "contacted",
    },
    {
      chanel: "Instagram",
      commercialName: "Jean Kameni",
      date: "25/02/2026",
      lead: {
        initials: "BT",
        name: "Blaise Tamo",
        email: "b.tamo@outlook.com",
      },
      status: "lost",
    },
    {
      chanel: "Facebook",
      commercialName: "Alice Nono",
      date: "25/02/2026",
      lead: { initials: "YN", name: "Yvonne Ngue", email: "yvonne.n@firm.ci" },
      status: "qualified",
    },
    {
      chanel: "LinkedIn",
      commercialName: "Cédric Fossuo",
      date: "26/02/2026",
      lead: {
        initials: "PP",
        name: "Paul Pierre",
        email: "p.pierre@tech-solutions.cm",
      },
      status: "contacted",
    },
    {
      chanel: "WhatsApp",
      commercialName: "Jean Kameni",
      date: "26/02/2026",
      lead: { initials: "FK", name: "Franck Kuate", email: "f.kuate@pme.net" },
      status: "converted",
    },
    {
      chanel: "Google",
      commercialName: "Alice Nono",
      date: "27/02/2026",
      lead: {
        initials: "CM",
        name: "Chantal Mvondo",
        email: "chantal.m@service.cm",
      },
      status: "qualified",
    },
    {
      chanel: "Instagram",
      commercialName: "Cédric Fossuo",
      date: "27/02/2026",
      lead: { initials: "RT", name: "Raoul Tagne", email: "raoul.t@auto.cm" },
      status: "contacted",
    },
    {
      chanel: "Facebook",
      commercialName: "Jean Kameni",
      date: "28/02/2026",
      lead: { initials: "LS", name: "Luc Sadi", email: "l.sadi@btp.org" },
      status: "lost",
    },
    {
      chanel: "LinkedIn",
      commercialName: "Alice Nono",
      date: "01/03/2026",
      lead: {
        initials: "JA",
        name: "Julie Abena",
        email: "j.abena@marketing.com",
      },
      status: "converted",
    },
    {
      chanel: "WhatsApp",
      commercialName: "Cédric Fossuo",
      date: "02/03/2026",
      lead: {
        initials: "EN",
        name: "Eric Ndoumbe",
        email: "e.ndoumbe@it-dev.com",
      },
      status: "qualified",
    },
    {
      chanel: "Google",
      commercialName: "Jean Kameni",
      date: "02/03/2026",
      lead: {
        initials: "PT",
        name: "Patrice Tagne",
        email: "p.tagne@finances.cm",
      },
      status: "contacted",
    },
    {
      chanel: "Instagram",
      commercialName: "Alice Nono",
      date: "03/03/2026",
      lead: { initials: "OM", name: "Odile Mayo", email: "odile.m@retail.net" },
      status: "qualified",
    },
    {
      chanel: "Facebook",
      commercialName: "Cédric Fossuo",
      date: "04/03/2026",
      lead: {
        initials: "BB",
        name: "Boris Bella",
        email: "b.bella@startup.io",
      },
      status: "converted",
    },
  ];

  const paginationMeta = useMemo(
    () => ({
      totalRecords: leadsList.length ?? 0,
      totalPages: 1,
      currentPage: 1,
      itemPerPage: 10,
    }),
    [leadsList.length],
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

  const tableColumns: Column<LeadItem>[] = useMemo<Column<LeadItem>[]>(
    () => [
      {
        header: "Date d'ajout",
        accessor: (item) => item.date,
      },
      {
        header: "Nom",
        accessor: (item) => item.lead.name
      },
      {
        header: "E-mail",
        accessor: (item) => item.lead.email
      },
      {
        header: "Numéro de téléphone",
        accessor: (item) => item.lead.phoneNum?? "-"
      },
      {
        header: "Entreprise",
        accessor: (item) => item.company?? "-"
      },
      {
        header: "Source",
        accessor: (item) => item.chanel,
      },    
      {
        header: "Commercial assigné",
        accessor: (item) => item.commercialName,
      },
      {
        header: "Statut",
        accessor: (item) => React.createElement(Badge, { type: item.status }),
      },
    ],
    [],
  );

  return {
    kpiItems,
    tableColumns,
    leadsList,
    pagination,
  };
};
