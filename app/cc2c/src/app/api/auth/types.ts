export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    isTeacher: boolean;
    isAdmin: boolean;
};

export type UserWithoutPass = Omit<User, 'password'>;
