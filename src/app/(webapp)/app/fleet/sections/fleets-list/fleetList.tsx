"use client"

import FleetListAccount from "@/app/(webapp)/app/fleet/sections/fleets-list/config";
import {useGetFleetsList} from "@/hooks/admin/useFleetHook";
import Loading from "@/components/ui/Loader";
import {EmptyData} from "@/components/box/PageNetworkState";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import React from "react";
import {Calendar} from "@/components/ui/calendar";
import {Input} from "@/components/ui/input";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {FleetModel} from "@/model/ADMIN/fleet";
import {format, isWithinInterval, startOfDay, endOfDay} from "date-fns";
import {IoMdClose} from "react-icons/io";
import {CalendarMinus} from "lucide-react";
import {ABlockTitle} from "@/app/(webapp)/app/dashboard/_components/abonEvolution/abonnEvolution";
import {LuListFilter} from "react-icons/lu";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {searchAndFilter} from "@/model/Model";
import {CgPlayListSearch} from "react-icons/cg";

enum FleetAbonType {
    free = "Essaie gratuit",
    starterEntrepreneur = "starter entrepreneur",
    essentielEntrepreneur = "essentiel entrepreneur",
    premiumEntrepreneur = "premium entrepreneur",
    essentielEntreprise = "essentiel entreprise",
    premiumEntreprise = "premium entreprise",
    None = "None",
}

interface FilterState {
    searchTerm: string;
    abonType: string;
    dateRange: Date[] | undefined;
}

export const FleetList = () => {
    const {data, isLoading, isFetching, isRefetching} = useGetFleetsList()
    const [filterState, setFilterState] = React.useState<FilterState>({
        searchTerm: "",
        abonType: "all",
        dateRange: undefined
    })
    const [fleetList, setFleetList] = React.useState<FleetModel[]>([])
    const [calendarIsOpen, setCalendarIsOpen] = React.useState(false)
    const [filterIsActive, setFilterIsActive] = React.useState(false)

    // Fonction de filtrage optimisée qui combine tous les filtres
    const applyFilters = React.useCallback((originalData: FleetModel[], filters: FilterState): FleetModel[] => {
        let filteredData = [...originalData]

        // Filtre par terme de recherche
        if (filters.searchTerm.trim()) {
            filteredData = searchAndFilter(filteredData, filters.searchTerm, ['name', 'ownerName'])
        }

        // Filtre par type d'abonnement
        if (filters.abonType !== "all") {
            if (filters.abonType === "None") {
                filteredData = filteredData.filter(fleet => !fleet._instance.subscription || fleet._instance.subscription === "None")
            } else {
                filteredData = filteredData.filter(fleet => 
                    fleet._instance.subscription === filters.abonType
                )
            }
        }

        // Filtre par plage de dates
        if (filters.dateRange && filters.dateRange.length === 2) {
            const [startDate, endDate] = filters.dateRange
            filteredData = filteredData.filter(fleet => {
                const fleetStartDate = new Date(fleet._instance.start_date)
                return isWithinInterval(fleetStartDate, {
                    start: startOfDay(startDate),
                    end: endOfDay(endDate)
                })
            })
        }

        return filteredData
    }, [])

    // Appliquer les filtres quand les données ou les filtres changent
    React.useEffect(() => {
        if (data) {
            const filtered = applyFilters(data, filterState)
            setFleetList(filtered)
        }
    }, [data, filterState, applyFilters])

    // Gestionnaire pour le filtre d'abonnement
    const handleAbonTypeFilter = (abonType: string) => {
        setFilterState(prev => ({
            ...prev,
            abonType
        }))
    }

    // Gestionnaire pour la recherche
    const handleSearchChange = (searchTerm: string) => {
        setFilterState(prev => ({
            ...prev,
            searchTerm
        }))
    }

    // Gestionnaire pour le filtre de dates
    const handleDateRangeChange = (dateRange: Date[] | undefined) => {
        setFilterState(prev => ({
            ...prev,
            dateRange
        }))
    }

    // Réinitialiser tous les filtres
    const resetFilters = () => {
        setFilterState({
            searchTerm: "",
            abonType: "all",
            dateRange: undefined
        })
    }

    if (isLoading || isFetching || isRefetching) {
        return <Loading/>
    }

    if (!isLoading && data && data.length === 0) {
        return (
            <EmptyData
                message={"Aucune flotte pour l'instant"}
            />
        )
    }

    if (data && data.length > 0) {
        return (
            <div>
                <div className={"flex justify-between items-center"}>
                    <div className={"lg:mt-[24px] flex items-center justify-between gap-[26px] w-full"}>
                        <ABlockTitle>Sélectionnez une flotte</ABlockTitle>
                        <div className="flex items-center gap-2">
                            {(filterState.searchTerm || filterState.abonType !== "all" || filterState.dateRange) && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={resetFilters}
                                    className="text-xs"
                                >
                                    Réinitialiser
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
                        <div className={"flex flex-col gap-4 lg:flex-row items-start justify-between"}>
                            {/* Filtre par type d'abonnement */}
                            <div className={"flex flex-col gap-2 w-full lg:w-auto"}>
                                <div className={"font-semibold text-sm text-vaTextPrimary"}>Type d'abonnement:</div>
                                <Select 
                                    value={filterState.abonType} 
                                    onValueChange={handleAbonTypeFilter}
                                >
                                    <SelectTrigger className="w-fit min-w-[200px]">
                                        <SelectValue placeholder="Type"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Tout</SelectItem>
                                        <SelectItem value={FleetAbonType.free}>Essaie gratuit</SelectItem>
                                        <SelectItem value={FleetAbonType.starterEntrepreneur}>Starter entrepreneur</SelectItem>
                                        <SelectItem value={FleetAbonType.essentielEntrepreneur}>Essentiel entrepreneur</SelectItem>
                                        <SelectItem value={FleetAbonType.premiumEntrepreneur}>Premium entrepreneur</SelectItem>
                                        <SelectItem value={FleetAbonType.essentielEntreprise}>Essentiel entreprise</SelectItem>
                                        <SelectItem value={FleetAbonType.premiumEntreprise}>Premium entreprise</SelectItem>
                                        <SelectItem value={FleetAbonType.None}>Aucun abonnement</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Filtre par plage de dates */}
                            <div className={"flex flex-col gap-2 w-full lg:w-auto"}>
                                <div className={"font-semibold text-sm text-vaTextPrimary"}>Date d'ajout:</div>
                                <div className={"flex items-center gap-2"}>
                                    <Popover open={calendarIsOpen} onOpenChange={setCalendarIsOpen}>
                                        <PopoverTrigger>
                                            <Input
                                                rightIcon={<CalendarMinus className={"text-vaTextPrimary"}/>}
                                                className={"w-fit min-w-[230px]"}
                                                placeholder={"Choisir une intervalle"}
                                                onClick={() => setCalendarIsOpen(true)}
                                                value={
                                                    filterState.dateRange?.length === 2 
                                                        ? `${format(filterState.dateRange[0], "dd/MM/yyyy")} - ${format(filterState.dateRange[1], "dd/MM/yyyy")}` 
                                                        : ""
                                                }
                                                readOnly
                                            />
                                        </PopoverTrigger>
                                        <PopoverContent asChild className={"p-0"}>
                                            <div>
                                                <Calendar
                                                    mode="multiple"
                                                    selected={filterState.dateRange}
                                                    min={2}
                                                    max={2}
                                                    onSelect={(dates) => {
                                                        handleDateRangeChange(dates)
                                                        if (dates && dates.length === 2) {
                                                            setCalendarIsOpen(false)
                                                        }
                                                    }}
                                                    className="rounded-md border"
                                                />
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                    {filterState.dateRange?.length && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDateRangeChange(undefined)}
                                            className="p-1 h-8 w-8"
                                        >
                                            <IoMdClose className="h-4 w-4"/>
                                        </Button>
                                    )}
                                </div>
                            </div>

                            {/* Barre de recherche */}
                            <div className={"flex flex-col gap-2 w-full lg:w-auto"}>
                                <div className={"font-semibold text-sm text-vaTextPrimary"}>Rechercher:</div>
                                <Input
                                    placeholder={"Rechercher une flotte..."}
                                    rightIcon={<CgPlayListSearch className={"text-vaTextPrimary text-[20px]"}/>}
                                    value={filterState.searchTerm}
                                    onChange={(e) => handleSearchChange(e.target.value)}
                                    className="min-w-[250px]"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Affichage du nombre de résultats */}
                {filterIsActive && (
                    <div className="mb-4 text-sm text-vaTextPrimary">
                        {fleetList.length} flotte{fleetList.length > 1 ? 's' : ''} trouvée{fleetList.length > 1 ? 's' : ''}
                        {data && data.length !== fleetList.length && ` sur ${data.length} total`}
                    </div>
                )}

                <div className={"grid grid-cols-12"}>
                    <div className={"col-span-12"}>
                        <div className={"custom-scrollbar overflow-y-scroll rounded-lg"}>
                            <FleetListAccount fleets={fleetList}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}