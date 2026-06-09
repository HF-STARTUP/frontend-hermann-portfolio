import { AlertTriangle, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";

export function KycTableEmptyState({
  onResetFilters,
}: {
  onResetFilters?: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-[#E0E9FF] py-16 px-6 flex flex-col items-center justify-center text-center">
      <div className="size-20 rounded-full bg-vaBlue/10 text-vaBlue flex items-center justify-center mb-6">
        <Inbox className="size-9" />
      </div>
      <h3 className="text-lg font-bold text-[#000B20] mb-2">
        Aucune soumission trouvée
      </h3>
      <p className="text-sm text-[#A3AED0] max-w-md mb-6">
        Aucun client ne correspond à vos critères de recherche et de filtres.
      </p>
      {onResetFilters && (
        <Button
          variant="outline"
          className="rounded-xl border-[#E9EAEC]"
          onClick={onResetFilters}
        >
          Réinitialiser les filtres
        </Button>
      )}
    </div>
  );
}

export function KycTableErrorState({
  onRetry,
}: {
  onRetry?: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-[#E0E9FF] py-16 px-6 flex flex-col items-center justify-center text-center">
      <div className="size-20 rounded-full bg-vaRed/10 text-vaRed flex items-center justify-center mb-6">
        <AlertTriangle className="size-9" />
      </div>
      <h3 className="text-lg font-bold text-[#000B20] mb-2">
        Impossible de charger les soumissions
      </h3>
      <p className="text-sm text-[#A3AED0] max-w-md mb-6">
        Une erreur réseau est survenue. Vérifiez votre connexion et réessayez.
      </p>
      {onRetry && (
        <Button
          variant="outline"
          className="rounded-xl border-[#E9EAEC] text-vaMainBlue"
          onClick={onRetry}
        >
          Réessayer
        </Button>
      )}
    </div>
  );
}
