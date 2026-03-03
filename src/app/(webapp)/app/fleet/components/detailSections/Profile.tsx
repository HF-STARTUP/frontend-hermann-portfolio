import { EmptyData } from "@/components/box/PageNetworkState"
import { cn } from "@/lib/utils"

export interface DetailRowProps {
    label: string
    value: string
    className?: string
}

export function DetailRow({ label, value, className }: DetailRowProps) {
    return (
        <div className={cn("flex items-center justify-between", className)}>
            <span className="text-sm text-vaLightGray">{label}</span>
            <span className="text-sm text-[#000000] font-medium">{value}</span>
        </div>
    )
}

export function DetailRowShimmer() {
    return (
        <div className="flex items-center justify-between">
           <div className="w-24 h-4 bg-vaLightGray/20 rounded-full animate-pulse"></div>
           <div className="w-24 h-4 bg-vaLightGray/20 rounded-full animate-pulse"></div>
        </div>
    )
}

export function DetailRowList({ rows, isLoading }: { rows: DetailRowProps[], isLoading?: boolean }) {

    if (isLoading) {
        return (
            <div className="flex flex-col gap-4 border border-[#E5E7EB] rounded-2xl p-4">
                <div className="mb-2 text-xl font-semibold">Détails du profil</div>
                <DetailRowShimmer />
                <DetailRowShimmer />
                <DetailRowShimmer />
                <DetailRowShimmer />
            </div>
        )
    }

    if (rows.length === 0) {
        return (
            <div className="flex flex-col gap-4 border border-[#E5E7EB] rounded-2xl p-4">
                <div className="mb-2 text-xl font-semibold">Détails du profil</div>
                <EmptyData  message="Aucune donnée trouvée" description="Aucune donnée trouvée" />
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4 border border-[#E5E7EB] rounded-2xl p-4">
            <div className="mb-2 text-xl font-semibold">Détails du profil</div>
            {rows.map((row) => (
                <DetailRow key={row.label} {...row} />
            ))}
        </div>
    )
}