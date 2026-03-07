"use client"

import { ColumnDef } from "@tanstack/react-table"
import { PromoCode, PromoCodeStatus, PromoCodeType } from "@/types/marketing.types"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { MoreVertical } from "lucide-react"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const TYPE_LABELS: Record<PromoCodeType, string> = {
  reduction_nouveau_client: "Réduction\nnouveau client",
  fidelisation_client: "Fidélisation\nclient existant",
  coupon_gratuit: "Coupon\ngratuit",
  reddition_commerciale: "Reddition\ncommerciale",
}

const STATUS_STYLES: Record<PromoCodeStatus, { label: string; className: string }> = {
  actif: { 
    label: "Actif", 
    className: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" 
  },
  suspendu: { 
    label: "Suspendu", 
    className: "bg-orange-100 text-orange-700 hover:bg-orange-100" 
  },
  expire: { 
    label: "Expiré", 
    className: "bg-gray-100 text-gray-500 hover:bg-gray-100" 
  },
}

interface ColumnsConfig {
  onStatusChange?: (codeId: string, newStatus: 'actif' | 'suspendu') => void
  onDelete?: (codeId: string) => void
  onView?: (code: PromoCode) => void
}

export const createColumns = (config?: ColumnsConfig): ColumnDef<PromoCode>[] => [
  {
    accessorKey: "createdAt",
    header: "Date de création",
    cell: ({ row }) => (
      <span className="text-sm text-gray-600 whitespace-nowrap">
        {row.original.createdAt}
      </span>
    ),
  },
  {
    accessorKey: "code",
    header: "Code",
    cell: ({ row }) => (
      <span className="text-sm font-medium text-gray-900">
        {row.original.code}
      </span>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const typeLabel = TYPE_LABELS[row.original.type] || row.original.type
      return (
        <span className="text-sm text-gray-600 whitespace-pre-line">
          {typeLabel}
        </span>
      )
    },
  },
  {
    accessorKey: "value",
    header: "Valeur/Avantage",
    cell: ({ row }) => (
      <span className="text-sm text-gray-600 whitespace-pre-line">
        {row.original.value}
      </span>
    ),
  },
  {
    accessorKey: "target",
    header: "Cible",
    cell: ({ row }) => (
      <span className="text-sm text-gray-600 whitespace-pre-line">
        {row.original.target}
      </span>
    ),
  },
  {
    accessorKey: "assignedCommercial",
    header: "Commercial assigné",
    cell: ({ row }) => (
      <span className="text-sm text-gray-600">
        {row.original.assignedCommercial || "-"}
      </span>
    ),
  },
  {
    accessorKey: "usageCount",
    header: "Utilisations",
    cell: ({ row }) => (
      <span className="text-sm text-gray-600">
        {row.original.usageCount}
      </span>
    ),
  },
  {
    accessorKey: "conversions",
    header: "Conversions",
    cell: ({ row }) => (
      <span className="text-sm text-gray-600">
        {row.original.conversions}
      </span>
    ),
  },
  {
    accessorKey: "conversionRate",
    header: "Taux de conversions",
    cell: ({ row }) => {
      const rate = row.original.conversionRate
      const isLow = rate < 50
      return (
        <span className={cn(
          "text-sm font-medium",
          isLow ? "text-red-500" : "text-emerald-500"
        )}>
          {rate}%
        </span>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => {
      const status = row.original.status
      const statusStyle = STATUS_STYLES[status]
      const isActive = status === "actif"
      const canToggle = status !== "expire"

      return (
        <div className="flex items-center gap-3">
          {canToggle && (
            <Switch
              checked={isActive}
              onCheckedChange={(checked) => {
                config?.onStatusChange?.(
                  row.original.id, 
                  checked ? "actif" : "suspendu"
                )
              }}
              className="data-[state=checked]:bg-emerald-500"
            />
          )}
          <Badge 
            variant="secondary" 
            className={cn("text-xs font-medium", statusStyle.className)}
          >
            {statusStyle.label}
          </Badge>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => config?.onView?.(row.original)}>
                Voir les détails
              </DropdownMenuItem>
              {canToggle && (
                <DropdownMenuItem 
                  onClick={() => config?.onStatusChange?.(
                    row.original.id,
                    isActive ? "suspendu" : "actif"
                  )}
                >
                  {isActive ? "Suspendre" : "Activer"}
                </DropdownMenuItem>
              )}
              <DropdownMenuItem 
                onClick={() => config?.onDelete?.(row.original.id)}
                className="text-red-600"
              >
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
