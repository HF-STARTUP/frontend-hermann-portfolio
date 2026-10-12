"use client";

import React from "react";
import { useMutationProvider } from "@/hooks/hooksProvider";
import { SiteContentServiceInstance } from "@/services/portfolio/siteContentService";
import type { SiteContentSection, SocialLink } from "@/types/portfolio.type";

/** Contenu du site (#45), liens sociaux (#46), parcours (#47–#48). */

export const usePatchSiteContent = () => {
    const { data, loading, isSuccess, isError, error, mutateAsync } =
        useMutationProvider<
            { section: SiteContentSection; patch: object },
            Record<string, unknown>
        >({
            mutationFn: ({ section, patch }) =>
                SiteContentServiceInstance.patchSection(section, patch),
            // Le message de succès est laissé à l'appelant (par onglet)
            successMessage: "",
        });

    React.useEffect(() => {
        if (isSuccess && data) SiteContentServiceInstance.invalidateSiteContent();
    }, [isSuccess, data]);

    return {
        data,
        loading,
        isSuccess,
        isError,
        error,
        patchSection: (section: SiteContentSection, patch: object) =>
            mutateAsync({ section, patch }),
    };
};

export const useUpdateSocialLinks = () => {
    const { data, loading, isSuccess, isError, error, mutateAsync } =
        useMutationProvider<SocialLink[], SocialLink[]>({
            mutationFn: (links) =>
                SiteContentServiceInstance.putSocialLinks(
                    links.map(({ label, url, iconName }) => ({
                        label,
                        url,
                        iconName,
                    })),
                ),
            // Silencieux : le formulaire affiche un unique toast de succès.
            successMessage: "",
        });

    React.useEffect(() => {
        if (isSuccess && data) SiteContentServiceInstance.invalidateSocialLinks();
    }, [isSuccess, data]);

    return {
        data,
        loading,
        isSuccess,
        isError,
        error,
        updateSocialLinks: (links: SocialLink[]) => mutateAsync(links),
    };
};
