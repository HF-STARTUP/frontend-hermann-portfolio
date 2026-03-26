import Joi from "joi";
import {_JoiConfig} from "@/schema/_joiConfig";
import {TASK_STATUS} from "@/types/entretien.types";
import {ACCESS_TYPE} from "@/services/admin/settings/settingsService";


export type UpdateProfileInput = {
    id: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    birthday?: Date;
    image?: string | File
}

export const updateProfileInputSchema = Joi.object<UpdateProfileInput>({
    first_name: _JoiConfig.strOptionnal,
    last_name: _JoiConfig.strOptionnal,
    email: _JoiConfig.strOptionnal,
    birthday: _JoiConfig.strOptionnal,
})


export type UpdatePasswordInput = {
    email?: string
    old_password: string
    new_password: string
    new_password_confirm: string
}

export const updatePasswordInputSchema = Joi.object<UpdatePasswordInput>({
    old_password: _JoiConfig.strRequired,
    new_password: Joi.string()
        .min(8)
        .pattern(new RegExp('(?=.*[a-z])'))
        .pattern(new RegExp('(?=.*[A-Z])'))
        .pattern(new RegExp('(?=.*[0-9])'))
        .pattern(new RegExp('(?=.*[!@#$%^&*])'))
        .messages({
            'string.min': 'Le mot de passe doit contenir au moins 8 caractères.',
            'string.pattern.base': 'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.',
        })
        .required(),
    new_password_confirm: Joi.string().valid(Joi.ref('new_password')).required().messages({
        'any.only': 'Les mots de passe ne correspondent pas.'
    })
})

export interface AdminAccessType {
    access_id: number
    type: ACCESS_TYPE
}

export type AddAdminInput = {
    email: string
    phone: string
    cities_id: number[]
    first_name: string
    last_name: string
    role_id: string
    // password?: string
}

export type AddAdminOnCityInput = {
    "last_name"?: string,
    "first_name"?: string,
    "access": UserAccess[],
    "city_id": string,
    "user_id": string
}

export type RemoveAdminOnCityInput = {
    city_id: string,
    user_id: string
}

export type UserAccess = {
    "access_id": number,
    "type": "read" | "write"
}

export const AddAdminInputSchema = Joi.object<AddAdminInput>({
    email: _JoiConfig.emailRequired,
    phone: _JoiConfig.phoneRequired,
    first_name: _JoiConfig.strRequired,
    last_name: _JoiConfig.strRequired,
    cities_id: Joi.array().items(Joi.number()).required(),
    role_id: _JoiConfig.strRequired,
    // password: _JoiConfig.strRequired
})


