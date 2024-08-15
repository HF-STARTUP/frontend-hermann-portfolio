import Service from "@/services/Service";
import {ResponseWithPagination} from "@/types/generic";
import {CreateCourseInputs} from "@/schema/course.schema";
import Course from "@/model/course/Course";
import {CourseResponseType} from "@/types/course.types";
import {UpdatePasswordInput, UpdateProfileInput} from "@/schema/ADMIN/settings.schema";

export enum SettingsApiPath {
    UpdateProfile = '/profile',
    UpdatePassword = '/admin-reset-password',
}

class SettingsService extends Service {
    private static instance: SettingsService = new SettingsService();

    private constructor() {
        super();
    }

    public static getInstance(): SettingsService {
        return SettingsService.instance;
    }

    // public static async createNewCourse(formData: CreateCourseInputs): Promise<Course> {
    //     const courseResult = await SettingsService.makeRequest<CourseResponseType>(SettingsApiPath.createCourse, 'POST', formData);
    //     return new Course(courseResult)
    // }

    public static async updateProfile({id: profile_id, ...formData}: UpdateProfileInput) {
        const updateResult = await SettingsService.makeRequest<CourseResponseType>(SettingsApiPath.UpdateProfile + "/" + profile_id, 'PUT', formData);
        return updateResult
    }

    public static async updatePassword({old_password, new_password, email}: UpdatePasswordInput) {
        const updateResult = await SettingsService.makeRequest<CourseResponseType>(SettingsApiPath.UpdatePassword, 'POST', {
            email: email,
            password: old_password,
            new_password
        });
        return updateResult
    }

    // public static async getCourses(parkID: string): Promise<Course[]> {
    //     const courseUri = SettingsApiPath.getCourses + '/by/' + parkID
    //     const courseResponse = await SettingsService.makeRequest<ResponseWithPagination<CourseResponseType[]>>(courseUri, 'GET');
    //     return Course.toArrays(courseResponse.data)
    // }


    // static refreshCourse() {
    //     return SettingsService.getInstance().queryClient.invalidateQueries({queryKey: [SettingsApiPath.getCourses]})
    // }

    protected static async makeRequest<T>(url: string, method: 'GET' | 'POST' | 'PUT', body?: any): Promise<T> {
        return this.getInstance().execHttpRequest<T>({url, method, body});
    }


}

export default SettingsService;
