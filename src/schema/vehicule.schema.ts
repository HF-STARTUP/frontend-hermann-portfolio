import Joi from "joi";
import {_JoiConfig} from "@/schema/_joiConfig";

export type AddVehiculeOwnerInputs = {
    first_name: string,
    last_name: string,
    cni_number: string,
    driver_licence_number: string
}

export const addVehiculeOwnerSchema = Joi.object({
    first_name: Joi.string().required().messages({
        'string.empty': `Le prénom est requis`,
    }),
    last_name: Joi.string().required()
        .messages({
            'string.empty': `Le nom est requis`,
        }),
    cni_number: Joi.string().required()
        .messages({
            'string.empty': `le numéro de votre CNI est requis`,
        }),
    driver_licence_number: Joi.string()
        .optional()
        .allow("")
        .messages({
            'string.empty': `Le permis de conduire est requis`
        }),
});


export interface VehicleRecipeInterface {
    freequency: RECIPE_TYPE,
    amount: number,
    manage_in_vtc: boolean,
    collection_method: COLLECTION_METHOD,
    collection_type: COLLECTION_TYPE
}

export enum RECIPE_TYPE {
    DAILY = "daily",
    WEEKLY = "weekly",
    MONTHLY = "monthly",
}

export enum COLLECTION_METHOD {
    CASH = 'cash',
    MOMO = 'mobile_money',
    BOTH = 'both'
}

export enum COLLECTION_TYPE {
    RECIPE_OBJECTIVE = 'recipe_objective',
    without_recipe_objective = "without_recipe_objective"
}

export enum PASSATION_CADENCE {
    DAY = 'day',
    HOUR = 'hour'
}

export enum WORK_PROGRAM {
    DRIVER_IN_TURN = "driver_in_turn"
}


export enum TARIF_CADENCE {
    DAY = 'day',
    HOUR = 'hour'
}

export type VehicleTarifInterface = {
    cadence: TARIF_CADENCE,
    tarif: number
}

type InsuranceValidityInterface = {
    start_date: Date
    end_date: Date
}

interface VehicleConfigInterface {
    number_driver?: number,
    drivers_id?: string[],
    cadence?: PASSATION_CADENCE,
    start_date?: Date,
    passation_date?: Date,
    end_date?: Date,
    work_program?: WORK_PROGRAM
}

export type AddVehiculeInputs = VehicleConfigInterface & {
    id: string | undefined,
    images: File[] | undefined
    chassis_number: string
    registration_number: string
    gps_number: string | undefined
    mileage: string
    recipes?: VehicleRecipeInterface[],
    insurance_subscription_at: Date
    circulation_at: Date
    entry_fleet_at: Date
    currency_id: string | undefined
    brand_id: string
    model_id: string
    color_id: string
    region_id: string | undefined
    vehicle_owner_id: string
    contract_type_id: string
    vehicle_type_id: number
    tags: string | undefined
    park_id: string
    manage_recipe_in_vtc: boolean
    config?: VehicleConfigInterface
    tarif?: VehicleTarifInterface[]
    insuranceValidity?: InsuranceValidityInterface
    vehicle_doc?: string
    label?: string
}


export const addVehiculeSchema = Joi.object<AddVehiculeInputs>({

    //Sub-boject
    number_driver: _JoiConfig.numberRequired,
    cadence: _JoiConfig.strRequired,


    vehicle_type_id: _JoiConfig.numberRequired,
    brand_id: _JoiConfig.numberRequired,
    model_id: _JoiConfig.numberRequired,
    color_id: _JoiConfig.numberRequired,

    contract_type_id: _JoiConfig.numberRequired,
    vehicle_owner_id: _JoiConfig.numberRequired,


    chassis_number: Joi.string().allow("").messages({
        'string.pattern.base': `Le numéro de chasis est requis`,
    }),
    registration_number: Joi.string().allow("").messages({
        'string.pattern.base': `Ce champ est requis`,
    }),
    mileage: Joi.string().allow("").messages({
        'string.empty': `Ce champ est requis`,
    }),
    gps_number: Joi.string().allow('', null).messages({
        'string.pattern.base': `Le format du numéro GPS est invalide`,
    }),
    insurance_subscription_at: Joi.date().allow("").messages({
        'string.pattern.base': `Ce champ est requis`,
    }),
    circulation_at: Joi.date().allow("").messages({
        'string.pattern.base': `Ce champ est requis`,
    }),
    entry_fleet_at: Joi.date().allow("").messages({
        'string.pattern.base': `Ce champ est requis`,
    }),
    tags: Joi.string().allow('', null).messages({
        'string.pattern.base': `Le format n'est pas valide`,
    }),

});


export type MakePassationTransfertInputs = {
    images: File[]
    vehicle_id: string
    actual_driver_id: string
    recive_driver_id: string
    region_id: string
    recette_amount: string
    mileage_recorded: string
    additional_information: string
    maintenance_id: string
}


export type AddNewContraTypeInputs = {
    name: string,
}

export const addNewContraTypeInputsSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': `Le nom du type de contrat est requis`,
    }),
});


export type FinishEntretienInterface = {
    amount: number,
    description: string,
    id?: string
}

export const finishEntretienSchema = Joi.object({
    amount: _JoiConfig.numberRequired,
    description: Joi.string().optional().messages({
        'string.base': `Entrez la description de l'operation`,
    })
});

export type AddNewVehiculeGroupInputs = {
    title: string,
    region_id: string,
    vehicles_ids: { id: string }[]

}


export const addNewVehiculeGroupSchema = Joi.object({
    title: Joi.string().required().messages({
        'string.empty': `Le nom du groupe est requis`,
    }),
})
