export interface IUsers {
    id: number;
    firstName: string;
    lastName: string;
    email?: string | undefined | null;
    photo?: string | null | undefined;
    roles?: string[];
    createdAt?: string | null | undefined;
    biography?: string | null | undefined;
    subscription?: string | null | undefined; 
    image?: string | null| undefined;
  }
  
