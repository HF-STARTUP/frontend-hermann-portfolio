"use client"

import React from "react"
import { MarketingHeader } from "./_components/MarketingHeader"
import { MarketingKpiSection } from "./_components/KpiCards/MarketingKpiSection"
import { CodeUsageChart } from "./_components/CodeUsageChart/CodeUsageChart"
import { CodesHistoryTable } from "./_components/CodesHistory/CodesHistoryTable"

export default function MarketingPage() {
  const [period, setPeriod] = React.useState("this_month")
  const [createCodeDialogOpen, setCreateCodeDialogOpen] = React.useState(false)

  const handleCreateCode = () => {
    setCreateCodeDialogOpen(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <MarketingHeader 
        period={period} 
        onPeriodChange={setPeriod} 
      />
      
      <MarketingKpiSection />
      
      <CodeUsageChart />
      
      <CodesHistoryTable 
        onCreateCode={handleCreateCode}
      />
    </div>
  )
}
