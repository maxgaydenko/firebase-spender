import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";

const config = {
 apiKey: process.env.REACT_APP_APIKEY,
 authDomain: process.env.REACT_APP_AUTHDOMAIN,
 databaseURL: process.env.REACT_APP_DB,
 projectId: process.env.REACT_APP_PID,
 storageBucket: process.env.REACT_APP_SB,
 messagingSenderId: process.env.REACT_APP_SID,
 appId: process.env.REACT_APP_APPID,
};
firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();

/*
firebase tree struct

root
* outlays - списки
  * outlay_id  - список
    * name     - название сметы
    * sections - разделы сметы
* records - сметы по каждому списку
  * outlay_id - список
    * record_id - запись
      * when - дата записи
      * summ - сумма записи
      * tags - тэги записи


*/
