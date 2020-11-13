import {IUser} from "../../interfaces/User";

export interface UserState {
 user?: IUser
 token: string
 isLoading: boolean
 isAuthing: boolean
 error: any
}

export const USER_LOAD = 'user/load';
export const USER_LOGIN = 'user/login';
export const USER_LOGIN_OK = 'user/loginOk';
export const USER_LOGIN_ERROR = 'user/loginError';
export const USER_LOGOUT = 'user/logout';

interface UserActionLoad {
 type: typeof USER_LOAD
}

interface UserActionLogin {
 type: typeof USER_LOGIN
}

interface UserActionLoginOk {
 type: typeof USER_LOGIN_OK
 user: IUser
 token: string
}

interface UserActionLoginError {
 type: typeof USER_LOGIN_ERROR
 error: any
}

interface UserActionLogout {
 type: typeof USER_LOGOUT
}

export type UserActionType = UserActionLoad
 | UserActionLogin
 | UserActionLoginOk | UserActionLoginError
 | UserActionLogout
