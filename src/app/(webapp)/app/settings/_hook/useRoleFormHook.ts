import {
  useCreateRole,
  useGetGroupedPermissions,
  useGetRole,
  useUpdateRole,
} from "@/hooks/admin/useRoleAccess";
import { CreateRolePayload } from "@/types/admin/role-access.type";
import notify from "@/utils/func/notification";
import { useState, useEffect, useMemo } from "react";

export const useRoleForm = (roleId?: number) => {
  const { data: modules, isLoading: isLoadingModules } =
    useGetGroupedPermissions();

  const { data: selectedRole, isLoading: isLoadingSelected } = useGetRole(
    roleId??0 > 0?String(roleId):undefined
  );

  useEffect(() => {
    if (selectedRole) {
      setFormData({
        name: selectedRole.displayName,
        description: selectedRole.description,
        permission_keys: selectedRole.permissionsList || [],
      });

    }
  }, [selectedRole, modules]);
  const {
    onCreateRole,
    isSuccess,
    isError,
    error,
    loading: isCreatingRole,
  } = useCreateRole();

  const {
    error: updateError,
    isError: isUpdateError,
    isSuccess: isUpdateSuccess,
    loading: isUpdating,
    onUpdateRole,
  } = useUpdateRole(roleId??0 > 0?String(roleId):undefined);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permission_keys: [] as string[],
  });

  const [fullAccess, setFullAccess] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setFormData({
        name: "",
        description: "",
        permission_keys: [],
      });
      setFullAccess(false);
    }
  }, [isSuccess]);

  const createRolePayload: CreateRolePayload = useMemo(() => {
    const allCatalogueKeys =
      modules?.flatMap((m) => [
        m.moduleName,
        ...m.permissions.map((p) => p.key),
      ]) || [];

    const allAccessIds =
      modules
        ?.flatMap((m) => m.permissions)
        .flatMap((p) =>
          p.mappedAccesses.map((ma) => ({
            access_id: ma.access_id,
            type: ma.type,
          })),
        ) || [];

    return {
      name: formData.name,
      description: formData.description,
      permission_keys: fullAccess ? allCatalogueKeys : formData.permission_keys,
      access: fullAccess
        ? allAccessIds
        : (modules || [])
            .flatMap((m) => m.permissions)
            .filter((p) => formData.permission_keys.includes(p.key))
            .flatMap((p) =>
              p.mappedAccesses.map((ma) => ({
                access_id: ma.access_id,
                type: ma.type,
              })),
            ),
    };
  }, [formData, fullAccess, modules]);

  const handleValidateForm = () => {
    if (!formData.name.trim()) {
      notify("Veuillez entrer le nom du rôle", "error");
      return false;
    }
    if (!formData.description.trim()) {
      notify("Veuillez entrer une description", "error");
      return false;
    }
    if (formData.permission_keys.length === 0 && !fullAccess) {
      notify("Veuillez sélectionner au moins une permission", "error");
      return false;
    }
    return true;
  };

  const handleAddRole = () => {
    if (handleValidateForm()) {
      onCreateRole(createRolePayload);
    }

    if (isError) {
      console.error(error);
      notify(error?.message || "Une erreur est survenue", "error");
    }
  };

  const handleUpdateRole = () => {
    if (handleValidateForm()) {
      onUpdateRole(createRolePayload);
    }

    if (isUpdateError) {
      console.error(updateError);
      notify(updateError?.message || "Une erreur est survenue", "error");
    }
  };

  return {
    // Data & Loading
    modules,
    isLoadingModules,
    isSubmitting: isCreatingRole || isUpdating,
    isSuccess: isSuccess || isUpdateSuccess,
    isLoadingSelected,

    // States
    formData,
    setFormData,
    fullAccess,
    setFullAccess,

    // Actions
    handleAddRole,
    handleUpdateRole,
  };
};
