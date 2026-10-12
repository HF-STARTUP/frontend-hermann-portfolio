import PortfolioHttpService from "./PortfolioHttpService";
import {
    clearToken,
    getToken,
    isAuthenticated,
    setToken,
    type AdminUser,
    type AuthPayload,
} from "./http";

/** Routes #13–#15 — /auth/login, /auth/logout, /auth/me */

export const AuthApiPath = {
    Login: "/auth/login",
    Logout: "/auth/logout",
    Me: "/auth/me",
} as const;

class AuthService extends PortfolioHttpService {
    /** Route #13 — stocke le token après succès. 401 = mauvais identifiants. */
    async login(credentials: { email: string; password: string }): Promise<AuthPayload> {
        const payload = await this.portfolioRequest<AuthPayload>({
            url: AuthApiPath.Login,
            method: "POST",
            body: credentials,
            keepOnUnauthorized: true,
        });
        setToken(payload);
        return payload;
    }

    /** Route #14 — révoque le token côté serveur puis purge localement. */
    async logout(): Promise<void> {
        try {
            await this.portfolioRequest<void>({
                url: AuthApiPath.Logout,
                method: "POST",
            });
        } catch {
            /* token peut-être déjà expiré — on purge quoi qu'il arrive */
        }
        clearToken();
    }

    /** Route #15 */
    me(): Promise<AdminUser> {
        return this.portfolioRequest<AdminUser>({ url: AuthApiPath.Me });
    }
}

export const AuthServiceInstance = new AuthService();
export { getToken, isAuthenticated };
export default AuthService;
