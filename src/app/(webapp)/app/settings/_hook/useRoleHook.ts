import { useGetRoles } from "@/hooks/admin/useRoleAccess";
import RootRoleModel from "@/model/ADMIN/RoleAccessModel";
import { useState } from "react";

export interface RoleItem {
  name: string;
  usersCount: number;
  access: string[] | "full_access";
  permissionsCount: number;
}

export const useRoleHook = () => {
  const { data: adminRoles, isLoading: isLoadingAdminRoles } = useGetRoles();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const [formAction, setFormAction] = useState<"add" | "edit">("add");
  const [selectedRole, setSelectedRole] = useState<RootRoleModel>();

  const handleAdd = () => {
    setSelectedRole(undefined)
    setFormAction("add");
    setIsFormVisible(true);
  };

  const handleEdit = (role?: RootRoleModel) => {
    if (!role) {
      return;
    }
    setSelectedRole(role);
    setFormAction("edit");
    setIsFormVisible(true);
  };

  const handleDelete = (role?: RootRoleModel)=>{
    if (!role) {
      return;
    }
    setSelectedRole(role)
    setIsDeleteVisible(true)
  }

  return {
    adminRoles,
    isLoadingAdminRoles,

    selectedRole,
    formAction,
    isFormVisible,
    isDeleteVisible,

    setSelectedRole,
    setFormAction,
    setIsFormVisible,
    setIsDeleteVisible,

    handleAdd,
    handleEdit,
    handleDelete
  };
};
