import { StretchHorizontal } from "lucide-react";
import { InactiveFleet } from "../../_hook/useDashboardHook";
import { EmptyData } from "@/components/box/PageNetworkState";

export function InnactiveFleetRow({ fleet }: { fleet: InactiveFleet }) {
    return (
        <div className="p-4 rounded-2xl w-full bg-vaRed/5 border border-vaRed/40 flex items-center gap-4">
            <div className="rounded-full p-4 size-20 bg-vaRed/10 text-vaRed flex items-center justify-center">
                <StretchHorizontal strokeWidth={2} className="size-8" />
            </div>
            <div className="detail flex flex-col justify-between min-h-24">
                <p className="text-black font-semibold text-lg">
                    {fleet.fleetName}
                </p>
                <p className="text-vaTextPrimary font-normal text-sm">
                Dernière activité : {fleet.lastActivityAt}
                </p>
                <p className="text-vaRed font-medium text-sm">
                    {fleet.inactiveDays}
                </p>
            </div>
        </div>
    )
}

const InnactiveFleetList = ({ fleets }: { fleets?: InactiveFleet[] }) => {
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