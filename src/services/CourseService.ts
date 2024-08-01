import Service from "@/services/Service";
import {ResponseWithPagination} from "@/types/generic";
import {CreateCourseInputs} from "@/schema/course.schema";
import Course from "@/model/course/Course";
import {CourseResponseType} from "@/types/course.types";

export enum CourseApiPath {
    createCourse = '/course',
    getCourses = '/course',
    getCourse = '/course',
}

class CourseService extends Service {
    private static instance: CourseService = new CourseService();

    private constructor() {
        super();
    }

    public static getInstance(): CourseService {
        return CourseService.instance;
    }

    public static async createNewCourse(formData: CreateCourseInputs): Promise<Course> {
        const courseResult = await CourseService.makeRequest<CourseResponseType>(CourseApiPath.createCourse, 'POST', formData);
        return new Course(courseResult)
    }

    public static async updateCourse({course_id, ...formData}: CreateCourseInputs): Promise<Course> {
        const updateResult = await CourseService.makeRequest<CourseResponseType>(CourseApiPath.createCourse + "/" + course_id, 'PUT', formData);
        return new Course(updateResult)
    }

    public static async getCourses(parkID: string): Promise<Course[]> {
        const courseUri = CourseApiPath.getCourses + '?park_id=' + parkID
        const courseResponse = await CourseService.makeRequest<ResponseWithPagination<CourseResponseType[]>>(courseUri, 'GET');
        return Course.toArrays(courseResponse.data)
    }

    public static async getCourse(courseID: string): Promise<Course> {
        const courseResponse = await CourseService.makeRequest<CourseResponseType>(CourseApiPath.getCourse + `/${courseID}`, 'GET');
        return new Course(courseResponse)
    }

    static refreshCourse() {
        return CourseService.getInstance().queryClient.invalidateQueries({queryKey: [CourseApiPath.getCourses]})
    }

    protected static async makeRequest<T>(url: string, method: 'GET' | 'POST' | 'PUT', body?: any): Promise<T> {
        return this.getInstance().execHttpRequest<T>({url, method, body});
    }


}

export default CourseService;
