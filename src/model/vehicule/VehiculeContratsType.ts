import Model from "@/model/Model";
import {VehiculeContratTypeResponseType} from "@/types/vehicule.type";
import {VSelectProp} from "@/components/form/TextField";

class VehiculeContratsType extends Model {
    public id: number;
    public name: string;

    constructor(contratsType: VehiculeContratTypeResponseType) {
        super();
        this.id = contratsType.id
        this.name = contratsType.name
    }

    public static toVehiculeContratsType(vehiculeModels: VehiculeContratTypeResponseType[]) {
        return vehiculeModels.length ? vehiculeModels.map(v => new VehiculeContratsType(v)) : []
    }

    static toVSelect(contratsType: VehiculeContratTypeResponseType[] | undefined) {
        if (!contratsType) {
            return []
        }
        return contratsType.map((vct, _) => ({
            label: vct.name,
            value: vct.id.toString()
        } as VSelectProp))

    }
}

export default VehiculeContratsType
