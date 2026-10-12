import PortfolioHttpService from "./PortfolioHttpService";
import type { Education, Experience } from "@/types/portfolio.type";

/** Routes #9–#10 (public) et #47–#48 (admin) */

export const TimelineApiPath = {
    PublicExperiences: "/experiences",
    PublicEducation: "/education",
    AdminExperience: "/admin/experiences", // + /{id}
    AdminEducation: "/admin/education", // + /{id}
} as const;

class TimelineService extends PortfolioHttpService {
    /** Route #9 — triées sort_order asc. */
    getExperiences(): Promise<Experience[]> {
        return this.portfolioRequest<Experience[]>({
            url: TimelineApiPath.PublicExperiences,
        });
    }

    /** Route #10 */
    getEducation(): Promise<Education[]> {
        return this.portfolioRequest<Education[]>({
            url: TimelineApiPath.PublicEducation,
        });
    }

    /* ----------------------- Admin — Expériences ----------------------- */

    /** Liste admin (GET /admin/experiences) */
    getAdminExperiences(): Promise<Experience[]> {
        return this.portfolioRequest<Experience[]>({
            url: TimelineApiPath.AdminExperience,
        });
    }

    /** Crée une expérience (POST /admin/experiences) */
    createExperience(experience: Omit<Experience, "id">): Promise<Experience> {
        return this.portfolioRequest<Experience>({
            url: TimelineApiPath.AdminExperience,
            method: "POST",
            body: experience,
        });
    }

    /** Met à jour une expérience (PUT /admin/experiences/{id}) — route #47 */
    updateExperience(id: string, patch: Partial<Experience>): Promise<Experience> {
        return this.portfolioRequest<Experience>({
            url: `${TimelineApiPath.AdminExperience}/${id}`,
            method: "PUT",
            body: patch,
        });
    }

    /** Supprime une expérience (DELETE /admin/experiences/{id}) */
    destroyExperience(id: string): Promise<void> {
        return this.portfolioRequest<void>({
            url: `${TimelineApiPath.AdminExperience}/${id}`,
            method: "DELETE",
        });
    }

    /* ----------------------- Admin — Formation ----------------------- */

    /** Liste admin (GET /admin/education) */
    getAdminEducation(): Promise<Education[]> {
        return this.portfolioRequest<Education[]>({
            url: TimelineApiPath.AdminEducation,
        });
    }

    /** Crée une formation (POST /admin/education) */
    createEducation(education: Omit<Education, "id">): Promise<Education> {
        return this.portfolioRequest<Education>({
            url: TimelineApiPath.AdminEducation,
            method: "POST",
            body: education,
        });
    }

    /** Met à jour une formation (PUT /admin/education/{id}) — route #48 */
    updateEducation(id: string, patch: Partial<Education>): Promise<Education> {
        return this.portfolioRequest<Education>({
            url: `${TimelineApiPath.AdminEducation}/${id}`,
            method: "PUT",
            body: patch,
        });
    }

    /** Supprime une formation (DELETE /admin/education/{id}) */
    destroyEducation(id: string): Promise<void> {
        return this.portfolioRequest<void>({
            url: `${TimelineApiPath.AdminEducation}/${id}`,
            method: "DELETE",
        });
    }

    /** Invalide toutes les listes de parcours (public + admin). */
    invalidate() {
        void this.queryClient.invalidateQueries({ queryKey: ["/experiences"] });
        void this.queryClient.invalidateQueries({ queryKey: ["/education"] });
        void this.queryClient.invalidateQueries({ queryKey: [TimelineApiPath.AdminExperience] });
        void this.queryClient.invalidateQueries({ queryKey: [TimelineApiPath.AdminEducation] });
    }
}

export const TimelineServiceInstance = new TimelineService();
export default TimelineService;
