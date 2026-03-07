"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ArrowUp, ArrowDown } from "lucide-react"
import type { PromoCodeMetricsEvolution } from "@/types/marketing.types"

interface KpiCardProps {
  icon: React.ReactNode
  iconBgColor?: string
  title: string
  value: string | number
  subValue?: string
  growth?: number
  growthLabel?: string
  evolution?: PromoCodeMetricsEvolution
}

export const KpiCard: React.FC<KpiCardProps> = ({
  icon,
  iconBgColor = "bg-emerald-50",
  title,
  value,
  subValue,
  growth,
  growthLabel = "ce mois",
  evolution,
}) => {
  const showGrowth = growth !== undefined && growth !== null
  const isNegative = evolution === "decrease" || (typeof growth === "number" && growth < 0)
  const displayValue =
    evolution === "decrease" && typeof growth === "number" && growth > 0
      ? -growth
      : growth

  return (
    <Card className="px-6 py-4 bg-white border border-gray-100 rounded-lg">
      <div className="flex flex-col gap-4">
        <div
          className={cn(
            "w-12 h-12 rounded-lg flex items-center justify-center",
            iconBgColor
          )}
        >
          {icon}
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 font-medium">{title}</span>

          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-gray-900">{value}</span>
            {subValue && (
              <span className="text-lg text-gray-400">/{subValue}</span>
            )}
          </div>

          {showGrowth && (
            <div
              className={cn(
                "flex items-center gap-1 text-sm font-medium",
                isNegative ? "text-red-500" : "text-emerald-500"
              )}
            >
              {isNegative ? (
                <ArrowDown className="w-4 h-4" />
              ) : (
                <ArrowUp className="w-4 h-4" />
              )}
              <span>
                {displayValue !== undefined && displayValue >= 0 && !isNegative
                  ? "+"
                  : ""}
                {displayValue ?? 0} % {growthLabel}
              </span>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
