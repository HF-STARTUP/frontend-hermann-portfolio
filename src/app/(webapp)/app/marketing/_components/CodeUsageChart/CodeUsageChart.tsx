"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  type ChartConfig 
} from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { useGetCodeUsageStats } from "@/hooks/marketing/useMarketing"
import { LoadingBar } from "@/components/ui/Loader"

const MOCK_DATA = [
  { type: "reduction_nouveau_client", label: "Réduction nouveau client", count: 250 },
  { type: "fidelisation_client", label: "Fidélisation client existant", count: 200 },
  { type: "coupon_gratuit", label: "Coupon gratuit", count: 100 },
  { type: "reddition_commerciale", label: "Reddition Commerciale\n(Démo)", count: 50 },
]

const chartConfig: ChartConfig = {
  count: {
    label: "Utilisations",
    color: "#2563EB",
  },
}

export const CodeUsageChart: React.FC = () => {
  const { data: stats, isLoading } = useGetCodeUsageStats()
  
  const chartData = stats.length > 0 ? stats : MOCK_DATA

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
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
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
              domain={[0, 300]}
              ticks={[0, 50, 100, 150, 200, 250, 300]}
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
