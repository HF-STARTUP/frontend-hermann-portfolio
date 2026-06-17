import { DataTable } from "@/components/display/CustomTableDisplay"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Filter, Layers, RefreshCcw, Search } from "lucide-react"
import { useARCClientsColumns } from "../_utils/at-risk-clients-columns"

export const AtRiskCustomersList = () => {
    const {
        clients, columns, rowActions, selection, exportConfig,
        pagination, isLoadingCustomers, tableRef
    } = useARCClientsColumns();
    return (
        <div className="">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 py-4 pl-1">
                    <Input
                        placeholder="Rechercher dans cette liste…"
                        type="search"
                        className="border bg-white border-muted-foreground/30 text-muted-foreground h-10"
                        leftIcon={
                            <Search
                                size={16}
                                className="text-muted-foreground" />
                        } />
                    <Button variant={"outline"} className="font-semibold text-foreground">
                        <Filter size={16} className="mr-2 shrink-0" />
                        Filtrer
                    </Button>
                    <Select>
                        <SelectTrigger leftIcon={<Layers size={16} className="mr-2 shrink-0" />} className="font-semibold rounded-xl max-w-fit w-fit">
                            <SelectValue placeholder="Grouper" />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl">
                            <SelectItem value={"all"}>
                                Aucun regroupement
                            </SelectItem>
                            <SelectItem value={"risk_level"}>
                                Niveau de risque
                            </SelectItem>
                            <SelectItem value={"risk_cause"}>
                                Cause de risque
                            </SelectItem>
                            <SelectItem value={"client_need"}>
                                Besoin client
                            </SelectItem>
                            <SelectItem value={"account_charged"}>
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
                onRowClick={(client) => { }}
                rowActions={rowActions}
                loadingRowId={null}
                exportConfig={exportConfig}
                groupConfig={{
                    groupKey: "city",
                    groupLabel: (city, items) => `${city} — ${items.length} chauffeur(s)`,
                    defaultExpanded: true,
                }}
                selection={selection}
            />
        </div>
    )
}