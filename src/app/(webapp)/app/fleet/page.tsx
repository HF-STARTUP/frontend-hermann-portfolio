"use client"

import {Crumb} from "@/components/ui/custom/crumb";
import {PageTitle} from "@/components/ui/custom/PageTitle";
import {useRouter} from "next/navigation";
import { FleetList } from "./fleetList";

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

