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

  get image(){
    return this._instance.Image ? this.resolveImage(this._instance.Image.path):"/assets/admin-default-cover.png"
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

  get email(){
    return this._instance.user? this._instance.user.email : ""
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
    return this.defaultCity ?? this._instance?.admin_on_city?.[0] ?? null;
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

  get countries() {
    return this._instance?.admin_countries ?? [];
  }

  get citiesByCountry() {
    return this._instance?.cities_by_country ?? [];
  }

  get defaultCountryId() {
    return this._instance?.default_country_id ?? null;
  }

  get defaultCountry() {
    return this._instance?.default_country ?? null;
  }

  get defaultCityId() {
    return this._instance?.default_city_id ?? null;
  }

  get defaultCity() {
    return this._instance?.default_city ?? null;
  }

  get getActiveCurrency() {
    return this.defaultCity?.country?.currency ?? this.defaultCountry?.currency ?? "";
  }

  get getActiveRegion() {
    return this.defaultCity?.name ?? this.defaultCountry?.name ?? "Unknow";
  }

  get getUserFirstRegionCurrency() {
    return this.defaultCountry?.currency ?? this.defaultCity?.country?.currency ?? "Unknow";
  }

  get getCurrencyObj() {
    return this.defaultCity?.country ?? this.defaultCountry ?? "Unknow";
  }

  get readRoles() {
    return this._instance?.roles ?? [];
  }

  get writeRoles() {
    return this._instance?.roles ?? [];
  }
}

export default UserProfile;