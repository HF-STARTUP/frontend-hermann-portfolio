"use client";

import React from "react";
import { useMutationProvider } from "@/hooks/hooksProvider";
import { TaxonomyServiceInstance } from "@/services/portfolio/taxonomyService";
import type {
    ProjectCategory,
    TechCategory,
    Technology,
} from "@/types/portfolio.type";

/** CRUD admin des catégories (routes #27–#34) et technologies (#35–#38). */

/* ------------------- Catégories de projets ------------------- */

export const useCreateProjectCategory = () => {
    const { data, loading, isSuccess, isError, error, mutateAsync } =
        useMutationProvider<Omit<ProjectCategory, "id">, ProjectCategory>({
            mutationFn: (input) =>
                TaxonomyServiceInstance.createProjectCategory(input),
            successMessage: "Catégorie créée.",
        });

    React.useEffect(() => {
        if (isSuccess && data) TaxonomyServiceInstance.invalidateProjectCategories();
    }, [isSuccess, data]);

    return {
        data,
        loading,
        isSuccess,
        isError,
        error,
        createCategory: (input: Omit<ProjectCategory, "id">) => mutateAsync(input),
    };
};

export const useUpdateProjectCategory = () => {
    const { data, loading, isSuccess, isError, error, mutateAsync } =
        useMutationProvider<Partial<ProjectCategory> & { id: string }, ProjectCategory>({
            mutationFn: ({ id, ...patch }) =>
                TaxonomyServiceInstance.updateProjectCategory(id, patch),
            successMessage: "Catégorie mise à jour.",
        });

    React.useEffect(() => {
        if (isSuccess && data) TaxonomyServiceInstance.invalidateProjectCategories();
    }, [isSuccess, data]);

    return {
        data,
        loading,
        isSuccess,
        isError,
        error,
        updateCategory: (input: Partial<ProjectCategory> & { id: string }) =>
            mutateAsync(input),
    };
};

export const useDeleteProjectCategory = () => {
    const { loading, isSuccess, isError, error, mutateAsync } =
        useMutationProvider<string, void>({
            mutationFn: (id) =>
                TaxonomyServiceInstance.destroyProjectCategory(id),
            successMessage: "Catégorie supprimée.",
        });

    React.useEffect(() => {
        if (isSuccess) TaxonomyServiceInstance.invalidateProjectCategories();
    }, [isSuccess]);

    return {
        loading,
        isSuccess,
        isError,
        error,
        deleteCategory: (id: string) => mutateAsync(id),
    };
};

/* ------------------ Catégories de technologies ------------------ */

export const useCreateTechCategory = () => {
    const { data, loading, isSuccess, isError, error, mutateAsync } =
        useMutationProvider<Omit<TechCategory, "id">, TechCategory>({
            mutationFn: (input) => TaxonomyServiceInstance.createTechCategory(input),
            successMessage: "Catégorie créée.",
        });

    React.useEffect(() => {
        if (isSuccess && data) TaxonomyServiceInstance.invalidateTechCategories();
    }, [isSuccess, data]);

    return {
        data,
        loading,
        isSuccess,
        isError,
        error,
        createCategory: (input: Omit<TechCategory, "id">) => mutateAsync(input),
    };
};

export const useUpdateTechCategory = () => {
    const { data, loading, isSuccess, isError, error, mutateAsync } =
        useMutationProvider<Partial<TechCategory> & { id: string }, TechCategory>({
            mutationFn: ({ id, ...patch }) =>
                TaxonomyServiceInstance.updateTechCategory(id, patch),
            successMessage: "Catégorie mise à jour.",
        });

    React.useEffect(() => {
        if (isSuccess && data) TaxonomyServiceInstance.invalidateTechCategories();
    }, [isSuccess, data]);

    return {
        data,
        loading,
        isSuccess,
        isError,
        error,
        updateCategory: (input: Partial<TechCategory> & { id: string }) =>
            mutateAsync(input),
    };
};

export const useDeleteTechCategory = () => {
    const { loading, isSuccess, isError, error, mutateAsync } =
        useMutationProvider<string, void>({
            mutationFn: (id) => TaxonomyServiceInstance.destroyTechCategory(id),
            successMessage: "Catégorie supprimée.",
        });

    React.useEffect(() => {
        if (isSuccess) TaxonomyServiceInstance.invalidateTechCategories();
    }, [isSuccess]);

    return {
        loading,
        isSuccess,
        isError,
        error,
        deleteCategory: (id: string) => mutateAsync(id),
    };
};

/* ------------------------- Technologies ------------------------- */

export interface TechnologyInput {
    name: string;
    categoryId: string;
    imageUrl?: string;
}

export const useCreateTechnology = () => {
    const { data, loading, isSuccess, isError, error, mutateAsync } =
        useMutationProvider<TechnologyInput, Technology>({
            mutationFn: (input) => TaxonomyServiceInstance.createTechnology(input),
            successMessage: "Technologie créée.",
        });

    React.useEffect(() => {
        if (isSuccess && data) TaxonomyServiceInstance.invalidateTechnologies();
    }, [isSuccess, data]);

    return {
        data,
        loading,
        isSuccess,
        isError,
        error,
        createTechnology: (input: TechnologyInput) => mutateAsync(input),
    };
};

export const useUpdateTechnology = () => {
    const { data, loading, isSuccess, isError, error, mutateAsync } =
        useMutationProvider<TechnologyInput & { id: string }, Technology>({
            mutationFn: ({ id, ...patch }) =>
                TaxonomyServiceInstance.updateTechnology(id, patch),
            successMessage: "Technologie mise à jour.",
        });

    React.useEffect(() => {
        if (isSuccess && data) TaxonomyServiceInstance.invalidateTechnologies();
    }, [isSuccess, data]);

    return {
        data,
        loading,
        isSuccess,
        isError,
        error,
        updateTechnology: (input: TechnologyInput & { id: string }) =>
            mutateAsync(input),
    };
};

export const useDeleteTechnology = () => {
    const { loading, isSuccess, isError, error, mutateAsync } =
        useMutationProvider<string, void>({
            mutationFn: (id) => TaxonomyServiceInstance.destroyTechnology(id),
            successMessage: "Technologie supprimée.",
        });

    React.useEffect(() => {
        if (isSuccess) TaxonomyServiceInstance.invalidateTechnologies();
    }, [isSuccess]);

    return {
        loading,
        isSuccess,
        isError,
        error,
        deleteTechnology: (id: string) => mutateAsync(id),
    };
};
