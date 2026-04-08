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
  const fleets: Fleet[] = [];

  return { fleets };
};

