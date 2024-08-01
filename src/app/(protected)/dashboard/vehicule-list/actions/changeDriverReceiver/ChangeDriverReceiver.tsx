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
import BtnBase from "@/components/elements/BtnBase";
import {
    SimpleSuccessDialog
} from "@/app/(protected)/dashboard/_components/globalActions/successDialog/SimpleSuccessDialog";
import Chip from "@/components/box/Chip";

const ChangeDriverReceiver: React.FC<{
    isOpen: boolean,
    onClose: (value: boolean) => void
} & React.HTMLAttributes<HTMLDivElement>> = ({isOpen, onClose, children, ...props}) => {
    const [selected, setSelected] = React.useState<string>('')

    const items = [1, 1, 1, 1, 1, 1, 11, 1, 1, 1, 11, 1, 1, 1, 11, 11, 1, 1, 1, 1, 11, 1, 1, 11, 1, 1, 1, 1, 1, 1, 11, 1, 1, 1, 11, 1, 1, 1, 1]

    const x = () => {

    }

    return (
        <div {...props}>
            <DialogBase variant={'sm'} isOpenned={isOpen} onClose={onClose} bgType={'whited'}>
                <AdminDialogHead title={'Changez le chauffeur receveur'}
                                 handleToggle={onClose as unknown as MouseEventHandler<HTMLDivElement>}/>
                <SeeAllCarSubHead className={`mb-[10px]`}/>
                <DefaultDialogMainBody>
                    <DialogContentListItem>
                        {items.map((_, k) => (
                            <CarItem key={k} index={'' + k} selected={selected} onClick={() => setSelected('' + k)}/>))}
                    </DialogContentListItem>
                </DefaultDialogMainBody>
                <DialogActions className={`mt-[5px]`}>
                    <SimpleSuccessDialog
                        fchild={
                        <span>
                            <span className={`font-medium`}>Atangana Ondoua Wilfried</span> est desormais le chauffeur receveur de la passation.
                        </span>
                        }
                        title={'Chauffeur receveur modifié avec succès!'}
                        image={'/assets/faker/faker_passation_user.jpg'}
                    >
                        <BtnBase disabled={!selected.length} to={''} variant={'contained'} color={'blue'} shape={'square'}
                                 fullwidth={true}>Confirmez le nouveau chauffeur</BtnBase>
                    </SimpleSuccessDialog>
                </DialogActions>
            </DialogBase>
        </div>
    )
}

const CarItem: React.FC<{ selected?: string, index: string, } & React.HTMLAttributes<HTMLDivElement>> = ({
                                                                                                             selected,
                                                                                                             index,
                                                                                                             ...props
                                                                                                         }) => {

    // const [selected, setSelected] = React.useState<boolean>(false)


    return (
        <div {...props}>
            <DefaultDialogListItem index={index} selected={selected}>
                <Chip name={'Intermédiaire'} />
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

export default ChangeDriverReceiver
