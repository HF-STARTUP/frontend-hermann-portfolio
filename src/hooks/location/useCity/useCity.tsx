"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/utils/const/queryKeys";
import { CityService, GetCitiesParams } from "@/services/location/CityService";
import City from "@/model/location/City";

export function useCity(
    params?: GetCitiesParams, 
    options?: Partial<UseQueryOptions<City[]>>
) {
    return useQuery<City[]>({ 
        queryKey: [QUERY_KEYS.cities, params], 
        queryFn: () => CityService.fetchCities(params || {}), 
        ...options,
        enabled: options?.enabled !== undefined ? options.enabled : true
    });
}