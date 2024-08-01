"use client"

import React from "react";
import {ArrowSortIcon} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";
import {DisplayPropsUtils} from "@/types/dataDisplayTable";
import useAppStore from "@/stores/global/useAppStore";
import {ScrollArea} from "@/components/ui/scroll-area";
import {CrownIcon} from "@/components/ui/__icons";
import {cn} from "@/lib/utils";
import {useRouter} from "next/navigation";


export const TableContainer: React.FC<{ children: React.ReactNode }> = ({children}) => {

    const {getIfSidebarIsMinimised} = useAppStore()

    //const getIfSidebarIsMinimised = false

    return (
        // <ScrollArea
        //     className={`bg-white rounded-[20px]  transition ease-in duration-200 relative ${getIfSidebarIsMinimised() ? 'w-[95vw]' : 'w-[81vw]'}`}>
        <ScrollArea className={"overflow-x-auto"}>
            <table className={`min-w-max`}>
                {children}
            </table>
        </ScrollArea>
        // </ScrollArea>
    )
}

export const TableHead: React.FC<{ children: React.ReactNode } & DisplayPropsUtils> = ({children, variant}) => {
    return (
        <thead
            className="py-[17px] text-admin-primary  text-xl font-bold font-['DM Sans'] leading-[25px] text-center bg-[#000b20] rounded-[20px] h-[56px]">
        {children}
        </thead>
    )
}

export const ThOption: React.FC<{ name: string }> = ({name}) => {

    const isAbon = name === "ESSENTIEL" || name === "PREMIUM"
    const isEssential = name === "ESSENTIEL"
    const isPremium = name === "PREMIUM"

    const isActive = name === "Active"
    const isInactive = name === "Désactivé"

    return (
        <th>
            <div
                className={cn(
                    "text-[#506D82] text-base font-normal font-['DM Sans'] leading-7 h-12 flex items-center justify-center",
                )}>
                <div className={cn(
                    isEssential && "text-[#e51d13] bg-[#FFEBEA] flex items-center justify-center gap-[8.8px] h-[22px] px-[15px] py-[0.88px] rounded-sm",
                    isPremium && "text-[#E89900] bg-[#FFF8DE] flex items-center justify-center gap-[8.8px] h-[22px] px-[15px] py-[0.88px] rounded-sm",
                    isActive && "text-[#83BF6E] bg-[#EAFAE5] flex items-center justify-center gap-[8.8px] h-[22px] px-[15px] py-[0.88px] rounded-sm",
                    isInactive && "text-[#FF0000] bg-[#FAE5E5] flex items-center justify-center gap-[8.8px] h-[22px] px-[15px] py-[0.88px] rounded-sm",
                )}>
                    {isAbon && <CrownIcon/>}
                    <div>{name}</div>
                </div>
            </div>
        </th>
    )
}

export const TrBody: React.FC<{ children: React.ReactNode, callback?: () => void }> = ({
                                                                                           children,
                                                                                           callback,
                                                                                           ...props
                                                                                       }) => {


    return (
        <tr
            className={cn(
                `hover:bg-slate-100 cursor-default transition duration-200 ease-in border rounded-3xl`,
                callback !== undefined && callback !== null && "cursor-pointer"
            )}
            {...props}
            onClick={() => {
                callback && callback()
            }}
        >
            {children}
        </tr>
    )
}

export const TrHead: React.FC<{ children: React.ReactNode }> = ({children}) => {
    return (
        <tr>
            {children}
        </tr>
    )
}

export const TFoot: React.FC<{ children: React.ReactNode }> = ({children}) => {
    return (
        <tfoot>
        {children}
        </tfoot>
    )
}

export const TBody: React.FC<{ children: React.ReactNode }> = ({children}) => {
    return (
        <tbody>
        {children}
        </tbody>
    )
}

export const TrFoot: React.FC<{ children: React.ReactNode } & DisplayPropsUtils> = ({children, variant}) => {

    const isV2 = variant === 'v2'

    return (
        <tr className={`h-[45px] rounded-xl ${isV2 ? 'bg-white text-black' : 'bg-[#405768]'}`}>
            {children}
        </tr>
    )
}

export const TFootOption: React.FC<{ name: string } & DisplayPropsUtils> = ({name, variant}) => {

    const isV2 = variant === 'v2'


    return (
        <th className={``}>
            <div
                className={`${isV2 ? 'text-black' : 'text-white'} text-center text-xl font-bold leading-[25px] py-[10px]`}>{name}</div>
        </th>
    )
}

export const ThHeadOption: React.FC<{ name: string } & DisplayPropsUtils> = ({name, variant}) => {

    const isV2 = variant === 'v2'

    return (
        <th>
            <div
                className={`flex gap-[10px] items-center justify-center cursor-pointer hover:opacity-80 transition duration-200 px-[40px] text-center text-white text-xs font-semibold`}>
                {<div>
                    <ArrowSortIcon/>
                </div>}
                <div className="">{name}</div>
            </div>
        </th>
    )
}
