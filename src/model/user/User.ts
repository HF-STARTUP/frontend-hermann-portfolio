import Model from "@/model/Model";
import {
  AdminAccountStatus,
  AdminProfileResponseType,
} from "@/types/__form/profile.type";
import { ACCESS_TYPE } from "@/services/admin/settings/settingsService";

class UserProfile extends Model {
  public _instance: AdminProfileResponseType;

  constructor(userProfileData: AdminProfileResponseType) {
    super();
    this._instance = userProfileData;
  }

  static fromArray(datas: AdminProfileResponseType[]): UserProfile[] {
    return datas.map((data) => new UserProfile(data));
  }

  get status(): AdminAccountStatus {
    return this._instance.status;
  }

  get user() {
    return this._instance.user;
  }

  get userID() {
    return this._instance.id;
  }

  get profileUserID() {
    return this._instance.user.id;
  }

  get cities() {
    return this._instance.admin_on_city;
  }

  get username() {
    return this._instance.last_name + " " + this._instance.first_name;
  }

  get roles() {
    return this._instance.roles;
  }

  get role(){
    return this.roles[0]
  }

  get roleName():string {
    return this._instance.roles[0] ?this._instance.roles[0].name
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase()):"-";
  }

  get listPark() {
    return this._instance.admin_on_city;
  }

  get defaultPark() {
    const default_park = this._instance.admin_on_city[0];
    return default_park;
  }

  get getID() {
    return this._instance.id;
  }

  get getOrganisationName() {
    return "";
  }

  get getOrganisationLogo() {
    return "";
  }

  get firstName() {
    return this._instance.first_name;
  }

  get lastName() {
    return this._instance.last_name;
  }

  get getUsername() {
    return `${this._instance.first_name} ${this._instance.last_name}`;
  }

  get isGranted() {
    return false;
  }

  get parks() {
    return [];
  }

  get getActiveCurrency() {
    return "";
  }

  get getActiveRegion() {
    return "Unknow";
  }

  get getUserFirstRegionCurrency() {
    return "Unknow";
  }

  get getCurrencyObj() {
    return "Unknow";
  }
}

export default UserProfile;
