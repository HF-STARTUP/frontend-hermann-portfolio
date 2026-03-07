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
    const [loading, setLoading] = useState<boolean>(false);
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
            setLoading(false);
        }
    }, [error, isError]);

    useEffect(() => {
        if (isSuccess) {
            const message = isUpdate ? updateMessage : successMessage;
            if (message) {
                notify(message, 'success');
            }
            setLoading(false);
        }
    }, [isSuccess, isUpdate, updateMessage, successMessage]);

    const handleMutation = (inputData: TInput, update = false): void => {
        setLoading(true);
        setIsUpdate(update);
        mutate(inputData);
    };

    return {
        ...mutation,
        handleMutation,
        loading,
    };
}

type UseSuperQueryOptions<TQueryFnData, TError> = {
    queryKey: unknown[];
    queryFn: () => Promise<TQueryFnData>;
    enabled?: boolean;
};

type UseSuperQueryReturn<TQueryFnData> = {
    isLoading: boolean;
    data?: TQueryFnData;
    isSuccess: boolean;
};

export function useQueryProvider<TQueryFnData, TError = Error>(
    options: UseSuperQueryOptions<TQueryFnData, TError>
): UseSuperQueryReturn<TQueryFnData> {
    const {isLoading, data, isSuccess} = useQuery<TQueryFnData, TError>({
        ...options
    });

    return {
        isLoading,
        data,
        isSuccess,
    };
}
