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
import { CommercialFilters } from "@/types/marketing.types"

interface CommerciauxTableFiltersProps {
  filters: CommercialFilters
  onFiltersChange: (filters: CommercialFilters) => void
}

export const CommerciauxTableFilters: React.FC<CommerciauxTableFiltersProps> = ({
  filters,
  onFiltersChange,
}) => {
  const handleChange = (field: keyof CommercialFilters, value: string) => {
    onFiltersChange({ ...filters, [field]: value })
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Recherche un commercial..."
          value={filters.search}
          onChange={(e) => handleChange('search', e.target.value)}
          className="pl-10 w-[250px] h-[47px] border-gray-200 rounded-lg"
        />
      </div>

      <Select value={filters.conversionRate} onValueChange={(v) => handleChange('conversionRate', v)}>
        <SelectTrigger className="w-[220px] h-[47px] border-gray-200 rounded-lg">
          <SelectValue placeholder="Tous les taux de conversions" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les taux de conversions</SelectItem>
          <SelectItem value="high">Élevé (&gt;70%)</SelectItem>
          <SelectItem value="medium">Moyen (40-70%)</SelectItem>
          <SelectItem value="low">Faible (&lt;40%)</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filters.status} onValueChange={(v) => handleChange('status', v)}>
        <SelectTrigger className="w-[150px] h-[47px] border-gray-200 rounded-lg">
          <SelectValue placeholder="Tous les statuts" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les statuts</SelectItem>
          <SelectItem value="actif">Actif</SelectItem>
          <SelectItem value="inactif">Inactif</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filters.performance} onValueChange={(v) => handleChange('performance', v)}>
        <SelectTrigger className="w-[180px] h-[47px] border-gray-200 rounded-lg">
          <SelectValue placeholder="Tous les performances" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les performances</SelectItem>
          <SelectItem value="excellent">Excellent</SelectItem>
          <SelectItem value="bon">Bon</SelectItem>
          <SelectItem value="moyen">Moyen</SelectItem>
          <SelectItem value="faible">Faible</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filters.country} onValueChange={(v) => handleChange('country', v)}>
        <SelectTrigger className="w-[150px] h-[47px] border-gray-200 rounded-lg">
          <SelectValue placeholder="Tous les pays" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les pays</SelectItem>
          <SelectItem value="CI">Côte d'Ivoire</SelectItem>
          <SelectItem value="SN">Sénégal</SelectItem>
          <SelectItem value="CM">Cameroun</SelectItem>
          <SelectItem value="BF">Burkina Faso</SelectItem>
          <SelectItem value="ML">Mali</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
