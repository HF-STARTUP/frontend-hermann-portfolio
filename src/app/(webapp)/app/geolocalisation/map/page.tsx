"use client"

import MapComponent from "@/app/(protected)/dashboard/geolocation/_components/map/MapComponent";
import React from "react";
import {Crumb} from "@/components/ui/custom/crumb";
import {PageTitle} from "@/components/ui/custom/PageTitle";

export default function MapPage() {
    return (
        <div>
            <div>
                <Crumb
                    items={[
                        {
                            label: "Géolocalisation",
                            url: "/geolocalisation",
                        }
                    ]}
                />
                <div>
                    <PageTitle
                        page_title={"Géolocalisation"}
                        items={["Toutes les flottes", "Flottes de Christian"]}
                    />
                </div>
            </div>
            <div className={"mt-[18px]"}>
                <MapView/>
            </div>
        </div>
    )
}

const MapView = () => {

    return (
        <MapComponent/>
    )
}