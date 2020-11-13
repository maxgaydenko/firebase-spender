import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppState} from "../index";
import {
 OUTLAYS_LOAD, OUTLAYS_LOAD_ERROR, OUTLAYS_LOAD_OK, OUTLAYS_UNLOAD, OUTLAYS_LOADED, HomeActionType
} from "./types";
import {IOutlay} from "../../interfaces/Outlay";
import {auth, db} from "../../services/firebase";
import {db_root} from "../../utils/firebase";
import {IMap} from "../../utils/common";

export type OutlaysThunkAction<T> = ThunkAction<T, AppState, undefined, HomeActionType>
export type OutlaysThunkDispatch = ThunkDispatch<AppState, undefined, HomeActionType>;

export const outlaysLoad = (): OutlaysThunkAction<void> => async (dispatch) => {
 try {
  dispatch({type: OUTLAYS_LOAD});
  const user = auth().currentUser;
  if(!user)
   throw new Error("There are no user");
  const dbRef = db.ref(`${db_root}/${user.uid}/outlays`);
  dispatch({type: OUTLAYS_LOADED, dbRef});
  dbRef.on("value", (snapshot) => {
   let items = snapshot.val();
   let outlays: IMap<IOutlay> = {};
   for(let id in items) {
    outlays[id] = items[id] as IOutlay;
   }
   dispatch({type: OUTLAYS_LOAD_OK, outlays})
  });
 }
 catch (error) {
  dispatch({type: OUTLAYS_LOAD_ERROR, error})
 }
}

export const outlaysUnload = (): OutlaysThunkAction<void> => async (dispatch, getState) => {
 const state = getState();
 if(state.outlays.dbRef)
  state.outlays.dbRef.off();
 dispatch({type: OUTLAYS_UNLOAD});
}

export const outlayCreate = (obj: IOutlay): OutlaysThunkAction<Promise<boolean>> => async (dispatch, getState) => {
 try {
  const state = getState();
  if(!state.outlays.dbRef)
   throw new Error("There are no db ref");
  await state.outlays.dbRef.push(obj);
  return  true;
 }
 catch (error) {
  console.error("Home outlay create", error);
  return false;
 }
}

export const outlayUpdate = (outlayId: string, outlay: IOutlay): OutlaysThunkAction<Promise<boolean>> => async (dispatch, getState) => {
 try {
  const state = getState();
  if(!state.outlays.dbRef)
   throw new Error("There are no db ref");
  await state.outlays.dbRef.child(outlayId).set(outlay);
  return  true;
 }
 catch (error) {
  console.error("Home outlay update", error);
  return false;
 }
}

export const outlayDelete = (outlayId: string): OutlaysThunkAction<Promise<boolean>> => async (dispatch, getState) => {
 try {
  const state = getState();
  if(!state.outlays.dbRef)
   throw new Error("There are no db ref");
  await state.outlays.dbRef.child(outlayId).remove();
  const parent = state.outlays.dbRef.parent;
  if(parent)
   await parent.child('records').child(outlayId).remove();
  return  true;
 }
 catch (error) {
  console.error("Home outlay delete", error);
  return false;
 }
}
