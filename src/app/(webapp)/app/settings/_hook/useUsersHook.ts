import Badge from "@/components/display/Badge";
import { Column, RowAction } from "@/components/display/CustomTableDisplay";
import { useGetAdminList } from "@/hooks/admin/useSettingsHook";
import UserProfile from "@/model/user/User";
import React, { useCallback, useMemo, useState } from "react";
import { UserNameAndInitials } from "../_components/_users/UserNameInitials";
import { AdminAccountStatus, GetAdminsParams } from "@/types/__form/profile.type";
import { useCity } from "@/hooks/location/useCity/useCity";
import { Edit, Trash, UserRoundCheck, UserRoundX } from "lucide-react";

export interface UserFilters {
  name?: string;
  status?: AdminAccountStatus;
  city_id?: number;
}

export const useUsersHook = () => {
  const [page, setPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(20);
  const [filters, setFilters] = useState<UserFilters>()
  const [selectedUser, setSelectedUser] = useState<UserProfile>()
  const [formAction, setFormAction] = useState<"add" | "edit">("add")
  const [toggleAction, setToggleAction] = useState<"enable" | "disable">("enable")
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [isToggleVisible, setIsToggleVisible] = useState(false)
  const { data: citiesList, isLoading: isLoadingCities } = useCity({});

  const queryParams: GetAdminsParams = useMemo(
    () => ({
      page: page,
      itemPerPage: itemPerPage,
      include_permissions: false,
      city_id: filters?.city_id,
      name: filters?.name,
      status: filters?.status
    }),
    [page, itemPerPage, filters],
  );
  const { data: usersData, isLoading: isLoadingUsers } =
    useGetAdminList(queryParams);

  const paginationMeta = useMemo(
    () => ({
      totalRecords: usersData?.totalRecords ?? 1,
      totalPages: usersData?.totalPages ?? 1,
      currentPage: usersData?.currentPage ?? page,
      itemPerPage: usersData?.itemPerPage ?? itemPerPage,
    }),
    [usersData, page, itemPerPage],
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

  const tableColumns: Column<UserProfile>[] = useMemo(
    () => [
      {
        header: "Utilisateur",
        accessor: (item) =>
          React.createElement(UserNameAndInitials, { name: item.getUsername, imageUrl: item.image ?? undefined }),
      },
      {
        header: "Email",
        accessor: (item) => item.user.email ?? "-",
      },
      {
        header: "Rôle",
        accessor: (item) => item.roleName,
      },
      {
        header: "Accès géographique",
        accessor: (item) => {
          const citiesLabel = item.cities ? item.cities.map((c) => c.name).join(", ") : "-"
          return React.createElement("div", { className: "max-w-96 w-full truncate line-clamp-2", title: citiesLabel }, citiesLabel)
        }
      },

      {
        header: "Statut",
        accessor: (item) =>
          React.createElement(Badge, { type: item.status }),
      },
    ],
    [],
  );


  const handleAdd = () => {
    setSelectedUser(undefined)
    setFormAction("add");
    setIsFormVisible(true)
  }

  const handleEdit = (user?: UserProfile) => {
    setSelectedUser(user)
    setFormAction("edit");
    setIsFormVisible(true)
  }

  const handleToggle = (user?: UserProfile) => {
    user?.status == "active" ? setToggleAction("disable") : setToggleAction("enable")
    setSelectedUser(user)
    setIsToggleVisible(true)
  }

  const rowActions = useCallback(
    (item: UserProfile): RowAction<UserProfile>[] => {
      const actions: RowAction<UserProfile>[] = [
        {
          id: "edit",
          label: "Modifier",
          onClick: (user) => handleEdit(user),
          variant: "vaBlue",
          icon: React.createElement(Edit, { size: 16 })
        },
        {
          id: "toggle_state",
          label: item.status == "active" ? "Désactiver l'utilisateur" : "Réactiver l'utilisateur",
          variant: item.status == "active" ? "destructive" : "success",
          onClick: (user) => handleToggle(user),
          icon: item.status == "active" ? React.createElement(UserRoundX, { size: 16 }) : React.createElement(UserRoundCheck, { size: 16 }),
        },
        // {
        //   id: "delete",
        //   label: "Supprimer l'utilisateur",
        //   onClick: (user) => { alert("Pourquoi tu veux supprimer " + user?.getUsername) },
        //   variant: "destructive",
        //   icon: React.createElement(Trash, { size: 16 })
        // },
      ];
      return actions;
    },
    [],
  );

  return {
    citiesList,
    isLoadingCities,
    usersList: usersData?.admins,
    isLoadingUsers,
    tableColumns,
    rowActions,
    pagination,
    filters,
    setFilters,

    isFormVisible,
    isToggleVisible,
    setIsFormVisible,
    setIsToggleVisible,
    formAction,
    toggleAction,
    selectedUser,

    handleAdd,
    handleEdit,
    handleToggle,
  };
};
