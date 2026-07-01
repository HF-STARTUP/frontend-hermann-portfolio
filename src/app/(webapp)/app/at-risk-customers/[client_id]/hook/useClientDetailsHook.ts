import { useGetARCClientProfile, useGetARCInteractions } from "@/hooks/at-risk-customers/useAtRiskCustomers"
import { exportToExcel } from "@/lib/utils"
import { AtRiskCustomersParams } from "@/types/at-risk-customers.type"
import { useState } from "react"

export const useClientDetailsHook = (id: string) => {

    const [params, setParams] = useState<AtRiskCustomersParams>({
        park_id: id
    })
    const [isExporting, setIsExporting] = useState(false)

    const { isLoading, profile } = useGetARCClientProfile(params)

    const {
        currentPage,
        interactions,
        isLoading: isLoadingInteractions,
        totalPages,
        totalRecords,
    } = useGetARCInteractions(params)

    const exportInteractions = () => {
        setIsExporting(true)
        exportToExcel({
            data: interactions,
            columns: [
                { header: "Date", accessor: (i) => i.occurredAt },
                { header: "Catégorie", accessor: (i) => i.categoryLabel },
                { header: "Titre", accessor: (i) => i.title },
                { header: "Source", accessor: (i) => i.isSystemGenerated ? "Système" : "Manuel" },
                { header: "Notes", accessor: (i) => i.notes ?? "-" },
            ],
            fileName: `interactions-${profile?.name ?? id}`,
            sheetName: "Interactions",
        }).finally(() => {
            setIsExporting(false)
        });
    };

    return {
        isLoading,
        profile,
        currentPage,
        interactions,
        isLoadingInteractions,
        totalPages,
        totalRecords,
        exportInteractions, 
        isExporting
    }
}