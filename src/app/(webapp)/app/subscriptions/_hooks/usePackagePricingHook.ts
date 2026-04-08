import { useState } from "react"

export const usePackagePricingHook = () => {
    // On utilise un tableau pour permettre plusieurs sélections
    const [periods, setPeriods] = useState<string[]>([])
    const [trials, setTrials] = useState<Record<string, boolean>>({})

    const togglePeriod = (p: "monthly" | "quarterly" | "annual") => {
        setPeriods(prev => prev.includes(p) ? prev.filter(item => item !== p) : [...prev, p])
    }

    const toggleTrial = (p: string) => {
        setTrials(prev => ({ ...prev, [p]: !prev[p] }))
    }

    return {
        periods,
        trials,
        togglePeriod,
        toggleTrial,
        isMonthly: periods.includes("monthly"),
        isQuarterly: periods.includes("quarterly"),
        isAnnual: periods.includes("annual"),
    }
}