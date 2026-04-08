import {
  SubscriptionPricingItem,
  TariffByPeriod,
} from "@/types/subscription.types";
import Model from "@/model/Model";
import { SubscriptionStatus } from "@/types/admin/fleet.type";
import { formatNumber } from "@/lib/utils";

export class AllSubscriptionsModel extends Model {
  private _instance: SubscriptionPricingItem;

  constructor(data: SubscriptionPricingItem) {
    super();
    this._instance = data;
  }

  get id(): string {
    return this._instance.id;
  }

  get createdAt() {
    return this.formatDateTime(this._instance.created_at);
  }

  get updatedAt() {
    return this.formatDateTime(this._instance.updated_at);
  }

  get userName() {
    return this._instance.createdBy
      ? `${this._instance.createdBy.first_name} ${this._instance.createdBy.last_name}`
      : "-";
  }

  get status() {
    return this._instance.enable
      ? "active"
      : ("suspended" as SubscriptionStatus);
  }

  get name() {
    return this._instance.name.toUpperCase();
  }

  get vehicleNumber() {
    return this._instance.vehicle_number;
  }

  get driverNumber() {
    return this._instance.driver_number;
  }

  get vehicleNumberLabel() {
    return this._instance.vehicle_range;
  }

  get driverNumberLabel() {
    return `Jusqu'a ${this.vehicleNumber ?? 0} chauffeur(s)`;
  }

  get profile() {
    return this._instance.account_type;
  }

  get amount() {
    return formatNumber(this._instance.amount ?? 0);
  }

  get periodPricing() {
    return TariffByPeriodModel.toArray(this._instance.tariffs_by_period);
  }

  get package(): AllSubscriptionsModel | null {
    return this._instance.package
      ? new AllSubscriptionsModel(this._instance.package)
      : null;
  }

  static toArray(datas: SubscriptionPricingItem[]): AllSubscriptionsModel[] {
    return datas.map((data) => new AllSubscriptionsModel(data));
  }
}

export class TariffByPeriodModel extends Model {
  private _instance: TariffByPeriod;

  constructor(data: TariffByPeriod) {
    super();
    this._instance = data;
  }

  get id(): string {
    return this._instance?.id;
  }

  get period(): "monthly" | "yearly" {
    return this._instance?.period;
  }

  get amount() {
    return formatNumber(this._instance?.amount || 0);
  }

  get crossedOutAmount(): number {
    return this._instance?.crossed_out_amount || 0;
  }

  get enable(): boolean {
    return !!this._instance?.enable;
  }

  get effectiveDate(): string | null {
    return this._instance?.effective_date;
  }

  get pricingVersion(): string | number | null {
    return this._instance?.pricing_version;
  }

  get annualDiscountPercent(): number {
    return this._instance?.annual_discount_percent || 0;
  }

  get aiAgentPricePercent(): number {
    return this._instance?.ai_agent_price_percent || 0;
  }

  get createdAt(): string {
    return this.formatDateTime(this._instance?.created_at);
  }

  get updatedAt(): string {
    return this.formatDateTime(this._instance?.updated_at);
  }

  get amountInCountryCurrency(): number {
    return this._instance?.amount_in_country_currency || 0;
  }

  static toArray(data: TariffByPeriod[]): TariffByPeriodModel[] {
    return (data || []).map((item) => new TariffByPeriodModel(item));
  }
}
