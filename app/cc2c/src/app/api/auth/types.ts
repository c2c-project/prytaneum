export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    role: 'ADMIN' | 'TEACHER' | 'USER';
};

export type UserWithoutPass = Omit<User, 'password'>;
