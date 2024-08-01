import Model from "@/model/Model";
import { VSelectProp } from "@/components/form/TextField";

export type HourResponseType = {
    id: number;
    value: number;
};

class Hour extends Model {
    public id: number;
    public value: number;

    constructor(hour: HourResponseType) {
        super();
        this.id = hour.id;
        this.value = hour.value;
    }

    public get getHourDisplayName(){
        return `${this.value}h`
    }

    public static toHours(hours: HourResponseType[]): Hour[] {
        return hours.map(h => new Hour(h));
    }

    public static toVSelect(hours: Hour[] | undefined): VSelectProp[] {
        if (!hours) {
            return [];
        }
        return hours.map(h => ({
            label: h.getHourDisplayName,
            value: h.id.toString(),
        }));
    }
}

export default Hour;
