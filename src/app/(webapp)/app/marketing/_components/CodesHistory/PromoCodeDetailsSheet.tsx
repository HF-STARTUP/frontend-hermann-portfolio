"use client"

import React from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useGetPromoCodeDetails } from "@/hooks/marketing/useMarketing"
import {
  CODE_TYPE_OPTIONS,
  DISCOUNT_TYPE_OPTIONS,
  type PromoCodeStatusApi,
  type CodeType,
  type DiscountType,
} from "@/types/marketing.types"
import { Ticket, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { PromoCode } from "@/types/marketing.types"
import { PromoCodeActionsMenu } from "./PromoCodeActionsMenu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SimpleEmptyElement } from "@/components/box/PageNetworkState"

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

function getCodeTypeLabel(value: CodeType): string {
  return CODE_TYPE_OPTIONS.find((o) => o.value === value)?.label ?? value
}

function getDiscountLabel(
  discountType: DiscountType,
  discountValue: number
): string {
  const typeLabel =
    DISCOUNT_TYPE_OPTIONS.find((o) => o.value === discountType)?.label ??
    discountType
  if (discountType === "PERCENTAGE") return `${typeLabel} (${discountValue} %)`
  if (discountType === "FIXED_AMOUNT") return `${typeLabel} (${discountValue})`
  return `${typeLabel} (${discountValue})`
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

interface PromoCodeDetailsSheetProps {
  codeId: string | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onStatusChange?: (codeId: string, newStatus: "actif" | "suspendu") => void
  onDelete?: (codeId: string) => void
  onEdit?: (code: PromoCode) => void
  onAssignCommercial?: (code: PromoCode) => void
}

export const PromoCodeDetailsSheet: React.FC<PromoCodeDetailsSheetProps> = ({
  codeId,
  open,
  onOpenChange,
  onStatusChange,
  onDelete,
  onEdit,
  onAssignCommercial,
}) => {
  const { data: code, isLoading } = useGetPromoCodeDetails(
    open && codeId ? codeId : undefined
  )

  return (
    <Sheet open={open} onOpenChange={onOpenChange} direction="right">
      <SheetContent side="right" className="p-0 flex flex-col w-full max-w-md">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}

        {!code && !isLoading && open && (
          <div className="flex flex-1 items-center justify-center p-6 text-sm text-muted-foreground">
            Aucun code sélectionné
          </div>
        )}

        {code && (
          <>
            <SheetHeader className="p-4 pb-3 text-left">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                    <Ticket className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <SheetTitle className="text-lg font-semibold text-gray-900 truncate">
                      {code.code_label}
                    </SheetTitle>
                    <SheetDescription className="mt-0.5 text-sm text-gray-500">
                      {code.description ?? "—"}
                    </SheetDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge
                    className={cn(
                      "text-xs font-medium",
                      STATUS_CLASS[code.status]
                    )}
                  >
                    {STATUS_LABELS[code.status]}
                  </Badge>
                  <PromoCodeActionsMenu
                    code={code}
                    showViewDetails={false}
                    onStatusChange={onStatusChange}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    onAssignCommercial={onAssignCommercial}
                  />
                </div>
              </div>
            </SheetHeader>

            <ScrollArea className="flex-1 px-4 pb-6">
              <Tabs defaultValue="general" className="w-full mt-3">
                <TabsList className="w-full justify-start rounded-lg bg-muted/60 p-1">
                  <TabsTrigger value="general">
                    Informations générales
                  </TabsTrigger>
                  <TabsTrigger value="prospects">Prospects liés</TabsTrigger>
                </TabsList>
                <TabsContent value="general" className="mt-4">
                  <dl className="space-y-3 text-sm">
                    <DetailRow
                      label="Date de création"
                      value={formatDate(code.created_at)}
                    />
                    <DetailRow
                      label="Type de code"
                      value={getCodeTypeLabel(code.code_type)}
                    />
                    <DetailRow label="Code" value={code.code_label} />
                    <DetailRow
                      label="Valeur du code"
                      value={getDiscountLabel(
                        code.discount_type,
                        code.discount_value
                      )}
                    />
                    <DetailRow
                      label="Validité"
                      value={`${code.validity_days} jours`}
                    />
                    <DetailRow
                      label="Utilisation par utilisateur"
                      value={String(code.max_usage_per_user)}
                    />
                    <DetailRow
                      label="Cumulable avec d'autres codes"
                      value={code.is_stackable ? "Oui" : "Non"}
                    />
                    <DetailRow
                      label="Date d'expiration"
                      value={formatDate(code.expires_at)}
                    />
                    <DetailRow
                      label="Nombre d'utilisations"
                      value={String(code.usage_count)}
                    />
                    {code.marketing_campaign && (
                      <DetailRow
                        label="Campagne marketing"
                        value={code.marketing_campaign}
                      />
                    )}
                  </dl>
                </TabsContent>
                <TabsContent value="prospects" className="mt-4">
                  <SimpleEmptyElement message="Aucun prospect lié pour l'instant" />
                </TabsContent>
              </Tabs>
            </ScrollArea>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}

function DetailRow({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex justify-between gap-4 py-1.5 border-b border-gray-100 last:border-0">
      <dt className="text-gray-500 font-medium shrink-0">{label}</dt>
      <dd className="text-gray-900 text-right break-words">{value}</dd>
    </div>
  )
}
