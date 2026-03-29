"use client"
import { Crumb } from "@/components/ui/custom/crumb";
import { PageTitle } from "@/components/ui/custom/PageTitle";
import { HeadSection } from "@/app/(webapp)/app/dashboard/_components/head/headSection";
import {
    // AbonnEvolution,
    // SouscriptionPartition
} from "@/app/(webapp)/app/dashboard/_components/abonEvolution/abonnEvolution";
import { useDashboardFleetMap } from "@/app/(webapp)/app/dashboard/_hook/useDashboardFleetMap";
import React from "react";
import FleetMap from "@/app/(webapp)/app/dashboard/_components/news/fleet-map";
import RevenueChart from "./_components/RevenusDiagram";
import { useDashboardRevenusEvolution } from "./_hook/useDashboardSectionsHooks";
import RevenueBySourceChart from "./_components/RevenusBySource";
import { useDashboardHook } from "./_hook/useDashboardHook";
import NotificationBand from "@/components/display/NotificationBand";
import ExpiredSubsList from "./_components/_sub_components/ExpiredSubs";
import InnactiveFleetList from "./_components/_sub_components/InactiveFleet";
import PeriodSelector from "@/components/elements/PeriodSelector";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Loader } from "lucide-react";
import { BestFleet } from "./_components/BestFleetsSection";

export default function DashboardPage() {


    const {
        fleetBandContent,
        expiredSubscriptions,
        inactiveFleets,
        subscriptionsBandContent,
        globalFilters,
        setGlobalFilters,
        currencies,
        isloadingCurrencies,
        totalExpiring,
        totalInactives
    } = useDashboardHook();
    const {
        chartLabels,
        chartValues,
        currency,
        totalRevenus,
        variation,
        localFilters,
        setLocalFilters,
        isLoadingRevenusChartData,
        revenusBySource
    } = useDashboardRevenusEvolution(globalFilters);
    
    const { fleets } = useDashboardFleetMap()

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
                end_component={<PeriodSelector defaultPeriod="current_month" onChange={(dateRange) => { setGlobalFilters({ ...globalFilters, dateRange }) }} />}
                close_component={
                    <div className="flex items-center gap-2">
                        <Select defaultValue="all" value={globalFilters?.profileType} onValueChange={(value) => setGlobalFilters({ ...globalFilters, profileType: value as "particulier" | "professionnel" | undefined })}>
                            <SelectTrigger className="bg-vaDarkBlue text-vaMainBlue">
                                <SelectValue placeholder="Filtrer par profil" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tous</SelectItem>
                                <SelectItem value="particulier">Entrepreneur</SelectItem>
                                <SelectItem value="professionnel">Professionnel</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={globalFilters?.currency} onValueChange={(value) => setGlobalFilters({ ...globalFilters, currency: value })}>
                            <SelectTrigger className="bg-vaDarkBlue text-vaMainBlue">
                                <SelectValue placeholder="Devise" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    isloadingCurrencies && (
                                        <div className="flex items-center justify-center p-4 gap-2">
                                            <Loader className="animate-spin" /> <span className="text-sm text-gray-500">Chargement des devises...</span>
                                        </div>
                                    )
                                }
                                {currencies?.map((currency) => (
                                    <SelectItem key={currency.id} value={currency.id}>
                                        {currency.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                }
            />


            {expiredSubscriptions?.length &&
                <NotificationBand content={subscriptionsBandContent} children={<ExpiredSubsList subs={expiredSubscriptions} />} dialogTitle={`Abonnements expirant bientôt (${totalExpiring})`} variant="error" />
            }
            {inactiveFleets?.length &&
                <NotificationBand content={fleetBandContent} children={<InnactiveFleetList fleets={inactiveFleets} />} dialogTitle={`Flottes inactives (${totalInactives})`} variant="error" />
            }

            <HeadSection globalFilters={globalFilters} />



            <div className={"mt-8 grid grid-cols-12 gap-6"}>
                <div className="col-span-12 space-y-6">
                    {/* <div className={" 2xl:col-span-5 "}>
                    <AbonnEvolution/>
                </div> */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-4 ">
                        <div className="lg:col-span-2 xl:col-span-3">
                            <RevenueChart
                                chartLabels={chartLabels}
                                chartValues={chartValues}
                                currency={currency}
                                totalRevenus={totalRevenus}
                                variation={variation}
                                setLocalFilters={setLocalFilters}
                                localFilters={localFilters}
                                isLoading={isLoadingRevenusChartData}
                            />
                        </div>
                        <div className="xl:col-span-2">
                            <RevenueBySourceChart
                                data={revenusBySource}
                                totalRevenus={totalRevenus}
                                currency={currency}
                                chartValues={chartValues}
                                isLoading={isLoadingRevenusChartData}
                            />
                        </div>
                    </div>
                    <div className={""}>
                        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-4 ">
                            <div className="lg:col-span-2 xl:col-span-3">
                                <FleetMap
                                    fleets={fleets}
                                />
                            </div>

                            <div className={"xl:col-span-2"}>
                                <BestFleet globalFilters={globalFilters}  />
                            </div>
                        </div>
                        {/*<Activities/>*/}
                    </div>
                </div>
                <div className={"mt-[24px]"}>
                    <div className={"grid grid-cols-12 gap-[24px] gap-x-[30px]"}>

                        {/* <div className={" 2xl:col-span-4"}>
                        <SouscriptionPartition/>
                    </div>
                    <div className={" 2xl:col-span-4"}>
                        <PaymentMethods/>
                    </div> */}
                    </div>
                </div>
            </div>

        </div>
    )
}