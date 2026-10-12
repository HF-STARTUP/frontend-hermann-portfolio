"use client";

import React from "react";
import { useMutationProvider } from "@/hooks/hooksProvider";
import { BlogPostServiceInstance } from "@/services/portfolio/blogPostService";
import type { BlogPost } from "@/types/portfolio.type";

/** CRUD admin des articles (routes #21–#26). */

export const useCreateBlogPost = () => {
    const { data, loading, isSuccess, isError, error, mutateAsync } =
        useMutationProvider<Omit<BlogPost, "id">, BlogPost>({
            mutationFn: (input) => BlogPostServiceInstance.createBlogPost(input),
            successMessage: "Article publié.",
        });

    React.useEffect(() => {
        if (isSuccess && data) BlogPostServiceInstance.invalidate();
    }, [isSuccess, data]);

    return {
        data,
        loading,
        isSuccess,
        isError,
        error,
        createPost: (input: Omit<BlogPost, "id">) => mutateAsync(input),
    };
};

export const useUpdateBlogPost = () => {
    const { data, loading, isSuccess, isError, error, mutateAsync } =
        useMutationProvider<Partial<BlogPost> & { id: string }, BlogPost>({
            mutationFn: ({ id, ...patch }) =>
                BlogPostServiceInstance.updateBlogPost(id, patch),
            successMessage: "Article mis à jour.",
        });

    React.useEffect(() => {
        if (isSuccess && data) BlogPostServiceInstance.invalidate();
    }, [isSuccess, data]);

    return {
        data,
        loading,
        isSuccess,
        isError,
        error,
        updatePost: (input: Partial<BlogPost> & { id: string }) =>
            mutateAsync(input),
    };
};

export const useDeleteBlogPost = () => {
    const { loading, isSuccess, isError, error, mutateAsync } =
        useMutationProvider<string, void>({
            mutationFn: (id) => BlogPostServiceInstance.destroyBlogPost(id),
            successMessage: "Article supprimé.",
        });

    React.useEffect(() => {
        if (isSuccess) BlogPostServiceInstance.invalidate();
    }, [isSuccess]);

    return { loading, isSuccess, isError, error, deletePost: (id: string) => mutateAsync(id) };
};
