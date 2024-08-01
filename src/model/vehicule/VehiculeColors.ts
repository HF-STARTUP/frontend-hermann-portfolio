import Model from "@/model/Model";
import {
    VehiculeColorType,
    VehiculeContratTypeResponseType,
    VehiculeModelType,
    VehiculeTypeResponseType
} from "@/types/vehicule.type";
import {VSelectProp} from "@/components/form/TextField";

class VehiculeColors extends Model {
    public id: number;
    public name: string;

    constructor(vehiculeColors: VehiculeColorType) {
        super();
        this.id = vehiculeColors.id
        this.name = vehiculeColors.name
    }

    public static toVehiculeColors(vehiculeModels: VehiculeColorType[]) {
        return vehiculeModels.map(v => new VehiculeColors(v))
    }

    static toVSelect(vehiculeColors: VehiculeColorType[] | undefined) {
        if (!vehiculeColors) {
            return []
        }
        return vehiculeColors.map((vc, _) => ({
            label: vc.name,
            value: vc.id.toString()
        } as VSelectProp))

    }
}

export default VehiculeColors
