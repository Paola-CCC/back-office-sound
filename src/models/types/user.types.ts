
export enum UserRoles {
    client = 'ROLE_USER',
    professor = 'ROLE_PROFESSOR',
    admin = 'ROLE_ADMIN',
    superAdmin = 'ROLE_SUPER_ADMIN',
};

export type User = {
    id?: number;
    firstName?: string;
    lastName?: string;
    password?: string;
    email?: string | undefined | null;
    photo?: string | null | undefined;
    roles?: string[] | string;
    createdAt?: string | null | undefined;
    biography?: string | null | undefined;
    subscription?: string | null | undefined; 
    image?: string | null| undefined;
}