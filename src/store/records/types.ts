import {IOutlayRecord} from "../../interfaces/OutlayRecord";
import {IOutlayTags} from "../../interfaces/OutlayTags";
import firebase from "firebase";

export interface RecordsState {
 isLoaded: boolean
 isLoading: boolean
 loadError: any
 recordError: any

 outlayId: string
 records: IOutlayRecord[]
 outlayTags: IOutlayTags

 dbRef?: firebase.database.Reference
}

export const RECORDS_LOAD = 'records/load';
export const RECORDS_LOADED = 'records/loaded';
export const RECORDS_LOAD_ERROR = 'records/loadError';
export const RECORDS_LOAD_OK = 'records/loadOk';
export const RECORDS_UNLOAD = 'records/unload';
// export const RECORDS_OU_UPDATE = 'records/update';
export const RECORDS_CREATE = 'records/recordCreate';
export const RECORDS_UPDATE = 'records/recordUpdate';
export const RECORDS_DELETE = 'records/recordDelete';
export const RECORDS_ERROR = 'records/recordError';
export const RECORDS_CLEAR_ERROR = 'records/recordClearError';

interface RecordsActionLoad {
 type: typeof RECORDS_LOAD
 outlayId: string
}
interface RecordsActinoLoaded {
 type: typeof RECORDS_LOADED,
 dbRef: firebase.database.Reference
}
interface RecordsActionLoadError {
 type: typeof RECORDS_LOAD_ERROR
 error: any;
}
interface RecordsActionLoadOk {
 type: typeof RECORDS_LOAD_OK
 records: IOutlayRecord[]
}
interface RecordsActionUnload {
 type: typeof RECORDS_UNLOAD
}
// interface OutlayActionUpdate {
//  type: typeof RECORDS_OU_UPDATE
//  outlay: IOutlay
// }
interface RecordsActionCreate {
 type: typeof RECORDS_CREATE
 record: IOutlayRecord
}
interface RecordsActionUpdate {
 type: typeof RECORDS_UPDATE
 record: IOutlayRecord
}
interface RecordsActionDelete {
 type: typeof RECORDS_DELETE
 record: IOutlayRecord
}
interface RecordsActionError {
 type: typeof RECORDS_ERROR
 error: any
}
interface RecordsActionClearError {
 type: typeof RECORDS_CLEAR_ERROR
}

export type RecordsActionType = RecordsActionLoad | RecordsActinoLoaded
 | RecordsActionLoadError | RecordsActionLoadOk | RecordsActionUnload
 | RecordsActionCreate | RecordsActionUpdate | RecordsActionDelete
 | RecordsActionError | RecordsActionClearError


