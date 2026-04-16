"use client"

import React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MarketingFilters, CODE_TYPE_OPTIONS } from "@/types/marketing.types"

const STATUS_OPTIONS = [
  { value: "all", label: "Tous les statuts" },
  { value: "DRAFT", label: "Brouillon" },
  { value: "ACTIVE", label: "Actif" },
  { value: "SUSPENDED", label: "Suspendu" },
  { value: "DEACTIVATED", label: "Désactivé" },
  { value: "EXPIRED", label: "Expiré" },
  { value: "ARCHIVED", label: "Archivé" },
] as const

interface CodesTableFiltersProps {
  filters: MarketingFilters
  onFiltersChange: (filters: MarketingFilters) => void
}

export const CodesTableFilters: React.FC<CodesTableFiltersProps> = ({
  filters,
  onFiltersChange,
}) => {
  const handleCodeTypeChange = (value: string) => {
    onFiltersChange({
      ...filters,
      code_type: value === "all" ? undefined : value,
    })
  }

  const handleStatusChange = (value: string) => {
    onFiltersChange({
      ...filters,
      status: value === "all" ? undefined : value,
    })
  }

  const handleItemPerPageChange = (value: string) => {
    const n = parseInt(value, 10)
    if (!isNaN(n)) onFiltersChange({ ...filters, itemPerPage: n })
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      <Select
        value={filters.code_type ?? "all"}
        onValueChange={handleCodeTypeChange}
      >
        <SelectTrigger className="w-[200px] h-11 border-gray-200 rounded-2xl">
          <SelectValue placeholder="Tous les types de code" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les types de code</SelectItem>
          {CODE_TYPE_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.status ?? "all"} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-[160px] h-10 border-gray-200 rounded-2xl" inForm>
          <SelectValue placeholder="Tous les statuts" />
        </SelectTrigger>
        <SelectContent>
          {STATUS_OPTIONS.map((option) => (
            <SelectItem
              key={option.value || "all"}
              value={option.value || "all"}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>     
    </div>
  )
}
