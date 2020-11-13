import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppState} from "../index";
import {USER_LOAD, USER_LOGIN, USER_LOGIN_ERROR, USER_LOGIN_OK, USER_LOGOUT, UserActionType} from "./types";
import {auth} from "../../services/firebase";

export type UserThunkDispatch = ThunkDispatch<AppState, undefined, UserActionType>;
export type UserThunkAction<T> = ThunkAction<T, AppState, undefined, UserActionType>;

export const userLoad = (): UserThunkAction<Promise<boolean>> => async (dispatch) => {
 try {
  dispatch({type: USER_LOAD});
  auth().onAuthStateChanged(
   user => {
    if (user && user.email) {
     dispatch({type: USER_LOGIN_OK, token: user.refreshToken, user: {email: user.email, username: user.email}})
    }
    else {
     dispatch({type: USER_LOGOUT});
    }
   },
   error => {
    dispatch({type: USER_LOGIN_ERROR, error});
   }
  );
  return true;
  // const token = window.localStorage["t"];
  // if (!token)
  //  throw new Error("There are no token");
  // dispatch({type: USER_LOAD});
  // await delay(2000);
  // const user = userStubLoad(token);
  // dispatch({type: USER_LOGIN_OK, token, user});
  // return true;
 }
 catch (error) {
  // dispatch({type: USER_LOGIN_ERROR, error});
  return false;
 }
}

export const userLogin = (login: string, psw: string): UserThunkAction<Promise<boolean>> => async (dispatch) => {
 try {
  dispatch({type: USER_LOGIN});
  const authRes = await auth().signInWithEmailAndPassword(login, psw);
  if (authRes.user && authRes.user.email)
   dispatch({type: USER_LOGIN_OK, token: authRes.user.refreshToken, user: {email: authRes.user.email, username: authRes.user.email}});
  else
   dispatch({type: USER_LOGIN_ERROR, error: "Some error"});
  // await delay(1234);
  // const {user, token} = userStubAuth(login, psw);
  // dispatch({type: USER_LOGIN_OK, token, user});
  // window.localStorage["t"] = token;
  return true;
 }
 catch (error) {
  dispatch({type: USER_LOGIN_ERROR, error});
  return false;
 }
}

export const userLogout = (): UserThunkAction<void> => async (dispatch) => {
 await auth().signOut();
 // window.localStorage["t"] = "";
 dispatch({type: USER_LOGOUT});
}

export const userRegister = (login: string, psw: string): UserThunkAction<Promise<boolean>> => async (dispatch) => {
 try {
  dispatch({type: USER_LOGIN});
  await auth().createUserWithEmailAndPassword(login, psw);
  return true;
 }
 catch (error) {
  dispatch({type: USER_LOGIN_ERROR, error});
  return false;
 }
}