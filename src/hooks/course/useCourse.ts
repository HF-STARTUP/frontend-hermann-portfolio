import React from "react";
import {useRouter} from "next/navigation";
import {useMutation, useQuery} from "@tanstack/react-query";
import notify from "@/utils/func/notification";
import {useGetParkID} from "@/hooks/__globlal/useGlobalHook";
import {CourseAddress, CreateCourseInputs} from "@/schema/course.schema";
import CourseService from "@/services/CourseService";
import courseService, {CourseApiPath} from "@/services/CourseService";
import useCourseStore from "@/app/(protected)/dashboard/races/_store/useCourseStore";
import {setDateToTime} from "@/lib/utils";
import {TASK_STATUS} from "@/types/entretien.types";

export const useCreateCourse = () => {

    const [loading, seLoading] = React.useState(false)

    const $router = useRouter()
    const {startLocation, endLocation} = useCourseStore()

    const {
        mutate,
        isIdle,
        isError,
        error,
        isSuccess,
        data
    } = useMutation({
        mutationFn: CourseService.createNewCourse
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
            CourseService.refreshCourse().then(() => {
                notify("Course programmé avec success")
            })
            seLoading(false)
        }
    }, [isSuccess])

    const handleCreateCourse = ({start_hour, end_hour, ...course}: CreateCourseInputs) => {
        seLoading(true)
        mutate({
            ...course,
            park_id: parkID,
            start_address: startLocation as CourseAddress,
            end_address: endLocation as CourseAddress,
            start_date: setDateToTime(course?.start_date, `${start_hour}`),
            end_date: setDateToTime(course?.end_date, `${end_hour}`)
        })
    }

    return {
        data,
        loading,
        isSuccess,
        handleCreateCourse,
    }

}


export const useEndCourse = () => {

    const [loading, seLoading] = React.useState(false)
    const [isCancel, setIsCancel] = React.useState(false)

    const $router = useRouter()

    const {
        mutate,
        isIdle,
        isError,
        error,
        isSuccess,
        data
    } = useMutation({
        mutationFn: CourseService.updateCourse
    })


    React.useEffect(() => {
        if (isError && error) {
            notify(error.message, 'error')
            seLoading(false)
        }
    }, [error, isError])

    React.useEffect(() => {
        if (isSuccess) {
            CourseService.refreshCourse().then(() => {
                notify(isCancel ? "Course annulé" : "Course terminé")
            })
            seLoading(false)
        }
    }, [isSuccess])

    const handleEndCourse = ({start_hour, end_hour, ...course}: CreateCourseInputs) => {
        if (course.status === TASK_STATUS.CANCELED) setIsCancel(true)
        else setIsCancel(false)

        seLoading(true)
        mutate({
            ...course
        })
    }

    return {
        data,
        loading,
        isSuccess,
        handleEndCourse,
    }

}

export const useGetCourses = () => {

    const {parkID} = useGetParkID()

    const {isLoading, data, isSuccess} = useQuery({
        queryKey: [CourseApiPath.getCourses],
        queryFn: () => courseService.getCourses(parkID),
        enabled: !!parkID
    })


    return {isLoading, data}
}

export const useGetCourse = (courseID?: string) => {


    const {isLoading, data, isSuccess} = useQuery({
        queryKey: [CourseApiPath.getCourses + `:${courseID}`],
        queryFn: () => courseService.getCourse(courseID as string),
        enabled: !!courseID
    })


    return {isLoading, data}
}