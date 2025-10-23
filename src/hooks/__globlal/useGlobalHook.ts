import {useParams} from "next/navigation";
import useAppStore from "@/stores/global/useAppStore";
import React from "react";
import {useUserProfile} from "@/hooks/__form/auth/useUserProfile";
import {logger} from "@/utils/func/devmode/debug";
import {RegionID} from "@/types/generic";
import AuthManagerGuard from "@/guard/AuthManagerGuard";
import {useQueryProvider} from "@/hooks/hooksProvider";
import {GeolocalizationService} from "@/services/location/Geolocalization";
import {useGetCurrenciesList} from "@/hooks/admin/useFleetHook";

export const useGetRegion = () => {

    const {user} = useAppStore()

    const regionID = user?.getActiveRegion ?? null

    return {
        region_id: regionID as RegionID
    }
}


export const useGetParkID = () => {

    const params = useParams() as { fleetID: string }

    const parkID = params.fleetID

    return {
        parkID: parkID as RegionID
    }
}

export const useGetProfileID = () => {

    const {user} = useAppStore()

    const profile_id = user?.getID ?? null

    return {
        profile_id: profile_id as string
    }
}


export const useResetSearchState = () => {
    const {resetFindToken} = useAppStore()

    React.useEffect(() => {
        resetFindToken()
    }, [])
}

export const useDynamicSearch = <T extends { getFindToken: string }>(
    items: T[],
    searchToken: string,
    sortBy: keyof T,
    sortDirection: 'asc' | 'desc' = 'asc'
): T[] => {
    const [filteredItems, setFilteredItems] = React.useState<T[]>([]);

    React.useEffect(() => {

        logger.log(`in search hook effect`)

        if (items && items.length) {

            logger.log(`Debounce search !>>>>>>>>>>>>>>>>>>>`)

            let processedItems = [...items];

            if (searchToken) {
                processedItems = processedItems.filter(item =>
                    item.getFindToken.toLowerCase().includes(searchToken.toLowerCase())
                );
            }

            processedItems.sort((a, b) => {
                if (a[sortBy] < b[sortBy]) return sortDirection === 'asc' ? -1 : 1;
                if (a[sortBy] > b[sortBy]) return sortDirection === 'asc' ? 1 : -1;
                return 0;
            });

            if (processedItems) {
                setFilteredItems(processedItems);
            }

        }

    }, [items, searchToken, sortBy, sortDirection]);

    return filteredItems;
};


export const useGetCurrency = () => {

    const {
        data,
        isLoading,
    } = useUserProfile()

    return {
        loadingCurrency: isLoading,
        currency: data?.getActiveCurrency,
        currencyObj: data?.getCurrencyObj
    }
}


export const useGetMyPosition = () => {

    const {isLoading, data, isSuccess} = useQueryProvider({
        queryKey: ["geolocalization"],
        queryFn: GeolocalizationService.getUserPosition
    })

    return {
        isLoading,
        data,
        isSuccess

    }
}

export const useGetActiveCurrency = () => {
    const {data: currencies, isLoading: loadingCurrency} = useGetCurrenciesList()

    const curId = AuthManagerGuard.getCurrency

    return {
        currency: currencies?.find(c => String(c.id) === String(curId))?.name
    }
}
