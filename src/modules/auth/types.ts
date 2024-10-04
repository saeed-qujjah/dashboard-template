export type LoginRequest = {
    email: string;
    password: string;
};

export type User = {
    id: string;
    full_name: string;
    email: string;
    phone_number: string;
    role: string;
};

export type LoginResponse = {
    user: User;
    token: string;
};