import Model from "@/model/Model";
import {
    ARCClientDetailResponseType,
    ARCRiskLevel,
} from "@/types/at-risk-customers.type";
import { BadgeVariant } from "@/components/display/Badge";

class ARCClientDetailModel extends Model {
    private _instance: ARCClientDetailResponseType;

    constructor(data: ARCClientDetailResponseType) {
        super();
        this._instance = data;
    }

    static toArrays(datas: ARCClientDetailResponseType[]): ARCClientDetailModel[] {
        return datas.map((data) => new ARCClientDetailModel(data));
    }

    get parkId() { return this._instance.park_id; }
    get name() { return this._instance.name; }
    get city() { return this._instance.city; }
    get country() { return this._instance.country; }
    get vehicleCount() { return this._instance.vehicle_count; }
    get vehicleCountLabel() { return this._instance.vehicle_count_label; }
    get planName() { return this._instance.plan_name ? this._instance.plan_name.toUpperCase() : undefined; }
    get renewalInDays() { return this._instance.renewal_in_days; }
    get expiredDaysAgo() { return this._instance.expired_days_ago; }
    get renewalLabel() { return this._instance.renewal_label; }
    get endDate() { return this.formatDateTime(this._instance.end_date); }
    get subscriptionStatus() { return this._instance.subscription_status; }
    get alertSignal() { return this._instance.alert_signal; }
    get alertLabel() { return this._instance.alert_label; }
    get riskScore() { return this._instance.risk_score; }
    get riskLevel(): ARCRiskLevel { return this._instance.risk_level; }
    get riskScoreTier(): ARCRiskLevel { return this._instance.risk_score_tier; }
    get mainProblem() { return this._instance.main_problem; }
    get clientNeed() { return this._instance.client_need; }
    get clientNeedLabel() { return this._instance.client_need_label; }
    get nextAction() { return this._instance.next_action; }
    get accountManagerId() { return this._instance.account_manager_id; }

    get riskLevelHexColor() {
        switch (this.riskLevel) {
            case "critical":
                return "#E51D13"
            case "high":
                return "#E51D13"
            case "low":
                return "#00A757"
            case "medium":
                return "#FF9900"
            default:
                break;
        }
    }

    get riskLevelClassName() {
        switch (this.riskLevel) {
            case "critical":
                return "text-vaRed bg-text-vaRed/20"
            case "high":
                return "text-vaRed bg-text-vaRed/20"
            case "low":
                return "text-vaGreen bg-text-vaGreen/20"
            case "medium":
                return "text-vaOrange bg-text-vaOrange/20"
            default:
                break;
        }
    }

    get logo() {
        return this._instance.logo ? this.resolveImage(this._instance.logo) : undefined;
    }

    get lastActivityAt() {
        return this._instance.last_activity_at
            ? this.formatRelativeOrAbsoluteDate(this._instance.last_activity_at)
            : "---";
    }

    get lastContactAt() {
        return this._instance.last_contact_at
            ? this.formatRelativeOrAbsoluteDate(this._instance.last_contact_at)
            : "---";
    }

    get lastContactType() {
        return this._instance.last_contact_type ?? "-";
    }

    get riskLevelLabel(): string {
        switch (this._instance.risk_level) {
            case "high": return "Élevé";
            case "medium": return "Moyen";
            case "low": return "Faible";
            default: return this._instance.risk_level;
        }
    }

    get riskLevelVariant(): BadgeVariant {
        switch (this._instance.risk_level) {
            case "high": return "red";
            case "medium": return "orange";
            case "low": return "green";
            default: return "default";
        }
    }

    get subscriptionStatusVariant(): BadgeVariant {
        switch (this._instance.subscription_status) {
            case "active": return "green";
            case "expired": return "red";
            default: return "default";
        }
    }
}

export default ARCClientDetailModel;