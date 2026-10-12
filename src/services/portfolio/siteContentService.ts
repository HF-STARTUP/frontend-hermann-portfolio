import PortfolioHttpService from "./PortfolioHttpService";
import type {
    SiteContent,
    SiteContentSection,
    SocialLink,
} from "@/types/portfolio.type";

/** Routes #1, #11 (public) et #45–#48 (admin) */

export const SiteContentApiPath = {
    PublicSiteContent: "/site-content",
    PublicSocialLinks: "/social-links",
    AdminSection: "/admin/site-content", // + /{section}
    AdminSocialLinks: "/admin/social-links",
} as const;

class SiteContentService extends PortfolioHttpService {
    /* ---------------------- Public ---------------------- */

    /** Route #1 — arbre complet du contenu éditable. */
    getSiteContent(): Promise<SiteContent> {
        return this.portfolioRequest<SiteContent>({
            url: SiteContentApiPath.PublicSiteContent,
        });
    }

    /** Route #11 */
    getSocialLinks(): Promise<SocialLink[]> {
        return this.portfolioRequest<SocialLink[]>({
            url: SiteContentApiPath.PublicSocialLinks,
        });
    }

    /* ----------------------- Admin ----------------------- */

    /**
     * Route #45 — PATCH par section (fusion) : le corps EST le patch.
     * Renvoie la section fusionnée complète.
     */
    patchSection<K extends SiteContentSection>(
        section: K,
        patch: object,
    ): Promise<Record<string, unknown>> {
        return this.portfolioRequest<Record<string, unknown>>({
            url: `${SiteContentApiPath.AdminSection}/${section}`,
            method: "PATCH",
            body: patch as Record<string, unknown>,
        });
    }

    /** Route #46 — remplacement complet : corps { links: [...] }. */
    putSocialLinks(links: Omit<SocialLink, "id">[]): Promise<SocialLink[]> {
        return this.portfolioRequest<SocialLink[]>({
            url: SiteContentApiPath.AdminSocialLinks,
            method: "PUT",
            body: { links },
        });
    }

    invalidateSiteContent() {
        void this.queryClient.invalidateQueries({ queryKey: ["/site-content"] });
    }

    invalidateSocialLinks() {
        void this.queryClient.invalidateQueries({ queryKey: ["/social-links"] });
    }
}

export const SiteContentServiceInstance = new SiteContentService();
export default SiteContentService;
