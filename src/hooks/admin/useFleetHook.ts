import {useQuery} from "@tanstack/react-query";
import AuthManagerGuard from "@/guard/AuthManagerGuard";
import FleetService, {FleetApiPath} from "@/services/admin/fleet/fleetService";

export const useGetFleetsList = () => {

    const enable_city_id = AuthManagerGuard.getEnabledCity
    const fleetType = AuthManagerGuard.getEnabledFleetType

    //console.log(fleetType, "====")

    const {isLoading, data, isSuccess} = useQuery({
        queryKey: [FleetApiPath.GetFleetByCityID, enable_city_id, fleetType],
        queryFn: () => FleetService.GetFleetByCityID({
            city_id:  AuthManagerGuard.getEnabledCity as string,
            fleet_type:  AuthManagerGuard.getEnabledFleetType as string
        }),
        enabled: !!enable_city_id && !!fleetType
    })


    return {isLoading, data}
}