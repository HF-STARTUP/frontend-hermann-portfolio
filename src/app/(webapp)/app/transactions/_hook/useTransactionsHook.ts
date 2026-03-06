import { KpiItem } from "@/components/display/Kpi"
import { useGetActiveCurrency } from "@/hooks/__globlal/useGlobalHook"
import React from "react"
import { ArrowRightLeft, CreditCardIcon } from "lucide-react"
import { formatNumber } from "@/lib/utils"
import { PaymentData } from "../_components/CommissionVTCCChart"

export const useTransactionsHook = ()=>{

    const {currency} = useGetActiveCurrency()

    const incomingKpi: KpiItem[] = [
        {
            icon: React.createElement(CreditCardIcon),
            title: "Montant total des transactions",
            value: formatNumber(54450000),
            unit: currency,
            variation: "up",
            hint: "+8.5 vs mois précédent",
            variant: "green"
        },
        {
            icon: React.createElement(ArrowRightLeft, { className: "rotate-45" }),
            title: "Total frais sur transactions",
            value: formatNumber(2287500),
            unit: currency,
            variation: "up",
            hint: "+8.5 vs mois précédent",
            variant: "green"
        },
        {
            icon: React.createElement(ArrowRightLeft, { className: "rotate-45" }),
            title: "Commission VTCC (revenus)",
            value: formatNumber(587500),
            unit: currency,
            variation: "up",
            hint: "+8.5 vs mois précédent",
            variant: "green"
        }
    ]
    const outgoingKpi: KpiItem[] = [
        {
            icon: React.createElement(CreditCardIcon),
            title: "Montant total des transactions",
            value: formatNumber(54450000),
            unit: currency,
            variation: "up",
            hint: "+8.5 vs mois précédent",
            variant: "orange"
        },
        {
            icon: React.createElement(ArrowRightLeft, { className: "rotate-45" }),
            title: "Total frais sur transactions",
            value: formatNumber(2287500),
            unit: currency,
            variation: "up",
            hint: "+8.5 vs mois précédent",
            variant: "orange"
        },
        {
            icon: React.createElement(ArrowRightLeft, { className: "rotate-45" }),
            title: "Commission VTCC (revenus)",
            value: formatNumber(587500),
            unit: currency,
            variation: "up",
            hint: "+8.5 vs mois précédent",
            variant: "orange"
        }
    ]

    const evolutionChartLabels:string[] = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

    const incomingChartValues: number[] = [520, 520, 520, 520, 520, 530, 520];

    const outgoingChartValues: number[] = [430, 430, 430, 430, 430, 440, 430];

    const commissionChartValues: number[] = [260, 250, 290, 310, 280, 340, 370];


    const commissionData: PaymentData[] = [
        { id: 'pay-001', name: 'Orange Money', value: 12450000 },
        { id: 'pay-002', name: 'MTN MoMo', value: 8920000 },
        { id: 'pay-003', name: 'Carte VISA', value: 5720000 },
        { id: 'pay-004', name: 'Wave', value: 4150000 },
        { id: 'pay-005', name: 'Mastercard', value: 2800000 },
        { id: 'pay-006', name: 'Virement Bancaire', value: 1950000 },
        { id: 'pay-007', name: 'Moov Money', value: 1200000 },
        { id: 'pay-008', name: 'PayPal', value: 850000 },
        { id: 'pay-009', name: 'Crypto (USDT)', value: 600000 },
        { id: 'pay-010', name: 'Espèces (Dépôt)', value: 450000 },
      ];

      const totalAmount = 41590000 
    

    return {
        incomingKpi,
        outgoingKpi,

        evolutionChartLabels,
        incomingChartValues,
        outgoingChartValues,
        commissionChartValues,

        commissionData,
        totalAmount,
        currency
    }
}