import { DialogMainBody } from "@/components/display/DialogMainBody";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Calendar, Crown, MoreVertical, User } from "lucide-react";
import { useFleetDetailsHook } from "../../_hook/useFleetDetailsHook";
import FleetKpiGrid from "../_sub_components/fleetDetailKpi";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DetailRowList } from "../detailSections/Profile";
import SubscriptionContent from "../detailSections/Subscription";
import TransactionsContent from "../detailSections/Transactions";
import fleetJournalHook from "../../_hook/useFleetJournalHook";
import JournalList from "../detailSections/Journal";
import { DeleteFleetDialog } from "./utils/ConfirmFleetDelete";
import { SuspendFleetDialog } from "./utils/SuspendFleetDialog";
import { FleetModel } from "@/model/ADMIN/fleet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Badge from "@/components/display/Badge";
import { getAvatarColor, getAvatarInitials } from "@/lib/initials.avatar.util";


export default function FleetDetailsSheet({
    isOpen,
    onClose,
    fleet,
    onEdit,
    onDelete,
}: {
    isOpen: boolean;
    onClose: () => void;
    fleet: FleetModel | null;
    onEdit: (fleetId: string) => void;
    onDelete: (fleetId: string) => void;
}) {
    const { 
        journals, 
        isLoadingFleetJournal, 
        sentinelRef, 
        isFetching ,
        page
    } = fleetJournalHook(fleet?.id);


    const { 
        KpiItems, 
        ProfileItems, 
        isLoadingFleetOverview, 
        isLoadingFleetProfile 
    } = useFleetDetailsHook(fleet?.id);
    
    const [activeTab, setActiveTab] = useState<string>("profile");
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isSuspendOpen, setIsSuspendOpen] = useState(false);
    if (!fleet) return null;

    return (
        <Sheet open={isOpen} onOpenChange={onClose} bgType="whited">
            <SheetContent variant="2xl">
                <SheetHeader className="pb-4">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <div
                                className={`size-16 rounded-xl flex items-center justify-center font-bold text-white text-lg ${getAvatarColor(
                                    fleet.name
                                )}`}
                            >
                                {getAvatarInitials(fleet.name)}
                            </div>
                            <div className="h-16 flex flex-col justify-between gap-1">
                                <h2 className="text-xl font-semibold text-[#0A0A0A]">
                                    {fleet.name} {fleet.id}
                                </h2>
                                <div className="flex items-center gap-2 text-xs text-vaLightGray">
                                    <User size={18} />
                                    <span>{fleet.ownerName}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-vaLightGray">
                                    <Calendar size={18} />
                                    <span>Ajouté le {fleet.created_at}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-3">
                            <div className="flex items-center gap-4">

                                {fleet.suscription_name && <Badge type={fleet.suscription_name} icon={<Crown />} />}
                                <Badge type={fleet.statusDisplay} />
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreVertical className="text-vaTextPrimary" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem
                                            onClick={() => setIsSuspendOpen(true)}
                                            className="cursor-pointer text-xs font-medium hover:bg-vaPrimary/5 text-vaTextPrimary"
                                        >
                                            Suspendre
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => setIsDeleteOpen(true)}
                                            className="cursor-pointer text-xs font-medium hover:bg-vaPrimary/5 text-vaRed"
                                        >
                                            Supprimer
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => {/* mode debug callback (to implement) */ }}
                                            className="cursor-pointer text-xs font-medium hover:bg-vaPrimary/5 text-vaBlue"
                                        >
                                            Mode deboggage
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>
                </SheetHeader>
                <DialogMainBody className="flex-1 max-h-[calc(100dvh-100px)]">
                    <div className="space-y-6 py-4">
                        <FleetKpiGrid kpiItems={KpiItems} isLoading={isLoadingFleetOverview} />
                        <Tabs
                            value={activeTab}
                            onValueChange={setActiveTab}
                            defaultValue="profile"
                        >
                            <TabsList className="rounded-2xl w-full grid grid-cols-4">
                                <TabsTrigger value="profile">Profil</TabsTrigger>
                                <TabsTrigger value="subscription">Abonnement</TabsTrigger>
                                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                                <TabsTrigger value="journal">Journal</TabsTrigger>
                            </TabsList>
                        </Tabs>
                        {activeTab === "profile" && <DetailRowList rows={ProfileItems} isLoading={isLoadingFleetProfile} />}
                        {activeTab === "subscription" && <SubscriptionContent />}
                        {activeTab === "transactions" && <TransactionsContent />}
                        {activeTab === "journal" && (
                            <JournalList items={journals} isLoading={isLoadingFleetJournal} sentinelRef={sentinelRef} isFetching={isFetching} page={page} />
                        )}
                    </div>
                </DialogMainBody>
                <DeleteFleetDialog
                    isOpen={isDeleteOpen}
                    onClose={() => setIsDeleteOpen(false)}
                    fleetId={fleet.id}
                    fleetName={fleet.name}
                    onConfirm={(id) => {
                        onDelete(id);
                    }}
                />
                <SuspendFleetDialog
                    isOpen={isSuspendOpen}
                    onClose={() => setIsSuspendOpen(false)}
                    fleetId={fleet.id}
                    fleetName={fleet.name}
                    onConfirm={(id) => {
                        onEdit(id);
                    }}
                />
            </SheetContent>
        </Sheet>
    );
}