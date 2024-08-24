"use client"
import {CrownIcon} from "@/components/ui/__icons";
import * as React from "react";
import {ABlockTitle} from "@/app/(webapp)/app/dashboard/_components/abonEvolution/abonnEvolution";
import {cn} from "@/lib/utils";
import {useGetActiveSubscriptionOnFleet} from "@/hooks/admin/useFleetHook";
import Loading from "@/components/ui/Loader";
import {AbonResponseModel} from "@/model/ADMIN/fleet";

export const ActiveAbonnSection = () => {

    const {data: activeSubscription, isLoading} = useGetActiveSubscriptionOnFleet()

    if (isLoading) {
        return (
            <Loading/>
        )
    }

    if (activeSubscription) {

        const abon = activeSubscription.subscription
        const hasAbonnement = !!activeSubscription._instance.subscription

        return (
            <div className={"flex flex-col gap-[18px]  p-4 bg-white rounded-[20px]"}>
                <ABlockTitle>Abonnement en cours</ABlockTitle>
                <div className={"flex flex-col lg:flex-row gap-[46px]"}>
                    {hasAbonnement ? <AbonnTypeCard
                        title={abon.name}
                        subtitle={activeSubscription.abonResume}
                        action={<div className="text-black text-xs font-semibold">Expire
                            le {activeSubscription.endDate}</div>}
                        logoColor={"text-[#e89900]"}
                        className={"bg-gradient-to-r from-[#FF9900] via-[#ffcd6f] to-[#E89900]"}
                    /> : (<div
                        className={"h-[200px] w-full flex items-center justify-center"}>
                        <p className={"text-xl text-center text-vaTextPrimary font-medium"}>Aucun abonnement actif.</p>
                    </div>)}
                    {hasAbonnement && <ActiveAbonnDetails subs={activeSubscription}/>}
                </div>
            </div>
        )
    }
}

const ActiveAbonnDetails: React.FC<{ subs: AbonResponseModel }> = ({subs}) => {

    return (
        <div className={"flex flex-col gap-[16px] w-full"}>
            {[
                ["Type d’abonnement :", subs.subscription.subscriptionType],
                ["Date de souscription :", subs.startDate]
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
                disabled={true}
                className={cn(
                    "text-center text-[#e51d13] text-sm font-bold font-['DM Sans'] leading-3 px-5 py-[12px] bg-[#ffeae9] rounded-md w-fit hover:opacity-80 transition",
                    "opacity-60 hover:opacity-60 cursor-auto"
                )}>
                Résilier l’abonnement
            </button>
        </div>
    )
}


type AbonnTypeCardProps = {
    title: string,
    subtitle: string,
    action?: React.ReactNode,
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
