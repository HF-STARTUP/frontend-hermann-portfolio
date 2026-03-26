import { Crumb } from "@/components/ui/custom/crumb"
import SettingsBody from "./SettingsBody"
import { PageTitle } from "@/components/ui/custom/PageTitle"

const SettingsPage = ()=>{
    return (
        <div className="space-y-6">
            <Crumb 
                items={[
                    {
                        label: "Paramètres",
                        url: "settings"
                    }
                ]}
            />
            <PageTitle page_title="Paramètres" withSelect={false} />
            <SettingsBody />
        </div>
    )
}

export default SettingsPage