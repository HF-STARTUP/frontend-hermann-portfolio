"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {cn} from "@/lib/utils";
import {ArrowDropDownIcon, CarCrashIcon, MoneyCashIcon, UserFleetIcon} from "@/components/ui/__icons";
import React from "react";
import {CircleArrowLeft, CircleArrowRight} from "lucide-react";
import hour from "@/model/schedule/Hour";


export const Activities = () => {

    return (
        <div className={"px-[13px] py-[15px] bg-white rounded-[20px]"}>

            <div className={"flex justify-between items-center mb-[22px]"}>
                <h4 className="text-black text-2xl font-semibold">Activités</h4>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className={cn(
                                "text-gray-100 text-base font-medium leading-normal outline-none bottom-0 focus:border-0 focus:outline-none group",
                                "flex items-center gap-1",
                                "bg-[#f4f7fe] px-3 py-2 rounded-[7px] text-center text-[#A3AED0] text-lg font-medium font-['DM Sans'] leading-normal"
                            )}>
                                <div>Avril 2024</div>
                                <ArrowDropDownIcon className={"opacity-75 group-hover:scale-[1.3]"}/>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel></DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuRadioGroup value={"1"}>
                                {["Janvier 2024", "Fevrier 2024"].map((p, i) => (
                                    <DropdownMenuRadioItem key={i} value={p}>{p}</DropdownMenuRadioItem>
                                ))}
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className={"flex items-center justify-between"}>
                <button className={"text-[#2554AE]"}>
                    <CircleArrowLeft/>
                </button>
                <div className={"flex gap-[30px] overflow-hidden"}>
                    {Array.from({length: 30}).map((_, i) => (
                        <DateItem
                            key={i}
                            day_str={"Dim"}
                            day_num={i}
                            is_active={i === 5}
                        />
                    ))}
                </div>
                <button className={"text-[#2554AE]"}>
                    <CircleArrowRight/>
                </button>
            </div>

            <div className={"mt-[37px] flex flex-col gap-[16px]"}>
                <UserActivity
                    icon={<MoneyCashIcon/>}
                    title={"Réabonnement - Premium"}
                    subTitle={"Annuel"}
                    fleetUser={"Flotte de Christian"}
                    hour={"11:07"}
                />
                <UserActivity
                    icon={<CarCrashIcon/>}
                    title={"Réabonnement - Premium"}
                    subTitle={"Création de véhicule"}
                    fleetUser={"Flotte de Christian"}
                    hour={"11:07"}
                />
                <UserActivity
                    icon={<UserFleetIcon/>}
                    title={"Réabonnement - Premium"}
                    subTitle={"Création de chauffeurs"}
                    fleetUser={"Flotte de Christian"}
                    hour={"11:07"}
                />
            </div>
        </div>
    )
}


const UserActivity: React.FC<React.HTMLAttributes<HTMLDivElement> & {
    icon: React.ReactNode,
    title: string,
    subTitle: string,
    fleetUser: string,
    hour: string
}> = ({icon, title, subTitle, fleetUser, hour}) => {

    return (
        <div className={"border-b border-b-[#2a2a2a]/5 hover:opacity-85 transition"}>
            <div className={"flex justify-between items-center"}>
                <div className={"flex items-center gap-2"}>
                    <div className="text-black text-base font-semibold">{fleetUser}</div>
                    <div className="text-[#506d82] text-sm font-normal">- {hour}</div>
                </div>
                <button className="text-black text-xs font-normal">Voir plus</button>
            </div>
            <div className={"flex items-center gap-[15px] py-[15px]"}>
                <div
                    className="size-[30px] p-[6.43px] bg-[#f3ebff] text-[#6c00fa] text-[24px] rounded-[42.86px] flex justify-center items-center">
                    {icon}
                </div>
                <div>
                    <div className="text-[#506d82] text-sm font-bold">{title}</div>
                    <div className="text-[#506d82] text-sm font-normal">{subTitle}</div>
                </div>
            </div>
        </div>
    )
}


const DateItem: React.FC<React.HTMLAttributes<HTMLDivElement> & {
    day_str: string,
    day_num: number,
    is_active?: boolean
}> = ({
          day_str,
          day_num,
          is_active
      }) => {

    return (
        <div
            className={cn(
                "w-[46px] h-[59px] px-[7px] py-[11px] bg-[#dbe7ff] rounded-[14px] flex flex-col justify-start items-center gap-px text-center text-[#2554ae] text-sm font-medium font-['DM Sans']",
                is_active && "bg-[#2554ae] text-white"
            )}>
            <div className="">{day_str}</div>
            <div className="">{day_num}</div>
        </div>
    )
}
