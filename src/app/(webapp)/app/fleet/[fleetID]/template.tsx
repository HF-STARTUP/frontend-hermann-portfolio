"use client"
import React from "react";
import {Crumb} from "@/components/ui/custom/crumb";
import {PageTitle} from "@/components/ui/custom/PageTitle";
import {PageNavigation} from "@/app/(webapp)/app/fleet/[fleetID]/_utils";
import {AbonnTag} from "@/app/(webapp)/app/fleet/[fleetID]/subscription/section/AABonnHistory/AABonnHistory";
import {useGetActiveSubscriptionOnFleet} from "@/hooks/admin/useFleetHook";
import {WarningIcon} from "@/components/ui/__icons";
import AuthManagerGuard from "@/guard/AuthManagerGuard";

const Template: React.FC<{ children: React.ReactNode }> = ({children}) => {

    const {data: activeSubscription, isLoading} = useGetActiveSubscriptionOnFleet()

    const hasSubscription = !!activeSubscription?._instance.subscription

    return (
        <div>
            <Crumb
                items={[
                    {
                        label: "Flottes /",
                        url: "/fleet",
                    },
                    {
                        label: `${AuthManagerGuard.getEnabledFleetType} /`,
                        url: "/fleet",
                    },
                    // {
                    //     label: "Flotte de Christian",
                    //     url: "/fleet",
                    // },

                ]}
            />
            <div className={"flex flex-col lg:flex-row items-start lg:items-center justify-between"}>
                <PageTitle withSelect={false} isSecondFleet={true} page_title={"Flottes"}/>
                {activeSubscription &&
                    <div
                        className={"p-[11px] w-full md:w-fit  bg-white flex items-center justify-between md:justify-start gap-[13px]"}>
                        {hasSubscription && <AbonnTag label={activeSubscription.subscription.name}/>}
                        {hasSubscription ?
                            <div className="text-center text-[#506d82] text-sm font-normal tracking-tight">
                                Expire le {activeSubscription.endDate}
                            </div> : (
                                <div className={"text-sm font-medium text-gray-500 flex items-center gap-2"}>
                                    <WarningIcon/>
                                    <span>Aucun abonnement actif.</span>
                                </div>
                            )}
                    </div>}
                {isLoading &&
                    <div className={"h-[40px] w-[250px] rounded-md bg-slate-200 animate-pulse"}></div>
                }
            </div>

            <div className={"mt-[32px]"}>
                <PageNavigation/>
                <div className={"mt-[44px]"}>
                    {children}
                </div>
            </div>
        </div>
    )
}


export default Template

