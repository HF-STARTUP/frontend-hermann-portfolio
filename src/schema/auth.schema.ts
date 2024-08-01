import Joi from "joi";
import {_JoiConfig} from "@/schema/_joiConfig";

export type RegisterInputs = {
    first_name: string
    name: string
    logo: File
    city_id: string
    email: string
    phone: string
    password: string
    uuid_code?: string

    currency_id: string
}

export type LoginInputs = {
    email: string
    password: string,

    identifier?: string
}

export enum OWNER_TYPE {
    PARTICULIER = 'particulier',
    PROFESSIONNEL = 'professionnel',
}


export const registerSchema = Joi.object({
    email: _JoiConfig.emailRequired,
    phone: _JoiConfig.phoneRequired,
    name: _JoiConfig.strRequired,
    first_name: Joi.string().required().messages({
        'string.empty': `Le nom de l'utilisateur est requis`,
    }),
    password: Joi.string().min(8).max(32).required().messages({
            'string.empty': `Le mot de passe est requis`,
            'string.min': `Le mot de passe doit contenir au moins 8 caractères`,
            'string.max': `Le mot de passe ne doit pas dépasser 32 caractères`,
            'string.pattern.base': `Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial (!@#$%^&*)`
        }),
});

export const loginSchema = Joi.object<LoginInputs>({
    identifier: _JoiConfig.strRequired,
    password: Joi.string().required()
        .messages({
            'string.empty': `Le mot de passe est requis`,
        }),
});

export type VerifyAccountInputs = {
    email: string
    phone: string
}

export const verifyAccountSchema:Joi.ObjectSchema<VerifyAccountInputs> = Joi.object({
    email: _JoiConfig.emailRequired,
    phone: _JoiConfig.strRequired,
});



export type VerifyOtpInputs = {
    code: string
}

export type VerifyOtpInputsToSave = {
    otp: string,
    email: string,
    phone: string
}

export type LoginVerifyOtpInputs = {
    otp: string,
    code: string,
    phone: string
}

export const verifyOtpSchema:Joi.ObjectSchema<VerifyOtpInputs> = Joi.object({
    code: _JoiConfig.strRequired,
});



///-LISTE DE DIFFUSION, -SUIVRE UNE PAGE -SUIVRE UN ORGANISATEUR -RECHERCHER UN ORGANISATEUR