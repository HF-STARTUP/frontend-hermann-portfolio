import { PackageType } from "@/app/(webapp)/app/subscriptions/_hooks/usePackageList";
import { formatNumber } from "@/lib/utils";
import Model from "@/model/Model";
import {
    AdminOnFleetResponseType,
    FleetListResponseType,
    FleetResponseType,
    FleetSubscriptionDataType,
    FleetSubscriptionPlanType,
    FleetSubscriptionTransaction,
    Info,
    Subscription,
    SubscriptionStatus,
    SubsPaymentStatus
} from "@/types/admin/fleet.type";
import { formatDistanceToNow } from "date-fns";


export class FleetModel extends Model {
    public _instance: FleetListResponseType


    constructor(datas: FleetListResponseType) {
        super()
        this._instance = datas
    }

    static fromArray(datas: FleetListResponseType[]): FleetModel[] {
        return datas.map(data => new FleetModel(data)).reverse();
    }

    get id() {
        return this._instance.id
    }

    get logo() {
        return this.getFleetImage(this._instance.logo)
    }

    get name() {
        return this._instance.name
    }

    get ownerName() {
        return this.capitalizeFirstLetter(this._instance.owner.last_name) + " " + this.capitalizeFirstLetter(this._instance.owner.first_name)
    }

    get city() {
        return this._instance.city;
    }

    get countryCode() {
        return this._instance.country_code;
    }

    get country() {
        return this._instance.country;
    }

    get legalNotice() {
        return this._instance.legal_notice ?? "";
    }

    get number_vehicle() {
        return this._instance.number_vehicle
    }

    get driver_number() {
        return this._instance.driver_number
    }

    get start_date() {
        return this.formatDate(this._instance.start_date)
    }

    get end_date() {
        return this.formatDate(this._instance.end_date)
    }

    get ca_total() {
        return this._instance.ca_total + " " + this._instance.currency
    }

    get currency() {
        return this._instance.currency
    }

    get subscription_amount() {
        return (this._instance.subscription_amount ? formatNumber(this._instance.subscription_amount) + " " : 0 + " ") + this._instance.currency
    }

    get suscription_name(): PackageType | undefined {
        return this._instance.subscription ? this._instance.subscription.toUpperCase() as PackageType : undefined;
    }

    get hasActiveSubscription() {
        return !!this._instance.subscription;
    }

    get subscriptionPaid() {
        return !!this._instance.subscription_paid;
    }

    get subscriptionPaidAmount() {
        return this._instance.subscription_paid_amount
            ? `${this._instance.subscription_paid_amount} ${this._instance.currency}`
            : `0 ${this._instance.currency}`;
    }

    get subscriptionData() {
        return this._instance.subscription_data ? new FleetSubscriptionDataModel(this._instance.subscription_data) : null;
    }

    get hasSubscriptionData() {
        return !!this._instance.subscription_data;
    }

    get created_at() {
        return this.formatDate(this._instance.created_at);
    }

    get statusDisplay() {
        return this._instance.status;
    }
}

export class FleetSubscriptionPlanModel extends Model {
    private _instance: FleetSubscriptionPlanType;

    constructor(datas: FleetSubscriptionPlanType) {
        super()
        this._instance = datas;
    }

    get id() {
        return this._instance.id;
    }

    get accountType() {
        return this._instance.account_type;
    }

    get subscriptionType() {
        return this._instance.subscription_type;
    }

    get period() {
        return this._instance.period;
    }

    get code() {
        return this._instance.code;
    }

    get free() {
        return this._instance.free;
    }

    get name() {
        return this._instance.name;
    }

    get remise() {
        return this._instance.remise;
    }

    get amount() {
        return this._instance.amount;
    }

    get crossedOutAmount() {
        return this._instance.crossed_out_amount;
    }

    get description() {
        return this._instance.description;
    }

    get vehicleNumber() {
        return this._instance.vehicle_number;
    }

    get driverNumber() {
        return this._instance.driver_number;
    }

    get pricingVersion() {
        return this._instance.pricing_version;
    }

    get effectiveDate() {
        return this.formatDate(this._instance.effective_date);
    }

    get annualDiscountPercent() {
        return this._instance.annual_discount_percent;
    }

    get quarterlyDiscountPercent() {
        return this._instance.quarterly_discount_percent;
    }

    get aiAgentPricePercent() {
        return this._instance.ai_agent_price_percent;
    }

    get supportResponseHours() {
        return this._instance.support_response_hours;
    }

    get textRemise() {
        return this._instance.text_remise;
    }

    get textLimitation() {
        return this._instance.text_limitation;
    }

    get caisseLimit() {
        return this._instance.caisse_limit;
    }

    get numberOperationLimit() {
        return this._instance.number_operation_limit;
    }

    get isRangePlan() {
        return this._instance.is_range_plan;
    }

    get vehicleMin() {
        return this._instance.vehicle_min;
    }

    get vehicleMax() {
        return this._instance.vehicle_max;
    }

    get isQuote() {
        return this._instance.is_quote;
    }

    get parentPlanCode() {
        return this._instance.parent_plan_code;
    }

    get paystackPlanCode() {
        return this._instance.paystack_plan_code;
    }

    get enable() {
        return this._instance.enable;
    }

    get createdAt() {
        return this.formatDate(this._instance.created_at);
    }

    get updatedAt() {
        return this.formatDate(this._instance.updated_at);
    }

    get activeFeatures(): string[] {
        const featureLabels: Record<string, string> = {
            gps: "GPS",
            gps_driver: "GPS Chauffeur",
            yango: "Yango",
            export_excel: "Export Excel",
            auto_daily_report: "Rapport journalier auto",
            performance_dashboard: "Tableau de bord performance",
            app_vtc_driver: "App VTC Chauffeur",
            auto_lock_vehicle: "Verrouillage auto véhicule",
            recipe_with_mobile_money: "Recette Mobile Money",
            vehicle_doc_reminder: "Rappel documents véhicule",
            flollow_oil_change: "Suivi vidange",
            manage_course: "Gestion des courses",
            performance_yango: "Performance Yango",
            entretien: "Entretien",
            vehicle_group: "Groupe de véhicules",
            manage_admin: "Gestion admin",
            fleet_management: "Gestion de flotte",
            gps_tracking: "Suivi GPS",
            yango_driver_import: "Import chauffeurs Yango",
            maintenance_tracking: "Suivi maintenance",
            oil_change_tracking: "Suivi vidange",
            multi_users: "Multi-utilisateurs",
            roles_permissions: "Rôles et permissions",
            profit_and_loss: "Compte de résultat",
            multi_cash_registers: "Multi-caisses",
            treasury_management: "Gestion de trésorerie",
            driver_contracts: "Contrats chauffeurs",
            owner_contracts: "Contrats propriétaires",
            owner_dashboard: "Tableau de bord propriétaire",
            order_catalog_qrcode: "Catalogue QR code",
            reports_export: "Export de rapports",
            driver_app: "Application chauffeur",
            wallet_psapay: "Portefeuille PSA Pay",
            financial_validation_steps: "Étapes de validation financière",
            account_statement_export: "Export relevé de compte",
            activity_log: "Journal d'activité",
            alerts_email_sms: "Alertes email/SMS",
            priority_support: "Support prioritaire",
        };

        return Object.entries(featureLabels)
            .filter(([key]) => !!(this._instance as any)[key])
            .map(([, label]) => label);
    }
}

export class FleetSubscriptionDataModel extends Model {
    private _instance: FleetSubscriptionDataType;

    constructor(datas: FleetSubscriptionDataType) {
        super()
        this._instance = datas;
    }

    get id() {
        return this._instance.id;
    }

    get plan() {
        return new FleetSubscriptionPlanModel(this._instance.subscription);
    }

    get amount() {
        return this._instance.amount;
    }

    get startDate() {
        return this.formatDate(this._instance.start_date);
    }

    get endDate() {
        return this.formatDate(this._instance.end_date);
    }

    get remainingTime() {
        return formatDistanceToNow(new Date(this._instance.end_date), { addSuffix: true });
    }
}

export class AdminOnFleetModel extends Model {
    private _instance: AdminOnFleetResponseType;

    constructor(datas: AdminOnFleetResponseType) {
        super()
        this._instance = datas;
    }

    static fromArray(datas: AdminOnFleetResponseType[]): AdminOnFleetModel[] {
        return datas.map(data => new AdminOnFleetModel(data)).reverse();
    }

    get id() {
        return this._instance.id;
    }

    get ownerType() {
        return this.capitalizeFirstLetter(this._instance.owner_type);
    }

    get firstName() {
        return this.capitalizeFirstLetter(this._instance.first_name);
    }

    get lastName() {
        return this.capitalizeFirstLetter(this._instance.last_name);
    }

    get username() {
        return this.lastName + " " + this.firstName
    }

    get email() {
        return this._instance.email;
    }

    get phone() {
        return this._instance.phone;
    }

    get code() {
        return this._instance.code;
    }

    get birthday() {
        return this._instance.birthday;
    }

    get placeOfBirth() {
        return this._instance.place_birth;
    }

    get isBlocked() {
        return this._instance.blocked_at !== null;
    }

    get isSuspended() {
        return this._instance.suspended;
    }

    get deactivatedAt() {
        return this._instance.desactivate_at;
    }

    get status() {
        return this._instance.status;
    }

    get createdAt() {
        return this.formatDate(this._instance.created_at);
    }

    get role() {
        return this.capitalizeFirstLetter(this._instance.role);
    }

    get imageUrl() {
        return this._instance.image ? this.resolveImage(this._instance.image) : null;
    }

    get permissions() {
        return this._instance.permissions;
    }

    get etsName() {
        return this.capitalizeFirstLetter(this._instance.ets_name);
    }

    get etsLogo() {
        return this._instance.ets_logo;
    }
}


export class AbonResponseModel extends Model {
    public _instance: FleetResponseType;

    constructor(datas: FleetResponseType) {
        super()
        this._instance = datas;
    }

    static fromArray(datas: FleetResponseType[]): AbonResponseModel[] {
        return datas.map(data => new AbonResponseModel(data)).reverse();
    }

    get id() {
        return this._instance.id;
    }

    get startDate() {
        return this.formatDate(this._instance.start_date);
    }

    get endDate() {
        return `${this.formatDate(this._instance.end_date)} (${this.toDate(this._instance.end_date)} Restant)`;
    }

    get abonResume() {
        return `${this.subscription.amount ?? 0}/${this.subscription.period}`;
    }

    get isActive() {
        return this._instance.is_active;
    }

    get subscriptionPlan() {
        return this._instance.subscription_plan;
    }

    get status(): SubsPaymentStatus {
        return this._instance.payment_status
    }

    get vehicleNumber() {
        return this._instance.vehicle_number ?? 0;
    }

    get offer() {
        return this._instance.offer;
    }

    get paymentMethod(): string {
        return this._instance.subscriptionType ?? ""
    }

    get paymentMethodLabel() {
        return this._instance.payment_method_label ?? "";
    }

    get renew() {
        return this._instance.renew;
    }

    get amount() {
        return this._instance.amount ?? 0;
    }

    get isQuote() {
        return this._instance.is_quote;
    }

    get amountLabel() {
        return this._instance.amount_label ?? "";
    }

    get paidAmount() {
        return this._instance.paid_amount ?? 0;
    }

    get isPaymentVerifiedOnline() {
        return this._instance.payment_verified_online;
    }

    get paymentStatus() {
        return this._instance.payment_status;
    }

    get paymentStatusLabel() {
        return this._instance.payment_status_label;
    }

    get collectType() {
        return this._instance.collect_type ?? "";
    }

    get hasCollectType() {
        return !!this._instance.collect_type;
    }

    get subscription() {
        return new SubscriptionModel(this._instance.subscription);
    }

    get info() {
        return this._instance.info ? new InfoModel(this._instance.info) : null;
    }

    get hasInfo() {
        return !!this._instance.info;
    }

    get transactions(): FleetSubscriptionTransactionModel[] {
        return (this._instance.transactions ?? []).map((t) => new FleetSubscriptionTransactionModel(t));
    }

    get hasTransactions() {
        return !!this._instance.transactions?.length;
    }

    get lastTransaction(): FleetSubscriptionTransactionModel | null {
        const transactions = this.transactions;
        return transactions.length ? transactions[transactions.length - 1] : null;
    }
}

export class FleetSubscriptionTransactionModel {
    private _instance: FleetSubscriptionTransaction;

    constructor(datas: FleetSubscriptionTransaction) {
        this._instance = datas;
    }

    get id() {
        return this._instance.id;
    }

    get transactionType() {
        return this._instance.transaction_type;
    }

    get paymentMethod() {
        return this._instance.payment_method;
    }

    get collectType() {
        return this._instance.collect_type;
    }

    get status() {
        return this._instance.status;
    }

    get amount() {
        return this._instance.amount ?? 0;
    }

    get fees() {
        return this._instance.fees ?? 0;
    }

    get commission() {
        return this._instance.commission ?? 0;
    }

    get payerPhoneNumber() {
        return this._instance.payer_phone_number ?? "";
    }

    get createdAt() {
        return this._instance.created_at ? new Date(this._instance.created_at).toLocaleDateString() : "-";
    }

    get isSuccess() {
        return this._instance.status === "success";
    }
}

export class SubscriptionModel {
    private _instance?: Subscription;

    constructor(datas?: Subscription) {
        this._instance = datas;
    }

    get id() {
        return this._instance?.id ?? "";
    }

    get accountType() {
        return this._instance?.account_type ?? '';
    }

    get subscriptionType() {
        return this._instance?.subscription_type ?? "";
    }

    get period() {
        return this._instance?.period ?? "";
    }

    get code() {
        return this._instance?.code ?? '';
    }

    get name(): string {
        return this._instance?.name?.toUpperCase() ?? "";
    }

    get remise() {
        return this._instance?.remise ?? '';
    }

    get amount() {
        return this._instance?.amount ?? 0;
    }

    get crossedOutAmount() {
        return this._instance?.crossed_out_amount ?? 0;
    }

    get description() {
        return this._instance?.description ?? '';
    }

    get vehicleNumber() {
        return this._instance?.vehicle_number ?? '';
    }

    get driverNumber() {
        return this._instance?.driver_number ?? 0;
    }

    get gps() {
        return this._instance?.gps ?? '';
    }

    get textRemise() {
        return this._instance?.text_remise ?? '';
    }

    get textLimitation() {
        return this._instance?.text_limitation ?? '';
    }

    get createdAt() {
        return this.toDate(this._instance?.created_at ?? new Date());
    }

    get updatedAt() {
        return this.toDate(this._instance?.updated_at ?? new Date());
    }

    get enable() {
        return this._instance?.enable ?? false;
    }

    // Helper methods
    private capitalizeFirstLetter(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    private toDate(date: Date | null): string | null {
        return date ? new Date(date).toLocaleDateString() : null;
    }
}

export class InfoModel {
    private _instance: Info;

    constructor(datas: Info) {
        this._instance = datas;
    }

    get subscriptionVehicleLimit() {
        return this._instance.subscription_vehicle_limit;
    }

    get subscriptionDriverLimit() {
        return this._instance.subscription_driver_limit;
    }

    get gps() {
        return this._instance.gps;
    }

    get currentTotalVehicle() {
        return this._instance.current_total_vehicle;
    }

    get currentTotalDriver() {
        return this._instance.current_total_driver;
    }
}


export type ParkStatResponseType = {
    vehicle: Driver;
    driver: Driver;
    entretien: CaTotal;
    course: CaTotal;
    ca_total: CaTotal;
}

export type CaTotal = {
    total: number;
    indicateur: string;
    indicateur_value: number;
}

export type Driver = {
    total: number;
    indicateur: string;
    indicateur_value: string;
}