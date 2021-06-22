import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./index.css"


import { Provider } from 'react-redux'
import store from "./store";
import {BrowserRouter as Router, Switch} from "react-router-dom";
import {Container} from "@material-ui/core";



ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>,
  document.getElementById('root')
);

