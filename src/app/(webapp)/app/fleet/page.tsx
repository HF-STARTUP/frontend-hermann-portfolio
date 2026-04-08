"use client"

import {Crumb} from "@/components/ui/custom/crumb";
import {PageTitle} from "@/components/ui/custom/PageTitle";
import {useRouter} from "next/navigation";
import { FleetList } from "./fleetList";
import PeriodSelector from "@/components/elements/PeriodSelector";

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
            <div className={""}>
                <FleetList/>
            </div>
        </div>
    )
}

