import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TodoApp from './TodoApp';
import store from "./Store";
import {Provider} from "react-redux";
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={store}>
        <TodoApp/>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
