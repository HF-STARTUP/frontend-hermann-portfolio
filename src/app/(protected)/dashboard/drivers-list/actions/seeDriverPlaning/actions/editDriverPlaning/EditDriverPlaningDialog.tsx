"use client";

import React from "react";
import DialogBase, {AdminDialogHead, DefaultDialogMainBody, DialogActions} from "@/components/dialog/Dialog";
import {DialogCoverImage} from "@/components/dialog/DialogContentUtils";
import BtnBase from "@/components/elements/BtnBase";
import {
    ScheduleEditItem,
    ScheduleEditItemsGroup
} from "@/app/(protected)/dashboard/drivers-list/_components/__utils/ScheduleEditItem";
import {RadioField, SelectField} from "@/components/form/TextField";
import {SectionCheckBoxGroup} from "@/app/(protected)/dashboard/_components/_utils/DashboardSection.utils";
import {SystemOptionItem} from "@/components/box/FormGroup";
import {
    SimpleSuccessDialog
} from "@/app/(protected)/dashboard/_components/globalActions/successDialog/SimpleSuccessDialog";

export const EditDriverPlaningDialog: React.FC<{
    image: string,
    isOpen: boolean,
    handleToggleDialog: () => void
} & React.HTMLAttributes<HTMLDivElement>> = ({image, isOpen, handleToggleDialog}) => {

    const [modifyPlaningType, setModifyPlaningType] = React.useState<'repos' | 'passation'>('passation')

    return (
        <div>
            <DialogBase isSubDialog={false} variant={'sm'} isOpenned={isOpen} onClose={handleToggleDialog}
                        bgType={'whited'}>
                <AdminDialogHead withBack={true} title={'Atangana Ondoua Wilfried'} subTitle={'03 ans de conduite'}
                                 handleToggle={handleToggleDialog}/>

                <DefaultDialogMainBody>
                    <DialogCoverImage image={image} withSuccess={false}/>

                    <ScheduleEditItemsGroup>
                        <>
                            <div className={`mb-[5px]`}>
                                <div
                                    className={`font-bold text-[18px] text-admin-primary leading-[24px] tracking-[-2%] mb-2`}>Aujourd’hui:
                                </div>
                                <SectionCheckBoxGroup variant={'dialog'} className={`opacity-65`}>
                                    <RadioField onChange={() => setModifyPlaningType('passation')} label={'Passation'}
                                                name={'type'} defaultChecked={true}/>
                                    <RadioField onChange={() => setModifyPlaningType('repos')} label={'Repos'}
                                                name={'type'}/>
                                </SectionCheckBoxGroup>
                            </div>

                            <div className={`relative ${modifyPlaningType === 'repos' ? 'before:block before:bg-white/50 before:h-[300px] before:w-full before:absolute before:z-10' : ''}`}>

                                <ScheduleEditItemsGroup>

                                    <div className={`flex gap-[20px] mb-[15px]`}>
                                        <SystemOptionItem
                                            items={[{label: '12h', value: '15'}, {label: '20h', value: '20'}]}
                                            title={'De'}/>
                                        <SystemOptionItem
                                            items={[{label: '12h', value: '12'}, {label: '20h', value: '20'}]}
                                            title={'À'}/>
                                    </div>

                                    <div className={`opacity-80`}>
                                        <SelectField className={`mb-[15px]`} size={'md'}
                                                     placeholder={'Selectionnez la marque du vehicule'}
                                                     items={
                                                         [
                                                             {label: 'Selectionnez la marque du vehicule', value: '1'},
                                                             {label: 'Toyota', value: '2'},
                                                             {label: 'Tesla', value: '3'},
                                                         ]
                                                     }/>
                                    </div>

                                    <ScheduleEditItem
                                        image={`/assets/faker/default-car-1.png`}
                                        date={`Aujourd’hui - De 12h à 18h`}
                                        title={`Mitsubishi Lancer 2009 Rouge`}
                                        subtitle={`CE 987 BF`}/>

                                    <ScheduleEditItem
                                        image={`/assets/faker/default-car-1.png`}
                                        date={`Aujourd’hui - De 12h à 18h`}
                                        title={`Mitsubishi Lancer 2009 Rouge`}
                                        subtitle={`CE 987 BF`}/>

                                </ScheduleEditItemsGroup>
                            </div>

                        </>
                    </ScheduleEditItemsGroup>
                </DefaultDialogMainBody>
                <DialogActions className={`pt-[40px]`}>
                    <SimpleSuccessDialog
                        title={`Planning modifié avec succès!`}
                        image={'/assets/faker/faker_passation_user.jpg'}
                        fchild={<div>
                            Atangana Ondoua Wilfried sera désormais en service <b>aujourd’hui</b> de <b>12h à 20h</b> sur le véhicule <b>Mistubishi Lancer 2009 - CE 987 BF</b>
                        </div>}
                    >
                        <BtnBase fullwidth={true} to={''} shape={'square'} variant={'contained'}
                                 color={'blue'}>Confirmer</BtnBase>
                    </SimpleSuccessDialog>
                </DialogActions>
            </DialogBase>
            <>
            </>
        </div>
    )
}
