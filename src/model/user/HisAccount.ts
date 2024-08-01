import Model from "@/model/Model";
import {HisAccountType} from "@/types/__form/profile.type";
import Region from "@/model/location/Region";

class HisAccount extends Model {
    id: string;
    status: boolean;
    activated_at: Date | null;
    created_at: Date;
    blocked_at: Date | null;
    updated_at: Date;
    owner_id: string;
    regions: Region[];

    constructor(hisAccountData: HisAccountType) {
        super();
        this.id = hisAccountData.id;
        this.status = hisAccountData.status;
        this.activated_at = hisAccountData.activated_at ? new Date(hisAccountData.activated_at) : null;
        this.created_at = new Date(hisAccountData.created_at);
        this.blocked_at = hisAccountData.blocked_at ? new Date(hisAccountData.blocked_at) : null;
        this.updated_at = new Date(hisAccountData.updated_at);
        this.owner_id = hisAccountData.owner_id;
        this.regions = Region.toRegions(hisAccountData.regions);
    }

}

export default HisAccount;
