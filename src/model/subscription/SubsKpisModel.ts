import { KpiVariation } from "@/components/display/Kpi";
import { useGetActiveCurrency } from "@/hooks/__globlal/useGlobalHook";
import { formatNumber } from "@/lib/utils";
import Model from "@/model/Model";
import { AllSubscriptionsKpiData } from "@/types/subscription.types";

export class AllSubscriptionKpiModel extends Model {
  public _instance: AllSubscriptionsKpiData;

  constructor(data: AllSubscriptionsKpiData) {
    super();
    this._instance = data;
  }

  get totalSubs() {
    return formatNumber(this._instance.projected.subscriptionsAmount ?? 0);
  }

  get totalResubs() {
    return formatNumber(this._instance.projected.reSubscriptionsAmount ?? 0);
  }

  get byProfileAmount() {
    return this._instance.amountByProfile.byProfile.map((p) => ({
      label: p.profile,
      value: formatNumber(p.amount ?? 0),
      unit: useGetActiveCurrency().currency
    }));
}

  get subsRatio() {
    return `${this._instance.activeSubscriptions.payingCount.current}/${this._instance.activeSubscriptions.totalCount.current}`;
  }

  get activeSubsLabel() {
    return `${this._instance.activeSubscriptions.ratio.percentChange}% ${this._instance.activeSubscriptions.ratio.label} `;
  }

  get activeSubsVariation(): KpiVariation {
    return this._instance.activeSubscriptions.ratio.percentChange > 0
      ? "up"
      : this._instance.activeSubscriptions.ratio.percentChange < 0
        ? "down"
        : "stable";
  }

  get newSubscribersCount(){
    return this._instance.newSubscribers.currentMonth??0
  }

  get newSubscribersLabel() {
    return `${this._instance.newSubscribers.percentChange}% vs mois precedent `;
  }

  get newSubscribersVariation(): KpiVariation {
    return this._instance.newSubscribers.percentChange > 0
      ? "up"
      : this._instance.newSubscribers.percentChange < 0
        ? "down"
        : "stable";
  }

}
