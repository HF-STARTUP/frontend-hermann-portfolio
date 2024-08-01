import React from "react";
import {ArrowDownIcon} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {cn, getCurrentMonthYear} from "@/lib/utils";
import {STATE_STATUS} from "@/types/Accounting.types";

export const StatTitle: React.FC<React.HTMLAttributes<HTMLDivElement> & { title: string, value: string }> = ({
                                                                                                                 title,
                                                                                                                 value,
                                                                                                                 className
                                                                                                             }) => {
    return (
        <div className="flex items-center gap-1">
            <div className="text-zinc-800 text-lg font-semibold font-vInter text-nowrap">{title} </div>
            <div className={cn(
                "text-blue-800 text-lg font-semibold font-vInter text-nowrap",
                className
            )}> {value}</div>
        </div>
    )
}

export const AccountStatSubtitleContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {

    return (
        <div className={"flex flex-col gap-[5.1px]"}>
            {children}
        </div>
    )
}

export const StatContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {

    return (
        <div className={"px-5 py-2.5 bg-white rounded-[20px] flex gap-2 justify-between"}>
            {children}
        </div>
    )
}

export const StatSubTitle: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {

    return (
        <div className="text-start text-black text-xs font-normal font-vInter leading-tight">{children}</div>
    )
}


export const StatStatus: React.FC<React.HTMLAttributes<HTMLDivElement> & { variant?: STATE_STATUS }> = ({
                                                                                                            children,
                                                                                                            variant = STATE_STATUS.UNCHANGED
                                                                                                        }) => {

    const isPositive = variant === STATE_STATUS.UP
    const isNeutral = STATE_STATUS.UNCHANGED

    if (isNeutral) {
        return <div></div>
    }

    return (
        <div className={cn(
            "text-center text-xs font-vInter leading-tight px-[5px] py-[3px] bg-rose-100 rounded  gap-2.5 w-fit flex text-red-600 font-bold",
            isPositive && "bg-line-50 text-[#82BE6D]"
        )}>
            <div>
                <ArrowDownIcon className={cn(isPositive && "rotate-180")}/>
            </div>
            <div>{children}</div>
        </div>
    )
}


export function StatMonthSelect({year = 2024, value, onMonthChange}: {
    value?: string,
    year?: number,
    onMonthChange: (m: string) => void
}) {

    const {month} = getCurrentMonthYear()

    const months = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];

    return (
        <Select
            defaultValue={value}
            onValueChange={onMonthChange}
        >
            <SelectTrigger className="w-fit">
                <SelectValue placeholder="Sélectionnez un mois"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Sélectionner le mois</SelectLabel>
                    {months.map((month, index) => (
                        <SelectItem key={index} value={`${index + 1}`}>
                            {month} {year}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

