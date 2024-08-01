import {useMutation, useQuery} from "@tanstack/react-query";
import {useGetParkID} from "@/hooks/__globlal/useGlobalHook";
import ChatService, {ChatEpiRoutes} from "@/services/ChatService";
import {CreateDiscussionInput} from "@/types/chat.types";
import * as React from "react";
import {useRouter} from "next/navigation";
import useCourseStore from "@/app/(protected)/dashboard/races/_store/useCourseStore";
import CourseService from "@/services/CourseService";
import notify from "@/utils/func/notification";
import {CourseAddress, CreateCourseInputs} from "@/schema/course.schema";
import {setDateToTime} from "@/lib/utils";
import usePromptStore from "@/app/(protected)/dashboard/chat/_store/usePrompStore";
import {queryClient} from "@/app/_utils/network/reactQuery";


export const useGetDiscussions = () => {

    const {parkID} = useGetParkID()

    const {isLoading, data, isSuccess} = useQuery({
        queryKey: [ChatEpiRoutes.MyDiscussions],
        queryFn: () => ChatService.getMyDiscussions(parkID),
        enabled: !!parkID
    })


    return {isLoading, data}
}

export const useCreateDiscussion = () => {

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
        mutationFn: ChatService.createDiscussion
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
            seLoading(false)
            void ChatService.refreshDiscussion().then(()=>{
                setActiveDiscussion(data)
            })
        }
    }, [isSuccess])

    const handleCreateDiscussion = (discussionInputs: CreateDiscussionInput) => {
        console.log(discussionInputs)
        seLoading(true)
        mutate({...discussionInputs, park_id: parkID})
    }

    return {
        data,
        loading,
        isSuccess,
        handleCreateDiscussion,
    }

}


export const useGetDiscussionMembers = (discussionID: string|undefined) => {

    const {isLoading, data, isSuccess} = useQuery({
        queryKey: [ChatEpiRoutes.DiscussionMembers],
        queryFn: () => ChatService.getDiscussionsMembers(discussionID as string),
        enabled: !!discussionID
    })


    return {isLoading, data}
}

export const useGetDiscussionMessages = (discussionID: string|undefined) => {

    const {isLoading, data, isSuccess} = useQuery({
        queryKey: [ChatEpiRoutes.DiscussionMessages, discussionID],
        queryFn: () => ChatService.getDiscussionMessages(discussionID as string),
        enabled: !!discussionID
    })


    return {isLoading, data, refresh: ()=>queryClient.invalidateQueries({queryKey: [ChatEpiRoutes.DiscussionMessages, discussionID]})}
}