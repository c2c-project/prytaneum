export interface RegisterForm {
    username?: string;
    password?: string;
    email?: string;
    confirmPassword?: string;
}

export interface ForgotPassRequestForm {
    email: string;
}

export interface ForgotPassForm {
    password?: string;
    confirmPassword?: string;
}
