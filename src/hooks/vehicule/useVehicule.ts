import VehiculeService from "@/services/VehiculeService";
import React from "react";
import {useGetParkID, useGetRegion} from "@/hooks/__globlal/useGlobalHook";
import {useQuery} from "@tanstack/react-query";

export function useGetVehiculeTypes() {

    return VehiculeService.getVehiculeTypeQuery();
}

export function useGetVehiculeBrands() {

    return VehiculeService.getVehiculeBrandsQuery();
}

export function useGetVehiculeModels(brandID: number | null) {
    return VehiculeService.getVehiculeModelsQuery(brandID);
}

export function useGetVehiculeColors() {
    return VehiculeService.getVehiculeColorsQuery();
}

export function useGetVehiculeContratsType() {
    return VehiculeService.getVehiculeContratsTypeQuery();
}

export function useGetCurencies() {
    return VehiculeService.getCurenciesQuery();
}

export function useGetVehicules() {

    const {parkID} = useGetParkID()

    return VehiculeService.getVehiculesQuery(parkID);
}

export function useGetVehiculeOwner() {
    return VehiculeService.getVehiculeOwnerQuery();
}


export function useSetVehiculeOwner() {
    const {isIdle, isError, isSuccess, ...other} = VehiculeService.addVehiculeOwnerMutation();
    const isLoading = !isIdle && !isError && !isSuccess;
    return {
        invalidData: VehiculeService.invalidOwnerData,
        isIdle,
        isError,
        isSuccess,
        isLoading,
        ...other
    }

}

export function useSetVehicule() {
    const {isIdle, isError, isSuccess, ...other} = VehiculeService.addVehiculeMutation();
    const isLoading = !isIdle && !isError && !isSuccess;
    return {
        invalidData: VehiculeService.invalidVehiculesData,
        isIdle,
        isError,
        isSuccess,
        isLoading,
        ...other
    }

}

export const useVehiculeSelection = (initialBrandId = null) => {
    const [activeVehiculeBrand, setActiveVehiculeBrand] = React.useState<number | null>(initialBrandId);
    const [activeVehiculeModel, setActiveVehiculeModel] = React.useState<number | null>(null);

    const {isLoading: loadingVehiculeBrands, data: vehiculeBrands} = useGetVehiculeBrands();
    const {isLoading: loadingVehiculeModels, data: vehiculeModels} = useGetVehiculeModels(activeVehiculeBrand);

    React.useEffect(() => {
        if (!loadingVehiculeBrands && vehiculeBrands && vehiculeBrands.length > 0) {
            setActiveVehiculeBrand(vehiculeBrands[0].id);
        }
    }, [loadingVehiculeBrands, vehiculeBrands]);

    React.useEffect(() => {
        if (!loadingVehiculeModels && vehiculeModels && vehiculeModels.length > 0) {
            setActiveVehiculeModel(vehiculeModels[0].id);
        } else {
            setActiveVehiculeModel(null);
        }
    }, [activeVehiculeBrand, loadingVehiculeModels, vehiculeModels]);

    return {
        activeVehiculeBrand,
        setActiveVehiculeBrand,
        activeVehiculeModel,
        setActiveVehiculeModel,
        loadingVehiculeBrands,
        vehiculeBrands,
        loadingVehiculeModels,
        vehiculeModels
    };
};


export function useMakePassationTransfert() {
    const {isIdle, isError, isSuccess, ...other} = VehiculeService.makePassationTransferMutation();
    const isLoading = !isIdle && !isError && !isSuccess;
    return {
        //refresh: VehiculeService.invalidVehiculesData,
        isIdle,
        isError,
        isSuccess,
        isLoading,
        ...other
    }

}

export function useAddVehiculeContratType() {
    const {isIdle, isError, isSuccess, ...other} = VehiculeService.addNewContractTypeMutation();
    const isLoading = !isIdle && !isError && !isSuccess;
    return {
        refresh: VehiculeService.invalidContratTypes,
        isIdle,
        isError,
        isSuccess,
        isLoading,
        ...other
    }
}

export function useToggleVehiculeDeactivation() {

    const {isIdle, isError, isSuccess, ...other} = VehiculeService.toggleVehiculeDeactivationQuery();
    const isLoading = !isIdle && !isError && !isSuccess;
    return {
        refresh: VehiculeService.invalidVehiculesData,
        isIdle,
        isError,
        isSuccess,
        isLoading,
        ...other
    }
}

export function useSetVehiculeGroup() {
    const {isIdle, isError, isSuccess, ...other} = VehiculeService.addVehiculeGroupMutation();
    const isLoading = !isIdle && !isError && !isSuccess;
    return {
        invalidData: VehiculeService.invalidVehiculeGroup,
        isIdle,
        isError,
        isSuccess,
        isLoading,
        ...other
    }
}


export function useGetVehiculeGroup() {

    const {parkID} = useGetParkID()

    return VehiculeService.getVehiculesGroupQuery(parkID);
}

export function useDeleteVehiculeGroup(groupID: string) {

    const {region_id} = useGetRegion()

    return VehiculeService.getVehiculesGroupQuery(region_id);
}


export function useGetVehicle(vehicleID: string) {

    const {isLoading, data} = useQuery({
        queryKey: [`vehicle::single:${vehicleID}`],
        queryFn: () => VehiculeService.getVehicule(vehicleID),
        enabled: !!vehicleID
    })

    return {
        isLoading,
        vehicle: data
    }
}

export function useGetVehicleAllData(vehicleID: string) {

    const {isLoading, data} = useQuery({
        queryKey: [`vehicle::all:${vehicleID}`],
        queryFn: () => VehiculeService.getVehiculeAllData(vehicleID),
        enabled: !!vehicleID
    })

    return {
        isLoading,
        vehicle: data
    }
}

export function useGetVehiclesFeaturedExpiredDoc() {

    const {parkID} = useGetParkID()

    const {isLoading, data} = useQuery({
        queryKey: [`vehicles-featured-expired-doc`],
        queryFn: () => VehiculeService.getVehiculesFeaturedExpired(parkID)
    })

    return {
        isLoading,
        vehicle: data
    }
}
