"use client"

import { SwitcherTabs } from "@/components/display/switcher-tabs"
import { Button } from "@/components/ui/button"
import { Crumb } from "@/components/ui/custom/crumb"
import { PageTitle } from "@/components/ui/custom/PageTitle"
import { Plus } from "lucide-react"
import { Suspense, useState } from "react"
import { AtRiskCustomersBody } from "./ARCBody"
import { AddActionFormSheet } from "./_component/AddActionFormSheet"

const AtRiskCustomersPage = () => {
    const [isActionOpen, setIsActionOpen] = useState(false)

    return (
        <div className="">
            <Crumb items={[
                {
                    label: "Clients à risque",
                    url: "at-risk-customers"
                }
            ]} />
            <PageTitle
                page_title="Clients à risque"
                description="Clients présentant des signaux d’alerte pouvant nécessiter une intervention.
Priorisez, comprenez et réactivez avant qu’ils ne résilient."
                withSelect={false}
                end_component={
                    <Button variant={"mainBlue"} onClick={() => setIsActionOpen(true)}>
                        <Plus size={16} className="mr-3" />
                        Nouvelle action
                    </Button>
                } />
            <AddActionFormSheet
                isOpenned={isActionOpen}
                onClose={() => setIsActionOpen(false)}
            />
            <Suspense fallback={null}>
                <AtRiskCustomersBody />
            </Suspense>
        </div>
    )
}

export default AtRiskCustomersPage