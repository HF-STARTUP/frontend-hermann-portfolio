"use client"

import React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { DataTable } from "@/components/display/CustomTableDisplay"
import { Plus } from "lucide-react"
import { CommerciauxTableFilters } from "./CommerciauxTableFilters"
import BtnBase from "@/components/elements/BtnBase"
import { AddCommercialDialog } from "../AddCommercialDialog/AddCommercialDialog"
import { SalesAgentDetailsSheet } from "./SalesAgentDetailsSheet"
import { useSalesAgentHook } from "../../useCommerciauxHook";
import CardTitle from "@/components/ui/custom/CardTitle";
import { Button } from "@/components/ui/button";

export const CommerciauxTable: React.FC = () => {
  const {
    salesAgents,
    isLoading,
    rawResponse,
    tableColumns,
    rowActions,
    pagination,
    params,
    setParams,
    dialogs,
    handleView,
    handleEdit,
    handleStatusChange
  } = useSalesAgentHook()

  const handleFiltersChange = React.useCallback(
    (f: any) => {
      setParams((prev) => ({ ...prev, ...f, page: 1 }))
    },
    [setParams]
  )

  return (
    <Card className="bg-white rounded-2xl p-6">
      <CardHeader className="pb-4 px-0">
        <div className="flex flex-col gap-4">
         <CardTitle title="Liste des commerciaux" />

          <div className="flex items-center justify-between">
            <CommerciauxTableFilters
              filters={{
                channel: params.channel,
                country_id: params.country_id,
                start_date: params.start_date,
                end_date: params.end_date,
              }}
              onFiltersChange={handleFiltersChange}
            />

            <div className="flex items-center gap-3">
              <Button
                type="button"
                color="blue"
                variant="mainBlue"
                size="lg"
                className="rounded-full"                
                onClick={() => {
                  dialogs.add.setEditId(null)
                  dialogs.add.setOpen(true)
                }}
              >
                <Plus className="mr-2" />
                Ajouter un commercial
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 px-0 flex flex-col gap-4">
        <DataTable
          columns={tableColumns}
          data={salesAgents}
          isLoading={isLoading}
          emptyMessage="Aucun commercial trouvé"
          onRowClick={handleView}
          rowActions={rowActions}
          pagination={pagination}
        />
      </CardContent>

      <AddCommercialDialog
        isOpen={dialogs.add.isOpen}
        onClose={dialogs.add.handleClose}
        agentId={dialogs.add.editId}
      />

      <SalesAgentDetailsSheet
        agentId={dialogs.details.id}
        open={!!dialogs.details.id}
        onOpenChange={(open) => !open && dialogs.details.setId(null)}
        startDate={params.start_date}
        endDate={params.end_date}
        onEdit={handleEdit}
      />
    </Card>
  )
}