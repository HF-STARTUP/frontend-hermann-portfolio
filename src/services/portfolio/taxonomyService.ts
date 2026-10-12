import PortfolioHttpService from "./PortfolioHttpService";
import { normalizeTechnology } from "./mappers";
import type {
    ProjectCategory,
    TechCategory,
    Technology,
} from "@/types/portfolio.type";

/** Routes #6–#8 (public) et #27–#38 (admin) */

export const TaxonomyApiPath = {
    PublicProjectCategories: "/project-categories",
    PublicTechCategories: "/tech-categories",
    PublicTechnologies: "/technologies",
    AdminProjectCategories: "/admin/project-categories", // + /{id}
    AdminTechCategories: "/admin/tech-categories", // + /{id}
    AdminTechnologies: "/admin/technologies", // + /{id}
} as const;

class TaxonomyService extends PortfolioHttpService {
    /* ---------------------- Public ---------------------- */

    /** Route #6 */
    getProjectCategories(): Promise<ProjectCategory[]> {
        return this.portfolioRequest<ProjectCategory[]>({
            url: TaxonomyApiPath.PublicProjectCategories,
        });
    }

    /** Route #7 */
    getTechCategories(): Promise<TechCategory[]> {
        return this.portfolioRequest<TechCategory[]>({
            url: TaxonomyApiPath.PublicTechCategories,
        });
    }

    /** Route #8 — ?categoryId=<id> ; réattache l'icône marque seed par nom. */
    getTechnologies(query?: { categoryId?: string }): Promise<Technology[]> {
        return this.portfolioRequest<Technology[]>({
            url: TaxonomyApiPath.PublicTechnologies,
            query: { categoryId: query?.categoryId },
        }).then((technologies) => technologies.map(normalizeTechnology));
    }

    /* ----------------------- Admin ----------------------- */

    /** Routes #27 / #31 / #35 */
    getAdminList(resource: "project-categories" | "tech-categories" | "technologies") {
        return this.portfolioRequest<
            ProjectCategory[] | TechCategory[] | Technology[]
        >({ url: `/admin/${resource}` });
    }

    /** Route #28 — 201 */
    createProjectCategory(category: Omit<ProjectCategory, "id">): Promise<ProjectCategory> {
        return this.portfolioRequest<ProjectCategory>({
            url: TaxonomyApiPath.AdminProjectCategories,
            method: "POST",
            body: category,
        });
    }

    updateProjectCategory(
        id: string,
        category: Partial<ProjectCategory>,
    ): Promise<ProjectCategory> {
        return this.portfolioRequest<ProjectCategory>({
            url: `${TaxonomyApiPath.AdminProjectCategories}/${id}`,
            method: "PUT",
            body: category,
        });
    }

    /** Route #30 — 409 si référencée (data.usages) */
    destroyProjectCategory(id: string): Promise<void> {
        return this.portfolioRequest<void>({
            url: `${TaxonomyApiPath.AdminProjectCategories}/${id}`,
            method: "DELETE",
        });
    }

    createTechCategory(category: Omit<TechCategory, "id">): Promise<TechCategory> {
        return this.portfolioRequest<TechCategory>({
            url: TaxonomyApiPath.AdminTechCategories,
            method: "POST",
            body: category,
        });
    }

    updateTechCategory(id: string, category: Partial<TechCategory>): Promise<TechCategory> {
        return this.portfolioRequest<TechCategory>({
            url: `${TaxonomyApiPath.AdminTechCategories}/${id}`,
            method: "PUT",
            body: category,
        });
    }

    destroyTechCategory(id: string): Promise<void> {
        return this.portfolioRequest<void>({
            url: `${TaxonomyApiPath.AdminTechCategories}/${id}`,
            method: "DELETE",
        });
    }

    /** Route #36 — 201 */
    createTechnology(technology: Omit<Technology, "id" | "icon">): Promise<Technology> {
        return this.portfolioRequest<Technology>({
            url: TaxonomyApiPath.AdminTechnologies,
            method: "POST",
            body: technology,
        });
    }

    updateTechnology(
        id: string,
        technology: Partial<Omit<Technology, "icon">>,
    ): Promise<Technology> {
        return this.portfolioRequest<Technology>({
            url: `${TaxonomyApiPath.AdminTechnologies}/${id}`,
            method: "PUT",
            body: technology,
        });
    }

    destroyTechnology(id: string): Promise<void> {
        return this.portfolioRequest<void>({
            url: `${TaxonomyApiPath.AdminTechnologies}/${id}`,
            method: "DELETE",
        });
    }

    invalidateProjectCategories() {
        void this.queryClient.invalidateQueries({
            queryKey: ["/project-categories"],
        });
        void this.queryClient.invalidateQueries({
            queryKey: ["/admin/project-categories"],
        });
    }

    invalidateTechCategories() {
        void this.queryClient.invalidateQueries({
            queryKey: ["/tech-categories"],
        });
        void this.queryClient.invalidateQueries({
            queryKey: ["/admin/tech-categories"],
        });
    }

    invalidateTechnologies() {
        void this.queryClient.invalidateQueries({ queryKey: ["/technologies"] });
        void this.queryClient.invalidateQueries({
            queryKey: ["/admin/technologies"],
        });
    }
}

export const TaxonomyServiceInstance = new TaxonomyService();
export default TaxonomyService;
