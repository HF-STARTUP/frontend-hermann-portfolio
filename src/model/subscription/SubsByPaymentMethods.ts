import Model from "@/model/Model";
import {
  PaymentMethodStat,
  SubscriptionsByPaymentData,
} from "@/types/supplier.type";

/**
 * MODELE 1 : PaymentMethodStat
 * Gère l'unité (un moyen de paiement)
 */
export class PaymentMethodStatModel extends Model {
  private _instance: PaymentMethodStat;

  constructor(data: PaymentMethodStat) {
    super();
    this._instance = data;
  }

  // Getters des champs
  get paymentMethod(): string {
    return this._instance?.paymentMethod || "";
  }

  get amount(): number {
    return this._instance?.amount || 0;
  }

  get percentage(): number {
    return this._instance?.percentage || 0;
  }

  static toArray(data: PaymentMethodStat[]): PaymentMethodStatModel[] {
    return (data || []).map((item) => new PaymentMethodStatModel(item));
  }
}

export class SubscriptionsByPaymentMethodsModel extends Model {
  private _instance: SubscriptionsByPaymentData;

  constructor(data: SubscriptionsByPaymentData) {
    super();
    this._instance = data;
  }

  get total(): number {
    return this._instance?.total || 0;
  }

  get stats() {
    return PaymentMethodStatModel.toArray(this._instance.byPaymentMethod);
  }
}
