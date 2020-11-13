import React from 'react';
import {Link} from "react-router-dom";
// mui
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
// src
import {useUserStyles} from "../styles/user";

export const RestoreForm: React.FC = () => {
 const classes = useUserStyles();
 const [email, setEmail] = React.useState<string>("");

 const onSubmit = async (e: any) => {
  e.preventDefault();
  // await dispatch(userLogin(email, psw));
 }

 return (
  <Container maxWidth="xs" className={classes.loginBox}>
   <Avatar className={classes.loginAvatar}>
    <LockOutlinedIcon/>
   </Avatar>
   <Typography variant={"h1"}>Восстановление пароля</Typography>
   <form className={classes.loginForm} noValidate onSubmit={onSubmit}>
    <TextField variant="outlined"
               margin="normal"
               required
               fullWidth
               label="Е-мейл"
               value={email}
               onChange={e => setEmail(e.target.value)}
               autoComplete="email"
               autoFocus
    />
    <Button type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.loginSubmit}>Восстановить</Button>
    <Grid container>
     <Grid item xs>
      <Link to="/register">Регистрация</Link>
     </Grid>
     {<Grid item>
      <Link to="/">Логин</Link>
     </Grid>}
    </Grid>
   </form>
  </Container>
 );
}