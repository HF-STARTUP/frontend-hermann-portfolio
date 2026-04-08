"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/utils/const/queryKeys";
import { CountryService, GetCountryParams } from "@/services/location/CountryService";
import Country from "@/model/location/Country";

export function useCountries(
    params?: GetCountryParams, 
    options?: Partial<UseQueryOptions<Country[]>>
) {
    return useQuery<Country[]>({
        queryKey: [QUERY_KEYS.countries, params],
        queryFn: () => CountryService.fetchCountries(params),
        ...options
    });
}