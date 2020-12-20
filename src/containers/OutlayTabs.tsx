import React from "react";

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {IOutlay} from "../interfaces/Outlay";

interface IProps {
 outlayId: string
 outlay: IOutlay
}

export const OutlayTabs: React.FC<IProps> = ({outlayId, outlay}) => {
 const [value, setValue] = React.useState<number>(0);

 const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
  setValue(newValue);
 };

 return (
  <AppBar position="static">
   <Tabs
    variant="fullWidth"
    value={value}
    onChange={handleChange}
    aria-label="nav tabs example"
   >
    <Tab label={outlay.name} href={"/outlay/" + outlayId} />
   </Tabs>
  </AppBar>
 )
}