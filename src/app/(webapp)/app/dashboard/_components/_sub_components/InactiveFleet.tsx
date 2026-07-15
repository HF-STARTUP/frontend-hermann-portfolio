import { StretchHorizontal } from "lucide-react";
import { EmptyData } from "@/components/box/PageNetworkState";
import InactiveFleetModel from "@/model/dashboard/InactiveFleets";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function InnactiveFleetRow({ fleet }: { fleet: InactiveFleetModel }) {
    const $router = useRouter()
    return (
        <div className="p-2 rounded-2xl w-full bg-vaRed/5 border border-vaRed/20 flex items-center gap-4 cursor-pointer" onClick={() => $router.push(`/app/at-risk-customers/${fleet.fleetId}/details`)}>
            {fleet.fleetLogo ?
                <div className="rounded-full size-14 bg-vaRed/10 text-vaRed flex items-center justify-center overflow-hidden">
                    <Image
                        src={fleet.fleetLogo}
                        alt={fleet.fleetName}
                        width={500}
                        height={500}
                        className="size-full object-cover"
                    />
                </div>
                : <div className="rounded-full p-4 size-14 bg-vaRed/10 text-vaRed flex items-center justify-center">
                    <StretchHorizontal strokeWidth={2} className="size-8" />
                </div>}
            <div className="detail flex flex-col justify-between min-h-14">
                <p className="text-black font-semibold text-base">
                    {fleet.fleetName}
                </p>
                <p className="text-vaTextPrimary font-normal text-sm">
                    Dernière activité : {fleet.lastActivityDay}
                </p>
                <p className="text-vaRed font-medium text-sm">
                    {fleet.inactiveDays} jours d'inactivité
                </p>
            </div>
        </div>
    )
}

const InnactiveFleetList = ({ fleets }: { fleets?: InactiveFleetModel[] }) => {
    if (!fleets?.length || !fleets) {
        return (
            <EmptyData message="Vous etes a jours !!!" description="Aucun abonnements n'expire bientot." />
        )
    }

    return (
        <div className="flex flex-col gap-4 w-full">
            {
                fleets.map((fleet, index) => <InnactiveFleetRow fleet={fleet} key={index} />)
            }
        </div>
    )
}

export default InnactiveFleetList