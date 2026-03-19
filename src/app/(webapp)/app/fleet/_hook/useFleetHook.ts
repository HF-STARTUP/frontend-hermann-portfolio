import { KpiItem } from "@/components/display/Kpi"
import { Eye, StretchHorizontal } from "lucide-react"
import React, { useCallback, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { useGetFleetsList } from "@/hooks/admin/useFleetHook"
import { FleetModel } from "@/model/ADMIN/fleet"
import { Column, RowAction } from "@/components/display/CustomTableDisplay"
import { AbonStatusBadge, SubscriptionBadge } from "../components/_sub_components/badges"

export interface FilterState {
    searchTerm: string
    abonType: string
    dateRange: Date[] | undefined
    createdFrom?: Date
    createdTo?: Date
    startDate?: Date
    endDate?: Date
    vehiclesCountMin?: number
    vehiclesCountMax?: number
    driversCountMin?: number
    driversCountMax?: number
}

const initialFilterState: FilterState = {
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
}

export interface UseFleetHookOptions {
    onViewFleet?: (fleet: FleetModel) => void;
    onSuspendFleet?: (fleet: FleetModel) => void;
    onDeleteFleet?: (fleet: FleetModel) => void;
}

const useFleetHook = (options?: UseFleetHookOptions) => {
    const router = useRouter()
    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(10)
    const [filterState, setFilterState] = useState<FilterState>(initialFilterState)

    const apiParams = useMemo(() => {
        const params: Record<string, unknown> = {
            page,
            itemPerPage,
        }
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

    const { data, isLoading, isFetching } = useGetFleetsList(apiParams)

    const fleets = useMemo(() => data?.fleets ?? [], [data])

    const paginationMeta = useMemo(
        () => ({
            totalRecords: data?.totalRecords ?? 0,
            totalPages: data?.totalPages ?? 1,
            currentPage: data?.currentPage ?? page,
            itemPerPage: data?.itemPerPage ?? itemPerPage,
        }),
        [data, page, itemPerPage]
    )

    const pagination = useMemo(
        () => ({
            currentPage: paginationMeta.currentPage,
            totalPages: Math.max(1, paginationMeta.totalPages),
            onPageChange: setPage,
            totalEntries: paginationMeta.totalRecords,
            pageSize: itemPerPage,
            onPageSizeChange: (size: number) => {
                setItemPerPage(size)
                setPage(1)
            },
        }),
        [paginationMeta, itemPerPage]
    )

    const tableColumns: Column<FleetModel>[] = useMemo(
        () => [
            {
                header: "Date d'ajout",
                accessor: (item) => item.created_at ?? "-",
            },
            {
                header: "Nom de la flotte",
                accessor: (item) => item.name ?? "-",
            },
            {
                header: "Propriétaire",
                accessor: (item) => item.ownerName ?? "-",
            },
            {
                header: "Type",
                accessor: () => "-",
            },
            {
                header: "Plan actif",
                accessor: (item) => React.createElement(SubscriptionBadge, { name: item.suscription_name ?? "-" }),
            },
            {
                header: "Montant",
                accessor: (item) => item.subscription_amount ?? "-",
            },
            {
                header: "Véhicules",
                accessor: (item) => item.number_vehicle ?? "-",
            },
            {
                header: "Statut",
                accessor: (item) => (React.createElement(AbonStatusBadge, { status: item.statusDisplay === "Actif" ? "Active" : "Désactivé" })),
            },
        ],
        []
    )

    const rowActions = useCallback(
        (item: FleetModel): RowAction<FleetModel>[] => {
            const actions: RowAction<FleetModel>[] = [
                {
                    id: "view",
                    label: "Voir",
                    onClick: (fleet) => options?.onViewFleet ? options.onViewFleet(fleet) : router.push(`/app/fleet/${fleet.id}`),
                    variant: "ghost",
                },
                {
                    id: "suspend",
                    label: "Suspendre",
                    onClick: (fleet) => options?.onSuspendFleet?.(fleet),
                    variant: "ghost"
                },
                {
                    id: "debug_mode",
                    label: "Mode débogage",
                    variant: "vaBlue",
                    onClick: () => {
                        console.log(item)
                    },
                },
            ]
            if (!item.hasActiveSubscription) {
                actions.push({
                    id: "delete",
                    label: "Supprimer",
                    variant: "destructive",
                    onClick: (fleet) => options?.onDeleteFleet?.(fleet),
                })
            }
            return actions
        },
        [router, options?.onViewFleet, options?.onSuspendFleet, options?.onDeleteFleet]
    )

    const handleSearchChange = (searchTerm: string) => {
        setFilterState((prev) => ({ ...prev, searchTerm }))
        setPage(1)
    }

    const handleAbonTypeFilter = (abonType: string) => {
        setFilterState((prev) => ({ ...prev, abonType }))
        setPage(1)
    }

    const handleCreatedFromChange = (date: Date | undefined) => {
        setFilterState((prev) => ({ ...prev, createdFrom: date }))
        setPage(1)
    }

    const handleCreatedToChange = (date: Date | undefined) => {
        setFilterState((prev) => ({ ...prev, createdTo: date }))
        setPage(1)
    }

    const handleStartDateChange = (date: Date | undefined) => {
        setFilterState((prev) => ({ ...prev, startDate: date }))
        setPage(1)
    }

    const handleEndDateChange = (date: Date | undefined) => {
        setFilterState((prev) => ({ ...prev, endDate: date }))
        setPage(1)
    }

    const handleVehiclesCountMinChange = (value: string) => {
        const num = value === "" ? undefined : parseInt(value, 10)
        setFilterState((prev) => ({ ...prev, vehiclesCountMin: num }))
        setPage(1)
    }

    const handleVehiclesCountMaxChange = (value: string) => {
        const num = value === "" ? undefined : parseInt(value, 10)
        setFilterState((prev) => ({ ...prev, vehiclesCountMax: num }))
        setPage(1)
    }

    const handleDriversCountMinChange = (value: string) => {
        const num = value === "" ? undefined : parseInt(value, 10)
        setFilterState((prev) => ({ ...prev, driversCountMin: num }))
        setPage(1)
    }

    const handleDriversCountMaxChange = (value: string) => {
        const num = value === "" ? undefined : parseInt(value, 10)
        setFilterState((prev) => ({ ...prev, driversCountMax: num }))
        setPage(1)
    }

    const hasActiveFilters = useMemo(
        () =>
            !!(
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
            ),
        [filterState]
    )

    const resetFilters = () => {
        setFilterState(initialFilterState)
        setPage(1)
    }

    const KpiItems: KpiItem[] = [
        {
            title: "Nombre de flottes",
            value: 50,
            icon: React.createElement(StretchHorizontal),
            variant: "blue",
            variation: "up",
            hint: "+10% vs mois précédent",
        },
        {
            title: "Total flottes actives",
            value: 30,
            icon: React.createElement(StretchHorizontal),
            variant: "green",
            variation: "up",
            hint: "+2% vs mois précédent",
        },
        {
            title: "Total flottes inactives",
            value: 10,
            icon: React.createElement(StretchHorizontal),
            variant: "orange",
            variation: "up",
            hint: "+6% vs mois précédent",
        },
        {
            title: "Total flottes supprimées",
            value: 10,
            icon: React.createElement(StretchHorizontal),
            variant: "red",
            variation: "down",
            hint: "-10% vs mois précédent",
        },
    ]

    return {
        KpiItems,
        fleets,
        isLoading,
        isFetching,
        paginationMeta,
        filterState,
        tableColumns,
        rowActions,
        pagination,
        handleSearchChange,
        handleAbonTypeFilter,
        handleCreatedFromChange,
        handleCreatedToChange,
        handleStartDateChange,
        handleEndDateChange,
        handleVehiclesCountMinChange,
        handleVehiclesCountMaxChange,
        handleDriversCountMinChange,
        handleDriversCountMaxChange,
        resetFilters,
        hasActiveFilters,
    }
}

export default useFleetHook
