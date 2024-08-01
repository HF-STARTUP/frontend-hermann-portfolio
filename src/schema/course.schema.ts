import Joi from "joi";
import {_JoiConfig} from "@/schema/_joiConfig";
import {TASK_STATUS} from "@/types/entretien.types";


export type CreateCourseInputs = {
    start_date?:    Date;
    end_date?:      Date;
    start_address?: CourseAddress;
    end_address?:   CourseAddress;
    park_id?:       string;
    vehicle_id?:    string;
    client_id?:     string;
    amount?:        number;

    //send to server without this data
    start_hour?: string,
    end_hour?: string

    //Only available on update
    course_id?: string
    status?: TASK_STATUS
}


export type CourseAddress = {
    name:        string;
    description: string;
    longitude:   number;
    latitude:    number;
}


export const createCourseSchema =  Joi.object<CreateCourseInputs>({
    start_date: _JoiConfig.dateRequired,
    start_hour: _JoiConfig.hourRequired,

    end_date:_JoiConfig.dateRequired,
    end_hour: _JoiConfig.hourRequired,

    amount: _JoiConfig.numberRequired
})

