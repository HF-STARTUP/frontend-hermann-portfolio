import Badge from "@/components/display/Badge";
import { Column } from "@/components/display/CustomTableDisplay";
import React, { useMemo } from "react";

export type LeadStatus = "qualified" | "converted" | "contacted" | "lost";
export type LeadStep = "new" | "demo_planed" | "proposition" | LeadStatus

export interface LeadItem {
  lead: {
    name: string;
    email?: string;
    initials: string;
    phoneNum?: string
  };
  chanel: string;
  date: string;
  commercialName: string;
  status: LeadStatus;
  company?: string;
  currentStep: LeadStep; 
}

export const useCampagneLeadsHook = () => {
  const leadsList: LeadItem[] = [
    {
      chanel: "Facebook",
      commercialName: "Jean Kameni",
      date: "23/02/2026",
      lead: {
        initials: "HF",
        name: "Hermann Fomo",
        email: "hermann.f@gmail.com",
      },
      status: "qualified",
      currentStep: "converted"
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
      currentStep: "lost"
    },
    {
      chanel: "Google",
      commercialName: "Cédric Fossuo",
      date: "24/02/2026",
      lead: { initials: "MK", name: "Marie Kenne", email: "m.kenne@yahoo.fr" },
      status: "contacted",
      currentStep: "demo_planed"
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
      currentStep: "new"
    },
    {
      chanel: "Facebook",
      commercialName: "Alice Nono",
      date: "25/02/2026",
      lead: { initials: "YN", name: "Yvonne Ngue", email: "yvonne.n@firm.ci" },
      status: "qualified",
      currentStep: "demo_planed"
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
      currentStep: "converted"
    },
    {
      chanel: "WhatsApp",
      commercialName: "Jean Kameni",
      date: "26/02/2026",
      lead: { initials: "FK", name: "Franck Kuate", email: "f.kuate@pme.net" },
      status: "converted",
      currentStep:"lost"
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
      currentStep: "contacted"
    },
    {
      chanel: "Instagram",
      commercialName: "Cédric Fossuo",
      date: "27/02/2026",
      lead: { initials: "RT", name: "Raoul Tagne", email: "raoul.t@auto.cm" },
      status: "contacted",
      currentStep:"contacted"
    },
    {
      chanel: "Facebook",
      commercialName: "Jean Kameni",
      date: "28/02/2026",
      lead: { initials: "LS", name: "Luc Sadi", email: "l.sadi@btp.org" },
      status: "lost",
      currentStep:"lost"
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
      currentStep: "converted"
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
      currentStep: "new"
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
      currentStep: "contacted"
    },
    {
      chanel: "Instagram",
      commercialName: "Alice Nono",
      date: "03/03/2026",
      lead: { initials: "OM", name: "Odile Mayo", email: "odile.m@retail.net" },
      status: "qualified",
      currentStep: "new"
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
      currentStep: "converted"
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
        header: "Lead",
        accessor: (item: LeadItem) => {
          return React.createElement(
            "div",
            { className: "flex items-center gap-2 w-max" },
            // 1. L'Avatar (le cercle avec initiales)
            React.createElement(
              "div",
              {
                className:
                  "flex items-center justify-center size-8 rounded-full bg-vaDarkPurple text-vaPurple font-semibold text-xs shrink-0",
              },
              item.lead.initials,
            ),
            // 2. Le conteneur de texte (Nom + Email)
            React.createElement(
              "div",
              { className: "flex flex-col justify-center" },
              React.createElement(
                "span",
                {
                  className:
                    "text-sm font-medium text-black line-clamp-1 truncate",
                },
                item.lead.name,
              ),
              React.createElement(
                "span",
                { className: "text-xs text-gray-500 leading-none" },
                item.lead.email,
              ),
            ),
          );
        },
      },
      {
        header: "Canal",
        accessor: (item) => React.createElement(Badge, {variant: "blue"}, item.chanel),
      },
      {
        header: "Date",
        accessor: (item) => item.date,
      },
      {
        header: "Commercial",
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
    leadsList,
    tableColumns,
    pagination
  };
};
