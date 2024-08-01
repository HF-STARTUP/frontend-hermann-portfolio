import {create} from 'zustand';
import {PlaningType, TableModeType} from "@/types/dashboard.schedule.type";
import {PLANING_TYPES} from "@/utils/staticData";
import {ReceiptUserProps} from "@/app/(protected)/dashboard/receipts/_components/receiptsUsers/ReceiptsUsers";
import {PLANING_USERS} from "@/app/(protected)/dashboard/receipts/_mocks/user.mock";


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
    resetState: () => void;
}

type ScheduleActiveDriverState = {
    activeDriver?: number;
    getActiveDriver: () => ScheduleUserType;
    setActiveDriver: (userID: number | undefined) => void;
}


const useScheduleStore = create<ScheduleState & ScheduleActions & ScheduleActiveDriverState>((set, getState) => ({
    tableMode: 'Mensuelle',
    activePlaningType: PLANING_TYPES.drivers,
    activeDriver: undefined,

    setTableMode: (tableMode) => set({tableMode}),
    setActivePlaningType: (activePlaningType) => set({activePlaningType}),
    getIfTableModeIsHebdo: () => getState().tableMode === 'Hebdo',
    getIfPlaningTypeIsCars: () => getState().activePlaningType === 'Véhicules',

    setActiveDriver: (userID) => set({activeDriver: userID}),
    getActiveDriver: () => {
        return PLANING_USERS.find(_ => _.id === getState().activeDriver) as ScheduleUserType
    },

    resetState: () => set({tableMode: 'Mensuelle', activePlaningType: PLANING_TYPES.drivers, activeDriver: undefined}),
}));

export default useScheduleStore;
