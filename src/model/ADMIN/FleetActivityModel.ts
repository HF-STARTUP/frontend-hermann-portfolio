// model/FleetActivityModel.ts

import { formatNumber } from "@/lib/utils";
import Model from "@/model/Model";
import {
    FleetActivityType,
    ParkActivityDescription,
    ParkActivitySubscription
} from "@/types/admin/fleet.type";

class FleetActivityModel extends Model {
    private _instance: FleetActivityType;

    constructor(data: FleetActivityType) {
        super();
        this._instance = data;
    }

    static fromArray(datas: FleetActivityType[]): FleetActivityModel[] {
        return datas.map(data => new FleetActivityModel(data));
    }

    // Getter principal pour l'instance complète
    get data(): FleetActivityType {
        return this._instance;
    }

    // Getters pour les propriétés principales
    get id(): string {
        return this._instance.id;
    }

    get name(): string {
        return this._instance.name;
    }

    get overview(): string {
        return this._instance.overview;
    }

    get code(): string {
        return this._instance.code;
    }

    get enable(): boolean {
        return this._instance.enable;
    }

    get createdAt(): string {
        return this._instance.created_at;
    }

    get updatedAt(): string {
        return this._instance.updated_at;
    }

    // Getter pour les descriptions
    get descriptions(): ParkActivityDescription[] {
        return this._instance.parkActiivityDescriptions || [];
    }

    get firstDescription(): ParkActivityDescription | null {
        return this.descriptions.length > 0 ? this.descriptions[0] : null;
    }

    get descriptionsCount(): number {
        return this.descriptions.length;
    }

    // Getter pour les abonnements
    get subscriptions(): ParkActivitySubscription[] {
        return this._instance.parkActivitySubscription || [];
    }

    get firstSubscription(): ParkActivitySubscription | null {
        return this.subscriptions.length > 0 ? this.subscriptions[0] : null;
    }

    get mainSubscription(): ParkActivitySubscription | null {
        // Récupère l'abonnement principal (par exemple le premier actif)
        return this.subscriptions.find(sub => sub.subscription?.enable) || this.firstSubscription;
    }

    get subscriptionsCount(): number {
        return this.subscriptions.length;
    }

    // Méthodes utilitaires
    getDescriptionByTitle(title: string): ParkActivityDescription | null {
        return this.descriptions.find(desc => desc.title === title) || null;
    }

    getSubscriptionByPeriod(period: string): ParkActivitySubscription | null {
        return this.subscriptions.find(sub => sub.subscription?.period === period) || null;
    }

    getSubscriptionById(subscriptionId: string): ParkActivitySubscription | null {
        return this.subscriptions.find(sub => sub.subscription_id === subscriptionId) || null;
    }

    // Méthodes de formatage
    get formattedCreatedAt(): string {
        return this.formatDate(new Date(this.createdAt));
    }

    get formattedUpdatedAt(): string {
        return this.formatDate(new Date(this.updatedAt));
    }

    get isEnabled(): boolean {
        return this.enable;
    }

    get hasDescriptions(): boolean {
        return this.descriptionsCount > 0;
    }

    get hasSubscriptions(): boolean {
        return this.subscriptionsCount > 0;
    }

    // Méthode pour obtenir les abonnements actifs
    get activeSubscriptions(): ParkActivitySubscription[] {
        return this.subscriptions.filter(sub => sub.subscription?.enable === true);
    }

    // Méthode pour formater le prix
    getFormattedPrice(amount: number | null): string {
        if (amount === null || amount === undefined) return 'N/A';
        return formatNumber(amount);
    }



    // Méthode pour obtenir la liste des titres des descriptions
    get descriptionTitles(): string[] {
        return this.descriptions.map(desc => desc.title);
    }

    // Méthode pour obtenir la liste des noms des abonnements
    get subscriptionNames(): string[] {
        return this.subscriptions
            .map(sub => sub.subscription?.name)
            .filter((name): name is string => name !== null && name !== undefined);
    }

    // Méthode pour cloner l'instance
    clone(): FleetActivityModel {
        return new FleetActivityModel(JSON.parse(JSON.stringify(this._instance)));
    }

    // Méthode pour mettre à jour l'instance
    update(data: Partial<FleetActivityType>): void {
        this._instance = { ...this._instance, ...data };
    }
}

export default FleetActivityModel;