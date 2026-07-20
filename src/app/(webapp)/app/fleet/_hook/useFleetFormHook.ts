import AuthManagerGuard from "@/guard/AuthManagerGuard";
import { useCreateFleet } from "@/hooks/admin/useFleetHook";
import { useCity } from "@/hooks/location/useCity/useCity";
import { useCountries } from "@/hooks/location/useCountry/useCountry";
import { FleetRegisterFormData } from "@/types/admin/fleet.type";
import notify from "@/utils/func/notification";
import { useEffect, useState } from "react";

type FleetFormStep = 1 | 2 | 3;

export const useFleetFormHook = (fleetId?: string) => {
  const [selectedCountry, setSelectedCountry] = useState<string>();
  const [currentStep, setCurrentStep] = useState<FleetFormStep>(1);

  const {
    error,
    isError,
    isSuccess,
    onCreateFleet,
    loading: isCreating,
  } = useCreateFleet();

  useEffect(() => {
    if (isSuccess) {
      resetForm()
      setCurrentStep(1)
    }
  }, [isSuccess])


  const { data: countries, isLoading: isLoadingCountries } = useCountries();

  const { data: cities, isLoading: isLoadingCities } = useCity({
    country_code: selectedCountry,
  });

  const [formData, setFormData] = useState<FleetRegisterFormData>({
    first_name: "",
    name: "",
    email: "",
    phone: "",
    city_id: "",
    owner_type: "particulier",
    profile_id: AuthManagerGuard.getProfileID,
    currency_id: "",
    uuid_code: "",
    password: "",
    pin_code: "",
    parkActivity_id: "",
    subscription_id: "",
    fcm_token_vtc: "",
    fcm_token_web: "",
    fcm_token_vtc_driver: "",
    apn_token_vtc: "",
    apn_token_vtc_driver: "",
    legal_notice: "",
    demo_days: "",
    logo: undefined,
  });

  const updateField = (field: keyof FleetRegisterFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      first_name: "",
      name: "",
      email: "",
      phone: "",
      city_id: "",
      owner_type: "particulier",
      currency_id: "",
      uuid_code: "",
      password: "",
      pin_code: "",
      last_name: "",
      parkActivity_id: "",
      subscription_id: "",
      fcm_token_vtc: "",
      fcm_token_web: "",
      fcm_token_vtc_driver: "",
      apn_token_vtc: "",
      apn_token_vtc_driver: "",
      legal_notice: "",
      demo_days: "",
      logo: undefined,
    });
  };

  const validateStep = (step: FleetFormStep): boolean => {
    if (step === 1) {
      if (!formData.owner_type) {
        notify("Veuillez selectionner le type de compte", "error");
        return false;
      }
      if (!formData.email) {
        notify("Veuillez entrer l'adresse email du compte", "error");
        return false;
      }
      if (!formData.phone) {
        notify("Veuillez entrer le numero de telephone du compte", "error");
        return false;
      }
      if (!formData.first_name) {
        notify("Veuillez entrer le prenom", "error");
        return false;
      }
    }

    if (step === 2) {
      if (!formData.name) {
        notify("Veuillez entrer le nom de la flotte", "error");
        return false;
      }
      if (!selectedCountry) {
        notify("Veuillez selectionner un pays", "error");
        return false;
      }
      if (!formData.city_id) {
        notify("Veuillez selectionner une ville", "error");
        return false;
      }
      if (!formData.parkActivity_id) {
        notify("Veuillez selectionner une activite", "error");
        return false;
      }
    }

    if (step === 3) {
      if (!formData.subscription_id) {
        notify("Veuillez selectionner un plan d'abonnement", "error");
        return false;
      }
    }

    return true;
  };

  const goToStep = (step: FleetFormStep) => {
    setCurrentStep(step);
  };

  const handleCreate = () => {
    if (validateStep(3)) {
      const payload = {
        ...formData,
        country_code: selectedCountry,
      };
      onCreateFleet(payload);
    }

    if (isError) {
      console.error(error);
      notify(error?.message || "Une erreur est survenue", "error");
    }
  };

  return {
    countries,
    isLoadingCountries,
    cities,
    isLoadingCities,
    selectedCountry,
    setSelectedCountry,

    formData,
    setFormData,
    updateField,

    handleCreate,
    isSubmiting: isCreating,
    isSuccess: isSuccess,

    validateStep,
    goToStep,
    currentStep,
  };
};