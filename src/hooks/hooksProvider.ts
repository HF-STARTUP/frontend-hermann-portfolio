"use client"

import {useEffect, useState} from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import notify from "@/utils/func/notification";


type UseSuperMutationOptions<TInput, TResult> = {
    mutationFn: (input: TInput) => Promise<TResult>;
    successMessage: string;
    updateMessage?: string | null;
    onSuccess?: (data: TResult, variables: TInput, context: unknown) => void;
};

export function useMutationProvider<TInput, TResult>({
    mutationFn,
    successMessage,
    updateMessage = null,
    onSuccess,
}: UseSuperMutationOptions<TInput, TResult>) {
    const [isUpdate, setIsUpdate] = useState<boolean>(false);

    const mutation = useMutation<TResult, Error, TInput>({
        mutationFn,
        onSuccess: (data, variables, context) => {
            onSuccess?.(data, variables, context);
        },
    });

    const { mutate, isError, error, isSuccess, data } = mutation;

    useEffect(() => {
        if (isError && error) {
            notify(error.message, 'error');
        }
    }, [error, isError]);

    useEffect(() => {
        if (isSuccess) {
            const message = isUpdate ? updateMessage : successMessage;
            if (message) {
                notify(message, 'success');
            }
        }
    }, [isSuccess, isUpdate, updateMessage, successMessage]);

    const handleMutation = (inputData: TInput, update = false): void => {
        setIsUpdate(update);
        mutate(inputData);
    };

    // `loading` dérivé de l'état réel de la mutation : vrai pour mutate()
    // comme pour mutateAsync(). L'ancien flag manuel ne s'allumait que via
    // handleMutation — les boutons restaient inertes pendant les appels.
    return {
        ...mutation,
        handleMutation,
        loading: mutation.isPending,
    };
}

type UseSuperQueryOptions<TQueryFnData, TError> = {
    queryKey: unknown[];
    queryFn: () => Promise<TQueryFnData>;
    enabled?: boolean;
};

type UseSuperQueryReturn<TQueryFnData> = {
    isLoading: boolean;
    isFetching: boolean;
    isError: boolean;
    error: Error | null;
    data?: TQueryFnData;
    isSuccess: boolean;
};

export function useQueryProvider<TQueryFnData, TError = Error>(
    options: UseSuperQueryOptions<TQueryFnData, TError>
): UseSuperQueryReturn<TQueryFnData> {
    const { isPending, isFetching, isError, error, data, isSuccess } =
        useQuery<TQueryFnData, TError>({...options});

    return {
        // « Pas encore de données » — reste vrai après un échec réseau
        // (isLoading v5 = isPending && isFetching retombe à false), pour
        // qu'une vue affiche un squelette plutôt qu'un faux état vide.
        isLoading: isPending,
        isFetching,
        isError,
        error: error as Error | null,
        data,
        isSuccess,
    };
}
