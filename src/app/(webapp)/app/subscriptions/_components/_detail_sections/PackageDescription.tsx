import { AllSubscriptionsModel } from "@/model/subscription/AllSubscriptionsModel"
import { DetailRow } from "../../../fleet/components/detailSections/Profile"

export const PackageDescription = ({ packageData }: { packageData?: AllSubscriptionsModel | null }) => {
    return (
        <div className="p-4 border rounded-xl space-y-4 bg-vaLightGray/5">
            <DetailRow label="Date d’ajout" value={packageData?.createdAt} />
            <DetailRow label="Dernière modification" value={packageData?.updatedAt} />
            <DetailRow label="Ajouté par" value={packageData?.userName} />
            <DetailRow label="Cible" value={packageData?.profile} />
            <DetailRow label="Description" value={packageData?.vehicleNumberLabel ?? "-"} />
        </div>
    )
}