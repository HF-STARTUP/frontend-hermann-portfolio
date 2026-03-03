import { DialogMainBody } from "@/components/display/DialogMainBody";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Calendar, User } from "lucide-react";
import Image from "next/image";
import { AbonStatusBadge, SubscriptionBadge } from "../_sub_components/columnHelperComponents";
import { useFleetDetailsHook } from "../../_hook/useFleetDetailsHook";
import FleetKpiGrid from "../_sub_components/fleetDetailKpi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { DetailRowList } from "../detailSections/Profile";
import SubscriptionContent from "../detailSections/Subscription";

export default function FleetDetailsSheet({ isOpen, onClose, fleetId, onEdit, onDelete }: { isOpen: boolean, onClose: () => void, fleetId: string, onEdit: (fleetId: string) => void, onDelete: (fleetId: string) => void }) {
    const { KpiItems, ProfileItems } = useFleetDetailsHook()
    const [activeTab, setActiveTab] = useState<string>("profile")
    return (
        <Sheet open={isOpen} onOpenChange={onClose} bgType="whited">
            <SheetContent variant={"2xl"} >
                <SheetHeader className="pb-4">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <div className="size-16 rounded-xl overflow-hidden bg-vaLightGray/70 flex items-center justify-center">
                                <Image
                                    src="https://urbandrivers.taxi/_next/image?url=%2Fassets%2Fwhited-logo.png&w=2048&q=75"
                                    alt="Logo de la flotte"
                                    width={100}
                                    height={100}
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                            <div className="h-16 flex flex-col justify-between gap-1">
                                <h2 className="text-xl font-semibold text-[#0A0A0A]">Urban Drivers</h2>
                                <div className="flex items-center gap-2 text-xs text-vaLightGray">
                                    <User size={18} />
                                    <span>Amadou Diallo</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-vaLightGray">
                                    <Calendar size={18} />
                                    <span>Ajouté le 15 Jan 2025 à 15h00</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <SubscriptionBadge name="ESSENTIEL" />
                            <AbonStatusBadge status="Active" />
                        </div>
                    </div>
                </SheetHeader>
                <DialogMainBody className="flex-1 max-h-[calc(100dvh-100px)]">
                    <div className="space-y-6 py-4">
                        <FleetKpiGrid kpiItems={KpiItems} />
                        <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="profile">
                          <TabsList className="rounded-2xl w-full grid grid-cols-4">
                            <TabsTrigger value="profile">
                                Profil
                            </TabsTrigger>
                            <TabsTrigger value="subscription">
                                Abonnement
                            </TabsTrigger>
                            <TabsTrigger value="transactions">
                                Transactions
                            </TabsTrigger>
                            <TabsTrigger value="journal">
                                Journal
                            </TabsTrigger>
                          </TabsList>
                        </Tabs>
                        {activeTab === "profile" && <DetailRowList rows={ProfileItems} />}
                        {activeTab === "subscription" && <SubscriptionContent />}
                    </div>
                </DialogMainBody>
            </SheetContent>
        </Sheet>
    )
}