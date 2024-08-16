import {useQuery} from "@tanstack/react-query";
import AuthManagerGuard from "@/guard/AuthManagerGuard";
import FleetService, {FleetApiPath} from "@/services/admin/fleet/fleetService";
import {useQueryProvider} from "@/hooks/hooksProvider";
import {useGetParkID} from "@/hooks/__globlal/useGlobalHook";

export const useGetFleetsList = () => {

    const enable_city_id = AuthManagerGuard.getEnabledCity
    const fleetType = AuthManagerGuard.getEnabledFleetType

    const {isLoading, data, isSuccess} = useQuery({
        queryKey: [FleetApiPath.GetFleetByCityID, enable_city_id, fleetType],
        queryFn: () => FleetService.GetFleetByCityID({
            city_id: AuthManagerGuard.getEnabledCity as string,
            fleet_type: AuthManagerGuard.getEnabledFleetType as string
        }),
        enabled: !!enable_city_id && !!fleetType
    })


    return {isLoading, data}
}

export const useGetFleetAdmin = () => {

    const {parkID} = useGetParkID()

    const {isLoading, data} = useQueryProvider({
        queryKey: [FleetApiPath.GetAdminByCityID, parkID],
        queryFn: () => FleetService.getAdminsOnFleet({park_id: parkID}),
        enabled: !!parkID
    })

    return {isLoading, data}
}

export const useGetSubscriptionHistoryOnFleet = () => {

    const {parkID} = useGetParkID()

    const {isLoading, data} = useQueryProvider({
        queryKey: [FleetApiPath.ActiveSubscriptionList, parkID],
        queryFn: () => FleetService.getActiveSubscriptionList({park_id: parkID}),
        enabled: !!parkID
    });

    return {isLoading, data}
}

export const useGetActiveSubscriptionOnFleet = () => {

    const {parkID} = useGetParkID()

    const {isLoading, data} = useQueryProvider({
        queryKey: [FleetApiPath.ActiveSubscription, parkID],
        queryFn: () => FleetService.getActiveSubscription({parkID}),
        enabled: !!parkID
    });

    return {isLoading, data}
}

export const useGetFleetDetails = () => {

    const enable_city_id = AuthManagerGuard.getEnabledCity as string

    const {isLoading, data} = useQueryProvider({
        queryKey: [FleetApiPath.FleetDetails, enable_city_id],
        queryFn: () => FleetService.getFleetDetails({fleetID: enable_city_id}),
        enabled: !!enable_city_id
    });

    return {isLoading, data}
}

export const useGetFleetProfilesVehiclesDetails = () => {

    const {parkID} = useGetParkID()

    const {isLoading, data} = useQueryProvider({
        queryKey: [FleetApiPath.FleetVehiclesAndProfiles, parkID],
        queryFn: () => FleetService.getFleetVehiclesAndProfilesDetails({fleetID: parkID}),
        enabled: !!parkID
    });

    return {isLoading, data}
}


export const useGetFleetStats = () => {

    const cityID = AuthManagerGuard.getEnabledCity

    const {isLoading, data} = useQueryProvider({
        queryKey: [FleetApiPath.FleetStats, cityID],
        queryFn: () => FleetService.getFleetStats({fleetID: cityID as string}),
        enabled: !!cityID
    });

    return {isLoading, data}
}

export const useGetSpecificFleetStats = () => {

    const {parkID} = useGetParkID()

    const {isLoading, data} = useQueryProvider({
        queryKey: [FleetApiPath.SpecificFleetStat, parkID],
        queryFn: () => FleetService.getSpecificFleetStat({fleetID: parkID as string}),
        enabled: !!parkID
    });

    return {isLoading, data}
}


//Fleet Graph
export const useGetCourseEvolution = () => {
    const {parkID} = useGetParkID()

    const {isLoading, data} = useQueryProvider({
        queryKey: [FleetApiPath.CourseEvolution, parkID],
        queryFn: () => FleetService.getCourseEvolution({fleetID: parkID as string, graphType: "month"}),
        enabled: !!parkID
    });

    return {isLoading, data}
}

export const useGetRevenusEvolution = () => {
    const {parkID} = useGetParkID()

    const {isLoading, data} = useQueryProvider({
        queryKey: [FleetApiPath.RevenusEvolution, parkID],
        queryFn: () => FleetService.getRevenusEvolution({fleetID: parkID as string, graphType: "month"}),
        enabled: !!parkID
    });

    return {isLoading, data}
}

export const useGetEntretienEvolution = () => {
    const {parkID} = useGetParkID()

    const {isLoading, data} = useQueryProvider({
        queryKey: [FleetApiPath.EntretienEvolution, parkID],
        queryFn: () => FleetService.getEntretienEvolution({
            fleetID: parkID as string,
            graphType: "month",
            date: new Date()
        }),
        enabled: !!parkID
    });

    return {isLoading, data}
}

