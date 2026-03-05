"use client"
import { Crumb } from "@/components/ui/custom/crumb";
import { PageTitle } from "@/components/ui/custom/PageTitle";
import { HeadSection } from "@/app/(webapp)/app/dashboard/_components/head/headSection";
import {
    // AbonnEvolution,
    BestFleet,
    // SouscriptionPartition
} from "@/app/(webapp)/app/dashboard/_components/abonEvolution/abonnEvolution";
import { useDashboardFleetMap } from "@/app/(webapp)/app/dashboard/_hook/useDashboardFleetMap";
import React from "react";
import FleetMap from "@/app/(webapp)/app/dashboard/_components/news/fleet-map";
import PaymentMethods from "@/app/(webapp)/app/dashboard/_components/news/paymentMethods";
import { Activities } from "@/app/(webapp)/app/dashboard/_components/activities/acctivities";
import RevenueChart from "./_components/RevenusDiagram";
import { useDashboardRevenusEvolution, useDashboarRevenusBySource } from "./_hook/useDashboardSectionsHooks";
import RevenueBySourceChart from "./_components/RevenusBySource";
import { useDashboardHook } from "./_hook/useDashboardHook";
import NotificationBand from "@/components/display/NotificationBand";
import ExpiredSubsList from "./_components/_sub_components/ExpiredSubs";
import InnactiveFleetList from "./_components/_sub_components/InactiveFleet";

export default function DashboardPage() {

    const { fleets } = useDashboardFleetMap()

    const { chartLabels, chartValues, currency, totalRevenus, variation } = useDashboardRevenusEvolution();

    const { chartData } = useDashboarRevenusBySource();
    const { fleetBandContent, expiredSubscriptions, inactiveFleets, subscriptionsBandContent } = useDashboardHook();
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


            {expiredSubscriptions.length &&
                <NotificationBand content={subscriptionsBandContent} children={<ExpiredSubsList subs={expiredSubscriptions} /> } dialogTitle={`Abonnements expirant bientôt (${expiredSubscriptions.length})`} variant="error" />
            }
            {inactiveFleets.length &&
                <NotificationBand content={fleetBandContent} children={<InnactiveFleetList fleets={inactiveFleets} /> } dialogTitle={`Flottes inactives (${inactiveFleets.length})`} variant="error" />
            }

            <HeadSection />



            <div className={"mt-[24px] grid grid-cols-12 gap-[24px] gap-x-[30px]"}>
                {/* <div className={"col-span-12 2xl:col-span-5 "}>
                    <AbonnEvolution/>
                </div> */}
                <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-4 col-span-12">
                    <div className="lg:col-span-2 xl:col-span-3">
                        <RevenueChart chartLabels={chartLabels} chartValues={chartValues} currency={currency} totalRevenus={totalRevenus} variation={variation} />
                    </div>
                    <div className="xl:col-span-2">
                        <RevenueBySourceChart data={chartData} currency={currency} />
                    </div>
                </div>
                <div className={"col-span-12"}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-4 col-span-12">
                        <div className="lg:col-span-2 xl:col-span-3">
                            <FleetMap
                                fleets={fleets}
                            />
                        </div>

                        <div className={"xl:col-span-2"}>
                            <BestFleet />
                        </div>
                    </div>
                    {/*<Activities/>*/}
                </div>
            </div>
            <div className={"mt-[24px]"}>
                <div className={"grid grid-cols-12 gap-[24px] gap-x-[30px]"}>

                    {/* <div className={"col-span-12 2xl:col-span-4"}>
                        <SouscriptionPartition/>
                    </div>
                    <div className={"col-span-12 2xl:col-span-4"}>
                        <PaymentMethods/>
                    </div> */}
                </div>
            </div>
        </div>
    )
}