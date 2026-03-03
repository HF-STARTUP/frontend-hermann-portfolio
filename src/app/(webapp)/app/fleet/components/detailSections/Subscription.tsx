import { DateRangePicker } from "@/components/ui/custom/date-range-picker";
import { SubscriptionBadge } from "../_sub_components/columnHelperComponents";
import { DateRange } from "react-day-picker";
import { useState } from "react";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFleetSubscriptionsHook } from "../../_hook/useFleetSubscriptionsHook";
import { DataTable } from "@/components/display/CustomTableDisplay";

export default function SubscriptionContent() {
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
    const { tableColumns, pagination, subscriptions } = useFleetSubscriptionsHook();
    return (
        <div className="space-y-6">
            <div className="current-plan space-y-4">
                <div className="text-xl font-semibold">Plan actuel</div>
                <div className="">
                    <div className="p-4 border border-[#E5E7EB] bg-[#F9FAFB] rounded-2xl flex flex-col gap-4">
                        <SubscriptionBadge name="ESSENTIEL" />
                        <p className="text-sm text-[#4A5565]">
                            Actif depuis le 15/01/2026 expire le 15/03/2026
                        </p>
                    </div>
                </div>
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
                        <Select>
                            <SelectTrigger className="w-fit text-xs rounded-xl py-3 text-vaTextPrimary">
                                <SelectValue placeholder="Statut" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="active">Actif</SelectItem>
                                <SelectItem value="inactive">Inactif</SelectItem>
                                <SelectItem value="suspended">Suspendu</SelectItem>
                                <SelectItem value="deleted">Supprimé</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                </div>
                <div className="">
                    <DataTable 
                    columns={tableColumns}
                    data={subscriptions}
                    pagination={pagination}
                    />

                </div>
            </div>
        </div>
    )
}