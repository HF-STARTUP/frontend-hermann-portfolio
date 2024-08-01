import Model from "@/model/Model";
import {VehiculeModelType, VehiculeTypeResponseType} from "@/types/vehicule.type";
import {VSelectProp} from "@/components/form/TextField";

class VehiculeModel extends Model {
    public id: number;
    public name: string;

    constructor(vehiculeModel: VehiculeModelType) {
        super();
        this.id = vehiculeModel.id
        this.name = vehiculeModel.name
    }

    public static toVehiculeModel(vrhiculeModels: VehiculeModelType[]) {
        return vrhiculeModels.map(v => new VehiculeModel(v))
    }

    static toVSelect(vehiculeModels: VehiculeModel[] | undefined) {
        if (!vehiculeModels) {
            return []
        }
        return vehiculeModels.map((vm, i) => ({
            label: vm.name,
            value: vm.id.toString()
        } as VSelectProp))

    }
}

export default VehiculeModel
