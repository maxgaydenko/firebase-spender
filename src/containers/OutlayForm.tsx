import React from "react";
// mui
import Container from "@material-ui/core/Container";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from "@material-ui/core/FormControl";
import Box from "@material-ui/core/Box";
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
// src
import {IOutlay} from "../interfaces/Outlay";
import {useOutlayStyles} from "../styles/outlay";

interface SectionMap {
 [key: string]: number
}

interface IProps {
 outlay: IOutlay
//  saveHandler: (name: string, sections: string[]) => Promise<boolean>
 saveHandler: (name: string) => Promise<boolean>
 deleteHandler?: () => Promise<boolean>
}

const checkForm = (name: string): boolean => Boolean(name.trim());

export const OutlayForm: React.FC<IProps> = ({outlay, saveHandler, deleteHandler}) => {
 const classes = useOutlayStyles();
 const [name, setName] = React.useState<string>("");
//  const [sections, setSections] = React.useState<string>("");
 const [deleteDialogOpen, setDeleteDialogOpen] = React.useState<boolean>(false);

 React.useEffect(() => {
  setName(outlay.name);
  // setSections(outlay.sections? outlay.sections.join("\n"): "");
  setDeleteDialogOpen(false);
 }, [outlay]);

 const deleteClick = () => {
  setDeleteDialogOpen(true);
 }

 const deleteCancel = () => {
  setDeleteDialogOpen(false);
 }

 const deleteConfirm = async () => {
  deleteCancel();
  if (deleteHandler)
   await deleteHandler();
 }

 const submitForm = (e: any) => {
  e.preventDefault();
  if (name.trim()) {
  //  const sectionsMap: SectionMap = sections.split("\n").reduce((p, c) => {
  //   const n = c.trim();
  //   if (n) {
  //    if (!p[n])
  //     p[n] = 0;
  //    p[n]++;
  //   }
  //   return p;
  //  }, {} as SectionMap);
  //  saveHandler(name, Object.keys(sectionsMap));
   saveHandler(name);
  }
 }

 return (
  <Container className={classes.outlayForm}>
   <FormControl fullWidth className={classes.outlayFormItem}>
    <TextField label={"Название"}
               value={name}
               onChange={e => setName(e.target.value)}/>
   </FormControl>
   {/* <FormControl fullWidth className={classes.outlayFormItem}>
    <TextField label={"Валюта"}
               value={currency}
               onChange={e => setCurrency(e.target.value)}/>
   </FormControl> */}
   {/* <FormControl fullWidth className={classes.outlayFormItem}>
    <TextField label={"Разделы"}
               multiline
               rowsMax={10}
               value={sections}
               onChange={e => setSections(e.target.value)}/>
   </FormControl> */}
   <Box className={classes.outlayFormActions}>
    <Button variant={"contained"} color={"primary"} disabled={!checkForm(name)} type={"submit"} onClick={submitForm}>Сохранить</Button>
    {deleteHandler && <Button onClick={deleteClick}>Удалить</Button>}
    {deleteHandler && (
     <Dialog open={deleteDialogOpen}
             onClose={deleteCancel}>
      <DialogTitle id="responsive-dialog-title">Удалить смету?</DialogTitle>
      <DialogContent>
       <DialogContentText className={classes.outlayFormConfirm}>
        Смета и все связанные записи будут удалены.<br/>
        Восстановить данные будет невозможно.
       </DialogContentText>
      </DialogContent>
      <DialogActions className={classes.outlayFormActions}>
       <Button variant={"contained"} onClick={deleteConfirm} color="primary">Удалить</Button>
       <Button onClick={deleteCancel} color="default">Отмена</Button>
      </DialogActions>
     </Dialog>
    )}
   </Box>
  </Container>
 )
}