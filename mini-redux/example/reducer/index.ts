import { combineReducers } from "redux";
import { countReducer } from "./countReducer";
import { userReducer } from "./userReducer";

export const reducers = combineReducers({
    counter: countReducer,
    user: userReducer,
});
