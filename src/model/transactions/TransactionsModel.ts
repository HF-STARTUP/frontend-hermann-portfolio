import { TransactionItem } from "@/types/transactions.type";
import Model from "../Model";
import { formatNumber } from "@/lib/utils";

export class TransactionsModel extends Model {
  private _instance: TransactionItem;

  constructor(data: TransactionItem) {
    super();
    this._instance = data;
  }

  static toArray(items?: TransactionItem[]): TransactionsModel[] {
    return (items || []).map((item) => new TransactionsModel(item));
  }

  get parkId(): number {
    return this._instance.park_id;
  }

  get fleetName(): string {
    return this._instance.fleet_name;
  }

  get ownerName(): string {
    return this._instance.owner_name;
  }

  get accountType(): string {
    return this._instance.account_type;
  }

  get paymentMethod(): string {
    return this._instance.payment_method??"---";
  }

  get totalAmount(): number {
    return this._instance.total_amount;
  }

  get formattedTotalAmount(): string {
    return formatNumber(this._instance.total_amount);
  }

  get totalFees(): number {
    return this._instance.total_fees;
  }

  get formattedTotalFees(): string {
    return formatNumber(this._instance.total_fees);
  }

  get commissionVtcc(): number {
    return this._instance.commission_vtcc;
  }

  get formattedCommissionVtcc(): string {
    return formatNumber(this._instance.commission_vtcc);
  }
}