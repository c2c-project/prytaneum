export interface RegisterForm {
    password?: string;
    email?: string;
    confirmPassword?: string;
    firstName: string;
    lastName: string;
}

export interface ForgotPassRequestForm {
    email: string;
}

export interface ForgotPassForm {
    password?: string;
    confirmPassword?: string;
}
