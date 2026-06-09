import { formatNumber } from "@/lib/utils";
import Model from "@/model/Model";
import { KycKpiData } from "@/types/admin/kyc.type";

class KycKpiModel extends Model {
  private _instance: KycKpiData;

  constructor(data: KycKpiData) {
    super();
    this._instance = data ?? {
      total_clients: 0,
      approved: 0,
      pending: 0,
      rejected: 0,
      incomplete: 0,
    };
  }

  get totalClients() {
    return formatNumber(this._instance.total_clients);
  }

  get approved() {
    return formatNumber(this._instance.approved);
  }

  get pending() {
    return formatNumber(this._instance.pending);
  }

  get rejected() {
    return formatNumber(this._instance.rejected);
  }

  get incomplete() {
    return formatNumber(this._instance.incomplete);
  }

  get totalClientsCount() {
    return this._instance.total_clients ?? 0;
  }

  get pendingCount() {
    return this._instance.pending ?? 0;
  }

  get incompleteCount() {
    return this._instance.incomplete ?? 0;
  }
}

export default KycKpiModel;
