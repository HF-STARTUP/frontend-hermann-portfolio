import { Column } from "@/components/display/CustomTableDisplay";
import { useGetActiveCurrency } from "@/hooks/__globlal/useGlobalHook";
import { formatNumber } from "@/lib/utils";
import React, { useMemo } from "react";

export interface TransactionItem{
    fleetName: string;
    owner: string;
    type: "Entrepreneur" | "Professionnel";
    paymentMethods: ("Mobile Money" | "Carte Visa")[];
    transactions: number[];
    fees: number[];
    comissions: number[];
}

export const useIncomingHook = ()=>{
    const {currency} = useGetActiveCurrency()

    const incomingTransactions: TransactionItem[] = [
        {
            fleetName: "Express Douala",
            owner: "Hermann Fomo",
            type: "Entrepreneur",
            paymentMethods: ["Mobile Money", "Carte Visa"],
            transactions: [25000, 15000], 
            fees: [250, 300],
            comissions: [2500, 1500]
        },
        {
            fleetName: "LogiCam Unit",
            owner: "Jean-Pierre Bakang",
            type: "Professionnel",
            paymentMethods: ["Carte Visa"],
            transactions: [120000],
            fees: [2400],
            comissions: [12000]
        },
        {
            fleetName: "Coastal Fleet",
            owner: "Marie Ngo",
            type: "Entrepreneur",
            paymentMethods: ["Mobile Money", "Mobile Money"],
            transactions: [5000, 3500],
            fees: [50, 35],
            comissions: [500, 350]
        },
        {
            fleetName: "Kribi Logistics",
            owner: "Samuel Eto'o",
            type: "Professionnel",
            paymentMethods: ["Carte Visa", "Mobile Money"],
            transactions: [200000, 50000],
            fees: [4000, 500],
            comissions: [20000, 5000]
        },
        {
            fleetName: "Urban Move",
            owner: "Alice Tchebe",
            type: "Entrepreneur",
            paymentMethods: ["Mobile Money"],
            transactions: [8500],
            fees: [85],
            comissions: [850]
        },
        {
            fleetName: "Bafoussam Trans",
            owner: "Sylvain Kamga",
            type: "Entrepreneur",
            paymentMethods: ["Mobile Money", "Carte Visa"],
            transactions: [12000, 45000],
            fees: [120, 900],
            comissions: [1200, 4500]
        },
        {
            fleetName: "Sahel Express",
            owner: "Ousmanou Baba",
            type: "Professionnel",
            paymentMethods: ["Mobile Money", "Mobile Money", "Mobile Money"],
            transactions: [15000, 20000, 10000],
            fees: [150, 200, 100],
            comissions: [1500, 2000, 1000]
        },
        {
            fleetName: "Prime Delivery",
            owner: "Catherine Atangana",
            type: "Professionnel",
            paymentMethods: ["Carte Visa", "Carte Visa"],
            transactions: [30000, 15000],
            fees: [600, 300],
            comissions: [3000, 1500]
        },
        {
            fleetName: "Global Cargo",
            owner: "Ibrahim Moussa",
            type: "Entrepreneur",
            paymentMethods: ["Mobile Money"],
            transactions: [75000],
            fees: [750],
            comissions: [7500]
        },
        {
            fleetName: "Mountain Riders",
            owner: "Franck Njoh",
            type: "Entrepreneur",
            paymentMethods: ["Mobile Money", "Carte Visa"],
            transactions: [5000, 25000],
            fees: [50, 500],
            comissions: [500, 2500]
        }
    ];
    
      const paginationMeta = useMemo(
        () => ({
          totalRecords: incomingTransactions.length ?? 0,
          totalPages: 1,
          currentPage: 1,
          itemPerPage: 10,
        }),
        [incomingTransactions.length],
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
    
      const tableColumns: Column<TransactionItem>[] = useMemo<
        Column<TransactionItem>[]
      >(
        () => [
          {
            header: "Nom de la flotte",
            accessor: (item) => item.fleetName,
          },
          {
            header: "Propriétaire",
            accessor: (item) => item.owner,
          },
          {
            header: "Type",
            accessor: (item) =>
              item.type,
          },
          {
            header: "Moyen de paiement",
            accessor: (item) =>
              React.createElement(
                "div",
                { 
                  className: "flex flex-col gap-2", // Utilisation de flex-col avec gap-2
                  style: { display: "flex", flexDirection: "column", gap: "8px" } 
                },
                item.paymentMethods.map((method, index) =>
                  React.createElement(
                    "div",
                    { 
                      key: index, 
                      style: { display: "flex", alignItems: "center", gap: "10px" } 
                    },                   
                    React.createElement("label", { className: "text-sm font-medium" }, method)
                  )
                )
              ),
          },
          {
            header: "Trans. Entrantes",
            accessor: (item) =>
              React.createElement(
                "div",
                { 
                  className: "flex flex-col gap-2", // Utilisation de flex-col avec gap-2
                  style: { display: "flex", flexDirection: "column", gap: "8px" } 
                },
                item.transactions.map((trans, index) =>
                  React.createElement(
                    "div",
                    { 
                      key: index, 
                      style: { display: "flex", alignItems: "center", gap: "10px" } 
                    },                   
                    React.createElement("label", { className: "text-sm font-medium text-vaGreen" }, `${formatNumber(trans)} ${currency}`)
                  )
                )
              ),
          },
          {
            header: "Frais sur transaction",
            accessor: (item) =>
              React.createElement(
                "div",
                { 
                  className: "flex flex-col gap-2", // Utilisation de flex-col avec gap-2
                  style: { display: "flex", flexDirection: "column", gap: "8px" } 
                },
                item.fees.map((fee, index) =>
                  React.createElement(
                    "div",
                    { 
                      key: index, 
                      style: { display: "flex", alignItems: "center", gap: "10px" } 
                    },                   
                    React.createElement("label", { className: "text-sm font-medium text-vaTextPrimary" }, `${formatNumber(fee)} ${currency}`)
                  )
                )
              ),
          },
          {
            header: "Comission VTCC",
            accessor: (item) =>
              React.createElement(
                "div",
                { 
                  className: "flex flex-col gap-2", // Utilisation de flex-col avec gap-2
                  style: { display: "flex", flexDirection: "column", gap: "8px" } 
                },
                item.comissions.map((com, index) =>
                  React.createElement(
                    "div",
                    { 
                      key: index, 
                      style: { display: "flex", alignItems: "center", gap: "10px" } 
                    },                   
                    React.createElement("label", { className: "text-sm font-medium text-vaMainBlue" }, `${formatNumber(com)} ${currency}`)
                  )
                )
              ),
          },
        ],
        [],
      );


    return{
        tableColumns,
        pagination,
        incomingTransactions
    }
}