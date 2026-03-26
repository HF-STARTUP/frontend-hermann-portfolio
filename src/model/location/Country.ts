import { CountryType } from "@/types/location/location.type";
import { logger } from "@/utils/func/devmode/debug";
import Model from "@/model/Model";
import { VSelectProp } from "@/components/form/TextField";

class Country extends Model {
    private _instance: CountryType;

    constructor(countryData: CountryType) {
        super();
        this._instance = countryData;
    }

    static toCountries(countries: CountryType[] | undefined): Country[] {
        if (!countries) return [];
        return countries.map(countryData => new Country(countryData));
    }

    // --- Getters ---

    get id(): number {
        return this._instance.id;
    }

    get name(): string {
        return this._instance.name;
    }

    get isoCode(): string {
        return this._instance.iso_code;
    }

    get flag(): string {
        return this._instance.flag;
    }

    get phoneCode(): string {
        return this._instance.phonecode;
    }

    get currency(): string {
        return this._instance.currency;
    }

    get longitude(): number {
        return this._instance.longitude;
    }

    get latitude(): number {
        return this._instance.latitude;
    }

    /**
     * Retourne le nom avec l'emoji du drapeau si disponible
     * Utile pour les sélecteurs ou l'affichage simple
     */
    get displayNameWithFlag(): string {
        return `${this.flag} ${this.name}`;
    }

    /**
     * Retourne le code téléphonique formaté (ex: +237)
     */
    get formattedPhoneCode(): string {
        if (!this.phoneCode) return "";
        return this.phoneCode.startsWith('+') ? this.phoneCode : `+${this.phoneCode}`;
    }

    // --- Méthodes ---

    displayBasicInfo() {
        logger.log(`${this.name} (${this.isoCode}) - Currency: ${this.currency}`);
    }

    /**
     * Convertit les modèles en options pour un composant Select
     */
    static toVSelect(countries: Country[] | undefined): VSelectProp[] {
        if (!countries) return [];
        
        return countries.map((c) => ({
            label: `${c.flag} ${c.name}`,
            value: c.id.toString() // Utiliser l'ID est souvent plus sûr que l'ISO pour les relations DB
        }));
    }

    /**
     * Permet d'accéder aux données brutes si nécessaire
     */
    get raw(): CountryType {
        return this._instance;
    }
}

export default Country;