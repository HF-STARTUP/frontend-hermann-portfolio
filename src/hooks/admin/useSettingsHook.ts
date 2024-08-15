import {useMutation} from "@tanstack/react-query";
import TicketService from "@/services/admin/ticket/ticketService";
import React from "react";
import {useRouter} from "next/navigation";
import {UpdatePasswordInput, UpdateProfileInput} from "@/schema/ADMIN/settings.schema";
import SettingsService from "@/services/admin/settings/settingsService";
import LoginService from "@/services/__form/auth/LoginService";
import {useMutationProvider} from "@/hooks/hooksProvider";
import ClientService from "@/services/ClientService";
import {useUserProfile} from "@/hooks/__form/auth/useUserProfile";

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
