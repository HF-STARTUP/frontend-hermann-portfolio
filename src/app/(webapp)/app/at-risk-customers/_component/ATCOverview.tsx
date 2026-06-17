import Badge from "@/components/display/Badge"
import KpiGrid, { KpiItem } from "@/components/display/Kpi"
import { Button } from "@/components/ui/button"
import { getAvatarColor, getAvatarInitials } from "@/lib/initials.avatar.util"
import { cn } from "@/lib/utils"
import ARCClientModel from "@/model/at-risk-customers/ARCPrioritiesModel"
import { ArrowRight, Banknote, CalendarPlus, MapPin, Phone } from "lucide-react"

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
    return (
        <div className="space-y-8">
            <KpiGrid items={kpiItems} isLoading={isLoadingKpi} />
            <div className="rounded-2xl bg-white shadow p-2">
                <div className="flex items-center justify-between w-full flex-wrap space-x-8 p-4">
                    <div className="flex items-center gap-4 text-foreground">
                        <h1 className="text-lg font-bold ">
                            Priorités du jour
                        </h1>
                        <span className="text-sm text-muted-foreground">
                            risque le plus élevé, à contacter en premier
                        </span>
                    </div>
                    <div className="float-right">
                        <span className="text-sm text-muted-foreground">
                            Trié par score de risque
                        </span>
                    </div>
                </div>

                {
                    prioritiesData?.map((pd, index) =>
                        <div key={index} className="p-3 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-2">

                            <div className="flex flex-col xs:flex-row xs:items-center gap-4 sm:gap-8 flex-1 min-w-0 justify-between max-w-lg">
                                <div className="flex items-center gap-4">
                                    <span className="text-muted-foreground text-lg font-bold min-w-[20px]">
                                        {index + 1}
                                    </span>
                                    <div className="flex items-center gap-4 min-w-0">
                                        <div className={cn("p-2 rounded-xl text-white font-bold shrink-0 size-10 flex items-center justify-center", getAvatarColor(pd.clientName))}>
                                            {getAvatarInitials(pd.clientName)}
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <p className="text-sm font-semibold text-foreground truncate"> {pd.clientName} </p>
                                            <p className="text-xs text-muted-foreground flex items-center flex-wrap gap-x-2 gap-y-1 font-normal">
                                                <span className="flex items-center gap-1 whitespace-nowrap">
                                                    <MapPin className="size-3" />
                                                    {pd.city}
                                                </span>
                                                <span className="whitespace-nowrap">
                                                    {pd.vehicleCount} véhicule(s)
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="xs:ml-0 ml-9 shrink-0">
                                    <Badge variant={pd.riskLevelVariant} icon={<Banknote />}>
                                        {pd.alertLabel}
                                    </Badge>
                                </div>
                            </div>

                            <div className="text-xs font-normal text-muted-foreground flex items-center justify-between sm:justify-end flex-wrap gap-4 sm:gap-4 ml-9 sm:ml-0">
                                <p className="truncate max-w-[200px] sm:max-w-none">
                                    {pd.mainProblem} <span className="text-lg font-bold text-vaRed ml-2">{pd.riskScore}</span>
                                </p>
                                <div className="rounded-full w-20 h-2 bg-vaOrange/20 shrink-0">
                                    <div className="bg-vaOrange h-full rounded-full" style={
                                        {
                                            width: pd.riskScore + "%"
                                        }
                                    }></div>
                                </div>
                                <div className="flex items-center -space-x-1 ml-auto sm:ml-0">
                                    <Button variant={"ghost"} size={"icon"}>
                                        <Phone size={16} />
                                    </Button>
                                    <Button variant={"ghost"} size={"icon"}>
                                        <CalendarPlus size={16} />
                                    </Button>
                                    <Button variant={"ghost"} size={"icon"}>
                                        <ArrowRight size={16} />
                                    </Button>
                                </div>
                            </div>

                        </div>
                    )
                }

            </div>
        </div>
    )
}