import AuthManagerGuard from "@/guard/AuthManagerGuard";
import { useCreateFleet } from "@/hooks/admin/useFleetHook";
import { useCity } from "@/hooks/location/useCity/useCity";
import { useCountries } from "@/hooks/location/useCountry/useCountry";
import { usGetSubscriptionPacks } from "@/hooks/subscription/useSubscription";
import { FleetRegisterFormData } from "@/types/admin/fleet.type";
import notify from "@/utils/func/notification";
import { useState } from "react";

export const useFleetFormHook = (fleetId?: string) => {
  const [selectedCountry, setSelectedCountry] = useState<string>();
  const {
    error,
    isError,
    isSuccess,
    onCreateFleet,
    loading: isCreating,
  } = useCreateFleet();

  const { data: countries, isLoading: isLoadingCountries } = useCountries();

  const { data: cities, isLoading: isLoadingCities } = useCity({
    country_code: selectedCountry,
  });

  const { isLoading: isLoadingSubscriptions, data: subscriptionsPacks } = usGetSubscriptionPacks(selectedCountry)

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
    last_name: ".",
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

  const validateForm = () => {
    if (!formData.owner_type) {
      notify("Veuillez selectionner le type de compte", "error");
      return false;
    }

    if (!formData.name) {
      notify("Veuillez entrer le nom de la flotte", "error");
      return false;
    }

    if (!selectedCountry) {
      notify("Veuillez selectionner un pays pour continuer", "error");
      return false;
    }

    if (!formData.city_id) {
      notify("Veuillez selectionner une ville", "error");
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

    if (!formData.subscription_id) {
      notify("Veuillez selectionne un plan d'abonnement", "error");
      return false;
    }

    return true;
  };

  const handleCreate = () => {
    if (validateForm()) {
      onCreateFleet(formData);
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

    subscriptionsPacks,
    isLoadingSubscriptions
  };
};
