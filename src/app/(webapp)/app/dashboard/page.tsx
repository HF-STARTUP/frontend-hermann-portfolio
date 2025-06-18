"use client"
import {Crumb} from "@/components/ui/custom/crumb";
import {PageTitle} from "@/components/ui/custom/PageTitle";
import {HeadSection} from "@/app/(webapp)/app/dashboard/_components/head/headSection";
import {
    AbonnEvolution,
    BestFleet,
    SouscriptionPartition
} from "@/app/(webapp)/app/dashboard/_components/abonEvolution/abonnEvolution";
import React from "react";
import FleetMap from "@/app/(webapp)/app/dashboard/_components/news/fleet-map";
import PaymentMethods from "@/app/(webapp)/app/dashboard/_components/news/paymentMethods";
import {Activities} from "@/app/(webapp)/app/dashboard/_components/activities/acctivities";

export default function DashboardPage() {

    const fleetData = [
        {city: "Abidjan", value: "72K", coordinates: [4.0351, 5.3295]},
        {city: "New York", value: "72K", coordinates: [-74.006, 40.7128]},
        {city: "Chicago", value: "72K", coordinates: [-87.6298, 41.8781]},
        {city: "Sydney", value: "72K", coordinates: [151.2093, -33.8688]},
        {city: "Tokyo", value: "72K", coordinates: [139.6917, 35.6895]},
    ]

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
            <PageTitle page_title={"Dashboard"}/>
            <HeadSection/>
            <div className={"mt-[24px] grid grid-cols-12 gap-[24px] gap-x-[30px]"}>
                <div className={"col-span-12 2xl:col-span-5 "}>
                    <AbonnEvolution/>
                </div>
                <div className={"col-span-12 2xl:col-span-7"}>
                    <div className="">
                        <FleetMap
                            fleets={fleetData}
                        />
                    </div>
                    {/*<Activities/>*/}
                </div>
            </div>
            <div className={"mt-[24px]"}>
                <div className={"grid grid-cols-12 gap-[24px] gap-x-[30px]"}>
                    <div className={"col-span-12 2xl:col-span-4"}>
                        <BestFleet/>
                    </div>
                    <div className={"col-span-12 2xl:col-span-4"}>
                        <SouscriptionPartition/>
                    </div>
                    <div className={"col-span-12 2xl:col-span-4"}>
                        <PaymentMethods/>
                    </div>
                </div>
            </div>
        </div>
    )
}