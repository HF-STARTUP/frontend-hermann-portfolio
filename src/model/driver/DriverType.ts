import Model from "@/model/Model";
import {VSelectProp} from "@/components/form/TextField";
import {DriverTypeResponseType} from "@/types/driver.type";

class DriverType extends Model {
    public id: number;
    public name: string;

    constructor(driverType: DriverTypeResponseType) {
        super();
        this.id = driverType.id;
        this.name = driverType.name;
    }

    public static toDriverTypes(driversType: DriverTypeResponseType[]): DriverType[] {
        return driversType.map(v => new DriverType(v));
    }

    public static toVSelect(driversType: DriverType[] | undefined): VSelectProp[] {
        if (!driversType) {
            return [];
        }
        return driversType.map((dt) => ({
            label: dt.name,
            value: dt.id.toString(),
        }));
    }
}

export default DriverType;
