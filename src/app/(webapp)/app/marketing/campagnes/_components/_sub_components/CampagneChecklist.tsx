import { PageSubTitle } from "@/components/ui/custom/PageTitle";
import { ChecklistItem } from "../../_hook/useChecklistSection";
import Badge from "@/components/display/Badge";
import Image from "next/image";
import { Calendar, Clock, Edit, Trash2, Watch } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ChecklistRow = ({ item }: { item: ChecklistItem }) => {

    return (
        <div className="p-2 bg-vaLightGray/5 rounded-xl flex flex-col ga-2">
            <div className="w-full flex items-center justify-between">
                <PageSubTitle subtitle={item.taskType} />
                <Badge type={item.status} />
            </div>
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2 text-sm text-vaTextPrimary">
                    <p>{item.taskDescription}</p>
                    <div className="flex flex-wrap gap-2">
                        {
                            item.collaborators.map((col, index) =>
                                <div className="p-1 rounded-lg text-xs bg-vaLightGray/20 font-medium flex items-center gap-1 text-vaPrimary" key={index}>
                                    <div className="size-5 rounded-full overflow-hidden">
                                        <Image src={col.image as string} alt={col.name} width={100} height={100} className="size-full object-cover" />
                                    </div>
                                    <p> {col.name} </p>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <div className="p-1 bg-vaLightGray/20 rounded-lg text-xs text-vaTextPrimary flex items-center justify-center gap-2">
                        <Calendar className="size-3" />
                        {item.limiteDate}
                    </div>
                    <div className="p-1 bg-vaLightGray/20 rounded-lg text-xs text-vaTextPrimary flex items-center justify-center gap-2">
                        <Clock className="size-3" />
                        {item.limiteTime}
                    </div>
                    <div className="flex items-center -space-x-4">
                       <Button variant={"ghost"} size={"icon"}>
                        <Edit className="size-4 text-vaLightGray" />
                    </Button>
                    <Button variant={"ghost"} size={"icon"}>
                        <Trash2 className="text-vaRed size-4" />
                    </Button>  
                    </div>
                   
                </div>
            </div>
        </div>
    )

}

const ChecklistList = ({ items }: { items: ChecklistItem[] }) => {
    return (
        <div className="flex flex-col gap-4 w-full">
            {
                items.map((item, index) => <ChecklistRow item={item} key={index} />)
            }
        </div>
    )
}

export default ChecklistList