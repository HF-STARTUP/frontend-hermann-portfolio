import { DialogMainBody } from "@/components/display/DialogMainBody"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { Calendar, MoreVertical, User } from "lucide-react"
import CampagneDetailsSection from "../_detail_sections/Details"
import CampagneChecklist from "../_detail_sections/CampagneChecklist"
import CampagneLeadsSection from "../_detail_sections/CampagneLeads"
import CommentsList from "../_detail_sections/CampagneCommentsSection"
import { useCampagneComments } from "../../_hook/useCampagneCommentsHook"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const CampagneDetailsSheet = ({ 
    name, 
    startDate, 
    endDate, 
    userName, 
    id, 
    isOpenned, 
    onClose,
    onEdit,
onSuspend,
onDuplicate,
onDelete
 }: { 
    name?: string, 
    startDate?: string, 
    endDate?: string, 
    userName?: string,
    id?: string, 
    isOpenned: boolean, 
    onClose: () => void,
    onEdit: ()=>void,
    onSuspend: ()=>void,
    onDuplicate: ()=> void,
    onDelete: ()=> void,
}) => {
    const [activeTab, setActiveTab] = useState<"details" |
        "checklist" |
        "leads" |
        "comments">("details")
    const { campagneComments } = useCampagneComments()
    return (
        <Sheet onOpenChange={onClose} open={isOpenned} >
            <SheetContent variant={"2xl"}>
                <SheetHeader>
                    <SheetTitle className="flex items-center justify-between flex-row">
                        {name}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                    <DropdownMenuItem  
                                        onClick={()=>onEdit()}                                      
                                        className={cn("cursor-pointer text-vaBlue hover:text-vaBlue text-xs font-medium hover:bg-vaPrimary/5 text-center")}
                                    >
                                       Modifier 
                                    </DropdownMenuItem>
                                    <DropdownMenuItem   
                                        onClick={()=>onSuspend()}                                     
                                        className={cn("cursor-pointer text-vaTextPrimary hover:text-vaTextPrimary text-xs font-medium hover:bg-vaPrimary/5 text-center")}
                                    >
                                       Suspendre 
                                    </DropdownMenuItem>
                                    <DropdownMenuItem   
                                        onClick={()=>onDuplicate()}                                     
                                        className={cn("cursor-pointer text-vaTextPrimary hover:text-vaTextPrimary text-xs font-medium hover:bg-vaPrimary/5 text-center")}
                                    >
                                       Dupliquer 
                                    </DropdownMenuItem>
                                    <DropdownMenuItem  
                                        onClick={()=>onDelete()}                                      
                                        className={cn("cursor-pointer text-vaRed hover:text-vaRed text-xs font-medium hover:bg-vaPrimary/5 text-center")}
                                    >
                                       Supprimer 
                                    </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SheetTitle>
                    <div className="flex items-center gap-4">
                        <Button variant={"secondary"} size={"sm"} fullWidth={false}>
                            <div className="flex items-center gap-2 text-xs">
                                <User className="size-4" />
                                {userName}
                            </div>
                        </Button>
                        <Button variant={"secondary"} size={"sm"} fullWidth={false}>
                            <div className="flex items-center gap-2 text-xs">
                                <Calendar className="size-4" />
                                {startDate} - {endDate}
                            </div>
                        </Button>
                    </div>
                </SheetHeader>
                <div className="sticky top-0 p-4 bg-vaLightGray/5">
                    <Tabs value={activeTab} defaultValue="details" onValueChange={(value) => setActiveTab(value as "details" |
                        "checklist" |
                        "leads" |
                        "comments")}>
                        <TabsList className="w-full grid grid-cols-4">
                            <TabsTrigger value="details">Détails</TabsTrigger>
                            <TabsTrigger value="checklist">Checklist (0)</TabsTrigger>
                            <TabsTrigger value="leads">Leads (0)</TabsTrigger>
                            <TabsTrigger value="comments">Commentaire</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
                <DialogMainBody className="flex-1 max-h-[calc(100dvh-180px)] bg-vaLightGray/5 h-full pb-8 relative">
                    {activeTab === "details" && <CampagneDetailsSection id={id} />}
                    {activeTab === "checklist" && <CampagneChecklist id={id} />}
                    {activeTab === "leads" && <CampagneLeadsSection id={id} />}
                    {activeTab === "comments" && <CommentsList id={id} comments={campagneComments} />}


                </DialogMainBody>
            </SheetContent>
        </Sheet>)
}

export default CampagneDetailsSheet