"use client";

import React from "react";
import { useMutationProvider } from "@/hooks/hooksProvider";
import { TimelineServiceInstance } from "@/services/portfolio/timelineService";
import { CertificationServiceInstance } from "@/services/portfolio/certificationService";
import type { Certification, Education, Experience } from "@/types/portfolio.type";

/**
 * CRUD admin du parcours professionnel (expériences, formations, certifications).
 * Les toasts succès/erreur sont émis par useMutationProvider ;
 * en cas de succès les listes publiques et admin sont invalidées.
 */

/* ========================= Expériences ========================= */

export const useCreateExperience = () => {
    const { data, loading, isSuccess, isError, error, mutateAsync } =
        useMutationProvider<Omit<Experience, "id">, Experience>({
            mutationFn: (input) =>
                TimelineServiceInstance.createExperience(input),
            successMessage: "Expérience créée avec succès.",
        });

    React.useEffect(() => {
        if (isSuccess && data) TimelineServiceInstance.invalidate();
    }, [isSuccess, data]);

    return {
        data,
        loading,
        isSuccess,
        isError,
        error,
        createExperience: (input: Omit<Experience, "id">) => mutateAsync(input),
    };
};

export const useUpdateExperience = () => {
    const { data, loading, isSuccess, isError, error, mutateAsync } =
        useMutationProvider<Partial<Experience> & { id: string }, Experience>({
            mutationFn: ({ id, ...patch }) =>
                TimelineServiceInstance.updateExperience(id, patch),
            successMessage: "Expérience mise à jour.",
        });

    React.useEffect(() => {
        if (isSuccess && data) TimelineServiceInstance.invalidate();
    }, [isSuccess, data]);

    return {
        data,
        loading,
        isSuccess,
        isError,
        error,
        updateExperience: (input: Partial<Experience> & { id: string }) =>
            mutateAsync(input),
    };
};

export const useDeleteExperience = () => {
    const { loading, isSuccess, isError, error, mutateAsync } =
        useMutationProvider<string, void>({
            mutationFn: (id) => TimelineServiceInstance.destroyExperience(id),
            successMessage: "Expérience supprimée.",
        });

    React.useEffect(() => {
        if (isSuccess) TimelineServiceInstance.invalidate();
    }, [isSuccess]);

    return {
        loading,
        isSuccess,
        isError,
        error,
        deleteExperience: (id: string) => mutateAsync(id),
    };
};

/* ========================= Formations ========================= */

export const useCreateEducation = () => {
    const { data, loading, isSuccess, isError, error, mutateAsync } =
        useMutationProvider<Omit<Education, "id">, Education>({
            mutationFn: (input) =>
                TimelineServiceInstance.createEducation(input),
            successMessage: "Formation créée avec succès.",
        });

    React.useEffect(() => {
        if (isSuccess && data) TimelineServiceInstance.invalidate();
    }, [isSuccess, data]);

    return {
        data,
        loading,
        isSuccess,
        isError,
        error,
        createEducation: (input: Omit<Education, "id">) => mutateAsync(input),
    };
};

export const useUpdateEducation = () => {
    const { data, loading, isSuccess, isError, error, mutateAsync } =
        useMutationProvider<Partial<Education> & { id: string }, Education>({
            mutationFn: ({ id, ...patch }) =>
                TimelineServiceInstance.updateEducation(id, patch),
            successMessage: "Formation mise à jour.",
        });

    React.useEffect(() => {
        if (isSuccess && data) TimelineServiceInstance.invalidate();
    }, [isSuccess, data]);

    return {
        data,
        loading,
        isSuccess,
        isError,
        error,
        updateEducation: (input: Partial<Education> & { id: string }) =>
            mutateAsync(input),
    };
};

export const useDeleteEducation = () => {
    const { loading, isSuccess, isError, error, mutateAsync } =
        useMutationProvider<string, void>({
            mutationFn: (id) => TimelineServiceInstance.destroyEducation(id),
            successMessage: "Formation supprimée.",
        });

    React.useEffect(() => {
        if (isSuccess) TimelineServiceInstance.invalidate();
    }, [isSuccess]);

    return {
        loading,
        isSuccess,
        isError,
        error,
        deleteEducation: (id: string) => mutateAsync(id),
    };
};

/* ======================= Certifications ======================= */

export const useCreateCertification = () => {
    const { data, loading, isSuccess, isError, error, mutateAsync } =
        useMutationProvider<Omit<Certification, "id">, Certification>({
            mutationFn: (input) =>
                CertificationServiceInstance.createCertification(input),
            successMessage: "Certification créée avec succès.",
        });

    React.useEffect(() => {
        if (isSuccess && data) CertificationServiceInstance.invalidate();
    }, [isSuccess, data]);

    return {
        data,
        loading,
        isSuccess,
        isError,
        error,
        createCertification: (input: Omit<Certification, "id">) =>
            mutateAsync(input),
    };
};

export const useUpdateCertification = () => {
    const { data, loading, isSuccess, isError, error, mutateAsync } =
        useMutationProvider<
            Partial<Certification> & { id: string },
            Certification
        >({
            mutationFn: ({ id, ...patch }) =>
                CertificationServiceInstance.updateCertification(id, patch),
            successMessage: "Certification mise à jour.",
        });

    React.useEffect(() => {
        if (isSuccess && data) CertificationServiceInstance.invalidate();
    }, [isSuccess, data]);

    return {
        data,
        loading,
        isSuccess,
        isError,
        error,
        updateCertification: (
            input: Partial<Certification> & { id: string },
        ) => mutateAsync(input),
    };
};

export const useDeleteCertification = () => {
    const { loading, isSuccess, isError, error, mutateAsync } =
        useMutationProvider<string, void>({
            mutationFn: (id) =>
                CertificationServiceInstance.destroyCertification(id),
            successMessage: "Certification supprimée.",
        });

    React.useEffect(() => {
        if (isSuccess) CertificationServiceInstance.invalidate();
    }, [isSuccess]);

    return {
        loading,
        isSuccess,
        isError,
        error,
        deleteCertification: (id: string) => mutateAsync(id),
    };
};
