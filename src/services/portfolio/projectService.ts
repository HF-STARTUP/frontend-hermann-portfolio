import PortfolioHttpService from "./PortfolioHttpService";
import { denormalizeProjectLinks, normalizeProject, type RawProject } from "./mappers";
import type { Project } from "@/types/portfolio.type";
import { queryClient } from "@/app/_utils/network/reactQuery";

/** Routes #2–#3 (public) et #16–#20 (admin) */

export const ProjectApiPath = {
    PublicList: "/projects",
    PublicItem: "/projects", // + /{slug}
    AdminList: "/admin/projects",
    AdminItem: "/admin/projects", // + /{id}
} as const;

export const PROJECT_QUERY_KEYS = {
    list: ["projects"] as unknown[],
};

class ProjectService extends PortfolioHttpService {
    /* ---------------------- Public ---------------------- */

    /** Route #2 — ?featured=1&category=<id> */
    getProjects(query?: { featured?: boolean; category?: string }): Promise<Project[]> {
        return this.portfolioRequest<RawProject[]>({
            url: ProjectApiPath.PublicList,
            query: {
                featured:
                    query?.featured === undefined ? undefined : query.featured ? 1 : 0,
                category: query?.category,
            },
        }).then((projects) => projects.map(normalizeProject));
    }

    /** Route #3 */
    getProjectBySlug(slug: string): Promise<Project> {
        return this.portfolioRequest<RawProject>({
            url: `${ProjectApiPath.PublicItem}/${encodeURIComponent(slug)}`,
        }).then(normalizeProject);
    }

    /* ----------------------- Admin ----------------------- */

    /** Route #16 */
    getAdminProjects(): Promise<Project[]> {
        return this.portfolioRequest<RawProject[]> ({
            url: ProjectApiPath.AdminList,
        }).then((projects) => projects.map(normalizeProject));
    }

    /** Route #17 — 201 */
    createProject(project: Omit<Project, "id">): Promise<Project> {
        return this.portfolioRequest<RawProject>({
            url: ProjectApiPath.AdminList,
            method: "POST",
            body: this.toPayload(project),
        }).then(normalizeProject);
    }

    /** Route #19 */
    updateProject(id: string, project: Partial<Project>): Promise<Project> {
        return this.portfolioRequest<RawProject>({
            url: `${ProjectApiPath.AdminItem}/${id}`,
            method: "PUT",
            body: this.toPayload(project),
        }).then(normalizeProject);
    }

    /** Route #20 — 204 */
    destroyProject(id: string): Promise<void> {
        return this.portfolioRequest<void>({
            url: `${ProjectApiPath.AdminItem}/${id}`,
            method: "DELETE",
        });
    }

    /** Invalide toutes les listes de projets (public + admin). */
    invalidate() {
        void this.queryClient.invalidateQueries({ queryKey: ["/projects"] });
        void this.queryClient.invalidateQueries({ queryKey: ["/admin/projects"] });
    }

    /**
     * Interface TS Project → payload API : `links {demo,github}` est aplati
     * en `demoUrl`/`githubUrl` (StoreProjectRequest §6.3).
     */
    private toPayload(project: Partial<Project>) {
        const { links, ...rest } = project;
        return links !== undefined
            ? { ...rest, ...denormalizeProjectLinks(links) }
            : rest;
    }
}

export const ProjectServiceInstance = new ProjectService();
export default ProjectService;
