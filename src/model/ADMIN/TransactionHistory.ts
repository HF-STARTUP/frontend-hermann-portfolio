import { SubscriptionMethodMap } from "@/app/(webapp)/app/fleet/utils";
import { formatNumber } from "@/lib/utils";
import Model from "@/model/Model";
import {
  TransactionHistoryItem,
  TransactionOperator,
  TransactionProfile,
} from "@/types/admin/fleet.type";

class TransactionHistoryModel extends Model {
  private _instance: TransactionHistoryItem;

  constructor(data: TransactionHistoryItem) {
    super();
    this._instance = data || {
      id: "-",
      status: "-",
      created_at: "-",
      amount: 0,
      transaction_type: "-",
      fees: 0,
      commission: null,
      payment_method: null,
      collect_type: "-",
      reason: null,
      sold_before: null,
      sold_after: null,
      operator: null,
      withdraw_on_park: null,
      profile_who_perform_credit: null,
      profile_who_perform_withdraw: null,
      label: "-",
    };
  }

  static toArray(datas: TransactionHistoryItem[]): TransactionHistoryModel[] {
    if (!datas) return [];
    return datas.map((item) => new TransactionHistoryModel(item));
}

  get id(): string {
    return this._instance.id ?? "-";
  }

  get status(): string {
    return this._instance.status ?? "-";
  }

  get created_at(): string {
    return this._instance.created_at ?? "-";
  }

  get formattedDate(): string {
    if (!this._instance.created_at) return "-";
    return this.formatDateTime(this._instance.created_at);
  }

  get amount(): string {
    return formatNumber(this._instance.amount ?? 0);
  }

  get transaction_type() {
    return this._instance.transaction_type ?? "-";
  }

  get fees(): string {
    return formatNumber(this._instance.fees ?? 0);
  }

  get commission(): string {
    return formatNumber(this._instance.commission ?? 0);
  }

  get payment_method(): string {
    return this._instance.payment_method?SubscriptionMethodMap[this._instance.payment_method]:"-";
  }

  get collect_type(): string {
    return this._instance.collect_type ?? "-";
  }

  get reason(): string | null {
    return this._instance.reason ?? null;
  }

  get sold_before(): number | null {
    return this._instance.sold_before ?? null;
  }

  get sold_after(): number | null {
    return this._instance.sold_after ?? null;
  }

  get operator(): TransactionOperator | null {
    return this._instance.operator;
  }

  get profile_who_perform_credit(): TransactionProfile | null {
    return this._instance.profile_who_perform_credit;
  }

  get transctioDirection() {
    return this.profile_who_perform_credit !== null ? "Entrée" : "Sortie";
  }

  get label(): string {
    return this._instance.label ?? "-";
  }
}

export default TransactionHistoryModel;
