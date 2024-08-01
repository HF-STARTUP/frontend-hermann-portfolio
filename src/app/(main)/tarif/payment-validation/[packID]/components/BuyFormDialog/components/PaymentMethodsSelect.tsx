"use client"
import React, {useState} from 'react'
import {RadioGroup} from '@headlessui/react'
import momo from "@/assets/img/pay/momo.png"
import creditCard from "@/assets/img/pay/credit-card.png"
import uncheckCircle from "@/assets/img/icons/uncheck.png"
import Image from "next/image";
import {useInitSubscription} from "@/hooks/subscription/useSubscription";

const paymentMethods = [
    {
        name: 'Carte de crédit/débit',
        image: creditCard,
        key: "credit_card"
    },
    {
        name: 'Mobile Banking',
        image: momo,
        key: "momo"
    },
]

export default function PaymentMethodsSelect({onMethodChange}: {onMethodChange: (m: string)=>void}) {
    const [selected, setSelected] = useState(paymentMethods[0])

    React.useEffect(()=>{
        onMethodChange(selected.key)
    }, [selected])

    return (
        <div className="w-full py-[26px]">
            <div className="">
                <RadioGroup value={selected} onChange={setSelected}>
                    <RadioGroup.Label className="sr-only">Méthode de paiement</RadioGroup.Label>
                    <div className="grid grid-cols-12 gap-4">
                        {paymentMethods.map((method) => (
                            <div key={method.name} className={`col-span-12 sm:col-span-6`}>
                                <RadioGroup.Option
                                    value={method}
                                    className={({active, checked}) =>
                                        `${
                                            active
                                                ? 'ring-2 ring-white/60 ring-offset-2 ring-offset-sky-600'
                                                : 'ring-2 ring-white/60 ring-offset-2 ring-offset-slate-300'
                                        }
                                        ${checked ? 'bg-slate-50 text-white' : 'bg-white'}
                                            relative flex cursor-pointer rounded-lg px-5 py-4  focus:outline-none`
                                    }
                                >
                                    {({active, checked}) => (
                                        <>
                                            <div className="flex w-full items-start justify-start gap-4">
                                                {checked ? (
                                                    <div className="shrink-0">
                                                        <CheckIcon className="size-[19px]"/>
                                                    </div>
                                                ) : (
                                                    <Image src={uncheckCircle} alt={''} width={19}/>
                                                )}
                                                <div className="flex items-center">
                                                    <div className="text-sm">
                                                        <RadioGroup.Label
                                                            as="p"
                                                            className={`font-medium text-xl leading-snug mb-[10px] select-none ${
                                                                checked ? 'text-sky-600' : 'text-stone-300'
                                                            }`}
                                                        >
                                                            {method.name}
                                                        </RadioGroup.Label>
                                                        <RadioGroup.Description
                                                            as="span"
                                                            className={`inline ${
                                                                checked ? 'text-sky-100' : 'text-gray-500'
                                                            }`}
                                                        >
                                                            <Image height={24} src={method.image} alt={method.name}/>
                                                        </RadioGroup.Description>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </RadioGroup.Option>
                            </div>
                        ))}
                    </div>
                </RadioGroup>
            </div>
        </div>
    )
}

function CheckIcon(props: any) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <circle cx={12} cy={12} r={12} fill="#0086D1" />
            <path
                d="M7 13l3 3 7-7"
                stroke="#fff"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
