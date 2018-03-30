import {createStore, combineReducers} from 'redux';
import {reducer as todoReducer} from './todos';
import {reducer as filterReducer} from "./filter";


const initValues = {
    'First': 0,
    'Second': 10,
    'Third': 20
};

const reducer = combineReducers({
    todos: todoReducer,
    filter: filterReducer
});

const store = createStore(reducer);

export default store;