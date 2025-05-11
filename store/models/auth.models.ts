
export interface AuthReq {
    user: {
        email: string;
        password: string;
    }
}

export interface AuthResponse {
    user: UserModel;
    access_token: string;
    refresh_token: string;
}

export interface UserModel {
    email: string
}