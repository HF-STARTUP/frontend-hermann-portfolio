"use client"

import BtnBase from "@/components/elements/BtnBase";
import {
    PaymentMethodsDialog
} from "@/app/(protected)/dashboard/status-accounts/soldes/actions/addPaymentMethod/addPaymentMethod";
import {useGetDashboardInfos, useGetParkAmount} from "@/hooks/withdrawal/useWithdrawal";
import {cn} from "@/lib/utils";
import walletIcon from "@/assets/agregators/ypaywallet.png"
import Image from "next/image";

export const AccountStatus = () => {

    return (
        <div className={"flex flex-col gap-[27px]"}>
            <Image
                src={walletIcon}
                alt={""}
                width={190}
                height={40}
            />
            <div className={"flex items-start justify-between"}>
                <div className={"flex items-center gap-[22px]"}>
                    <AccountStatusCard/>
                    <DailyAccountStatusCard/>
                </div>
                <PaymentMethodsDialog mode={"remove"}>
                    <BtnBase to={""} shape={'square'} variant={'contained'} fontWeight={'bold'} color={'yellow'}>Retirez
                        des
                        fonds</BtnBase>
                </PaymentMethodsDialog>
            </div>
        </div>
    )
}


const AccountStatusCard = () => {

    const {data: amount, isLoading} = useGetParkAmount()

    return (
        <div
            className={"cursor-default min-w-[280px] h-[123px] px-[15.03px] py-[11.28px] border-2 border-transparent hover:border-black/10 bg-gradient-to-r from-red-900 via-red-600 to-red-900 rounded-[22.55px] flex flex-col gap-[15.53px]"}>
            {isLoading || (!amount) && <div className={"w-full h-[50px] bg-slate-50 animate-pulse"}></div>}
            {amount && <div className={"flex items-end gap-1"}>
                <div
                    className="text-white text-[45.10px] font-semibold font-vInter leading-[56.38px]">{amount?.amount}</div>
                <div className="text-white text-[26.31px] font-normal font-vInter">{amount.curency}</div>
            </div>}
            <div className={"flex items-center gap-1"}>
                <div className="text-white text-lg font-normal font-vInter">Solde actuel</div>
                {/*<div*/}
                {/*    className="p-[3.76px] bg-lime-50 rounded-lg text-center text-[15.03px] font-bold font-vInter leading-tight text-[#82BE6D]">+17,500*/}
                {/*    XOF*/}
                {/*</div>*/}
            </div>
        </div>
    )
}

const DailyAccountStatusCard = () => {

    const {data: infos, isLoading} = useGetDashboardInfos()

    return (
        <div className={cn(
            "px-[7.89px] py-[5.92px] bg-slate-50 hover:border-blue-300 rounded-xl border border-blue-200 cursor-default h-[89px] min-w-[219px]",
            isLoading && "animate-pulse"
        )}>

            {infos && (
                <>
                    <div className={"flex items-end gap-1"}>
                        <div
                            className="text-black text-2xl font-semibold font-vInter leading-[29.58px]">{infos.todayExceptedRecip}</div>
                        <div className="text-black text-sm font-normal font-vInter">{infos?.curency}</div>
                    </div>
                    <div className="text-black text-sm font-normal font-vInter">Revenus attendus du jour</div>
                    <div className={"mt-[8.29px]"}>
                        <div className="w-[131.32px] h-[2.76px] relative bg-blue-200 rounded-[27.65px] mt-[2.76px]">
                            <div
                                style={{
                                    width: `${Math.min(100, (infos.actuelRecipe / infos.todayExceptedRecip) * 100)}%`,
                                    maxWidth: "131.32px"
                                }}
                                className="h-[4.15px] absolute bg-blue-800 rounded-[69.12px]"/>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}