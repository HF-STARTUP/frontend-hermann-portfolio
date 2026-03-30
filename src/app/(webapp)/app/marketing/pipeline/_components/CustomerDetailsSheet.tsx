import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Building, Building2, Calendar, Edit } from "lucide-react";
import { cn } from "@/utils/ui/cn";
import { getAvatarColor, getAvatarInitials } from "@/lib/initials.avatar.util";
import Badge from "@/components/display/Badge";
import { DialogMainBody } from "@/components/display/DialogMainBody";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import { DetailRowList, DetailRowProps } from "@/app/(webapp)/app/fleet/components/detailSections/Profile";
import { CustomerItem } from "../_hooks/usePipelineHook";

export const CustomerDetailsSheet = ({ isOpenned, onClose, customer }: { isOpenned: boolean, onClose: () => void, customer?: CustomerItem }) => {
    const [activeTab, setActiveTab] = useState<"details" |
        "files" |
        "comments" |
        "history">("details")

    const profileItems: DetailRowProps[] = [
        {
            label: "Date d’ajout",
            value: customer?.convertedAt
        },
        {
            label: "Adresse e-mail",
            value: customer?.email
        },
        {
            label: "Numéro de téléphone",
            value: customer?.phoneNum
        },
        {
            label: "Source",
            value: customer?.channelName
        },
        {
            label: "Campagne marketing",
            value: customer?.channelName
        },
        {
            label: "Commercial assigné",
            value: customer?.assignedCommercial
        },
    ]
    const scrollContainerRef = React.useRef<HTMLDivElement | null>(null);
    return (
        <Sheet open={isOpenned} onOpenChange={onClose}>
            <SheetContent variant={"2xl"}>
                <SheetHeader>
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                            <div className={cn(
                                "size-20 rounded-xl flex items-center justify-center font-bold text-white text-3xl",
                                getAvatarColor(customer?.name)
                            )}>
                                {getAvatarInitials(customer?.name)}
                            </div>
                            <div className="flex flex-col justify-between h-20 gap-1">
                                <SheetTitle className="text-xl">
                                    {customer?.name}
                                </SheetTitle>
                                <div className="flex items-center gap-1 text-base text-vaTextPrimary">
                                    <Building className="size-5" />
                                    <p> {customer?.companyName} </p>
                                </div>
                                <div className="flex items-center gap-1 text-sm text-vaLightGray">
                                    <Calendar className="size-4" />
                                    <p> Ajouter le {customer?.convertedAt} </p>
                                </div>
                            </div>
                        </div>
                        <Badge type={customer?.status} />
                    </div>
                </SheetHeader>
                <DialogMainBody className="space-y-6 min-h-[calc(100dvh-120px)]" ref={scrollContainerRef}>
                    <Tabs>
                        <TabsList className="grid grid-cols-4">
                            <TabsTrigger value="details">Détails</TabsTrigger>
                            <TabsTrigger value="files">Fichiers</TabsTrigger>
                            <TabsTrigger value="comments">Commentaires</TabsTrigger>
                            <TabsTrigger value="history">Historique</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    {activeTab === "details" && <DetailRowList rows={profileItems} title="Informations générales" onEdit={()=>{alert("modification ")}} />}

                </DialogMainBody>
            </SheetContent>
        </Sheet>
    )
}