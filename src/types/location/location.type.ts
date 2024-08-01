export type GetCountryResponseType = {
    message: string;
    code:    number;
    data:    CountryType[];
}

export type CountryType = {
    id:        number;
    name:      string;
    iso_code:  string;
    flag:      string;
    phonecode: string;
    currency:  string;
    longitude: number;
    latitude:  number;
}

export type GetCitiesResponseType = {
    message: string;
    code:    number;
    data:    CityPaginationData;
}

export type CityPaginationData = {
    data:         CityType[];
    totalRecords: number;
    totalPages:   number;
    currentPage:  number;
    itemPerPage:  number;
}

export type CityType = {
    id:         number;
    name:       string;
    state_code: null;
    country_id: number;
    state_id:   number;
    longitude:  number;
    latitude:   number;
}
