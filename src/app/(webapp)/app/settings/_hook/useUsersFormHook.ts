import { useGetRoles } from "@/hooks/admin/useRoleAccess";
import {
  useCreateAdmin,
  useGetAdmin,
  useUpdateAdmin,
} from "@/hooks/admin/useSettingsHook";
import { AddAdminInput } from "@/schema/ADMIN/settings.schema";
import notify from "@/utils/func/notification";
import { useState, useEffect } from "react";

export const useUsersFormHook = (userId?: string) => {
  const { data: roleList, isLoading: isLoadingRoles } = useGetRoles();
  const {
    error,
    isError,
    isSuccess,
    loading: isSubmitting,
    onCreateAdmin,
  } = useCreateAdmin();

  const {
    error: updateError,
    isError: isUpdateError,
    loading: isUpdating,
    isSuccess: isUpdateSuccess,
    onUpdateAdmin,
  } = useUpdateAdmin(userId);

  const { data: userData, isLoading: isLoadingUserData } = useGetAdmin(userId);

  const [formData, setFormData] = useState<AddAdminInput>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    role_id: "",
    cities_id: [],
    password: ""
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        first_name: "",
        last_name: userData.getUsername,
        email: userData.user.email,
        phone: userData.user.phone,
        role_id: String(userData.role ? userData.role.id : undefined),
        cities_id: userData.cities.map((c) => c.id),
        password: userData.password
      });
    }
  }, [userData]);

  useEffect(() => {
    if (isSuccess) {
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        role_id: "",
        cities_id: [],
        password: ""
      });
    }
  }, [isSuccess]);

  const handleValidateForm = () => {
    // if (!formData.first_name.trim()) {
    //   notify("Veuillez entrer le prénom de l'utilisateur", "error");
    //   return false;
    // }
    if (!formData.last_name.trim()) {
      notify("Veuillez entrer le nom de l'utilisateur", "error");
      return false;
    }
    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      notify("Veuillez entrer une adresse email valide", "error");
      return false;
    }
    if (!formData.phone.trim()) {
      notify("Veuillez entrer le numéro de téléphone", "error");
      return false;
    }
    if (!formData.role_id || formData.role_id == "undefined") {
      notify("Veuillez sélectionner le rôle de l'utilisateur", "error");
      return false;
    }
    if (formData.cities_id.length === 0) {
      notify("Veuillez sélectionner au moins une ville", "error");
      return false;
    }
    if (formData.password !== undefined && !formData.password.trim()) {
      notify("Veuillez entrer un mot de passe", "error");
      return false;
    }
    return true;
  };

  const handleAddAdmin = () => {
    if (handleValidateForm()) {
      onCreateAdmin(formData);
    }

    if (isError) {
      console.log(error);
      notify(error?.message, "error");
    }
  };

  const handleUpdateAdmin = () => {
    if (handleValidateForm()) {
      onUpdateAdmin(formData);
    }

    if (isUpdateError) {
      console.log(updateError);
      notify(updateError?.message, "error");
    }
  };

  return {
    roleList,
    isLoadingRoles,
    formData,
    setFormData,
    handleAddAdmin,
    isSubmitting: isSubmitting || isUpdating,
    isSuccess: isSuccess || isUpdateSuccess,
    isLoadingUserData,
    handleUpdateAdmin
  };
};
