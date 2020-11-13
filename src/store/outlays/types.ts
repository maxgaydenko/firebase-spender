import {IOutlay} from "../../interfaces/Outlay";
import firebase from "firebase";
import {IMap} from "../../utils/common";

export interface OutlaysState {
 isLoading: boolean
 isLoaded: boolean
 loadError: any

 outlays: IMap<IOutlay>

 dbRef?: firebase.database.Reference
}

export const OUTLAYS_LOAD = 'outlays/load';
export const OUTLAYS_LOADED = 'outlays/loaded';
export const OUTLAYS_LOAD_OK = 'outlays/loadOk';
export const OUTLAYS_LOAD_ERROR = 'outlays/loadError';
export const OUTLAYS_UNLOAD = 'outlays/unload';
export const OUTLAYS_CREATE = 'outlays/outlayCreate';
export const OUTLAYS_UPDATE = 'outlays/outlayUpdate';
export const OUTLAYS_DELETE = 'outlays/outlayDelete';

interface HomeActionLoad {
 type: typeof OUTLAYS_LOAD
}

interface HomeActionLoaded {
 type: typeof OUTLAYS_LOADED
 dbRef: firebase.database.Reference
}

interface HomeActionLoadOk {
 type: typeof OUTLAYS_LOAD_OK
 outlays: IMap<IOutlay>
}

interface HomeActionLoadError {
 type: typeof OUTLAYS_LOAD_ERROR
 error: any
}

interface HomeActionUnload {
 type: typeof OUTLAYS_UNLOAD
}

interface HomeActionOutlayCreate {
 type: typeof OUTLAYS_CREATE
 outlay: IOutlay
}

interface HomeActionOutlayUpdate {
 type: typeof OUTLAYS_UPDATE
 outlay: IOutlay
}

interface HomeActionOutlayDelete {
 type: typeof OUTLAYS_DELETE
 outlay: IOutlay
}

export type HomeActionType = HomeActionLoad | HomeActionLoaded | HomeActionLoadOk | HomeActionLoadError | HomeActionUnload
 | HomeActionOutlayCreate | HomeActionOutlayUpdate | HomeActionOutlayDelete
