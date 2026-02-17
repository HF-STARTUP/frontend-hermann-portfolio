"use client"

import { ColumnDef } from "@tanstack/react-table"
import {
  PromoCode,
  PromoCodeStatusApi,
  CodeType,
} from "@/types/marketing.types"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { CopyToClipboard } from "@/components/ui/copy-to-clipboard"
import { cn } from "@/lib/utils"
import { PromoCodeActionsMenu } from "./PromoCodeActionsMenu"

const CODE_TYPE_LABELS: Record<CodeType, string> = {
  NEW_CLIENT: "Nouveau client",
  LOYALTY: "Fidélisation",
  FREE_COUPON: "Coupon gratuit",
  COMMERCIAL_RENDITION: "Reddition commerciale",
}

const STATUS_STYLES: Record<
  PromoCodeStatusApi,
  { label: string; className: string }
> = {
  DRAFT: {
    label: "Brouillon",
    className: "bg-gray-100 text-gray-700 hover:bg-gray-100",
  },
  ACTIVE: {
    label: "Actif",
    className: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  },
  SUSPENDED: {
    label: "Suspendu",
    className: "bg-orange-100 text-orange-700 hover:bg-orange-100",
  },
  DEACTIVATED: {
    label: "Désactivé",
    className: "bg-gray-100 text-gray-500 hover:bg-gray-100",
  },
  EXPIRED: {
    label: "Expiré",
    className: "bg-gray-100 text-gray-500 hover:bg-gray-100",
  },
  ARCHIVED: {
    label: "Archivé",
    className: "bg-gray-100 text-gray-500 hover:bg-gray-100",
  },
}

interface ColumnsConfig {
  onStatusChange?: (codeId: string, newStatus: "actif" | "suspendu") => void
  onDelete?: (codeId: string) => void
  onView?: (code: PromoCode) => void
  onEdit?: (code: PromoCode) => void
  onAssignCommercial?: (code: PromoCode) => void
}

export const createColumns = (
  config?: ColumnsConfig
): ColumnDef<PromoCode>[] => [
    {
      accessorKey: "created_at",
      header: "Date de création",
      cell: ({ row }) => (
        <span className="text-sm text-gray-600 whitespace-nowrap">
          {row.original.created_at
            ? new Date(row.original.created_at).toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
            : "-"}
        </span>
      ),
    },
    {
      accessorKey: "code_label",
      header: "Code",
      cell: ({ row }) => (
        <span className="text-sm font-medium text-gray-900">
          <CopyToClipboard text={row.original.code_label} />
        </span>
      ),
    },
    {
      accessorKey: "code_type",
      header: "Type",
      cell: ({ row }) => {
        const typeLabel =
          CODE_TYPE_LABELS[row.original.code_type] ?? row.original.code_type
        return <span className="text-sm text-gray-600">{typeLabel}</span>
      },
    },
    {
      accessorKey: "discount_type",
      header: "Réduction",
      cell: ({ row }) => (
        <span className="text-sm text-gray-600">
          {row.original.discount_type === "PERCENTAGE"
            ? `${row.original.discount_value} %`
            : row.original.discount_type === "FIXED_AMOUNT"
              ? `${row.original.discount_value} (fixe)`
              : `${row.original.discount_value} (période)`}
        </span>
      ),
    },
    {
      accessorKey: "validity_days",
      header: "Validité (jours)",
      cell: ({ row }) => (
        <span className="text-sm text-gray-600">
          {row.original.validity_days}
        </span>
      ),
    },
    {
      accessorKey: "usage_count",
      header: "Utilisations",
      cell: ({ row }) => (
        <span className="text-sm text-gray-600">
          {row.original.usage_count}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Statut",
      cell: ({ row }) => {
        const status = row.original.status
        const statusStyle = STATUS_STYLES[status] ?? {
          label: status,
          className: "bg-gray-100 text-gray-600",
        }
        const isActive = status === "ACTIVE"
        const canToggle = status === "ACTIVE" || status === "SUSPENDED"

        return (
          <div
            className="flex items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
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
            <PromoCodeActionsMenu
              code={row.original}
              showViewDetails
              onView={config?.onView}
              onStatusChange={config?.onStatusChange}
              onDelete={config?.onDelete}
              onEdit={config?.onEdit}
              onAssignCommercial={config?.onAssignCommercial}
            />
          </div>
        )
      },
    },
  ]
