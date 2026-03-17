import { useState } from "react";

export const GetFonctionnalityLabel = (fonctionnality: string) => {
  switch (fonctionnality) {
    case "vtcc_driver":
      return "Application chauffeur VTCC Driver";
    case "dashboard":
      return "Tableaux de bord général";
    case "performance":
      return "Tableaux de performance";
    case "reports":
      return "Rapports automatisés (Excel/PDF)";
    case "alerts":
      return "Alertes email & SMS";
    case "vehicle_gps":
      return "Géolocalisation GPS intégrée pour le suivi en temps réel des véhicules ";
    case "yango_api":
      return "Importation automatique des chauffeurs depuis Yango (via API)";
    case "driver_gps":
      return "Localisation des chauffeurs via l’application VTCC Driver";

    default:
      return "Fonctionnalite inconnue"
  }
}

export type PackagePeriod = "monthly" | "quarterly" | "annual";

export interface PackagePeriodData {
  period: PackagePeriod;
  amount?: number;
  currency?: string;
  discount?: number;
  trialDays?: number;
}

export type PackageFormData = {
  target: string;
  name: string;
  description: string;
  pricingType?: "Free" | "Payant" | "estimate";
  pricings: PackagePeriodData[];
  maxVehicles?: number;
  maxDrivers?: number;
  features: {category: string, features:string[]}[];
  prioritySupport: boolean;
};

export const usePackageForm = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<PackageFormData>({
    target: "",
    name: "",
    description: "",
    pricings: [],
    features: [],
    prioritySupport: false
  });

  const updateFormData = (data: Partial<PackageFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleGoToNext = () => {
    if (step <= 3) {
      setStep(step + 1);
    } else {
      console.log("Données finales :", formData);
      alert("Le formulaire est soumis");
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return {
    step,
    formData,
    updateFormData,
    handleGoToNext,
    handleBack
  };
};