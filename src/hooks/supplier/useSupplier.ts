"use client"

import SupplierService from "@/services/SupplierService";
import {useGetParkID} from "@/hooks/__globlal/useGlobalHook";

export const useSetSupplier = () => {
    const {isIdle, isError, isSuccess, ...other} = SupplierService.addSupplierMutation()
    const isLoading = !isIdle && !isError && !isSuccess;
    return{
        invalidSuppliers: SupplierService.invalidSuppliers,
        isIdle,
        isError,
        isSuccess,
        isLoading,
        ...other
    }
}

export const useSetNewSupplierCtg = () => {
    const {isIdle, isError, isSuccess, ...other} = SupplierService.addNewSupplierCtgMutation()
    const isLoading = !isIdle && !isError && !isSuccess;
    return{
        invalidData: SupplierService.invalidSuppliersCtg,
        isIdle,
        isError,
        isSuccess,
        isLoading,
        ...other
    }
}

export const useGetSupplierCtg = () => {
  return SupplierService.getSuppliersCtgQuery()
}


export const useGetSuppliers = (regionID?: string) => {
    const {parkID} = useGetParkID()
    return SupplierService.getSuppliersQuery(parkID)
}


export const useSuspendSupplier = () => {
    const {isIdle, isError, isSuccess, ...other} = SupplierService.toggleSuspensionMutation()
    const isLoading = !isIdle && !isError && !isSuccess;
    return{
        invalidData: SupplierService.invalidSuppliers,
        isIdle,
        isError,
        isSuccess,
        isLoading,
        ...other
    }
}
