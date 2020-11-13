import React from "react";
import {Route, Switch, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
// mui
import LinearProgress from '@material-ui/core/LinearProgress';
// src
import {IOutlay} from "../interfaces/Outlay";
import {IOutlayRecord} from "../interfaces/OutlayRecord";
import {AppState} from "../store";
import {recordsLoad, recordsUnload} from "../store/records/actions";
import {AppError} from "../components/AppError";
import {IOutlayTags} from "../interfaces/OutlayTags";
import {OutlayBox} from "./OutlayBox";
import {OutlayEdit} from "./OutlayEdit";
// import {useOutlayStyles} from "../styles/outlay";

export const OutlayRoute: React.FC = () => {
 const {outlayId} = useParams();
 const {outlay} = useSelector<AppState, {
  outlay?: IOutlay
 }>(state => {
  return {
   outlay: state.outlays.outlays[outlayId]
  }
 });

 return outlay? <OutlayRouteComponent outlayId={outlayId} outlay={outlay} />: <AppError title={"Список не найден"}>Invalid route</AppError>;
}

interface IRedux {
 isLoading: boolean
 isLoaded: boolean
 error: any
 records: IOutlayRecord[]
 outlayTags: IOutlayTags
}

interface IProps {
 outlayId: string
 outlay: IOutlay
}

const OutlayRouteComponent: React.FC<IProps> = ({outlayId, outlay}) => {
 const dispatch = useDispatch();
 const {isLoading, isLoaded, records, outlayTags, error} = useSelector<AppState, IRedux>(state => ({
  isLoading: state.records.isLoading,
  isLoaded: state.records.isLoaded,
  error: state.records.loadError,
  records: state.records.records,
  outlayTags: state.records.outlayTags,
 }));
 React.useEffect(() => {
  window.document.title = outlay.name;
 }, [outlay]);
 React.useEffect(() => {
  dispatch(recordsLoad(outlayId));
  return () => {
   dispatch(recordsUnload());
  }
 }, [dispatch, outlayId]);

 if (isLoading)
  return <LinearProgress title={"Loading outlay"}/>

 if (error)
  return <AppError title={"Ошибка при загрузке списка"}>{error.toString()}</AppError>

 if (!isLoaded)
  return <AppError title={"Список не загружен"}>Outlay is not loaded.</AppError>

 return (
  <Switch>
   <Route exact path={"/outlay/:outlayId"}>
    <OutlayBox outlayId={outlayId} outlay={outlay} records={records} tags={outlayTags}/>
   </Route>
   <Route exact path={"/outlay/:outlayId/edit"}>
    <OutlayEdit outlayId={outlayId} outlay={outlay}/>
   </Route>
  </Switch>
 )
}
