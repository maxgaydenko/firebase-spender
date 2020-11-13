import React from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
// mui
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from "@material-ui/core/IconButton";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from "@material-ui/core/Button";
import AccountCircle from '@material-ui/icons/AccountCircle';
// src
import {IUser} from "../interfaces/User";
import {userLogout, UserThunkDispatch} from "../store/user/actions";
import {useHomeStyles} from "../styles/home";
import {AppState} from "../store";
import {IOutlay} from "../interfaces/Outlay";
import {IMap} from "../utils/common";

// const _stub: string[] = [
//  "Ремонт",
//  "Ипотека",
//  "Машина",
// ];

interface IProps {
 user: IUser
}

export const Home: React.FC<IProps> = ({user}) => {
 const styles = useHomeStyles();
 const {outlays} = useSelector<AppState, {
  outlays: IMap<IOutlay>
 }>(state => ({
  outlays: state.outlays.outlays,
 }));
 const userDispatch = useDispatch<UserThunkDispatch>();
 const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);
 React.useEffect(() => {
  window.document.title = "Spender";
 }, []);

 const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  setMenuAnchorEl(event.currentTarget);
 };

 const handleMenuClose = () => {
  setMenuAnchorEl(null);
 };

 const logoutClick = () => userDispatch(userLogout());

 return (
  <>
   <Container className={styles.header}>
    <IconButton edge="end" onClick={handleMenuClick} size={"small"}><AccountCircle/></IconButton>
    <Typography variant={"h2"}>{user.username}</Typography>
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
     <MenuItem>Изменить</MenuItem>
     <MenuItem onClick={logoutClick}>Выход</MenuItem>
    </Menu>
   </Container>
   <List className={styles.list}>
    {Object.keys(outlays).map((f, i) => (
     <ListItem key={i} className={styles.listItem}>
      <ListItemText>
       <Link to={"/outlay/"+f}>{outlays[f].name}</Link>
      </ListItemText>
      <ListItemSecondaryAction>
       <IconButton edge="end" component={Link} to={`/outlay/${f}/edit`}>
        <SettingsIcon/>
       </IconButton>
      </ListItemSecondaryAction>
     </ListItem>
    ))}
   </List>
   <Box className={styles.add}>
    <Button variant={"contained"} color={"primary"} component={Link} to={'/create'}>Новая смета</Button>
   </Box>
  </>
 )
}
