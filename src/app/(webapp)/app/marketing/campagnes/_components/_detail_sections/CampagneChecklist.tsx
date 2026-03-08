import { PageSubTitle } from "@/components/ui/custom/PageTitle"
import { useChecklistSection } from "../../_hook/useChecklistSection"
import ChecklistList from "../_sub_components/CampagneChecklist"
import { CheckSquare, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EmptyData } from "@/components/box/PageNetworkState"
import { useState } from "react"
import ChecklistForm from "../_sub_components/ChecklistForm"

const CampagneChecklist = ({ id }: { id?: string }) => {
    const { checkList } = useChecklistSection();
    const [isChecklistFormVisible, setIsChecklistFormVisible] = useState(false)
    return (
        <div className="bg-white p-6 rounded-2xl flex flex-col gap-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <CheckSquare className="text-vaTextPrimary" />
                    <PageSubTitle subtitle="Checklist" />
                </div>
               { !isChecklistFormVisible && <Button variant={"link"} className="text-lg text-vaMainBlue" onClick={()=>setIsChecklistFormVisible(true)}>
                    <Plus/> Ajouter une tâche
                </Button>}
            </div>

            { !isChecklistFormVisible && (checkList.length>0 ? <ChecklistList items={checkList} /> : <EmptyData message="Aucune tâche ajoutée pour le moment" description="Cliquez pour ajoutez une tâche" />)}
            {isChecklistFormVisible && <ChecklistForm action="add" onCancel={()=>setIsChecklistFormVisible(false)}  />}
        </div>
    )
}

export default CampagneChecklist