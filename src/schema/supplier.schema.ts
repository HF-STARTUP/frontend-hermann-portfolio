import Joi from "joi";

export type AddSupplierInputs = {
    id?: string
    name: string
    niu: string
    rccm: string
    social_reason?: string

    business_name: string
    city: string
    phone: string
    email: string
    street: string
    contacts: string

    logo?: File

    category_id?: string
    park_id: string
}

export type AddressInterface = {
    name: string
    description: string
    longitude: number
    latitude: number
}



export const addSupplierSchema =  Joi.object({
    name: Joi.string().required().messages({
        'string.empty': `Ce champ est requis`,
    }),
    niu: Joi.string().required().messages({
        'string.empty': `Ce champ est requis`,
    }),
    rccm: Joi.string().required().messages({
        'string.empty': `Ce champ est requis`,
    }),
    // social_reason: Joi.string().required().messages({
    //     'string.empty': `Ce champ est requis`,
    // }),
    business_name: Joi.string().allow('', null).messages({
        'string.pattern.base': `Format invalide`,
    }),
    city: Joi.string().allow('', null).messages({
        'string.pattern.base': `Format invalide`,
    }),
    phone: Joi.string().pattern(new RegExp('^[+]?[0-9]{10,15}$')).messages({
        'string.pattern.base': `Format de numéro de téléphone invalide`,
    }),
    email: Joi.string().email({ tlds: { allow: false } }).messages({
        'string.email': `Format d'email invalide`
    }),
    street: Joi.string().allow('', null).messages({
        'string.pattern.base': `Format invalide`,
    }),
})

export type AddClientInputs = {
    id?: string
    name: string
    phone: string
    email?: string
    address?: AddressInterface[]
    park_id: string
}


export const addClientSchema =  Joi.object<AddClientInputs>({
    name: Joi.string().required().messages({
        'string.empty': `Ce champ est requis`,
    }),
    phone: Joi.string().pattern(new RegExp('^[+]?[0-9]{10,15}$')).messages({
        'string.pattern.base': `Format de numéro de téléphone invalide`,
    }),
    email: Joi.string().optional().allow("").email({ tlds: { allow: false } }).messages({
        'string.email': `Format d'email invalide`
    }),
})


export type AddNewSupplierCtgInputs = {
    name: string
}

export const addNewSupplierCtgSchema =  Joi.object({
    name: Joi.string().required().messages({
        'string.empty': `Le nom de la catégorie est requis`,
    }),
})
