"use client";

import React, {MutableRefObject} from "react";
import CardDefault, {Divider} from "@/components/box/Card";
import FormGroup from "@/components/box/FormGroup";
import TextField, {SelectField} from "@/components/form/TextField";
import BuyFormDialog from "@/app/(main)/tarif/payment-validation/[packID]/components/BuyFormDialog/BuyFormDialog";
import BtnBase from "@/components/elements/BtnBase";
import BuyCardInfoDialog
    from "@/app/(main)/tarif/payment-validation/[packID]/components/BuyCardInfoDialog/BuyCardInfoDialog";
import {Cities, Country} from "@/mocks/generic.mock";

export const UserInfosCard: React.FC<{
    nextDialogRef: MutableRefObject<any>,
    handleGoToResumePayPage: () => void
}> = ({nextDialogRef, handleGoToResumePayPage,}) => {

    const handleGoToNextPage = () => {
        handleGoToResumePayPage()
    }

    return (
        <div>
            <div>
                <div className={`mb-[27px]`}>
                    <CardDefault>
                        <FormGroup>
                            <TextField label={`Nom et prénom*`} placeholder={`Wilfried Tchamba`}/>
                            <div className={`grid grid-cols-12 gap-4`}>
                                <div className={`col-span-12 lg:col-span-6`}>
                                    <TextField label={`Adresse email*`} placeholder={`wilfriedtchamba@gmail.com`}/>
                                </div>
                                <div className={`col-span-12 lg:col-span-6`}>
                                    <TextField label={`Numéro de téléphone`} placeholder={`+23507860980`}/>
                                </div>
                            </div>
                            <TextField label={`Nom de la société*`} placeholder={`Saciéte group sarl`}/>
                            <TextField label={`Site web`} placeholder={`www.site.com`}/>
                            <div className={`grid grid-cols-12 gap-4`}>
                                <div className={`col-span-12 lg:col-span-6`}>
                                    <SelectField items={Country} label={'Pays'}/>
                                </div>
                                <div className={`col-span-12 lg:col-span-6`}>
                                    <SelectField items={Cities} label={'Ville'}/>
                                </div>
                            </div>
                            <TextField label={`Adresse`} placeholder={`Renseignez l’adresse`}/>
                        </FormGroup>
                    </CardDefault>
                </div>
                <BtnBase className={`lg:hidden`} to={''} color={'blue'} variant={'outline'}
                         onClick={handleGoToNextPage}>Suivant</BtnBase>
                <BuyFormDialog className={`hidden lg:block`} subscription_id={""} subscription_type={""} total={0}
                               vehicle_number={1}>
                    <BtnBase to={''} color={'blue'} variant={'outline'}>Suivant</BtnBase>
                </BuyFormDialog>
                <BuyCardInfoDialog htmlRef={nextDialogRef}></BuyCardInfoDialog>
            </div>
        </div>
    )
}

export const PackResumeInfo: React.FC<{
    nextDialogRef: MutableRefObject<any>,
    handleBackToForm: () => void
}> = ({nextDialogRef, handleBackToForm}) => {

    const handleBack = () => {
        handleBackToForm()
    }

    return (
        <div>
            <div className={`mb-[27px]`}>
                <CardDefault>
                    <div>
                        <ItemRowWithThreeElement variant={'head'} items={['Produit', 'Quantité', 'Prix']}/>
                        <Divider/>
                        <ItemRowWithThreeElement variant={'diff'} items={['Plan Essentiel', '01', '$2080 par an']}/>
                        <ItemRowWithThreeElement items={['Remise première année', '01', '- $2080 par an']}/>
                        <Divider/>
                        <ItemRowWithThreeElement items={['', 'Sous-total', '$ 1930']}/>
                        <ItemRowWithThreeElement items={['', 'Taxes', '$0']}/>
                        <Divider/>
                        <ItemRowWithThreeElement variant={'footer'} items={['', 'Total', '$1930']}/>
                    </div>
                    <PolicyAlert/>
                </CardDefault>
            </div>
            <div className={`flex gap-[24px] lg:hidden`}>
                <BtnBase to={''} color={'blue'} variant={'outline'} onClick={handleBack}>Précédent</BtnBase>
                <BuyFormDialog subscription_id={""} subscription_type={""} total={0}
                               vehicle_number={1}>
                    <BtnBase to={''} color={'blue'} variant={'contained'}>Passer au paiement</BtnBase>
                </BuyFormDialog>
            </div>
        </div>
    )
}

const ItemRowWithThreeElement: React.FC<{ items: string[], variant?: 'head' | 'footer' | 'diff' }> = ({
                                                                                                          items,
                                                                                                          variant
                                                                                                      }) => {

    const isHead = variant === 'head'
    const isFooter = variant === 'footer'
    const isDiff = variant === 'diff'

    return (
        <div
            className={`grid grid-cols-12 py-[19px] px-[13px] ${isHead && 'text-black text-lg font-bold pt-0'} ${isFooter && 'text-black text-sm font-bold '} ${isDiff && 'bg-stone-50 mt-2'}`}>
            <div className={`col-span-6 text-left`}>
                {items[0]}
            </div>
            <div className={`col-span-3 text-center`}>
                {items[1]}
            </div>
            <div className={`col-span-3 text-right w-[60px]`}>
                {items[2]}
            </div>
        </div>
    )
}

const PolicyAlert: React.FC = () => {
    return (
        <div
            className="w-full pl-[11px] pr-2.5 pt-3.5 pb-[17px] border-2 border-black flex-col justify-center items-start gap-2.5 inline-flex">
            <div className="text-black text-sm font-bold">CONDITIONS DE VENTE</div>
            <div className="text-justify text-black text-base font-normal font-['DM Sans']">VENTES FINALES
                - Veuillez noter que toutes les ventes d'abonnements VTC Control et de services connexes sont finales et
                non remboursables.
            </div>
        </div>
    )
}
