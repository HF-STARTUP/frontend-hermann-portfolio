export type HourResponseType = {
    id:                              number
    value:                           number
}

export type RotationGroupType = {
    id: number;
    name: string | null;
    group_id: string | null;
    passationType: string;
    vehiclePrincipalDriverAssignment: string;
    vehicleInterimDriverAssignment: string;
    region_id: string;
    rotationGroup_on_Vehicles: any[];
};
