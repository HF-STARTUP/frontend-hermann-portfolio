import Model from "@/model/Model";
import {
  AdminAccountStatus,
  AdminProfileResponseType,
} from "@/types/__form/profile.type";

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
    return this._instance?.status ?? "inactive";
  }

  get user() {
    return this._instance?.user ?? {};
  }

  get password() {
    return this._instance?.password ?? "";
  }

  get userID() {
    return this._instance?.id ?? "";
  }

  get profileUserID() {
    return this._instance?.user?.id ?? "";
  }

  get cities() {
    return this._instance?.admin_on_city ?? [];
  }

  get username() {
    const lastName = this._instance?.last_name ?? "";
    const firstName = this._instance?.first_name ?? "";
    return lastName + " " + firstName;
  }

  get roles() {
    return this._instance?.roles ?? [];
  }

  get role() {
    return this.roles[0] ?? null;
  }

  get roleName(): string {
    const role = this._instance?.roles?.[0];
    if (role?.name) {
      return role.name
        .replace(/_/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
    }
    return "Admin";
  }

  get listPark() {
    return this._instance?.admin_on_city ?? [];
  }

  get defaultPark() {
    const default_park = this._instance?.admin_on_city?.[0];
    return default_park ?? null;
  }

  get getID() {
    return this._instance?.id ?? "";
  }

  get getOrganisationName() {
    return "";
  }

  get getOrganisationLogo() {
    const imagePath = this._instance?.Image?.path;
    if (imagePath) {
      return this.getAdminImage(this.resolveImage(imagePath));
    }
    return this.getAdminImage();
  }

  get firstName() {
    return this._instance?.first_name ?? "";
  }

  get lastName() {
    return this._instance?.last_name ?? "";
  }

  get getUsername() {
    const firstName = this._instance?.first_name ?? "";
    const lastName = this._instance?.last_name ?? "";
    return `${firstName} ${lastName}`;
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

  get readRoles() {
    return this._instance?.roles ?? [];
  }

  get writeRoles() {
    return this._instance?.roles ?? [];
  }
}

export default UserProfile;