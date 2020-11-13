import {IUser} from "../../interfaces/User";

interface StubUser {
 user: IUser
 psw: string
}

interface StubMap {
 [key: string]: StubUser
}

const __stub: StubMap = {
 "aslfdkjoewifmlkejf1": {user: {username: "Максим", email: "max@gaydenko.ru"}, psw: "psw1"},
 "dfiajeflaiejfieowo2": {user: {username: "АВ", email: "frosin.vasilieva2018@yandex.ru"}, psw: "psw2"},
}

export const userStubLoad = (token: string): IUser => {
 if (!__stub[token])
  throw new Error("User cannot be loaded");
 return __stub[token].user;
}

export const userStubAuth = (inputEmail: string, inputPassword: string): { user: IUser, token: string } => {
 const login = inputEmail.toLowerCase();
 let toks = Object.keys(__stub);
 for(let i = 0; i < toks.length; i++) {
  const token = toks[i];
  const {user, psw} = __stub[token];
  if (user.email.toLowerCase() === login && psw === inputPassword)
   return {user, token};
 }
 throw new Error("User cannot login");
}