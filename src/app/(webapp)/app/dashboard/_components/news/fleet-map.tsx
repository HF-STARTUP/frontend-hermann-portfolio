"use client"

import React, {useEffect, useState} from "react"
import {ComposableMap, Geographies, Geography, Marker} from "react-simple-maps"
import {Card} from "@/components/ui/card"
import {ABlockTitle} from "@/app/(webapp)/app/dashboard/_components/abonEvolution/abonnEvolution";
import {useGetFleetByCity} from "@/hooks/admin/useFleetHook";
import {useCountries} from "@/hooks/location/useCountry/useCountry";
import {CustomComboBox} from "@/components/ui/custom/custom-comobo-box";
import {Button} from "@/components/ui/button";
import {RotateCcw, ZoomIn, ZoomOut} from "lucide-react";
import {ScrollArea} from "@/components/ui/scroll-area";

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
    const [selectedCountrie, setSelectedCountrie] = useState<string>()
    const {data: nbFleets, isLoading} = useGetFleetByCity({country_id: selectedCountrie})
    const [filter, setFilter] = useState<string>("all")
    const {data: countries, isLoading: loadingCountries} = useCountries({fleet: true})

    const [dimensions, setDimensions] = useState({width: 800, height: 359})

    // États pour les contrôles de la carte
    const [zoom, setZoom] = useState(1)
    const [center, setCenter] = useState<[number, number]>([0, 30])
    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState<[number, number]>([0, 0])

    // Fonction pour mettre à jour les dimensions en fonction du conteneur
    useEffect(() => {
        const updateDimensions = () => {
            const container = document.getElementById("map-container")
            if (container) {
                setDimensions({
                    width: container.clientWidth,
                    height: container.clientHeight,
                })
            }
        }
        window.addEventListener("resize", updateDimensions)
        updateDimensions() // Initialisation
        return () => window.removeEventListener("resize", updateDimensions)
    }, [])

    // Filtrer les flottes en fonction du filtre sélectionné
    const filteredFleets = filter === "all" ? fleets : fleets.filter((fleet) => fleet.city === filter)

    // Obtenir les villes uniques pour le filtre
    const uniqueCities = Array.from(new Set(fleets.map((fleet) => fleet.city)))

    // Fonctions de contrôle du zoom
    const handleZoomIn = () => {
        setZoom((prev) => Math.min(prev * 1.5, 8))
    }

    const handleZoomOut = () => {
        setZoom((prev) => Math.max(prev / 1.5, 0.5))
    }

    const handleReset = () => {
        setZoom(1)
        setCenter([0, 30])
    }

    // Fonctions de gestion du drag
    const handleMouseDown = (event: React.MouseEvent) => {
        setIsDragging(true)
        setDragStart([event.clientX, event.clientY])
    }

    const handleMouseMove = (event: React.MouseEvent) => {
        if (!isDragging) return

        const deltaX = event.clientX - dragStart[0]
        const deltaY = event.clientY - dragStart[1]

        const sensitivity = 0.5 / zoom

        setCenter((prev) => [prev[0] - deltaX * sensitivity, prev[1] + deltaY * sensitivity])

        setDragStart([event.clientX, event.clientY])
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    const handleMouseLeave = () => {
        setIsDragging(false)
    }


    return (
        <Card className="p-6 border-0 shadow-none">
            <div className="flex justify-between items-center mb-6">
                <ABlockTitle>Flottes par villes</ABlockTitle>

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
