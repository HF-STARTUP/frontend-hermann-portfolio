import PortfolioHttpService from "./PortfolioHttpService";
import { normalizeCertification, type RawCertification } from "./mappers";
import type { Certification } from "@/types/portfolio.type";

/** Routes #49 (public) et #57–#60 (admin) */

export const CertificationApiPath = {
    PublicList: "/certifications",
    AdminList: "/admin/certifications", // + /{id}
} as const;

class CertificationService extends PortfolioHttpService {
    /** Route #49 — liste publique, triée par sort_order asc. */
    getCertifications(): Promise<Certification[]> {
        return this.portfolioRequest<RawCertification[]>({
            url: CertificationApiPath.PublicList,
        }).then((items) => items.map(normalizeCertification));
    }

    /** Route #57 — liste admin complète. */
    getAdminCertifications(): Promise<Certification[]> {
        return this.portfolioRequest<RawCertification[]>({
            url: CertificationApiPath.AdminList,
        }).then((items) => items.map(normalizeCertification));
    }

    /** Route #58 — création. */
    createCertification(
        cert: Omit<Certification, "id">,
    ): Promise<Certification> {
        return this.portfolioRequest<RawCertification>({
            url: CertificationApiPath.AdminList,
            method: "POST",
            body: cert,
        }).then(normalizeCertification);
    }

    /** Route #59 — mise à jour. */
    updateCertification(
        id: string,
        patch: Partial<Certification>,
    ): Promise<Certification> {
        return this.portfolioRequest<RawCertification>({
            url: `${CertificationApiPath.AdminList}/${id}`,
            method: "PUT",
            body: patch,
        }).then(normalizeCertification);
    }

    /** Route #60 — suppression (204). */
    destroyCertification(id: string): Promise<void> {
        return this.portfolioRequest<void>({
            url: `${CertificationApiPath.AdminList}/${id}`,
            method: "DELETE",
        });
    }

    /** Invalide toutes les listes de certifications (public + admin). */
    invalidate() {
        void this.queryClient.invalidateQueries({
            queryKey: [CertificationApiPath.PublicList],
        });
        void this.queryClient.invalidateQueries({
            queryKey: [CertificationApiPath.AdminList],
        });
    }
}

export const CertificationServiceInstance = new CertificationService();
export default CertificationService;
