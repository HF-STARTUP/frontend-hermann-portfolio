import Model from "@/model/Model";
import {
    AccountingResponseType,
    AccountingStateResponseType,
    Percent,
    Resultat,
    UncollectedRecipesResponseType
} from "@/types/Accounting.types";
import Vehicle from "@/model/vehicule/Vehicule";
import Driver from "@/model/driver/Driver";

export class AccountingModel extends Model {
    _instance: AccountingResponseType;

    constructor(data: AccountingResponseType) {
        super();
        this._instance = data;
    }

    get id(): string {
        return this._instance.id;
    }

    get driverName(): string {
        return this.capitalizeFirstLetter(this._instance.driver_name);
    }

    get recette() {
        return this._instance?.course_recipe ?? 0;
    }

    get breaddownAmount() {
        return this._instance?.cout_entretien_change ?? 0;
    }

    get objective() {
        return this._instance?.vehicle_objective ?? 0;
    }

    get ecart() {
        return this._instance?.ecart ?? 0;
    }

    get vehicleBrand() {
        return this._instance.vehicle.brand;
    }

    get vehicleModel() {
        return this._instance.vehicle.model;
    }


    get creatingAt() {
        return this.toDate(this._instance.created_at);
    }


    static toArrays(datas: AccountingResponseType[]): AccountingModel[] {
        return datas.map(data => new AccountingModel(data)).reverse();
    }


}

export class AccountingStateModel extends Model {
    private _instance: AccountingStateResponseType;

    constructor(data: AccountingStateResponseType) {
        super();
        this._instance = data;
    }

    get totalRevenuesCurrentMonth(): number {
        return this._instance.total_revenus_current_month;
    }

    get totalExpensesCurrentMonth(): number {
        return this._instance.total_depenses_current_month;
    }

    get totalRevenuesLastMonth(): number {
        return this._instance.total_revenus_last_month;
    }

    get totalExpensesLastMonth(): number {
        return this._instance.total_depenses_last_month;
    }

    get revenuePercent(): Percent {
        return this._instance.percent_revenu;
    }

    get expensePercent(): Percent {
        return this._instance.percent_depense;
    }

    get result(): Resultat {
        return this._instance.resultat;
    }

    static fromArray(datas: AccountingStateResponseType[]): AccountingStateModel[] {
        return datas.map(data => new AccountingStateModel(data));
    }
}


export class UncollectedRecipesModel extends Model {
    private _instance: UncollectedRecipesResponseType;

    constructor(data: UncollectedRecipesResponseType) {
        super();
        this._instance = data;
    }

    get id() {
        return this._instance.id
    }

    get vehicle() {
        return new Vehicle(this._instance.vehicle)
    }

    get driver() {
        return new Driver(this._instance.driver)
    }

    get amount() {
        return this._instance.amount
    }

    get objective() {
        return this._instance.objective
    }

    get date() {
        return this._instance.date
    }

    get encaissed() {
        return true
    }


    static fromArray(datas: UncollectedRecipesResponseType[]): UncollectedRecipesModel[] {
        return datas.map(data => new UncollectedRecipesModel(data));
    }
}


