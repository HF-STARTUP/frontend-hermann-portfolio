import * as React from "react";
import {useRouter} from "next/navigation";
import usePromptStore from "@/app/(protected)/dashboard/chat/_store/usePrompStore";
import {useMutation} from "@tanstack/react-query";
import ChatService from "@/services/ChatService";
import {useGetParkID} from "@/hooks/__globlal/useGlobalHook";
import notify from "@/utils/func/notification";
import {CreateDiscussionInput} from "@/types/chat.types";
import MediaService, {FileUploadInput} from "@/services/media/MediaService";

export const useUploadFile = () => {

    const [loading, seLoading] = React.useState(false)

    const $router = useRouter()

    const {setActiveDiscussion} = usePromptStore()

    const {
        mutate,
        isIdle,
        isError,
        error,
        isSuccess,
        data
    } = useMutation({
        mutationFn: MediaService.uploadFile
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

        }
    }, [isSuccess])

    const onUploadFile = (file: FileUploadInput) => {
        seLoading(true)
        mutate(file)
    }

    return {
        data,
        loading,
        isSuccess,
        onUploadFile,
    }

}
