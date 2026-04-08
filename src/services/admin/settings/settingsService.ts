import Service from "@/services/Service";
import {CourseResponseType} from "@/types/course.types";
import {
    AddAdminInput,
    AddAdminOnCityInput,
    RemoveAdminOnCityInput,
    UpdatePasswordInput,
    UpdateProfileInput
} from "@/schema/ADMIN/settings.schema";
import UserProfile from "@/model/user/User";
import {AdminProfileResponseType, AdminResponseData, GetAdminsParams} from "@/types/__form/profile.type";
import { toQueriesString } from "@/lib/utils";

export enum SettingsApiPath {
    UpdateProfile = '/profile',
    AdminList = '/root',
    AdminData = '/root/{profile_id}',
    UpdatePassword = '/admin-reset-password',
    DeleteFleet = '/root/delete-park',
    AdminAccess = '/access-root',
    createAdmin = '/root/users',
    AddAdminOnCity = '/root/add-admin-on-city',
    DeactivateActiveAdmin = "/root/deactivate-activate",
    RemoveAdminOnCity = "/root/remove-admin-on-city",
}

export type RoleType = {
    id: number;
    name: string;
    enable: boolean;
}

export enum ACCESS_TYPE {
    READ = "read",
    WRITE = "write"
}


class SettingsService extends Service {
    private static instance: SettingsService = new SettingsService();

    private constructor() {
        super();
    }

    public static getInstance(): SettingsService {
        return SettingsService.instance;
    }

    public static async updateAdmin(id: string, formData: AddAdminInput) {
        const processedData = {
            ...formData,
            cities_id: JSON.stringify(formData.cities_id),
        };
        
        return await SettingsService.getInstance().execHttpRequest<CourseResponseType>({
            url: `${SettingsApiPath.createAdmin}/${id}`,
            method: SettingsService.getInstance().httpMethods.update,
            body: processedData,
        });
    }

    public static async createNewAdmin(formData: AddAdminInput) {        
        return await SettingsService.getInstance().execHttpRequest<CourseResponseType>({
            url: SettingsApiPath.createAdmin,
            method: SettingsService.getInstance().httpMethods.post,
            body: formData,
        });
    }

    public static async updateProfile({id: profile_id, ...formData}: UpdateProfileInput) {
        return await SettingsService.makeRequest<CourseResponseType>(SettingsApiPath.UpdateProfile + "/" + profile_id, 'PUT', formData)
    }

    public static async deactivateActivate({ id }: { id: string }) {
        return await SettingsService.getInstance().execHttpRequest<CourseResponseType>({
            url: `${SettingsApiPath.DeactivateActiveAdmin}/${id}`,
            method: SettingsService.getInstance().httpMethods.update,
        });
    }

    public static async updatePassword({old_password, new_password, email}: UpdatePasswordInput) {
        return await SettingsService.makeRequest<CourseResponseType>(SettingsApiPath.UpdatePassword, 'POST', {
            email: email,
            password: old_password,
            new_password
        })
    }

    public static async getAdminAccess(): Promise<RoleType[]> {
        const uri = SettingsApiPath.AdminAccess
        return await SettingsService.makeRequest<RoleType[]>(uri, 'GET')
    }

    public static async getAdminList(params: GetAdminsParams) {
        const uri = toQueriesString(SettingsApiPath.AdminList, params)
        const response = await SettingsService.makeRequest<AdminResponseData>(uri, 'GET')

        return {
            admins: UserProfile.fromArray(response.data),
            totalPages: response.totalPages,
            totalRecords: response.totalRecords,
            currentPage: response.currentPage,
            itemPerPage: response.itemPerPage
        }
    }

    public static async getAdmin(id?: string) {
        const uri = toQueriesString(SettingsApiPath.AdminData.replace("{profile_id}", id??""), {})
        const response = await SettingsService.makeRequest<AdminProfileResponseType>(uri, 'GET')

        return new UserProfile(response)
    }

    static refreshAdmins() {
        return SettingsService.getInstance().queryClient.invalidateQueries({queryKey: [SettingsApiPath.AdminList]})
    }

    public static async addAdminOnCity(formData: AddAdminOnCityInput) {
        return await SettingsService.makeRequest(SettingsApiPath.AddAdminOnCity, 'POST', formData);
    }

    public static async removeAdminOnCity(formData: RemoveAdminOnCityInput) {
        return await SettingsService.makeRequest(SettingsApiPath.RemoveAdminOnCity, 'POST', formData);
    }

    public static async deleteFleet({id}: DeleteFleetProps) {
        return await SettingsService.makeRequest<CourseResponseType>(SettingsApiPath.DeleteFleet + "/" + id, 'DELETE')
    }


    protected static async makeRequest<T>(url: string, method: 'GET' | 'POST' | 'PUT' | "DELETE", body?: any): Promise<T> {
        return this.getInstance().execHttpRequest<T>({url, method, body});
    }


}

export default SettingsService;

export type DeleteFleetProps = {
    id: string
}

