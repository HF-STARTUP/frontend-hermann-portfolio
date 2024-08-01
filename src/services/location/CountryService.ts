import {CountryType, GetCountryResponseType} from "@/types/location/location.type";
import {EnvVars} from "@/utils/const/envVars";
import Country from "@/model/location/Country";

export class CountryService {

    private countryApiPath = '/location/country'

    constructor() {
        this.fetchCountries = this.fetchCountries.bind(this);
    }

    private get getFullCountryApiPath(){
        return `${EnvVars.NP_API_ENDPOINT}/${this.countryApiPath}`
    }

    async fetchCountries(): Promise<Country[]> {
        const response: Response = await fetch(this.getFullCountryApiPath);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const getCountriesData: GetCountryResponseType = await response.json();
        const countriesParsed: CountryType[] = getCountriesData.data;

        return Country.toCountries(countriesParsed);
    }
}
