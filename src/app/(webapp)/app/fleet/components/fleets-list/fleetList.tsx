"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { LuChevronDown, LuFilter, LuPlus, LuSearch } from "react-icons/lu"
import KpiGrid from "@/components/display/Kpi"
import { DataTable } from "@/components/display/CustomTableDisplay"
import useFleetHook from "@/app/(webapp)/app/fleet/_hook/useFleetHook"
import { Button } from "@/components/ui/button"
import { AnchorIcon } from "lucide-react"
import { AdvancedFiltersDialog } from "../_dialogs/AdvancedFiltersDialog"
import { useState } from "react"

export const FleetList = () => {
    const {
        KpiItems,
        fleets,
        isLoading,
        filterState,
        tableColumns,
        rowActions,
        pagination,
        handleSearchChange,
        handleAbonTypeFilter,
    } = useFleetHook()

    const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false)

    return (
        <div className="flex flex-col space-y-6">
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
                    <Select>
                        <SelectTrigger className="w-44 min-w-fit h-12 border-[#E9EAEC] text-[#A3AED0] border bg-white text-sm rounded-xl">
                            <SelectValue placeholder="Selectionner le type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tous les types</SelectItem>
                            <SelectItem value="professionnel">Professionnel</SelectItem>
                            <SelectItem value="entrepreneur">Entrepreneur</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select
                        value={filterState.abonType}
                        onValueChange={(value) => handleAbonTypeFilter(value)}
                    >
                        <SelectTrigger className="w-44 min-w-fit h-12 border-[#E9EAEC] text-[#A3AED0] border bg-white text-sm rounded-xl">
                            <SelectValue placeholder="Selectionner le plan" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tous les plans</SelectItem>
                            <SelectItem value="essentiel">Essentiel</SelectItem>
                            <SelectItem value="performance">Performance</SelectItem>
                            <SelectItem value="croissance">Croissance</SelectItem>
                            <SelectItem value="elite">Elite</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select>
                        <SelectTrigger className="w-44 min-w-fit h-12 border-[#E9EAEC] text-[#A3AED0] border bg-white text-sm rounded-xl">
                            <SelectValue placeholder="Selectionner le statut" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tous les statuts</SelectItem>
                            <SelectItem value="active">Actif</SelectItem>
                            <SelectItem value="inactive">Inactif</SelectItem>
                            <SelectItem value="suspended">Suspendu</SelectItem>
                            <SelectItem value="deleted">Supprimé</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select>
                        <SelectTrigger className="w-44 min-w-fit h-12 border-[#E9EAEC] text-[#A3AED0] border bg-white text-sm rounded-xl">
                            <SelectValue placeholder="Trier par" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tous les champs</SelectItem>
                            <SelectItem value="name">Nom</SelectItem>
                            <SelectItem value="owner">Propriétaire</SelectItem>
                            <SelectItem value="subscription">Plan</SelectItem>
                            <SelectItem value="status">Statut</SelectItem>
                            <SelectItem value="created_at">Date de création</SelectItem>
                            <SelectItem value="updated_at">Date de mise à jour</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex justify-end items-center gap-4 flex-wrap ml-auto">
                    <Button size="xl" variant="mainBlue" className="rounded-2xl">
                        <LuPlus className="w-4 h-4 mr-2" />
                        Ajouter une flotte
                    </Button>
                    <Button size="xl" variant="mainBlue" className="rounded-2xl" onClick={() => setIsAdvancedFiltersOpen(true)}>
                        <LuFilter className="w-4 h-4 mr-2" />
                        Filtre avancé
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
                />
            </div>
            <AdvancedFiltersDialog isOpen={isAdvancedFiltersOpen} onClose={() => setIsAdvancedFiltersOpen(false)} />
        </div>
    )
}
