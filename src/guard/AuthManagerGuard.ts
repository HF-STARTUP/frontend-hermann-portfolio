import Cookies from "js-cookie";
import {ConnexionMode} from "@/hooks/__globlal/useGlobalHook";

export const TOKEN_KEYS = {
    token: 'token',
    refresh_token: 'refresh_token',
    profile_id: 'profile_id',
    park_id: 'park_id',
    transaction_id: 'transaction_id',
    enabled_city_id: 'enable_city_id',
    enabled_fleet_type: 'enabled_fleet_type',
    connexion_mode: 'connexion_mode',
    currency: 'connexion_mode'
}

const COOKIES_CONFIG = {}

class AuthManagerGuard {

    private static instance: AuthManagerGuard

    constructor() {
    }

    static __init() {
        if (!AuthManagerGuard.instance) {
            return new AuthManagerGuard()
        }
        return AuthManagerGuard.instance
    }

    static loginToApp(token: string, refreshToken: string, profile_id?: string, park_id?: string) {
        Cookies.set(TOKEN_KEYS.token, token, COOKIES_CONFIG)
        Cookies.set(TOKEN_KEYS.refresh_token, refreshToken, COOKIES_CONFIG)
        profile_id && AuthManagerGuard.setProfileID(profile_id)
        park_id && AuthManagerGuard.setParkID(park_id)
    }

    static setProfileID(profile_id: string) {
        try {
            Cookies.remove(TOKEN_KEYS.profile_id)
        } catch (err) {
        }

        Cookies.set(TOKEN_KEYS.profile_id, profile_id, {})
    }

    static setParkID(park_id: string) {
        Cookies.set(TOKEN_KEYS.park_id, park_id)
    }

    static get getTransactionID() {
        return Cookies.get(TOKEN_KEYS.transaction_id);
    }

    static storeTransactionID(id: string) {
        Cookies.set(TOKEN_KEYS.transaction_id, id)
    }

    static setEnabledCityID(id: number) {
        Cookies.set(TOKEN_KEYS.enabled_city_id, String(id))
    }

    static setEnabledFleetType(fleetType: string) {
        Cookies.set(TOKEN_KEYS.enabled_fleet_type, fleetType)
    }

    static get getConnexionMode(): ConnexionMode {
        return Cookies.get(TOKEN_KEYS.connexion_mode) as ConnexionMode ?? ConnexionMode.Production
    }

    static setConnexionMode(mode: ConnexionMode) {
        Cookies.set(TOKEN_KEYS.connexion_mode, mode.toString())
    }

    static setCurrency(currency?: string) {
        if (currency != null) {
            Cookies.set(TOKEN_KEYS.currency, currency)
        }
    }


    static get getEnabledFleetType() {
        return Cookies.get(TOKEN_KEYS.enabled_fleet_type)
    }


    static get getCurrency() {
        return Cookies.get(TOKEN_KEYS.currency)
    }

    static get getEnabledCity() {
        return Cookies.get(TOKEN_KEYS.enabled_city_id)
    }

    static removeTransactionID() {
        Cookies.remove(TOKEN_KEYS.transaction_id)
    }

    static removeActiveFleet() {
        Cookies.remove(TOKEN_KEYS.enabled_fleet_type)
    }

    static removeProfileID() {
        Cookies.remove(TOKEN_KEYS.profile_id)
    }

    static removeParkID() {
        Cookies.remove(TOKEN_KEYS.park_id)
    }

    static logoutToApp() {
        Cookies.remove(TOKEN_KEYS.token)
        Cookies.remove(TOKEN_KEYS.refresh_token)
    }

    static get getToken() {
        return Cookies.get(TOKEN_KEYS.token);
    }

    static get getRefreshToken() {
        return Cookies.get(TOKEN_KEYS.refresh_token);
    }

    static get getProfileID() {
        return Cookies.get(TOKEN_KEYS.profile_id);
    }

    static get getParkID() {
        return Cookies.get(TOKEN_KEYS.park_id);
    }

    static signOut() {
        for (let k of Object.values(TOKEN_KEYS)) {
            Cookies.remove(k)
        }
    }

    static isLoggedIn(token: string = AuthManagerGuard.getToken as string) {

        console.log(token)

        if (!token) {
            return false;
        }

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));

            if (!payload.exp) {
                return false;
            }

            const currentTime = Date.now() / 1000;

            const timeLeft = payload.exp - currentTime;
            return timeLeft > 20

        } catch (error) {
            return false;
        }


    }

}

export default AuthManagerGuard
