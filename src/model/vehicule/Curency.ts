import Model from "@/model/Model";
import {CurencyResponseType} from "@/types/vehicule.type";
import {VSelectProp} from "@/components/form/TextField";

class Curency extends Model {
    public id: number;
    public name: string;
    public country_code: string;

    constructor(curency: CurencyResponseType) {
        super();
        this.id = curency.id
        this.name = curency.name
        this.country_code = curency.country_code
    }

    public static toCurencies(curencies: CurencyResponseType[]) {
        return curencies.map(v => new Curency(v))
    }

    static toVSelect(curencies: Curency[] | undefined) {

        if (!curencies) {
            return []
        }
        return curencies.map((vc, i) => ({
            label: vc.name,
            value: vc.id.toString()
        } as VSelectProp))

    }

    get getCurrency(){

        return this.name
    }
}

export default Curency
