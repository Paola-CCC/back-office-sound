import { Categories } from "../types/courses.types";
import { User } from "../types/user.types";

export interface IForum {
    id: number;
    subject: string;
    createdAt: string;
    author: User;
    category: Categories[] | [];
    description: string;
    answersCount: number;
    likesCount: number;
    dislikesCount: number;
}