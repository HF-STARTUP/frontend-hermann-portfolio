import { Checkbox } from "@/components/ui/checkbox";
import { PageSubTitle } from "@/components/ui/custom/PageTitle";
import { PackageFormData } from "../../_hooks/usePackageForm";

interface Step3Props {
  data: PackageFormData;
  onChange: (features: { category: string; features: string[] }[]) => void;
}

export const PackageStep3 = ({ data, onChange }: Step3Props) => {
  // Liste statique des fonctionnalités par catégorie
  const featuresList = [
    { id: "vtcc_driver", label: "Application chauffeur VTCC Driver", category: "Suivi des opérations" },
    { id: "dashboard", label: "Tableaux de bord général", category: "Pilotage & Reporting" },
    { id: "performance", label: "Tableaux de performance", category: "Pilotage & Reporting" },
    { id: "reports", label: "Rapports automatisés (Excel/PDF)", category: "Pilotage & Reporting" },
    { id: "alerts", label: "Alertes email & SMS", category: "Pilotage & Reporting" },
    { id: "vehicle_gps", label: "Géolocalisation GPS intégrée pour le suivi en temps réel des véhicules", category: "Connectivité & Intégrations" },
    { id: "yango_api", label: "Importation automatique Yango (API)", category: "Connectivité & Intégrations" },
    { id: "driver_gps", label: "Localisation des chauffeurs via l’application VTCC Driver", category: "Connectivité & Intégrations" },
  ];

  const toggleFeature = (feature_id: string, categoryName: string) => {
    let updatedCategories = [...(data.features || [])];
    
    const categoryIndex = updatedCategories.findIndex((c) => c.category === categoryName);

    if (categoryIndex > -1) {
      const currentFeatures = updatedCategories[categoryIndex].features;
      
      const newFeatures = currentFeatures.includes(feature_id)
        ? currentFeatures.filter((id) => id !== feature_id)
        : [...currentFeatures, feature_id];

      updatedCategories[categoryIndex] = { 
        ...updatedCategories[categoryIndex], 
        features: newFeatures 
      };

      if (newFeatures.length === 0) {
        updatedCategories = updatedCategories.filter((_, i) => i !== categoryIndex);
      }
    } else {
      updatedCategories.push({
        category: categoryName,
        features: [feature_id],
      });
    }

    onChange(updatedCategories);
  };

  const renderCategory = (category: string) => {
    const selectedIds = data.features?.find((f) => f.category === category)?.features || [];

    return (
      <div className="space-y-4" key={category}>
        <PageSubTitle subtitle={category} />
        <div className="flex flex-col gap-4">
          {featuresList
            .filter((f) => f.category === category)
            .map((feature) => (
              <div key={feature.id} className="flex items-center gap-3">
                <Checkbox
                  id={feature.id}
                  checked={selectedIds.includes(feature.id)}
                  onCheckedChange={() => toggleFeature(feature.id, category)}
                />
                <label 
                  htmlFor={feature.id}
                  className="text-vaTextPrimary text-base cursor-pointer select-none"
                >
                  {feature.label}
                </label>
              </div>
            ))}
        </div>
      </div>
    );
  };

  const uniqueCategories = Array.from(new Set(featuresList.map((f) => f.category)));

  return (
    <div className="space-y-8">
      {uniqueCategories.map((cat) => renderCategory(cat))}
    </div>
  );
};