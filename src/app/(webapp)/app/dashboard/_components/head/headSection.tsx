"use client"

import React from "react";
import KpiGrid, { KpiShimmerGrid } from "@/components/display/Kpi";
import { useDashboardKpis } from "@/app/(webapp)/app/dashboard/_hook/useDashboardKpis";

export const HeadSection = () => {
    const {kpis, isLoading} = useDashboardKpis()

    if (isLoading && !kpis.length) {
        return (
            <KpiShimmerGrid count={4}/>
        )
    }

    if (!kpis.length) {
        return null
    }

    return (
        <div className={"grid grid-cols-12 gap-[24px]"}>
            <div className={"col-span-12 2xl:col-span-12"}>
                <KpiGrid items={kpis}/>
            </div>
        </div>
    )
}
