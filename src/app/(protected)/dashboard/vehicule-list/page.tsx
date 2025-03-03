"use client"

import React, {useState} from "react";
import AdminSubNav from "@/components/layout/admin/SubNav/AdminSubNav";
import {FilterParamType, SimpleFilterSelect} from "@/components/form/TextField";
import DriveItems from "@/app/(protected)/dashboard/vehicule-list/_components/driveItems/DriveItems";
import {AddCarDialog} from "@/app/(protected)/dashboard/vehicule-list/actions/addCar/addCarDialog";
import {useResetSearchState} from "@/hooks/__globlal/useGlobalHook";
import EntitySelectDialog from "@/components/actions/EntitySelectDialog.action";
import Vehicule from "@/model/vehicule/Vehicule";
import {DialogCarItem} from "@/components/dialog/Dialog";
import {useGetVehicules} from "@/hooks/vehicule/useVehicule";

const VehiculeListPage: React.FC = () => {

    const [allCardDialogIsOpen, setSeeAllCardDialogIsOpen] = useState(false)
    const [addCarDialogIsOpen, setAddCarDialogIsOpen] = useState(false)
    const {data: vehicules, isLoading} = useGetVehicules();

    useResetSearchState()

    const DRIVE_FILTER: FilterParamType[] = [
        {
            name: 'Immatriculation',
            key: 'getRegistration'
        },
        {
            name: 'Marque véhicule',
            key: 'getBrandWithColor'
        }
    ]

    const handleShowAllCar = () => {
        setSeeAllCardDialogIsOpen(!allCardDialogIsOpen)
    }

    const handleToggleAddCarDialog = () => {
        setAddCarDialogIsOpen(!addCarDialogIsOpen)
    }


    return (
        <div>
            <AdminSubNav title={`Véhicules`} handleAdd={handleToggleAddCarDialog}
                         handleSecondLinkClick={handleShowAllCar} withFilterSection={true}/>
            <SimpleFilterSelect items={DRIVE_FILTER}/>
            <div>
                <DriveItems/>
            </div>
            <React.Fragment>
                <EntitySelectDialog<Vehicule, typeof DialogCarItem>
                    title={"Liste des véhicules"}
                    emptyMessage={"Aucun vehicule créé pour l’instant"}
                    DisplayItem={DialogCarItem}
                    selectMultiple={false}
                    getData={() => vehicules}
                    isOpen={allCardDialogIsOpen}
                    onClose={handleShowAllCar}
                />
                <AddCarDialog isOpen={addCarDialogIsOpen} onClose={handleToggleAddCarDialog}/>
            </React.Fragment>
        </div>
    )
}

export default VehiculeListPage
