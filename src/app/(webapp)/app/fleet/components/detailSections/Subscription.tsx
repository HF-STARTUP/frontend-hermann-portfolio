import { DateRangePicker } from "@/components/ui/custom/date-range-picker";
import { DateRange } from "react-day-picker";
import { useState } from "react";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFleetSubscriptionsHook } from "../../_hook/useFleetSubscriptionsHook";
import { DataTable } from "@/components/display/CustomTableDisplay";
import Badge from "@/components/display/Badge";
import { PackageType } from "../../../subscriptions/_hooks/usePackageList";
import { Crown, Inbox } from "lucide-react";

const ActivePlanSkeleton = () => (
    <div className="p-4 border border-[#E5E7EB] bg-[#F9FAFB] rounded-2xl flex flex-col gap-4 animate-pulse">
        <div className="h-8 w-32 bg-gray-200 rounded-full"></div>
        <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
    </div>
);

export default function SubscriptionContent({ fleetId }: { fleetId?: string }) {
    const {
        tableColumns,
        pagination,
        subscriptions,
        activeSubscription,
        isLoadingActiveSubscription,
        isLoadingFleetSubscriptions,
        dateRange,
        setDateRange
    } = useFleetSubscriptionsHook(fleetId);
    return (
        <div className="space-y-6">
            <div className="current-plan space-y-4">
                <div className="text-xl font-semibold">Plan actuel</div>
                {isLoadingActiveSubscription ? <ActivePlanSkeleton /> : !isLoadingActiveSubscription && activeSubscription?.id ?
                    <div className="">
                        <div className="p-4 border border-[#E5E7EB] bg-[#F9FAFB] rounded-2xl flex flex-col gap-4">
                            <Badge type={activeSubscription?.subscription.name as PackageType} isPackage={true} icon={<Crown />} >
                                { activeSubscription.subscription.name }
                            </Badge>
                            <p className="text-sm text-[#4A5565]">
                                Actif depuis le {activeSubscription?.startDate} et expire le {activeSubscription?.endDate}
                            </p>
                        </div>
                    </div> :
                    <div className="p-4 border-2 border-vaRed/20 bg-vaRed/5 rounded-2xl flex items-center gap-2">
                        <div className="p-3 bg-vaTextPrimary/15 rounded-full text-gray-400">
                            <Inbox size={24} />
                        </div>
                        <div className="flex flex-col gap-2 items-start">
                            <p className="text-sm font-medium text-[#4A5565]">
                                Aucun abonnement actif
                            </p>
                            <p className="text-xs text-gray-400">
                                Cette flotte ne possède aucune souscription en cours de validité.
                            </p>
                        </div>
                    </div>
                }
            </div>
            <div className="current-plan space-y-4">
                <div className="text-xl font-semibold flex items-center justify-between">
                    Historique des abonnements
                    <div className="filters flex items-center gap-2">
                        <DateRangePicker
                            dateRange={dateRange}
                            onDateRangeChange={setDateRange}
                            onApply={() => {
                                setDateRange;
                            }}
                            className="w-fit text-xs rounded-xl"
                        />
                        {/* <Select>
                            <SelectTrigger className="w-fit text-xs rounded-xl py-3 text-vaTextPrimary">
                                <SelectValue placeholder="Statut" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="active">Actif</SelectItem>
                                <SelectItem value="inactive">Inactif</SelectItem>
                                <SelectItem value="suspended">Suspendu</SelectItem>
                                <SelectItem value="deleted">Supprimé</SelectItem>
                            </SelectContent>
                        </Select> */}
                    </div>

                </div>
                <div className="">
                    <DataTable
                        columns={tableColumns}
                        data={subscriptions}
                        pagination={pagination}
                        isLoading={isLoadingFleetSubscriptions}
                    />

                </div>
            </div>
        </div>
    )
}