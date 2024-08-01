"use client"

import DialogBase, {
    AdminDialogHead,
    DefaultDialogMainBody,
    DialogActions,
    DialogContentListItem
} from "@/components/dialog/Dialog";
import React, {MouseEventHandler, useEffect, useState} from "react";
import {debounce} from "chart.js/helpers";
import {SearchTextField} from "@/components/form/TextField";
import {FilterIcon} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";
import {DefaultDialogListItem} from "@/components/listConstructor/ListConstructor";
import {
    VehiculeInfosDialog
} from "@/app/(protected)/dashboard/vehicule-list/actions/seeAllCars/actions/VehiculeInfosDialog";
import Image from "next/image";
import Vehicule from "@/model/vehicule/Vehicule";
import {useGetVehicules} from "@/hooks/vehicule/useVehicule";
import {AddCarDialog} from "@/app/(protected)/dashboard/vehicule-list/actions/addCar/addCarDialog";

const SeeAllCarsDialog: React.FC<{
    isOpen: boolean,
    onClose: (value: boolean) => void
} & React.HTMLAttributes<HTMLDivElement>> = ({isOpen, onClose, children, ...props}) => {

    const {data: vehicules, isLoading} = useGetVehicules();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredVehicules, setFilteredVehicules] = useState(vehicules || []);

    const debouncedSearch = debounce((term) => {
        setSearchTerm(term);
    }, 300);

    useEffect(() => {
        if (vehicules) {
            const filtered = vehicules.filter(vehicule => vehicule.getFindToken.toLowerCase().includes(searchTerm));
            setFilteredVehicules(filtered);
        } else {
            setFilteredVehicules([]);
        }
    }, [searchTerm, vehicules]);


    return (
        <div {...props}>
            <DialogBase variant={'sm'} isOpenned={isOpen} onClose={onClose} bgType={'whited'}>
                <AdminDialogHead title={'Liste des véhicules'} handleToggle={onClose as unknown as MouseEventHandler<HTMLDivElement>}/>
                <div className={`mt-[15px] mb-[20px]`}>
                    <div className={`flex gap-4 items-center justify-center`}>
                        <div className={`bg-white py-[10px] px-[10px] rounded-[10px] shadow`}>
                            <SearchTextField placeholder={'Rechercher'}
                                             onChange={(e) => debouncedSearch(e.target.value)}/>
                        </div>
                        <button
                            className={`text-text-body flex items-center justify-center gap-2 font-normal text-[14px] leading-[20px] tracking-[-2%]`}>
                            <FilterIcon/>
                            <div>Trier par nom ...</div>
                        </button>
                    </div>
                </div>
                <DefaultDialogMainBody>
                    <DialogContentListItem>
                        {!isLoading && filteredVehicules.map((vehicule, k) => (<CarItem item={vehicule} key={k}/>))}
                    </DialogContentListItem>
                </DefaultDialogMainBody>
                <DialogActions className={`mt-[20px]`}>
                </DialogActions>
            </DialogBase>
        </div>
    )
}

const CarItem: React.FC<{ item?: Vehicule }> = ({item}) => {

    const [editCarDialogIsOpen, setEditCarDialogIsOpen] = React.useState<boolean>(false)

    const handleToggleDialog = () => {
        setEditCarDialogIsOpen(!editCarDialogIsOpen)
    }

    if (item) {
        return (
            <div>
                <DefaultDialogListItem
                    onClick={handleToggleDialog}
                    title={item.getFullName}
                    subtitle={item.getRegistrationWithColor}
                    image={item.getCover}
                >
                </DefaultDialogListItem>
                <AddCarDialog
                    isUpdate={true}
                    isOpen={editCarDialogIsOpen}
                    onClose={handleToggleDialog}
                    vehicule={item}
                />
                {/*<VehiculeInfosDialog isOpen={editCarDialogIsOpen} onClose={handleToggleDialog} />*/}
            </div>
        )
    }

    return (
        <div>
            <DefaultDialogListItem onClick={handleToggleDialog}>
                <div className={`flex justify-center items-center gap-[5px] text-admin-primary`}>
                    <p>Élisée Martial Rémy</p>
                    <Image width={20} height={20} className={`rounded-lg`} src={`/assets/faker/default-car-user.png`}
                           alt={''}/>
                </div>
            </DefaultDialogListItem>
            <VehiculeInfosDialog isOpen={editCarDialogIsOpen} onClose={handleToggleDialog}/>
        </div>
    )
}

const SeeAllCarSubHead: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({...props}) => {
    return (
        <div {...props}>
            <div className={`flex gap-4 items-center justify-center`}>
                <div className={`bg-white py-[10px] px-[10px] rounded-[10px] shadow`}>
                    <SearchTextField placeholder={'Rechercher'}/>
                </div>
                <button
                    className={`text-text-body flex items-center justify-center gap-2 font-normal text-[14px] leading-[20px] tracking-[-2%]`}>
                    <FilterIcon/>
                    <div>Trier par nom ...</div>
                </button>
            </div>
        </div>
    )
}

export default SeeAllCarsDialog
