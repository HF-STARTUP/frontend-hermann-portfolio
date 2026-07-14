"use client"

import React from "react";
import AdminSubNav from "@/components/layout/admin/SubNav/AdminSubNav";
import {FilterParamType, SimpleFilterSelect} from "@/components/form/TextField";
import DriverItems from "@/app/(protected)/dashboard/drivers-list/_components/driverItems/DriverItems";
import SeeAllDriversDialog from "@/app/(protected)/dashboard/drivers-list/actions/seeAllDrivers/SeeAllDrivers";
import {EditDriverDialog} from "@/app/(protected)/dashboard/drivers-list/actions/editDriver/editDriverDialog";
import useAppStore from "@/stores/global/useAppStore";
import {useResetSearchState} from "@/hooks/__globlal/useGlobalHook";

const DriversListPage:React.FC = () => {

    const [allDriversIsOpen, setAllDriversIsOpen] = React.useState<boolean>(false)
    const [editDriverDialogIsOpen, setEditDriverDialogIsOpen] = React.useState<boolean>(false)
    useResetSearchState()

    const handleToggleEditDriverDialog = () => {
        setEditDriverDialogIsOpen(!editDriverDialogIsOpen)
    }

    const handleToggleAllDriversIsOpen = ()=>{
        setAllDriversIsOpen(!allDriversIsOpen)
    }

    const DRIVE_FILTER:FilterParamType[] = [
        {
            name: 'Année',
            key: 'getExperienceYear'
        },
        {
            name: 'Nom',
            key: 'getUsername'
        }
        // 'Etoiles'
    ]

    return(
        <div>
            <AdminSubNav title={`Chauffeurs`} handleAdd={handleToggleEditDriverDialog} handleSecondLinkClick={handleToggleAllDriversIsOpen} withFilterSection={true} />
            <SimpleFilterSelect items={DRIVE_FILTER} />
            <div>
                <DriverItems />
            </div>
            <>
                <SeeAllDriversDialog isOpen={allDriversIsOpen} onClose={handleToggleAllDriversIsOpen} />
                <EditDriverDialog isMain={true} isOpen={editDriverDialogIsOpen} onClose={handleToggleEditDriverDialog}/>
            </>
        </div>
    )
}

export default DriversListPage
