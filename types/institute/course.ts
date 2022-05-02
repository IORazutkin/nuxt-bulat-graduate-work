import {Institute} from "~/types/institute/institute";

export interface Course {
    id: number
    institute: Institute
    num: string
    title: string
}
