import City from "@/model/location/City";
import Service from "@/services/Service";
import { toQueriesString } from "@/lib/utils";
import { CityPaginationData, CityType } from "@/types/location/location.type";

/**
 * Interface des paramètres de la requête GET /location/cities/park
 */
export interface GetCitiesParams {
    itemPerPage?: number;
    page?: number;
    search_text?: string;
    country_code?: string;
}

export enum CityApiPath {
    GetCitiesPark = '/location/cities/park',
}

export class CityService extends Service {
    private static instance: CityService = new CityService();

    private constructor() {
        super();
    }

    public static getInstance(): CityService {
        return CityService.instance;
    }

 
    public static async fetchCities(params: GetCitiesParams) {
        const uri = toQueriesString(CityApiPath.GetCitiesPark, params, false);

        const response = await CityService.getInstance().execHttpRequest<CityPaginationData>({
            url: uri,
            method: CityService.getInstance().httpMethods.get,
        });


        return City.toCities(response.data);
    }

    static invalidateCities() {
        return CityService.getInstance().queryClient.invalidateQueries({ 
            queryKey: [CityApiPath.GetCitiesPark] 
        });
    }
}

export default CityService;