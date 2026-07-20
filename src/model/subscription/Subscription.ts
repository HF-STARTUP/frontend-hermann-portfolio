// model/SubscriptionModel.ts

import {
    Advantage,
    AdvantagesByCategory,
    Features,
    SubscriptionAccountType,
    SubscriptionPlan,
    SubscriptionType,
    VehicleRange
} from "@/types/subscription.types";
import Model from "@/model/Model";

export class SubscriptionModel extends Model {
    private _instance: SubscriptionPlan;

    constructor(data: SubscriptionPlan) {
        super();
        this._instance = data;
    }

    // Getters principaux
    get id(): string {
        return this._instance.id;
    }

    get name(): string {
        return this.capitalizeFirstLetter(this._instance.name);
    }

    get code(): string | null {
        return this._instance.code;
    }

    get planId(): number | null {
        return this._instance.plan_id;
    }

    get remise(): number | null {
        return this._instance.remise;
    }

    get period(): string {
        return this._instance.period;
    }

    get subscriptionType(): SubscriptionType {
        return this._instance.subscription_type;
    }

    get accountType(): SubscriptionAccountType {
        return this._instance.account_type;
    }

    get description(): string | null {
        return this._instance.description;
    }

    get textRemise(): string | null {
        return this._instance.text_remise;
    }

    get textLimitation(): string | null {
        return this._instance.text_limitation;
    }

    get vehicleNumber(): number {
        return this._instance.vehicle_number;
    }

    get driverNumber(): number {
        return this._instance.driver_number;
    }

    get isRangePlan(): boolean {
        return this._instance.is_range_plan;
    }

    get vehicleMin(): number | null {
        return this._instance.vehicle_min;
    }

    get vehicleMax(): number | null {
        return this._instance.vehicle_max;
    }

    get isQuote(): boolean {
        return this._instance.is_quote;
    }

    get parentPlanCode(): string | null {
        return this._instance.parent_plan_code;
    }

    get pricingVersion(): string | null {
        return this._instance.pricing_version;
    }

    get effectiveDate(): string | null {
        return this._instance.effective_date;
    }

    get annualDiscountPercent(): number | null {
        return this._instance.annual_discount_percent;
    }

    get aiAgentPricePercent(): number | null {
        return this._instance.ai_agent_price_percent;
    }

    get amount(): number | null {
        return this._instance.amount;
    }

    get crossedOutAmount(): number | null {
        return this._instance.crossed_out_amount;
    }

    get currency(): string {
        return this._instance.currency;
    }

    get features(): Features {
        return this._instance.features;
    }

    get advantages(): Advantage[] {
        return this._instance.advantages || [];
    }

    get advantagesByCategory(): AdvantagesByCategory[] {
        return this._instance.advantages_by_category || [];
    }

    get isCustomizable(): boolean {
        return this._instance.is_customizable || false;
    }

    get vehicleRanges(): VehicleRange[] {
        return this._instance.vehicle_ranges || [];
    }

    // Méthodes utilitaires
    get hasAdvantages(): boolean {
        return this.advantages.length > 0;
    }

    get hasAdvantagesByCategory(): boolean {
        return this.advantagesByCategory.length > 0;
    }

    get hasVehicleRanges(): boolean {
        return this.vehicleRanges.length > 0;
    }

    get activeAdvantages(): Advantage[] {
        return this.advantages.filter(adv => adv.active === true);
    }

    get inactiveAdvantages(): Advantage[] {
        return this.advantages.filter(adv => adv.active !== true);
    }

    get activeAdvantagesCount(): number {
        return this.activeAdvantages.length;
    }

    get formattedPrice(): string {
        if (this.amount === null) return 'Sur devis';
        return `${this.amount} ${this.currency}`;
    }

    get formattedCrossedOutPrice(): string | null {
        if (this.crossedOutAmount === null) return null;
        return `${this.crossedOutAmount} ${this.currency}`;
    }

    get hasDiscount(): boolean {
        return this.crossedOutAmount !== null && this.crossedOutAmount > (this.amount || 0);
    }

    get discountPercentage(): number | null {
        if (!this.hasDiscount || this.crossedOutAmount === null || this.amount === null) {
            return null;
        }
        return Math.round(((this.crossedOutAmount - this.amount) / this.crossedOutAmount) * 100);
    }

    get isMonthly(): boolean {
        return this.period === 'monthly';
    }

    get isQuarterly(): boolean {
        return this.period === 'quarterly';
    }

    get isYearly(): boolean {
        return this.period === 'yearly';
    }

    get isPremium(): boolean {
        return this.subscriptionType === 'premium';
    }

    get isEssentiel(): boolean {
        return this.subscriptionType === 'essentiel';
    }

    // Méthodes pour récupérer des avantages par catégorie
    getAdvantagesByCategory(category: string): AdvantagesByCategory | null {
        return this.advantagesByCategory.find(item => item.category === category) || null;
    }

    getCategories(): string[] {
        return this.advantagesByCategory.map(item => item.category);
    }

    getActiveAdvantagesByCategory(): AdvantagesByCategory[] {
        return this.advantagesByCategory.map(category => ({
            ...category,
            advantages: category.advantages.filter(adv => adv.active === true)
        })).filter(category => category.advantages.length > 0);
    }

    // Méthodes pour les véhicules ranges
    getVehicleRangeById(id: string): VehicleRange | null {
        return this.vehicleRanges.find(range => range.id === id) || null;
    }

    getVehicleRangeByVehicleCount(vehicleCount: number): VehicleRange | null {
        return this.vehicleRanges.find(range => 
            vehicleCount >= range.vehicle_min && vehicleCount <= range.vehicle_max
        ) || null;
    }

    getVehicleRangePrice(vehicleCount: number): number | null {
        const range = this.getVehicleRangeByVehicleCount(vehicleCount);
        return range?.amount ?? null;
    }

    // Méthodes de formatage
    getPeriodLabel(): string {
        const labels = {
            monthly: 'Mensuel',
            quarterly: 'Trimestriel',
            yearly: 'Annuel'
        };
        return labels[this.period as keyof typeof labels] || this.period;
    }

    getSubscriptionTypeLabel(): string {
        const labels = {
            essentiel: 'Essentiel',
            premium: 'Premium'
        };
        return labels[this.subscriptionType as keyof typeof labels] || this.subscriptionType;
    }

    getAccountTypeLabel(): string {
        const labels = {
            professionnel: 'Professionnel',
            particulier: 'Particulier'
        };
        return labels[this.accountType as keyof typeof labels] || this.accountType;
    }

    // Vérifier si une feature est active
    hasFeature(featureKey: keyof Features): boolean {
        return this.features[featureKey] === true;
    }

    // Obtenir la liste des features actives
    getActiveFeatures(): string[] {
        return Object.entries(this.features)
            .filter(([_, value]) => value === true)
            .map(([key]) => key);
    }

    // Méthode statique pour créer une instance
    static fromArray(datas: SubscriptionPlan[]): SubscriptionModel[] {
        return datas.map(data => new SubscriptionModel(data));
    }

    // Méthode pour cloner l'instance
    clone(): SubscriptionModel {
        return new SubscriptionModel(JSON.parse(JSON.stringify(this._instance)));
    }

    // Méthode pour mettre à jour l'instance
    update(data: Partial<SubscriptionPlan>): void {
        this._instance = { ...this._instance, ...data };
    }
}

export class SubscriptionModelFactory {
    static createSubscriptionModel(data: SubscriptionPlan): SubscriptionModel {
        return new SubscriptionModel(data);
    }

    static createSubscriptionModels(datas: SubscriptionPlan[]): SubscriptionModel[] {
        return datas.map(data => this.createSubscriptionModel(data));
    }

    // Méthode pour créer à partir de la réponse API
    static createFromApiResponse(response: { data: { plans: SubscriptionPlan[] } }): SubscriptionModel[] {
        return this.createSubscriptionModels(response.data.plans);
    }

    // Filtrer par période
    static filterByPeriod(models: SubscriptionModel[], period: string): SubscriptionModel[] {
        return models.filter(model => model.period === period);
    }

    // Filtrer par type
    static filterByType(models: SubscriptionModel[], type: SubscriptionType): SubscriptionModel[] {
        return models.filter(model => model.subscriptionType === type);
    }

    // Filtrer par type de compte
    static filterByAccountType(models: SubscriptionModel[], accountType: SubscriptionAccountType): SubscriptionModel[] {
        return models.filter(model => model.accountType === accountType);
    }
}

// Export par défaut
export default SubscriptionModel;