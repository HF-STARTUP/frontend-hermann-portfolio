"use client"

import axios, {AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {QueryClient} from "@tanstack/react-query";
import {EnvVars} from "@/utils/const/envVars";
import {ExecHttpRequestOptionType, GlobalResponseType, SystemHttpCodeGeneric} from "@/types/network/http";
import SYSTEM_HTTP_CODE from "@/utils/const/systemHttpCode";
import CustomQueryError from "@/services/CustomQueryError";
import AuthManagerGuard, {TOKEN_KEYS} from "@/guard/AuthManagerGuard";
import {queryClient} from "@/app/_utils/network/reactQuery";
import Cookies from "js-cookie";
import { format } from "date-fns";

enum ConnexionMode {
    Staging = "staging",
    Production = "production",
}
abstract class Service {

    protected axiosInstance: AxiosInstance;

    protected queryClient: QueryClient = queryClient

    protected baseApiPath = Cookies.get("connexion_mode") === ConnexionMode.Staging
        ? EnvVars.NP_API_ENDPOINT_STAGING
        : EnvVars.NP_API_ENDPOINT

    private resourcePath: string | undefined = undefined


    protected constructor(ressourcePath: string | undefined = undefined) {

        const connexionMode =  (Cookies.get("connexion_mode") ?? ConnexionMode.Production) as ConnexionMode;

        this.baseApiPath = Cookies.get("connexion_mode") === ConnexionMode.Staging
            ? EnvVars.NP_API_ENDPOINT_STAGING
            : EnvVars.NP_API_ENDPOINT;

        this.resourcePath = ressourcePath

        this.axiosInstance = axios.create({
            baseURL: ressourcePath ? `${this.baseApiPath}/${ressourcePath}` : this.baseApiPath,
        });

        this.axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
            const token = AuthManagerGuard.getToken;
            const profileID = AuthManagerGuard.getProfileID;

            config.headers = config.headers || {};

            if (token) {
                config.headers['Authorization'] = `${token}`;
            }

            if (profileID) config.headers['profile_id'] = `${profileID}`

            return config;
        }, (error: AxiosError) => {
            return Promise.reject(error);
        });
    }

    protected httpMethods: { post: 'POST', get: 'GET', update: 'PUT' } = {
        post: 'POST',
        get: 'GET',
        update: 'PUT',
    }

    protected async execHttpRequest<T>({
                                           url,
                                           method = this.httpMethods.get,
                                           headers,
                                           body = undefined,
                                           toFormdata = false,
                                           secure = true,
                                       }: ExecHttpRequestOptionType): Promise<T> {

        const notIsLoggedIn = !AuthManagerGuard.isLoggedIn()

        if (notIsLoggedIn && secure) {
            await this.refreshToken()
            // if (window?.location) {
            //     window.location = `${window.location.origin}/auth/login` as unknown as Location
            // }
            // console.log("Session expiré")
            // throw new CustomQueryError("Session expiré, veuillez vous reconnecter")
        }


        let requestData = body

        if (method === this.httpMethods.post) {
            body = this.cleanObject(requestData)
        }


        const isConvertibleToFormData = (body && method === this.httpMethods.post && this.containsFile(body)) || toFormdata

        if (isConvertibleToFormData) {
            requestData = this.convertToFormData(body);
            headers && delete headers['Content-Type'];
        }

        return this.axiosInstance({
            method: method,
            url: url,
            headers: {
                ...headers
            },
            data: requestData,
        }).then((response: AxiosResponse<GlobalResponseType<T>>) => {
            if (!this.requestIsSuccess(response.data.code)) {
                throw new CustomQueryError(response.data.message, response.data.code)
            }
            return response.data.data
        }).catch((error: AxiosError<GlobalResponseType<T>>) => {
            const isTokenExpired = this.tokenExpired((error.response?.data.code) as unknown as SystemHttpCodeGeneric)
            console.log("Error occured", isTokenExpired)
            console.log(error)
            
            if(isTokenExpired){
                AuthManagerGuard.signOut()
                if (window?.location) {
                    window.location = `${window.location.origin}/login` as unknown as Location
                }
            }
            throw new CustomQueryError(error.message)
        })
    }

    async refreshToken() {
        await axios.post(this.baseApiPath + "/refresh-token", {refresh_token: AuthManagerGuard.getRefreshToken})
            .then((resp: AxiosResponse<{ token: string, refresh_token: string }>) => {
                AuthManagerGuard.loginToApp(resp.data.token, resp.data.refresh_token)
            }).catch(err => {

            })
    }

    private convertArraysToStringsInObject(body: Convertible): Convertible {
        return Object.entries(body).reduce((newObj: Convertible, [key, value]): Convertible => {
            newObj[key] = Array.isArray(value) ? JSON.stringify(value) : value;
            return newObj;
        }, {});
    }

    private containsArray(body: Object): boolean {
        const checkValue = (value: any): boolean => {
            if (Array.isArray(value)) {
                return true;
            } else if (typeof value === 'object' && value !== null) {
                return Object.values(value).some(innerValue => checkValue(innerValue));
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
                return value.some(item => checkValue(item));
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
                if (value.some(item => item instanceof File)) {
                    // Si oui, ajouter chaque fichier individuellement
                    value.forEach(item => {
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
            } else if (typeof value === 'object' && value !== null && !(value instanceof File)) {
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

        Object.keys(obj).forEach(key => {
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
    };

}

type Convertible = { [key: string]: any };

export const toIsoDate = (date: Date | string | undefined | null) => {
    if (!date) return ""
    return format(date, "yyyy-MM-dd'T'HH:mm:ss")
}

export default Service
