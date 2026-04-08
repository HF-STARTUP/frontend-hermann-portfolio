"use client"

import React from "react";
import { useDashboardKpis } from "@/app/(webapp)/app/dashboard/_hook/useDashboardKpis";
import KpiGrid from "@/components/display/Kpi";
import { DashboardGlobalFilters } from "../../_hook/useDashboardHook";

export const HeadSection = ({globalFilters}:{globalFilters?: DashboardGlobalFilters}) => {
    const {kpiItems, isLoading} = useDashboardKpis(globalFilters)

    return (
        <div className={"grid grid-cols-12 gap-[24px]"}>
            <div className={"col-span-12 2xl:col-span-12"}>
                <KpiGrid items={kpiItems} isLoading={isLoading} />
            </div>
        </div>
    )
}
