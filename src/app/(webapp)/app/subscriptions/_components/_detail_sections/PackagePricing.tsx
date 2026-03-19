import { PageSubTitle } from "@/components/ui/custom/PageTitle"
import { PackagePeriodData } from "../../_hooks/usePackageForm"
import { formatNumber } from "@/lib/utils"
import Badge from "@/components/display/Badge"



export const PackagePricing = () => {

    const MOCK_PACKAGES: PackagePeriodData[] = [
        {
            period: "annual",
            amount: 200000,
            currency: "XOF",
            discount: 10,
            trialDays: 14
        },
        {
            period: "monthly",
            amount: 25000,
            currency: "XOF",
            discount: 2,
            trialDays: 7
        },
        {
            period: "quarterly",
            amount: 60000,
            currency: "XOF",
            discount: 5,
            trialDays: 10
        },
    ]

    return (
        <div className="space-y-6">
            <PageSubTitle subtitle="Tarifaction" />
            <div className="space-y-4">
                {
                    MOCK_PACKAGES.map((p, index) => <PeriodItem pricing={p} key={index} />)
                }
            </div>
            <PageSubTitle subtitle="Limites & Quotas" />
            <div className="grid grid-cols-2 gap-4">
                <SimpleKpiCard label="Véhicules" value="10" />
                <SimpleKpiCard label="Chauffeurs" value="15" />
            </div>
        </div>
    )
}

const PeriodItem = ({ pricing }: { pricing: PackagePeriodData }) => {
    return (<div className="p-4 rounded-xl bg-vaLightGray/10 flex items-center justify-between">
        <div className="flex flex-col gap-2">
            <div className="text-xl font-semibold ">
                {formatNumber(pricing.amount)} <span className="text-sm font-normal text-vaTextPrimary"> {pricing.currency}/{pricing.period == "annual" ? "an" : pricing.period == "monthly" ? "mois" : "trimestre"} </span>
            </div>
            <div className="flex items-center gap-2 text-vaMainBlue">
                {
                    pricing.trialDays && <span> {pricing.trialDays} jours d'essai gratuit </span>
                }
                {
                    pricing.discount && <span>| -{pricing.discount} % de remise</span>
                }
            </div>
        </div>
        <Badge variant="light-blue">
            {pricing.period == "annual" ? "Annuel" : pricing.period == "monthly" ? "Mensuel" : "Trimestriel"}
        </Badge>
    </div>)
}

export interface SimpleKpiProps{
    label: string;
    value: string | number
}

export const SimpleKpiCard = ({label, value}:SimpleKpiProps)=>{
    return (
        <div className="bg-vaLightGray/10 p-4 rounded-xl flex flex-col items-center justify-center gap-2">
            <p className="text-3xl font-semibold">
                { value }
            </p>
            <p className="text-base">
                { label }
            </p>
        </div>
    )
}