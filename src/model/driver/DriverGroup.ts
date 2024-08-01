import Model from "@/model/Model";
import {DriverGroupResponseType, RoleResponseType} from "@/types/driver.type";
import {VSelectProp} from "@/components/form/TextField";

export class DriverGroup extends Model {
    public id: number;
    public name: string;

    constructor(data: RoleResponseType) {
        super();
        this.id = data.id;
        this.name = data.name;
    }

    public static toDriverGroups(datas: DriverGroupResponseType[]): DriverGroup[] {
        return datas.map(v => new DriverGroup(v));
    }

    public static toVSelect(datas: DriverGroup[] | undefined): VSelectProp[] {
        if (!datas) {
            return [];
        }
        return datas.map((dg) => ({
            label: dg.name,
            value: dg.id.toString(),
        }));
    }
}
