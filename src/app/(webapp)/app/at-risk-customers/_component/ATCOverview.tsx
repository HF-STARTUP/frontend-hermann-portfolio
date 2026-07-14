import Badge from "@/components/display/Badge"
import KpiGrid, { KpiItem } from "@/components/display/Kpi"
import { Button } from "@/components/ui/button"
import { getAvatarColor, getAvatarInitials } from "@/lib/initials.avatar.util"
import { cn } from "@/lib/utils"
import ARCClientModel from "@/model/at-risk-customers/ARCPrioritiesModel"
import { useState } from "react"
import { ArrowRight, Banknote, CalendarPlus, MapPin, Phone } from "lucide-react"
import { AddActionFormSheet } from "./AddActionFormSheet"

interface OverviewProps {
    kpiItems: KpiItem[],
    isLoadingKpi?: boolean,
    prioritiesData?: ARCClientModel[],
    isLoadingPriorities?: boolean,
}

export const ARCOverview = ({
    kpiItems,
    isLoadingKpi,
    prioritiesData,
    isLoadingPriorities,
}: OverviewProps) => {
    const [isActionFormVisible, setIsActionFormVisible] = useState(false)
    const [selectedParkId, setSelectedParkId] = useState<string>()
    const [initTab, setInitTab] = useState<'interaction' | 'retarget'>("interaction")

    const handleCall = (parkId: string) => {
        setSelectedParkId(parkId)
        setInitTab("interaction")
        setIsActionFormVisible(true)
    }

    const handleScheduleFollowUp = (parkId: string) => {
        setSelectedParkId(parkId)
        setInitTab("retarget")
        setIsActionFormVisible(true)
    }

    return (
        <div className="space-y-8">
            <AddActionFormSheet
                isOpenned={isActionFormVisible}
                onClose={() => setIsActionFormVisible(false)}
                clientId={selectedParkId}
                initTab={initTab}
            />
            <KpiGrid items={kpiItems} isLoading={isLoadingKpi} />
            <div className="rounded-2xl bg-white shadow p-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2 sm:gap-8 p-4">
                    <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-4 text-foreground">
                        <h1 className="text-lg font-bold">
                            Priorités du jour
                        </h1>
                        <span className="text-sm text-muted-foreground">
                            risque le plus élevé, à contacter en premier
                        </span>
                    </div>
                    <span className="text-sm text-muted-foreground shrink-0">
                        Trié par score de risque
                    </span>
                </div>
                <div className="w-full overflow-x-auto">
                    <div className="min-w-max flex flex-col">
                        {
                            prioritiesData?.map((pd, index) =>
                                <div key={index} className="p-3 border-t flex items-center justify-between gap-2 min-w-max">

                                    <div className="flex items-center gap-8 flex-1 justify-between max-w-lg">
                                        <div className="flex items-center gap-4">
                                            <span className="text-muted-foreground text-lg font-bold min-w-[20px]">
                                                {index + 1}
                                            </span>
                                            <div className="flex items-center gap-4">
                                                <div className={cn("p-2 rounded-xl text-white font-bold shrink-0 size-10 flex items-center justify-center", getAvatarColor(pd.clientName))}>
                                                    {getAvatarInitials(pd.clientName)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <p className="text-sm font-semibold text-foreground whitespace-nowrap"> {pd.clientName} </p>
                                                    <p className="text-xs text-muted-foreground flex items-center gap-2 font-normal whitespace-nowrap">
                                                        <span className="flex items-center gap-1">
                                                            <MapPin className="size-3" />
                                                            {pd.city}
                                                        </span>
                                                        <span>
                                                            {pd.vehicleCount} véhicule(s)
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="shrink-0">
                                            <Badge variant={pd.riskLevelVariant} icon={<Banknote />}>
                                                {pd.alertLabel}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="text-xs font-normal text-muted-foreground flex items-center justify-end gap-4">
                                        <p className="whitespace-nowrap">
                                            {pd.mainProblem} <span className="text-lg font-bold text-vaRed ml-2">{pd.riskScore}</span>
                                        </p>
                                        <div className="rounded-full w-20 h-2 bg-vaOrange/20 shrink-0">
                                            <div className="bg-vaOrange h-full rounded-full" style={
                                                {
                                                    width: pd.riskScore + "%"
                                                }
                                            }></div>
                                        </div>
                                        <div className="flex items-center -space-x-1 shrink-0">
                                            <Button variant={"ghost"} size={"icon"} onClick={() => handleCall(pd.parkId)}>
                                                <Phone size={16} />
                                            </Button>
                                            <Button variant={"ghost"} size={"icon"} onClick={() => handleScheduleFollowUp(pd.parkId)}>
                                                <CalendarPlus size={16} />
                                            </Button>
                                            <Button variant={"ghost"} size={"icon"} href={`/app/at-risk-customers/${pd.parkId}/details`}>
                                                <ArrowRight size={16} />
                                            </Button>
                                        </div>
                                    </div>

                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}