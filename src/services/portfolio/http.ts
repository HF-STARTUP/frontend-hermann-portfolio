/**
 * Contrat HTTP du backend portfolio (docs/BACKEND_LARAVEL_SPEC.md) :
 * enveloppe { success, message, data }, token Bearer Sanctum.
 *
 * Le token admin vit dans des cookies posés via AuthManagerGuard
 * (clés pf_admin_*). TODO production : passer à un cookie httpOnly posé
 * par un BFF Next (recommandation spec §7.3) pour ne plus l'exposer au JS.
 */

import AuthManagerGuard from "@/guard/AuthManagerGuard";

export const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

/* ------------------------------------------------------------------ */
/* Token admin — délégué à AuthManagerGuard (cookies js-cookie)        */
/* ------------------------------------------------------------------ */

export interface AdminUser {
    id: string;
    name: string;
    email: string;
}

export interface AuthPayload {
    token: string;
    expiresAt: string;
    user: AdminUser;
}

export const getToken = (): string | null => {
    if (typeof window === "undefined") return null;
    return AuthManagerGuard.getPortfolioToken ?? null;
};

export const setToken = (payload: AuthPayload): void => {
    if (typeof window === "undefined") return;
    AuthManagerGuard.loginToPortfolio(payload.token, payload.expiresAt);
};

export const clearToken = (): void => {
    if (typeof window === "undefined") return;
    AuthManagerGuard.logoutFromPortfolio();
};

export const isAuthenticated = (): boolean => {
    if (typeof window === "undefined") return false;
    return AuthManagerGuard.isPortfolioAuthenticated;
};

/* ------------------------------------------------------------------ */
/* Erreur normalisée                                                   */
/* ------------------------------------------------------------------ */

/** Erreurs par champ renvoyées sur 422 (`{ email: ["..."], ... }`) */
export type FieldErrors = Record<string, string[]>;

/**
 * Erreur d'API portfolio : `message` (FR) est prêt pour notify(),
 * `errors` porte les erreurs de validation 422 et `data` la charge
 * d'erreur éventuelle (ex. 409 catégorie → { usages: N }).
 */
export class PortfolioApiError extends Error {
    status: number;
    errors?: FieldErrors;
    data?: unknown;

    constructor(
        status: number,
        message: string,
        options?: { errors?: FieldErrors; data?: unknown },
    ) {
        super(message);
        this.name = "PortfolioApiError";
        this.status = status;
        this.errors = options?.errors;
        this.data = options?.data;
    }
}

/** Purge la session et ramène sur le login (session expirée / invalide).
 *  Redirection ignorée si l'on est déjà sur /admin/login : sans ce
 *  garde-fou, un 401 reçu pendant la connexion rechargeait la page. */
export const handleSessionExpired = (): void => {
    clearToken();
    if (
        typeof window !== "undefined" &&
        !window.location.pathname.startsWith("/admin/login")
    ) {
        window.location.assign("/admin/login");
    }
};
