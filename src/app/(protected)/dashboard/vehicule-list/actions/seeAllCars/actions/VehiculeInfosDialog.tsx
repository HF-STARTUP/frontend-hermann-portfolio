"use client";

import React, {MouseEventHandler} from "react";
import DialogBase, {AdminDialogHead, DefaultDialogMainBody, DialogActions} from "@/components/dialog/Dialog";
import FormGroup from "@/components/box/FormGroup";
import {Stack} from "@/components/box/Grid";
import TextField, {FieldDate, ImageUploadField, ImageUploadFieldGroup, SelectField} from "@/components/form/TextField";
import {
    SimpleSuccessDialog
} from "@/app/(protected)/dashboard/_components/globalActions/successDialog/SimpleSuccessDialog";
import BtnBase from "@/components/elements/BtnBase";
import {
    UpdateVehiculeInfoDialog
} from "@/app/(protected)/dashboard/vehicule-list/actions/updateVehiculeInfo/UpdateVehiculeInfoDialog";

export const VehiculeInfosDialog: React.FC<{
    isOpen: boolean,
    onClose: (value: boolean) => void
} & React.HTMLAttributes<HTMLDivElement>> = ({isOpen, onClose, children, ...props}) => {

    const [updateVehiculeDialogIsOpen, setUpdateVehiculeDialogIsOpen] = React.useState(false)

    const handleToggleUpdateVehiculeDialogIsOpen = () => {
        setUpdateVehiculeDialogIsOpen(!updateVehiculeDialogIsOpen)
    }

    return (
        <div {...props}>
            <DialogBase isSubDialog={true} variant={'sm'} isOpenned={isOpen} onClose={onClose} bgType={'whited'}>
                <AdminDialogHead title={'Informations du véhicule'}
                                 handleToggle={onClose as unknown as MouseEventHandler<HTMLDivElement>}/>
                <DefaultDialogMainBody>
                    <ImageUploadFieldGroup label={''} className={`mb-5`}>
                        <ImageUploadField/>
                        <ImageUploadField/>
                        <ImageUploadField/>
                        <ImageUploadField/>
                    </ImageUploadFieldGroup>
                    <FormGroup adminForm={true} groupTitle={'Informations générales'}>
                        <Stack variant={'md'}>
                            <TextField size={'md'} label={'Numéro d\'immatriculation'}/>
                            <FieldDate size={'md'} label={'Date de souscription assurance'}/>
                        </Stack>
                        <Stack variant={'md'}>
                            <FieldDate size={'md'} label={'Date de mise en circulation'}/>
                            <FieldDate size={'md'} label={'Date d\'entré en flotte'}/>
                        </Stack>
                        <div className={`grid grid-cols-12 gap-2`}>
                            <div className={`col-span-8`}>
                                <SelectField size={'md'} label={'Type de contrat'}
                                             items={[{label: 'Véhicule propre en leasing', value: '1'}]}/>
                            </div>
                            <div className={`col-span-4`}>
                                <TextField size={'md'} label={'Killometrage'}/>
                            </div>
                        </div>
                    </FormGroup>
                </DefaultDialogMainBody>
                <DialogActions className={`pt-[30px]`}>
                    <SimpleSuccessDialog
                        title={'Informations mises a joour avec succès!'}
                        image={'/assets/faker/default-car-1.png'}
                    >
                        <BtnBase onClick={handleToggleUpdateVehiculeDialogIsOpen} color={'blue'} variant={'outline'}
                                 fullwidth={true} shape={'square'}
                                 to={''}>Modifier les infos</BtnBase>
                    </SimpleSuccessDialog>
                </DialogActions>
            </DialogBase>
            <>
                <UpdateVehiculeInfoDialog isOpen={updateVehiculeDialogIsOpen}
                                          onClose={handleToggleUpdateVehiculeDialogIsOpen}/>
            </>
        </div>
    )
}
