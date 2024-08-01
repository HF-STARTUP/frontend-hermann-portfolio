"use client"

import React from "react";
import {AdminSettingBox} from "@/components/box/Card";
import {AdminPageTitle} from "@/components/typo/typo";
import {useCheckActiveSubscription} from "@/hooks/subscription/useSubscription";
import {ChevronRightIcon} from "lucide-react";
import VLinkProvider from "@/components/helpers/VLinkProvider";
import Loading from "@/components/ui/Loader";

const SubscriptionInfosPage: React.FC = () => {

    const {data, isLoading} = useCheckActiveSubscription()

    return (
        <AdminSettingBox>
            <AdminPageTitle withMb={true}>Abonnement</AdminPageTitle>
            <div className={"text-[18px] text-text-body font-medium"}>Détails de l'offre</div>
            {isLoading && <Loading/>}
            {data && <div className={"mt-8"}>
                <div className={"rounded-lg overflow-hidden border"}>
                    <div className={"h-[10px] w-full bg-gradient-to-r from-blue-800 to-red-600"}></div>
                    <div className={"py-[20px] px-5"}>
                        <h4 className={"text-[28px] font-bold text-[2a2a2a]"}>{data.subscription.name}</h4>
                        <p className={"pt-1 font-medium text-[16px] text-admin-primary"}>
                            Votre abonnement VTC Control expirera dans {data.remainingDays} jours
                        </p>
                        <Divider/>
                        <VLinkProvider to={"/tarif"} className={"w-full block"}>
                            <div
                                className={"flex items-center justify-between p-3 hover:bg-slate-50 group mb-[20px] rounded-lg bg-slate-100"}>
                                <h4 className={"text-[28px] font-bold text-[2a2a2a]"}>Prolonger mon abonnment</h4>
                                <button className={"group-hover:scale-125 cursor-pointer"}>
                                    <ChevronRightIcon/>
                                </button>
                            </div>
                        </VLinkProvider>
                    </div>
                </div>
            </div>}
        </AdminSettingBox>
    )
}

const Divider = () => {
    return (
        <div className={"border-t border-admin-primary/20 my-5"}></div>
    )
}

export default SubscriptionInfosPage
