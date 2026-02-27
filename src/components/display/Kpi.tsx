import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { isValidElement, ReactNode } from "react"
import { cloneElement } from 'react';

export type CardVariant = 'green' | 'red' | 'orange' | 'yellow' | 'blue' | 'light-blue' | 'light-green' | 'default';

export interface KpiItem {
    icon: ReactNode;
    title: string;
    value: string | number;
    variation?: 'up' | 'down' | 'stable';
    variant?: CardVariant,
    className?: string;
    border?: boolean;
    hint?: string;
}

export const getCardVariant = (variant?: CardVariant): string => {
    switch(variant){
        case 'green':
            return 'bg-[#00A7571A] text-[#00A757]';
        case 'red':
            return 'bg-[#E51D131A] text-[#E51D13]';
        case 'orange':
            return 'bg-[#FFBD4C1A] text-[#FFBD4C]';
            case 'blue':
                return 'bg-[#018BFB1A] text-[#018BFB]';
        case 'yellow':
            return 'bg-[#FFC7001A] text-[#FFC700]';
        case 'light-blue':
            return 'bg-[#EEF5FF1A] text-[#37A3FF]';
        case 'light-green':
            return 'bg-[#E6F5EB1A] text-[#02B66A]';
        case 'default':
            return 'bg-[#F9FAFB] text-[#111827]';
        default:
            return 'bg-[#F9FAFB] text-[#111827]';
    }
}

export const KpiShimmerGrid = ({ count = 4 }: { count?: number }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
            {Array.from({ length: count }).map((_, index) => (
                <div 
                    key={index} 
                    className="px-6 py-4 bg-white rounded-2xl border border-gray-100 flex flex-col gap-3 animate-pulse"
                >
                    {/* Icône Cercle */}
                    <div className="size-10 bg-gray-200 rounded-full" />
                    
                    {/* Textes (Title & Value) */}
                    <div className="flex flex-col gap-2">
                        <div className="h-4 w-24 bg-gray-200 rounded" />
                        <div className="h-7 w-16 bg-gray-200 rounded" />
                    </div>
                    
                    {/* Hint / Variation */}
                    <div className="h-5 w-32 bg-gray-100 rounded mt-1" />
                </div>
            ))}
        </div>
    );
};

export const KpiCard = ({icon, title, value, variant, className, border=false, variation, hint}: KpiItem) => {
    const renderedIcon = isValidElement(icon) 
    ? cloneElement(icon as React.ReactElement, {
        className: cn("shrink-0 size-5", icon.props.className)
      })
    : icon;

    return (
        <div className={cn(
            "px-6 py-4 bg-white rounded-2xl flex flex-col gap-3",
            border ? "border border-gray-100" : "border-none",
            className
        )}>
            <div className={cn(
                getCardVariant(variant), 
                "size-10 flex items-center justify-center rounded-full"
            )}>
                {renderedIcon}
            </div>
            <div className="flex flex-col gap-1">
                <span className="text-sm text-[#000000] font-semibold">{title}</span>
                <span className="text-xl font-semibold text-[#000B20]">{value}</span>
            </div>
            <div className="">
                {
                    variation && (
                        <div className={cn(
                            "flex items-center gap-1",
                            variation === "up" ? "text-[#00A757]": variation === "down" ? "text-[#E51D13]" : "text-[#FF9900]"
                        )}>
                            {variation === "up" ? <ArrowUp className="size-6" /> : variation === "down" ? <ArrowDown className="size-6" /> : <Minus className="size-6" />}                         
                            { hint && <span className="text-xs">{hint}</span>}
                        </div>
                    )
                }
            </div>
        </div>
    );
};


const KpiGrid = ({ items }: { items: KpiItem[] }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
            {items.map((item, index) => (
                <KpiCard 
                    key={index} 
                    {...item} 
                />
            ))}
        </div>
    );
};

export default KpiGrid



