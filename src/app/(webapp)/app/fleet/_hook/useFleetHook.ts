import { KpiItem } from "@/components/display/Kpi";
import { Crown, Eye, StretchHorizontal } from "lucide-react";
import React, { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetFleetsKpi, useGetFleetsList } from "@/hooks/admin/useFleetHook";
import { FleetModel } from "@/model/ADMIN/fleet";
import { Column, RowAction } from "@/components/display/CustomTableDisplay";
import Badge from "@/components/display/Badge";
import { GetFleetsParams, SubscriptionStatus } from "@/types/admin/fleet.type";
import AuthManagerGuard from "@/guard/AuthManagerGuard";
import notify from "@/utils/func/notification";
import { DashboardParams } from "@/types/dashboard.type";

const useFleetHook = () => {
  const [page, setPage] = useState(1);
  const [isSuspendVisible, setIsSuspendVisible] = useState(false);
  const [isDebugVisible, setIsDebugVisible] = useState(false);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [selectedFleet, setSelectedFleet] = useState<FleetModel>();
  const [formAction, setFormAction] = useState<"add" | "edit">("add");

  const [itemPerPage, setItemPerPage] = useState(20);

  const initialFilterState: GetFleetsParams = {
    city_id: AuthManagerGuard.getEnabledCity,
    itemPerPage: itemPerPage,
    page: page,
    first_actions: []
  };

  const [fleetFilters, setFleetFilters] = useState<GetFleetsParams>(initialFilterState);

  // Correction: Ajouter toutes les dépendances nécessaires
  const apiParams: GetFleetsParams = useMemo(() => {
    return {
      ...fleetFilters,
      itemPerPage,
      page,
      city_id: AuthManagerGuard.getEnabledCity, // Forcer la ville actuelle
    };
  }, [page, itemPerPage, fleetFilters, AuthManagerGuard.getEnabledCity]);

  const { data, isLoading, isFetching } = useGetFleetsList(apiParams);

  const fleets = useMemo(() => data?.fleets ?? [], [data]);

  const paginationMeta = useMemo(
    () => ({
      totalRecords: data?.totalRecords ?? 0,
      totalPages: data?.totalPages ?? 1,
      currentPage: data?.currentPage ?? page,
      itemPerPage: data?.itemPerPage ?? itemPerPage,
    }),
    [data, page, itemPerPage],
  );

  const pagination = useMemo(
    () => ({
      currentPage: paginationMeta.currentPage,
      totalPages: Math.max(1, paginationMeta.totalPages),
      onPageChange: setPage,
      totalEntries: paginationMeta.totalRecords,
      pageSize: itemPerPage,
      onPageSizeChange: (size: number) => {
        setItemPerPage(size);
        setPage(1);
      },
    }),
    [paginationMeta, itemPerPage],
  );

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
        header: "Plan actif",
        accessor: (item) =>
          item.suscription_name
            ? React.createElement(Badge, {
                type: item.suscription_name,
                icon: React.createElement(Crown),
                isPackage: true
              }, item.suscription_name)
            : "Aucun abonnement actif",
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
        accessor: (item) =>
          React.createElement(Badge, {
            type: item.statusDisplay,
          }),
      },
    ],
    [],
  );

  const handleSuspend = (fleet?: FleetModel) => {
    if (!fleet) {
      return notify("Aucune flote n'a ete selectionner", "warning");
    }

    setSelectedFleet(fleet);
    setIsSuspendVisible(true);
  };

  const handleDebudMode = (fleet?: FleetModel) => {
    if (!fleet) {
      return notify("Aucune flote n'a ete selectionner", "warning");
    }

    setSelectedFleet(fleet);
    setIsDebugVisible(true);
  };

  const handleDelete = (fleet?: FleetModel) => {
    if (!fleet) {
      return notify("Aucune flote n'a ete selectionner", "warning");
    }

    setSelectedFleet(fleet);
    setIsDeleteVisible(true);
  };

  const handleAdd = () => {
    setSelectedFleet(undefined);
    setFormAction("add");
    setIsFormVisible(true);
  };

  const handleEdit = (fleet: FleetModel) => {
    if (!fleet) {
      return notify("Aucune flote n'a ete selectionner", "warning");
    }
    setSelectedFleet(fleet);
    setFormAction("edit");
    setIsFormVisible(true);
  };

  const handleView = (fleet: FleetModel) => {
    if (!fleet) {
      return notify("Aucune flote n'a ete selectionner", "warning");
    }
    setSelectedFleet(fleet);
    setIsDetailsVisible(true);
  };

  const rowActions = useCallback(
    (item: FleetModel): RowAction<FleetModel>[] => {
      const actions: RowAction<FleetModel>[] = [
        {
          id: "suspend",
          label: "Suspendre",
          onClick: (fleet) => handleSuspend(fleet),
          variant: "ghost",
        },
        {
          id: "debug_mode",
          label: "Mode débogage",
          variant: "vaBlue",
          onClick: (fleet) => handleDebudMode(fleet),
        },
      ];
      if (!item.hasActiveSubscription) {
        actions.push({
          id: "delete",
          label: "Supprimer",
          variant: "destructive",
          onClick: (fleet) => handleDelete(fleet),
        });
      }
      return actions;
    },
    [data],
  );

  const updateFilter = <K extends keyof GetFleetsParams>(
    key: K,
    value: GetFleetsParams[K],
  ) => {
    setFleetFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setPage(1);
  };

  // Correction: Ajouter la ville dans les filtres à vérifier
  const hasActiveFilters = useMemo(() => {
    const { city_id, itemPerPage, page, ...filtersToCheck } = fleetFilters;
    const defaultCityId = AuthManagerGuard.getEnabledCity;
    
    // Vérifier si la ville a changé par rapport à la valeur par défaut
    const hasCityFilter = city_id !== defaultCityId;
    
    const hasOtherFilters = Object.values(filtersToCheck).some((value) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      if (typeof value === "boolean") {
        return value === true;
      }
      return (
        value !== undefined &&
        value !== null &&
        value !== "" &&
        value !== "none"
      );
    });
    
    return hasCityFilter || hasOtherFilters;
  }, [fleetFilters, AuthManagerGuard.getEnabledCity]);

  // Réinitialiser tous les filtres
  const resetFilters = () => {
    setFleetFilters({
      ...initialFilterState,
      city_id: AuthManagerGuard.getEnabledCity,
    });
    setPage(1);
  };

  // Correction: kpiParams doit inclure les mêmes paramètres de date que fleetFilters
  const kpiParams = useMemo<DashboardParams>(() => ({
    account_type: fleetFilters.type,
    city_id: AuthManagerGuard.getEnabledCity,
    start_date: fleetFilters.start_date,
    end_date: fleetFilters.end_date,
  }), [fleetFilters.type, fleetFilters.start_date, fleetFilters.end_date, AuthManagerGuard.getEnabledCity]);

  const { data: kpiData, isLoading: isLoadingKpi } = useGetFleetsKpi(kpiParams);

  const KpiItems: KpiItem[] = [
    {
      title: "Nombre de flottes",
      value: kpiData?.totalCount ?? 0,
      icon: React.createElement(StretchHorizontal),
      variant: "blue",
      variation: kpiData?.totalVariation,
      hint: `${kpiData?.totalPercent}% ${kpiData?.totalLabel}`,
    },
    {
      title: "Total flottes actives",
      value: kpiData?.activeCount ?? 0,
      icon: React.createElement(StretchHorizontal),
      variant: "green",
      variation: kpiData?.activeVariation,
      hint: ` ${kpiData?.activePercent}% ${kpiData?.activeLabel}`,
    },
    {
      title: "Total flottes inactives",
      value: kpiData?.inactiveCount ?? 0,
      icon: React.createElement(StretchHorizontal),
      variant: "orange",
      variation: kpiData?.inactiveVariation,
      hint: ` ${kpiData?.inactivePercent}% ${kpiData?.inactiveLabel}`,
    },
    {
      title: "Total flottes supprimées",
      value: kpiData?.deletedCount ?? 0,
      icon: React.createElement(StretchHorizontal),
      variant: "red",
      variation: kpiData?.deletedVariation,
      hint: ` ${kpiData?.deletedPercent}% ${kpiData?.deletedLabel}`,
    },
  ];

  return {
    KpiItems,
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
    selectedFleet,
    formAction,
    isDetailsVisible,
    isLoadingKpi,

    setIsSuspendVisible,
    setIsDebugVisible,
    setIsDeleteVisible,
    setIsFormVisible,
    setSelectedFleet,
    setFormAction,
    setIsDetailsVisible,
  };
};

export default useFleetHook;

