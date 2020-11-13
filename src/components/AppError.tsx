import React from "react";
import MuiAlert from '@material-ui/lab/Alert';
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import {Link} from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {useOutlayStyles} from "../styles/outlay";

export const AppError: React.FC<{title: string}> = ({children, title}) => {
 const classes = useOutlayStyles();
 React.useEffect(() => {
  window.document.title = title;
 }, [title]);

 return (
  <div className={"Error"}>
   <Container className={classes.outlayNav}>
    <Box className={classes.outlayHeader}>
     <IconButton component={Link} to={"/"}>
      <HomeIcon/>
     </IconButton>
     <Typography variant={"h1"}>
      {title}
     </Typography>
    </Box>
   </Container>
   <MuiAlert elevation={6} variant="filled" severity="error">{children}</MuiAlert>
  </div>
 )
}