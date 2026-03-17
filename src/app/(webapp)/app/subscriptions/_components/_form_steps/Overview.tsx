import { formatNumber } from "@/lib/utils"
import { GetFonctionnalityLabel, PackageFormData } from "../../_hooks/usePackageForm"
import Badge from "@/components/display/Badge"
import { Check } from "lucide-react"

export const PackageOverview = ({ data }: { data: PackageFormData }) => {
    return (
        <div className="flex items-center justify-center">
            <div className="rounded-2xl p-4 bg-white shadow-md w-[80%] space-y-6">
                <h2 className="text-2xl font-semibold text-vaMainBlue">{data.name}</h2>
                
                <div className="bg-vaLightGray/20 p-4 rounded-full flex items-center justify-center font-semibold text-sm">
                    <p>1 - {data.maxVehicles} Véhicules</p>
                </div>
                
                <div className="bg-vaLightGray/20 p-4 rounded-full flex items-center justify-center font-semibold text-sm">
                    <p>1 - {data.maxDrivers} Chauffeurs</p>
                </div>

                <div className="flex flex-wrap gap-4">
                    {data.pricings.map((pricing, index) => (
                        <div key={index}>
                            <p className="text-lg font-semibold text-black">
                                {formatNumber(Number(pricing.amount))} 
                                <span className="text-vaTextPrimary text-xs font-normal ml-1">
                                    {pricing.currency}/{pricing.period === "annual" ? "an" : pricing.period === "quarterly" ? "trimestre" : "mois"}
                                </span>
                            </p>
                        </div>
                    ))}
                </div>

                <div className="space-y-4">
                    <p className="text-lg font-semibold text-black border-t pt-1">Fonctionnalités</p>
                    
                    {data.features.map((catGroup, idx) => (
                        <div key={idx} className="space-y-4">
                            <p className="text-sm font-semibold text-vaMainBlue tracking-wider w-full bg-vaMainBlue/5 rounded-xl p-2">
                                {catGroup.category}
                            </p>
                            <ul className="text-vaTextPrimary space-y-4 ml-2">
                                {catGroup.features.map((featureId, fIdx) => (
                                    <li key={fIdx} className="text-sm flex items-center gap-2">
                                        <Badge icon={ <Check /> } variant="green" iconOnly={true} />
                                        {GetFonctionnalityLabel(featureId)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {data.prioritySupport && (
                    <div className="bg-vaLightGray/20 p-4 rounded-full flex items-center justify-center font-semibold text-sm">
                        <p>Support Prioritaire</p>
                    </div>
                )}
            </div>
        </div>
    )
}