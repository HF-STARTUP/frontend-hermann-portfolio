"use client"

import React from "react";
import DriveItems from "@/app/(protected)/dashboard/vehicule-list/_components/driveItems/DriveItems";
import { useGetVehicules } from "@/hooks/vehicule/useVehicule";
import Loading from "@/components/ui/Loader";
import DriverItems from "@/app/(protected)/dashboard/drivers-list/_components/driverItems/DriverItems";

export default function DriversPage() {

    const {data, isLoading} = useGetVehicules()

    return (
        <DriverItems />
    )

}


const AASectionTittle: React.FC<{ title: string }> = ({title}) => {

    return (
        <div className="text-black text-2xl font-semibold">{title}</div>
    )
}