import {AxiosRequestHeaders} from "axios";

export type SystemHttpCodeType = {
    readonly SUCCESS: 5000;
    readonly FAILURE: 5001;
    readonly NOT_FOUND: 5003;
    readonly VALIDATION_ERROR: 5004;
    readonly NO_TOKEN: 5005;
    readonly INVALID_TOKEN: 5006;
    readonly NOT_AUTHORIZED: 5007;
    readonly WRONG_PASSWORD: 5008;
    readonly ALREADY_EXIST: 5009;
    readonly NOT_VERIFIED: 5010;
    readonly INVALID_PROFIL: 5011;
};

export type SystemHttpCodeGeneric = 5000 | 5001 | 5003 | 5004 | 5005 | 5006 | 5007 | 5008 | 5009 | 5010 | 5011


export type GlobalResponseType<T> = {
    message: string
    code: SystemHttpCodeGeneric
    data: T
}


export type ExecHttpRequestOptionType = {
    url: string,
    method: 'GET' | 'POST' | 'PUT' | "DELETE",
    headers?: AxiosRequestHeaders
    body?: any,
    toFormdata?: boolean,
    secure?: boolean
}
