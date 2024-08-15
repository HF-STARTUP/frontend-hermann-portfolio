import Joi from "joi";
import {_JoiConfig} from "@/schema/_joiConfig";
import {TASK_STATUS} from "@/types/entretien.types";


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


