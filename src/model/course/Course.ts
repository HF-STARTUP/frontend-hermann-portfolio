import Model from "@/model/Model";
import Vehicle from "@/model/vehicule/Vehicule";
import {CourseResponseType} from "@/types/course.types";
import ClientModel from "@/model/client/ClientModel";
import Driver from "@/model/driver/Driver";
import {CourseAddress} from "@/schema/course.schema";
import {AddressInterface} from "@/schema/supplier.schema";
import {TASK_STATUS} from "@/types/entretien.types";
import {DriverResponseType} from "@/types/driver.type";


class Course extends Model {
    private _instance: CourseResponseType


    constructor(datas: CourseResponseType) {
        super()
        this._instance = datas
    }

    static toArrays(datas: CourseResponseType[]): Course[] {
        return datas.map(data => new Course(data));
    }

    get id() {
        return this._instance.id
    }

    get client() {
        return new ClientModel(this._instance.client)
    }

    get vehicle() {
        return new Vehicle(this._instance.vehicle)
    }

    get amount() {
        return this._instance.amount
    }

    get status() {
        return this._instance.status
    }

    get startAt() {
        return this.formatDate(this._instance.start_date)
    }

    get startHour() {
        return this.formatDate(this._instance.start_date, 'H : m')
    }

    get currentDriver() {
        return this._instance?.vehicle?.current_driver ? new Driver(this._instance.vehicle.current_driver as DriverResponseType) : null
    }

    get distance() {
        return this._instance.distance ? this.arroundNumb(this._instance.distance) + ' km' : null
    }

    get startAddress(): CourseAddress | null {
        return this._toCourseAddress(this._instance.start_address)
    }

    get endAddress(): CourseAddress | null {
        return this._toCourseAddress(this._instance.end_address)
    }


    get startAddressName() {
        return this._instance.start_address?.name
    }

    get endAddressName() {
        return this._instance.end_address?.name
    }

    get finished() {

        return this.status === TASK_STATUS.FINISHED
    }

    get isAvailable() {
        return ![TASK_STATUS.FINISHED, TASK_STATUS.CANCELED].includes(this.status)
    }

    get isEditable() {
        return this.status !== TASK_STATUS.INPROGRES
    }

    private _toCourseAddress(address?: AddressInterface): CourseAddress | null {
        return address ? {...address, longitude: +address.longitude, latitude: +address.latitude} : null
    }


}


export default Course;

