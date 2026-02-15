"use client"

import React from "react"
import { KpiCard } from "./KpiCard"
import { useGetMarketingKpis, useGetPromoCodeMetrics } from "@/hooks/marketing/useMarketing"
import { Ticket, Users } from "lucide-react"
import { LoadingBar } from "@/components/ui/Loader"
import { usePromoCodePeriod } from "../../_context/PromoCodePeriodContext"

const MOCK_KPIS = {
  totalCodes: 346,
  totalCommercials: 123,
  activeCodes: { current: 346, total: 340 },
  monthlyGrowth: 12,
}

export const MarketingKpiSection: React.FC = () => {
  const { dateRange } = usePromoCodePeriod()
  const { data: kpis, isLoading } = useGetMarketingKpis()
  const { data: globalMetrics, isLoading: isGlobalMetricsLoading } =
    useGetPromoCodeMetrics(dateRange)

  const displayKpis = kpis ?? MOCK_KPIS

  if (isLoading) {
    return <LoadingBar />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <KpiCard
        icon={<Ticket className="w-6 h-6 text-emerald-600" />}
        iconBgColor="bg-emerald-50"
        title="Total codes crées"
        value={displayKpis.totalCodes}
        growth={displayKpis.monthlyGrowth}
      />

      <KpiCard
        icon={<Users className="w-6 h-6 text-blue-600" />}
        iconBgColor="bg-blue-50"
        title="Total commerciaux"
        value={displayKpis.totalCommercials}
        growth={displayKpis.monthlyGrowth}
      />

      <KpiCard
        icon={<Ticket className="w-6 h-6 text-emerald-600" />}
        iconBgColor="bg-emerald-50"
        title="Codes actifs"
        value={displayKpis.activeCodes.current}
        subValue={String(displayKpis.activeCodes.total)}
        growth={displayKpis.monthlyGrowth}
      />
    </div>
  )
}
