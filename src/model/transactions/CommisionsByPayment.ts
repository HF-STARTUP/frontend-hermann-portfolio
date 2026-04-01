import { CommissionByPayementMethodData } from "@/types/transactions.type";
import Model from "../Model";
import { formatNumber } from "@/lib/utils";

export class PaymentMethodItemModel extends Model {
  constructor(private _instance: { paymentMethod: string; amount: number; percentage: number }) {
    super();
  }

  get name(): string {
    return this._instance.paymentMethod;
  }

  get amount(): number {
    return this._instance.amount;
  }

  get formattedAmount(): string {
    return formatNumber(this._instance.amount);
  }

  get percentage(): number {
    return this._instance.percentage;
  }

  get formattedPercentage(): string {
    return `${this._instance.percentage}%`;
  }
}

export class CommissionByPaymentMethodModel extends Model {
  private _instance: CommissionByPayementMethodData;

  constructor(data: CommissionByPayementMethodData) {
    super();
    this._instance = data;
  }

  get total(): number {
    return this._instance?.total ?? 0;
  }

  get formattedTotal(): string {
    return formatNumber(this.total);
  }

  get byPaymentMethod(): PaymentMethodItemModel[] {
    return (this._instance?.byPaymentMethod || []).map(
      (item) => new PaymentMethodItemModel(item)
    );
  }

  get count(): number {
    return this._instance?.byPaymentMethod?.length ?? 0;
  }
}