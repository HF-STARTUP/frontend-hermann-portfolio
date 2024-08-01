import Joi from "joi";
import {_JoiConfig} from "@/schema/_joiConfig";
import {AddDrawalInputs} from "@/types/drawal.types";


export const addDrawalSchema = Joi.object<AddDrawalInputs>({
    title: _JoiConfig.strRequired,
    phone_number: _JoiConfig.phoneRequired,
});
