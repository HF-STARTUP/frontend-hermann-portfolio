import { KpiItem } from "@/components/display/Kpi"
import { StretchHorizontal, Users } from "lucide-react"
import React from "react"

const useFleetHook = () => {
    const KpiItems: KpiItem[] = [
        {
            title: "Nombre de flottes",
            value: 50,
            icon: React.createElement(StretchHorizontal),
            variant: "green",
            variation: "up",
            hint: "+10% vs mois précédent",
        },
        {
            title: "Total flottes actives",
            value: 30,
            icon: React.createElement(Users),
            variant: "blue",
            variation: "up",
            hint: "+2% vs mois précédent",
        },
        {
            title: "Total flottes inactives",
            value: 10,
            icon: React.createElement(StretchHorizontal),
            variant: "orange",
            variation: "up",
            hint: "+6% vs mois précédent",
        },
        {
            title: "Total flottes supprimées",
            value: 10,
            icon: React.createElement(StretchHorizontal),
            variant: "red",
            variation: "down",
            hint: "-10% vs mois précédent",
        },        
    ]
    return {
        KpiItems,
    }
}

export default useFleetHook