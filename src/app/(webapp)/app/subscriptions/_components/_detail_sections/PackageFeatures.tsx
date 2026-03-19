import { PageSubTitle } from "@/components/ui/custom/PageTitle";
import { GetFonctionnalityLabel } from "../../_hooks/usePackageForm";
import Badge from "@/components/display/Badge";
import { Check } from "lucide-react";

export const PackageFeatures = () => {
    const MOCK_FEATURES = [
        { id: "vtcc_driver", category: "Suivi des opérations" },
        { id: "dashboard", category: "Pilotage & Reporting" },
        { id: "performance", category: "Pilotage & Reporting" },
        { id: "reports", category: "Pilotage & Reporting" },
        { id: "alerts", category: "Pilotage & Reporting" },
        { id: "vehicle_gps", category: "Connectivité & Intégrations" },
        { id: "yango_api", category: "Connectivité & Intégrations" },
        { id: "driver_gps", category: "Connectivité & Intégrations" },
    ];
    const groupedFeatures: {category: string, features:string[]}[] = Object.values(
        MOCK_FEATURES.reduce((acc: Record<string, {category: string, features:string[]}>, current) => {
            if (!acc[current.category]) {
                acc[current.category] = {
                    category: current.category,
                    features: []
                };
            }
            acc[current.category].features.push(current.id);
            return acc;
        }, {})
    );
    return (
        <div className="space-y-4">
            <PageSubTitle subtitle={`Fonctionnalités incluses (${MOCK_FEATURES.length}) `} />
            {groupedFeatures.map((feature) => (
                <FeaturesByGroup category={feature.category} features={feature.features} />
            ))}
        </div>
    );
};

const FeaturesByGroup = ({category, features}:{category: string, features:string[]})=>{
    return (
        <div className="p-4 bg-vaLightGray/10 rounded-xl space-y-4">
           <PageSubTitle subtitle={category} />
           <div className={`grid ${features.length > 2 ? "grid-cols-2" : "grid-cols-1"} gap-4`}>
               {features.map((featureId) => (
                <div className="flex items-center gap-2">
                    <Badge icon={ <Check /> } variant="light-blue" iconOnly={true} />
                       <p key={featureId} className="text-sm text-vaTextPrimary font-medium">
                       {GetFonctionnalityLabel(featureId)}
                   </p>
                </div>                
               ))}
           </div>
        </div>
    )
}