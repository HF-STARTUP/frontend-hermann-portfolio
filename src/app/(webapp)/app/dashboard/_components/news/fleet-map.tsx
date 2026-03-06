"use client"

import React from "react"
import {ComposableMap, Geographies, Geography, Marker} from "react-simple-maps"
import {Card} from "@/components/ui/card"
import {CustomComboBox} from "@/components/ui/custom/custom-comobo-box";
import {Button} from "@/components/ui/button";
import {RotateCcw, ZoomIn, ZoomOut} from "lucide-react";
import {ScrollArea} from "@/components/ui/scroll-area";
import {useDashboardFleetMapSection} from "@/app/(webapp)/app/dashboard/_hook/useDashboardSectionsHooks";

// Chemin vers le fichier GeoJSON pour la carte du monde
const geoUrl = "/map-raw.json"

// Type pour les données de flotte
interface Fleet {
    city: string
    value: string
    coordinates: [number, number] // [longitude, latitude]
}

interface FleetMapProps {
    fleets: Fleet[]
}

export default function FleetMap({fleets}: FleetMapProps) {
    const {
        selectedCountrie,
        setSelectedCountrie,
        countries,
        nbFleets,
        dimensions,
        zoom,
        center,
        isDragging,
        handleZoomIn,
        handleZoomOut,
        handleReset,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        handleMouseLeave,
    } = useDashboardFleetMapSection(fleets)


    return (
        <Card className="p-6 border-0 rounded-2xl shadow-none">
            <div className="flex justify-between items-center mb-6">
                <p className="text-2xl font-semibold text-vaTextPrimary mb-6">Flottes actives</p>

                <CustomComboBox
                    options={countries ? [
                        {label: "Tous", value: "999999"},
                        ...countries.map((country) => ({
                            label: country.name,
                            value: String(country.id)
                        }))
                    ] : []}
                    value={selectedCountrie}
                    onValueChange={setSelectedCountrie}
                    placeholder="Pays"
                    label={"Pays"}
                    searchPlaceholder="Rechercher un pays..."
                    emptyMessage="Aucun pays trouvé."
                />

            </div>

            <div className="relative">
                {/* Contrôles de zoom */}
                <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                    <Button variant="outline" size="icon" onClick={handleZoomIn}
                            className="bg-white  hover:bg-gray-50">
                        <ZoomIn className="h-4 w-4"/>
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleZoomOut}
                            className="bg-white  hover:bg-gray-50">
                        <ZoomOut className="h-4 w-4"/>
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handleReset}
                        className="bg-white  hover:bg-gray-50"
                        title="Réinitialiser la vue"
                    >
                        <RotateCcw className="h-4 w-4"/>
                    </Button>
                </div>

                <div
                    id="map-container"
                    className="h-[359px] w-full mb-6 overflow-hidden cursor-grab active:cursor-grabbing"
                    style={{cursor: isDragging ? "grabbing" : "grab"}}
                >
                    <ComposableMap
                        projection="geoMercator"
                        width={dimensions.width}
                        height={dimensions.height}
                        projectionConfig={{
                            scale: (dimensions.width / 6) * zoom,
                            center: center,
                        }}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Geographies geography={geoUrl}>
                            {({geographies}) =>
                                geographies.map((geo) => (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill="#e6f0f9"
                                        stroke="#D6D6DA"
                                        strokeWidth={0.5}
                                        style={{
                                            default: {outline: "none"},
                                            hover: {outline: "none"},
                                            pressed: {outline: "none"},
                                        }}
                                    />
                                ))
                            }
                        </Geographies>
                        {nbFleets &&
                            nbFleets.map((city) => (
                                <Marker className={""} key={`${city.city_id}`}
                                        coordinates={[city.city_info.longitude, city.city_info.latitude]}>

                                    <circle r={6 / 1} fill="#000" stroke="#fff" strokeWidth={2 / 1}
                                            style={{cursor: "pointer"}}/>
                                    {zoom > 5 ? <text
                                        className={""}
                                        textAnchor="middle"
                                        y={-10 / 1}
                                        style={{
                                            fontFamily: "system-ui",
                                            fontSize: `${12 / 1}px`,
                                            fill: "#000",
                                            fontWeight: "bold",
                                            pointerEvents: "none",
                                        }}
                                    >
                                        {city.city_info.name}
                                    </text> : <text></text>}
                                </Marker>
                            ))}
                    </ComposableMap>
                </div>
            </div>

            <ScrollArea className={"h-[200px] mb-4"}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {nbFleets && nbFleets.map((fleet, index) => (
                        <div key={`${fleet.city_info.name}`} className="border-t border-gray-200 pt-2">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-medium">{fleet.city_info.name}</span>
                                <span className="text-lg font-bold opacity-60">{fleet.fleet_count}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </Card>
    )
}
