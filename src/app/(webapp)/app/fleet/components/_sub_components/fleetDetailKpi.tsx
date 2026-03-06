import { cn } from "@/lib/utils";

export type KpiVariant = 'green' | 'red' | 'orange' | 'yellow' | 'blue' | 'light-blue' | 'light-green' | 'default'

export const getKpiVariantColor = (variant?: KpiVariant): string =>{
    switch (variant) {
        case 'green':
            return 'bg-vaGreen/5 text-vaGreen border border-vaGreen';
        case 'red':
            return 'bg-vaRed/5 text-vaRed border border-vaRed';
        case 'orange':
            return 'bg-vaOrange/5 text-vaOrange border border-vaOrange';
        case 'yellow':
            return 'bg-vaYellow/5 text-vaYellow border border-vaYellow';
        case 'blue':
            return 'bg-vaMainBlue/5 text-vaMainBlue border border-vaMainBlue';
        case 'light-blue':
            return 'bg-vaBlue/5 text-vaBlue border border-vaBlue';
        case 'light-green':
            return 'bg-vaGreen/5 text-vaGreen border border-vaGreen';
        case 'default':
            return 'bg-vaLightGray/5 text-vaLightGray border border-vaLightGray';
        default:
            return 'bg-vaLightGray/5 text-vaLightGray border border-vaLightGray';
    
    }
}

export interface FleetKpiCardProps {
    title: string;
    value: string;
    variation?: 'up' | 'down' | 'stable';
    variant?: KpiVariant;
    hint?: string;
    unit?: string;
}
export function FleetKpiCard({ title, value, variation, variant, hint, unit }: FleetKpiCardProps) {
    return (
        <div className={cn("flex flex-col gap-2 p-4 rounded-2xl w-full", getKpiVariantColor(variant))}>
            <span className="text-sm text-vaLightGray line-clamp-1 truncate font-semibold" title={title}>{title}</span>
            <span className="text-lg font-semibold text-[#000B20]">{value} {unit && <span className="text-xs text-vaLightGray">{unit}</span>}</span>
            {hint && <span className={cn("text-xs line-clamp-1 truncate font-semibold")} title={hint}>{hint}</span>}
        </div>
    )
}

export default function FleetKpiGrid({ kpiItems, className }: { kpiItems: FleetKpiCardProps[], className?: string }) {
    return (
        <div className={`grid grid-cols-3 gap-4 w-full ${className}`}>
            {kpiItems.map((kpi) => (
                <FleetKpiCard key={kpi.title} {...kpi} />
            ))}
        </div>
    )
}