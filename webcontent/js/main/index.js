import React from 'react';
import ReactDOM from 'react-dom';
import App from './jsx/App.jsx';
import {Provider} from 'react-redux';
import configureStore from './store/configurestore';
import {addQuestion} from './actions/actionTypes';
import {addOption} from './actions/actionTypes';
const store = configureStore();



ReactDOM.render(
    <Provider store={store}>
    <App/>
    </Provider>, document.getElementById('app'));