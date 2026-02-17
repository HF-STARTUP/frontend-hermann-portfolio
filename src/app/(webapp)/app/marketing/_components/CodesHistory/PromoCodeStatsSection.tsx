"use client"

import React from "react"
import { cn } from "@/lib/utils"
import type { PromoCodeMetricsById } from "@/types/marketing.types"

function ProgressBar({
  value,
  max = 100,
  className,
  progressBarClassName,
}: {
  value: number
  max?: number
  className?: string,
  progressBarClassName?: string
}) {
  const pct = max <= 0 ? 0 : Math.min(100, (value / max) * 100)
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className={cn(
        "h-2 w-full overflow-hidden rounded-full bg-gray-200",
        className
      )}
    >
      <div
        className={cn("h-full rounded-full bg-violet-500 transition-[width] duration-300 ease-out", progressBarClassName)}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

function KpiCell({
  label,
  value,
  className,
}: {
  label: string
  value: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "border border-gray-100  px-3 py-2.5  bg-gray-50 rounded-lg outline outline-[1.33px] outline-offset-[-1.33px] outline-gray-200 ",
        className
      )}
    >
      <p className="text-[11px] font-medium uppercase tracking-wide text-gray-500 truncate">
        {label}
      </p>
      <p className="mt-0.5 text-base font-semibold text-gray-900 tabular-nums">
        {value}
      </p>
    </div>
  )
}

function ProgressRow({
  label,
  value,
  progress,
  progressMax,
  className,
}: {
  label: string
  value: string
  progress: number
  progressMax: number
  className?: string
}) {
  return (
    <div className="rounded-lg border border-gray-100 bg-white px-3 py-2.5">
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-xs font-medium text-gray-500">{label}</p>
        <span className="text-sm font-semibold tabular-nums text-gray-900">
          {value}
        </span>
      </div>
      <div className="mt-2">
        <ProgressBar value={progress} max={progressMax} progressBarClassName={className} />
      </div>
    </div>
  )
}

interface PromoCodeStatsSectionProps {
  metrics: PromoCodeMetricsById | null
  isLoading?: boolean
}

export const PromoCodeStatsSection: React.FC<PromoCodeStatsSectionProps> = ({
  metrics,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="border-t border-gray-100  px-4  py-4 space-y-4">
        <div>
          <div className="h-4 w-28 rounded bg-gray-200/80 mb-2" />
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-lg border border-gray-100 bg-white px-3 py-2.5"
              >
                <div className="h-3 w-16 rounded bg-gray-200/80" />
                <div className="mt-2 h-5 w-10 rounded bg-gray-200/80" />
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="h-4 w-40 rounded bg-gray-200/80 mb-2" />
          <div className="space-y-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="rounded-lg border border-gray-100 bg-white px-3 py-2.5"
              >
                <div className="flex justify-between">
                  <div className="h-3 w-28 rounded bg-gray-200/80" />
                  <div className="h-4 w-10 rounded bg-gray-200/80" />
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-gray-200/80" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!metrics) return null

  const {
    nb_comptes_crees,
    nb_utilisation,
    taux_conversion,
    nb_conversion,
    revenus_generes,
    nb_abonnements_payants,
  } = metrics

  const utilisationMax = Math.max(nb_comptes_crees, nb_utilisation, 1)

  return (
    <div className="border-t border-gray-100 py-4 pb-2 space-y-4">
      <section aria-labelledby="promo-kpi-title">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <KpiCell label="Taux de conversion" value={`${taux_conversion} %`} />
          <KpiCell label="Conversions" value={String(nb_conversion)} />
          <KpiCell label="Revenus générés" value={`${revenus_generes} F`} />
          <KpiCell
            label="Abonnements payants"
            value={String(nb_abonnements_payants)}
          />
        </div>
      </section>

      <section aria-labelledby="promo-progress-title">
        <div className="space-y-2">
          <ProgressRow
            label="Nombre total d'utilisation"
            value={String(nb_utilisation)}
            progress={nb_utilisation}
            progressMax={utilisationMax}
            className="relative bg-gradient-to-l from-sky-900 via-blue-700 to-sky-900 "
          />
          <ProgressRow
            label="Taux de conversion"
            value={`${taux_conversion} %`}
            progress={taux_conversion}
            progressMax={100}
            className="bg-gradient-to-l from-orange-400 via-yellow-400 to-yellow-600"
          />
        </div>
      </section>
    </div>
  )
}
