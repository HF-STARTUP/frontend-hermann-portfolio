import { NotificationBandContent } from "@/components/display/NotificationBand";
import { useGetCurrenciesList } from "@/hooks/admin/useFleetHook";
import { useGetExpiringSubs, useGetInactiveFleets } from "@/hooks/dashboard/useDashboard";
import { toIsoDate } from "@/services/Service";
import { FleetType } from "@/types/admin/fleet.type";
import { ExpiringSubscriptionsParams } from "@/types/dashboard.type";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export interface SubscriptionExpiredSoon {
    fleetName: string;
    expiredAt: string;
    remainingDays: string
}

export interface InactiveFleet {
    fleetName: string;
    lastActivityAt: string;
    inactiveDays: string
}

export interface DashboardGlobalFilters {
    dateRange?: DateRange;
    currency?: string | number;
    profileType?: FleetType;
}

export const useDashboardHook = () => {
    const [globalFilters, setGlobalFilters] = useState<DashboardGlobalFilters>()

    const [queryParams, setQueryParams]= useState<ExpiringSubscriptionsParams>(
        {
            start_date: toIsoDate(globalFilters?.dateRange?.from),
            end_date: toIsoDate(globalFilters?.dateRange?.to),
            itemPerPage: 100,
            page: 1,
            account_type: globalFilters?.profileType
        }
    )
    const {data: expiringSubs, isLoading: isLoadingExpiringSubs} = useGetExpiringSubs(queryParams)   
    const {data: inactiveFleetsData, isLoading: isLoadingInactiveFleets} = useGetInactiveFleets(queryParams)     

    const subscriptionsBandContent: NotificationBandContent = {
        label: `${expiringSubs?.totalRecords} abonnements expirent dans 7 jours max`,
        details: `${expiringSubs?.subscriptions.map((subs) => subs.fleetName).join(', ')
            }`
    }

    const fleetBandContent: NotificationBandContent = {
        label: `${inactiveFleetsData?.totalRecords} flottes sont inactives depuis au moins 7 jours`,
        details: `${inactiveFleetsData?.fleets?.map((fleet) => fleet.fleetName).join(', ')
            }`
    }

    const {data: currencies, isLoading: isloadingCurrencies} = useGetCurrenciesList()
    // const {} = useGetCities()
    return {
        expiredSubscriptions: expiringSubs?.subscriptions,
        inactiveFleets: inactiveFleetsData?.fleets,
        subscriptionsBandContent,
        fleetBandContent,
        globalFilters,
        setGlobalFilters,
        currencies,
        isloadingCurrencies,
        totalExpiring: expiringSubs?.totalRecords,
        totalInactives: inactiveFleetsData?.totalRecords
    }

}