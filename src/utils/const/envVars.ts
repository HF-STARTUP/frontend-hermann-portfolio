import Cookies from "js-cookie";
import { ConnexionMode } from "@/lib/utils";

export function getBaseApiPath(): string {
  return Cookies.get("connexion_mode") === ConnexionMode.Staging
    ? EnvVars.NP_API_ENDPOINT_STAGING
    : EnvVars.NP_API_ENDPOINT;
}

export const EnvVars = {
  NP_API_ENDPOINT: <string>process.env.NEXT_PUBLIC_API_ENDPOINT,
  NP_API_ENDPOINT_STAGING: <string>process.env.NEXT_PUBLIC_API_ENDPOINT_STAGING,
  GOOGLE_MAP_API_KEY: <string>process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
  NEXT_PUBLIC_GOOGLE_MAP_API_ID: <string>(
    process.env.NEXT_PUBLIC_GOOGLE_MAP_API_ID
  ),
};
