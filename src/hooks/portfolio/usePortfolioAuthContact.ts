"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useMutationProvider } from "@/hooks/hooksProvider";
import { AuthServiceInstance } from "@/services/portfolio/authService";
import type { AuthPayload } from "@/services/portfolio/http";
import {
    ContactServiceInstance,
    type ContactPayload,
} from "@/services/portfolio/contactService";

/** Authentification admin (routes #13–#15) et contact public (#12). */

export const useLogin = () => {
    const { data, loading, isSuccess, isError, error, mutateAsync } =
        useMutationProvider<{ email: string; password: string }, AuthPayload>({
            mutationFn: (input) => AuthServiceInstance.login(input),
            successMessage: "",
        });

    return {
        data,
        loading,
        isSuccess,
        isError,
        error,
        login: (input: { email: string; password: string }) =>
            mutateAsync(input),
    };
};

/** Déconnexion : révoque le token puis ramène sur le login. */
export const useLogout = () => {
    const router = useRouter();
    return React.useCallback(async () => {
        await AuthServiceInstance.logout();
        router.replace("/admin/login");
    }, [router]);
};

export const useSendContact = () => {
    const { data, loading, isSuccess, isError, error, mutateAsync } =
        useMutationProvider<ContactPayload, null>({
            mutationFn: (payload) => ContactServiceInstance.send(payload),
            // Message de confirmation géré par le formulaire (plus riche)
            successMessage: "",
        });

    return {
        data,
        loading,
        isSuccess,
        isError,
        error,
        sendContact: (payload: ContactPayload) => mutateAsync(payload),
    };
};
