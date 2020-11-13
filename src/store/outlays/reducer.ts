import {
 HomeActionType,
 // OUTLAYS_CREATE,
 // OUTLAYS_DELETE,
 OUTLAYS_LOAD,
 OUTLAYS_LOAD_ERROR,
 OUTLAYS_LOAD_OK,
 OUTLAYS_LOADED,
 OUTLAYS_UNLOAD,
 // OUTLAYS_UPDATE,
 OutlaysState
} from "./types";

const iniState: OutlaysState = {
 isLoaded: false,
 isLoading: false,
 loadError: undefined,
 outlays: {}
}

export function outlaysReducer(state = iniState, action: HomeActionType): OutlaysState {
 switch (action.type) {
  case OUTLAYS_LOAD: {
   return {...state, isLoading: true, loadError: undefined};
  }
  case OUTLAYS_LOAD_ERROR: {
   return {...state, isLoading: false, loadError: action.error};
  }
  case OUTLAYS_LOADED: {
   return {...state, dbRef: action.dbRef};
  }
  case OUTLAYS_LOAD_OK: {
   return {...state, isLoading: false, isLoaded: true, outlays: action.outlays}
  }
  case OUTLAYS_UNLOAD: {
   return {...iniState};
  }

  // case OUTLAYS_CREATE: {
  //  const outlays = {...state.outlays};
  //  outlays[action.outlay.id] = action.outlay;
  //  return {...state, outlays};
  // }
  // case OUTLAYS_UPDATE: {
  //  const outlays = {...state.outlays};
  //  outlays[action.outlay.id] = action.outlay;
  //  return {...state, outlays};
  // }
  // case OUTLAYS_DELETE: {
  //  const outlays = {...state.outlays};
  //  delete outlays[action.outlay.id];
  //  return {...state, outlays};
  // }
  default:
   return state;
 }
}