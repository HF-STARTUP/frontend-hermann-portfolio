import TicketService from "@/services/admin/ticket/ticketService";
import React from "react";
import {useRouter} from "next/navigation";
import {
    AddAdminInput,
    AddAdminOnCityInput, RemoveAdminOnCityInput,
    UpdatePasswordInput,
    UpdateProfileInput
} from "@/schema/ADMIN/settings.schema";
import SettingsService, {SettingsApiPath} from "@/services/admin/settings/settingsService";
import LoginService from "@/services/__form/auth/LoginService";
import {useMutationProvider, useQueryProvider} from "@/hooks/hooksProvider";

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
        void TicketService.invalidMessages()
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
        void TicketService.invalidMessages()
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

export const useGetAdminList = () => {

    const {isLoading, data} = useQueryProvider({
        queryKey: [SettingsApiPath.AdminList],
        queryFn: () => SettingsService.getAdminList(),
    });

    return {isLoading, data};
};


export const useCreateAdmin = () => {

    const {
        data,
        loading,
        isSuccess,
        isError,
        handleMutation,
    } = useMutationProvider({
        mutationFn: SettingsService.createNewAdmin,
        successMessage: "Admin ajouté.",
    });

    const onCreateAdmin = (data: AddAdminInput) => {
        handleMutation(data)
    }

    React.useEffect(() => {
        void SettingsService.refreshAdmins()
    }, [isSuccess, data])

    return {
        data,
        loading,
        isSuccess,
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
        void SettingsService.refreshAdmins()
        void LoginService.refreshProfile()
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
        void SettingsService.refreshAdmins()
        void LoginService.refreshProfile()
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
        void SettingsService.refreshAdmins()
    }, [isSuccess, data])

    return {
        data,
        loading,
        isSuccess,
        onToggleStatus,
    }

}