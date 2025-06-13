"use client"

import {useState} from "react"
import {ComposableMap, Geographies, Geography, Marker} from "react-simple-maps"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Card} from "@/components/ui/card"

// Chemin vers le fichier GeoJSON pour la carte du monde
const geoUrl = "https://github.com/subyfly/topojson/blob/master/world-countries.json"

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
    const [filter, setFilter] = useState<string>("all")

    // Filtrer les flottes en fonction du filtre sélectionné
    const filteredFleets = filter === "all" ? fleets : fleets.filter((fleet) => fleet.city === filter)

    // Obtenir les villes uniques pour le filtre
    const uniqueCities = Array.from(new Set(fleets.map((fleet) => fleet.city)))

    return (
        <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Flottes par villes</h2>
                <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-[180px] bg-slate-50">
                        <SelectValue placeholder="Tous"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Tous</SelectItem>
                        {uniqueCities.map((city) => (
                            <SelectItem key={city} value={city}>
                                {city}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="h-[400px] w-full mb-6">
                <ComposableMap
                    projection="geoMercator"
                    projectionConfig={{
                        scale: 120,
                    }}
                >
                    <Geographies geography={geoUrl}>
                        {({geographies}) =>
                            geographies.map((geo) => (
                                <Geography key={geo.rsmKey} geography={geo} fill="#e6f0f9" stroke="#D6D6DA"
                                           strokeWidth={0.5}/>
                            ))
                        }
                    </Geographies>
                    {filteredFleets.map(({city, coordinates}) => (
                        <Marker key={`${city}-${coordinates.join(",")}`} coordinates={coordinates}>
                            <circle r={6} fill="#000" stroke="#fff" strokeWidth={2}/>
                        </Marker>
                    ))}
                </ComposableMap>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredFleets.map((fleet, index) => (
                    <div key={`${fleet.city}-${index}`} className="border-t border-gray-200 pt-2">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-medium">{fleet.city}</span>
                            <span className="text-lg font-bold">{fleet.value}</span>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    )
}
