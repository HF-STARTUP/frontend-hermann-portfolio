"use client"
import React, {useState} from "react";
import DialogBase, {DialogContent, DialogHead} from "@/components/dialog/Dialog";
import {Divider} from "@/components/box/Card";
import BtnBase from "@/components/elements/BtnBase";
import {CreditCardField} from "@/components/form/TextField";
import FormGroup from "@/components/box/FormGroup";
import check from "@/assets/img/icons/check.png"
import uncheck from "@/assets/img/icons/uncheck.png"
import Image from "next/image";

type BuyCardInfoDialogProps = {
    children?: React.ReactNode,
    htmlRef: React.MutableRefObject<any>
}

const BuyCardInfoDialog: React.FC<BuyCardInfoDialogProps> = ({children, htmlRef}) => {

    let [isOpen, setIsOpen] = useState(false)

    function toggleModal() {
        setIsOpen(!isOpen)
    }


    return (
        <form>
            <div onClick={toggleModal} ref={htmlRef}>{children}</div>
            <DialogBase variant={'lg'} isOpenned={isOpen} onClose={toggleModal}>
                <DialogHead handleToggle={toggleModal} title={'Paiement sécurisé'}/>
                <DialogContent>
                    <div>
                        <div className={``}>
                            <div className={`mb-[27px]`}>
                                <FormGroup auth={true}>
                                    <CreditCardField name={'card_number'} placeholder={'1234 1234 1234'}
                                                     label={'Numéro de carte'}/>
                                    <div className={`grid grid-cols-12 gap-2`}>
                                        <div className={`col-span-6 md:col-span-6`}>
                                            <CreditCardField name={'expire_date'} placeholder={'MM/YY'}
                                                             label={'Date d’expiration'}/>
                                        </div>
                                        <div className={`col-span-6 md:col-span-6`}>
                                            <CreditCardField name={'card_cvc'} placeholder={'3 digits'} label={'CVV'}/>
                                        </div>
                                    </div>
                                    <CreditCardField name={'card_name'} placeholder={'Nom sur la carte'}
                                                     label={'Nom sur la carte'}/>
                                </FormGroup>
                            </div>
                            <Divider/>
                            <div className={`mt-[27px]`}>
                                <CheckConfirm/>
                            </div>
                            <div className={`mt-[77px]`}></div>
                            <BtnBase fullwidth={true} to={''} color={'black'} variant={'outline'}>Payez maintenant
                                $10,99</BtnBase>
                        </div>
                    </div>
                </DialogContent>
            </DialogBase>
        </form>
    )
}

const CheckConfirm = () => {
    const [checked, setChecked] = React.useState(true)

    const handleToggleCheck = ()=>{
        setChecked(!checked)
    }

    return (
        <div className="justify-start items-center gap-3.5 inline-flex cursor-pointer" onClick={handleToggleCheck}>
            <div className="pl-[3px] pr-0.5 pt-[3px] pb-0.5 rounded-[20px] justify-center items-center flex">
                <div className="w-3.5 h-3.5 relative flex-col justify-start items-start flex">
                    {checked ? <Image src={check} alt={''}/> :  <Image src={uncheck} alt={''}/>}
                </div>
            </div>
            <div className="text-black text-xl font-medium font-['DM Sans'] leading-snug">Enregistrer cette carte pour
                les futurs paiements
            </div>
        </div>
    )
}


export default BuyCardInfoDialog
