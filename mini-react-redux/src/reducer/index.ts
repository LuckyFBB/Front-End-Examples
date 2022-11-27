import { combineReducers } from "redux";
import { user } from "./user";

// 全局State
const rootReducer = combineReducers({
    user
});

export default rootReducer;
