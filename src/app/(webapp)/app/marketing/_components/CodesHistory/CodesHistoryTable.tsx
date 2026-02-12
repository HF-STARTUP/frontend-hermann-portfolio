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

export const CodesHistoryTable: React.FC = () => {
  const [filters, setFilters] = React.useState<MarketingFilters>({
    page: 1,
    itemPerPage: 20,
  })
  const [createDialogOpen, setCreateDialogOpen] = React.useState(false)

  const { data: codes, totalRecords, isLoading } = useGetPromoCodes(filters)
  const { mutate: updateStatus } = useUpdatePromoCodeStatus()
  const { mutate: deleteCode } = useDeletePromoCode()

  const itemPerPage = filters.itemPerPage ?? 20
  const totalPages = Math.max(1, Math.ceil(totalRecords / itemPerPage))
  const pageIndex = (filters.page ?? 1) - 1

  const handleStatusChange = (codeId: string, newStatus: "actif" | "suspendu") => {
    updateStatus({ codeId, status: newStatus })
  }

  const handleDelete = (codeId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce code ?")) {
      deleteCode(codeId)
    }
  }

  const handleView = (code: PromoCode) => {
    console.log("View code details:", code)
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
                onClick={() => setCreateDialogOpen(true)}
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
        />
      </CardContent>

      <CreateCodeDialog
        isOpen={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
      />
    </Card>
  )
}
