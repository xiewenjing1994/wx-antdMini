export interface Login {
    token: string;
    userInfo: UserInfo;
}

interface UserInfo {
    name: string;
    role: string;
}