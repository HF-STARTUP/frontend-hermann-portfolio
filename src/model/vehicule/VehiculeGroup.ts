import Model from "@/model/Model";
import {VehiculeGroupResponseType, VehiculeTypeResponseType} from "@/types/vehicule.type";
import {VSelectProp} from "@/components/form/TextField";

class VehiculeGroup extends Model {
    private id: number;
    private name: string;

    constructor(vehiculeType: VehiculeTypeResponseType) {
        super();
        this.id = vehiculeType.id
        this.name = vehiculeType.name
    }

    public static toArray(vehiculeType: VehiculeGroupResponseType[]) {
        return vehiculeType.map(v => new VehiculeGroup(v)).reverse()
    }

    static toVSelect(vehiculeGroup: VehiculeGroup[] | undefined) {
        if (!vehiculeGroup) {
            return []
        }
        return vehiculeGroup.map((vt, i) => ({
            label: vt.name,
            value: vt.id.toString()
        } as VSelectProp))

    }

    public get getID(){
        return this.id
    }

    public get getDisplayName(){
        return this.name
    }

    public get getFilterToken(){
        return this.getDisplayName
    }

    public get getFindToken(){
        return this.getDisplayName
    }

}

export default VehiculeGroup


