"use client"


import { SwitcherTabs } from "@/components/display/switcher-tabs"
import { LayoutDashboard, Table } from "lucide-react"
import { ARCOverview } from "./_component/ATCOverview"
import { useARCHook } from "./_hook/useARCHook"
import { AtRiskCustomersList } from "./_component/AtRiskCustomersList"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useCallback } from "react"


export const AtRiskCustomersBody = () => {

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const selectedTab = searchParams.get("at") ?? "overview"

    const setSelectedTab = useCallback((value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("at", value)
        router.push(`${pathname}?${params.toString()}`, { scroll: false })
    }, [pathname, router, searchParams])

    const {
        kpiItems,
        isLoadingKpi,
        isLoadingPriority,
        priorityData
    } = useARCHook()

    const tabs = [
        {
            label: "Vue d’ensemble",
            value: "overview",
            icon: LayoutDashboard,
            content: <ARCOverview
                kpiItems={kpiItems}
                isLoadingKpi={isLoadingKpi}
                isLoadingPriorities={isLoadingPriority}
                prioritiesData={priorityData}
            />
        },
        {
            label: "Liste des clients",
            value: "list",
            icon: Table,
            content: <AtRiskCustomersList />
        }
    ]
    return (
        <div className="">
            <SwitcherTabs value={selectedTab} tabs={tabs} onSelect={setSelectedTab} />
        </div>
    )
}