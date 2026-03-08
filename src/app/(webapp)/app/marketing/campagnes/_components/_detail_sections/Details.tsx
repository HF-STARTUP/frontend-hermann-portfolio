import { PageSubTitle } from "@/components/ui/custom/PageTitle"
import { useDetailsSection } from "../../_hook/useDetailsSection"
import { KpiCard } from "@/components/display/Kpi"
import { Plus, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import AddCommercialToCampDialog from "../_dialogs/AddCommercialToCampDialog"
import { useState } from "react"

export const DetailsRow = ({ label, value }: { label: string, value: string | number }) => {
    return (
        <div className="flex flex-row items-center justify-between w-full text-sm text-vaTextPrimary">
            <p className="font-normal">{label}</p>
            <p className="text-black font-medium">{value}</p>
        </div>
    )
}

const CampagneDetailsSection = ({id}:{id?:string}) => {
    const { DetailsKpi } = useDetailsSection();
    const [isAddCommercial, setIsAddCommercial] = useState(false)
    return (
        <div className="space-y-6">
            <PageSubTitle subtitle="Statistiques de la campagne" />
            <div className="grid grid-cols-4 gap-2">
                {
                    DetailsKpi.map((item, index) =>
                        <KpiCard key={index} className="p-2" icon={item.icon} title={item.title} value={item.value} variant={item.variant} />
                    )
                }
            </div>

            <div className="bg-white p-4 rounded-2xl space-y-6">
                <PageSubTitle subtitle="Budget & Dépenses" />
                <div className="flex flex-col gap-2 w-full">
                    <DetailsRow label="Utilisation du budget" value={"85.0 %"} />
                    <div className="w-full h-3 rounded-full bg-vaLightGray/15">
                        <div className="h-full bg-vaOrange rounded-full border-r-10 border-white" style={{ width: "85%" }}></div>
                    </div>
                    <DetailsRow label="Dépensé: 12,750,000 XOF" value={"Restant: 256,000 X0F"} />
                </div>
            </div>

            <div className="bg-white p-4 rounded-2xl space-y-6">
                <PageSubTitle subtitle="Détails" />
                <div className="flex flex-col gap-4 w-full">
                    <DetailsRow label="Type de campagne" value={"Prospection"} />
                    <DetailsRow label="Cibles" value={"Leads"} />
                    <DetailsRow label="Canaux" value={"Facebook, WhatsApp"} />
                    <DetailsRow label="Objectif" value={"500 leads"} />
                    <DetailsRow label="Usage de code promo" value={"Oui (Reddition commerciale)"} />
                </div>
            </div>
            <div className="bg-white p-4 rounded-2xl space-y-6">
                <div className="flex items-center gap-2 text-vaTextPrimary">
                <Users className="size-5" strokeWidth={4} /> <PageSubTitle subtitle="Commerciaux assignés" />
                </div>
                
                <div className="flex gap-3 w-full">
                   <div className="bg-vaLightGray/10 p-2 rounded-lg flex items-center justify-center gap-2">
                    <div className="rounded-full size-6 bg-vaPrimary flex items-center justify-center text-xs font-semibold text-white p-1">
                        TA
                    </div>
                    <p>Takum Djeutcha</p>
                   </div>
                   <Button variant={"outline"} size={"icon"} className="rounded-full" onClick={()=>setIsAddCommercial(true)}>
                        <Plus className="size-5" />
                   </Button>
                </div>
            </div>
            <AddCommercialToCampDialog isOpenned={isAddCommercial} onClose={()=>setIsAddCommercial(false)} id={id} />
        </div>
    )
}

export default CampagneDetailsSection