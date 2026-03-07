"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { useGetPromoCodeUsageByType } from "@/hooks/marketing/useMarketing"
import { LoadingBar } from "@/components/ui/Loader"
import { usePromoCodePeriod } from "../../_context/PromoCodePeriodContext"
import type { CodeUsageData } from "@/types/marketing.types"

const chartConfig: ChartConfig = {
  count: {
    label: "Utilisations",
    color: "#2563EB",
  },
}

function formatTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    NEW_CLIENT: "Nouveau client",
    LOYALTY: "Fidélisation",
    FREE_COUPON: "Coupon gratuit",
    COMMERCIAL_RENDITION: "Reddition commerciale",
  }
  return labels[type] ?? type
}

function toChartData(items: CodeUsageData[]): { label: string; count: number }[] {
  return items.map((d) => ({
    label: formatTypeLabel(d.type),
    count: d.nombre_utilisation,
  }))
}

export const CodeUsageChart: React.FC = () => {
  const { dateRange } = usePromoCodePeriod()
  const { data: usageByType, isLoading } =
    useGetPromoCodeUsageByType(dateRange)

  const chartData = toChartData(usageByType)

  if (isLoading) {
    return (
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">
            Utilisation par type de code
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LoadingBar />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900">
          Utilisation par type de code
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
          >
            <CartesianGrid
              strokeDasharray="0"
              vertical={false}
              stroke="#E5E7EB"
            />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6B7280" }}
              interval={0}
              angle={0}
              textAnchor="middle"
              height={80}
              tickFormatter={(value) => {
                if (value.includes("\n")) {
                  return value.split("\n")[0]
                }
                return value.length > 20 ? value.substring(0, 20) + "..." : value
              }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6B7280" }}
              domain={[0, "auto"]}
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
              cursor={{ fill: "rgba(37, 99, 235, 0.1)" }}
            />
            <Bar
              dataKey="count"
              fill="#2563EB"
              radius={[4, 4, 0, 0]}
              maxBarSize={100}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
