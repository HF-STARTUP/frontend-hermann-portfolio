"use client"

import FleetListAccount from "@/app/(webapp)/app/fleet/sections/fleets-list/config";
import {useGetFleetsList} from "@/hooks/admin/useFleetHook";
import Loading from "@/components/ui/Loader";
import {EmptyData} from "@/components/box/PageNetworkState";

export const FleetList = () => {

    const {data, isLoading} = useGetFleetsList()


    if (isLoading) {

        return <Loading/>
    }

    if (!isLoading && data && data.length === 0) {
        return (
            <EmptyData
                message={"Aucune flotte pour l'instant"}
            />
        )
    }

    if (data && data.length > 0) {
        return (
            <div className={"custom-scrollbar overflow-y-scroll rounded-lg"}>
                <FleetListAccount fleets={data}/>
            </div>
        )
    }
}