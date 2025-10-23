"use client";

import React from "react";
import DialogBase, {AdminDialogHead, DefaultDialogMainBody, DialogActions} from "@/components/dialog/Dialog";
import FormGroup from "@/components/box/FormGroup";
import TextField, {SelectField} from "@/components/form/TextField";
import BtnBase from "@/components/elements/BtnBase";

export const AddCarModelDialog: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {

    const [isOpen, setIsOpen] = React.useState(false)

    const handleToggleDialog = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div>
            <div onClick={handleToggleDialog}>
                {children}
            </div>
            <DialogBase isSubDialog={true} variant={'sm'} isOpenned={isOpen} onClose={handleToggleDialog}
                        bgType={'whited'}>
                <AdminDialogHead withBack={true} title={'Ajouter un nouveau model de véhicule'}
                                 handleToggle={handleToggleDialog}/>
                <DefaultDialogMainBody>
                    <FormGroup adminForm={true}>
                        <SelectField size={'md'} label={'Selectionner la marque du véhicule'}
                                     items={[{label: 'Toyota', value: '1'}, {label: 'Tesla', value: '2'},]}/>
                        <TextField size={'md'} label={'Saisir le nom du modèle'}/>
                    </FormGroup>
                </DefaultDialogMainBody>
                <DialogActions className={`pt-[30px]`}>
                    <BtnBase to={''} color={'blue'} variant={'contained'} shape={'square'} fullwidth={true}>Ajouter le
                        modèle</BtnBase>
                </DialogActions>
            </DialogBase>
        </div>
    )
}
