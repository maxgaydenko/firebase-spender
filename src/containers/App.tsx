import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import {Routes} from "./Routes";

export const App: React.FC = () => {
 return (
  <>
   <CssBaseline />
   <Container disableGutters maxWidth={"md"}>
    <Routes />
   </Container>
  </>
 )
}