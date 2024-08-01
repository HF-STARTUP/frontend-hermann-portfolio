import {DriverObjectiveResponseType, DriverResponseType} from "@/types/driver.type";
import Model from "@/model/Model";
import {ActivityVariant} from "@/components/box/AdminListItemComponents";
import Vehicle from "@/model/vehicule/Vehicule";


/***
 * @property @static toDrivers
 * */
class Driver extends Model {

    _instance: DriverResponseType

    constructor(driverData: DriverResponseType) {
        super();
        this._instance = driverData
    }

    get id() {
        return this._instance.id
    }

    public static toDrivers(datas: DriverResponseType[]): Driver[] {
        return datas.map(data => new Driver(data));
    }

    public get getFindToken() {
        return `${this.getUsername} ${this.getGrade} ${this.getPhone} ${this.getExperience} ${this.getDriverActivity}`
    }

    public get getUsername() {
        return this.capitalizeFirstLetter(`${this._instance.last_name} ${this._instance.first_name}`)
    }

    public get getFirstname() {
        return this.capitalizeFirstLetter(`${this._instance.first_name}`)
    }

    public get getLastname() {
        return this.capitalizeFirstLetter(`${this._instance.last_name}`)
    }

    public get getCNINumber() {
        return (`${this._instance.cni_number}`).toUpperCase()
    }

    public get getTag() {
        return ''
    }

    public get getPhone() {
        return this._instance?.phone ?? ''
    }

    public get getBirthday() {
        return this._instance.birthday ? this.toDate(this._instance.birthday) : ""
    }

    public get getDriverType() {
        return this._instance?.driver_type
    }

    public get getExperienceYear(): number {
        const startDate: Date = this._instance.issue_delivery_on ?? new Date()

        const currentDate = new Date();
        let experienceYears = currentDate.getFullYear() - startDate.getFullYear();

        const monthDifference = currentDate.getMonth() - startDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < startDate.getDate())) {
            experienceYears--;
        }

        return experienceYears >= 0 ? experienceYears : 0;
    }

    public get getExperience(): string {

        const year = this.getExperienceYear

        return `${year} an${year > 1 ? 's' : ''} de conduite`
    }

    get email() {
        return this._instance?.email ?? ''
    }

    public get contactEmailAndPhone(): string {

        return `${this.getPhone}-${this.email}`
    }

    public get isSuspended(): boolean {
        return !!this._instance.blocked_at
    }

    public get isDeactivated(): boolean {
        return !!this._instance.desactivate_at
    }

    get sex() {

        return this._instance.sex === "men" ? "Masculin" : "Féminin"
    }

    get driverLicenceNumber() {
        return this.capitalizeFirstLetter(this._instance.driver_licence_number)
    }

    get licenceType() {
        return this.capitalizeFirstLetter(this._instance.driver_licence_type)
    }

    get licenceCountry() {
        return this.capitalizeFirstLetter(this._instance.country_delivery)
    }

    get licenceDeliveryOn() {
        return this.toDate(this._instance.issue_delivery_on)
    }

    get licenceExpireAt() {
        return this.toDate(this._instance.expire_delivery_at)
    }


    get dayOffs(): string[] {

        const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]

        return this._instance.day_off.map((d, i) => (days[i]))
    }

    public get available(): boolean {
        return !this.isDeactivated && !this.isDeactivated
    }

    public get getAvatar() {
        return this.resolveImage(typeof this._instance?.image === "object" ? this._instance.image.path : this._instance.image)
    }

    public get getGrade() {
        return this.capitalizeFirstLetter(this._instance.grade)
    }

    public get getDaysOff() {
        return this._instance.days_off ?? ''
    }

    public get getGradeVariant() {
        return ''
    }

    public get hasPrincipalVehicule() {
        return !!this._instance.vehicle_principal_id
    }

    public get getPrincipalVehiculeImage() {
        return this.currentVehicle?.getCover ?? ''
    }

    public get getActualDriver() {
        return ''
    }

    public get suspendPeriod() {
        //const suspendReveal = this._instance.blocked_at ? this.toDate(this._instance.blocked_at) : ""
        return `Chauffeur suspendu jusqu’au`
    }

    public get getSuspendRestDays(): number {
        return this.getDifferenceInDays(this._instance.blocked_at ?? new Date(), new Date())
    }

    public get getDriverActivity(): string {
        let activity = this.getActualDriver
        if (this.isSuspended) activity = this.suspendPeriod
        if (this.isDeactivated) activity = ''

        return activity
    }

    public get getDriverActivityUiStatus(): ActivityVariant {
        let activityStatus: ActivityVariant = 'default'
        if (this.isSuspended) activityStatus = 'endError'

        return activityStatus
    }

    get vehicle(): Vehicle | null {
        return this._instance.vehicle ? new Vehicle(this._instance.vehicle) : null
    }

    get currentVehicle(): Vehicle | null {
        return this._instance.current_vehicle ? new Vehicle(this._instance.current_vehicle) : null
    }


}


export class DriverRecipeModel extends Model {

    _instance: DriverObjectiveResponseType

    constructor(data: DriverObjectiveResponseType) {
        super();
        this._instance = data
    }

    get id() {
        return this._instance.id
    }

    get encaissed() {
        return +this.actual_recipe >= +this.objective
    }

    get objective() {
        return this._instance.objective
    }

    get actual_recipe() {
        return this._instance.actual_recipe
    }

    get driver() {
        return new Driver(this._instance.driver)
    }

    get vehicle() {
        return new Vehicle(this._instance.vehicle)
    }

    public static fromArrays(datas: DriverObjectiveResponseType[]): DriverRecipeModel[] {
        return datas.map(data => new DriverRecipeModel(data));
    }
}


export default Driver;

