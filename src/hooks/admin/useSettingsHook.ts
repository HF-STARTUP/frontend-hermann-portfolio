import TicketService from "@/services/admin/ticket/ticketService";
import React from "react";
import {useRouter} from "next/navigation";
import {
    AddAdminInput,
    AddAdminOnCityInput,
    RemoveAdminOnCityInput,
    UpdatePasswordInput,
    UpdateProfileInput
} from "@/schema/ADMIN/settings.schema";
import SettingsService, {SettingsApiPath} from "@/services/admin/settings/settingsService";
import LoginService from "@/services/__form/auth/LoginService";
import {useMutationProvider, useQueryProvider} from "@/hooks/hooksProvider";
import { GetAdminsParams } from "@/types/__form/profile.type";
import RoleService from "@/services/admin/RoleAccessService";

export const useUpdateProfile = () => {

    const $router = useRouter()

    const {
        data,
        loading,
        isSuccess,
        isError,
        handleMutation,
    } = useMutationProvider({
        mutationFn: SettingsService.updateProfile,
        successMessage: "Profil MAJ.",
        updateMessage: "Profil MAJ.",
    });


    const onUpdateProfile = (data: UpdateProfileInput) => {
        handleMutation(data)
    }

    React.useEffect(() => {
        if (data && isSuccess) {
            void TicketService.invalidMessages()
        }
    }, [isSuccess, data])

    React.useEffect(() => {
        if (data && isSuccess) {
            void LoginService.refreshProfile()
        }
    }, [data, isSuccess])


    return {
        data,
        loading,
        isSuccess,
        onUpdateProfile,
    }

}

export const useUpdatePassword = () => {

    const {
        data,
        loading,
        isSuccess,
        isError,
        handleMutation,
    } = useMutationProvider({
        mutationFn: SettingsService.updatePassword,
        successMessage: "Mot de passe MAJ.",
        updateMessage: "Mot de passe MAJ.",
    });

    const onUpdatePassword = (data: UpdatePasswordInput) => {
        handleMutation(data)
    }

    React.useEffect(() => {
        if (data && isSuccess) {
            void TicketService.invalidMessages()
        }
    }, [isSuccess, data])


    return {
        data,
        loading,
        isSuccess,
        onUpdatePassword,
    }

}

export const useGetAdminAccess = () => {

    const {isLoading, data} = useQueryProvider({
        queryKey: [SettingsApiPath.AdminAccess],
        queryFn: () => SettingsService.getAdminAccess(),
    });

    return {isLoading, data};
};

export const useGetAdminList = (params: GetAdminsParams) => {

    const {isLoading, data} = useQueryProvider({
        queryKey: [SettingsApiPath.AdminList, params],
        queryFn: () => SettingsService.getAdminList(params),
    });

    return {isLoading, data};
};

export const useGetAdmin = (id?: string) => {    
    const {isLoading, data} = useQueryProvider({
        queryKey: [SettingsApiPath.AdminData, id],
        queryFn: () => SettingsService.getAdmin(id),
        enabled: !!id
    });

    return {isLoading, data};
};

export const useUpdateAdmin = (id?: string) => {

    const {
        data,
        loading,
        isSuccess,
        isError,
        error,
        handleMutation,
    } = useMutationProvider({
        mutationFn: (data: AddAdminInput) => SettingsService.updateAdmin(id!, data),
        successMessage: "Admin mis à jour avec succès.",
    });

    const onUpdateAdmin = (data: AddAdminInput) => {      
        if (!id) {
            console.error("Impossible de mettre à jour : l'ID est manquant");
            return;
        }
        handleMutation(data)
    }

    React.useEffect(() => {
        if (isSuccess && data) {
            void SettingsService.refreshAdmins()
            void RoleService.invalidRolesList()
        }
    }, [isSuccess, data])

    return {
        data,
        loading,
        isSuccess,
        isError,
        error,
        onUpdateAdmin,        
    }
}


export const useCreateAdmin = () => {

    const {
        data,
        loading,
        isSuccess,
        isError,
        error,
        handleMutation,
    } = useMutationProvider({
        mutationFn: SettingsService.createNewAdmin,
        successMessage: "Admin ajouté avec succès.",
    });

    const onCreateAdmin = (data: AddAdminInput) => {
        handleMutation(data)
    }

    React.useEffect(() => {
        if (isSuccess && data) {
            void SettingsService.refreshAdmins()
            void RoleService.invalidRolesList()
        }
    }, [isSuccess, data])

    return {
        data,
        loading,
        isSuccess,
        isError,
        error,
        onCreateAdmin,        
    }
}

export const useAddAdminOnCity = () => {

    const {
        data,
        loading,
        isSuccess,
        isError,
        handleMutation,
    } = useMutationProvider({
        mutationFn: SettingsService.addAdminOnCity,
        successMessage: "Ville associer à l'admin.",
    });

    const onAddAdminOnCity = (data: AddAdminOnCityInput) => {
        handleMutation(data)
    }

    React.useEffect(() => {
        if (isSuccess && data) {
            void SettingsService.refreshAdmins()
            void LoginService.refreshProfile()
        }
    }, [isSuccess, data])

    return {
        data,
        loading,
        isSuccess,
        onAddAdminOnCity,
    }

}

export const useRemoveAdminOnCity = () => {

    const {
        data,
        loading,
        isSuccess,
        isError,
        handleMutation,
    } = useMutationProvider({
        mutationFn: SettingsService.removeAdminOnCity,
        successMessage: "Ville dissocier de l'admin.",
    });

    const onRemoveAdmonOnCity = (data: RemoveAdminOnCityInput) => {
        handleMutation(data)
    }

    React.useEffect(() => {
        if (data && isSuccess) {
            void SettingsService.refreshAdmins()
            void LoginService.refreshProfile()
        }
    }, [isSuccess, data])

    return {
        data,
        loading,
        isSuccess,
        onRemoveAdmonOnCity,
    }

}

export const useDeactivateOrActivateAdmin = () => {
    const {
        data,
        loading,
        isSuccess,
        isError,
        handleMutation,
    } = useMutationProvider({
        mutationFn: SettingsService.deactivateActivate,
        successMessage: "Status mise à jour",
    });

    const onToggleStatus = (id: string) => {
        handleMutation({id})
    }

    React.useEffect(() => {
        if (data && isSuccess) {
            void SettingsService.refreshAdmins()
        }
    }, [isSuccess, data])

    return {
        data,
        loading,
        isSuccess,
        onToggleStatus,
    }

}


export const useDefinitiveDeleteFleet = () => {

    const {
        data,
        isSuccess,
        ...options
    } = useMutationProvider({
        mutationFn: SettingsService.deleteFleet,
        successMessage: "Flotte suprimé.",
    })

    const $router= useRouter()

    React.useEffect(() => {
        if(isSuccess && data){
            $router.replace("/app/fleet")
            $router.refresh()
        }
    }, [isSuccess, data])

    return {
        data,
        isSuccess,
        ...options
    }

}