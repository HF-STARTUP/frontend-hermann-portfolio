import Model from "@/model/Model";
import { WaContactResponseType } from "@/types/whatsapp.type";

class WaContactModel extends Model {
    private _instance: WaContactResponseType;

    constructor(data: WaContactResponseType) {
        super();
        this._instance = data;
    }

    static fromResponse(data: WaContactResponseType): WaContactModel {
        return new WaContactModel(data);
    }

    get waId() {
        return this._instance.wa_id;
    }

    get displayName() {
        return this._instance.profile_name || this._instance.wa_id;
    }

    get profileId() {
        return this._instance.profile_id;
    }

    get hasVtcProfile() {
        return Boolean(this._instance.profile_id);
    }
}

export default WaContactModel;