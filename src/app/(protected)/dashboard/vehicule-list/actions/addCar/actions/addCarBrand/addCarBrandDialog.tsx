"use client";

import React from "react";
import DialogBase, {AdminDialogHead, DefaultDialogMainBody, DialogActions} from "@/components/dialog/Dialog";
import FormGroup from "@/components/box/FormGroup";
import TextField from "@/components/form/TextField";
import BtnBase from "@/components/elements/BtnBase";

export const AddCarBrandDialog: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {

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
                <AdminDialogHead withBack={true} title={'Ajouter une nouvelle marque de véhicule'}
                                 handleToggle={handleToggleDialog}/>
                <DefaultDialogMainBody>
                    <FormGroup adminForm={true}>
                        <TextField size={'md'} label={'Marque du véhicule'}/>
                    </FormGroup>
                </DefaultDialogMainBody>
                <DialogActions className={`pt-[30px]`}>
                    <BtnBase to={''} color={'blue'} variant={'contained'} shape={'square'} fullwidth={true}>Ajouter la
                        marque</BtnBase>
                </DialogActions>
            </DialogBase>
        </div>
    )
}
