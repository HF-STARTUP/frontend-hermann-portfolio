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

export const HeadSection = () => {


    return (
        <div className={"grid grid-cols-12 gap-[24px]"}>
            <div className={"col-span-8"}>
                <div className={"flex items-center gap-[24px]"}>

                    <ActionCard
                        icon={{
                            color: "bg-[#ffe7e7] text-[#E51D13]",
                            value: <DashboardIcon/>
                        }}
                        average={{
                            type: AverageType.POSITIVE,
                            label: "+12 ce mois"
                        }}
                        cardValue={{
                            label: "Total flottes",
                            value: "54"
                        }}
                    />

                    <ActionCard
                        icon={{
                            color: "bg-[#2554AE] text-[#E5E4FF]",
                            value: <CarCrashIcon/>
                        }}
                        average={{
                            type: AverageType.NEGATIVE,
                            label: "-3 ce mois"
                        }}
                        cardValue={{
                            label: "Total véhicules",
                            value: "54"
                        }}
                    />

                    <ActionCard
                        icon={{
                            color: "bg-[#d7ffec] text-[#00a656]",
                            value: <UserIcon/>
                        }}
                        average={{
                            type: AverageType.POSITIVE,
                            label: "+12 ce mois"
                        }}
                        cardValue={{
                            label: "Total chauffeurs",
                            value: "54"
                        }}
                    />

                    <ActionCard
                        icon={{
                            color: "bg-[#ffe7e7] text-[#E51D13]",
                            value: <CashAltIcon/>
                        }}
                        average={{
                            type: AverageType.POSITIVE,
                            label: "+12 ce mois"
                        }}
                        cardValue={{
                            label: "Chiffre d’affaires",
                            value: "540,000XAF"
                        }}
                    />

                    <ActionCard
                        icon={{
                            color: "bg-[#ffe7e7] text-[#E51D13]",
                            value: <ArrowDoubleIcon/>
                        }}
                        average={{
                            type: AverageType.POSITIVE,
                            label: "+450.000 ce mois"
                        }}
                        cardValue={{
                            label: "Total flux financier",
                            value: "1,540,000XAF"
                        }}
                    />

                </div>
            </div>
            <div className={"col-span-4"}>
                <div className={"grid grid-cols-12"}>
                    <div className={"col-span-12"}>
                        <div className={"h-full bg-white rounded-3xl p-[20px]"}>

                            <div className={"flex items-center justify-between mb-[45px]"}>
                                <div className="text-black text-xl font-semibold">Flotte de Christian</div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className={cn(
                                            "text-gray-100 text-base font-medium leading-normal outline-none bottom-0 focus:border-0 focus:outline-none group",
                                            "flex items-center gap-1",
                                            "bg-[#f4f7fe] px-3 py-2 rounded-[7px] text-center text-[#A3AED0] text-lg font-medium font-['DM Sans'] leading-normal"
                                        )}>
                                            <div>Flotte la plus rentable</div>
                                            <ArrowDropDownIcon className={"opacity-75 group-hover:scale-[1.3]"}/>
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56">
                                        <DropdownMenuLabel></DropdownMenuLabel>
                                        <DropdownMenuSeparator/>
                                        <DropdownMenuRadioGroup value={"1"}>
                                            {["Flotte la plus rentable", "La moins rentable"].map((p, i) => (
                                                <DropdownMenuRadioItem key={i} value={p}>{p}</DropdownMenuRadioItem>
                                            ))}
                                        </DropdownMenuRadioGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
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
                                        <div className="text-[#000b20] text-2xl font-semibold">73</div>
                                        <div className="text-[#7f878c] text-sm font-semibold">Nombre de véhicules</div>
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
                                        <div className="text-[#000b20] text-2xl font-semibold">750,500 XAF</div>
                                        <div className="text-[#7f878c] text-sm font-semibold">Flux financier</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}