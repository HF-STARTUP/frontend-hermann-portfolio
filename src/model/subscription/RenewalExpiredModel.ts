import Model from "@/model/Model";
import { RenewalEvolutionData, RenewalSeries } from "@/types/supplier.type";

export class RenewalEvolutionModel extends Model {
    private _series: RenewalSeries[];

    constructor(data: RenewalEvolutionData) {
        super();
        this._series = data?.series || [];
    }


    get labels(): string[] {
        return this._series.map(s => s.period);
    }

    get renewalsValues(): number[] {
        return this._series.map(s => s.renewals);
    }

    get expiredValues(): number[] {
        return this._series.map(s => s.expired);
    }

    get hasData(): boolean {
        return this._series.length > 0;
    }
}