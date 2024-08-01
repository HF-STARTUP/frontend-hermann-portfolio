import Joi from "joi";
import {_JoiConfig} from "@/schema/_joiConfig";

export type AddDriverInputs = {
    id: string | undefined
    image: File | undefined

    first_name: string
    last_name: string
    email: string
    place_Birth: string
    phone: string
    cni_number: string
    driver_licence_number: string
    driver_licence_type: string
    country_licence_delivery: string
    days_off: string

    birthday: Date
    expire_delivery_at: Date
    issue_delivery_on: Date

    driver_type_id: string
    grade_id: string
    city_id: string
    region_id: string
    vehicle_id?: string
    group_id: string

    park_id: string

    sex: string
}

export const addDriverSchema = Joi.object({
    first_name: Joi.string().required().messages({
        'string.empty': `Ce champ est requis`,
    }),

    driver_type_id: Joi.string().allow("").messages({
        'string.base': `Champ invalide`,
    }),


    days_off: Joi.number().allow("").messages({
        'number.base': `Champ invalide`,
    }),


    driver_licence_type: Joi.string().allow("").messages({
        'string.base': `Champ invalide`,
    }),

    grade_id: Joi.string().allow("").messages({
        'number.base': `Champ invalide`,
    }),


    last_name: Joi.string().required().messages({
        'string.empty': `Ce champ est requis`,
    }),
    country_licence_delivery: Joi.string().required().messages({
        'string.empty': `Ce champ est requis`,
    }),
    email: _JoiConfig.strRequired,
    place_Birth: Joi.string().allow('', null).messages({
        'string.pattern.base': `Le format du numéro GPS est invalide`,
    }),
    phone: _JoiConfig.strRequired,
    cni_number: Joi.string().required().messages({
        'string.empty': `Ce champ est requis`,
    }),
    driver_licence_number: Joi.string().required().messages({
        'string.empty': `Ce champ est requis`,
    }),
    // driver_licence_type: Joi.string().required().messages({
    //     'string.empty': `Ce champ est requis`,
    // }),
    issue_delivery_on: Joi.string().required().messages({
        'string.empty': `Ce champ est requis`,
    }),
    birthday: Joi.date().required().messages({
        'string.empty': `Ce champ est requis`,
    }),
    expire_delivery_at: Joi.date().required().messages({
        'string.empty': `Ce champ est requis`,
    }),
});


export type AddNewDriverGroupInputs = {
    name: string
}

export const addNewDriverGroupSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': `Ce champ est requis`,
    }),
});

export type SuspendDriverInputs = {
    id: string,
    days: number,
    reason?: string,
    mode?: 'suspend' | 'unsuspend'
}

export type DriverDeactivationInputs = {
    id: string,
    mode?: 'deactivate' | 'activate'
}

