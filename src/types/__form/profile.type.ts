import { CurencyResponseType } from "@/types/vehicule.type";
import { ACCESS_TYPE } from "@/services/admin/settings/settingsService";
import { PaginationResponse } from "../dashboard.type";

export type UserProfileResponseData = {
  id: string;
  owner_type: string;
  first_name: string;
  email: string;
  phone: string;
  last_name: null;
  user_id: string;
  birthday: null;
  place_birth: null;
  cni_number: null;
  blocked_at: null;
  suspended: boolean;
  desactivate_at: null;
  status: string;
  available: boolean;
  created_at: Date;
  role: string;
  image: null;
  grade: null;
  driver_type: null;
  driver_licence_number: null;
  country_licence_delivery: null;
  principal_vehicle: null;
  sex: null;
  issue_delivery_on: null;
  expire_delivery_at: null;
  parks: Park[];
  permissions: string[];
  day_off: null;
  role_name: null;
  ets_name: string;
  ets_logo: string;
};

export type Park = {
  id: string;
  name: string;
  country: string;
  country_code: string;
  city: string;
  currency: string;
};

export type HisAccountType = {
  id: string;
  status: boolean;
  activated_at: null;
  created_at: Date;
  blocked_at: null;
  updated_at: Date;
  owner_id: string;
  regions: RegionType[];
};

export type RegionType = {
  id: string;
  name: string;
  zone: null;
  latitude: null;
  longitude: null;
  account_id: string;
  city_id: number;
  currency_id: number;
  currency: CurencyResponseType;
};

export type PermissionType = {
  permission_id: string;
};

export type AdminAccountStatus = "active" | "inactive" | "deactivated";

export type CountryType = {
  id: number;
  name: string;
  iso_code: string;
  currency: string;
};

export type AdminCityType = {
  id: number;
  name: string;
  country_id: number;
  country: CountryType;
  role: RoleType | null;
};

export type AdminCountryType = {
  id: number;
  name: string;
  iso_code: string;
  currency: string;
  cities_count: number;
};

export type CityByCountryType = {
  id: number;
  name: string;
  country_id: number;
  role: RoleType | null;
};

export type CitiesByCountryType = {
  country: CountryType;
  cities: CityByCountryType[];
};

export type AdminProfileResponseType = {
  id: string;
  first_name: string;
  last_name: string;
  desactivate_at?: string | null;
  Image?: {
    name: string;
    path: string;
  };
  status: AdminAccountStatus;
  user: User;
  roles: RoleType[];
  password: string;
  admin_on_city: AdminCityType[];
  admin_countries: AdminCountryType[];
  cities_by_country: CitiesByCountryType[];
  default_country_id: number;
  default_country: CountryType;
  default_city_id: number;
  default_city: AdminCityType;
};

export interface AdminResponseData extends PaginationResponse {
  data: AdminProfileResponseType[];
}

export interface GetAdminsParams {
  city_id?: number;
  name?: string;
  page?: number;
  itemPerPage?: number;
  include_permissions?: boolean;
  status?: AdminAccountStatus;
}

export type AdminLoginResponseType = {
  token: string;
  status: AdminAccountStatus;
  refresh_token: string;
  id: string;
  admin_on_city: AdminOnCity[];
};

export type AdminOnCity = {
  id: number;
  name: string;
  currency: string;
  permissions: Permission[];
};

export type Permission = {
  onglet: Onglet;
};

export type Onglet = {
  name: string;
  access: ACCESS_TYPE;
};

export type User = {
  phone: string;
  email: string;
  id: string;
};

export type RoleType = {
  id: number;
  name: string;
  description: string;
  active: boolean;
};
