import { KpiItem } from "@/components/display/Kpi"
import { formatNumber } from "@/lib/utils"
import React from "react"
import { Download, Globe, Globe2, TrendingUp, Users2 } from "lucide-react"


export const useDetailsSection = ()=>{
    const KpiItems: KpiItem[] = [
        {
            icon: React.createElement(Users2),
            title: "Total leads",
            value: formatNumber(317),
            variant: "blue"            
        },
        {
            icon: React.createElement(TrendingUp),
            title: "Conversations",
            value: formatNumber(106),
            variant: "green"
        },
        {
            icon: React.createElement(Download),
            title: "Téléchargements",
            value: formatNumber(456),
            variant: "purple"
        },
        {
            icon: React.createElement(Globe),
            title: "Visites site",
            value: formatNumber(3117),
            variant: "light-blue"
        },
    ]

    return{
        DetailsKpi: KpiItems
    }
}