import React from "react";
import {useRouter} from "next/navigation";
import {useMutation, useQuery} from "@tanstack/react-query";
import EntretienService, {EntretienApiPath} from "@/services/EntretienService";
import notify from "@/utils/func/notification";
import {CreateEntretienInputs} from "@/types/entretien.types";
import {useGetParkID} from "@/hooks/__globlal/useGlobalHook";
import useEntretienStore from "@/stores/protected/dashboard/entretien/useEntretienStore";
import {FinishEntretienInterface} from "@/schema/vehicule.schema";

export const useCreateEntretien = () => {

    const [loading, seLoading] = React.useState(false)
    const {resetMaintenaces} = useEntretienStore()

    const $router = useRouter()

    const {
        mutate,
        isIdle,
        isError,
        error,
        isSuccess,
        data
    } = useMutation({
        mutationFn: EntretienService.createNewEntretien
    })


    React.useEffect(() => {
        if (isError && error) {
            notify(error.message, 'error')
            seLoading(false)
        }
    }, [error, isError])

    React.useEffect(() => {
        if (isSuccess) {
            resetMaintenaces()
            EntretienService.invalidEntretiens().then(()=>{
                notify("Entretien programmé")
            })
            seLoading(false)
        }
    }, [isSuccess])

    const handleCreateEntretien = (datas: CreateEntretienInputs) => {
        console.log(datas)
        seLoading(true)
        mutate(datas)
    }

    return {
        data,
        loading,
        handleCreateEntretien,
    }

}


export const useFinishEntretien = () => {

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
        mutationFn: EntretienService.finishEntretien
    })


    React.useEffect(() => {
        if (isError && error) {
            notify(error.message, 'error')
            seLoading(false)
        }
    }, [error, isError])

    React.useEffect(() => {
        if (isSuccess) {
            EntretienService.invalidEntretiens().then(()=>{
                notify("Entretien clôturer")
            })
            seLoading(false)
        }
    }, [isSuccess])

    const handleFinishEntretien = (datas: FinishEntretienInterface) => {
        console.log(datas)
        seLoading(true)
        mutate(datas)
    }

    return {
        data,
        loading,
        isSuccess,
        handleCreateEntretien: handleFinishEntretien,
    }

}


export const useCancelEntretien = () => {

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
        mutationFn: EntretienService.cancelEntretien
    })


    React.useEffect(() => {
        if (isError && error) {
            notify(error.message, 'error')
            seLoading(false)
        }
    }, [error, isError])

    React.useEffect(() => {
        if (isSuccess) {
            EntretienService.invalidEntretiens().then(()=>{
                notify("Entretien annulé")
            })
            seLoading(false)
        }
    }, [isSuccess])

    const handleCancelEntretien = (id: number) => {
        seLoading(true)
        mutate(id)
    }

    return {
        data,
        loading,
        isSuccess,
        handleCancelEntretien,
    }

}



export const useGetEntretiens = () => {

    const {parkID} = useGetParkID()

    const {isLoading, data, isSuccess} = useQuery({
        queryKey: [EntretienApiPath.GetEntretien],
        queryFn: ()=>EntretienService.getEntretiens(parkID),
        enabled: !!parkID
    })


    return {isLoading, data}
}

export const useGetRepairTypes = () => {
    const {isLoading, data} = useQuery({
        queryKey: [EntretienApiPath.RepairType],
        queryFn: EntretienService.getRepairsType
    })

    return {isLoading, data}
}