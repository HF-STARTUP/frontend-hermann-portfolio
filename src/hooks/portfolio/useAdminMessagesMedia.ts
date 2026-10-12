"use client";

import React from "react";
import { useMutationProvider, useQueryProvider } from "@/hooks/hooksProvider";
import {
    MessageServiceInstance,
    type PaginatedMessages,
} from "@/services/portfolio/messageService";
import { MediaServiceInstance } from "@/services/portfolio/mediaService";
import type { MediaItem } from "@/types/portfolio.type";

/** Messages de contact (routes #42–#44) et médiathèque (#39–#41). */

export interface MessagesQueryParams {
    page?: number;
    read?: boolean;
    q?: string;
}

export const useMessagesQuery = (params: MessagesQueryParams = {}) =>
    useQueryProvider<PaginatedMessages, Error>({
        queryKey: ["/admin/messages", params],
        queryFn: () => MessageServiceInstance.list(params),
    });

export const useSetMessageRead = () => {
    const { data, loading, isSuccess, isError, error, mutateAsync } =
        useMutationProvider<{ id: string; read: boolean }, unknown>({
            mutationFn: ({ id, read }) => MessageServiceInstance.setRead(id, read),
            // Marquage discret : pas de toast de succès
            successMessage: "",
        });

    React.useEffect(() => {
        if (isSuccess) MessageServiceInstance.invalidate();
    }, [isSuccess]);

    return {
        data,
        loading,
        isSuccess,
        isError,
        error,
        setRead: (id: string, read: boolean) => mutateAsync({ id, read }),
    };
};

export const useDeleteMessage = () => {
    const { loading, isSuccess, isError, error, mutateAsync } =
        useMutationProvider<string, void>({
            mutationFn: (id) => MessageServiceInstance.destroy(id),
            successMessage: "Message supprimé.",
        });

    React.useEffect(() => {
        if (isSuccess) MessageServiceInstance.invalidate();
    }, [isSuccess]);

    return { loading, isSuccess, isError, error, deleteMessage: (id: string) => mutateAsync(id) };
};

/* ------------------------- Médiathèque ------------------------- */

export const useMediaLibraryQuery = () =>
    useQueryProvider<MediaItem[], Error>({
        queryKey: ["/admin/media"],
        queryFn: () => MediaServiceInstance.list(),
    });

export const useUploadMedia = () => {
    const { data, loading, isSuccess, isError, error, mutateAsync } =
        useMutationProvider<File, MediaItem>({
            mutationFn: (file) => MediaServiceInstance.upload(file),
            successMessage: "Image importée dans la médiathèque.",
        });

    React.useEffect(() => {
        if (isSuccess && data) MediaServiceInstance.invalidate();
    }, [isSuccess, data]);

    return {
        data,
        loading,
        isSuccess,
        isError,
        error,
        uploadMedia: (file: File) => mutateAsync(file),
    };
};
