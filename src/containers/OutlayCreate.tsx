import React from "react";
import {Link, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
// material
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import HomeIcon from '@material-ui/icons/Home';
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
// src
import {IOutlay} from "../interfaces/Outlay";
import {useOutlayStyles} from "../styles/outlay";
import {OutlayForm} from "./OutlayForm";
import {outlayCreate, OutlaysThunkDispatch} from "../store/outlays/actions";

export const OutlayCreate: React.FC = () => {
 const classes = useOutlayStyles();
 const dispatch = useDispatch<OutlaysThunkDispatch>();
 const history = useHistory();
 const outlay: IOutlay = {
  name: "",
  sections: []
 }
 React.useEffect(() => {
  window.document.title = "Новая смета";
 }, [])

 const saveOutlay = async (name: string, sections: string[]): Promise<boolean> => {
  const ok = await dispatch(outlayCreate({...outlay, name, sections}));
  if(ok)
   history.push("/");
  // console.log('ok', ok);
  return ok;
 }

 return (
  <>
   <Container className={classes.outlayNav}>
    <Box className={classes.outlayHeader}>
     <IconButton component={Link} to={"/"}>
      <HomeIcon />
     </IconButton>
     <Typography variant={"h1"}>Новая смета</Typography>
    </Box>
   </Container>
   <OutlayForm outlay={outlay} saveHandler={saveOutlay}/>
  </>
 )
}