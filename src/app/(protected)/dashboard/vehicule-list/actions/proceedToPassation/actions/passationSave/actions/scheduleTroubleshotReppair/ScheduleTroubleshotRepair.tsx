"use client";

import React from "react";
import DialogBase, {AdminDialogHead, DefaultDialogMainBody, DialogActions} from "@/components/dialog/Dialog";
import FormGroup from "@/components/box/FormGroup";
import TextField, {
    FieldDate,
    ImageUploadField,
    ImageUploadFieldGroup,
    LabelField,
    RadioField, SelectField,
    TextArea
} from "@/components/form/TextField";
import BtnBase from "@/components/elements/BtnBase";
import {SectionCheckBoxGroup} from "@/app/(protected)/dashboard/_components/_utils/DashboardSection.utils";
import {Stack} from "@/components/box/Grid";

export const ScheduleTroubleshotRepair: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {

    const [isOpen, setIsOpen] = React.useState(false)
    const [repairType, setRepairType] = React.useState<'hour'|'day'>('day')

    const handleToggleDialog = () => {
        setIsOpen(!isOpen)
    }

    const handleChangeRepairType = ()=> {

    }

    return (
        <div>
            <div onClick={handleToggleDialog}>
                {children}
            </div>
            <DialogBase isSubDialog={true} variant={'sm'} isOpenned={isOpen} onClose={handleToggleDialog}
                        bgType={'whited'}>
                <AdminDialogHead withBack={true} title={'Programmer une réparation de la panne'}
                                 handleToggle={handleToggleDialog}/>
                <div className={`font-bold text-[18px] text-admin-primaryleading-[24px] tracking-[-2%] mb-2`}>La réparation se fera :</div>
                <SectionCheckBoxGroup variant={'dialog'} className={`opacity-65`}>
                    <RadioField onChange={()=>setRepairType('hour')} label={'En quelques heures'} name={'type'} defaultChecked={true}/>
                    <RadioField onChange={()=>setRepairType('day')} label={'En un ou plusieurs jours'} name={'type'}/>
                </SectionCheckBoxGroup>
                <DefaultDialogMainBody ctx={'dialogMin'} className={`mt-[20px]`}>
                    <FormGroup adminForm={true}>

                        {repairType === 'day' && <Stack variant={'md'}>
                            <FieldDate size={'md'} label={'Date de début de réparation'}/>
                            <FieldDate size={'md'} label={'Date de fin de réparation'}/>
                        </Stack>}

                        {repairType === 'hour' && <div className={`grid gap-[10px] grid-cols-12`}>
                            <div className={`col-span-7`}>
                                <FieldDate size={'md'} label={'Date et heure de réparation'}/>
                            </div>
                            <div className={`col-span-5 opacity-65`}>
                                <div className={`flex gap-[5px]`}>
                                    <SelectField size={'md'} label={'de'} items={[{label: '12', value: '12'}]}/>
                                    <SelectField size={'md'} label={'a'} items={[{label: '12', value: '12'}]}/>
                                </div>
                            </div>
                        </div>
                        }
                        <TextArea label={'Informations sur la panne constatée'} size={'md'}/>

                        <div className={`grid grid-cols-12 gap-[10px]`}>
                            <div className={`col-span-8`}>
                                <TextField size={'md'} label={'Coût estimé de l’opération'}/>
                            </div>
                            <div className={`col-span-4`}>
                                <LabelField label={'Devise'} withDelimiter={false} value={'FCFA'}/>
                            </div>
                        </div>

                        <ImageUploadFieldGroup label={'Ajouter des photos du véhicule'}>
                            <ImageUploadField/>
                            <ImageUploadField/>
                            <ImageUploadField/>
                            <ImageUploadField/>
                        </ImageUploadFieldGroup>
                    </FormGroup>
                </DefaultDialogMainBody>
                <DialogActions className={`pt-[30px]`}>
                    <BtnBase disabled={true} to={''} color={'blue'} variant={'contained'} shape={'square'}
                             fullwidth={true}>Suivant</BtnBase>
                </DialogActions>
            </DialogBase>
        </div>
    )
}
