"use client"

import { Crumb } from "@/components/ui/custom/crumb";
import { PageTitle } from "@/components/ui/custom/PageTitle";
import React from "react";
import Course from "@/model/course/Course";
import { useGetCurrency } from "@/hooks/__globlal/useGlobalHook";
import { UserCircleIcon } from "lucide-react";
import { CardItemMenu, CardItemMenuContainer } from "@/components/box/AdminListItemComponents";
import { CourseInfoDialog } from "@/app/(protected)/dashboard/races/_actions/courseInfos/CourseInfosDialog";
import {
    ItemBadge,
    ItemContainer, ItemLabel,
    Subtitle1,
    SubTitle2,
    TitleItem
} from "@/app/(protected)/dashboard/races/components/racesList/racesList";
import TransactionBody from "./TransactionsBody";

export default function TransactionPage() {

    return (
        <div>
            <div>
                <Crumb
                    items={[
                        {
                            label: "Transactions",
                            url: "transactions",
                        }
                    ]}
                />
                <div>                
                    <div className={"mt-2"}>
                        <TransactionBody />
                    </div>
                </div>
            </div>
        </div>
    )
}

const TransactionItem: React.FC<{ course: Course }> = ({ course }) => {

    const [courseInfoIsOpen, setCourseInfoIsOpen] = React.useState(false)
    const { currency } = useGetCurrency()

    return (
        <>
            <ItemContainer onClick={() => setCourseInfoIsOpen(true)}>
                <div className={"flex flex-col gap-[6px]"}>
                    <TitleItem>{course.client.username}</TitleItem>
                    <Subtitle1>{course.client.phoneWithEmail}</Subtitle1>
                    <SubTitle2>{course.vehicle.getFullName} - {course.vehicle.getRegistration}</SubTitle2>
                    {course.currentDriver &&
                        <div className="text-[#506D82] text-sm font-medium flex items-center gap-2">
                            <UserCircleIcon />
                            <div>Chauffeur : {course.currentDriver?.getUsername}</div>
                        </div>}
                </div>
                <div className={"flex items-start gap-2"}>
                    <div className={"flex flex-col items-end gap-2"}>
                        <ItemLabel>{course.startAt}</ItemLabel>
                        <ItemLabel>{course.startHour}</ItemLabel>
                        <ItemLabel>{course.amount} {currency}</ItemLabel>
                        <ItemBadge title={course.status} />
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

