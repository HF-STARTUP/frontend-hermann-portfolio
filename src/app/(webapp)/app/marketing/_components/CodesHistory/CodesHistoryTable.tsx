"use client"

import React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/DataTable"
import { Download, Plus } from "lucide-react"
import { CodesTableFilters } from "./CodesTableFilters"
import { createColumns } from "./columns"
import {
  useGetPromoCodes,
  useUpdatePromoCodeStatus,
  useDeletePromoCode,
} from "@/hooks/marketing/useMarketing"
import { MarketingFilters, PromoCode } from "@/types/marketing.types"
import { CreateCodeDialog } from "../CreateCodeDialog/CreateCodeDialog"
import BtnBase from "@/components/elements/BtnBase"
import ConfirmationDialog from "@/components/dialog/confirmation-dialog"
import { PromoCodeDetailsSheet } from "./PromoCodeDetailsSheet"

export const CodesHistoryTable: React.FC = () => {
  const [filters, setFilters] = React.useState<MarketingFilters>({
    page: 1,
    itemPerPage: 20,
  })
  const [createDialogOpen, setCreateDialogOpen] = React.useState(false)
  const [editCodeId, setEditCodeId] = React.useState<string | null>(null)
  const [statusConfirmOpen, setStatusConfirmOpen] = React.useState(false)
  const [pendingStatusChange, setPendingStatusChange] = React.useState<{
    codeId: string
    status: "actif" | "suspendu"
  } | null>(null)
  const [selectedCodeId, setSelectedCodeId] = React.useState<string | null>(
    null
  )

  const { data: codes, totalRecords, isLoading } = useGetPromoCodes(filters)
  const { mutate: updateStatus } = useUpdatePromoCodeStatus()
  const { mutate: deleteCode } = useDeletePromoCode()


  const itemPerPage = filters.itemPerPage ?? 20
  const totalPages = Math.max(1, Math.ceil(totalRecords / itemPerPage))
  const pageIndex = (filters.page ?? 1) - 1

  const handleStatusChange = (codeId: string, newStatus: "actif" | "suspendu") => {
    setPendingStatusChange({ codeId, status: newStatus })
    setStatusConfirmOpen(true)
  }

  const handleConfirmStatusChange = () => {
    if (pendingStatusChange) {
      updateStatus(pendingStatusChange)
      setPendingStatusChange(null)
    }
    setStatusConfirmOpen(false)
  }

  const handleDelete = (codeId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce code ?")) {
      deleteCode(codeId)
    }
  }

  const handleView = (code: PromoCode) => {
    setSelectedCodeId(code.id)
  }

  const handleEdit = (code: PromoCode) => {
    setEditCodeId(code.id)
    setCreateDialogOpen(true)
  }

  const handleCloseCreateDialog = () => {
    setCreateDialogOpen(false)
    setEditCodeId(null)
  }

  const handleAssignCommercial = (_code: PromoCode) => {
    // TODO: ouvrir dialog / sheet pour assigner un commercial
  }

  const handlePageChange = (newPageIndex: number) => {
    setFilters((prev) => ({ ...prev, page: newPageIndex + 1 }))
  }

  const handlePageSizeChange = (newSize: number) => {
    setFilters((prev) => ({ ...prev, itemPerPage: newSize, page: 1 }))
  }

  const columns = React.useMemo(
    () =>
      createColumns({
        onStatusChange: handleStatusChange,
        onDelete: handleDelete,
        onView: handleView,
        onEdit: handleEdit,
        onAssignCommercial: handleAssignCommercial,
      }),
    []
  )

  return (
    <Card className="bg-white">
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Historique des codes
          </h2>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <CodesTableFilters filters={filters} onFiltersChange={setFilters} />

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="h-12 gap-2 border-gray-200"
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
                className="h-12"
                icon={<Plus className="h-4 w-4" />}
                onClick={() => {
                  setEditCodeId(null)
                  setCreateDialogOpen(true)
                }}
              >
                Créer un code
              </BtnBase>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <DataTable
          columns={columns}
          data={codes}
          isLoading={isLoading}
          enableSorting
          enablePagination
          pageSize={itemPerPage}
          emptyMessage="Aucun code promo trouvé"
          manualPagination
          pageIndex={pageIndex}
          totalPages={totalPages}
          totalRecords={totalRecords}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          onRowClick={handleView}
        />
      </CardContent>

      <CreateCodeDialog
        isOpen={createDialogOpen}
        onClose={handleCloseCreateDialog}
        codeId={editCodeId}
      />

      <ConfirmationDialog
        open={statusConfirmOpen}
        setOpen={setStatusConfirmOpen}
        title={
          pendingStatusChange?.status === "suspendu"
            ? "Suspendre le code"
            : "Activer le code"
        }
        subtitle={
          pendingStatusChange?.status === "suspendu"
            ? "Êtes-vous sûr de vouloir suspendre ce code promo ? Il ne sera plus utilisable tant qu'il n'est pas réactivé."
            : "Êtes-vous sûr de vouloir activer ce code promo ?"
        }
        triggerText={
          pendingStatusChange?.status === "suspendu" ? "Suspendre" : "Activer"
        }
        onConfirm={handleConfirmStatusChange}
      />

      <PromoCodeDetailsSheet
        codeId={selectedCodeId}
        open={!!selectedCodeId}
        onOpenChange={(open) => !open && setSelectedCodeId(null)}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onAssignCommercial={handleAssignCommercial}
      />
    </Card>
  )
}
