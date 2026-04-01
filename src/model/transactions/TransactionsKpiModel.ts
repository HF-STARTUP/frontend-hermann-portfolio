import {
  MetricDetail,
  TransactionFlow,
  TransactionStatsData,
} from "@/types/transactions.type";
import Model from "../Model";
import { formatNumber } from "@/lib/utils";
import { KpiVariation } from "@/components/display/Kpi";

export class TransactionStatsModel extends Model {
  private _instance: TransactionStatsData;

  constructor(data: TransactionStatsData) {
    super();
    this._instance = data;
  }

  private _val(
    flow: "incoming" | "outgoing",
    metric: keyof TransactionFlow,
    field: keyof MetricDetail,
  ): number {
    return this._instance?.[flow]?.[metric]?.[field] ?? 0;
  }

  private _getVariation(percent: number): KpiVariation {
    return percent > 0 ? "up" : percent < 0 ? "down" : "stable";
  }

  private _getHint(percent: number): string {
    const sign = percent >= 0 ? "+" : "";
    return `${sign}${percent}% vs période précédente`;
  }

  get incomingTotalAmountVariation() {
    return this._getVariation(
      this._val("incoming", "totalAmount", "percentChange"),
    );
  }
  get incomingTotalAmountHint() {
    return this._getHint(this._val("incoming", "totalAmount", "percentChange"));
  }

  get incomingTotalFeesVariation() {
    return this._getVariation(
      this._val("incoming", "totalFees", "percentChange"),
    );
  }
  get incomingTotalFeesHint() {
    return this._getHint(this._val("incoming", "totalFees", "percentChange"));
  }

  get incomingCommissionVariation() {
    return this._getVariation(
      this._val("incoming", "commissionVtcc", "percentChange"),
    );
  }
  get incomingCommissionHint() {
    return this._getHint(
      this._val("incoming", "commissionVtcc", "percentChange"),
    );
  }

  get outgoingTotalAmountVariation() {
    return this._getVariation(
      this._val("outgoing", "totalAmount", "percentChange"),
    );
  }
  get outgoingTotalAmountHint() {
    return this._getHint(this._val("outgoing", "totalAmount", "percentChange"));
  }

  get outgoingTotalFeesVariation() {
    return this._getVariation(
      this._val("outgoing", "totalFees", "percentChange"),
    );
  }
  get outgoingTotalFeesHint() {
    return this._getHint(this._val("outgoing", "totalFees", "percentChange"));
  }

  get outgoingCommissionVariation() {
    return this._getVariation(
      this._val("outgoing", "commissionVtcc", "percentChange"),
    );
  }
  get outgoingCommissionHint() {
    return this._getHint(
      this._val("outgoing", "commissionVtcc", "percentChange"),
    );
  }

  get incomingTotalAmount(): string {
    return formatNumber(this._val("incoming", "totalAmount", "current"));
  }

  get incomingTotalAmountPrevious(): string {
    return formatNumber(this._val("incoming", "totalAmount", "previous"));
  }

  get incomingTotalAmountPercent(): number {
    return this._val("incoming", "totalAmount", "percentChange");
  }

  get incomingTotalFees(): string {
    return formatNumber(this._val("incoming", "totalFees", "current"));
  }

  get incomingTotalFeesPrevious(): string {
    return formatNumber(this._val("incoming", "totalFees", "previous"));
  }

  get incomingTotalFeesPercent(): number {
    return this._val("incoming", "totalFees", "percentChange");
  }

  get incomingCommission(): string {
    return formatNumber(this._val("incoming", "commissionVtcc", "current"));
  }

  get incomingCommissionPrevious(): string {
    return formatNumber(this._val("incoming", "commissionVtcc", "previous"));
  }

  get incomingCommissionPercent(): number {
    return this._val("incoming", "commissionVtcc", "percentChange");
  }

  // --- OUTGOING (Direct Getters) ---

  get outgoingTotalAmount(): string {
    return formatNumber(this._val("outgoing", "totalAmount", "current"));
  }

  get outgoingTotalAmountPrevious(): string {
    return formatNumber(this._val("outgoing", "totalAmount", "previous"));
  }

  get outgoingTotalAmountPercent(): number {
    return this._val("outgoing", "totalAmount", "percentChange");
  }

  get outgoingTotalFees(): string {
    return formatNumber(this._val("outgoing", "totalFees", "current"));
  }

  get outgoingTotalFeesPrevious(): string {
    return formatNumber(this._val("outgoing", "totalFees", "previous"));
  }

  get outgoingTotalFeesPercent(): number {
    return this._val("outgoing", "totalFees", "percentChange");
  }

  get outgoingCommission(): string {
    return formatNumber(this._val("outgoing", "commissionVtcc", "current"));
  }

  get outgoingCommissionPrevious(): string {
    return formatNumber(this._val("outgoing", "commissionVtcc", "previous"));
  }

  get outgoingCommissionPercent(): number {
    return this._val("outgoing", "commissionVtcc", "percentChange");
  }
}
