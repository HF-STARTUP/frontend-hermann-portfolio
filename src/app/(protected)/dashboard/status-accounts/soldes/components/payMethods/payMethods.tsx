"use client"

import {SectionTitle} from "@/app/(protected)/dashboard/status-accounts/soldes/components/_utils";
import Image from "next/image";
import om from "@/assets/agregators/om.png"
import {AddIcon, MoreVerIcon} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import React from "react";
import {cn} from "@/lib/utils";
import {
    PaymentMethodsDialog
} from "@/app/(protected)/dashboard/status-accounts/soldes/actions/addPaymentMethod/addPaymentMethod";
import {useGetMyDrawals} from "@/hooks/withdrawal/useWithdrawal";
import Loading from "@/components/ui/Loader";
import {PaymentInfoModel} from "@/model/drawal/Drawal";

export const PayMethods = () => {

    const {data: myDrawals, isLoading} = useGetMyDrawals()

    if(isLoading){

        return (
            <Loading />
        )
    }

    return (
        <div>
            <SectionTitle className={"mb-4"}>Mes moyens de paiements</SectionTitle>
            <div className={"grid grid-cols-12 gap-4"}>
                {myDrawals?.map((drawal)=> (
                    <div className={"col-span-4"} key={drawal.id}>
                        <PayMethod info={drawal}/>
                    </div>
                ))

                }
                <div className={"col-span-4"}>
                    <PaymentMethodsDialog>
                        <PayMethod mode={"new"}/>
                    </PaymentMethodsDialog>
                </div>
            </div>
        </div>
    )
}

const PayMethod: React.FC<React.HTMLAttributes<HTMLDivElement> & { mode?: "new", info?: PaymentInfoModel }> = ({mode, info}) => {

    const isNewMethod = mode === 'new'

    return (
        <div
            className={
            cn(
                "bg-white rounded-3xl border border-stone-50 flex flex-col gap-[34px] p-[25px] border-transparent  transition duration-150 hover:bg-white hover:border-zinc-500",
                isNewMethod&&"cursor-pointer"
            )
            }>
            <div className={"flex items-center justify-between"}>
                {!isNewMethod && info && <Image
                    src={info.withdrawalInfo.image}
                    width={65}
                    height={65}
                    alt={""}
                    className={"size-[65px] rounded-full"}
                />}
                {isNewMethod && <div
                    className={"size-[65px] bg-neutral-300 text-white flex items-center justify-center rounded-full"}>
                    <AddIcon/>
                </div>}
                {!isNewMethod && info && false && <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className={"text-[#80878C]"}>
                            <MoreVerIcon/>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Que souhaitez vous faire ?</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>Desactiver</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>}
            </div>
            {!isNewMethod  && info && <div>
                <span className="text-zinc-500 text-base font-normal eading-snug">{info.title}<br/></span>
                <span className="text-black text-base font-normal  leading-snug">{info.phoneNumber}</span>
            </div>}
            {isNewMethod && (
                <div className="text-black text-base font-bold leading-snug">Ajouter</div>
            )}
        </div>
    )
}
