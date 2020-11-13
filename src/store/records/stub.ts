import {IOutlayRecord} from "../../interfaces/OutlayRecord";

export const recordsStubLoad = (id: string): IOutlayRecord[] => {
 if(!window.localStorage)
  throw new Error("There is no local storage");
 // if(id !== "spartaka40")
 //  throw new Error("Outlay not found");
 // const outlay: IOutlay = {
 //  id: "spartaka40",
 //  name: "Ремонт",
 //  sections: [
 //   "Работы",
 //   "Материалы",
 //   "Сантехника",
 //   "Что ещё?"
 //  ]
 // };
 let records: IOutlayRecord[] = [];
 if(window.localStorage["__records_"+id]) {
  try {
   records = JSON.parse(window.localStorage["__records_"+id]) as IOutlayRecord[];
  }
  catch (e) {
   console.error("Records parsing error", e);
  }
 }
 return records;
}

export const recordsStubSave = (records: IOutlayRecord[], id: string): boolean => {
 if(window.localStorage) {
  window.localStorage["__records_"+id] = JSON.stringify(records);
  return true;
 }
 return false;
}