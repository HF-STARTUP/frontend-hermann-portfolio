import Model from "@/model/Model";
import {VehiculeTypeResponseType} from "@/types/vehicule.type";
import {VSelectProp} from "@/components/form/TextField";

class VehiculeType extends Model {
    private id: number;
    public name: string;

    constructor(vehiculeType: VehiculeTypeResponseType) {
        super();
        this.id = vehiculeType.id
        this.name = vehiculeType.name
    }

    public static toVehiculeTypes(vehiculeType: VehiculeTypeResponseType[]) {
        return vehiculeType.map(v => new VehiculeType(v))
    }

    static toVSelect(vehiculeTypes: VehiculeType[] | undefined) {
        if (!vehiculeTypes) {
            return []
        }
        return vehiculeTypes.map((vt, i) => ({
            label: vt.name,
            value: vt.id.toString()
        } as VSelectProp))

    }
}

export default VehiculeType
