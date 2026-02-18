import {
  CityType,
  CountryType,
  GetCountryResponseType,
} from "@/types/location/location.type";
import Country from "@/model/location/Country";
import { getBaseApiPath } from "@/utils/const/envVars";

const apiPath = getBaseApiPath();

export const FleetCityPath = `${apiPath}/location/cities/park?itemPerPage=5000&page=1`;

export class CountryService {
  private countryApiPath = "/location/country";

  constructor() {
    this.fetchCountries = this.fetchCountries.bind(this);
  }

  private get getFullCountryApiPath() {
    return `${apiPath}/${this.countryApiPath}`;
  }

  async fetchCountries(inputs?: { fleet?: boolean }): Promise<Country[]> {
    const response: Response = await fetch(
      `${this.getFullCountryApiPath}${inputs?.fleet ? "?fleet=true" : ""}`,
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const getCountriesData: GetCountryResponseType = await response.json();
    const countriesParsed: CountryType[] = getCountriesData.data;

    return Country.toCountries(countriesParsed);
  }

  async fetchFleetCities(): Promise<CityType[]> {
    const response: Response = await fetch(FleetCityPath);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const getCountriesData = await response.json();
    const citiesParsed: { data: CityType[] } = getCountriesData.data;

    return citiesParsed.data;
  }
}
