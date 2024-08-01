"use client"

import {SectionTitle} from "@/app/(protected)/dashboard/status-accounts/soldes/components/_utils";
import mtn from "@/assets/agregators/mtn.png"
import Image from "next/image";
import {DiagramMoreButton} from "@/app/(protected)/dashboard/_components/_utils/DiagramUtils";
import VLinkProvider from "@/components/helpers/VLinkProvider";
import {useGetParkTransaction} from "@/hooks/withdrawal/useWithdrawal";
import Loading from "@/components/ui/Loader";

export const MyLastTransactions = () => {

    const {data: transactions, isLoading} = useGetParkTransaction()

    return (
        <div>
            <SectionTitle className={"mb-4 flex items-center justify-between"}>
                <div>Mes derniers paiements</div>
                {transactions?.length && <VLinkProvider to={"/dashboard/payment-history"}>
                    <DiagramMoreButton className={"text-[#506D82] font-bold"}>Voir tout l’historique</DiagramMoreButton>
                </VLinkProvider>}
            </SectionTitle>
            {isLoading &&
                <Loading/>
            }
            {!isLoading && !transactions && <div>
                <div className={"text-gray-500"}>Acunene transactions initié pour le moment</div>
            </div>}
            <div className={"flex flex-col gap-2"}>
                {!isLoading && transactions?.map((t, _i) => (
                    <Transaction key={_i}/>
                ))}
            </div>
        </div>
    )
}

export const Transaction = () => {

    return (
        <div
            className={"bg-white px-[16px] py-[21px] rounded-[20px] flex items-center justify-between border border-transparent hover:bg-white hover:border-zinc-500"}>
            <div className={"flex items-center gap-[18px]"}>
                <Image width={55} height={55} src={mtn} alt={""}/>
                <div className={"gap-[5px] flex flex-col"}>
                    <div className="text-[#888888] text-sm font-normal font-vInter leading-[14px]">24/02/2023</div>
                    <div className="text-black text-base font-semibold font-vInter leading-none">Nom du client</div>
                </div>
            </div>
            <div
                className={"text-[#888888] text-sm font-normal font-vInter leading-[14px] flex flex-col items-end justify-end text-right gap-[6px]"}>
                <div>15:30</div>
                <div>15,000 XOF</div>
                <div
                    className="text-center text-yellow-500 text-xs font-semibold font-vInter leading-[10.92px]  p-[2.73px] bg-yellow-100 rounded-sm justify-center items-center"
                >En cours
                </div>
            </div>
        </div>
    )
}

