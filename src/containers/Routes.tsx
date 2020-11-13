import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Redirect} from "react-router";
import {useDispatch, useSelector} from "react-redux";
// mui
import LinearProgress from '@material-ui/core/LinearProgress';
// src
import {OutlayRoute} from "./OutlayRoute";
import {Home} from "./Home";
import {OutlayCreate} from "./OutlayCreate";
import {LoginForm} from "./LoginForm";
import {IUser} from "../interfaces/User";
import {AppState} from "../store";
import {userLoad, UserThunkDispatch} from "../store/user/actions";
import {RestoreForm} from "./RestoreForm";
import {RegisterForm} from "./RegisterForm";
import {AppError} from "../components/AppError";
import {outlaysLoad, OutlaysThunkDispatch, outlaysUnload} from "../store/outlays/actions";

interface IRedux {
 user?: IUser
 isLoading: boolean
}

export const Routes: React.FC = () => {
 const {user, isLoading} = useSelector<AppState, IRedux>(state => ({
  user: state.user.user,
  isLoading: state.user.isLoading,
 }));
 const dispatch = useDispatch<UserThunkDispatch>();

 React.useEffect(() => {
  window.document.title = "Загрузка...";
 }, []);

 React.useEffect(() => {
  dispatch(userLoad())
 }, [dispatch]);

 if (isLoading)
  return <LinearProgress color={"secondary"}/>

 return (user) ? <AuthRoutes user={user}/> : <GuestRoutes/>;
}

const AuthRoutes: React.FC<{ user: IUser }> = ({user}) => {
 const {isLoaded, isLoading, loadError} = useSelector<AppState, {
  isLoading: boolean
  isLoaded: boolean
  loadError: any
 }>(state => ({
  isLoaded: state.outlays.isLoaded,
  isLoading: state.outlays.isLoading,
  loadError: state.outlays.loadError,
 }));
 const dsp = useDispatch<OutlaysThunkDispatch>();

 React.useEffect(() => {
  if(!isLoaded)
   dsp(outlaysLoad());
  return () => {
   if(isLoaded)
    return dsp(outlaysUnload());
  };
 }, [isLoaded, dsp]);

 if(isLoading)
  return <LinearProgress color={"primary"} />

 return loadError? <AppError title={"Ошибка при загрузке приложения"}>{loadError.toString()}</AppError> : (
  <Router>
   <Switch>
    <Route exact path={"/"}><Home user={user}/></Route>
    <Route path={"/outlay/:outlayId"}><OutlayRoute/></Route>
    <Route exact path={"/create"}><OutlayCreate/></Route>
    <Redirect to={"/"}/>
   </Switch>
  </Router>
 )
}

const GuestRoutes: React.FC = () => {
 React.useEffect(() => {
  window.document.title = "Spender";
 }, []);

 return (
  <Router>
   <Switch>
    <Route exact path={"/restore"}><RestoreForm/></Route>
    <Route exact path={"/register"}><RegisterForm/></Route>
    <Route><LoginForm/></Route>
   </Switch>
  </Router>
 )
}