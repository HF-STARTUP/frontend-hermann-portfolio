import Country from "@/model/location/Country";
import Service from "@/services/Service";
import { toQueriesString } from "@/lib/utils";
import { CountryType } from "@/types/location/location.type";

export interface GetCountryParams {
    phone_code?: string;
    iso_code?: string;
    fleet?: boolean;
}

export enum CountryApiPath {
    GetCountries = "/location/country",
}

export class CountryService extends Service {
    private static instance: CountryService = new CountryService();

    private constructor() {
        super();
    }

    public static getInstance(): CountryService {
        return CountryService.instance;
    }

    public static async fetchCountries(params?: GetCountryParams): Promise<Country[]> {
        const uri = toQueriesString(CountryApiPath.GetCountries, params);

        const response = await CountryService.getInstance().execHttpRequest<CountryType[]>({
            url: uri,
            method: CountryService.getInstance().httpMethods.get,
        });

        const countriesRaw = response || [];

        return Country.toCountries(countriesRaw);
    }

    static invalidateCountries() {
        return CountryService.getInstance().queryClient.invalidateQueries({
            queryKey: [CountryApiPath.GetCountries],
        });
    }
}

export default CountryService;