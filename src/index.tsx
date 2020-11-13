import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import './styles/index.scss';
import configureStore from "./store";
import {App} from "./containers/App";

const store = configureStore();

ReactDOM.render(
 <Provider store={store}><App/></Provider>,
 document.getElementById('root')
);
