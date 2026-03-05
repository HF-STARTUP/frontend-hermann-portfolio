import React, { useMemo } from "react";
import { FleetKpiCardProps } from "../components/_sub_components/fleetDetailKpi"
import { useGetActiveCurrency } from "@/hooks/__globlal/useGlobalHook"
import { Column } from "@/components/display/CustomTableDisplay";

export interface TransactionRow {
    date: string;
    amount: number;
    type: "entrée" | "sortie";
    paymentMethod: {
        name: string;
        icon: string;
    };
    fees: number;
    commissionVTCC: number;
}

export const useFleetTransactions = () => {

    const { currency } = useGetActiveCurrency()

    const transactionKpi: FleetKpiCardProps[] = [
        {
            title: "Total entrées",
            value: "100",
            variant: "green",
            hint: `125 000 ${currency}`
        },
        {
            title: "Total Sorties",
            value: "100",
            variant: "red",
            hint: `125 000 ${currency}`
        },
        {
            title: "Frais de transaction",
            value: "125 000",
            variant: "light-blue",   
            unit: currency          
        },
        {
            title: "Total Commissions VTCC",
            value: "125 000",
            variant: "blue",   
            unit: currency          
        }
    ]

    const transactions: TransactionRow[] = [
        {
            date: "12 Mar. 2026 à 10h00",
            amount: 100,
            type: "entrée",
            paymentMethod: {
                name: "Wave",
                icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI3wzGW2Od0fwu9d0nGua0cme_mSiKlz2u4A&s",
            },
            fees: 100,
            commissionVTCC: 100,
        },
        {
            date: "12 Mar. 2026 à 10h00",
            amount: 100,
            type: "sortie",
            paymentMethod: {
                name: "Wave",
                icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI3wzGW2Od0fwu9d0nGua0cme_mSiKlz2u4A&s",
            },
            fees: 100,
            commissionVTCC: 100,
        },
        {
            date: "12 Mar. 2026 à 10h00",
            amount: 100,
            type: "sortie",
            paymentMethod: {
                name: "Wave",
                icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI3wzGW2Od0fwu9d0nGua0cme_mSiKlz2u4A&s",
            },
            fees: 100,
            commissionVTCC: 100,
        },
        {
            date: "12 Mar. 2026 à 10h00",
            amount: 100,
            type: "sortie",
            paymentMethod: {
                name: "Wave",
                icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI3wzGW2Od0fwu9d0nGua0cme_mSiKlz2u4A&s",
            },
            fees: 100,
            commissionVTCC: 100,
        },
    ]

    const paginationMeta = useMemo(
        () => ({
          totalRecords: transactions.length ?? 0,
          totalPages: 1,
          currentPage: 1,
          itemPerPage: 10,
        }),
        [transactions.length],
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
    
      const tableColumns: Column<TransactionRow>[] = useMemo<
        Column<TransactionRow>[]
      >(
        () => [
          {
            header: "Date",
            accessor: (item) => item.date,
          },
          {
            header: "Type",
            accessor: (item) => item.type,
          },
          {
            header: "Montant",
            accessor: (item) =>
              `${item.amount} ${currency}`,
          },
          {
            header: "Methode de paiement",
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
            header: "Frais",
            accessor: (item) => `${item.fees} ${currency}`,
          },
          {
            header: "Commissions",
            accessor: (item) => `${item.commissionVTCC} ${currency}`,
          },
        ],
        [],
      );

    return { transactionKpi, pagination, tableColumns, transactions }
}