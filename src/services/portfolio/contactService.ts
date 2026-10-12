import PortfolioHttpService from "./PortfolioHttpService";

/** Route #12 — POST /contact public (throttle 5/min/IP). */

export const ContactApiPath = {
    Send: "/contact",
} as const;

export interface ContactPayload {
    name: string;
    email: string;
    subject: string;
    message: string;
}

class ContactService extends PortfolioHttpService {
    /** 201 avec data: null ; 422 validation ; 429 throttle. */
    send(payload: ContactPayload): Promise<null> {
        return this.portfolioRequest<null>({
            url: ContactApiPath.Send,
            method: "POST",
            body: payload,
        });
    }
}

export const ContactServiceInstance = new ContactService();
export default ContactService;
