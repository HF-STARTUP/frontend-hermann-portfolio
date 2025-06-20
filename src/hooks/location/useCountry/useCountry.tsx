"use client";

import {CountryService, FleetCityPath} from "@/services/location/CountryService";
import {useQuery} from "@tanstack/react-query";
import {QUERY_KEYS} from "@/utils/const/queryKeys";
import Country from "@/model/location/Country";
import {CityType} from "@/types/location/location.type";

export function useCountries(inputs?: { fleet?: boolean }) {
    const countryService = new CountryService();

    return useQuery<Country[]>({
        queryKey: [QUERY_KEYS.countries, inputs],
        queryFn: () => countryService.fetchCountries(inputs)
    });
}

export function useFleetCity() {
    const countryService = new CountryService();

    return useQuery<CityType[]>({queryKey: [FleetCityPath], queryFn: () => countryService.fetchFleetCities()});
}
