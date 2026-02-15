"use client"

import React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useGetSalesAgents } from "@/hooks/marketing/useMarketing"
import { useAssignPromoCodeToSalesAgent } from "@/hooks/marketing/useMarketing"
import type { PromoCode } from "@/types/marketing.types"
import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"
import notify from "@/utils/func/notification"

interface AssignCommercialToCodeDialogProps {
  code: PromoCode | null
  open: boolean
  onClose: () => void
}

export const AssignCommercialToCodeDialog: React.FC<
  AssignCommercialToCodeDialogProps
> = ({ code, open, onClose }) => {
  const [search, setSearch] = React.useState("")
  const [selectedAgentId, setSelectedAgentId] = React.useState<string | null>(
    null
  )

  const { data: agents, isLoading } = useGetSalesAgents({
    itemPerPage: 100,
    page: 1,
  })
  const { mutate: assignAgent, isLoading: isAssigning } =
    useAssignPromoCodeToSalesAgent()

  const filteredAgents = React.useMemo(() => {
    if (!agents?.length) return []
    const q = search.trim().toLowerCase()
    if (!q) return agents
    return agents.filter(
      (a) =>
        a.first_name?.toLowerCase().includes(q) ||
        a.last_name?.toLowerCase().includes(q) ||
        a.email?.toLowerCase().includes(q)
    )
  }, [agents, search])

  const handleClose = () => {
    setSearch("")
    setSelectedAgentId(null)
    onClose()
  }

  const handleConfirm = () => {
    if (!code || !selectedAgentId) return
    assignAgent(
      { promoCodeId: code.id, salesAgentId: selectedAgentId },
      {
        onSuccess: () => {
          notify("Commercial assigné au code promo.", "success")
          handleClose()
        },
        onError: (err) => {
          notify(err?.message ?? "Erreur lors de l'assignation.", "error")
        },
      }
    )
  }

  React.useEffect(() => {
    if (!open) {
      setSearch("")
      setSelectedAgentId(null)
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[440px] p-0 gap-0 rounded-2xl overflow-hidden">
        <DialogHeader className="flex flex-row items-center justify-between px-6 pt-6 pb-4">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Assigner a un commercial
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher un commercial"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-12 rounded-xl border-gray-200"
            />
          </div>

          <ScrollArea className="h-[280px] rounded-lg border border-gray-100">
            {isLoading ? (
              <div className="flex items-center justify-center py-12 text-sm text-gray-500">
                Chargement...
              </div>
            ) : filteredAgents.length === 0 ? (
              <div className="flex items-center justify-center py-12 text-sm text-gray-500">
                Aucun commercial trouvé
              </div>
            ) : (
              <div className="p-1 space-y-1">
                {filteredAgents.map((agent) => (
                  <button
                    key={agent.id}
                    type="button"
                    onClick={() => setSelectedAgentId(agent.id)}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors",
                      selectedAgentId === agent.id
                        ? "bg-blue-50 border border-blue-100"
                        : "hover:bg-gray-50 border border-transparent"
                    )}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                      {[agent.first_name, agent.last_name]
                        .filter(Boolean)
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase() || "—"}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-900 truncate">
                        {[agent.first_name, agent.last_name]
                          .filter(Boolean)
                          .join(" ") || "—"}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {agent.email ?? "—"}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </ScrollArea>

          <Button
            className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700"
            disabled={!selectedAgentId || isAssigning}
            onClick={handleConfirm}
          >
            {isAssigning ? "Assignation..." : "Confirmer"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
