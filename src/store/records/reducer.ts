import {
 RECORDS_LOAD, RECORDS_LOAD_ERROR, RECORDS_LOAD_OK, RECORDS_CLEAR_ERROR, RECORDS_CREATE, RECORDS_DELETE, RECORDS_ERROR,
 RECORDS_UPDATE,
 RECORDS_UNLOAD, RecordsActionType,
 RecordsState, RECORDS_LOADED
} from "./types";
import {IOutlayTags} from "../../interfaces/OutlayTags";
import {IOutlayRecord} from "../../interfaces/OutlayRecord";

const iniState: RecordsState = {
 isLoaded: false,
 isLoading: false,
 loadError: undefined,
 recordError: undefined,
 outlayId: "",
 records: [],
 outlayTags: {}
}

const sortRecords = (a: IOutlayRecord, b: IOutlayRecord): number => {
 return (a.when < b.when)? 1: -1;
}

export function recordsReducer(state = iniState, action: RecordsActionType): RecordsState {
 switch (action.type) {
  case RECORDS_LOAD:
   return {...state, isLoading: true, loadError: undefined, outlayId: action.outlayId};
  case RECORDS_LOAD_ERROR:
   return {...state, isLoading: false, loadError: action.error};
  case RECORDS_LOADED:
   return {...state, dbRef: action.dbRef};
  case RECORDS_LOAD_OK: {
   const records = action.records.sort(sortRecords);
   const outlayTags: IOutlayTags = action.records.reduce((p, c) => {
    if(c.tags) {
     for (let i = 0; i < c.tags.length; i++) {
      if (!p[c.tags[i]])
       p[c.tags[i]] = 0;
      p[c.tags[i]]++;
     }
    }
    return p;
   }, {} as IOutlayTags);
   return {...state, isLoading: false, isLoaded: true, records, outlayTags};
  }
  case RECORDS_UNLOAD:
   return {...iniState};
  case RECORDS_CREATE: {
   const outlayTags = state.outlayTags;
   if(action.record.tags) {
    for (let i = 0; i < action.record.tags.length; i++) {
     const tag = action.record.tags[i];
     if (!outlayTags[tag])
      outlayTags[tag] = 0;
     outlayTags[tag]++;
    }
   }
   const records = [...state.records, action.record].sort(sortRecords);
   return {...state, records, outlayTags};
  }
  case RECORDS_UPDATE: {
   const outlayTags = state.outlayTags;
   const records = state.records.map(f => {
    if(f.id === action.record.id) {
     if(f.tags) {
      for (let i = 0; i < f.tags.length; i++) {
       const tag = f.tags[i];
       if (outlayTags[tag]) {
        outlayTags[tag]--;
       }
       if (outlayTags[tag] === 0) {
        delete outlayTags[tag];
       }
      }
     }
     if(action.record.tags) {
      for (let i = 0; i < action.record.tags.length; i++) {
       const tag = action.record.tags[i];
       if (!outlayTags[tag])
        outlayTags[tag] = 0;
       outlayTags[tag]++;
      }
     }
     return action.record;
    }
    return f;
   }).sort(sortRecords);
   return {...state, records, outlayTags};
  }
  case RECORDS_DELETE: {
   const outlayTags = state.outlayTags;
   const records = state.records.filter(f => {
    if (f.id === action.record.id) {
     if(f.tags) {
      for (let i = 0; i < f.tags.length; i++) {
       const tag = f.tags[i];
       if (outlayTags[tag]) {
        outlayTags[tag]--;
       }
       if (outlayTags[tag] === 0) {
        delete outlayTags[tag];
       }
      }
     }
     return false;
    }
    return true;
   }).sort(sortRecords);
   return {...state, records, outlayTags};
  }
  case RECORDS_ERROR:
   return {...state, recordError: action.error};
  case RECORDS_CLEAR_ERROR:
   return {...state, recordError: undefined};
  default:
   return state;
 }
}