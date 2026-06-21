import Model from "@/model/Model";
import {
    ARCClientProfileResponseType,
    ARCRiskLevel,
    ARCRiskFactor,
    ARCRiskSparklinePoint,
    ARCRecommendation,
    ARCRecommendationKey,
} from "@/types/at-risk-customers.type";
import { BadgeVariant } from "@/components/display/Badge";
import { Banknote, FileSearch, LucideIcon, PhoneCall, Sparkles } from "lucide-react";

class ARCClientProfileModel extends Model {
    private _instance: ARCClientProfileResponseType;

    constructor(data: ARCClientProfileResponseType) {
        super();
        this._instance = data;
    }

    static fromResponse(data: ARCClientProfileResponseType): ARCClientProfileModel {
        return new ARCClientProfileModel(data);
    }

    get parkId() { return this._instance.park_id; }
    get name() { return this._instance.name; }
    get city() { return this._instance.city; }
    get country() { return this._instance.country; }
    get locationLabel() { return this._instance.location_label; }
    get vehicleCountLabel() { return this._instance.vehicle_count_label; }
    get unpaidInvoicesCount() { return this._instance.unpaid_invoices_count; }

    get logo() {
        return this._instance.logo ? this.resolveImage(this._instance.logo) : undefined;
    }

    get lastActivityAt() {
        return this._instance.last_activity_at
            ? this.formatDateTime(this._instance.last_activity_at)
            : "-";
    }

    get riskLevel(): ARCRiskLevel { return this._instance.badges.risk_level; }
    get riskLevelLabel() { return this._instance.badges.risk_level_label; }
    get primaryAlertSignal() { return this._instance.badges.primary_alert_signal; }
    get primaryAlertLabel() { return this._instance.badges.primary_alert_label; }

    get riskLevelVariant(): BadgeVariant {
        switch (this.riskLevel) {
            case "critical": return "red";
            case "high": return "red";
            case "medium": return "orange";
            case "low": return "green";
            default: return "default";
        }
    }

    get riskScore() { return this._instance.risk_analysis.risk_score; }
    get riskScoreDelta() { return this._instance.risk_analysis.trend_30d.score_delta; }
    get riskTrendLabel() { return this._instance.risk_analysis.trend_30d.label; }

    get riskSparkline(): ARCRiskSparklinePoint[] {
        return this._instance.risk_analysis.sparkline_30d;
    }

    get analysisRiskLevelLabel() {
        return this._instance.risk_analysis.risk_level_label
    }

    get riskFactors(): ARCRiskFactor[] {
        return this._instance.risk_analysis.factors;
    }

    get totalRiskPoints(): number {
        return this.riskFactors.reduce((sum, f) => sum + f.points, 0);
    }

    get recommendations(): ARCRecommendation[] {
        return this._instance.recommendations;
    }

    getRecommendationIcon(key: ARCRecommendationKey): LucideIcon {
        switch (key) {
            case ARCRecommendationKey.PAYMENT_PLAN:
                return Banknote
            case ARCRecommendationKey.CONTACT_48H:
                return PhoneCall
            case ARCRecommendationKey.ACCOUNT_REVIEW:
                return FileSearch
            default:
                return Sparkles;
        }
    }

    get primaryContactFullName(): string {
        const { first_name, last_name } = this._instance.primary_contact;
        return this.toName(`${first_name} ${last_name}`);
    }

    get primaryContactRoleLabel() { return this._instance.primary_contact.role_label; }
    get primaryContactPhone() { return this._instance.primary_contact.phone; }
    get primaryContactEmail() { return this._instance.primary_contact.email; }

    get vehicleCount() { return this._instance.fleet.vehicle_count; }
    get fleetTierLabel() { return this._instance.fleet.tier_label; }

    get planName() { return this._instance.subscription.plan_name; }
    get annualAmount() { return this._instance.subscription.annual_amount; }
    get currency() { return this._instance.subscription.currency; }
    get renewalInDays() { return this._instance.subscription.renewal_in_days; }
    get subscriptionStatus() { return this._instance.subscription.status; }
    get subscriptionStatusLabel() { return this._instance.subscription.status_label; }

    get renewalDate() {
        return this.formatDateTime(this._instance.subscription.renewal_date);
    }

    get hasAccountManager(): boolean {
        return !!this._instance.account_manager;
    }

    get accountManagerFullName(): string {
        if (!this._instance.account_manager) return "Non assigné";
        const { first_name, last_name } = this._instance.account_manager;
        return this.toName(`${first_name} ${last_name}`);
    }

    get lastSuccessfulPaymentAt() {
        return this._instance.recent_payments_summary.last_success_at
            ? this.formatDateTime(this._instance.recent_payments_summary.last_success_at)
            : "-";
    }

    get lastFailedPaymentAt() {
        return this._instance.recent_payments_summary.last_failed_at
            ? this.formatDateTime(this._instance.recent_payments_summary.last_failed_at)
            : "-";
    }
}

export default ARCClientProfileModel;