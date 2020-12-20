import React from "react";
import NumberFormat from "react-number-format";
// mui
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ListItemIcon from "@material-ui/core/ListItemIcon";
// src
import {IOutlayRecord} from "../interfaces/OutlayRecord";
import {dateStringConvert} from "../utils/date";
import {useOutlayStyles} from "../styles/outlay";

interface IProps {
 record: IOutlayRecord
 showWhen?: boolean
 changeClick: (record: IOutlayRecord) => void
 deleteRecord: (record: IOutlayRecord) => Promise<boolean>
}

export const OutlayRecord: React.FC<IProps> = ({record, showWhen, changeClick, deleteRecord}) => {
 const classes = useOutlayStyles();
 const theme = useTheme();
 const fullScreen = useMediaQuery(theme.breakpoints.down('xs')) && false;
 const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);
 const [deleteDialogOpen, setDeleteDialogOpen] = React.useState<boolean>(false);

 const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  setMenuAnchorEl(event.currentTarget);
 };

 const handleMenuClose = () => {
  setMenuAnchorEl(null);
 };

 const modifyClick = () => {
  changeClick(record);
  handleMenuClose();
 }

 const deleteClick = () => {
  setDeleteDialogOpen(true);
  handleMenuClose();
 }

 const deleteCancel = () => {
  setDeleteDialogOpen(false);
 }

 const deleteConfirm = async () => {
  deleteCancel();
  await deleteRecord(record);
 }

 return (
  <ListItem className={classes.outlayRecord} button={false}>
   <ListItemIcon className={classes.outlayRecordAction}>
    <IconButton edge="end" size={"small"} aria-label="item menu" onClick={handleMenuClick}>
     <MoreVertIcon/>
    </IconButton>
    <Menu open={Boolean(menuAnchorEl)}
          anchorEl={menuAnchorEl}
          anchorOrigin={{
           vertical: "top",
           horizontal: "right",
          }}
          transformOrigin={{
           vertical: "top",
           horizontal: "right",
          }}
          onClose={handleMenuClose}>
     <MenuItem onClick={modifyClick}>Изменить</MenuItem>
     <MenuItem onClick={deleteClick}>Удалить</MenuItem>
    </Menu>
    <Dialog fullScreen={fullScreen}
            open={deleteDialogOpen}
            onClose={deleteCancel}>
     <DialogTitle id="responsive-dialog-title">Удалить запись?</DialogTitle>
     <DialogContent>
      <DialogContentText className={classes.outlayFormConfirm}>
       Запись от <b>{dateStringConvert(record.when)}</b> на сумму <NumberFormat value={record.price} isNumericString displayType={"text"} thousandSeparator={" "} suffix={""}/> будет удалена.<br/>
       Восстановить её будет невозможно.
      </DialogContentText>
     </DialogContent>
     <DialogActions className={classes.outlayFormActions}>
      <Button variant={"contained"} onClick={deleteConfirm} color="primary">Удалить</Button>
      <Button onClick={deleteCancel} color="default">Отмена</Button>
     </DialogActions>
    </Dialog>
   </ListItemIcon>
   <ListItemText className={classes.outlayRecordBox}>
    <div className={classes.outlayRecordBody}>
     <div className={classes.outlayRecordChips}>
      {record.tags && record.tags.map((tag, i) => <Chip key={i} label={tag}/>)}
     </div>
     <div className={classes.outlayRecordPrice}>
      <NumberFormat value={record.price}
                    isNumericString
                    displayType={"text"}
                    thousandSeparator={" "}
                    suffix={""}/>
     </div>
    </div>
    {record.comment && <div className={"comment"}>{record.comment}</div>}
   </ListItemText>
  </ListItem>
 )
}