import React from "react";
import {cn} from "@/lib/utils";
import {ArrowUpIcon} from "lucide-react";

export enum AverageType {
    POSITIVE = "POSITIVE",
    NEGATIVE = "NEGATIVIE"
}

type ActionCardProps = {
    icon: {
        value: React.ReactNode,
        color: string
    },
    cardValue: {
        label: string,
        value: string
    },
    average: {
        type: AverageType,
        label?: string
    }
}


export const ActionCard: React.FC<React.HTMLAttributes<HTMLDivElement> & ActionCardProps> = ({
                                                                                                 icon,
                                                                                                 cardValue,
                                                                                                 average,
                                                                                                 className,
                                                                                                 ...props
                                                                                             }) => {
    return (
        <div className={cn(
            className,
            "bg-white p-[17px] rounded-lg w-full border border-transparent hover:border-[#2a2a2a]/10 transition"
        )} {...props}>
            <div className={cn(
                icon.color,
                "size-[42px] rounded-full flex items-center justify-center mb-[15px]"
            )}>
                {icon.value}
            </div>
            <div>
                <div className="text-black text-sm font-semibold mb-[3px]">{cardValue.label}</div>
                <div className="text-[#000b20] text-2xl font-semibold">{cardValue.value}</div>
            </div>
            <div className={cn(
                "flex items-center gap-[6px] text-[#00a656]",
                average.type === AverageType.NEGATIVE && "text-[#e51d13]"
            )}>
                <div className={cn(
                    average.type === AverageType.NEGATIVE && "rotate-180"
                )}>
                    <ArrowUpIcon/>
                </div>
                <div className="text-xs font-medium">{average.label}</div>
            </div>
        </div>
    )
}