"use client";

import { PageSubTitle } from "@/components/ui/custom/PageTitle"
import Badge from "@/components/display/Badge"
import { TariffByPeriodModel } from "@/model/subscription/AllSubscriptionsModel"
import { useGetSubscription } from "@/hooks/subscription/useSubscription"
import { useGetActiveCurrency } from "@/hooks/__globlal/useGlobalHook"
import { EmptyData } from "@/components/box/PageNetworkState";
import { formatNumber } from "@/lib/utils";

export const PackagePricing = ({ packageId }: { packageId?: string }) => {
    const { data, isLoading } = useGetSubscription(packageId)
    const pricings = data?.periodPricing

    if (isLoading) return <PricingSkeleton />

    
    if (!pricings || pricings.length === 0) {
        return (
            <div className="space-y-6">
                <PageSubTitle subtitle="Tarifaction" />
                <EmptyData message="Aucun tarif configuré pour ce pack." />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <PageSubTitle subtitle="Tarifaction" />
            <div className="space-y-4">
                {
                    pricings.map((p, index) => <PeriodItem pricing={p} key={index} />)
                }
            </div>

            <PageSubTitle subtitle="Limites & Quotas" />
            <div className="grid grid-cols-2 gap-4">
                <SimpleKpiCard label="Véhicules" value={data?.package?.vehicleNumber ?? 0} />
                <SimpleKpiCard label="Chauffeurs" value={data?.package?.driverNumber ?? 0} />
            </div>
        </div>
    )
}

const PeriodItem = ({ pricing }: { pricing: TariffByPeriodModel }) => {
    const { currency } = useGetActiveCurrency()

    return (
        <div className="p-4 rounded-xl bg-vaLightGray/10 flex items-center justify-between border border-transparent">
            <div className="flex flex-col gap-2">
                <div className="text-xl font-semibold ">
                    { pricing?.crossedOutAmount > 0 && <s className="text-sm text-vaRed">{formatNumber(pricing.crossedOutAmount)}</s> } {pricing.amount} <span className="text-sm font-normal text-vaTextPrimary"> {currency}/{pricing.period == "yearly" ? "an" : pricing.period == "monthly" ? "mois" : "trimestre"} </span>
                </div>
                <div className="flex items-center gap-2 text-vaMainBlue text-sm font-medium">
                    {
                        pricing.annualDiscountPercent > 0 && (
                            <span> 
                                -{pricing.annualDiscountPercent}% de remise 
                            </span>
                        )
                    }
                </div>
            </div>
            <Badge variant="light-blue">
                {pricing.period == "yearly" ? "Annuel" : pricing.period == "monthly" ? "Mensuel" : "Trimestriel"}
            </Badge>
        </div>
    )
}

export const SimpleKpiCard = ({ label, value }: { label: string; value: string | number }) => {
    return (
        <div className="bg-vaLightGray/10 p-4 rounded-xl flex flex-col items-center justify-center gap-2 border border-transparent">
            <p className="text-3xl font-semibold">
                {value}
            </p>
            <p className="text-sm text-vaTextPrimary font-medium">
                {label}
            </p>
        </div>
    )
}



const PricingSkeleton = () => {
    return (
        <div className="space-y-6 animate-pulse">
            <div className="h-6 w-32 bg-slate-200 rounded-md" />
            <div className="space-y-4">
                {[1, 2].map((i) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-100 h-20 flex items-center justify-between">
                        <div className="space-y-2">
                            <div className="h-5 w-40 bg-slate-200 rounded" />
                            <div className="h-4 w-24 bg-slate-200 rounded" />
                        </div>
                        <div className="h-8 w-20 bg-slate-200 rounded-full" />
                    </div>
                ))}
            </div>
            <div className="h-6 w-40 bg-slate-200 rounded-md mt-8" />
            <div className="grid grid-cols-2 gap-4">
                <div className="h-24 bg-slate-100 rounded-xl" />
                <div className="h-24 bg-slate-100 rounded-xl" />
            </div>
        </div>
    )
}