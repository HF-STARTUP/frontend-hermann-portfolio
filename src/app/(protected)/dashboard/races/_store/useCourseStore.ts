import {create} from 'zustand';
import {CourseAddress} from "@/schema/course.schema";


type CourseStore = {
    startLocation?: CourseAddress;
    endLocation?: CourseAddress;

    setStartLocation: (location?: CourseAddress)=>void
    setEndLocation: (location?: CourseAddress)=>void

}


const useCourseStore = create<CourseStore>((set, getState) => ({
    promptValue: '',
    setStartLocation: (c) => set({startLocation: c}),
    setEndLocation: (c) => set({endLocation: c}),

}));

export default useCourseStore;
