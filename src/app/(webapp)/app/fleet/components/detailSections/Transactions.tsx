import { DateRangePicker } from "@/components/ui/custom/date-range-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AnchorIcon } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { useFleetTransactions } from "../../_hook/useFleetTransactions";
import FleetKpiGrid from "../_sub_components/fleetDetailKpi";
import { DataTable } from "@/components/display/CustomTableDisplay";

export default function TransactionsContent() {
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

    const { pagination, transactionKpi, tableColumns, transactions } = useFleetTransactions()

    return (
        <div className="space-y-6">
            <div className="text-xl font-semibold flex items-center justify-between">
                Historique des transactions
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
                        <SelectTrigger variant="mainBlueOutline" leftIcon={<AnchorIcon className="size-4 mr-2" />}>
                            <SelectValue placeholder="Exporter" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="csv">CSV</SelectItem>
                            <SelectItem value="excel">Excel</SelectItem>
                            <SelectItem value="pdf">PDF</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <FleetKpiGrid className="!grid-cols-4" kpiItems={transactionKpi} />
            <DataTable 
                columns={tableColumns}
                data={transactions}
                pagination={pagination}
            />
        </div>
    )
}