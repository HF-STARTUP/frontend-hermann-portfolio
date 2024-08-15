"use client"

import AdminSubNav from "@/components/layout/admin/SubNav/AdminSubNav";
import {RacesList} from "@/app/(protected)/dashboard/races/components/racesList/racesList";
import {FilterSection, FilterType} from "@/app/(protected)/dashboard/payment-history/components/tabs";
import {SectionDate} from "@/app/(protected)/dashboard/_components/_utils/DashboardSection.utils";


export default function RacesHistoryPage() {
    return (
        <div>
            <AdminSubNav
                title={`Historique de courses`}
                isSubPage={true}
            />
            <FilterSection className={"mb-[53px]"} activeFilter={FilterType.neutral} />
            <SectionDate name={""}>21/08/2024</SectionDate>
            <RacesList/>
        </div>
    )
}
