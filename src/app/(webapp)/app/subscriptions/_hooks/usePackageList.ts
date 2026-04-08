import Badge from "@/components/display/Badge";
import { Column, RowAction } from "@/components/display/CustomTableDisplay";
import AuthManagerGuard from "@/guard/AuthManagerGuard";
import { useGetActiveCurrency } from "@/hooks/__globlal/useGlobalHook";
import { useGetAllSubscriptions } from "@/hooks/subscription/useSubscription";
import { formatNumber } from "@/lib/utils";
import { AllSubscriptionsModel } from "@/model/subscription/AllSubscriptionsModel";
import { toIsoDate } from "@/services/Service";
import { GetSubscriptionsPricingParams } from "@/types/subscription.types";
import { Crown } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { DateRange } from "react-day-picker";

export type PackageType =
  | "PERFORMANCE"
  | "ELITE"
  | "CROISSANCE"
  | "ESSENTIEL"
  | "ESSENTIEL ENTREPRENEUR"
  | "PREMIUM ENTREPRISE"
  | "STARTER ENTREPRISE";
export type ProfileType = "ENTREPRENEUR" | "PROFESSIONNEL";
export type ProfileStatus = "active" | "suspended";

const now = new Date();

const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);

const lastDay = new Date(
  now.getFullYear(),
  now.getMonth() + 1,
  0,
  23,
  59,
  59,
  999,
);

export const usePackagesList = () => {
  const { currency } = useGetActiveCurrency();
  const [page, setPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(20);

  const [packagesFilters, setPackagesFilters] =
    useState<GetSubscriptionsPricingParams>({
      search: "",
      status: "",
      account_type: "",
      start_date: toIsoDate(firstDay),
      end_date: toIsoDate(lastDay),
      city_id: AuthManagerGuard.getEnabledCity,
    });

  useEffect(() => {
    setPage(1);
  }, [packagesFilters, itemPerPage]);

  const apiParams: GetSubscriptionsPricingParams = useMemo(() => {
    return {
      search: packagesFilters.search,
      account_type: packagesFilters.account_type,
      status: packagesFilters.status,
      itemPerPage,
      page,
    };
  }, [page, itemPerPage, packagesFilters]);
  const { data: packagesData, isLoading: isLoadingPackages } =
    useGetAllSubscriptions(apiParams);

  const packagesList = useMemo(
    () => packagesData?.packages ?? [],
    [packagesData],
  );

  const paginationMeta = useMemo(
    () => ({
      totalRecords: packagesData?.totalRecords ?? 0,
      totalPages: packagesData?.totalPages ?? 1,
      currentPage: packagesData?.currentPage ?? page,
      itemPerPage: packagesData?.itemPerPage ?? itemPerPage,
    }),
    [packagesData, page, itemPerPage],
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

  const tableColumns: Column<AllSubscriptionsModel>[] = useMemo<
    Column<AllSubscriptionsModel>[]
  >(
    () => [
      {
        header: "Date de création",
        accessor: (item) => item.createdAt,
      },
      {
        header: "Ajouté par",
        accessor: (item) => item.userName,
      },
      {
        header: "Package",
        accessor: (item) =>
          React.createElement(
            Badge,
            {
              type: item.name as PackageType,
              icon: React.createElement(Crown),
              isPackage: true,
            },
            item.name,
          ),
      },
      {
        header: "Profil",
        accessor: (item) => item.profile,
      },
      {
        header: "Prix",
        accessor: (item) => `${item.amount} ${currency}`,
      },
      {
        header: "Véhicules",
        accessor: (item) => item.vehicleNumberLabel,
      },
      {
        header: "Chauffeurs",
        accessor: (item) => item.driverNumberLabel,
      },
      {
        header: "Statut",
        accessor: (item) => React.createElement(Badge, { type: item.status }),
      },
    ],
    [],
  );

  const [selectedPackage, setSelectedPackage] =
    React.useState<AllSubscriptionsModel | null>(null);
  const [isDetailsSheetOpen, setIsDetailsSheetOpen] = React.useState(false);

  const handleViewPackage = (item: AllSubscriptionsModel) => {
    setSelectedPackage(item);
    setIsDetailsSheetOpen(true);
  };
  const [action, setAction] = useState<"add" | "edit">("add");
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);

  const [isSupendVisible, setIsSuspendVisible] = useState(false);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);

  const handleEdit = () => {
    setAction("edit");
    setIsFormDialogOpen(true);
  };

  const handleAdd = () => {
    setAction("add");
    setIsFormDialogOpen(true);
  };

  const onSuspendPack = (pack: AllSubscriptionsModel) => {};
  const onDeletePack = (Pack: AllSubscriptionsModel) => {};

  const rowActions = useCallback(
    (item: AllSubscriptionsModel): RowAction<AllSubscriptionsModel>[] => {
      const actions: RowAction<AllSubscriptionsModel>[] = [
        {
          id: "edit",
          label: "Modifier",
          onClick: (Pack) => handleEdit(),
          variant: "mainBlue",
        },
        {
          id: "supend",
          label: "Suspendre",
          variant: "ghost",
          onClick: (Pack) => {
            setIsSuspendVisible(true);
          },
        },
        {
          id: "supprimer",
          label: "Supprimer",
          variant: "destructive",
          onClick: (Pack) => {
            setIsDeleteVisible(true);
          },
        },
      ];
      return actions;
    },
    [onSuspendPack, onDeletePack],
  );

  return {
    packagesList,
    tableColumns,
    pagination,
    selectedPackage,
    isDetailsSheetOpen,
    handleViewPackage,
    setIsDetailsSheetOpen,
    rowActions,
    isSupendVisible,
    isDeleteVisible,
    isFormDialogOpen,
    setIsFormDialogOpen,
    setIsDeleteVisible,
    setIsSuspendVisible,
    action,
    setAction,
    handleAdd,
    handleEdit,
    isLoadingPackages,
    packagesFilters,
    setPackagesFilters,
    totalRecords: packagesData?.totalRecords,
  };
};
