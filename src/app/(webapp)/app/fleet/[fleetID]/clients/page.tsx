"use client"

import React from "react";
import DriveItems from "@/app/(protected)/dashboard/vehicule-list/_components/driveItems/DriveItems";
import { useGetVehicules } from "@/hooks/vehicule/useVehicule";
import Loading from "@/components/ui/Loader";
import DriverItems from "@/app/(protected)/dashboard/drivers-list/_components/driverItems/DriverItems";
import ClientItems from "@/app/(protected)/dashboard/clients/_components/suppliersItems/ClientItems";

export default function ClientPage() {


    return (
       <div>
          <ClientItems/>
       </div>
    )

}

