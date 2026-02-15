"use client"

import React, { createContext, useCallback, useMemo, useState } from "react"
import {
  endOfMonth,
  endOfYear,
  startOfMonth,
  startOfYear,
  subMonths,
  subYears,
} from "date-fns"
import type { PromoCodeMetricsFilterParams } from "@/types/marketing.types"

export type PromoCodePeriod =
  | "this_month"
  | "last_month"
  | "last_3_months"
  | "last_6_months"
  | "this_year"
  | "all_time"

function getDateRangeFromPeriod(period: PromoCodePeriod): PromoCodeMetricsFilterParams {
  const now = new Date()
  switch (period) {
    case "this_month": {
      return {
        start_date: startOfMonth(now).toISOString(),
        end_date: endOfMonth(now).toISOString(),
      }
    }
    case "last_month": {
      const last = subMonths(now, 1)
      return {
        start_date: startOfMonth(last).toISOString(),
        end_date: endOfMonth(last).toISOString(),
      }
    }
    case "last_3_months": {
      return {
        start_date: startOfMonth(subMonths(now, 2)).toISOString(),
        end_date: endOfMonth(now).toISOString(),
      }
    }
    case "last_6_months": {
      return {
        start_date: startOfMonth(subMonths(now, 5)).toISOString(),
        end_date: endOfMonth(now).toISOString(),
      }
    }
    case "this_year": {
      return {
        start_date: startOfYear(now).toISOString(),
        end_date: endOfYear(now).toISOString(),
      }
    }
    case "all_time": {
      return {
        start_date: startOfYear(subYears(now, 5)).toISOString(),
        end_date: endOfMonth(now).toISOString(),
      }
    }
    default:
      return {
        start_date: startOfMonth(now).toISOString(),
        end_date: endOfMonth(now).toISOString(),
      }
  }
}

interface PromoCodePeriodContextValue {
  period: PromoCodePeriod
  setPeriod: (period: PromoCodePeriod) => void
  dateRange: PromoCodeMetricsFilterParams
}

const PromoCodePeriodContext = createContext<PromoCodePeriodContextValue | null>(
  null,
)

const DEFAULT_PERIOD: PromoCodePeriod = "this_month"

export function PromoCodePeriodProvider({
  children,
  defaultPeriod = DEFAULT_PERIOD,
}: {
  children: React.ReactNode
  defaultPeriod?: PromoCodePeriod
}) {
  const [period, setPeriodState] = useState<PromoCodePeriod>(defaultPeriod)

  const setPeriod = useCallback((value: PromoCodePeriod) => {
    setPeriodState(value)
  }, [])

  const dateRange = useMemo(
    () => getDateRangeFromPeriod(period),
    [period],
  )

  const value = useMemo<PromoCodePeriodContextValue>(
    () => ({ period, setPeriod, dateRange }),
    [period, setPeriod, dateRange],
  )

  return (
    <PromoCodePeriodContext.Provider value={value}>
      {children}
    </PromoCodePeriodContext.Provider>
  )
}

export function usePromoCodePeriod(): PromoCodePeriodContextValue {
  const ctx = React.useContext(PromoCodePeriodContext)
  if (!ctx) {
    throw new Error(
      "usePromoCodePeriod must be used within PromoCodePeriodProvider",
    )
  }
  return ctx
}
