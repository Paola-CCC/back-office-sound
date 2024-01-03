import { Composers } from "../types/courses.types";
import { ICourses } from "./courses";

type GuestUser = Pick<ICourses, 'id' | 'title'>;

export interface IComposers extends Composers {
    biography?: string;
    courses?: readonly GuestUser[];
}
  

