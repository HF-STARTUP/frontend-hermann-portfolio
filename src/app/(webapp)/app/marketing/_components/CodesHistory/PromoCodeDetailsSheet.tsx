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
import {
  useGetPromoCodeDetails,
  useGetPromoCodeEvents,
} from "@/hooks/marketing/useMarketing"
import {
  CODE_TYPE_OPTIONS,
  DISCOUNT_TYPE_OPTIONS,
  type PromoCodeStatusApi,
  type CodeType,
  type DiscountType,
} from "@/types/marketing.types"
import { Ticket, Loader2, Pencil } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type {
  PromoCodeSalesAgent,
  PromoCodeEvent,
} from "@/types/marketing.types"
import type { PromoCode } from "@/types/marketing.types"
import { PromoCodeActionsMenu } from "./PromoCodeActionsMenu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SimpleEmptyElement } from "@/components/box/PageNetworkState"
import { AiOutlineReload } from "react-icons/ai"

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

function formatEventDate(iso: string): string {
  try {
    const d = new Date(iso)
    const date = d.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    const time = d.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    return `${date} • ${time}`
  } catch {
    return iso
  }
}

function getEventDotClassName(causedEvent: string): string {
  if (causedEvent.includes("created")) return "bg-blue-500"
  if (causedEvent.includes("activated")) return "bg-emerald-500"
  if (causedEvent.includes("suspended") || causedEvent.includes("deactivated"))
    return "bg-amber-500"
  return "bg-gray-400"
}

function getProfileDisplayName(profile: PromoCodeEvent["profile_who_create_event"]): string | null {
  if (!profile) return null
  if (typeof profile.name === "string") return profile.name
  if (profile.first_name || profile.last_name)
    return [profile.first_name, profile.last_name].filter(Boolean).join(" ")
  return null
}

interface PromoCodeDetailsSheetProps {
  codeId: string | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onStatusChange?: (codeId: string, newStatus: "actif" | "suspendu") => void
  onDelete?: (codeId: string) => void
  onEdit?: (code: PromoCode) => void
  onAssignCommercial?: (code: PromoCode) => void
  onOpenCommercialDetails?: (agentId: string) => void
}

export const PromoCodeDetailsSheet: React.FC<PromoCodeDetailsSheetProps> = ({
  codeId,
  open,
  onOpenChange,
  onStatusChange,
  onDelete,
  onEdit,
  onAssignCommercial,
  onOpenCommercialDetails,
}) => {
  const { data: code, isLoading } = useGetPromoCodeDetails(
    open && codeId ? codeId : undefined
  )
  const { data: eventsData, isLoading: eventsLoading } = useGetPromoCodeEvents(
    open && codeId ? codeId : undefined,
    { itemPerPage: 20, page: 1 }
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
                  <TabsTrigger value="historique">Historique</TabsTrigger>
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

                  {code.sales_agent && (
                    <AssignedCommercialBlock
                      agent={code.sales_agent}
                      onOpenDetails={() =>
                        onOpenCommercialDetails?.(code.sales_agent!.id)
                      }
                      onReassign={() => onAssignCommercial?.(code)}
                    />
                  )}
                </TabsContent>
                <TabsContent value="prospects" className="mt-4">
                  <SimpleEmptyElement message="Aucun prospect lié pour l'instant" />
                </TabsContent>
                <TabsContent value="historique" className="mt-4">
                  {eventsLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                  ) : !eventsData?.data?.length ? (
                    <SimpleEmptyElement message="Aucun événement pour l'instant." />
                  ) : (
                    <ul className="space-y-2">
                      {eventsData.data.map((event, index) => {
                        const profileName = getProfileDisplayName(
                          event.profile_who_create_event
                        )
                        const dateTime = formatEventDate(event.created_at)
                        const isFirst = index === 0
                        const isLast = index === eventsData.data.length - 1
                        return (
                          <li
                            key={event.id}
                            className="flex gap-4"
                          >
                            <div className="flex w-6 shrink-0 flex-col items-center">
                              {!isFirst && (
                                <div className="h-2 w-px min-h-2 flex-shrink-0 bg-gray-200" aria-hidden />
                              )}
                              <div
                                className={cn(
                                  "h-3 w-3 shrink-0 rounded-full border-2 border-background shadow-sm",
                                  getEventDotClassName(event.caused_event)
                                )}
                                aria-hidden
                              />
                              {!isLast && (
                                <div className="w-px flex-1 min-h-4 bg-gray-200" aria-hidden />
                              )}
                            </div>
                            <div className="min-w-0 flex-1 pb-4 last:pb-0">
                              <div className="rounded-xl border border-gray-100 bg-gray-50/80 px-3.5 py-3 transition-colors hover:border-gray-200 hover:bg-gray-50">
                                <p className="font-medium text-gray-900 text-sm leading-snug">
                                  {event.description}
                                </p>
                                <div className="mt-1.5 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs text-gray-500">
                                  <span>{dateTime}</span>
                                  {profileName && (
                                    <>
                                      <span aria-hidden>•</span>
                                      <span>{profileName}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </TabsContent>
              </Tabs>
            </ScrollArea>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}

function AssignedCommercialBlock({
  agent,
  onOpenDetails,
  onReassign,
}: {
  agent: PromoCodeSalesAgent
  onOpenDetails: () => void
  onReassign: () => void
}) {
  const name = [agent.first_name, agent.last_name].filter(Boolean).join(" ") || "—"
  const initials = [agent.first_name, agent.last_name]
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="mt-6 pt-4 border-t border-gray-100">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
        Commercial assigné
      </p>
      <div
        role="button"
        tabIndex={0}
        onClick={onOpenDetails}
        onKeyDown={(e) => e.key === "Enter" && onOpenDetails()}
        className={cn(
          "flex items-center gap-3 p-3 rounded-xl border border-gray-100",
          "bg-gray-50/80 hover:bg-gray-100/80 cursor-pointer transition-colors",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        )}
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
          {initials || "—"}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-gray-900 truncate">{name}</p>
          <p className="text-sm text-gray-500 truncate">{agent.email || "—"}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0 rounded-full"
          onClick={(e) => {
            e.stopPropagation()
            onReassign()
          }}
          title="Réassigner"
        >
          <AiOutlineReload className="h-4 w-4 text-gray-500" />
        </Button>
      </div>
    </div>
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
