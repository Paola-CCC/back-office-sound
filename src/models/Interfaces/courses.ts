import { Categories, Composers, Instrument, Quizz, Rating } from "../types/courses.types";
import { User } from "../types/user.types";

export interface ICourses {
    id: number;
    title: string;
    description: string;
    price: number;
    ratingScore: number;
    linkVideo: string;
    users?: any[]; 
    professor?: User | null;
    composers: Composers[];
    categories?: Categories[];
    instrument?: Instrument;
    preview: string;
    photo: string;
    createdAt?: string;
    updatedAt?: string | null;
    ratings?: Rating[] | any[] | [];
    quizz?: Quizz;
}