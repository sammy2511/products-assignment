import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Product from './Components/Product'
import * as serviceWorker from './serviceWorker';
import { Route } from 'react-router'
import { BrowserRouter as Router,Switch} from 'react-router-dom'
import {createStore, applyMiddleware} from 'redux';
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import reducers from "./Reducers/index.js";
let store = createStore(reducers, applyMiddleware(thunk))


const defaultComponent = () =>{
    return <div className ="container">
        <h3>Not Found</h3>
    </div>
}


ReactDOM.render(
    <Provider store={store}>
        <Router>
        <div>
            <Switch>
            <Route  path='/' exact component={App} />
            <Route path='/edit-product' component={Product} />
            <Route  component={defaultComponent} />
            </Switch>
        </div>
        </Router>   
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
