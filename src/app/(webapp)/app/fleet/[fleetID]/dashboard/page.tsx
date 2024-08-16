"use client"

import {StatCards} from "@/app/(webapp)/app/fleet/[fleetID]/dashboard/stat_cards/statCards";
import {
    CashEvolution,
    CourseEvolution,
    EntretienEvolution
} from "@/app/(webapp)/app/dashboard/_components/abonEvolution/abonnEvolution";
import {useGetFleetDetails, useGetFleetStats} from "@/hooks/admin/useFleetHook";

export default function DashboardPage() {

    const {} = useGetFleetDetails()
    const {} = useGetFleetStats()

    return (
        <div>
            <StatCards/>
            <div className={"mt-[24px] grid grid-cols-12 gap-[24px]"}>
                <div className={"col-span-4"}>
                    <CourseEvolution/>
                </div>
                <div className={"col-span-4"}>
                    <CashEvolution/>
                </div>
                <div className={"col-span-4"}>
                    <EntretienEvolution/>
                </div>
            </div>
        </div>
    )
}