
import { Composers } from "../types/courses.types";
import { ICategories } from "./categories";
import { IInstruments } from "./instrument";
import { IUsers } from "./users";

export interface ICoursesDatasCreation {
    professors: IUsers[];
    categories: ICategories[];
    composers: Composers[];
    instruments: IInstruments[]
}