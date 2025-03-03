"use client"

import AdminSubNav from "@/components/layout/admin/SubNav/AdminSubNav";
import {RacesList} from "@/app/(protected)/dashboard/races/components/racesList/racesList";
import {FilterSection, FilterType} from "@/app/(protected)/dashboard/payment-history/components/tabs";
import {SectionDate} from "@/app/(protected)/dashboard/_components/_utils/DashboardSection.utils";
import {Suspense} from "react";
import Loading from "@/components/ui/Loader";


export default function RacesHistoryPage() {
    return (
        <div>
            <AdminSubNav
                title={`Historique de courses`}
                isSubPage={true}
            />
            <Suspense fallback={<Loading/>}>
                <FilterSection className={"mb-[53px]"} activeFilter={FilterType.neutral}/>
            </Suspense>
            <SectionDate name={""}>21/08/2024</SectionDate>
            <RacesList/>
        </div>
    )
}
