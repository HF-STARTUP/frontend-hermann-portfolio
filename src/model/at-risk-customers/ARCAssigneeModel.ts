import Model from "@/model/Model";
import { ARCAssigneeResponseType } from "@/types/at-risk-customers.type";

class ARCAssigneeModel extends Model {
    private _instance: ARCAssigneeResponseType;

    constructor(data: ARCAssigneeResponseType) {
        super();
        this._instance = data;
    }

    static toArrays(datas: ARCAssigneeResponseType[]): ARCAssigneeModel[] {
        return datas.map((data) => new ARCAssigneeModel(data));
    }

    get profileId() { return this._instance.profile_id; }
    get firstName() { return this._instance.first_name?.trim() ?? ""; }
    get lastName() { return this._instance.last_name?.trim() ?? ""; }

    get fullName(): string {
        return this.toName(`${this.firstName} ${this.lastName}`);
    }

    get avatarUrl() {
        return this._instance.avatar_url ? this.resolveImage(this._instance.avatar_url) : undefined;
    }
}

export default ARCAssigneeModel;