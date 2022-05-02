import {Course} from "~/types/institute/course";

export interface Lesson {
    id: number
    title: string
    course: Course
}
