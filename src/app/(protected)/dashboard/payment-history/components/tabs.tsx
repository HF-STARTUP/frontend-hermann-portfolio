"use client"

import React from "react";
import {cn} from "@/lib/utils";
import VLinkProvider from "@/components/helpers/VLinkProvider";
import {useRouter, usePathname, useSearchParams} from "next/navigation";

export enum FilterType {
    neutral = "neutral",
    warning = "warning",
    info = "info",
    success = "success",
    error = "error",
    primary = 'primary',
    broadcastList = 'broadcast-list',
    communicationCampaigns = 'communication-campaigns',
    DiscountCoupons = 'discount-coupons',
    withdrawal = 'withdrawal',
    deposit = 'deposit',
    black = 'black',
}


export const FilterSection: React.FC<React.HTMLAttributes<HTMLDivElement> & {
    activeFilter: FilterType
}> = ({activeFilter, className}) => {


    return (
        <div className={cn(
            `border-b border-black/10 flex items-end justify-start`,
            className
        )}>
            <FilterItem activeFilter={activeFilter} label={"Tous"} variant={FilterType.neutral}/>
            {/*<FilterItem activeFilter={activeFilter} label={"Aujourd’hui (4)"} variant={FilterType.warning}/>*/}
            {/*<FilterItem activeFilter={activeFilter} label={"Hier (4)"} variant={FilterType.success}/>*/}
        </div>
    )
}

export const FilterItem: React.FC<React.HTMLAttributes<HTMLDivElement> & {
    label: string,
    variant: FilterType,
    activeFilter: FilterType | string,
    withBadge?: boolean
}> = ({label, variant, activeFilter, withBadge = true}) => {

    const $route = usePathname()
    const $search = useSearchParams()
    const curHistoryMode = $search.get("history-mode")

    const isActive = variant === activeFilter
    const isNeutral = variant === FilterType.neutral


    let statusBaseClasses;

    switch (variant) {
        case FilterType.error:
            statusBaseClasses = "bg-[#F83B3B]"
            break
        case FilterType.success:
            statusBaseClasses = "bg-[#1CDBA2]"
            break
        case FilterType.warning:
            statusBaseClasses = "bg-[#FAB42D]"
            break
        case FilterType.neutral:
            statusBaseClasses = "bg-black/10"
            break
        case FilterType.info:
            statusBaseClasses = "bg-sky-400"
            break
        case FilterType.primary:
            statusBaseClasses = "bg-yPrimary"
            break
        case FilterType.black:
            statusBaseClasses = "bg-black"
            break
    }

    let navUrl = `${$route}?filter=${variant}`

    if(curHistoryMode) navUrl = navUrl+`&history-mode=${curHistoryMode}`


    return (
        <VLinkProvider to={navUrl} className={cn(
            `flex items-center border-b justify-center py-[10px] px-[16px] gap-[10px] mb-[-1px]`,
            `hover:bg-neutral-100 hover:border-b hover:border-black/20 transition ease-in duration-75 h-full`,
            isActive && "bg-neutral-100 border-b border-black hover:border-black"
        )}>
            <div
                className={cn(
                    "text-center text-neutral-500 text-sm font-medium font-yGrotesk leading-[17.50px]",
                    isActive && "font-bold text-yDark"
                )}>
                {label}
            </div>
            {/*{!isNeutral&&withBadge&&<div className={*/}
            {/*    cn(*/}
            {/*        "w-1.5 h-1.5 relative bg-amber-400 rounded-[20px]",*/}
            {/*        statusBaseClasses*/}
            {/*    )*/}
            {/*}/>}*/}
        </VLinkProvider>
    )
}