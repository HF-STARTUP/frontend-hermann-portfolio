"use client";

import React from "react";
import { useMutationProvider } from "@/hooks/hooksProvider";
import { ProjectServiceInstance } from "@/services/portfolio/projectService";
import type { Project } from "@/types/portfolio.type";

/**
 * CRUD admin des projets (routes #16–#20).
 * Les toasts succès/erreur sont émis par useMutationProvider (notify) ;
 * en cas de succès les listes publiques et admin sont invalidées.
 */

export const useCreateProject = () => {
    const { data, loading, isSuccess, isError, error, mutateAsync, handleMutation } =
        useMutationProvider<Omit<Project, "id">, Project>({
            mutationFn: (input) => ProjectServiceInstance.createProject(input),
            successMessage: "Projet créé avec succès.",
        });

    React.useEffect(() => {
        if (isSuccess && data) ProjectServiceInstance.invalidate();
    }, [isSuccess, data]);

    return {
        data,
        loading,
        isSuccess,
        isError,
        error,
        handleMutation,
        createProject: (input: Omit<Project, "id">) => mutateAsync(input),
    };
};

export const useUpdateProject = () => {
    const { data, loading, isSuccess, isError, error, mutateAsync, handleMutation } =
        useMutationProvider<Partial<Project> & { id: string }, Project>({
            mutationFn: ({ id, ...patch }) =>
                ProjectServiceInstance.updateProject(id, patch),
            successMessage: "Projet mis à jour.",
        });

    React.useEffect(() => {
        if (isSuccess && data) ProjectServiceInstance.invalidate();
    }, [isSuccess, data]);

    return {
        data,
        loading,
        isSuccess,
        isError,
        error,
        handleMutation,
        updateProject: (input: Partial<Project> & { id: string }) =>
            mutateAsync(input),
    };
};

export const useDeleteProject = () => {
    const { loading, isSuccess, isError, error, mutateAsync } =
        useMutationProvider<string, void>({
            mutationFn: (id) => ProjectServiceInstance.destroyProject(id),
            successMessage: "Projet supprimé.",
        });

    React.useEffect(() => {
        if (isSuccess) ProjectServiceInstance.invalidate();
    }, [isSuccess]);

    return {
        loading,
        isSuccess,
        isError,
        error,
        deleteProject: (id: string) => mutateAsync(id),
    };
};
