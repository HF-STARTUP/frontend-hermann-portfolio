"use client"

import FleetListReactTable from "@/app/(webapp)/app/fleet/sections/fleets-list/fleetListWithReactTable";
import {useGetFleetsList} from "@/hooks/admin/useFleetHook";
import Loading from "@/components/ui/Loader";
import {EmptyData} from "@/components/box/PageNetworkState";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import React, { useMemo } from "react";
import {Calendar} from "@/components/ui/calendar";
import {Input} from "@/components/ui/input";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {FleetModel} from "@/model/ADMIN/fleet";
import {format} from "date-fns";
import {IoMdClose} from "react-icons/io";
import {CalendarMinus, Users} from "lucide-react";
import {ABlockTitle} from "@/app/(webapp)/app/dashboard/_components/abonEvolution/abonnEvolution";
import {LuListFilter} from "react-icons/lu";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {CgPlayListSearch} from "react-icons/cg";
import { Card, CardContent } from "@/components/ui/card";
import KpiGrid, { KpiCard, KpiShimmerGrid } from "@/components/display/Kpi";
import useFleetHook from "../../_hook/useFleetHook";

enum FleetAbonType {
    premium_entreprise = "premium_entreprise",
    essentiel_entrepreneur = "essentiel_entrepreneur",
    premium_entrepreneur = "premium_entrepreneur",
    starter_entrepreneur = "starter_entrepreneur",
    essentiel_entreprise = "essentiel_entreprise",
    None = "None",
}

interface FilterState {
    searchTerm: string;
    abonType: string;
    dateRange: Date[] | undefined;
    // Filtres de dates de création
    createdFrom?: Date;
    createdTo?: Date;
    // Filtres de dates de début/fin
    startDate?: Date;
    endDate?: Date;
    // Filtres de compteurs
    vehiclesCountMin?: number;
    vehiclesCountMax?: number;
    driversCountMin?: number;
    driversCountMax?: number;
}

export const FleetList = () => {
    const [page, setPage] = React.useState(1)
    const [itemPerPage, setItemPerPage] = React.useState(5)
   
    const [filterState, setFilterState] = React.useState<FilterState>({
        searchTerm: "",
        abonType: "all",
        dateRange: undefined,
        createdFrom: undefined,
        createdTo: undefined,
        startDate: undefined,
        endDate: undefined,
        vehiclesCountMin: undefined,
        vehiclesCountMax: undefined,
        driversCountMin: undefined,
        driversCountMax: undefined,
    })

    // Construire les paramètres de requête API avec les filtres
    const apiParams = useMemo(() => {
        const params: any = {
            page,
            itemPerPage,
        }

        // Ajouter les filtres actifs
        if (filterState.searchTerm.trim()) {
            params.name = filterState.searchTerm.trim()
        }
        if (filterState.abonType !== "all") {
            params.subscription_name = filterState.abonType
        }
        if (filterState.createdFrom) {
            params.created_from = filterState.createdFrom.toISOString()
        }
        if (filterState.createdTo) {
            params.created_to = filterState.createdTo.toISOString()
        }
        if (filterState.startDate) {
            params.start_date = filterState.startDate.toISOString()
        }
        if (filterState.endDate) {
            params.end_date = filterState.endDate.toISOString()
        }
        if (filterState.vehiclesCountMin !== undefined && filterState.vehiclesCountMin !== null) {
            params.vehicles_count_min = filterState.vehiclesCountMin
        }
        if (filterState.vehiclesCountMax !== undefined && filterState.vehiclesCountMax !== null) {
            params.vehicles_count_max = filterState.vehiclesCountMax
        }
        if (filterState.driversCountMin !== undefined && filterState.driversCountMin !== null) {
            params.drivers_count_min = filterState.driversCountMin
        }
        if (filterState.driversCountMax !== undefined && filterState.driversCountMax !== null) {
            params.drivers_count_max = filterState.driversCountMax
        }

        return params
    }, [page, itemPerPage, filterState])
   
    const {data: data, isLoading, isFetching} = useGetFleetsList(apiParams)

    const fleets = useMemo(() => {
        return data?.fleets || []
    }, [data])

    // Métadonnées de pagination provenant de l'API
    const paginationMeta = useMemo(() => ({
        totalRecords: data?.totalRecords || 0,
        totalPages: data?.totalPages || 0,
        currentPage: data?.currentPage || page,
        itemPerPage: data?.itemPerPage || itemPerPage,
    }), [data, page, itemPerPage])

    const [calendarIsOpen, setCalendarIsOpen] = React.useState(false)
    const [createdFromOpen, setCreatedFromOpen] = React.useState(false)
    const [createdToOpen, setCreatedToOpen] = React.useState(false)
    const [startDateOpen, setStartDateOpen] = React.useState(false)
    const [endDateOpen, setEndDateOpen] = React.useState(false)
    const [filterIsActive, setFilterIsActive] = React.useState(false)

    // Gestionnaire pour la recherche
    const handleSearchChange = (searchTerm: string) => {
        setFilterState(prev => ({ ...prev, searchTerm }))
        setPage(1) // Réinitialiser à la première page lors d'un nouveau filtre
    }

    // Gestionnaire pour le filtre d'abonnement
    const handleAbonTypeFilter = (abonType: string) => {
        setFilterState(prev => ({ ...prev, abonType }))
        setPage(1)
    }

    // Gestionnaires pour les dates
    const handleDateRangeChange = (dateRange: Date[] | undefined) => {
        setFilterState(prev => ({ ...prev, dateRange }))
        setPage(1)
    }

    const handleCreatedFromChange = (date: Date | undefined) => {
        setFilterState(prev => ({ ...prev, createdFrom: date }))
        setPage(1)
    }

    const handleCreatedToChange = (date: Date | undefined) => {
        setFilterState(prev => ({ ...prev, createdTo: date }))
        setPage(1)
    }

    const handleStartDateChange = (date: Date | undefined) => {
        setFilterState(prev => ({ ...prev, startDate: date }))
        setPage(1)
    }

    const handleEndDateChange = (date: Date | undefined) => {
        setFilterState(prev => ({ ...prev, endDate: date }))
        setPage(1)
    }

    // Gestionnaires pour les compteurs
    const handleVehiclesCountMinChange = (value: string) => {
        const num = value === "" ? undefined : parseInt(value)
        setFilterState(prev => ({ ...prev, vehiclesCountMin: num }))
        setPage(1)
    }

    const handleVehiclesCountMaxChange = (value: string) => {
        const num = value === "" ? undefined : parseInt(value)
        setFilterState(prev => ({ ...prev, vehiclesCountMax: num }))
        setPage(1)
    }

    const handleDriversCountMinChange = (value: string) => {
        const num = value === "" ? undefined : parseInt(value)
        setFilterState(prev => ({ ...prev, driversCountMin: num }))
        setPage(1)
    }

    const handleDriversCountMaxChange = (value: string) => {
        const num = value === "" ? undefined : parseInt(value)
        setFilterState(prev => ({ ...prev, driversCountMax: num }))
        setPage(1)
    }

    // Vérifier si des filtres sont actifs
    const hasActiveFilters = useMemo(() => {
        return (
            filterState.searchTerm ||
            filterState.abonType !== "all" ||
            filterState.dateRange ||
            filterState.createdFrom ||
            filterState.createdTo ||
            filterState.startDate ||
            filterState.endDate ||
            filterState.vehiclesCountMin !== undefined ||
            filterState.vehiclesCountMax !== undefined ||
            filterState.driversCountMin !== undefined ||
            filterState.driversCountMax !== undefined
        )
    }, [filterState])

    // Réinitialiser tous les filtres
    const resetFilters = () => {
        setFilterState({
            searchTerm: "",
            abonType: "all",
            dateRange: undefined,
            createdFrom: undefined,
            createdTo: undefined,
            startDate: undefined,
            endDate: undefined,
            vehiclesCountMin: undefined,
            vehiclesCountMax: undefined,
            driversCountMin: undefined,
            driversCountMax: undefined,
        })
        setPage(1)
    }
 
    const {KpiItems} = useFleetHook()
        return (
            <div>
                <KpiGrid items={KpiItems} />
                <div className={"flex justify-between items-center"}>
                    <div className={"lg:mt-[24px] flex items-center justify-between gap-[26px] w-full"}>
                        <ABlockTitle>Sélectionnez une flotte</ABlockTitle>
                        <div className="flex items-center gap-2">
                            {hasActiveFilters && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={resetFilters}
                                    className="text-xs"
                                >
                                    Réinitialiser tous les filtres
                                </Button>
                            )}
                        <Button
                            className={cn(
                                "flex items-center hover:text-white gap-1 bg-white text-vaTextPrimary border",
                                filterIsActive && "bg-vaPrimary text-white"
                            )}
                            onClick={() => setFilterIsActive(!filterIsActive)}
                        >
                            <div>Filtre</div>
                            <LuListFilter/>
                        </Button>
                    </div>
                    </div>
                </div>
                
                <div className={"mb-[20px] mt-[10px] lg:mt-[22px]"}>
                    {filterIsActive && (
                        <Card className="p-6">
                            <CardContent className="space-y-6 p-0">
                                {/* Barre de recherche - En premier pour plus de visibilité */}
                                <div className="w-full">
                                    <label className="font-semibold text-sm text-vaTextPrimary mb-2 block">
                                        Rechercher par nom
                                    </label>
                                    <Input
                                        placeholder={"Rechercher une flotte..."}
                                        rightIcon={<CgPlayListSearch className={"text-vaTextPrimary text-[20px]"}/>}
                                        value={filterState.searchTerm}
                                        onChange={(e) => handleSearchChange(e.target.value)}
                                        className="w-full"
                                    />
                                </div>

                                {/* Filtre par type d'abonnement */}
                                <div>
                                    <label className="font-semibold text-sm text-vaTextPrimary mb-2 block">
                                        Type d'abonnement
                                    </label>
                                    <Select 
                                        value={filterState.abonType} 
                                        onValueChange={handleAbonTypeFilter}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Sélectionner un type"/>
                                </SelectTrigger>
                                <SelectContent>
                                            <SelectItem value="all">Tous les types</SelectItem>
                                            {Object.entries(FleetAbonType).map(([key, value]) => (
                                                <SelectItem key={value} value={value}>
                                                    {value === "None" ? "Aucun abonnement" : value.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                                </SelectItem>
                                            ))}
                                </SelectContent>
                            </Select>
                                </div>

                                {/* Filtres de dates - Grid 2 colonnes */}
                                <div>
                                    <h3 className="font-bold text-base text-vaTextPrimary mb-3">Filtres par dates</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Date de création - De */}
                                        <div className="space-y-2">
                                            <label className="font-semibold text-sm text-vaTextPrimary">
                                                Créé depuis le
                                            </label>
                                            <div className="flex items-center gap-2">
                                                <Popover open={createdFromOpen} onOpenChange={setCreatedFromOpen}>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            className={cn(
                                                                "w-full justify-start text-left font-normal",
                                                                !filterState.createdFrom && "text-muted-foreground"
                                                            )}
                                                        >
                                                            <CalendarMinus className="mr-2 h-4 w-4" />
                                                            {filterState.createdFrom ? format(filterState.createdFrom, "dd/MM/yyyy") : "Sélectionner"}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={filterState.createdFrom}
                                                            onSelect={(date) => {
                                                                handleCreatedFromChange(date)
                                                                setCreatedFromOpen(false)
                                                            }}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                {filterState.createdFrom && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleCreatedFromChange(undefined)}
                                                        className="p-1 h-9 w-9"
                                                    >
                                                        <IoMdClose className="h-4 w-4"/>
                                                    </Button>
                                                )}
                                            </div>
                        </div>

                                        {/* Date de création - Jusqu'à */}
                                        <div className="space-y-2">
                                            <label className="font-semibold text-sm text-vaTextPrimary">
                                                 jusqu'au
                                            </label>
                                            <div className="flex items-center gap-2">
                                                <Popover open={createdToOpen} onOpenChange={setCreatedToOpen}>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            className={cn(
                                                                "w-full justify-start text-left font-normal",
                                                                !filterState.createdTo && "text-muted-foreground"
                                                            )}
                                                        >
                                                            <CalendarMinus className="mr-2 h-4 w-4" />
                                                            {filterState.createdTo ? format(filterState.createdTo, "dd/MM/yyyy") : "Sélectionner"}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={filterState.createdTo}
                                                            onSelect={(date) => {
                                                                handleCreatedToChange(date)
                                                                setCreatedToOpen(false)
                                                            }}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                {filterState.createdTo && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleCreatedToChange(undefined)}
                                                        className="p-1 h-9 w-9"
                                                    >
                                                        <IoMdClose className="h-4 w-4"/>
                                                    </Button>
                                                )}
                                            </div>
                                        </div>

                                        {/* Date de début */}
                                        <div className="space-y-2">
                                            <label className="font-semibold text-sm text-vaTextPrimary">
                                                Date de début l'abonnement
                                            </label>
                                            <div className="flex items-center gap-2">
                                                <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            className={cn(
                                                                "w-full justify-start text-left font-normal",
                                                                !filterState.startDate && "text-muted-foreground"
                                                            )}
                                                        >
                                                            <CalendarMinus className="mr-2 h-4 w-4" />
                                                            {filterState.startDate ? format(filterState.startDate, "dd/MM/yyyy") : "Sélectionner"}
                                                        </Button>
                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                            mode="single"
                                                            selected={filterState.startDate}
                                                            onSelect={(date) => {
                                                                handleStartDateChange(date)
                                                                setStartDateOpen(false)
                                                            }}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                {filterState.startDate && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleStartDateChange(undefined)}
                                                        className="p-1 h-9 w-9"
                                                    >
                                                        <IoMdClose className="h-4 w-4"/>
                                                    </Button>
                                                )}
                                            </div>
                                        </div>

                                        {/* Date de fin */}
                                        <div className="space-y-2">
                                            <label className="font-semibold text-sm text-vaTextPrimary">
                                                Date de fin l'abonnement
                                            </label>
                                            <div className="flex items-center gap-2">
                                                <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            className={cn(
                                                                "w-full justify-start text-left font-normal",
                                                                !filterState.endDate && "text-muted-foreground"
                                                            )}
                                                        >
                                                            <CalendarMinus className="mr-2 h-4 w-4" />
                                                            {filterState.endDate ? format(filterState.endDate, "dd/MM/yyyy") : "Sélectionner"}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={filterState.endDate}
                                                            onSelect={(date) => {
                                                                handleEndDateChange(date)
                                                                setEndDateOpen(false)
                                                            }}
                                                            initialFocus
                                                        />
                                    </PopoverContent>
                                </Popover>
                                                {filterState.endDate && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleEndDateChange(undefined)}
                                                        className="p-1 h-9 w-9"
                                                    >
                                                        <IoMdClose className="h-4 w-4"/>
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Filtres de compteurs */}
                                <div>
                                    <h3 className="font-bold text-base text-vaTextPrimary mb-3">Filtres par quantité</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Nombre de véhicules */}
                                        <div className="space-y-2">
                                            <label className="font-semibold text-sm text-vaTextPrimary">
                                                Nombre de véhicules
                                            </label>
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    type="number"
                                                    placeholder="Min"
                                                    value={filterState.vehiclesCountMin ?? ""}
                                                    onChange={(e) => handleVehiclesCountMinChange(e.target.value)}
                                                    className="w-full"
                                                    min={0}
                                                />
                                                <span className="text-gray-500">-</span>
                                                <Input
                                                    type="number"
                                                    placeholder="Max"
                                                    value={filterState.vehiclesCountMax ?? ""}
                                                    onChange={(e) => handleVehiclesCountMaxChange(e.target.value)}
                                                    className="w-full"
                                                    min={0}
                                                />
                            </div>
                        </div>

                                        {/* Nombre de chauffeurs */}
                                        <div className="space-y-2">
                                            <label className="font-semibold text-sm text-vaTextPrimary">
                                                Nombre de chauffeurs
                                            </label>
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    type="number"
                                                    placeholder="Min"
                                                    value={filterState.driversCountMin ?? ""}
                                                    onChange={(e) => handleDriversCountMinChange(e.target.value)}
                                                    className="w-full"
                                                    min={0}
                                                />
                                                <span className="text-gray-500">-</span>
                        <Input
                                                    type="number"
                                                    placeholder="Max"
                                                    value={filterState.driversCountMax ?? ""}
                                                    onChange={(e) => handleDriversCountMaxChange(e.target.value)}
                                                    className="w-full"
                                                    min={0}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Nombre de résultats */}
                                {paginationMeta.totalRecords > 0 && (
                                    <div className="pt-2 border-t">
                                        <p className="text-sm text-gray-600">
                                            <span className="font-semibold">{paginationMeta.totalRecords}</span> résultat(s) trouvé(s)
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}
                </div>

                <Card className={"rounded-lg py-5"}>
                    <CardContent>
                    <div className={" custom-scrollbar rounded-lg overflow-x-scroll"}>
                            <FleetListReactTable 
                                isLoading={isLoading} 
                                fleets={fleets || []}
                                // Pagination côté serveur
                                pageIndex={page - 1} // DataTable utilise un index 0-based
                                pageSize={itemPerPage}
                                totalPages={paginationMeta.totalPages}
                                totalRecords={paginationMeta.totalRecords}
                                onPageChange={(newPage: number) => setPage(newPage + 1)} // Conversion vers 1-based pour l'API
                                onPageSizeChange={setItemPerPage}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
