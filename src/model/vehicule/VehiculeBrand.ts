import Model from "@/model/Model";
import {VehiculeBrandResponseType, VehiculeBrandType, VehiculeTypeResponseType} from "@/types/vehicule.type";
import {VSelectProp} from "@/components/form/TextField";

class VehiculeBrand extends Model {
    public id: number;
    public name: string;

    constructor(vehiculeBrand: VehiculeBrandType) {
        super();
        this.id = vehiculeBrand.id
        this.name = vehiculeBrand.name
    }

    public static toVehiculeBrands(vrhiculeBrands: VehiculeBrandType[]) {
        return vrhiculeBrands.map(v => new VehiculeBrand(v))
    }

    static toVSelect(vehiculeBrands: VehiculeBrand[] | undefined) {

        if (!vehiculeBrands) {
            return []
        }
        return vehiculeBrands.map((vt, i) => ({
            label: vt.name,
            value: vt.id.toString()
        } as VSelectProp))

    }
}

export default VehiculeBrand
