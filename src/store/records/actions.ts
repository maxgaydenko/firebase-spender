import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {
 RECORDS_LOAD, RECORDS_LOAD_ERROR, RECORDS_LOAD_OK, RECORDS_DELETE, RECORDS_ERROR,
 RecordsActionType, RECORDS_UNLOAD, RECORDS_LOADED, RECORDS_CREATE, RECORDS_UPDATE
} from "./types";
import {IDbOutlayRecord, IOutlayRecord} from "../../interfaces/OutlayRecord";
import {AppState} from "../index";
import {auth, db} from "../../services/firebase";
import {db_root} from "../../utils/firebase";

export type RecordsThunkDispatch = ThunkDispatch<AppState, undefined, RecordsActionType>
export type RecordsThunkAction<T> = ThunkAction<T, AppState, undefined, RecordsActionType>

const obj2db = (obj: IOutlayRecord): IDbOutlayRecord => {
 const {when,price,section,tags,comment} = obj;
 return {when,price,section,tags,comment} as IDbOutlayRecord;
}

export const recordsLoad = (outlayId: string): RecordsThunkAction<void> => async dispatch => {
 try {
  dispatch({type: RECORDS_LOAD, outlayId});
  const user = auth().currentUser;
  if(!user)
   throw new Error("There are no user");
  const dbRef = db.ref(`${db_root}/${user.uid}/records/${outlayId}`);
  // await delay(1234);
  // const records = recordsStubLoad(outlayId);
  dispatch({type: RECORDS_LOADED, dbRef});
  dbRef.on("child_added", (snapshot) => {
   const id = snapshot.key;
   const obj: IDbOutlayRecord = snapshot.val() as IDbOutlayRecord;
   if(id && obj)
    dispatch({type: RECORDS_CREATE, record: {...obj, id}});
  });
  dbRef.on("child_changed", (snapshot) => {
   const id = snapshot.key;
   const obj: IDbOutlayRecord = snapshot.val() as IDbOutlayRecord;
   if(id && obj)
    dispatch({type: RECORDS_UPDATE, record: {...obj, id}});
  });
  dbRef.on("child_removed", (snapshot) => {
   const id = snapshot.key;
   const obj: IDbOutlayRecord = snapshot.val() as IDbOutlayRecord;
   if(id && obj)
    dispatch({type: RECORDS_DELETE, record: {...obj, id}});
  });
  dbRef.once("value", (snapshot) => {
   let items = snapshot.val();
   let records: IOutlayRecord[] = [];
   for(let id in items)
    records.push({...items[id], id} as IOutlayRecord);
   dispatch({type: RECORDS_LOAD_OK, records});

  })
  // dbRef.on("value", (snapshot) => {
  //  console.log("on value )", snapshot.val());
  //  let items = snapshot.val();
  //  console.log('items', items);
  //  let records: IOutlayRecord[] = [];
  //  for(let id in items) {
  //   records.push({...items[id], id} as IOutlayRecord);
  //   // outlays[id] = items[id] as IOutlay;
  //  }
  //  dispatch({type: RECORDS_LOAD_OK, records});
  // });
  // dispatch({type: RECORDS_LOAD_OK, records});
 }
 catch (error) {
  dispatch({type: RECORDS_LOAD_ERROR, error});
 }
}

export const recordsUnload = (): RecordsThunkAction<void> => async (dispatch, getState) => {
 const state = getState();
 if(state.records.dbRef)
  state.records.dbRef.off();
 dispatch({type: RECORDS_UNLOAD});
}

export const recordCreate = (when: string, price: number, section: string, tags: string[], comment?: string): RecordsThunkAction<Promise<boolean>> => async (dispatch, getState) => {
 try {
  const state = getState();
  if(!state.records.dbRef)
   throw new Error("There are no records db ref");
  const obj: IDbOutlayRecord = {when, price, section, tags, comment};
  await state.records.dbRef.push(obj);
  return true;
  // const id = (new Date().getTime()).toString();
  // const record: IOutlayRecord = {
  //  id,
  //  price,
  //  section,
  //  when,
  //  tags,
  //  comment
  // };
  // await delay(1000);
  // if(record.price === 0)
  //  throw new Error("Is empty price available?");
  // await dispatch({type: RECORDS_CREATE, record});
  // // const state = getState();
  // return recordsStubSave(state.records.records, state.records.outlayId);
 }
 catch (error) {
  dispatch({type: RECORDS_ERROR, error})
  return false;
 }
}

export const recordUpdate = (record: IOutlayRecord): RecordsThunkAction<Promise<boolean>> => async (dispatch, getState) => {
 try {
  const state = getState();
  if(!state.records.dbRef)
   throw new Error("There are no records db ref");
  const obj: IDbOutlayRecord = obj2db(record);
  await state.records.dbRef.child(record.id).set(obj);
  return true;
  // await delay(1000);
  // if(record.price === 0)
  //  throw new Error("Is empty price available?");
  // await dispatch({type: RECORDS_UPDATE, record});
  // const state = getState();
  // return recordsStubSave(state.records.records, state.records.outlayId);
 }
 catch (error) {
  dispatch({type: RECORDS_ERROR, error});
  return false;
 }
}

export const recordDelete = (record: IOutlayRecord): RecordsThunkAction<Promise<boolean>> => async (dispatch, getState) => {
 try {
  const state = getState();
  if(!state.records.dbRef)
   throw new Error("There are no records db ref");
  await state.records.dbRef.child(record.id).remove();
  return true;
  // await delay(1000);
  // await dispatch({type: RECORDS_DELETE, record});
  // const state = getState();
  // return recordsStubSave(state.records.records, state.records.outlayId);
 }
 catch (error) {
  dispatch({type: RECORDS_ERROR, error});
  return false;
 }
}