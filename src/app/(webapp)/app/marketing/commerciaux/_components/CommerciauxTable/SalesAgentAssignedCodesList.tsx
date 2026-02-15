"use client"

import React from "react"
import { useGetPromoCodes } from "@/hooks/marketing/useMarketing"
import type { PromoCode, PromoCodeStatusApi } from "@/types/marketing.types"
import { SimpleEmptyElement } from "@/components/box/PageNetworkState"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const STATUS_LABELS: Record<PromoCodeStatusApi, string> = {
  DRAFT: "Brouillon",
  ACTIVE: "Actif",
  SUSPENDED: "Suspendu",
  DEACTIVATED: "Désactivé",
  EXPIRED: "Expiré",
  ARCHIVED: "Archivé",
}

const STATUS_CLASS: Record<PromoCodeStatusApi, string> = {
  DRAFT: "bg-gray-100 text-gray-700",
  ACTIVE: "bg-emerald-100 text-emerald-700",
  SUSPENDED: "bg-orange-100 text-orange-700",
  DEACTIVATED: "bg-gray-100 text-gray-500",
  EXPIRED: "bg-gray-100 text-gray-500",
  ARCHIVED: "bg-gray-100 text-gray-500",
}

interface SalesAgentAssignedCodesListProps {
  salesAgentId: string | null
  enabled?: boolean
  onCodeClick?: (codeId: string) => void
}

export const SalesAgentAssignedCodesList: React.FC<
  SalesAgentAssignedCodesListProps
> = ({ salesAgentId, enabled = true, onCodeClick }) => {
  const { data: codes, isLoading } = useGetPromoCodes(
    salesAgentId && enabled
      ? { sales_agent_id: salesAgentId, itemPerPage: 50, page: 1 }
      : undefined
  )

  if (!salesAgentId || !enabled) {
    return (
      <p className="text-sm text-gray-500 py-4">
        Aucun code attribué pour l&apos;instant.
      </p>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!codes?.length) {
    return (
      <SimpleEmptyElement message="Aucun code attribué pour l'instant." />
    )
  }

  return (
    <ul className="space-y-2">
      {codes.map((code: PromoCode) => {
        const statusStyle = STATUS_CLASS[code.status] ?? "bg-gray-100 text-gray-600"
        const statusLabel = STATUS_LABELS[code.status] ?? code.status
        return (
          <li
            key={code.id}
            role="button"
            tabIndex={0}
            onClick={() => onCodeClick?.(code.id)}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") && onCodeClick?.(code.id)
            }
            className={cn(
              "flex items-center justify-between gap-3 py-3 px-3 rounded-lg cursor-pointer",
              "border border-gray-100 bg-gray-50/50 transition-colors",
              "hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
          >
            <span className="font-medium text-gray-900 truncate">
              {code.code_label}
            </span>
            <Badge
              variant="secondary"
              className={cn("shrink-0 text-xs font-medium", statusStyle)}
            >
              {statusLabel}
            </Badge>
          </li>
        )
      })}
    </ul>
  )
}
