import {useQuery} from "@tanstack/react-query";
import {QUERY_KEYS} from "@/utils/const/queryKeys";
import {CityService} from "@/services/location/CityService";
import City from "@/model/location/City";

export function useCity(countryToken: string) {
    const cityService = new CityService(countryToken);

    return useQuery<City[]>({queryKey: [QUERY_KEYS.cities, countryToken], queryFn: cityService.fetchCities, enabled: !!countryToken});
}
