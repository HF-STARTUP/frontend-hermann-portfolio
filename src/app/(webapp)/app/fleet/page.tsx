"use client"

import {Crumb} from "@/components/ui/custom/crumb";
import {PageTitle} from "@/components/ui/custom/PageTitle";
import {ABlockTitle} from "@/app/(webapp)/app/dashboard/_components/abonEvolution/abonnEvolution";
import {ABtnAction} from "@/components/ui/custom/actions";
import {UserAccountSection} from "@/components/layout/admin/SubNav/AdminSubNav";
import {FleetList} from "@/app/(webapp)/app/fleet/sections/fleets-list/fleetList";
import AuthManagerGuard from "@/guard/AuthManagerGuard";
import {useRouter} from "next/navigation";
import FleetService from "@/services/admin/fleet/fleetService";

export default function ADahboardPage() {
    const $router = useRouter()

    return (
        <div>
            <Crumb
                items={[
                    {
                        label: "Flottes",
                        url: "/fleet",
                    }
                ]}
            />
            <div className={"flex items-center justify-between"}>
                <PageTitle
                    page_title={"Flottes"}
                    onValueChange={async (new_value) => {
                        console.log(new_value)
                        AuthManagerGuard.setEnabledFleetType(new_value)
                        console.log(AuthManagerGuard.getEnabledFleetType, ": New value setted")
                        await FleetService.invalidFleets()
                    }}
                />
            </div>
            <div className={""}>
                <FleetList/>
            </div>
        </div>
    )
}

