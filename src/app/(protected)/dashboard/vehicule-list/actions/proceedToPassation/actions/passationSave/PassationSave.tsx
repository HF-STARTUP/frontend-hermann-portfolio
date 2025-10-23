"use client";

import React from "react";
import DialogBase, {AdminDialogHead, DefaultDialogMainBody, DialogActions} from "@/components/dialog/Dialog";
import FormGroup from "@/components/box/FormGroup";
import TextField, {ImageUploadField, ImageUploadFieldGroup, LabelField, TextArea} from "@/components/form/TextField";
import BtnBase from "@/components/elements/BtnBase";
import {DefaultPassationUser, DefaultPassationUserGroup} from "@/components/uiHelper/passationUtils/PassationUtils";
import {
    ScheduleTroubleshotRepair
} from "@/app/(protected)/dashboard/vehicule-list/actions/proceedToPassation/actions/passationSave/actions/scheduleTroubleshotReppair/ScheduleTroubleshotRepair";
import {
    PassationSaveConfirm
} from "@/app/(protected)/dashboard/vehicule-list/actions/proceedToPassation/actions/passationSave/actions/passsationSaveConfirm/PassationSaveConfirm";

export const PassationSave: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {

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
                <AdminDialogHead withBack={true} title={'Enregistrement de la passation'}
                                 handleToggle={handleToggleDialog}/>
                <DefaultDialogMainBody ctx={'dialogMin'} className={`mt-[20px]`}>
                    <DefaultPassationUserGroup
                        className={`mt-[20px] mb-[10px]`}
                        firstChild={<DefaultPassationUser avatar={`/assets/faker/default-car-user.png`} name={'Takam Djeutcha Hervé'} badge={'Pro'}/>}
                        hour={'12h'}
                        secondChild={<DefaultPassationUser variant={'second'} avatar={`/assets/faker/default-car-user.png`} name={'Takam Djeutcha Hervé'} badge={'Intermédiaire'}/>}
                    />
                    <FormGroup adminForm={true}>
                        <div className={`grid grid-cols-12 gap-[10px]`}>
                            <div className={`col-span-7`}>
                                <TextField size={'md'} label={'Recette du jour'}/>
                            </div>
                            <div className={`col-span-5`}>
                                <LabelField label={'Montant à verser '} value={'12,500 XAF'}/>
                            </div>
                        </div>

                        <div className={`grid grid-cols-12 gap-[10px]`}>
                            <div className={`col-span-6`}>
                                <TextField size={'md'} label={'Kilométrage relevé'}/>
                            </div>
                            <div className={`col-span-6`}>
                                <LabelField label={'Prochaine vidange dans :'} value={'349 Km'}/>
                            </div>
                        </div>

                        <ImageUploadFieldGroup label={'Ajouter des photos du véhicule'}>
                            <ImageUploadField />
                            <ImageUploadField />
                            <ImageUploadField />
                            <ImageUploadField />
                        </ImageUploadFieldGroup>

                        <TextArea size={'md'} label={'Informations complementaires'} />
                    </FormGroup>
                </DefaultDialogMainBody>
                <DialogActions className={`pt-[30px]`}>
                    <ScheduleTroubleshotRepair>
                        <BtnBase to={''} color={'yellow'} variant={'contained'} shape={'square'} fontWeight={'bold'} fullwidth={true}>Panne constatée</BtnBase>
                    </ScheduleTroubleshotRepair>
                   <PassationSaveConfirm>
                       <BtnBase to={''} color={'blue'} variant={'contained'} shape={'square'} fullwidth={true}>Enregistrez la passation</BtnBase>
                   </PassationSaveConfirm>
                </DialogActions>
            </DialogBase>
        </div>
    )
}
