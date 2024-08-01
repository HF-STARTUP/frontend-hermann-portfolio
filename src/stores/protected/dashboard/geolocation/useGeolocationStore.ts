import {create} from 'zustand';


type CarState = {
    selectedCar?: number;
    getSelectCar: () => number | undefined;
    setSelectedCar: (carID: number | undefined) => void;
    resetState: () => void
}


const useGeolocationStore = create<CarState>((set, getState) => ({
    selectedCar: undefined,

    setSelectedCar: (carID) => set({selectedCar: carID}),
    getSelectCar: () => {
        return getState().selectedCar
    },
    resetState: () => set({selectedCar: undefined}),
}));

export default useGeolocationStore;
