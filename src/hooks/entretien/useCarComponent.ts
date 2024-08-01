import * as React from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import EntretienService, {EntretienApiPath} from "@/services/EntretienService";
import {useRouter} from "next/navigation";
import notify from "@/utils/func/notification";
import {CreateCarComponentInputs} from "@/types/entretien.types";

export const useGetCarComponent = () => {
    const {isLoading, data} = useQuery({
        queryKey: [EntretienApiPath.CarComponent],
        queryFn: EntretienService.getCarComponents
    })

    return {isLoading, data}
}

export const useAddCarComponent = () => {

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
        mutationFn: EntretienService.addCarComponent
    })


    React.useEffect(() => {
        if (isError && error) {
            notify(error.message, 'error')
            seLoading(false)
        }
    }, [error, isError])

    React.useEffect(() => {
        if (isSuccess) {
            seLoading(false)
            EntretienService.invalidCarComponent().then(r => notify("Composant ajouté"))
        }
    }, [isSuccess])

    const handleCreateCarComponent = async (datas: CreateCarComponentInputs) => {
        seLoading(true)
        mutate(datas)
    }

    return {
        data,
        isSuccess,
        loading,
        handleCreateCarComponent,
    }

}