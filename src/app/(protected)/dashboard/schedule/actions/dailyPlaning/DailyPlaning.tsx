"use client"

import DialogBase, {
    AdminDialogHead,
    DefaultDialogMainBody,
    DialogActions,
    DialogContentListItem
} from "@/components/dialog/Dialog";
import React, {MouseEventHandler} from "react";
import {SearchTextField} from "@/components/form/TextField";
import {FilterIcon} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";
import {DefaultDialogListItem} from "@/components/listConstructor/ListConstructor";
import {VehiculeInfosDialog} from "@/app/(protected)/dashboard/vehicule-list/actions/seeAllCars/actions/VehiculeInfosDialog";
import Image from "next/image";

const DailyPlaning: React.FC<{
    isOpen: boolean,
    onClose: (value: boolean) => void
} & React.HTMLAttributes<HTMLDivElement>> = ({isOpen, onClose, children, ...props}) => {

    const items = [1,1,1,1,1,1,11,1,1,1,11,1,1,1,11,11,1,1,1,1,11,1,1,11,1,1,1,1,1,1,11,1,1,1,11,1,1,1,1]

    return (
        <div {...props}>
            <DialogBase variant={'sm'} isOpenned={isOpen} onClose={onClose} bgType={'whited'}>
                <AdminDialogHead title={'Planning journalier'}
                                 handleToggle={onClose as unknown as MouseEventHandler<HTMLDivElement>}/>
                <h4 className={`text-admin-primary text-[24px] leading-[24.51px] tracking-[-2%] font-medium mb-2`}>Lundi 12 Janvier </h4>
                <DefaultDialogMainBody>
                    <DialogContentListItem>
                        {items.map((_,k)=>(<CarItem key={k} />))}
                    </DialogContentListItem>
                </DefaultDialogMainBody>
                <DialogActions className={`mt-[35px]`}>
                </DialogActions>
            </DialogBase>
        </div>
    )
}

const CarItem: React.FC = ()=> {

    return(
        <div>
            <DefaultDialogListItem
                title={`Christian Onguene Ludovic`}
                subtitle={`Toyota Corolla 2009 - CE 784 LR`}
                image={`/assets/faker/default-car-user.png`}
            >
                <div className={`flex justify-center items-center gap-[5px] text-admin-primary`}>
                    <p>8h à 12h</p>
                </div>
            </DefaultDialogListItem>
        </div>
    )
}


export default DailyPlaning
