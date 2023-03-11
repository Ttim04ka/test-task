import { applyMiddleware, combineReducers, createStore } from "redux"
import thunk from 'redux-thunk'
import appReducer from'./app-reducer.js'

let reducers=combineReducers({
   appReducer
});
let store=createStore(reducers,applyMiddleware(thunk));
export default store;



