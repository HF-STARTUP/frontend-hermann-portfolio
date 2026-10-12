import Cookies from "js-cookie";

export enum ConnexionMode {
  Staging = "staging",
  Production = "production",
}

export const TOKEN_KEYS = {
  token: "token",
  refresh_token: "refresh_token",
  profile_id: "profile_id",
  park_id: "park_id",
  transaction_id: "transaction_id",
  enabled_city_id: "enable_city_id",
  enabled_country_id: "enabled_country_id",
  enabled_fleet_type: "enabled_fleet_type",
  connexion_mode: "connexion_mode",
  currency: "currency",
  currency_id: "currency_id",
  // Session admin du portfolio (token opaque Sanctum, PAS un JWT —
  // d'où une expiration stockée à part plutôt que isLoggedIn()).
  pf_admin_token: "pf_admin_token",
  pf_admin_expires_at: "pf_admin_expires_at",
};

export const COOKIES_CONFIG = {
  path: "/",
  sameSite: "lax",
  expires: 365 * 10, //10 ans
  //secure: true
} as Cookies.CookieAttributes;

class AuthManagerGuard {
  private static instance: AuthManagerGuard;

  constructor() {}

  static __init() {
    if (!AuthManagerGuard.instance) {
      return new AuthManagerGuard();
    }
    return AuthManagerGuard.instance;
  }

  static loginToApp(
    token: string,
    refreshToken: string,
    profile_id?: string,
    park_id?: string,
  ) {
    Cookies.set(TOKEN_KEYS.token, token, COOKIES_CONFIG);
    Cookies.set(TOKEN_KEYS.refresh_token, refreshToken, COOKIES_CONFIG);
    profile_id && AuthManagerGuard.setProfileID(profile_id);
    park_id && AuthManagerGuard.setParkID(park_id);
  }

  static setProfileID(profile_id: string) {
    try {
      Cookies.remove(TOKEN_KEYS.profile_id);
    } catch (err) {}

    Cookies.set(TOKEN_KEYS.profile_id, profile_id, COOKIES_CONFIG);
  }

  static setParkID(park_id: string) {
    Cookies.set(TOKEN_KEYS.park_id, park_id, COOKIES_CONFIG);
  }

  static get getTransactionID() {
    return Cookies.get(TOKEN_KEYS.transaction_id);
  }

  static storeTransactionID(id: string) {
    Cookies.set(TOKEN_KEYS.transaction_id, id);
  }

  static setEnabledCityID(id: number | string) {
    Cookies.set(TOKEN_KEYS.enabled_city_id, String(id), COOKIES_CONFIG);
  }

  static setEnabledCountryID(id: number | string) {
    Cookies.set(TOKEN_KEYS.enabled_country_id, String(id), COOKIES_CONFIG);
  }

  static setEnabledFleetType(fleetType: string) {
    Cookies.set(TOKEN_KEYS.enabled_fleet_type, fleetType, COOKIES_CONFIG);
  }

  static get getConnexionMode(): ConnexionMode {
    return (
      (Cookies.get(TOKEN_KEYS.connexion_mode) as ConnexionMode) ??
      ConnexionMode.Production
    );
  }

  static setConnexionMode(mode: ConnexionMode) {
    Cookies.set(TOKEN_KEYS.connexion_mode, mode.toString(), COOKIES_CONFIG);
  }

  static setCurrency(currency?: string) {
    if (currency != null) {
      Cookies.set(TOKEN_KEYS.currency, currency, COOKIES_CONFIG);
    }
  }

  static setCurrencyId(currencyId?: number) {
    if (currencyId != null) {
      Cookies.set(
        TOKEN_KEYS.currency_id,
        currencyId.toString(),
        COOKIES_CONFIG,
      );
    }
  }

  static get getEnabledFleetType() {
    return Cookies.get(TOKEN_KEYS.enabled_fleet_type);
  }

  static get isAllCities() {
    return Cookies.get(TOKEN_KEYS.enabled_city_id) === "999999";
  }

  static get getCurrency() {
    return Cookies.get(TOKEN_KEYS.currency);
  }

  static get getCurrencyId() {
    return Number(Cookies.get(TOKEN_KEYS.currency_id));
  }

  static get getEnabledCity() {
    return Cookies.get(TOKEN_KEYS.enabled_city_id);
  }

  static get getEnabledCountry() {
    return Cookies.get(TOKEN_KEYS.enabled_country_id);
  }

  static removeTransactionID() {
    Cookies.remove(TOKEN_KEYS.transaction_id);
  }

  static removeActiveFleet() {
    Cookies.remove(TOKEN_KEYS.enabled_fleet_type);
  }

  static removeProfileID() {
    Cookies.remove(TOKEN_KEYS.profile_id);
  }

  static removeParkID() {
    Cookies.remove(TOKEN_KEYS.park_id);
  }

  static removeCurrency() {
    Cookies.remove(TOKEN_KEYS.currency);
  }

  static logoutToApp() {
    Cookies.remove(TOKEN_KEYS.token);
    Cookies.remove(TOKEN_KEYS.refresh_token);
    Cookies.remove(TOKEN_KEYS.profile_id);
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

  /* ---------------------------------------------------------------- */
  /* Session admin du portfolio : token opaque Sanctum + expiration.   */
  /* Contrairement aux tokens VTC (JWT), isLoggedIn() ne s'applique    */
  /* pas ici — la validité se lit sur pf_admin_expires_at.             */
  /* ---------------------------------------------------------------- */

  static loginToPortfolio(token: string, expiresAt: string) {
    Cookies.set(TOKEN_KEYS.pf_admin_token, token, COOKIES_CONFIG);
    Cookies.set(TOKEN_KEYS.pf_admin_expires_at, expiresAt, COOKIES_CONFIG);
  }

  static get getPortfolioToken() {
    return Cookies.get(TOKEN_KEYS.pf_admin_token);
  }

  static get getPortfolioExpiresAt() {
    return Cookies.get(TOKEN_KEYS.pf_admin_expires_at);
  }

  /** True si une date d'expiration future est stockée. */
  static get isPortfolioAuthenticated(): boolean {
    const expiresAt = AuthManagerGuard.getPortfolioExpiresAt;
    if (!expiresAt) return false;
    try {
      return new Date(expiresAt).getTime() > Date.now();
    } catch {
      return false;
    }
  }

  static logoutFromPortfolio() {
    Cookies.remove(TOKEN_KEYS.pf_admin_token);
    Cookies.remove(TOKEN_KEYS.pf_admin_expires_at);
  }

  static signOut() {
    for (let k of Object.values(TOKEN_KEYS)) {
      Cookies.remove(k);
    }
  }

  static isLoggedIn(token: string = AuthManagerGuard.getToken as string) {
    console.log(token);

    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      if (!payload.exp) {
        return false;
      }

      const currentTime = Date.now() / 1000;

      const timeLeft = payload.exp - currentTime;
      return timeLeft > 20;
    } catch (error) {
      return false;
    }
  }
}

export default AuthManagerGuard;
