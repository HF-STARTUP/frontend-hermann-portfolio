import {CountryService} from "@/services/location/CountryService";
import {useQuery} from "@tanstack/react-query";
import {QUERY_KEYS} from "@/utils/const/queryKeys";
import Country from "@/model/location/Country";

export function useCountries() {
    const countryService = new CountryService();

    return useQuery<Country[]>({queryKey: [QUERY_KEYS.countries], queryFn: countryService.fetchCountries});
}
