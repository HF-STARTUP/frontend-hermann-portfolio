import Joi from "joi";
import {ACCOUNTING_TYPE} from "@/types/Accounting.types";
import {_JoiConfig} from "@/schema/_joiConfig";

export type CreateAccountingOrSubAccountingInput = {
    type?: ACCOUNTING_TYPE,
    park_id?: string,
    account_id?: string,
    name: string
}

export const createAccountingSchema = Joi.object<CreateAccountingOrSubAccountingInput>({
    type: _JoiConfig.strRequired,
    name: _JoiConfig.strRequired,
    account_id: _JoiConfig.strOptionnal
})


export type CreateFundMovementInput = {
    account_id: string,
    sub_account_id?: string,
    amount: number
}

export const createFundMovementSchema = Joi.object<CreateFundMovementInput>({
    account_id: _JoiConfig.strRequired,
    sub_account_id: _JoiConfig.strOptionnal,
    amount: _JoiConfig.numberRequired
})


