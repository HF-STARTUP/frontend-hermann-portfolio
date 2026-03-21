import { KpiItem } from "@/components/display/Kpi";
import { formatNumber } from "@/lib/utils";
import React, { useMemo, useState } from "react";
import { Users2 } from "lucide-react";
import { TbCashBanknote } from "react-icons/tb";
import { useGetActiveCurrency } from "@/hooks/__globlal/useGlobalHook";
import { PiMegaphone } from "react-icons/pi";
import { LeadItem } from "../../campagnes/_hook/useCampagneLeadsHook";
import { Column } from "@/components/display/CustomTableDisplay";
import Badge from "@/components/display/Badge";
import { CashAltIcon } from "@/components/ui/__icons";


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
      icon: React.createElement(CashAltIcon),
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
        phoneNum: "+237 678 76 54 34",
      },
      status: "qualified",
      company: "ZETA Fleet",
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
        phoneNum: "+237 678 76 54 34",
      },
      status: "converted",
      company: "ZETA Fleet",
      currentStep: "lost"
    },
    {
      chanel: "Google",
      commercialName: "Cédric Fossuo",
      date: "24/02/2026",
      lead: { 
        initials: "MK",
        name: "Marie Kenne", 
        email: "m.kenne@yahoo.fr", 
        phoneNum: "+237 678 76 54 34",
       },      
      status: "contacted",
      company: "ZETA Fleet",
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
        phoneNum: "+237 678 76 54 34",
      },
      status: "lost",
      company: "ZETA Fleet",
      currentStep: "new"
    },
    {
      chanel: "Facebook",
      commercialName: "Alice Nono",
      date: "25/02/2026",
      lead: { 
        initials: "YN", 
        name: "Yvonne Ngue", 
        email: "yvonne.n@firm.ci", 
        phoneNum: "+237 678 76 54 34", 
      },      
      status: "qualified",
      company: "ZETA Fleet",
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
        phoneNum: "+237 678 76 54 34",
      },
      status: "contacted",
      company: "ZETA Fleet",
      currentStep: "converted"
    },
    {
      chanel: "WhatsApp",
      commercialName: "Jean Kameni",
      date: "26/02/2026",
      lead: { 
        initials: "FK", 
        name: "Franck Kuate", 
        email: "f.kuate@pme.net", 
        phoneNum: "+237 678 76 54 34", 
      },      
      status: "converted",
      company: "ZETA Fleet",
      currentStep: "lost"
    },
    {
      chanel: "Google",
      commercialName: "Alice Nono",
      date: "27/02/2026",
      lead: {
        initials: "CM",
        name: "Chantal Mvondo",
        email: "chantal.m@service.cm",
        phoneNum: "+237 678 76 54 34",
      },
      status: "qualified",
      company: "ZETA Fleet",
      currentStep: "contacted"
    },
    {
      chanel: "Instagram",
      commercialName: "Cédric Fossuo",
      date: "27/02/2026",
      lead: { 
        initials: "RT", 
        name: "Raoul Tagne", 
        email: "raoul.t@auto.cm", 
        phoneNum: "+237 678 76 54 34", 
      },      
      status: "contacted",
      company: "ZETA Fleet",
      currentStep: "contacted"
    },
    {
      chanel: "Facebook",
      commercialName: "Jean Kameni",
      date: "28/02/2026",
      lead: { 
        initials: "LS", 
        name: "Luc Sadi", 
        email: "l.sadi@btp.org", 
        phoneNum: "+237 678 76 54 34", 
      },      
      status: "lost",
      company: "ZETA Fleet",
      currentStep: "lost"
    },
    {
      chanel: "LinkedIn",
      commercialName: "Alice Nono",
      date: "01/03/2026",
      lead: {
        initials: "JA",
        name: "Julie Abena",
        email: "j.abena@marketing.com",
        phoneNum: "+237 678 76 54 34",
      },
      status: "converted",
      company: "ZETA Fleet",
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
        phoneNum: "+237 678 76 54 34",
      },
      status: "qualified",
      company: "ZETA Fleet",
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
        phoneNum: "+237 678 76 54 34",
      },
      status: "contacted",
      company: "ZETA Fleet",
      currentStep: "contacted"
    },
    {
      chanel: "Instagram",
      commercialName: "Alice Nono",
      date: "03/03/2026",
      lead: { 
        initials: "OM", 
        name: "Odile Mayo", 
        email: "odile.m@retail.net",        
        phoneNum: "+237 678 76 54 34",
       },
      status: "qualified",
      company: "ZETA Fleet",
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
        phoneNum: "+237 678 76 54 34",
      },
      status: "converted",
      company: "ZETA Fleet",
      currentStep: "proposition"
    },
  ];


  const newLeads: LeadItem[] = leadsList
    .filter((l) => l.currentStep === "new")

  const contactedLeads: LeadItem[] = leadsList
    .filter((l) => l.currentStep === "contacted")

  const demoPlanedLeads: LeadItem[] = leadsList
    .filter((l) => l.currentStep === "demo_planed")
  const propositionLeads: LeadItem[] = leadsList
    .filter((l) => l.currentStep === "proposition")
  const convertedLeads: LeadItem[] = leadsList
    .filter((l) => l.currentStep === "converted")
  const lostLeads: LeadItem[] = leadsList
    .filter((l) => l.currentStep === "lost")

  const paginationMeta = useMemo(
    () => ({
      totalRecords: leadsList.length ?? 0,
      totalPages: 1,
      currentPage: 1,
      itemPerPage: 20,
    }),
    [leadsList.length],
  );

  const pagination = useMemo(
    () => ({
      currentPage: paginationMeta.currentPage,
      totalPages: Math.max(1, paginationMeta.totalPages),
      onPageChange: () => { },
      totalEntries: paginationMeta.totalRecords,
      pageSize: 10,
      onPageSizeChange: () => { },
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
        accessor: (item) => item.lead.phoneNum ?? "-"
      },
      {
        header: "Entreprise",
        accessor: (item) => item.company ?? "-"
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


  const [selectedLead, setSelectedLead]  = useState<LeadItem>()
  const [isLeadDetailOpenned, setIsLeadDetailOpenned ]  =useState(false)

  const handleViewLead=(lead: LeadItem)=>{
    setSelectedLead(lead);
    setIsLeadDetailOpenned(true)
  }

  return {
    kpiItems,
    tableColumns,
    leadsList,
    pagination,

    currency,

    newLeads,
    contactedLeads,
    demoPlanedLeads,
    propositionLeads,
    convertedLeads,
    lostLeads,

    selectedLead,
    setSelectedLead,
    isLeadDetailOpenned,
    setIsLeadDetailOpenned,

    handleViewLead
  };
};
