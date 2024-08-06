import {SystemHttpCodeType} from "@/types/network/http";

const SYSTEM_HTTP_CODE: SystemHttpCodeType = {
    SUCCESS: 5000,
    FAILURE: 5001,
    NOT_FOUND: 5003,
    VALIDATION_ERROR: 5004,
    NO_TOKEN: 5005,
    INVALID_TOKEN: 5006,
    NOT_AUTHORIZED: 5007,
    WRONG_PASSWORD: 5008,
    ALREADY_EXIST: 5009,
    NOT_VERIFIED: 5010,
    INVALID_PROFIL: 5011
};

export default SYSTEM_HTTP_CODE
