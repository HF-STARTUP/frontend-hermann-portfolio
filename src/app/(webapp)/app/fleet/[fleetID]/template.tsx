"use client"
import React from "react";
import {Crumb} from "@/components/ui/custom/crumb";
import {PageTitle} from "@/components/ui/custom/PageTitle";
import {PageNavigation} from "@/app/(webapp)/app/fleet/[fleetID]/_utils";
import {AbonnTag} from "@/app/(webapp)/app/fleet/[fleetID]/subscription/section/AABonnHistory/AABonnHistory";
import {useGetActiveSubscriptionOnFleet} from "@/hooks/admin/useFleetHook";

const Template: React.FC<{ children: React.ReactNode }> = ({children}) => {

    const {data: activeSubscription, isLoading} = useGetActiveSubscriptionOnFleet()


    return (
        <div>
            <Crumb
                items={[
                    {
                        label: "Flottes /",
                        url: "/fleet",
                    },
                    {
                        label: "Particuliers /",
                        url: "/fleet",
                    },
                    {
                        label: "Flotte de Christian",
                        url: "/fleet",
                    },

                ]}
            />
            <div className={"flex items-center justify-between"}>
                <PageTitle isSecondFleet={true} page_title={"Flottes"}/>
                {activeSubscription && <div className={"p-[11px] bg-white flex items-center gap-[13px]"}>
                    <AbonnTag label={activeSubscription.subscription.subscriptionType}/>
                    <div className="text-center text-[#506d82] text-sm font-normal tracking-tight">
                        Expire le {activeSubscription.endDate}
                    </div>
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

