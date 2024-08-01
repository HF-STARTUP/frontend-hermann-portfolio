import {create} from "zustand";

export enum PrincipalAssigmentType {
    driver_indisponibility = "driver_indisponibility",
    fixe = "fixe",
}

export enum InterimaireAssigmentType {
    day_rest_principal_driver = "day_rest_principal_driver",
    solicity = "solicity",
    both = "both"
}

export enum CollectFrequency {
    everyDay = "everyDay",
    oneDay = "oneDay"
}

export enum LocationCollecting {
    atAgent = "atAgent",
    inbox = "inbox",
}

export enum CollectingTime {
    inChecking = "inChecking",
    onPassation = "onPassation",
    both = "both",
}

export enum VehiclePrincipalDriverAssignmentType {
    multipleDriverFixed = "multipleDriverFixed",
    singleDriverFixed = "singleDriverFixed",
    anyDriver = "anyDriver",
}

export enum VehicleInterimDriverAssignmentType {
    multipleDriverFixed = "multipleDriverFixed",
    singleDriverFixed = "singleDriverFixed",
    anyDriver = "anyDriver",
}

export enum CheckingType {
    weekly = 'weekly',
    daily = 'daily'
}

export enum PassationType {
    daily = 'daily',
    weekly = 'weekly',
    monthly = 'monthly'
}

export enum PlaningType {
    daily = 'daily',
    weekly = 'weekly',
    monthly = 'monthly'
}

export enum PlaningPassationModel {
    continue = 'continue',
    discontinue = 'discontinue'
}

export enum Frequency {
    Weekend = 'Weekend',
    TwoWeeks = 'TwoWeeks',
    ThreeWeeks = 'ThreeWeeks'
}

type principalDriverConf = {
    day_rest: number,
    assingmentType: PrincipalAssigmentType
}

type interimaireDriverConf = {
    day_rest: number,
    assingmentType: InterimaireAssigmentType
}

type CollectConfig = {
    frequency: CollectFrequency
    days: { id: number }[]
    day_id: number
    locationCollecting: LocationCollecting
    collectingTime: CollectingTime
}

type Checking = {
    checkingType: CheckingType
    checkingDailyDetails?: {
        numberOfTimes?: number
        hours?: { id: number }[]
        hour_id?: number
    }
    checkingWeeklyDetails?: {
        numberOfTimes?: number
        checkingDay_id?: number
        checkingHour_id?: number
        checking_times?: {
            daysOff_id?: number
            hour_id?: number
        }
    }
}

type PassationDailyDetails = {
    driversNumber: number
    hours: { id: number }[]
    hour_id: number
}

type PassationWeeklyDetails = {
    driversNumber: number
    passationModel: PlaningPassationModel
    continueModelPassationDay_id: number
    continueModelPassationHour_id: number
    weeklyPassationTime: {
        daysOff_id: number
        hour_id: number
    }
}

type PassationMonthlyDetails = {
    driversNumber: number
    frequency: Frequency
    passationModel: PlaningPassationModel
    continueModelPassationDay_id: number
    continueModelPassationHour_id: number
    monthly_passation_times: {
        daysOff_id: number
        hour_id: number
    }[]
}

type UpdateRotationConfig = {
    name?: string
    groupe_id?: string
    passationType?: PassationType
    principalDriverConf?: principalDriverConf
    interimaireDriverConf?: interimaireDriverConf
    collectConfig?: CollectConfig
    vehiclePrincipalDriverAssignment?: VehiclePrincipalDriverAssignmentType
    vehicleInterimDriverAssignment?: VehicleInterimDriverAssignmentType
    checking?: Checking
    planingType?: PlaningType,
    passation_daylyDetails?: PassationDailyDetails,
    passation_weeklyDetails?: PassationWeeklyDetails,
    passation_monthlyDetails?: PassationMonthlyDetails,
}

export type RotationGroupInputs =  {
    region_id?: string,

} & UpdateRotationConfig

type RotationGroupStore = {
    name: string,
    passationType: PassationType,

    planingType?: PlaningType,
    passation_daylyDetails: PassationDailyDetails,
    passation_weeklyDetails: PassationWeeklyDetails,
    passation_monthlyDetails: PassationMonthlyDetails,

    updateRotationGroupConfig: (config: UpdateRotationConfig) => void
    prepareRotationGroupInputs: () => RotationGroupInputs


    groupe_id: string | undefined,
    principalDriverConf: principalDriverConf,
    interimaireDriverConf: interimaireDriverConf,
    collectConfig: CollectConfig,
    vehiclePrincipalDriverAssignment: VehiclePrincipalDriverAssignmentType,
    vehicleInterimDriverAssignment: VehicleInterimDriverAssignmentType,
    checking: Checking,
}

export const useRotationGroupStore = create<RotationGroupStore>((setState, getState) => ({
    name: 'Saisir le nom du groupe de rotation',
    groupe_id: undefined,
    planingType: PlaningType.daily,

    passationType: PassationType.daily,
    passation_daylyDetails: {
        driversNumber: 1,
        hours: [{id: 1}],
        hour_id: 1
    },
    passation_weeklyDetails: {
        driversNumber: 1,
        passationModel: PlaningPassationModel.continue,
        continueModelPassationDay_id: 1,
        continueModelPassationHour_id: 1,
        weeklyPassationTime: {
            daysOff_id: 1,
            hour_id: 1
        }
    },
    passation_monthlyDetails: {
        driversNumber: 1,
        frequency: Frequency.Weekend,
        passationModel: PlaningPassationModel.continue,
        continueModelPassationDay_id: 1,
        continueModelPassationHour_id: 1,
        monthly_passation_times: [{
            daysOff_id: 1,
            hour_id: 1,
        }]
    },


    principalDriverConf: {
        day_rest: 1,
        assingmentType: PrincipalAssigmentType.fixe
    },
    interimaireDriverConf: {
        day_rest: 1,
        assingmentType: InterimaireAssigmentType.day_rest_principal_driver
    },
    collectConfig: {
        frequency: CollectFrequency.oneDay,
        days: [{id: 1}],
        day_id: 1,
        locationCollecting: LocationCollecting.atAgent,
        collectingTime: CollectingTime.onPassation
    },
    vehiclePrincipalDriverAssignment: VehiclePrincipalDriverAssignmentType.multipleDriverFixed,
    vehicleInterimDriverAssignment: VehicleInterimDriverAssignmentType.multipleDriverFixed,
    checking: {
        checkingType: CheckingType.daily,
        checkingDailyDetails: {
            numberOfTimes: 1,
            hours: [{id: 1}],
            hour_id: 1,
        },
        checkingWeeklyDetails: {
            numberOfTimes: 1,
            checkingDay_id: 1,
            checkingHour_id: 1,
            checking_times: {
                daysOff_id: 1,
                hour_id: 1,
            }
        }
    },

    updateRotationGroupConfig: ({
                                    name,
                                    groupe_id,
                                    interimaireDriverConf,
                                    principalDriverConf,
                                    collectConfig,
                                    vehicleInterimDriverAssignment,
                                    vehiclePrincipalDriverAssignment,
                                    checking,
                                    planingType,
                                    passation_daylyDetails,
                                    passation_weeklyDetails,
                                    passation_monthlyDetails

                                }) => {
        if (name != undefined) {
            setState({name: name})
        }

        if (groupe_id != undefined) {
            setState({groupe_id})
        }

        if (interimaireDriverConf != undefined) {
            setState({interimaireDriverConf})
        }

        if (principalDriverConf != undefined) {
            setState({principalDriverConf})
        }

        if (collectConfig != undefined) {
            setState({collectConfig})
        }

        if (vehiclePrincipalDriverAssignment != undefined) {
            setState({vehiclePrincipalDriverAssignment})
        }

        if (vehicleInterimDriverAssignment != undefined) {
            setState({vehicleInterimDriverAssignment})
        }

        if (checking) {
            setState({checking})
        }

        if (planingType != undefined){
            setState({planingType})
        }

        if(passation_daylyDetails != undefined){
            setState({passation_daylyDetails})
        }

        if(passation_weeklyDetails != undefined){
            setState({passation_weeklyDetails})
        }

        if(passation_monthlyDetails != undefined){
            setState({passation_monthlyDetails})
        }

    },

    prepareRotationGroupInputs: ()=>{

        const passationType = getState().passationType
        const checking = getState().checking
        const checkingType = getState().checking.checkingType

        return(
            {
                passationType: getState().passationType,
                name: getState().name,
                groupe_id: getState().groupe_id,
                interimaireDriverConf: getState().interimaireDriverConf,
                principalDriverConf: getState().principalDriverConf,
                collectConfig: getState().collectConfig,
                vehicleInterimDriverAssignment: getState().vehicleInterimDriverAssignment,
                vehiclePrincipalDriverAssignment: getState().vehiclePrincipalDriverAssignment,
                checking: {
                    checkingType: checkingType,
                    checkingWeeklyDetails: checkingType === CheckingType.weekly ? checking.checkingWeeklyDetails : undefined,
                    checkingDailyDetails: checkingType === CheckingType.daily ? checking.checkingDailyDetails : undefined,
                },
                planingType: getState().planingType,
                passation_daylyDetails: passationType === PassationType.daily ? getState().passation_daylyDetails : undefined,
                passation_weeklyDetails: passationType === PassationType.weekly ? getState().passation_weeklyDetails : undefined,
                passation_monthlyDetails: passationType === PassationType.monthly ? getState().passation_monthlyDetails : undefined
            }
        )
    }

}))
