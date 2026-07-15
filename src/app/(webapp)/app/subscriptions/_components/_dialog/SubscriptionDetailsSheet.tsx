import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Calendar, Crown, MoreVertical } from "lucide-react"
import Badge from "@/components/display/Badge"
import { Button } from "@/components/ui/button"
import { formatNumber } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DialogMainBody } from "@/components/display/DialogMainBody"
import { useState } from "react"
import { PackageDescription } from "../_detail_sections/PackageDescription"
import { PackagePricing } from "../_detail_sections/PackagePricing"
import { PackageFeatures } from "../_detail_sections/PackageFeatures"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AllSubscriptionsModel } from "@/model/subscription/AllSubscriptionsModel"
import { cn } from "@/utils/ui/cn"
import { useGetActiveCurrency } from "@/hooks/__globlal/useGlobalHook"

const SubscriptionDetailsSheet = ({ isOpenned, onClose, packageId, packageData, onDelete, onEdit, onSuspend }: { isOpenned: boolean, onClose: () => void, packageId: string, packageData?: AllSubscriptionsModel | null, onDelete: () => void, onEdit: () => void, onSuspend: () => void }) => {
    const [activeTab, setActiveTab] = useState("desc");
    const {
        currency
    } = useGetActiveCurrency()
    return (
        <Sheet open={isOpenned} onOpenChange={onClose} bgType="whited">
            <SheetContent variant={"2xl"}>
                <SheetHeader>
                    <div className="w-full flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="size-12 rounded-lg bg-vaBlue/10 text-vaBlue flex items-center justify-center shrink-0">
                                <Crown />
                            </div>
                            <div className="h-12 flex flex-col justify-between">
                                <SheetTitle>
                                    {packageData?.name || "Détails du package"}
                                </SheetTitle>
                                <div className="flex items-center gap-2 text-sm text-vaLightGray">
                                    <Calendar className="size-4" />
                                    <p>Créé le {packageData?.createdAt}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge type={packageData?.status} />
                            {/* <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Button variant={"ghost"} size={"icon"}>
                                        <MoreVertical />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                        <DropdownMenuItem
                                            onClick={() => onEdit()}
                                            className={cn("cursor-pointer text-vaMainBlue text-xs font-medium hover:bg-vaPrimary/5 text-center")}
                                        >
                                           Modifier
                                        </DropdownMenuItem>
                                         <DropdownMenuItem
                                            onClick={() => onSuspend() }
                                            className={cn("cursor-pointer text-xs text-vaTextPrimary font-medium hover:bg-vaPrimary/5 text-center")}
                                        >
                                           Suspendre
                                        </DropdownMenuItem>
                                         <DropdownMenuItem
                                            onClick={() => onDelete()}
                                            className={cn("cursor-pointer text-vaRed text-xs font-medium hover:bg-vaPrimary/5 text-center")}
                                        >
                                           Supprimer
                                        </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu> */}
                        </div>
                    </div>
                </SheetHeader>
                <DialogMainBody className="min-h-[calc(100dvh-90px)]">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-xl p-4 border-2 bg-vaLightGray/10 flex flex-col gap-2">
                            <label htmlFor="" className="text-sm text-vaTextPrimary font-semibold">
                                Nombre d’abonnés
                            </label>
                            <p className="text-xl font-semibold">23</p>
                        </div>
                        <div className="rounded-xl p-4 border-2 bg-vaDarkGreen/50 border-vaDarkGreen flex flex-col gap-2">
                            <label htmlFor="" className="text-sm text-vaTextPrimary font-semibold">
                                Revenu total
                            </label>
                            <p className="text-xl font-semibold"> {formatNumber(2450000)} {currency} </p>
                        </div>
                    </div>
                    <Tabs defaultValue="desc" value={activeTab} onValueChange={(value) => setActiveTab(value)}>
                        <TabsList className="w-full grid grid-cols-2">
                            <TabsTrigger value="desc">Description</TabsTrigger>
                            <TabsTrigger value="tarif">Tarifaction</TabsTrigger>
                            {/* <TabsTrigger value="fonctionalities">Fonctionnalités</TabsTrigger> */}
                        </TabsList>
                    </Tabs>
                    {
                        activeTab === "desc" && (
                            <PackageDescription packageData={packageData} />
                        )
                    }
                    {
                        activeTab === "tarif" && (
                            <PackagePricing packageId={packageData?.id} />
                        )
                    }
                    {/* {
                        activeTab === "fonctionalities" && (
                            <PackageFeatures />
                        )
                    } */}
                </DialogMainBody>
            </SheetContent>
        </Sheet>
    )
}

export default SubscriptionDetailsSheet