"use client"

import { EmptyData } from "@/components/box/PageNetworkState"
import Loading from "@/components/ui/Loader"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useDashboardBestFleet } from "../_hook/useDashboardSectionsHooks"
import { DashboardGlobalFilters } from "../_hook/useDashboardHook"
import CardTitle from "@/components/ui/custom/CardTitle"
import { CustomComboBox } from "@/components/ui/custom/custom-comobo-box"

export const BestFleet = ({ globalFilters }: { globalFilters?: DashboardGlobalFilters }) => {
    const {
        fleetData,
        isLoading,
        currency,
        bestFleetsLocalFilters,
        setBestFleetsLocalFilters,
        filterCityToken,
        setFilterCityToken,
        sentinelRef,
        cityFiltered,
        hasNextPage,
        page
    } = useDashboardBestFleet(globalFilters)

    return (
        <div className={"flex flex-col bg-white p-6 rounded-2xl h-full max-w-full"}>
            <div className={"flex flex-col items-start justify-between"}>
                <div className="flex items-center justify-between w-full flex-wrap">
                    <CardTitle title="Meilleures flottes" />
                    <div className="max-w-52 w-full">
                        <CustomComboBox
                            options={cityFiltered ? [
                                { label: "Toutes les villes", value: "all" },
                                ...cityFiltered.map((city) => ({
                                    label: city.name,
                                    value: String(city.id)
                                }))
                            ] : []}
                            value={bestFleetsLocalFilters?.ville}
                            onValueChange={(value) => setBestFleetsLocalFilters({ ...bestFleetsLocalFilters, ville: value })}
                            placeholder="Choisir une ville"
                            searchPlaceholder="Rechercher une ville..."
                            emptyMessage="Aucune ville trouvée."
                            className="w-full"
                            onSearch={(sq) => setFilterCityToken(sq)}
                        />
                    </div>
                </div>

                <div className="w-full">
                    <div className="space-y-6 pt-6 w-full">
                        <div className="w-full">
                            {!isLoading && fleetData.length === 0 && (
                                <EmptyData message={"Aucune donnée pour le moment"} />
                            )}

                            {fleetData.length > 0 && (
                                <div className="w-full">
                                    <div className="h-full max-h-[39rem] overflow-x-auto overflow-y-auto w-full custom-scrollbar">
                                        <div className="w-full min-w-[750px]">
                                            <div className="grid grid-cols-4 gap-4 border-b border-vaGray pb-4 text-base font-normal text-vaTextPrimary sticky top-0 bg-white z-[5]">
                                                <div>Flotte</div>
                                                <div>Plan d'abonnement</div>
                                                <div>Nombres de véhicules</div>
                                                <div>Flux financiers</div>
                                            </div>

                                            {fleetData.map((fleet) => (
                                                <div key={fleet.id} className="grid grid-cols-4 w-full py-4 text-sm text-black font-medium gap-4 items-center">
                                                    <div>{fleet.name}</div>
                                                    <div>{fleet.subscriptionName}</div>
                                                    <div>{fleet.vehicleCount}</div>
                                                    <div>{fleet.formattedNetFlow} {currency}</div>
                                                </div>
                                            ))}

                                            <div ref={sentinelRef} className="w-full h-10 flex items-center justify-center">
                                                {isLoading && <Loading />}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {isLoading && fleetData.length === 0 && (
                                <Loading className={"h-[150px]"} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}