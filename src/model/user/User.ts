import Model from "@/model/Model";
import {AdminProfileResponseType} from "@/types/__form/profile.type";
import {ACCESS_TYPE} from "@/services/admin/settings/settingsService";

class UserProfile extends Model {

    public _instance: AdminProfileResponseType

    constructor(userProfileData: AdminProfileResponseType) {
        super();
        this._instance = userProfileData
    }

    static fromArray(datas: AdminProfileResponseType[]): UserProfile[] {
        return datas.map(data => new UserProfile(data));
    }

    get userID() {
        return this._instance.id;
    }

    get profileUserID() {
        return this._instance.user.id;
    }

    get cities() {
        return this._instance.admin_on_city
    }

    get username() {
        return this._instance.last_name + " " + this._instance.first_name
    }

    get roles() {
        return this._instance.admin_on_city[0].permissions
    }

    get readRoles() {
        return this._instance?.admin_on_city[0]?.permissions ?? []
    }

    get writeRoles() {
        return this._instance?.admin_on_city[0]?.permissions.filter(p => p.onglet.access === ACCESS_TYPE.WRITE) ?? []
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

    get firstName() {
        return this._instance.first_name
    }

    get lastName() {
        return this._instance.last_name
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
