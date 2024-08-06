"use client"

import React from "react";
import DriveItems from "@/app/(protected)/dashboard/vehicule-list/_components/driveItems/DriveItems";
import { useGetVehicules } from "@/hooks/vehicule/useVehicule";
import Loading from "@/components/ui/Loader";

export default function CarsPage() {

    const {data, isLoading} = useGetVehicules()

    if(isLoading){

        return(
            <Loading />
        )
    }

    if(data){
        return (
            <div>
                <AASectionTittle
                    title={"Véhicules"}
                />
                <div>
                    <DriveItems/>
                </div>
            </div>
        )
    }
}


const AASectionTittle: React.FC<{ title: string }> = ({title}) => {

    return (
        <div className="text-black text-2xl font-semibold">{title}</div>
    )
}