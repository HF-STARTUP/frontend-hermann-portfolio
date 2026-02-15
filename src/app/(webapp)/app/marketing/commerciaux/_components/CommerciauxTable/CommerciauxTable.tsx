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
import { Commercial, CommercialFilters } from "@/types/marketing.types"
import BtnBase from "@/components/elements/BtnBase"
import { AddCommercialDialog } from "../AddCommercialDialog/AddCommercialDialog"

const MOCK_COMMERCIALS: Commercial[] = [
  {
    id: "1",
    createdAt: "12 Jan 2025 18:30",
    name: "Lucas Martin",
    email: "lucas.martin@vtc.com",
    country: "Cameroun",
    codesAssigned: 23,
    codesUsed: 18,
    paidAccounts: 18,
    conversionRate: 78,
    revenue: 450000,
    performance: "excellent",
    status: "actif",
  },
  {
    id: "2",
    createdAt: "12 Jan 2025 18:30",
    name: "Ruth N'Guessan",
    email: "ruth.nguessan@vtc.com",
    country: "Bénin",
    codesAssigned: 23,
    codesUsed: 18,
    paidAccounts: 18,
    conversionRate: 65,
    revenue: 320000,
    performance: "bon",
    status: "actif",
  },
  {
    id: "3",
    createdAt: "12 Jan 2025 18:30",
    name: "Jean Kouamé",
    email: "jean.kouame@vtc.com",
    country: "Gabon",
    codesAssigned: 23,
    codesUsed: 18,
    paidAccounts: 18,
    conversionRate: 42,
    revenue: 280000,
    performance: "moyen",
    status: "actif",
  },
  {
    id: "4",
    createdAt: "12 Jan 2025 18:30",
    name: "Marie Diallo",
    email: "marie.diallo@vtc.com",
    country: "Mali",
    codesAssigned: 23,
    codesUsed: 18,
    paidAccounts: 18,
    conversionRate: 85,
    revenue: 180000,
    performance: "excellent",
    status: "actif",
  },
  {
    id: "5",
    createdAt: "12 Jan 2025 18:30",
    name: "Paul Yao",
    email: "paul.yao@vtc.com",
    country: "Togo",
    codesAssigned: 23,
    codesUsed: 18,
    paidAccounts: 18,
    conversionRate: 35,
    revenue: 150000,
    performance: "faible",
    status: "inactif",
  },
  {
    id: "6",
    createdAt: "12 Jan 2025 18:30",
    name: "Sophie Koffi",
    email: "sophie.koffi@vtc.com",
    country: "Côte d'Ivoire",
    codesAssigned: 23,
    codesUsed: 18,
    paidAccounts: 18,
    conversionRate: 72,
    revenue: 520000,
    performance: "bon",
    status: "actif",
  },
  {
    id: "7",
    createdAt: "12 Jan 2025 18:30",
    name: "Amadou Bah",
    email: "amadou.bah@vtc.com",
    country: "Sénégal",
    codesAssigned: 23,
    codesUsed: 18,
    paidAccounts: 18,
    conversionRate: 68,
    revenue: 390000,
    performance: "bon",
    status: "actif",
  },
  {
    id: "8",
    createdAt: "12 Jan 2025 18:30",
    name: "Fatou Diop",
    email: "fatou.diop@vtc.com",
    country: "Sénégal",
    codesAssigned: 23,
    codesUsed: 18,
    paidAccounts: 18,
    conversionRate: 45,
    revenue: 210000,
    performance: "moyen",
    status: "actif",
  },
]

export const CommerciauxTable: React.FC = () => {
  const [filters, setFilters] = React.useState<CommercialFilters>({
    search: "",
    status: "all",
    conversionRate: "all",
    performance: "all",
    country: "all",
  })

  const [salesAgentFilters, setSalesAgentFilters] =
    React.useState<SalesAgentFilters>({
      itemPerPage: 10,
      page: 1,
    })

  const [addDialogOpen, setAddDialogOpen] = React.useState(false)

  const {
    data: salesAgentsData,
    totalRecords,
    raw: rawResponse,
    isLoading,
  } = useGetSalesAgents(salesAgentFilters)

  const { mutate: updateStatus } = useUpdateCommercialStatus()
  const { mutate: deleteCommercial } = useDeleteCommercial()

  const displayCommercials = [] as Commercial[]

  const handleStatusChange = (commercialId: string, newStatus: 'actif' | 'inactif') => {
    updateStatus({ commercialId, status: newStatus })
  }

  const handleDelete = (commercialId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce commercial ?")) {
      deleteCommercial(commercialId)
    }
  }

  const handleView = (commercial: Commercial) => {
    console.log("View commercial details:", commercial)
  }

  const columns = React.useMemo(
    () => createColumns({
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
              filters={filters}
              onFiltersChange={setFilters}
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
                onClick={() => setAddDialogOpen(true)}
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
          data={displayCommercials}
          isLoading={isLoading}
          enableSorting
          enablePagination
          pageSize={salesAgentFilters.itemPerPage ?? 10}
          emptyMessage="Aucun commercial trouvé"
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
        onClose={() => setAddDialogOpen(false)}
      />
    </Card>
  )
}
