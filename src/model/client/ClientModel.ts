import Model from "@/model/Model";
import { DrawalModeType, DRAWAL_MODE } from "@/types/drawal.types";
import {ClientResponseType} from "@/types/client.types";
import {CourseAddress} from "@/schema/course.schema";


export  class ClientModel extends Model {
    private _instance: ClientResponseType


    constructor(datas: ClientResponseType) {
        super()
        this._instance = datas
    }

    static toArrays(datas: ClientResponseType[]): ClientModel[] {
        return datas.map(data => new ClientModel(data)).reverse();
    }

    public get getFindToken(){
        return `${this.phoneWithEmail} ${this.username} ${this.courseCount}`
    }


    get id() {
        return this._instance.id
    }

    get email(): string {
        return this._instance?.email ?? ''
    }

    get phone(): string {
        return this._instance?.phone ?? ''
    }

    get phoneWithEmail() {
        return '+' + this.phone + " - " + this.email
    }

    get username() {
        return this._instance.name
    }

    get courseCount(): number {
        return this._instance.totalCourse
    }
    get address(): string {
        if (Array.isArray(this._instance.address)) {
            return this._instance.address.length > 0 ? this._instance.address[0].name : '';
        } else {
            return this._instance.address ? this._instance.address.name : '';
        }
    }

    get addressList(): string[] {
        if (Array.isArray(this._instance.address)) {
            return this._instance.address.map(address => address.name);
        } else {
            return this._instance.address ? [this._instance.address.name] : [];
        }
    }

    get rawAddress(): CourseAddress | null {
        if (Array.isArray(this._instance.address)) {
            return this._instance.address.length > 0 ? this._instance.address[0] : null;
        } else {
            return this._instance.address || null;
        }
    }

    get rawAddressList(): CourseAddress[] | null {
        if (Array.isArray(this._instance.address)) {
            return this._instance.address.length > 0 ? this._instance.address : null;
        } else {
            return this._instance.address ? [this._instance.address] : null;
        }
    }
}




class DrawalModeModel extends Model {
    private _instance: DrawalModeType;

    constructor(datas: DrawalModeType) {
        super();
        this._instance = datas;
    }

    static toArrays(datas: DrawalModeType[]): DrawalModeModel[] {
        return datas.map(data => new DrawalModeModel(data)).reverse();
    }

    get id(): string {
        return this._instance.id;
    }

    get name(): string {
        return this.capitalizeFirstLetter(this._instance.title);
    }

    get type(): DRAWAL_MODE {
        return this._instance.type;
    }

    get countryId(): number {
        return this._instance.country_id;
    }

    get image(): string {
        return this.resolveImage(this._instance.image);
    }

    get title(): string {
        return this._instance.name;
    }

    public getInfo(): string {
        return `${this.name} operates in ${this.countryId} and supports ${this.type}.`;
    }
}

export default ClientModel;
