import Model from "@/model/Model";
import { InactiveFleetItem } from "@/types/dashboard.type";

class InactiveFleetModel extends Model {
  private _instance: InactiveFleetItem;

  constructor(data: InactiveFleetItem) {
    super();
    this._instance = data;
  }

  static toArrays(
    datas: InactiveFleetItem[] | undefined,
  ): InactiveFleetModel[] {
    if (!datas) return [];
    return datas.map((data) => new InactiveFleetModel(data));
  }

  get fleetId() {
    return this._instance.park_id;
  }

  get fleetName() {
    return this._instance.name ?? "";
  }

  get lastActivityDay() {
    return this._instance.lastActivityDate
      ? this.formatDateTime(this._instance.lastActivityDate)
      : "-";
  }

  get inactiveDays(): number {
    return this._instance.daysInactive;
  }

  get fleetLogo() {
    return this._instance.logoPath
      ? this.resolveImage(this._instance.logoPath)
      : undefined;
  }
}

export default InactiveFleetModel;
