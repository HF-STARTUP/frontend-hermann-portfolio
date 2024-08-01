import ScheduleService from "@/services/schedule/ScheduleService";
import {useGetParkID, useGetRegion} from "@/hooks/__globlal/useGlobalHook";

export const useGetHours = () => {
    return ScheduleService.getHoursQuery()
}

export function useSetConfigurationGroup() {
    const {isIdle, isError, isSuccess, ...dataFn} = ScheduleService.setRotationGroupMutation();

    const isLoading = !isIdle && !isError && !isSuccess;

    return {
        invalidRotationsGroup: ScheduleService.invalidRotationGroups,
        isLoading,
        isIdle,
        isError,
        isSuccess,
        ...dataFn
    }
}

export const useGetRotationsGroup = () => {

    const {parkID} = useGetParkID()

    return ScheduleService.getRotationsGroupQuery(parkID)
}