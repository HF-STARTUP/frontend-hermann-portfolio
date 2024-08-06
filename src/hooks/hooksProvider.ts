"use client"

import {useEffect, useState} from 'react';
import {useMutation, UseMutationResult, useQuery} from '@tanstack/react-query';
import notify from "@/utils/func/notification";


type UseSuperMutationOptions<TInput, TResult> = {
    mutationFn: (input: TInput) => Promise<TResult>;
    successMessage: string;
    updateMessage?: string | null;
};


type UseSuperMutationReturn<TInput, TResult> = {
    data: TResult | undefined;
    loading: boolean;
    isSuccess: boolean;
    isError: boolean;
    handleMutation: (inputData: TInput, update?: boolean) => void;
};


export function useMutationProvider<TInput, TResult>({
                                                         mutationFn,
                                                         successMessage,
                                                         updateMessage = null
                                                     }: UseSuperMutationOptions<TInput, TResult>): UseSuperMutationReturn<TInput, TResult> {
    const [loading, setLoading] = useState<boolean>(false);
    const [isUpdate, setIsUpdate] = useState<boolean>(false);

    const {
        mutate,
        isError,
        error,
        isSuccess,
        data
    }: UseMutationResult<TResult, Error, TInput> = useMutation<TResult, Error, TInput>({
        mutationFn: mutationFn,
    });

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
        data,
        loading,
        isSuccess,
        isError,
        handleMutation,
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
