import { ICourses } from "../Interfaces/courses";
import { User } from "./user.types";

export type Composers = {
    id: number;
    fullName: string;
}

export type Categories = {
    id: number;
    name: string;
}

export type Instrument = {
    id: number;
    name: string;
    level?: number[];
}

export type Rating = {
    id: number;
    value?: number | null;
    user?: User
    course?: ICourses[];

}

export type Quizz = {
    id: number;
    title: string;
    question: any[];
}



