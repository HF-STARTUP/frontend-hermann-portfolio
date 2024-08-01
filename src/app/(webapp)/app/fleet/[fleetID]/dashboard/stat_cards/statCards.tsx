"use client"

import {ActionCard, AverageType} from "@/app/(webapp)/app/dashboard/_components/head/_components/actionCard";
import {
    ArrowDoubleIcon, CarAltIcon,
    CarCrashIcon,
    CashAltIcon,
    DashboardIcon, ToolIcon,
    UserIcon
} from "@/components/ui/__icons";
import {cn} from "@/lib/utils";
import * as React from "react";

export const StatCards = () => {

    return (
        <div className={"grid grid-cols-12 gap-[24px]"}>
            <div className={"col-span-8"}>
                <div className={"flex items-center gap-[24px]"}>

                    <ActionCard
                        icon={{
                            color: "bg-[#E5E4FF] text-[#2554AE]",
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
                            value: <ToolIcon/>
                        }}
                        average={{
                            type: AverageType.POSITIVE,
                            label: "+12 ce mois"
                        }}
                        cardValue={{
                            label: "Total entretiens",
                            value: "54"
                        }}
                    />

                    <ActionCard
                        icon={{
                            color: "bg-[#fff1e4] text-[#ff9900]",
                            value: <CarAltIcon/>
                        }}
                        average={{
                            type: AverageType.POSITIVE,
                            label: "+17 ce mois"
                        }}
                        cardValue={{
                            label: "Total courses",
                            value: "77"
                        }}
                    />

                </div>
            </div>
            <div className={"col-span-4"}>
                <div className={"grid grid-cols-12 gap-[24px] h-full"}>
                    <div className={"col-span-6 h-full"}>
                        <StatCardLarge
                            title={"Toyota RAV4 - CE 920 BF"}
                            subtitle={"175.000XAF"}
                            icon={<CarCrashIcon/>}
                        />
                    </div>
                    <div className={"col-span-6 h-full"}>
                        <StatCardLarge
                            title={"Ebenezer Kepombia"}
                            subtitle={"178.540XAF"}
                            icon={<UserIcon/>}
                            className={"border-[#2554ae] bg-[#eff1ff]"}
                            iconColor={"text-[#2554AE]"}
                        />
                    </div>
                </div>
            </div>
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
                        "size-[42px] p-[9px] bg-white rounded-[60px] justify-center items-center inline-flex mb-[15px] text-[#ff9900] text-[24px]",
                        iconColor
                    )}>
                    {icon}
                </div>
                <div className="text-black text-sm font-semibold mb-[3px]">{title}</div>
                <div className="text-[#000b20] text-xl font-semibold">{subtitle}</div>
            </div>
            <div className="text-[#00a656] text-xs font-medium mt-[8px]">Meilleure performance mensuelle</div>
        </div>
    )
}