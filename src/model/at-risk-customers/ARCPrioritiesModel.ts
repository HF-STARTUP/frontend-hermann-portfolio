import { BadgeVariant } from "@/components/display/Badge";
import Model from "@/model/Model";
import { ARCClientPrioritiesResponseType, ARCRiskLevel } from "@/types/at-risk-customers.type";

class ARCClientModel extends Model {
    private _instance: ARCClientPrioritiesResponseType;

    constructor(data: ARCClientPrioritiesResponseType) {
        super();
        this._instance = data;
    }

    static toArrays(datas: ARCClientPrioritiesResponseType[]): ARCClientModel[] {
        return datas.map((data) => new ARCClientModel(data));
    }

    get rank() { return this._instance.rank; }
    get parkId() { return this._instance.park_id; }
    get clientName() { return this._instance.client_name; }
    get city() { return this._instance.city; }
    get vehicleCount() { return this._instance.vehicle_count; }
    get alertSignal() { return this._instance.alert_signal; }
    get alertLabel() { return this._instance.alert_label; }
    get mainProblem() { return this._instance.main_problem; }
    get riskScore() { return this._instance.risk_score; }
    get riskLevel(): ARCRiskLevel { return this._instance.risk_level; }

    get riskLevelLabel(): string {
        switch (this._instance.risk_level) {
            case "high": return "Élevé";
            case "medium": return "Moyen";
            case "low": return "Faible";
            default: return "Unknown"
        }
    }

    get riskLevelVariant(): BadgeVariant {
        switch (this._instance.risk_level) {
            case "high": return "red";
            case "medium": return "orange";
            case "low": return "green";
            default: return "default"
        }
    }
}

export default ARCClientModel;