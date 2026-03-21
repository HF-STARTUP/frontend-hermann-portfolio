"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { LuFilter, LuPlus, LuSearch } from "react-icons/lu"
import KpiGrid from "@/components/display/Kpi"
import { DataTable } from "@/components/display/CustomTableDisplay"
import useFleetHook from "@/app/(webapp)/app/fleet/_hook/useFleetHook"
import { Button } from "@/components/ui/button"
import { AnchorIcon } from "lucide-react"
import { useState } from "react"
import { AdvancedFiltersDialog } from "./components/_dialogs/AdvancedFiltersDialog"
import FleetFromDialog from "./components/_dialogs/FleetFormDialog"
import FleetDetailsSheet from "./components/_dialogs/FleetDetailsSheet"
import { DeleteFleetDialog } from "./components/_dialogs/utils/ConfirmFleetDelete"
import { SuspendFleetDialog } from "./components/_dialogs/utils/SuspendFleetDialog"
import { PageTitle } from "@/components/ui/custom/PageTitle"
import PeriodSelector from "@/components/elements/PeriodSelector"

export const FleetList = () => {
    const [detailsSheet, setDetailsSheet] = useState<{ isOpen: boolean; fleet: any | null }>({ isOpen: false, fleet: null })
    const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; fleetId: string | null; fleetName: string | null }>({
        isOpen: false,
        fleetId: null,
        fleetName: null,
    })
    const [suspendDialog, setSuspendDialog] = useState<{ isOpen: boolean; fleetId: string | null; fleetName: string | null }>({
        isOpen: false,
        fleetId: null,
        fleetName: null,
    })
    const {
        KpiItems,
        fleets,
        isLoading,
        filterState,
        tableColumns,
        rowActions,
        pagination,
        handleSearchChange,
        handleSubscriptionNameFilter,
        handleTypeFilter,
        handleStatusFilter,
        handleSortChange,
        handleRecentFirstChange,
        handleOldestFirstChange,
        handleVehiclesCountMinChange,
        handleVehiclesCountMaxChange,
        handleDriversCountMinChange,
        handleDriversCountMaxChange,
        handleTransactionsAmountMinChange,
        handleTransactionsAmountMaxChange,
        handleFirstActionsChange,
        handleDateRangeChange,
        resetFilters,
        hasActiveFilters,
    } = useFleetHook({
        onViewFleet: (fleet) => setDetailsSheet({ isOpen: true, fleet }),
        onSuspendFleet: (fleet) =>
            setSuspendDialog({ isOpen: true, fleetId: fleet.id, fleetName: fleet.name ?? "" }),
        onDeleteFleet: (fleet) =>
            setDeleteDialog({ isOpen: true, fleetId: fleet.id, fleetName: fleet.name ?? "" }),
    })

    const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false)
    const [isCreateFleetOpen, setIsCreateFleetOpen] = useState(false)
    return (
        <div className="flex flex-col space-y-6">
            <PageTitle
                page_title={"Flottes"}
                end_component={
                    <PeriodSelector
                        onChange={(dateRange) => handleDateRangeChange(dateRange ?? {})}
                        defaultPeriod={'current_month'}
                    />
                }
                withSelect={false}
            />
            <KpiGrid items={KpiItems} />
            <div className="text-[#000000] font-bold text-xl">
                Liste des flottes ({fleets.length})
            </div>

            <div className="flex justify-between items-end flex-wrap gap-4">
                <div className="filters flex items-center gap-4 flex-wrap w-full">
                    <div className="search">
                        <div className="search-input relative flex items-center bg-white p-2 rounded-xl">
                            <Input
                                placeholder="Recherche par nom ou proprietaire..."
                                value={filterState.searchTerm}
                                onChange={(e) => handleSearchChange(e.target.value)}
                                type="search"
                                className="pl-9 h-10 w-80 bg-[#F4F7FE] border-none text-sm"
                                leftIcon={<LuSearch className="text-vaTextPrimary" />}
                            />
                        </div>
                    </div>
                    <Select value={filterState.type} onValueChange={(value) => handleTypeFilter(value)}>
                        <SelectTrigger className="w-44 min-w-fit h-12 border-[#E9EAEC] text-[#A3AED0] border bg-white text-sm rounded-xl">
                            <SelectValue placeholder="Selectionner le type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="particulier">Entrepreneur</SelectItem>
                            <SelectItem value="professionnel">Professionnel</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select
                        value={filterState.subscriptionName}
                        onValueChange={(value) => handleSubscriptionNameFilter(value)}
                    >
                        <SelectTrigger className="w-44 min-w-fit h-12 border-[#E9EAEC] text-[#A3AED0] border bg-white text-sm rounded-xl">
                            <SelectValue placeholder="Selectionner le plan" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="none">Tous les plans</SelectItem>
                            <SelectItem value="essentiel_entrepreneur">Essentiel Entrepreneur</SelectItem>
                            <SelectItem value="starter_entrepreneur">Starter Entrepreneur</SelectItem>
                            <SelectItem value="premium_entrepreneur">Premium Entrepreneur</SelectItem>
                            <SelectItem value="essentiel_entreprise">Essentiel Entreprise</SelectItem>
                            <SelectItem value="premium_entreprise">Premium Entreprise</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={filterState.status} onValueChange={(value) => handleStatusFilter(value)}>
                        <SelectTrigger className="w-44 min-w-fit h-12 border-[#E9EAEC] text-[#A3AED0] border bg-white text-sm rounded-xl">
                            <SelectValue placeholder="Selectionner le statut" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="active">Actif</SelectItem>
                            <SelectItem value="new">Nouveau</SelectItem>
                            <SelectItem value="inactive">Inactif</SelectItem>
                            <SelectItem value="locked">Verrouillé</SelectItem>
                            <SelectItem value="deactivated">Désactivé</SelectItem>
                            <SelectItem value="gps_configuration_pending">Configuration GPS en attente</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={filterState.sort} onValueChange={(value) => handleSortChange(value as "recent" | "oldest")}>
                        <SelectTrigger className="w-44 min-w-fit h-12 border-[#E9EAEC] text-[#A3AED0] border bg-white text-sm rounded-xl">
                            <SelectValue placeholder="Trier par" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="recent">Plus récent d'abord</SelectItem>
                            <SelectItem value="oldest">Plus ancien d'abord</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex justify-end items-center gap-4 flex-wrap ml-auto">
                    <Button size="xl" variant="mainBlue" className="rounded-2xl" onClick={() => setIsCreateFleetOpen(true)}>
                        <LuPlus className="w-4 h-4 mr-2" />
                        Ajouter une flotte
                    </Button>
                    <Button size="xl" variant="mainBlue" className="rounded-2xl" onClick={() => setIsAdvancedFiltersOpen(true)}>
                        <LuFilter className="w-4 h-4 mr-2" />
                        Filtre avancé
                    </Button>
                    {hasActiveFilters && (
                        <Button size="xl" variant="outline" className="rounded-2xl" onClick={resetFilters}>
                            Réinitialiser les filtres
                        </Button>
                    )}
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

            <div className="custom-scrollbar rounded-lg overflow-x-scroll">
                <DataTable
                    columns={tableColumns}
                    data={fleets}
                    pagination={pagination}
                    isLoading={isLoading}
                    rowActions={rowActions}
                    onRowClick={(fleet) => setDetailsSheet({ isOpen: true, fleet })}
                />
            </div>
            <AdvancedFiltersDialog
                isOpen={isAdvancedFiltersOpen}
                onClose={() => setIsAdvancedFiltersOpen(false)}
                filterState={filterState}
                onRecentFirstChange={handleRecentFirstChange}
                onOldestFirstChange={handleOldestFirstChange}
                onVehiclesCountMinChange={handleVehiclesCountMinChange}
                onVehiclesCountMaxChange={handleVehiclesCountMaxChange}
                onDriversCountMinChange={handleDriversCountMinChange}
                onDriversCountMaxChange={handleDriversCountMaxChange}
                onTransactionsAmountMinChange={handleTransactionsAmountMinChange}
                onTransactionsAmountMaxChange={handleTransactionsAmountMaxChange}
                onFirstActionsChange={handleFirstActionsChange}
                onResetFilters={resetFilters}
            />
            <FleetFromDialog isOpen={isCreateFleetOpen} onClose={() => setIsCreateFleetOpen(false)} action="create" />
            <FleetDetailsSheet
                isOpen={detailsSheet.isOpen}
                onClose={() => setDetailsSheet({ isOpen: false, fleet: null })}
                fleet={detailsSheet.fleet}
                onEdit={() => { }}
                onDelete={() => { }}
            />
            <DeleteFleetDialog
                isOpen={deleteDialog.isOpen}
                onClose={() =>
                    setDeleteDialog({ isOpen: false, fleetId: null, fleetName: null })
                }
                fleetId={deleteDialog.fleetId ?? ""}
                fleetName={deleteDialog.fleetName ?? ""}
                onConfirm={(id) => {
                    // TODO: call delete API with id then refresh list
                }}
            />
            <SuspendFleetDialog
                isOpen={suspendDialog.isOpen}
                onClose={() =>
                    setSuspendDialog({ isOpen: false, fleetId: null, fleetName: null })
                }
                fleetId={suspendDialog.fleetId ?? ""}
                fleetName={suspendDialog.fleetName ?? ""}
                onConfirm={(id) => {
                    // TODO: call suspend API with id then refresh list
                }}
            />
        </div>
    )
}
