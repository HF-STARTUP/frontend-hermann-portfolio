import {OWNER_TYPE, RegisterInputs, VerifyAccountInputs, VerifyOtpInputsToSave} from "@/schema/auth.schema";
import Service from "@/services/Service";
import {RegisterResponseData} from "@/types/__form/auth.type";
import {useMutation} from "@tanstack/react-query";


enum RegisterPath {
    VerifyUser = "/verify-user",
    VerifyUserOtp = "/register-verify-otp",
}

class RegisterService extends Service {

    private static instance = new RegisterService()
    private static registerPath = '/register'

    constructor() {
        super();
    }

    static getInstance() {
        return RegisterService.instance;
    }

    static async register(formData: RegisterInputs) {
        return await RegisterService.getInstance().execHttpRequest<RegisterResponseData>({
            url: RegisterService.registerPath,
            method: 'POST',
            secure: false,
            body: {...formData, owner_type: OWNER_TYPE.PROFESSIONNEL},
        })
    }

    static async verifyUser(formData: VerifyAccountInputs) {
        return await RegisterService.getInstance().execHttpRequest<RegisterResponseData>({
            url: RegisterPath.VerifyUser,
            method: 'POST',
            body: formData,
            secure: false
        })
    }

    static async verifyUserOtp(formData: VerifyOtpInputsToSave) {
        return await RegisterService.getInstance().execHttpRequest<{ code: string }>({
            url: RegisterPath.VerifyUserOtp,
            method: 'POST',
            body: formData,
            secure: false
        })
    }

    static useSubmitFormMutation() {
        return useMutation({mutationFn: RegisterService.register});
    }

    static useVerifyUserMutation() {
        return useMutation({mutationFn: RegisterService.verifyUser});
    }

    static useVerifyUserOtpMutation() {
        return useMutation({mutationFn: RegisterService.verifyUserOtp});
    }
}


export default RegisterService
