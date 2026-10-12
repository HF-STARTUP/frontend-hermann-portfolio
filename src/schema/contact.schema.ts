import Joi from "joi";
import { _JoiConfig } from "@/schema/_joiConfig";

export type ContactInputs = {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export const contactSchema = Joi.object({
    name: _JoiConfig.strRequired.messages({
        'string.empty': `Votre nom est requis`,
    }),
    email: _JoiConfig.emailRequired,
    subject: _JoiConfig.strRequired.messages({
        'string.empty': `Le sujet est requis`,
    }),
    message: Joi.string().min(10).max(2000).required().messages({
        'string.empty': `Votre message est requis`,
        'string.min': `Votre message doit contenir au moins 10 caractères`,
        'string.max': `Votre message ne doit pas dépasser 2000 caractères`,
    }),
})
