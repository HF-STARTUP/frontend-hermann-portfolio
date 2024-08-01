import * as React from "react"
import {useMutation, useQuery} from "@tanstack/react-query";
import {useGetMyPosition, useGetParkID} from "@/hooks/__globlal/useGlobalHook";
import DrawalService, {WithdrawApiRoutes} from "@/services/DrawalService";
import {useRouter} from "next/navigation";
import notify from "@/utils/func/notification";
import {AddDrawalInputs, RemoveMoneyInputs} from "@/types/drawal.types";


export const useGetParkAmount = () => {

    const {parkID} = useGetParkID()

    const {isLoading, data, isSuccess} = useQuery({
        queryKey: [WithdrawApiRoutes.ParkAmount],
        queryFn: () => DrawalService.requestParkAmount(parkID),
        enabled: !!parkID
    })


    return {isLoading, data}
}


export const useGetDashboardInfos = () => {

    const {parkID} = useGetParkID()

    const {isLoading, data, isSuccess} = useQuery({
        queryKey: [WithdrawApiRoutes.DashboardInfos],
        queryFn: () => DrawalService.dahsboarInfos(parkID),
        enabled: !!parkID
    })


    return {isLoading, data}
}


export const useGetParkTransaction = () => {

    const {parkID} = useGetParkID()

    const {isLoading, data, isSuccess} = useQuery({
        queryKey: [WithdrawApiRoutes.MyTransactions],
        queryFn: () => DrawalService.requestParkTransaction(parkID),
        enabled: !!parkID
    })


    return {isLoading, data}
}


export const useGetWithdrawalMode = () => {

    const {data: countries_infos} = useGetMyPosition()

    const {isLoading, data, isSuccess} = useQuery({
        queryKey: [WithdrawApiRoutes.RequestWithdrawMode],
        queryFn: () => DrawalService.requestWithdrawModes({country_iso_code: countries_infos?.country_code as string}),
        enabled: !!countries_infos
    })


    return {isLoading, data}
}

export const useGetMyDrawals = () => {

    const {parkID} = useGetParkID()


    const {isLoading, data, isSuccess} = useQuery({
        queryKey: [WithdrawApiRoutes.RequestMyDrawals],
        queryFn: () => DrawalService.requestMyDrawals(parkID),
        enabled: !!parkID
    })


    return {isLoading, data}
}


export const useAddDrawalMode = () => {

    const [loading, seLoading] = React.useState(false)

    const $router = useRouter()

    const {
        mutate,
        isIdle,
        isError,
        error,
        isSuccess,
        data
    } = useMutation({
        mutationFn: DrawalService.addDrawalMode
    })

    const {parkID} = useGetParkID()


    React.useEffect(() => {
        if (isError && error) {
            notify(error.message, 'error')
            seLoading(false)
        }
    }, [error, isError])

    React.useEffect(() => {
        if (isSuccess) {
            DrawalService.refreshMyDrawals().then(() => {
                notify("Moyen de retrait ajouté")
            })
            seLoading(false)
        }
    }, [isSuccess])

    const handleAdddDrawalMode = (inputs: AddDrawalInputs) => {
        seLoading(true)
        mutate({...inputs, park_id: parkID})
    }

    return {
        data,
        loading,
        isSuccess,
        handleAdddDrawalMode,
    }

}


export const useRemoveMoney = () => {

    const [loading, seLoading] = React.useState(false)

    const $router = useRouter()

    const {
        mutate,
        isIdle,
        isError,
        error,
        isSuccess,
        data
    } = useMutation({
        mutationFn: DrawalService.requestRemoveMoney
    })

    const {parkID} = useGetParkID()


    React.useEffect(() => {
        if (isError && error) {
            notify(error.message, 'error')
            seLoading(false)
        }
    }, [error, isError])

    React.useEffect(() => {
        if (isSuccess) {
            DrawalService.refreshMyDrawals().then(() => {
                notify("Moyen efectué")
            })
            seLoading(false)
        }
    }, [isSuccess])

    const handleRemoveMoney = (inputs: RemoveMoneyInputs) => {
        seLoading(true)
        mutate({...inputs, park_id: parkID})
    }

    return {
        data,
        loading,
        isSuccess,
        handleRemoveMoney,
    }

}
