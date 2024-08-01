import {CityType, GetCitiesResponseType} from "@/types/location/location.type";
import City from "@/model/location/City";
import Service from "@/services/Service";

export class CityService extends Service {

    countryToken: string
    itemsPerPage: number
    private cityApiPath = '/location/cities'

    constructor(country: string) {
        super()
        this.fetchCities = this.fetchCities.bind(this);
        this.countryToken = country
        this.itemsPerPage = 500
    }

    private get getFullCitiesApiPath() {
        return `${this.baseApiPath}/${this.cityApiPath}/${this.countryToken}\?itemPerPage=${this.itemsPerPage}`
    }

    async fetchCities(): Promise<City[]> {
        const response: Response = await fetch(this.getFullCitiesApiPath, {});

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const getCitiesData: GetCitiesResponseType = await response.json();
        const citiesParsed: CityType[] = getCitiesData.data.data;

        return City.toCities(citiesParsed);
    }
}
