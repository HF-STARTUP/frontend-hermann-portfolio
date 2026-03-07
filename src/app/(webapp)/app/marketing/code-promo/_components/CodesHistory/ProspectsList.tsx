"use client"

import React from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { SimpleEmptyElement } from "@/components/box/PageNetworkState"
import type { PromoCodeProspect } from "@/types/marketing.types"
import { Building2, User, MapPin } from "lucide-react"

function formatProspectDate(iso: string | null): string {
  if (!iso) return "—"
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

function getSubscriptionStatusStyle(status: string): string {
  if (status === "paid") return "bg-emerald-100 text-emerald-700"
  if (status === "unpaid")
    return "bg-amber-50 text-amber-700 border border-amber-200/60"
  return "bg-gray-100 text-gray-600"
}

function getSubscriptionStatusLabel(status: string): string {
  if (status === "paid") return "Payé"
  if (status === "unpaid") return "Impayé"
  return status
}

function getInitials(name: string): string {
  const trimmed = name.trim()
  if (!trimmed) return "?"
  const parts = trimmed.split(/\s+/).filter(Boolean)
  if (parts.length >= 2)
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  return trimmed.slice(0, 2).toUpperCase()
}

interface ProspectsListProps {
  prospects: PromoCodeProspect[]
  isLoading?: boolean
}

export const ProspectsList: React.FC<ProspectsListProps> = ({
  prospects,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-violet-500" />
      </div>
    )
  }

  if (!prospects?.length) {
    return (
      <SimpleEmptyElement message="Aucun prospect lié à ce code pour l'instant." />
    )
  }

  return (
    <ul className="space-y-2" role="list">
      {prospects.map((prospect) => {
        const { compte } = prospect
        const accountName = compte?.name ?? "—"
        const owner = compte?.owner
        const parks = compte?.parks ?? []

        return (
          <li key={prospect.id}>
            <article
              className={cn(
                "rounded-xl border border-gray-100 bg-gray-50/80 px-3.5 py-3",
                "transition-colors hover:border-gray-200 hover:bg-gray-50",
                "focus-within:ring-2 focus-within:ring-violet-500/20 focus-within:ring-offset-1"
              )}
            >
              <div className="flex gap-3 min-w-0">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600 text-xs font-semibold">
                  {getInitials(accountName) || <Building2 className="h-4 w-4" />}
                </div>
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 gap-y-1">
                    <p className="font-medium text-gray-900 text-sm leading-snug truncate">
                      {accountName}
                    </p>
                    <Badge
                      variant="secondary"
                      className={cn(
                        "text-xs font-medium shrink-0",
                        getSubscriptionStatusStyle(prospect.status_abonnement)
                      )}
                    >
                      {getSubscriptionStatusLabel(prospect.status_abonnement)}
                    </Badge>
                  </div>

                  {owner && (
                    <div className="flex gap-0.5 text-xs text-gray-600">
                      {owner.email && (
                        <span className="flex items-center gap-1.5 truncate">
                          <User className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                          {owner.email}
                        </span>
                      )}
                      {owner.phone && (
                        <span className="flex items-center gap-1.5">
                          <span className="text-gray-400" aria-hidden>
                            —
                          </span>
                          {owner.phone}
                        </span>
                      )}
                    </div>
                  )}

                  {parks.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                      {parks.map((p) => p.name).join(", ")}
                    </div>
                  )}

                  <p className="text-xs text-gray-600">
                    {prospect.formule || "—"}
                  </p>

                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 text-xs text-gray-500 pt-0.5 border-t border-gray-100/80">
                    <span>
                      Inscrit le {formatProspectDate(prospect.date_inscription)}
                    </span>
                    {prospect.date_activation ? (
                      <>
                        <span aria-hidden>·</span>
                        <span>
                          Activé le{" "}
                          {formatProspectDate(prospect.date_activation)}
                        </span>
                      </>
                    ) : (
                      <>
                        <span aria-hidden>·</span>
                        <span className="text-amber-600/90">Non activé</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </article>
          </li>
        )
      })}
    </ul>
  )
}
