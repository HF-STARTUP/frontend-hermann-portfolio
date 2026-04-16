"use client"

import React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { CodesTableFilters } from "./CodesTableFilters"
import { CreateCodeDialog } from "../CreateCodeDialog/CreateCodeDialog"
import BtnBase from "@/components/elements/BtnBase"
import ConfirmationDialog from "@/components/dialog/confirmation-dialog"
import { PromoCodeDetailsSheet } from "./PromoCodeDetailsSheet"
import { AssignCommercialToCodeDialog } from "./AssignCommercialToCodeDialog"
import { SalesAgentDetailsSheet } from "../../../commerciaux/_components/CommerciauxTable/SalesAgentDetailsSheet"
import { DataTable } from "@/components/display/CustomTableDisplay"
import { usePromoCodeHook } from "../../usePromoCodeHook"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button";
import CardTitle from "@/components/ui/custom/CardTitle";

export const CodesHistoryTable = ({ onCreateCode }: { onCreateCode?: () => void }) => {
  const { 
    dialogs, 
    isLoading, 
    pagination, 
    params, 
    promoCodes, 
    rowActions, 
    setParams, 
    tableColumns,
    handleView,
    handleStatusChange 
  } = usePromoCodeHook()

  return (
    <Card className="bg-white rounded-2xl">
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-4">
        <CardTitle title="Historique des codes" />

          <div className="flex flex-wrap items-center justify-between gap-4">
            <CodesTableFilters filters={params} onFiltersChange={setParams} />

            <div className="flex items-center gap-3">
              <Button
                type="button"
                color="blue"
                variant="mainBlue"
                size="lg"
                className="rounded-full"
                onClick={() => {
                  dialogs.create.setEditId(null)
                  dialogs.create.setOpen(true)
                }}
              >
                <Plus className="mr-2" />
                Créer un code
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <DataTable
          columns={tableColumns ?? []}
          data={promoCodes}
          isLoading={isLoading}
          pagination={pagination}
          emptyMessage="Aucun code promo trouvé"
          onRowClick={handleView}
          rowActions={rowActions}
        />
      </CardContent>

      <CreateCodeDialog
        isOpen={dialogs.create.isOpen}
        onClose={()=>dialogs.create.setOpen(false)}
        codeId={dialogs.create.editId}
      />

      <ConfirmationDialog
        open={dialogs.status.isOpen}
        setOpen={dialogs.status.setOpen}
        title={
          dialogs.status.pending?.status === "suspendu"
            ? "Suspendre le code"
            : "Activer le code"
        }
        subtitle={
          dialogs.status.pending?.status === "suspendu"
            ? "Êtes-vous sûr de vouloir suspendre ce code promo ? Il ne sera plus utilisable tant qu'il n'est pas réactivé."
            : "Êtes-vous sûr de vouloir activer ce code promo ?"
        }
        triggerText={
          dialogs.status.pending?.status === "suspendu" ? "Suspendre" : "Activer"
        }
        onConfirm={dialogs.status.confirm}
      />

      <PromoCodeDetailsSheet
        codeId={dialogs.details.id}
        open={!!dialogs.details.id}
        onOpenChange={(open) => !open && dialogs.details.setId(null)}
        onStatusChange={handleStatusChange}
        // Ces handlers sont maintenant gérés via les actions du hook ou le menu d'actions
        // Mais on les garde si la Sheet en a besoin en props
        onOpenCommercialDetails={(id) => dialogs.agent.setId(id)}
      />

      <SalesAgentDetailsSheet
        agentId={dialogs.agent.id}
        open={!!dialogs.agent.id}
        onOpenChange={(open) => !open && dialogs.agent.setId(null)}
      />

      <AssignCommercialToCodeDialog
        code={dialogs.assign.code}
        open={!!dialogs.assign.code}
        onClose={() => dialogs.assign.setCode(null)}
      />
    </Card>
  )
}