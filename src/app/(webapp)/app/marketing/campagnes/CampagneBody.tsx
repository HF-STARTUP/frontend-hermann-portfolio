"use client"

import { Crumb } from "@/components/ui/custom/crumb"
import { PageTitle } from "@/components/ui/custom/PageTitle"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const CampagneBody = ()=>{

    return(
        <div className="">
            <Crumb
                items={[
                    {
                        label: "Marketing & Campagnes",
                        url: "/app/marketing/dashboard",
                    }
                ]}
            />


            <PageTitle page_title="Campagnes" withSelect={false} end_component={
                <Select defaultValue="current-month">
                    <SelectTrigger className="border-none bg-white rounded-xl text-lg px-4 min-w-44 w-fit">
                        <SelectValue placeholder="periode"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="current-month">Ce mois-ci</SelectItem>
                        <SelectItem value="today">Aujourd'hui</SelectItem>
                        <SelectItem value="yesterday">Hier</SelectItem>
                        <SelectItem value="custom">Personaliser</SelectItem>
                    </SelectContent>
                </Select>} />
        </div>
    )
}

export default CampagneBody