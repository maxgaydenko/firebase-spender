import 'date-fns';
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
// material
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import FormControl from "@material-ui/core/FormControl";
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogActions from '@material-ui/core/DialogActions';
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
// src
import {IOutlayRecord, NEW_ID} from "../interfaces/OutlayRecord";
import {dateToString} from "../utils/date";
import {PriceInput} from "../components/PriceInput";
import {IOutlay} from "../interfaces/Outlay";
import {IOutlayTags} from "../interfaces/OutlayTags";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../store";
import {TagsInput} from "../components/TagsInput";
import {recordCreate, recordUpdate, RecordsThunkDispatch} from "../store/records/actions";

import {useOutlayStyles} from "../styles/outlay";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// import {useTheme} from "@material-ui/core/styles";

interface IDialogTitleProps {
 onClose?: () => void
}

const DialogTitle: React.FC<IDialogTitleProps> = ({onClose, children}) => {
 const classes = useOutlayStyles();
 return (
  <MuiDialogTitle disableTypography className={classes.outlayFormTitle}>
   <Typography variant="h6">{children}</Typography>
   {onClose ? (
    <IconButton aria-label="close" className={classes.outlayFormCloseButton} onClick={onClose}>
     <CloseIcon/>
    </IconButton>
   ) : null}
  </MuiDialogTitle>
 );
}

interface IProps {
 open: boolean
 record: IOutlayRecord
 onClose: () => void
}

interface IRedux {
 outlay?: IOutlay
 outlayTags: IOutlayTags
}

const checkForm = (price: number, when: Date | null, tags: string[], comment?: string): boolean => Boolean(when && !isNaN(price) && tags.length > 0);

export const OutlayRecordForm: React.FC<IProps> = ({open, record, onClose}) => {
 const classes = useOutlayStyles();
 // const theme = useTheme();
 const fullScreen = useMediaQuery("@media (max-width:540px)");
 const {outlay, outlayTags} = useSelector<AppState, IRedux>(state => ({
  outlay: state.outlays.outlays[state.records.outlayId],
  outlayTags: state.records.outlayTags,
 }));
 const dispatch = useDispatch<RecordsThunkDispatch>();

 const [when, setWhen] = React.useState<Date | null>(null);
 const [price, setPrice] = React.useState<number>(0);
 const [tags, setTags] = React.useState<string[]>([]);
 const [comment, setComment] = React.useState<string>();
 const [suggestions, setSuggestions] = React.useState<IOutlayTags>({});

 React.useEffect(() => {
  setSuggestions(outlayTags);
 }, [outlayTags]);

 React.useEffect(() => {
  if (record.when)
   setWhen(new Date(record.when));
  setPrice(record.price);
  setTags(record.tags || []);
  setComment(record.comment || "");
 }, [record]);

 const addRecord = async () => {
  if (when) {
   const ok = await dispatch(recordCreate(dateToString(when), price, tags, comment));
   if (ok)
    onClose();
  }
 }

 const updateRecord = async () => {
  if (when) {
   const ok = await dispatch(recordUpdate({...record, when: dateToString(when), price, tags, comment}));
   if (ok)
    onClose();
  }
 }

 const onSubmitForm = (e: any) => {
  e.preventDefault();
  if (record.id === NEW_ID)
   addRecord();
  else
   updateRecord();
 }

 const tagInput = (tag: string) => {
  if (!suggestions[tag])
   setSuggestions({...suggestions, [tag]: 1});
  if (tags.indexOf(tag) < 0)
   setTags([...tags, tag]);
  else
   setTags(tags.filter(f => f !== tag));
 }

 if (!outlay)
  return null;

 return (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
   <Dialog open={open} fullScreen={fullScreen} fullWidth onClose={onClose} aria-labelledby="form-dialog-title">
    <form onSubmit={onSubmitForm}>
     <DialogTitle onClose={onClose}>{(record.id === NEW_ID) ? "Новая запись" : "Изменить"}</DialogTitle>
     <DialogContent className={classes.outlayForm}>
      <FormControl fullWidth className={classes.outlayFormItem}>
       <KeyboardDatePicker margin="normal"
                           label={"Дата"}
                           format="dd.MM.yyyy"
                           fullWidth
                           value={when}
                           onChange={setWhen}
                           KeyboardButtonProps={{
                            'aria-label': 'change date',
                           }}
       />
      </FormControl>
      <FormControl fullWidth className={classes.outlayFormItem}>
       {/* <TextField label={"Сумма"}
                  value={price}
                  onChange={e => setPrice(Number(e.target.value))}/> */}
       <TextField label={"Сумма"}
                  fullWidth
                  value={price}
                  onChange={e => setPrice(Number(e.target.value))}
                  InputProps={{
                   inputComponent: PriceInput as any,                   
                  }}
       />
      </FormControl>
      <FormControl fullWidth className={classes.outlayFormItem}>
       <TagsInput label={"Метки"}
                  outlayTags={Object.keys(suggestions)}
                  tags={tags}
                  onTagsChange={setTags}
                  onTagInput={tagInput}/>
      </FormControl>
      <FormControl fullWidth className={classes.outlayFormItem}>
       <TextField label={"Комментарий"}
                  fullWidth
                  value={comment}
                  onChange={e => setComment(e.target.value)}/>
      </FormControl>
     </DialogContent>
     <MuiDialogActions className={classes.outlayFormActions}>
      <Button type={"submit"} disabled={!checkForm(price, when, tags, comment)} variant="contained" color="primary">Сохранить</Button>
     </MuiDialogActions>
    </form>
   </Dialog>
  </MuiPickersUtilsProvider>
 )
}