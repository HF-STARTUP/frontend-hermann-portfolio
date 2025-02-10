"use client"

import {ActionCard, AverageType} from "@/app/(webapp)/app/dashboard/_components/head/_components/actionCard";
import {CarAltIcon, CarCrashIcon, CashAltIcon, ToolIcon, UserIcon} from "@/components/ui/__icons";
import {cn} from "@/lib/utils";
import * as React from "react";
import {useGetFleetProfilesVehiclesDetails, useGetSpecificFleetStats} from "@/hooks/admin/useFleetHook";
import Loading from "@/components/ui/Loader";
import Image from "next/image";
import {imageBaseUrl} from "@/model/Model";
import {useGetActiveCurrency} from "@/hooks/__globlal/useGlobalHook";

export const StatCards = () => {

    const {data, isLoading} = useGetSpecificFleetStats()
    const {data: profileAndVehicle, isLoading: loadingProfileAndVehicle} = useGetFleetProfilesVehiclesDetails()
    const {currency} = useGetActiveCurrency()



    if (isLoading || loadingProfileAndVehicle) {

        return (
            <Loading className={"h-[90px]"}/>
        )
    }

    return (
        <div className={"grid grid-cols-12 gap-[24px]"}>
            <div className={"col-span-12 2xl:col-span-8"}>
                {data && (
                    <div className={"grid grid-cols-12 lg:grid-cols-5 gap-[24px]"}>
                        <div className={"col-span-6 xl:col-span-1"}>
                            <ActionCard
                                icon={{
                                    color: "bg-[#E5E4FF] text-[#2554AE]",
                                    value: <CarCrashIcon/>
                                }}
                                average={{
                                    type: resolveIndicator(data.vehicle.indicateur),
                                    label: `${data.vehicle.indicateur_value} ce mois`
                                }}
                                cardValue={{
                                    label: "Total véhicules",
                                    value: "" + data.vehicle.total
                                }}
                            />
                        </div>

                        <div className={"col-span-6 xl:col-span-1"}>
                            <ActionCard
                                icon={{
                                    color: "bg-[#d7ffec] text-[#00a656]",
                                    value: <UserIcon/>
                                }}
                                average={{
                                    type: resolveIndicator(data.vehicle.indicateur),
                                    label: `${data.driver.indicateur_value} ce mois`
                                }}
                                cardValue={{
                                    label: "Total chauffeurs",
                                    value: "" + data.vehicle.total
                                }}
                            />
                        </div>

                        <div className={"col-span-12 xl:col-span-1"}>
                            <ActionCard
                                icon={{
                                    color: "bg-[#ffe7e7] text-[#E51D13]",
                                    value: <CashAltIcon/>
                                }}
                                average={{
                                    type: resolveIndicator(data.ca_total.indicateur),
                                    label: `${data.ca_total.indicateur_value} ce mois`
                                }}
                                cardValue={{
                                    label: "Chiffre d’affaires",
                                    value: `${data.ca_total.total} ${currency}`
                                }}
                            />
                        </div>

                        <div className={"col-span-6 xl:col-span-1"}>
                            <ActionCard
                                icon={{
                                    color: "bg-[#ffe7e7] text-[#E51D13]",
                                    value: <ToolIcon/>
                                }}
                                average={{
                                    type: resolveIndicator(data.entretien.indicateur),
                                    label: `${data.entretien.indicateur_value} ce mois`
                                }}
                                cardValue={{
                                    label: "Total entretiens",
                                    value: `${data.entretien.total}`
                                }}
                            />
                        </div>

                        <div className={"col-span-6 xl:col-span-1"}>
                            <ActionCard
                                icon={{
                                    color: "bg-[#fff1e4] text-[#ff9900]",
                                    value: <CarAltIcon/>
                                }}
                                average={{
                                    type: resolveIndicator(data.course.indicateur),
                                    label: `${data.course.indicateur_value} ce mois`
                                }}
                                cardValue={{
                                    label: "Total courses",
                                    value: `${data.course.total}`
                                }}
                            />
                        </div>
                    </div>
                )
                }
            </div>
            {<div className={"col-span-12 2xl:col-span-4"}>
                <div className={"grid grid-cols-12 gap-[24px] h-full"}>
                    <div className={"col-span-6 h-full"}>
                        <StatCardLarge
                            title={`${profileAndVehicle?.best_vehicle?.vehicle?.brand ?? "-"} ${profileAndVehicle?.best_vehicle?.vehicle?.model ?? "-"} - ${profileAndVehicle?.best_vehicle?.vehicle?.registration_number ?? "-"}`}
                            subtitle={`${profileAndVehicle?.best_vehicle?.value ?? "-"} ${currency}`}
                            icon={profileAndVehicle?.best_vehicle?.vehicle?.image
                                ? <Image
                                    width={90}
                                    height={90}
                                    className={"rounded-full bg-contain w-[100px]"}
                                    alt={""}
                                    src={`${imageBaseUrl}/` + profileAndVehicle?.best_vehicle?.vehicle.image}
                                /> : <CarCrashIcon/>}
                        />
                    </div>
                    <div className={"col-span-6 h-full"}>
                        <StatCardLarge
                            title={`${profileAndVehicle?.best_driver?.profile?.last_name ?? "-"} ${profileAndVehicle?.best_driver?.profile?.first_name ?? "-"}`}
                            subtitle={`${profileAndVehicle?.best_driver?.value ?? "-"} ${currency}`}
                            icon={profileAndVehicle?.best_driver?.profile?.image
                                ? <Image
                                    width={90}
                                    height={90}
                                    alt={""}
                                    className={"w-[40px]"}
                                    src={`${imageBaseUrl}/` + profileAndVehicle?.best_driver?.profile?.image}
                                />
                                : <UserIcon/>
                            }
                            className={"border-[#2554ae] bg-[#eff1ff]"}
                            iconColor={"text-[#2554AE]"}
                        />
                    </div>
                </div>
            </div>}
        </div>
    )
}


const StatCardLarge: React.FC<React.HTMLAttributes<HTMLDivElement> & {
    title: string,
    subtitle: string,
    icon: React.ReactNode,
    iconColor?: string
}> = ({
          title,
          subtitle,
          icon,
          className,
          iconColor
      }) => {
    return (
        <div className={cn(
            "px-[17px] py-[18px] bg-[#fff1e4] rounded-lg border border-[#ffc700] h-full",
            className
        )}>
            <div>
                <div
                    className={cn(
                        "size-[42px] border-2 border-slate-100 overflow-hidden bg-white rounded-full justify-center items-center inline-flex mb-[15px] text-[#ff9900] text-[24px]",
                        iconColor
                    )}>
                    {icon}
                </div>
                <div className="text-black text-sm font-semibold mb-[3px] capitalize">{title}</div>
                <div className="text-[#000b20] text-xl font-semibold">{subtitle}</div>
            </div>
            <div className="text-[#00a656] text-xs font-medium mt-[8px]">Meilleure performance mensuelle</div>
        </div>
    )
}


export const resolveIndicator = (indicator: string): AverageType => {
    if (indicator === "up") return AverageType.POSITIVE
    if (indicator === "down") return AverageType.NEGATIVE
    if (indicator === "neutral") return AverageType.NEUTRAL
    return AverageType.NEUTRAL

}