import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers";

const initialState = {};

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        // Comment this in production, uncomment if you use the redux devtool
        // (window.__REDUX_DEVTOOLS_EXTENSION__ &&
            // (window.__REDUX_DEVTOOLS_EXTENSION__()))
            ));

export default store;
