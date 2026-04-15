import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { QueryClient } from "@tanstack/react-query";
import {
  ExecHttpRequestOptionType,
  GlobalResponseType,
  SystemHttpCodeGeneric,
} from "@/types/network/http";
import SYSTEM_HTTP_CODE from "@/utils/const/systemHttpCode";
import CustomQueryError from "@/services/CustomQueryError";
import AuthManagerGuard from "@/guard/AuthManagerGuard";
import { queryClient } from "@/app/_utils/network/reactQuery";
import { format } from "date-fns";
import { getBaseApiPath } from "@/utils/const/envVars";

abstract class Service {
  protected axiosInstance: AxiosInstance;

  protected queryClient: QueryClient = queryClient;
  private ressourcePath: string | undefined;

  protected constructor(ressourcePath: string | undefined = undefined) {
    this.ressourcePath = ressourcePath;

    // Ne pas définir de baseURL fixe, elle sera calculée dynamiquement
    this.axiosInstance = axios.create({});

    // Intercepteur pour calculer dynamiquement le baseURL à chaque requête
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = AuthManagerGuard.getToken;
        const profileID = AuthManagerGuard.getProfileID;

        // Calculer le baseURL dynamiquement à chaque requête
        const baseApiPath = getBaseApiPath();
        const fullBaseUrl = this.ressourcePath
          ? `${baseApiPath}/${this.ressourcePath}`
          : baseApiPath;

        // Construire l'URL complète
        config.url = config.url?.startsWith("http")
          ? config.url
          : `${fullBaseUrl}${config.url?.startsWith("/") ? config.url : "/" + config.url}`;

        config.headers = config.headers || {};

        if (token) config.headers["Authorization"] = `${token}`;
        if (profileID) config.headers["profile_id"] = `${profileID}`;

        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );
  }

  protected httpMethods: { post: "POST"; get: "GET"; update: "PUT"; delete: "DELETE" } = {
    post: "POST",
    get: "GET",
    update: "PUT",
    delete: "DELETE",
  };

  protected async execHttpRequest<T>({
    url,
    method = this.httpMethods.get,
    headers,
    body = undefined,
    toFormdata = false,
    secure = true,
  }: ExecHttpRequestOptionType): Promise<T> {
    if (
      body &&
      typeof body === "object" &&
      Object.values(body).includes("999999")
    ) {
      body = Object.fromEntries(
        Object.entries(body).filter(([key, value]) => value !== "999999"),
      );
    }

    const notIsLoggedIn = !AuthManagerGuard.isLoggedIn();

    if (notIsLoggedIn && secure) {
      await this.refreshToken();
    }

    let requestData = body;

    if (method === this.httpMethods.post) {
      body = this.cleanObject(requestData);
    }

    const isConvertibleToFormData =
      (body && method === this.httpMethods.post && this.containsFile(body)) ||
      toFormdata;

    if (isConvertibleToFormData) {
      requestData = this.convertToFormData(body);
      headers && delete headers["Content-Type"];
    }

    return this.axiosInstance({
      method: method,
      url: removeInvalidParams(`${getBaseApiPath()}/${url}`.replace(/([^:]\/)\/+/g, '$1')),
      headers: {
        ...headers,
      },
      data: requestData,
    })
      .then((response: AxiosResponse<GlobalResponseType<T>>) => {
        if (!this.requestIsSuccess(response.data.code)) {
          throw new CustomQueryError(response.data.message, response.data.code);
        }
        return response.data.data;
      })
      .catch((error: AxiosError<GlobalResponseType<T>>) => {
        const isTokenExpired = this.tokenExpired(
          error.response?.data.code as unknown as SystemHttpCodeGeneric,
        );
        console.log("Error occured", isTokenExpired);
        console.log(error);

        if (isTokenExpired) {
          AuthManagerGuard.signOut();
          if (window?.location) {
            window.location.href = `${window.location.origin}/login`;
          }
        }
        throw new CustomQueryError(error.message);
      });
  }

  async refreshToken() {
    const baseApiPath = getBaseApiPath();

    await axios
      .post(baseApiPath + "/refresh-token", {
        refresh_token: AuthManagerGuard.getRefreshToken,
      })
      .then((resp: AxiosResponse<{ token: string; refresh_token: string }>) => {
        AuthManagerGuard.loginToApp(resp.data.token, resp.data.refresh_token);
      })
      .catch((err) => {});
  }

  private convertArraysToStringsInObject(body: Convertible): Convertible {
    return Object.entries(body).reduce(
      (newObj: Convertible, [key, value]): Convertible => {
        newObj[key] = Array.isArray(value) ? JSON.stringify(value) : value;
        return newObj;
      },
      {},
    );
  }

  private containsArray(body: Object): boolean {
    const checkValue = (value: any): boolean => {
      if (Array.isArray(value)) {
        return true;
      } else if (typeof value === "object" && value !== null) {
        return Object.values(value).some((innerValue) =>
          checkValue(innerValue),
        );
      }
      return false;
    };
    return Object.values(body).some(checkValue);
  }

  private containsFile(body: Object): boolean {
    const checkValue = (value: string | File | number | Date): boolean => {
      if (value instanceof File) {
        return true;
      }
      if (Array.isArray(value)) {
        return value.some((item) => checkValue(item));
      }
      return false;
    };
    return Object.values(body).some(checkValue);
  }

  // private convertToFormData(body: Object): FormData {
  //     const formData = new FormData();
  //     Object.entries(body).forEach(([key, value]) => {
  //         if (Array.isArray(value)) {
  //             value.forEach((item, _) => {
  //                 if(item instanceof File){
  //                     formData.append(key, item);
  //                 }else {
  //                 }
  //             });
  //         } else {
  //             formData.append(key, value);
  //         }
  //     });
  //     return formData;
  // }

  private convertToFormData(body: Object): FormData {
    const formData = new FormData();

    Object.entries(body).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        // Vérifier si le tableau contient au moins un fichier
        if (value.some((item) => item instanceof File)) {
          // Si oui, ajouter chaque fichier individuellement
          value.forEach((item) => {
            if (item instanceof File) {
              formData.append(key, item);
            } else {
              // Pour les éléments non fichier, les ajouter en tant que JSON stringifiés
              formData.append(key, JSON.stringify(item));
            }
          });
        } else {
          // Si le tableau ne contient pas de fichier, convertir tout le tableau en JSON stringifié
          formData.append(key, JSON.stringify(value));
        }
      } else if (value instanceof Date) {
        // Ajouter directement les instances de Date sans conversion
        formData.append(key, value as any);
      } else if (
        typeof value === "object" &&
        value !== null &&
        !(value instanceof File)
      ) {
        // Convertir les objets en chaîne JSON, sauf les instances de File
        formData.append(key, JSON.stringify(value));
      } else {
        // Ajouter des valeurs non-objet ou des fichiers individuellement directement
        formData.append(key, value);
      }
    });

    return formData;
  }

  cleanObject(obj: { [key: string]: any }): { [key: string]: any } {
    const cleanedObj: { [key: string]: any } = {};

    Object.keys(obj).forEach((key) => {
      if (obj[key] !== undefined) {
        cleanedObj[key] = obj[key];
      }
    });

    return cleanedObj;
  }

  protected requestIsSuccess(httpCode: SystemHttpCodeGeneric) {
    return httpCode === SYSTEM_HTTP_CODE.SUCCESS;
  }

  protected tokenExpired(httpCode: SystemHttpCodeGeneric) {
    return httpCode === SYSTEM_HTTP_CODE.INVALID_PROFIL;
  }

  protected isEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  }

  // Utility methods
  protected toQueryString(params: DynamicObject, uri?: string): string {
    const q = Object.entries(params)
      .filter(([, value]) => value !== undefined)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      )
      .join("&");

    if (!uri) return q;
    return `${uri}?${q}`;
  }
}

type Convertible = { [key: string]: any };

export const toIsoDate = (date: Date | string | undefined | null) => {
  if (!date) return "";
  return format(date, "yyyy-MM-dd'T'HH:mm:ss");
};

/**
 * Supprime tous les paramètres de requête ayant la valeur "999999" d'une URL
 * @param url - L'URL à nettoyer
 * @returns L'URL nettoyée sans les paramètres ayant la valeur "999999"
 */
function removeInvalidParams(url: string): string {
  console.log(`Entry url === ${url}`);
  try {
    const urlObj = new URL(url);
    const searchParams = urlObj.searchParams;

    const paramsToDelete: string[] = [];
    searchParams.forEach((value, key) => {
      if (value === "999999") {
        paramsToDelete.push(key);
      }
    });

    // Supprimer ces paramètres
    paramsToDelete.forEach((param) => {
      searchParams.delete(param);
    });

    const sUrl = urlObj.toString();

    console.log("Sort url === ", sUrl);
    return sUrl;
  } catch (error) {
    console.error("Erreur lors du nettoyage de l'URL:", error);
    return url;
  }
}

type DynamicObject = Record<string, any>;

export default Service;
