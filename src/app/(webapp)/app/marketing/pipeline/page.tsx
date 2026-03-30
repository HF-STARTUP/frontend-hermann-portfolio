import { Crumb } from "@/components/ui/custom/crumb"
import PipelineBody from "./PipelineBody"
import { PageTitle } from "@/components/ui/custom/PageTitle"

const PipelinePage = ()=>{
    return(
        <div className="space-y-6">
            <Crumb 
                items={[
                    {
                        label: "Marketing & Campagnes/",
                        url: "marketing/dashboard"
                    },
                    {
                        label: "Pipeline Clients",
                        url: "marketing/pipeline"
                    },
                ]}
            />
            <PipelineBody />
        </div>
    )
}

export default PipelinePage