"use client"
import {Dialog, Transition} from '@headlessui/react'
import React, {Fragment, useState} from 'react'
import close from "@/assets/img/icons/close.png"
import Image from "next/image";
import {SelectField, VSelectProp} from "@/components/form/TextField";
import BtnBase from "@/components/elements/BtnBase";
import {PackInterface} from "@/app/(main)/tarif/components/packs/Packs";
import BuyFormDialog from "@/app/(main)/tarif/payment-validation/[packID]/components/BuyFormDialog/BuyFormDialog";

const BillOptionDialog: React.FC<{
    pack: 'blue' | 'red' | 'yellow',
    children: React.ReactNode,
    pack_obj: PackInterface
}> = ({
          pack,
          children,
          pack_obj
      }) => {
    let [isOpen, setIsOpen] = useState(false)
    const [nbUsers, setNbUsers] = React.useState(1)
    const [subscriptionType, setSubscriptionType] = React.useState("monthly")
    const [activeIsYear, setActiveIsYear] = React.useState(true)

    const [price, setPrice] = React.useState(activeIsYear ? pack_obj.amount * 12 : pack_obj.amount)
    const [remise, setRemise] = React.useState(0)
    const [total, setTotal] = React.useState(0)

    React.useEffect(() => {

        const REMISE_COAST = activeIsYear ? pack_obj.remise : 0;

        const abonAmmount = nbUsers * (+pack_obj.amount * (activeIsYear ? 12 : 1))
        const remise = (abonAmmount * (REMISE_COAST ?? 0) / 100)
        const total = abonAmmount - remise

        setPrice(abonAmmount)
        setRemise(remise)
        setTotal(total)

    }, [activeIsYear, nbUsers])


    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const NbUsers = Array.from({length: 12}).map((_, i) => ({
        label: '' + (i + 1),
        value: '' + (i + 1)
    })) satisfies VSelectProp[]

    const selectedTarif = pack_obj

    let gradiantBg = `from-red-900 to-red-600`

    if (pack === 'yellow') gradiantBg = `from-yellow-900 to-yellow-600`
    if (pack === 'red') gradiantBg = `from-red-900 to-red-600`
    if (pack === 'blue') gradiantBg = `from-blue-900 to-blue-600`

    // let amount = +pack_obj.packPrice
    // let end_date = new Date()
    // if(pack_obj.subscription_plan == SUBSCRIPTION_PLAN.YEARLY) {
    //     amount = ((amount * body.vehicle_number) * 12);
    //     let remise = (amount * (subscription.remise ?? 0) / 100)
    //     amount -= remise
    //     end_date.setFullYear(end_date.getFullYear() + 1);
    // }else {
    //     amount = subscription.amount! * body.vehicle_number
    //     end_date.setMonth(end_date.getMonth() + 1);
    // }


    return (
        <>
            <div onClick={openModal}>
                {children}
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60"/>
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    className={`${gradiantBg} w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all`}>
                                    <div>
                                        <div className={`flex justify-between items-start pb-6`}>
                                            <div className="h-[73px] flex-col justify-start items-start inline-flex">
                                                <div
                                                    className="text-black text-[18.95px] lg:ext-2xl font-bold font-['DM Sans']">Pack
                                                </div>
                                                <div
                                                    className="text-black  text-[25.26px] lg:text-[32px] font-bold font-['DM Sans']">{selectedTarif?.packName}</div>
                                            </div>
                                            <div
                                                className={`cursor-pointer hover:opacity-60 transition ease-in duration-300 hover:rotate-3`}
                                                onClick={closeModal}>
                                                <Image src={close} alt={'close icon'} width={39}/>
                                            </div>
                                        </div>
                                        <div
                                            className={`relative bg-gradient-to-bl from-${selectedTarif?.variant}-900 to-${selectedTarif?.variant}-600 rounded-[14px] px-[13px] py-[15px] mb-[45px]`}>
                                            <div className={`pb-[93px]`}>

                                                <div
                                                    className="h-[50px] lg:h-[65px] px-2.5 py-1.5 bg-white rounded-[300px] justify-start items-center gap-1.5 inline-flex"
                                                    onClick={() => setActiveIsYear(!activeIsYear)}>
                                                    <OneTimeOption name={'Annuel'} active={activeIsYear}/>
                                                    <OneTimeOption name={'Mensuel'} active={!activeIsYear}/>
                                                </div>

                                                <div className={`flex flex-col justify-start pt-[40px]`}>
                                                    <div
                                                        className="text-left text-white text-xl font-medium font-['DM Sans'] leading-[48.57px]">
                                                        Nombre de véhicules
                                                    </div>
                                                    <SelectField
                                                        variant={'rounded'}
                                                        items={NbUsers}
                                                        handleSelect={i => setNbUsers(+i)}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <MiniListItem label={`${nbUsers} utilisateur`}
                                                              value={`${formatNumberWithCommas(price)}`}/>
                                                <MiniListItem
                                                    label={`Remise abonement ${activeIsYear ? `annuel ${pack_obj.remise}%` : "mensuel 0%"} `}
                                                    value={`${formatNumberWithCommas(remise)}`}/>
                                                <div className="h-[0px] border border-white"></div>
                                                <div className={`pt-[20px]`}>
                                                    <MiniListItem label={'TOTAL'}
                                                                  value={`${formatNumberWithCommas(total)}`}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={``}>
                                            <BuyFormDialog
                                                className={`hidden lg:block`}
                                                subscription_type={activeIsYear ? "yearly" : "monthly"}
                                                vehicle_number={nbUsers}
                                                total={total}
                                                subscription_id={pack_obj.id}
                                            >
                                                <BtnBase
                                                    color={'black'}
                                                    variant={'outline'}
                                                >
                                                    Acheter maintenant
                                                </BtnBase>
                                            </BuyFormDialog>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}


const OneTimeOption: React.FC<{ name: string, active: boolean }> = ({name, active}) => {

    return (
        <div className={`cursor-pointer hover:opacity-90 h-[40px] lg:h-[47px]  pl-[45px] pr-[45px] lg:pl-[69px] lg:pr-[68px] py-[11px] 
        rounded-[200px] justify-center items-center w-full grow flex ${active ? 'bg-black' : 'bg-white hover:bg-slate-200'}
        transition-[background-color] ease-in duration-200 delay-75
        `}>
            <div
                className={`text-center ${active ? 'text-white' : 'text-black'} text-sm lg:text-xl font-medium`}>{name}</div>
        </div>
    )
}

const MiniListItem: React.FC<{ label: string, value: string }> = ({label, value}) => {
    return (
        <div className="h-[49px] flex justify-between items-start">
            <div className="text-white text-xl font-normal font-['DM Sans'] leading-[48.57px] italic">{label}</div>
            <div className="text-right text-white text-xl font-medium font-['DM Sans'] leading-[48.57px]">{value}</div>
        </div>
    )
}

export function formatNumberWithCommas(value: number): string {
    // Obtenir la partie entière du nombre
    const integerValue = Math.floor(value);
    // Formater la partie entière avec des virgules
    return new Intl.NumberFormat('en-US').format(integerValue);
}

export default BillOptionDialog
