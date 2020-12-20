import React from "react";
import NumberFormat from "react-number-format";
import {useDispatch} from "react-redux";
// mui
import List from "@material-ui/core/List";
import ListSubheader from '@material-ui/core/ListSubheader';
import Container from "@material-ui/core/Container";
import AddIcon from '@material-ui/icons/Add';
import Button from "@material-ui/core/Button";
// src
import {IOutlay} from "../interfaces/Outlay";
import {IOutlayRecord} from "../interfaces/OutlayRecord";
import {OutlayRecord} from "./OutlayRecord";
import {recordDelete, RecordsThunkDispatch} from "../store/records/actions";
import {useOutlayStyles} from "../styles/outlay";
import {dateStringConvert} from "../utils/date";

interface IProps {
 outlay: IOutlay
 records: IOutlayRecord[]
 onAddClick: () => void
 onChangeClick: (record: IOutlayRecord) => void
}

interface IWhenGroupedRecords {
 date: string
 records: IOutlayRecord[]
}

export const OutlayList: React.FC<IProps> = ({outlay, records, onAddClick, onChangeClick}) => {
 const dispatch = useDispatch<RecordsThunkDispatch>();
 const classes = useOutlayStyles();

 const deleteRecord = async (record: IOutlayRecord): Promise<boolean> => {
  const ok = await dispatch(recordDelete(record));
  return ok;
 }

 const grouped: IWhenGroupedRecords[] = records.reduce((res, record, idx) => {
  if (record.when) {
   const prev = records[idx - 1];
   if (!prev || prev.when !== record.when)
    res.push({date: record.when, records: []});
   res[res.length - 1].records.push(record);
  }
  return res;
 }, [] as IWhenGroupedRecords[]);
 const summ: number = records.reduce((p, c) => p + c.price, 0);
 // let prevDate: string = "";

 return (
  <>
   {/*<List className={classes.outlayList}>
    {records.map(record => {
     const showWhen = Boolean(prevDate !== record.when);
     prevDate = record.when;
     return (
      <OutlayRecord key={record.id} record={record}
                    sections={outlay.sections}
                    showWhen={showWhen}
                    showSection={outlay.sections.length > 1}
                    deleteRecord={deleteRecord}
                    changeClick={onChangeClick}/>
     )
    })}
   </List>*/}
   <List className={classes.outlayList}>
    {grouped.map((group, i) => (
     <li key={`section-${i}`} className={classes.outlayListSection}>
      <ul className={classes.outlayListRecord}>
       <ListSubheader className={classes.outlayListDate}>{dateStringConvert(group.date)}</ListSubheader>
       {group.records.map(record => (
        <OutlayRecord key={record.id} record={record} showWhen={false} deleteRecord={deleteRecord} changeClick={onChangeClick} />
       ))}
      </ul>
     </li>
    ))}
   </List>
   <Container className={classes.outlaySummary} maxWidth={false}>
    <Container maxWidth={"md"} className={classes.outlaySummaryWrapper}>
     <Button className={classes.outlaySummaryAddButton} onClick={onAddClick} startIcon={<AddIcon />}>
      Добавить
     </Button>
     <NumberFormat className={classes.outlaySummaryTotal} displayType={"text"} value={summ || ""} suffix={""} thousandSeparator={" "} />
    </Container>
   </Container>
  </>
 );
}

// ₽