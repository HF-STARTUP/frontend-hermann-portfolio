import Model from "@/model/Model";
import {Recipe, VEHICLE_STATUS, VehiculeResponseType} from "@/types/vehicule.type";
import {VSelectProp} from "@/components/form/TextField";
import {COLLECTION_TYPE} from "@/schema/vehicule.schema";


type VehicleRecipeResum = {
    period: string,
    amount: string
}

class Vehicle extends Model {
    _instance: VehiculeResponseType;
    deactivatedStatus: VEHICLE_STATUS;

    constructor(vehicleData: VehiculeResponseType) {
        super();
        this._instance = vehicleData
        this.deactivatedStatus = VEHICLE_STATUS.DEACTIVATED
    }

    static toVehicles(vehicleDataArray: VehiculeResponseType[]): Vehicle[] {
        return vehicleDataArray.map(data => new Vehicle(data));
    }

    get id() {
        return this._instance.id
    }

    get enableProfile() {
        return this._instance?.vehicleConfig?.profiles.length ? this._instance?.vehicleConfig?.profiles[0].id : null
    }

    get entryFleetAt() {
        return `${this.toDate(this._instance.entry_fleet_at)}`
    }

    get circultateAt() {
        return `${this.toDate(this._instance.circulation_at)}`
    }

    public get getFindToken() {
        return `${this.getBrandWithColor} ${this.getModel} ${this.getRegistration} ${this.getFullName} ${this.getPrincipalDriverDisplayName}`
    }

    public get isDeactivated() {
        return this.status === this.deactivatedStatus
    }

    get status(): VEHICLE_STATUS {
        return this._instance.status
    }

    public get getCover() {
        return this.resolveImage(this?._instance.image ?? this._instance?.vehicle_image?.path);
    }

    get images_presentation() {
        const images_list = this._instance.images.map(i => this.resolveImage(i.path))

        const finalImage: string[] = []

        images_list.forEach((im, index) => {
            if (index) {
                finalImage.push(im)
            }
        })

        return finalImage
    }

    get recipe(): Recipe | null {
        return this._instance.recipe.length ? this._instance.recipe[0] : null
    }

    get courseTarifs(): VehicleRecipeResum[] {

        return this._instance.vehicleCourseConfig.map((r) => {

            let frequencyValue

            switch (r.cadence) {
                case ("weekly" || "week"):
                    frequencyValue = "Hebdomadaire"
                    break
                case ("monthly" || "month"):
                    frequencyValue = "Mensuelle"
                    break
                case ("daily" || "day") :
                    frequencyValue = "Journaliere"
                    break
                default:
                    frequencyValue = "Journaliere"
            }

            return {
                period: frequencyValue,
                amount: r.tarif + ''
            }
        })
    }

    get recipeTitle() {

        return (this.recipe?.collection_type === COLLECTION_TYPE.RECIPE_OBJECTIVE ? "Par objectif de recette" : "Sans objectif de recette")
    }

    get firstRecipe(): number | undefined {
        return this._instance?.recipe && this._instance?.recipe.length ? this._instance.recipe[0]?.amount : undefined
    }

    get recipesArrays(): VehicleRecipeResum[] {

        return this._instance.recipe.map((r) => {

            let frequencyValue = ""

            switch (r.freequency) {
                case ("weekly" || "week"):
                    frequencyValue = "Hebdomadaire"
                    break
                case ("monthly" || "month"):
                    frequencyValue = "Mensuelle"
                    break
                case ("daily" || "day") :
                    frequencyValue = "Journaliere"
                    break
                default:
                    frequencyValue = "_"
            }

            return {
                period: frequencyValue,
                amount: r.amount + ''
            }
        })
    }


    public get getBrand(): string {
        return typeof this._instance?.brand == "object" ? this._instance?.brand.name : this._instance?.brand;
    }

    public get getModel(): string {
        return typeof this._instance?.model == "object" ? this._instance?.model?.name : this._instance?.model;
    }

    public get getColor() {
        return this._instance?.color ?? "";
    }

    public get getChasisNumber() {
        return this._instance?.chassis_number ?? ""
    }

    public get getGpsNumber() {
        return this._instance?.gps_number ?? "";
    }

    public get mileage() {
        return this._instance?.mileage ?? "";
    }

    public get getFullName(): string {
        return this.capitalizeFirstLetter(`${this.getBrand} ${this.getModel}`) ?? ''
    }

    public get getBrandWithColor() {
        return `${this.getFullName} - ${this.getColor}`
    }

    public get getRegistration() {
        return this._instance?.registration_number.toUpperCase();
    }

    public get getPrincipalDriverDisplayName() {
        return this._instance.current_driver
            ? this._instance.current_driver?.last_name + ' ' + this._instance.current_driver?.first_name
            : ''
    }

    public get getPrincipalDriverDisplayAvatar() {
        return '';
    }

    public get getPrincipalDriverHourPassation() {
        return this.hasPassationInit ? `Passation prévue à 12H` : '';
    }

    public get getPrincipalDriverGrade() {
        return '';
    }

    public get getRegistrationWithColor() {
        return `${this.getRegistration} - ${this.getColor}`
    }

    public static toVSelect(datas: Vehicle[] | undefined): VSelectProp[] {
        if (!datas) {
            return [];
        }
        return datas.map((sl) => ({
            label: sl.getBrandWithColor,
            value: sl._instance.id,
        }));
    }

    public get hasPrincipalDriver(): boolean {
        return true
    }

    public get hasSecondaryDriver(): boolean {
        return false
    }


    public get hasPassationInit(): boolean {
        return false
    }

}

export default Vehicle;
