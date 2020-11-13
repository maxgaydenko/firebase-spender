import React from "react";
import {Link, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
// material
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import HomeIcon from '@material-ui/icons/Home';
import FormatListNumberedRtlIcon from '@material-ui/icons/FormatListNumberedRtl';
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
// src
import {IOutlay} from "../interfaces/Outlay";
import {useOutlayStyles} from "../styles/outlay";
import {OutlayForm} from "./OutlayForm";
import {outlayDelete, OutlaysThunkDispatch, outlayUpdate} from "../store/outlays/actions";

interface IProps {
 outlayId: string
 outlay: IOutlay
}

export const OutlayEdit: React.FC<IProps> = ({outlayId, outlay}) => {
 const classes = useOutlayStyles();
 const dispatch = useDispatch<OutlaysThunkDispatch>();
 const history = useHistory();

 const saveOutlay = async (name: string, sections: string[]): Promise<boolean> => {
  const ok = await dispatch(outlayUpdate(outlayId, {...outlay, name, sections}));
  if(ok)
   history.push('/outlay/'+outlayId);
  return ok;
 }

 const deleteOutlay = async (): Promise<boolean> => {
  const ok = await dispatch(outlayDelete(outlayId));
  if(ok)
   history.push('/');
  return true;
 }

 return (
  <>
   <Container className={classes.outlayNav}>
    <Box className={classes.outlayHeader}>
     <IconButton component={Link} to={"/"}>
      <HomeIcon />
     </IconButton>
     <Typography variant={"h1"}>{outlay.name}</Typography>
    </Box>
    <IconButton component={Link} to={`/outlay/${outlayId}`}>
     <FormatListNumberedRtlIcon />
    </IconButton>
   </Container>
   <OutlayForm outlay={outlay} saveHandler={saveOutlay} deleteHandler={deleteOutlay} />
  </>
 )
}