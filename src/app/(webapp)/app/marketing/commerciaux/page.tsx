"use client"

import React from "react"
import { CommerciauxHeader } from "./_components/CommerciauxHeader"
import { CommerciauxTable } from "./_components/CommerciauxTable/CommerciauxTable"

export default function CommerciauxPage() {
  const [period, setPeriod] = React.useState("this_month")

  return (
    <div className="flex flex-col gap-4">
      <CommerciauxHeader
        period={period}
        onPeriodChange={setPeriod}
        withPeriodSelector={false}
      />

      <CommerciauxTable />
    </div>
  )
}
