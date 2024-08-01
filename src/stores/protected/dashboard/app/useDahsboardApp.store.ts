import {create} from 'zustand';
import Vehicle from "@/model/vehicule/Vehicule";
import Driver from "@/model/driver/Driver";


type DashboardState = {
    gActiveMonth: number,
    gActiveYear: number,
    gActiveWeek: number,
    gIsHebDo: boolean,
    updateGlobalDate: ({year, month}: { year?: number, month?: number, week?: number, isHebdo?: boolean }) => void,

    iActiveMonth: number,
    iActiveYear: number,
    iActiveWeek: number,
    iIsHebDo: boolean,
    updateIndividualDate: ({year, month}: { year?: number, month?: number, week?: number, isHebdo?: boolean }) => void,

    activeVehicle?: Vehicle,
    activeDriver?: Driver,
    updateSelectedItem: ({vehicle, driver}: { vehicle?: Vehicle, driver?: Driver }) => void

    resetState: ()=>void
}

const useDashboardStore = create<DashboardState>((set, getState) => ({
    gActiveMonth: 1,
    gActiveYear: 2024,
    gActiveWeek: 1,
    gIsHebDo: false,

    updateGlobalDate: ({year, month, week, isHebdo}) => {
        if (year) {
            set({gActiveYear: year})
        }

        if (month) {
            set({gActiveMonth: month})
        }

        if (week) {
            set({gActiveWeek: week})
        }

        if (isHebdo === true || isHebdo === false) {
            set({gIsHebDo: isHebdo})
        }
    },


    iActiveMonth: 1,
    iActiveYear: 2024,
    iActiveWeek: 1,
    iIsHebDo: false,
    updateIndividualDate: ({year, month, week, isHebdo}) => {
        if (year) {
            set({iActiveYear: year})
        }

        if (month) {
            set({iActiveMonth: month})
        }

        if (week) {
            set({iActiveWeek: week})
        }

        if (isHebdo === true || isHebdo === false) {
            set({iIsHebDo: isHebdo})
        }
    },

    activeDriver: undefined,
    activeVehicle: undefined,
    updateSelectedItem: ({vehicle, driver}) => {

        if (driver) {
            set({activeDriver: driver})
        }

        if (vehicle) {
            set({activeVehicle: vehicle})
        }
    },

    resetState: ()=> {
        set({
            activeDriver: undefined,
            activeVehicle: undefined,

            iActiveMonth: 1,
            iActiveYear: 2024,
            iActiveWeek: 1,
            iIsHebDo: false,

            gActiveMonth: 1,
            gActiveYear: 2024,
            gActiveWeek: 1,
            gIsHebDo: false,
        })
    }

}));

export default useDashboardStore;

