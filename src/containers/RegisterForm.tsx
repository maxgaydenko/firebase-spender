import React from 'react';
import {Link} from "react-router-dom";
// mui
import Alert from '@material-ui/lab/Alert';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
// src
import {useUserStyles} from "../styles/user";
import {useDispatch, useSelector} from "react-redux";
import {userRegister, UserThunkDispatch} from "../store/user/actions";
import {AppState} from "../store";

interface IRedux {
 isLoading: boolean
 error: any
}

export const RegisterForm: React.FC = () => {
 const classes = useUserStyles();
 const [email, setEmail] = React.useState<string>("");
 const [psw, setPsw] = React.useState<string>("");
 const {isLoading, error} = useSelector<AppState, IRedux>(state => ({
  isLoading: state.user.isAuthing,
  error: state.user.error
 }));
 const dispatch = useDispatch<UserThunkDispatch>();

 const onSubmit = async (e: any) => {
  e.preventDefault();
  await dispatch(userRegister(email, psw));
 }

 return (
  <Container maxWidth="xs" className={classes.loginBox}>
   <Avatar className={classes.loginAvatar}>
    <LockOutlinedIcon/>
   </Avatar>
   <Typography variant={"h1"}>Регистрация</Typography>
   {error && <Alert severity="error" className={classes.loginError}>{error.toString()}</Alert>}
   <form className={classes.loginForm} noValidate onSubmit={onSubmit}>
    <TextField variant="outlined"
               margin="normal"
               required
               fullWidth
               label="Е-мейл"
               disabled={isLoading}
               value={email}
               onChange={e => setEmail(e.target.value)}
               autoComplete="email"
               autoFocus
    />
    <TextField variant="outlined"
               margin="normal"
               required
               fullWidth
               label="Пароль"
               type="password"
               disabled={isLoading}
               value={psw}
               onChange={e => setPsw(e.target.value)}
               autoComplete="current-password"
    />
    <Button type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            color="primary"
            className={classes.loginSubmit}>Зарегистрироваться</Button>
    <Grid container>
     <Grid item xs>
      <Link to="/restore">Не помню пароль</Link>
     </Grid>
     {<Grid item>
      <Link to="/">Логин</Link>
     </Grid>}
    </Grid>
   </form>
  </Container>
 );
}