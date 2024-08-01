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
import Chip from "@/components/box/Chip";

const DynamicListDialog: React.FC<{
    isOpen: boolean,
    onClose: (value: boolean) => void,
    title: string,
} & React.HTMLAttributes<HTMLDivElement>> = ({title, isOpen, onClose, children, ...props}) => {

    const [selected, setSelected] = React.useState('')
    const items = [1, 1, 1, 1, 1, 1, 11, 1, 1, 1, 11, 1, 1, 1, 11, 11, 1, 1, 1, 1, 11, 1, 1, 11, 1, 1, 1, 1, 1, 1, 11, 1, 1, 1, 11, 1, 1, 1, 1]


    return (
        <div {...props}>
            <DialogBase variant={'sm'} isOpenned={isOpen} onClose={onClose} bgType={'whited'}>
                <AdminDialogHead title={'Sélectionnez le chauffeur à encaisser'}
                                 handleToggle={onClose as unknown as MouseEventHandler<HTMLDivElement>}/>
                <SeeAllCarSubHead className={`mt-[15px] mb-[20px]`}/>
                <DefaultDialogMainBody>
                    <DialogContentListItem>
                        {items.map((_, k) => (
                            <DriverItem title={`Élisée Martial Rémy`}
                                        subTitle={`Toyota Corolla 2006 Noire - LT 932`}
                                        key={k} index={'' + k} selected={selected}
                                        onClick={() => setSelected('' + k)}/>))}
                    </DialogContentListItem>
                </DefaultDialogMainBody>
                <DialogActions className={`mt-[20px]`}>
                    {children}
                </DialogActions>
            </DialogBase>
        </div>
    )
}

const DriverItem: React.FC<{
    title: string,
    subTitle: string,
    selected: string,
    index: string
} & React.HTMLAttributes<HTMLDivElement>> = ({title, subTitle, selected, index, ...props}) => {

    return (
        <div {...props}>
            <DefaultDialogListItem index={index} selected={selected} image={`/assets/faker/default-user-1.png`}
                                   title={title} subtitle={subTitle}>
                <Chip name={`Intermédiaire`}/>
            </DefaultDialogListItem>
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

export default DynamicListDialog
