import {create} from 'zustand';
import {PlaningType, TableModeType} from "@/types/dashboard.schedule.type";
import {PLANING_TYPES} from "@/utils/staticData";
import {ReceiptUserProps} from "@/app/(protected)/dashboard/receipts/_components/receiptsUsers/ReceiptsUsers";
import Driver from "@/model/driver/Driver";
import Vehicule from "@/model/vehicule/Vehicule";


export type ScheduleUserType = { _id: number } & ReceiptUserProps

type ScheduleState = {
    tableMode: TableModeType,
    activePlaningType: PlaningType,
}

type ScheduleActions = {
    setTableMode: (tableMode: TableModeType) => void;
    setActivePlaningType: (tableMode: PlaningType) => void;
    getIfTableModeIsHebdo: () => boolean;
    getIfPlaningTypeIsCars: () => boolean;
    getIfPlaningTypeIsAgent: () => boolean;
    resetState: () => void;
}

type ScheduleActiveDriverState = {
    activeDriver?: Driver;
    activeVehicule?: Vehicule;
    activeAgent?: Driver;
    setActiveItem: ({driver, vehicule}: { driver?: Driver, vehicule?: Vehicule, agent?: Driver, close?: boolean }) => void;
}


const useScheduleStore = create<ScheduleState & ScheduleActions & ScheduleActiveDriverState>((set, getState) => ({
    tableMode: 'Mensuelle',
    activePlaningType: PLANING_TYPES.drivers,
    activeDriver: undefined,

    setTableMode: (tableMode) => set({tableMode}),
    setActivePlaningType: (activePlaningType) => set({activePlaningType}),
    getIfTableModeIsHebdo: () => getState().tableMode === 'Hebdo',
    getIfPlaningTypeIsCars: () => getState().activePlaningType === 'Véhicules',
    getIfPlaningTypeIsAgent: () => getState().activePlaningType === 'Agents',

    setActiveItem: ({driver, vehicule, agent, close}) => {
        if (driver) {
            set({activeDriver: driver, activeVehicule: undefined})
        }
        if (vehicule) {
            set({activeVehicule: vehicule, activeDriver: undefined})
        }

        if(agent){
            set({activeAgent: agent, activeVehicule: undefined, activeDriver: undefined})
        }

        if (close) {
            set({activeVehicule: undefined, activeDriver: undefined, activeAgent: undefined})
        }
    },


    resetState: () => set({
        tableMode: 'Mensuelle',
        activePlaningType: PLANING_TYPES.drivers,
        activeDriver: undefined,
        activeVehicule: undefined
    }),
}));

export default useScheduleStore;
