"use client";

import React, {MouseEventHandler} from "react";
import DialogBase, {AdminDialogHead, DefaultDialogMainBody, DialogActions} from "@/components/dialog/Dialog";
import FormGroup from "@/components/box/FormGroup";
import Course from "@/model/course/Course";
import {useEndCourse, useGetCourse} from "@/hooks/course/useCourse";
import Loading from "@/components/ui/Loader";
import {useGetCurrency} from "@/hooks/__globlal/useGlobalHook";
import {ScrollArea} from "@/components/ui/scroll-area";
import MapRouteComponent from "@/app/(protected)/dashboard/geolocation/_components/map/MapRouteComponent";
import {MapLoad} from "@/app/(protected)/dashboard/geolocation/_components/mapCarStat/_utils/mapLoad";
import {cn} from "@/lib/utils";
import {TASK_STATUS} from "@/types/entretien.types";

export const CourseInfoDialog: React.FC<{
    course?: Course,
    isOpen: boolean,
    onClose: (value: boolean) => void,
    isMain?: boolean,
    isSubDialog?: boolean
} & React.HTMLAttributes<HTMLDivElement>> = ({
                                                 isOpen,
                                                 isSubDialog = false,
                                                 course: course,
                                                 isMain = false,
                                                 onClose,
                                                 children,
                                                 ...props
                                             }) => {
    const [courseID, setCourseID] = React.useState<string>()

    const {data: courseInfos, isLoading} = useGetCourse(courseID)
    const {handleEndCourse, loading: endingCourse, isSuccess: endingCourseSuccess} = useEndCourse()

    const {currency} = useGetCurrency()

    React.useEffect(()=>{
        if(isOpen){
            setCourseID(course?.id)
            console.log("Requesting course")
        }
    }, [course, isOpen])

    React.useEffect(()=>{
        if(!endingCourse && endingCourseSuccess){
            onClose(true)
        }
    }, [endingCourse, endingCourseSuccess])



    const onEndCourse = ()=> {
        handleEndCourse({course_id: course?.id, status: TASK_STATUS.FINISHED})
    }

    const onCancelCourse = ()=> {
        handleEndCourse({course_id: course?.id, status: TASK_STATUS.CANCELED})
    }


    return (
        <div {...props}>
            <DialogBase
                isSubDialog={isSubDialog}
                variant={'sm'}
                isOpenned={isOpen}
                onClose={onClose}
                bgType={'whited'}
                className={"max-w-[1172px] max-h-full"}
            >
                <div>
                    <AdminDialogHead
                        withBack={!isMain}
                        title={'Infos courses'}
                        handleToggle={onClose as unknown as MouseEventHandler<HTMLDivElement>}/>
                    <DefaultDialogMainBody>
                        <div className={"grid grid-cols-12 gap-8"}>
                            <div className={"col-span-6"}>
                                {isLoading&&<Loading />}
                                {courseInfos&&<ScrollArea className={"h-[420px]"}>
                                    <FormGroup adminForm={true} groupTitle={'Informations générales'}>
                                        <CourseInfoItem label={"Nom du client :"}>{courseInfos.client.username}</CourseInfoItem>
                                        <CourseInfoItem label={"Véhicule :"}>{courseInfos.vehicle.getFullName}</CourseInfoItem>
                                        {courseInfos.currentDriver&&<CourseInfoItem
                                            label={"Chauffeur :"}>{courseInfos.currentDriver?.getUsername}</CourseInfoItem>}
                                        <CourseInfoItem label={"Email client :"}>{courseInfos.client.email}</CourseInfoItem>
                                        <CourseInfoItem label={"Téléphone du client :"}>{courseInfos.client.phone}</CourseInfoItem>
                                        <CourseInfoItem label={"Date et heure :"}>{courseInfos.startAt}</CourseInfoItem>
                                        <CourseInfoItem label={"Lieu de départ :"}>{courseInfos.startAddressName}</CourseInfoItem>
                                        <CourseInfoItem label={"Lieu d’arrivée :"}>{courseInfos.endAddressName}</CourseInfoItem>
                                        <CourseInfoItem label={"Montant de la course :"}>{courseInfos.amount} {currency}</CourseInfoItem>
                                        <CourseInfoItem label={"Distance :"}>{courseInfos.distance}</CourseInfoItem>
                                    </FormGroup>
                                </ScrollArea>}
                            </div>
                            <div className={"col-span-6"}>
                                <div
                                    className={"w-full bg-slate-100 rounded-lg h-[409px] overflow-hidden"}>
                                   <div className={cn(
                                       (courseInfos?.startAddress && courseInfos?.endAddress)&&!isLoading ? "block" : "hidden"
                                   )}>
                                       <MapRouteComponent
                                           endAddress={courseInfos?.endAddress}
                                           startAddress={courseInfos?.startAddress}
                                       />
                                   </div>
                                    <div className={cn(
                                        "h-full w-full flex items-center justify-center",
                                    )}>
                                        {(!courseInfos?.startAddress || !courseInfos?.endAddress) && (
                                            <MapLoad/>
                                        )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DefaultDialogMainBody>
                    {courseInfos?.isAvailable&&<DialogActions className={`pt-[30px]`}>

                        <button
                            disabled={endingCourse}
                            onClick={onCancelCourse}
                            className={"bg-rose-50 text-red-600 py-[11px] text-sm font-semibold  leading-[17.07px] hover:bg-rose-100 rounded-[10px]"}
                        >
                            {endingCourse ? "Validation en cour..." : "Annuler la course"}
                        </button>

                        {courseInfos.isEditable&&<button
                            disabled={endingCourse}
                            className={"text-black bg-gray-200 py-[11px] text-sm font-semibold leading-[17.07px] hover:bg-gray-300 rounded-[10px]"}
                        >
                            Modifier les informations de la course
                        </button>
                        }
                        {/*<button*/}
                        {/*    disabled={endingCourse}*/}
                        {/*    onClick={onEndCourse}*/}
                        {/*    className={"text-white  bg-[#2554AE] py-[11px] text-sm font-semibold leading-[17.07px] hover:opacity-85 rounded-[10px]"}*/}
                        {/*>*/}
                        {/*    {endingCourse ? "Validation en cour..." : "Terminer la course"}*/}
                        {/*</button>*/}

                    </DialogActions>}
                </div>
            </DialogBase>
        </div>
    )
}

const CourseInfoItem: React.FC<React.HTMLAttributes<HTMLDivElement> & { label: string }> = ({label, children}) => {
    return (
        <div className={"flex items-center justify-between"}>
        <div className="text-[#506D82] text-sm font-bold leading-7">{label}</div>
            <div className={"text-[#506D82] text-sm font-normal  leading-7"}>{children}</div>
        </div>
    )
}