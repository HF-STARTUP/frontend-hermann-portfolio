import React, {MouseEventHandler} from "react";
import DialogBase, {AdminDialogHead, DefaultDialogMainBody, DialogActions} from "@/components/dialog/Dialog";
import FormGroup from "@/components/box/FormGroup";
import TextField, {FieldDate, ImageUploadField, ImageUploadFieldGroup, SelectField} from "@/components/form/TextField";
import {Stack} from "@/components/box/Grid";
import BtnBase from "@/components/elements/BtnBase";
import {
    SimpleSuccessDialog
} from "@/app/(protected)/dashboard/_components/globalActions/successDialog/SimpleSuccessDialog";

export const UpdateVehiculeInfoDialog: React.FC<{
    isOpen: boolean,
    onClose: (value: boolean) => void
} & React.HTMLAttributes<HTMLDivElement>> = ({isOpen, onClose, children, ...props}) => {

    return (
        <div {...props}>
            <DialogBase isSubDialog={false} variant={'sm'} isOpenned={isOpen} onClose={onClose} bgType={'whited'}>
                <AdminDialogHead title={'Modifier les infos vehicule'}
                                 handleToggle={onClose as unknown as MouseEventHandler<HTMLDivElement>}/>
                <DefaultDialogMainBody>
                    <FormGroup adminForm={true} groupTitle={'Informations générales'}>
                        <div className={`flex flex-col gap-[10px]`}>
                            <Stack variant={'md'}>
                                <SelectField size={'md'} label={'Marque du véhicule'}
                                             items={[{label: 'Tesla', value: 'tesla'}]}/>
                                <SelectField size={'md'} label={'Model'} items={[{label: 'Model PI', value: 'PI'}]}/>
                            </Stack>
                        </div>
                        <TextField size={'md'} label={'Numéro de GPS (si GPS intégré)'}/>
                        <div className={`grid grid-cols-12 gap-2`}>
                            <div className={`col-span-8`}>
                                <TextField size={'md'} label={'Numéro de chasis'}/>
                            </div>
                            <div className={`col-span-4`}>
                                <SelectField size={'md'} label={'Couleur'} items={[{label: 'Orange', value: 'orange'}, {
                                    label: 'Verte',
                                    value: 'green'
                                }]}/>
                            </div>
                        </div>
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
                        <ImageUploadFieldGroup label={'Ajouter une photo'}>
                            <ImageUploadField/>
                            <ImageUploadField/>
                            <ImageUploadField/>
                            <ImageUploadField/>
                        </ImageUploadFieldGroup>
                    </FormGroup>
                </DefaultDialogMainBody>
                <DialogActions className={`pt-[30px]`}>
                    <SimpleSuccessDialog
                        title={'Informations mises a joour avec succès!'}
                        image={'/assets/faker/default-car-1.png'}
                    >
                        <BtnBase color={'blue'} variant={'contained'} fullwidth={true} shape={'square'}
                                 to={''}>Confirmer</BtnBase>
                    </SimpleSuccessDialog>
                </DialogActions>
            </DialogBase>
        </div>
    )
}
