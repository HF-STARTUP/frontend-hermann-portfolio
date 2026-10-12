import axios, { AxiosError } from "axios";
import Service from "@/services/Service";
import {
    API_BASE_URL,
    getToken,
    handleSessionExpired,
    PortfolioApiError,
    type FieldErrors,
} from "./http";

interface PortfolioEnvelope<T> {
    success: boolean;
    message: string | null;
    data?: T;
    errors?: FieldErrors;
}

export interface PortfolioRequestOptionType {
    /** Chemin relatif à l'API (ex: "/projects", "/admin/media") */
    url: string;
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    headers?: Record<string, string>;
    body?: unknown;
    /** Paramètres d'URL (valeurs undefined ignorées) */
    query?: Record<string, string | number | boolean | undefined>;
    /** Ne pas rediriger vers /admin/login sur 401 (utilisé par le login) */
    keepOnUnauthorized?: boolean;
}

/**
 * Base des services du portfolio : hérite des utilitaires de
 * {@link Service} avec sa propre instance axios, et applique le contrat
 * du backend portfolio — enveloppe { success, message, data } + Bearer Sanctum.
 */
abstract class PortfolioHttpService extends Service {
    // Constructeur public explicite : les singletons des sous-classes sont
    // instanciables ; l'abstraction suffit à interdire new PortfolioHttpService().
    constructor() {
        super();
        // Instance axios dédiée : neutralise l'interceptor VTC hérité de
        // Service, qui écrasait le header Authorization avec le cookie
        // legacy « token » (sans Bearer) et adjoignait un profile_id —
        // 401 systématiques puis rechargement en pleine connexion.
        this.axiosInstance = axios.create();
    }

    protected buildUrl(
        path: string,
        query?: PortfolioRequestOptionType["query"],
    ): string {
        let url = `${API_BASE_URL}${path}`;
        if (query) {
            const params = new URLSearchParams();
            for (const [key, value] of Object.entries(query)) {
                if (value !== undefined) params.set(key, String(value));
            }
            const qs = params.toString();
            if (qs) url += `?${qs}`;
        }
        return url;
    }

    /** True si le body contient au moins un File (direct ou imbriqué).
     *  (nom distinct de Service.containsFile, privé dans la classe mère) */
    private bodyContainsFile(body: unknown): boolean {
        if (!body || typeof body !== "object") return false;
        return Object.values(body).some(
            (value) =>
                value instanceof File ||
                (Array.isArray(value) && value.some((item) => item instanceof File)),
        );
    }

    /** Retire les clés undefined avant encodage. */
    private cleanBody(body: unknown): Record<string, unknown> {
        if (!body || typeof body !== "object") return {};
        return Object.fromEntries(
            Object.entries(body as Record<string, unknown>).filter(
                ([, value]) => value !== undefined,
            ),
        );
    }

    /** Encodage multipart : File brut, objets/tableaux en JSON, reste en string. */
    private buildFormData(body: Record<string, unknown>): FormData {
        const formData = new FormData();
        for (const [key, value] of Object.entries(body)) {
            if (value instanceof File) formData.append(key, value);
            else if (typeof value === "object" && value !== null)
                formData.append(key, JSON.stringify(value));
            else formData.append(key, String(value));
        }
        return formData;
    }

    /**
     * Requête générique : renvoie `data` de l'enveloppe ou lève une
     * {@link PortfolioApiError} dont `message` est affichable tel quel.
     */
    protected async portfolioRequest<T>(
        options: PortfolioRequestOptionType,
    ): Promise<T> {
        const {
            url,
            method = "GET",
            headers,
            body,
            query,
            keepOnUnauthorized,
        } = options;

        const requestHeaders: Record<string, string> = {
            Accept: "application/json",
            ...headers,
        };
        const token = getToken();
        if (token) requestHeaders.Authorization = `Bearer ${token}`;

        // Comme execHttpRequest du Service parent : un body contenant un
        // File bascule automatiquement en multipart/form-data.
        const requestData =
            method !== "GET" && this.bodyContainsFile(body)
                ? this.buildFormData(this.cleanBody(body))
                : body;

        if (requestData !== undefined && !(requestData instanceof FormData)) {
            requestHeaders["Content-Type"] = "application/json";
        }

        try {
            const response = await this.axiosInstance.request({
                method,
                url: this.buildUrl(url, query),
                headers: requestHeaders,
                data: requestData,
            });

            if (response.status === 204) return undefined as T;

            const payload = response.data as PortfolioEnvelope<T>;
            if (!payload?.success) {
                throw new PortfolioApiError(
                    response.status,
                    payload?.message ?? `Erreur inattendue (HTTP ${response.status}).`,
                    { errors: payload?.errors, data: payload?.data },
                );
            }
            return payload.data as T;
        } catch (error) {
            if (error instanceof PortfolioApiError) {
                if (error.status === 401 && !keepOnUnauthorized) {
                    handleSessionExpired();
                }
                throw error;
            }

            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<PortfolioEnvelope<unknown>>;
                const status = axiosError.response?.status ?? 0;
                const payload = axiosError.response?.data;
                if (status === 401 && !keepOnUnauthorized) {
                    handleSessionExpired();
                }
                // 422 : « Échec de la validation » n'aide pas dans un toast —
                // on remonte la première erreur de champ à sa place.
                let message =
                    payload?.message ??
                    (status === 0
                        ? "Impossible de contacter le serveur. Vérifiez votre connexion."
                        : `Erreur inattendue (HTTP ${status}).`);
                if (status === 422) {
                    const firstFieldError = Object.values(
                        payload?.errors ?? {},
                    )
                        .flat()
                        .find(Boolean);
                    if (typeof firstFieldError === "string") message = firstFieldError;
                }
                throw new PortfolioApiError(status, message, {
                    errors: payload?.errors,
                    data: payload?.data,
                });
            }

            throw new PortfolioApiError(
                0,
                error instanceof Error
                    ? error.message
                    : "Une erreur inattendue est survenue.",
            );
        }
    }
}

export default PortfolioHttpService;
