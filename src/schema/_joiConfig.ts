import Joi from "joi";


const DEFAULT_EMPTY_INPUT_CALLBACK_MESSAGE = `Champ requis`


export const _JoiConfig = {
    emailRequired: Joi.string().email({tlds: {allow: false}}).required().messages({
        'string.empty': `L'email est requis !`,
        'string.email': `Format d'email invalide`
    }),
    phoneRequired: Joi.string().pattern(new RegExp('^[+]?[0-9]{10,15}$')).required().messages({
        'string.empty': `Le numéro de téléphone est requis`,
        'string.pattern.base': `Format de numéro de téléphone invalide`
    }),
    strRequired: Joi.string().required().messages({
        'string.empty': `Ce champ est resquis`,
    }),
    strOptionnal: Joi.string().optional().allow("").messages({
        'string.base': `Champ invalide`,
    }),
    numberRequired: Joi.number()
        .required()
        .messages({
            'number.base': DEFAULT_EMPTY_INPUT_CALLBACK_MESSAGE,
            'number.empty': DEFAULT_EMPTY_INPUT_CALLBACK_MESSAGE,
            'number.required': DEFAULT_EMPTY_INPUT_CALLBACK_MESSAGE
        }),

    dateRequired: Joi.date().required().messages({
        'date.base': DEFAULT_EMPTY_INPUT_CALLBACK_MESSAGE,
        'any.required': DEFAULT_EMPTY_INPUT_CALLBACK_MESSAGE
    }),

    hourRequired: Joi.string().required().messages({
        'string.base': DEFAULT_EMPTY_INPUT_CALLBACK_MESSAGE,
        'any.required': DEFAULT_EMPTY_INPUT_CALLBACK_MESSAGE
    }),
}