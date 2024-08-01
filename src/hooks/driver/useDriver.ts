import DriverService, {driverServiceRoutes} from "@/services/DriverService";
import {VSelectProp} from "@/components/form/TextField";
import {useGetParkID} from "@/hooks/__globlal/useGlobalHook";
import {useQuery} from "@tanstack/react-query";


export function useGetDaysOfTheWeeks() {
    const dayOfTheWeeks: VSelectProp[] = [
        {value: '0', label: 'Aucun'},
        {value: '1', label: 'Lundi'},
        {value: '2', label: 'Mardi'},
        {value: '3', label: 'Mercredi'},
        {value: '4', label: 'Jeudi'},
        {value: '5', label: 'Vendredi'},
        {value: '6', label: 'Samedi'},
        {value: '7', label: 'Dimanche'},
    ]

    const resolveDayOff = (day: number): VSelectProp => {
        return dayOfTheWeeks.find((d, i) => +d.value === day) as VSelectProp
    }

    return {
        resolveDayOff,
        dayOfTheWeeksProps: dayOfTheWeeks
    }
}

export function useGetGrades() {
    return DriverService.getGradeQuery();
}


export function useGetDriver(driverID: string | null | undefined) {

    const {data, isLoading} = useQuery({
        queryKey: [driverServiceRoutes.getDriver, driverID],
        queryFn: () => DriverService.getDriver(driverID),
        enabled: !!driverID
    })
    return {data, isLoading};
}

export function useGetDriverInfos(driverID: string | null | undefined) {

    const {data, isLoading} = useQuery({
        queryKey: [`all::${driverServiceRoutes.getDriver}`, driverID],
        queryFn: () => DriverService.getAllDriverInfo(driverID),
        enabled: !!driverID
    })
    return {data, isLoading};
}


export function useGetAgents() {

    const {parkID} = useGetParkID()

    const {data, isLoading} = useQuery({
        queryKey: [driverServiceRoutes.requestAgents],
        queryFn: () => DriverService.getAgents(parkID),
        enabled: !!parkID
    })

    return {data, isLoading};
}

export function useGetDriverTypes() {
    return DriverService.getDriverTypeQuery();
}

export function useGetDrivers() {
    return DriverService.getDriversQuery({});
}

export function useGetDriversToEncaissToday() {
    return DriverService.getUnencassedDriversQuery();
}


export function useAddDriver() {
    const {isIdle, isError, isSuccess, ...dataFn} = DriverService.addDriverMutation();

    const isLoading = !isIdle && !isError && !isSuccess;

    return {
        invalidDrivers: DriverService.invalidDrivers,
        isLoading,
        isIdle,
        isError,
        isSuccess,
        ...dataFn
    }
}

export function useAddDriverGroup() {
    const {isIdle, isError, isSuccess, ...dataFn} = DriverService.addDriverGroupMutation();

    const isLoading = !isIdle && !isError && !isSuccess;

    return {
        refresh: DriverService.invalidDriversGroup,
        isLoading,
        isIdle,
        isError,
        isSuccess,
        ...dataFn
    }
}

export function useSuspendDriver() {
    const {isIdle, isError, isSuccess, ...dataFn} = DriverService.suspendDriverMutation();

    const isLoading = !isIdle && !isError && !isSuccess;

    return {
        refresh: DriverService.invalidDrivers,
        isLoading,
        isIdle,
        isError,
        isSuccess,
        ...dataFn
    }
}

export function useDeactivateDriver() {
    const {isIdle, isError, isSuccess, ...dataFn} = DriverService.deactivateDriverMutation();

    const isLoading = !isIdle && !isError && !isSuccess;

    return {
        refresh: DriverService.invalidDrivers,
        isLoading,
        isIdle,
        isError,
        isSuccess,
        ...dataFn
    }
}

export function useGetDriversGroup() {
    return DriverService.getDriversGroupQuery();
}

