import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension';

import {userReducer} from "./user/reducer";
import {recordsReducer} from "./records/reducer";
import {outlaysReducer} from "./outlays/reducer";

const rootReducer = combineReducers({
 outlays: outlaysReducer,
 records: recordsReducer,
 user: userReducer,
});

export type AppState = ReturnType<typeof rootReducer>

export default function configureStore() {
 const middlewares = [thunk];
 const middlewareEnhancer = applyMiddleware(...middlewares);

 const store = createStore(
  rootReducer,
  composeWithDevTools(middlewareEnhancer)
 );

 return store;
}