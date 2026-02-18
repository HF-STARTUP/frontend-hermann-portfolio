import Joi from "joi"
import { _JoiConfig } from "@/schema/_joiConfig"
import type {
  CreatePromoCodeFormData,
  CreatePromoCodePayload,
  CreateSalesAgentPayload,
} from "@/types/marketing.types"

const CODE_TYPE_VALUES = ["NEW_CLIENT", "LOYALTY", "FREE_COUPON", "COMMERCIAL_RENDITION"] as const
const DISCOUNT_TYPE_VALUES = ["FIXED_AMOUNT", "PERCENTAGE", "FREE_PERIOD"] as const

export const createPromoCodeSchema = Joi.object<CreatePromoCodePayload>({
  code_label: _JoiConfig.strRequired,
  code_type: Joi.string()
    .valid(...CODE_TYPE_VALUES)
    .required()
    .messages({ "any.only": "Type de code invalide" }),
  discount_type: Joi.string()
    .valid(...DISCOUNT_TYPE_VALUES)
    .required()
    .messages({ "any.only": "Type de réduction invalide" }),
  discount_value: _JoiConfig.numberRequired,
  validity_days: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      "number.base": "Champ requis",
      "number.min": "La validité doit être au moins 1 jour",
    }),
  max_usage_per_user: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      "number.base": "Champ requis",
      "number.min": "L'utilisation max doit être au moins 1",
    }),
  is_stackable: Joi.boolean().required().messages({
    "any.required": "Champ requis",
  }),
})

export const createPromoCodeFormSchema = Joi.object<CreatePromoCodeFormData>({
  code_label: _JoiConfig.strRequired.messages({
    "string.empty": "Le libellé est requis",
  }),
  code_type: Joi.string()
    .valid(...CODE_TYPE_VALUES)
    .required()
    .messages({ "any.only": "Type de code invalide" }),
  discount_type: Joi.string()
    .valid(...DISCOUNT_TYPE_VALUES)
    .required()
    .messages({ "any.only": "Type de réduction invalide" }),
  discount_value: Joi.string()
    .required()
    .custom((v, helpers) => {
      const n = Number(v)
      if (v === "" || Number.isNaN(n)) return helpers.error("number.base")
      if (n < 0) return helpers.error("number.min")
      return v
    })
    .messages({
      "number.base": "La valeur est requise",
      "number.min": "La valeur doit être positive",
    }),
  validity_days: Joi.string()
    .required()
    .custom((v, helpers) => {
      const n = Number(v)
      if (v === "" || Number.isNaN(n)) return helpers.error("number.base")
      if (n < 1) return helpers.error("number.min")
      return v
    })
    .messages({
      "number.base": "Champ requis",
      "number.min": "La validité doit être au moins 1 jour",
    }),
  max_usage_per_user: Joi.string()
    .required()
    .custom((v, helpers) => {
      const n = Number(v)
      if (v === "" || Number.isNaN(n)) return helpers.error("number.base")
      if (n < 1) return helpers.error("number.min")
      return v
    })
    .messages({
      "number.base": "Champ requis",
      "number.min": "L'utilisation max doit être au moins 1",
    }),
  is_stackable: Joi.boolean().required().messages({
    "any.required": "Champ requis",
  }),
})

export const createSalesAgentSchema = Joi.object<CreateSalesAgentPayload>({
  first_name: _JoiConfig.strRequired.messages({
    "string.empty": "Le prénom est requis",
  }),
  last_name: _JoiConfig.strRequired.messages({
    "string.empty": "Le nom est requis",
  }),
  phone: _JoiConfig.phoneRequired,
  country_id: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      "number.base": "Le pays est requis",
      "number.min": "Le pays est requis",
    }),
  email: _JoiConfig.strOptionnal.email({ tlds: { allow: false } }).messages({
    "string.email": "Format d'email invalide",
  }),
})

export const createSalesAgentFormSchema = createSalesAgentSchema
