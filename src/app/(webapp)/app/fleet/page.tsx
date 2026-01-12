"use client"

import {Crumb} from "@/components/ui/custom/crumb";
import {PageTitle} from "@/components/ui/custom/PageTitle";
import {FleetList} from "@/app/(webapp)/app/fleet/sections/fleets-list/fleetList";
import {useRouter} from "next/navigation";

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
                />
            </div>
            <div className={""}>
                <FleetList/>
            </div>
        </div>
    )
}

