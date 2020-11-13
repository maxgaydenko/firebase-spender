import React from "react";
import {Link} from "react-router-dom";
// material
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import HomeIcon from '@material-ui/icons/Home';
import Typography from "@material-ui/core/Typography";
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from "@material-ui/core/IconButton";
// src
import {IOutlay} from "../interfaces/Outlay";
import {IOutlayRecord, NEW_ID} from "../interfaces/OutlayRecord";
import {OutlayRecordForm} from "./OutlayRecordForm";
import {IOutlayTags} from "../interfaces/OutlayTags";
import {dateToString} from "../utils/date";
import {OutlayList} from "./OutlayList";
import {OutlayFilter} from "./OutlayFilter";
import {IOutlayFilter} from "../interfaces/OutlayFilter";
import {useOutlayStyles} from "../styles/outlay";

interface IProps {
 outlayId: string
 outlay: IOutlay
 records: IOutlayRecord[]
 tags: IOutlayTags
}

export const OutlayBox: React.FC<IProps> = ({outlayId, outlay, records, tags}) => {
 const classes = useOutlayStyles();
 const newOutlayRecord = (): IOutlayRecord => {
  return {
   id: NEW_ID,
   section: (outlay.sections && outlay.sections[0]) ? outlay.sections[0] : "",
   when: dateToString(new Date()),
   price: 0,
   tags: [],
  };
 }

 const [dialogRecord, setDialogRecord] = React.useState<IOutlayRecord>(newOutlayRecord());
 const [dialogVisible, setDialogVisible] = React.useState<boolean>(false);
 // const [searchVisible, setSearchVisible] = React.useState<boolean>(false);

 // const searchClick = () => {
 //  setSearchVisible(true);
 // }
 // const searchHide = () => {
 //  setSearchVisible(false);
 // }
 const addClick = () => {
  setDialogRecord(newOutlayRecord());
  setDialogVisible(true);
 }
 const changeClick = (record: IOutlayRecord) => {
  setDialogRecord({...record});
  setDialogVisible(true);
 }
 const dialogHide = () => {
  setDialogVisible(false);
 }
 const [filter, setFilter] = React.useState<IOutlayFilter>({section: "", comment: "", tags: []});
 const updateFilter = (filter: IOutlayFilter) => {
  setFilter(filter);
 }

 const keyClick = (e: any) => {
  if(e.keyCode===78 && e.altKey && !dialogVisible)
   addClick();
 }

 React.useEffect(() => {
  window.document.addEventListener("keydown", keyClick, false);
  return () => {
   window.document.removeEventListener("keydown", keyClick, false);
  }
  // eslint-disable-next-line
 }, []);

 // const filterBadge: number = filter.tags.length + (filter.section ? 1 : 0);
 const filteredRecords = records.filter(f => {
  if (Boolean(filter.section) && f.section !== filter.section)
   return false;
  if (filter.tags.length > 0) {
   for (let i = 0; i < filter.tags.length; i++) {
    if (!f.tags || f.tags.indexOf(filter.tags[i]) < 0)
     return false;
   }
  }
  if (Boolean(filter.comment) && (!f.comment || f.comment.toLowerCase().indexOf(filter.comment.toLowerCase()) < 0))
   return false;
  return true;
 });

 return (
  <>
   <Container className={classes.outlayNav}>
    <Box className={classes.outlayHeader}>
     <IconButton component={Link} to={"/"}>
      <HomeIcon/>
     </IconButton>
     <Typography variant={"h1"}>
      {outlay.name}
      <IconButton size={"small"} component={Link} to={`/outlay/${outlayId}/edit`}><SettingsIcon/></IconButton>
     </Typography>
     {/*<Link to={`/outlay/${outlay.id}/edit`}><SettingsIcon /></Link>*/}
    </Box>
    <OutlayFilter filter={filter} updateFilter={updateFilter}
                  outlaySections={outlay.sections} outlayTags={Object.keys(tags)}/>
   </Container>
   <OutlayList outlay={outlay} records={filteredRecords} onAddClick={addClick} onChangeClick={changeClick}/>
   <OutlayRecordForm open={dialogVisible}
                     record={dialogRecord}
                     onClose={dialogHide}/>
  </>
 )
}