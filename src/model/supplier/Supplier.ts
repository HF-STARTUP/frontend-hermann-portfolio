import Model from "@/model/Model";
import {RoleResponseType} from "@/types/driver.type";
import {VSelectProp} from "@/components/form/TextField";
import Region from "@/model/location/Region";
import {ActivityCategory, SupplierResponseType} from "@/types/supplier.type";

class Supplier extends Model{
    public id: number;
    public logo: string;
    public name: string;
    public business_name: string;
    public social_reason: string;
    public niu: string;
    public rccm: string;
    public phone: string;
    public email: string;
    public region_id: number;
    public supplier_category_id: number;
    public city: string;
    public street: string;
    public created_at: Date;
    public updated_at: Date;
    public region?: Region;
    public activity_category?: ActivityCategory;
    public contactSupplier?: any[];
    desactivate_at: Date|null

    constructor(supplierData: SupplierResponseType) {
        super()
        this.id = supplierData.id;
        this.logo = supplierData.logo;
        this.name = supplierData.name;
        this.business_name = supplierData.business_name;
        this.social_reason = supplierData.social_reason;
        this.niu = supplierData.niu;
        this.rccm = supplierData.rccm;
        this.phone = supplierData.phone;
        this.email = supplierData.email;
        this.region_id = supplierData.region_id;
        this.supplier_category_id = supplierData.supplier_category_id;
        this.city = supplierData.city;
        this.street = supplierData.street;
        this.created_at = new Date(supplierData.created_at);
        this.updated_at = new Date(supplierData.updated_at);
        this.desactivate_at = supplierData.desactivate_at&&new Date(supplierData.desactivate_at);


        if (supplierData.region) {
            this.region = new Region(supplierData.region);
        }
        if (supplierData.activity_category) {
            this.activity_category = new ActivityCategoryModel(supplierData.activity_category);
        }
        if (supplierData.contactSupplier) {
            this.contactSupplier = supplierData.contactSupplier.map(contact => new ActivityCategoryModel(contact));
        }
    }

    public static toSuppliers(datas: SupplierResponseType[]): Supplier[] {
        return datas.map(v => new Supplier(v)).reverse();
    }

    public static toVSelect(datas: Supplier[] | undefined): VSelectProp[] {
        if (!datas) {
            return [];
        }
        return datas.map((sl) => ({
            label: sl.name,
            value: sl.id.toString(),
        }));
    }

    get getCity(){
        return `${this.city}`
    }

    public get getDisplayName() {
        return `${this.name}`
    }

    public get getFilterToken(){
        return this.getDisplayName
    }

    get getStreet() {
        return `${this.street}`
    }

    public get getLocation() {
        return `${this.getCity} - ${this.street}`
    }

    public get getActivity() {
        return `${this.activity_category?.name}`
    }

    public get getLogo() {
        return this.resolveImage(this.logo)
    }
    public get isDeactivated() {
        return !!this.desactivate_at
    }

    public get getFindToken() {
        return `${this.getDisplayName} ${this.getCity} ${this.getActivity} ${this.getLocation} ${this.getLocation}`.toLowerCase()
    }
}


class ActivityCategoryModel {
    public id: number;
    public name: string;
    public account_id: string;

    constructor(activityCategoryData: any) {
        this.id = activityCategoryData.id;
        this.name = activityCategoryData.name;
        this.account_id = activityCategoryData.account_id;
    }
}

export class SupplierCtg extends Model {
    public id: number;
    public name: string;

    constructor(data: RoleResponseType) {
        super();
        this.id = data.id;
        this.name = data.name;
    }

    public static toSuppliers(datas: RoleResponseType[]): SupplierCtg[] {
        return datas.map(v => new SupplierCtg(v)).reverse();
    }

    public static toVSelect(datas: SupplierCtg[] | undefined): VSelectProp[] {
        if (!datas) {
            return [];
        }
        return datas.map((sl) => ({
            label: sl.name,
            value: sl.id.toString(),
        }));
    }
}

export default Supplier
