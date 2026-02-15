"use client"

import React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/DataTable"
import { Download, Plus } from "lucide-react"
import { CommerciauxTableFilters } from "./CommerciauxTableFilters"
import { createColumns } from "./columns"
import {
  useGetSalesAgents,
  useUpdateCommercialStatus,
  useDeleteCommercial,
} from "@/hooks/marketing/useMarketing"
import type { SalesAgentFilters } from "@/types/marketing.types"
import type { SalesAgent } from "@/types/marketing.types"
import BtnBase from "@/components/elements/BtnBase"
import { AddCommercialDialog } from "../AddCommercialDialog/AddCommercialDialog"
import { SalesAgentDetailsSheet } from "./SalesAgentDetailsSheet"

export const CommerciauxTable: React.FC = () => {
  const [salesAgentFilters, setSalesAgentFilters] =
    React.useState<SalesAgentFilters>({
      itemPerPage: 10,
      page: 1,
    })

  const [addDialogOpen, setAddDialogOpen] = React.useState(false)
  const [editingAgentId, setEditingAgentId] = React.useState<string | null>(
    null
  )
  const [selectedAgentId, setSelectedAgentId] = React.useState<string | null>(
    null
  )

  const {
    data: salesAgentsData,
    totalRecords,
    totalPages,
    currentPage,
    itemPerPage,
    raw: rawResponse,
    isLoading,
  } = useGetSalesAgents(salesAgentFilters)

  const { mutate: updateStatus } = useUpdateCommercialStatus()
  const { mutate: deleteCommercial } = useDeleteCommercial()

  const handleStatusChange = (
    commercialId: string,
    newStatus: "actif" | "inactif"
  ) => {
    updateStatus({ commercialId, status: newStatus })
  }

  const handleDelete = (commercialId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce commercial ?")) {
      deleteCommercial(commercialId)
    }
  }

  const handleView = (agent: SalesAgent) => {
    setSelectedAgentId(agent.id)
  }

  const handleEdit = (agent: SalesAgent) => {
    setEditingAgentId(agent.id)
    setAddDialogOpen(true)
  }

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false)
    setEditingAgentId(null)
  }

  const handlePageChange = (newPageIndex: number) => {
    setSalesAgentFilters((prev) => ({ ...prev, page: newPageIndex + 1 }))
  }

  const handlePageSizeChange = (newSize: number) => {
    setSalesAgentFilters((prev) => ({
      ...prev,
      itemPerPage: newSize,
      page: 1,
    }))
  }

  const handleFiltersChange = React.useCallback(
    (f: Pick<SalesAgentFilters, "channel" | "country_id" | "start_date" | "end_date">) => {
      setSalesAgentFilters((prev) => ({ ...prev, ...f, page: 1 }))
    },
    []
  )

  const columns = React.useMemo(
    () =>
      createColumns({
        onStatusChange: handleStatusChange,
        onDelete: handleDelete,
        onView: handleView,
      }),
    []
  )

  return (
    <Card className="bg-white rounded-none border-0 shadow-none">
      <CardHeader className="pb-4 px-0">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Liste des commerciaux
            </h2>
          </div>

          <div className="flex items-center justify-between">
            <CommerciauxTableFilters
              filters={{
                channel: salesAgentFilters.channel,
                country_id: salesAgentFilters.country_id,
                start_date: salesAgentFilters.start_date,
                end_date: salesAgentFilters.end_date,
              }}
              onFiltersChange={handleFiltersChange}
            />

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="h-[47px] gap-2 border-gray-200 rounded-lg"
              >
                <Download className="h-4 w-4" />
                Exporter
              </Button>

              <BtnBase
                type="button"
                color="blue"
                variant="contained"
                shape="square"
                size="sm"
                className="h-[47px]"
                icon={<Plus className="h-4 w-4" />}
                onClick={() => {
                  setEditingAgentId(null)
                  setAddDialogOpen(true)
                }}
              >
                Ajouter un commercial
              </BtnBase>
            </div>

          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 px-0 flex flex-col gap-4">
        <DataTable
          columns={columns}
          data={salesAgentsData}
          isLoading={isLoading}
          enableSorting
          enablePagination
          pageSize={itemPerPage}
          emptyMessage="Aucun commercial trouvé"
          manualPagination
          pageIndex={currentPage - 1}
          totalPages={totalPages}
          totalRecords={totalRecords}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          onRowClick={handleView}
        />

        {rawResponse != null && (
          <details className="mt-4">
            <summary className="text-sm font-medium text-gray-500 cursor-pointer hover:text-gray-700">
              Réponse API (JSON)
            </summary>
            <pre className="mt-2 p-4 bg-gray-50 rounded-lg text-xs overflow-auto max-h-[400px] border border-gray-200">
              {JSON.stringify(rawResponse, null, 2)}
            </pre>
          </details>
        )}
      </CardContent>

      <AddCommercialDialog
        isOpen={addDialogOpen}
        onClose={handleCloseAddDialog}
        agentId={editingAgentId}
      />

      <SalesAgentDetailsSheet
        agentId={selectedAgentId}
        open={!!selectedAgentId}
        onOpenChange={(open) => !open && setSelectedAgentId(null)}
        startDate={salesAgentFilters.start_date}
        endDate={salesAgentFilters.end_date}
        onEdit={handleEdit}
      />
    </Card>
  )
}
