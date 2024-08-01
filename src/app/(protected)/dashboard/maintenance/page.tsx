"use client"

import React from "react";
import AdminSubNav from "@/components/layout/admin/SubNav/AdminSubNav";
import {FilterParamType, SimpleFilterSelect} from "@/components/form/TextField";
import MaintenanceItems from "./_components/maintenanceItems/MaintenanceItems";
import BtnBase from "@/components/elements/BtnBase";
import {
    PlanifyCarMaintenance
} from "@/app/(protected)/dashboard/maintenance/actions/planifyCarMaintenance/PlanifyCarMaintenance";

const MaintenanceListPage: React.FC = () => {
    const [planifyCarRepairIsOpen, setPlanifyCarRepairIsOpen] = React.useState(false)

    const MAINTENANCE_FILTER:FilterParamType[] = [
        {
            name: 'Date',
            key: 'Date'
        },
        {
            name: 'Nom',
            key: 'Nom'
        }
    ]


    return (
        <div>
            <AdminSubNav title={`Entretien`} handleAdd={()=>setPlanifyCarRepairIsOpen(true)}
                         withFilterSection={true}/>
            <SimpleFilterSelect items={MAINTENANCE_FILTER}/>
            <div>
                <MaintenanceItems/>
            </div>
            <>
                <PlanifyCarMaintenance isOpen={planifyCarRepairIsOpen} handleToggleDialog={()=>setPlanifyCarRepairIsOpen(false)}/>
            </>
        </div>
    )
}

export default MaintenanceListPage
