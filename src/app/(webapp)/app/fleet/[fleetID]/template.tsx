"use client"
import React from "react";
import {Crumb} from "@/components/ui/custom/crumb";
import {PageTitle} from "@/components/ui/custom/PageTitle";
import {PageNavigation} from "@/app/(webapp)/app/fleet/[fleetID]/_utils";
import {AbonnTag} from "@/app/(webapp)/app/fleet/[fleetID]/subscription/section/AABonnHistory/AABonnHistory";

const Template: React.FC<{ children: React.ReactNode }> = ({children}) => {


    return (
        <div>
            <Crumb
                items={[
                    {
                        label: "Flottes",
                        url: "/fleet",
                    },
                    {
                        label: "Particuliers",
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
                <div className={"p-[11px] bg-white flex items-center gap-[13px]"}>
                    <AbonnTag label={"PREMIUM"}/>
                    <div className="text-center text-[#506d82] text-sm font-normal tracking-tight">Expire
                        le 24/04/2023
                    </div>
                </div>
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

