import { formatNumber } from "@/lib/utils";
import { PackageFormData } from "@/types/subscription.types";

export const PackageOverview = ({ data }: { data: PackageFormData }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="rounded-2xl p-4 bg-white shadow-md w-[80%] space-y-6">
        <h2 className="text-2xl font-semibold text-vaMainBlue">{data.name}</h2>

        <div className="space-y-2 text-sm text-vaTextPrimary">
          <p>
            <span className="font-medium text-black">Cible:</span>{" "}
            {data.account_type}
          </p>
          <p>
            <span className="font-medium text-black">Type:</span> {data.type}
          </p>
          <p>
            <span className="font-medium text-black">Période:</span>{" "}
            {data.period === "yearly" ? "Annuel" : "Mensuel"}
          </p>
        </div>

        <div className="bg-vaLightGray/20 p-4 rounded-full flex items-center justify-center font-semibold text-sm">
          <p>
            {formatNumber(Number(data.amount || 0))} /{" "}
            {data.period === "yearly" ? "an" : "mois"}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-vaLightGray/20 p- rounded-full flex items-center justify-center font-semibold text-xs">
            <p>Jusqu’à {data.vehicle_number} véhicule(s)</p>
          </div>
          <div className="bg-vaLightGray/20 p-2 rounded-full flex items-center justify-center font-semibold text-xs">
            <p>Jusqu’à {data.driver_number} chauffeur(s)</p>
          </div>
        </div>

        {data.description ? (
          <div className="space-y-2 border-t pt-4">
            <p className="text-lg font-semibold text-black">Description</p>
            <p className="text-sm text-vaTextPrimary whitespace-pre-line">
              {data.description}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};