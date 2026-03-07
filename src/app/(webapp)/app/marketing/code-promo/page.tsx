"use client"

import React from "react"
import { MarketingHeader } from "./_components/MarketingHeader"
import { MarketingKpiSection } from "./_components/KpiCards/MarketingKpiSection"
import { CodeUsageChart } from "./_components/CodeUsageChart/CodeUsageChart"
import { CodesHistoryTable } from "./_components/CodesHistory/CodesHistoryTable"
import { PromoCodePeriodProvider } from "../_context/PromoCodePeriodContext"

export default function MarketingPage() {
  return (
    <PromoCodePeriodProvider>
      <div className="flex flex-col gap-6">
        <MarketingHeader />

        <MarketingKpiSection />

        <CodeUsageChart />

        <CodesHistoryTable  />
      </div>
    </PromoCodePeriodProvider>
  )
}
