"use client"

import React from "react"
import { Input } from "@/components/ui/input"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Search } from "lucide-react"
import { MarketingFilters } from "@/types/marketing.types"

interface CodesTableFiltersProps {
  filters: MarketingFilters
  onFiltersChange: (filters: MarketingFilters) => void
}

export const CodesTableFilters: React.FC<CodesTableFiltersProps> = ({
  filters,
  onFiltersChange,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ ...filters, search: e.target.value })
  }

  const handleConversionRateChange = (value: string) => {
    onFiltersChange({ ...filters, conversionRate: value })
  }

  const handleCodeTypeChange = (value: string) => {
    onFiltersChange({ ...filters, codeType: value })
  }

  const handleStatusChange = (value: string) => {
    onFiltersChange({ ...filters, status: value })
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="relative flex-1 min-w-[250px] max-w-[300px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Recherche un code spécifique..."
          value={filters.search}
          onChange={handleSearchChange}
          className="pl-10 h-12 border-gray-200 bg-gray-50 rounded-lg"
        />
      </div>

      <Select 
        value={filters.conversionRate} 
        onValueChange={handleConversionRateChange}
      >
        <SelectTrigger className="w-[220px] h-12 border-gray-200 rounded-lg">
          <SelectValue placeholder="Tous les taux de conversions" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les taux de conversions</SelectItem>
          <SelectItem value="high">Taux élevé (&gt; 70%)</SelectItem>
          <SelectItem value="medium">Taux moyen (30-70%)</SelectItem>
          <SelectItem value="low">Taux faible (&lt; 30%)</SelectItem>
        </SelectContent>
      </Select>

      <Select 
        value={filters.codeType} 
        onValueChange={handleCodeTypeChange}
      >
        <SelectTrigger className="w-[200px] h-12 border-gray-200 rounded-lg">
          <SelectValue placeholder="Tous les types de code" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les types de code</SelectItem>
          <SelectItem value="reduction_nouveau_client">Réduction nouveau client</SelectItem>
          <SelectItem value="fidelisation_client">Fidélisation client</SelectItem>
          <SelectItem value="coupon_gratuit">Coupon gratuit</SelectItem>
          <SelectItem value="reddition_commerciale">Reddition commerciale</SelectItem>
        </SelectContent>
      </Select>

      <Select 
        value={filters.status} 
        onValueChange={handleStatusChange}
      >
        <SelectTrigger className="w-[160px] h-12 border-gray-200 rounded-lg">
          <SelectValue placeholder="Tous les statuts" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les statuts</SelectItem>
          <SelectItem value="actif">Actif</SelectItem>
          <SelectItem value="suspendu">Suspendu</SelectItem>
          <SelectItem value="expire">Expiré</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
