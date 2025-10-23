"use client";

import * as React from "react";
import {DropDownSelect} from "@/app/(protected)/dashboard/_components/_utils/DashboardSection.utils";
import {cn} from "@/lib/utils";
import {ChevronLeftIcon} from "lucide-react";
import PieStat from "@/lib/react-chart-2/pieDiagram";
import StackBarChart from "@/lib/react-chart-2/stackBarDiagram";
import VLinkProvider from "@/components/helpers/VLinkProvider";

export const DiagramCard: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {

    return (
        <div className={"bg-white rounded-[20px] p-[21px]"}>
            {children}
        </div>
    )
}


export const DiagramCardHead: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {

    return (
        <div className={"flex justify-between items-center"}>
            {children}
        </div>
    )
}


export const DiagramCardHeadTitle: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {
    return (
        <div className="w-[260px] text-zinc-800 text-lg font-semibold font-vInter">{children}</div>
    )
}


export const PeriodSelect: React.FC<React.HTMLAttributes<HTMLDivElement> & { values: string[] }> = ({values}) => {

    const period = values

    return (
        <DropDownSelect
            label={"mmm"}
            items={period.map((v, i) => ({id: i, value: v}))}
            activeItem={{id: 0, value: period[0]}}
            variant={"text"} handlerSelect={() => {
        }}
            className={"bg-violet-50 rounded-[7px] "}
        />
    )
}

export const DiagramLegend: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children, className}) => {
    return (
        <div className={"flex items-center gap-[8px]"}>
            <div className={cn(
                "w-[7.60px] h-[7.60px] relative bg-blue-700",
                className
            )}/>
            <div className="text-zinc-400 text-sm font-medium font-vInter leading-none">{children}</div>
        </div>
    )
}

export const DiagramLegends: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children, className}) => {
    return (
        <div className={cn(
            "flex items-center gap-[21.33px]",
            className
        )}>
            {children}
        </div>
    )
}

export const DiagramMoreButton: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children, className}) => {

    return (
        <VLinkProvider to={"/dashboard/status-accounts"}>
            <div className={cn(
                "flex items-center gap-[5.1px] hover:opacity-85 transition cursor-pointer font-medium",
                className
            )}>
                <div className="text-sm font-normal font-vInter leading-[33.38px] text-[#506D82]">{children}</div>
                <div className={"bg-[#506D82] size-[15.2px]  rounded-full flex items-center justify-center text-white"}>
                    <ChevronLeftIcon className={"rotate-180"}/>
                </div>
            </div>
        </VLinkProvider>
    )
}

export const DiagramCardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {

    return (<div className={"flex items-center justify-center py-4 h-full"}>
        {children}
    </div>)
}

export const DiagramCardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children, className}) => {
    return (
        <div className={cn(
            "flex items-center justify-between py-[10px]",
            className
        )}>
            {children}
        </div>
    )
}


export const OrdersStat = () => {

    const _datas = [
        {name: 'Autres', value: 40},
        {name: 'VTC', value: 50},
        {name: 'Courses', value: 20},
    ];

    const COLORS = ['#e6ae00', '#0643ba', '#00a4e2'];
    const FIL_COLORS = ['#FFC700', '#205DD3', '#01BEFB'];

    return (
        <div className={"w-[315px]"}>
            <PieStat
                label={"Commandes"}
                unit={"Commandes"}
                dataItems={_datas}
                backgroundColors={FIL_COLORS}
                borderColors={COLORS}
            />
        </div>
    )
}

export const BandeStat = () => {

    return (
        <StackBarChart/>
    )
}

export const StatCardStack: React.FC<React.HTMLAttributes<HTMLDivElement> & { head: React.ReactNode }> = ({
                                                                                                              children,
                                                                                                              head,
                                                                                                              className
                                                                                                          }) => {
    return (
        <div className={"grid grid-cols-12 gap-[16px]"}>
            <div className={"col-span-12"}>
                {head}
            </div>
            <div className={"col-span-12"}>
                {children}
            </div>
        </div>
    )
}


export const DiagramTitle: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {

    return (
        <div className={"h-8 px-3 py-1 bg-violet-50 rounded-[7px]"}>
            <div className={"text-center text-slate-400 text-sm font-medium leading-normal"}>{children}</div>
        </div>
    )
}

