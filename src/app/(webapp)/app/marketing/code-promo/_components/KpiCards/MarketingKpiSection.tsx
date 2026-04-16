"use client"

import React from "react"
import { KpiCard } from "./KpiCard"
import { useGetPromoCodeMetrics } from "@/hooks/marketing/useMarketing"
import { Ticket, Users, CheckCircle } from "lucide-react" // Ajout de CheckCircle pour varier l'icône
import { LoadingBar } from "@/components/ui/Loader"
import { usePromoCodePeriod } from "../../../_context/PromoCodePeriodContext"
import KpiGrid, { KpiItem } from "@/components/display/Kpi"

export const MarketingKpiSection: React.FC = () => {
  const { dateRange } = usePromoCodePeriod()
  const { data: metrics, isLoading } = useGetPromoCodeMetrics(dateRange)

  // On complète le tableau kpiItems ici
  const kpiItems: KpiItem[] = [
    {
      icon: <Ticket />,
      title: "Total codes créés",
      value: metrics?.codes_crees?.value ?? 0,
      variation: metrics?.codes_crees?.evolution == "increase" ? "up" : metrics?.codes_crees?.evolution == "decrease" ? "down" : "stable",
      hint: `${metrics?.codes_crees?.percentage_change} %`,
      variant: "green"
    },
    {
      icon: <CheckCircle />,
      title: "Codes actifs",
      value: metrics?.codes_actifs?.value ?? 0,
      variation: metrics?.codes_actifs?.evolution == "increase" ? "up" : metrics?.codes_actifs?.evolution == "decrease" ? "down" : "stable",
      hint: `${metrics?.codes_actifs?.percentage_change} %`,
      variant: "green"
    },
    {
      icon: <Users />,
      title: "Commerciaux avec code",
      value: metrics?.commerciaux_avec_code?.value ?? 0,
      variation: metrics?.commerciaux_avec_code?.evolution == "increase" ? "up" : metrics?.commerciaux_avec_code?.evolution == "decrease" ? "down" : "stable",
      hint: `${metrics?.commerciaux_avec_code?.percentage_change} %`,
      variant: "blue"
    }
  ]

  return (
    <KpiGrid items={kpiItems} isLoading={isLoading} />
  )
}