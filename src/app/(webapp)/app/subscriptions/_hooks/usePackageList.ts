import Badge from "@/components/display/Badge";
import { Column, RowAction } from "@/components/display/CustomTableDisplay";
import { formatNumber } from "@/lib/utils";
import { Crown } from "lucide-react";
import React, { useCallback, useMemo, useState } from "react";

export type PackageType = "PERFORMANCE" | "ELITE" | "CROISSANCE" | "ESSENTIEL";
export type ProfileType = "ENTREPRENEUR" | "PROFESSIONNEL";
export type ProfileStatus = "active" | "suspended";

export interface PackageItem {
  createdAt: string;
  createdBy: string;
  packageName: PackageType;
  profileType: ProfileType;
  cost: number;
  maxVehiclesNumber: number;
  maxDriversNumber: number;
  status: ProfileStatus;
}

export const usePackagesList = () => {
  const packagesList: PackageItem[] = [
    {
      createdAt: "12 Jan 2026",
      createdBy: "Admin Alpha",
      packageName: "ESSENTIEL",
      profileType: "ENTREPRENEUR",
      cost: 15000,
      maxVehiclesNumber: 2,
      maxDriversNumber: 2,
      status: "active",
    },
    {
      createdAt: "15 Jan 2026",
      createdBy: "Admin Alpha",
      packageName: "CROISSANCE",
      profileType: "ENTREPRENEUR",
      cost: 45000,
      maxVehiclesNumber: 5,
      maxDriversNumber: 10,
      status: "active",
    },
    {
      createdAt: "20 Jan 2026",
      createdBy: "System",
      packageName: "PERFORMANCE",
      profileType: "PROFESSIONNEL",
      cost: 120000,
      maxVehiclesNumber: 25,
      maxDriversNumber: 50,
      status: "active",
    },
    {
      createdAt: "01 Feb 2026",
      createdBy: "Admin Beta",
      packageName: "ELITE",
      profileType: "PROFESSIONNEL",
      cost: 250000,
      maxVehiclesNumber: 100,
      maxDriversNumber: 200,
      status: "active",
    },
    {
      createdAt: "05 Feb 2026",
      createdBy: "Admin Alpha",
      packageName: "ESSENTIEL",
      profileType: "ENTREPRENEUR",
      cost: 15000,
      maxVehiclesNumber: 2,
      maxDriversNumber: 2,
      status: "suspended",
    },
    {
      createdAt: "10 Feb 2026",
      createdBy: "Admin Beta",
      packageName: "CROISSANCE",
      profileType: "PROFESSIONNEL",
      cost: 55000,
      maxVehiclesNumber: 10,
      maxDriversNumber: 15,
      status: "active",
    },
    {
      createdAt: "14 Feb 2026",
      createdBy: "System",
      packageName: "PERFORMANCE",
      profileType: "ENTREPRENEUR",
      cost: 110000,
      maxVehiclesNumber: 20,
      maxDriversNumber: 40,
      status: "active",
    },
    {
      createdAt: "20 Feb 2026",
      createdBy: "Admin Alpha",
      packageName: "ELITE",
      profileType: "ENTREPRENEUR",
      cost: 230000,
      maxVehiclesNumber: 80,
      maxDriversNumber: 150,
      status: "suspended",
    },
    {
      createdAt: "01 Mar 2026",
      createdBy: "Admin Beta",
      packageName: "ESSENTIEL",
      profileType: "PROFESSIONNEL",
      cost: 20000,
      maxVehiclesNumber: 3,
      maxDriversNumber: 3,
      status: "active",
    },
    {
      createdAt: "05 Mar 2026",
      createdBy: "System",
      packageName: "CROISSANCE",
      profileType: "ENTREPRENEUR",
      cost: 45000,
      maxVehiclesNumber: 5,
      maxDriversNumber: 10,
      status: "active",
    },
    {
      createdAt: "10 Mar 2026",
      createdBy: "Admin Alpha",
      packageName: "PERFORMANCE",
      profileType: "PROFESSIONNEL",
      cost: 125000,
      maxVehiclesNumber: 30,
      maxDriversNumber: 60,
      status: "active",
    },
    {
      createdAt: "12 Mar 2026",
      createdBy: "Admin Beta",
      packageName: "ELITE",
      profileType: "PROFESSIONNEL",
      cost: 300000,
      maxVehiclesNumber: 150,
      maxDriversNumber: 300,
      status: "active",
    },
    {
      createdAt: "13 Mar 2026",
      createdBy: "Admin Alpha",
      packageName: "ESSENTIEL",
      profileType: "ENTREPRENEUR",
      cost: 15000,
      maxVehiclesNumber: 2,
      maxDriversNumber: 2,
      status: "active",
    },
    {
      createdAt: "14 Mar 2026",
      createdBy: "System",
      packageName: "CROISSANCE",
      profileType: "PROFESSIONNEL",
      cost: 60000,
      maxVehiclesNumber: 12,
      maxDriversNumber: 20,
      status: "active",
    },
    {
      createdAt: "15 Mar 2026",
      createdBy: "Admin Beta",
      packageName: "PERFORMANCE",
      profileType: "ENTREPRENEUR",
      cost: 115000,
      maxVehiclesNumber: 22,
      maxDriversNumber: 45,
      status: "suspended",
    },
  ];
  const paginationMeta = useMemo(
    () => ({
      totalRecords: packagesList.length ?? 0,
      totalPages: 1,
      currentPage: 1,
      itemPerPage: 10,
    }),
    [packagesList.length],
  );

  const pagination = useMemo(
    () => ({
      currentPage: paginationMeta.currentPage,
      totalPages: Math.max(1, paginationMeta.totalPages),
      onPageChange: () => { },
      totalEntries: paginationMeta.totalRecords,
      pageSize: 10,
      onPageSizeChange: () => { },
    }),
    [paginationMeta],
  );

  const tableColumns: Column<PackageItem>[] = useMemo<
    Column<PackageItem>[]
  >(
    () => [
      {
        header: "Date de création",
        accessor: (item) => item.createdAt,
      },
      {
        header: "Ajouté par",
        accessor: (item) => item.createdBy,
      },
      {
        header: "Package",
        accessor: (item) => React.createElement(Badge, { type: item.packageName, icon: React.createElement(Crown) }),
      },
      {
        header: "Profil",
        accessor: (item) => item.profileType
      },
      {
        header: "Prix",
        accessor: (item) => `${formatNumber(item.cost)} XOF`,
      },
      {
        header: "Véhicules",
        accessor: (item) => `1-${item.maxVehiclesNumber} Véhicules`
      },
      {
        header: "Chauffeurs",
        accessor: (item) => `Jusqu'a ${item.maxVehiclesNumber}`
      },
      {
        header: "Statut",
        accessor: (item) => React.createElement(Badge, { type: item.status }),
      },
    ],
    [],
  );

  const [selectedPackage, setSelectedPackage] = React.useState<PackageItem | null>(null);
  const [isDetailsSheetOpen, setIsDetailsSheetOpen] = React.useState(false);

  const handleViewPackage = (item: PackageItem) => {
    setSelectedPackage(item);
    setIsDetailsSheetOpen(true);
  }
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

  const onSuspendPack = (pack: PackageItem) => { };
  const onDeletePack = (Pack: PackageItem) => { };

  const rowActions = useCallback(
    (item: PackageItem): RowAction<PackageItem>[] => {
      const actions: RowAction<PackageItem>[] = [
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
          onClick: (Pack) => { setIsSuspendVisible(true) },
        },
        {
          id: "supprimer",
          label: "Supprimer",
          variant: "destructive",
          onClick: (Pack) => { setIsDeleteVisible(true) },
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
    handleEdit
  };
};