import { ICourses } from "./courses";

export interface ICategories {
    id: number;
    name: string;
    course?: ICourses[];
}