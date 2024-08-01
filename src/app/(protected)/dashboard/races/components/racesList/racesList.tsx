"use client"

import {UserCircleIcon} from "lucide-react";
import React from "react";
import {TASK_STATUS} from "@/types/entretien.types";
import {cn} from "@/lib/utils";
import {CourseInfoDialog} from "@/app/(protected)/dashboard/races/_actions/courseInfos/CourseInfosDialog";
import {useGetCourses} from "@/hooks/course/useCourse";
import Loading from "@/components/ui/Loader";
import Course from "@/model/course/Course";
import course from "@/model/course/Course";
import {useGetCurrency} from "@/hooks/__globlal/useGlobalHook";
import {CardItemMenu, CardItemMenuContainer} from "@/components/box/AdminListItemComponents";
import {EmptyData} from "@/components/box/PageNetworkState";

export const RacesList = () => {

    const {data: courses, isLoading} = useGetCourses()

    if(isLoading){
        return (
            <Loading />
        )
    }

    if (!isLoading && courses?.length == 0) {
        return (
            <EmptyData
                message={"Vous n'avez pas encore  programmer une course !"}
                description={`Vos course s'aficherons ici.`}
            />
        )
    }


    if(courses?.length){
        return (
            <div className={"flex flex-col gap-3"}>
                {courses.map((course, i) => (
                    <RaceItem course={course} key={i}/>
                ))}
            </div>
        )
    }
}

const RaceItem:React.FC<{course: Course}> = ({course}) => {

    const [courseInfoIsOpen, setCourseInfoIsOpen] = React.useState(false)
    const {currency} = useGetCurrency()

    return (
        <>
            <ItemContainer onClick={()=>setCourseInfoIsOpen(true)}>
                <div className={"flex flex-col gap-[6px]"}>
                    <TitleItem>{course.client.username}</TitleItem>
                    <Subtitle1>{course.client.phoneWithEmail}</Subtitle1>
                    <SubTitle2>{course.vehicle.getFullName} - {course.vehicle.getRegistration}</SubTitle2>
                    {course.currentDriver&&<div className="text-[#506D82] text-sm font-medium flex items-center gap-2">
                        <UserCircleIcon/>
                        <div>Chauffeur : {course.currentDriver?.getUsername}</div>
                    </div>}
                </div>
                <div className={"flex items-start gap-2"}>
                    <div className={"flex flex-col items-end gap-2"}>
                        <ItemLabel>{course.startAt}</ItemLabel>
                        <ItemLabel>{course.startHour}</ItemLabel>
                        <ItemLabel>{course.amount} {currency}</ItemLabel>
                        <ItemBadge title={course.status}/>
                    </div>

                    <div className={"mt-1"}>
                        <CardItemMenuContainer>
                            <CardItemMenu
                                name={'Voir les infos de la course'}
                                onClick={() => setCourseInfoIsOpen(true)}
                            />
                            {/*<CardItemMenu*/}
                            {/*    name={'Mettre à jour les infos du client'}*/}
                            {/*    onClick={() => setUpdateIsOpen(true)}*/}
                            {/*/>*/}
                            {/*<CardItemMenu*/}
                            {/*    variant={'red'}*/}
                            {/*    name={"Desactiver le client"}*/}
                            {/*    onClick={() => setCancelDialogIsOpen(true)}*/}
                            {/*/>*/}
                        </CardItemMenuContainer>
                    </div>
                </div>
            </ItemContainer>
            <CourseInfoDialog
                course={course}
                isMain={true}
                isOpen={courseInfoIsOpen}
                onClose={() => setCourseInfoIsOpen(false)}
            />
        </>
    )
}

export const TitleItem: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {

    return (
        <div className="text-[#506D82] text-xl font-bold leading-7">{children}</div>
    )
}

export const SubTitle2: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {
    return (
        <div className="text-[#506D82] text-sm font-bold">{children}</div>
    )
}

export const Subtitle1: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {

    return (
        <h4 className="w-[366px] text-[#506D82] text-base font-medium">{children}</h4>
    )
}

export const ItemContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children, ...props}) => {

    return (
        <div
            className={"px-[18px] py-3 bg-white rounded-[20px] flex items-start justify-between border border-transparent hover:border-slate-200 transition cursor-pointer"}
            {...props}
        >
            {children}
        </div>
    )
}

export const ItemLabel: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {

    return (
        <div className="text-[#506D82] text-sm font-medium">{children}</div>
    )
}

export const ItemBadge: React.FC<React.HTMLAttributes<HTMLDivElement> & { title: TASK_STATUS }> = ({title}) => {

    let badgeColor = ``
    let badgeTitle = "En entente"

    switch (title) {
        case TASK_STATUS.AWAITING:
            badgeTitle = "En entente"
            badgeColor = "bg-yellow-100 text-yellow-500"
            break
        case TASK_STATUS.INPROGRES:
            badgeTitle = "En enour"
            badgeColor = "bg-yellow-100 text-yellow-500"
            break
        case TASK_STATUS.CANCELED:
            badgeTitle = "Annulé"
            badgeColor = "text-red-600 bg-rose-100"
            break
        case TASK_STATUS.FINISHED:
            badgeTitle = "Teminé"
            badgeColor = "text-green-400 bg-lime-50"
            break


    }

    return (
        <div className={cn(
            "text-center  text-xs font-semibold font-vInter leading-[10.92px] p-[2.73px] 0 rounded-sm w-fit",
            badgeColor
        )}>
            {badgeTitle}
        </div>
    )
}

