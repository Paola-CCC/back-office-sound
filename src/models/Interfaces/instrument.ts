import { ICourses } from "./courses";

export interface IInstruments {
    id: number;
    name: string;
    level: number[];
    courses?: ICourses[];
}