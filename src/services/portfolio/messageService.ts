import PortfolioHttpService from "./PortfolioHttpService";
import type { ContactMessage } from "@/types/portfolio.type";

/** Routes #42–#44 — messages de contact (admin) */

export interface PaginatedMessages {
    items: ContactMessage[];
    pagination: {
        currentPage: number;
        lastPage: number;
        perPage: number;
        total: number;
    };
}

export const MessageApiPath = {
    List: "/admin/messages",
    Read: "/admin/messages", // + /{id}/read
    Item: "/admin/messages", // + /{id}
} as const;

class MessageService extends PortfolioHttpService {
    /** Route #42 — paginé 15/page, filtres read / q. */
    list(query?: {
        page?: number;
        read?: boolean;
        q?: string;
    }): Promise<PaginatedMessages> {
        return this.portfolioRequest<PaginatedMessages>({
            url: MessageApiPath.List,
            query,
        });
    }

    /** Route #43 */
    setRead(id: string, read: boolean): Promise<ContactMessage> {
        return this.portfolioRequest<ContactMessage>({
            url: `${MessageApiPath.Read}/${id}/read`,
            method: "PATCH",
            body: { read },
        });
    }

    /** Route #44 — 204, suppression définitive. */
    destroy(id: string): Promise<void> {
        return this.portfolioRequest<void>({
            url: `${MessageApiPath.Item}/${id}`,
            method: "DELETE",
        });
    }

    invalidate() {
        void this.queryClient.invalidateQueries({ queryKey: ["/admin/messages"] });
    }
}

export const MessageServiceInstance = new MessageService();
export default MessageService;
