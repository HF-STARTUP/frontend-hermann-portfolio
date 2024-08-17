"use client"

import {ActionCard, AverageType} from "@/app/(webapp)/app/dashboard/_components/head/_components/actionCard";
import {
    ArrowDoubleIcon,
    ArrowDropDownIcon,
    CarCrashIcon,
    CashAltIcon,
    DashboardIcon,
    UserIcon
} from "@/components/ui/__icons";
import React from "react";
import {cn} from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {useGetBestAndLestOnCity, useGetParkStats} from "@/hooks/admin/useFleetHook";
import Loading from "@/components/ui/Loader";
import {resolveIndicator} from "@/app/(webapp)/app/fleet/[fleetID]/dashboard/stat_cards/statCards";
import {StProfitable} from "@/types/admin/fleet";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

export const HeadSection = () => {

    const [activeProfilable, setActiveProfilable] = React.useState<StProfitable>()

    const {data, isLoading} = useGetParkStats()
    const {data: profilable, isLoading: loadingProfilable} = useGetBestAndLestOnCity()

    React.useEffect(() => {
        if (!loadingProfilable && profilable) {
            setActiveProfilable(profilable.most_profitable)
        }
    }, [profilable, loadingProfilable])

    if (isLoading) {
        return (
            <Loading
                className={"h-[110px]"}
            />
        )
    }


    if (data) {
        return (
            <div className={"grid grid-cols-12 gap-[24px]"}>
                <div className={"col-span-12 2xl:col-span-8"}>
                    <div className={"flex items-center gap-[24px]"}>

                        <ActionCard
                            icon={{
                                color: "bg-[#ffe7e7] text-[#E51D13]",
                                value: <DashboardIcon/>
                            }}
                            average={{
                                type: resolveIndicator(data.flotte.indicateur),
                                label: `${data.flotte.indicateur_value} ce mois`
                            }}
                            cardValue={{
                                label: "Total flottes",
                                value: `${data.flotte.total}`
                            }}
                        />

                        <ActionCard
                            icon={{
                                color: "text-[#2554AE] bg-[#E5E4FF]",
                                value: <CarCrashIcon/>
                            }}
                            average={{
                                type: resolveIndicator(data.vehicle.indicateur),
                                label: `${data.vehicle.indicateur_value} ce mois`
                            }}
                            cardValue={{
                                label: "Total véhicules",
                                value: `${data.vehicle.total}`
                            }}
                        />

                        <ActionCard
                            icon={{
                                color: "bg-[#d7ffec] text-[#00a656]",
                                value: <UserIcon/>
                            }}
                            average={{
                                type: resolveIndicator(data.driver.indicateur),
                                label: `${data.driver.indicateur_value} ce mois`
                            }}
                            cardValue={{
                                label: "Total chauffeurs",
                                value: `${data.driver.total}`
                            }}
                        />

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
                                value: `${data.ca_total.total}XAF`
                            }}
                        />

                        {/*<ActionCard*/}
                        {/*    icon={{*/}
                        {/*        color: "bg-[#ffe7e7] text-[#E51D13]",*/}
                        {/*        value: <ArrowDoubleIcon/>*/}
                        {/*    }}*/}
                        {/*    average={{*/}
                        {/*        type: AverageType.POSITIVE,*/}
                        {/*        label: "+450.000 ce mois"*/}
                        {/*    }}*/}
                        {/*    cardValue={{*/}
                        {/*        label: "Total flux financier",*/}
                        {/*        value: "1,540,000XAF"*/}
                        {/*    }}*/}
                        {/*/>*/}

                    </div>
                </div>
                <div className={"col-span-12 2xl:col-span-4"}>
                    <div className={"grid grid-cols-12"}>
                        <div className={"col-span-12"}>
                            {activeProfilable && <div className={"h-full bg-white rounded-3xl p-[20px]"}>

                                <div className={"flex items-center justify-between mb-[45px]"}>
                                    <div className="text-black text-xl font-semibold">{activeProfilable.name}</div>
                                    <Select defaultValue={"best"} onValueChange={v => {
                                        if (!profilable) return
                                        if (v === "best") {
                                            setActiveProfilable(profilable.most_profitable)
                                        } else setActiveProfilable(profilable.least_profitable)
                                    }}>
                                        <SelectTrigger className="w-fit">
                                            <SelectValue placeholder="Type de flotte"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="best">Flotte la plus rentable</SelectItem>
                                                <SelectItem value="least">Flotte la moins rentable</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className={"flex justify-between items-center"}>
                                    <div className={"flex items-center justify-center gap-[10px]"}>
                                        <div className={cn(
                                            "",
                                            "size-[42px] rounded-full flex items-center justify-center text-[#2554AE] bg-[#CADCFF]"
                                        )}>
                                            <DashboardIcon/>
                                        </div>
                                        <div>
                                            <div
                                                className="text-[#000b20] text-2xl font-semibold">{activeProfilable.total_vehicle}</div>
                                            <div className="text-[#7f878c] text-sm font-semibold">Nombre de véhicules
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"flex items-center justify-center gap-[10px]"}>
                                        <div className={cn(
                                            "",
                                            "size-[42px] rounded-full flex items-center justify-center text-[#FFB800] bg-[#FFE4AE]"
                                        )}>
                                            <ArrowDoubleIcon/>
                                        </div>
                                        <div>
                                            <div
                                                className="text-[#000b20] text-2xl font-semibold">{activeProfilable.flux} XAF
                                            </div>
                                            <div className="text-[#7f878c] text-sm font-semibold">Flux financier</div>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}