"use client"

import DialogBase, {
    AdminDialogHead,
    DefaultDialogMainBody,
    DialogActions,
    DialogContentListItem
} from "@/components/dialog/Dialog";
import React, {MouseEventHandler} from "react";
import TextField, {FieldDate, LabelField, RadioField} from "@/components/form/TextField";
import {DefaultDialogListItem} from "@/components/listConstructor/ListConstructor";
import Chip from "@/components/box/Chip";
import BtnBase from "@/components/elements/BtnBase";
import {Divider} from "@/components/box/Card";
import {SectionCheckBoxGroup} from "@/app/(protected)/dashboard/_components/_utils/DashboardSection.utils";
import FormGroup from "@/components/box/FormGroup";
import {
    SimpleSuccessDialog
} from "@/app/(protected)/dashboard/_components/globalActions/successDialog/SimpleSuccessDialog";

const ColectDriverReceiptDialog: React.FC<{
    isOpen: boolean,
    onClose: (value: boolean) => void
} & React.HTMLAttributes<HTMLDivElement>> = ({isOpen, onClose, children, ...props}) => {

    const [repairType, setRepairType] = React.useState<'today' | 'customDare'>('today')

    const [selected, setSelected] = React.useState('1')
    const items = [1, 1, 1, 1, 1, 1, 11, 1, 1, 1, 11, 1, 1, 1, 11, 11, 1, 1, 1, 1, 11, 1, 1, 11, 1, 1, 1, 1, 1, 1, 11, 1, 1, 1, 11, 1, 1, 1, 1]

    return (
        <div {...props}>
            <DialogBase variant={'sm'} isOpenned={isOpen} onClose={onClose} bgType={'whited'}>
                <AdminDialogHead title={'Encaissez la recette du chauffeur'}
                                 handleToggle={onClose as unknown as MouseEventHandler<HTMLDivElement>}/>
                <DefaultDialogMainBody>
                    <FormGroup adminForm={true}>
                        <div className={`flex flex-col gap-[10px]`}>
                            <DriverItem title={`Élisée Martial Rémy`}
                                        subTitle={`Toyota Corolla 2006 Noire - LT 932`}
                                        index={'1'} selected={selected}/>
                            <DefaultDialogListItem selected={selected} image={`/assets/faker/default-user-1.png`}
                                                   title={`Mitsubishi Lancer 2009`} subtitle={`CE 987 BF`}>
                                <p className={`text-[#506D82] font-normal text-[16px] leading-[22px]`}>354km</p>
                            </DefaultDialogListItem>
                        </div>
                        <Divider/>
                        <div className={`font-bold text-[18px] leading-[24px] tracking-[-2%] mb-2 text-admin-primary`}>Date de la recette
                            :
                        </div>
                        <SectionCheckBoxGroup variant={'dialog'} className={`opacity-65`}>
                            <RadioField onChange={() => setRepairType('today')} label={'Aujourd’hui'} name={'type'}
                                        defaultChecked={true}/>
                            <RadioField onChange={() => setRepairType('customDare')} label={'Saisir la date'}
                                        name={'type'}/>
                        </SectionCheckBoxGroup>
                        <div>
                            {repairType === 'customDare' && <FieldDate label={'Saisir la date de la recette'}/>}
                            <div className={`grid grid-cols-12 gap-[10px]`}>
                                <div className={`col-span-7`}>
                                    <TextField size={'md'} label={'Recette du jour'}/>
                                </div>
                                <div className={`col-span-5`}>
                                    <LabelField label={'Montant à verser '} value={'12,500 XAF'}/>
                                </div>
                            </div>
                        </div>
                    </FormGroup>
                </DefaultDialogMainBody>
                <DialogActions className={`mt-[20px]`}>
                    <SimpleSuccessDialog title={`Chauffeur encaissé.`} image={`/assets/faker/default-car-1.png`} fchild={<p>La recette du chauffeur a été encaissée avec succès!</p>}>
                    <BtnBase disabled={!selected.length} color={'blue'} variant={'contained'} fullwidth={true}
                             shape={'square'} to={''}>Encaissez le chauffeur</BtnBase>
                    </SimpleSuccessDialog>
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
export default ColectDriverReceiptDialog
