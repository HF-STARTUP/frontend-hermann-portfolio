import { formatNumber } from "@/lib/utils";
import Model from "@/model/Model";
import { TransactionKpiData } from "@/types/admin/fleet.type";

/**
 * Modèle pour les données de transaction
 */
class TransactionKpiModel extends Model {
    private _instance: TransactionKpiData;

    constructor(data: TransactionKpiData) {
        super();
        this._instance = data || {
            period: { start_date: "-", end_date: "-" },
            incoming: { count: 0, total_amount: 0 },
            outgoing: { count: 0, total_amount: 0 },
            total_fees: 0,
            total_commission_vtcc: 0,
        };
    }

    static fromData(data: TransactionKpiData): TransactionKpiModel {
        return new TransactionKpiModel(data);
    }

    get startDate():Date{
        return new Date(this._instance.period.start_date)
    }

    get endDate():Date{
        return new Date(this._instance.period.end_date)
    }

    get incomingCount(): number{
        return this._instance.incoming.count ?? 0
    }

    get incomingAmount(): string{
        return formatNumber(this._instance.incoming.total_amount ?? 0)
    }

    get outgoingCount(): number{
        return this._instance.outgoing.count ?? 0
    }

    get outgoingAmount(): string{
        return formatNumber(this._instance.outgoing.total_amount ?? 0)
    }

    get transactionFeesAmount(): string{
        return formatNumber(this._instance.total_fees??0)
    }

    get commissionsAmount():string{
        return formatNumber(this._instance.total_commission_vtcc??0)
    }
}

export default TransactionKpiModel;