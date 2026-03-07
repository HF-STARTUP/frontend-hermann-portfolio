"use client"

import React, { useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useGetSalesAgentDetails } from "@/hooks/marketing/useMarketing"
import {
  SALES_AGENT_CHANNEL_OPTIONS,
  SALES_AGENT_STATUS_OPTIONS,
} from "@/types/marketing.types"
import type { SalesAgent } from "@/types/marketing.types"
import { Loader2, Calendar, MoreVertical, ArrowUp, FileText, Pencil } from "lucide-react"
import { cn } from "@/lib/utils"
import { SalesAgentAssignedCodesList } from "./SalesAgentAssignedCodesList"
import { PromoCodeDetailsSheet } from "../../../code-promo/_components/CodesHistory/PromoCodeDetailsSheet"

interface SalesAgentDetailsSheetProps {
  agentId: string | null
  open: boolean
  onOpenChange: (open: boolean) => void
  startDate?: string
  endDate?: string
  onEdit?: (agent: SalesAgent) => void
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

function formatRevenue(value: number): string {
  return `${new Intl.NumberFormat("fr-FR").format(value)} XOF`
}

function getChannelLabel(channel: string): string {
  return SALES_AGENT_CHANNEL_OPTIONS.find((o) => o.value === channel)?.label ?? channel
}

function getStatusLabel(status: string): string {
  return SALES_AGENT_STATUS_OPTIONS.find((o) => o.value === status)?.label ?? status
}

function KpiCard({
  label,
  value,
  evolution,
}: {
  label: string
  value: string | number
  evolution?: { percentage: number; trend: string }
}) {
  return (
    <Card className="rounded-xl border-gray-100 bg-gray-50/50">
      <CardContent className="p-4">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500 mt-0.5">{label}</p>
        {evolution != null && (evolution.percentage !== 0 || evolution.trend !== "stable") && (
          <div className="flex items-center gap-1 mt-2 text-xs text-emerald-600">
            <ArrowUp className="h-3.5 w-3.5" />
            <span>
              {evolution.percentage > 0 ? "+" : ""}
              {evolution.percentage}% ce mois
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-2.5 border-b border-gray-100 last:border-0">
      <dt className="text-sm text-gray-500 font-medium shrink-0">{label}</dt>
      <dd className="text-sm text-gray-900 text-right break-words">{value}</dd>
    </div>
  )
}

export const SalesAgentDetailsSheet: React.FC<SalesAgentDetailsSheetProps> = ({
  agentId,
  open,
  onOpenChange,
  startDate,
  endDate,
  onEdit,
}) => {
  const [selectedCodeId, setSelectedCodeId] = useState<string | null>(null)
  const params =
    startDate || endDate
      ? { start_date: startDate, end_date: endDate }
      : undefined
  const { data, isLoading } = useGetSalesAgentDetails(
    open && agentId ? agentId : undefined,
    params,
    { enabled: open && Boolean(agentId) }
  )

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="p-0 flex flex-col w-full max-w-xl overflow-hidden"
      >
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}

        {!data && !isLoading && open && (
          <div className="flex flex-1 items-center justify-center p-6 text-sm text-muted-foreground">
            Aucun commercial sélectionné
          </div>
        )}

        {data && (
          <>
            <SheetHeader className="p-4 pb-3 text-left border-b shrink-0">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 font-semibold text-lg">
                    {[data.first_name, data.last_name]
                      .filter(Boolean)
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase() || "—"}
                  </div>
                  <div className="min-w-0">
                    <SheetTitle className="text-lg font-bold text-gray-900">
                      {[data.first_name, data.last_name].filter(Boolean).join(" ") || "—"}
                    </SheetTitle>
                    <p className="text-sm text-gray-500 mt-0.5">
                      ID: {data.identification_number ?? data.id.slice(0, 8)}
                    </p>
                    <p className="text-sm text-gray-500">{data.email ?? "—"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge
                    className={cn(
                      "text-xs font-medium",
                      data.status === "ACTIVE"
                        ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-100"
                    )}
                  >
                    {getStatusLabel(data.status)}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit?.(data)}>
                        Modifier
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-3 text-xs text-gray-500">
                <Calendar className="h-3.5 w-3.5" />
                <span>Ajouté le {formatDate(data.created_at)}</span>
              </div>
            </SheetHeader>

            <ScrollArea className="flex-1">
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <KpiCard
                    label="Codes attribués"
                    value={data.metrics?.codes_attributed ?? 0}
                    evolution={data.metrics?.evolution?.codes_attributed}
                  />
                  <KpiCard
                    label="Codes distribués"
                    value={`${data.metrics?.codes_used ?? 0}/${data.metrics?.codes_attributed ?? 0}`}
                    evolution={data.metrics?.evolution?.codes_used}
                  />
                  <KpiCard
                    label="Abonnements payants"
                    value={data.metrics?.paying_accounts ?? 0}
                    evolution={data.metrics?.evolution?.paying_accounts}
                  />
                  <KpiCard
                    label="Revenus générés"
                    value={formatRevenue(data.metrics?.revenue_generated ?? 0)}
                    evolution={data.metrics?.evolution?.revenue_generated}
                  />
                </div>

                {/* <Card className="rounded-xl border-blue-100 bg-blue-50/50 overflow-hidden">
                  <CardHeader className="pb-2 pt-4 px-4">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <span className="font-semibold text-gray-900">
                        Salaire fixe mensuel
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="px-4 pb-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Montant fixe</span>
                      <span className="text-gray-900">—</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-gray-500">Total à payer</span>
                      <span className="text-gray-900">—</span>
                    </div>
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled
                    >
                      Effectuer le paiement
                    </Button>
                  </CardContent>
                </Card> */}

                <Tabs defaultValue="general" className="w-full">
                  <TabsList className="w-full justify-start rounded-lg bg-muted/60 p-1">
                    <TabsTrigger value="general">
                      Informations générales
                    </TabsTrigger>
                    <TabsTrigger value="codes">
                      Codes attribués ({data.promo_codes_count ?? data.promo_codes?.length ?? 0})
                    </TabsTrigger>
                    {/* <TabsTrigger value="payments">
                      Historique de paiement
                    </TabsTrigger> */}
                  </TabsList>
                  <TabsContent value="general" className="mt-4">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-gray-900">
                          Détails
                        </h3>
                      </div>
                      <dl className="space-y-0 text-sm">
                        <DetailRow label="Nom" value={data.last_name ?? "—"} />
                        <DetailRow label="Prénoms" value={data.first_name ?? "—"} />
                        <DetailRow label="Email" value={data.email ?? "—"} />
                        <DetailRow
                          label="Numéro de téléphone"
                          value={data.phone ? `${data.phone}` : "—"}
                        />
                        <DetailRow
                          label="Pays"
                          value={data.country?.name ?? "—"}
                        />

                        <DetailRow
                          label="Type de rémunération"
                          value="—"
                        />
                      </dl>
                    </div>
                  </TabsContent>
                  <TabsContent value="codes" className="mt-4">
                    <SalesAgentAssignedCodesList
                      salesAgentId={data?.id ?? null}
                      onCodeClick={setSelectedCodeId}
                    />
                  </TabsContent>
                  <TabsContent value="payments" className="mt-4">
                    <p className="text-sm text-gray-500 py-4">
                      Aucun paiement pour l&apos;instant.
                    </p>
                  </TabsContent>
                </Tabs>
              </div>
            </ScrollArea>
          </>
        )}
      </SheetContent>
      <PromoCodeDetailsSheet
        codeId={selectedCodeId}
        open={!!selectedCodeId}
        onOpenChange={(isOpen) => !isOpen && setSelectedCodeId(null)}
      />
    </Sheet>
  )
}
