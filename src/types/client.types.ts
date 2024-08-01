import {CourseAddress} from "@/schema/course.schema";

export type ClientResponseType = {
    id: string;
    name: string;
    phone: string;
    email?: string
    address?: CourseAddress | CourseAddress[] | null;
    totalCourse: number;
}
