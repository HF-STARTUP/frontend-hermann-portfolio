"use client"

import React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/DataTable"
import { Download, Plus } from "lucide-react"
import { CodesTableFilters } from "./CodesTableFilters"
import { createColumns } from "./columns"
import { useGetPromoCodes, useUpdatePromoCodeStatus, useDeletePromoCode } from "@/hooks/marketing/useMarketing"
import { MarketingFilters, PromoCode } from "@/types/marketing.types"
import { CreateCodeDialog } from "../CreateCodeDialog/CreateCodeDialog"
import BtnBase from "@/components/elements/BtnBase"

const MOCK_CODES: PromoCode[] = [
  {
    id: "1",
    createdAt: "12 Jan 2025 18:30",
    code: "LOYAL_30",
    type: "reduction_nouveau_client",
    value: "-20% sur\n1er mois",
    target: "Nouveaux\nclients",
    assignedCommercial: null,
    usageCount: 346,
    conversions: 90,
    conversionRate: 57,
    status: "actif",
  },
  {
    id: "2",
    createdAt: "12 Jan 2025 18:30",
    code: "LOYAL_30",
    type: "coupon_gratuit",
    value: "GPS offert\n30 jours",
    target: "Clients\npremium",
    assignedCommercial: "Ruth N'Guessan",
    usageCount: 346,
    conversions: 90,
    conversionRate: 72,
    status: "expire",
  },
  {
    id: "3",
    createdAt: "12 Jan 2025 18:30",
    code: "LOYAL_30",
    type: "fidelisation_client",
    value: "1 mois\noffert",
    target: "Clients actifs >\n3 mois",
    assignedCommercial: null,
    usageCount: 346,
    conversions: 90,
    conversionRate: 0,
    status: "suspendu",
  },
  {
    id: "4",
    createdAt: "12 Jan 2025 18:30",
    code: "FREEGPS",
    type: "reduction_nouveau_client",
    value: "-20% sur\n1er mois",
    target: "Nouveaux\nClients",
    assignedCommercial: "Jean Kouamé",
    usageCount: 346,
    conversions: 90,
    conversionRate: 67,
    status: "actif",
  },
  {
    id: "5",
    createdAt: "12 Jan 2025 18:30",
    code: "FREEGPS",
    type: "reddition_commerciale",
    value: "-20% sur\n1er mois",
    target: "Prospects\n(démo demandée)",
    assignedCommercial: "Jean Kouamé",
    usageCount: 346,
    conversions: 90,
    conversionRate: 0,
    status: "suspendu",
  },
  {
    id: "6",
    createdAt: "12 Jan 2025 18:30",
    code: "FREEGPS",
    type: "reddition_commerciale",
    value: "-20% sur\n1er mois",
    target: "Prospects\n(démo demandée)",
    assignedCommercial: "Jean Kouamé",
    usageCount: 346,
    conversions: 90,
    conversionRate: 92,
    status: "actif",
  },
  {
    id: "7",
    createdAt: "12 Jan 2025 18:30",
    code: "FREEGPS",
    type: "coupon_gratuit",
    value: "-20% sur\n1er mois",
    target: "Clients\npremium",
    assignedCommercial: "Jean Kouamé",
    usageCount: 346,
    conversions: 90,
    conversionRate: 67,
    status: "actif",
  },
]

    
    export const CodesHistoryTable = ({onCreateCode}:{onCreateCode: () => void}) => {
  const [filters, setFilters] = React.useState<MarketingFilters>({
    search: "",
    conversionRate: "all",
    codeType: "all",
    status: "all",
  })
  
  const [createDialogOpen, setCreateDialogOpen] = React.useState(false)

  const { data: codes, isLoading } = useGetPromoCodes(filters)
  const { mutate: updateStatus } = useUpdatePromoCodeStatus()
  const { mutate: deleteCode } = useDeletePromoCode()

  const displayCodes = codes.length > 0 ? codes : MOCK_CODES

  const handleStatusChange = (codeId: string, newStatus: 'actif' | 'suspendu') => {
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

  const columns = React.useMemo(
    () => createColumns({
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
            <CodesTableFilters 
              filters={filters} 
              onFiltersChange={setFilters} 
            />
            
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
          data={displayCodes}
          isLoading={isLoading}
          enableSorting
          enablePagination
          pageSize={7}
          emptyMessage="Aucun code promo trouvé"
        />
      </CardContent>
      
      <CreateCodeDialog 
        isOpen={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
      />
    </Card>
  )
}
