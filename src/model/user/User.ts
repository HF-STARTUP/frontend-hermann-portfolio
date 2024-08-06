import Model from "@/model/Model";
import {AdminProfileResponseType, UserProfileResponseData} from "@/types/__form/profile.type";
import Permission from "@/model/user/Permission";
import Region from "@/model/location/Region";
import HisAccount from "@/model/user/HisAccount";
import AuthManagerGuard from "@/guard/AuthManagerGuard";

class UserProfile extends Model {

    private _instance: AdminProfileResponseType

    constructor(userProfileData: AdminProfileResponseType) {
        super();
        this._instance = userProfileData
    }

    get username() {
        return this._instance.last_name + " " + this._instance.first_name
    }

    get listPark() {
        return this._instance.admin_on_city
    }

    get defaultPark() {
        const default_park = this._instance.admin_on_city[0]
        return default_park
    }

    get getID() {
        return this._instance.id
    }

    get getOrganisationName() {
        return ''
    }

    get getOrganisationLogo() {
        return ''
    }

    get getUsername() {
        return this._instance.first_name
    }

    get isGranted() {
        return false
    }

    get parks() {
        return []
    }

    get getActiveCurrency() {
        return ""
    }


    get getActiveRegion() {
        return "Unknow"
    }

    get getUserFirstRegionCurrency() {
        return "Unknow"
    }

    get getCurrencyObj() {
        return "Unknow"
    }

}

export default UserProfile
