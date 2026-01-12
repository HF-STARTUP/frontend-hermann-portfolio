"use client";

import VImageProvider from "@/components/helpers/VImageProvider";
import mtnLogo from "@/assets/agregators/mtn.png"
import omLogo from "@/assets/agregators/om.png"
import ypayLogo from "@/assets/agregators/ypay.png"
import bankLogo from "@/assets/agregators/bank.png"
import React from "react";


export enum PayMethodUid {
    om = "om",
    momo = "momo",
    ypay = "ypay",
    bank = "bank",
}

export type PayModeType =  {
    uid: PayMethodUid,
    label: string,
    icon: React.ReactNode
}

export const paymentModes: PayModeType[] = [
    {
        uid: PayMethodUid.bank,
        label: "Virement bancaire",
        icon: <VImageProvider src={bankLogo} alt={'om icon'} width={24} height={24}/>
    },
    {
        uid: PayMethodUid.ypay,
        label: "Compte yPay",
        icon: <VImageProvider src={ypayLogo} alt={'om icon'} width={24} height={24}/>
    },
    {
        uid: PayMethodUid.om,
        label: "Orange Money",
        icon: <VImageProvider src={omLogo} alt={'om icon'} width={24} height={24}/>
},
{
    uid: PayMethodUid.momo,
        label: "MTN Mobile Money",
    icon: <VImageProvider src={mtnLogo} alt={'om icon'} width={24} height={24}/>
},
]
