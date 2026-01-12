"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Commercial, CommercialPerformance } from "@/types/marketing.types"
import { Switch } from "@/components/ui/switch"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Eye, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ColumnOptions {
  onStatusChange: (commercialId: string, newStatus: 'actif' | 'inactif') => void
  onDelete: (commercialId: string) => void
  onView: (commercial: Commercial) => void
}

const getPerformanceLabel = (performance: CommercialPerformance): string => {
  const labels: Record<CommercialPerformance, string> = {
    excellent: 'Excellent',
    bon: 'Bon',
    moyen: 'Moyen',
    faible: 'Faible',
  }
  return labels[performance]
}

const getPerformanceColor = (performance: CommercialPerformance): string => {
  const colors: Record<CommercialPerformance, string> = {
    excellent: 'text-green-600',
    bon: 'text-blue-600',
    moyen: 'text-yellow-600',
    faible: 'text-red-600',
  }
  return colors[performance]
}

export const createColumns = ({
  onStatusChange,
  onDelete,
  onView,
}: ColumnOptions): ColumnDef<Commercial>[] => [
  {
    accessorKey: "createdAt",
    header: "Date d'ajout",
    cell: ({ row }) => (
      <span className="text-gray-600 text-sm whitespace-nowrap">
        {row.original.createdAt}
      </span>
    ),
  },
  {
    accessorKey: "name",
    header: "Nom et Prénoms",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-xs">
          {row.original.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-gray-900 text-sm">{row.original.name}</span>
          <span className="text-xs text-gray-500">{row.original.email}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "country",
    header: "Pays",
    cell: ({ row }) => (
      <span className="text-gray-600 text-sm">
        {row.original.country}
      </span>
    ),
  },
  {
    accessorKey: "codesAssigned",
    header: "Codes attribués",
    cell: ({ row }) => (
      <span className="font-medium text-gray-900 text-sm">
        {row.original.codesAssigned}
      </span>
    ),
  },
  {
    accessorKey: "codesUsed",
    header: "Codes utilisés",
    cell: ({ row }) => (
      <span className="font-medium text-gray-900 text-sm">
        {row.original.codesUsed}
      </span>
    ),
  },
  {
    accessorKey: "paidAccounts",
    header: "Comptes payants",
    cell: ({ row }) => (
      <span className="font-medium text-gray-900 text-sm">
        {row.original.paidAccounts}
      </span>
    ),
  },
  {
    accessorKey: "conversionRate",
    header: "Taux de conversion",
    cell: ({ row }) => (
      <span className="font-medium text-gray-900 text-sm">
        {row.original.conversionRate}%
      </span>
    ),
  },
  {
    accessorKey: "revenue",
    header: "Revenu généré",
    cell: ({ row }) => (
      <span className="font-medium text-gray-900 text-sm">
        {new Intl.NumberFormat('fr-FR').format(row.original.revenue)} FCFA
      </span>
    ),
  },
  {
    accessorKey: "performance",
    header: "Performance",
    cell: ({ row }) => (
      <span className={cn(
        "font-medium text-sm",
        getPerformanceColor(row.original.performance)
      )}>
        {getPerformanceLabel(row.original.performance)}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => {
      const isActive = row.original.status === 'actif'
      return (
        <div className="flex items-center gap-2">
          <Switch
            checked={isActive}
            onCheckedChange={(checked) => 
              onStatusChange(row.original.id, checked ? 'actif' : 'inactif')
            }
          />
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onView(row.original)}>
            <Eye className="h-4 w-4 mr-2" />
            Voir détails
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onDelete(row.original.id)}
            className="text-red-600 focus:text-red-600"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]
