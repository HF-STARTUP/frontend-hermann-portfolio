import {CountryType} from "@/types/location/location.type";
import {logger} from "@/utils/func/devmode/debug";
import Model from "@/model/Model";
import {VSelectProp} from "@/components/form/TextField";

class Country extends Model{
    id: number;
    name: string;
    isoCode: string;
    flag: string;
    phoneCode: string;
    currency: string;
    longitude: number;
    latitude: number;


    constructor(countryData: CountryType) {
        super()
        this.id = countryData.id;
        this.name = countryData.name;
        this.isoCode = countryData.iso_code;
        this.flag = countryData.flag;
        this.phoneCode = countryData.phonecode;
        this.currency = countryData.currency;
        this.longitude = countryData.longitude;
        this.latitude = countryData.latitude;
    }

     static toCountries(countries: CountryType[]): Country[] {
        return countries.map(countryData => new Country(countryData));
    }

    displayBasicInfo() {
        logger.log(`${this.name} (${this.isoCode}) - Currency: ${this.currency}`);
    }

    static toVSelect(countriesData: Country[] | undefined){
        if(!countriesData){
            return []
        }
        return countriesData.map((c, i) => ({
            label: c.name,
            value: c.isoCode
        } as VSelectProp))

    }
}

export default Country
