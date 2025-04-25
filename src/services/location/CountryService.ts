import {CityType, CountryType, GetCountryResponseType} from "@/types/location/location.type";
import {EnvVars} from "@/utils/const/envVars";
import Country from "@/model/location/Country";

export const FleetCityPath = `${EnvVars.NP_API_ENDPOINT}/location/cities/park?itemPerPage=5000&page=1`

export class CountryService {

    private countryApiPath = '/location/country'

    constructor() {
        this.fetchCountries = this.fetchCountries.bind(this);
    }

    private get getFullCountryApiPath() {
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

    async fetchFleetCities(): Promise<CityType[]> {
        const response: Response = await fetch(FleetCityPath);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const getCountriesData = await response.json();
        const citiesParsed: { data: CityType[] } = getCountriesData.data;

        return citiesParsed.data;
    }
}
