"use client"

import React from "react";
import MaintenanceItem
    from "./_components/MaintenanceItem/MaintenanceItem";
import {useGetEntretiens} from "@/hooks/entretien/useEntretien";
import Loading from "@/components/ui/Loader";
import {EmptyData} from "@/components/box/PageNetworkState";

const DrivesItems:React.FC = ()=>{

    const {data: entretiens, isLoading} = useGetEntretiens()

    if(isLoading){
        return (
            <Loading />
        )
    }

    if (!isLoading && entretiens?.length == 0) {
        return (<EmptyData
            message={`Vous n'avez pas encore planifier un entretien !`}
            description={`Vos entretiens s'aficherons ici.`}
        />)
    }

    if(entretiens){
        return (
            <div className={`flex flex-col gap-[5px]`}>
                {entretiens?.map((entretien, i)=>(
                    <MaintenanceItem entretien={entretien} key={i} />
                ))}
            </div>
        )
    }
}


export default DrivesItems
