"use client"


import { SwitcherTabs } from "@/components/display/switcher-tabs"
import { useState } from "react"
import { LayoutDashboard, Table } from "lucide-react"
import { ARCOverview } from "./_component/ATCOverview"
import { useARCHook } from "./_hook/useARCHook"
import { AtRiskCustomersList } from "./_component/AtRiskCustomersList"


export const AtRiskCustomersBody = () => {

    const [selectedTab, setSelectedTab] = useState("overview")

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
            <SwitcherTabs value={selectedTab} tabs={tabs} onSelect={(v) => setSelectedTab(v)} />
        </div>
    )
}