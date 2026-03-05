"use client";

type Fleet = {
  city: string;
  value: string;
  coordinates: [number, number];
};

type UseDashboardFleetMapResult = {
  fleets: Fleet[];
};

export const useDashboardFleetMap = (): UseDashboardFleetMapResult => {
  const fleets: Fleet[] = [
    { city: "Abidjan", value: "72K", coordinates: [4.0351, 5.3295] },
    { city: "New York", value: "72K", coordinates: [-74.006, 40.7128] },
    { city: "Chicago", value: "72K", coordinates: [-87.6298, 41.8781] },
    { city: "Sydney", value: "72K", coordinates: [151.2093, -33.8688] },
    { city: "Tokyo", value: "72K", coordinates: [139.6917, 35.6895] },
  ];

  return { fleets };
};

