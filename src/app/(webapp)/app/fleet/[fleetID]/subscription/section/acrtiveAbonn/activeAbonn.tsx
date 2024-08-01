"use client"
import {CrownIcon} from "@/components/ui/__icons";
import * as React from "react";
import {ABlockTitle} from "@/app/(webapp)/app/dashboard/_components/abonEvolution/abonnEvolution";
import {cn} from "@/lib/utils";

export const ActiveAbonnSection = () => {

    return (
        <div className={"flex flex-col gap-[18px]  p-4 bg-white rounded-[20px]"}>
            <ABlockTitle>Abonnement en cours</ABlockTitle>
            <div className={"flex gap-[46px]"}>
                <AbonnTypeCard
                    title={"PREMIUM ENTREPRISE"}
                    subtitle={"12000XAF/véhicule/mois"}
                    action={<div className="text-black text-xs font-semibold">Expire le 24/08/2024</div>}
                    logoColor={"text-[#e89900]"}
                    className={"bg-gradient-to-r from-[#FF9900] via-[#ffcd6f] to-[#E89900]"}
                />
                <ActiveAbonnDetails/>
            </div>
        </div>
    )
}

const ActiveAbonnDetails = () => {

    return (
        <div className={"flex flex-col gap-[16px] w-full"}>
            {[
                ["Type d’abonnement :", "Premium"],
                ["Date de souscription :", "04/08/2024"]
            ].map((item, index) => (
                <div key={index} className={"flex justify-between items-center"}>
                    <div className="text-black w-full text-base font-normal font-['DM Sans'] leading-[25px]">
                        {item[0]}
                    </div>
                    <div>
                        <div className="text-[#506d82] text-base font-normal font-['DM Sans'] leading-[25px]">
                            {item[1]}
                        </div>
                    </div>
                </div>
            ))}
            <button
                className={"text-center text-[#e51d13] text-sm font-bold font-['DM Sans'] leading-3 px-5 py-[12px] bg-[#ffeae9] rounded-md w-fit hover:opacity-80 transition"}>
                Résilier l’abonnement
            </button>
        </div>
    )
}


type AbonnTypeCardProps = {
    title: string,
    subtitle: string,
    action: React.ReactNode,
    logoColor: string,
}

export const AbonnTypeCard: React.FC<React.HTMLAttributes<HTMLDivElement> & AbonnTypeCardProps> = ({
                                                                                                       title,
                                                                                                       subtitle,
                                                                                                       action,
                                                                                                       logoColor,
                                                                                                       className
                                                                                                   }) => {

    return (
        <div
            className={
                cn(
                    "px-[17px] py-[18px] bg-[#ffd37f] rounded-lg bg-gradient-to-r from-[#FF9900] via-[#ffcd6f] to-[#E89900] min-w-[302px]",
                    className
                )}
        >
            <div className={"flex flex-col gap-[15px]"}>
                <div className={"flex justify-between"}>
                    <div
                        className={"size-[42px] bg-white flex justify-center items-center rounded-full text-[#E89900]"}>
                        <CrownIcon className={cn(
                            "self-center",
                            logoColor
                        )} width={25} height={25}/>
                    </div>
                    {action}
                </div>
                <div>
                    <div className="text-white text-lg font-bold  tracking-wider">{title}</div>
                    <div className="text-white text-sm font-bold font-['DM Sans']">{subtitle}</div>
                </div>
            </div>
        </div>
    )
}
