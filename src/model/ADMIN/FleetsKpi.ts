import { KpiVariation } from "@/components/display/Kpi";
import { formatNumber } from "@/lib/utils";
import Model from "@/model/Model";
import { FleetsKpiData } from "@/types/admin/fleet.type";

class FleetsKpiModel extends Model {
  private _instance: FleetsKpiData;

  constructor(data: FleetsKpiData) {
    super();
    this._instance = data;
  }

  // Périodes
  get period() {
    return this._instance?.period ?? { start_date: "", end_date: "" };
  }

  get previousPeriod() {
    return this._instance?.previous_period ?? { start_date: "", end_date: "" };
  }

  // Total des flottes
  get totalCount() {
    return formatNumber(this._instance?.totalFleets?.current ?? 0);
  }

  get totalPrevious() {
    return formatNumber(this._instance?.totalFleets?.previous ?? 0);
  }

  get totalPercent() {
    return this._instance?.totalFleets?.percentChange ?? 0;
  }

  get totalVariation(): KpiVariation {
    if (this.totalPercent < 0) return "down";
    if (this.totalPercent > 0) return "up";
    return "stable";
  }

  get totalLabel() {
    return this._instance?.totalFleets?.label ?? "";
  }

  // Flottes actives
  get activeCount() {
    return formatNumber(this._instance?.activeFleets?.current ?? 0);
  }

  get activePrevious() {
    return formatNumber(this._instance?.activeFleets?.previous ?? 0);
  }

  get activePercent() {
    return this._instance?.activeFleets?.percentChange ?? 0;
  }

  get activeVariation(): KpiVariation {
    if (this.activePercent < 0) return "down";
    if (this.activePercent > 0) return "up";
    return "stable";
  }

  get activeLabel() {
    return this._instance?.activeFleets?.label ?? "";
  }

  // Flottes inactives
  get inactiveCount() {
    return formatNumber(this._instance?.inactiveFleets?.current ?? 0);
  }

  get inactivePrevious() {
    return formatNumber(this._instance?.inactiveFleets?.previous ?? 0);
  }

  get inactivePercent() {
    return this._instance?.inactiveFleets?.percentChange ?? 0;
  }

  get inactiveVariation(): KpiVariation {
    if (this.inactivePercent < 0) return "down";
    if (this.inactivePercent > 0) return "up";
    return "stable";
  }

  get inactiveLabel() {
    return this._instance?.inactiveFleets?.label ?? "";
  }

  // Flottes supprimées
  get deletedCount() {
    return formatNumber(this._instance?.deletedFleets?.current ?? 0);
  }

  get deletedPrevious() {
    return formatNumber(this._instance?.deletedFleets?.previous ?? 0);
  }

  get deletedPercent() {
    return this._instance?.deletedFleets?.percentChange ?? 0;
  }

  get deletedVariation(): KpiVariation {
    if (this.deletedPercent < 0) return "down";
    if (this.deletedPercent > 0) return "up";
    return "stable";
  }

  get deletedLabel() {
    return this._instance?.deletedFleets?.label ?? "";
  }
}

export default FleetsKpiModel;