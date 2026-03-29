import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { isValidElement, ReactNode } from "react"
import { cloneElement } from 'react';

export type CardVariant = 'green' | 'red' | 'orange' | 'yellow' | 'blue' | 'light-blue' | 'light-green' | 'purple' |'default' ;

export type KpiVariation = 'up' | 'down' | 'stable';

export interface KpiItem {
    icon: ReactNode;
    title: string;
    value?: string | number;
    variation?: KpiVariation;
    variant?: CardVariant,
    className?: string;
    border?: boolean;
    hint?: string;
    unit?: string;
    items?:{label: string, value:string | number, unit?: string}[]
}

export const getCardVariant = (variant?: CardVariant): string => {
    switch(variant){
        case 'green':
            return 'bg-vaGreen/10 text-vaGreen';
        case 'red':
            return 'bg-vaRed/10 text-vaRed';
        case 'orange':
            return 'bg-vaOrange/10 text-vaOrange';
            case 'blue':
                return 'bg-vaMainBlue/10 text-vaMainBlue';
        case 'yellow':
            return 'bg-vaYellow/10 text-vaYellow';
        case 'light-blue':
            return 'bg-vaBlue/10 text-vaBlue';
        case 'light-green':
            return 'bg-vaDarkGreen text-vaLightGreen';
        case 'purple':
                return 'bg-vaDarkPurple text-vaPurple';
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

export const KpiCard = ({icon, title, value, variant, className, border=false, variation, hint, unit, items}: KpiItem) => {
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
                <span className="text-xl font-semibold text-[#000B20]">{value} { unit && <span className="text-sm">{unit}</span>}</span>
            </div>
            {items &&
            <div className="flex flex-col gap-3 w-full">
                {
                    items.map((item, index)=>
                        <div className="flex items-center justify-between w-full text-sm" key={index}>
                            <div className="label text-vaTextPrimary">
                                {item.label}
                            </div>
                            <div className="value text-black font-semibold">
                                {item.value} {item.unit && <span className="text-xs text-vaLightGray">{item.unit}</span> }
                            </div>
                        </div>
                    )
                }
            </div>}
            <div className="">
                {
                    variation && (
                        <div className={cn(
                            "flex items-center gap-1",
                            variation === "up" ? "text-vaGreen": variation === "down" ? "text-vaRed" : "text-vaOrange"
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


const KpiGrid = ({ items, border=false, isLoading }: { items: KpiItem[], border?: boolean, isLoading?: boolean }) => {
    if(isLoading){
        return <KpiShimmerGrid count={4} />
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
            {items.map((item, index) => (
                <KpiCard 
                    key={index} 
                    {...item} 
                    border={border}
                />
            ))}
        </div>
    );
};

export default KpiGrid



