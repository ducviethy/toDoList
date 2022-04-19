import {combineReducers} from 'redux';
import toDoListReducer from './toDoListReducer';
const rootReducer = combineReducers({ 
    toDoListReducer
})
export default rootReducer;