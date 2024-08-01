import Model from "@/model/Model";
import {TagResponseType, VehicleTagResponseType} from "@/types/vehicule.type";
import {VSelectProp} from "@/components/form/TextField";

class VehicleTag extends Model {
    public vehicle_id: number;
    public tag_id: number;
    public tag: Tag;

    constructor(data: VehicleTagResponseType) {
        super();
        this.vehicle_id = data.vehicle_id;
        this.tag_id = data.tag_id;
        this.tag = new Tag(data.tag);
    }

    public static toVehicleTags(datas: VehicleTagResponseType[]): VehicleTag[] {
        return datas.map(v => new VehicleTag(v));
    }

    public static toVSelect(datas: VehicleTag[] | undefined): VSelectProp[] {
        if (!datas) {
            return [];
        }
        return datas.map((vt) => ({
            label: vt.tag.name,
            value: vt.tag.id.toString(),
        }));
    }

    get getTagName(){
        return this.tag.name
    }
}

class Tag {
    public id: number;
    public name: string;

    constructor(data: TagResponseType) {
        this.id = data.id;
        this.name = data.name.trim();
    }
}
