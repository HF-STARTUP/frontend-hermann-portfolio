import Service from "@/services/Service";
import {CourseResponseType} from "@/types/course.types";
import {
    AddAdminInput,
    AddAdminOnCityInput, RemoveAdminOnCityInput,
    UpdatePasswordInput,
    UpdateProfileInput
} from "@/schema/ADMIN/settings.schema";
import UserProfile from "@/model/user/User";
import {AdminProfileResponseType} from "@/types/__form/profile.type";

export enum SettingsApiPath {
    UpdateProfile = '/profile',
    AdminList = '/root',
    UpdatePassword = '/admin-reset-password',
    DeleteFleet = '/root/delete-park',
    AdminAccess = '/access-root',
    createAdmin = '/root/create-admin-on-city',
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

    public static async createNewAdmin(formData: AddAdminInput) {
        return await SettingsService.makeRequest(SettingsApiPath.createAdmin, 'POST', formData);
    }

    public static async updateProfile({id: profile_id, ...formData}: UpdateProfileInput) {
        return await SettingsService.makeRequest<CourseResponseType>(SettingsApiPath.UpdateProfile + "/" + profile_id, 'PUT', formData)
    }

    public static async deactivateActivate({id}: { id: string }) {
        return await SettingsService.makeRequest<CourseResponseType>(SettingsApiPath.DeactivateActiveAdmin + "/" + id, 'GET')
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

    public static async getAdminList(): Promise<UserProfile[]> {
        const uri = SettingsApiPath.AdminList
        const list = await SettingsService.makeRequest<AdminProfileResponseType[]>(uri, 'GET')

        return UserProfile.fromArray(list)
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

