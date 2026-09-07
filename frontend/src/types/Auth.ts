export interface LoginRequest {
    identifier: string,
    password: string,
}

export interface LoginResponse {
    token: string,
}

export interface RegisterRequest {
    username: string,
    email: string,
    password: string,
}

export interface RegisterResponse {
    username: string,
    email: string,
}

export interface EmailRequest {
    email: string,
}

export interface ResetPasswordRequest {
    token: string,
    password: string,
}

export interface MessageResponse {
    message: string,
}
