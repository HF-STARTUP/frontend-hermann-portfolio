import Joi from "joi"
import { _JoiConfig } from "@/schema/_joiConfig"
import type { CreatePromoCodePayload } from "@/types/marketing.types"

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
