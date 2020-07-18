import { combineReducers } from "redux";
import postReducer from "./postReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import darkmodeReducer from "./darkmodeReducer";

export const rootReducer = combineReducers({
    post: postReducer,
    auth: authReducer,
    errors: errorReducer,
    profile: profileReducer,
    darkmode: darkmodeReducer
});
