import {USER_LOAD, USER_LOGIN, USER_LOGIN_ERROR, USER_LOGIN_OK, USER_LOGOUT, UserActionType, UserState} from "./types";

const iniState: UserState = {
 user: undefined,
 token: "",
 isLoading: false,
 isAuthing: false,
 error: undefined,
}

export function userReducer(state = iniState, action: UserActionType): UserState {
 switch (action.type) {
  case USER_LOAD: {
   return {...state, isLoading: true};
  }
  case USER_LOGIN: {
   return {...state, isAuthing: true, error: undefined};
  }
  case USER_LOGIN_OK: {
   return {...state, isAuthing: false, isLoading: false, user: action.user, token: action.token};
  }
  case USER_LOGIN_ERROR: {
   return {...state, isAuthing: false, isLoading: false, error: action.error};
  }
  case USER_LOGOUT: {
   return {...iniState};
  }
  default: {
   return state;
  }
 }
}