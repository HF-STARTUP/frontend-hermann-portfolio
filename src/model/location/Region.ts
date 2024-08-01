import Model from "@/model/Model";
import {RegionType} from "@/types/__form/profile.type";
import Curency from "@/model/vehicule/Curency";

class Region extends Model {
    id: string;
    name: string;
    zone: string | null;
    latitude: number | null;
    longitude: number | null;
    account_id: string;
    city_id: number;
    currency: Curency|null;

    constructor(regionData: RegionType) {
        super();
        this.id = regionData.id;
        this.name = regionData.name;
        this.zone = regionData.zone;
        this.latitude = regionData.latitude;
        this.longitude = regionData.longitude;
        this.account_id = regionData.account_id;
        this.city_id = regionData.city_id;
        this.currency = regionData.currency&&new Curency(regionData.currency)
    }

    static toRegions(regions: RegionType[]): Region[] {
        return regions.map(region => new Region(region));
    }

    get getRegionCurrency(){
        return this.currency&&this.currency.getCurrency
    }

    get getCurrency(){
        return this.currency
    }

}

export default Region;
