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
import { FleetType, FleetStatus, SubscriptionName, SortOrder } from "@/types/admin/fleet.type"
import { toIsoDate } from "@/services/Service"
import { PiFunnelX } from "react-icons/pi"
import { FleetStatusMap, FleetTypeMap, SortOrderMap, SubscriptionNameMap, SubscriptionStatusMap } from "./utils"

export const FleetList = () => {
    const {
        KpiItems,
        isLoadingKpi,
        fleets,
        isLoading,
        isFetching,

        fleetFilters,
        resetFilters,
        setFleetFilters,
        updateFilter,

        tableColumns,
        rowActions,
        pagination,
        hasActiveFilters,

        handleAdd,
        handleEdit,
        handleDebudMode,
        handleDelete,
        handleSuspend,
        handleView,

        isSuspendVisible,
        isDebugVisible,
        isDeleteVisible,
        isFormVisible,
        isDetailsVisible,
        selectedFleet,
        formAction,

        setIsSuspendVisible,
        setIsDebugVisible,
        setIsDeleteVisible,
        setIsFormVisible,
        setSelectedFleet,
        setFormAction,
        setIsDetailsVisible,
    } = useFleetHook()

    const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false)
    const [isCreateFleetOpen, setIsCreateFleetOpen] = useState(false)

    const handleSortChange = (value: SortOrder) => {
        updateFilter("sort", value)
    }

    return (
        <div className="flex flex-col space-y-6">
            <PageTitle
                page_title={"Flottes"}
                end_component={
                    <PeriodSelector
                        onChange={(dateRange) => { updateFilter("created_from", toIsoDate(dateRange?.from)); updateFilter("created_to", toIsoDate(dateRange?.to)) }}
                        defaultPeriod={'current_month'}
                    />
                }
                withSelect={false}
            />
            <KpiGrid items={KpiItems} isLoading={isLoadingKpi} />
            <div className="text-[#000000] font-bold text-xl">
                Liste des flottes ({pagination.totalEntries})
            </div>

            <div className="flex justify-between items-end flex-wrap gap-4">
                <div className="filters flex items-center gap-4 flex-wrap w-full">
                    <div className="search">
                        <div className="search-input relative flex items-center bg-white p-2 rounded-xl">
                            <Input
                                placeholder="Recherche par nom ou proprietaire..."
                                value={fleetFilters.name || ""}
                                onChange={(e) => updateFilter("name", e.target.value)}
                                type="search"
                                className="pl-9 h-10 w-80 bg-[#F4F7FE] border-none text-sm"
                                leftIcon={<LuSearch className="text-vaTextPrimary" />}
                            />
                        </div>
                    </div>
                    <Select
                        value={fleetFilters.type}
                        onValueChange={(value) => updateFilter("type", value as FleetType)}
                        defaultValue="all"
                    >
                        <SelectTrigger className="w-44 min-w-fit h-12 border-[#E9EAEC] text-[#A3AED0] border bg-white text-sm rounded-xl">
                            <SelectValue placeholder="Selectionner le type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tous les types</SelectItem>
                            {Object.entries(FleetTypeMap).map(([value, label]) => (
                                <SelectItem key={value} value={value}>
                                    {label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select
                        value={fleetFilters.subscription_name}
                        onValueChange={(value) => updateFilter("subscription_name", value as SubscriptionName)}
                        defaultValue="all"
                    >
                        <SelectTrigger className="w-44 min-w-fit h-12 border-[#E9EAEC] text-[#A3AED0] border bg-white text-sm rounded-xl">
                            <SelectValue placeholder="Selectionner le plan" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tous les plans</SelectItem>
                            {Object.entries(SubscriptionNameMap).map(([value, label]) => (
                                <SelectItem key={value} value={value}>
                                    {label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select
                        value={fleetFilters.status}
                        onValueChange={(value) => updateFilter("status", value as FleetStatus)}
                        defaultValue="all"
                    >
                        <SelectTrigger className="w-44 min-w-fit h-12 border-[#E9EAEC] text-[#A3AED0] border bg-white text-sm rounded-xl">
                            <SelectValue placeholder="Selectionner le statut" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="all">Tous les statuts</SelectItem>
                            {Object.entries(FleetStatusMap).map(([value, label]) => (
                                <SelectItem key={value} value={value}>
                                    {label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select
                        value={fleetFilters.sort}
                        onValueChange={(value) => handleSortChange(value as SortOrder)}
                        defaultValue="recent"
                    >
                        <SelectTrigger className="w-44 min-w-fit h-12 border-[#E9EAEC] text-[#A3AED0] border bg-white text-sm rounded-xl">
                            <SelectValue placeholder="Trier par" />
                        </SelectTrigger>
                        <SelectContent>
                        {Object.entries(SortOrderMap).map(([value, label]) => (
                                <SelectItem key={value} value={value}>
                                    {label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button size="icon" variant="ghost" className="text-vaTextPrimary" title="Filtres avances" onClick={() => setIsAdvancedFiltersOpen(true)}>
                        <LuFilter size={32} />
                    </Button>
                    {hasActiveFilters && (
                        <Button size="icon" variant="ghost" onClick={resetFilters}>
                            <PiFunnelX size={32} className="text-vaRed" />
                        </Button>
                    )}
                </div>
                <div className="flex justify-end items-center gap-4 flex-wrap ml-auto">
                    <Button size="xl" variant="mainBlue" className="rounded-2xl" onClick={() => setIsCreateFleetOpen(true)}>
                        <LuPlus className="w-4 h-4 mr-2" />
                        Ajouter une flotte
                    </Button>
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
                    onRowClick={(fleet) => handleView(fleet)}
                />
            </div>
            <AdvancedFiltersDialog
                isOpen={isAdvancedFiltersOpen}
                onClose={() => setIsAdvancedFiltersOpen(false)}
                filterState={fleetFilters}
                updateFilter={updateFilter}
                resetFilters={resetFilters}
            />
            <FleetFromDialog isOpen={isCreateFleetOpen} onClose={() => setIsCreateFleetOpen(false)} action="create" />
            <FleetDetailsSheet
                isOpen={isDetailsVisible}
                onClose={() => { setIsDetailsVisible(false); setSelectedFleet(undefined) }}
                fleet={selectedFleet ?? null}
                onEdit={(fleet) => handleEdit(fleet)}
                onDelete={(fleet) => handleDelete(fleet)}
            />
            <DeleteFleetDialog
                isOpen={isDeleteVisible}
                onClose={() => { setIsDeleteVisible(false); setSelectedFleet(undefined) }}
                fleetId={selectedFleet?.id}
                fleetName={selectedFleet?.name}
            />
            <SuspendFleetDialog
                isOpen={isSuspendVisible}
                onClose={() => { setIsSuspendVisible(false), setSelectedFleet(undefined) }}
                fleetId={selectedFleet?.id}
                fleetName={selectedFleet?.name}
            />
        </div>
    )
}