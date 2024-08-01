import Model from "@/model/Model";
import {ContractTypeResponseType} from "@/types/vehicule.type";
import {VSelectProp} from "@/components/form/TextField";

class VehiculeContract extends Model {
    public id: number;
    public name: string;

    constructor(contractType: ContractTypeResponseType) {
        super();
        this.id = contractType.id
        this.name = contractType.name
    }

    public static toVehiculeModel(contractTypes: ContractTypeResponseType[]) {
        return contractTypes.map(v => new VehiculeContract(v))
    }

    static toVSelect(contractTypes: VehiculeContract[] | undefined) {
        if (!contractTypes) {
            return []
        }
        return contractTypes.map((vct, i) => ({
            label: vct.name,
            value: vct.id.toString()
        } as VSelectProp))

    }
}

export default VehiculeContract
