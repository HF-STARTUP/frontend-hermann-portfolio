"use client"

import React from "react"
import type { PromoCode } from "@/types/marketing.types"
import { MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export interface PromoCodeActionsMenuProps {
  code: PromoCode
  showViewDetails?: boolean
  onView?: (code: PromoCode) => void
  onStatusChange?: (codeId: string, newStatus: "actif" | "suspendu") => void
  onDelete?: (codeId: string) => void
  onEdit?: (code: PromoCode) => void
  onAssignCommercial?: (code: PromoCode) => void
}

export const PromoCodeActionsMenu: React.FC<PromoCodeActionsMenuProps> = ({
  code,
  showViewDetails = true,
  onView,
  onStatusChange,
  onDelete,
  onEdit,
  onAssignCommercial,
}) => {
  const status = code.status
  const isActive = status === "ACTIVE"
  const canToggle = status === "ACTIVE" || status === "SUSPENDED"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreVertical className="h-4 w-4 text-gray-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {showViewDetails && (
          <DropdownMenuItem onClick={() => onView?.(code)}>
            Voir les détails
          </DropdownMenuItem>
        )}
        {canToggle && (
          <DropdownMenuItem
            onClick={() =>
              onStatusChange?.(code.id, isActive ? "suspendu" : "actif")
            }
          >
            {isActive ? "Suspendre" : "Activer"}
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => onAssignCommercial?.(code)}>
          Assigner un commercial
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEdit?.(code)}>
          Modifier
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
