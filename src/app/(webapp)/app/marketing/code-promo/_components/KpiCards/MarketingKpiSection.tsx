"use client"

import React from "react"
import { KpiCard } from "./KpiCard"
import { useGetPromoCodeMetrics } from "@/hooks/marketing/useMarketing"
import { Ticket, Users } from "lucide-react"
import { LoadingBar } from "@/components/ui/Loader"
import { usePromoCodePeriod } from "../../../_context/PromoCodePeriodContext"

export const MarketingKpiSection: React.FC = () => {
  const { dateRange } = usePromoCodePeriod()
  const { data:metrics, isLoading } = useGetPromoCodeMetrics(dateRange)

  if (isLoading) {
    return <LoadingBar />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <KpiCard
        icon={<Ticket className="w-6 h-6 text-emerald-600" />}
        iconBgColor="bg-emerald-50"
        title="Total codes créés"
        value={metrics?.codes_crees?.value ?? 0}
        growth={metrics?.codes_crees?.percentage_change}
        evolution={metrics?.codes_crees?.evolution}
      />

      <KpiCard
        icon={<Ticket className="w-6 h-6 text-emerald-600" />}
        iconBgColor="bg-emerald-50"
        title="Codes actifs"
        value={metrics?.codes_actifs?.value ?? 0}
        growth={metrics?.codes_actifs?.percentage_change}
        evolution={metrics?.codes_actifs?.evolution}
      />

      <KpiCard
        icon={<Users className="w-6 h-6 text-blue-600" />}
        iconBgColor="bg-blue-50"
        title="Commerciaux avec code"
        value={metrics?.commerciaux_avec_code?.value ?? 0}
        growth={metrics?.commerciaux_avec_code?.percentage_change}
        evolution={metrics?.commerciaux_avec_code?.evolution}
      />
    </div>
  )
}
