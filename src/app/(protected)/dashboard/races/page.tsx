"use client"

import * as React from "react"
import AdminSubNav from "@/components/layout/admin/SubNav/AdminSubNav";
import {RacesList} from "@/app/(protected)/dashboard/races/components/racesList/racesList";
import {useRouter} from "next/navigation";
import {CreateCourseDialog} from "@/app/(protected)/dashboard/races/_actions/addNewCourse/CreateCourseDialog";


export default function RacesPage() {

    const [createCourseIsOpen, setCreateCourseIsOpen] = React.useState(false)
    const $router = useRouter()

    return (
        <React.Fragment>
            <div>
                <AdminSubNav title={`Courses`}
                             handleAdd={() => {
                                 setCreateCourseIsOpen(true)
                             }}
                             handleSecondLinkClick={() => {
                                 $router.push("/dashboard/races/history")
                             }}
                             withFilterSection={true}
                />
                <RacesList/>
            </div>
            <CreateCourseDialog
                isMain={true}
                isOpen={createCourseIsOpen}
                onClose={() => setCreateCourseIsOpen(false)}
            />
        </React.Fragment>
    )
}