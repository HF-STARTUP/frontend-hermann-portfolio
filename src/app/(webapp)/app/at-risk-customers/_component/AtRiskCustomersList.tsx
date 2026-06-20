import { DataTable } from "@/components/display/CustomTableDisplay"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Filter, Layers, RefreshCcw, Search } from "lucide-react"
import { useARCClientsColumns } from "../_utils/at-risk-clients-columns"
import { ARCGroupBy } from "@/types/at-risk-customers.type"
import { useRouter } from "next/navigation"

export const AtRiskCustomersList = () => {
    const {
        clients, columns, rowActions, selection, exportConfig,
        pagination, isLoadingCustomers, tableRef, params, setParams, groupConfig
    } = useARCClientsColumns();
    const $router = useRouter()
    return (
        <div className="">
            <div className="flex items-end xl:items-center justify-between gap-4 max-h-fit pb-6">
                <div className="flex items-end xl:items-center gap-4 flex-wrap ">
                    <div className="max-w-96 w-fit">
                        <Input
                            onChange={(e) => setParams({ ...params, search: e.target.value })}
                            placeholder="Rechercher dans cette liste…"
                            type="search"
                            className="border bg-white border-muted-foreground/30 text-muted-foreground h-10 w-full"
                            leftIcon={
                                <Search
                                    size={16}
                                    className="text-muted-foreground" />
                            } />
                    </div>

                    <Button variant={"outline"} className="font-semibold text-foreground">
                        <Filter size={16} className="mr-2 shrink-0" />
                        Filtrer
                    </Button>
                    <Select value={params.group_by} onValueChange={(v) => setParams({ ...params, group_by: v as ARCGroupBy })}>
                        <SelectTrigger leftIcon={<Layers size={16} className="mr-2 shrink-0" />} className="font-semibold rounded-xl max-w-96 w-fit">
                            <SelectValue placeholder="Grouper" />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl">
                            <SelectItem value={ARCGroupBy.NONE}>
                                Aucun regroupement
                            </SelectItem>
                            <SelectItem value={ARCGroupBy.RISK_LEVEL}>
                                Niveau de risque
                            </SelectItem>
                            <SelectItem value={ARCGroupBy.RISK_CAUSE}>
                                Cause de risque
                            </SelectItem>
                            <SelectItem value={ARCGroupBy.CLIENT_NEED}>
                                Besoin client
                            </SelectItem>
                            <SelectItem value={ARCGroupBy.ACCOUNT_MANAGER}>
                                Chargé de compte
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                        {pagination.totalEntries} client(s)
                    </span>
                    <Button
                        variant={"outline"}
                        size={"icon"}
                        onClick={() => tableRef.current?.triggerExport("excel")}
                    >
                        <Download size={16} />
                    </Button>
                    <Button
                        variant={"outline"}
                        size={"icon"}
                    >
                        <RefreshCcw size={16} />
                    </Button>
                </div>
            </div>
            <DataTable
                ref={tableRef}
                columns={columns}
                data={clients ?? []}
                pagination={pagination}
                emptyContent={"Aucun client pour le moment"}
                emptyMessage="Vous n'avez pas encore de client"
                getRowId={(client) => client.parkId}
                isLoading={isLoadingCustomers}
                onRowClick={(client) => $router.push(`/app/at-risk-customers/${client.parkId}/details`)}
                rowActions={rowActions}
                loadingRowId={null}
                exportConfig={exportConfig}
                groupConfig={groupConfig}
                selection={selection}
            />
        </div>
    )
}