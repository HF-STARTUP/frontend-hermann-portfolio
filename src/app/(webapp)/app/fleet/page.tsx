"use client"

import {Crumb} from "@/components/ui/custom/crumb";
import {PageTitle} from "@/components/ui/custom/PageTitle";
import {ABlockTitle} from "@/app/(webapp)/app/dashboard/_components/abonEvolution/abonnEvolution";
import {ABtnAction} from "@/components/ui/custom/actions";
import {UserAccountSection} from "@/components/layout/admin/SubNav/AdminSubNav";
import {FleetList} from "@/app/(webapp)/app/fleet/sections/fleets-list/fleetList";

export default function ADahboardPage() {

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
                <PageTitle page_title={"Flottes"}/>
            </div>
            <div className={"flex justify-between items-center"}>
                <div className={"mt-[24px] flex items-center  justify-start gap-[26px]"}>
                    <ABlockTitle>Sélectionnez une flotte</ABlockTitle>
                    <ABtnAction>Ajouter une flotte</ABtnAction>
                </div>
                <UserAccountSection/>
            </div>

            <div className={"mt-[32px]"}>
                <FleetList/>
            </div>
        </div>
    )
}

