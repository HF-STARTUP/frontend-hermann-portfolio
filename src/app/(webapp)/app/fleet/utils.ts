import { 
  FleetType, 
  ParkType, 
  FleetStatus, 
  SubscriptionName, 
  SubscriptionPeriod, 
  SubscriptionStatus,
  SortOrder, 
  ActivationStatus, 
  FirstAction, 
  PaymentMethodsType
} from "@/types/admin/fleet.type";

export const FleetTypeMap: Record<FleetType, string> = {
  particulier: "Particulier",
  professionnel: "Professionnel",
};

export const ParkTypeMap: Record<ParkType, string> = {
  fleet_vtc: "Flotte VTC",
  fleet: "Flotte",
};

export const FleetStatusMap: Record<FleetStatus, string> = {
  new: "Nouveau",
  active: "Actif",
  inactive: "Inactif",
  locked: "Verrouillé",
  deactivated: "Désactivé",
  gps_configuration_pending: "Configuration GPS en attente",
};

export const SubscriptionMethodMap: Record<PaymentMethodsType, string> = {
  intern: "Interne",
  wave: "Wave",
  sold: "Solde",
  flutterwave: "Flutterwave",
  paystack: "Paystack",
  google: "Google",
  apple: "Apple",
  cash: "Espèces",
};

export const SubscriptionNameMap: Record<SubscriptionName, string> = {
  premium_entreprise: "Premium Entreprise",
  essentiel_entrepreneur: "Essentiel Entrepreneur",
  premium_entrepreneur: "Premium Entrepreneur",
  starter_entrepreneur: "Starter Entrepreneur",
  essentiel_entreprise: "Essentiel Entreprise",
  none: "Aucun",
};

export const SubscriptionPeriodMap: Record<SubscriptionPeriod, string> = {
  monthly: "Mensuel",
  yearly: "Annuel",
};

export const SubscriptionStatusMap: Record<SubscriptionStatus, string> = {
  using: "En cours d'utilisation",
  paid: "Payé",
  expired: "Expiré",
  active: "Actif",
  inactive: "Inactif",
  deleted: "Supprimé",
  suspended: "Suspendu",
  failed: "Echec",
  free: "Gratuit"
};

export const SortOrderMap: Record<SortOrder, string> = {
  recent: "Récent",
  oldest: "Ancien",
};

export const ActivationStatusMap: Record<ActivationStatus, string> = {
  activated_7d: "Activé depuis 7 jours",
  activated_14d: "Activé depuis 14 jours",
  activated_30d: "Activé depuis 30 jours",
  not_activated: "Non activé",
};

export const FirstActionMap: Record<FirstAction, string> = {
  promo_code_used: "Utilisation de code promo",
  vehicle_created: "Premier véhicule ajouté",
  driver_created: "Premier chauffeur ajouté",
  first_payment: "Premier encaissement effectué",
  first_entretien: "Premier entretien ajouté",
  first_checkup: "Premier check-up effectué",
};