import {
    createStore,
    applyMiddleware,
    compose
} from "redux";
import {useDispatch} from "react-redux";

import thunk from "redux-thunk";
import reducer from "../reducers";
import {composeWithDevTools} from "redux-devtools-extension";
import {configureStore} from "@reduxjs/toolkit";


//Check declare
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__?: typeof compose
    }
}

const middleware = [thunk];

//const store = createStore(
//reducer,
//compose(applyMiddleware(thunk),
//  typeof window === 'object' &&
//    typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ?
//  window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
//));

const store = configureStore(
    {
        reducer,
        devTools: true
    }
)

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();


export default store;
