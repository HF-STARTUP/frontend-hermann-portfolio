import { PageTitle } from "@/components/ui/custom/PageTitle"
import { AnchorIcon, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { useTransactionsHook } from "../_hook/useTransactionsHook"
import KpiGrid from "@/components/display/Kpi"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LuSearch } from "react-icons/lu"
import { Input } from "@/components/ui/input"
import { DataTable } from "@/components/display/CustomTableDisplay"
import { useIncomingHook } from "./_hook/useIncomingHook"
import PeriodSelector from "@/components/elements/PeriodSelector"
import { toIsoDate } from "@/services/Service"
import { FleetType } from "@/types/admin/fleet.type"

const IncomingBody = () => {
    const {
        incomingKpi,
        isLoadingKpi,
        transacFilters,
        setTransacFilters
    } = useTransactionsHook()
    const { pagination, tableColumns, incomingTransactions, isLoadingTransactions } = useIncomingHook(transacFilters)
    return (
        <div className="space-y-6">
            <div className="flex items-center ">
                <Link href={"/app/transactions/"}>
                    <ChevronLeft className="size-10 text-vaTextPrimary" />
                </Link>
                <PageTitle page_title="Transactions Entrantes" withSelect={false} end_component={
                    <PeriodSelector defaultPeriod={"current_month"} onChange={(range) => setTransacFilters(prev => ({
                        ...prev,
                        start_date: toIsoDate(range?.from),
                        end_date: toIsoDate(range?.to)
                    }))} />
                } />
            </div>
            {/* Kpi grid */}
            <KpiGrid items={incomingKpi} isLoading={isLoadingKpi} />

            {/* Filters */}
            <div className="filters flex items-center gap-4 flex-wrap w-full justify-between">
                <div className="search flex items-center gap-4">
                    <div className="search-input relative flex items-center bg-white p-2 rounded-xl">
                        <Input
                            placeholder="Recherche par nom ou proprietaire..."
                            value={transacFilters.search}
                            onChange={(e) => setTransacFilters(prev => ({
                                ...prev,
                                search: e.target.value
                            }))}
                            type="search"
                            className="pl-9 h-10 w-80 bg-[#F4F7FE] border-none text-sm"
                            leftIcon={<LuSearch className="text-vaTextPrimary" />}
                        />
                    </div>
                    <Select defaultValue="all" onValueChange={
                        (value) => setTransacFilters(prev => ({
                            ...prev,
                            account_type: value as FleetType
                        }))
                    }>
                        <SelectTrigger className="w-44 min-w-fit h-12 border-[#E9EAEC] text-[#A3AED0] border bg-white text-sm rounded-xl">
                            <SelectValue placeholder="Selectionner le type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tous les types</SelectItem>
                            <SelectItem value="professionnel">Professionnel</SelectItem>
                            <SelectItem value="particulier">Entrepreneur</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
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

            {/* Table */}

            <DataTable columns={tableColumns} data={incomingTransactions??[]} pagination={pagination} isLoading={isLoadingTransactions} emptyMessage="Aucune transaction entrante trouvee !" />
        </div>
    )
}

export default IncomingBody