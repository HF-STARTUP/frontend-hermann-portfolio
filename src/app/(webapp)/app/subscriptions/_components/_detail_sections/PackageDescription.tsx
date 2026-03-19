import { DetailRow } from "../../../fleet/components/detailSections/Profile"
import { PackageItem } from "../../_hooks/usePackageList"

export const PackageDescription = ({packageData}:{packageData?: PackageItem | null})=>{
    return (
        <div className="p-4 border rounded-xl space-y-4 bg-vaLightGray/5">
            <DetailRow label="Date d’ajout" value={packageData?.createdAt} />
            <DetailRow label="Dernière modification" value={packageData?.createdAt} />
            <DetailRow label="Ajouté par" value={packageData?.createdBy} />
            <DetailRow label="Cible" value={packageData?.profileType} />
            <DetailRow label="Description" value={packageData?.packageName} />
        </div>
    )
}