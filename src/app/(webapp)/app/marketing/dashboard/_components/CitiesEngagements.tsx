"use client";

import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { TrendingUp, Plus, Minus } from "lucide-react";
import { formatNumber } from "@/lib/utils";
import CardTitle from "@/components/ui/custom/CardTitle";

const geoUrl =
  "https://raw.githubusercontent.com/lotusms/world-map-data/main/world.json";

export interface CityEngagement {
  name: string;
  count: number;
  totalPercent: number;
  malePercent: number;
  femalePercent: number;
  unspecifiedPercent: number;
  coordinates: [number, number];
  color: string;
}

const ENGAGEMENT_DATA: CityEngagement[] = [
  {
    name: "Kinshassa",
    count: 20390,
    totalPercent: 55,
    malePercent: 10,
    femalePercent: 40,
    unspecifiedPercent: 5,
    coordinates: [15.3139, -4.3224],
    color: "#fbbf24",
  },
  {
    name: "Abidjan",
    count: 34275,
    totalPercent: 25,
    malePercent: 12,
    femalePercent: 10,
    unspecifiedPercent: 3,
    coordinates: [-4.0083, 5.3599],
    color: "#10b981",
  },
  {
    name: "Bobo Dioulasso",
    count: 14589,
    totalPercent: 15,
    malePercent: 5,
    femalePercent: 8,
    unspecifiedPercent: 2,
    coordinates: [-4.2979, 11.1771],
    color: "#ef4444",
  },
  {
    name: "Adjamé",
    count: 15732,
    totalPercent: 5,
    malePercent: 2,
    femalePercent: 2,
    unspecifiedPercent: 1,
    coordinates: [-4.0197, 5.3484],
    color: "#3b82f6",
  },
];

const CityEngagementMap = () => {
  const [selectedCity, setSelectedCity] = useState<CityEngagement | null>(null);

  const [position, setPosition] = useState({
    coordinates: [0, 0] as [number, number],
    zoom: 1,
  });

  const handleZoomIn = () => {
    if (position.zoom >= 8) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 1.5 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 1.5 }));
  };

  return (
    <div className="bg-white p-6 rounded-2xl size-full">
      <CardTitle title="Engagements par ville" />

      <div>
        <div className="flex items-center gap-3 mt-4">
          <span className="text-3xl font-black text-black">
            {formatNumber(76345)}
          </span>

          <div className="flex items-center gap-1 bg-vaDarkBlue text-vaMainBlue px-2 py-1 rounded-full text-xs font-bold">
            <TrendingUp size={14} /> 12,00 %
          </div>
        </div>

        <p className="text-slate-400 text-sm mt-1">
          Comparé au mois dernier
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-10 items-center justify-center size-full">
        {/* Liste villes */}
        <div className="w-full md:w-1/3 space-y-6">
          <div className="space-y-5">
            {ENGAGEMENT_DATA.map((city, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-1 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: city.color }}
                  />

                  <span className="font-semibold text-slate-700">
                    {city.name}
                  </span>
                </div>

                <span className="text-slate-500 font-medium">
                  {formatNumber(city.count)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Carte */}
        <div className="w-full md:w-2/3 relative bg-slate-50/50 rounded-3xl overflow-hidden min-h-[400px]">
          {/* Controls */}
          {/* <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
            <button
              onClick={handleZoomIn}
              className="p-2 bg-white rounded-lg shadow-md hover:bg-slate-50 border border-slate-100 transition-colors"
            >
              <Plus size={18} className="text-slate-600" />
            </button>

            <button
              onClick={handleZoomOut}
              className="p-2 bg-white rounded-lg shadow-md hover:bg-slate-50 border border-slate-100 transition-colors"
            >
              <Minus size={18} className="text-slate-600" />
            </button>
          </div> */}

          <ComposableMap projectionConfig={{ scale: 300 }}>
            {/* <ZoomableGroup
              zoom={position.zoom}
              center={position.coordinates}
              onMoveEnd={setPosition}
            > */}
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: {
                          fill: "#DBEafe",
                          stroke: "transparent",
                          outline: "none",
                        },
                        hover: {
                          fill: "#BFDBFE",
                          outline: "none",
                        },
                      }}
                    />
                  ))
                }
              </Geographies>

              {/* Markers */}
              {ENGAGEMENT_DATA.map((city, idx) => (
                <Marker
                  key={idx}
                  coordinates={city.coordinates}
                  onMouseEnter={() => setSelectedCity(city)}
                  onMouseLeave={() => setSelectedCity(null)}
                >
                  <circle
                    r={4 / position.zoom}
                    fill="#2563eb"
                    stroke="#fff"
                    strokeWidth={1 / position.zoom}
                    className="cursor-pointer"
                  />
                </Marker>
              ))}

              {/* Popup attachée au marker */}
              {selectedCity && (
                <Marker coordinates={selectedCity.coordinates}>
                  <foreignObject
                    x={10}
                    y={-120}
                    width={220}
                    height={140}
                    style={{ pointerEvents: "none" }}
                  >
                    <div className="bg-white shadow-2xl rounded-2xl p-4 border border-slate-100 animate-in fade-in zoom-in duration-200">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-bold text-slate-800">
                          {selectedCity.name}
                        </span>

                        <span className="font-black text-slate-900">
                          {selectedCity.totalPercent} %
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                          Hommes : {selectedCity.malePercent} %
                        </div>

                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <div className="w-2.5 h-2.5 rounded-full bg-blue-300" />
                          Femmes : {selectedCity.femalePercent} %
                        </div>

                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <div className="w-2.5 h-2.5 rounded-full bg-blue-50" />
                          Non spécifié : {selectedCity.unspecifiedPercent} %
                        </div>
                      </div>
                    </div>
                  </foreignObject>
                </Marker>
              )}
            {/* </ZoomableGroup> */}
          </ComposableMap>
        </div>
      </div>
    </div>
  );
};

export default CityEngagementMap;