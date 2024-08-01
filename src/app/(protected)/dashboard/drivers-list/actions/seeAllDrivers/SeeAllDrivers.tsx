"use client"

import DialogBase, {
    AdminDialogHead,
    DefaultDialogMainBody,
    DialogActions,
    DialogContentListItem
} from "@/components/dialog/Dialog";
import React, {MouseEventHandler, useEffect, useState} from "react";
import {SearchTextField} from "@/components/form/TextField";
import {FilterIcon} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";
import {DefaultDialogListItem} from "@/components/listConstructor/ListConstructor";
import Chip from "@/components/box/Chip";
import {EditDriverDialog} from "@/app/(protected)/dashboard/drivers-list/actions/editDriver/editDriverDialog";
import AdminSearchFieldWithFilter from "@/components/elements/AdminSearchFieldWithFilter";
import {useGetDrivers} from "@/hooks/driver/useDriver";
import Driver from "@/model/driver/Driver";
import {debounce} from "chart.js/helpers";
import {DriverInfoDialog} from "@/components/actions/DriverInfoDialog";

const SeeAllDriversDialog: React.FC<{
    isOpen: boolean,
    isSelect?: boolean,
    selectTitle?: string,
    onClose: (value: boolean) => void
} & React.HTMLAttributes<HTMLDivElement>> = ({isOpen, selectTitle, onClose, isSelect, children, ...props}) => {

    const [searchTerm, setSearchTerm] = useState('');
    const {isLoading, isError, error, data: drivers} = useGetDrivers()
    const [filteredVehicules, setFilteredVehicules] = useState(drivers || []);

    const debouncedSearch = debounce((term) => {
        setSearchTerm(term);
    }, 300);

    useEffect(() => {
        if (drivers) {
            const filtered = drivers.filter(vehicule => vehicule.getFindToken.toLowerCase().includes(searchTerm));
            setFilteredVehicules(filtered);
        } else {
            setFilteredVehicules([]);
        }
    }, [searchTerm, drivers]);

    if(isLoading || isError || !drivers){
        return (
            <div></div>
        )
    }
    return (
        <div {...props}>
            <DialogBase variant={'sm'} isOpenned={isOpen} onClose={onClose} bgType={'whited'}>
                <AdminDialogHead withBack={isSelect} title={selectTitle ?? 'Liste des chauffeurs'}
                                 handleToggle={onClose as unknown as MouseEventHandler<HTMLDivElement>}/>
                <div className={`mt-[15px] mb-[20px]`}>
                    <div {...props}>
                        <div className={`flex gap-4 items-center justify-center`}>
                            <div>
                                <SearchTextField
                                    onChange={(e)=>debouncedSearch(e.target.value)}
                                    placeholder={'Rechercher'}
                                />
                            </div>
                            <button
                                className={`text-text-body flex items-center justify-center gap-2 font-normal text-[14px] leading-[20px] tracking-[-2%]`}>
                                <FilterIcon/>
                                <div>Trier par nom ...</div>
                            </button>
                        </div>
                    </div>
                </div>
                <DefaultDialogMainBody>
                    <DialogContentListItem onClick={(e)=>{isSelect&&e.preventDefault();e.stopPropagation()}}>
                        {!isLoading &&  filteredVehicules.map((driver, k) => (
                            <DriverItem
                                key={k}
                                driver={driver}
                            />
                        ))}
                    </DialogContentListItem>
                </DefaultDialogMainBody>
                <DialogActions className={`mt-[20px]`}>
                </DialogActions>
            </DialogBase>
        </div>
    )
}

const DriverItem: React.FC<{ driver: Driver }> = ({driver}) => {

    const [editDriverDialogIsOpen, setEditDriverDialogIsOpen] = React.useState<boolean>(false)

    const handleToggleEditDriverDialog = () => {
        setEditDriverDialogIsOpen(!editDriverDialogIsOpen)
    }

    return (
        <div>
            <DefaultDialogListItem
                image={driver.getAvatar}
                title={driver.getUsername}
                // subtitle={driver.getExperience}
                subtitle={``}
                onClick={handleToggleEditDriverDialog}>
                <Chip name={driver.getGrade}/>
            </DefaultDialogListItem>
            <DriverInfoDialog  driver={driver}  isOpen={editDriverDialogIsOpen} onClose={handleToggleEditDriverDialog}/>
        </div>
    )
}

const SeeAllCarSubHead: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({...props}) => {
    return (
        <AdminSearchFieldWithFilter {...props}/>
    )
}

export default SeeAllDriversDialog
