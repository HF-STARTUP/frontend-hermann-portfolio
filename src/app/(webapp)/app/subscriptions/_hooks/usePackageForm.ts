import { PackageFormData } from "@/types/subscription.types";
import notify from "@/utils/func/notification";
import { useState } from "react";

const initialFormData: PackageFormData = {
  name: "",
  period: "monthly",
  type: "starter",
  account_type: "particulier",
  amount: 0,
  description: "",
  text_remise: "test",
  text_limitation: "test",
  driver_number: 1,
  vehicle_number: 1,
};

export const usePackageForm = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<PackageFormData>(initialFormData);

  const updateFormData = (data: Partial<PackageFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleValidateStep = (stepToValidate: number): boolean => {
    if (stepToValidate === 1) {
      if (!formData.name || formData.name.trim() === "") {
        notify("Veuillez entrer le nom du package", "error");
        return false;
      }
      if (!formData.account_type) {
        notify("Veuillez sélectionner le type de compte (cible)", "error");
        return false;
      }
    }

    if (stepToValidate === 2) {
      if (!formData.type) {
        notify("Veuillez entrer le type de package", "error");
        return false;
      }

      if (!formData.period) {
        notify("Veuillez sélectionner une période", "error");
        return false;
      }

      if (!formData.vehicle_number || formData.vehicle_number <= 0) {
        notify("Veuillez entrer un nombre de véhicule valide (>0)", "error");
        return false;
      }

      if (!formData.driver_number || formData.driver_number <= 0) {
        notify("Veuillez entrer un nombre de chauffeurs valide (>0)", "error");
        return false;
      }
    }

    return true;
  };

  const handleGoToNext = () => {
    if (step < 3 && handleValidateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const reset = () => {
    setStep(1);
    setFormData(initialFormData);
  };

  return {
    step,
    formData,
    updateFormData,
    handleGoToNext,
    handleBack,
    reset,
    isLastStep: step === 3,
    canSubmit: () => handleValidateStep(2),
  };
};