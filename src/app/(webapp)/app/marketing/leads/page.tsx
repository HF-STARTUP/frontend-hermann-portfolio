import { Crumb } from "@/components/ui/custom/crumb"
import LeadsBody from "./LeadsBody"

const LeadPage = ()=>{
    return(
        <div className="">
            <Crumb items={[{
                label: "Marketing & Campagnes/",
                url: "marketing/dashboard"
            },
            {
                label: "Leads & Conversation ",
                url: "marketing/leads"
            }
            ]} />
            <LeadsBody />
        </div>
    )
}

export default LeadPage