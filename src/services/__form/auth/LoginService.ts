import {LoginInputs, LoginVerifyOtpInputs} from "@/schema/auth.schema";
import Service from "@/services/Service";
import {AdminLoginResponseData, LoginOtpResponseData} from "@/types/__form/auth.type";
import {UserProfileResponseData} from "@/types/__form/profile.type";
import UserProfile from "@/model/user/User";

enum LoginType {
    partner = "partner",
    driver = "driver",
    agent = "agent"
}


class LoginService extends Service {

    private static instance: LoginService = new LoginService();
    private static loginPath = '/login-root'
    private static loginVerifyOtpPath = '/login-verify-otp'
    private static profilePath = '/profile'

    constructor() {
        super();
    }

    static getInstance() {
        return LoginService.instance;
    }

    static async login(formData: LoginInputs) {

        return await LoginService.getInstance().execHttpRequest<AdminLoginResponseData>({
            url: LoginService.loginPath,
            method: 'POST',
            secure: false,
            body: {...formData},
        })
    }

    static async loginVerifyUserOtp({otp, code, phone: identifier}: LoginVerifyOtpInputs) {

        const isEmail = LoginService.instance.isEmail(identifier)

        const data = isEmail ? {
            otp: otp,
            code: code,
            email: identifier
        } : {
            otp: otp,
            code: code,
            phone: identifier
        }

        return await LoginService.getInstance().execHttpRequest<LoginOtpResponseData>({
            url: LoginService.loginVerifyOtpPath,
            method: 'POST',
            secure: false,
            body: data
        })
    }

    static async getProfileInfo() {
        const request = await LoginService.getInstance().execHttpRequest<UserProfileResponseData[]>({
            url: LoginService.profilePath + ``,
            method: 'GET',
            secure: false,
        })


        return new UserProfile(request[0])
    }

}


export default LoginService
