"use client"

import { ColumnDef } from "@tanstack/react-table"
import {
  SalesAgent,
  SalesAgentPerformance,
} from "@/types/marketing.types"
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
  onStatusChange: (commercialId: string, newStatus: "actif" | "inactif") => void
  onDelete: (commercialId: string) => void
  onView: (commercial: SalesAgent) => void
}

const PERFORMANCE_LABELS: Record<SalesAgentPerformance, string> = {
  VERY_WEAK: "Très faible",
  WEAK: "Faible",
  AVERAGE: "Moyen",
  GOOD: "Bon",
  EXCELLENT: "Excellent",
}

const PERFORMANCE_COLORS: Record<SalesAgentPerformance, string> = {
  VERY_WEAK: "text-red-600",
  WEAK: "text-orange-600",
  AVERAGE: "text-yellow-600",
  GOOD: "text-blue-600",
  EXCELLENT: "text-green-600",
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  } catch {
    return iso
  }
}

export const createColumns = ({
  onStatusChange,
  onDelete,
  onView,
}: ColumnOptions): ColumnDef<SalesAgent>[] => [
  {
    accessorKey: "created_at",
    header: "Date d'ajout",
    cell: ({ row }) => (
      <span className="text-gray-600 text-sm whitespace-nowrap">
        {formatDate(row.original.created_at)}
      </span>
    ),
  },
  {
    id: "name",
    header: "Nom et Prénoms",
    cell: ({ row }) => {
      const { first_name, last_name, email } = row.original
      const name = `${first_name} ${last_name}`.trim()
      const initials = [first_name, last_name]
        .filter(Boolean)
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
      return (
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-xs">
            {initials || "—"}
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-gray-900 text-sm">{name}</span>
            <span className="text-xs text-gray-500">{email || "—"}</span>
          </div>
        </div>
      )
    },
  },
  {
    id: "country",
    accessorFn: (row) => row.country?.name,
    header: "Pays",
    cell: ({ row }) => (
      <span className="text-gray-600 text-sm">
        {row.original.country?.name ?? "—"}
      </span>
    ),
  },
  {
    id: "codes_attributed",
    accessorFn: (row) => row.metrics?.codes_attributed,
    header: "Codes attribués",
    cell: ({ row }) => (
      <span className="font-medium text-gray-900 text-sm">
        {row.original.metrics?.codes_attributed ?? 0}
      </span>
    ),
  },
  {
    id: "codes_used",
    accessorFn: (row) => row.metrics?.codes_used,
    header: "Codes utilisés",
    cell: ({ row }) => (
      <span className="font-medium text-gray-900 text-sm">
        {row.original.metrics?.codes_used ?? 0}
      </span>
    ),
  },
  {
    id: "paying_accounts",
    accessorFn: (row) => row.metrics?.paying_accounts,
    header: "Comptes payants",
    cell: ({ row }) => (
      <span className="font-medium text-gray-900 text-sm">
        {row.original.metrics?.paying_accounts ?? 0}
      </span>
    ),
  },
  {
    id: "conversion_rate",
    accessorFn: (row) => row.metrics?.conversion_rate,
    header: "Taux de conversion",
    cell: ({ row }) => (
      <span className="font-medium text-gray-900 text-sm">
        {row.original.metrics?.conversion_rate ?? 0}%
      </span>
    ),
  },
  {
    id: "revenue_generated",
    accessorFn: (row) => row.metrics?.revenue_generated,
    header: "Revenu généré",
    cell: ({ row }) => (
      <span className="font-medium text-gray-900 text-sm">
        {new Intl.NumberFormat("fr-FR").format(
          row.original.metrics?.revenue_generated ?? 0
        )}{" "}
        FCFA
      </span>
    ),
  },
  {
    id: "performance",
    accessorFn: (row) => row.metrics?.performance,
    header: "Performance",
    cell: ({ row }) => {
      const perf = row.original.metrics?.performance ?? "VERY_WEAK"
      return (
        <span
          className={cn(
            "font-medium text-sm",
            PERFORMANCE_COLORS[perf as SalesAgentPerformance]
          )}
        >
          {PERFORMANCE_LABELS[perf as SalesAgentPerformance]}
        </span>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => {
      const isActive = row.original.status === "ACTIVE"
      return (
        <div
          className="flex items-center gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          <Switch
            checked={isActive}
            onCheckedChange={(checked) =>
              onStatusChange(
                row.original.id,
                checked ? "actif" : "inactif"
              )
            }
          />
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div onClick={(e) => e.stopPropagation()}>
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
        </DropdownMenuContent>
      </DropdownMenu>
      </div>
    ),
  },
]
