import {ClientMaintenanceCar, CreateEntretienInputs, ENTRETIEN_REPAIR_TYPE, Maintenance} from "@/types/entretien.types";
import {create} from "zustand";
import {PLANING_TYPES} from "@/utils/staticData";
import {RepairType} from "@/model/entretien/Entretien";
import Supplier from "@/model/supplier/Supplier";

type EntretienAction = {
    entretien: CreateEntretienInputs
    updateEntretien: (entretien: CreateEntretienInputs) => void;
    setNewMaintenance: (d: Maintenance) => void,

    activeMaintenanceConfig?: Maintenance,
    setActiveMaintence: (d: ENTRETIEN_REPAIR_TYPE, obj: RepairType) => void,
    activeMaintenanceObj?: RepairType

    maintencesCar: ClientMaintenanceCar[],
    removeMaintenceCar: (id: string) => void,
    addMaintenceCar: (d: ClientMaintenanceCar) => void,
    resetMaintenaces: () => void

    currentCarComponentID: string,
    activeSupplier?: Supplier,
    updateSelectedSupplier: ({supplier}: { supplier: Supplier }) => void

    editingMaintenance: { compID: number, value: number }
    updateEditingMaintenance: ({compID, value}: { compID: number, value: number }) => void
}

const useScheduleStore = create<EntretienAction>((set, getState) => ({

    currentCarComponentID: '',

    editingMaintenance: {compID: 0, value: 0},
    updateEditingMaintenance: (up) => set({editingMaintenance: up}),

    resetMaintenaces: () => {
        set({maintencesCar: []})
    },

    entretien: {
        supplier_id: '',
        park_id: '',
        vehicle_id: '',
        start_date: new Date(),
        end_date: new Date(),
        description: '',
        maintenances: [
            {
                repair_type_id: ENTRETIEN_REPAIR_TYPE.maitenance,
                maintenanceCarComponent: [
                    {
                        component_id: 1,
                        amount: 2000
                    }
                ]
            }
        ]
    },

    updateSelectedSupplier: ({supplier}) => {
        if (supplier) {
            set({activeSupplier: supplier})
        }
    },

    removeMaintenceCar: (id) => {
        set({maintencesCar: getState().maintencesCar.filter((i) => i.component_id !== +id)})
    },

    activeMaintenanceConfig: {
        repair_type_id: ENTRETIEN_REPAIR_TYPE.maitenance,
        maintenanceCarComponent: [
            {
                component_id: 1,
                amount: 2000
            }
        ]
    },

    maintencesCar: [],
    addMaintenceCar: (d) => set({maintencesCar: [...getState().maintencesCar, d]}),

    activePlaningType: PLANING_TYPES.drivers,
    activeSuplier: undefined,

    updateEntretien: (entretien) => set({entretien: entretien}),
    setNewMaintenance: (newMaintenance) => {
        set({
                entretien: {
                    ...getState().entretien,
                    maintenances: [
                        newMaintenance,
                        ...getState().entretien.maintenances
                    ]
                }
            }
        )
    },

    setActiveMaintence: (d, obj) => {
        set({
            activeMaintenanceConfig: {
                repair_type_id: d,
                maintenanceCarComponent: [
                    {
                        component_id: 1,
                        amount: 2000
                    }
                ]
            },
            activeMaintenanceObj: obj
        })
    }
}));

export default useScheduleStore;