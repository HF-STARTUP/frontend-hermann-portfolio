"use client"
import {Crumb} from "@/components/ui/custom/crumb";
import {PageTitle} from "@/components/ui/custom/PageTitle";
import {HeadSection} from "@/app/(webapp)/app/dashboard/_components/head/headSection";
import {Activities} from "@/app/(webapp)/app/dashboard/_components/activities/acctivities";
import {AbonnEvolution} from "@/app/(webapp)/app/dashboard/_components/abonEvolution/abonnEvolution";
import React from "react";

export default function DahboardPage() {

    return (
        <div>
            <Crumb
                items={[
                    {
                        label: "Dashboard",
                        url: "/dashboard",
                    }
                ]}
            />
            <PageTitle 
                page_title={"Dashboard"}
                withSelect={false}
            />
            <HeadSection/>
            <div className={"mt-[24px] grid grid-cols-12 gap-[24px] gap-x-[30px]"}>
                <div className={"col-span-12 2xl:col-span-5 "}>
                    <AbonnEvolution/>
                </div>
                <div className={"col-span-12 2xl:col-span-7"}>
                    <Activities/>
                </div>
            </div>
        </div>
    )
}