"use client"

import React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useCountries } from "@/hooks/location/useCountry/useCountry"
import {
  SalesAgentFilters,
  SALES_AGENT_CHANNEL_OPTIONS,
} from "@/types/marketing.types"

export type SalesAgentTableFilters = Pick<
  SalesAgentFilters,
  "channel" | "country_id" | "start_date" | "end_date"
>

interface CommerciauxTableFiltersProps {
  filters: SalesAgentTableFilters
  onFiltersChange: (filters: SalesAgentTableFilters) => void
}

export const CommerciauxTableFilters: React.FC<
  CommerciauxTableFiltersProps
> = ({ filters, onFiltersChange }) => {
  const { data: countries, isLoading: loadingCountries } = useCountries()

  const handleChange = <K extends keyof SalesAgentTableFilters>(
    field: K,
    value: SalesAgentTableFilters[K]
  ) => {
    onFiltersChange({ ...filters, [field]: value })
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select
        value={filters.channel ?? "all"}
        onValueChange={(v) =>
          handleChange("channel", v === "all" ? undefined : v)
        }
      >
        <SelectTrigger className="w-[180px] h-10 border-gray-200 rounded-2xl">
          <SelectValue placeholder="Canal" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les canaux</SelectItem>
          {SALES_AGENT_CHANNEL_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.country_id != null ? String(filters.country_id) : "all"}
        onValueChange={(v) =>
          handleChange("country_id", v === "all" ? undefined : Number(v))
        }
        disabled={loadingCountries}
      >
        <SelectTrigger className="w-[200px] h-10 rounded-2xl">
          <SelectValue placeholder="Tous les pays" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les pays</SelectItem>
          {countries?.map((c) => (
            <SelectItem key={c.id} value={String(c.id)}>
              {c.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* <Input
        type="date"
        placeholder="Date de début"
        value={filters.start_date ?? ""}
        onChange={(e) =>
          handleChange("start_date", e.target.value || undefined)
        }
        className="w-[160px] h-[47px] border-gray-200 rounded-lg"
      />

      <Input
        type="date"
        placeholder="Date de fin"
        value={filters.end_date ?? ""}
        onChange={(e) =>
          handleChange("end_date", e.target.value || undefined)
        }
        className="w-[160px] h-[47px] border-gray-200 rounded-lg"
      /> */}
    </div>
  )
}
