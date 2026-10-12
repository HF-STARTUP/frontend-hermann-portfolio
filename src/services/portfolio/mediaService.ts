import PortfolioHttpService from "./PortfolioHttpService";
import type { MediaItem } from "@/types/portfolio.type";

/** Routes #39–#41 — médiathèque admin */

export const MediaApiPath = {
    List: "/admin/media",
    Item: "/admin/media", // + /{id}
} as const;

class MediaService extends PortfolioHttpService {
    /** Route #39 */
    list(): Promise<MediaItem[]> {
        return this.portfolioRequest<MediaItem[]>({ url: MediaApiPath.List });
    }

    /**
     * Route #40 — multipart champ `file`. Le Service parent détecte les File
     * dans le body et bascule automatiquement en FormData.
     * Erreurs : 413 (taille > 3 Mo), 415 (type MIME refusé).
     */
    upload(file: File): Promise<MediaItem> {
        return this.portfolioRequest<MediaItem>({
            url: MediaApiPath.List,
            method: "POST",
            body: { file },
        });
    }

    /** Route #41 — 204 */
    destroy(id: string): Promise<void> {
        return this.portfolioRequest<void>({
            url: `${MediaApiPath.Item}/${id}`,
            method: "DELETE",
        });
    }

    invalidate() {
        void this.queryClient.invalidateQueries({ queryKey: ["/admin/media"] });
    }
}

export const MediaServiceInstance = new MediaService();
export default MediaService;
