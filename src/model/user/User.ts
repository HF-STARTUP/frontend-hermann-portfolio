import Model from "@/model/Model";
import {UserProfileResponseData} from "@/types/__form/profile.type";
import Permission from "@/model/user/Permission";
import Region from "@/model/location/Region";
import HisAccount from "@/model/user/HisAccount";

class UserProfile extends Model {

    private _instance: UserProfileResponseData

    constructor(userProfileData: UserProfileResponseData) {
        super();
        this._instance = userProfileData
    }

    get getID(){
        return this._instance.id
    }

    get getOrganisationName(){
        return this._instance.ets_name ?? ''
    }

    get getOrganisationLogo(){
        return this.resolveImage(this._instance.ets_logo ?? '')
    }

    get getUsername(){
        return this._instance.first_name
    }

    get isGranted(){
        return this._instance ? !!this._instance.ets_logo : false
    }

    get getOrganisationCity(){
        return this._instance.parks[0].city
    }

    get getParkID(){
        return this._instance.parks[0].id
    }

    get parks(){
        return this._instance.parks
    }

    get getActiveCurrency(){
        return this._instance.parks[0].currency
    }


    get getActiveRegion(){
        return "Unknow"
    }

    get getUserFirstRegionCurrency(){
        return "Unknow"
    }

    get getCurrencyObj(){
        return "Unknow"
    }

}

export default UserProfile
